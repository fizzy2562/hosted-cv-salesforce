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

echo "Done. Deploy with:"
echo "  sf project deploy start --source-dir force-app/main/default/uiBundles --target-org YOUR_ALIAS"
echo "  sf project deploy start --source-dir force-app/main/default/digitalExperienceConfigs --source-dir force-app/main/default/digitalExperiences --source-dir force-app/main/default/networks --source-dir force-app/main/default/sites --source-dir force-app/main/default/classes --target-org YOUR_ALIAS"
