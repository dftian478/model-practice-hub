---
title: 工具调用
description: 面向工具调用和多轮延续推理工作流的说明。
---

工具较多的推理工作流建议使用 Responses API。它支持多轮状态模式，适合模型调用工具、检查结果并继续处理。

## 实践规则

- 工具描述保持简短、精确。
- 只有答案需要外部状态时才让模型调用工具。
- 如果 API 支持，使用会话状态机制在多轮中保留响应状态。
- 对长时间运行的工作流，设计能展示进度的界面，而不是让用户阅读隐藏推理。

## 支持排查清单

调试工具型工作流时，检查：

- 工具 schema 是否有效？
- 模型是否收到了上一轮响应状态？
- 工具调用后的输出预算是否足够？
- 提示词是否说明最终回答格式？

官方参考：[OpenAI reasoning guide](https://developers.openai.com/api/docs/guides/reasoning)、[Responses API reference](https://developers.openai.com/api/docs/api-reference/responses) 和 [using tools](https://developers.openai.com/api/docs/guides/tools)。
