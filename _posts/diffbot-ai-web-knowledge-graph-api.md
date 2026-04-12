---
title: "Diffbot: The AI-Powered Knowledge Graph That Reads the Entire Web"
excerpt: "Diffbot uses computer vision and machine learning to crawl and structure data from billions of web pages, building the world's largest automated Knowledge Graph for developers and enterprises."
coverImage: "/assets/blog/diffbot-cover.jpg"
date: 2026-03-22T02:30:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: "/assets/blog/diffbot-cover.jpg"
---

## TL;DR

Diffbot is a Menlo Park-based AI company that operates what it claims is the world's largest automated Knowledge Graph. Unlike traditional web scraping tools that rely on hand-written rules, Diffbot uses computer vision and machine learning to automatically classify and extract structured data from any web page. Its suite of APIs includes Extract (turn any URL into clean JSON), Crawl (spider entire websites at scale), Natural Language (parse unstructured text into entities and relationships), and Knowledge Graph Search (query 10+ billion interconnected entities). The platform processes millions of pages daily on its own custom hardware and datacenter, independent of Google or Bing's crawl infrastructure.

## The Problem

The web is a chaotic mess of unstructured HTML. If you want to build anything intelligent with web data, from market intelligence dashboards to AI training pipelines, you face a brutal choice: write thousands of brittle scraping rules that break whenever a site redesigns, or use a search API that returns links but not structured facts. Traditional web scraping requires per-site configuration. Search engines return websites, not entities. And when you do manage to extract data, it is usually trapped in site-specific formats with no cross-referencing or relationship mapping between entities.

---

## What Diffbot Actually Does

Diffbot's core thesis is that a machine, given enough training data and the right computer vision models, can look at any web page and figure out what it contains the same way a human does. You know a product page when you see one, because you recognize the pattern: image, price, description, reviews. Diffbot trains its models to do the same thing at scale, across every page type and every language.

### Extract API

The Extract API is the foundation. Point it at any URL and it returns structured JSON with the page's primary content, automatically categorized into one of 20 page types (article, product, discussion, etc.). No selectors, no rules, no per-site configuration. A single GET request:

```python
import requests
url = 'https://api.diffbot.com/v3/analyze?token=TOKEN&url=URL'
response = requests.request('GET', url)
print(response.text)
```

That is genuinely the entire integration. The API uses computer vision first, not DOM parsing, which means it works across different HTML structures and even adapts when sites change their layouts. It also handles any human language thanks to its vision-based approach.

Extracting a single page costs 1 credit. Using a datacenter proxy doubles that to 2 credits per page.

### Crawlbot

Crawlbot pairs with Extract to turn entire websites into structured databases. Point it at a starting URL and it spiders through every link, applying the Extract API to each page it finds. Crawlbot itself costs 0 credits (you only pay for the extraction), and it processes millions of pages daily on Diffbot's distributed infrastructure.

The Crawl API lets you start crawls, check statuses, and retrieve output programmatically. Advanced features include crawling behind login walls and filtering by URL patterns.

### Natural Language API

This goes beyond simple keyword extraction. Given a block of text, the Natural Language API identifies entities (people, organizations, products, locations), links them to existing records, extracts relationships between entities, and determines sentiment. Diffbot claims 92.38% entity recognition accuracy, 91.21% entity linking accuracy, 83% relation extraction, and 71% entity sentiment accuracy, competing directly with Google Cloud Natural Language and Microsoft's offerings.

The API is trainable for custom domains of interest. Enterprise customers can add specialized entities and relationships to improve coverage for their specific use cases. Processing a document up to 10,000 characters costs 1 credit.

### Knowledge Graph

The crown jewel. Diffbot crawls the entire public web independently from Google and Bing, building interconnected records for over 10 billion entities including people, organizations, products, articles, news, events, and discussions. Each record contains 50+ fields and properties with full data provenance.

The Knowledge Graph is searchable via Diffbot Query Language (DQL), a purpose-built query language for finding, filtering, sorting, and faceting across billions of interlinked entities. Exporting a single entity record costs 25 credits; a facet query (summarized result) costs 100 credits.

The Enhance feature lets you enrich existing data. Feed it a list of person or organization names and get back 50+ fields sourced from across the web, including company revenue, employee counts, locations, and investments.

## Pricing

Diffbot uses a credit-based system. Every API call consumes credits based on the operation:

- **Extract 1 page:** 1 credit
- **Extract with datacenter proxy:** 2 credits
- **Crawl spider (discovery only):** 0 credits
- **Natural Language processing (up to 10K chars):** 1 credit
- **Knowledge Graph entity export:** 25 credits
- **Knowledge Graph facet query:** 100 credits
- **Knowledge Graph enhance (entity):** 25 credits
- **Knowledge Graph enhance with re-crawl:** 100 credits

Plans range from free (limited credits for evaluation) through Startup, Growth, and Enterprise tiers, with higher tiers offering discounted credit rates and access to advanced features like Crawlbot. The free tier is sufficient for prototyping and small-scale use cases.

## Who Uses Diffbot

Diffbot's customer logos span finance, media, and enterprise technology, including A16Z, Sequoia Capital, Dow Jones, Factset, FINRA, Bloomberg, Meltwater, Notion, Klarna, Snapchat, and AstraZeneca. The platform serves use cases across market intelligence, news monitoring, machine learning training data, and ecommerce data collection.

The company runs its own custom-assembled hardware in a California datacenter, maintaining an independent crawl of the public web. This independence from Google and Bing's indexes means Diffbot often captures data and relationships that traditional search engines miss or deprioritize.

## Honest Assessment

**Strengths:**
- The no-rules approach to extraction genuinely solves a real problem. Maintaining scraping rules across hundreds of sites is an engineering nightmare, and Diffbot's computer vision approach eliminates most of it.
- The Knowledge Graph's scale is impressive. 10+ billion interconnected entities with 50+ fields each is a differentiated asset that would take years to replicate.
- The REST API is simple. Getting started requires one GET request with a URL and token.
- Works across all human languages due to its vision-based classification.

**Weaknesses:**
- Credit pricing can become expensive at scale. Knowledge Graph exports at 25 credits per entity add up fast for large datasets.
- The DQL learning curve is real. While powerful, it is another query language to learn, and documentation could be more accessible.
- Not a general-purpose LLM or generation API. If your use case is "generate text," this is the wrong tool entirely. Diffbot is about structured data extraction and knowledge, not content creation.
- The free tier is limited. Serious evaluation requires a paid plan.

**Bottom Line:** If your AI application needs structured, factual data from the web, companies, entities, or relationships between them, Diffbot is one of the most comprehensive solutions available. It is not trying to compete with OpenAI or Anthropic on language generation. It is solving a different, equally important problem: turning the chaos of the public web into queryable, structured knowledge. For developers building market intelligence tools, knowledge management systems, or AI training pipelines that require verified web data, Diffbot deserves a serious look.

## Quick Start

```bash
# Extract a single page
curl "https://api.diffbot.com/v3/article?token=YOUR_TOKEN&url=https://example.com/article"

# Search the Knowledge Graph
curl "https://api.diffbot.com/kg/search?token=YOUR_TOKEN&q=Software+companies+in+Iceland"

# Enrich an organization record
curl "https://api.diffbot.com/v3/article?token=YOUR_TOKEN&url=https://example.com"
```

Get started free at [diffbot.com](https://www.diffbot.com).
