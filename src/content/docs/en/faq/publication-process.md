---
title: How does a document get published?
description: A short FAQ for the editorial workflow from draft to public site.
category: FAQ
reviewStatus: Draft
lastReviewed: 2026-06-14
---

Documents are published through a review workflow.

## Steps

1. A writer creates a draft.
2. GitHub opens a pull request.
3. GitHub Actions checks sensitive terms and builds the site.
4. A reviewer approves the change.
5. The pull request is merged to `main`.
6. GitHub Actions deploys the site to GitHub Pages.

## Why this process exists

The review step prevents accidental publication of internal terms, customer-specific details, unsupported claims, and broken pages.
