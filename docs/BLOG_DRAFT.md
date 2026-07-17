# Blog draft: I rebuilt my CV on Salesforce Multi-Framework

**Audience:** Consultant Cloud learners and Salesforce professionals exploring React on Experience Cloud.

**Suggested title:** From Vercel to Experience Cloud: hosting a consultant CV with Salesforce Multi-Framework

**Suggested CTA:** Clone the repo, deploy to a sandbox, and adapt the pattern for your own portfolio or client microsites.

---

## Hook

When Salesforce announced that [Multi-Framework is now GA](https://developer.salesforce.com/blogs/2026/07/build-with-react-on-salesforce-multi-framework-is-now-ga), I had a real project ready to test it: my hosted CV at [ciaran-fitzgerald.com](https://ciaran-fitzgerald.com/).

I originally built it on Next.js and Vercel for speed, a custom domain, and a simple admin flow. That still makes sense for day to day edits. But I also wanted a **public Salesforce reference implementation** our Consultant Cloud community could learn from and reuse.

So I ported the same React UI into a Salesforce DX project and open sourced it.

## The problem Multi-Framework solves for consultants

For years, polished marketing and portfolio sites on Salesforce meant LWC on LWR, Aura, or heavy Experience Cloud configuration. If you already think in React, npm, and Vite, that context switch hurts.

Multi-Framework lets you:

- Build with **React + Vite + Tailwind**, the same stack many teams already use
- Deploy to **Experience Cloud** for external, recruiter facing sites
- Keep metadata and frontend in one DX project

For consultants, that is a credible answer when a client asks: *"Can we host this on Salesforce instead of another platform?"*

## What I ported

From the Vercel app I kept:

1. **The immersive web CV** (certifications, skills, timeline, Consultant Cloud branding)
2. **PDF export** using html2canvas + jsPDF (with a print layout that avoids Tailwind oklab colours)
3. **Static content** in TypeScript for v1 (no Apex required to get started)

What stayed on Vercel for now:

- Password protected **admin editing**
- **Vercel Blob** persistence
- Custom domain at ciaran-fitzgerald.com

That split is intentional: production portfolio on Vercel, Salesforce sample for the ecosystem.

## How the Salesforce project is structured

I scaffolded with the CLI:

```bash
sf template generate project --name hosted-cv-salesforce --template reactb2x
```

The React app lives under:

`force-app/main/default/webapplications/hostedcvsalesforce/`

Companion Experience Cloud metadata ships alongside it (`digitalExperiences`, `networks`, `sites`), which is the important difference from an internal employee app template.

## Local dev workflow

```bash
cd force-app/main/default/webapplications/hostedcvsalesforce
npm install
npm run dev
```

You get the same fast Vite loop you expect from any React project. When you are ready:

```bash
npm run build
sf project deploy start --source-dir force-app --target-org my-sandbox
```

## Lessons from the port

### 1. PDF capture still needs a plain CSS print layout

Tailwind v4 uses oklab colours that html2canvas cannot parse. The fix (on both Vercel and Salesforce) is a dedicated print component with inline hex/rgb styles only.

### 2. Two repos, two jobs

- **hosted-cv** (Vercel): live site, admin, domain
- **hosted-cv-salesforce** (this repo): teaching, deploy to Experience Cloud, promote to the community

### 3. Great sample app for Consultant Cloud

This is a small, complete, visually polished app. It is more approachable than enterprise sample data models, but still shows real Multi-Framework metadata and deploy steps.

## Try it yourself

1. Clone [github.com/fizzy2562/hosted-cv-salesforce](https://github.com/fizzy2562/hosted-cv-salesforce) (update URL after publish)
2. Deploy to a sandbox
3. Swap in your `default-cv.ts` content and assets
4. Publish your Experience Cloud site

## What is next

Possible extensions for a follow up post:

- Store CV sections in **Custom Metadata** or Custom Objects
- Add an authenticated admin route using the template auth shell
- Wire certification dates from a **Trailhead API** or manual CMS records
- Compare Lighthouse scores: LWR vs React Multi-Framework

## Closing

Multi-Framework GA does not replace every Vercel or Netlify site. It does give Salesforce professionals a legitimate path to ship React experiences on platform, with Experience Cloud as the host.

If you are studying for certs or building your consulting brand, having a repo that proves you can do both (modern React and Salesforce deploy) is a strong signal to recruiters and clients.

**Repo:** hosted-cv-salesforce  
**Live reference:** https://ciaran-fitzgerald.com/  
**Community:** https://www.consultantcloud.io
