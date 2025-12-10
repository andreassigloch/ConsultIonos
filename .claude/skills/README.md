# Claude Skills

Custom automation skills for the ImmoTechDemo project.
Author: andreas@siglochconsulting

## Image Processor

**File:** [image-processor.sh](./image-processor.sh)

Automatically optimize images for web: resize, compress, convert to WebP format.

### Usage

```bash
# Process single image
.claude/skills/image-processor.sh path/to/image.jpg

# Process multiple images
.claude/skills/image-processor.sh src/content/news/*.jpg

# Process with file watcher (automatic)
# Add new images to src/content/ folders - skill will process automatically
```

### What It Does

1. **Resize:** Max 1920px width (maintains aspect ratio)
2. **Format:** Creates WebP (primary) + JPEG (fallback)
3. **Optimize:** 85% quality, strips metadata, progressive encoding
4. **Output:** Saves to `public/uploads/` (CMS media folder)

### Example

**Input:**
```
src/content/news/test-image.jpg (15MB, 6000x4000px)
```

**Output:**
```
public/uploads/test-image.webp (380KB, 1920x1280px) ← 97% smaller
public/uploads/test-image.jpg  (432KB, 1920x1280px) ← fallback
```

### Requirements

- ImageMagick: `brew install imagemagick`
- WebP tools: `brew install webp`

### Integration

**CMS Access:** Processed images automatically appear in:
- Admin UI → Select Image → Shows all files in `public/uploads/`
- Direct reference: `/uploads/filename.webp`

**Content Schema:**
```yaml
image: /uploads/my-image.webp
imageAlt: "Description"
```

**HTML Output:**
```html
<picture>
  <source srcset="/uploads/image.webp" type="image/webp">
  <img src="/uploads/image.jpg" alt="Description">
</picture>
```

### Performance Benefits

- **File size:** 95-98% reduction (vs original uploads)
- **WebP vs JPEG:** 30-40% additional savings
- **Page load:** Faster loading, better Core Web Vitals
- **SEO:** Improved rankings from performance boost

### Automation

**Manual Trigger:**
```bash
.claude/skills/image-processor.sh src/content/**/*.{jpg,png}
```

**Future:** File watcher integration (auto-process on upload)

## Location Scorer

**File:** [location-scorer.sh](./location-scorer.sh)

Generate infrastructure quality scores for German cities using OpenStreetMap data.

### Usage

```bash
# Score a single city
.claude/skills/location-scorer.sh Renningen

# Update main database
.claude/skills/location-scorer.sh Stuttgart --update-main

# Custom output path
.claude/skills/location-scorer.sh "Bad Homburg" --output custom.json
```

### What It Does

1. **Geocoding:** Fetches coordinates from OpenStreetMap Nominatim
2. **Data Collection:** Queries 5 categories (shopping, education, gastronomy, health, leisure)
3. **Resilient Strategy:** Automatic retry with 3 OSM server fallback
4. **Scoring:** Calculates 1-5 scores based on POI density
5. **POI Details:** Includes 5 closest POIs per category with distances

### Categories Scored

- **Shopping:** Stores, supermarkets, retail
- **Education:** Schools, kindergartens
- **Gastronomy:** Restaurants, cafes, bars
- **Health:** Doctors, pharmacies
- **Leisure:** Parks, playgrounds, sports centers

### Output Format (Schema v2.0.0)

```json
{
  "version": "2.0.0",
  "regions": [{
    "name": "Renningen",
    "scores": {
      "shopping": 4.0,
      "education": 4.7,
      "gastronomy": 2.9,
      "health": 3.1,
      "leisure": 1.0
    },
    "overall": 3.1,
    "details": {
      "shopping": {
        "poiCount": 62,
        "closestPOIs": [
          {"name": "REWE", "distance": 120}
        ]
      }
    }
  }]
}
```

### Performance

- **Duration:** ~30-60 seconds per city
- **Rate Limiting:** 6s between queries (OSM-friendly)
- **Reliability:** 3 retry attempts with server rotation
- **Server Fallback:** overpass-api.de → kumi.systems → openstreetmap.ru

### Requirements

- Python 3 virtual environment (auto-created if missing)
- `requests` library (auto-installed)
- Internet connection

### Integration with Main Database

**Update existing region:**
```bash
.claude/skills/location-scorer.sh Stuttgart --update-main
```

**Add new region:**
```bash
.claude/skills/location-scorer.sh Renningen --update-main
```

This updates `src/data/location-scores.json` and triggers Astro rebuild on deployment.

### Technical Details

- **API:** OpenStreetMap Overpass API
- **Strategy:** CR-028 resilient querying (multi-server fallback)
- **Attribution:** © OpenStreetMap contributors (ODbL)
- **Schema:** location-scores v2.0.0 (with closest POI names)

## Related Documentation

- [CR-017: Image Handling Automation](../../docs/CR-017-image-handling-automation.md)
- [CR-028: Location Scoring API Validation](../../docs/CR-028.md)
- [CR-029: SEO/GEO Integration](../../docs/CR-029-seo-geo-integration.md)
- [CMS Configuration](../../public/admin/config.yml)
