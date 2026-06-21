---
title: Prompt Context Design
description: How to structure context so model responses are easier to review and reuse.
---

Good context design makes model outputs easier to evaluate. A useful prompt separates the task, source material, constraints, and expected output shape.

## Recommended pattern

Use four blocks:

1. **Task:** what the model should do.
2. **Context:** facts the model may rely on.
3. **Constraints:** style, safety, scope, and forbidden assumptions.
4. **Output:** format, length, and required fields.

## Example

```text
Task: Summarize the integration issue for a support engineer.
Context: Use only the notes below.
Constraints: Do not mention customer names. Do not guess root cause.
Output: Return symptoms, likely causes, and next checks.
```

## Review checklist

- The source material is separated from instructions.
- The output format is explicit.
- The prompt says what not to infer.
- Sensitive identifiers are removed before sending content to a model.
