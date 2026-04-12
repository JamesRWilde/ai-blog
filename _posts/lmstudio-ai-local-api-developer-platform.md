---
title: "LM Studio API: Run AI Models Locally With an OpenAI-Compatible Developer Platform"
excerpt: "LM Studio turns your local machine into a private AI inference server with an OpenAI-compatible API, dedicated TypeScript and Python SDKs, and a new remote access feature called LM Link."
coverImage: "/assets/blog/lmstudio-api-cover.jpg"
date: 2026-03-22T05:30:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/lmstudio-api-cover.jpg"
---

## TL;DR

LM Studio is a desktop application that downloads and runs open-weight LLMs on your own hardware, exposing an OpenAI-compatible REST API on `localhost:1234`. It ships with dedicated TypeScript and Python SDKs, a CLI called `lms`, and a preview feature called LM Link that lets you connect to remote LM Studio instances as though they were local. For developers who need zero-cost inference, full data privacy, and drop-in OpenAI client compatibility without changing a line of existing code, LM Studio is worth a serious look.

## The Problem

Running AI models locally has always been a pain for developers. Ollama solved the CLI workflow, but its API surface is minimal and doesn't mirror OpenAI's endpoint structure. llama.cpp offers raw power but requires C++ knowledge to integrate properly. Cloud APIs are easy to use but send your data to third-party servers, and the bills scale unpredictably with volume.

LM Studio occupies the middle ground. It gives you a polished GUI for browsing and downloading models from Hugging Face, then exposes those models through a REST API that matches OpenAI's `/v1/chat/completions` signature almost exactly. Swap the `base_url`, keep everything else, and your existing code just works.

## How LM Studio's API Works

When you launch LM Studio and start the local server (via the GUI or `lms server start`), it listens on `http://localhost:1234` and exposes these endpoints:

| Endpoint | Method | Purpose |
|---|---|---|
| `/v1/models` | GET | List loaded models |
| `/v1/chat/completions` | POST | Chat-style inference with streaming |
| `/v1/completions` | POST | Raw text completion |
| `/v1/embeddings` | POST | Generate text embeddings |
| `/v1/responses` | POST | OpenAI Responses API (supports Codex) |

The key value proposition is compatibility. You can point the official OpenAI Python SDK, the TypeScript SDK, or any OpenAI-compatible client at LM Studio and it works:

```python
from openai import OpenAI
client = OpenAI(base_url="http://localhost:1234/v1", api_key="lm-studio")

completion = client.chat.completions.create(
  model="model-identifier",
  messages=[
    {"role": "system", "content": "Always answer in rhymes."},
    {"role": "user", "content": "Introduce yourself."}
  ],
  temperature=0.7,
)
print(completion.choices[0].message)
```

Supported parameters include `temperature`, `top_p`, `top_k`, `max_tokens`, `stream`, `stop`, `presence_penalty`, `frequency_penalty`, `logit_bias`, `repeat_penalty`, and `seed`. The API applies chat prompt templates automatically for chat-tuned models, so you don't need to format system/user/assistant turns yourself.

## Dedicated SDKs: TypeScript and Python

Beyond OpenAI compatibility, LM Studio provides purpose-built SDKs that unlock capabilities the generic API doesn't cover.

### TypeScript SDK (`lmstudio-js`)

Install via `npm install @lmstudio/sdk`. The SDK supports both browser and Node.js environments and lets you:

- Run chat completions and text predictions
- Define function tools and build autonomous agents that run entirely locally
- Load, configure, and unload models from GPU memory programmatically
- Generate embeddings

### Python SDK (`lmstudio-python`)

Install via `pip install lmstudio`. The Python SDK offers three usage patterns:

1. **Interactive convenience API** - Simple synchronous calls for notebooks and scripts
2. **Scoped resource API** - Context managers for deterministic resource cleanup
3. **Asynchronous structured concurrency API** - For async Python applications (requires SDK 1.5.0+)

Timeouts are configurable starting from version 1.5.0, defaulting to 60 seconds for the synchronous API.

Both SDKs talk directly to the LM Studio server and give you finer-grained control than the OpenAI-compatible endpoints, including model management operations.

## The CLI: `lms`

LM Studio bundles a CLI tool called `lms` (MIT licensed, open source). Key commands:

```bash
lms get qwen/qwen3-4b-2507    # Download a model from Hugging Face
lms ls                         # List local models
lms ps                         # Show loaded models in memory
lms load --gpu=1.0 --context-length=8192   # Load with options
lms server start               # Start the API server
lms chat                       # Interactive terminal chat
```

The `--gpu` flag controls GPU offload (0.0 to 1.0 or `auto`/`max`), and you can assign custom identifiers to loaded models with `--identifier="my-model-name"` for consistent referencing in your API calls.

## LM Link: Remote Access (Preview)

LM Link is a new preview feature that lets you connect to LM Studio instances running on remote machines (servers, LLM rigs, cloud VMs) as if they were local. The connection is end-to-end encrypted. Once linked, you load and use remote models through the same SDK and API interfaces you use for local inference. Access is being rolled out in batches.

## Pricing

LM Studio is free for personal and commercial use. There are no API call fees, no token-based pricing, and no subscription tiers. The only cost is your hardware. The `lms` CLI and both SDKs are open source.

## Who Should Use This

LM Studio's API is best suited for:

- **Privacy-sensitive workloads** where data cannot leave your infrastructure
- **Prototyping and development** where you want to test against multiple open models without cloud costs
- **Edge and on-premise deployments** where internet connectivity is unreliable or prohibited
- **Developers already using OpenAI clients** who want a drop-in local replacement

It is not ideal for high-volume production inference at scale, where dedicated inference providers (Groq, Together AI, Cerebras) will outperform a desktop application's throughput. LM Studio is fundamentally a local-first tool, not a cloud inference platform.

## Verdict

LM Studio has quietly become one of the most practical tools for local AI development. The OpenAI-compatible API means you can swap between cloud and local inference by changing a single URL. The dedicated SDKs go further, offering model lifecycle management and agentic capabilities that don't exist in the standard OpenAI interface. LM Link, even in preview, hints at a future where your local models become a private inference network accessible from anywhere.

If you're building AI applications and haven't tried LM Studio's API layer, you're missing the most developer-friendly local inference option available today.

---

**Sources:**
- [LM Studio Official Site](https://lmstudio.ai)
- [LM Studio OpenAI Compatibility Docs](https://lmstudio.ai/docs/developer/openai-compat)
- [lmstudio-js TypeScript SDK](https://lmstudio.ai/docs/typescript)
- [lmstudio-python Python SDK](https://lmstudio.ai/docs/python)
- [lms CLI Documentation](https://lmstudio.ai/docs/cli)
- [LM Link Documentation](https://lmstudio.ai/link)
