---
title: The response format is inconsistent
description: How to improve consistency when model output shape changes across runs.
category: Troubleshooting
reviewStatus: Draft
lastReviewed: 2026-06-14
---

If a response format changes across runs, make the expected output shape explicit and validate the result before downstream use.

## Checks

1. Add a concrete schema or bullet structure to the prompt.
2. Include one short example if the format is unfamiliar.
3. Remove conflicting instructions.
4. Lower randomness settings if available.
5. Add application-side validation before accepting the output.

## Example instruction

```text
Return exactly three sections:
1. Summary
2. Evidence
3. Next checks
```

## When to escalate

If format consistency is required for automation, do not rely on prompt wording alone. Add validation and retry logic in the application layer.
