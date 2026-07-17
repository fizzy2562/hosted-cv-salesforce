# Hosted CV on Salesforce Multi-Framework

Fork this repo, replace the CV content, and publish a recruiter facing React CV on **Experience Cloud** with [Salesforce Multi-Framework](https://developer.salesforce.com/blogs/2026/07/build-with-react-on-salesforce-multi-framework-is-now-ga) (GA).

**Live examples**

| Host | URL |
| --- | --- |
| Vercel (production brand site) | https://ciaran-fitzgerald.com/ |
| Salesforce Dev Edition | https://d0y000002jj75uae-dev-ed.my.site.com/hostedcvsalesforce/ |

---

## Host your own CV (start here)

**Full walkthrough:** [docs/HOST_YOUR_OWN_CV.md](docs/HOST_YOUR_OWN_CV.md)

Short version:

1. **Fork** this repository on GitHub
2. Edit `force-app/main/default/webapplications/hostedcvsalesforce/src/data/default-cv.ts` with your details
3. Replace images in `.../src/assets/cv/` (`profile.png`, optional banners)
4. Preview: `cd force-app/main/default/webapplications/hostedcvsalesforce && npm install && npm run dev`
5. Build for Salesforce: `./scripts/build-and-sync-bundle.sh`
6. Deploy the UIBundle + Experience Cloud metadata to your org (see guide)

Want a custom domain and an admin editor without Salesforce? Use the sister project: [fizzy2562/hosted-cv](https://github.com/fizzy2562/hosted-cv) on Vercel.

---

## What you get

- Immersive Consultant Cloud themed CV landing page
- Certification showcase with earn dates
- Client side PDF download (with or without email)
- Static CV content in one TypeScript file (easy to start; Custom Metadata later if you want)

## Architecture note

| Folder | Role |
| --- | --- |
| `webapplications/hostedcvsalesforce/` | React source (edit here, `npm run dev` / `npm run build`) |
| `uiBundles/hostedcvsalesforce/` | What Salesforce deploys (GA `UIBundle` + `dist/`) |
| `digitalExperiences/`, `networks/`, `sites/` | Experience Cloud site that hosts the React app |

`./scripts/build-and-sync-bundle.sh` builds the React app and copies `dist/` into the UIBundle.

## Scratch org

```bash
sf org create scratch \
  --definition-file config/project-scratch-def.json \
  --alias my-cv-scratch \
  --set-default \
  --duration-days 30 \
  --target-dev-hub YOUR_DEVHUB
```

The scratch def enables Communities and sets `language: en_US` (required for Multi-Framework).

## Blog / community

See [docs/BLOG_DRAFT.md](docs/BLOG_DRAFT.md) for a Consultant Cloud post outline.

## Related links

- Guide: [Host your own CV](docs/HOST_YOUR_OWN_CV.md)
- Consultant Cloud: https://www.consultantcloud.io
- Multi-Framework GA: https://developer.salesforce.com/blogs/2026/07/build-with-react-on-salesforce-multi-framework-is-now-ga
- Vercel version: https://github.com/fizzy2562/hosted-cv

## License

MIT
