---
title: "ComfyUI Cloud API: Run 900+ AI Models With a Single API Call"
excerpt: "ComfyUI's new Cloud API gives developers programmatic access to 900+ image, video, audio, and 3D AI models through a node-based workflow engine. Here is what it actually offers."
coverImage: "/assets/blog/comfyui-cover.png"
date: 2026-03-29T06:35:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/comfyui-cover.png"
---

## TL;DR

ComfyUI, the open-source node-based generative AI engine with over 107,000 GitHub stars, now offers a Cloud API that lets developers run complex AI workflows programmatically. The API supports image generation (Flux.2, Stable Diffusion, Ideogram, Qwen Image), video generation (Wan 2.2, Runway, Kling, Sora 2), 3D asset creation (Rodin, Tripo), and audio — all behind a single REST API with usage-based pricing. A free tier ships with 400 monthly credits. The API is API-compatible with the local ComfyUI server, so existing integrations migrate with minimal changes.

## The Problem

Most AI generation APIs lock you into a single model family. Need Flux for images and Wan for video? That is two separate SDKs, two billing accounts, and two integration patterns. If you want to chain models together (generate an image, then animate it, then add sound), you are stitching together three different APIs with three different authentication schemes and rate limits.

ComfyUI solves this at the workflow level. Its node-based architecture lets you compose arbitrary chains of AI models in a visual editor, and the new Cloud API exposes that same composability to code. One API key, one authentication pattern, one billing account — but access to 900+ models across every modality.

---

## What ComfyUI Actually Is

ComfyUI is a node-based graphical interface for generative AI pipelines. Instead of writing sequential code to call a model, you build a directed graph of nodes on a canvas. Each node represents a single operation: load a model, encode a prompt, sample latents, decode an image, save the output. Connecting nodes defines the data flow. It is essentially a visual programming language purpose-built for diffusion models and generative AI.

The project was created by comfyanonymous and has grown into one of the largest open-source AI projects on GitHub. It runs locally on Windows, macOS, and Linux, supporting NVIDIA, AMD, Intel, Apple Silicon, and Ascend GPUs. The open-source engine is licensed under GPL-3.0.

Comfy Cloud, the hosted version, runs these same workflows on Blackwell RTX 6000 Pro GPUs with 96GB of VRAM. No setup, no GPU purchases, no CUDA driver headaches. Just a browser tab or an API call.

### Supported Model Categories

ComfyUI's model support spans every major generative modality:

- **Image Generation:** Flux.2 (Klein, Pro), Stable Diffusion (1.5 through 3.5 Ultra), Ideogram, Qwen Image, ByteDance Seedream 4.0, Z-Image Turbo, Google Nano Banana 2, GPT Image 1.5
- **Image Editing:** Flux Kontext, Qwen Image Edit, HiDream E1.1, Omnigen 2
- **Video Generation:** Wan 2.1/2.2 (text-to-video, image-to-video, VACE), Runway Gen-4.5, Kling, OpenAI Sora 2, Vidu, xAI Grok Imagine Video
- **3D Generation:** Rodin (PBR materials from text/images), Tripo (high-fidelity 3D models), Hunyuan3D 2.0
- **Audio:** Stable Audio, ACE Step, ElevenLabs Music, Inworld TTS 1.5

This is not a hypothetical model list. Every model listed above runs on Comfy Cloud today.

### How Workflows Work

A ComfyUI workflow is a JSON object describing a graph of nodes. Each node has a `class_type` (which operation to run) and `inputs` (parameters and connections to other nodes). You build these visually in the browser, then export them in "API format" — a JSON file you can submit to the API.

The key insight is that workflows are portable. You can design a complex pipeline visually (text prompt to image, image to video, add audio), export it as JSON, and then invoke it from any HTTP client. Changing the output means tweaking the JSON or iterating in the visual editor. You do not need to rewrite code.

---

## The Cloud API in Detail

### Authentication and Base URL

The API lives at `https://cloud.comfy.org`. Authentication uses an API key passed via the `X-API-Key` header. You generate keys at platform.comfy.org after logging in.

```bash
curl -X GET "https://cloud.comfy.org/api/user" \
  -H "X-API-Key: $COMFY_CLOUD_API_KEY"
```

### Submitting a Workflow

The primary endpoint is `POST /api/prompt`. You submit a workflow JSON and receive a `prompt_id` (job ID) back. Jobs run asynchronously.

```python
import os, json, requests

BASE_URL = "https://cloud.comfy.org"
API_KEY = os.environ["COMFY_CLOUD_API_KEY"]

with open("workflow_api.json") as f:
    workflow = json.load(f)

response = requests.post(
    f"{BASE_URL}/api/prompt",
    headers={"X-API-Key": API_KEY, "Content-Type": "application/json"},
    json={"prompt": workflow}
)
prompt_id = response.json()["prompt_id"]
print(f"Job submitted: {prompt_id}")
```

### Monitoring Job Status

Poll `GET /api/job/{prompt_id}/status` for status updates. Possible values are `pending`, `in_progress`, `completed`, `failed`, and `cancelled`.

```python
import time

while True:
    status = requests.get(
        f"{BASE_URL}/api/job/{prompt_id}/status",
        headers={"X-API-Key": API_KEY}
    ).json()["status"]
    if status in ("completed", "failed", "cancelled"):
        break
    time.sleep(2)
```

WebSocket-based monitoring is also available for real-time updates, which is better for production pipelines that need low-latency notifications.

### Parallel Execution

The API supports concurrent job submission. You can fire off multiple workflows without waiting for prior ones to finish. Concurrency limits vary by tier:

| Tier | Concurrent Jobs |
| --- | --- |
| Free | 1 |
| Standard | 1 |
| Creator | 3 |
| Pro | 5 |

Jobs beyond the concurrency limit queue automatically and execute as slots free up.

### Retrieving Outputs

Generated files (images, videos, 3D assets) are stored in cloud storage. The `/api/view` endpoint returns a 302 redirect to a temporary signed URL for download.

### File Management

The API includes endpoints for uploading and managing input files (images for img2vid workflows, reference images, etc.) via `/api/upload/image`. This keeps everything in a single API surface rather than requiring a separate file hosting solution.

---

## Pricing

Comfy Cloud uses a credit-based model tied to GPU compute time. You are only charged while a workflow is actively using the GPU — idle time (building workflows, reviewing outputs) costs nothing.

| Plan | Monthly Price | Credits | Max Runtime | Concurrency |
| --- | --- | --- | --- | --- |
| Free | $0 | 400 | 10 min | 1 |
| Standard | $20 | 4,200 | 30 min | 1 |
| Creator | $35 | 7,400 | 30 min | 3 |
| Pro | $100 | 21,100 | 1 hour | 5 |

The free tier translates to roughly 35 five-second Wan 2.2 videos or hundreds of still images, depending on resolution and model. Unused top-up credits roll over for up to one year. Enterprise plans with dedicated GPUs, SSO, and priority support are available on annual contracts.

For context: 7,400 credits on the Creator plan yields approximately 670 five-second Wan 2.2 videos at 640x640 resolution. That is a meaningful volume for a production pipeline at $35/month.

### What Credits Cover

Credits are spent on active GPU runtime across both Comfy Cloud and Partner Nodes. Partner Nodes provide access to proprietary models (like Google's Nano Banana Pro) that run outside the standard open-source stack. The same credit pool works across Cloud and local ComfyUI — if you are running locally and use a Partner Node, credits are deducted from the same balance.

---

## Local vs. Cloud

ComfyUI's local version remains free and open source. The Cloud API is designed as a complement, not a replacement. Here is the practical difference:

**Local ComfyUI:**
- Free (but requires your own GPU hardware)
- Infinitely customizable with any custom nodes
- Works offline
- You manage model downloads, updates, and compatibility yourself

**Comfy Cloud:**
- Subscription-based, no hardware required
- 900+ pre-installed models, always up to date
- Limited to officially supported custom nodes
- Enterprise-grade GPUs (Blackwell RTX 6000 Pro, 96GB VRAM)
- API-compatible with the local server, making migration straightforward

The API compatibility is the key detail. If you have an existing integration that talks to a local ComfyUI server, switching to Comfy Cloud means changing the base URL and adding an API key. The endpoints, request formats, and response structures are the same.

---

## Developer Experience

### Workflow Builder

The visual workflow builder is where ComfyUI differentiates itself from single-model APIs. You are not writing code to compose model chains — you are graphing them. Connect a text encoder to a sampler to a VAE decoder to save an image. Branch the graph to run multiple variations in parallel. Insert a ControlNet node to guide generation with a reference image.

Once a workflow is dialed in, export it as JSON. The JSON becomes your API payload. This two-step process (design visually, deploy as JSON) is more intuitive than debugging raw model chain code.

### Comfy Hub

Comfy Hub is a marketplace of community-built workflows. If you need a specific pipeline (product photography, character animation, style transfer), there is likely a pre-built workflow for it. Import the workflow JSON into your project and parameterize it for your use case.

### Custom Nodes and Extensions

ComfyUI's architecture is extensible through custom nodes. The Cloud API supports a curated set of the most-used community nodes, with more added regularly. This gives you access to specialized functionality (upscalers, face restoration, style transfer) without building those pipelines from scratch.

---

## Who This Is For

**Creative agencies** that need to batch-produce visual assets across modalities without managing GPU infrastructure. A product photography pipeline (text prompt to styled image to video showcase) is a single workflow JSON.

**Application developers** building AI-powered products who need multi-modal generation behind a single API surface. Instead of integrating five different vendor SDKs, you build one ComfyUI workflow and submit it.

**AI researchers** who want to chain experimental models together without writing integration glue. The node graph lets you prototype model combinations visually before committing to code.

**Enterprises** that need to standardize on a single generative AI platform with predictable pricing, SSO, audit logs, and dedicated support. Comfy Cloud's enterprise tier addresses this.

---

## Limitations Worth Knowing

The API is labeled experimental. Endpoint formats and behavior may change without notice. This is not a stability guarantee — it is a heads-up that you should version-pin your integration and expect occasional breaking changes.

Custom node support on Cloud is limited to officially vetted nodes. If your workflow depends on an obscure community node that is not yet supported, you may need to find an alternative or wait for support.

The free tier's 10-minute runtime cap per workflow means complex multi-stage pipelines (e.g., image generation followed by video generation followed by audio) may hit the limit at higher resolutions. Plan your workflow complexity accordingly.

---

## Getting Started

1. Sign up at cloud.comfy.org
2. Grab your API key from platform.comfy.org
3. Build a test workflow in the visual editor
4. Export it as API-format JSON
5. Submit it via `POST /api/prompt`

The documentation is at docs.comfy.org, with specific Cloud API guides at `docs.comfy.org/development/cloud/overview`. The GitHub repository (github.com/Comfy-Org/ComfyUI) is the canonical reference for the local engine and API surface.

For a free account with 400 monthly credits, the barrier to trying this is effectively zero. If you are already running ComfyUI locally, the migration to Cloud API is a base URL change.

---

## Sources

- Comfy Cloud official site: https://comfy.org/cloud
- Cloud API documentation: https://docs.comfy.org/development/cloud/overview
- Comfy Cloud pricing: https://comfy.org/cloud/pricing
- ComfyUI GitHub repository: https://github.com/Comfy-Org/ComfyUI
- ComfyUI documentation: https://docs.comfy.org
- Comfy Hub workflows: https://comfy.org/workflows
