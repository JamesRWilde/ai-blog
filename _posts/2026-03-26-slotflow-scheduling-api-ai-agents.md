---
title: "Slotflow: The Scheduling API Built Exclusively for AI Agents"
excerpt: "Slotflow gives AI agents a native scheduling layer to check availability, book real humans, and manage the full booking lifecycle via a clean REST API with no human-in-the-loop required."
coverImage: "/assets/blog/slotflow-api-cover.jpg"
date: 2026-03-26T15:24:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/slotflow-api-cover.jpg"
---

## TL;DR

Slotflow is a new REST API (launched March 24, 2026) that lets AI agents autonomously schedule meetings with real humans. Unlike Calendly or Google Calendar, it requires zero human interaction to complete a booking. Three API calls, clean JSON, race-condition protection, and webhook notifications. Free tier available.

## The Problem

Existing scheduling tools were built for humans clicking links and filling out forms. Calendly requires a person to confirm. Google Calendar returns busy blocks, not available slots. Neither was designed for the programmatic, autonomous workflows that AI agents run. The moment an AI agent needs to put a real human in a real time slot, the workflow breaks.

## The Product

Slotflow, founded by Nestor Koylyak and based in London, provides scheduling infrastructure purpose-built for AI agents. Developers register "humans" (real people whose time can be booked), set their availability rules once, and then the API handles everything else.

The API is remarkably simple:

1. **POST /v1/humans** — Register a person with timezone and working hours
2. **GET /v1/humans/{id}/slots** — Query available time slots for a date range
3. **POST /v1/bookings** — Book a confirmed slot

That is the entire core workflow. No UI widgets, no iframes, no redirects. Just JSON in and JSON out.

### Key Features

- **Pre-computed slots**: One GET returns available time slots. No calendar math, no timezone bugs. ISO 8601 timestamps throughout.
- **Atomic booking with conflict protection**: Race condition protection is built in. If two agents grab the same slot simultaneously, one gets a clean 409 conflict error.
- **Webhook notifications**: Get notified when bookings are created or cancelled, with automatic retries. No polling required.
- **Metadata passthrough**: Attach arbitrary JSON to any booking (lead IDs, conversation IDs, agent context) and get it back in webhooks.
- **Schedule overrides**: Block vacation time, open overtime slots, or set recurring blocks for team standups via a single API call.
- **SDKs**: First-class Node.js/TypeScript and Python SDKs are available.

### Use Cases

Slotflow targets four main agent scenarios:

- **AI sales agents**: A lead comes in at 2am. The agent qualifies them, checks rep availability, and books a demo. Nobody wakes up.
- **AI recruiting tools**: Candidate confirms interview availability. The agent finds a slot that works around the hiring manager's standups and books it instantly.
- **Customer support escalation**: AI handles easy tickets, then checks which engineer is available and books a callback when it cannot resolve the issue.
- **AI assistants**: Your assistant knows team availability including time-off and overtime, booking meetings without calendar conflicts.

## Pricing

Slotflow offers a free tier with no credit card required:

| Plan | Price | Bookings/mo | Humans | Webhooks |
|------|-------|-------------|--------|----------|
| Free | $0 | 100 | 1 | 2 |
| Starter | $79/mo | 1,000 | 5 | 10 |
| Growth | $299/mo | 10,000 | 25 | Unlimited |

Enterprise pricing is available on request. Overage packs run $19 per 500 additional bookings.

## Competition

Slotflow is not competing directly with Calendly or Google Calendar in the traditional sense. It is building a new category: **agent-native scheduling infrastructure**. Where those tools bolt on API access to a product designed for human click-through, Slotflow starts with the API and adds nothing else. There is no user-facing interface by design.

The closest alternatives are building scheduling logic from scratch (which takes months) or hacking Calendly's API to bypass the human-confirmation step. Slotflow sidesteps both problems.

## Early Verdict

The API design is clean and minimal, which is exactly what agent developers want. Three endpoints covering the full lifecycle, race-condition protection out of the box, and webhook delivery with retries. The free tier lowers the experimentation barrier significantly.

The open question is reliability at scale. The product is two days old. The underlying slot computation engine needs to hold up against complex recurring availability patterns, multi-timezone teams, and edge cases that scheduling software is notorious for. The documentation covers slot computation, error handling, and webhook concepts in reasonable depth, which suggests the team has thought about these problems.

For developers building AI agents that need to book meetings, demos, interviews, or callbacks, Slotflow is worth evaluating. It solves a real gap in the current AI agent infrastructure stack.

---

**Links**

- Website: [slotflow.dev](https://slotflow.dev)
- API Documentation: [docs.slotflow.dev](https://docs.slotflow.dev)
- Sign up: [app.slotflow.dev](https://app.slotflow.dev)
