import { Fraunces, Public_Sans } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  style: ["normal", "italic"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata = {
  title: "OurEarth — Your story, sent where it matters",
  description:
    "OurEarth collects first-hand accounts of how a warming world is changing daily life, and delivers them to the people who can act.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${fraunces.variable} ${publicSans.variable}`}>
      <body className="bg-paper text-ink font-body antialiased">{children}</body>
    </html>
  );
}
