# Niko's Impostor Server

Bilingual single-page Angular 21 site for Niko's Impostor Server. It contains desktop, mobile, and console installation guidance, server status, player rules, and community contacts.

## Access and language

Visit [au.niko233.top](https://au.niko233.top/). The site selects Chinese when the browser's preferred language is Chinese, otherwise English. Visitors can switch languages; the choice is saved in browser storage. Chinese prioritizes QQ and English prioritizes Discord. Light/dark appearance initially follows the system preference; the header toggle saves an explicit choice. The initial palette is applied before Angular starts to avoid a theme flash.

## Development

Use Node.js `>=24.0.0 <25` and npm. Install dependencies and start the Angular development server:

```bash
npm ci
npm run dev
```

Create a production build with:

```bash
npm run build
```

This is a static client-rendered Angular application with no server-side rendering. The build writes directly to `dist/`, including the files copied from `public/`. `npm run preview` serves the production build locally and applies the site's redirect rules through `scripts/preview.mjs`.

Run `npm test` after building to verify language detection, installation payloads, policy sections, redirects, and the actual built static assets. The preview defaults to `http://127.0.0.1:4173` and supports video range requests.

The standalone components are in `src/app/`: the page shell and installation guide, the policy reader, and reusable icons. Translations, language preferences, region data, and live status fetching are separate modules. Full English and Chinese policy text lives in `src/app/policy-data.json`; policy and contact are sections of the homepage.

## Deployment

Netlify and Vercel both run `npm run build` and publish `dist/`. The Node engine range in `package.json` selects Node 24; Netlify pins Node `24.14.1` in `netlify.toml`. Netlify routing is defined in `public/_redirects`, which is copied into `dist/` for both Git deployments and manual static uploads. `vercel.json` mirrors the redirects and configures a static output with framework detection disabled.

| Request path | Behavior |
| --- | --- |
| `/discord` | Permanent redirect to the Discord invite |
| `/qq` | Permanent redirect to the QQ group |
| `/policy`, `/policy/`, `/policy.html`, `/policy.html/` | Permanent redirect to `/#policy` |
| `/contact`, `/contact/`, `/contact.html`, `/contact.html/` | Permanent redirect to `/#contact` |
| Other paths | Serve the Angular SPA entry point; existing static files keep their content |

Installation files and media such as `/regioninfo.json`, `/Setup_Custom_Server.bat`, `/at.duikbo.regioninstall.cfg`, `/mobile_guide.webm`, and `/assets/` are served from `public/` and copied into the build output. After deployment, confirm the routes above and these static files from a fresh request.
