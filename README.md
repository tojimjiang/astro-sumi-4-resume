# astro-sumi-4-resume

A resume-first personal site based on [Sumi](https://github.com/kpab/astro-sumi), with a print-friendly resume, a simple homepage, and an optional blog.

The upstream MIT license and copyright notice are retained. This derivative adds a resume data model, print layout, optional click-to-reveal email, and a GitHub Pages deployment workflow.

## Quick start

Requires Node.js **22.12+** (Node 22 or 24 recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:4321.

## Make it yours

1. Edit `src/config.ts`: site URL, name, headline, description, and metadata.
2. Edit `src/data/resume.json`: contact links, summary, experience, education, and skills. Replace every example entry.
3. Run `npm run check && npm run build`.
4. Visit `/resume/` and use **Print / Save PDF**. Browser print output is the default PDF generator; no personal PDF or external service is required.

The example resume content is intentionally fictional. Replace it before publishing.

## Optional blog

The blog is off the main navigation by default. To enable it, set `BLOG.enabled` to `true` in `src/config.ts` and add a Notebook link to `NAV`. Put Markdown/MDX posts in `src/content/blog/`. Blog routes, tags, RSS, and social-image generation are retained from Sumi.

## Optional email unlock

No contact page is included. The homepage has a small email unlock component that only renders when `EMAIL_ADDRESS` is set at build time.

- **Local:** put `EMAIL_ADDRESS=you@example.com` in an untracked `.env` file. Never commit it.
- **GitHub Actions:** open **Repository → Settings → Secrets and variables → Actions → New repository secret**, name it `EMAIL_ADDRESS`, and set the value. The included workflow passes this secret to the build.

The UI starts with a blurred fake placeholder; a deliberate click reveals the address, and a separate click opens `mailto:`. The address is XOR-obfuscated into the generated page instead of appearing as plaintext in source files. This is **scrape friction, not security**: the public decoder and payload can be recovered by a determined scraper. A GitHub secret protects the source repository and build configuration, not the deployed website after the address is rendered.

If you do not want the address recoverable from the public site, do not publish it; use a profile link or a server-backed contact provider instead.

## GitHub Pages

1. Push this repository to GitHub.
2. In **Settings → Pages**, set **Build and deployment → Source** to **GitHub Actions**.
3. In `src/config.ts`, set `SITE.url` to your final origin. For a user site, this is typically `https://USERNAME.github.io`; for a custom domain, use that domain.
4. For a project site (URL includes `/REPOSITORY`), set repository variable `ASTRO_BASE_PATH` to `/REPOSITORY`. Leave it empty for a user site or custom domain.
5. Push to `main`. The workflow runs type checks and a production build, then deploys `dist/` to Pages. No personal access token or second publishing repository is required.

The workflow uses the built-in `GITHUB_TOKEN` with minimum Pages deployment permissions. Configure the custom domain in GitHub Pages and DNS if you use one.

## Commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Local development |
| `npm run check` | Astro/TypeScript checks |
| `npm run build` | Production build |
| `npm run preview` | Preview the production build |

## Credits

- Original theme: [kpab/astro-sumi](https://github.com/kpab/astro-sumi), MIT.
- Fonts, syntax themes, and rendering libraries retain their respective upstream licenses; see their bundled license files and package metadata.
