# Author Guide

This guide explains how support writers can publish content.

## Recommended publishing flow

1. Create or edit a document.
2. Save it as a draft branch or pull request.
3. Wait for GitHub Actions to run content checks and build checks.
4. Ask a reviewer to approve the pull request.
5. Merge to `main`.
6. GitHub Actions deploys the public site.

## Option 1: GitHub web editor

This option does not need a separate server.

Writers can open files under `src/content/docs/` in GitHub, click edit, and propose changes. GitHub creates a pull request, and Actions verifies the content before merge.

Best for:

- Technical support writers who can handle light Markdown.
- Teams that want the simplest infrastructure.
- Early-stage operation before CMS login is configured.

## Option 2: Decap CMS at `/admin/`

This option gives writers a simpler web editor, but it needs GitHub authentication support.

The static `/admin/` page is already included in this project. The missing production piece is authentication. Decap CMS with GitHub needs one of these:

- Netlify Identity + Git Gateway.
- A small self-hosted GitHub OAuth backend.
- A hosted Decap-compatible OAuth service.

Best for:

- Non-technical writers.
- Structured document templates.
- Editorial workflow in a friendlier UI.

## Do we need a server?

For the public docs site: no. Astro builds static files, and GitHub Pages can host them.

For writers using only GitHub: no. GitHub handles editing, pull requests, reviews, Actions, and Pages deployment.

For writers using Decap CMS with GitHub login: usually yes, but only for authentication. It can be a tiny OAuth service, not a full application server. If using Netlify Identity/Git Gateway, Netlify provides that layer.

## Content file format

Each document starts with frontmatter:

```md
---
title: Example FAQ
description: Short description for search results.
category: FAQ
reviewStatus: Draft
lastReviewed: 2026-06-14
---

Document body goes here.
```

## Where to add files

- Best practices: `src/content/docs/best-practices/`
- FAQ: `src/content/docs/faq/`
- Troubleshooting: `src/content/docs/troubleshooting/`
- Policies and overview pages: `src/content/docs/`

## Review rules

- Keep wording neutral.
- Generalize customer-specific details.
- Link factual model behavior to official docs when practical.
- Add sensitive terms to `content-policy/sensitive-terms.txt`.
- Run `npm run check` before merging when editing locally.
