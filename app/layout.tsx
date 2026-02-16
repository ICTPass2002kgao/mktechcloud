import type { Metadata } from "next";
import {   Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({ subsets: ["latin"], variable: "--font-poppins", weight: ["300", "400", "500", "600", "700"] });
 

export const metadata: Metadata = {
  title: "MK TECHCLOUD | Enterprise Digital Solutions",
  description: "South Africa's premier 100% Black-Owned digital transformation partner. Specializing in Next.js, Django, and AWS infrastructure for SMEs.",
  keywords: ["Software Development", "Next.js", "South Africa", "App Development", "AWS", "B-BBEE Level 1","Digital Solutions", 
    "Enterprise Software", "Web Development", "Mobile Apps", "Cloud Services", "Tech Consulting",
     "Custom Software", "Digital Transformation", "Software Architecture", "Tech Innovation",
      "Business Solutions", "Tech Ecosystem", "Software Engineering", "Tech Partnerships", "Tech Expertise", 
      "Tech Leadership", "Tech Excellence"],
      icons: {
        icon: "/mktechcloud.png",
        apple: "/mktechcloud.png",
        other: [
          { rel: "icon", url: "/mktechcloud.png", sizes: "32x32" },
          { rel: "icon", url: "/mktechcloud.png", sizes: "16x16" },
        ],
      },
  openGraph: {
    title: "MK TECHCLOUD | Enterprise Digital Solutions ",
    description: "Architecting digital ecosystems that empower South African businesses.",
    url: "https://www.mktechcloud.co.za",
    siteName: "MK TECHCLOUD",
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${poppins.variable} font-sans bg-slate-950 text-slate-200 antialiased`}>
        {children}
      </body>
    </html>
  );
}