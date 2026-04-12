---
title: "Decodo API: The AI-Ready Web Scraping and Proxy Platform for Developers"
excerpt: "Decodo (formerly Smartproxy) combines web scraping APIs, AI-powered parsing, MCP server integration, and 125M+ ethically-sourced IPs into a unified platform for AI data workflows."
coverImage: "/assets/blog/decodo-ai-api-platform.jpg"
date: 2026-03-27T07:43:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/decodo-ai-api-platform.jpg"
---

Web data is the lifeblood of modern AI applications. Retrieval-augmented generation pipelines need fresh content. AI agents need live search results. Price monitoring tools need structured data from e-commerce sites. The problem is not a shortage of public data. It is the gap between raw HTML and the clean, structured inputs that AI systems actually consume.

Decodo, formerly known as Smartproxy, rebranded in 2025 to reflect a broader mission: becoming a full-stack data access and automation platform built for AI-era development. Their API suite spans web scraping, AI-powered parsing, search result retrieval, and direct integration with LLM frameworks through the Model Context Protocol.

## TL;DR

Decodo is an AI-ready API platform offering a Web Scraping API (from $0.09 per 1K requests), an AI Parser that converts raw HTML into structured data with natural language prompts, a Fast Search API returning sub-second SERP results, and an MCP Server that connects LLMs directly to live web data. The platform sits on top of 125M+ ethically-sourced IPs across 195+ locations, with built-in anti-bot handling and CAPTCHA bypass. It integrates with LangChain, n8n, OpenClaw, and any MCP-compatible AI client. Pricing is pay-as-you-go with no setup fees, and the AI Parser is free to use.

## The Platform at a Glance

Decodo's offering breaks down into four API products, each targeting a different stage of the data pipeline:

### Web Scraping API

The core product. Send a URL to Decodo's endpoint and get back structured data in HTML, JSON, CSV, PNG, XHR, or Markdown format. The API handles proxy rotation, JavaScript rendering, and anti-bot bypass automatically.

Key parameters include:

- **Source type**: `universal` for general scraping, or specialized endpoints for `ecommerce`, `serp`, and `social` targets
- **Geotargeting**: Country, state, and city-level targeting via locale parameters
- **JS rendering**: Toggle JavaScript execution for single-page applications
- **Output format**: JSON for structured extraction, Markdown for AI consumption, PNG for screenshots

A typical request looks like this:

```bash
curl -X POST "https://api.decodo.com/v3/scrape" \
  -H "Authorization: Bearer YOUR-API-KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "source": "universal",
    "url": "https://example.com/products",
    "parse": true,
    "locale": "us",
    "render_js": true
  }'
```

Pre-built targets exist for high-demand sites like Amazon, Google, Bing, TikTok, and Zillow. These targets come with optimized parsing configurations so you get structured data without writing custom selectors.

### AI Parser

The AI Parser takes a different approach to data extraction. Instead of writing CSS selectors or XPath queries, you paste a URL and describe what you want in plain language. The parser returns clean JSON.

This matters because selector-based scraping is inherently fragile. A site redesign changes a class name, and your extraction breaks. The AI Parser understands content semantically. Ask it for "product names, prices, and availability" and it figures out which elements correspond to those fields regardless of the underlying HTML structure.

The AI Parser is free to use, which makes it an easy entry point for prototyping or low-volume extraction tasks.

### Fast Search API

Where the Web Scraping API handles arbitrary URLs, the Fast Search API is purpose-built for search engine results. It returns the top organic results or news stories as lean, single-page JSON with sub-second latency. No ads, no SERP clutter, no pagination.

The design target here is real-time systems. AI agents that need live context mid-execution, RAG pipelines that need current ranking data, or dashboards that track brand visibility. Sub-1-second response times make it viable to call synchronously within an agent's reasoning loop.

### MCP Server

The Model Context Protocol Server connects any MCP-compatible LLM or AI agent to Decodo's scraping infrastructure. Once configured, the agent can call web scraping tools natively during inference without custom integration code.

Setup takes under a minute. Either install locally from GitHub or deploy via Smithery. The server exposes tools for Google, Amazon, Reddit, and general web scraping, each returning clean structured data that the model can consume directly.

Supported clients include Claude, VS Code, OpenClaw, and any custom setup that speaks JSON-RPC over MCP.

## The Proxy Foundation

Underneath the API layer sits Decodo's proxy network:

- **Residential proxies**: 115M+ real-user IPs across 195+ locations (from $2 per GB)
- **Mobile proxies**: 10M+ ethically-sourced IPs across 160+ locations (from $2.25 per GB)
- **Static residential**: ISP-issued static IPs (from $0.27 per IP)
- **Datacenter proxies**: 500K+ high-speed IPs (from $0.02 per IP)
- **Site Unblocker**: Automated anti-bot bypass with CAPTCHA handling (from $0.95 per 1K requests)

The proxy layer is what makes the scraping APIs work. When you send a request, Decodo routes it through an appropriate proxy, handles CAPTCHA solving, rotates IPs if needed, and returns clean data. The user never has to think about proxy management.

## AI-First Data Pipeline

Decodo positions itself as an "AI Hub" rather than a traditional proxy provider. Their use case pages emphasize three core AI workflows:

### RAG (Retrieval-Augmented Generation)

Feed fresh web data into vector databases and retrieval systems. The Web Scraping API returns Markdown output that is ready for chunking and embedding. The Fast Search API provides real-time SERP data for grounding prompts in current information rather than stale training data.

### AI Agent Enablement

Give autonomous agents the ability to browse, scrape, and interact with web content. The MCP Server handles the integration layer, and the proxy infrastructure ensures agents do not get blocked mid-task.

### Large-Scale Data Collection

Collect training data or monitoring feeds at scale. The async mode of the Web Scraping API supports high-throughput batch operations with webhook callbacks for result delivery.

## Integrations

Decodo ships first-party integrations for the major AI orchestration frameworks:

- **LangChain**: Official document loader for fetching and cleaning web data within LangChain workflows
- **n8n**: Drag-and-drop node for no-code web scraping automation
- **OpenClaw**: Built-in integration for AI agent web data extraction
- **MCP Server**: Standard protocol support for any MCP-compatible client

The LangChain integration deserves special attention because it removes the need for custom HTTP client code. A LangChain document loader handles authentication, request formatting, and response parsing, so you can drop scraped content directly into a retrieval chain.

## Pricing

Decodo uses a hybrid pricing model. Proxies are billed by bandwidth or per-IP, while scraping APIs are billed per request:

| Product | Starting Price | Model |
|---|---|---|
| Web Scraping API | $0.09 per 1K requests | Per request |
| Site Unblocker | $0.95 per 1K requests | Per request |
| Residential Proxies | $2 per GB | Per GB bandwidth |
| Mobile Proxies | $2.25 per GB | Per GB bandwidth |
| Static Residential | $0.27 per IP | Per IP |
| Datacenter Proxies | $0.02 per IP | Per IP |
| AI Parser | Free | Free tier |
| Fast Search API | Custom pricing | Contact sales |

There is no traditional free trial for the paid APIs, but the AI Parser is genuinely free, and the proxy infrastructure can be tested with small-scale requests.

## Competitor Comparison

The scraping API space is crowded. Decodo's main differentiation is the combination of AI-native tooling with a large proxy network under one roof:

- **vs. ScrapingBee**: ScrapingBee offers AI extraction at a premium of 5 additional credits per request. Decodo's AI Parser is free. ScrapingBee is simpler; Decodo offers more infrastructure options.
- **vs. Oxylabs**: Similar proxy scale and scraping API capabilities. Oxylabs has stronger enterprise features. Decodo has the AI Parser, MCP Server, and more accessible pricing.
- **vs. Bright Data**: Bright Data has the largest proxy network and the most granular targeting. Decodo is easier to set up and has better AI-native tooling.
- **vs. ScrapeGraphAI**: ScrapeGraphAI is open-source and self-hostable. Decodo is managed and requires no infrastructure maintenance.

## Limitations

- **Pricing transparency**: The Fast Search API requires contacting sales for pricing, which slows evaluation.
- **No self-hosted option**: Unlike open-source alternatives like Crawl4AI or ScrapeGraphAI, Decodo is fully managed. Data passes through their infrastructure.
- **AI Parser scope**: The free AI Parser works well for straightforward extraction but can struggle with highly complex or deeply nested page structures.
- **Learning curve**: The breadth of products (proxies, scraping API, AI Parser, MCP Server, Fast Search) means new users need to figure out which combination fits their use case.

## Who Should Use It

Decodo is built for developers and teams who need structured web data for AI applications without maintaining their own scraping infrastructure. The strongest fit is teams building RAG pipelines, AI agents, or monitoring systems that require fresh web data at scale.

The free AI Parser makes it a low-risk starting point for prototyping. The MCP Server is the natural upgrade path for teams building AI agents that need live web access. And the Web Scraping API handles the production workloads once you move past the prototype stage.

For teams already running LangChain workflows, the native integration makes Decodo a particularly frictionless addition. For teams that need self-hosting or have strict data residency requirements, alternatives like ScrapeGraphAI or custom scraping stacks may be more appropriate.

## Final Verdict

Decodo's rebrand from Smartproxy was not just a name change. The product has genuinely shifted from being a proxy provider with an API bolted on to being an AI-native data platform that happens to run a massive proxy network underneath.

The AI Parser and MCP Server are the standout features. They signal a platform that understands where web data consumption is heading, which is toward AI systems that pull structured data on demand rather than developers writing custom scrapers for every new target.

The pricing is accessible, the tooling is developer-friendly, and the integration surface area with the AI ecosystem is broad. If you are building anything that needs live web data fed into an AI pipeline, Decodo deserves a spot on your shortlist.
