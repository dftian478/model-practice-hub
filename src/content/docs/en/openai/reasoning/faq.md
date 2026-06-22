---
title: Reasoning FAQ
description: Short answers for GPT reasoning support questions.
---

## When should I use reasoning?

Use it for tasks that need comparison, planning, multi-step troubleshooting, or tool orchestration. For simple rewriting or classification, start with lower effort or a smaller model.

## What effort should I start with?

For `gpt-5.5`, start with `medium`. Try `low` for latency-sensitive tasks and increase only when evaluation shows better answers.

## Why did the answer get cut off?

The output budget may be too small. Reasoning work can consume part of `max_output_tokens` before the visible answer is complete.

## Can I show reasoning to end users?

Show concise summaries or rationales when useful. Do not claim to expose hidden chain-of-thought.

## Should FAQ articles include reasoning settings?

Only when the setting matters. General FAQ answers can use basic examples; complex troubleshooting pages should include the reasoning configuration and the reason it was chosen.

## Which official docs should be linked?

Use the [OpenAI reasoning guide](https://developers.openai.com/api/docs/guides/reasoning), [reasoning best practices](https://developers.openai.com/api/docs/guides/reasoning-best-practices), and [latest model guide](https://developers.openai.com/api/docs/guides/latest-model).
