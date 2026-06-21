---
title: 配置
description: 可复用 OpenAI 兼容示例推荐使用的环境变量。
---

每个示例都使用三个值：

| 变量 | 用途 | 示例 |
| --- | --- | --- |
| `OPENAI_BASE_URL` | OpenAI 兼容的 `/v1` 端点。 | `https://api.example.com/v1` |
| `OPENAI_API_KEY` | 用户自己的 API key。 | `replace-with-your-key` |
| `MODEL_NAME` | 用户选择的模型。 | `pa/gpt-5.5` |

## 模型命名

OpenAI 官方模型 ID 通过在前面添加 `pa/` 进行映射。

| 官方 ID | 发布 ID |
| --- | --- |
| `gpt-5.5` | `pa/gpt-5.5` |

公开示例中不要添加 provider 名称、路由后缀或实验后缀。如果 OpenAI 新增官方模型，先刷新官方来源，再按 `pa/<official-id>` 发布映射 ID。

## 内容控制

- 不发布真实 key、私有端点、客户名称或工作区链接。
- 使用 `https://api.example.com/v1` 这类占位符。
- 行为声明附近放官方来源链接。
- 合并前运行内容检查和构建。
