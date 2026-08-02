"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { socialLinks } from "@/lib/socials";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "SCHEDULE", href: "#schedule" },
  { label: "WATCH", href: "#connect" },
  { label: "GIVE", href: "#give" },
  { label: "CARE", href: "#pastoral-care" },
  { label: "MERCH", href: "#merch" },
  { label: "BLOGS", href: "#blog" },
  { label: "CONNECT", href: "#stay-connected" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled || menuOpen ? "bg-black/80 backdrop-blur-md border-b border-white/5" : "bg-transparent"
        }`}
      >
        <div className="w-full px-3 sm:px-6 lg:px-10 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center shrink-0">
            <Image
              src="/images/flow/flow-logo-white.png"
              alt="FLOW"
              width={70}
              height={28}
              className="object-contain sm:w-[80px]"
            />
          </a>

          {/* Desktop nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-[13px] font-medium tracking-[0.05em] text-white/70 hover:text-white transition-colors relative group whitespace-nowrap"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-accent to-accent-light group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center gap-2">
            {/* Desktop social icons */}
            <div className="hidden lg:flex items-center gap-1">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white/40 ${s.hoverColor} transition-colors p-2.5 rounded-full hover:bg-white/5`}
                  title={s.label}
                >
                  <span className="[&_svg]:w-4 [&_svg]:h-4">
                    {s.icon}
                  </span>
                </a>
              ))}
            </div>

            {/* Hamburger button — mobile/tablet only */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-white/70 hover:text-white transition-colors"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {menuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${
          menuOpen ? "visible opacity-100" : "invisible opacity-0"
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          onClick={() => setMenuOpen(false)}
        />

        {/* Menu panel */}
        <div
          className={`absolute top-16 right-0 w-full sm:w-80 bg-black/95 backdrop-blur-xl border-l border-white/5 h-[calc(100vh-4rem)] transition-transform duration-300 ${
            menuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col p-6 pt-8 gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-[15px] font-medium tracking-[0.08em] text-white/70 hover:text-white hover:bg-white/5 transition-colors py-3 px-4 rounded-xl"
              >
                {link.label}
              </a>
            ))}

            {/* Social icons in mobile menu */}
            <div className="flex items-center gap-2 mt-6 pt-6 border-t border-white/10 px-4">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-white/40 ${s.hoverColor} transition-colors p-2.5 rounded-full hover:bg-white/5`}
                  title={s.label}
                >
                  <span className="[&_svg]:w-5 [&_svg]:h-5">
                    {s.icon}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
