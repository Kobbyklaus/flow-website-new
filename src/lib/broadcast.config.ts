/**
 * FLOW live-broadcast + multilingual translation config.
 * ------------------------------------------------------------------
 * This is the ONLY file you edit to take the /watch page live with
 * Palabra AI real-time translation. Nothing else needs to change.
 *
 * HOW IT WORKS (see PALABRA_SETUP.md for the full walkthrough):
 *   1. You run a Palabra "Broadcaster" that ingests the live service
 *      audio and restreams video + translated audio in every language.
 *   2. Palabra gives you an embed/player URL. Paste it below.
 *   3. A viewer picks a language on /watch; we load that language's
 *      stream. Video + translated audio stay in sync (both come
 *      through Palabra), so there is no "translation ahead of lips".
 *
 * Until Palabra is connected, the page gracefully falls back to the
 * FLOW YouTube live stream (original language only) so /watch is
 * always useful.
 */

export type Language = {
  /** Palabra target-language code, e.g. "es", "fr", "pt", "ar". */
  code: string;
  /** Name in the language itself, shown big on the card. */
  native: string;
  /** English name, shown small. */
  english: string;
  /** Flag emoji for quick visual scanning. */
  flag: string;
};

/** The original service language (no translation). Always shown first. */
export const ORIGINAL_LANGUAGE: Language = {
  code: "original",
  native: "English",
  english: "Original",
  flag: "🎙️",
};

/**
 * Languages offered to viewers. Codes must be ones your Palabra
 * Broadcaster is configured to output. Add/remove freely — the grid
 * lays out automatically. All of these are Palabra-supported.
 */
export const LANGUAGES: Language[] = [
  { code: "fr", native: "Français",  english: "French",     flag: "🇫🇷" },
  { code: "pt", native: "Português", english: "Portuguese", flag: "🇵🇹" },
  { code: "es", native: "Español",   english: "Spanish",    flag: "🇪🇸" },
];

export type BroadcastConfig = {
  /**
   * Master switch for translation. Leave false to run the page as a
   * plain YouTube live embed. Flip to true once `palabra.embedUrl`
   * below is filled in from your Broadcaster dashboard.
   */
  translationEnabled: boolean;

  /** YouTube fallback / original-language source. */
  youtube: {
    /** Channel handle (without @). Used for the "watch on YouTube" link. */
    channelHandle: string;
    /**
     * Channel ID (starts with "UC..."). Lets us embed the channel's
     * current live broadcast automatically without knowing the video
     * ID. Find it at youtube.com/@TheresPowerHere → ...more → share
     * channel → copy channel ID.
     */
    channelId: string;
    /**
     * Optional: a specific live video ID. If set, we embed this exact
     * video (takes priority over channelId).
     */
    liveVideoId: string;
  };

  palabra: {
    /**
     * Your Broadcaster ID (a UUID). Find it in the Broadcaster's
     * listener-page URL in the Palabra dashboard:
     *   app.palabra.ai/broadcast/<THIS-PART>/view?...
     */
    broadcastId: string;
    /**
     * Source / speaking language code (what's spoken in the meeting).
     * Must match the "Speaking" language set on the Broadcaster.
     */
    sourceLang: string;
    /**
     * Palabra listener-page URL template. This is the REAL format
     * Palabra uses; you normally don't need to change it — just set
     * broadcastId above. Placeholders {broadcastId} / {source} /
     * {lang} are filled in per viewer selection.
     *
     * Palabra's widget has its own language switcher, but we pass a
     * single {lang} so it opens straight into the language the viewer
     * tapped on the FLOW grid. `iframe=true` gives the responsive
     * embedded UI.
     */
    embedUrl: string;
    /** Rendered as an <iframe> (Palabra hosted player: video + audio). */
    embedType: "iframe";
  };
};

export const broadcastConfig: BroadcastConfig = {
  translationEnabled: true, // FLOW Broadcaster is live

  youtube: {
    channelHandle: "TheresPowerHere",
    channelId: "", // ← optional: add to embed the "Original" feed inline
    liveVideoId: "",
  },

  palabra: {
    broadcastId: "11616cf5-4b35-4baf-aa82-60a0b31b98ad",
    sourceLang: "en",
    // Matches the real listener URL Palabra generated (toLanguages + isAuto).
    // We pass a single {lang} so a viewer opens straight into their choice;
    // iframe=true gives the responsive embedded player.
    embedUrl:
      "https://app.palabra.ai/broadcast/{broadcastId}/view?toLanguages={lang}&isAuto=false&iframe=true",
    embedType: "iframe",
  },
};

/** Build the Palabra listener URL for a given target-language code. */
export function streamUrlFor(langCode: string): string {
  const { palabra } = broadcastConfig;
  return palabra.embedUrl
    .replace("{broadcastId}", palabra.broadcastId)
    .replace("{source}", palabra.sourceLang)
    .replace("{lang}", langCode);
}
