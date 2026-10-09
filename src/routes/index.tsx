import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, BarChart3, Check, Download, FileSpreadsheet, Mail, MapPin, Menu, Phone, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { certifications, education, languages, resumeUrl, skillGroups } from '@/lib/portfolio';
import financeGlass from '@/assets/finance-glass.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Sai Prasath D P | B.Com Graduate & Aspiring Data Analyst' },
    { name: 'description', content: 'Bengaluru-based B.Com graduate with Excel, Power BI, finance and accounting skills. Explore Sai Prasath D P’s TCS financial forecasting case study, education and credentials.' },
    { property: 'og:title', content: 'Sai Prasath D P | Finance & Business Analytics' },
    { property: 'og:description', content: 'B.Com Graduate | Aspiring Data Analyst. Excel, Power BI and practical financial analysis — explore my portfolio and get in touch.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Portfolio,
});

function ResumeButton() {
  return <Button variant="glass" asChild><a href={resumeUrl} target="_blank" rel="noopener noreferrer">Download Resume <Download aria-hidden="true" /></a></Button>;
}

function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { els.forEach((el) => el.classList.add('is-visible')); return; }
    document.documentElement.classList.add('motion-ready');
    let ticking = false;
    let frame = 0;
    const update = () => {
      ticking = false;
      for (const el of els) {
        if (el.classList.contains('is-visible')) continue;
        if (el.getBoundingClientRect().top < window.innerHeight - 40) el.classList.add('is-visible');
      }
    };
    const onScroll = () => { if (!ticking) { ticking = true; frame = requestAnimationFrame(update); } };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); document.documentElement.classList.remove('motion-ready'); window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); };
  }, []);
}

function Portfolio() {
  useReveal();
  const [menuOpen, setMenuOpen] = useState(false);
  const [caseOpen, setCaseOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  const caseRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape' && menuOpen) { setMenuOpen(false); menuRef.current?.focus(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [menuOpen]);
  useEffect(() => { if (caseOpen) caseRef.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'center' }); }, [caseOpen]);
  return (
    <div className="portfolio" id="top">
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="portfolio-nav">
        <div className="container-portfolio nav-inner">
          <a href="#top" className="brand" aria-label="Sai Prasath D P, home">SP<span>.</span></a>
          <nav className="nav-links" aria-label="Primary navigation">
            <a className="desktop-link" href="#about">About</a>
            <a href="#projects">Projects</a>
            <a href="#skills">Skills</a>
            <a className="desktop-link" href="#education">Education</a>
            <Button variant="portfolio" asChild><a href="#contact">Contact</a></Button>
            <Button ref={menuRef} variant="ghost" size="icon" className="menu-button" aria-label={menuOpen ? 'Close navigation' : 'Open navigation'} aria-expanded={menuOpen} aria-controls="mobile-navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
          </nav>
        </div>
        {menuOpen && <nav id="mobile-navigation" className="mobile-nav" aria-label="More navigation">{[['about', 'About Me'], ['projects', 'Featured Project'], ['skills', 'Skills'], ['learning', 'Currently Learning'], ['education', 'Education & Training'], ['certifications', 'Certifications'], ['languages', 'Languages'], ['contact', 'Contact']].map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>)}</nav>}
      </header>
      <main id="main">
        <section className="hero" aria-labelledby="hero-title">
          <img className="hero-art" src={financeGlass} alt="" width={1536} height={1024} fetchPriority="high" />
          <div className="container-portfolio">
            <div className="hero-copy">
              <div className="location reveal"><span className="location-dot" />Bengaluru, India</div>
              <h1 id="hero-title" className="reveal reveal-d1">Sai Prasath <span>D P</span></h1>
              <p className="positioning reveal reveal-d2">B.Com Graduate <span aria-hidden="true">|</span> Aspiring Data Analyst</p>
              <p className="positioning-secondary reveal reveal-d3">Finance &amp; Business Analytics</p>
              <p className="hero-lede reveal reveal-d4">A commerce and finance foundation, with hands-on Excel, Power BI and financial-modeling work — building toward a career in data analytics.</p>
              <div className="hero-actions reveal reveal-d5"><Button variant="portfolio" asChild><a href="#projects">View Projects <ArrowDown aria-hidden="true" /></a></Button><ResumeButton /></div>
              <div className="hero-index reveal reveal-d6"><span><FileSpreadsheet aria-hidden="true" />Excel &amp; Financial Modeling</span><span><BarChart3 aria-hidden="true" />Power BI &amp; Reporting</span></div>
            </div>
          </div>
        </section>
        <section id="projects" className="section container-portfolio" aria-labelledby="projects-title">
          <div className="section-head reveal"><p className="kicker">Selected work</p><h2 id="projects-title">Featured Project</h2><p className="section-sub">Financial analysis, from historical data to forward-looking insight.</p></div>
          <article className="project-card reveal">
            <div className="project-content">
              <p className="kicker">TCS · Independent academic project · Microsoft Excel</p>
              <h3>TCS Financial Analysis &amp; Forecasting Model</h3>
              <p className="project-intro">A six-sheet Excel model covering eight years of TCS actuals (FY2018–FY2025), with Base, Bull and Bear forecasts through FY2028.</p>
              <div className="project-facts">
                <p><strong>Objective — </strong>Connect historical financial statements to scenario-based forecasts of profitability and free cash flow.</p>
                <p><strong>Analytical work — </strong>Income statements, margins, EPS, CAGR, bottom-up net profit and free cash flow projections, in INR Crores.</p>
                <p><strong>Outcome — </strong>A dynamically linked workbook with an assumptions panel, growth-rate override and 11 automated validation checks, all passing.</p>
                <p><strong>Status — </strong>Built as an independent academic Excel project, using TCS Annual Reports FY18–FY25.</p>
              </div>
              <div className="chips">{['Microsoft Excel', 'Scenario Modeling', 'FCF Projection', 'Sensitivity Analysis', 'Dynamic Linking', 'Auto-Validation'].map(item => <span className="chip" key={item}>{item}</span>)}</div>
              <div className="project-actions">
                <Button variant="text" aria-expanded={caseOpen} aria-controls="case-study" onClick={() => setCaseOpen(!caseOpen)}>{caseOpen ? 'Close Case Study' : 'View Case Study'}{caseOpen ? <X aria-hidden="true" /> : <ArrowRight aria-hidden="true" />}</Button>
                <Button variant="glass" asChild><a href="https://saitcsproject1.netlify.app/" target="_blank" rel="noopener noreferrer">View Project Website <ArrowUpRight aria-hidden="true" /></a></Button>
              </div>
              {caseOpen && <div className="case-detail" id="case-study" ref={caseRef}>
                <h4>Inside the model</h4>
                <ul>
                  <li>Built a 6-sheet model on 8 years of TCS actuals (FY2018–FY2025): income statement, free cash flow, margins, EPS and CAGR analytics, all in INR Crores.</li>
                  <li>Engineered a dynamic 3-scenario forecast (Base, Bull, Bear) through FY2028, fully linked to an assumptions panel, plus a custom growth-rate override control.</li>
                  <li>Derived net profit bottom-up (EBITDA → EBIT → tax → NP) and projected free cash flow as NP + Depreciation − Capex across every year.</li>
                  <li>Designed an Excel dashboard with live KPI cards, a scenario dropdown and an 11-point automated validation suite, with all checks passing.</li>
                </ul>
                <p><strong>Practical learning:</strong> applying scenario modeling, dynamic linking and automated validation to a financial forecasting workbook.</p>
                <p>Source: TCS Annual Reports FY18–FY25. A companion website showcasing this project is at saitcsproject.lovable.app.</p>
              </div>}
            </div>
          </article>
        </section>
        <section id="skills" className="section container-portfolio" aria-labelledby="skills-title">
          <div className="section-head reveal"><p className="kicker">Tools &amp; foundations</p><h2 id="skills-title">Skills</h2></div>
          <div className="skills-grid">{skillGroups.map((group, i) => <article className={`skill-card reveal reveal-d${(i % 4) + 1}`} key={group.title}><h3>{group.title}</h3><div className="chips">{group.items.map(item => <span className="chip" key={item}>{item}</span>)}</div><p>{group.detail}</p></article>)}</div>
          <div className="learning reveal" id="learning"><div><h3>Currently Learning</h3><p>Building practical skills in SQL and Python as part of my transition into data analytics.</p></div><div className="chips"><span className="chip">SQL</span><span className="chip">Python</span></div></div>
        </section>
        <section id="education" className="section container-portfolio" aria-labelledby="education-title">
          <div className="section-head reveal"><p className="kicker">Academic foundation</p><h2 id="education-title">Education &amp; Training</h2></div>
          <div className="education-list">{education.map((item, i) => <article className={`education-item reveal reveal-d${(i % 4) + 1}`} key={item.title}><div className="education-period">{item.period}</div><div><div className="degree-title"><h3>{item.title}</h3>{item.status && <span className="status">{item.status} <Check size={10} className="inline" aria-hidden="true" /></span>}</div><p>{item.institution}</p>{item.result && <p className="result">{item.result}</p>}{item.detail && <p>{item.detail}</p>}</div></article>)}</div>
          <div id="certifications" className="credentials reveal"><p className="kicker">Continued development</p><h2>Certifications</h2><div className="cert-grid">{certifications.map((cert, i) => <article className={`cert-card reveal reveal-d${(i % 4) + 1}`} key={cert.title}><p className="cert-provider">{cert.provider}</p><h3>{cert.title}</h3>{cert.status && <span className="status">{cert.status}</span>}<ul>{cert.courses.map(([title, score]) => <li key={title}><span>{title}</span><b>{score}</b></li>)}</ul></article>)}</div></div>
        </section>
        <section className="section container-portfolio" aria-labelledby="about-title">
          <div className="about reveal" id="about"><p className="kicker">A little about me</p><h2 id="about-title">Commerce foundation. Analytical direction.</h2><p>I’m a B.Com graduate with a foundation in finance and accounting, and practical work in Excel, Power BI, financial analysis and dashboard reporting. My TCS financial forecasting model brings together financial statement analysis, scenario modeling and validation.</p><p>I’m looking to develop further in data analytics, applying my commerce background to clear analysis, visualization and reporting in an entry-level role.</p></div>
          <h3 className="languages-title reveal" id="languages">Languages</h3><div className="languages reveal">{languages.map(([name, level], i) => <div className={`language reveal reveal-d${(i % 4) + 1}`} key={name}><strong>{name}</strong><span>{level}</span></div>)}</div>
        </section>
        <section id="contact" className="section contact container-portfolio" aria-labelledby="contact-title"><p className="kicker reveal">Open to entry-level opportunities</p><h2 id="contact-title" className="reveal reveal-d1">Get in touch</h2><div className="contact-grid"><a className="contact-link reveal reveal-d1" href="mailto:saiprasathdp@gmail.com"><Mail aria-hidden="true" /><div><span>Email</span><strong>saiprasathdp@gmail.com</strong></div><ArrowUpRight className="external" aria-hidden="true" /></a><a className="contact-link reveal reveal-d2" href="tel:+919380721853"><Phone aria-hidden="true" /><div><span>Phone</span><strong>+91 93807 21853</strong></div><ArrowUpRight className="external" aria-hidden="true" /></a><a className="contact-link reveal reveal-d3" href={resumeUrl} target="_blank" rel="noopener noreferrer"><Download aria-hidden="true" /><div><span>Resume</span><strong>Download Resume</strong></div><ArrowUpRight className="external" aria-hidden="true" /></a><a className="contact-link reveal reveal-d4" href="https://saiprasath00.github.io/Leo/" target="_blank" rel="noopener noreferrer"><ArrowUpRight aria-hidden="true" /><div><span>GitHub Pages</span><strong>saiprasath00.github.io/Leo</strong></div><ArrowUpRight className="external" aria-hidden="true" /></a><div className="contact-link reveal reveal-d5"><MapPin aria-hidden="true" /><div><span>Location</span><strong>Bengaluru, India</strong></div></div></div><p className="target-roles reveal">Seeking entry-level opportunities in Data Analytics, Business Analytics, Finance Analytics, MIS / Reporting, Financial Analysis and Finance / Accounting.</p></section>
      </main>
      <footer className="footer container-portfolio"><span>© 2026 Sai Prasath D P</span><span>Finance &amp; Business Analytics · Bengaluru, India</span></footer>
    </div>
  );
}
