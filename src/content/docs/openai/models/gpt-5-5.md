---
title: GPT-5.5
description: gpt-5.5 及其 pa/gpt-5.5 映射的专属说明和 FAQ。
---

兼容示例中使用 `pa/gpt-5.5`。OpenAI 官方模型 ID 是 `gpt-5.5`。

OpenAI 最新模型指南将 GPT-5.5 描述为适合复杂生产工作流的模型，例如编码、工具型 agent、基于资料的助手、长上下文检索，以及从产品规格到计划的工作流。官方文档也说明 GPT-5.5 支持 GPT-5.4 可用的 API 能力，包括 prompt caching 和 hosted tools。

官方参考：[OpenAI latest model guide](https://developers.openai.com/api/docs/guides/latest-model)。

## 推荐默认值

| 设置 | 默认建议 |
| --- | --- |
| API | 涉及推理、工具和多轮示例时优先使用 Responses API。 |
| 模型 | `pa/gpt-5.5` |
| Reasoning effort | 从 `medium` 开始；延迟敏感路径测试 `low`。 |
| 输出预算 | 设置足够的 `max_output_tokens`，覆盖推理和最终答案。 |

## FAQ

### GPT-5.5 总是需要高 reasoning effort 吗？

不需要。先从 `medium` 开始，速度敏感流程可测试 `low`。只有评估显示质量有明显收益时，再使用 `high` 或 `xhigh`。

### 提示词里应该写今天日期吗？

除非任务需要具体日期或时区，否则不要添加日期。如果工作流需要时间敏感上下文，请明确提供日期和时区。

### 这个模型可以用来生成 FAQ 吗？

可以。给出目标读者、回答长度、必要注意事项和官方来源链接。如果 FAQ 需要稳定 schema，请使用结构化输出。

### 发布前应该测试什么？

使用 `pa/gpt-5.5` 跑一次烟测，确认示例端点形态可用，并确认输出能回答文档任务且不依赖私有上下文。
