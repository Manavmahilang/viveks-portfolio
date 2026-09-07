/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type PointerEvent } from "react";

type Skill = {
  name: string;
  short: string;
  level: number;
  note: string;
};

type Project = {
  title: string;
  type: "reel" | "podcast";
  category: string;
  video: string;
  poster: string;
};

type Contact = {
  email: string;
  phoneDisplay: string;
  phoneLink: string;
  instagram: string;
  linkedin: string;
  location: string;
};

type PortfolioData = {
  name: string;
  role: string;
  availability: string;
  tagline: string;
  officeYears: string;
  freelanceYears: string;
  heroExperience: string;
  heroVideo: string;
  heroPoster: string;
  portrait: string;
  aboutHeadline: string;
  aboutParagraphs: string[];
  resumeUrl: string;
  showreelVideo: string;
  skills: Skill[];
  projects: Project[];
  contact: Contact;
};

const DATA: PortfolioData = {
  name: "Vivek",
  role: "VIDEO EDITOR",
  availability: "AVAILABLE FOR SELECT PROJECTS",
  tagline: "Short-form edits. Cinematic storytelling. Motion that earns attention.",
  officeYears: "2+",
  freelanceYears: "4+",
  heroExperience: "4+ YEARS",
  heroVideo: "/assets/hero-portfolio.mp4",
  heroPoster: "/assets/hero-poster.jpg",
  portrait: "/assets/my-photo.png",
  aboutHeadline: "I turn raw footage into stories people stop scrolling for.",
  aboutParagraphs: [
    "I’m a professional video editor focused on short-form content, social-first storytelling and high-retention visual pacing.",
    "My experience combines 2+ years working in an office environment with 4+ years of freelance editing, giving me both structured production discipline and the flexibility to adapt to different brands, formats and creative styles.",
    "I work across editing, motion graphics, visual design and AI-assisted video creation — from the first hook to the final export."
  ],
  resumeUrl:
    "https://docs.google.com/document/d/1GnNugoOL2NgF3ofaxOfHDQnLQpuENqeEawtvQUzjPJw/edit?usp=sharing",
  showreelVideo: "/assets/showreel.mp4",
  skills: [
    { name: "Adobe After Effects", short: "AE", level: 95, note: "Motion • Compositing • Typography" },
    { name: "Adobe Premiere Pro", short: "PR", level: 95, note: "Editing • Pacing • Audio • Delivery" },
    { name: "CapCut", short: "CC", level: 90, note: "Short-form • Social • Fast workflows" },
    { name: "Adobe Photoshop", short: "PS", level: 95, note: "Thumbnails • Assets • Cleanup" },
    { name: "AI Video Creation", short: "AI", level: 90, note: "Concepts • Prompts • Generative video" }
  ],
  projects: Array.from({ length: 8 }, (_, i) => ({
    title: `Reel ${String(i + 1).padStart(2, "0")}`,
    type: "reel",
    category: "Short-form",
    video: `/assets/reel-${String(i + 1).padStart(2, "0")}.mp4`,
    poster: `/assets/reel-${String(i + 1).padStart(2, "0")}.jpg`
  })),
  contact: {
    email: "fxvivekkumar@gmail.com",
    phoneDisplay: "+91 799119 4839",
    phoneLink: "+91799119 4839",
    instagram: "https://instagram.com/yourusername",
    linkedin: "https://www.linkedin.com/in/vivek-kumar-singh-455901240",
    location: "India • Available remotely"
  }
};

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showreelOpen, setShowreelOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [topbarVisible, setTopbarVisible] = useState(false);
  const glowRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () =>
      setTopbarVisible(window.scrollY > window.innerHeight * 0.55);

    const onPointerMove = (e: globalThis.PointerEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    document.querySelectorAll(".reveal, .skill").forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onPointerMove);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.classList.toggle("modal-open", showreelOpen || !!selectedProject);
    return () => document.body.classList.remove("modal-open");
  }, [showreelOpen, selectedProject]);

  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") {
        setShowreelOpen(false);
        setSelectedProject(null);
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  const modalVideo = selectedProject?.video || (showreelOpen ? DATA.showreelVideo : null);
  const modalTitle = selectedProject?.title || "Showreel";
  const modalType = selectedProject?.category || "SHOWREEL";

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <div className="cursor-glow" ref={glowRef} aria-hidden="true" />

      <header className={`topbar ${topbarVisible ? "visible" : ""}`}>
        <a className="brand" href="#home" aria-label="Back to home">
          <span className="brand-mark">▶</span>
          <span>{DATA.name}</span>
        </a>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Main navigation">
          {["about", "skills", "portfolio", "contact"].map((id) => (
            <a
              key={id}
              href={`#${id}`}
              className={id === "contact" ? "nav-hire" : ""}
              onClick={() => setMenuOpen(false)}
            >
              {id === "portfolio" ? "Work" : id === "contact" ? "Hire Me" : id[0].toUpperCase() + id.slice(1)}
            </a>
          ))}
        </nav>

        <button
          className="menu-btn"
          onClick={() => setMenuOpen((v) => !v)}
          aria-label="Open menu"
          aria-expanded={menuOpen}
        >
          ☰
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={DATA.heroPoster}
            src={DATA.heroVideo}
            onError={(e) => (e.currentTarget.style.display = "none")}
          />
          <div
            className="hero-fallback"
            style={{
              backgroundImage: `linear-gradient(180deg,rgba(0,0,0,.08),rgba(0,0,0,.45)), url('${DATA.heroPoster}')`
            }}
          />
          <div className="hero-vignette" />
          <div className="hero-grid" aria-hidden="true" />

          <div className="hero-content reveal">
            <div className="eyebrow">
              <span className="status-dot" />
              {DATA.availability}
            </div>
            <h1>
              <span>{DATA.name}</span>
              <span className="hero-role">{DATA.role}</span>
            </h1>
            <p className="hero-copy">{DATA.tagline}</p>
            <div className="hero-actions">
              <a href="#contact" className="btn btn-primary">Hire Me <span>↗</span></a>
              <a href="#portfolio" className="btn btn-secondary">View My Portfolio <span>↓</span></a>
            </div>
          </div>

          <div className="hero-meta">
            <div><span className="meta-label">EXPERIENCE</span><strong>{DATA.heroExperience}</strong></div>
            <div><span className="meta-label">FOCUS</span><strong>SHORT-FORM</strong></div>
            <div><span className="meta-label">STACK</span><strong>AE • PR • AI</strong></div>
          </div>

          <div className="scroll-cue"><span>SCROLL</span><i /></div>
        </section>

        <section className="section about" id="about">
          <div className="section-label reveal"><span>01</span> ABOUT</div>
          <div className="about-grid">
            <div className="portrait-wrap reveal">
              <div className="portrait-frame">
                <img
                  src={DATA.portrait}
                  alt="Portrait of the video editor"
                  onError={(e) => (e.currentTarget.style.opacity = "0")}
                />
                <div className="portrait-placeholder">
                  <span>YOUR PNG PHOTO</span>
                  <small>assets/my-photo.png</small>
                </div>
              </div>
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <div className="floating-chip chip-a">CUT</div>
              <div className="floating-chip chip-b">COLOR</div>
              <div className="floating-chip chip-c">MOTION</div>
            </div>

            <div className="about-copy reveal">
              <p className="kicker">WHO I AM</p>
              <h2>{DATA.aboutHeadline}</h2>
              <div className="about-text">
                {DATA.aboutParagraphs.map((p) => <p key={p}>{p}</p>)}
              </div>

              <div className="stats">
                <article><strong>{DATA.officeYears}</strong><span>Years<br />In-office</span></article>
                <article><strong>{DATA.freelanceYears}</strong><span>Years<br />Freelancing</span></article>
                <article><strong>9</strong><span>Featured<br />Projects</span></article>
              </div>

              <div className="about-actions">
                <a href={DATA.resumeUrl} className="text-link" target="_blank" rel="noreferrer">View Resume <span>↗</span></a>
                <a href="#contact" className="text-link">Start a Project <span>↗</span></a>
              </div>
            </div>
          </div>
        </section>

        <section className="showreel section" id="showreel">
          <div className="section-label reveal"><span>02</span> SHOWREEL</div>
          <div className="showreel-head reveal">
            <p className="kicker">SELECTED MOTION</p>
            <h2>60 seconds should be enough.</h2>
            <p>A compact look at pacing, motion design, sound, transitions, visual rhythm and storytelling.</p>
          </div>

          <button
            className="showreel-player reveal"
            type="button"
            aria-label="Play showreel"
            onClick={() => setShowreelOpen(true)}
          >
            <video
              muted
              loop
              playsInline
              autoPlay
              preload="metadata"
              src={DATA.showreelVideo}
              onLoadedData={(e) => e.currentTarget.play().catch(() => {})}
              onError={(e) => (e.currentTarget.style.display = "none")}
            />
            <div className="showreel-placeholder">
              <span>ADD SHOWREEL VIDEO</span>
              <small>assets/showreel.mp4</small>
            </div>
            <span className="play-disc"><b>▶</b></span>
            <span className="player-caption">PLAY SHOWREEL</span>
          </button>
        </section>

        <section className="section skills" id="skills">
          <div className="section-label reveal"><span>03</span> TOOLKIT</div>
          <div className="skills-layout">
            <div className="skills-copy reveal">
              <p className="kicker">EDITING STACK</p>
              <h2>Tools are only useful when the cut feels right.</h2>
              <p>These bars are intentionally easy to edit. Change the values in <strong>app/Portfolio.jsx</strong> and the website updates automatically.</p>

              <TiltCard>
                <div className="ai-icon">✦</div>
                <div>
                  <span>AI VIDEO</span>
                  <h3>Concept → Frames → Motion</h3>
                  <p>AI-assisted ideation, image generation, video generation, prompt design and creative workflows.</p>
                </div>
              </TiltCard>
            </div>

            <div className="skill-list reveal">
              {DATA.skills.map((skill) => (
                <article className="skill" style={{ "--skill": `${skill.level}%` } as CSSProperties} key={skill.name}>
                  <div className="skill-top">
                    <div className="skill-id">
                      <span className="skill-badge">{skill.short}</span>
                      <span className="skill-name"><strong>{skill.name}</strong><small>{skill.note}</small></span>
                    </div>
                    <div className="skill-level">{skill.level}<span>%</span></div>
                  </div>
                  <div className="skill-bar"><i /></div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section portfolio" id="portfolio">
          <div className="section-label reveal"><span>04</span> SELECTED WORK</div>
          <div className="portfolio-head reveal">
            <div>
              <p className="kicker">PORTFOLIO</p>
              <h2>Short-form first.<br />Story always.</h2>
            </div>
            <p>Eight of my strongest vertical edits. Click any project to open it in the full-screen player.</p>
          </div>

          <div className="filter-row reveal">
            <button className={`filter ${activeFilter === "all" ? "active" : ""}`} onClick={() => setActiveFilter("all")}>All</button>
            <button className={`filter ${activeFilter === "reel" ? "active" : ""}`} onClick={() => setActiveFilter("reel")}>Reels</button>
          </div>

          <div className="portfolio-grid">
            {DATA.projects
              .filter((p) => activeFilter === "all" || p.type === activeFilter)
              .map((project, i) => (
                <article
                  className="project reveal"
                  key={project.title}
                  tabIndex={0}
                  role="button"
                  aria-label={`Play ${project.title}`}
                  onClick={() => setSelectedProject(project)}
                  onKeyDown={(e: KeyboardEvent<HTMLElement>) => {
                    if (e.key === "Enter" || e.key === " ") setSelectedProject(project);
                  }}
                >
                  <div className="project-media">
                    <img src={project.poster} alt={`${project.title} thumbnail`} onError={(e) => (e.currentTarget.style.display = "none")} />
                    <div className="project-placeholder">
                      <span>9:16 REEL</span>
                      <small>{project.poster}</small>
                    </div>
                    <div className="project-overlay"><span className="project-index">{String(i + 1).padStart(2, "0")}</span></div>
                  </div>
                  <div className="project-info"><h3>{project.title}</h3><span>{project.category}</span></div>
                </article>
              ))}
          </div>
        </section>

        <section className="section contact" id="contact">
          <div className="contact-backdrop" aria-hidden="true">LET'S CUT</div>
          <div className="section-label reveal"><span>05</span> CONTACT</div>
          <div className="contact-grid">
            <div className="contact-main reveal">
              <p className="kicker">HAVE FOOTAGE?</p>
              <h2>Let’s turn it into something worth replaying.</h2>
              <a className="contact-email" href={`mailto:${DATA.contact.email}`}>
                {DATA.contact.email} <span>↗</span>
              </a>
            </div>
            <div className="contact-details reveal">
              <div className="contact-block">
                <span>PHONE</span>
                <a href={`tel:${DATA.contact.phoneLink}`}>{DATA.contact.phoneDisplay}</a>
              </div>
              <div className="contact-block">
                <span>SOCIALS</span>
                <a href={DATA.contact.instagram} target="_blank" rel="noreferrer">Instagram ↗</a>
                <a href={DATA.contact.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
              </div>
              <div className="contact-block">
                <span>LOCATION</span>
                <p>{DATA.contact.location}</p>
              </div>
            </div>
          </div>
          <footer>
            <span>{DATA.name} © {new Date().getFullYear()}</span>
            <a href="#home">Back to top ↑</a>
          </footer>
        </section>
      </main>

      {(showreelOpen || selectedProject) && (
        <div
          className="video-modal open"
          role="dialog"
          aria-modal="true"
          aria-hidden="false"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowreelOpen(false);
              setSelectedProject(null);
            }
          }}
        >
          <button
            className="modal-close"
            onClick={() => {
              setShowreelOpen(false);
              setSelectedProject(null);
            }}
            aria-label="Close video"
          >
            ×
          </button>
          <div className="modal-inner">
            <video src={modalVideo} controls autoPlay playsInline />
            <div className="modal-copy">
              <span>{modalType}</span>
              <h3>{modalTitle}</h3>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <div
      className="ai-card tilt-card"
      ref={ref}
      onPointerMove={(e: PointerEvent<HTMLDivElement>) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - 0.5;
        const y = (e.clientY - r.top) / r.height - 0.5;
        ref.current.style.transform =
          `perspective(850px) rotateY(${x * 7}deg) rotateX(${y * -7}deg) translateY(-2px)`;
      }}
      onPointerLeave={() => { if (ref.current) ref.current.style.transform = ""; }}
    >
      {children}
    </div>
  );
}
