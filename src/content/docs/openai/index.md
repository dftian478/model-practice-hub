---
title: OpenAI 实践指南
description: 面向 OpenAI 兼容模型使用的中立说明，支持可配置端点和模型名称。
---

本指南面向需要清晰、可复制 OpenAI 兼容示例的团队。正文不写入任何服务环境的私有值，读者只需要设置自己的 API key、base URL 和模型名称，就可以复用示例。

API 行为以 OpenAI 官方文档为准。本站只总结实现模式，模型名称默认使用 OpenAI 官方模型 ID；如果读者使用兼容端点，也应以自己的服务实际支持的模型 ID 为准。

## 章节

- [快速开始](./quickstart/) 设置环境变量并发送第一次 Responses API 请求。
- [配置](./configuration/) 说明如何让 key、域名和模型名称可替换。
- [模型](./models/) 列出当前适用模型和推荐场景。
- [curl 示例](./curl-examples/) 提供常见支持场景的可复制请求。
- [GPT 推理](./reasoning/) 覆盖 effort、token 预算、summary、提示词、工具和常见问题。

## 官方参考

- [OpenAI latest model guide](https://developers.openai.com/api/docs/guides/latest-model)
- [OpenAI reasoning models guide](https://developers.openai.com/api/docs/guides/reasoning)
- [OpenAI reasoning best practices](https://developers.openai.com/api/docs/guides/reasoning-best-practices)
- [OpenAI Responses API reference](https://developers.openai.com/api/docs/api-reference/responses)
