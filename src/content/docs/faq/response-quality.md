---
title: Why do responses vary between runs?
description: A short explanation of why model responses can vary and how to reduce unwanted variation.
---

Model responses can vary because generation is probabilistic and context-sensitive. Small differences in prompt wording, retrieved context, temperature, tool results, or conversation history can change the answer.

## How to reduce variation

- Keep prompts structured and consistent.
- Provide the same source context each time.
- Lower randomness settings when the API supports them.
- Ask for a fixed output schema.
- Add review rules for facts, citations, and uncertainty.

## When variation is acceptable

Variation is often acceptable for brainstorming, drafting, and exploratory analysis. It is less acceptable for compliance-sensitive answers, customer commitments, or deterministic workflow steps.

For critical workflows, combine model output with validation logic, human review, or deterministic post-processing.
