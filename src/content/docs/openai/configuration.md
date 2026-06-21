---
title: Configuration
description: Recommended environment variables for reusable OpenAI-compatible examples.
---

Use three values in every example:

| Variable | Purpose | Example |
| --- | --- | --- |
| `OPENAI_BASE_URL` | OpenAI-compatible `/v1` endpoint. | `https://api.example.com/v1` |
| `OPENAI_API_KEY` | User-owned API key. | `replace-with-your-key` |
| `MODEL_NAME` | Model selected by the reader. | `pa/gpt-5.5` |

## Model naming

Official OpenAI model IDs are mapped by adding `pa/` to the front.

| Official ID | Published ID |
| --- | --- |
| `gpt-5.5` | `pa/gpt-5.5` |

Do not add provider names, routing suffixes, or experimental suffixes in public examples. If a new official OpenAI model is added, first refresh the official source, then publish the mapped ID as `pa/<official-id>`.

## Content controls

- Do not publish real keys, private endpoints, customer names, or workspace links.
- Use placeholders such as `https://api.example.com/v1`.
- Put official-source links near any behavior claim.
- Run the content check and build before merging.
