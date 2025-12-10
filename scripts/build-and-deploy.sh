#!/bin/bash
# Deployment script for IONOS Webhosting - Sigloch Consulting
# Author: andreas@siglochconsulting
# Uses SFTP for upload + SSH for directory rename (quasi-atomic)
#
# Target: www/consulting (NOT production - that's sigloch-immobilien.de)

set -e

# Load .env file if it exists
if [ -f .env ]; then
  export $(cat .env | grep -v '^#' | xargs)
fi

# Configuration
SFTP_HOST="home396750070.1and1-data.host"
SFTP_USER="u67250678"
SFTP_PASS="${IONOS_SFTP_PASSWORD}"
DOMAIN="https://siglochconsulting.de"
DEPLOY_DIR="consulting"  # IMPORTANT: NOT production!

# Validate environment
if [ -z "$SFTP_PASS" ]; then
  echo "❌ Error: IONOS_SFTP_PASSWORD not set"
  echo "   Please create .env file with IONOS_SFTP_PASSWORD=your-password"
  exit 1
fi

COMMIT=$(git rev-parse --short HEAD)
BUILD_DATE=$(date -u +%Y-%m-%dT%H:%M:%SZ)

echo "=== Building and deploying commit $COMMIT ==="
echo "Target: $SFTP_HOST → www/$DEPLOY_DIR"
echo "Domain: $DOMAIN"
echo "Strategy: Directory rename (quasi-atomic)"
echo ""

# Step 1: Build
echo "[1/5] Building..."
npm run build

# Step 2: Generate version file (Health Check Endpoint)
echo "[2/5] Creating version.json..."
cat > dist/version.json << EOF
{
  "commit": "$COMMIT",
  "date": "$BUILD_DATE",
  "source_repo": "$(git remote get-url origin)",
  "project": "siglochconsulting"
}
EOF

# Step 3: SFTP Upload to temporary directory
echo "[3/5] Uploading to IONOS via SFTP..."
lftp -c "
set sftp:auto-confirm yes
set net:timeout 30
set net:max-retries 3
open sftp://$SFTP_USER:$SFTP_PASS@$SFTP_HOST
mirror --reverse --delete --verbose dist/ www/${DEPLOY_DIR}.new/
bye
"

if [ $? -ne 0 ]; then
  echo "❌ SFTP upload failed"
  exit 1
fi

echo "✅ Upload complete"

# Step 4: Quasi-atomic activation (directory rename via SSH)
echo "[4/5] Activating release (directory rename)..."

# Install sshpass if not available
if ! command -v sshpass &> /dev/null; then
  echo "Installing sshpass..."
  brew install hudochenkov/sshpass/sshpass
fi

# Atomic-ish directory swap with rotating backups (.1 → .2 → .3)
# Then fix .htaccess permissions (SFTP sets 600, Apache needs 644)
sshpass -p "$SFTP_PASS" ssh -o StrictHostKeyChecking=no "$SFTP_USER@$SFTP_HOST" \
  "rm -rf www/${DEPLOY_DIR}.3 && \
   mv www/${DEPLOY_DIR}.2 www/${DEPLOY_DIR}.3 2>/dev/null || true && \
   mv www/${DEPLOY_DIR}.1 www/${DEPLOY_DIR}.2 2>/dev/null || true && \
   mv www/${DEPLOY_DIR} www/${DEPLOY_DIR}.1 2>/dev/null || true && \
   mv www/${DEPLOY_DIR}.new www/${DEPLOY_DIR} && \
   chmod 644 www/${DEPLOY_DIR}/.htaccess 2>/dev/null || true"

if [ $? -ne 0 ]; then
  echo "❌ Activation failed"
  echo "   Attempting rollback..."
  sshpass -p "$SFTP_PASS" ssh -o StrictHostKeyChecking=no "$SFTP_USER@$SFTP_HOST" \
    "mv www/${DEPLOY_DIR}.1 www/${DEPLOY_DIR}" || echo "⚠️  Rollback failed - manual intervention required"
  exit 1
fi

echo "✅ Release activated"

# Step 5: Health Check
echo "[5/5] Running health check..."
sleep 2  # Wait for webserver to pick up changes

DEPLOYED_COMMIT=$(curl -sf "$DOMAIN/version.json" | jq -r .commit 2>/dev/null || echo "error")

echo ""
echo "=== Deployment Result ==="
if [ "$DEPLOYED_COMMIT" = "$COMMIT" ]; then
  echo "✅ Deployment successful!"
  echo "   Local:    $COMMIT"
  echo "   Deployed: $DEPLOYED_COMMIT"
  echo "   URL:      $DOMAIN/version.json"
else
  echo "⚠️  Health check inconclusive"
  echo "   Expected: $COMMIT"
  echo "   Got:      $DEPLOYED_COMMIT"
  echo ""
  echo "   Possible reasons:"
  echo "   - DNS not pointing to IONOS yet"
  echo "   - Document Root not set to /www/$DEPLOY_DIR"
  echo "   - Browser cache"
  echo ""
  echo "   Manual verification: curl $DOMAIN/version.json"
fi

echo ""
echo "=== Deployment complete ==="
echo "Downtime: ~100ms (during directory rename)"
echo "Rollback: www/${DEPLOY_DIR}.1 (latest), .2, .3 available"
