---
title: "Laminar API: Open-Source Observability Built for AI Agents"
excerpt: "Laminar is an open-source, Rust-powered observability platform purpose-built for AI agents, offering tracing, evals, and natural-language AI monitoring in one unified stack."
coverImage: "/assets/blog/laminar-cover.jpg"
date: 2026-03-22T06:57:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/laminar-cover.jpg"
---

If you have ever tried to debug an AI agent running in production, you know the pain. A multi-step agent calls an LLM, hits a tool, loops back, calls another model, and somewhere in that chain something goes wrong. Good luck figuring out where. Standard logging gives you flat text. APM tools give you HTTP traces. Neither tells you what your agent was actually thinking when it decided to take the wrong action.

Laminar, a YC S24 backed open-source project, is trying to solve exactly that.

## TL;DR

Laminar is an open-source observability platform purpose-built for AI agents. It provides tracing across LLM calls, tool executions, and custom functions. It adds evals with a CLI and UI. It lets you define monitoring signals using natural language descriptions. And it gives you raw SQL access to all your trace data. The backend is written in Rust, the SDKs work with Python and TypeScript, and the whole thing can be self-hosted with a single Docker Compose command.

## The Problem

Most AI observability tools were built for the simpler era of single LLM calls. You send a prompt, get a response, log the latency and token count. Done.

Agents break that model. They chain dozens of calls. They branch. They loop. They call external tools that might fail. A single user request can generate a tree of spans that looks more like a microservice architecture than a chatbot. You need observability that understands this structure, not just flat request-response logging.

## Tracing That Actually Understands Agents

Laminar's tracing is OpenTelemetry-native. One line of code auto-instruments calls to the Vercel AI SDK, LangChain, Browser Use, Stagehand, OpenAI, Anthropic, Gemini, and more. You can also manually wrap any function with an `observe()` decorator or wrapper to capture its inputs, outputs, and execution time.

Here is the TypeScript setup:

```typescript
import { Laminar } from '@lmnr-ai/lmnr';
Laminar.initialize({ projectApiKey: process.env.LMNR_PROJECT_API_KEY });
```

And the Python equivalent:

```python
from lmnr import Laminar
Laminar.initialize(project_api_key="<LMNR_PROJECT_API_KEY>")
```

Once initialized, traced data flows to the Laminar UI in real time. The UI renders traces as nested span trees, so you can see exactly which LLM call preceded which tool execution and how long each step took. The rendering engine is custom-built and realtime, which matters when you are debugging a live agent that is still processing requests.

For browser agents specifically, Laminar captures screen recordings and syncs them with the trace timeline. If you are running agents with Browser Use, Stagehand, or Playwright, this gives you a visual replay of what the agent saw on screen alongside the execution trace. That is a meaningful debugging shortcut for anyone building web automation agents.

## Evals as a First-Class Citizen

Tracing tells you what happened. Evals tell you whether what happened was any good.

Laminar treats evaluations as a core workflow, not an afterthought. There is an SDK and CLI for running evals locally or in CI pipelines. The UI lets you compare results side by side. And you can build evaluation datasets directly from production traces, which closes the loop between what your agent does in the wild and what you test against in development.

This matters because the traditional approach to evals, write a test suite, run it manually, hope it catches regressions, does not scale for agents whose behavior is non-deterministic by nature. Laminar's model lets you mine real failures from production, turn them into test cases, and run them automatically on every deploy.

## Natural Language Monitoring with Signals

This is the most interesting feature. Laminar lets you describe patterns and errors in plain English and then tracks those descriptions across all traces, past and future. They call these Signals.

Instead of writing regex rules or threshold-based alerts, you write something like "the agent failed to complete the booking flow" or "the agent hallucinated a product name." Laminar extracts matching patterns from your trace data and持续 monitors for them.

The use case here is production monitoring for agent behavior that is too fuzzy for traditional alerting. You cannot write a SQL WHERE clause for "the agent sounded unconfident," but you can describe it in natural language and let Laminar find the instances.

## SQL Access and Dashboards

For teams that want structured access to their trace data, Laminar provides a built-in SQL editor. You can query traces, metrics, and events with standard SQL. You can bulk-create evaluation datasets from query results. And you can build custom dashboards with the SQL queries as data sources.

This is a differentiator compared to tools that lock you into their query language or UI filters. If you know SQL, you can extract anything from the platform. The SQL API is also available programmatically, so you can pull trace data into your own applications or reporting tools.

## Self-Hosting

The project is open source under the MIT license. The repository is at [github.com/lmnr-ai/lmnr](https://github.com/lmnr-ai/lmnr). Self-hosting is a Docker Compose setup:

```bash
git clone https://github.com/lmnr-ai/lmnr
cd lmnr
docker compose up -d
```

The UI is available at `http://localhost:5667`. For production, there is a full compose file with all services. The backend is written in Rust, which is not an accident. The README specifically calls out extremely high performance, ultra-fast full-text search over span data, and a gRPC exporter for tracing data. These are the choices you make when you expect to ingest millions of spans per day.

For the Signals feature in self-hosted mode, you need a Google Generative AI API key to power the natural language understanding layer.

## Pricing

Laminar offers a managed platform at [laminar.sh](https://laminar.sh) with a free tier and paid plans. Self-hosting is free and fully featured. The pricing page does not publish specific numbers for paid tiers, which typically means they scale with trace volume and team size.

## Should You Use It

Laminar is not for everyone. If you are making single LLM calls with a straightforward prompt, the overhead of setting up a full observability platform is not worth it. Tools like LangSmith, Braintrust, or even Helicone are simpler for that use case.

Where Laminar earns its keep is when you are building multi-step agents with branching logic, tool use, and browser automation. The combination of nested tracing, session replay for browser agents, evals built from production data, and natural language monitoring is specifically designed for that complexity tier.

It is also a good fit if you want to self-host. The Rust backend, OpenTelemetry compatibility, and Docker Compose deployment make it one of the more practical self-hosted observability options for AI workloads.

## Key Links

- Website: [laminar.sh](https://laminar.sh)
- Documentation: [docs.laminar.sh](https://docs.laminar.sh)
- GitHub: [github.com/lmnr-ai/lmnr](https://github.com/lmnr-ai/lmnr)
- TypeScript SDK: [npmjs.com/package/@lmnr-ai/lmnr](https://www.npmjs.com/package/@lmnr-ai/lmnr)
- Python SDK: [pypi.org/project/lmnr](https://pypi.org/project/lmnr/)
