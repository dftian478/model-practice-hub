---
title: What is a context window?
description: A practical FAQ explaining context windows for support conversations.
category: FAQ
reviewStatus: Draft
lastReviewed: 2026-06-14
---

A context window is the amount of information a model can consider at one time. It usually includes the current prompt, conversation history, retrieved documents, tool results, and the model response.

## Why it matters

If the useful information is missing, too long, or buried inside unrelated text, the model may produce an incomplete answer.

## Practical guidance

- Put the most important facts near the task.
- Remove unrelated history.
- Split large documents into focused sections.
- Ask for citations to confirm which source text was used.

## Common misconception

A larger context window does not automatically mean better answers. Source quality, structure, and task clarity still matter.
