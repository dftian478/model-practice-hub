---
title: Tokens and Context
description: How reasoning affects output budget and context planning.
---

Reasoning work consumes output budget before the visible answer is completed. Keep `max_output_tokens` large enough for both the hidden reasoning work and the final response.

## Practical guidance

- Raise `max_output_tokens` when answers are cut off.
- Lower `reasoning.effort` when the task is simple or latency-sensitive.
- Keep source material concise and relevant; long context can still distract the model.
- For repeated static instructions, keep stable text at the front of the prompt to improve cache reuse where supported.

## Example budget

```bash
export OPENAI_BASE_URL="https://api.example.com/v1"
export OPENAI_API_KEY="replace-with-your-key"
export MODEL_NAME="gpt-5.5"

curl "$OPENAI_BASE_URL/responses" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "'"$MODEL_NAME"'",
    "input": "Analyze this support incident and produce a concise resolution plan.",
    "reasoning": {
      "effort": "medium"
    },
    "max_output_tokens": 1600
  }'
```

Official reference: [OpenAI reasoning models guide](https://developers.openai.com/api/docs/guides/reasoning).
