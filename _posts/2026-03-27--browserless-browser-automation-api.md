---
title: "Browserless API: Cloud Browser Automation With Stealth, CAPTCHA Solving, and AI Agent Integrations"
excerpt: "Browserless offers a cloud-native browser automation platform with three APIs for stealth browsing, Puppeteer/Playwright scaling, and simple HTTP tasks, plus native integrations with AI agent frameworks."
coverImage: ""
date: 2026-03-27T05:05:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: ""
tags: ["browser-automation", "web-scraping", "captcha-solving", "ai-agents", "playwright", "puppeteer"]
category: "ai api"
description: "Browserless provides a cloud browser automation API with BrowserQL stealth browsing, BaaS for Puppeteer/Playwright, REST endpoints, and deep AI agent integrations."
evergreen: true
featured: false
evergreenLastUpdatedDate: 2026-03-27
---

Headless browser automation is a pain at scale. You run Puppeteer locally, it works fine, then you deploy to a server and suddenly you are managing Chrome versions, memory leaks, and proxy rotations. CAPTCHAs block your scrapers. Cloudflare turns your automated traffic into a wall of "please verify you are human." Browserless takes that entire problem and turns it into an API call. You send a request, it runs a real browser in the cloud, and you get the result back.

## What Is Browserless?

Browserless is a browsers-as-a-service platform that provides managed, cloud-hosted browser instances through three distinct APIs. It targets developers building scraping pipelines, automated testing workflows, and increasingly AI agent systems that need to browse the web. The service runs real Chrome instances in the cloud with built-in stealth capabilities, residential proxy support, and CAPTCHA solving.

The platform has been around since 2018 but has evolved significantly with the addition of BrowserQL, a GraphQL-based stealth API, and a growing suite of AI agent integrations including MCP servers, Claude Agent SDK, OpenAI Computer Use, and Browser Use. It competes with services like Bright Data's Web Scraper API, Oxylabs, and ScrapingBee, but differentiates through its multi-API architecture and deep AI agent ecosystem.

## Why Browserless Is Worth Your Attention

Three things make Browserless stand out in a crowded field of browser automation services.

**It offers three APIs for three different needs.** Most competitors force you into a single paradigm. Browserless gives you BrowserQL for stealth-first automation with CAPTCHA solving, BaaS v2 for running your existing Puppeteer or Playwright code with minimal changes, and REST APIs for simple one-off operations like taking screenshots or generating PDFs. You pick the right tool for each job instead of contorting one tool to do everything.

**Its AI integrations are not an afterthought.** Browserless has native support for Claude Desktop, Cursor, VS Code, Windsurf, and OpenAI's Computer Use Agent through its MCP server. It also integrates with LangChain, Vercel AI SDK, Browser Use, Stagehand, and AgentKit via Inngest. If you are building an AI agent that needs to browse, Browserless provides the runtime without requiring you to manage browser infrastructure.

**Stealth is a first-class feature, not a bolt-on.** BrowserQL includes advanced bot detection bypass, human-like behavior simulation, and automatic CAPTCHA solving built into the API. You do not need to install puppeteer-extra-plugin-stealth or maintain a list of anti-detection patches. The stealth capabilities are part of the service and maintained by the Browserless team.

## Core API Features

Browserless exposes three separate APIs, each targeting a different use case.

### BrowserQL (BQL)

BrowserQL is a GraphQL-based API for browser automation with built-in stealth. You describe what you want to happen in a declarative query, BrowserQL executes it in a real browser, and returns the results. It supports CAPTCHA solving, human-like mouse movements and typing, bot detection bypass, and state management through a reconnect mutation. BrowserQL includes a web IDE for testing queries before deploying them.

BQL is best for scenarios where you need to bypass sophisticated bot detection, solve CAPTCHAs automatically, or build stealth-first automation at scale.

### BaaS v2 (Browsers as a Service)

BaaS v2 lets you connect Puppeteer or Playwright to Browserless managed browsers over WebSocket. You change a single line in your connection URL, and your existing automation code runs on Browserless infrastructure instead of your local machine. It supports stealth mode via a parameter, persistent sessions, hybrid automation, and full browser control for complex workflows.

This is the option when you have existing Puppeteer or Playwright scripts and want to scale them without managing Chrome instances yourself.

### REST APIs

The REST APIs provide simple HTTP endpoints for common browser operations. You make a POST request and get back a screenshot, a PDF, or extracted page content. No browser automation library required. The scrape endpoint accepts a URL and a list of CSS selectors and returns structured data.

```bash
curl -X POST "https://production-sfo.browserless.io/scrape?token=YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","elements":[{"selector":"h1"}]}'
```

Response:

```json
{
  "data": [
    {
      "title": "Example Domain",
      "description": "Example Domain. This domain is for use in illustrative examples..."
    }
  ]
}
```

### AI Agent Integrations

Browserless provides pre-built integrations for AI agent frameworks and tools:

- **Browserless MCP Server** connects Claude Desktop, Cursor, VS Code, and Windsurf to Browserless through the Model Context Protocol
- **Claude Agent SDK** builds autonomous AI agents powered by Claude with stealth mode and CAPTCHA solving
- **OpenAI Computer Use** enables screenshot-driven browser automation with OpenAI's CUA
- **Anthropic Computer Use** provides scalable browser automation using Claude's screenshot-and-action loop
- **Browser Use** delivers agentic browsing in Python backed by Browserless
- **Stagehand** combines natural language and code for AI browser automation
- **LangChain** integration for chains and agents
- **Vercel AI SDK** for building AI tools that call Browserless from Next.js
- **AgentKit** via Inngest for fault-tolerant AI agents
- **n8n, Make, Zapier** for no-code workflow automation

### Authentication and Infrastructure

All Browserless APIs use a single API token passed as a query parameter. The service runs on regional endpoints (SFO, LON, SIN, etc.) for low-latency access worldwide. Enterprise customers can self-host via Docker with real-time monitoring and enterprise-grade security features.

## Getting Started

### Quick Start with REST API

Sign up at [browserless.io](https://browserless.io), grab your API token from the dashboard, and make your first call:

```bash
# Take a screenshot
curl -X POST "https://production-sfo.browserless.io/screenshot?token=YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","type":"png","fullPage":true}' \
  --output screenshot.png

# Generate a PDF
curl -X POST "https://production-sfo.browserless.io/pdf?token=YOUR_API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com","options":{"format":"A4"}}' \
  --output page.pdf
```

### Using BaaS with Puppeteer

Replace your Puppeteer connection URL to point at Browserless:

```javascript
const puppeteer = require('puppeteer-core');

const browser = await puppeteer.connect({
  browserWSEndpoint: 'wss://production-sfo.browserless.io?token=YOUR_API_TOKEN'
});

const page = await browser.newPage();
await page.goto('https://example.com');
const title = await page.title();
console.log(title);

await browser.disconnect();
```

### Using BaaS with Playwright

```python
from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.connect_over_cdp(
        "wss://production-sfo.browserless.io?token=YOUR_API_TOKEN"
    )
    page = browser.new_page()
    page.goto("https://example.com")
    print(page.title())
    browser.close()
```

### BrowserQL Example

BrowserQL uses GraphQL mutations. Here is a simple example that navigates to a page and extracts text:

```graphql
mutation {
  browser(url: "https://example.com") {
    goto
    content {
      text
    }
  }
}
```

## Use Cases

- **AI agent browsing** -- Give Claude, GPT, or open-source agents a real browser they can control via MCP, LangChain, or direct API calls. Agents plan, act, observe, and repeat until the task is done.
- **Stealth web scraping** -- Extract data from sites with aggressive bot detection. BrowserQL handles CAPTCHAs and human-like behavior automatically.
- **Automated testing at scale** -- Run Playwright or Puppeteer tests on Browserless infrastructure instead of maintaining CI browsers.
- **PDF and screenshot generation** -- Use the REST API to capture pages as PDFs or screenshots for reports, compliance, or content archiving.
- **Form automation** -- Fill out multi-step forms, handle CAPTCHAs, and capture confirmation screenshots across insurance, government, or e-commerce portals.
- **Price and inventory monitoring** -- Run scheduled scraping jobs against e-commerce sites with persistent sessions that maintain login state.
- **Content aggregation** -- Build research agents that navigate multiple sources, extract structured data, and return results via webhooks.

## Pricing

Browserless offers a free tier with limited usage. Paid plans scale based on concurrent sessions and include the full API suite. Enterprise plans add self-hosting, dedicated infrastructure, and SLA guarantees.

| Plan | Concurrency | Features |
|------|-------------|----------|
| Free | Limited | All 3 APIs, community support |
| Starter | Higher limits | All APIs, regional endpoints, email support |
| Business | Custom | Priority support, advanced analytics |
| Enterprise | Unlimited | Self-hosted Docker, dedicated infra, SLA, SSO |

Check [browserless.io/pricing](https://browserless.io/pricing) for current details.

## Alternatives

| Service | Stealth | AI Agent Integrations | Self-Host | Pricing Model |
|---------|---------|----------------------|-----------|---------------|
| **Browserless** | Built-in (BQL) | MCP, LangChain, Claude, CUA, Browser Use | Yes (Enterprise) | Concurrency-based |
| **Bright Data** | Web Unlocker | Limited | No | Per-request |
| **ScrapingBee** | Yes | No | No | Per-request |
| **Oxylabs** | Yes | Limited | No | Per-request |
| **Puppeteer + stealth plugin** | DIY | DIY | Yes | Free (self-managed) |

## FAQ

**Does Browserless solve CAPTCHAs automatically?**
Yes. BrowserQL includes built-in CAPTCHA solving. You do not need a third-party CAPTCHA service.

**Can I use my existing Puppeteer or Playwright scripts?**
Yes. BaaS v2 requires only a connection URL change. Your existing code runs unchanged on Browserless infrastructure.

**What regions are available?**
Browserless runs in SFO, LON, SIN, and other regional endpoints. Enterprise customers can deploy to their own infrastructure.

**Is Browserless open source?**
The core browserless project is open source on GitHub (13K stars). The cloud APIs and BrowserQL are proprietary services built on top of the open-source runtime.

**How does Browserless compare to running Puppeteer with puppeteer-extra-plugin-stealth?**
Browserless maintains stealth patches centrally and updates them as bot detection evolves. Running your own stealth setup means you are responsible for keeping patches current. Browserless also adds CAPTCHA solving, residential proxies, and managed infrastructure on top of the stealth layer.

## Verdict

Browserless fills a gap that most developers hit sooner or later: running headless browsers at scale is harder than it looks. The combination of three APIs for different use cases, native AI agent integrations via MCP and LangChain, and first-class stealth capabilities makes it one of the more complete browser automation platforms available today. If you are building scraping pipelines, automated testing suites, or AI agents that need to interact with the web, Browserless is worth serious consideration. The free tier makes it easy to test, and the self-hosted enterprise option means you are not locked into their infrastructure if your needs grow.
