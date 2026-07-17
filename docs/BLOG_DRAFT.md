# Blog draft: Host your consultant CV on Salesforce Multi-Framework

**Audience:** Consultant Cloud learners and Salesforce professionals exploring React on Experience Cloud.

**Suggested title:** Ship a recruiter ready CV on Experience Cloud with Salesforce Multi-Framework

**Suggested CTA:** Fork the repo, swap in your content, deploy to a scratch org or sandbox, then share your `*.my.site.com` URL.

---

## Hook

When Salesforce announced that [Multi-Framework is now GA](https://developer.salesforce.com/blogs/2026/07/build-with-react-on-salesforce-multi-framework-is-now-ga), I wanted a sample our Consultant Cloud community could actually use: a public, recruiter facing CV built in React and hosted on Experience Cloud.

The result is an open source DX project you can fork, personalise, and deploy.

Demo: https://d0y000002jj75uae-dev-ed.my.site.com/hostedcvsalesforce/

---

## Why this matters for consultants

Polished portfolio sites on Salesforce used to mean LWC on LWR, Aura, or heavy Experience Builder work. If you already think in React, npm, and Vite, that context switch hurts.

Multi-Framework lets you:

- Build with **React + Vite + Tailwind**
- Deploy to **Experience Cloud** for external, recruiter facing sites
- Keep metadata and frontend in one DX project

That is a credible answer when someone asks: *"Can we host this on Salesforce?"*

---

## What the sample includes

1. Immersive web CV (certifications, skills, timeline, Consultant Cloud branding)
2. PDF export in the browser (print layout uses inline hex colours so html2canvas does not hit Tailwind `oklch` issues)
3. Static content in TypeScript for v1 (no Apex required)

Auth and registration Apex from the B2X template are kept optional and off the default deploy path. A public CV should stay read only.

---

## How someone forks it

1. Fork https://github.com/fizzy2562/hosted-cv-salesforce
2. Edit `default-cv.ts` and replace assets
3. Run `./scripts/build-and-sync-bundle.sh`
4. Deploy the UIBundle + Experience Cloud metadata
5. Open `https://YOUR_DOMAIN.my.site.com/hostedcvsalesforce/`

Full steps: [docs/HOST_YOUR_OWN_CV.md](HOST_YOUR_OWN_CV.md)

Security checklist: [SECURITY.md](../SECURITY.md)

---

## Lessons from the build

### 1. Deploy UIBundle, not the experimental WebApplication folder

GA orgs recognise `UIBundle`. Build under `webapplications/`, sync `dist/` into `uiBundles/`, then deploy.

### 2. PDF capture needs isolation from page CSS

html2canvas cannot parse `oklch()`. Clone the print document into a clean iframe before capture.

### 3. Keep the guest surface small

Self registration off. No auth Apex on the guest profile. Static content only.

---

## Closing

Multi-Framework gives Salesforce professionals a legitimate path to ship React experiences on platform, with Experience Cloud as the host.

If you are studying for certs or building your consulting brand, a public repo that proves you can do both (modern React and Salesforce deploy) is a strong signal.

**Repo:** https://github.com/fizzy2562/hosted-cv-salesforce  
**Community:** https://www.consultantcloud.io
