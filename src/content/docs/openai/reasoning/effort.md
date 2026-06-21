---
title: 推理强度
description: 如何为 GPT-5.5 示例选择 reasoning effort。
---

`reasoning.effort` 控制模型在回答前可以投入多少推理工作。支持的取值与模型相关，因此发布示例前应检查官方模型页面。

对于 GPT-5.5，OpenAI 最新模型指南说明默认 reasoning effort 是 `medium`，并建议延迟敏感工作流在使用 `none` 前先评估 `low`。只有测试证明质量收益足以抵消额外延迟和成本时，才使用 `high` 或 `xhigh`。

## 建议起点

| 任务 | 起始 effort |
| --- | --- |
| 短 FAQ 回答 | `low` |
| 包含多个检查项的支持排障 | `medium` |
| 迁移计划、策略比较或风险评审 | `medium` |
| 复杂多工具分析 | 评估后使用 `high` |

## 示例

```json
{
  "model": "pa/gpt-5.5",
  "input": "Compare two rollout options and recommend one.",
  "reasoning": {
    "effort": "medium"
  },
  "max_output_tokens": 1200
}
```

官方参考：[latest model guide](https://developers.openai.com/api/docs/guides/latest-model) 和 [reasoning guide](https://developers.openai.com/api/docs/guides/reasoning)。
