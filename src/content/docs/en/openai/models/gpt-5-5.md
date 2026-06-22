---
title: GPT-5.5
description: Dedicated notes and FAQ for the gpt-5.5 model.
---

Use the official OpenAI model ID in examples: `gpt-5.5`.

OpenAI's latest model guide describes GPT-5.5 as suitable for complex production workflows such as coding, tool-heavy agents, grounded assistants, long-context retrieval, and product-spec-to-plan work. It also notes that GPT-5.5 supports the API features available with GPT-5.4, including prompt caching and hosted tools.

Official reference: [OpenAI latest model guide](https://developers.openai.com/api/docs/guides/latest-model).

## Recommended defaults

| Setting | Default guidance |
| --- | --- |
| API | Prefer the Responses API for reasoning, tools, and multi-turn examples. |
| Model | `gpt-5.5` |
| Reasoning effort | Start with `medium`; test `low` for latency-sensitive paths. |
| Output budget | Set enough `max_output_tokens` for reasoning plus the final answer. |

## FAQ

### Does GPT-5.5 always need high reasoning effort?

No. Start with `medium` or test `low` for speed-sensitive flows. Move to `high` or `xhigh` only when evaluation shows a measurable quality gain.

### Should prompts include today's date?

Do not add a date unless the task needs a specific date or timezone. If the workflow needs time-sensitive context, provide the exact date and timezone explicitly.

### Can this model be used for FAQ generation?

Yes. Give the model the target audience, answer length, required caveats, and official-source links. Use structured output if the FAQ needs a stable schema.

### What should be tested before publishing?

Run one smoke request with `gpt-5.5`, verify the example endpoint shape, and confirm the output answers the documented task without requiring private context.
