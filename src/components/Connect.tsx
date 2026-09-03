"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function Connect() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const CHANNEL_URL = "https://www.youtube.com/@YouWillBeGladYouPrayed";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="connect" className="py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      <div className="absolute inset-0 dot-texture" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div ref={ref} className={`reveal ${visible ? "visible" : ""}`}>
            <h2 className="text-5xl lg:text-6xl font-bold text-white tracking-tight">
              Watch &amp; Pray
            </h2>
            <div className="mt-6 h-1 w-48 bg-gradient-to-r from-accent via-accent-light to-accent rounded-full" />
            <p className="text-xl text-white/60 mt-6 leading-relaxed">
              Your all access pass to the latest FLOW Prayer Meetings. Watch the most recent episode and experience the power of prayer.
            </p>
            <a
              href={CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 group relative px-8 py-4 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 glass-strong" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative text-[14px] font-semibold text-white tracking-wide">
                WATCH NOW
              </span>
            </a>
          </div>

          {/* Video */}
          <div className={`reveal ${visible ? "visible" : ""} delay-2`}>
            <div className="relative">
              {/* Decorative glows */}
              <div className="absolute -top-8 -right-8 w-48 h-48 bg-accent/20 rounded-full blur-3xl" />
              <div className="absolute -bottom-8 -left-8 w-36 h-36 bg-red-800/20 rounded-full blur-3xl" />

              <a
                href={CHANNEL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="relative block rounded-2xl overflow-hidden cursor-pointer group border border-white/10"
                style={{ aspectRatio: "16/9" }}
              >
                <Image
                  src="/images/flow/praying-1.jpg"
                  alt="FLOW Prayer Meeting"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 600px"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg shadow-accent/30">
                    <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
