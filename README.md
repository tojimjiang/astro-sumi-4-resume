# astro-sumi-4-resume

A resume-first personal site based on [Sumi](https://github.com/kpab/astro-sumi), with a simple homepage, a JSON-driven resume, a generated PDF download, and an optional blog.

The upstream MIT license and copyright notice are retained. This derivative adds a resume data model, print layout, optional click-to-reveal email, a PDF build step, and GitHub Pages deployment.

> **New here? Start with the [Quickstart](QUICKSTART.md).** It walks you from local setup to a published site.

## Customize the starter

The example resume content is fictional; replace it before publishing. Site identity and metadata live in `src/config.ts`, while resume content lives in `src/data/resume.json`. The workflow checks, builds, generates `dist/resume.pdf`, and publishes the site. See the [Quickstart](QUICKSTART.md) for the setup and deployment walkthrough.

### Cursive favicon

The production build generates `dist/favicon.svg` from `AUTHOR.favicon` in `src/config.ts`, next to the author's name. Change `"YN"` to your initials or another short mark; one to three characters work best. The build uses the Dancing Script cursive font and converts glyphs into SVG paths, so the favicon does not depend on fonts installed in the browser. The font is fetched during generation. The generated file replaces the starter favicon in the build output, while the source asset remains untouched.

## Optional blog

The blog is optional and disabled by default. To enable it, set `BLOG.enabled` to `true` in `src/config.ts` and add a Blog link to `NAV`. The homepage's secondary **Read blog** CTA is enabled by default when the blog is enabled; set `BLOG.showHomeCta` to `false` to hide it. Put Markdown/MDX posts in `src/content/blog/`. Blog routes, tags, RSS, and social-image generation are retained from Sumi.

## Email unlock and private source / public output

**Recommended for a personal email address:** keep this source repository **private**, and publish only the generated static output to a separate **public** repository. The source code, resume data, EMAIL_ADDRESS secret, and publishing token stay in the private source repo. GitHub Actions builds there and pushes only the contents of dist/ to the public distribution repo.

This protects your source configuration; it does **not** make an email address embedded in a public website secret. The generated payload and public decoder can be recovered by a determined scraper. Obfuscation is scrape friction, not security. If the address must not be recoverable, do not publish it; use a profile link or server-backed contact provider.

### Configure the email secret

In the **private source repository**, open **Settings → Secrets and variables → Actions → New repository secret**:

- Name: **EMAIL_ADDRESS**
- Value: the address to reveal

Never put the real address in src/config.ts, resume.json, a committed .env file, or the public distribution repository. For local development, put EMAIL_ADDRESS=you@example.com in an untracked .env file.

The homepage starts with a blurred fake placeholder. Clicking **Unlock email** reveals the address; a separate **Compose email** action opens mailto:. The address is split into independently obfuscated segments in the generated HTML, adding friction for simple scrapers without pretending to provide security. The workflow also builds a fixture version using ci-test@example.invalid so the email path is tested without needing the real address.

### Configure the public distribution repository

1. Create a **separate public repository** dedicated to generated website output, for example your-name/your-name.github.io or your-name/site-public.
2. Treat the destination as generated output only. The workflow syncs dist/ into its root and deletes stale files. Do not use a repository containing hand-maintained files you want to keep.
3. In the **private source repository**, add an Actions repository variable named **PUBLIC_REPO** with the value OWNER/REPOSITORY, for example your-name/site-public.
4. Create a fine-grained personal access token in GitHub under **Settings → Developer settings → Personal access tokens → Fine-grained tokens**. Limit repository access to that one public destination repository and grant **Contents: Read and write**. The workflow does not need Actions permission on the destination.
5. In the **private source repository**, add an Actions repository secret named **PUBLISH_TOKEN** and paste the token value there. Never commit the token or put it in a repository variable.
6. In the public destination repository, configure **Settings → Pages → Build and deployment → Deploy from a branch**, choose the published branch (normally main) and folder /(root). Set SITE.url in src/config.ts to the public site origin. For a project site, set ASTRO_BASE_PATH in the private source repo to /REPOSITORY; leave it empty for a user site or custom domain.

Push to main in the private source repo. Pull requests validate but do not publish. On a push or manual run, Actions builds the site privately, then syncs only dist/ to the public repository. The public repository receives the generated website, not your source tree or source workflow.

### What is GITHUB_TOKEN, and why is PUBLISH_TOKEN needed?

GitHub Actions automatically provides a short-lived GITHUB_TOKEN for the repository running the workflow. It is scoped to that repository and its granted permissions, so it generally **cannot push to a different repository**. That is why the split-repository setup uses a separate PUBLISH_TOKEN secret (or a destination-scoped GitHub App installation token) to write to the public output repository.

The workflow keeps the built-in GITHUB_TOKEN read-only for the private source checkout and uses PUBLISH_TOKEN only when checking out and pushing to PUBLIC_REPO. The publishing token is never written into the built site. Prefer a fine-grained token limited to the single destination repo, and revoke or rotate it if exposed.

If PUBLIC_REPO is unset, the workflow falls back to deploying directly from the source repository using GitHub Pages Actions permissions. For the private-source/public-output pattern, set PUBLIC_REPO and PUBLISH_TOKEN in the private source repo.

## GitHub Pages: same-repository fallback

If you do not need a private source/public output split:

1. In the source repository, set **Settings → Pages → Source** to **GitHub Actions**.
2. Leave PUBLIC_REPO unset.
3. Set SITE.url to the site's public origin.
4. For a project site, set ASTRO_BASE_PATH to /REPOSITORY; leave it empty for a user site or custom domain.
5. Push to main. Actions builds and deploys the site directly from the source repository.
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
