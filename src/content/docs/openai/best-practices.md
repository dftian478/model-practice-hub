---
title: 最佳实践
description: 编写可靠 OpenAI 兼容文档和示例的实践规则。
---

## 所有行为声明都要有依据

描述模型能力、推理控制、上下文行为、工具调用和 API 参数时，使用 OpenAI 官方文档作为依据，并在声明附近直接链接来源。

## 优先使用结果导向提示词

对于 GPT-5.5，官方最新模型指南建议关注预期结果、成功标准和约束。除非评估证明对特定工作流有帮助，否则避免写很长的逐步推理指令。

## 优先从 Responses API 开始

涉及推理、工具、多轮状态或结构化输出的示例，优先使用 Responses API。它是本指南推理专项里最清晰的默认选择。

## 用评测调整推理强度

对延迟敏感路径，从默认或较低 reasoning effort 开始。只有当质量评测证明收益足够时，再提高 effort。`max_output_tokens` 要能覆盖最终答案和推理开销。

## 保持示例可移植

- Use `OPENAI_BASE_URL`, `OPENAI_API_KEY`, and `MODEL_NAME`.
- 示例默认使用 OpenAI 官方模型 ID。
- 避免假设地区、控制台、账户计划或私有路由。
- FAQ 先给短答，再给诊断和链接。

官方参考：[latest model guide](https://developers.openai.com/api/docs/guides/latest-model)、[reasoning guide](https://developers.openai.com/api/docs/guides/reasoning) 和 [reasoning best practices](https://developers.openai.com/api/docs/guides/reasoning-best-practices)。
