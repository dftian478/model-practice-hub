---
title: Tool Use
description: Guidance for reasoning workflows that call tools or continue across turns.
---

Use the Responses API for tool-heavy reasoning workflows. It supports multi-turn state patterns that are useful when a model needs to call tools, inspect results, and continue.

## Practical rules

- Keep tool descriptions short and precise.
- Let the model call tools only when the answer needs external state.
- Preserve response state across turns using the API's conversation-state mechanism when available.
- For long-running workflows, design the UI so users can see progress without reading hidden reasoning.

## Support checklist

When debugging tool-heavy workflows, ask:

- Was the tool schema valid?
- Did the model receive the prior response state?
- Was the output budget large enough after tool calls?
- Did the prompt explain the final answer format?

Official references: [OpenAI reasoning guide](https://developers.openai.com/api/docs/guides/reasoning), [Responses API reference](https://developers.openai.com/api/docs/api-reference/responses), and [using tools](https://developers.openai.com/api/docs/guides/tools).
