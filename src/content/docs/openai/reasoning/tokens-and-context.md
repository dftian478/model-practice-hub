---
title: Tokens 与上下文
description: reasoning 如何影响输出预算和上下文规划。
---

推理工作会在可见答案完成前消耗输出预算。`max_output_tokens` 需要同时覆盖隐藏推理工作和最终回答。

## 实践建议

- 回答被截断时，提高 `max_output_tokens`。
- 任务简单或延迟敏感时，降低 `reasoning.effort`。
- 资料保持简洁、相关；长上下文仍可能干扰模型。
- 对重复静态指令，将稳定文本放在提示词前部，以便在支持时提升缓存复用。

## 预算示例

```json
{
  "model": "pa/gpt-5.5",
  "input": "Analyze this support incident and produce a concise resolution plan.",
  "reasoning": {
    "effort": "medium"
  },
  "max_output_tokens": 1600
}
```

官方参考：[OpenAI reasoning models guide](https://developers.openai.com/api/docs/guides/reasoning)。
