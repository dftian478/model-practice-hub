---
title: 快速开始
description: 配置 key、端点和模型名称，然后发送第一次 Responses API 请求。
---

示例假设你使用的是 OpenAI 兼容端点。请将 base URL 设置为服务暴露的 `/v1` 根路径。

```bash
export OPENAI_BASE_URL="https://api.example.com/v1"
export OPENAI_API_KEY="replace-with-your-key"
export MODEL_NAME="pa/gpt-5.5"
```

发送第一次请求：

```bash
curl "$OPENAI_BASE_URL/responses" \
  -H "Authorization: Bearer $OPENAI_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "model": "'"$MODEL_NAME"'",
    "input": "Give three practical checks before publishing a model FAQ.",
    "max_output_tokens": 600
  }'
```

如果直接调用 OpenAI 官方端点，请使用官方模型 ID，不要使用 `pa/` 映射 ID。对于本站的兼容示例，请保留 `pa/` 前缀，不要使用 provider 后缀。

## 发布示例前

- API key 放在环境变量中。
- base URL 保持可配置。
- 示例里的模型名称使用 `pa/<official-model-id>`。
- 描述模型或 API 行为时链接 OpenAI 官方来源。
