---
title: "Pydantic AI: The Type-Safe Agent Framework Built by the People Who Defined Python's Data Layer"
excerpt: "With model-agnostic support for 25+ providers, built-in observability via Logfire, and a unified AI Gateway, Pydantic AI brings the FastAPI-style developer experience to agent development."
coverImage: ""
date: 2026-03-26T12:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: ""
---

## TL;DR

Pydantic AI is an open-source Python agent framework built by the team behind Pydantic Validation, the data layer used by OpenAI's SDK, Anthropic's SDK, LangChain, CrewAI, and virtually every major Python LLM library. Instead of building yet another abstraction layer, Pydantic AI takes the opposite approach: bring type safety, validation, and the FastAPI-style ergonomic design to AI agent development. It supports 25+ model providers, integrates with Pydantic Logfire for observability, and offers a unified AI Gateway for managing multiple providers with a single API key. The project is Apache 2.0 licensed and backed by the same team whose validation library is downloaded hundreds of millions of times per year.

## The Problem

Most AI agent frameworks in Python share a common weakness: they treat LLM outputs as opaque strings. You pass a prompt, get a response, parse it with string manipulation or regex, and hope for the best. When something breaks, you have no type errors, no validation, and no clear way to trace why an agent made a particular decision.

This is ironic, because the Python ecosystem already solved a version of this problem. Sam Colvin's Pydantic library became the de facto standard for data validation in Python. It's used by FastAPI, OpenAI, Anthropic, LangChain, and dozens more. Every time you validate a request body, parse a config file, or deserialize an API response in modern Python, Pydantic is doing the heavy lifting underneath.

Pydantic AI's premise is simple: if Pydantic is already the validation layer for every LLM SDK, why isn't there an agent framework built natively on it? The answer, until recently, was that nobody had tried.

---

## What Pydantic AI Actually Is

Pydantic AI is a Python framework for building production-grade AI agents and workflows. It is not a hosted service, not a cloud platform, and not an API provider. It is a library you install and run in your own code, with optional integrations to Pydantic's commercial observability product (Logfire) and their AI Gateway.

The framework has three core pillars:

**Type-safe agent definition.** Define agents using Python type hints and Pydantic models. The framework validates inputs, outputs, tool arguments, and dependencies at build time, not runtime. IDE autocompletion works. Static type checkers like mypy and pyright catch errors before you run code.

**Model-agnostic execution.** A single `Agent` class works with OpenAI, Anthropic, Gemini, DeepSeek, Grok, Cohere, Mistral, Perplexity, and many more. Switching providers is a string change, not a rewrite.

**Observability and gateway integration.** Built-in hooks for Pydantic Logfire provide OpenTelemetry-based tracing of every model call, tool invocation, and agent step. The Pydantic AI Gateway adds a unified API key, cost controls, and failover across providers.

## Under the Hood

A minimal Pydantic AI agent looks like this:

```python
from pydantic_ai import Agent

agent = Agent(
    'openai:gpt-4o',
    system_prompt='You are a helpful travel assistant.',
)

result = agent.run_sync('What are the top 3 restaurants in Lyon?')
print(result.output)
```

That gives you a working agent in seven lines. But the real power shows up when you add structured outputs and tools:

```python
from pydantic import BaseModel
from pydantic_ai import Agent

class RestaurantRecommendation(BaseModel):
    name: str
    cuisine: str
    price_range: str
    why_good: str

agent = Agent(
    'anthropic:claude-sonnet-4-6',
    result_type=list[RestaurantRecommendation],
    system_prompt='Recommend restaurants. Return structured data.',
)

result = agent.run_sync('Best restaurants in Tokyo for sushi')
for r in result.output:
    print(f"{r.name} ({r.cuisine}) - {r.price_range}: {r.why_good}")
```

The `result_type` parameter tells Pydantic AI to validate the model's output against your type definition. If the LLM returns malformed data, the framework handles retries and correction automatically. No manual JSON parsing. No regex. No hoping.

For tools, the framework supports both decorator-based and class-based patterns:

```python
@agent.tool
def get_weather(city: str) -> str:
    """Get current weather for a city."""
    return fetch_weather(city)
```

Tool arguments are validated with Pydantic at call time. If the LLM passes a wrong type, you get a clear validation error instead of a silent failure.

## The Model and Provider Landscape

Pydantic AI supports a staggering number of providers out of the box:

- **Direct providers:** OpenAI, Anthropic, Gemini, DeepSeek, Grok, Cohere, Mistral, Perplexity
- **Cloud platforms:** Azure AI Foundry, Amazon Bedrock, Google Vertex AI
- **Aggregators:** LiteLLM, Groq, OpenRouter, Together AI, Fireworks AI, Cerebras, Hugging Face
- **Edge/local:** Ollama, Outlines
- **Hosting platforms:** GitHub, Heroku, Vercel, Nebius, OVHcloud, Alibaba Cloud, SambaNova

If your provider is not listed, the custom model interface lets you wire in anything with a Python HTTP client. The architecture separates model abstraction from agent logic, so switching from OpenAI to a local Ollama instance for testing requires changing a string, not refactoring code.

## Pydantic AI Gateway

The Gateway is Pydantic's managed routing layer, accessed through Pydantic Logfire. It provides:

- **Single API key** for all providers. One credential manages access to OpenAI, Anthropic, Google Vertex, Groq, and AWS Bedrock.
- **Cost controls.** Spending caps at project, user, and API key levels with daily, weekly, and monthly limits.
- **BYOK support.** Bring your own provider keys, or pay for inference directly through the platform.
- **Zero translation.** Unlike most API gateways that normalize requests to a common schema, the Gateway passes requests through in each provider's native format. New model features become available immediately, without waiting for gateway abstraction updates.
- **Enterprise features.** SSO, custom roles, and RBAC inherited from Logfire's enterprise tier.

Using the Gateway requires a single line change in your agent definition:

```python
agent = Agent('gateway/openai:gpt-5.2')
```

The Gateway is a commercial product. Free tier is available through Logfire with generous limits. Enterprise pricing is custom.

## Observability with Logfire

Pydantic Logfire is the team's commercial observability platform, built on OpenTelemetry. When paired with Pydantic AI, it provides:

- **Per-agent traces** showing each model call, tool invocation, and decision point
- **Cost tracking** across providers and model calls
- **Eval integration** for systematic performance testing
- **Full application context** including HTTP traffic, database queries, and non-AI code paths

The integration is optional. If Logfire is not installed, Pydantic AI runs with zero observability overhead. If it is installed, instrumentation is a one-liner:

```python
import logfire
logfire.configure()
logfire.instrument_pydantic_ai()
```

Logfire has a free tier that is genuinely usable for small projects. Self-hosting is available on the enterprise plan. If you prefer a different OpenTelemetry backend, Pydantic AI supports that too.

## Evals and Testing

The framework includes a first-class eval system for testing agent performance:

- **Model-graded evals** use an LLM to judge output quality against defined criteria
- **Rule-based evals** check structured outputs against business logic
- **Statistical evals** measure consistency and variance across multiple runs

Results feed into Logfire for longitudinal tracking, so you can see whether a prompt change actually improves agent performance or just changes its behavior.

## Extensibility: Capabilities and MCP

Pydantic AI uses a composable "capabilities" model. A capability bundles tools, hooks, instructions, and model settings into a reusable unit. Built-in capabilities include:

- **Web search** with provider-adaptive tool selection
- **Thinking** for chain-of-thought reasoning
- **MCP** for connecting to external Model Context Protocol servers

Third-party capability packages can be installed from PyPI, or you can define agents entirely in YAML/JSON without writing Python code. The A2A (Agent-to-Agent) protocol support lets Pydantic AI agents interoperate with agents built on other frameworks.

## Human-in-the-Loop and Durable Execution

For production workflows that involve sensitive actions (financial transactions, data writes, external API calls), Pydantic AI supports deferred tool execution with human approval:

```python
@agent.tool(require_approval=True)
def delete_record(record_id: str) -> str:
    """Delete a database record. Requires approval."""
    return db.delete(record_id)
```

Durable execution means agents can preserve progress across transient failures, restarts, and long-running async workflows. This matters for agents that run for minutes or hours, not just request-response cycles.

## Pricing

Pydantic AI the framework is open source under Apache 2.0. There is no cost to use it.

The commercial components have separate pricing:

- **Pydantic Logfire:** Generous free tier with per-project limits. Pro plan starts at $29/month. Enterprise is custom.
- **Pydantic AI Gateway:** Included with Logfire accounts. Usage-based pricing on top of provider costs. BYOK (bring your own keys) is free.

The free tier covers personal projects, small teams, and evaluation use cases. Production observability at scale requires a paid plan.

## Competition and Positioning

Pydantic AI enters a crowded field. Here is how it compares to the major alternatives:

**LangChain/LangGraph** is the most widely adopted framework, with a massive ecosystem. Pydantic AI's team has a legitimate gripe: LangChain uses Pydantic for validation internally, but adds layers of abstraction that Pydantic AI intentionally avoids. If you want fewer abstractions and more type safety, Pydantic AI is the direct alternative.

**CrewAI** focuses on multi-agent role-based collaboration. Pydantic AI supports multi-agent teams but does not impose a role-playing metaphor. It is more flexible but requires more explicit orchestration.

**Agno** (formerly Phidata) optimizes for speed and minimalism with a built-in runtime and control plane. Pydantic AI optimizes for type safety and validation. Agno has a managed runtime; Pydantic AI integrates with Logfire for observability. They solve overlapping but distinct problems.

**Mastra** is the TypeScript equivalent, targeting the Node.js ecosystem. If you are building in Python, Pydantic AI is the native choice.

The strongest argument for Pydantic AI is the team's track record. Pydantic Validation is the data layer for OpenAI's Python SDK, Anthropic's SDK, Google's ADK, LangChain, CrewAI, and dozens more. Building an agent framework on that same foundation means fewer seams between validation, serialization, and agent logic.

## The Honest Assessment

Pydantic AI is not a silver bullet. It is a framework for developers who already know Python, understand type systems, and want to build agents with the same rigor they apply to the rest of their stack. It does not provide a hosted platform, a visual builder, or a no-code interface. If you want those, look at proprietary platforms instead.

The Logfire and Gateway products are commercial offerings. While the free tier is generous, enterprise-grade observability and multi-provider routing will eventually require a paid plan. This is the company's business model, and it is transparent about it.

The framework is relatively young compared to LangChain. The ecosystem of third-party tools, tutorials, and community content is smaller. For a greenfield project, this matters less than you might think, but for an existing LangChain codebase, migration is a non-trivial effort.

## Getting Started

Installation is straightforward:

```bash
pip install pydantic-ai
```

The documentation at ai.pydantic.dev includes a quickstart guide, extensive examples, and a cookbook of common patterns. The GitHub repository (github.com/pydantic/pydantic-ai) has active development and a responsive community.

For teams already using Pydantic for data validation and FastAPI for web services, the agent framework will feel immediately familiar. The type system, the validation patterns, and the mental model all carry over. That continuity is the product's real differentiator, not any single feature.

## Sources

- [Pydantic AI Documentation](https://ai.pydantic.dev/)
- [Pydantic AI GitHub Repository](https://github.com/pydantic/pydantic-ai)
- [Pydantic AI Gateway Documentation](https://ai.pydantic.dev/gateway/)
- [Pydantic Logfire](https://pydantic.dev/logfire)
- [Pydantic AI Examples](https://ai.pydantic.dev/examples/)
- [Pydantic AI Pricing](https://pydantic.dev/pricing/)
