---
title: Applicable Models
description: Official OpenAI model IDs mapped to published compatibility IDs.
---

This list is based on the official [OpenAI latest model guide](https://developers.openai.com/api/docs/guides/latest-model) and should be refreshed before each public model update.

| Official model ID | Published model ID | Use when |
| --- | --- | --- |
| [`gpt-5.5`](/openai/models/gpt-5-5/) | `pa/gpt-5.5` | You need the current default for complex workflows, reasoning-heavy support answers, tool-heavy agents, or long-context review. |
| `gpt-5.4-mini` | `pa/gpt-5.4-mini` | You need lower latency or cost for lighter support and routing tasks. |
| `gpt-5.4-nano` | `pa/gpt-5.4-nano` | You need the smallest option for simple classification, formatting, or short extraction tasks. |

## Mapping rule

Add `pa/` to the front of the official OpenAI model ID. Do not add routing suffixes or provider names in this public documentation.

## Publishing checklist

- Confirm the official model ID from OpenAI documentation.
- Add the `pa/` mapped ID to this table.
- Add or update a dedicated model FAQ page.
- Run a smoke test against the newest mapped model.
