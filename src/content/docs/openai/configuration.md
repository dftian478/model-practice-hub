---
title: 配置
description: 可复用 OpenAI 兼容示例推荐使用的环境变量。
---

每个示例都使用三个值：

| 变量 | 用途 | 示例 |
| --- | --- | --- |
| `OPENAI_BASE_URL` | OpenAI 兼容的 `/v1` 端点。 | `https://api.example.com/v1` |
| `OPENAI_API_KEY` | 用户自己的 API key。 | `replace-with-your-key` |
| `MODEL_NAME` | 用户选择的模型。 | `gpt-5.5` |

## 模型命名

示例默认使用 OpenAI 官方模型 ID。调用兼容端点时，只有在你的服务明确要求不同模型名时，才替换 `MODEL_NAME`。

| 用途 | 推荐值 |
| --- | --- |
| 默认复杂任务 | `gpt-5.5` |
| 轻量支持或路由任务 | `gpt-5.4-mini` |
| 简单分类、格式化或短文本抽取 | `gpt-5.4-nano` |

公开示例中不要添加服务名称、路由后缀或实验后缀。如果 OpenAI 新增官方模型，先刷新官方来源，再更新本表。

## 内容控制

- 不发布真实 key、私有端点、客户名称或工作区链接。
- 使用 `https://api.example.com/v1` 这类占位符。
- 行为声明附近放官方来源链接。
- 合并前运行内容检查和构建。
