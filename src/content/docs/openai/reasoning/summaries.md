---
title: Reasoning Summaries
description: How to request useful reasoning summaries without exposing hidden reasoning.
---

Reasoning summaries can help users understand progress or the basis for an answer when the model supports them. Treat these summaries as generated explanations, not as raw hidden reasoning.

## When to request summaries

- Complex support investigations.
- Tool-heavy workflows where the user needs progress visibility.
- Review tasks where the final recommendation should include a compact rationale.

## Example

```json
{
  "model": "pa/gpt-5.5",
  "input": "Review this troubleshooting checklist and identify missing checks.",
  "reasoning": {
    "effort": "medium",
    "summary": "auto"
  },
  "max_output_tokens": 1200
}
```

Do not promise that summaries reveal hidden chain-of-thought. Use them as a concise explanation surface.

Official reference: [OpenAI reasoning models guide](https://developers.openai.com/api/docs/guides/reasoning).
