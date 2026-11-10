# Deepanshu Sharma — Portfolio

A single-page portfolio for Full Stack and Generative AI internship and placement opportunities.

## Run locally

Requires Node.js 20.9 or newer.

1. Copy `.env.example` to `.env.local`.
2. Run `npm install`.
3. Run `npm run dev` and open `http://localhost:3000`.

Before deployment, set `NEXT_PUBLIC_SITE_URL` to the final public origin. The résumé is served from `public/resume.pdf`.

## Content still to supply

- Landing-page screenshots for the five project cards. Current artwork is a set of CSS mockups and each project modal marks its image as a placeholder.
- Project-specific GitHub repository and live URLs. Cards currently link to the supplied GitHub profile; the résumé has generic GitHub/Live labels for the first three projects, without individual URLs.
- Confirm the Banão spelling. The project uses the spelling from the main portfolio brief; the résumé rendering appears to spell it “Banāo.”
- Stack details for Snitch. No technologies were supplied for the project.
- A description for K.N.I.T Orchestrator. It was named once in the initial requirements but had no matching project details, so it is not presented as a project.

## Implementation notes

- Next.js App Router, strict TypeScript, Sass modules, semantic server-rendered content, JSON-LD, Open Graph and Twitter metadata.
- The navbar scrolls smoothly between page sections. Its theme control switches between dark and light palettes.
- Projects use alternating case-study rows with the problem, solution, available stack, and links visible up front. Skill groups pair each technology with a high-contrast icon mark. Project detail modals provide a fuller implementation summary.
- Dark and light themes use separate high-contrast text and chip colors; body and technology labels have been enlarged for legibility.
- WebGL hero scene is dynamically imported with server rendering disabled. Small screens and reduced-motion settings use the CSS fallback.
- GSAP + ScrollTrigger handle reveal/parallax motion. Lenis is synchronized through the GSAP ticker. Framer Motion handles project detail transitions.
- Vercel Analytics and Speed Insights are included.
- The original `@studio-freight/lenis` package has been renamed and deprecated; the current `lenis` package is used.
