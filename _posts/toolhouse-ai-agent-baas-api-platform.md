---
title: "Toolhouse: The Backend-as-a-Service That Turns AI Agents Into Deployed APIs"
excerpt: "Toolhouse is a Backend-as-a-Service platform that lets developers build, run, and manage AI agents as production-ready APIs with a single CLI command."
coverImage: "/assets/blog/toolhouse-cover.jpg"
date: 2026-03-21T22:30:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/toolhouse-cover.jpg"
---

## TL;DR

Toolhouse is a Backend-as-a-Service (BaaS) that lets you define AI agents as code, test them locally, and deploy them as production APIs with one command. It ships with built-in MCP servers for RAG, memory, code execution, and browser automation. Agents run on a globally distributed runtime, and Toolhouse handles orchestration, observability, and scheduling out of the box.

## The Problem

Building AI agents that actually work in production is still a mess. You need to wire together your LLM calls, tool integrations, memory layers, and retrieval systems. Then you need infrastructure to run it all, monitor it, and keep it alive. Most teams spend weeks on plumbing before they ship a single useful agent.

Toolhouse tries to collapse that entire workflow into a YAML file and a CLI command.

---

## What Is Toolhouse?

Toolhouse (backed by EU NextGenerationEU funding) is a platform for building, running, and managing AI agents. Think of it as the infrastructure layer between your agent logic and the production world.

The core workflow is straightforward:

1. Define your agent in a YAML "th file" using natural language and configuration
2. Test it locally with `th run`
3. Deploy it as an API endpoint with `th deploy`
4. Call it like any HTTP service

No Kubernetes. No custom orchestration layer. No weeks of DevOps.

## Key Features

### CLI-First Development

The `th` CLI is the primary interface. Install it globally:

```bash
npm i -g @toolhouseai/cli
th login
```

Create a new agent file:

```bash
th new hello.yaml
```

A basic th file looks like this:

```yaml
title: News Digest
system_prompt: You are a newsletter curator. Search the web for recent news.
message: What's going on in tech today?
```

Run it locally, iterate on the config, then deploy when ready. The loop from idea to production API is measured in minutes, not days.

### Deploy as an API

Deploying creates a unique URL:

```bash
th deploy hello.yaml
# → https://agents.toolhouse.ai/a1d93c2e-7013-4cea-b857-a27980a52ba2
```

You get a streaming HTTP endpoint. Call it with curl, fetch, httpx, or requests:

```bash
curl -XPOST https://agents.toolhouse.ai/a1d93c2e-7013-4cea-b857-a27980a52ba2
```

The response streams back in real time. No polling, no websocket complexity.

### Built-in MCP Servers

Every Toolhouse agent comes connected to an MCP (Model Context Protocol) server that provides:

- **RAG** (retrieval-augmented generation)
- **Memory** (persistent agent state)
- **Code execution** (sandboxed)
- **Browser automation**

You don't need to set up vector databases or scraping infrastructure. It's all pre-wired.

### Bundles for Scoped Tool Access

Bundles let you group MCP servers and restrict which tools an agent can use. This is useful for:

- **Environment separation** (dev vs. staging vs. production tool sets)
- **Provider-specific configurations**
- **Testing and evaluation** (compare agent behavior with different tool subsets)
- **Accuracy improvement** (fewer tools = less confusion for the LLM)

```yaml
title: Web Researcher
system_prompt: You are a web researcher.
message: Find recent news about AI regulation.
bundle: only_web_search
```

### Schedules (Cron for Agents)

Toolhouse has a built-in cron service. Schedule agents to run at specific intervals using standard cron expressions. No external scheduler needed.

### Observability

Every agent run is logged. Agent Logs show the full execution lifecycle. For deeper debugging, Execution Logs show exactly which MCP servers were called and what they returned. This matters when agents behave unexpectedly in production.

### SDK Integration

The Toolhouse SDK integrates with Vercel AI and LlamaIndex. If you have an existing codebase, you can plug Toolhouse into your current stack rather than rewriting everything.

## Pricing

Toolhouse offers a **Free tier** where agents are public by default. **Pro users** can deploy private agents and unlock additional features. During a promotional period, LLM tokens for Agent Runs are free, with charges only for Toolhouse Execs (the compute that runs your agents).

This pricing model is worth understanding: Toolhouse abstracts away the LLM provider. You don't pay OpenAI or Anthropic directly for agent runs. The platform handles model selection and token costs as part of its service.

## Who Is It For?

Toolhouse makes the most sense for:

- **Solo developers and small teams** who want to ship agents without building infrastructure
- **Product teams** that need to add agent capabilities to existing applications via API
- **Prototyping** where speed-to-deploy matters more than fine-grained infrastructure control

It's less suited for teams that need deep control over model selection, custom inference pipelines, or multi-cloud GPU orchestration. That's a different problem set entirely.

## The Bottom Line

Toolhouse occupies a specific niche: it's not an LLM provider, not a vector database, not an orchestration framework. It's the "just deploy my agent" layer. For teams that want to move fast and avoid infrastructure complexity, it's worth a look.

The free tier makes it easy to experiment. The CLI workflow is genuinely fast. And the built-in MCP servers mean you skip weeks of integration work.

**Website:** [toolhouse.ai](https://toolhouse.ai)
**Docs:** [docs.toolhouse.ai](https://docs.toolhouse.ai)
