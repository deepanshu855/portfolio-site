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

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://portfolio-siteportfolio.vercel.app";

export async function generateMetadata(): Promise<Metadata> {
  const title = "Deepanshu Sharma — Full Stack Developer & GenAI Builder";
  const description = "Final-year B.Tech CSE student at SRM University building full-stack products, generative AI applications, and thoughtful user experiences.";
  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    applicationName: "Deepanshu Sharma Portfolio",
    keywords: ["Deepanshu Sharma", "Full Stack Developer", "Generative AI", "Next.js", "MERN", "SRM University"],
    openGraph: {
      type: "profile",
      title,
      description,
      siteName: "Deepanshu Sharma",
      images: [{ url: "/images/portfolio-preview.png", width: 1200, height: 630, alt: "Deepanshu Sharma portfolio preview" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/portfolio-preview.png"],
    },
    robots: { index: true, follow: true },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const profilePage = {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "ProfilePage", name: "Deepanshu Sharma — Portfolio", mainEntity: { "@id": `${siteUrl}/#person` } },
      { ...person, "@id": `${siteUrl}/#person`, hasCredential: { "@type": "EducationalOccupationalCredential", credentialCategory: "Bachelor of Technology", educationalLevel: "Undergraduate", recognizedBy: { "@type": "CollegeOrUniversity", name: "SRM University, Sonipat" }, description: "B.Tech in Computer Science and Engineering; CGPA 9.25/10" } },
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try { const saved = localStorage.getItem("portfolio-theme"); const mode = saved === "light" || saved === "dark" || saved === "system" ? saved : "system"; const light = mode === "light" || (mode === "system" && matchMedia("(prefers-color-scheme: light)").matches); document.documentElement.dataset.portfolioTheme = light ? "light" : "dark"; document.documentElement.style.colorScheme = light ? "light" : "dark"; } catch { const light = matchMedia("(prefers-color-scheme: light)").matches; document.documentElement.dataset.portfolioTheme = light ? "light" : "dark"; document.documentElement.style.colorScheme = light ? "light" : "dark"; }` }} />
      </head>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePage).replace(/</g, "\\u003c") }} />
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
