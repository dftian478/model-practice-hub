---
title: 推理示例
description: 面向 GPT 推理场景的可复制 curl 示例。
---

设置共享变量：

```bash
export OPENAI_BASE_URL="https://api.example.com/v1"
export OPENAI_API_KEY="replace-with-your-key"
export MODEL_NAME="gpt-5.5"
```

## 支持风险审阅

```bash
curl "$OPENAI_BASE_URL/responses" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "'"$MODEL_NAME"'",
    "input": "A docs article says users should paste API keys into a browser console. Review the risk and rewrite the guidance safely.",
    "reasoning": {
      "effort": "medium",
      "summary": "auto"
    },
    "max_output_tokens": 1200
  }'
```

## 带稳定字段的 FAQ 回答

```bash
curl "$OPENAI_BASE_URL/responses" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "'"$MODEL_NAME"'",
    "input": "Answer: Why did my model response stop mid-sentence?",
    "reasoning": {
      "effort": "low"
    },
    "text": {
      "format": {
        "type": "json_schema",
        "name": "faq_answer",
        "schema": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "answer": { "type": "string" },
            "checks": { "type": "array", "items": { "type": "string" } }
          },
          "required": ["answer", "checks"]
        }
      }
    },
    "max_output_tokens": 900
  }'
```

发布前请根据 [Responses API reference](https://developers.openai.com/api/docs/api-reference/responses) 校验参数名称。
