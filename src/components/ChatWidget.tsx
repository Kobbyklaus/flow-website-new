"use client";

import { useEffect, useState } from "react";
import type { CSSProperties } from "react";

const WIDGET_SCRIPT_ID = "dagg-chat-widget-script";
const WIDGET_SRC = "https://rag.dagproducts.org/widget.js";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [scriptError, setScriptError] = useState(false);

  useEffect(() => {
    if (!open || document.getElementById(WIDGET_SCRIPT_ID)) return;

    const script = document.createElement("script");
    script.id = WIDGET_SCRIPT_ID;
    script.src = WIDGET_SRC;
    script.defer = true;
    script.dataset.container = "#dagg-chat";
    script.dataset.welcome =
      "Welcome! Ask a question about prayer, faith, or Dag Heward-Mills' teachings.";
    script.onerror = () => setScriptError(true);
    document.body.appendChild(script);
  }, [open]);

  return (
    <>
      <div
        className={`fixed bottom-20 right-4 sm:right-6 z-[60] w-[min(390px,calc(100vw-32px))] transition-all duration-300 ${
          open
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "translate-y-4 opacity-0 pointer-events-none"
        }`}
      >
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-black shadow-2xl shadow-black/60">
          <div className="flex items-center justify-between bg-gradient-to-r from-accent to-accent-dark px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-white">DagGPT</p>
              <p className="text-[11px] text-white/70">Ask a pastoral question</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
              aria-label="Close chat"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="bg-white p-0" style={{ "--dagg-accent": "#E2231A" } as CSSProperties}>
            <div id="dagg-chat" />
            {scriptError && (
              <div className="p-5 text-center text-sm text-neutral-600">
                DagGPT could not load. Please try again later.
              </div>
            )}
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => {
          setScriptError(false);
          setOpen((current) => !current);
        }}
        className={`fixed bottom-4 right-4 sm:right-6 z-[60] flex h-14 w-14 items-center justify-center rounded-full shadow-lg transition-all duration-300 ${
          open
            ? "rotate-0 border border-white/20 bg-white/10 text-white backdrop-blur-md"
            : "bg-accent text-white shadow-accent/30 hover:scale-110 hover:bg-accent-light"
        }`}
        aria-label={open ? "Close DagGPT chat" : "Open DagGPT chat"}
        aria-expanded={open}
        aria-controls="dagg-chat"
      >
        {open ? (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0-7-7" />
          </svg>
        ) : (
          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-5l-5 5v-5z"
            />
          </svg>
        )}
      </button>
    </>
  );
}
