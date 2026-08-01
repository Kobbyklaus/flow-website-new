"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import {
  LANGUAGES,
  ORIGINAL_LANGUAGE,
  broadcastConfig,
  streamUrlFor,
  type Language,
} from "@/lib/broadcast.config";

const { youtube, palabra, translationEnabled } = broadcastConfig;

function youtubeEmbedUrl(): string | null {
  if (youtube.liveVideoId) {
    return `https://www.youtube.com/embed/${youtube.liveVideoId}?autoplay=1&rel=0`;
  }
  if (youtube.channelId) {
    return `https://www.youtube.com/embed/live_stream?channel=${youtube.channelId}&autoplay=1&rel=0`;
  }
  return null;
}

export default function WatchExperience() {
  // Default to the original language.
  const [selected, setSelected] = useState<Language>(ORIGINAL_LANGUAGE);

  const isOriginal = selected.code === ORIGINAL_LANGUAGE.code;
  const ytUrl = useMemo(youtubeEmbedUrl, []);

  // Is a given language actually playable right now?
  const canTranslate = translationEnabled && palabra.broadcastId.length > 0;

  // What should fill the player for the current selection?
  const playerSrc = isOriginal
    ? ytUrl
    : canTranslate
      ? streamUrlFor(selected.code)
      : null;

  const handlePick = (lang: Language) => {
    if (lang.code !== ORIGINAL_LANGUAGE.code && !canTranslate) return; // "soon"
    setSelected(lang);
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* ── Top bar ── */}
      <header className="sticky top-0 z-30 bg-black/70 backdrop-blur-md border-b border-white/5">
        <div className="w-full px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 shrink-0">
            <Image
              src="/images/flow/flow-logo-white.png"
              alt="FLOW"
              width={70}
              height={28}
              className="object-contain"
            />
          </a>

          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/15 border border-accent/30 live-pulse">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="text-[11px] font-semibold tracking-[0.12em] text-white/90">
                LIVE
              </span>
            </span>
            <a
              href="/"
              className="text-[12px] font-medium tracking-[0.05em] text-white/60 hover:text-white transition-colors"
            >
              ← BACK TO SITE
            </a>
          </div>
        </div>
      </header>

      {/* ── Ambient background ── */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 dot-texture" />
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-red-900/10 rounded-full blur-3xl animate-float-slow" />
      </div>

      <main className="flex-1 w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-10">
        {/* ── Heading ── */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Watch Live
          </h1>
          <div className="mx-auto mt-4 mb-4 h-1 w-32 bg-gradient-to-r from-accent via-accent-light to-accent rounded-full" />
          <p className="text-white/60 text-sm sm:text-base max-w-xl mx-auto">
            Join the prayer meeting and follow along in your own language.
          </p>
        </div>

        {/* ── Player ── */}
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden glass-strong border border-white/10 shadow-2xl">
          {playerSrc ? (
            <iframe
              // Remount on language change so the stream fully reloads.
              key={selected.code}
              src={playerSrc}
              title={`FLOW live — ${selected.english}`}
              className="absolute inset-0 w-full h-full"
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <OfflineState hasYouTube={Boolean(ytUrl)} />
          )}

          {/* Now-playing language chip */}
          <div className="absolute top-3 left-3 z-10 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
            <span className="text-base leading-none">{selected.flag}</span>
            <span className="text-[12px] font-semibold text-white/90">
              {isOriginal ? "Original" : selected.native}
            </span>
          </div>
        </div>

        {/* ── Language selector ── */}
        <section className="mt-8 sm:mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-semibold tracking-wide">
              Choose your language
            </h2>
            {!canTranslate && (
              <span className="text-[11px] font-medium tracking-wide text-white/40 uppercase">
                Translation launching soon
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {[ORIGINAL_LANGUAGE, ...LANGUAGES].map((lang) => {
              const active = lang.code === selected.code;
              const original = lang.code === ORIGINAL_LANGUAGE.code;
              const disabled = !original && !canTranslate;
              return (
                <button
                  key={lang.code}
                  onClick={() => handlePick(lang)}
                  disabled={disabled}
                  aria-pressed={active}
                  className={[
                    "relative group text-left rounded-xl p-3 sm:p-4 transition-all duration-200 border",
                    active
                      ? "bg-gradient-to-br from-accent to-accent-dark border-accent-light shadow-lg shadow-accent/20 scale-[1.02]"
                      : disabled
                        ? "glass border-white/5 opacity-40 cursor-not-allowed"
                        : "glass border-white/10 hover:border-white/25 hover:bg-white/[0.07] cursor-pointer",
                  ].join(" ")}
                >
                  <div className="flex items-center gap-2">
                    <span className="text-2xl leading-none">{lang.flag}</span>
                    {active && (
                      <span className="ml-auto flex items-center justify-center w-5 h-5 rounded-full bg-white/90">
                        <svg
                          className="w-3 h-3 text-accent"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth={3}
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className="mt-2">
                    <div className="text-sm font-semibold leading-tight">
                      {lang.native}
                    </div>
                    <div
                      className={[
                        "text-[11px] leading-tight mt-0.5",
                        active ? "text-white/80" : "text-white/45",
                      ].join(" ")}
                    >
                      {lang.english}
                    </div>
                  </div>
                  {disabled && (
                    <span className="absolute top-2 right-2 text-[9px] font-semibold tracking-wide text-white/50 uppercase">
                      Soon
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <p className="mt-6 text-center text-[12px] text-white/35">
            Real-time translation powered by{" "}
            <a
              href="https://palabra.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/55 hover:text-white transition-colors underline underline-offset-2"
            >
              Palabra AI
            </a>
            . Choose a language and the message follows you.
          </p>
        </section>
      </main>
    </div>
  );
}

function OfflineState({ hasYouTube }: { hasYouTube: boolean }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6">
      <div className="w-16 h-16 rounded-full glass flex items-center justify-center mb-5">
        <svg
          className="w-7 h-7 text-white/60"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
      </div>
      <h3 className="text-lg font-semibold">We&apos;re not live right now</h3>
      <p className="text-white/50 text-sm mt-2 max-w-md">
        FLOW meets <span className="text-white/80">Tuesdays &amp; Fridays at 4:30 AM GMT</span>.
        Come back at service time and the stream will appear here.
      </p>
      {hasYouTube && (
        <a
          href={`https://www.youtube.com/@${broadcastConfig.youtube.channelHandle}/live`}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-2 px-5 py-2.5 rounded-xl glass-strong border border-white/10 hover:border-white/25 text-sm font-semibold transition-colors"
        >
          Open on YouTube
        </a>
      )}
    </div>
  );
}
