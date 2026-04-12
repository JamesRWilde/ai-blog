---
title: "Linkup: The Web Search API Built From the Ground Up for AI Applications"
excerpt: "Linkup is a REST API that connects AI applications to the internet with factuality-ranked search results, structured answers, and source citations — purpose-built for grounding LLM outputs with real-time web data."
coverImage: "/assets/blog/linkup-cover.jpg"
date: 2026-03-16T20:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/linkup-cover.jpg"
---

## TL;DR

Linkup is a web search API designed specifically for AI applications, not retrofitted from a consumer search engine. Founded in Paris in 2024, it provides structured, citation-backed search results through a clean REST API, with two search modes (Standard and Deep) that let developers trade latency for depth depending on their use case. It ranks first globally on OpenAI's SimpleQA benchmark for factual accuracy, offers a free tier with monthly credits, and charges as little as half a cent per search call.

## The Problem

Most AI applications that need web search rely on one of two paths: repurpose a consumer search API (Google, Brave) that was designed for human browsing, or use a general-purpose scraping tool that returns raw HTML and leaves the developer to figure out what matters. Both approaches introduce friction.

Consumer search APIs return ranked lists of links, which means the developer or the LLM has to fetch, parse, and synthesize content from multiple pages before generating a grounded response. Scraping APIs return unstructured data that requires heavy preprocessing. Neither was designed with the LLM pipeline in mind: what AI applications actually need is a search endpoint that returns *answers with citations* in a format that can be dropped directly into a prompt context window.

The SimpleQA benchmark tells its own story. When OpenAI tested major search-backed AI systems for factual accuracy, most struggled with hallucination rates above 50%. The search layer is where factuality breaks down, and most existing tools weren't architected to solve that problem.

## How Linkup Works

Linkup operates as a straightforward REST API with Bearer token authentication. The core endpoint is `/search`, which accepts a natural language query and returns structured JSON containing an answer and its source citations.

Two depth modes control the tradeoff between speed and comprehensiveness:

**Standard** (€0.005 per call) delivers fast, real-time results suitable for chatbots and conversational AI that need sub-second responses. It queries Linkup's index and returns the most relevant answer with inline source citations.

**Deep** (€0.05 per call) performs more extensive web crawling and synthesis, suitable for business intelligence, research tasks, and complex reasoning chains where accuracy matters more than latency. This mode digs deeper into the web, cross-references multiple sources, and produces more comprehensive answers.

A **Fast** mode (also €0.005) is currently in beta for latency-critical applications.

The API also exposes a `/fetch` endpoint that retrieves and renders specific URLs, with optional JavaScript rendering (€0.005 with JS, €0.001 without). This is useful for agents that need to follow up on a citation or scrape a specific page mentioned in a search result.

SDKs are available for Python and JavaScript:

```python
from linkup import LinkupClient

client = LinkupClient(api_key="<YOUR_LINKUP_API_KEY>")

response = client.search(
    query="What is Microsoft's 2024 revenue?",
    depth="deep",
    output_type="sourcedAnswer"
)
```

The response includes both the synthesized answer and an array of source objects, each containing the page name, URL, a relevant snippet, and a favicon. This structure is designed to be dropped directly into an LLM prompt or displayed in a UI without additional processing.

## Key Features

**Structured Output with Custom Schemas.** Linkup supports returning results in custom JSON schemas, which means developers can define exactly the shape they need for downstream processing. No parsing HTML. No regex. Just the fields you asked for.

**Domain and Date Filtering.** Queries can be scoped to specific domains or date ranges, which is critical for agents working in domains where source credibility matters (financial data, medical information, legal research).

**Inline Citations.** Every answer comes with source citations that can be traced back to the original URL. This isn't an afterthought — it's the core design principle. The API is built to ground LLM outputs, and grounding means showing your work.

**MCP Server.** Linkup ships a native MCP (Model Context Protocol) server, making it a drop-in tool for any AI agent framework that supports the protocol. No custom integration layer needed.

**Prompt Optimizer.** An interactive tool at prompt.linkup.so helps developers craft better search queries, which directly impacts result quality. The documentation is explicit about this: more precise prompts yield better results.

## Pricing and Free Tier

Linkup uses a pay-per-call model with monthly credit refresh. Every new account receives €5 in free credits (equivalent to 1,000 Standard searches), replenished monthly. No credit card is required to start.

For heavier usage, top-up bonuses apply:

| Top-up Amount | Bonus Credits |
|---------------|---------------|
| Over €1,000 | 10% |
| Over €5,000 | 15% |
| Over €10,000 | 20% |

One notable billing policy: no credits are deducted when a request returns an error, including when the API cannot find relevant results for a query. This means developers aren't paying for dead ends.

## Who Is This For

Linkup occupies a specific niche in the AI infrastructure stack. It isn't trying to be a general-purpose search engine or a web scraping platform. It's the layer that connects an LLM to the internet in a way that preserves factuality.

The target audience includes:

- **AI agent builders** who need reliable, low-latency web search as a tool their agent can call
- **RAG pipeline developers** who need to supplement static knowledge bases with real-time web data
- **AI application developers** building products where answer accuracy is a differentiator (legal tech, financial analysis, research tools)
- **Enterprise teams** evaluating search APIs for factuality-sensitive workloads

## Competitive Landscape

Linkup sits alongside other search APIs purpose-built for AI, including Tavily (similar target audience, slightly different pricing model), Brave Search API (consumer search retrofitted for AI use), and Perplexity's Sonar API (backed by Perplexity's own search infrastructure).

The key differentiator Linkup emphasizes is the SimpleQA benchmark result — the claim that it produces more factual answers than competitors when used as the search layer in AI systems. Whether that holds up in production across diverse domains is something developers should test with their own workloads before committing.

The recent strategic partnership with LightOn (announced March 2026), which integrates Linkup's search into LightOn's Paradigm enterprise AI platform, suggests the company is pushing toward enterprise adoption alongside its developer-first API offering.

## Getting Started

The onboarding flow is fast: sign up at app.linkup.so, receive your API key, install the SDK (`pip install linkup-sdk` or `npm i linkup-sdk`), and make your first search call. The playground at app.linkup.so/playground lets you test queries before writing any code.

For teams building AI agents, the MCP server integration means Linkup can be added as a tool alongside other MCP-compatible services without custom plumbing. The documentation includes tutorials for common patterns like building a company research radar and optimizing search prompts.

The 5-minute quickstart claim in the docs is realistic for a basic integration. Production hardening (error handling, rate limiting, domain filtering, schema customization) obviously takes longer, but the API surface is small enough that there's no significant learning curve.

---

*Linkup is a Paris-based startup founded in 2024. The API is generally available with a free tier. More at [linkup.so](https://www.linkup.so).*
