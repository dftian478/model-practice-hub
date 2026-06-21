---
title: 适用模型
description: OpenAI 官方模型 ID 与公开兼容 ID 的映射。
---

本列表基于官方 [OpenAI latest model guide](https://developers.openai.com/api/docs/guides/latest-model)，每次公开更新模型前都应刷新。

| 官方模型 ID | 发布模型 ID | 适用场景 |
| --- | --- | --- |
| [`gpt-5.5`](/openai/models/gpt-5-5/) | `pa/gpt-5.5` | 需要当前默认模型处理复杂工作流、推理型支持回答、工具型 agent 或长上下文审阅。 |
| `gpt-5.4-mini` | `pa/gpt-5.4-mini` | 需要较低延迟或成本，处理较轻量支持和路由任务。 |
| `gpt-5.4-nano` | `pa/gpt-5.4-nano` | 需要最小模型处理简单分类、格式化或短文本抽取。 |

## 映射规则

在 OpenAI 官方模型 ID 前添加 `pa/`。公开文档中不要添加路由后缀或 provider 名称。

## 发布清单

- 从 OpenAI 官方文档确认模型 ID。
- 将 `pa/` 映射 ID 加入本表。
- 新增或更新专属模型 FAQ 页面。
- 使用最新映射模型运行烟测。
