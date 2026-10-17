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
- **Cursive favicon:** in the same file, change `AUTHOR.favicon` (next to `AUTHOR.name`) from `"YN"` to your initials or another short mark. The production build automatically generates `dist/favicon.svg`; one to three characters work best. It uses a cursive font stack and adapts to light/dark mode.
- **Resume content:** edit `src/data/resume.json`. Replace every fictional example with your own information.
- **Email reveal (optional):** configure `EMAIL_ADDRESS` as an environment variable locally or a GitHub Actions secret when deploying. Do not commit your real address in source files.
- **Blog (optional):** enable `BLOG.enabled` and add a Blog link in `NAV` in `src/config.ts`, then add posts under `src/content/blog/`. When enabled, the secondary **Read blog** homepage CTA appears by default; set `BLOG.showHomeCta` to `false` to hide it. The primary CTA remains **View resume**.

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

**Recommended: keep the source repository private and publish the generated site to a separate public repository.** This keeps your source code, resume source data, and deployment configuration out of a public source repo.

1. Create a **private** repository for this starter and push your customized source to it.
2. Create a separate **public, output-only** repository for the website. The workflow syncs `dist/` to its root and deletes stale files; do not keep hand-maintained files there.
3. In the private source repository, open **Settings → Secrets and variables → Actions → Variables** and add `PUBLIC_REPO` with value `OWNER/REPOSITORY` for the public destination.
4. Create a fine-grained personal access token scoped only to that destination repository, with **Contents: Read and write** permission. Save it as the private source repository's Actions secret named `PUBLISH_TOKEN`.
5. If you use email reveal, add `EMAIL_ADDRESS` as an Actions secret in the private source repository. Never commit your real address or publishing token in source files.
6. In the public destination repository, configure **Settings → Pages → Build and deployment → Deploy from a branch**, select the published branch (normally `main`) and folder `/(root)`.
7. Set `SITE.url` in `src/config.ts` to the public site origin. For a project site such as `https://username.github.io/repo/`, set the private source repository variable `ASTRO_BASE_PATH=/repo`; leave it empty for a user site or custom domain.
8. Push to `main` in the private source repository. Actions checks and builds the site, generates the PDF, and publishes only the generated files to the public destination. Pull requests validate but do not publish.

**Important email caveat:** keeping the source private does not make an email address embedded in the public website secret. Click-to-reveal obfuscation is only friction for simple scrapers; a determined person can recover the address from the public output. If the address must not be recoverable, do not publish it—use a profile link or a server-backed contact provider instead.

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
