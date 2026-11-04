"use client";

import { useState } from "react";

// Posts straight to the FLOW Reach backend (the full system lives on share.flowlive.org).
const JOIN_ENDPOINT = "https://share.flowlive.org/join";

const COUNTRIES = [
  "Ghana", "Nigeria", "Kenya", "South Africa", "Uganda", "Tanzania", "Zimbabwe",
  "Zambia", "Cameroon", "Côte d'Ivoire", "Liberia", "Sierra Leone", "Togo",
  "Benin", "Malawi", "Rwanda", "Botswana", "Namibia", "Ethiopia", "Congo (DRC)",
  "United Kingdom", "United States", "Canada", "Germany", "France", "Netherlands",
  "Italy", "Spain", "Switzerland", "Ireland", "Sweden", "Belgium", "Australia",
  "India", "Philippines", "Brazil", "Peru", "Mexico", "Jamaica", "Trinidad & Tobago",
  "United Arab Emirates", "Other",
];

const LANGUAGES = [
  ["en", "English"],
  ["fr", "French"],
  ["es", "Spanish"],
  ["pt", "Portuguese"],
  ["sw", "Swahili"],
];

const CHURCH_OPTIONS = [
  { value: "ud", label: "UD", nameLabel: "Which denomination?" },
  { value: "firstlove", label: "First Love", nameLabel: "Which First Love church?" },
  { value: "nonud", label: "Non-UD", nameLabel: "Name of your church" },
];

export default function FlowmaticsForm() {
  const [church, setChurch] = useState("");
  const active = CHURCH_OPTIONS.find((c) => c.value === church);
  const nameLabel = active ? active.nameLabel : "Name of your church";

  const fieldClass =
    "w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-[15px] text-white placeholder-white/30 outline-none focus:border-accent focus:bg-white/[0.07] transition-colors";
  const labelClass =
    "block text-[12px] font-semibold tracking-[0.08em] uppercase text-white/50 mb-2";

  return (
    <section className="relative min-h-screen bg-black pt-28 sm:pt-36 pb-24 px-5 sm:px-6">
      {/* soft red glow */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-80 bg-[radial-gradient(ellipse_at_top,rgba(226,35,26,0.18),transparent_70%)]" />

      <div className="relative max-w-xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-block text-[12px] font-bold tracking-[0.2em] uppercase text-accent mb-3">
            Flowmatics
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white leading-tight">
            Get your personal FLOW link
          </h1>
          <p className="mt-4 text-white/60 text-[15px] leading-relaxed max-w-md mx-auto">
            Share the prayer meeting with the nations. You&apos;ll get your own
            link and see how many people you bring to pray.
          </p>
        </div>

        <form
          method="post"
          action={JOIN_ENDPOINT}
          className="bg-white/[0.03] border border-white/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)]"
        >
          <div>
            <label className={labelClass} htmlFor="name">Your name</label>
            <input id="name" name="name" required autoComplete="name"
              placeholder="e.g. Grace Mensah" className={fieldClass} />
          </div>

          <div>
            <label className={labelClass} htmlFor="phone">WhatsApp number</label>
            <input id="phone" name="phone" required type="tel" inputMode="tel"
              autoComplete="tel" placeholder="e.g. +233 24 000 0000" className={fieldClass} />
          </div>

          <div>
            <label className={labelClass} htmlFor="country">Country</label>
            <select id="country" name="country" required defaultValue=""
              className={`${fieldClass} appearance-none`}>
              <option value="" disabled>Select your country</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c} className="bg-neutral-900">{c}</option>
              ))}
            </select>
          </div>

          <div>
            <span className={labelClass}>Which church are you from?</span>
            <div className="grid grid-cols-3 gap-2">
              {CHURCH_OPTIONS.map((opt) => {
                const selected = church === opt.value;
                return (
                  <label key={opt.value}
                    className={`cursor-pointer text-center rounded-xl border px-2 py-3 text-[14px] font-semibold transition-colors ${
                      selected
                        ? "border-accent bg-accent/15 text-white"
                        : "border-white/10 bg-white/5 text-white/60 hover:border-white/25"
                    }`}>
                    <input type="radio" name="church_type" value={opt.value}
                      required checked={selected}
                      onChange={() => setChurch(opt.value)} className="sr-only" />
                    {opt.label}
                  </label>
                );
              })}
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="church_name">{nameLabel}</label>
            <input id="church_name" name="church_name" required
              placeholder="Type the name" className={fieldClass} />
          </div>

          <div>
            <label className={labelClass} htmlFor="language">Preferred language</label>
            <select id="language" name="language" defaultValue="en"
              className={`${fieldClass} appearance-none`}>
              {LANGUAGES.map(([v, l]) => (
                <option key={v} value={v} className="bg-neutral-900">{l}</option>
              ))}
            </select>
          </div>

          <button type="submit"
            className="w-full rounded-xl bg-gradient-to-r from-accent to-accent-light py-4 text-[15px] font-bold tracking-[0.05em] text-white hover:brightness-110 active:scale-[0.99] transition-all">
            Get my link →
          </button>

          <p className="text-center text-[12px] text-white/35 leading-relaxed">
            We&apos;ll only use your number to send you your FLOW link.
          </p>
        </form>
      </div>
    </section>
  );
}
