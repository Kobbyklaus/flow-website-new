"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { socialLinks } from "@/lib/socials";

export default function Footer() {
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
    <footer className="relative">
      {/* CTA Section */}
      <section className="relative py-32 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(0,0,0),rgb(41,0,0))]" />
        <div className="absolute inset-0 dot-texture" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-900/10 rounded-full blur-3xl" />

        <div ref={ref} className="relative max-w-3xl mx-auto px-4 text-center">
          <div className={`reveal ${visible ? "visible" : ""}`}>
            <h2 className="text-7xl md:text-8xl font-bold text-white tracking-tight">
              There&apos;s Power<br />In Prophetic Prayers
            </h2>
            <div className="mx-auto mt-8 h-1 w-48 md:w-64 bg-gradient-to-r from-accent via-accent-light to-accent rounded-full animate-drift" />
            <p className="text-xl text-white/50 mt-8 max-w-lg mx-auto leading-relaxed">
              Join believers from around the world. Experience the move of God through prophetic prayers.
            </p>
            <div className="mt-10">
              <a
                href="https://www.youtube.com/@YouWillBeGladYouPrayed"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block group relative px-10 py-5 rounded-2xl overflow-hidden"
              >
                <div className="absolute inset-0 glass-strong" />
                <div className="absolute inset-0 bg-gradient-to-r from-accent to-accent-light opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative text-[15px] font-semibold text-white tracking-wide">
                  JOIN FLOW PRAYER
                </span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer accent line */}
      <div className="h-0.5 bg-gradient-to-r from-accent via-accent-light to-red-800" />

      {/* Footer content */}
      <div className="bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Brand */}
            <div className="lg:col-span-4">
              <Image
                src="/images/flow/flow-logo-white.png"
                alt="FLOW"
                width={80}
                height={32}
                className="object-contain mb-4"
              />
              <p className="text-white/40 text-sm leading-relaxed mt-3">
                Flexible Lovers Of The Word. Online prophetic prayer meetings with Dag Heward-Mills.
              </p>
              <div className="flex gap-3 mt-6">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 rounded-full ${s.bgColor} flex items-center justify-center text-white transition-all hover:scale-110`}
                    title={s.label}
                  >
                    {s.iconLg}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="lg:col-span-3">
              <h3 className="text-accent font-semibold text-sm mb-4 tracking-wide">Quick Links</h3>
              <div className="space-y-3">
                {[
                  { label: "About FLOW", href: "#about" },
                  { label: "Schedule", href: "#schedule" },
                  { label: "Watch", href: "#connect" },
                  { label: "Give", href: "#give" },
                  { label: "Care", href: "#pastoral-care" },
                  { label: "Testimonies", href: "#testimonies" },
                  { label: "Merch", href: "#merch" },
                  { label: "FLOW Blogs", href: "#blog" },
                  { label: "Stay Connected", href: "#stay-connected" },
                ].map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-white/40 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                ))}
              </div>
            </div>

            {/* Prayer Times */}
            <div className="lg:col-span-3">
              <h3 className="text-accent font-semibold text-sm mb-4 tracking-wide">Prayer Times</h3>
              <div className="text-sm text-white/40">
                <p className="text-white/60 font-medium">Tue &amp; Fri — 4:30 AM GMT</p>
                <p className="mt-1">Sun — 9:00 AM GMT</p>
              </div>
            </div>

            {/* Connect */}
            <div className="lg:col-span-2">
              <h3 className="text-accent font-semibold text-sm mb-4 tracking-wide">Connect</h3>
              <div className="space-y-3 text-sm text-white/40">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-white transition-colors"
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-[6px] h-[6px] rounded-full bg-accent live-pulse" />
              <span className="text-[12px] text-white/30">
                Tuesdays &amp; Fridays &middot; 4:30 AM GMT &middot; Sundays &middot; 9:00 AM GMT
              </span>
            </div>
            <p className="text-[12px] text-white/20">
              &copy; {new Date().getFullYear()}{" "}FLOW &mdash; You&apos;ll be glad you prayed
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
