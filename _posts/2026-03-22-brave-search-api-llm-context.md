---
title: "Brave Search API Gets Its Biggest Update Yet: The LLM Context API"
excerpt: "Brave launches the LLM Context API, a new search endpoint that delivers pre-extracted, relevance-scored web content optimized for AI agents, RAG pipelines, and LLM grounding. Testing shows open-weight models using Brave's context beating ChatGPT and Perplexity."
coverImage: "/assets/blog/brave-search-api-cover.jpg"
date: 2026-03-22T12:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/brave-search-api-cover.jpg"
---

## TL;DR

Brave has launched the LLM Context API, a fundamentally different approach to search for AI applications. Instead of returning URLs and snippets like a traditional search API, it extracts actual page content (text, tables, code blocks, structured data) and ranks it by relevance, all optimized for LLM consumption. The company's own testing shows that less powerful open-weight models using Brave's LLM Context API can beat ChatGPT, Perplexity, and Google AI Mode on answer quality.

## The Problem

Every AI application that needs to ground its responses in current web data faces the same bottleneck. Search APIs return links and brief snippets, forcing developers to scrape pages themselves, deal with HTML noise, manage rate limits, and burn tokens on irrelevant content before their LLM can even begin reasoning. The gap between "search results" and "LLM-ready context" is wide, expensive, and mostly manual.

Existing workarounds involve chaining search with scraping with chunking with embedding with retrieval. Each step adds latency, cost, and points of failure. For agentic applications making dozens of tool calls per task, the token overhead of raw web content becomes prohibitive.

---

Brave's answer to this is the LLM Context API, launched on February 6, 2026. It is built on top of Brave's independent search index, one of only three globally scaled indexes in the western world outside of Google and Bing.

The LLM Context API is not a scraping wrapper. It performs real-time content extraction directly from Brave's own index, converting raw HTML into smart, relevance-ranked chunks specifically formatted for LLM consumption. The pipeline handles clean text extraction, structured data from JSON-LD schemas and tables, specialized code context extraction, forum discussion threads, and YouTube captions. Each chunk is scored by an in-house ranking system trained to identify the most relevant bits for the query.

The result is a single API call that returns pre-extracted, ranked web content ready to drop into any LLM prompt. No scraping, no cleaning, no chunking pipeline.

### Key Technical Details

The endpoint accepts GET and POST requests at `https://api.search.brave.com/res/v1/llm/context` with authentication via a standard API key header. Core parameters include:

- **Token budget control**: Set `maximum_number_of_tokens` (1024 to 32768) to fit your LLM's context window
- **Relevance filtering**: Choose between strict, balanced, lenient, or disabled threshold modes
- **URL limits**: Control `maximum_number_of_urls` (1 to 50) and per-URL token allocation
- **Goggles support**: Custom re-ranking rules to restrict or boost specific sources (unique to Brave)
- **Freshness filters**: Filter by age (past day, week, month, year, or custom date ranges)
- **Location awareness**: Pass location headers for local/POI queries with map data in the response

Brave reports sub-600ms total latency at p90, with less than 130ms overhead on top of normal search. For AI agents making multiple tool calls per task, this latency matters.

### The Benchmark Results That Matter

Brave ran a head-to-head evaluation of major AI answer engines using 1,500 real-world queries. Claude Opus 4.5 and Claude Sonnet 4.5 served as LLM judges in a pairwise comparison. The results:

| Engine | Avg Rating | Win Rate | Lose Rate |
|--------|-----------|----------|-----------|
| Grok | 4.71 | 59.87% | 10.05% |
| Ask Brave (Qwen3) | 4.66 | 49.21% | 15.82% |
| Google AI Mode | 4.39 | 27.07% | 38.17% |
| ChatGPT | 4.32 | 23.87% | 42.22% |
| Perplexity | 4.01 | 10.51% | 64.26% |

The critical detail: Ask Brave uses Qwen3, an open-weight model. It beats ChatGPT, Google AI Mode, and Perplexity in answer quality not because of a bigger model, but because of better grounding context. The same LLM Context API that powered Ask Brave is now available to external developers.

### Pricing

Brave restructured its API plans with this launch:

- **Search plan**: $5 per 1,000 requests, includes Web, LLM Context, Images, News, Videos, and more
- **Answers plan**: $4 per 1,000 web searches plus $5 per million tokens (input and output)
- **Every plan gets $5 in free monthly credit** that renews automatically

The Search plan is where the LLM Context API lives. At $5 per 1,000 requests, it is competitively priced against alternatives like Tavily and Exa while offering something neither provides: an independent, SOC2-certified index with true Zero Data Retention.

### Why This Matters for AI Developers

The timing of this launch aligns with a broader industry shift. As frontier models commoditize, context quality becomes the differentiator. The best model with bad input produces worse output than a smaller model with excellent input. Brave's benchmark data makes this case clearly, and it has practical implications for cost: if you can get frontier-level answers from an open-weight model by improving your search context, you can cut inference costs dramatically.

For developers building AI agents, RAG pipelines, or research tools, the LLM Context API eliminates the entire search-to-scraping-to-chunking pipeline. It is not the only option in this space, but it is the only one powered by a fully independent search index at global scale rather than scraping someone else's index.

## Key Takeaways

- The LLM Context API is Brave's new endpoint for delivering pre-extracted, relevance-ranked web content to LLMs in a single API call
- Benchmark data shows context quality matters more than model size for answer quality
- Sub-600ms latency at p90 makes it viable for real-time agentic applications
- Goggles support offers source filtering unique to Brave's platform
- $5 free monthly credit makes it essentially free to experiment with
- SOC2 Type II certified with true Zero Data Retention for enterprise use
