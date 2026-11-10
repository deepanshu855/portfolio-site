"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { links, projects, Project, skillGroups } from "@/lib/portfolio-data";
import styles from "./portfolio.module.scss";
import ScrollStack, { ScrollStackItem } from "./scroll-stack";
import TechText from "./tech-text";

type ThemeMode = "system" | "light" | "dark";

const skillMarks: Record<string, { mark: string; color: string }> = {
  Java: { mark: "J", color: "#f89820" }, "JavaScript (ES6+)": { mark: "JS", color: "#f0db4f" }, TypeScript: { mark: "TS", color: "#5ca5ec" }, Python: { mark: "Py", color: "#4b8bbe" },
  "React.js": { mark: "⚛", color: "#61dafb" }, "Next.js": { mark: "N", color: "#f5f5f5" }, "Redux Toolkit": { mark: "R", color: "#a78bfa" }, "Context API": { mark: "C", color: "#61dafb" },
  "Tailwind CSS": { mark: "≈", color: "#55c6d9" }, Sass: { mark: "S", color: "#e58ab2" }, "Node.js": { mark: "JS", color: "#8cc84b" }, "Express.js": { mark: "Ex", color: "#eeeeee" },
  "REST APIs": { mark: "⇄", color: "#93a5ff" }, JWT: { mark: "JWT", color: "#d0aaff" }, "Socket.IO (WebSockets)": { mark: "◉", color: "#eeeeee" }, Redis: { mark: "◆", color: "#ff625e" }, Microservices: { mark: "μ", color: "#91a5ff" },
  MongoDB: { mark: "M", color: "#58bd83" }, MySQL: { mark: "▤", color: "#4c9bd6" }, "Generative AI": { mark: "✳", color: "#bd9cff" }, "LLM Integration": { mark: "LLM", color: "#bd9cff" },
  LangChain: { mark: "LC", color: "#82d5a6" }, LangGraph: { mark: "LG", color: "#82d5a6" }, "Mistral AI": { mark: "M", color: "#ff9b62" }, "AI Agents": { mark: "✧", color: "#bd9cff" }, RAG: { mark: "⌕", color: "#bd9cff" }, "Prompt Engineering": { mark: "⌘", color: "#bd9cff" },
  "AWS (ECS, ECR, S3)": { mark: "☁", color: "#ffb84d" }, Docker: { mark: "▰", color: "#63b9ec" }, "Docker Compose": { mark: "▰", color: "#63b9ec" }, Kubernetes: { mark: "⎈", color: "#6c9eff" }, Skaffold: { mark: "S", color: "#fc6d74" }, "CI/CD": { mark: "↗", color: "#a8d88a" },
  Git: { mark: "G", color: "#f05032" }, GitHub: { mark: "GH", color: "#f5f5f5" }, Postman: { mark: "P", color: "#ff6c37" }, Figma: { mark: "◉", color: "#f58b72" }, Warp: { mark: ">_", color: "#d3a8ff" },
  "Data Structures and Algorithms": { mark: "⌘", color: "#f2c76e" }, OOP: { mark: "◫", color: "#f2c76e" }, "System Design Basics": { mark: "SD", color: "#f2c76e" }, "Microservices Architecture": { mark: "μ", color: "#91a5ff" },
};

function SkillIcon({ skill }: { skill: string }) {
  const icon = skillMarks[skill] ?? { mark: "•", color: "#88f0dc" };
  return <span className={styles.skillItem}>
    <span className={styles.skillIcon} style={{ "--skill-color": icon.color } as React.CSSProperties} aria-hidden="true">{icon.mark}</span>
    <span>{skill}</span>
  </span>;
}

type ContactIconName = "linkedin" | "github" | "leetcode" | "phone" | "download";

function ContactIcon({ name }: { name: ContactIconName }) {
  if (name === "linkedin") {
    return <svg className={styles.linkIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" /></svg>;
  }
  if (name === "github") {
    return <svg className={styles.linkIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M12 .9a11.1 11.1 0 0 0-3.51 21.63c.56.1.76-.24.76-.54v-2.1c-3.1.67-3.76-1.31-3.76-1.31-.5-1.28-1.24-1.62-1.24-1.62-1.01-.69.08-.68.08-.68 1.12.08 1.71 1.15 1.71 1.15 1 .1.8 2.72 3.57 2.28.1-.72.39-1.21.71-1.49-2.48-.28-5.09-1.24-5.09-5.52 0-1.22.44-2.22 1.15-3-.12-.28-.5-1.42.11-2.96 0 0 .94-.3 3.06 1.14a10.6 10.6 0 0 1 5.57 0c2.12-1.44 3.06-1.14 3.06-1.14.61 1.54.23 2.68.11 2.96.72.78 1.15 1.78 1.15 3 0 4.29-2.61 5.24-5.1 5.51.4.35.76 1.03.76 2.08v3.09c0 .3.2.65.77.54A11.1 11.1 0 0 0 12 .9Z" /></svg>;
  }
  if (name === "leetcode") {
    return <svg className={styles.linkIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="m8.4 16.3 3.8-4.1-3.8-4.1M15.8 8.1h4.1M15.8 15.9h4.1" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /><path d="m13.7 3.5-7.4 7.2a1.8 1.8 0 0 0 0 2.6l7.4 7.2" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>;
  }
  if (name === "phone") {
    return <svg className={styles.linkIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M21 16.4v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 1.1 3.7 2 2 0 0 1 3.1 1.5h3a2 2 0 0 1 2 1.7c.12.9.34 1.8.66 2.64a2 2 0 0 1-.45 2.1L7 9.2a16 16 0 0 0 6 6l1.25-1.25a2 2 0 0 1 2.1-.45c.85.32 1.74.54 2.64.66a2 2 0 0 1 2.01 2.24Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
  }
  return <svg className={styles.linkIcon} viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 3v12m-5-5 5 5 5-5M5 20h14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

const DitherVeil = dynamic(() => import("./dither-veil"), {
  ssr: false,
  loading: () => <div className={styles.orbFallback} aria-hidden="true" />,
});

function ProjectArtwork({ kind }: { kind: Project["kind"] }) {
  return (
    <div className={`${styles.artwork} ${styles[`art_${kind}`]}`} aria-hidden="true">
      <div className={styles.artTop}><i /> <i /> <i /><span>PROJECT PREVIEW</span><b>↗</b></div>
      <div className={styles.artBody}>
        {kind === "builder" && <>
          <div className={styles.codePanel}><small>APP / PAGE.TSX</small><span className={styles.codeLine} /><span className={styles.codeLine} /><span className={styles.codeLine} /><span className={styles.codeLine} /><span className={styles.codeLine} /><span className={styles.codeLine} /></div>
          <div className={styles.previewPanel}><span className={styles.previewTag}>PROMPT → PREVIEW</span><strong>Make it<br />feel alive.</strong><div className={styles.previewButton}>Generate ↗</div></div>
        </>}
        {kind === "chat" && <>
          <div className={styles.chatRail}><span>V /</span><i /><i /><i /></div>
          <div className={styles.chatPreview}><small>VERITAS / SEARCH ON</small><p>What would you like to know?</p><div className={styles.chatBubble}>A grounded answer, with sources you can follow.</div><div className={styles.chatInput}>Ask anything <b>↑</b></div></div>
        </>}
        {kind === "music" && <>
          <div className={styles.musicOrb}><span>MOOD<br />DETECTED</span><b>CALM</b></div>
          <div className={styles.trackList}><small>MADE FOR THIS MOMENT</small><strong>slow mornings</strong><span>01 &nbsp; Golden Hour</span><span>02 &nbsp; Sweet Disposition</span><span>03 &nbsp; Space Song</span><div className={styles.waveform}>▂ ▅ ▃ ▇ ▄ ▆ ▂ ▅ ▇ ▃ ▄ ▆ ▂ ▇ ▅</div></div>
        </>}
        {kind === "commerce" && <>
          <div className={styles.shopSidebar}><b>S /</b><span>Discover</span><span>Collections</span><span>For you</span></div>
          <div className={styles.shopGrid}><small>INDEPENDENT GOODS / 2025</small><strong>Goods with<br />a point of view.</strong><div className={styles.products}><i /><i /><i /></div></div>
        </>}
        {kind === "food" && <>
          <div className={styles.recipeHero}><small>FIND YOUR NEXT FAVOURITE</small><strong>Something<br />good is cooking.</strong><span>Search recipes, ingredients, or moods…</span></div>
          <div className={styles.recipeTiles}><i /><i /><i /></div>
        </>}
        {kind === "community" && <>
          <div className={styles.communityHead}><small>SRM · ALUMNI NETWORK</small><strong>Better things<br />happen together.</strong><span>Find your people. Share what you know.</span></div>
          <div className={styles.communityCards}><i /><i /><i /><i /></div>
        </>}
      </div>
      <div className={styles.artGrain} />
    </div>
  );
}

function Cursor() {
  const cursor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (!finePointer || !cursor.current) return;
    const node = cursor.current;
    const move = (event: MouseEvent) => gsap.to(node, { x: event.clientX, y: event.clientY, duration: 0.18, ease: "power2.out", overwrite: true });
    const over = () => node.classList.add(styles.cursorActive);
    const out = () => node.classList.remove(styles.cursorActive);
    window.addEventListener("mousemove", move);
    document.querySelectorAll("a, button, [data-cursor]").forEach((target) => {
      target.addEventListener("mouseenter", over);
      target.addEventListener("mouseleave", out);
    });
    return () => {
      window.removeEventListener("mousemove", move);
      document.querySelectorAll("a, button, [data-cursor]").forEach((target) => {
        target.removeEventListener("mouseenter", over);
        target.removeEventListener("mouseleave", out);
      });
    };
  }, []);
  return <div className={styles.cursor} ref={cursor} aria-hidden="true" />;
}

export default function Portfolio() {
  const root = useRef<HTMLDivElement>(null);
  const preloader = useRef<HTMLDivElement>(null);
  const lenisInstance = useRef<import("lenis").default | null>(null);
  const [loading, setLoading] = useState(true);
  const [themeMode, setThemeMode] = useState<ThemeMode>("system");
  const [systemPrefersLight, setSystemPrefersLight] = useState(false);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const lightTheme = themeMode === "light" || (themeMode === "system" && systemPrefersLight);

  useLayoutEffect(() => {
    try {
      const savedMode = window.localStorage.getItem("portfolio-theme");
      if (savedMode === "light" || savedMode === "dark" || savedMode === "system") {
        setThemeMode(savedMode);
      }
    } catch {
      // Keep the system default when browser storage is unavailable.
    }
    const preference = window.matchMedia("(prefers-color-scheme: light)");
    setSystemPrefersLight(preference.matches);
  }, []);

  useLayoutEffect(() => {
    document.documentElement.dataset.portfolioTheme = lightTheme ? "light" : "dark";
    document.documentElement.style.colorScheme = lightTheme ? "light" : "dark";
  }, [lightTheme]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-color-scheme: light)");
    const updatePreference = () => setSystemPrefersLight(preference.matches);
    preference.addEventListener("change", updatePreference);
    return () => preference.removeEventListener("change", updatePreference);
  }, []);

  function selectTheme(mode: ThemeMode) {
    try {
      window.localStorage.setItem("portfolio-theme", mode);
    } catch {
      // Theme selection still works for the current page without storage.
    }
    setThemeMode(mode);
    setThemeMenuOpen(false);
  }

  function handleInPageNavigation(event: React.MouseEvent<HTMLDivElement>) {
    const source = event.target;
    if (!(source instanceof Element)) return;
    const anchor = source.closest<HTMLAnchorElement>('a[href^="#"]');
    const hash = anchor?.getAttribute("href");
    if (!hash || hash === "#") return;
    const destination = document.querySelector<HTMLElement>(hash);
    if (!destination) return;

    event.preventDefault();
    window.history.replaceState(null, "", hash);
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (lenisInstance.current && !reducedMotion) {
      lenisInstance.current.scrollTo(destination, {
        duration: 1.25,
        easing: (progress) => 1 - Math.pow(1 - progress, 4),
        offset: -100,
      });
    } else {
      destination.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: import("lenis").default | undefined;
    let raf: ((time: number) => void) | undefined;
    let ctx: gsap.Context | undefined;

    if (!reduceMotion) {
      void import("lenis").then(({ default: Lenis }) => {
        if (!root.current) return;
        lenis = new Lenis({ autoRaf: false, smoothWheel: true, lerp: 0.075 });
        lenisInstance.current = lenis;
        lenis.on("scroll", ScrollTrigger.update);
        raf = (time) => lenis?.raf(time * 1000);
        gsap.ticker.add(raf);
        gsap.ticker.lagSmoothing(0);
      });
    }

    if (preloader.current && !reduceMotion) {
      gsap.to(preloader.current, { yPercent: -105, duration: 0.85, delay: 0.65, ease: "power4.inOut", onComplete: () => setLoading(false) });
    } else {
      setLoading(false);
    }

    if (root.current && !reduceMotion) {
      ctx = gsap.context(() => {
        const heroVisual = root.current?.querySelector<HTMLElement>(`.${styles.heroVisual}`);
        if (heroVisual) {
          gsap.to(heroVisual, {
            yPercent: 10,
            ease: "none",
            scrollTrigger: { trigger: `.${styles.hero}`, start: "top top", end: "bottom top", scrub: true },
          });
        }
        gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
          gsap.fromTo(element, { autoAlpha: 0, y: 24 }, {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
            scrollTrigger: { trigger: element, start: "top 88%", once: true },
          });
        });
      }, root);
    }

    return () => {
      ctx?.revert();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      if (raf) gsap.ticker.remove(raf);
      lenis?.destroy();
      lenisInstance.current = null;
    };
  }, []);

  useEffect(() => {
    if (!selectedProject) return;
    const lenis = lenisInstance.current;
    const previousOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;
    lenis?.stop();
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const keydown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelectedProject(null); };
    window.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
      lenis?.start();
      window.removeEventListener("keydown", keydown);
    };
  }, [selectedProject]);

  return (
    <div id="top" className={`${styles.site} ${lightTheme ? styles.lightTheme : ""}`} data-theme={lightTheme ? "light" : "dark"} style={{ colorScheme: lightTheme ? "light" : "dark" }} ref={root} onClick={handleInPageNavigation}>
      <div className={styles.noise} aria-hidden="true" />
      <div className={styles.backgroundGrid} aria-hidden="true">
        <span className={styles.gridPatchOne} />
        <span className={styles.gridPatchTwo} />
        <span className={styles.gridPatchThree} />
        <span className={styles.gridPatchFour} />
        <span className={styles.gridPatchFive} />
      </div>
      <Cursor />
      {loading && <div ref={preloader} className={styles.preloader} aria-label="Loading portfolio">
          <span className={styles.preloaderMark}>DS<span>.</span></span>
          <div className={styles.bootText}><span>BOOT / PORTFOLIO</span><p>INITIALIZING MERN ENVIRONMENT<span>…</span></p><p>COMPILING LLM MODULES<span>…</span></p><div><i /></div></div>
          <span className={styles.bootIndex}>SYS 001 · READY</span>
        </div>}

      <header className={styles.nav}>
        <a href="#top" className={styles.wordmark} aria-label="Deepanshu Sharma home">D<span>/</span>S</a>
        <nav aria-label="Main navigation">
          <a href="#work">Projects <span>01</span></a>
          <a href="#capabilities">Skills <span>02</span></a>
          <a href="#background">Background <span>03</span></a>
          <a href="#contact">Open to what’s next <span>04</span></a>
        </nav>
        <div className={styles.themeSwitcher} data-open={themeMenuOpen} onMouseEnter={() => setThemeMenuOpen(true)} onMouseLeave={() => setThemeMenuOpen(false)}>
          <button type="button" className={styles.navContact} onClick={() => setThemeMenuOpen((open) => !open)} aria-label={`Choose theme, currently ${themeMode}`} aria-haspopup="menu" aria-expanded={themeMenuOpen}>
            <span className={styles.themeIcon} aria-hidden="true">{themeMode === "system" ? "◐" : lightTheme ? "☼" : "☾"}</span>
          </button>
          <div className={styles.themeOptions} role="menu" aria-label="Choose color theme">
            {(["light", "dark", "system"] as const).map((mode) => (
              <button key={mode} type="button" role="menuitemradio" aria-checked={themeMode === mode} onClick={() => selectTheme(mode)}>
                <span>{mode[0].toUpperCase() + mode.slice(1)}</span><span aria-hidden="true">{themeMode === mode ? "✓" : ""}</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.liveDot} /> SEEKING INTERNSHIPS & PLACEMENTS <span className={styles.heroIndex}>SRM · SONIPAT</span></p>
            <p className={styles.heroKicker}>FINAL-YEAR B.TECH CSE · 2023 — 2027</p>
            <h1 id="hero-title" className={styles.heroTitle}>
              <span className={styles.heroTechLine}>
                <span className={styles.heroTechSource}>Deepanshu</span>
                <TechText
                  className={styles.heroTechCanvas}
                  text="Deepanshu"
                  fontWeight={600}
                  fontSize={150}
                  letterSpacing={-0.095}
                  align="left"
                  color="currentColor"
                  accentColor="currentColor"
                  reveal="letter"
                  dashLength={4}
                  dashGap={2}
                  specks={15}
                  intro="none"
                  introDuration={2}
                  clickKick
                  guides={false}
                />
              </span>
              <span className={`${styles.heroTechLine} ${styles.heroTechMuted}`}>
                <span className={styles.heroTechSource}>Sharma.</span>
                <TechText
                  className={styles.heroTechCanvas}
                  text="Sharma."
                  fontWeight={600}
                  fontSize={150}
                  letterSpacing={-0.095}
                  align="left"
                  color="currentColor"
                  accentColor="currentColor"
                  reveal="letter"
                  dashLength={4}
                  dashGap={2}
                  specks={15}
                  intro="none"
                  introDuration={2}
                  clickKick
                  guides={false}
                />
              </span>
            </h1>
            <p className={styles.roleLine}>Full Stack Developer <span>+</span> UI/UX Designer</p>
            <p className={styles.heroDescription}>I build end-to-end web products and bring generative AI into the experience — from the first interface to the systems behind it.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#work">Explore selected work <span>↓</span></a>
              <a className={styles.textAction} href="/resume.pdf" download>Download résumé <span>↗</span></a>
            </div>
            <div className={styles.heroProof}><span>CGPA <strong>9.25</strong> / 10</span><i /><span>SEMESTER TOPPER <strong>× 2</strong></span></div>
          </div>
          <div className={styles.heroVisual} aria-label="Decorative dithered image effect">
            <div className={styles.visualGrid} aria-hidden="true" />
            <div className={styles.orbWrap}>
              <DitherVeil
                className={styles.ditherVeil}
                src="https://images.unsplash.com/photo-1737071371043-761e02b1ef95?q=80&w=1400&auto=format&fit=crop"
                pattern="floyd"
                pixelSize={2}
                inkColor="#120f17"
                paperColor="#f4f1ea"
                revealRadius={200}
                softness={0.6}
                linger={1}
                removeBackground
              />
            </div>
            <div className={styles.coordinate}>FULL-STACK<br />GENERATIVE AI</div>
            <div className={styles.visualCaption}><span>BUILDING AT THE INTERSECTION</span><strong>of systems & feeling</strong></div>
            <div className={styles.visualCross}>+</div>
          </div>
          <a className={styles.scrollCue} href="#work"><span /> SCROLL TO EXPLORE</a>
        </section>

        <section className={styles.signalStrip} aria-label="Focus areas">
          <span>FULL-STACK SYSTEMS</span><i>✳</i><span>GENERATIVE AI</span><i>✳</i><span>HUMAN-CENTERED DESIGN</span><i>✳</i><span>FULL-STACK SYSTEMS</span>
        </section>

        <section id="work" className={styles.workSection} aria-labelledby="work-title">
          <div className={styles.sectionHeading} data-reveal>
            <div><p className={styles.sectionLabel}>01 / SELECTED WORK</p><h2 id="work-title">Ideas made<br /><em>interactive.</em></h2></div>
            <p className={styles.sectionAside}>A selection of products exploring intelligent systems, useful tools, and thoughtful digital experiences.</p>
          </div>
          <ScrollStack
            className={styles.projectStack}
            itemDistance={90}
            itemStackDistance={28}
            stackPosition="12%"
            itemScale={0.035}
            baseScale={0.84}
            dimAmount={0.16}
            holdDistance={260}
            smoothScroll={false}
            useWindowScroll
          >
            {projects.map((project, index) => (
              <ScrollStackItem key={project.id} itemClassName={styles.projectStackItem}>
                <motion.article layoutId={`project-${project.id}`} className={`${styles.projectCard} ${styles[`project_${project.kind}`]}`} data-reveal style={{ "--project-accent": project.accent, "--project-index": index } as React.CSSProperties}>
                  <div className={styles.projectCardFace}>
                    <div className={styles.projectCardBody}>
                      <div className={styles.projectMeta}>
                        <h3>{project.name}</h3>
                        <span className={styles.projectCategory}>{project.category}</span>
                        <p className={styles.projectDescription}>{project.summary}</p>
                        <div className={styles.stackHeading}>TECH STACK</div>
                        <div className={styles.stackList}>{project.stack.map((stack) => <span key={stack}>{stack}</span>)}</div>
                      </div>
                      <nav className={styles.cardLinks} aria-label={`${project.name} links`}>
                        {project.availableLinks?.filter((item) => item.label.toLowerCase().includes("live")).map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer">Live ↗</a>)}
                        <a href={project.availableLinks?.find((item) => item.label.toLowerCase().includes("github"))?.href ?? links.github} target="_blank" rel="noreferrer">GitHub{project.availableLinks?.some((item) => item.label.toLowerCase().includes("github")) ? " ↗" : " profile ↗"}</a>
                      </nav>
                    </div>
                    <button type="button" className={styles.projectDetailsButton} onClick={() => setSelectedProject(project)}>
                      <span>View project details</span><span aria-hidden="true">↗</span>
                    </button>
                  </div>
                </motion.article>
              </ScrollStackItem>
            ))}
          </ScrollStack>
          <p className={styles.projectFootnote}><span>↗</span> Open a project for its full case study. Project-specific links can be added when supplied.</p>
        </section>

        <section id="capabilities" className={styles.capabilitiesSection} aria-labelledby="capabilities-title">
          <div className={styles.skillsHeading} data-reveal>
            <h2 id="capabilities-title">Skills</h2>
          </div>
          <div className={styles.skillGrid}>
            {skillGroups.map((group) => <article key={group.title} className={styles.skillCard} data-reveal>
              <h3>{group.title}</h3>
              <div className={styles.skillTags}>{group.skills.map((skill) => <SkillIcon key={skill} skill={skill} />)}</div>
            </article>)}
          </div>
        </section>

        <section id="background" className={styles.backgroundSection} aria-labelledby="background-title">
          <div className={styles.sectionHeading} data-reveal>
            <div><p className={styles.sectionLabel}>03 / FOUNDATION</p><h2 id="background-title">Learning with<br /><em>intention.</em></h2></div>
            <p className={styles.sectionAside}>Strong academic fundamentals, paired with the curiosity to keep building beyond the classroom.</p>
          </div>
          <div className={styles.educationCard} data-reveal>
            <div className={styles.eduIndex}>EDUCATION<br />01 — 01</div>
            <div className={styles.eduDetails}><span>2023 — 2027 · SONIPAT, INDIA</span><h3>SRM University</h3><p>B.Tech in Computer Science and Engineering</p><span className={styles.eduBadge}>FINAL YEAR</span></div>
            <div className={styles.cgpa}><span>CGPA</span><strong>9.25</strong><small>/ 10</small></div>
          </div>
          <div className={styles.achievementRow} data-reveal>
            <div><span>ACADEMIC DISTINCTION</span><strong>Semester topper <i>× 2</i></strong><small>Recent SGPAs: 9.68 &amp; 9.72</small></div>
            <div><span>SCHOOL · 2022</span><strong>Class XII <i>91.6%</i></strong><small>Delhi Public School</small></div>
            <div><span>SCHOOL · 2020</span><strong>Class X <i>91.2%</i></strong><small>Delhi Public School</small></div>
          </div>
        </section>

        <section id="contact" className={styles.contactSection} aria-labelledby="contact-title">
          <div className={styles.contactOrbit} aria-hidden="true" />
          <p className={styles.sectionLabel}>04 / OPEN TO WHAT’S NEXT</p>
          <h2 id="contact-title">Good work<br />starts with <em>a hello.</em></h2>
          <a className={styles.contactEmail} href={links.email}>deepanshusharma040@gmail.com <span>↗</span></a>
          <div className={styles.contactLinks}>
            <a href={links.linkedin} target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a>
            <a href={links.github} target="_blank" rel="noreferrer">GitHub <span>↗</span></a>
            <a href={links.leetcode} target="_blank" rel="noreferrer">LeetCode <span>↗</span></a>
            <a href="tel:+919319276626">Phone <span>↗</span></a>
            <a href="/resume.pdf" download>Résumé PDF <span>↓</span></a>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={styles.footerSocials} aria-label="Social links">
          <a href={links.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn"><ContactIcon name="linkedin" /></a>
          <a href={links.github} target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub"><ContactIcon name="github" /></a>
          <a href={links.leetcode} target="_blank" rel="noreferrer" title="LeetCode" aria-label="LeetCode"><ContactIcon name="leetcode" /></a>
        </div>
        <div className={styles.footerName} aria-hidden="true">DEEPANSHU</div>
        <div className={styles.footerBottom}>
          <span>© {new Date().getFullYear()} Deepanshu Sharma</span>
          <a href="#top">Back to top <span aria-hidden="true">↑</span></a>
        </div>
      </footer>

      <div className={styles.fastTrack} aria-label="Recruiter quick links">
        <a href="/resume.pdf" download title="Download résumé" aria-label="Download résumé">CV <ContactIcon name="download" /></a>
        <a href={links.github} target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub"><ContactIcon name="github" /></a>
        <a href={links.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn"><ContactIcon name="linkedin" /></a>
        <a href={links.leetcode} target="_blank" rel="noreferrer" title="LeetCode" aria-label="LeetCode"><ContactIcon name="leetcode" /></a>
      </div>

      <AnimatePresence>
        {selectedProject && <motion.div className={styles.modalBackdrop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}>
          <motion.section layoutId={`project-${selectedProject.id}`} className={styles.projectModal} role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}>
            <button type="button" className={styles.modalClose} onClick={() => setSelectedProject(null)} aria-label="Close project details">× <span>CLOSE</span></button>
            <div className={styles.modalFace} data-lenis-prevent>
              <div className={styles.modalContent}>
                <span className={styles.sectionLabel}>{selectedProject.number} / {selectedProject.category}</span>
                <h2 id="modal-title">{selectedProject.name}<span>.</span></h2>
                <div className={styles.modalNarrative}>
                  <section className={styles.modalDetail}><h3>What it is</h3><p>{selectedProject.summary}</p></section>
                  <section className={styles.modalDetail}><h3>Problem it solves</h3><p>{selectedProject.problem}</p></section>
                  <section className={`${styles.modalDetail} ${styles.modalDetailWide}`}><h3>How implemented</h3><p>{selectedProject.solution}</p><p>{selectedProject.detail}</p></section>
                </div>
                <section className={styles.modalStackSection}><h3>Tech stack</h3><div className={styles.modalStacks}>{selectedProject.stack.map((stack) => <span key={stack}>{stack}</span>)}</div></section>
                <div className={styles.modalLinks}>
                  <a href={links.github} target="_blank" rel="noreferrer">GitHub profile ↗</a>
                  {selectedProject.availableLinks?.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer">{item.label} ↗</a>)}
                </div>
                {!selectedProject.availableLinks?.some((item) => item.label.toLowerCase().includes("live")) && <p className={styles.linksPending}>Project-specific repository and live URLs are not included yet.</p>}
              </div>
            </div>
          </motion.section>
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}
