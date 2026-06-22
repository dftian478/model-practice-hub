---
title: 推理 FAQ
description: 面向 GPT 推理支持问题的短答。
---

## 什么时候应该使用推理？

需要比较、规划、多步排障或工具编排时使用推理。简单改写或分类任务，可以先使用较低 effort 或更小模型。

## 应该从哪个 effort 开始？

对 `gpt-5.5`，从 `medium` 开始。延迟敏感任务测试 `low`，只有评估显示回答变好时再提高。

## 为什么回答被截断？

输出预算可能太小。推理工作会在可见答案完成前消耗一部分 `max_output_tokens`。

## 可以把推理展示给最终用户吗？

可以在有用时展示简洁 summary 或理由说明。不要声称能展示隐藏 chain-of-thought。

## FAQ 文章需要包含 reasoning 设置吗？

只有设置会影响结果时才需要。普通 FAQ 可以使用基础示例；复杂排障页面应写明 reasoning 配置及选择原因。

## 应该链接哪些官方文档？

使用 [OpenAI reasoning guide](https://developers.openai.com/api/docs/guides/reasoning)、[reasoning best practices](https://developers.openai.com/api/docs/guides/reasoning-best-practices) 和 [latest model guide](https://developers.openai.com/api/docs/guides/latest-model)。
