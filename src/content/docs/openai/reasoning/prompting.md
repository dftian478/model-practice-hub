---
title: 推理提示词
description: 让 GPT 推理回答更可靠的提示词模式。
---

对于 GPT-5.5，优先使用描述结果、成功标准、约束和回答格式的提示词。官方最新模型指南建议减少不必要的逐步指令，除非工作流已经验证需要固定过程，否则让模型自行选择推理路径。

## 提示词结构

```text
任务：审阅 FAQ 回答草稿。
读者：需要直接解决方案的 API 用户。
成功标准：
- 识别可能原因。
- 按顺序给出三个检查项。
- 避免私有或 provider 特定细节。
输出：短答、检查项、下一步。
```

## 软件消费回答时添加结构

如果另一个系统会读取响应，请使用结构化输出，而不是只在纯文本里要求“valid JSON”。schema 应保持小而贴合支持工作流。

官方参考：[latest model guide](https://developers.openai.com/api/docs/guides/latest-model) 和 [reasoning best practices](https://developers.openai.com/api/docs/guides/reasoning-best-practices)。
