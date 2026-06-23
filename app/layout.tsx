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
      "Website development in limpopo, software development in limpopo, web development in limpopo, app development in limpopo, cloud services in limpopo, tech consulting in limpopo, custom software in limpopo, digital transformation in limpopo, software architecture in limpopo, tech innovation in limpopo, business solutions in limpopo, tech ecosystem in limpopo, software engineering in limpopo, tech partnerships in limpopo, tech expertise in limpopo",
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
    description: "Building digital ecosystems that empower South African businesses.",
    url: "https://www.mktechcloud.co.za",
    siteName: "MK TECHCLOUD",
    locale: "en_ZA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  
  // Calculate dynamic age based on birthdate: July 23, 2002
  const birthDate = new Date("2002-07-23");
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "MK TECHCLOUD",
    "url": "https://www.mktechcloud.co.za",
    "description": "South Africa's premier 100% Black-Owned digital transformation partner. Specializing in Next.js, Django, and AWS infrastructure for SMEs.",
    "founder": {
      "@type": "Person",
      "name": "Kgaogelo Joseph Mthimkhulu",
      "jobTitle": "CEO",
      "homeLocation": {
        "@type": "Place",
        "name": "Burgersfort, Limpopo, South Africa"
      },
      "alumniOf": {
        "@type": "CollegeOrUniversity",
        "name": "Vaal University of Technology"
      },
      "description": `A ${age}-year-old Information Technology graduate with an Advanced Diploma in IT, originally from Burgersfort, Limpopo.`
    }
  };

  return (
    <html  className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
        />
      </head>
      <body className={`${poppins.variable} font-sans bg-slate-950 text-slate-200 antialiased`}>
        {children}
      </body>
    </html>
  );
}