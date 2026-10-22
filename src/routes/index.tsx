import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUpRight, Download, Mail, Phone } from "lucide-react";
import {
  linkedInUrl,
  certifications,
  education,
  excelProjectDownloadUrl,
  languages,
  powerBiProject,
  resumeViewUrl,
  skillGroups,
} from "@/lib/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Sai Prasath D P | Commerce & Business Reporting" },
      {
        name: "description",
        content:
          "Sai Prasath D P, B.Com graduate and commerce graduate in Bengaluru. Explore Excel financial modeling and Power BI projects.",
      },
    ],
  }),
  component: Portfolio,
});

function Portfolio() {
  const clicks = useRef(0);
  const [burst, setBurst] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const burstTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const triggerEgg = () => {
    clicks.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);
    clickTimer.current = setTimeout(() => {
      clicks.current = 0;
    }, 1800);
    if (clicks.current < 5) return;
    clicks.current = 0;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setBurst((value) => value + 1);
    if (burstTimer.current) clearTimeout(burstTimer.current);
    burstTimer.current = setTimeout(() => setBurst(0), 2400);
  };
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const el = entry.target as HTMLElement;
          if (!reduced.matches) {
            const delay = Number(el.dataset["motionDelay"] || 0);
            el.animate(
              [
                { opacity: 0.15, transform: "translateY(28px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 750, delay, easing: "cubic-bezier(.16,1,.3,1)" },
            );
          }
          el.classList.add("scroll-seen");
          observer.unobserve(el);
        }
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(
        ".section h2, .about-layout p, .language-list > span, .timeline article, .credentials details, .contact-content, .section > .eyebrow, .project-workspace, .toolkit-layout, .timeline",
      )
      .forEach((el, i) => {
        (el as HTMLElement).dataset["motionDelay"] = String((i % 3) * 75);
        observer.observe(el);
      });
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        document.documentElement.style.setProperty(
          "--page-scroll",
          `${Math.min(window.scrollY * 0.06, 45)}px`,
        );
        setScrollProgress(max > 0 ? window.scrollY / max : 0);
      });
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      if (burstTimer.current) clearTimeout(burstTimer.current);
      if (clickTimer.current) clearTimeout(clickTimer.current);
    };
  }, []);

  const [project, setProject] = useState(0);
  const [skill, setSkill] = useState(0);

  return (
    <div className="portfolio">
      <div
        className="reading-progress"
        style={{ transform: `scaleX(${scrollProgress})` }}
        aria-hidden="true"
      />
      {burst > 0 && (
        <div className="egg-burst" key={burst} aria-hidden="true">
          {Array.from({ length: 32 }, (_, i) => (
            <i
              key={i}
              style={
                {
                  "--x": `${Math.cos(i * 2.399) * (120 + i * 10)}px`,
                  "--y": `${Math.sin(i * 2.399) * (120 + i * 10)}px`,
                  "--r": `${i * 43}deg`,
                  "--c": ["#b83b19", "#ffd45b", "#241526", "#ffac86"][i % 4],
                  animationDelay: `${(i % 5) * 35}ms`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}

      <a className="skip" href="#main">
        Skip to content
      </a>
      <header className="masthead">
        <a className="wordmark" href="#top" onClick={triggerEgg}>
          Sai Prasath D P
        </a>
        <nav aria-label="Primary">
          <a href="#about">About</a>
          <a href="#work">Work</a>
          <a href="#toolkit">Toolkit</a>
          <a href="#journey">Journey</a>
          <a href="#contact">Say hello ↗</a>
        </nav>
      </header>
      <main id="main">
        <section className="hero" id="top">
          <svg className="hero-motion-art" viewBox="0 0 240 240" aria-hidden="true">
            <circle className="art-orbit" cx="120" cy="120" r="97" />
            <path
              className="art-loop"
              d="M30 125C30 30 205 25 205 120S45 220 45 110S210 45 210 130"
            />
            <circle className="art-dot" cx="120" cy="23" r="7" />
          </svg>
          <div className="hero-label">
            <span>HELLO, I’M</span>
            <span>BENGALURU, INDIA</span>
          </div>
          <h1 className="horizontal-name" aria-label="Sai Prasath D P">
            <span className="name-letters" aria-hidden="true">
              {Array.from("Sai Prasath D P").map((letter, i) => (
                <span
                  className={letter === " " ? "name-space" : "name-letter"}
                  key={i}
                  style={{ "--letter-index": i } as CSSProperties}
                >
                  {letter === " " ? " " : letter}
                </span>
              ))}
            </span>
          </h1>
          <div className="hero-bottom">
            <p className="role">
              B.Com graduate.
              <br />
              Excel & Power BI.
            </p>
            <div className="hero-intro">
              <p>
                A curious commerce graduate finding my way through data, practical projects and
                continuous learning.
              </p>
              <div className="actions">
                <a className="button" href="#about">
                  Get to know me <ArrowDown size={17} />
                </a>
                <a
                  className="text-link"
                  href={linkedInUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn <ArrowUpRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>
        <section className="about section" id="about">
          <p className="eyebrow">01 / THE PERSON BEHIND THE PROJECTS</p>
          <div className="about-layout">
            <h2>
              A little
              <br />
              <em>about me.</em>
            </h2>
            <div>
              <p className="about-lead">
                I’m Sai, a B.Com graduate based in Bengaluru, developing practical skills in
                business reporting.
              </p>
              <p>
                My commerce education gave me a foundation in finance and accounting. Working with
                Excel and Power BI has helped me put that knowledge into practice through financial
                analysis, models and reports.
              </p>
              <p>
                I’m looking for an entry-level role where I can contribute, learn from a team and
                keep developing my analytical skills. I’m currently building practical skills in SQL
                and Python.
              </p>
              <a className="text-link" href={resumeViewUrl} target="_blank" rel="noreferrer">
                Read my current resume <ArrowUpRight size={16} />
              </a>
              <div className="language-list">
                {languages.map(([name, level]) => (
                  <span key={name}>
                    <strong>{name}</strong>
                    {level}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section id="work" className="work section">
          <div className="section-heading">
            <p className="eyebrow">02 / SELECTED WORK</p>
            <h2>
              Project
              <br />
              <em>gallery.</em>
            </h2>
            <p>
              Two independent academic projects.
              <br />A closer look at how I work with financial data.
            </p>
          </div>
          <div className="project-workspace">
            <div className="project-tabs" aria-label="Choose project">
              {["Excel forecasting model", "Power BI dashboard"].map((name, i) => (
                <button aria-pressed={project === i} key={name} onClick={() => setProject(i)}>
                  <span>0{i + 1}</span>
                  {name}
                  <ArrowUpRight size={18} />
                </button>
              ))}
            </div>
            <article className="project-sheet" key={project}>
              <div className="project-summary">
                <p className="eyebrow">TCS / INDEPENDENT ACADEMIC PROJECT</p>
                <h3>
                  {project === 0 ? "Financial Analysis & Forecasting Model" : powerBiProject.title}
                </h3>
                <p>
                  {project === 0
                    ? "A six-sheet Excel model covering eight years of TCS actuals (FY2018–FY2025), with Base, Bull and Bear forecasts through FY2028."
                    : powerBiProject.intro}
                </p>
                <div className="project-stat">
                  <strong>{project === 0 ? "06" : "04"}</strong>
                  <span>{project === 0 ? "connected Excel sheets" : "Power BI report pages"}</span>
                </div>
                <a
                  className="button dark"
                  href={project === 0 ? excelProjectDownloadUrl : powerBiProject.downloadUrl}
                  download
                >
                  <Download size={17} />
                  {project === 0 ? "Download Excel model" : "Download PBIP source"}
                </a>
                {project === 0 && (
                  <a
                    className="text-link"
                    href="https://saitcsproject1.netlify.app/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Explore project website <ArrowUpRight size={16} />
                  </a>
                )}
              </div>
              <div className="project-inside">
                <p className="eyebrow">WHAT I WORKED ON</p>
                {project === 0 ? (
                  <>
                    <p>
                      Connecting historical financial statements to a linked, scenario-based
                      forecast.
                    </p>
                    <details>
                      <summary>
                        Read project details <span>+</span>
                      </summary>
                      <ul>
                        <li>
                          Income statement, margins, EPS, CAGR and free cash flow analytics in INR
                          Crores.
                        </li>
                        <li>
                          Forecasts linked to an assumptions panel, with a custom growth-rate
                          override.
                        </li>
                        <li>
                          Net profit derived from EBITDA, EBIT and tax; free cash flow projected
                          from profit, depreciation and capex.
                        </li>
                        <li>
                          11 automated workbook validation checks, reported passing in the source
                          portfolio.
                        </li>
                      </ul>
                      <p>Source: TCS Annual Reports FY18–FY25.</p>
                    </details>
                  </>
                ) : (
                  <>
                    {powerBiProject.facts.map(([label, text]) => (
                      <details key={label}>
                        <summary>
                          {label}
                          <span>+</span>
                        </summary>
                        <p>{text}</p>
                      </details>
                    ))}
                    <p className="download-note">{powerBiProject.downloadNote}</p>
                  </>
                )}
              </div>
            </article>
          </div>
        </section>
        <section id="toolkit" className="toolkit section">
          <div className="section-heading">
            <p className="eyebrow">03 / TOOLS & FOUNDATIONS</p>
            <h2>
              Skills in
              <br />
              <em>practice.</em>
            </h2>
          </div>
          <div className="toolkit-layout">
            <div className="skill-switch" aria-label="Select skill area">
              {skillGroups.map((group, i) => (
                <button aria-pressed={skill === i} onClick={() => setSkill(i)} key={group.title}>
                  <span>0{i + 1}</span>
                  {group.title}
                  <ArrowUpRight />
                </button>
              ))}
              <p className="learning-note">
                <strong>Currently learning</strong>
                <br />
                SQL + Python
                <br />
                <span>Building practical skills for business reporting.</span>
              </p>
            </div>
            <div className="skill-page" key={skill}>
              <p className="eyebrow">EXPLORE THE TOOLKIT</p>
              <h3>{skillGroups[skill]!.title}</h3>
              <div className="skill-items">
                {skillGroups[skill]!.items.map((item, i) => (
                  <span style={{ animationDelay: `${i * 40}ms` }} key={item}>
                    {item}
                  </span>
                ))}
              </div>
              <p>{skillGroups[skill]!.detail}</p>
            </div>
          </div>
        </section>
        <section id="journey" className="journey section">
          <div className="section-heading">
            <p className="eyebrow">04 / THE FOUNDATION</p>
            <h2>
              Education &amp;
              <br />
              <em>training.</em>
            </h2>
            <p>
              I’m looking for an entry-level opportunity to apply my commerce background to
              analysis, visualization and reporting.
            </p>
          </div>
          <div className="journey-content">
            <div className="timeline">
              {education.map((item) => (
                <article key={item.title}>
                  <time>{item.period}</time>
                  <h3>{item.title}</h3>
                  <p>{item.institution}</p>
                  {item.result && <strong>{item.result}</strong>}
                  {item.status && <span className="education-status">{item.status}</span>}
                  {item.detail && <p>{item.detail}</p>}
                </article>
              ))}
            </div>
            <div className="credentials">
              <h3>Courses & certifications</h3>
              {certifications.map((cert) => (
                <details key={cert.title}>
                  <summary>
                    <span>
                      <small>
                        {cert.provider}
                        {cert.status ? ` / ${cert.status}` : ""}
                      </small>
                      {cert.title}
                    </span>
                    <b>+</b>
                  </summary>
                  <ul>
                    {cert.courses.map(([title, score]) => (
                      <li key={title}>
                        {title}
                        <strong>{score}</strong>
                      </li>
                    ))}
                  </ul>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section id="contact" className="contact section">
          <div>
            <p className="eyebrow">05 / OPEN TO ENTRY-LEVEL OPPORTUNITIES</p>
            <h2>
              Have an
              <br />
              <em>opportunity?</em>
            </h2>
            <p className="contact-intro">I’d love to hear about it.</p>
            <div className="contact-art" aria-hidden="true">
              <i />
              <i />
              <i />
              <span className="contact-wave">
                <b />
                <b />
                <b />
                <b />
                <b />
              </span>
            </div>
          </div>
          <div className="contact-content">
            <p>
              Business Reporting · Business Analytics · Finance Analytics · MIS / Reporting ·
              Financial Analysis · Finance / Accounting
            </p>
            <a href="mailto:saiprasathdp@gmail.com">
              <Mail size={20} />
              <span>saiprasathdp@gmail.com</span>
              <ArrowUpRight />
            </a>
            <a href="tel:+919380721853">
              <Phone size={20} />
              <span>+91 93807 21853</span>
              <ArrowUpRight />
            </a>
            <a href={resumeViewUrl} target="_blank" rel="noreferrer">
              <Download size={20} />
              <span>View current resume</span>
              <ArrowUpRight />
            </a>
            <a href={linkedInUrl} target="_blank" rel="noopener noreferrer">
              <span>LinkedIn · Sai Prasath D P</span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <p className="contact-location">Based in Bengaluru, India.</p>
          </div>
        </section>
      </main>
      <footer>
        <div className="footer-signature">
          Sai Prasath D P<span>Bengaluru, India</span>
        </div>
        <a className="footer-top" href="#top">
          Back to top <ArrowUpRight size={18} />
        </a>
        <div className="footer-bottom">
          <span>© 2026 Sai Prasath D P</span>
          <span>Thanks for stopping by.</span>
        </div>
      </footer>
    </div>
  );
}
