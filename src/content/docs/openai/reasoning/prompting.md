---
title: Prompting for Reasoning
description: Prompt patterns for reliable GPT reasoning answers.
---

For GPT-5.5, prefer prompts that describe the outcome, success criteria, constraints, and answer format. The official latest model guidance recommends reducing unnecessary step-by-step instruction and letting the model choose the reasoning path unless the workflow has a proven process requirement.

## Prompt shape

```text
Task: Review the draft FAQ answer.
Audience: API users who need a direct fix.
Success criteria:
- Identify the likely cause.
- Provide three checks in order.
- Avoid private or provider-specific details.
Output: Short answer, checks, next step.
```

## Add structure when software consumes the answer

If another system reads the response, use structured output rather than asking for "valid JSON" in plain text. Keep schemas small and aligned to the support workflow.

Official references: [latest model guide](https://developers.openai.com/api/docs/guides/latest-model) and [reasoning best practices](https://developers.openai.com/api/docs/guides/reasoning-best-practices).
