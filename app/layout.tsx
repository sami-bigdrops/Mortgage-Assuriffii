import type { Metadata } from "next";
import { Mulish, Playfair_Display } from "next/font/google";
import "./globals.css";

const mulish = Mulish({
  variable: "--font-mulish",
  subsets: ["latin"],
});

const playfair_display = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mortgage - Assuriffii",
  description: "Assuriffii is a trusted mortgage provider in the USA offering home loans, cash-out refinancing, and easy solutions to buy a home. Get the best mortgage rates, compare lenders, and secure your home financing online with Assuriffii.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${mulish.variable} ${playfair_display.variable} antialiased`}>
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
