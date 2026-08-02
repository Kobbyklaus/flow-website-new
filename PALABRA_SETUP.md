# FLOW — Live Multilingual Translation (Palabra AI) Setup

The `/watch` page lets viewers watch the live prayer meeting and pick their own
language. Real-time translation is provided by **Palabra AI**. This doc gets it
from "SOON" to actually live.

Everything you touch is in **one file**: `src/lib/broadcast.config.ts`.

---

## How it works (the architecture)

```
  Live service audio ──▶  Palabra "Broadcaster"  ──▶  restreams video + translated
  (from OBS / mixer)      (translates to N langs)      audio in every language
                                                              │
                                                              ▼
                                        Viewer on flow /watch picks a language
                                        → gets that language's stream (video
                                          + translated audio, IN SYNC)
```

**Why Broadcaster (not the raw API):** Palabra's *Broadcaster* product is built
for exactly this — one source in, many languages out, restreamed to an
**unlimited number of listeners**. Billing is by **minutes of audio, not by
viewer**, so 5 viewers or 5,000 viewers cost the same. The raw per-session API is
1-to-1 (a call), which would cost a fortune per viewer — do not use it for a
broadcast.

**Why sync is handled:** when a viewer picks a language, BOTH the video and the
translated audio come through Palabra, so the translation never runs ahead of the
speaker's lips. (If we layered Palabra's <1s audio over the YouTube stream, which
lags 15–30s, translation would arrive before the picture — that's why we don't.)

---

## One-time setup

### 1. Create a Palabra account + Broadcaster
- Sign up at <https://palabra.ai> (there's **$50 free API credit** and free trials
  on the Live Stream plans).
- In the dashboard, create a **Broadcaster** / live stream.
- Set the **source language** to English.
- Add the **target languages** you want. Match them to the `code` values in
  `broadcast.config.ts` (`es`, `fr`, `pt`, `ar`, `hi`, `zh`, `ru`, `de`, `ko`,
  `id`, `tl`, `tr`). Add or remove languages freely — the grid adapts.

### 2. Get your Broadcaster ID
Palabra's listener page lives at a URL like:

```
https://app.palabra.ai/broadcast/1ea600ec-6b82-4844-86d4-9926bfa78e20/view?fromLangs=en&toLanguages=fr,es-mx&isWebRTC=true
```

The **Broadcaster ID** is the UUID in the middle
(`1ea600ec-6b82-4844-86d4-9926bfa78e20`). That's all you need — the site already
knows the rest of the URL format and adds `iframe=true` automatically. The
viewer's language choice on the FLOW grid is passed in as `toLanguages`.

### 3. Fill in the config
Open `src/lib/broadcast.config.ts` and set just these:

```ts
translationEnabled: true,          // ← turns the languages on

palabra: {
  broadcastId: "1ea600ec-6b82-4844-86d4-9926bfa78e20", // ← your UUID
  sourceLang: "en",
  // embedUrl is already correct — leave it as-is.
},
```

**Match the language codes.** The `code` values in `LANGUAGES` (top of the file)
must be exactly the target-language codes you enabled on the Broadcaster (e.g.
Palabra uses `es-mx` for Mexican Spanish, `fr`, `bg`…). If a code doesn't match,
that card will open an empty stream. Confirm each code against your dashboard's
"Translate to" list.

Also set the YouTube fallback so the "Original" tab and the offline state work:

```ts
youtube: {
  channelHandle: "TheresPowerHere",
  channelId: "UCxxxxxxxxxxxxxxxxxxxxxx",  // FLOW channel ID (see note below)
  liveVideoId: "",                        // or pin a specific live video
},
```

**Finding the channel ID:** youtube.com/@TheresPowerHere → share channel → "Copy
channel ID" (starts with `UC`). Or set `liveVideoId` to the live video's ID each
service.

### 4. Deploy
```bash
npm run build      # static export → out/
```
Push to your repo; Vercel redeploys automatically. Done.

---

## Running a service (each time)

1. Start your Palabra Broadcaster (ingest the mixer/OBS audio) ~5 min before.
2. It restreams translated audio in all languages automatically.
3. Viewers go to `flow.../watch`, pick a language, and follow along.
4. Stop the Broadcaster when the meeting ends (billing is per minute of audio).

---

## ⚠️ Confirm with Palabra support BEFORE committing to a plan

Email **support@palabra.ai** and get these in writing — they swing cost and are
NOT clearly documented:

1. **The big one — per-language billing:** "For a 90-minute stream translated into
   10 languages, am I billed for 90 minutes or 900 minutes (per language)?" This
   is a ~10× cost difference.
2. **Listeners are free/unlimited?** Confirm hundreds of concurrent listeners add
   no cost and there's no cap.
3. **Listener player:** confirm the embeddable player / iFrame URL format and
   whether each language is a separate URL (`?lang=`) or one multi-language widget.
4. **Video passthrough:** confirm Broadcaster restreams the *video* too (not just
   audio), so picture + translated audio stay in sync.
5. **Latency at scale:** confirm the "<1s" figure holds with ~10 target languages.

### Rough cost picture (verify against #1)
- Raw API rate is **$0.04/min** of S2S audio; Live Stream plans start at
  **$300/mo for 5 hours** ($60/hr overage).
- FLOW runs ~2 services/week. If a 90-min service bills as 90 min → very cheap.
  If it bills per-language (900 min for 10 langs) → budget accordingly, and
  consider offering fewer languages to start (e.g. top 4–5) and growing.

---

## Reference
- Broadcaster docs: <https://docs.palabra.ai/docs/broadcaster>
- Streaming API: <https://docs.palabra.ai/docs/streaming_api>
- Pricing: <https://palabra.ai/pricing>
- JS SDK (if you ever need the raw path): `@palabra-ai/translator` —
  <https://github.com/PalabraAI/palabra-ai-javascript>
