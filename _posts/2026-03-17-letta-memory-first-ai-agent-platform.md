---
title: "Letta: The Memory-First AI Agent Platform That Actually Remembers You"
excerpt: "An open-source platform for building stateful AI agents with persistent memory, self-improvement capabilities, and full model portability — backed by a $20/month Pro tier and growing fast."
coverImage: "/assets/blog/letta-cover.jpg"
date: 2026-03-17T00:53:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/letta-cover.jpg"
---

## TL;DR

Letta is an open-source platform for building stateful AI agents that persist their memory across sessions, learn from experience, and are portable across any LLM provider. It offers a developer API (Python and TypeScript SDKs), a terminal-based coding agent called Letta Code, and a web-based Agent Development Environment (ADE). Pricing starts free and scales to $200/month for power users. The core bet: AI agents that remember are categorically more useful than ones that start from scratch every time.

## The Problem With Every AI Agent Today

Here is the uncomfortable truth about most AI agent frameworks: they are amnesiacs. You can spend an hour explaining your project, your preferences, your coding style, and your infrastructure to Claude, GPT, or Gemini. The next session, all of it is gone. Start over. Explain again. Repeat until you lose the will to live.

This is not a model limitation. It is an architectural one. Most agent frameworks treat conversations as disposable. A session starts, a session ends, the context evaporates. Some offer crude context windows or rudimentary retrieval, but none of them give you an agent that genuinely learns and improves over time.

Letta is trying to solve this at the infrastructure level.

## What Letta Actually Does

Letta (formerly MemGPT, for those who followed the academic paper) is built around one core idea: AI agents should have persistent, structured memory that survives across sessions, models, and environments. The platform gives you three main products:

### Letta API

The core product is a RESTful API for creating and managing stateful agents. When you create an agent, you define `memory_blocks` — structured chunks of persistent context with labels like `human` (facts about the user) and `persona` (the agent's own identity). These blocks persist across every interaction and are automatically managed by the agent itself.

```python
from letta_client import Letta
import os

client = Letta(api_key=os.getenv("LETTA_API_KEY"))

agent = client.agents.create(
    model="openai/gpt-4.1",
    memory_blocks=[
        {
            "label": "human",
            "value": "Name: Timber. Status: dog. Occupation: building Letta."
        },
        {
            "label": "persona",
            "value": "I am a self-improving superintelligence."
        }
    ],
    tools=["web_search", "fetch_webpage"]
)

response = client.agents.messages.create(
    agent_id=agent.id,
    input="What do you know about me?"
)
```

The TypeScript SDK works identically. Both are well-documented with a clean API reference at `docs.letta.com/api`.

### Letta Code

This is the terminal-based coding agent, installed via `npm install -g @letta-ai/letta-code`. It is a memory-first coding harness that persists its context between sessions. Unlike Claude Code or similar tools that start fresh each time, Letta Code remembers your codebase, your patterns, and your preferences across invocations.

It supports skills (reusable tool configurations) and subagents (delegated tasks), and it recommends Opus 4.5 and GPT-5.2 for best performance according to its public model leaderboard.

### The ADE (Agent Development Environment)

A web-based GUI at `app.letta.com` for visualizing and managing your agents, inspecting their memory blocks, and debugging conversations. This is where you go to understand what your agent actually remembers.

## The Memory Architecture

What makes Letta different from a glorified conversation logger is its approach to memory management. The platform maintains several memory layers:

- **Core memory blocks** (the `memory_blocks` you define at creation) are always in the agent's context. The agent can read and update them autonomously.
- **Archival memory** acts as a long-term store that the agent can search and retrieve from when needed.
- **Chat history** is preserved and searchable, giving the agent access to its own past reasoning.

The agent actively manages its own memory. It can decide to update a memory block, add new facts, or reorganize its context. This is not retrieval-augmented generation bolted on top of a chatbot. It is a deliberate memory management system where the agent participates in deciding what to remember and what to forget.

## Model Portability

One particularly interesting feature: memory is decoupled from models. You can start an agent with GPT-4.1, switch it to Claude Opus, and then run it on an open-source model, all while preserving its memory and learned behavior. The agent's identity, knowledge, and preferences survive the migration.

This is a meaningful architectural choice. Most agent frameworks bind tightly to a specific provider. Letta treats the model as interchangeable infrastructure, which aligns with how serious teams actually operate.

## Pricing

Letta's pricing is straightforward:

- **Free**: 3 stateful agents, bring your own API keys (BYOK), access to ADE and Letta Code
- **Pro ($20/month)**: Unlimited agents, access to frontier models on the Letta API, $20 monthly API credits, pay-as-you-go overage
- **Max ($200/month)**: Higher usage limits, optimized for Letta Code power users, early access to features
- **Enterprise**: Custom volume pricing, RBAC, SSO, dedicated support

Tool execution pricing is worth noting: server-side tools incur CPU time costs, remote MCP tools are free (charged by the provider), and client-side tools (like bash commands in Letta Code) cost nothing because they run locally.

## The Open Source Factor

Letta is open source with over 11,000 GitHub stars and a community of 100+ contributors. The server, SDKs, and Letta Code are all publicly available. This is not a thin wrapper around an API with a proprietary black box underneath. You can self-host, audit the memory management logic, and contribute back.

The Discord is active, and there is a developer forum at `forum.letta.com` for those who prefer threaded discussions.

## Who Is This For

Letta makes the most sense for developers building agents that need to maintain relationships with users over time. Customer support bots that actually remember previous interactions. Personal assistants that learn your workflow. Coding agents that adapt to your codebase. Research agents that build knowledge across sessions.

It is less relevant for stateless batch processing or simple API wrappers where session persistence does not matter.

## The Honest Assessment

Letta is doing something genuinely differentiated. The memory-first architecture is not marketing hand-waving — it is a real technical approach backed by research (the MemGPT paper is well-regarded in the field). The model portability is smart. The open-source commitment is credible.

The risks are the usual ones for a startup-stage platform: will the API remain stable, will pricing scale reasonably, and will the team sustain momentum? The memory management approach also introduces complexity that simpler frameworks avoid. You need to think carefully about what your agent remembers and how it manages its context, which is a feature and a burden simultaneously.

For teams building serious AI products where agent continuity matters, Letta is worth evaluating seriously. The free tier is generous enough to prototype with, and the API is clean enough that migration from a stateless framework is not painful.

---

[Letta](https://letta.com) | [GitHub](https://github.com/letta-ai/letta) | [Documentation](https://docs.letta.com) | [Discord](https://discord.gg/letta)
