---
title: Applicable Models
description: Official OpenAI model IDs for examples and FAQs.
---

This list is based on the official [OpenAI latest model guide](https://developers.openai.com/api/docs/guides/latest-model) and should be refreshed before each public model update.

| Model ID | Use when |
| --- | --- |
| [`gpt-5.5`](./gpt-5-5/) | You need the current default for complex workflows, reasoning-heavy support answers, tool-heavy agents, or long-context review. |
| `gpt-5.4-mini` | You need lower latency or cost for lighter support and routing tasks. |
| `gpt-5.4-nano` | You need the smallest option for simple classification, formatting, or short extraction tasks. |

## Naming rule

Use official OpenAI model IDs by default. Do not add service names, routing suffixes, or experimental suffixes in this public documentation.

## Publishing checklist

- Confirm the official model ID from OpenAI documentation.
- Add the model ID to this table.
- Add or update a dedicated model FAQ page.
- Run the curl example check against the newest model.
