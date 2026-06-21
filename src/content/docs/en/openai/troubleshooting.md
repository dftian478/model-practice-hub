---
title: Troubleshooting
description: Checks for common OpenAI-compatible request and response issues.
---

## 401 or authentication failure

Check that `OPENAI_API_KEY` is set in the same shell session as the curl command. Do not paste real keys into docs, screenshots, or issue comments.

## 404 or model not found

Confirm the endpoint and model naming convention:

- `OPENAI_BASE_URL` should point to the compatible `/v1` root.
- Compatibility examples should use `pa/<official-model-id>`, such as `pa/gpt-5.5`.
- Direct OpenAI examples should use official model IDs without `pa/`.

## Reasoning output is too short

Increase `max_output_tokens`. Reasoning models may spend output budget on reasoning work before producing the visible answer, so short budgets can cut off useful responses.

## Latency is too high

Lower `reasoning.effort` for latency-sensitive tasks and test quality again. Keep higher effort for tasks where deeper reasoning clearly improves the result.

## Response format changes

Use structured output when the consumer expects stable fields. Add a small regression prompt to verify the answer shape before publishing an example.
