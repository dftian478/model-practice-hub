---
title: FAQ
description: Common questions for OpenAI-compatible docs, model selection, and reasoning examples.
---

## Which model name should examples use?

Use official OpenAI model IDs by default. For example, `gpt-5.5`. If a compatible endpoint requires a different name, readers should only replace `MODEL_NAME`.

## Should examples include a real API domain?

No. Use `OPENAI_BASE_URL` and a placeholder such as `https://api.example.com/v1`. Readers replace it with their own compatible endpoint.

## Can readers call OpenAI directly with these examples?

Yes, if `OPENAI_BASE_URL` points to OpenAI's official `/v1` endpoint and the reader uses a valid OpenAI API key. For other compatible endpoints, readers should fill in their own domain and key.

## Why use the Responses API?

It supports the reasoning-oriented examples in this guide, including reasoning configuration, structured output, tool use, and multi-turn state patterns.

## Do reasoning summaries expose hidden reasoning?

No. Treat summaries as model-provided explanations or progress notes, not as raw hidden reasoning. Do not promise access to hidden chain-of-thought.

## How should new model pages be added?

Refresh the official OpenAI model source, add the official ID to the model list, then add a dedicated model FAQ page.
