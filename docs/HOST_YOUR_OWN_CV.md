# Host your own CV on Salesforce

This guide is for Salesforce professionals who want to fork this repo, put their own content in, and publish a recruiter facing CV on Experience Cloud with Multi-Framework React.

If you want the simplest path (custom domain, admin editor, no Salesforce org required), use the Vercel sister project instead: [fizzy2562/hosted-cv](https://github.com/fizzy2562/hosted-cv).

---

## What you need

| Requirement | Notes |
| --- | --- |
| Salesforce org | Scratch, sandbox, or production on Summer '26+ |
| Experience Cloud | Communities / Digital Experiences enabled |
| Salesforce CLI | `sf` v2.143+ (for `UIBundle` metadata) |
| Node.js | v22+ |
| Org language | `en_US` (required for Multi-Framework) |

Scratch org tip: use the included `config/project-scratch-def.json` (Communities + `en_US`).

---

## 1. Fork and clone

1. Open https://github.com/fizzy2562/hosted-cv-salesforce
2. Click **Fork**
3. Clone your fork:

```bash
git clone https://github.com/YOUR_USERNAME/hosted-cv-salesforce.git
cd hosted-cv-salesforce
```

---

## 2. Put your content in

All CV copy lives in one file:

`force-app/main/default/webapplications/hostedcvsalesforce/src/data/default-cv.ts`

Edit:

- Name, title, email, location
- Highlights (pills under the hero)
- Executive summary paragraphs and links
- Certifications + earn dates
- Skills (1 to 5)
- Industry experience
- Work experience and education

Replace images in:

`force-app/main/default/webapplications/hostedcvsalesforce/src/assets/cv/`

| File | Purpose |
| --- | --- |
| `profile.png` | Hero / PDF photo |
| `trailhead-banner.png` | Certifications banner (optional) |
| `our-mission.png` | Side image in About (optional) |

Keep the same filenames, or update the imports in `default-cv.ts` and `CVWebExperience.tsx`.

Copy rules for this project: prefer colons and "to" for date ranges. Avoid em dashes and hyphen separators in prose.

---

## 3. Preview locally

```bash
cd force-app/main/default/webapplications/hostedcvsalesforce
npm install
npm run dev
```

Open http://localhost:5173 and check layout, links, and PDF download.

---

## 4. Connect your org

```bash
sf org login web --alias my-cv-org
# or create a scratch org from this project:
sf org create scratch \
  --definition-file config/project-scratch-def.json \
  --alias my-cv-scratch \
  --set-default \
  --duration-days 30 \
  --target-dev-hub YOUR_DEVHUB_ALIAS
```

---

## 5. Build the deployable bundle

Source lives under `webapplications/`. Salesforce deploys the GA **UIBundle** under `uiBundles/`. Sync them with:

```bash
chmod +x scripts/build-and-sync-bundle.sh
./scripts/build-and-sync-bundle.sh
```

That runs `npm run build` and copies `dist/` into `uiBundles/hostedcvsalesforce/`.

---

## 6. Deploy

```bash
# 1) React UIBundle
sf project deploy start \
  --source-dir force-app/main/default/uiBundles \
  --target-org my-cv-org

# 2) Experience Cloud site + auth Apex
sf project deploy start \
  --source-dir force-app/main/default/digitalExperienceConfigs \
  --source-dir force-app/main/default/digitalExperiences \
  --source-dir force-app/main/default/networks \
  --source-dir force-app/main/default/sites \
  --source-dir force-app/main/default/classes \
  --target-org my-cv-org
```

Site URL pattern:

```text
https://YOUR_MY_DOMAIN.my.site.com/hostedcvsalesforce/
```

Confirm the network is **Live** in Setup → Digital Experiences → All Sites.

---

## 7. Optional renames

Defaults use `hostedcvsalesforce` as the site path and bundle name. To change the URL path, update:

- `digitalExperienceConfigs/...urlPathPrefix`
- `sites/...urlPathPrefix`
- `networks/...`
- `content.json` → `appSpace` must stay `c__BUNDLE_FOLDER_NAME`
- Folder names under `uiBundles/` and matching `.uibundle-meta.xml`

For a first publish, keep the names and only change CV content.

---

## Updating later

1. Edit `default-cv.ts` / assets
2. Run `./scripts/build-and-sync-bundle.sh`
3. Redeploy `uiBundles` only

```bash
sf project deploy start \
  --source-dir force-app/main/default/uiBundles \
  --target-org my-cv-org
```

Hard refresh the site (Cmd+Shift+R) so browsers pick up new hashed assets.

---

## Two hosting options (pick one)

| | Salesforce (this repo) | Vercel ([hosted-cv](https://github.com/fizzy2562/hosted-cv)) |
| --- | --- | --- |
| Best for | Learning Multi-Framework, staying on platform | Personal brand site, custom domain |
| Host | Experience Cloud | Vercel |
| Content | Edit TypeScript file | Edit TypeScript + optional admin UI |
| Domain | `*.my.site.com` (or custom Experience domain) | Easy custom domain |
| Audience | Salesforce practitioners | Recruiters + anyone |

Many people will use Vercel for the live CV and this repo as a portfolio / community sample.

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| `Unknown type name 'WebApplication'` | Deploy `uiBundles`, not `webapplications`. Update CLI to 2.143+. |
| `Communities must be enabled` | Recreate scratch with Communities, or enable Digital Experiences in the org. |
| PDF fails with `oklch` | Use the current `download-pdf.ts` (iframe isolation). Redeploy the bundle. |
| Old UI after deploy | Hard refresh. Asset filenames are hashed. |
| Blank site | Confirm Network status is Live and path is `/hostedcvsalesforce/`. |

---

## Share it

Once live, add the Experience Cloud URL to LinkedIn and your Trailblazer profile. If you build on this for Consultant Cloud, link back to the repo so others can fork it too.
