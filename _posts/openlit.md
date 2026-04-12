---
title: "OpenLIT: The Open-Source Platform Putting LLM Observability on OpenTelemetry Rails"
excerpt: "OpenLIT brings OpenTelemetry-native tracing, evaluations, prompt management, and GPU monitoring to AI teams. It is free, self-hosted, and runs in a single Docker command."
coverImage: "/assets/blog/openlit-cover.jpg"
date: 2026-03-22T12:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/openlit-cover.jpg"
---

## TL;DR

OpenLIT is a free, open-source AI engineering platform built entirely on OpenTelemetry standards. It gives development teams distributed tracing for LLMs, agents, and vector databases, plus prompt versioning, automated evaluations, a model comparison playground called OpenGround, GPU monitoring, and a secrets vault. You can self-host it with Docker Compose in under a minute, or deploy its Kubernetes operator for zero-code instrumentation across an entire cluster.

## The Problem

Teams shipping LLM-powered applications into production hit the same wall eventually. You have traces scattered across LangSmith, cost logs in your billing dashboard, GPU metrics in a separate monitoring tool, and prompts pinned in Slack threads. There is no single pane of glass. Worse, most observability tools for AI are SaaS-only, which means your prompts, completions, and API keys live on someone else's servers.

Existing solutions like Langfuse, Helicone, and Arize are capable products, but they each lean on proprietary telemetry formats. If your organization already runs Grafana, Jaeger, or any OpenTelemetry-compatible backend, bolting on a walled-garden observability layer creates friction. You end up maintaining two parallel pipelines for monitoring data.

## What OpenLIT Does

OpenLIT takes a different approach. The entire platform is OpenTelemetry-native, which means traces and metrics flow into any standard OTLP-compatible collector and backend. The company co-maintains the OpenTelemetry Semantic Conventions for GenAI, so the data model is not proprietary, it is a community standard.

The platform breaks down into three components:

### 1. The SDK (Auto-Instrumentation)

A single line of code (`pip install openlit` followed by `openlit.init()`) auto-instruments every LLM call, agent loop, vector database query, and GPU metric in your application. It supports over 50 integrations including OpenAI, Anthropic, Mistral, Cohere, vLLM, LangChain, LlamaIndex, Pinecone, Weaviate, Chroma, and Ollama. Traces include token counts, latency, cost estimates, and full input/output payloads.

The SDK also supports MCP (Model Context Protocol) instrumentation, which is relevant for teams building agent systems that call external tools.

### 2. The Self-Hosted Platform

The OpenLIT backend stores traces in ClickHouse and provides a browser-based UI with dashboards, exception monitoring, prompt management, evaluation pipelines, and a model playground. Key features include:

- **Prompt Hub** — version and deploy prompts centrally without code changes. Think of it as a git-style registry for your prompts.
- **OpenGround** — a side-by-side model comparison tool. You send one prompt and compare cost, latency, and response quality across multiple LLMs. Useful when evaluating whether to switch from GPT-5 to Claude or Mistral for a specific use case.
- **Evaluations** — automated LLM-as-a-judge evaluations that run against live traces. You can also build programmatic eval pipelines for CI workflows.
- **Secrets Vault** — centrally manage API keys and database credentials instead of scattering them across `.env` files.
- **Dashboards** — custom SQL-driven dashboards with resizable widgets for visualizing latency, token usage, cost, and error rates.
- **Fleet Hub** — manage OpenTelemetry Collectors across infrastructure via the OpAMP protocol, with TLS support.

### 3. The Kubernetes Operator

For teams running on Kubernetes, the OpenLIT Operator automatically injects instrumentation into AI application pods without requiring code changes or Docker image rebuilds. You create a Custom Resource selecting target workloads, and the operator handles the rest.

## How It Compares

| Feature | OpenLIT | Langfuse | Helicone | Arize Phoenix |
|---|---|---|---|---|
| Open Source | Yes (Apache 2.0) | Yes (MIT) | Yes (MIT) | Yes (MIT) |
| OpenTelemetry Native | Yes | Partial | No | Partial |
| Self-Hosted | Docker + K8s | Docker + K8s | Cloud only | Docker |
| Kubernetes Operator | Yes | No | No | No |
| Prompt Management | Yes | Yes | No | No |
| LLM Playground | Yes (OpenGround) | Yes | No | Yes |
| GPU Monitoring | Yes | No | No | No |
| Zero-Code K8s Inst. | Yes | No | No | No |

The key differentiator is the OpenTelemetry-native architecture. OpenLIT does not invent its own data format. Traces produced by the OpenLIT SDK can be visualized in any OTel-compatible backend (Grafana Tempo, Jaeger, Datadog, New Relic) without the OpenLIT UI at all. The platform adds a purpose-built AI layer on top, but the data underneath is portable.

## Getting Started

Self-hosting takes one command:

```bash
git clone git@github.com:openlit/openlit.git
cd openlit
docker compose up -d
```

The stack spins up the OpenLIT UI, an OpenTelemetry Collector, and a ClickHouse database. Point your application's SDK at the collector endpoint and traces begin flowing immediately.

For instrumenting your Python application:

```python
pip install openlit

import openlit
openlit.init(
    otlp_endpoint="http://localhost:4318"
)
```

That is it. Every LLM call, vector database query, and agent tool use in your application is now traced with token counts, costs, latency, and full payloads.

## Pricing

OpenLIT is completely free and open source under the Apache 2.0 license. There is no enterprise tier with paywalled features. The company generates revenue through optional support contracts and community sponsorships, similar to the Red Hat or Grafana Labs model.

## Final Thoughts

If your team is already invested in the OpenTelemetry ecosystem and you need AI-specific observability without vendor lock-in, OpenLIT is worth a serious look. The combination of zero-code SDK instrumentation, a Kubernetes operator, and the fact that your data stays on your infrastructure makes it one of the more pragmatic options in this space. The prompt management and OpenGround experiment features are added bonuses that most competing tools either lack or charge extra for.

The main caveat is that as a younger project, the community ecosystem around dashboards and integrations is smaller than Langfuse or Arize. But the OpenTelemetry-native foundation means you are not starting from scratch. Any existing Otel pipeline you already run becomes part of the solution.

Check it out at [openlit.io](https://openlit.io) or the [GitHub repository](https://github.com/openlit/openlit).
