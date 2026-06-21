---
title: 推理摘要
description: 如何请求有用的 reasoning summary，同时避免承诺暴露隐藏推理。
---

当模型支持时，reasoning summary 可以帮助用户理解进展或答案依据。应把 summary 视为模型生成的解释，而不是原始隐藏推理。

## 什么时候请求 summary

- 复杂支持排查。
- 用户需要看到进度的工具型工作流。
- 最终建议需要包含简短理由的审阅任务。

## 示例

```json
{
  "model": "pa/gpt-5.5",
  "input": "Review this troubleshooting checklist and identify missing checks.",
  "reasoning": {
    "effort": "medium",
    "summary": "auto"
  },
  "max_output_tokens": 1200
}
```

不要承诺 summary 会展示隐藏 chain-of-thought。把它作为简洁说明层使用。

官方参考：[OpenAI reasoning models guide](https://developers.openai.com/api/docs/guides/reasoning)。
