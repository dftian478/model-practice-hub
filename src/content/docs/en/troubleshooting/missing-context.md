---
title: The answer misses important context
description: Checks to run when a model answer ignores source material or leaves out key facts.
---

If an answer misses important context, first confirm whether the model actually received that context in a usable form.

## Checks

1. Confirm the relevant source text is included in the prompt or retrieval result.
2. Move critical facts closer to the task instruction.
3. Ask the model to cite the source section used for each key claim.
4. Reduce unrelated background material.
5. Split large tasks into smaller steps.

## Common causes

- The prompt mixes instructions with source text.
- The retrieved documents are too broad.
- The task asks for a summary but the expected facts are not named.
- The context contains conflicting statements.

## Follow-up

If the issue repeats, create a minimal reproduction with one prompt, one context block, and one expected output. This makes it easier to review whether the problem is prompt design, retrieval quality, or model behavior.
