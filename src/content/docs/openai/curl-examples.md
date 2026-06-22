---
title: curl 示例
description: 面向支持和集成文章的可复制 OpenAI 兼容 curl 示例。
---

先设置共享变量：

```bash
export OPENAI_BASE_URL="https://api.example.com/v1"
export OPENAI_API_KEY="replace-with-your-key"
export MODEL_NAME="gpt-5.5"
```

## 基础回答

```bash
curl "$OPENAI_BASE_URL/responses" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "'"$MODEL_NAME"'",
    "input": "Explain the difference between prompt instructions and user input in two bullets.",
    "max_output_tokens": 500
  }'
```

## 推理任务

```bash
curl "$OPENAI_BASE_URL/responses" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "'"$MODEL_NAME"'",
    "input": "Review this rollout plan and identify the top three risks: migrate a support FAQ to a public docs site this week.",
    "reasoning": {
      "effort": "medium",
      "summary": "auto"
    },
    "max_output_tokens": 1200
  }'
```

## 结构化支持回答

```bash
curl "$OPENAI_BASE_URL/responses" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "'"$MODEL_NAME"'",
    "input": "Create a support answer for a user whose response format changes between requests.",
    "text": {
      "format": {
        "type": "json_schema",
        "name": "support_answer",
        "schema": {
          "type": "object",
          "additionalProperties": false,
          "properties": {
            "summary": { "type": "string" },
            "checks": { "type": "array", "items": { "type": "string" } },
            "next_step": { "type": "string" }
          },
          "required": ["summary", "checks", "next_step"]
        }
      }
    },
    "max_output_tokens": 900
  }'
```

发布前请根据 [OpenAI Responses API reference](https://developers.openai.com/api/docs/api-reference/responses) 校验参数行为。
