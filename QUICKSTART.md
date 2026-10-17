# Quickstart

**astro-sumi-4-resume** is a resume-first Astro starter based on [Sumi](https://github.com/kpab/astro-sumi). It includes a JSON-driven resume, a printable resume page, a generated PDF download, and an optional blog.

Repository: https://github.com/tojimjiang/astro-sumi-4-resume

## 1. Run it locally

Requires Node.js 22.12 or newer (Node 24 recommended).

```sh
git clone https://github.com/tojimjiang/astro-sumi-4-resume.git
cd astro-sumi-4-resume
npm ci
npm run dev
```

Open http://localhost:4321.

## 2. Add your details

- **Site identity and metadata:** edit `src/config.ts` (name, site URL, headline, description, and social links).
- **Resume content:** edit `src/data/resume.json`. Replace every fictional example with your own information.
- **Email reveal (optional):** configure `EMAIL_ADDRESS` as an environment variable locally or a GitHub Actions secret when deploying. Do not commit your real address in source files.
- **Blog (optional):** enable `BLOG.enabled` and add a Notebook link in `NAV` in `src/config.ts`, then add posts under `src/content/blog/`.

Check and build before publishing:

```sh
npm run check
npm run build
```

The resume page includes **Print / Save PDF** in the browser. To generate the downloadable `dist/resume.pdf` locally, install Chrome/Chromium and run:

```sh
npm run build:pdf
```

## 3. Publish with GitHub Pages

Choose one deployment model:

### Option A — simplest: one public repository

1. Push your customized starter to a GitHub repository.
2. In that repository, open **Settings → Pages** and set the source to **GitHub Actions**.
3. Set `SITE.url` in `src/config.ts` to the public site origin.
4. For a project site such as `https://username.github.io/repo/`, add the repository variable `ASTRO_BASE_PATH=/repo`. For `username.github.io` or a custom domain, leave it empty.
5. Push to `main`. Actions checks, builds, bakes the PDF, and deploys the site.

This option makes the source repository public, so do not store private information in it.

### Option B — private source, public website output

Use this if you want your source and resume data kept in a private repository while publishing the generated website publicly.

1. Create a separate **public, output-only** repository for the site. The workflow syncs `dist/` to its root and deletes stale files; don't keep hand-maintained files there.
2. In the private source repository, add the Actions variable `PUBLIC_REPO` with value `OWNER/REPOSITORY`.
3. Create a fine-grained personal access token scoped only to that destination repository, with **Contents: Read and write** permission. Save it as the private source repository's Actions secret `PUBLISH_TOKEN`.
4. If using email reveal, add the Actions secret `EMAIL_ADDRESS` to the private source repository.
5. Configure Pages in the public destination repository to **Deploy from a branch**, selecting the published branch (normally `main`) and folder `/(root)`.
6. Set `SITE.url` in `src/config.ts` and, for a project site, the `ASTRO_BASE_PATH` repository variable as described above. Push to `main`.

The source workflow builds the website and PDF privately, then publishes only generated files. Pull requests validate but do not publish.

**Email caveat:** click-to-reveal and split obfuscation add friction for simple scrapers; they are not security. A public website's email payload can still be recovered by a determined person. If the address must remain private, do not publish it.

## Useful commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the local development server |
| `npm run check` | Run Astro and TypeScript checks |
| `npm run build` | Build the static site |
| `npm run check:starter` | Validate generated output |
| `npm run build:pdf` | Generate `dist/resume.pdf` with Chrome/Chromium |
| `npm run preview` | Preview the production build |

For full configuration details and troubleshooting, see [README.md](README.md).
