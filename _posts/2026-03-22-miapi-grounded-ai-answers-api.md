---
title: "MIAPI - The Budget-Friendly API That Puts Perplexity on Notice"
excerpt: "MIAPI delivers web-grounded AI answers with inline citations and confidence scores through a single REST endpoint, starting at $2.50 per thousand queries."
date: 2026-03-22T08:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
coverImage: "/assets/blog/miapi-cover.jpg"
ogImage:
  url: "/assets/blog/miapi-cover.jpg"
---

## TL;DR

MIAPI is a developer-focused API that returns AI-generated answers backed by real-time web search results. One API call. You get an answer with [1][2] citation markers, source URLs, and a confidence score. Pricing starts at $2.50 per 1,000 queries with a free tier of 500 queries per month. It is OpenAI-compatible, meaning a one-line URL swap lets existing ChatGPT integrations produce web-grounded answers instead of hallucinations.

## The Problem It Solves

Anyone who has built an LLM-powered product knows the drill. Your chatbot confidently makes up facts. Your RAG pipeline returns stale data. Your users ask about current events and get a response from 2023. Web-grounding fixes this by forcing the model to cite real sources, but the existing options are either expensive or incomplete.

Perplexity's Search API runs roughly $5 to $12 per thousand queries. Their Sonar Pro tier pushes that to $8 to $15. Google's Grounding API costs $14 to $35 per thousand. And most cheaper alternatives skip key features like knowledge mode or streaming.

MIAPI positions itself as the budget option that still ships everything: citations, knowledge mode, news search, image search, streaming, and OpenAI compatibility. At $2.50 per thousand queries on the Scale tier, it is roughly 60 percent cheaper than Perplexity Search and a fraction of Google's pricing.

## How It Works

The core endpoint is straightforward. Send a POST request with a question. Get back an answer with sources.

```
curl -X POST https://api.miapi.uk/v1/answer \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_API_KEY" \
  -d '{
    "question": "What is quantum computing?",
    "citations": true,
    "include_sources": true
  }'
```

The response includes the answer text with inline citation markers, an array of source objects with titles and URLs, a confidence score between 0.0 and 1.0, and timing metadata.

```
{
  "answer": "Quantum computing uses qubits... [1][2]",
  "sources": [
    {"title": "Quantum Computing Overview", "url": "https://...", "snippet": "..."}
  ],
  "confidence": 0.9,
  "cached": false,
  "query_time_ms": 1200
}
```

Average response time sits around 1.1 seconds. Built-in caching means repeat queries come back in milliseconds with an X-Cache: HIT header.

## Feature Breakdown

**Web-Grounding with Citations.** Every answer includes [1][2] style markers linked to the actual source URLs. No citations without sources, no sources without citations.

**Knowledge Mode.** Pass your own documents as context. MIAPI answers from your data, web search, or both. This makes it a one-stop-shop for RAG without needing a separate embedding pipeline.

**OpenAI Compatibility.** The /v1/chat/completions endpoint works as a drop-in replacement. Change the base_url in your OpenAI client and your existing code produces grounded answers.

**Streaming.** Server-Sent Events streaming sends sources first, then tokens progressively. Same feel as ChatGPT.

**Search-Only Mode.** Raw search results without LLM processing. Built for LangChain, LlamaIndex, or bring-your-own-model setups.

**News and Image Search.** Dedicated endpoints for news articles (with dates and sources) and image search (with thumbnails and dimensions).

## Pricing Tiers

| Tier | Price | Queries | Per 1,000 | Keys | Rate Limit |
|------|-------|---------|-----------|------|------------|
| Free | $0 | 500/month | - | 1 | 60/min |
| Starter | $9 | 2,500 | $3.60 | 5 | 120/min |
| Developer | $33 | 10,000 | $3.30 | 5 | 120/min |
| Pro | $90 | 30,000 | $3.00 | 5 | 120/min |
| Scale | $250 | 100,000 | $2.50 | 5 | 120/min |

All paid tiers are one-time purchases. No subscriptions. Queries never expire. The free tier refills monthly.

For context, 100,000 queries on Perplexity Search would run $500 to $1,200. On MIAPI Scale, that is $250 one-time. The gap widens at higher volumes.

## Developer Experience

The Python SDK installs via pip and covers all endpoints with sync and async support.

```
pip install miapi-sdk
```

```
from miapi import MIAPI

client = MIAPI("YOUR_API_KEY")

# Grounded answer with citations
result = client.answer("What is CRISPR?", citations=True)
print(result.answer)
print(result.sources)

# Knowledge mode
result = client.answer(
    "What is the return policy?",
    mode="knowledge",
    knowledge="Returns accepted within 30 days..."
)

# Streaming
for event in client.stream("Explain quantum computing"):
    if event['type'] == 'answer':
        print(event['content'], end='', flush=True)
```

MIAPI also ships an MCP (Model Context Protocol) server for integration with Cursor, Claude Desktop, Windsurf, and other MCP-compatible assistants. One install and your coding assistant gets web search with citations.

## Where It Stands vs. the Competition

The grounded AI answers API space is crowded but not deep. Most competitors force a tradeoff between features and price:

**Perplexity** has the brand recognition and the deepest model tuning, but their pricing reflects that. Search API at $5 to $12 per thousand queries. Sonar Pro at $8 to $15. If you need their specific model quality and do not mind paying for it, they remain the default choice.

**Brave AI Grounding** offers answers with citations but lacks knowledge mode, OpenAI compatibility, and streaming. Priced around $5 to $8 per thousand.

**Tavily** bundles news search and knowledge mode but costs $8 per thousand and does not include OpenAI-compatible chat completions.

**Google Grounding API** has the best raw search infrastructure but at $14 to $35 per thousand, it is the most expensive option by a wide margin.

**Exa.ai** offers answer generation but skips citations, knowledge mode, and streaming. Pricing ranges $5 to $25 per thousand.

MIAPI claims all six major features at the lowest price point. The tradeoff is that it is a newer, smaller operation. You are betting on an indie team over established players. For production workloads, the $0 free tier makes it straightforward to validate before committing.

## Practical Considerations

**Strengths:**
- Cheapest grounded answers API on the market right now
- OpenAI-compatible, so integration effort is minimal
- Knowledge mode eliminates the need for a separate RAG pipeline in many cases
- One-time purchase pricing with no subscription lock-in
- Free tier is generous enough for prototyping

**Limitations:**
- Newer service with less battle-tested infrastructure than Perplexity or Google
- No published SLA on paid tiers below Enterprise
- The underlying LLM is proprietary and not user-selectable
- Enterprise features (on-prem, custom rate limits) require contacting sales

## Who Should Try This

Developers building AI products that need current, cited information without Perplexity-level billing. Chatbots, research assistants, customer support agents, and RAG pipelines are the obvious use cases. The free tier makes it cost nothing to find out if the answer quality meets your bar.

If you are currently paying for Perplexity Search or Tavily and your volume is in the tens of thousands of queries per month, the savings are worth testing. At 30,000 queries monthly, MIAPI Pro costs $90 one-time versus $150 to $360 per month on competitors.

## Getting Started

Sign up at [miapi.uk](https://miapi.uk) for a free API key. 500 queries per month, no credit card required. The Python SDK is on [GitHub](https://github.com/Doyukndr/miapi-python) and the full API documentation is available on the site.
