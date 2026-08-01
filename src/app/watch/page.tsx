import type { Metadata } from "next";
import WatchExperience from "@/components/WatchExperience";

export const metadata: Metadata = {
  title: "Watch Live | FLOW — in your language",
  description:
    "Join the FLOW online prophetic prayer meeting live and follow along in your own language with real-time translation.",
  openGraph: {
    title: "Watch Live | FLOW — in your language",
    description:
      "Join the live prayer meeting and follow along in your own language.",
    images: ["/images/flow/shame-will-not-follow-me-banner.png"],
  },
};

export default function WatchPage() {
  return <WatchExperience />;
}
