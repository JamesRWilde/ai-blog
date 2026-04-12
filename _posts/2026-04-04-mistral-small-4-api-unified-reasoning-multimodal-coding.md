---
title: "Mistral Small 4 API: Reasoning, Vision, and Coding in a Single Open-Source Model"
excerpt: "Mistral Small 4 unifies reasoning, multimodal understanding, and agentic coding into one Apache 2.0 model with configurable reasoning effort. At 119B parameters with only 6B active, it delivers frontier capability at a fraction of the compute."
coverImage: "/assets/blog/mistral-small-4-cover.jpg"
date: 2026-04-04T12:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/mistral-small-4-cover.jpg"
---

## TL;DR

Mistral AI released **Mistral Small 4** in early March 2026, a 119B-parameter Mixture-of-Experts model that unifies three previously separate product lines, reasoning (Magistral), vision (Pixtral), and agentic coding (Devstral), into a single open-source model under the Apache 2.0 license. With configurable reasoning effort, native multimodality, a 256K context window, and just 6B active parameters per token, it positions itself as the most efficient general-purpose open model available. Available via the Mistral API, Hugging Face, NVIDIA NIM, and OpenRouter.

## The Problem

Until March 2026, if you wanted a best-of-class open-weight model from Mistral for a complex workload, you faced a routing problem. Need deep reasoning? Use **Magistral**. Need image understanding? Use **Pixtral**. Need a coding agent? Use **Devstral**. Fast general chat? **Mistral Small 3.2**. Each model is genuinely good at its job, but production systems that do all of the above need to juggle multiple endpoints, multiple API calls, multiple context windows, and multiple fine-tuning pipelines.

That fragmentation is not unique to Mistral. It is the default pattern across every open-weight provider. Gating reasoning behind a separate model class increases cost, adds latency from context hand-offs, and complicates evaluation. The question is whether a single model can deliver all three capabilities without diluting any of them.

## Architecture: Mixture of Experts Done Right

Mistral Small 4 is a MoE model with **128 experts** and **4 active per token**. The total parameter count sits at **119 billion**, but only about **6 billion** (8 billion including embedding and output layers) are active at inference time. This is the fundamental efficiency story: you get the memory footprint of a mid-sized model with the expressive capacity of a much larger one.

**256K context window**, up from 128K on most previous Mistral models. That means full codebase analysis, long document ingestion, and extended multi-turn conversations without truncation.

**Native multimodality** is built into the base architecture, not bolted on as a separate vision projector. Text and image inputs are processed within the same context, following the standard Chat Completions API pattern already familiar to Mistral users.

## Configurable Reasoning Effort

The headline feature is the `reasoning_effort` parameter, which lets you dial reasoning up or down at call level:

- **`reasoning_effort="none"`** — Fast, lightweight responses. Equivalent to Mistral Small 3.2 style. Ideal for high-throughput classification, summarization, and simple Q&A.
- **`reasoning_effort="high"`** — Deep chain-of-thought reasoning for complex problems. Comparable to Magistral's verbosity and depth. The model generates thinking traces before producing its final answer, following the test-time computation pattern pioneered by models like o1.

This matters because most API workloads are mixed. A customer service bot needs snappy responses 80 percent of the time and occasionally needs to reason through a multi-step refund policy. Instead of routing to two models, you toggle a flag. Fewer endpoints, simpler infrastructure, consistent context.

**Confidence: High** — The parameter is documented in Mistral's official reasoning capabilities docs with explicit guidance on usage.

## Performance Claims and Independent Context

Mistral claims a **40 percent reduction in end-to-end completion time** over Small 3 in latency-optimized setups, and **3x more requests per second** in throughput-optimized configurations. These numbers come from Mistral's own benchmarks, so they carry the usual manufacturer discount.

What is more independently verifiable: on benchmarks like **LiveCodeBench** and **AA LCR**, Small 4 with reasoning matches or exceeds **GPT-OSS 120B** while generating significantly shorter outputs. On AA LCR, Small 4 scores 0.72 with 1.6K characters of output, while comparable Qwen models require 3 to 4 times more output length (5.8 to 6.1K) for similar performance. Shorter outputs mean lower latency, cheaper API bills, and better user experience.

Against **Mistral Small 3.2**, this is a generational leap. Small 3.2 was competent but never competitive with frontier models. Small 4, by contrast, sits in the conversation with models three to five times its active parameter count on standardized reasoning and instruction-following benchmarks.

**Confidence: Medium** — The benchmark advantage over GPT-OSS is specific to Mistral's reported data. Independent replication from third-party evaluators like Artificial Analysis or Chatbot Arena has not yet been published at time of writing. Expect these to appear within weeks given the model's profile.

## API Usage

The model is available at `mistral-small-latest` (the rolling pointer for the current Small 4 release) via the standard Mistral Chat Completions endpoint, which is OpenAI-compatible.

```python
from mistralai import Mistral

client = Mistral(api_key="YOUR_API_KEY")

# Fast, no reasoning
response = client.chat.complete(
    model="mistral-small-latest",
    messages=[
        {"role": "user", "content": "Summarize this news article in three bullet points."}
    ],
    reasoning_effort="none"
)

# Deep reasoning
response = client.chat.complete(
    model="mistral-small-latest",
    messages=[
        {"role": "user", "content": "Debug this async Python deadlock. Explain the root cause and propose a fix."}
    ],
    reasoning_effort="high"
)
```

Vision inputs follow the existing pattern:

```python
response = client.chat.complete(
    model="mistral-small-latest",
    messages=[
        {"role": "user", "content": [
            {"type": "text", "text": "What does this system architecture diagram show?"},
            {"type": "image_url", "image_url": "https://example.com/architecture.png"}
        ]}
    ],
    reasoning_effort="none"
)
```

Pricing on the Mistral API platform is positioned at the aggressive end of the market, consistent with Mistral's pattern of underpricing larger providers on comparable benchmarks.

The model is also available through:
- **OpenRouter** (pay-per-token, no commitment)
- **NVIDIA NIM** (containerized inference, day-0 availability)
- **Hugging Face** (weights for self-hosted deployment)
- **vLLM, SGLang, llama.cpp, Transformers** — all have working inference support

## Who Should Care

**Developers building multi-modal agents.** If your application needs to chat, reason about images, and write code, Small 4 eliminates the routing taxonomy that previously required three separate model calls.

**Teams concerned about API cost efficiency.** Six billion active parameters per token with frontier-level benchmarks means you pay for what you use without subsidising dormant weights.

**Organisations that need open-weight deployment.** Apache 2.0 means you can fine-tune, distribute, and self-host without legal friction. This matters for regulated industries, on-premise requirements, and any team that treats model access as a supply chain risk rather than a convenience.

**Researchers who want efficient reasoning testbeds.** The configurable reasoning effort makes it possible to study the relationship between test-time compute and accuracy within a single model, rather than across different architectures.

## The Caveats

This is not a model that beats Claude 4 Sonnet or GPT-5 Pro across the board. On the hardest reasoning benchmarks, dedicated large reasoning models (Magistral in Mistral's own lineup, plus o-class competitors from other labs) still pull ahead. Small 4 with `reasoning_effort="high"` gets close on many tasks, but the gap remains on the most mathematically demanding problems.

The 256K context window is impressive on paper but has not been extensively stress-tested by independent evaluators for retrieval accuracy at long distances. The "lost in the middle" problem that plagued earlier generation models may still lurk at the extremes of this range.

Mistral's claim of 3x throughput improvement over Small 3 is measured against their own previous generation at specific hardware configurations. Your mileage will vary depending on your inference stack, batch sizes, and GPU availability.

## The Verdict

Mistral Small 4 is the strongest argument yet that MoE architecture at the sub-30B-active-parameter range can deliver frontier-adjacent capability in a single unified model. The configurable reasoning effort is a genuinely useful feature that no closed provider currently offers with the same granularity. The Apache 2.0 license means teams that have been waiting for an open model that can plausibly replace multiple API calls now have a candidate worth benchmarking against their current stack.

It will not dethrone the absolute top models on every benchmark. That was never the point. The point is that a single open model can now cover most production use cases competently, without forcing developers to become routing architects for a fleet of specialised endpoints.

---

*API documentation: [docs.mistral.ai](https://docs.mistral.ai)*
*Model announcement: [mistral.ai/news](https://mistral.ai/news/mistral-small-4)*
*Weights on Hugging Face: [mistralai/mistral-small-4](https://huggingface.co/collections/mistralai/mistral-small-4)*
*NVIDIA NIM: [build.nvidia.com](https://build.nvidia.com/mistralai/mistral-small-4-119b-2603)*
