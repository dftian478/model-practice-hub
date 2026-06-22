---
title: 常见问题
description: OpenAI 兼容文档、模型选择和推理示例的常见问题。
---

## 示例应该使用哪个模型名称？

默认使用 OpenAI 官方模型 ID。例如 `gpt-5.5`。如果读者的兼容端点要求不同名称，应只替换 `MODEL_NAME`。

## 示例中应该写真实 API 域名吗？

不应该。使用 `OPENAI_BASE_URL` 和 `https://api.example.com/v1` 这类占位符，读者用自己的兼容端点替换。

## 读者能用这些示例直接调用 OpenAI 吗？

可以，前提是把 `OPENAI_BASE_URL` 设置为 OpenAI 官方 `/v1` 端点，并使用有效的 OpenAI API key。调用其他兼容端点时，读者应填自己的域名和 key。

## 为什么使用 Responses API？

它支持本指南的推理示例，包括 reasoning 配置、结构化输出、工具调用和多轮状态模式。

## reasoning summary 会暴露隐藏推理吗？

不会。summary 应视为模型生成的解释或进度说明，不是原始隐藏推理。不要承诺能访问隐藏 chain-of-thought。

## 如何添加新模型页面？

先刷新 OpenAI 官方模型来源，将官方 ID 加入模型列表，再添加专属模型 FAQ 页面。
