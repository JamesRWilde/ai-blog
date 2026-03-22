---
title: "Exa: The Neural Search API Built for AI Agents, Not Humans"
excerpt: "Exa is a semantic search API that replaces keyword-based retrieval with neural embeddings, purpose-built for AI applications that need accurate, structured web data rather than ranked link lists."
coverImage: "/assets/blog/exa-ai-cover.jpg"
date: 2026-03-16T20:30:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/exa-ai-cover.jpg"
---

## TL;DR

Exa (formerly Metaphor) is a search API that uses neural embeddings instead of keyword matching, designed from the ground up for AI agents and LLM pipelines. Founded by two Harvard CS graduates and backed by Y Combinator, it offers multiple search modes (keyword, neural, and hybrid), a contents retrieval endpoint, and an answer endpoint that returns cited responses. It powers search for companies like Notion, OpenRouter, Vercel, and Databricks, with pricing starting at $7 per thousand searches and a free tier of 1,000 monthly requests.

## The Problem

Traditional search APIs, whether Google, Bing, or Brave, were built for human eyeballs. They return ranked lists of blue links and snippets, optimized for click-through rates, not structured data consumption. When an AI agent needs to search the web, it doesn't want ten links; it wants the relevant information extracted, contextualized, and ready to feed into a prompt.

The gap gets wider when you consider what AI applications actually need. A RAG pipeline doesn't benefit from a SERP. A research agent doesn't want to parse HTML. An AI assistant answering questions needs content that's semantically relevant to the query, not just keyword-matched. Traditional search treats "revenue growth" and "financial performance" as different things. A neural search system understands they're often the same concept.

This is the architectural mismatch that Exa exists to solve: search infrastructure that speaks the language of embeddings, not keywords.

## How Exa Works

Exa exposes a REST API with three core endpoints, each serving a distinct purpose in the AI pipeline:

**Search** (`POST /search`) is the primary endpoint. It accepts a natural language query and returns structured JSON results. Unlike keyword search, Exa converts the query into an embedding and matches it against a pre-indexed web corpus using semantic similarity. The `type` parameter lets you choose the search mode:

- `keyword` — traditional keyword matching, fast and familiar
- `neural` — pure embedding-based semantic search
- `auto` — Exa decides which mode fits the query best

The results include title, URL, published date, relevance score, and optional extracted content via the `contents` parameter. You can request highlights (relevant excerpts optimized for token efficiency) or full-page text.

```python
from exa_py import Exa

exa = Exa(api_key="your-api-key")

result = exa.search(
    "companies building autonomous vehicle perception systems",
    type="neural",
    num_results=10,
    contents={
        "highlights": {
            "max_characters": 4000
        }
    }
)
```

**Contents** (`POST /contents`) retrieves structured content from specific URLs. Rather than returning raw HTML, Exa extracts clean text, highlights, and metadata. This is the endpoint for agents that already have URLs and need the actual content. At $1 per thousand pages, it's significantly cheaper than running your own scraper.

**Answer** (`POST /answer`) generates a direct answer to a query with inline citations. Think of it as Perplexity-as-a-service. The API searches, synthesizes, and returns a cited answer in one call at $5 per thousand answers.

## Agentic Search: Deep Mode

For complex research workflows, Exa offers an Agentic Search mode with a `deep` parameter. This runs a longer, multi-step search process that reasons about results before returning them. The latency is higher (4-30 seconds vs 100-1200ms for standard search), but the quality tradeoff is significant for research-heavy use cases.

Agentic Search costs $12 per thousand requests, or $15 per thousand with reasoning enabled. It's designed for multi-step agent workflows where the search quality matters more than response speed, think deep research, due diligence, or technical investigation tasks.

The structured output support in Agentic Search means you can define a JSON schema and receive results conforming to it, which eliminates the parsing step entirely for downstream processing.

## Dedicated Web Indexes

Exa maintains specialized web indexes for different verticals: people, companies, code documentation, financial data, and news. This is a meaningful architectural choice. Rather than one general-purpose index with mediocre coverage everywhere, Exa builds dedicated indexes optimized for specific search patterns.

When you search for a person, you're querying an index that understands professional profiles, not blog posts that happen to mention the name. When you search for a company, you get results weighted toward financial filings, press releases, and product pages. This vertical specialization is what allows Exa to claim benchmark leadership on tasks like the "Tip-of-Tongue" retrieval challenge, where it scores 54.4% versus Google's 8.2%.

## Key Features

**Highlights.** Instead of dumping full page content into your context window (expensive and noisy), Exa's highlights extract only the most relevant excerpts for your specific query. This is a token optimization layer that makes a real difference at scale. A page might have 10,000 tokens of content, but the relevant section for your query might be 200 tokens. Highlights find that section.

**Similarity Search.** Pass a URL and Exa finds semantically similar pages across the web. This is useful for competitive research (find products similar to X), content discovery (find articles similar to Y), and data enrichment (find pages that talk about Z in the same way as your reference page).

**Date and Domain Filtering.** Scope results by date range or specific domains. Essential for applications where source freshness or credibility matters.

**SOC 2 Type II Certification and Zero Data Retention.** For enterprise customers, Exa offers ZDR options where queries and results are automatically purged. Single sign-on is available for team management.

**MCP Server.** Exa provides a native MCP (Model Context Protocol) server, making it a drop-in tool for agent frameworks like LangChain, CrewAI, and OpenClaw.

## SDKs and Integration

Exa provides official SDKs for Python (`exa-py`) and JavaScript (`exa-js`), both available via standard package managers. The SDK surface is minimal, which is a strength: there's one main client class, one main `search()` method, and the configuration lives in the parameters you pass.

For teams not using the SDKs, the raw REST API follows a clean pattern: `POST /search`, `POST /contents`, `POST /answer`, all authenticated via an `x-api-key` header. The API returns standard JSON with no exotic formatting.

## Pricing

- **Free:** 1,000 requests/month, no credit card required
- **Search:** $7/1k requests (1-10 results), +$1/1k additional results
- **Agentic Search:** $12/1k requests (Deep mode), +$3/1k with reasoning enabled
- **Contents:** $1/1k pages per content type
- **Answer:** $5/1k answers (direct answers with citations)
- **Research:** $5/1k agent operations, plus $5/1M reasoning tokens

The free tier of 1,000 requests per month is genuinely usable for prototyping and small applications. No credit card is required to start. For startups and education projects, Exa offers $1,000 in free credits through their grants program.

The pricing is competitive with alternatives like Tavily ($0.005-0.015 per search depending on depth) and Brave Search API ($0.003-0.005 per query). Exa positions itself at the premium end, reflecting its neural search architecture and vertical indexes.

## Who Uses Exa

The customer list reads like a who's who of AI infrastructure. Notion uses Exa for search features in its AI products. OpenRouter, the model-agnostic API gateway, relies on Exa for grounding AI responses in real-world data. Vercel CEO Guillermo Rauch has called it "Perplexity-as-a-service." Databricks uses Exa's search for training data collection. StackAI integrates Exa as the web search layer for its AI agent platform.

These aren't hobby projects. They're production systems where search quality directly impacts product quality, which suggests Exa's neural approach is delivering on its promise in real-world deployments.

## Competitive Landscape

Exa competes in the search-for-AI space alongside several players:

**Tavily** is the most direct competitor, also purpose-built for AI agents with a similar API-first approach. Tavily's pricing is slightly lower and its SDK ecosystem is broader, but Exa's neural search architecture and vertical indexes give it a potential quality edge on semantic queries.

**Brave Search API** offers the reliability of an established search engine at lower per-query costs, but returns traditional SERP-style results rather than content optimized for AI consumption.

**Perplexity Sonar API** leverages Perplexity's own search infrastructure but is newer as a standalone API offering and carries more vendor lock-in risk.

**Linkup**, a Paris-based startup, focuses on factuality-first search with SimpleQA benchmark results, but has a smaller index and less enterprise traction.

Exa's moat is its neural-first architecture and the specialized vertical indexes that come with it. For applications where semantic understanding matters more than raw speed or cost, it has a defensible position.

## Getting Started

The onboarding flow is straightforward: sign up at dashboard.exa.ai, grab an API key, and install the SDK. The playground in the dashboard lets you test queries interactively before writing code, and the docs include quickstart examples for Python, JavaScript, and cURL.

A coding agent quickstart is available for teams using AI-assisted development, claiming setup in under a minute. Given the SDK surface area, that claim is credible for a basic integration.

For enterprise deployments, the path runs through sales for custom rate limits, volume pricing, ZDR configuration, and SLAs. The SOC 2 Type II certification and SSO support reduce the procurement friction for enterprise teams.

---

*Exa is a Y Combinator-backed company founded by Will Bryk and Jeff Wang, both Harvard CS graduates. The API is generally available with a free tier. More at [exa.ai](https://exa.ai).*
