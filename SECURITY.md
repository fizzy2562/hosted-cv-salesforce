# Security

This project is a **public, static CV sample**. Treat it as open source you can fork safely, with the caveats below.

## What is (and is not) in this repo

| Present | Not present |
| --- | --- |
| Sample CV content and images (intentionally public) | API keys, OAuth secrets, `.env` files |
| React UI + Experience Cloud metadata | Admin passwords or org credentials |
| Public site URL patterns | Connected app secrets |

No secrets belong in git. If you add any (Named Credentials, private keys, org auth files), keep them out of the repo and out of `force-app/`.

## Default surface area

The live app is a **read only public CV**:

- Content is compiled into the UI Bundle (static TypeScript + assets)
- PDF export runs entirely in the browser
- There is **no** server side admin, Blob storage, or database of CV edits in this Salesforce sample

### Auth Apex is optional and not deployed by default

Salesforce CLI templates often ship login / registration Apex REST classes. Those live under `optional/auth-apex/` and are **not** part of `force-app/`. Do not deploy them unless you deliberately build an authenticated Experience Cloud app and harden guest profiles.

## Before you deploy a fork

1. Replace `default-cv.ts` and `src/assets/cv/` with **your** content (or clear sample PII you do not want public)
2. Confirm Network `selfRegistration` stays `false` (default in this repo)
3. Review the Experience Cloud **Guest User** profile: no object create/edit/delete beyond what you explicitly need (for a static CV, guests need almost nothing)
4. Do not grant Guest User access to Apex REST auth endpoints
5. Use a scratch org or sandbox first; only then production
6. Keep org language `en_US` for Multi-Framework; that does not weaken security by itself

## Guest and network hardening (shipped defaults)

This repo’s Network metadata turns off:

- Self registration
- Guest Chatter
- Guest file access
- Direct / private messages
- Reputation and related social features

After deploy, re check Setup → Digital Experiences → [your site] → Administration → Preferences and the Guest User profile.

## If this goes viral

Safe outcomes:

- People fork, swap content, deploy to their own orgs
- Your public demo site gets traffic (same as any public portfolio)

Things to watch:

- Rate / bandwidth on your Experience Cloud site (platform limits, not repo secrets)
- Issues or PRs that try to reintroduce auth, file upload, or secrets into `force-app/`
- Forks that deploy `optional/auth-apex/` without locking down Guest User access

## Reporting a vulnerability

If you find a security issue in this sample, open a private report with the maintainer (GitHub Security Advisory on the repo, or contact via the email on the sample CV / Consultant Cloud site). Do not file a public issue with exploit details until a fix exists.

## Maintainer checklist (before promoting widely)

- [ ] No `.env`, tokens, or auth files in git history
- [ ] `force-app` does not include auth Apex
- [ ] Sample CV content is content you are happy to have crawled and forked
- [ ] Demo org Guest User profile reviewed
- [ ] README and host guide do not instruct deploying open registration
