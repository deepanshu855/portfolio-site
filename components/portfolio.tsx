"use client";

import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { links, projects, Project, skillGroups } from "@/lib/portfolio-data";
import ChatWidget from "./chat-widget";
import styles from "./portfolio.module.scss";

const skillMarks: Record<string, { mark: string; color: string }> = {
  React: { mark: "⚛", color: "#61dafb" }, "Next.js": { mark: "N", color: "#f5f5f5" }, TypeScript: { mark: "TS", color: "#5ca5ec" },
  "Node.js": { mark: "JS", color: "#8cc84b" }, Express: { mark: "Ex", color: "#eeeeee" }, "REST APIs": { mark: "⇄", color: "#93a5ff" },
  "Socket.IO": { mark: "◉", color: "#eeeeee" }, Redis: { mark: "◆", color: "#ff625e" }, MongoDB: { mark: "M", color: "#58bd83" }, MySQL: { mark: "▤", color: "#4c9bd6" },
  "LLM integration": { mark: "✳", color: "#bd9cff" }, RAG: { mark: "⌕", color: "#bd9cff" }, "AI agents": { mark: "✧", color: "#bd9cff" }, LangChain: { mark: "LC", color: "#82d5a6" },
  LangGraph: { mark: "LG", color: "#82d5a6" }, "Mistral AI": { mark: "M", color: "#ff9b62" }, "Prompt engineering": { mark: "⌘", color: "#bd9cff" },
  "AWS · ECS / ECR / S3": { mark: "☁", color: "#ffb84d" }, Docker: { mark: "▰", color: "#63b9ec" }, "Docker Compose": { mark: "▰", color: "#63b9ec" },
  Kubernetes: { mark: "⎈", color: "#6c9eff" }, Skaffold: { mark: "S", color: "#fc6d74" }, "CI/CD": { mark: "↗", color: "#a8d88a" },
  Figma: { mark: "◉", color: "#f58b72" }, Wireframing: { mark: "⌗", color: "#f58b72" }, Prototyping: { mark: "◇", color: "#f58b72" },
  "Tailwind CSS": { mark: "≈", color: "#55c6d9" }, Sass: { mark: "S", color: "#e58ab2" }, DSA: { mark: "⌘", color: "#f2c76e" }, OOP: { mark: "◫", color: "#f2c76e" }, "System design basics": { mark: "⌘", color: "#f2c76e" },
};

function SkillIcon({ skill }: { skill: string }) {
  const icon = skillMarks[skill] ?? { mark: "•", color: "#88f0dc" };
  return <span className={styles.skillItem}>
    <span className={styles.skillIcon} style={{ "--skill-color": icon.color } as React.CSSProperties} aria-hidden="true">{icon.mark}</span>
    <span>{skill}</span>
  </span>;
}

const HeroScene = dynamic(() => import("./hero-scene"), {
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
  const [lightTheme, setLightTheme] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showScene, setShowScene] = useState(false);

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
        offset: -18,
      });
    } else {
      destination.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
    }
  }

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const smallScreen = window.matchMedia("(max-width: 760px)").matches;
    setShowScene(!reduceMotion && !smallScreen);

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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const keydown = (event: KeyboardEvent) => { if (event.key === "Escape") setSelectedProject(null); };
    window.addEventListener("keydown", keydown);
    return () => {
      document.body.style.overflow = previousOverflow;
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
        <button type="button" className={styles.navContact} onClick={() => setLightTheme((isLight) => !isLight)} aria-label={`Switch to ${lightTheme ? "dark" : "light"} theme`} aria-pressed={lightTheme}>
          <span className={styles.themeIcon} aria-hidden="true">{lightTheme ? "☾" : "☼"}</span>{lightTheme ? "Dark theme" : "Light theme"}
        </button>
      </header>

      <main>
        <section className={styles.hero} aria-labelledby="hero-title">
          <div className={styles.heroCopy}>
            <p className={styles.eyebrow}><span className={styles.liveDot} /> SEEKING INTERNSHIPS & PLACEMENTS <span className={styles.heroIndex}>SRM · SONIPAT</span></p>
            <p className={styles.heroKicker}>FINAL-YEAR B.TECH CSE · 2023 — 2027</p>
            <h1 id="hero-title">Deepanshu<br /><em>Sharma</em><span className={styles.heroPeriod}>.</span></h1>
            <p className={styles.roleLine}>Full Stack Developer <span>+</span> UI/UX Designer</p>
            <p className={styles.heroDescription}>I build end-to-end web products and bring generative AI into the experience — from the first interface to the systems behind it.</p>
            <div className={styles.heroActions}>
              <a className={styles.primaryAction} href="#work">Explore selected work <span>↓</span></a>
              <a className={styles.textAction} href="/resume.pdf" download>Download résumé <span>↗</span></a>
            </div>
            <div className={styles.heroProof}><span>CGPA <strong>9.25</strong> / 10</span><i /><span>SEMESTER TOPPER <strong>× 2</strong></span></div>
          </div>
          <div className={styles.heroVisual} aria-label="Decorative 3D signal orb">
            <div className={styles.visualGrid} aria-hidden="true" />
            <div className={styles.orbWrap}>{showScene ? <HeroScene lightTheme={lightTheme} /> : <div className={styles.orbFallback} aria-hidden="true" />}</div>
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
          <div className={styles.projectGrid}>
            {projects.map((project, index) => (
              <motion.article key={project.id} layoutId={`project-${project.id}`} className={`${styles.projectCard} ${styles[`project_${project.kind}`]}`} data-reveal style={{ "--project-accent": project.accent, "--project-index": index } as React.CSSProperties}>
                <button type="button" className={styles.projectOpen} onClick={() => setSelectedProject(project)} aria-label={`View ${project.name} project details`}>
                  <div className={styles.projectImage}><ProjectArtwork kind={project.kind} /><span className={styles.openIcon}>↗</span></div>
                  <div className={styles.projectMeta}>
                    <span>{project.number} <i>/</i> {project.category}</span><h3>{project.name}</h3>
                    <div className={styles.projectNarrative}>
                      <p><strong>PROBLEM SPACE</strong>{project.problem}</p>
                      <p><strong>WHAT I BUILT</strong>{project.solution}</p>
                    </div>
                    <div className={styles.stackHeading}>TECH STACK</div>
                    <div className={styles.stackList}>{project.stack.map((stack) => <span key={stack}>{stack}</span>)}</div>
                  </div>
                </button>
                <div className={styles.cardLinks}>
                  <a href={project.availableLinks?.find((item) => item.label.toLowerCase().includes("github"))?.href ?? links.github} target="_blank" rel="noreferrer">GitHub{project.availableLinks?.some((item) => item.label.toLowerCase().includes("github")) ? " ↗" : " profile ↗"}</a>
                  {project.availableLinks?.filter((item) => item.label.toLowerCase().includes("live")).map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer">Live ↗</a>)}
                </div>
              </motion.article>
            ))}
          </div>
          <p className={styles.projectFootnote}><span>↗</span> Select a project to explore the details. Landing-page screenshots and project-specific links can be added when supplied.</p>
        </section>

        <section id="capabilities" className={styles.capabilitiesSection} aria-labelledby="capabilities-title">
          <div className={styles.sectionHeading} data-reveal>
            <div><p className={styles.sectionLabel}>02 / CAPABILITIES</p><h2 id="capabilities-title">From idea<br />to <em>interface.</em></h2></div>
            <p className={styles.sectionAside}>A practical toolkit across product engineering, AI integration, cloud fundamentals, and interface design.</p>
          </div>
          <div className={styles.skillGrid}>
            {skillGroups.map((group) => <article key={group.index} className={`${styles.skillCard} ${styles[`skill_${group.className}`]}`} data-reveal>
              <span className={styles.skillIndex}>{group.index} / SKILL SET</span><h3>{group.title}</h3><p>{group.description}</p>
              <div className={styles.skillTags}>{group.skills.map((skill) => <SkillIcon key={skill} skill={skill} />)}</div>
              <span className={styles.skillGlyph} aria-hidden="true">{group.index === "01" ? "⌘" : group.index === "02" ? "✳" : group.index === "03" ? "⌁" : "◫"}</span>
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

      <footer className={styles.footer}><a href="#top" className={styles.wordmark}>D<span>/</span>S</a><span>DESIGNED &amp; BUILT BY DEEPANSHU SHARMA</span><span>© {new Date().getFullYear()} · ALL SYSTEMS NOMINAL</span></footer>

      <div className={styles.fastTrack} aria-label="Recruiter quick links">
        <a href="/resume.pdf" download title="Download résumé" aria-label="Download résumé">CV <span>↓</span></a>
        <a href={links.github} target="_blank" rel="noreferrer" title="GitHub" aria-label="GitHub">GH <span>↗</span></a>
        <a href={links.linkedin} target="_blank" rel="noreferrer" title="LinkedIn" aria-label="LinkedIn">IN <span>↗</span></a>
        <a href={links.leetcode} target="_blank" rel="noreferrer" title="LeetCode" aria-label="LeetCode">LC <span>↗</span></a>
      </div>
      <ChatWidget />

      <AnimatePresence>
        {selectedProject && <motion.div className={styles.modalBackdrop} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSelectedProject(null)}>
          <motion.section layoutId={`project-${selectedProject.id}`} className={styles.projectModal} role="dialog" aria-modal="true" aria-labelledby="modal-title" onClick={(event) => event.stopPropagation()}>
            <button type="button" className={styles.modalClose} onClick={() => setSelectedProject(null)} aria-label="Close project details">× <span>CLOSE</span></button>
            <div className={styles.modalArtwork}><ProjectArtwork kind={selectedProject.kind} /><div className={styles.modalImageNote}>PROJECT SCREENSHOT<br /><span>PLACEHOLDER · REPLACE WHEN PROVIDED</span></div></div>
            <div className={styles.modalContent}><span className={styles.sectionLabel}>{selectedProject.number} / {selectedProject.category}</span><h2 id="modal-title">{selectedProject.name}<span>.</span></h2>
              <div className={styles.modalNarrative}><h3>PROBLEM SPACE</h3><p>{selectedProject.problem}</p><h3>WHAT IT DOES</h3><p>{selectedProject.solution}</p><h3>IMPLEMENTATION</h3><p>{selectedProject.detail}</p></div>
              <h3>TECH STACK</h3><div className={styles.modalStacks}>{selectedProject.stack.map((stack) => <span key={stack}>{stack}</span>)}</div>
              <div className={styles.modalLinks}>
                <a href={links.github} target="_blank" rel="noreferrer">GitHub profile ↗</a>
                {selectedProject.availableLinks?.map((item) => <a key={item.label} href={item.href} target="_blank" rel="noreferrer">{item.label} ↗</a>)}
              </div>
              {!selectedProject.availableLinks?.some((item) => item.label.toLowerCase().includes("live")) && <p className={styles.linksPending}>Project-specific repository and live URLs are not included yet.</p>}
            </div>
          </motion.section>
        </motion.div>}
      </AnimatePresence>
    </div>
  );
}
