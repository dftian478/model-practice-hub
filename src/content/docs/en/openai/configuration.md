---
title: Configuration
description: Recommended environment variables for reusable OpenAI-compatible examples.
---

Use three values in every example:

| Variable | Purpose | Example |
| --- | --- | --- |
| `OPENAI_BASE_URL` | OpenAI-compatible `/v1` endpoint. | `https://api.example.com/v1` |
| `OPENAI_API_KEY` | User-owned API key. | `replace-with-your-key` |
| `MODEL_NAME` | Model selected by the reader. | `gpt-5.5` |

## Model naming

Examples use official OpenAI model IDs by default. When calling a compatible endpoint, replace `MODEL_NAME` only if your service explicitly requires a different model name.

| Purpose | Recommended value |
| --- | --- |
| Default complex tasks | `gpt-5.5` |
| Lighter support or routing tasks | `gpt-5.4-mini` |
| Simple classification, formatting, or short extraction | `gpt-5.4-nano` |

Do not add service names, routing suffixes, or experimental suffixes in public examples. If a new official OpenAI model is added, first refresh the official source, then update this table.

## Content controls

- Do not publish real keys, private endpoints, customer names, or workspace links.
- Use placeholders such as `https://api.example.com/v1`.
- Put official-source links near any behavior claim.
- Run the content check and build before merging.
