#!/bin/bash
#
# Location Scorer Skill
# Author: andreas@siglochconsulting
#
# Generate location scores for German cities using OSM data
# with resilient multi-server fallback strategy.
#

set -e  # Exit on error

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

usage() {
    cat << EOF
${BLUE}Location Scorer${NC} - Generate infrastructure scores for German cities

${YELLOW}Usage:${NC}
  $0 <city-name> [options]

${YELLOW}Arguments:${NC}
  city-name          Name of German city (e.g., "Stuttgart", "Renningen")

${YELLOW}Options:${NC}
  --update-main      Update main database (src/data/location-scores.json)
  --output <path>    Custom output path (default: <city>-location-scores.json)

${YELLOW}Examples:${NC}
  $0 Renningen                           # Generate scores for Renningen
  $0 Stuttgart --update-main             # Update main database
  $0 "Bad Homburg" --output scores.json  # Custom output path

${YELLOW}What It Does:${NC}
  1. Fetches coordinates from OpenStreetMap (Nominatim)
  2. Queries POI data with resilient retry logic (3 OSM servers)
  3. Calculates scores across 5 categories (shopping, education, etc.)
  4. Includes closest 5 POIs per category with distances
  5. Saves as Schema v2.0.0 JSON

${YELLOW}Requirements:${NC}
  - Python 3 with venv
  - requests library (installed in venv)
  - Internet connection (OSM API access)

${YELLOW}Performance:${NC}
  - ~30-60 seconds per city (5 categories × 6s rate limit)
  - Automatic retry on server errors (429/504)
  - Fallback to alternative OSM servers

EOF
    exit 1
}

# Check arguments
if [ $# -eq 0 ]; then
    usage
fi

# Check for help flag
case "$1" in
    --help|-h|help)
        usage
        ;;
esac

CITY_NAME="$1"
UPDATE_MAIN=false
CUSTOM_OUTPUT=""

# Parse options
shift
while [ $# -gt 0 ]; do
    case "$1" in
        --update-main)
            UPDATE_MAIN=true
            shift
            ;;
        --output)
            CUSTOM_OUTPUT="$2"
            shift 2
            ;;
        *)
            echo -e "${RED}Error: Unknown option $1${NC}"
            usage
            ;;
    esac
done

echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${BLUE}Location Scorer - ${CITY_NAME}${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Check venv
cd "$PROJECT_ROOT"
if [ ! -d "venv" ]; then
    echo -e "${RED}✗ Virtual environment not found${NC}"
    echo -e "${YELLOW}Creating venv...${NC}"
    python3 -m venv venv
fi

# Activate venv
source venv/bin/activate

# Check requests library
if ! python -c "import requests" 2>/dev/null; then
    echo -e "${YELLOW}Installing requests library...${NC}"
    pip install requests
fi

# Get coordinates from Nominatim
echo -e "\n${BLUE}1. Fetching coordinates...${NC}"
COORDS=$(curl -s "https://nominatim.openstreetmap.org/search?q=${CITY_NAME// /%20},Germany&format=json&limit=1" | python3 -c "
import sys, json
data = json.load(sys.stdin)
if data:
    print(f\"{data[0]['lat']},{data[0]['lon']}\")
else:
    sys.exit(1)
")

if [ $? -ne 0 ]; then
    echo -e "${RED}✗ Could not find coordinates for '${CITY_NAME}'${NC}"
    echo -e "${YELLOW}Tip: Try different spelling or check city name${NC}"
    exit 1
fi

LAT=$(echo "$COORDS" | cut -d',' -f1)
LON=$(echo "$COORDS" | cut -d',' -f2)
echo -e "${GREEN}✓ Found: ${LAT}, ${LON}${NC}"

# Create temporary Python script
TEMP_SCRIPT=$(mktemp)
cat > "$TEMP_SCRIPT" << 'PYTHON_SCRIPT'
import sys
import json
from datetime import datetime

# Import the scorer class
exec(open("scripts/generate-location-scores-enhanced.py").read())

if __name__ == "__main__":
    city_name = sys.argv[1]
    lat = float(sys.argv[2])
    lon = float(sys.argv[3])

    print(f"\n{'='*60}")
    print(f"Generating scores for {city_name}")
    print(f"{'='*60}")

    scorer = EnhancedLocationScorer(rate_limit_sec=6.0)
    result = scorer.score_region(city_name, lat, lon)

    # Save output
    output = {
        "$schema": "location-scores-schema",
        "version": "2.0.0",
        "lastUpdated": datetime.now().isoformat() + "Z",
        "dataSource": "OpenStreetMap (Overpass API)",
        "attribution": "© OpenStreetMap contributors",
        "note": f"{city_name} location scores",
        "regions": [result]
    }

    # Output as JSON to stdout
    print("\n" + "="*60)
    print("RESULT")
    print("="*60)
    print(json.dumps(output, indent=2, ensure_ascii=False))
PYTHON_SCRIPT

# Run scorer
echo -e "\n${BLUE}2. Querying OSM data (resilient mode)...${NC}"
RESULT=$(python "$TEMP_SCRIPT" "$CITY_NAME" "$LAT" "$LON" 2>&1)

# Clean up temp script
rm "$TEMP_SCRIPT"

# Extract JSON from output
JSON_OUTPUT=$(echo "$RESULT" | awk '/^{$/,0')

if [ -z "$JSON_OUTPUT" ]; then
    echo -e "${RED}✗ Failed to generate scores${NC}"
    echo "$RESULT"
    exit 1
fi

# Determine output path
if [ -n "$CUSTOM_OUTPUT" ]; then
    OUTPUT_PATH="$CUSTOM_OUTPUT"
else
    SAFE_NAME=$(echo "$CITY_NAME" | tr '[:upper:]' '[:lower:]' | tr ' ' '-')
    OUTPUT_PATH="${SAFE_NAME}-location-scores.json"
fi

# Save output
echo "$JSON_OUTPUT" > "$OUTPUT_PATH"
echo -e "\n${GREEN}✓ Saved to: ${OUTPUT_PATH}${NC}"

# Extract overall score for display
OVERALL=$(echo "$JSON_OUTPUT" | python3 -c "
import sys, json
data = json.load(sys.stdin)
print(data['regions'][0]['overall'])
")

echo -e "\n${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"
echo -e "${GREEN}✓ ${CITY_NAME}: Overall Score ${OVERALL}/5.0${NC}"
echo -e "${BLUE}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${NC}"

# Update main database if requested
if [ "$UPDATE_MAIN" = true ]; then
    echo -e "\n${YELLOW}3. Updating main database...${NC}"

    MAIN_DB="src/data/location-scores.json"

    if [ ! -f "$MAIN_DB" ]; then
        echo -e "${RED}✗ Main database not found: $MAIN_DB${NC}"
        exit 1
    fi

    # Use Python to merge
    python3 << MERGE_SCRIPT
import json

# Load main database
with open("$MAIN_DB", "r", encoding="utf-8") as f:
    main_data = json.load(f)

# Load new region data
with open("$OUTPUT_PATH", "r", encoding="utf-8") as f:
    new_data = json.load(f)

# Find and update or append region
new_region = new_data["regions"][0]
region_name = new_region["name"]
found = False

for i, region in enumerate(main_data["regions"]):
    if region["name"] == region_name:
        main_data["regions"][i] = new_region
        found = True
        break

if not found:
    main_data["regions"].append(new_region)

# Update metadata
main_data["lastUpdated"] = new_data["lastUpdated"]

# Save back
with open("$MAIN_DB", "w", encoding="utf-8") as f:
    json.dump(main_data, f, indent=2, ensure_ascii=False)

print(f"{'✓ Added' if not found else '✓ Updated'} {region_name} in main database")
MERGE_SCRIPT

    echo -e "${GREEN}✓ Main database updated${NC}"
fi

echo ""
