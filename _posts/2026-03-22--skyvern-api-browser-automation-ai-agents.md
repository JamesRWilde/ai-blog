---
title: "Skyvern API: AI-Powered Browser Automation With LLMs and Computer Vision"
excerpt: "Skyvern combines LLMs and computer vision to automate browser workflows through a simple API, replacing brittle XPath-based scraping with resilient AI agents that adapt to layout changes."
coverImage: ""
date: 2026-03-22T14:32:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: ""
tags: ["browser-automation", "ai-agents", "web-scraping", "playwright"]
category: "ai api"
description: "Skyvern combines LLMs and computer vision to automate browser workflows through a simple API, replacing brittle XPath-based scraping with resilient AI agents."
evergreen: true
featured: false
evergreenLastUpdatedDate: 2026-03-22
---

Most browser automation breaks the moment a website changes its layout. XPath selectors stop working, DOM parsers fail silently, and your "stable" scraping pipeline collapses under minor CSS updates. Skyvern takes a different approach: it uses large language models and computer vision to interact with web pages the way a human would, by looking at what is on the screen and reasoning about what to do next.

## What Is Skyvern?

Skyvern is an open-source platform for AI-powered browser automation. It provides a REST API, Python SDK, and TypeScript SDK that let you automate complex web workflows using natural language prompts instead of brittle selectors. Under the hood, Skyvern uses a swarm of autonomous agents that comprehend web pages visually, plan their actions, and execute multi-step workflows across sites they have never seen before.

The platform builds on top of Playwright and extends it with AI capabilities. Where traditional automation requires you to write CSS selectors or XPath expressions for every interaction, Skyvern accepts prompts like "Click the login button" or "Extract all product names and prices" and figures out the rest using vision LLMs.

## Why Skyvern Is Worth Your Attention

Three core advantages set Skyvern apart from conventional browser automation tools.

**It works on sites it has never seen before.** Skyvern maps visual elements to actions using computer vision, so you can take a single workflow and apply it across multiple websites without writing site-specific code. A checkout automation built for one e-commerce site can be reused on another with minimal adjustment.

**It resists layout changes.** Because Skyvern does not depend on pre-determined XPath expressions or CSS selectors, it does not break when a website redesigns its navigation bar or moves a button. The AI looks at the viewport, identifies interactive elements by their visual appearance, and adapts in real time.

**It reasons through complexity.** Skyvern leverages LLMs to handle ambiguous situations that would defeat traditional automation. If an insurance form asks whether you were eligible to drive at 18, Skyvern can infer the answer from the fact that you received your license at 16. If a product shows different sizes across two websites, Skyvern understands that a 22-oz can at one retailer is effectively the same product as a 23-oz can at another.

## Core API Features

Skyvern's API is organized around several key resources.

### Task API

The Task API lets you run a single browser automation task with a natural language prompt. You describe what you want accomplished, Skyvern opens a browser, navigates to the relevant site, and executes the workflow. You can run tasks asynchronously and poll for results, or use webhooks to receive notifications when a task completes.

A task might be as simple as "Go to example.com and extract all article titles" or as complex as "Navigate to the insurance portal, fill out the quote form with the provided data, and capture the final premium amount."

### Workflow API

Workflows are reusable, multi-step automations that you can build visually or via API. Each workflow consists of blocks that define specific actions such as navigation, data extraction, file uploads, and HTTP requests. Workflows support parameters, so you can pass in different inputs each time you run one.

The Workflow API supports full CRUD operations. You can create, update, version, and delete workflows programmatically, making it straightforward to manage automations as code.

### Browser Sessions

Skyvern supports both ephemeral and persistent browser sessions. A persistent session keeps cookies, local storage, and login state alive across multiple runs, which is essential for workflows that require authenticated access. You can manage browser sessions via the API, including creating sessions, checking their status, and closing them when done.

Browser profiles take this further by letting you save authenticated browser state and reuse it across sessions. Combined with Skyvern's credential management system, you can automate login flows without ever exposing passwords to the LLM.

### Credential Management

Skyvern stores credentials securely and injects them into browser sessions only when needed. Credentials are never sent to the LLM itself. The platform supports username and password pairs, credit card information, and TOTP-based two-factor authentication. You can also integrate with Bitwarden or custom credential services via API.

### MCP Server and Integrations

Skyvern exposes an MCP (Model Context Protocol) server, allowing AI assistants like Claude and Cursor to trigger browser automations directly. It also integrates with Zapier, Make, N8N, and Workato for no-code workflow orchestration.

## Getting Started

### Installation

Skyvern requires Python 3.11 or 3.12 and Node.js with NPM. Install the Python SDK:

```bash
pip install skyvern
```

For the TypeScript SDK:

```bash
npm install @skyvern/client
```

### Quick Start With the Python SDK

```python
from skyvern import Skyvern

# Connect to Skyvern Cloud
skyvern = Skyvern(api_key="your-api-key")

# Launch a browser session
browser = await skyvern.launch_cloud_browser()
page = await browser.get_working_page()

# Navigate and automate with AI
await page.goto("https://example.com")

# Traditional Playwright click still works
await page.click("#login-button")

# AI-augmented click uses natural language
await page.click(prompt="Add first item to cart")

# Extract structured data with a schema
result = await page.extract(
    prompt="Extract all product names and prices",
    schema={"products": [{"name": "string", "price": "number"}]}
)

# Run a complex multi-step task
await page.agent.run_task("Complete checkout with: John Doe, 1234 Main St")
```

### Using the REST API

You can also interact with Skyvern entirely through HTTP requests. Here is how to kick off a task using curl:

```bash
curl -X POST https://api.skyvern.com/v1/tasks \
  -H "Authorization: Bearer your-api-key" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "Go to news.ycombinator.com and extract the top 10 stories with their titles, URLs, and point counts",
    "max_iterations": 15
  }'
```

Poll for the result:

```bash
curl https://api.skyvern.com/v1/tasks/{task_id} \
  -H "Authorization: Bearer your-api-key"
```

### Running Locally With Docker

For self-hosted deployment, Skyvern provides a Docker Compose setup:

```bash
git clone https://github.com/Skyvern-AI/skyvern.git && cd skyvern
pip install skyvern && skyvern quickstart
```

This spins up the full Skyvern stack including the web UI at localhost:8080, where you can build and test workflows visually.

## Pricing

Skyvern offers four tiers.

- **Free**: 1,000 credits, AI browser automation, CAPTCHA solving, basic support. No credit card required.
- **Hobby** ($29/month): 30,000 credits, priority support, faster execution, webhook integrations.
- **Pro** ($149/month): 150,000 credits, team workspaces, advanced workflows, 2FA credential management, dedicated support.
- **Enterprise**: Custom pricing with unlimited credits, self-hosted deployment, HIPAA compliance, SOC2 Type II certification, SSO, SLA guarantees, and a dedicated account manager.

A credit is consumed per workflow execution regardless of how many pages or steps are involved. Compared to traditional RPA tools that cost $10,000+ per bot per year with 20 to 40 percent monthly maintenance overhead, Skyvern's usage-based model is significantly cheaper for most teams.

## What It Is Not

Skyvern is not a general-purpose web scraping library. If you need to pull raw HTML from a thousand pages as fast as possible, a tool like Scrapy or even plain HTTP requests will be faster and cheaper. Skyvern is designed for workflows that require interaction, such as filling out forms, navigating multi-page wizards, completing purchases, or operating behind login walls. It trades raw speed for intelligence and adaptability.

It is also not a replacement for full RPA platforms like UiPath or Automation Anywhere for enterprise process automation that spans multiple applications and back-office systems. Skyvern excels at browser-based workflows but does not handle desktop automation or deep ERP integrations.

## Verdict

Skyvern solves a real and persistent problem in the browser automation space. Traditional tools break constantly because they depend on fragile assumptions about page structure. Skyvern sidesteps this by using the same reasoning abilities that a human tester would, looking at the page visually and deciding what to do. The API is well designed, the SDKs are clean, and the open-source foundation means you can self-host when compliance requires it.

The credit-based pricing is straightforward, the free tier is generous enough for evaluation, and the integration with popular orchestration tools like N8N and Zapier means Skyvern slots into existing automation stacks without much friction.

For teams building AI agents that need to interact with the web, or for anyone tired of maintaining XPath selectors that break every quarter, Skyvern is worth serious consideration.
