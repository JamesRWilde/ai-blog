---
title: "GitHub Models: The AI API Platform Already Inside Your Workflow"
excerpt: "GitHub Models gives developers free access to GPT-5, Claude, Gemini, and open-weight models through a single API endpoint with built-in prompt versioning and side-by-side evaluations."
coverImage: "/assets/blog/github-models-api-cover.jpg"
date: 2026-04-02T20:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/github-models-api-cover.jpg"
---

## TL;DR

GitHub Models is an AI inference platform built directly into GitHub that gives developers free access to leading models including OpenAI's GPT-5 family, Microsoft's Phi-4 series, Meta's Llama, and AI21's Jamba through a unified API. It adds prompt versioning, model evaluations, and a playground on top of the inference layer, making it more than just another model marketplace.

## The Problem

Developers building AI-powered applications face a recurring setup tax. Before writing a single line of application logic, you need API keys from multiple providers, separate SDK integrations for each model vendor, a way to test and compare models side-by-side, and some system for managing prompts that doesn't involve scattering them across Jupyter notebooks and Slack threads.

GitHub identified that its 100 million-plus developers were already doing this work outside the platform, then context-switching back to commit code. GitHub Models aims to collapse that loop.

## What GitHub Models Actually Is

At its core, GitHub Models is a model marketplace and inference API hosted on Azure infrastructure. It provides access to a curated catalog of models through a single endpoint and a single authentication flow (your existing GitHub PAT).

### Available Models (as of April 2026)

The catalog includes:

- **OpenAI GPT-5 family** — GPT-5, GPT-5-mini, GPT-5-nano, and GPT-5-chat (preview)
- **OpenAI reasoning models** — o3, o3-mini, o4-mini
- **Microsoft Phi-4 series** — Phi-4-reasoning, Phi-4-multimodal-instruct, Phi-4-mini-reasoning
- **OpenAI embedding models** — text-embedding-3-small, text-embedding-3-large
- **AI21 Jamba 1.5 Large** — 398B parameter MoE model with 256K context window
- **Meta Llama models** — various sizes

The catalog is smaller than aggregators like OpenRouter or Eden AI, but the models are hand-picked and fully supported on Azure infrastructure.

### The Playground

Every model in the catalog has an interactive playground at `github.com/marketplace/models`. You can tweak parameters (temperature, max tokens, top-p), submit prompts, and see responses in real time. The playground also supports side-by-side model comparison, feeding the same prompt into two models and viewing outputs in parallel panes.

### Prompt Engineering as Code

This is where GitHub Models diverges from pure inference platforms. Prompts are stored, versioned, and shared like source code. You can:

- Track prompt changes via Git history
- Create pull requests for prompt modifications
- Preview diffs between prompt versions
- Roll back to earlier prompt versions

For teams already managing prompts in text files or databases, this is a meaningful workflow improvement.

### Built-in Evaluations

The platform includes structured evaluation tools. You can run outputs through similarity, relevance, and groundedness evaluators, or define custom evaluation criteria using prompt-based evaluators. This closes the loop between prompt experimentation and quality measurement without requiring external tooling like Promptfoo or Langsmith.

## How the API Works

GitHub Models exposes an OpenAI-compatible API endpoint. Authentication uses your GitHub personal access token with `models:read` scope. The SDK options include:

- **Azure AI Inference SDK** (primary, supports all models)
- **OpenAI SDK** (for OpenAI models)
- **REST API** (direct HTTP calls)

A minimal Python example:

```python
from azure.ai.inference import ChatComplectionsClient
from azure.core.credentials import AzureKeyCredential

client = ChatCompletingsClient(
    endpoint="https://models.github.ai/inference",
    credential=AzureKeyCredential(token)
)

response = client.complete(
    model="gpt-5",
    messages=[{"role": "user", "content": "Explain quantum error correction"}]
)
```

The endpoint accepts standard OpenAI-format messages, making migration from direct OpenAI API calls straightforward.

### Free Tier and Pricing

GitHub Models includes free usage for prototyping, rate-limited but sufficient for development and testing. Once you move to production, billing is handled through GitHub at Azure OpenAI Service pay-as-you-go rates. Organizations can also bring their own API keys (BYOK) from OpenAI or Azure AI, bypassing GitHub billing entirely.

Rate limits for the free tier:

- Vary by model (typically 10-15 requests per minute)
- Daily request limits range from 50 to 150 depending on the model
- Higher limits available with $10+ in purchased credits via OpenRouter (if using OpenRouter as a fallback)

## BYOK: Bring Your Own Keys

GitHub Models supports custom model integrations through BYOK. Organization admins can connect their own OpenAI, Azure AI, or other provider API keys. Inference runs directly through the provider, and billing is tracked through the provider's account rather than GitHub.

This means GitHub Models can serve as a unified interface layer on top of your existing provider relationships, rather than requiring you to migrate billing.

## Who This Is Actually For

**Strong fit:**

- Individual developers prototyping AI features who want zero-setup access to multiple models
- Teams already deep in the GitHub ecosystem (Issues, PRs, Codespaces) who want to minimize context switching
- Organizations looking for prompt management without adding another vendor

**Weak fit:**

- Teams needing a broad model catalog (50+ providers) — OpenRouter or Eden AI are better here
- High-volume production workloads where Azure direct pricing is cheaper than GitHub's pass-through
- Users who need specialized models (custom fine-tunes, niche domain models)

## The Bigger Picture

GitHub Models is part of a broader push by Microsoft to make GitHub the default platform for AI development. It sits alongside GitHub Copilot (code completion), GitHub Spark (micro-app hosting), and GitHub Actions (CI/CD) as pieces of an integrated AI development stack.

The strategic angle is clear: instead of developers scattering across OpenAI's dashboard, Anthropic's console, and Hugging Face's hub, keep them inside GitHub where they already live. The model catalog will likely expand, and the prompt management tools will probably tighten integration with Copilot workspace over time.

For now, it's a capable free-tier API with genuinely useful prompt engineering features baked in. If you're already a GitHub user, it's worth trying before reaching for a separate API provider.

## Key Links

- **Models marketplace:** github.com/marketplace/models
- **Documentation:** docs.github.com/github-models
- **API reference:** docs.github.com/en/rest/models
- **Pricing info:** docs.github.com/billing/managing-billing-for-your-products/about-billing-for-github-models
