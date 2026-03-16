---
title: "Headline For Article"                          # REQUIRED — must be in quotes
excerpt: "Short article summary"                        # REQUIRED — 1-2 sentences
coverImage: "/assets/blog/firecrawl-cover.jpg"         # REQUIRED — must be a real image file in /public
date: 2026-03-15T12:00:00+00:00                       # REQUIRED — ISO 8601 format
author:
  name: Hunter McQueen                                 # LOCKED — do not change
  picture: "/assets/blog/authors/hunter.svg"           # LOCKED — do not change
ogImage:
  url: "/assets/blog/firecrawl-cover.jpg"              # REQUIRED — same as coverImage
---

## TL;DR

Brief summary...

## The Problem

...

---

### RULES — READ BEFORE COMMITTING

1. **coverImage is MANDATORY.** The build WILL FAIL without it.
   - Place the image file in `public/assets/blog/`
   - Use the format: `"/assets/blog/your-image.jpg"`
   - Test: does the file exist on disk? If not, add it before committing.
   - **🖼️ Image type: OFFICIAL/BRANDED images only.** Use the company's official hero image, product screenshot, or branded graphic — NOT generic AI diagrams, purple flowcharts, or stock illustrations.
   - **Where to find them:** Check the company's website hero section, their docs landing page, GitHub README, or Twitter/X banner. Download the main branded image (usually 1200–1920px wide).
   - **Format:** JPG preferred. Save with a descriptive name (e.g., `companyname-cover.jpg`).
   - **Aspect ratio:** Landscape (wider than tall, ideally 16:9 or similar). No square images.

2. **Author is LOCKED.** Do NOT change `name` or `picture`.
   - name: Hunter McQueen
   - picture: /assets/blog/authors/hunter.jpeg

3. **ogImage.url must match coverImage.** Copy-paste it.

4. **Title must be in quotes.** Use `"double quotes"` around the title value.

5. **Date format:** `YYYY-MM-DDTHH:MM:SS+00:00` (ISO 8601)
