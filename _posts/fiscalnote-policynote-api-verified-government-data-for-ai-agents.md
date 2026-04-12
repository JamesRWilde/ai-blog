---
title: "FiscalNote's PolicyNote API: Government Data Built for AI Agents, Not Google"
excerpt: "NYSE-listed FiscalNote just expanded its PolicyNote API with an MCP server and verified presidential transcripts, targeting the gap between AI hallucination and policy reality."
coverImage: "/assets/blog/fiscalnote-cover.png"
date: 2026-03-17T01:30:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/fiscalnote-cover.png"
---

## TL;DR

FiscalNote (NYSE: NOTE) expanded its PolicyNote API on March 16 to include a verified, real-time feed of every presidential transcript from the Trump administration, purpose-built for AI agent consumption. The product ships with both a REST API and a native MCP server, with a free tier offering 1,000 requests per month.

## The Problem Nobody Talks About

General-purpose LLMs hallucinate government data. They misattribute executive orders, cite outdated regulations, and fabricate legislative details with the same confidence they use for facts. For enterprises that need to track policy changes affecting trade, compliance, or regulation, this is not a minor inconvenience. It is a liability.

The typical workaround is RAG against some pre-indexed government document dump. The problem: those dumps go stale fast, lack structured provenance, and rarely cover the full span of federal and state activity. By the time an AI agent pulls from a generic data source, the executive order it is referencing may have been amended or superseded.

## What FiscalNote Built

FiscalNote is not a startup. It is a publicly traded policy intelligence company (NYSE: NOTE) that has spent years building its data pipeline across Congress, all 50 U.S. states, and over 100 countries. Their brands include CQ (congressional transcripts) and Roll Call. This is not a weekend hackathon project scraping government websites.

The expanded PolicyNote API, announced March 16, 2026, adds three things specifically aimed at the AI agent market:

### 1. The Presidential Transcript Feed

The scale of what they are covering is worth noting. Since January 2025, the Trump administration has produced:

- 810 events tracked
- 2,996,726 words of verified transcripts
- 285 hours of video content
- 198 interviews and 417 formal events
- 248 executive orders (more than Trump's entire first term)
- 133 proclamations and dozens of memoranda

Every communication is delivered as a verified, machine-readable record with full source attribution. When an AI agent cites the president through this API, it cites the actual transcript, not a model's approximation of what was said.

### 2. Native MCP Server

The PolicyNote API ships with a native Model Context Protocol server. For developers building with MCP-compatible frameworks, this means an AI agent can discover and call live policy data mid-conversation without custom API wrappers. No glue code, no middleware. The agent asks for legislative data, the MCP server delivers structured responses with sourcing.

This is the kind of integration that matters for agentic workflows. A compliance agent monitoring regulatory changes does not need to poll a REST endpoint on a cron job. It can pull live data in real time as part of its reasoning loop.

### 3. REST API with Free Tier

For teams not yet using MCP, the REST API is available and designed for setup in under 15 minutes. Full documentation is at data.policynote.com/docs. The free starter plan includes 1,000 requests per month with no credit card required.

The API covers:

- Congressional legislation and transcripts
- State-level legislative data across all 50 states
- Regulatory data from federal agencies
- International legislative data from 100+ countries
- CQ congressional analysis and transcripts

## Why This Matters

There is a specific gap in the AI infrastructure stack: verified, structured, continuously updated government data with proper sourcing. Generic web search APIs are too noisy for policy work. Government data portals are fragmented and often lack proper machine-readable formats. Private research firms charge enterprise prices for what amounts to curated CSVs.

FiscalNote is positioning itself as the canonical source for primary government data in the agentic AI stack. The pitch is not "we have good data." It is "when your AI agent cites a policy, it cites the actual record, not a hallucinated approximation of it."

This is a credible claim given their existing client base and the years of infrastructure investment behind it. The company has been building policy intelligence tooling long before the current AI wave.

## The Open Questions

- **Pricing beyond the free tier.** The 1,000-request limit is generous for prototyping but tight for production compliance workloads. Enterprise pricing is custom-quoted, which usually means expensive.
- **Latency for real-time feeds.** Government transcripts are typically released with some delay. How "real-time" is real-time, and how does that compare to the actual announcement cadence?
- **International depth.** "100+ countries" sounds broad, but coverage depth varies wildly. Structured data from the EU Parliament is a different product than headline summaries from smaller jurisdictions.
- **MCP adoption curve.** MCP is still early in enterprise adoption. Betting on it as a primary distribution channel is forward-looking but risky if the standard does not achieve critical mass.

## Getting Started

The PolicyNote API documentation is at data.policynote.com/docs. The MCP server can be configured directly in any MCP-compatible client. A free tier with 1,000 requests per month is available at fiscalnote.com/get-started-policynote-api.
