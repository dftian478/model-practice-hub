---
title: Grounding claims in official sources
description: How to separate official model behavior from practical recommendations.
category: Best Practices
reviewStatus: Draft
lastReviewed: 2026-06-14
---

When an article describes model behavior, limits, pricing, API parameters, or safety behavior, link to official vendor documentation whenever practical.

## Recommended language

Use clear labels:

- **Official behavior:** documented vendor behavior.
- **Observed practice:** patterns seen in implementation work.
- **Recommendation:** guidance based on practical experience.

## Example

Instead of writing:

```text
The model always follows this format.
```

Write:

```text
For repeatable outputs, request a fixed schema and validate the result before using it downstream.
```

## Review checklist

- Factual claims are linked or clearly framed as observed practice.
- The article does not imply official vendor support.
- Recommendations include limits or tradeoffs where relevant.
