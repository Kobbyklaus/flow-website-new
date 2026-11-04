import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FlowmaticsForm from "@/components/FlowmaticsForm";

export const metadata: Metadata = {
  title: "Flowmatics | FLOW",
  description:
    "Get your personal FLOW prayer-meeting link, share it with the nations, and see how many people you bring to pray.",
};

export default function FlowmaticsPage() {
  return (
    <>
      <Navbar />
      <main>
        <FlowmaticsForm />
      </main>
      <Footer />
    </>
  );
}
