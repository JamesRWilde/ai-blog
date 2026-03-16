---
title: "Perplexity's Four APIs: The Full-Stack Agentic Platform That Wants to Replace Your Entire Backend"
excerpt: "Perplexity launched four developer APIs at Ask 2026 — Agent, Sandbox, Search, and Embeddings — aiming to consolidate model routing, retrieval, and code execution into a single platform for building autonomous AI agents."
coverImage: "/assets/blog/perplexity-apis-cover.jpg"
date: 2026-03-16T01:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/perplexity-apis-cover.jpg"
---

## TL;DR

Perplexity held its first developer conference, Ask 2026, on March 12 in San Francisco. Beyond the flashy "Personal Computer" hardware announcement, the real story for developers is four new APIs — **Agent**, **Sandbox**, **Search**, and **Embeddings** — that together form what Perplexity claims is a complete agentic infrastructure stack. The pitch: stop assembling model routers, search layers, embedding providers, and sandboxed execution environments from separate vendors. Use one platform instead.

## The Problem

Building production AI agents today is an exercise in duct tape. A typical agent stack requires: a model router to pick the right LLM for each subtask, a search or RAG pipeline for grounding responses, an embeddings provider for semantic retrieval, and some form of isolated code execution for when the agent needs to actually *do* something. Each piece comes from a different vendor, with different APIs, different failure modes, and different billing models.

Perplexity's thesis is straightforward — this fragmentation is the bottleneck, not model intelligence.

## What Launched: Four APIs

### Agent API — Managed Runtime for Agentic Workflows

The Agent API is a single endpoint that handles multi-step task orchestration. Instead of building your own model router, search layer, and retry logic, you point one API at your tools and data. Perplexity handles routing across 20+ frontier models (Claude 4.5, GPT-5.2, Gemini 2.0), retries on failure, and context management internally.

The agent can call built-in tools like `web_search` and `fetch_url`, hit user-defined endpoints, and break complex objectives into subtasks delegated to specialized sub-agents. Perplexity claims this replaces "a model router, a search layer, an embeddings provider, a sandbox service, and a monitoring stack with a single integration point."

**Confidence: Medium** — The concept is sound and the orchestration problem is real, but we haven't seen production-scale benchmarks or developer testimonials yet. The API is in beta.

### Sandbox API — Isolated Code Execution

The most technically interesting release. The Sandbox API provides ephemeral, session-scoped Kubernetes containers supporting Python, JavaScript, and SQL. Agents can execute code, generate charts, transform data, and run computations in a fully isolated environment — no cross-task contamination.

This addresses a genuine gap: most agentic systems today either skip code execution entirely (limiting usefulness) or bolt on insecure subprocess calls. Perplexity's approach with auditability and statefulness built in is architecturally sensible.

**Confidence: Medium-High** — Isolated sandboxed execution is a proven pattern (see Modal, Code Interpreter). The novelty is in the tight integration with the agent orchestration layer.

### Search API — Now with Span-Level Labeling

An update to Perplexity's existing Search API, now returning more granular, span-level labeled snippets instead of full document blocks. For RAG pipelines, this is a meaningful efficiency gain — you retrieve only the relevant portion of a source, reducing token costs on downstream LLM calls.

Perplexity has a legitimate structural advantage here: their own web index and real-time crawling infrastructure gives them retrieval quality that generic embedding-search providers can't easily match.

**Confidence: High** — Search is Perplexity's core competency. Span-level labeling is a logical evolution, and the token-cost argument for RAG pipelines is compelling.

### Embeddings API — Web-Scale Retrieval

A new embedding model trained on Perplexity's own web index, optimized for real-time retrieval rather than static document search. Perplexity claims it outperforms Google's latest embeddings on specific semantic search benchmarks.

**Confidence: Low-Medium** — Claims about outperforming Google on benchmarks need independent verification. Training on a proprietary web index is a genuine differentiator, but we'd want to see the actual benchmark numbers, methodology, and which specific tasks were measured.

## The Bigger Play: "AI is the Computer"

CEO Aravind Srinivas opened the conference with the line: *"A traditional operating system takes instructions; an AI operating system takes objectives."*

The four APIs aren't launched in isolation — they power Perplexity's "Personal Computer" product, a software layer that turns a user-supplied Mac mini into a 24/7 autonomous agent. The agent monitors triggers (emails, Slack messages, calendar events), breaks high-level goals into subtasks, and executes across local apps and cloud services.

For enterprise users ($200/month Max tier or Enterprise), there's SOC 2 Type II compliance and connectors for Snowflake, Databricks, and HubSpot.

## Competitive Positioning

Perplexity is explicitly positioning against a fragmented ecosystem:

| Layer | Typical Stack | Perplexity |
|-------|--------------|------------|
| Model routing | OpenRouter / custom | Agent API |
| Search/RAG | Pinecone + Brave + custom | Search API |
| Embeddings | OpenAI / Google / Cohere | Embeddings API |
| Code execution | Modal / E2B / custom | Sandbox API |

The consolidation play is real, but there's a lock-in risk worth noting — committing to Perplexity's full stack means dependency on a single provider's model access, search index, and infrastructure.

## Pricing & Availability

- **Agent API**: Included with Perplexity Max ($200/month) or Enterprise
- **Sandbox API**: Same tier
- **Search API**: Existing API, updated with span-level labeling
- **Embeddings API**: New, pricing not yet public
- **Personal Computer**: Waitlist only as of March 12, 2026
- **Hardware**: User-supplied Mac mini (M-series recommended)

## Open Questions

1. **Can Perplexity's model routing match purpose-built routers?** They're competing with OpenRouter, which has deep expertise in model selection and fallback logic.
2. **Will the Embeddings API benchmark numbers hold under independent scrutiny?** "Outperforms Google" is a bold claim that deserves rigorous testing.
3. **What's the vendor lock-in story?** Migrating away from a four-API integrated stack is significantly harder than swapping one provider.
4. **Enterprise adoption**: SOC 2 Type II is table stakes. The Snowflake/Databricks connectors are more interesting, but enterprise sales cycles are long.

## Sources

- [Perplexity Blog: Agent API — A Managed Runtime for Agentic Workflows](https://www.perplexity.ai/hub/blog/agent-api-a-managed-runtime-for-agentic-workflows) (March 12, 2026)
- [Perplexity Blog: Everything is Computer](https://www.perplexity.ai/hub/blog/everything-is-computer) (March 12, 2026)
- [ObjectWire: Perplexity Unveils "Personal Computer" AI Agent & Developer Suite at Ask 2026](https://www.objectwire.org/tech/perplexity/news/perplexity-personal-computer-ai-agent-developer-suite-ask-2026) (March 12, 2026)
- [TechRadar: 'AI is the Computer': Perplexity reveals Personal Computer](https://www.techradar.com/pro/ai-is-the-computer-perplexity-reveals-personal-computer-a-cloud-based-ai-agent-running-on-your-mac) (March 12, 2026)
- [OpenTools: Perplexity AI Unveils 'Personal Computer' for 24/7 AI Project Management](https://opentools.ai/news/perplexity-ai-unveils-personal-computer-for-247-ai-project-management-on-mac-mini) (March 14, 2026)
