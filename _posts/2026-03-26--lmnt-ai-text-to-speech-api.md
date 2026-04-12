---
title: "LMNT API: Fast, Lifelike AI Text-to-Speech With Instant Voice Cloning"
excerpt: "LMNT delivers studio-quality AI voice synthesis at 150ms latency, supports 24 languages, and clones any voice from just 5 seconds of audio. Here is what developers need to know."
coverImage: ""
date: 2026-03-26T22:54:00+00:00
author:
  name: Hunter McQueen
  picture: "/assets/blog/authors/hunter.svg"
ogImage:
  url: ""
---

The text-to-speech space is crowded. ElevenLabs dominates the conversation, PlayHT and WellSaid have their niches, and a dozen smaller players fill the gaps. So why write about another one? Because LMNT does a few things differently enough to matter, especially if you are building real-time conversational AI and latency is the thing that keeps you up at night.

## TL;DR

LMNT is an AI text-to-speech and voice cloning API built for developers who need fast, affordable, and natural-sounding speech synthesis. Its flagship model, Blizzard, delivers audio in 150 to 200 milliseconds of latency for streaming use cases. It supports 24 languages, instant voice cloning from 5 seconds of audio, and offers three distinct API endpoints optimized for different integration patterns. SDKs cover Python, Node.js, and Unity. Pricing starts free, with paid plans scaling from 200K to 5.7M included characters per month. They also actively court ElevenLabs and PlayHT refugees with migration credits.

## The Problem With Most TTS APIs

Most text-to-speech APIs were designed for batch processing. You send a block of text, wait for the full synthesis, get back an audio file. That works fine for narrating a blog post or generating a podcast voiceover. It falls apart when you are building a voice assistant that needs to respond in real time, a customer support bot that cannot have half-second delays between turns, or a game character that reacts to player input without sounding like a pre-recorded message.

The latency gap between "good enough for files" and "acceptable for conversation" is enormous. And the tools that claim low latency often sacrifice voice quality or lock you into a small set of premade voices with no option to use your own.

LMNT targets that gap directly.

## Three Endpoints, Three Use Cases

One of the more thoughtful design choices in LMNT's API is the way they split their speech synthesis into three separate endpoints, each optimized for a different scenario.

The first is `POST /v1/ai/speech/bytes`, the general-purpose endpoint. You send complete text (up to 5,000 characters), and the server streams back binary audio chunks as they are generated. You can either handle each chunk as it arrives for low latency or collect the full stream and treat it as a complete audio file. This is the one most developers will reach for first.

The second is `POST /v1/ai/speech`, the detailed endpoint. Same input, but the response is JSON with base64-encoded audio and optional word-level timing data. The tradeoff is higher latency because the server waits for the full synthesis before responding. The payoff is precise word-level durations, which you need for subtitle synchronization, karaoke-style applications, or any scenario where you need to know exactly when each word starts and ends.

The third is `WSS /v1/ai/speech/stream`, the WebSocket speech session. This is the real-time one. You open a persistent WebSocket connection and stream text to the server progressively, as it becomes available. The server synthesizes audio on the fly and streams it back with ultra-low latency. This is what you want for voice assistants, live chatbots, and any application where you are piping LLM output directly to speech without waiting for the full response.

Here is a decision tree in plain English: if you have all your text ready and just want audio, use the bytes endpoint. If you need word timestamps and do not care about latency, use the detailed endpoint. If you are streaming text from an LLM or chatbot in real time, use the WebSocket session.

## Voice Cloning From 5 Seconds

LMNT's voice cloning is instant. No training pipeline, no hours of recorded audio, no waiting for a model to converge. You provide 5 seconds of clean source audio, and the system produces a voice clone in seconds.

The company recently retired its professional voice cloning tier, stating that instant clones now deliver better speaker similarity while requiring far less source audio. The model emulates tone, speed, inflections, accent, breathing patterns, and even mouth clicks from the source recording.

The quality of the clone depends heavily on the quality of the input. LMNT's documentation is specific about this: use clear audio with minimal background noise, record in an acoustically treated room if possible, position yourself 6 to 12 inches from the microphone, and avoid source audio that contains music, other people talking, or prolonged silence. A laptop microphone will work, but a dedicated XLR setup will give you noticeably better results.

One practical note for developers building products with this feature: the clone will pick up the emotional range and speaking style of your source recording. If the clone sounds too high-pitched or too flat, re-record the source with the intonation and energy you want the clone to reproduce. This is a feature, not a bug, but it means the initial 5-second clip matters more than most people expect.

## Multilingual Support

LMNT supports 24 languages out of the box: Arabic, Chinese, Dutch, English, French, German, Hindi, Indonesian, Italian, Japanese, Korean, Polish, Portuguese, Russian, Spanish, Swedish, Thai, Turkish, Ukrainian, Urdu, Vietnamese, Czech, Finnish, and Slovak. Both system voices and instant clones can synthesize in any supported language.

The API accepts a two-letter language code parameter. If you know the language of your input text, specifying it skips the language detection step and synthesizes the speech faster. Small optimization, but it adds up in high-throughput applications.

An interesting detail: LMNT supports mid-sentence language switching. A single voice can transition from English to Japanese within the same utterance, mirroring how multilingual speakers naturally code-switch. This is relevant for applications serving global audiences or bilingual users.

## Code Examples

Setting up LMNT in Python takes a few lines:

```python
import asyncio
from lmnt import AsyncLmnt

text = 'Hello world!'
voice_id = 'leah'
language = 'en'

async def main():
  client = AsyncLmnt()
  response = await client.speech.generate(
    text=text,
    voice=voice_id,
    language=language,
  )
  with open('audio.mp3', 'wb') as f:
    f.write(await response.read())

asyncio.run(main())
```

The Node.js SDK follows the same pattern:

```javascript
const Lmnt = require('lmnt-node');

const main = async () => {
  const lmnt = new Lmnt({ apiKey: process.env['LMNT_API_KEY'] });
  const response = await lmnt.speech.generate({
    text: 'Hello world!',
    voice: 'leah',
    language: 'en',
  });
  const buffer = await response.arrayBuffer();
  require('fs').writeFileSync('audio.mp3', Buffer.from(buffer));
};

main();
```

For real-time streaming with an LLM, the WebSocket session API is where LMNT shines. You pipe LLM tokens into the speech session as they arrive and get audio chunks back concurrently:

```python
import asyncio
from lmnt import AsyncLmnt
from openai import AsyncOpenAI

async def main():
  client = AsyncLmnt()
  connection = await client.speech.sessions.create(voice='elowen')
  t1 = asyncio.create_task(reader_task(connection))
  t2 = asyncio.create_task(writer_task(connection))
  await asyncio.gather(t1, t2)

async def reader_task(connection):
  with open('output.mp3', 'wb') as f:
    async for message in connection:
      f.write(message.audio)

async def writer_task(connection):
  openai = AsyncOpenAI()
  response = await openai.chat.completions.create(
    model='gpt-4o-mini',
    messages=[{'role': 'user', 'content': 'Tell me a story'}],
    stream=True)
  async for chunk in response:
    if chunk.choices[0].delta.content:
      await connection.append_text(chunk.choices[0].delta.content)
  await connection.finish()

asyncio.run(main())
```

The WebSocket API also exposes `flush` and `finish` controls. `flush` tells the server to synthesize everything it has buffered so far without closing the connection. `finish` does the same but also closes the connection after synthesis completes. This matters for chatbot-style applications where you want to keep a single connection open across multiple turns rather than paying the connection setup latency on every response.

## Latency Optimization

LMNT documents seven specific practices for minimizing latency:

1. Handle audio chunks as they arrive rather than waiting for the full stream
2. Use the WebSocket session API for real-time applications
3. Use the official SDKs, which are optimized for low latency
4. Use `pcm_s16le` or `pcm_f32le` audio formats, the fastest available
5. Use async tasks for concurrent streaming
6. Deploy servers in the U.S., since LMNT's GPU infrastructure is U.S.-based
7. Specify the language parameter to skip language detection

That last one is easy to overlook. If you are synthesizing English text but leaving the language parameter blank, the system runs language detection first. Specifying `language: 'en'` eliminates that step entirely.

## Integrations

LMNT integrates with several popular voice AI frameworks: LiveKit for real-time multimodal agents, Pipecat for end-to-end conversational voice applications, and Vapi for building and serving voice AI assistants. There is also a Vercel deployment guide for serverless setups.

These integrations matter because they mean LMNT is not a standalone API that you have to wire up yourself. It plugs directly into the frameworks that developers are already using to build voice agents.

## Pricing

LMNT's pricing is straightforward:

- **Free tier**: 15K characters included, unlimited voice clones, playground access
- **Starter**: 200K characters included, $0.05 per 1K characters after, no concurrency or rate limits, unlimited voice clones, commercial license
- **Pro**: 1.25M characters included, $0.045 per 1K characters after, same features as Starter
- **Enterprise**: 5.7M characters included, $0.035 per 1K characters after, same features

For migration from ElevenLabs or PlayHT, LMNT offers 500,000 free credits if you email their support team with proof of your last billing statement from the competing service. That is a meaningful incentive to test whether the switch is worth it.

SOC-2 Type II compliance is a checkbox worth noting. If you are building for enterprise customers or regulated industries, that certification removes a common procurement hurdle.

## Should You Use It

LMNT is not trying to be a general-purpose AI platform. It does one thing: text-to-speech with voice cloning. If you need image generation, video synthesis, or LLM hosting alongside your TTS, you will want a platform like ElevenLabs or AssemblyAI that bundles multiple capabilities.

Where LMNT earns its place is in real-time conversational AI. The 150 to 200 millisecond streaming latency, the WebSocket session API with flush control, and the concurrent streaming architecture are specifically designed for voice assistants, chatbots, and live interaction scenarios where every millisecond of delay degrades the user experience.

The pricing is competitive. The API design is clean. The SDKs are well-documented. And if you are currently locked into ElevenLabs or PlayHT and feeling the cost or latency pinch, the migration credits make switching low-risk.

It is not the flashiest TTS API on the market. But for developers building production voice applications where latency and cost matter more than marketing hype, it is worth serious consideration.

## Key Links

- Website: [lmnt.com](https://www.lmnt.com)
- Documentation: [docs.lmnt.com](https://docs.lmnt.com)
- Python SDK: [github.com/lmnt-com/lmnt-python](https://github.com/lmnt-com/lmnt-python)
- Node.js SDK: [github.com/lmnt-com/lmnt-node](https://github.com/lmnt-com/lmnt-node)
- Unity SDK: [docs.lmnt.com/sdk/unity](https://docs.lmnt.com/sdk/unity/introduction)
- REST API Reference: [docs.lmnt.com/api-reference](https://docs.lmnt.com/api-reference)
- Discord: [discord.gg/8ZE5ka4nHg](https://discord.gg/8ZE5ka4nHg)
- Playground: [app.lmnt.com](https://app.lmnt.com)
