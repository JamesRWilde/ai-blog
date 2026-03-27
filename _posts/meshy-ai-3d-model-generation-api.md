---
title: "Meshy AI: The 3D Model Generation API Changing Game Dev and Creative Workflows"
excerpt: "Meshy's REST API turns text prompts and images into textured 3D models in minutes. We break down the endpoints, pricing, and real-world use cases."
coverImage: "/assets/blog/meshy-ai-cover.jpg"
date: 2026-03-27T00:00:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/meshy-ai-cover.jpg"
---

The 3D modeling industry has a bottleneck problem. Creating production-quality 3D assets traditionally requires specialized skills, expensive software, and days of manual labor. Meshy, an AI-powered 3D generation platform, is trying to collapse that pipeline into an API call.

Their REST API lets developers generate textured 3D models from text prompts or images, with output in standard formats like GLB, FBX, OBJ, STL, and USDZ. It is not just a toy demo. The API supports configurable topology, polygon counts up to 300,000, PBR material maps, and auto-rigging. For game studios, VR developers, and e-commerce teams building product configurators, this is a meaningful workflow shift.

## TL;DR

Meshy provides a RESTful API for AI-powered 3D model generation. You send a text prompt or image, and the API returns a downloadable, textured 3D model. Key capabilities include text-to-3D, image-to-3D, multi-image-to-3D, retexturing, remeshing, and auto-rigging. Pricing is credit-based with a free test mode. The current model version is Meshy-6, which represents a significant quality jump over earlier versions. Output formats include GLB, OBJ, FBX, STL, and USDZ.

## How the API Works

The Meshy API follows an asynchronous task-based pattern. You submit a generation task, receive a task ID, then poll for results or stream updates via Server-Sent Events. This design makes sense for AI generation workloads where tasks can take time to complete.

The two-stage text-to-3D workflow is worth noting. First, a preview stage generates a base mesh without texture. You evaluate the geometry, then submit a refine task to apply textures based on your prompt. This separation gives developers control over quality before spending credits on the texturing step.

Authentication is straightforward. Your API key goes in the `Authorization` header, with a format of `msy-<random-string>`. During development, Meshy offers a test mode key that returns sample results without consuming credits, which is a nice touch for integration testing.

### Text to 3D

The core endpoint is `POST /openapi/v2/text-to-3d`. Preview tasks cost 5 credits on standard models or 20 credits on Meshy-6. Refine tasks cost an additional 10 credits for texture generation.

Key parameters include:

- `mode` — Either `"preview"` or `"refine"`
- `prompt` — Text description of the model (up to 600 characters)
- `ai_model` — `meshy-5`, `meshy-6`, or `latest` (defaults to Meshy 6)
- `topology` — `quad` or `triangle` output meshes
- `target_polycount` — 100 to 300,000 polygons (default: 30,000)
- `should_remesh` — Controls whether the remeshing phase runs
- `symmetry_mode` — `off`, `auto`, or `on`
- `pose_mode` — `a-pose`, `t-pose`, or empty string
- `target_formats` — Array of desired output formats: `glb`, `obj`, `fbx`, `stl`, `usdz`
- `auto_size` — AI-based automatic real-world scaling
- `moderation` — Optional content screening

The response object includes model download URLs for each requested format, progress percentage, timestamps, and status fields. Status values follow a standard pattern: `PENDING`, `IN_PROGRESS`, `SUCCEEDED`, `FAILED`, or `CANCELED`.

### Image to 3D

The `POST /openapi/v1/image-to-3d` endpoint generates 3D models from a 2D image. You can pass an image as a publicly accessible URL or as a base64 data URI. The same Meshy-6 model is available, with additional parameters for image enhancement and lighting removal.

Multi-image input is also supported via `POST /openapi/v1/multi-image-to-3d`. You provide 1 to 4 images of the same object from different angles, which generally produces more accurate geometry than single-image input.

### Beyond Generation: Retexture, Remesh, Rig

Meshy goes beyond basic model creation. Additional API capabilities include:

- **Retexture** — Apply new textures to an existing model (10 credits)
- **Remesh** — Change topology and polygon count (5 credits)
- **Auto-Rigging** — Add skeletal rigs for animation (5 credits)
- **Animation** — Apply pre-built animations to rigged models (3 credits)

These post-processing endpoints turn the API into a pipeline, not just a generator. A game developer can go from text prompt to rigged, textured model ready for a game engine in a single workflow.

## Pricing

Meshy uses a credit-based pay-as-you-go model. Here is the breakdown:

| Operation | Credits |
|---|---|
| Text to 3D Preview (Meshy-6) | 20 |
| Text to 3D Preview (other models) | 5 |
| Text to 3D Refine (texture) | 10 |
| Image to 3D (Meshy-6, with texture) | 30 |
| Image to 3D (other models, with texture) | 15 |
| Multi-Image to 3D (Meshy-6, with texture) | 30 |
| Retexture | 10 |
| Remesh | 5 |
| Auto-Rigging | 5 |
| Animation | 3 |
| Text/Image to Imagenano-banana | 3 |
| Text/Image to Imagenano-banana-pro | 9 |

Rate limits scale with your tier: Pro users get 20 requests per second with 10 queued tasks; Enterprise users get 100 RPS with customizable queue depth. Non-Enterprise users should note that API-generated models are deleted after 3 days. Enterprise accounts retain models indefinitely.

## Output Quality and Model Options

Meshy-6 is the flagship model and represents a significant step up from Meshy-5. It supports PBR map generation (metallic, roughness, normal maps), automatic lighting removal for cleaner textures, and image enhancement for better input interpretation. The `art_style` parameter is deprecated with Meshy-6, which previously allowed toggling between realistic and sculpture styles.

The API also supports a low-poly mode (`model_type: lowpoly`) that generates cleaner polygon meshes optimized for real-time rendering, which is particularly useful for mobile games and web-based 3D applications.

Blender and Unity plugins are available, providing direct integration without needing to handle the REST API manually.

## Getting Started

To try the API, create an account at [meshy.ai](https://www.meshy.ai), generate an API key from the settings page, and use the test mode key for free development testing. The [API documentation](https://docs.meshy.ai) includes a Python quickstart script that handles the full preview-to-refine workflow.

The basic Python workflow looks like this:

```python
import requests
import time

API_KEY = "msy-your-key-here"
BASE_URL = "https://api.meshy.ai/openapi/v2"

headers = {"Authorization": f"Bearer {API_KEY}"}

# Step 1: Create preview task
preview = requests.post(f"{BASE_URL}/text-to-3d", json={
    "mode": "preview",
    "prompt": "A low-poly medieval sword with a leather-wrapped handle",
    "ai_model": "meshy-6",
    "target_polycount": 15000,
}, headers=headers)

task_id = preview.json()["result"]

# Step 2: Poll for completion
while True:
    status = requests.get(f"{BASE_URL}/text-to-3d/{task_id}", headers=headers)
    data = status.json()
    if data["status"] == "SUCCEEDED":
        break
    time.sleep(5)

# Step 3: Refine with texture
refine = requests.post(f"{BASE_URL}/text-to-3d", json={
    "mode": "refine",
    "preview_task_id": task_id,
    "ai_model": "meshy-6",
    "enable_pbr": True,
}, headers=headers)
```

## The Bigger Picture

Meshy is operating in a space that is getting crowded fast. Tripo3D, Kaedim, CSM, and others are all competing for the AI-to-3D market. What sets Meshy apart is the breadth of the API pipeline: it is not just generation, but the full post-processing chain of retexturing, remeshing, rigging, and animation. For developers building 3D content at scale, that pipeline approach matters more than any single generation being slightly better than the competition.

The credit-based pricing is predictable, the test mode eliminates integration risk, and the output formats cover the standard game engine and rendering toolchains. If you are building anything that generates 3D assets programmatically, Meshy's API is worth evaluating.

## Sources

- [Meshy API Documentation](https://docs.meshy.ai)
- [Meshy API Platform](https://www.meshy.ai/api)
- [Meshy Pricing](https://docs.meshy.ai/en/api/pricing)
