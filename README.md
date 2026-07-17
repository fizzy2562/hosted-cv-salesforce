# Hosted CV on Salesforce Multi-Framework

A public, recruiter facing CV built with **React**, **Vite**, and **Tailwind CSS**, packaged as a Salesforce **Web Application** for **Experience Cloud**. This repo is the Salesforce port of the live site at [ciaran-fitzgerald.com](https://ciaran-fitzgerald.com/).

Built to showcase [Salesforce Multi-Framework](https://developer.salesforce.com/blogs/2026/07/build-with-react-on-salesforce-multi-framework-is-now-ga) now that React on Experience Cloud is generally available.

## What this is

| Layer | Stack |
| --- | --- |
| Frontend | React 19, Vite 7, Tailwind 4 |
| Platform | Salesforce Web Application (`reactb2x` template) |
| Hosting (production) | Experience Cloud site on Salesforce |
| Reference deployment | [ciaran-fitzgerald.com](https://ciaran-fitzgerald.com/) on Vercel |

Features ported from the Vercel app:

- Immersive Consultant Cloud themed CV landing page
- Certification showcase with earn dates
- Client side PDF download (with or without email)
- Static CV content in TypeScript (easy to extend to Custom Metadata or Apex later)

## Project structure

```
force-app/main/default/
  webapplications/hostedcvsalesforce/   # React app (Vite)
  digitalExperiences/                 # Experience Cloud site
  digitalExperienceConfigs/
  networks/
  sites/
```

The Vercel version remains in [fizzy2562/hosted-cv](https://github.com/fizzy2562/hosted-cv) for fast iteration, custom domain, and admin editing via Vercel Blob.

## Local development

```bash
cd force-app/main/default/webapplications/hostedcvsalesforce
npm install
npm run dev
```

Open http://localhost:5173

## Build

```bash
cd force-app/main/default/webapplications/hostedcvsalesforce
npm run build
```

## Deploy to Salesforce

Requires a sandbox or production org with Multi-Framework enabled.

```bash
cd force-app/main/default/webapplications/hostedcvsalesforce
npm install && npm run build
cd ../../../../../../..
sf project deploy start --source-dir force-app --target-org YOUR_ORG_ALIAS
```

After deploy, publish the Experience Cloud site from Setup and map your site URL.

## Blog and promotion

See [docs/BLOG_DRAFT.md](docs/BLOG_DRAFT.md) for a Consultant Cloud blog outline you can adapt for your audience.

## Related links

- Live CV: https://ciaran-fitzgerald.com/
- Consultant Cloud: https://www.consultantcloud.io
- Multi-Framework GA announcement: https://developer.salesforce.com/blogs/2026/07/build-with-react-on-salesforce-multi-framework-is-now-ga

## License

MIT
