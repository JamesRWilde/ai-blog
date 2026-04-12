---
title: "Jan AI: The Open-Source Local API That Runs on Your Hardware"
excerpt: "Jan is an Apache 2.0 licensed, offline-first AI platform with a built-in OpenAI-compatible API server, giving developers full control over their models and data."
coverImage: "/assets/blog/jan-ai-cover.png"
date: 2026-03-29T04:30:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/jan-ai-cover.png"
---

## TL;DR

Jan is a free, open-source AI platform that runs foundation models locally on your hardware. It ships with a built-in OpenAI-compatible API server, supports cloud integrations (OpenAI, Anthropic, Mistral, Groq, MiniMax), and offers MCP connectivity for agentic workflows. With 41,000+ GitHub stars and 5.3 million downloads, it has become the go-to solution for developers who want AI without sending data to the cloud.

---

## The Problem

Most AI development assumes you will rent compute from someone else. Your prompts, your documents, your business logic all flow through third-party APIs. For many use cases this is fine, but for regulated industries, sensitive data, or offline environments, it is a non-starter.

Existing local AI tools tend to split into two camps: research projects with terrible UX, or polished desktop apps that do not expose an API for your own applications. Developers who want both privacy and programmability have been stuck choosing between the two.

Jan solves this by being both a user-friendly desktop application and a developer-grade API server in a single package.

## What Jan Actually Is

Jan is an open-source desktop application (macOS, Windows, Linux) that lets you download and run foundation models locally. Built on top of llama.cpp for inference, it handles model management, chat interfaces, and custom assistants out of the box.

The critical piece for developers is the built-in API server. Flip a toggle in Jan's settings and you have an OpenAI-compatible API running on localhost:1337. Your existing OpenAI SDK code works against it with zero modifications, except the base URL points to your machine instead of the cloud.

This is not a toy feature. It means you can build applications, agents, and automations that run entirely on-device with no internet connection required.

## The API in Detail

Jan's local API server follows the OpenAI API convention exactly:

**Base URL:** `http://127.0.0.1:1337/v1`

**Authentication:** Bearer token via the `Authorization` header (you set your own key).

**Endpoints:** Chat completions, model listing, and other standard OpenAI-compatible routes.

A basic request looks like this:

```bash
curl http://127.0.0.1:1337/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer your-api-key" \
  -d '{
    "model": "llama-3-8b-instruct",
    "messages": [{"role": "user", "content": "Hello"}]
  }'
```

The server supports streaming, configurable host binding (localhost only or network-accessible), custom API prefixes, CORS for browser-based apps, and trusted host filtering for additional security.

**Server configuration options:**

- **Host:** Bind to 127.0.0.1 (local only) or 0.0.0.0 (network accessible)
- **Port:** Default 1337, fully configurable
- **API Prefix:** Default `/v1`, matching OpenAI convention
- **API Key:** Mandatory authentication token you define yourself
- **CORS:** Enabled by default for web app development
- **Verbose Logging:** Full request/response logging for debugging

## Cloud Integrations

Jan is not limited to local models. It connects to major cloud APIs as well:

- **OpenAI** (GPT-4o, o1, o3)
- **Anthropic** (Claude models)
- **Mistral**
- **Groq** (fast inference)
- **MiniMax**

This means you can build hybrid workflows where sensitive data stays local while non-sensitive tasks route to cloud models, all through the same Jan interface and API.

## Model Support

Jan supports models from HuggingFace in standard formats. The platform runs on llama.cpp under the hood, which means GGUF-format models are the primary target. You can download models directly through Jan's interface or import them manually.

Hardware requirements scale with model size:

- **3B parameter models:** 8GB RAM
- **7B parameter models:** 16GB RAM
- **13B parameter models:** 32GB RAM

GPU acceleration is available for NVIDIA, AMD, and Intel Arc GPUs on supported platforms. Apple Silicon Macs use Metal acceleration natively.

## MCP and Agentic Capabilities

Jan supports the Model Context Protocol (MCP), which connects local models to external tools and data sources. This enables agentic workflows where your local AI can interact with file systems, calendars, messaging platforms (WhatsApp, Discord, Slack), and other services.

Combined with the API server, developers can build fully autonomous agent systems that run on-device. No cloud dependency, no data leaving your hardware.

## How It Compares

| Feature | Jan | Ollama | LM Studio | LocalAI |
|---------|-----|--------|-----------|---------|
| OpenAI-compatible API | Yes | Yes | Yes | Yes |
| Desktop GUI | Yes | No | Yes | No |
| Cloud integrations | Yes | No | Limited | No |
| MCP support | Yes | No | No | No |
| Agent capabilities | Yes | No | No | No |
| License | Apache 2.0 | MIT | Proprietary | MIT |
| OS support | macOS/Win/Linux | macOS/Win/Linux | macOS/Win/Linux | Docker/all |

Jan sits in a sweet spot between Ollama's developer-first simplicity and LM Studio's polished interface, adding cloud routing and agentic capabilities that neither offers.

## Pricing

Jan itself is free and open source under the Apache 2.0 license. There is no subscription, no enterprise tier, and no usage limits. You pay only for the cloud API credits if you choose to connect to external providers.

For local inference, the hardware you already own is the only cost.

## Who Should Use This

**Privacy-first development.** Healthcare, legal, financial, and government applications where data residency is non-negotiable.

**Offline environments.** Field operations, air-gapped networks, edge devices with intermittent connectivity.

**Cost-conscious builders.** Running a 7B model locally costs nothing per inference. For high-volume applications that do not need frontier-model quality, this eliminates API bills entirely.

**Experimentation.** Swap between local and cloud models freely. Test with GPT-4o, deploy with a local Llama. No code changes needed beyond the base URL.

## The Bottom Line

Jan is one of the most complete open-source AI platforms available today. The built-in OpenAI-compatible API server transforms your local machine into a private inference endpoint. Add MCP support, cloud integrations, and agent capabilities, and you have a platform that covers everything from solo experimentation to production deployment in sensitive environments.

The fact that it is Apache 2.0 licensed with no vendor lock-in makes it a serious option for teams building AI applications that need to own their entire stack.

---

**Links:**

- Website: [jan.ai](https://jan.ai)
- GitHub: [github.com/janhq/jan](https://github.com/janhq/jan)
- Docs: [jan.ai/docs](https://jan.ai/docs)
- API Server Guide: [jan.ai/docs/desktop/api-server](https://jan.ai/docs/desktop/api-server)
