---
title: "Chutes AI Serverless Compute Deploy Open Source AI Models in Minutes"
excerpt: "Chutes is a decentralised, serverless AI compute platform that lets developers deploy and scale open-source LLMs with OpenAI-compatible APIs and pay-per-use pricing."
coverImage: "/assets/blog/chutes-ai-cover.jpg"
date: 2026-03-21T15:00:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/chutes-ai-cover.jpg"
---

## TL;DR

Chutes AI is a decentralised serverless compute platform built on the Bittensor network that lets developers deploy, run, and scale open-source AI models with minimal boilerplate. It offers OpenAI-compatible API endpoints, a Python SDK, Docker-based deployment, and pay-per-use pricing with no idle costs. The platform specialises in getting the latest state-of-the-art open-source models live within minutes of their release.

---

## What Is Chutes AI?

Chutes positions itself as "breakthrough serverless AI compute" aimed at developers who want to run open-source models without managing infrastructure. Under the hood, it is a decentralised network where miners contribute GPU resources and validators verify their authenticity through a library called GraVal (graphics card validation). Developers interact with this network through a clean Python SDK and CLI, deploying units called "chutes" (essentially FastAPI applications) that expose standard inference endpoints.

The platform is built by Rayon Labs and is deeply integrated with the Bittensor ecosystem. Authentication uses Bittensor wallet hotkey signatures, which is a departure from the typical email-and-OAuth flow most AI API platforms use. Once registered, users get API keys for standard HTTP access.

## Key Features

**OpenAI-Compatible Endpoints** - Every deployed chute exposes `/v1/chat/completions` and related routes, meaning any code written for OpenAI's API works against Chutes with zero modifications to the request format.

**Python SDK and CLI** - The `chutes` SDK provides templates for common serving frameworks like vLLM. Defining a chute takes roughly ten lines of Python. The CLI handles building Docker images, deploying to the platform, checking logs, and managing resources.

**Fast Model Availability** - The Chutes team claims to have new open-source models running within minutes of their public release. For models not already available, users can define and deploy their own chute pointing to any Hugging Face model.

**Serverless, Pay-Per-Use** - You are only charged when your chute receives requests. There are no idle compute costs, which makes it attractive for applications with intermittent traffic.

**GPU-Accelerated Inference** - Chutes runs on NVIDIA GPUs with CUDA 12.2 to 12.6 support. Node selectors let you specify GPU count and type requirements per chute.

**Trusted Execution Environments** - TEE support is now publicly available, offering isolated, secure compute for sensitive workloads.

**Auto-Scaling** - Chutes automatically scales instances based on concurrency settings defined in the chute configuration. Each chute declares a concurrency limit, and the platform handles the rest.

## How Deployment Works

The workflow is straightforward. First, define a chute using the SDK:

```python
from chutes.chute import NodeSelector
from chutes.chute.template.vllm import build_vllm_chute

chute = build_vllm_chute(
    username="your-username",
    readme="## My Model Chute",
    model_name="unsloth/Llama-3.2-1B-Instruct",
    node_selector=NodeSelector(gpu_count=1),
    concurrency=4,
)
```

Build the Docker image with `chutes build my_chute:chute --wait`, then deploy with `chutes deploy my_chute:chute`. The platform returns a public API URL and chute ID. From there, inference requests go directly to the OpenAI-compatible endpoint.

Local testing is supported too. Run `chutes run my_chute:chute --dev` to spin up the chute locally before pushing it to production.

## Model Support

Chutes covers a broad range of model types beyond just text generation. The platform supports:

- **Language Models** via vLLM (any Hugging Face model)
- **Embedding Models** for search and recommendation
- **Content Moderation** classifiers
- **3D Generation** models
- **Custom Models** with user-provided code

The explore page on the platform lets users browse publicly available chutes sorted by popularity, making it easy to find and use community-deployed models without deploying your own.

## Pricing

Chutes uses pure pay-per-use billing. There are no subscription tiers, no minimum commitments, and no charges when your endpoints are idle. Exact per-token or per-request pricing depends on the model and GPU type selected. The platform provides a dashboard for monitoring spend in real time.

## Who Is It For?

Chutes is most useful for developers and startups who want to run open-source models without building or maintaining their own inference infrastructure. The pay-per-use model suits applications with variable traffic. The Bittensor integration and decentralised architecture may appeal to those already in that ecosystem, though it does add a layer of complexity to the onboarding process compared to a standard API key sign-up.

The TEE support also makes it relevant for teams handling sensitive data that requires hardware-level isolation.

## Limitations and Considerations

The Bittensor wallet requirement for authentication is an unusual barrier for developers unfamiliar with that ecosystem. While the platform offers a managed wallet option through the web UI, it is still an extra step compared to competitors like Replicate or Modal. The decentralised infrastructure also means performance characteristics may vary depending on which miners are serving a particular model at any given time, though the validation layer aims to keep quality consistent.

As a relatively newer platform, the ecosystem of third-party integrations and documentation is thinner than what you would find for Modal, RunPod, or the hyperscaler AI offerings.

## The Bottom Line

Chutes AI offers a compelling proposition for developers who want serverless, GPU-accelerated inference for open-source models without infrastructure overhead. The OpenAI-compatible API means zero migration effort, the Python SDK keeps deployment friction low, and the pay-per-use model aligns costs with actual usage. The Bittensor integration and decentralised architecture set it apart from the crowd, for better or worse depending on your tolerance for non-standard authentication flows.

If you are building with open-source LLMs and want to skip the infrastructure layer entirely, Chutes is worth a look.

---

**Links**

- Website: [chutes.ai](https://chutes.ai)
- Documentation: [chutes.ai/docs](https://chutes.ai/docs)
- GitHub: [github.com/chutesai/chutes](https://github.com/chutesai/chutes)
- Discord: [discord.gg/chutes](https://discord.gg/wHrXwWkCRz)
