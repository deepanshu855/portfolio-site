import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.scss";

const person = {
  "@type": "Person",
  name: "Deepanshu Sharma",
  url: "https://www.linkedin.com/in/deepanshu-sharma-661572323/",
  email: "deepanshusharma040@gmail.com",
  telephone: "+91-9319276626",
  jobTitle: "Full Stack Developer and UI/UX Designer",
  description: "Final-year B.Tech CSE student building full-stack web applications and generative AI products.",
  sameAs: [
    "https://www.linkedin.com/in/deepanshu-sharma-661572323/",
    "https://github.com/deepanshu855/",
    "https://leetcode.com/u/Deepanshu040/",
  ],
  knowsAbout: ["MERN", "Next.js", "TypeScript", "LLM integration", "RAG", "AI agents", "Docker", "Kubernetes", "AWS", "Figma"],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "SRM University, Sonipat",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const title = "Deepanshu Sharma — Full Stack Developer & GenAI Builder";
  const description = "Final-year B.Tech CSE student at SRM University building full-stack products, generative AI applications, and thoughtful user experiences.";
  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
    title,
    description,
    applicationName: "Deepanshu Sharma Portfolio",
    keywords: ["Deepanshu Sharma", "Full Stack Developer", "Generative AI", "Next.js", "MERN", "SRM University"],
    openGraph: {
      type: "profile",
      title,
      description,
      siteName: "Deepanshu Sharma",
      images: [{ url: "/images/deepanshu-profile.jpg", width: 720, height: 1584, alt: "Deepanshu Sharma" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/deepanshu-profile.jpg"],
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const profilePage = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "ProfilePage", name: "Deepanshu Sharma — Portfolio", mainEntity: { "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/#person` } },
      { ...person, "@id": `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/#person`, hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "Bachelor of Technology", educationalLevel: "Undergraduate", recognizedBy: { "@type": "CollegeOrUniversity", name: "SRM University, Sonipat" }, description: "B.Tech in Computer Science and Engineering; CGPA 9.25/10" } },
    ],
  };

  return (
    <html lang="en">
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage).replace(/</g, "\\u003c") }} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
