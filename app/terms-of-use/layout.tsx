import Navbar from "@/components/sections/Navbar";
import Footer from "@/components/sections/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Assurifii",
  description: "Terms and conditions for using Assurifii's insurance comparison services.",
};

export default function TermsOfUseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen overflow-y-auto">
      <Navbar/>
      {children}
      <Footer />
    </div>
  );
}
