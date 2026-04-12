---
title: "SaladCloud API: The Community GPU Cloud Charging $0.02/hr for AI Inference"
excerpt: "SaladCloud connects millions of consumer GPUs into the world's largest distributed cloud, offering AI inference at up to 90% less cost than hyperscalers."
coverImage: "/assets/blog/saladcloud-cover.jpg"
date: 2026-03-28T21:46:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/saladcloud-cover.jpg"
---

## TL;DR

SaladCloud is a distributed cloud platform that aggregates millions of consumer GPUs, primarily gaming PCs, into an AI inference network. Their Container Engine API lets you deploy Docker containers at prices starting from $0.02/hr, up to 90% cheaper than AWS, GCP, or Azure. They also offer managed Transcription APIs with 97+ language support and 90%+ accuracy, plus a residential proxy gateway service.

## The Problem

Running AI inference at scale is expensive. A single A100 instance on a major cloud provider runs $3-4/hr, and scaling to hundreds of GPUs for production inference workloads can burn through a startup's budget in weeks. For companies like Civitai, which serves 10 million AI-generated images per day, cloud GPU costs are existential.

Meanwhile, millions of powerful gaming GPUs sit idle most of the day worldwide, their RTX 4090s and 3090s gathering digital dust when their owners aren't gaming.

## SaladCloud's Approach

SaladCloud bridges this gap by turning idle consumer GPUs into a distributed cloud. Think Airbnb for compute. Device owners install the Salad agent, and when their PC is idle, Salad assigns containers to run on it. The device owner gets paid; the customer gets dirt-cheap GPU compute.

The network currently spans 191 countries with over 450,000 earning nodes and 60,000+ daily active GPUs. That makes it one of the largest GPU clouds by node count, even if individual nodes are consumer-grade rather than datacenter hardware.

---

## Key API Products

### 1. Salad Container Engine (SCE)

The core product. SCE is a fully managed container orchestration service that deploys your Docker images to the distributed network. You define a Container Group with your image, hardware requirements, and replica count, and SCE handles the rest.

**How it works:**

- Bring your own Docker image (Linux, AMD64 only)
- Specify GPU class, vCPUs, and RAM
- Set desired replica count (minimum 2 recommended for reliability)
- SCE distributes containers across eligible nodes automatically
- Containers run stateless inside Hyper-V virtualized Linux subsystems on Windows hosts

**Available GPU classes include:**

| GPU | VRAM | Hourly Price |
|-----|------|-------------|
| RTX 5090 | 32GB | $0.294 |
| RTX 4090 | 24GB | $0.204 |
| RTX 3090 | 24GB | $0.124 |
| RTX 3060 | 12GB | $0.084 |
| RTX 3080 | 10GB | $0.114 |

Compare an RTX 4090 at $0.20/hr on SaladCloud to $3-4/hr for an A100 on AWS, and the math speaks for itself. Yes, A100s are faster for training, but for inference workloads where you need volume over raw single-GPU throughput, consumer cards at a fraction of the price make sense.

**API access** is available through their OpenAPI-compliant REST API. The SaladCloud Portal at portal.salad.com also provides a browser-based UI for managing deployments without writing code.

### 2. Transcription API

A fully managed speech-to-text service billed by audio minute. Two tiers:

- **Salad Transcription API**: High-accuracy tier with 97+ language support, speaker identification, multichannel separation, translation to English, and automatic summarization. Over 90% average Word Error Rate (WER) accuracy across benchmarks.
- **Transcription Lite**: Faster, budget-friendly version for core language transcription needs.

Both produce SRT output for captions/subtitles and include word-level timestamps. Migration guides are available for users moving from Azure Batch Transcription, Google Cloud Speech-to-Text, Rev, AssemblyAI, Amazon Transcribe, or Deepgram.

New accounts get 5-12.5 free audio hours to test.

### 3. Simple Storage Service (S4)

A free temporary storage layer for uploading assets to use within SaladCloud. Files up to 100MB are stored for 30 days. Useful for staging audio files before transcription or images before running them through inference pipelines.

### 4. Gateway Service (SGS)

Residential IPs dedicated to streaming media and data collection workloads. This one is more niche, targeting companies that need residential proxy infrastructure for web scraping or content delivery.

---

## API Quick Start

Here is a basic example of deploying a container group via the SaladCloud API:

```bash
curl -X POST "https://api.salad.com/api/organizations/{org_name}/container-groups" \
  -H "Authorization: Bearer {api_key}" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "my-llm-inference",
    "image": "docker.io/myorg/llm-server:latest",
    "resources": {
      "gpu_class": "rtx-4090",
      "v_cpu": 4,
      "memory": 8192
    },
    "replicas": 2,
    "display_name": "LLM Inference Workers"
  }'
```

Authentication is API-key based. The API follows OpenAPI specifications and provides SDK templates in multiple languages.

---

## Pricing Model

SaladCloud's pricing is straightforward:

- **GPU instances**: Pay only while containers are running, no cold boot charges
- **General-purpose instances**: From $0.005/hr for basic compute
- **Volume discounts**: Available for 50+ GPU instances via sales
- **No free trial for SCE**, but the Transcription API includes free audio hours

The key differentiator is that you are only billed for container runtime. The time spent selecting hardware, downloading your container image, and initializing the environment is free.

---

## Real-World Results

SaladCloud publishes case studies showing substantial savings:

- **Civitai**: Serves 10 million images/day and trains 15,000+ LoRAs/month on 600+ consumer GPUs, with the lowest GPU prices in the market
- **Blend**: Runs 3x more scale at half the cost of local A100s, and 85% less than the two major hyperscalers
- **Image generation**: 10,000+ images for $1 on RTX 5090 hardware, with 1.2s/image latency using Flux.1-Schnell
- **Speech-to-text**: 91.13% accuracy powered by Whisper Large v3 at fraction of cloud provider costs
- **LLM inference**: $0.12 per million tokens average for TGI, $0.22/hr for 7B parameter models

---

## Limitations and Tradeoffs

This is not a silver bullet. Consumer GPUs on a distributed network have real constraints:

- **Availability fluctuations**: Nodes go offline when owners start gaming. Salad handles reallocations, but there can be latency during transitions
- **No ARM support**: Only AMD64 Linux containers are supported
- **Consumer hardware**: These are not datacenter-grade A100s. For large model training or latency-critical workloads requiring guaranteed uptime SLAs, traditional cloud providers may still be better
- **Stateless execution**: Containers are purged when they stop. You need external storage for persistent data
- **Windows hosts**: All containers run inside Hyper-V VMs on Windows, which adds a virtualization layer

For inference workloads where you can tolerate some variability and want to optimize for cost per token or cost per image, SaladCloud is hard to beat on price.

---

## Verdict

SaladCloud occupies an interesting niche in the AI infrastructure market. It is not trying to compete with AWS or GCP on enterprise features or guaranteed SLAs. Instead, it is playing a volume game: aggregate millions of underutilized consumer GPUs, offer them at rock-bottom prices, and let the economics work for cost-sensitive inference workloads.

For startups burning through GPU budgets, teams running batch processing jobs, or anyone building AI products where cost-per-inference matters more than guaranteed low latency, SaladCloud's API is worth evaluating. The Container Engine gives you full control over Docker deployments, the Transcription API offers a ready-to-use managed service, and the pricing is genuinely competitive.

It is not for everyone. But at $0.02/hr starting prices and 90% cost savings versus hyperscalers, it does not need to be.
