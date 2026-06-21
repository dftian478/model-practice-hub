---
title: Best Practices
description: Practical rules for reliable OpenAI-compatible documentation and examples.
---

## Ground every behavior claim

Use official OpenAI documentation for claims about model capabilities, reasoning controls, context behavior, tool calling, and API parameters. Link the source directly near the claim.

## Prefer outcome-first prompts

For GPT-5.5, the official latest model guide recommends focusing on the expected outcome, success criteria, and constraints. Avoid long step-by-step prompts unless evaluation shows they improve the result for a specific workflow.

## Start with the Responses API

Use the Responses API for examples that involve reasoning, tool use, multi-turn state, or structured output. It is the clearest default for the reasoning-specific guidance in this section.

## Tune reasoning with measurements

Begin with the default or a low reasoning effort for latency-sensitive paths, then increase effort only when quality measurements justify the cost and latency. Keep `max_output_tokens` high enough for the answer plus reasoning overhead.

## Keep examples portable

- Use `OPENAI_BASE_URL`, `OPENAI_API_KEY`, and `MODEL_NAME`.
- Use the `pa/` model prefix for compatibility examples.
- Avoid hidden assumptions about region, dashboard, account plan, or private routing.
- Publish FAQ entries with a short answer first, then diagnostics and links.

Official references: [latest model guide](https://developers.openai.com/api/docs/guides/latest-model), [reasoning guide](https://developers.openai.com/api/docs/guides/reasoning), and [reasoning best practices](https://developers.openai.com/api/docs/guides/reasoning-best-practices).
