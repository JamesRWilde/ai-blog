---
title: "Apideck CLI: The API Interface That Lets AI Agents Discover Tools Without Eating Your Context Window"
excerpt: "Apideck's new open-source CLI replaces bloated MCP integrations with progressive disclosure, cutting agent token usage by orders of magnitude."
coverImage: "/assets/blog/apideck-cli-cover.jpg"
date: 2026-03-16T18:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/apideck-cli-cover.jpg"
---

## TL;DR

Apideck, the unified API company, released an open-source CLI purpose-built for AI agents. Instead of flooding the context window with thousands of tokens worth of MCP tool schemas, agents get an 80-token bootstrap prompt and discover capabilities on demand through `--help` calls. The result: identical operations cost 4 to 32 times fewer tokens than MCP, with no middleware, no schema management, and no compromise on safety.

## The Problem

If you have wired up MCP servers for anything beyond a demo, you know the pain. Connect GitHub, Slack, and Sentry, three services, maybe 40 tools total. Before the agent reads a single user message, 55,000 tokens of tool definitions are sitting in the context window. That is over a quarter of Claude's 200,000 token limit, gone before the conversation starts.

It gets worse at scale. Each MCP tool consumes 550 to 1,400 tokens for its name, description, JSON schema, field descriptions, enums, and system instructions. A real SaaS platform with 50+ endpoints can burn 50,000+ tokens on schema alone. One team reported three MCP servers consuming 143,000 of 200,000 tokens. That is 72 percent of the context window spent on describing what the agent could do, with almost nothing left for what it should do.

David Zhang, building Duet, described ripping out MCP integrations entirely after getting OAuth and dynamic client registration working. He called the tradeoff a trilemma: load everything up front and lose working memory, limit integrations and cripple the agent, or build dynamic tool loading and add latency plus middleware complexity.

Scalekit ran 75 head-to-head comparisons with Claude Sonnet 4 and found MCP costing 4 to 32 times more tokens than CLI for identical operations. Their simplest task, checking a repo's language, consumed 1,365 tokens via CLI and 44,026 via MCP.

## The Apideck CLI Approach

The third approach, and the one Apideck took, is progressive disclosure through a well-designed CLI. When a human developer encounters a new tool, they do not read the entire API reference. They run `tool --help`, find the subcommand, drill into specifics, and pay attention costs proportional to what they actually need. Agents can do exactly the same thing.

The entire agent bootstrap prompt for the Apideck CLI is roughly 80 tokens:

```
Use `apideck` to interact with the Apideck Unified API.
Available APIs: `apideck --list`
List resources: `apideck <api> --list`
Operation help: `apideck <api> <resource> <verb> --help`
```

Compare that to 30,000 to 100,000+ tokens for a full OpenAPI spec in context, or 10,000 to 50,000+ tokens for MCP tools loaded upfront. The agent starts lean and discovers capabilities lazily.

Level one: `apideck --list` returns available API groups in about 20 tokens. Level two: `apideck accounting --list` shows resources and operations in about 200 tokens. Level three: `apideck accounting invoices create --help` returns specific flags in about 150 tokens. An agent handling an accounting query might consume 400 tokens total across three help calls. The same surface through MCP would cost 10,000+ tokens loaded upfront whether the agent uses them or not.

## Key Features

**OpenAPI-native parsing.** The CLI parses Apideck's unified OpenAPI spec directly. No generated code, no SDK dependency. When the spec updates, a single `apideck sync` command pulls the latest.

**Built-in permission layers.** Operations are auto-classified by HTTP method. GET requests are auto-approved. POST, PUT, and PATCH trigger confirmation prompts. DELETE is blocked unless overridden with `--force`. Permissions are configurable in a local YAML file, so teams can upgrade sensitive operations like payments to dangerous, or downgrade less critical ones to auto-approve.

**Interactive TUI explorer.** Running `apideck explore` launches a terminal UI for browsing APIs interactively. Useful for human developers who want to poke around before scripting something.

**Agent-specific output modes.** The CLI detects whether it is running in an interactive terminal or piped output. Interactive mode defaults to styled tables. Non-TTY output defaults to JSON. Both can be overridden with `--output json|yaml|csv`. Quiet mode (`-q`) strips spinners and status lines for clean agent consumption.

**Pagination that does not require thinking.** Manual cursor pagination is available, but agents can just add `--all` to fetch every page automatically, with optional `--max-pages` to cap runaway requests.

## How It Compares to MCP

The core difference is when and how much information enters the context. MCP loads every tool definition at session start, whether the agent needs it or not. The CLI loads nothing until the agent explicitly asks, and even then it returns only the slice of information needed for the current operation.

This mirrors a pattern emerging across the industry. Claude Agent Skills use metadata-first loading. Duet takes a code execution approach where agents read docs and write integration code. Apideck's CLI occupies the pragmatic middle ground: no code execution risk, no upfront schema bloat, just a terminal interface that agents already know how to use because it mirrors how developers work.

Scalekit's benchmark validated the pattern further. Even a minimal 800-token skills file of CLI tips reduced tool calls by a third and latency by a third compared to a bare CLI.

## Getting Started

Installation is straightforward across platforms:

```bash
# macOS
brew install apideck-libraries/tap/apideck

# Go
go install github.com/apideck-libraries/cli/cmd/apideck@latest

# Docker
docker run -e APIDECK_API_KEY=xxx -e APIDECK_APP_ID=xxx \
  -e APIDECK_CONSUMER_ID=xxx apideck/cli accounting invoices list
```

Configuration supports environment variables or an interactive setup wizard via `apideck auth setup`. The CLI also supports scoped service targeting with `--service-id` for directing calls to specific connectors like Xero or QuickBooks.

## The Bigger Picture

The MCP context bloat problem is not going away. As AI agents connect to more services and handle more complex workflows, the token tax of schema-first approaches will only compound. Apideck's CLI is not a silver bullet, it works best for API interaction patterns where agents need structured CRUD operations across multiple services. But it represents a genuinely useful design pattern: treat the context window as a scarce resource and let agents discover capabilities the same way humans do, one `--help` at a time.

The CLI is open source under the [apideck-libraries/cli](https://github.com/apideck-libraries/cli) repository on GitHub. The full blog post with benchmark details is available on [Apideck's engineering blog](https://www.apideck.com/blog/mcp-server-eating-context-window-cli-alternative).
