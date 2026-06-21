---
title: Reasoning Effort
description: How to choose reasoning effort for GPT-5.5 examples.
---

`reasoning.effort` controls how much reasoning work the model can spend before answering. Supported values are model-specific, so verify the official model page before publishing examples.

For GPT-5.5, OpenAI's latest model guide says the default reasoning effort is `medium` and recommends evaluating `low` before using `none` for latency-sensitive workflows. Use `high` or `xhigh` only when tests show that the result improves enough to justify extra latency and cost.

## Suggested starting points

| Task | Starting effort |
| --- | --- |
| Short FAQ answer | `low` |
| Support troubleshooting with several checks | `medium` |
| Migration plan, policy comparison, or risk review | `medium` |
| Complex multi-tool analysis | `high` after evaluation |

## Example

```json
{
  "model": "pa/gpt-5.5",
  "input": "Compare two rollout options and recommend one.",
  "reasoning": {
    "effort": "medium"
  },
  "max_output_tokens": 1200
}
```

Official references: [latest model guide](https://developers.openai.com/api/docs/guides/latest-model) and [reasoning guide](https://developers.openai.com/api/docs/guides/reasoning).
