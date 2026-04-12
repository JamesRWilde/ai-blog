---
title: "AWS Launches AI Product Discovery & Semantic Search API for B2B Commerce"
excerpt: "Amazon Web Services introduces a new API that uses Amazon Bedrock to enable natural-language product discovery, automated SKU attribute extraction, and business-logic re-ranking for B2B manufacturers and distributors."
coverImage: "/assets/blog/aws-ai-product-discovery-cover.jpg"
date: 2026-03-21T08:51:00+00:00
author:
  name: Jay Wilde
  picture: "/assets/blog/authors/jay-wilde.jpg"
ogImage:
  url: "/assets/blog/aws-ai-product-discovery-cover.jpg"
---

## TL;DR

AWS has released the AI Product Discovery & Semantic Search API, a new tool that leverages Amazon Bedrock foundation models to transform how B2B manufacturers and distributors handle product search. The API enables natural-language queries, automated SKU attribute extraction, and customizable re-ranking based on real-time business rules, integrating seamlessly with platforms like Adobe Commerce and Shopify Plus.

## The Problem

B2B buyers often struggle with traditional keyword-based search when looking for specific parts or products, especially when they don't know exact part numbers or use industry jargon. This leads to high search abandonment rates, lost sales, and a frustrating user experience for professionals managing large catalogs.

## The Solution

The AI Product Discovery & Semantic Search API moves beyond rigid keyword matching by using Amazon Bedrock's text embeddings and foundation models to understand the intent behind natural language queries. For example, a query like "heavy-duty waterproof fasteners for marine environments" returns highly relevant SKUs even if the product description doesn't contain those exact words.

Key capabilities include:

- **Semantic Search**: Interprets complex, technical B2B vocabulary to deliver precise results.
- **Automated SKU Attribute Extraction**: Parses dimensions, compatibility, and material specs from unstructured data, enabling dynamic filtering that traditional engines miss.
- **Business-Logic Re-ranking**: Allows businesses to prioritize results based on real-time availability, profit margins, or strategic promotions, aligning search outcomes with commercial goals.

## How It Works

The API is an API-first service designed for easy integration. It works by:

1. Receiving a natural language query from a B2B commerce platform (such as Adobe Commerce, Shopify Plus, or a custom portal).
2. Using Amazon Bedrock to convert the query into vector embeddings and detect user intent.
3. Leveraging Amazon OpenSearch Service (or Amazon Kendra) for high-performance indexing and similarity search.
4. Applying custom re-ranking logic based on business rules defined by the seller.
5. Returning relevant SKUs with enriched attributes, ready for display in the storefront.

Orchestration is handled via AWS Lambda, providing a serverless, scalable backend.

## Why It Matters

For B2B sellers, improving product discoverability directly impacts conversion rates and revenue. By reducing search abandonment and guiding customers to the right products faster, the API enhances the digital experience for professional buyers. Its integration with AWS services also means sellers can scale alongside their catalog growth without managing complex infrastructure.

The solution is particularly valuable for catalogs exceeding 1 million items, where manual keyword mapping becomes impractical.

## Availability

The AI Product Discovery & Semantic Search API is available now on AWS Marketplace, sold by BitStone. Interested parties can request a private offer through the AWS Marketplace listing to discuss pricing tailored to their specific requirements.

---