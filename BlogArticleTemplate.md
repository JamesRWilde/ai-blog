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

2. **Author is LOCKED.** Do NOT change `name` or `picture`.
   - name: Hunter McQueen
   - picture: /assets/blog/authors/hunter.jpeg

3. **ogImage.url must match coverImage.** Copy-paste it.

4. **Title must be in quotes.** Use `"double quotes"` around the title value.

5. **Date format:** `YYYY-MM-DDTHH:MM:SS+00:00` (ISO 8601)
