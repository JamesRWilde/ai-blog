---
title: "TensorBlock Forge: Open-Source Unified AI API Gateway for Multi-Provider Model Access"
excerpt: "TensorBlock Forge is a self-hosted middleware that lets you access OpenAI, Anthropic, and other AI providers through a single OpenAI-compatible API with encrypted key management."
coverImage: "/assets/blog/tensorblock-forge-cover.jpg"
date: 2026-03-29T00:42:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/tensorblock-forge-cover.jpg"
---

## TL;DR

TensorBlock Forge is an open-source middleware platform that unifies access to multiple AI model providers through a single API endpoint. Store your OpenAI, Anthropic, and other provider keys once, and access all models through a single Forge API key with full OpenAI API compatibility. Self-hostable, security-focused, and free to use.

## The Problem

If you have ever built an application that talks to more than one AI provider, you know the pain. Each provider has its own API key, its own authentication flow, and its own quirks. Your codebase fills up with conditional logic for different SDKs. Your secrets multiply. Your ops team loses sleep.

The multi-model era is here. Developers routinely switch between GPT-4o, Claude, Gemini, and open-source models depending on the task. But the plumbing to connect them all remains tedious and fragmented.

## What TensorBlock Forge Does

Forge is a self-hosted proxy that sits between your application and the AI providers. You feed it your individual provider API keys (OpenAI, Anthropic, etc.), and it gives you back a single unified key. Your application talks to Forge as if it were hitting the OpenAI API. Forge handles routing to the correct provider behind the scenes.

Key capabilities:

- **Unified API key**: One key to rule them all. Store provider keys once, use them everywhere.
- **OpenAI-compatible interface**: Drop-in replacement for any application already using the OpenAI SDK. Change the base URL, keep everything else.
- **Model mapping**: Create custom aliases for provider-specific models. Call your production model `default-model` and swap the underlying provider without touching application code.
- **Encrypted key storage**: Provider keys are encrypted at rest with strong encryption. JWT-based authentication controls access.
- **CLI management**: A command-line interface for managing keys, users, and configuration.
- **Extensible architecture**: The provider adapter pattern makes adding new AI providers straightforward.

## Getting Started

Forge requires Python 3.12+ and a PostgreSQL database. The fastest path uses Docker Compose:

```bash
git clone https://github.com/TensorBlock/forge.git
cd forge
cp .env.example .env
# Edit .env with your DATABASE_URL and settings
docker compose up -d
```

Once running, make your first request:

```bash
curl https://api.forge.tensorblock.co/v1/chat/completions \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $FORGE_API_KEY" \
  -d '{
    "model": "OpenAI/gpt-4o",
    "messages": [
      {"role": "developer", "content": "You are a helpful assistant."},
      {"role": "user", "content": "Hello!"}
    ]
  }'
```

For Python developers using the OpenAI SDK, just point the base URL at Forge:

```python
from openai import OpenAI

client = OpenAI(
    base_url="https://api.forge.tensorblock.co/v1",
    api_key=FORGE_API_KEY,
)

completion = client.chat.completions.create(
    model="OpenAI/gpt-4o",
    messages=[
        {"role": "developer", "content": "You are a helpful assistant."},
        {"role": "user", "content": "Hello!"}
    ]
)
```

The same pattern works in TypeScript and any language with an HTTP client.

## Why Self-Host?

There are plenty of unified AI API gateways in the market (OpenRouter, LiteLLM, Portkey, and others). Forge differentiates by being fully self-hosted and open-source. That matters for three reasons:

1. **Data sovereignty**: Your API keys never leave your infrastructure. For regulated industries or security-conscious teams, this is non-negotiable.

2. **No vendor lock-in**: You are not dependent on a third party's uptime, pricing changes, or data policies. Fork the code, modify it, run it.

3. **Custom integrations**: The adapter pattern means you can add proprietary providers, internal models, or custom routing logic without waiting for upstream support.

## Forge vs. LiteLLM vs. OpenRouter

The closest comparison is LiteLLM, which also offers a self-hosted proxy with OpenAI-compatible routing. The key differences:

- **Forge uses a provider adapter pattern** with encryption-first design for API key storage. LiteLLM focuses more on model routing and spend tracking.
- **Forge includes a CLI** for management, while LiteLLM primarily uses configuration files and environment variables.
- **Forge is newer and lighter-weight**. It does not try to be an observability platform or billing system. It routes requests and keeps keys safe.

OpenRouter is a hosted service, not self-hosted. It offers a curated model marketplace but requires trusting a third party with your keys and traffic.

## Use Cases

- **Development teams** running experiments across multiple models without managing five different SDK integrations.
- **Enterprises** centralizing AI access through internal infrastructure with audit and encryption requirements.
- **Projects using Claude Code** with non-Anthropic models. Forge explicitly supports making Claude Code work with any LLM via a companion adapter.
- **Startups** that want to abstract their AI provider for easy switching when negotiating enterprise contracts.

## Limitations

Forge is still a young project. It does not currently offer built-in observability, spend tracking, or rate limiting beyond what individual providers enforce. Teams needing those features should pair Forge with dedicated monitoring tools or consider more established alternatives like LiteLLM.

The hosted service at `forge.tensorblock.co` is available for quick testing, but production use should go through a self-hosted deployment.

## Open Source and Community

Forge is MIT-licensed and available on GitHub. The project includes Docker Compose for deployment, comprehensive documentation, and example integrations. Community channels include Discord and Telegram.

For teams building AI applications that need to talk to multiple providers without the integration tax, Forge is a clean, minimal solution worth evaluating.

---

**GitHub**: [github.com/TensorBlock/forge](https://github.com/TensorBlock/forge)  
**Website**: [tensorblock.co/forge](https://tensorblock.co/forge)  
**License**: MIT
