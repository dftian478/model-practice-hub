---
title: FAQ
description: Common questions for OpenAI-compatible docs, model mapping, and reasoning examples.
---

## Which model name should examples use?

Use `pa/<official-model-id>`. For example, OpenAI's `gpt-5.5` becomes `pa/gpt-5.5`.

## Should examples include a real API domain?

No. Use `OPENAI_BASE_URL` and a placeholder such as `https://api.example.com/v1`. Readers replace it with their own compatible endpoint.

## Can a reader call OpenAI directly with `pa/gpt-5.5`?

No. The `pa/` prefix is for this compatibility layer. Direct OpenAI calls should use official OpenAI model IDs.

## Why use the Responses API?

It supports the reasoning-oriented examples in this guide, including reasoning configuration, structured output, tool use, and multi-turn state patterns.

## Do reasoning summaries expose hidden reasoning?

No. Treat summaries as model-provided explanations or progress notes, not as raw hidden reasoning. Do not promise access to hidden chain-of-thought.

## How should new model pages be added?

Refresh the official OpenAI model source, add the official ID to the model list, map it to `pa/<official-id>`, then add a dedicated model FAQ page.
