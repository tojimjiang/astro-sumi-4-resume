# astro-sumi-4-resume

A resume-first personal site based on [Sumi](https://github.com/kpab/astro-sumi), with a simple homepage, a JSON-driven resume, a generated PDF download, and an optional blog.

The upstream MIT license and copyright notice are retained. This derivative adds a resume data model, print layout, optional click-to-reveal email, a PDF build step, and GitHub Pages deployment.

## Quick start

Requires Node.js **22.12+** (Node 24 recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:4321.

## Make it yours

1. Edit `src/config.ts`: site URL, name, headline, description, metadata, and optional social links.
2. Edit `src/data/resume.json`: summary, experience, education, skills, and public profile links. Replace every example entry.
3. Run `npm run check && npm run build`.
4. For a local downloadable PDF, install Chrome/Chromium and run `npm run build:pdf` after the build. During development, use **Print / Save PDF** on the resume page.

The GitHub Actions workflow installs Chrome, builds the site, checks for accidental personal details, generates `dist/resume.pdf`, and publishes the site. The **Download PDF** link is available on the deployed resume page.

The example resume content is intentionally fictional. Replace it before publishing.

## Optional blog

The blog is off the main navigation by default. To enable the Notebook CTA, set `BLOG.enabled` to `true` in `src/config.ts` and add a Notebook link to `NAV`. Put Markdown/MDX posts in `src/content/blog/`. Blog routes, tags, RSS, and social-image generation are retained from Sumi.

## Optional email unlock

No contact page is included. The homepage email unlock only renders when `EMAIL_ADDRESS` is set at build time.

- **Local:** put `EMAIL_ADDRESS=you@example.com` in an untracked `.env` file. Never commit it.
- **GitHub Actions:** open **Repository → Settings → Secrets and variables → Actions → New repository secret**, name it `EMAIL_ADDRESS`, and set the value. The included workflow passes the secret to the build.

The UI starts with a blurred fake placeholder; clicking **Unlock email** reveals the address, and a separate **Compose email** action opens `mailto:`. The address is XOR-obfuscated into the generated page instead of appearing as plaintext in the HTML. This is **scrape friction, not security**: the public decoder and payload can be recovered by a determined scraper. A GitHub secret protects the source repository and build configuration, not the deployed website after the address is rendered.

If you do not want the address recoverable from the public site, do not publish it; use a profile link or a server-backed contact provider instead.

## GitHub Pages

1. Push this repository to GitHub.
2. In **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions**.
3. In `src/config.ts`, set `SITE.url` to your final origin. For a user site, this is typically `https://USERNAME.github.io`; for a custom domain, use that domain.
4. For a project site (URL includes `/REPOSITORY`), set repository variable `ASTRO_BASE_PATH` to `/REPOSITORY`. Leave it empty for a user site or custom domain.
5. Push to `main`. The workflow runs type checks, builds and validates the site, generates the resume PDF, then deploys `dist/` to Pages. No personal access token or second publishing repository is required.

The workflow uses the built-in `GITHUB_TOKEN` with minimum Pages deployment permissions. Configure the custom domain in GitHub Pages and DNS if you use one. Pull requests run validation but do not deploy.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run check` | Astro/TypeScript checks |
| `npm run build` | Production site build |
| `npm run check:starter` | Validate built output and email payload |
| `npm run build:pdf` | Generate `dist/resume.pdf` using Chrome/Chromium |
| `npm run preview` | Preview the production build |

## Credits

- Original theme: [kpab/astro-sumi](https://github.com/kpab/astro-sumi), MIT.
- Fonts, syntax themes, and rendering libraries retain their respective upstream licenses; see their bundled license files and package metadata.
