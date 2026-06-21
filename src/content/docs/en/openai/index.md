---
title: OpenAI Practice Guide
description: Neutral implementation notes for OpenAI-compatible model usage, with configurable endpoints and model names.
---

This guide is a neutral field manual for teams that need clear, copyable OpenAI-compatible examples. It keeps provider-specific values out of the prose: readers set their own API key, base URL, and model name once, then reuse the examples.

Use the official OpenAI documentation as the source of truth for API behavior. These notes summarize implementation patterns and map official model IDs to the published compatibility naming convention: add the `pa/` prefix to the official model ID.

## Sections

- [Quickstart](/en/openai/quickstart/) sets environment variables and makes the first Responses API call.
- [Configuration](/en/openai/configuration/) explains how to keep keys, domains, and model names replaceable.
- [Models](/en/openai/models/) lists currently applicable model names and their `pa/` mapping.
- [Curl examples](/en/openai/curl-examples/) provides copyable calls for common support cases.
- [GPT reasoning](/en/openai/reasoning/) covers effort, token budgeting, summaries, prompting, tools, and FAQ.

## Official references

- [OpenAI latest model guide](https://developers.openai.com/api/docs/guides/latest-model)
- [OpenAI reasoning models guide](https://developers.openai.com/api/docs/guides/reasoning)
- [OpenAI reasoning best practices](https://developers.openai.com/api/docs/guides/reasoning-best-practices)
- [OpenAI Responses API reference](https://developers.openai.com/api/docs/api-reference/responses)
