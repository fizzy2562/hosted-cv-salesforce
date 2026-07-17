#!/usr/bin/env bash
# Build the React CV and copy dist into the deployable UIBundle.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
WEBAPP="$ROOT/force-app/main/default/webapplications/hostedcvsalesforce"
UIBUNDLE="$ROOT/force-app/main/default/uiBundles/hostedcvsalesforce"

echo "Installing dependencies…"
cd "$WEBAPP"
npm install

echo "Building React app…"
npm run build

echo "Copying dist into UIBundle…"
rm -rf "$UIBUNDLE/dist"
cp -R "$WEBAPP/dist" "$UIBUNDLE/dist"

echo "Done. Deploy with (no auth Apex):"
echo "  sf project deploy start --source-dir force-app/main/default/uiBundles --target-org YOUR_ALIAS"
echo "  sf project deploy start \\"
echo "    --source-dir force-app/main/default/digitalExperienceConfigs \\"
echo "    --source-dir force-app/main/default/digitalExperiences \\"
echo "    --source-dir force-app/main/default/networks \\"
echo "    --source-dir force-app/main/default/sites \\"
echo "    --target-org YOUR_ALIAS"
echo ""
echo "Do not deploy optional/auth-apex/ for a public CV. See SECURITY.md."
