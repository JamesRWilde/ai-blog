---
title: "Arcjet: The AI Runtime Security API That Protects Your LLM Features in Production"
excerpt: "Arcjet is a developer-first runtime policy engine that secures AI applications against prompt injection, cost explosion, bot abuse, and data exfiltration, with a simple SDK integration and no extra infrastructure to manage."
coverImage: "/assets/blog/arcjet-cover.png"
date: 2026-03-22T00:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/arcjet-cover.png"
---

## TL;DR

Arcjet is a runtime policy engine purpose-built for AI applications. It provides bot detection, prompt injection detection, rate limiting, sensitive information protection, and per-user token budget controls through a developer-first SDK that integrates directly into your application code. Unlike traditional CDN-based security, Arcjet runs a WebAssembly module locally for sub-millisecond decisions and requires no Redis, no separate infrastructure, and no changes to your application architecture. It addresses the three most common production AI failures: cost explosions from automated traffic, unauthorized tool side-effects, and sensitive data exfiltration through prompts and responses.

## The Problem

Ship an AI feature into production and you quickly discover that model performance is the least of your worries. The real problems look like this:

**Cost explosion.** Automated bots, abusive users, and prompt injection attacks can inflate your token spend overnight. A single misconfigured script hitting your chat endpoint thousands of times per minute will burn through API budgets before anyone notices. Traditional rate limiting helps but does not understand the context of your AI application.

**Unauthorized side-effects.** When your agent can invoke tools (sending emails, issuing refunds, querying databases), a successful prompt injection or even a well-meaning but poorly-phrased user request can trigger actions that should never have happened. The prompt itself might look benign. The tool call is catastrophic.

**Data exfiltration.** Sensitive information leaks into AI model context, third-party tool logs, and response payloads through unguarded prompts and tool outputs. PII flows into places it should not go, and your compliance team finds out weeks later.

Most existing security tools were not designed for these failure modes. CDN-level protections block network-layer DDoS attacks but do not understand what a prompt injection looks like. API gateways enforce global rate limits but cannot tie token budgets to individual users. And nothing off-the-shelf prevents your own agent from calling a tool it should not.

This is the gap Arcjet fills.

## What Arcjet Actually Does

Arcjet positions itself as "the runtime policy engine for AI features." That framing is accurate. It provides a set of composable security primitives that you configure in code, alongside the application they are protecting, and enforce at runtime.

### Core Security Primitives

**Prompt Injection Detection.** Arcjet scores incoming messages for injection patterns: jailbreaks, role-play escapes, instruction overrides, and prompt extraction attempts. This runs locally via a WebAssembly module in the SDK, meaning the analysis happens in your own environment without sending prompt content to a third party. You can set the mode to `LIVE` for production blocking or `DRY_RUN` for monitoring without enforcement.

**Bot Detection.** The SDK analyzes request headers locally and checks against Arcjet's live database of known bots, VPNs, proxies, Tor nodes, and other relays. You can block all automated traffic or selectively allow trusted clients. This prevents bots from inflating your token costs by pretending to be legitimate users.

**Sensitive Information Detection.** Arcjet inspects request bodies for PII patterns: credit card numbers, email addresses, phone numbers, and custom patterns you define. Detection runs entirely locally. No data leaves your infrastructure. You can configure it to deny requests that contain sensitive data, preventing PII from entering your AI model context or third-party tool pipelines.

**Rate Limiting.** Per-user token bucket rate limits enforced through Arcjet's Cloud API. No Redis to deploy, no data structures to design. Arcjet tracks the state for you. The SDK caches decisions locally so subsequent requests from the same client resolve without additional API calls.

**Shield.** Arcjet's Shield rule detects and blocks common attack patterns across multiple requests. It looks at behavioral signals over time rather than analyzing individual requests in isolation.

**Email Validation.** Syntax checking runs locally. For valid syntax, the Cloud API verifies MX records and disposable email status. Useful for protecting signup flows that lead into AI features.

**Filters.** Block or allow requests using expressions over request metadata. Custom user agents, IP ranges, geographic locations, or any combination of request attributes.

### How the Architecture Works

Arcjet has two components: the SDK installed in your application and the Cloud API that handles stateful decisions.

The SDK includes a WebAssembly module that performs local analysis wherever possible. Bot detection headers, prompt injection scoring on individual messages, sensitive information scanning, and email syntax validation all happen in your own environment. This means decisions are typically sub-millisecond and no prompt content needs to leave your infrastructure.

When stateful tracking is required (rate limits, multi-request attack patterns), the SDK calls the Cloud API. The API is deployed globally, and the SDK automatically routes to the closest region. Total overhead is typically 20-30 milliseconds.

Critically, Arcjet is not a reverse proxy. Traditional CDN security sits in front of your application and makes opaque allow/block decisions without understanding your code. Arcjet runs inside your application as middleware, giving it full context. It knows which route is being hit, which user is making the request, and what the application logic intends to do with it. This context reduces false positives significantly.

If Arcjet is unavailable, the default behavior is to fail open and allow requests. You can configure fail-closed behavior if your security requirements demand it. Cached decisions (like a blocked client) continue to function even during an outage.

### Integration and SDK

Arcjet provides SDKs for the major application frameworks. A Next.js integration, for example, uses middleware to intercept requests before they reach your route handlers.

The configuration is declarative. You define rules as an array and attach them to a path pattern:

```javascript
import arcjet, { detectBot, detectPromptInjection, sensitiveInfo, shield } from "@arcjet/next";

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    shield({ mode: "LIVE" }),
    detectBot({ mode: "LIVE", allow: [] }),
    detectPromptInjection({ mode: "LIVE" }),
    sensitiveInfo({
      mode: "LIVE",
      deny: ["CREDIT_CARD_NUMBER", "EMAIL"],
    }),
  ],
});
```

The rules compose. You can use any combination independently or stack them for layered protection. Each rule returns a decision that your code can inspect: `ALLOW`, `DENY`, or `CHALLENGE`. You decide how to handle each outcome rather than being locked into a single behavior.

SDK support covers Next.js, Node.js, and other major JavaScript/TypeScript runtimes. The Python SDK is available for Django and Flask applications.

## Practical Use Cases

**Protecting a chat endpoint.** Layer bot detection, prompt injection detection, and sensitive information denial on your chat API route. Block all automated clients. Deny messages containing credit card numbers or email addresses. Enforce per-user token budgets to prevent cost explosion.

**AI quota control.** Use the token bucket rate limiter to enforce per-user monthly AI request quotas. Arcjet tracks the count centrally so it works across serverless functions and horizontal scaling without coordination.

**Spam-resistant signup.** Combine bot detection, email validation, and Shield on your registration endpoint to prevent fake accounts that exist solely to abuse your AI features.

**VPN and proxy blocking.** Use IP analysis to detect VPNs and proxies, which are commonly used to bypass rate limits and geographic restrictions on AI endpoints.

**Feedback form protection.** Layer bot detection and sensitive information scanning on any user-facing form that feeds into an AI pipeline, preventing poisoned training data and automated submissions.

## The Competitive Landscape

Arcjet occupies a specific niche. It is not a CDN security service like Cloudflare or Akamai. It is not an AI gateway like Portkey or LiteLLM. It is not an observability platform like Langfuse or Arize. It is an application-level policy engine that understands AI-specific failure modes and integrates directly into your codebase.

The closest comparisons would be application-level security SDKs, but none that I am aware of are purpose-built for AI features. Traditional WAFs do not score prompts. API gateways do not detect PII in request bodies. And rate limiters do not understand token budgets.

What Arcjet does not do: it does not provide model routing, cost optimization, logging, tracing, or the other features associated with AI gateways and observability platforms. It is focused exclusively on security and abuse prevention at the application layer.

## Pricing

Arcjet offers a free tier for development and low-volume applications, with paid plans scaling based on request volume. The free tier includes access to all security primitives. Enterprise plans add dedicated infrastructure and custom SLAs.

## Verdict

Arcjet addresses a real gap in the AI application stack. As more developers ship LLM-powered features to production, the attack surface expands beyond what traditional security tools were designed to handle. Prompt injection, bot-driven cost inflation, and PII leakage through model context are not theoretical risks. They are production failures happening right now.

The developer experience is the right approach. Security rules configured in code, alongside the application they protect, with local analysis via WebAssembly and no additional infrastructure to operate. The composition model (stacking individual primitives into layered policies) is flexible without being overwhelming.

The limitation is scope. Arcjet handles security and abuse prevention. It does not replace observability, cost optimization, or model management. Teams will still need those tools alongside Arcjet, and the question is whether the market will consolidate around multi-purpose platforms or whether focused tools like Arcjet will win by doing one thing well.

For teams shipping AI features that handle real users, real money, or real sensitive data, Arcjet is worth evaluating. The free tier makes it low-risk to try, and the integration effort is minimal compared to building equivalent protections from scratch.

## Key Links

- **Website:** [arcjet.com](https://arcjet.com)
- **Documentation:** [docs.arcjet.com](https://docs.arcjet.com)
- **AI Protection Guide:** [docs.arcjet.com/ai-protection](https://docs.arcjet.com/ai-protection)
- **GitHub:** [github.com/arcjet/arcjet](https://github.com/arcjet/arcjet)
- **Pricing:** [arcjet.com/pricing](https://arcjet.com/pricing)
- **Discord:** [arcjet.com/discord](https://arcjet.com/discord)
