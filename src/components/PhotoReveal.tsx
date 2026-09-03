"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";

export default function PhotoReveal() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

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
    <section className="relative py-32 overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/flow/founder.jpg"
          alt=""
          fill
          className="object-cover object-[center_25%] opacity-30"
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-black via-black/60 to-black" />
      <div className="absolute inset-0 dot-texture" />

      <div ref={ref} className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`reveal ${visible ? "visible" : ""} grid md:grid-cols-2 gap-12 lg:gap-16 items-center`}>
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10">
            <div style={{ aspectRatio: "4/5" }} className="relative">
              <Image
                src="/images/flow/founder.jpg"
                alt="Bishop Dag Heward-Mills"
                fill
                className="object-cover object-[center_25%]"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
            </div>
          </div>

          {/* Text */}
          <div className={`reveal ${visible ? "visible" : ""} delay-2`}>
            <p className="text-accent text-[11px] font-semibold tracking-[0.15em] uppercase mb-4">
              Founder
            </p>
            <h3 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
              Bishop Dag<br />Heward-Mills
            </h3>
            <div className="mt-6 h-1 w-32 bg-gradient-to-r from-accent via-accent-light to-accent rounded-full" />
            <p className="text-white/50 text-lg mt-6 leading-relaxed">
              Leading millions in prophetic prayer through FLOW — Flexible Lovers Of The Word. Join believers from around the world as heaven responds to the cry of His people.
            </p>
            <a
              href="https://www.youtube.com/@YouWillBeGladYouPrayed"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-8 group relative px-8 py-4 rounded-2xl overflow-hidden"
            >
              <div className="absolute inset-0 glass-strong" />
              <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative text-[14px] font-semibold text-white tracking-wide">
                JOIN PRAYER MEETING
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
