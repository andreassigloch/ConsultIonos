#!/bin/bash
# Image Processing Skill
# @author andreas@siglochconsulting
#
# Automatically resize and convert images to web-optimized formats
# Triggered when images are added to src/content/ directories

set -e

# Configuration
MAX_WIDTH=1920
QUALITY=85
OUTPUT_DIR="public/uploads"
WEBP_QUALITY=85
JPEG_QUALITY=85

# Colors for output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if ImageMagick is installed
if ! command -v magick &> /dev/null; then
    echo -e "${RED}✗ Error: ImageMagick not installed${NC}"
    echo "Install with: brew install imagemagick"
    exit 1
fi

# Check if cwebp is installed (for WebP conversion)
if ! command -v cwebp &> /dev/null; then
    echo -e "${YELLOW}⚠ cwebp not found, installing...${NC}"
    brew install webp
fi

# Function to process a single image
process_image() {
    local input_file="$1"
    local filename=$(basename "$input_file")
    local name="${filename%.*}"
    local output_webp="${OUTPUT_DIR}/${name}.webp"
    local output_jpeg="${OUTPUT_DIR}/${name}.jpg"

    echo -e "${YELLOW}Processing: ${filename}${NC}"

    # Get original dimensions
    local original_size=$(magick identify -format "%wx%h %b" "$input_file")
    echo "  Original: $original_size"

    # Create output directory if it doesn't exist
    mkdir -p "$OUTPUT_DIR"

    # Resize and optimize to JPEG (fallback)
    magick "$input_file" \
        -resize ${MAX_WIDTH}x${MAX_WIDTH}\> \
        -quality $JPEG_QUALITY \
        -strip \
        -interlace Plane \
        -sampling-factor 4:2:0 \
        "$output_jpeg"

    local jpeg_size=$(magick identify -format "%wx%h %b" "$output_jpeg")
    echo -e "${GREEN}  ✓ JPEG: ${jpeg_size}${NC}"

    # Convert to WebP (primary format)
    cwebp -q $WEBP_QUALITY "$output_jpeg" -o "$output_webp" > /dev/null 2>&1

    local webp_size=$(du -h "$output_webp" | cut -f1)
    local webp_dims=$(magick identify -format "%wx%h" "$output_webp")
    echo -e "${GREEN}  ✓ WebP: ${webp_dims} ${webp_size}${NC}"

    echo ""
}

# Main execution
if [ $# -eq 0 ]; then
    echo "Usage: $0 <image-file> [image-file ...]"
    echo ""
    echo "Process images for web optimization:"
    echo "  - Resize to max ${MAX_WIDTH}px width"
    echo "  - Convert to WebP + JPEG fallback"
    echo "  - Save to ${OUTPUT_DIR}/"
    exit 1
fi

# Process all provided images
for image in "$@"; do
    if [ -f "$image" ]; then
        # Check if it's an image file
        if [[ "$image" =~ \.(jpg|jpeg|png|JPG|JPEG|PNG)$ ]]; then
            process_image "$image"
        else
            echo -e "${YELLOW}⚠ Skipping non-image file: $image${NC}"
        fi
    else
        echo -e "${RED}✗ File not found: $image${NC}"
    fi
done

echo -e "${GREEN}✓ Image processing complete${NC}"
echo "Output directory: ${OUTPUT_DIR}/"
