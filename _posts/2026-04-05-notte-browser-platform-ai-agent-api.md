---
title: "Notte: The 'Anything API' That Turns Browsers Into Callable Endpoints"
excerpt: "Notte lets developers describe a browser task in plain text and get back a production API. It works on sites that have no API, no SDK, and no developer love at all. The catch is the one every agent-built system faces."
coverImage: "/assets/blog/notte-cover.jpg"
date: 2026-04-05T15:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/notte-cover.jpg"
---

## TL;DR

Notte is a browser automation platform for AI agents that handles the tasks browser libraries were never designed for. Most websites have no public API. Notte fills that gap by deploying agent-driven browser sessions that navigate, authenticate, and extract data on demand, then hand back structured results through a REST API. It launched publicly in March 2026, pulled 574 upvotes on Product Hunt, and ships with a CLI, SDKs, built-in credential vaulting, CAPTCHA solving, and per-agent identity management (dedicated emails and phone numbers for 2FA). The concept works well. The reliability caveats are real.

## The Problem

Ninety-plus percent of the web has no API.

If you need pricing data from a competitor, job listings from a niche board, or to log into a legacy SaaS portal and download a report, your options have historically been: write brittle Playwright scripts, pay an RPA consultant, or give up. Browser automation frameworks (Puppeteer, Playwright, Selenium) are powerful but low-level. They require you to know exactly which CSS selectors to hit, how long to wait for AJAX, and how to handle every layout change the target site deploys on a Tuesday morning.

LLMs changed this dynamic. A model that can look at a page, understand its structure, and decide which element to click is fundamentally more resilient than a selector hard-coded in January. But stitching those models into a reliable production system requires infrastructure: session management, credential storage, proxy rotation, CAPTCHA solving, observability, scaling.

Notte built that infrastructure so you do not have to.

## What Notte Actually Does

Notte operates at three layers:

**Browser Sessions** — spin up headless or headed browser instances on demand, with configurable viewports, user agents, proxy rotation by country, and automatic CAPTCHA solving. Sessions are stateless by default but can persist full browser state via profiles (log in once, reuse the authenticated session forever).

**AI Agents** — attach an LLM to a session and give it a task description. The agent observes the page, decides which action to take, executes it, and repeats until the task is complete. Every step is logged and replayable.

**Browser Functions** — package successful agent workflows into serverless functions with cron scheduling. This is the "deploy" stage: you turn a one-off agent task into a production endpoint that runs on a schedule and returns structured data.

The CLI covers the entire flow from terminal: start sessions, observe pages, run agents, manage functions, and schedule recurring jobs. Everything returns either human-readable tables or JSON for piping.

## The Standout Features

### Agent Vaults and Credential Management

Notte stores website passwords in encrypted vaults (AES-256 at rest, scoped per session, automatically rotated). Agents fetch credentials at runtime rather than carrying them in scripts. This is how production systems should handle auth. Most browser automation projects hardcode passwords and call it a day.

### Agent Identities with 2FA Passthrough

This is unusual. Each agent can be assigned a dedicated email address and phone number. When a target site demands OTP verification, Notte intercepts the code automatically. This enables authenticated workflows that previously required manual intervention.

### Session Profiles

Save a full browser state after logging into a site. Attach that profile to any future session. The agent skips the auth flow entirely and lands directly on the authenticated dashboard. This is the difference between a demo that works once and a pipeline that runs daily.

### CAPTCHA Handling

Notte can automatically solve CAPTCHAs. This is both a feature and a liability, and I will come back to that.

### The CLI

The `notte-cli` tool (installable via Homebrew or Go) provides resource-based commands that mirror the platform architecture:

```
notte sessions start --headless
notte page goto "https://example.com"
notte page scrape --instructions "Extract product prices"
notte agents start --task "Find me all open roles in engineering"
notte functions schedule --cron "0 9 * * 1"
notte personas create
notte vaults credentials add --url "https://app.example.com"
```

The design choice to use resource-oriented commands (modelled loosely on Terraform-style workflows rather than imperative scripts) is deliberate and effective. Each command returns structured data, and `--output json` makes it pipeline-friendly.

## Where It Matters

There are four scenarios where Notte genuinely beats the alternatives:

**Data extraction from sites with no API** — pricing pages, government databases, niche directories. Notte's browser agents navigate these directly and return structured output.

**Authenticated workflows** — logging into a SaaS portal, navigating to an export page, downloading a CSV. The combination of credential vaults, session profiles, and OTP handling makes previously-maintained-by-a-human workflows automatable.

**Competitive intelligence** — monitoring competitor pricing or product catalogues. A scheduled function that runs daily and returns a JSON diff is dramatically easier to maintain than a scraping suite.

**Form submission at scale** — applying to job boards, submitting compliance forms, onboarding accounts. Agents drive the forms the way a human would, filling fields, uploading files, and capturing confirmation screens.

## The Honest Constraints

There are reasons not every team should switch to Notte immediately.

**AI-generated browser automation is still probabilistic.** An LLM agent can figure out a page layout most of the time, but it is not deterministic. Sites with heavy obfuscation, frequent redesigns, or aggressive anti-bot measures will cause failures. Notte reports greater than 95 percent success rates on typical sites, which sounds good until your production pipeline is the five percent that fails at 3 AM.

**No public, transparent pricing at launch.** The website directs you to book a call or check the console. For a tool targeting developers who want to evaluate cost per execution before committing, this is friction. The company may be iterating pricing publicly, but as of this review, a clear pricing page is not visible.

**Vendor lock-in is a real concern.** Generated functions run on Notte's infrastructure. You do not own the extraction logic in a portable form. If Notte raises prices, changes its API, or shuts down, your automated workflows become brittle overnight. This is the classic "buy versus build" tradeoff, and teams with strict vendor-diversification policies will need to weigh it carefully.

**CAPTCHA solving sits in a moral and legal grey area.** Bypassing CAPTCHAs is technically impressive. Whether a given target site welcomes automated agents passing their bot detection is a separate question entirely. Notte makes the capability available. How you use it is on you.

## Notte Versus the Alternatives

Apify and Browserless offer powerful browser automation infrastructure but still require you to write the automation logic. Playwright and Puppeteer are developer tools, not end-to-end platforms. Zapier handles API-to-API workflows, not browser-driven ones. Notte's differentiation is the AI agent layer: you describe the task, the system figures out how to do it, and packages the result as a callable endpoint.

The tradeoff is control versus convenience. If you need pixel-perfect, deterministic automation, write your own Playwright scripts. If you need something that works on most sites with zero code adaptation, Notte is the closest thing on offer.

## Who Should Use It

Small teams and indie founders who need data extraction but lack dedicated data engineers will get immediate value. Technical leads evaluating whether to outsource non-core scraping workflows should put Notte on the shortlist. Enterprises running high-volume authenticated web automation will find the credential management and session profiling features genuinely useful.

The tool is less suited for teams handling complex multi-session authenticated workflows where reliability requirements border on financial-grade, or organisations with data sovereignty rules that prohibit third-party browsers touching their target sites.

## Getting Started

Notte provides a free tier accessible through the console at console.notte.cc. The open-source CLI is available on [GitHub](https://github.com/nottelabs/notte-cli). Documentation sits at docs.notte.cc.

The fastest path to a decision is to pick your hardest target website, describe a task, and see if Notte's agent completes it. If it works on your actual use case in a ten-minute trial, the rest is an evaluation of cost, scale, and reliability requirements.

## The Bottom Line

Notte solves a genuine problem that the browser automation ecosystem has danced around for years. The gap between "we could automate this" and "someone actually built and maintains the script" is enormous, and AI-driven agents are the most credible attempt so far to close it.

It is early. Pricing needs transparency. Determinism will never be guaranteed when the execution engine is a reasoning model interpreting arbitrary web pages. But for teams currently burning engineering hours on scraper maintenance, Notte offers a clean escape hatch. The question is whether the five percent failure rate is acceptable for your use case, and how much you value not owning the automation code yourself.

Reasonable people reach different answers. But the tool is real, it ships, and it does something the alternatives do not.
