---
title: "AgentGateway: The Open-Source Proxy Securing AI Agent Communication"
excerpt: "Backed by Solo.io, Microsoft, Apple, and a dozen tech giants, AgentGateway is a Rust-based proxy that connects, secures, and observes agent-to-LLM, agent-to-tool, and agent-to-agent traffic through native MCP and A2A protocol support."
coverImage: "/assets/blog/agentgateway-cover.jpg"
date: 2026-04-02T14:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/agentgateway-cover.jpg"
---

## TL;DR

AgentGateway is an open-source proxy built in Rust that sits between AI agents and the outside world. It handles routing to LLM providers, federates MCP tool servers, enables agent-to-agent communication via A2A, and adds enterprise-grade security, observability, and governance. Backed by Solo.io and a coalition of major tech companies, it launched in March 2025 and is now approaching its v1.0 release.

## The Problem

As AI agents move from demos to production, teams hit the same infrastructure wall. An agent needs to call an LLM, connect to multiple tool servers via MCP, and collaborate with other agents through A2A. Each of these connections introduces authentication, authorization, observability, and routing complexity. Traditional API gateways were designed for stateless request-response patterns, not for stateful JSON-RPC sessions with long-lived SSE connections and fan-out across multiple backends.

The result is a patchwork of custom integration code, duplicated auth logic, and zero centralized visibility into what agents are actually doing. Tool sprawl makes it worse. Every new MCP server or REST API becomes another bespoke 1:1 integration.

## What AgentGateway Does

AgentGateway is a connectivity data plane purpose-built for agentic workloads. It sits in front of your agents and provides a single control point for three categories of traffic.

### LLM Gateway

Route requests to OpenAI, Anthropic, Gemini, Amazon Bedrock, and Azure OpenAI through a unified OpenAI-compatible API. Switch providers without rewriting application code. The gateway handles budget controls, prompt enrichment, load balancing, and failover.

### MCP Gateway

Aggregate multiple MCP tool servers behind a single federated endpoint. AgentGateway supports stdio, HTTP/SSE, and Streamable HTTP transports. It also auto-translates existing OpenAPI REST endpoints into MCP tools, so you do not need to build custom MCP wrappers for every internal API.

### A2A Gateway

Enable agent-to-agent communication using Google's A2A protocol. Agents can discover each other's capabilities, negotiate modalities, and collaborate on long-running tasks. AgentGateway handles the routing and policy enforcement transparently.

## Security and Observability

This is where AgentGateway moves from convenience to production requirement.

**Authentication:** JWT, API keys, basic auth, and MCP auth spec compliance. OAuth integration with providers like Auth0 and Keycloak.

**Authorization:** Fine-grained RBAC powered by the Cedar policy engine. CEL-based access policies let you define who can call which tools, under what conditions, with precision.

**Traffic controls:** Rate limiting, CORS, TLS termination, and external authorization hooks.

**Observability:** Built-in OpenTelemetry support for metrics, distributed tracing, and logging. Drop-in integration with Prometheus, Grafana, and Jaeger.

**Guardrails:** Multi-layer content filtering via regex patterns, OpenAI moderation API, AWS Bedrock Guardrails, Google Model Armor, and custom webhooks.

## Why Rust

The choice of Rust is not cosmetic. Agent workloads involve long-lived, high-concurrency sessions with stateful connections. Memory leaks, thread safety issues, and garbage collection pauses are the kind of problems that silently compound over weeks of continuous operation. Rust eliminates entire categories of bugs at compile time. For infrastructure that sits in front of every agent call, that matters.

## Deployment

Two paths to production:

**Standalone:** Binary or Docker deployment for local development, on-prem, or VM-based infrastructure. Quickstart takes minutes.

**Kubernetes:** Built-in controller with Gateway API support. Dynamic configuration, inference routing based on GPU utilization, KV cache state, LoRA adapter availability, and queue depth.

## The Backing Coalition

The contributor list reads like a tech conference keynote lineup. Solo.io is the primary maintainer. Contributing organizations include Microsoft, Apple, Alibaba, Adobe, AWS, Cisco, Salesforce, Huawei, and Amdocs. This is not a weekend side project. It is an industry consensus that agent connectivity needs a dedicated, protocol-native infrastructure layer.

## Pricing

AgentGateway is fully open source under the Apache 2.0 license. No per-seat fees, no enterprise paywall for core features. The project is at roughly 2,000 GitHub stars and climbing toward its v1.0 release, currently in alpha.

## The Bigger Picture

The timing tells a story. Anthropic's Model Context Protocol crossed 97 million monthly SDK installs in March 2026, up from 2 million a year earlier. Google launched A2A to standardize agent-to-agent communication. The agentic AI ecosystem is growing faster than the infrastructure to secure it.

AgentGateway positions itself as the mesh layer. Not an LLM provider, not a framework, not a tool registry. The plumbing that connects all of them, with security and observability bolted on from day one rather than retrofitted after the first breach.

For teams moving beyond single-agent prototypes into multi-agent production systems, this is the kind of infrastructure that becomes non-negotiable. The question is whether AgentGateway will be the standard, or whether something else will emerge to fill the same role. Given the coalition behind it, the odds favor AgentGateway.

---

**Links:**
- [AgentGateway.dev](https://agentgateway.dev)
- [GitHub Repository](https://github.com/agentgateway/agentgateway)
- [Documentation](https://agentgateway.dev/docs)
- [Solo.io](https://solo.io)
