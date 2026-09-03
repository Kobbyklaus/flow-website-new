"use client";

import { useRef, useEffect, useState } from "react";
import { socialLinks, OdyseeIcon } from "@/lib/socials";

const platforms = [
  {
    name: "Odysee",
    handle: "FLOW Prayer Meetings",
    description: "Watch every FLOW Prayer Meeting from 2020 to now — full archive of prophetic prayer.",
    href: "https://odysee.com/@FlowChurchServices:6",
    color: "bg-[#E4457B]/10",
    textColor: "text-[#E4457B]",
    icon: <OdyseeIcon className="w-7 h-7" gradientId="og-stay" />,
  },
  {
    name: "YouTube",
    handle: "You'll be glad you prayed",
    description: "Watch live prayer meetings, worship, and the latest FLOW episodes.",
    href: "https://www.youtube.com/@YouWillBeGladYouPrayed",
    color: "bg-red-500/10",
    textColor: "text-red-500",
    icon: (
      <svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
];

export default function StayConnected() {
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
    <section id="stay-connected" className="py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black" />
      <div className="absolute inset-0 dot-texture" />

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={ref} className={`reveal ${visible ? "visible" : ""} text-center mb-16`}>
          <h2 className="text-5xl md:text-6xl font-bold text-white tracking-tight">
            Stay Connected
          </h2>
          <div className="mx-auto mt-6 h-1 w-48 bg-gradient-to-r from-accent via-accent-light to-accent rounded-full" />
          <p className="text-xl text-white/50 mt-6 max-w-lg mx-auto leading-relaxed">
            Stay connected with FLOW across all platforms.
          </p>
        </div>

        {/* Main platforms */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {platforms.map((p, i) => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`reveal ${visible ? "visible" : ""} group glass rounded-3xl p-8 hover:border-white/20 transition-colors`}
              style={{ transitionDelay: `${(i + 1) * 0.1}s` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 rounded-2xl ${p.color} flex items-center justify-center ${p.textColor} group-hover:scale-110 transition-transform`}>
                  {p.icon}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-white">{p.name}</h3>
                  <p className="text-sm text-white/40">{p.handle}</p>
                </div>
              </div>
              <p className="text-sm text-white/50 leading-relaxed">{p.description}</p>
            </a>
          ))}
        </div>

        {/* Social icons row */}
        <div className={`reveal ${visible ? "visible" : ""} delay-3 text-center`}>
          <p className="text-sm text-white/30 mb-5 uppercase tracking-wider font-medium">Follow Us</p>
          <div className="flex justify-center gap-3">
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-12 h-12 rounded-full ${s.bgColor} flex items-center justify-center text-white transition-all hover:scale-110`}
                title={s.label}
              >
                {s.iconLg}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
