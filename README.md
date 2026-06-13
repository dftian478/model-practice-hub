# Model Practice Hub

Neutral documentation site for applied AI model best practices, FAQs, and troubleshooting notes.

## Local development

```sh
npm install
npm run dev
```

## Checks

```sh
npm run check
```

The content policy check scans docs and CMS configuration for blocked terms listed in `content-policy/sensitive-terms.txt`.

## CMS setup

The Decap CMS admin UI is available at `/admin/` after the site is running.

Before using it with GitHub, update `public/admin/config.yml`:

- `backend.repo`
- `site_url`
- `display_url`

The current config uses `publish_mode: editorial_workflow` so writers can draft and review content before publication.

## Writer workflow

See `docs/author-guide.md`.

GitHub alone is enough for the first version:

- Writers edit Markdown files in GitHub.
- GitHub creates pull requests.
- GitHub Actions checks content and builds the site.
- Reviewers merge approved changes.
- GitHub Pages deploys the public site.

The `/admin/` CMS is included, but GitHub login for Decap CMS requires an OAuth/identity layer such as Netlify Identity/Git Gateway or a small self-hosted GitHub OAuth backend.

## Platform design

See `docs/platform-design.md`.
