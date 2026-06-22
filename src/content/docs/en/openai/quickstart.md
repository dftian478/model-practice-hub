---
title: Quickstart
description: Configure a key, endpoint, and model once, then send a first Responses API request.
---

The examples assume an OpenAI-compatible endpoint. Set the base URL to the `/v1` root exposed by your service.

```bash
export OPENAI_BASE_URL="https://api.example.com/v1"
export OPENAI_API_KEY="replace-with-your-key"
export MODEL_NAME="gpt-5.5"
```

Send a first request:

```bash
curl "$OPENAI_BASE_URL/responses" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "'"$MODEL_NAME"'",
    "input": "Give three practical checks before publishing a model FAQ.",
    "max_output_tokens": 600
  }'
```

If you call the official OpenAI endpoint directly, set `OPENAI_BASE_URL` to the official `/v1` endpoint and use an official model ID. For compatible endpoints, replace only the base URL, key, and model name when required.

## Before publishing an example

- Keep API keys in environment variables.
- Keep base URLs configurable.
- Use official OpenAI model IDs by default.
- Link official OpenAI sources when describing model or API behavior.
