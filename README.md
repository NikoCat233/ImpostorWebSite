# ImpostorWebSite

React + Vite website for NikoCat233's Impostor server.

## Introduction

This repository contains the bilingual installation guide for NikoCat233's Among Us custom region.

## Access

Open [au.niko233.top](https://au.niko233.top/). The page automatically chooses Chinese for Chinese-language browsers, and visitors can switch languages at any time.

## Donation

We need to cover the fees for our servers. Support us at our ko-fi!
[ko-fi](https://ko-fi.com/nikocat233)

## Sponsors

I promise the money here will be all put into running the server & buying the domains.

SpicyPoops (50 usd)
瑞 (1 usd)

## Author

- Name: NikoCat233

## Development

This site is built with React and Vite.

```bash
npm install
npm run dev
```

For a production build, run:

```bash
npm ci
npm run build
```

The build output is written to `dist/`. Vite also copies the files in `public/`, including `policy.html` and `_redirects`, into that directory.

## Deployment

The repository contains configuration for both Netlify and Vercel. Both platforms use `npm run build` and publish `dist/`.

### Netlify

Create a Netlify site from this GitHub repository. Netlify reads the checked-in `netlify.toml` automatically:

- Build command: `npm run build`
- Publish directory: `dist`
- Node version: `20`

After the repository is connected, every push to the configured production branch triggers a fresh build and deploy.

### Vercel

Import this repository as a Vercel project. The checked-in `vercel.json` declares the build command and output directory, so no additional build settings are required.

The routing rules keep these existing entry points available:

| Path | Behavior |
| --- | --- |
| `/discord` | Permanent redirect to the Discord invite |
| `/qq` | Permanent redirect to the QQ group |
| `/policy` | Internal rewrite to `policy.html` |
| Any other path | Internal rewrite to `index.html` for the React SPA |

The Netlify and Vercel rules preserve the browser-visible path for the two internal rewrites. The external destinations are kept in the deployment files so they work on direct requests as well as links from the site.

After deploying, verify `/`, `/policy`, `/discord`, `/qq`, and a client-side route directly from a fresh browser request. The two external routes should redirect, `/policy` should render without changing its URL, and an unknown SPA route should render the React entry page.

See the platform documentation for [Netlify redirects and rewrites](https://docs.netlify.com/manage/routing/redirects/overview/) and [Vite on Vercel](https://vercel.com/docs/frameworks/frontend/vite) for the underlying routing behavior.
### Local preview and routing checks

`npm run dev` and `npm run preview` serve the frontend; they do not emulate Netlify or Vercel external redirects. Validate `/discord` and `/qq` on a platform preview deployment. Keep their destinations synchronized in `netlify.toml`, `public/_redirects`, and `vercel.json`.

Existing static files take precedence over the SPA fallback. Check `/policy.html`, `/regioninfo.json`, `/Setup_Custom_Server.bat`, `/mobile_guide.webm`, and the generated `/assets/` files after deployment: each must return its original content, not the homepage HTML.

The homepage uses local fonts and an original SVG illustration (`public/crew-window.svg`). Installation instructions, language switching, mobile deep links, and community contacts work without an additional UI library. Server counts show an unavailable state if no server responds within eight seconds.
