---
title: "Vast.ai API: The GPU Marketplace That Undercuts Every Major Cloud Provider"
excerpt: "Vast.ai connects developers to a global marketplace of affordable GPUs with per-second billing, serverless inference, and a REST API that lets you programmatically find, rent, and deploy GPU instances in seconds."
coverImage: "/assets/blog/vast-ai-api-cover.jpg"
date: 2026-03-29T09:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/vast-ai-api-cover.jpg"
---

## TL;DR

Vast.ai is a GPU cloud marketplace where hosts compete on price, driving compute costs well below AWS, GCP, and Azure. With a REST API, CLI, and Python SDK, developers can programmatically search offers, launch instances, and run serverless inference workloads with per-second billing and no long-term commitments. If you need affordable GPU compute for training, inference, or fine-tuning, Vast.ai is worth a serious look.

## The Problem

Running AI workloads on traditional cloud providers is expensive. AWS p4d.24xlarge instances with 8 A100 GPUs run north of $30 per hour. GCP and Azure aren't much better. For startups, researchers, and indie developers training or serving models, these costs add up fast and create a real barrier to entry.

Meanwhile, there is massive amounts of闲置 GPU capacity sitting in data centers and on individual machines worldwide. Vast.ai was built to connect those two sides, marketplace-style.

## How Vast.ai Works

Vast.ai operates as a two-sided marketplace. GPU providers, from hobbyists with a single machine to Tier-4 data centers, list their compute on the platform. Users search, filter, and rent instances based on their needs. Prices are set by supply and demand, not a corporate pricing committee.

The platform offers three deployment modes:

- **GPU Cloud** - Full control over a rented instance with SSH access, Docker containers, and Jupyter notebooks
- **Serverless** - Zero-ops inference with automatic scaling via the PyWorker system
- **Clusters** - Multi-GPU setups for large-scale training jobs

## API Capabilities

The Vast.ai REST API is the backbone of the platform. It gives developers full programmatic control over the entire instance lifecycle.

### Key API Endpoints

The API supports searching, creating, and managing GPU instances. Here's a taste of what's available:

**Search Offers** - Query the marketplace for available GPUs filtered by type, price, VRAM, reliability score, and more:

```bash
curl -H "Authorization: Bearer $VAST_API_KEY" \
  "https://cloud.vast.ai/api/v1/bundles/"
```

**Create Instance** - Launch a GPU instance from a template or custom Docker image:

```python
import requests

response = requests.post(
    "https://cloud.vast.ai/api/v1/instances",
    headers={"Authorization": f"Bearer {API_KEY}"},
    json={
        "image": "vastai/pytorch:latest",
        "gpu_num": 1,
        "cpu_num": 4,
        "ram": 16000,
        "disk": 20000,
    }
)
```

**Manage Instances** - Start, stop, and destroy instances programmatically. Monitor costs and performance in real time.

The Python SDK (`pip install vastai-sdk`) wraps these calls into a cleaner interface for those who prefer not to work directly with REST.

## Serverless Inference with PyWorker

The serverless offering is where Vast.ai gets interesting for production inference workloads. The PyWorker system is a Python web server that runs alongside your model instance, handling incoming API requests and forwarding them to the model backend.

The flow works like this:

1. Client sends a POST to the `/route/` endpoint
2. The serverless system picks an available worker instance and returns its URL
3. Client sends the inference request directly to that worker
4. PyWorker validates, extracts the payload, and forwards it to the model server
5. The model generates output and returns it through the PyWorker back to the client

All Vast serverless templates include PyWorker integration out of the box. The GitHub repo at `github.com/vast-ai/pyworker` provides examples for building custom workers.

No additional fees are charged for serverless. You pay only for the underlying compute, storage, and bandwidth.

## Pricing Model

Vast.ai uses real-time marketplace pricing. Providers set their own rates, and competition keeps costs low. Here's how the math typically breaks down:

| Instance Type | Discount vs On-Demand | Best For |
|---|---|---|
| On-Demand | Baseline | Production workloads needing guarantees |
| Reserved | Up to 50% off | Long-term, predictable workloads |
| Interruptible | 50%+ off | Training, batch jobs, fault-tolerant tasks |

GPU compute is billed per second. Storage is charged continuously while the instance exists. Bandwidth costs vary by host. The total cost is the sum of these three components.

In practice, you'll often find A100 instances at $0.80-$1.50 per hour, compared to $3+ on major clouds. H100s typically run $2-$4 per hour versus $10+ on AWS.

## Getting Started

The fastest path to first GPU:

1. Sign up at `cloud.vast.ai` (as little as $5 to start)
2. Search for GPUs using the dashboard filters or API
3. Pick a template or use a custom Docker image
4. Launch the instance and connect via SSH, Jupyter, or the Instance Portal

The Instance Portal is a nice touch. It provides authenticated access to web services running in your instance, with automatic TLS encryption and no port exposure needed.

## Developer Experience

The CLI tool (`vastai`) is well-documented and covers the full instance lifecycle:

```bash
pip install vastai
vastai search offers gpu_name=RTX4090 ram_min=24000
vastai create instance <offer_id> --image pytorch/pytorch
vastai show instances
```

For Python developers, the SDK provides the same functionality with a cleaner interface. Both the CLI and SDK map directly to the REST API, so nothing is hidden.

## Who It's For

Vast.ai is not for everyone. It makes the most sense for:

- **Startups and indie developers** who need GPU compute but can't justify AWS bills
- **Researchers** running training jobs that can tolerate occasional interruptions
- **Hobbyists** experimenting with open-source models who want real GPU power at commodity prices
- **Teams** running inference workloads where cost-per-token matters more than guaranteed uptime

If you need SOC 2 compliance, 99.99% uptime SLAs, and enterprise support contracts, traditional cloud providers are still your best bet. Vast.ai is a marketplace, and with that comes the inherent variability of a decentralized system.

## Bottom Line

Vast.ai solves a real problem. GPU compute is too expensive and too centralized. By creating a marketplace where anyone can rent out their GPUs and anyone can rent them, Vast.ai has built a legitimate alternative to the hyperscalers for cost-sensitive AI workloads.

The API is functional, the serverless offering is mature enough for production use, and the pricing genuinely undercuts the major clouds. It's not perfect, the decentralized model introduces some variability, but for most AI development and inference work, the tradeoffs are worth it.

If you're burning through GPU budget on AWS or GCP, it's worth running your workload through Vast.ai's search API and comparing the numbers. You might be surprised.

## Sources

- [Vast.ai Documentation](https://docs.vast.ai)
- [Vast.ai Pricing](https://docs.vast.ai/documentation/instances/pricing)
- [Vast.ai Serverless Overview](https://docs.vast.ai/documentation/serverless/overview)
- [Vast.ai PyWorker GitHub](https://github.com/vast-ai/pyworker/)
- [Vast.ai Official Site](https://vast.ai)
