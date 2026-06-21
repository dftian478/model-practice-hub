---
title: Reasoning Examples
description: Copyable curl examples for GPT reasoning use cases.
---

Set shared variables:

```bash
export OPENAI_BASE_URL="https://api.example.com/v1"
export OPENAI_API_KEY="replace-with-your-key"
export MODEL_NAME="pa/gpt-5.5"
```

## Support risk review

```bash
curl "$OPENAI_BASE_URL/responses" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "'"$MODEL_NAME"'",
    "input": "A docs article says users should paste API keys into a browser console. Review the risk and rewrite the guidance safely.",
    "reasoning": {
      "effort": "medium",
      "summary": "auto"
    },
    "max_output_tokens": 1200
  }'
```

## FAQ answer with stable fields

```bash
curl "$OPENAI_BASE_URL/responses" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "'"$MODEL_NAME"'",
    "input": "Answer: Why did my model response stop mid-sentence?",
    "reasoning": {
      "effort": "low"
    },
    "text": {
      "format": {
        "type": "json_schema",
        "name": "faq_answer",
        "schema": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "answer": { "type": "string" },
            "checks": { "type": "array", "items": { "type": "string" } }
          },
          "required": ["answer", "checks"]
        }
      }
    },
    "max_output_tokens": 900
  }'
```

Validate parameter names against the [Responses API reference](https://developers.openai.com/api/docs/api-reference/responses) before publishing.
