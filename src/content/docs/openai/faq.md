---
title: 常见问题
description: OpenAI 兼容文档、模型映射和推理示例的常见问题。
---

## 示例应该使用哪个模型名称？

使用 `pa/<official-model-id>`。例如 OpenAI 的 `gpt-5.5` 映射为 `pa/gpt-5.5`。

## 示例中应该写真实 API 域名吗？

不应该。使用 `OPENAI_BASE_URL` 和 `https://api.example.com/v1` 这类占位符，读者用自己的兼容端点替换。

## 读者能用 `pa/gpt-5.5` 直接调用 OpenAI 吗？

不能。`pa/` 前缀用于本站兼容层示例。直接调用 OpenAI 时应使用 OpenAI 官方模型 ID。

## 为什么使用 Responses API？

它支持本指南的推理示例，包括 reasoning 配置、结构化输出、工具调用和多轮状态模式。

## reasoning summary 会暴露隐藏推理吗？

不会。summary 应视为模型生成的解释或进度说明，不是原始隐藏推理。不要承诺能访问隐藏 chain-of-thought。

## 如何添加新模型页面？

先刷新 OpenAI 官方模型来源，将官方 ID 加入模型列表，映射为 `pa/<official-id>`，再添加专属模型 FAQ 页面。
