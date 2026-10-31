import "./styles/style.css";
import Lenis from "lenis";
import { gsap } from "gsap";

const root = document.documentElement;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const finePointer = window.matchMedia("(pointer: fine)");

window.__portfolioBooted = true;
root.classList.add("js");

let lenis = null;

function fallbackToStatic() {
  root.classList.remove("motion-ready");
  root.classList.add("reveal-fallback");

  document.querySelectorAll(".hero-line").forEach((line) => {
    line.style.transform = "none";
  });
  document
    .querySelectorAll("[data-hero-meta], [data-hero-hello], .hero-bottom, [data-hero-note]")
    .forEach((block) => {
      block.style.opacity = "1";
      block.style.transform = "none";
    });
  document.querySelectorAll(".hero-pulse-dot").forEach((dot) => {
    dot.style.transform = "none";
  });
}

function init() {
  const isMotion = !reduceMotion.matches;

  if (isMotion) {
    root.classList.add("motion-ready");
  }

  setupLenis(isMotion);
  setupHeader();
  setupClock();
  setupMenu();
  setupTicker();
  setupReveals(isMotion);
  setupHero(isMotion);
  setupHeroParallax(isMotion && finePointer.matches);
  setupChart();
  setupTabs();
  setupCopy();
  setupActiveNav();
  setupAnchors(isMotion);
}

/* ---------------------------------------------------------
   Smooth scroll
   --------------------------------------------------------- */

function setupLenis(isMotion) {
  if (!isMotion) return;

  lenis = new Lenis({
    duration: 1.05,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
  });

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });
  gsap.ticker.lagSmoothing(0);
}

function setupAnchors(isMotion) {
  document.addEventListener("click", (event) => {
    const link = event.target.closest('a[href^="#"]');
    if (!link || link.classList.contains("skip-link")) return;

    const hash = link.getAttribute("href");
    if (!hash || hash === "#") return;

    const target = document.querySelector(hash);
    if (!target) return;

    event.preventDefault();
    closeMenu(false);
    scrollToTarget(target, isMotion);
  });
}

function scrollToTarget(target, isMotion) {
  const headerHeight = parseFloat(
    getComputedStyle(root).getPropertyValue("--header-h")
  );
  const offset = Number.isFinite(headerHeight) ? -headerHeight : -72;

  if (!target.hasAttribute("tabindex")) {
    target.setAttribute("tabindex", "-1");
  }
  target.focus({ preventScroll: true });

  if (lenis) {
    lenis.scrollTo(target, { offset, duration: 1.15 });
  } else {
    const top =
      target.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: isMotion ? "smooth" : "auto" });
  }
}

/* ---------------------------------------------------------
   Header + progress
   --------------------------------------------------------- */

function setupHeader() {
  const header = document.querySelector("[data-header]");
  const progress = document.querySelector("[data-progress]");
  if (!header) return;

  let queued = false;

  const update = () => {
    const y = window.scrollY;
    header.classList.toggle("is-scrolled", y > 16);

    if (progress) {
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      const ratio = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
      progress.style.setProperty("--scroll-progress", ratio.toFixed(4));
    }

    queued = false;
  };

  const requestUpdate = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  update();
}

/* ---------------------------------------------------------
   IST clock
   --------------------------------------------------------- */

function setupClock() {
  const clocks = document.querySelectorAll("[data-clock]");
  if (!clocks.length) return;

  const formatter = new Intl.DateTimeFormat("en-IN", {
    timeZone: "Asia/Kolkata",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  const tick = () => {
    const time = formatter
      .format(new Date())
      .replace(/\s?(am|pm)/i, (match) => match.toUpperCase());
    clocks.forEach((clock) => {
      clock.textContent = `${time} IST`;
    });
  };

  tick();
  window.setInterval(tick, 30_000);
}

/* ---------------------------------------------------------
   Mobile menu
   --------------------------------------------------------- */

let menuCloseTimer = 0;
let lastFocused = null;

function setupMenu() {
  const menu = document.querySelector("[data-menu]");
  const openButton = document.querySelector("[data-menu-open]");
  const closeButton = document.querySelector("[data-menu-close]");
  if (!menu || !openButton || !closeButton) return;

  openButton.addEventListener("click", openMenu);
  closeButton.addEventListener("click", () => closeMenu());

  menu.addEventListener("click", (event) => {
    if (event.target.closest('a[href^="#"]')) {
      closeMenu(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.classList.contains("is-open")) {
      closeMenu();
    }
  });

  menu.addEventListener("keydown", trapMenuFocus);

  const desktop = window.matchMedia("(min-width: 901px)");
  desktop.addEventListener("change", (event) => {
    if (event.matches) closeMenu(false);
  });
}

function openMenu() {
  const menu = document.querySelector("[data-menu]");
  const openButton = document.querySelector("[data-menu-open]");
  const closeButton = document.querySelector("[data-menu-close]");
  if (!menu || !openButton || !closeButton) return;
  if (menu.classList.contains("is-open")) return;

  window.clearTimeout(menuCloseTimer);
  lastFocused = document.activeElement;
  menu.hidden = false;
  document.body.classList.add("menu-open");
  openButton.setAttribute("aria-expanded", "true");

  if (lenis) lenis.stop();

  requestAnimationFrame(() => {
    menu.classList.add("is-open");
    closeButton.focus();
  });
}

function closeMenu(restoreFocus = true) {
  const menu = document.querySelector("[data-menu]");
  const openButton = document.querySelector("[data-menu-open]");
  if (!menu || !openButton) return;
  if (!menu.classList.contains("is-open")) return;

  menu.classList.remove("is-open");
  openButton.setAttribute("aria-expanded", "false");
  document.body.classList.remove("menu-open");

  if (lenis) lenis.start();

  const finish = () => {
    menu.hidden = true;
    if (restoreFocus && lastFocused instanceof HTMLElement) {
      lastFocused.focus();
    }
  };

  window.clearTimeout(menuCloseTimer);
  if (reduceMotion.matches) {
    finish();
  } else {
    menuCloseTimer = window.setTimeout(finish, 360);
  }
}

function trapMenuFocus(event) {
  if (event.key !== "Tab") return;

  const menu = event.currentTarget;
  const focusable = Array.from(
    menu.querySelectorAll('a[href], button:not([disabled])')
  ).filter((element) => element.offsetParent !== null);

  if (!focusable.length) return;

  const first = focusable[0];
  const last = focusable[focusable.length - 1];

  if (event.shiftKey && document.activeElement === first) {
    event.preventDefault();
    last.focus();
  } else if (!event.shiftKey && document.activeElement === last) {
    event.preventDefault();
    first.focus();
  }
}

/* ---------------------------------------------------------
   Ticker
   --------------------------------------------------------- */

function setupTicker() {
  const ticker = document.querySelector("[data-ticker]");
  const button = document.querySelector("[data-ticker-pause]");
  if (!ticker || !button) return;

  button.addEventListener("click", () => {
    const isPaused = ticker.hasAttribute("data-paused");

    if (isPaused) {
      ticker.removeAttribute("data-paused");
    } else {
      ticker.setAttribute("data-paused", "");
    }

    button.setAttribute("aria-pressed", String(!isPaused));
    button.setAttribute("aria-label", isPaused ? "Pause ticker" : "Resume ticker");
  });
}

/* ---------------------------------------------------------
   Reveals
   --------------------------------------------------------- */

function setupReveals(isMotion) {
  const elements = document.querySelectorAll("[data-reveal]");

  if (!isMotion || !("IntersectionObserver" in window)) {
    elements.forEach((element) => element.classList.add("is-revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-revealed");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.06 }
  );

  elements.forEach((element) => observer.observe(element));
}

/* ---------------------------------------------------------
   Hero entrance + pointer depth
   --------------------------------------------------------- */

function setupHero(isMotion) {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  const chartWrap = document.querySelector("[data-chart]");
  if (chartWrap) {
    if (!isMotion || !("IntersectionObserver" in window)) {
      chartWrap.classList.add("is-inview");
    } else {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            chartWrap.classList.add("is-inview");
            observer.disconnect();
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(chartWrap);
    }
  }

  if (!isMotion) return;

  const lines = hero.querySelectorAll(".hero-line");
  const meta = hero.querySelector("[data-hero-meta]");
  const hello = hero.querySelector("[data-hero-hello]");
  const bottom = hero.querySelector(".hero-bottom");
  const note = hero.querySelector("[data-hero-note]");
  const solidPulse = hero.querySelector(
    ".hero-pulse-line:not(.hero-pulse-line--dash)"
  );
  const dashedPulse = hero.querySelector(".hero-pulse-line--dash");
  const dots = hero.querySelectorAll(".hero-pulse-dot");

  gsap.set(lines, { yPercent: 112 });
  gsap.set([meta, hello, bottom, note], { opacity: 0, y: 16 });
  gsap.set(dots, { scale: 0, transformOrigin: "50% 50%" });

  if (solidPulse) {
    gsap.set(solidPulse, { strokeDasharray: 1, strokeDashoffset: 1 });
  }
  if (dashedPulse) {
    gsap.set(dashedPulse, { opacity: 0 });
  }

  let played = false;

  const play = () => {
    if (played) return;
    played = true;

    const timeline = gsap.timeline({
      defaults: { ease: "power4.out" },
      delay: 0.1,
    });

    timeline
      .to(meta, { opacity: 1, y: 0, duration: 0.65 })
      .to(hello, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
      .to(lines, { yPercent: 0, duration: 1.1, stagger: 0.075 }, "-=0.42");

    if (solidPulse) {
      timeline.to(
        solidPulse,
        { strokeDashoffset: 0, duration: 1.7 },
        "-=0.95"
      );
    }
    if (dashedPulse) {
      timeline.to(dashedPulse, { opacity: 0.65, duration: 0.8 }, "-=1.2");
    }
    if (dots.length) {
      timeline.to(
        dots,
        { scale: 1, duration: 0.5, stagger: 0.12 },
        "-=1.35"
      );
    }

    timeline.to(bottom, { opacity: 1, y: 0, duration: 0.8 }, "-=1.1");
    if (note) {
      timeline.to(note, { opacity: 1, y: 0, duration: 0.7 }, "-=0.6");
    }
  };

  if (document.fonts && document.fonts.ready) {
    const timeout = window.setTimeout(play, 900);
    document.fonts.ready
      .then(() => {
        window.clearTimeout(timeout);
        play();
      })
      .catch(play);
  } else {
    play();
  }
}

function setupHeroParallax(enabled) {
  if (!enabled) return;

  const hero = document.querySelector(".hero");
  const pulse = hero?.querySelector(".hero-pulse");
  if (!hero || !pulse) return;

  const pulseX = gsap.quickTo(pulse, "x", { duration: 0.9, ease: "power3" });
  const pulseY = gsap.quickTo(pulse, "y", { duration: 0.9, ease: "power3" });

  hero.addEventListener("pointermove", (event) => {
    const rect = hero.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    pulseX(x * -16);
    pulseY(y * -10);
  });

  hero.addEventListener("pointerleave", () => {
    pulseX(0);
    pulseY(0);
  });
}

/* ---------------------------------------------------------
   Scenario chart
   --------------------------------------------------------- */

function setupChart() {
  const wrap = document.querySelector("[data-chart]");
  if (!wrap) return;

  const svg = wrap.querySelector(".chart");
  const customPath = wrap.querySelector("[data-custom-path]");
  const customArea = wrap.querySelector("[data-custom-area]");
  const customDot = wrap.querySelector("[data-custom-dot]");
  const crosshair = wrap.querySelector("[data-crosshair]");
  const crossLine = crosshair?.querySelector("line");
  const crossDot = crosshair?.querySelector("circle");
  const tooltip = wrap.querySelector("[data-chart-tooltip]");
  const hint = document.querySelector("[data-chart-hint]");
  const slider = document.querySelector("#scenario-range");
  const presets = Array.from(
    document.querySelectorAll("[data-scenario-preset]")
  );
  const outIndex = document.querySelector("[data-out-index]");
  const outCagr = document.querySelector("[data-out-cagr]");
  const tableCells = Array.from(
    document.querySelectorAll("[data-custom-year]")
  );

  if (!svg || !customPath || !customDot || !slider) return;

  const xActual = [54, 146.2, 238.4, 330.6, 422.8, 515, 607.2, 699.4];
  const xForecast = [791.6, 883.8, 976];
  const actual = [100, 118.98, 127.49, 133.36, 155.76, 183.14, 195.68, 207.41];
  const base = [224, 243, 265];
  const bull = [232, 263, 299];
  const bear = [216, 225, 237];
  const years = [
    "FY18",
    "FY19",
    "FY20",
    "FY21",
    "FY22",
    "FY23",
    "FY24",
    "FY25",
    "FY26",
    "FY27",
    "FY28",
  ];
  const fy25 = 207.41;
  const yBottom = 472;
  const yTop = 64.7;
  const yMin = 80;
  const yMax = 320;
  const yScale = (yBottom - yTop) / (yMax - yMin);

  const yFor = (value) => yBottom - (value - yMin) * yScale;
  const round = (value) => Math.round(value * 10) / 10;

  const smoothPath = (points) => {
    return points
      .map((point, index) => {
        if (index === 0) return `M${round(point.x)},${round(point.y)}`;
        const previous = points[index - 1];
        const midX = round((previous.x + point.x) / 2);
        return `C${midX},${round(previous.y)} ${midX},${round(point.y)} ${round(
          point.x
        )},${round(point.y)}`;
      })
      .join(" ");
  };

  let caseValues = [...base];
  let chartPoints = [];
  let hovered = null;
  let touchTimer = 0;

  const customValuesFor = (position) => {
    const ratio = position / 100;
    return base.map((value, index) => {
      const target = ratio >= 0 ? bull[index] : bear[index];
      return Math.round(value + (target - value) * Math.abs(ratio));
    });
  };

  const buildPoints = () => {
    chartPoints = [
      ...actual.map((value, index) => ({
        year: years[index],
        value,
        x: xActual[index],
        y: yFor(value),
        kind: "Actual",
      })),
      ...caseValues.map((value, index) => ({
        year: years[index + 8],
        value,
        x: xForecast[index],
        y: yFor(value),
        kind: "Your case",
      })),
    ];
  };

  const updateTooltip = (index) => {
    const point = chartPoints[index];
    if (!point || !tooltip) return;

    const rect = svg.getBoundingClientRect();
    const left = (point.x / 1000) * rect.width;
    const top = (point.y / 520) * rect.height;

    if (crossLine) {
      crossLine.setAttribute("x1", point.x);
      crossLine.setAttribute("x2", point.x);
    }
    if (crossDot) {
      crossDot.setAttribute("cx", point.x);
      crossDot.setAttribute("cy", point.y);
    }

    if (point.kind === "Actual") {
      tooltip.innerHTML = `<strong>${point.year}</strong> · Actual<br />${Math.round(point.value)} index`;
    } else {
      const index = Number(point.year.slice(2)) - 26;
      tooltip.innerHTML = `<strong>${point.year}</strong> · Your case<br />${Math.round(point.value)} index<br />Base ${base[index]} · Bull ${bull[index]} · Bear ${bear[index]}`;
    }

    tooltip.style.left = `${Math.min(
      Math.max(left, 84),
      Math.max(rect.width - 84, 84)
    )}px`;
    tooltip.style.top = `${Math.max(top, 48)}px`;
    tooltip.classList.add("is-visible");
    tooltip.setAttribute("aria-hidden", "false");
    wrap.classList.add("is-hovering");
  };

  const hideTooltip = () => {
    hovered = null;
    if (tooltip) {
      tooltip.classList.remove("is-visible");
      tooltip.setAttribute("aria-hidden", "true");
    }
    wrap.classList.remove("is-hovering");
  };

  const render = (position) => {
    caseValues = customValuesFor(position);

    const points = [
      { x: 699.4, y: yFor(fy25) },
      ...caseValues.map((value, index) => ({
        x: xForecast[index],
        y: yFor(value),
      })),
    ];
    const path = smoothPath(points);
    const last = points[points.length - 1];

    customPath.setAttribute("d", path);
    if (customArea) {
      customArea.setAttribute("d", `${path} L976,${yBottom} L699.4,${yBottom} Z`);
    }
    customDot.setAttribute("cx", last.x);
    customDot.setAttribute("cy", last.y);

    const indexValue = caseValues[2];
    const cagr = (Math.pow(indexValue / fy25, 1 / 3) - 1) * 100;
    const cagrText = `${cagr.toFixed(1)}%`;

    if (outIndex) outIndex.textContent = String(indexValue);
    if (outCagr) outCagr.textContent = cagrText;

    tableCells.forEach((cell) => {
      const index = Number(cell.dataset.customYear) - 8;
      cell.textContent = String(caseValues[index]);
    });

    presets.forEach((button) => {
      const value = Number(button.dataset.scenarioPreset) * 100;
      button.setAttribute("aria-pressed", String(value === position));
    });

    if (hint) {
      const inspect = finePointer.matches ? "Hover to inspect" : "Tap to inspect";
      hint.textContent =
        position === 0
          ? inspect
          : position > 0
            ? "Bull tilt"
            : "Bear tilt";
    }

    slider.setAttribute(
      "aria-valuetext",
      `${position === 0 ? "Base" : position > 0 ? "Bull tilt" : "Bear tilt"}. FY28 index ${indexValue}. CAGR ${cagrText}.`
    );

    buildPoints();

    if (hovered !== null) updateTooltip(hovered);
  };

  slider.addEventListener("input", () => {
    render(Number(slider.value));
  });

  presets.forEach((button) => {
    button.addEventListener("click", () => {
      const position = Number(button.dataset.scenarioPreset) * 100;
      slider.value = String(position);
      render(position);
    });
  });

  svg.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;

    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 1000;
    let nearest = 0;

    chartPoints.forEach((point, index) => {
      if (
        Math.abs(point.x - x) <
        Math.abs(chartPoints[nearest].x - x)
      ) {
        nearest = index;
      }
    });

    hovered = nearest;
    updateTooltip(nearest);
  });

  svg.addEventListener("pointerleave", hideTooltip);

  svg.addEventListener("pointerdown", (event) => {
    if (event.pointerType !== "touch") return;

    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * 1000;
    let nearest = 0;

    chartPoints.forEach((point, index) => {
      if (
        Math.abs(point.x - x) <
        Math.abs(chartPoints[nearest].x - x)
      ) {
        nearest = index;
      }
    });

    hovered = nearest;
    updateTooltip(nearest);
    window.clearTimeout(touchTimer);
    touchTimer = window.setTimeout(hideTooltip, 2600);
  });

  render(0);
}

/* ---------------------------------------------------------
   Power BI tabs
   --------------------------------------------------------- */

function setupTabs() {
  const report = document.querySelector("[data-report]");
  if (!report) return;

  const tabs = Array.from(report.querySelectorAll('[role="tab"]'));
  const panels = tabs.map((tab) =>
    document.getElementById(tab.getAttribute("aria-controls"))
  );
  if (!tabs.length || panels.some((panel) => !panel)) return;

  report.dataset.enhanced = "true";

  const activate = (index, focus = false) => {
    tabs.forEach((tab, tabIndex) => {
      const active = tabIndex === index;
      tab.setAttribute("aria-selected", String(active));
      tab.tabIndex = active ? 0 : -1;
      panels[tabIndex].hidden = !active;
      panels[tabIndex].classList.toggle("is-active", active);
    });

    if (focus) tabs[index].focus();
  };

  activate(0);

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(index));

    tab.addEventListener("keydown", (event) => {
      let next;

      switch (event.key) {
        case "ArrowRight":
          next = (index + 1) % tabs.length;
          break;
        case "ArrowLeft":
          next = (index - 1 + tabs.length) % tabs.length;
          break;
        case "Home":
          next = 0;
          break;
        case "End":
          next = tabs.length - 1;
          break;
        default:
          return;
      }

      event.preventDefault();
      activate(next, true);
    });
  });
}

/* ---------------------------------------------------------
   Copy email
   --------------------------------------------------------- */

function setupCopy() {
  const button = document.querySelector("[data-copy]");
  if (!button) return;

  let timer = 0;

  button.addEventListener("click", async () => {
    const value = button.dataset.copy;
    let copied = false;

    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(value);
        copied = true;
      } else {
        copied = fallbackCopy(value);
      }
    } catch {
      copied = fallbackCopy(value);
    }

    button.dataset.copied = String(copied);
    button.textContent = copied ? "Copied" : "Copy failed";

    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      delete button.dataset.copied;
      button.textContent = "Copy email";
    }, 2200);
  });
}

function fallbackCopy(value) {
  const field = document.createElement("textarea");
  field.value = value;
  field.setAttribute("readonly", "");
  field.style.position = "fixed";
  field.style.top = "-1000px";
  field.style.opacity = "0";
  document.body.appendChild(field);
  field.select();

  let copied = false;
  try {
    copied = document.execCommand("copy");
  } catch {
    copied = false;
  }

  document.body.removeChild(field);
  return copied;
}

/* ---------------------------------------------------------
   Active navigation
   --------------------------------------------------------- */

function setupActiveNav() {
  const links = Array.from(document.querySelectorAll(".nav-link"));
  if (!links.length) return;

  const sections = ["top", "about", "work", "toolkit", "journey", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  if (!sections.length) return;

  const setCurrent = (id) => {
    links.forEach((link) => {
      if (link.getAttribute("href") === `#${id}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  let queued = false;

  const update = () => {
    const line = window.scrollY + window.innerHeight * 0.42;
    let current = "top";

    sections.forEach((section) => {
      const top = section.getBoundingClientRect().top + window.scrollY;
      if (top <= line) current = section.id;
    });

    setCurrent(current);
    queued = false;
  };

  const requestUpdate = () => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(update);
  };

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  update();
}

/* ---------------------------------------------------------
   Boot
   --------------------------------------------------------- */

try {
  init();
} catch (error) {
  console.error("Portfolio initialisation failed:", error);
  fallbackToStatic();
}

// If something interrupts the reveal system, never leave the page blank.
window.setTimeout(() => {
  if (!root.classList.contains("motion-ready")) return;
  const hidden = document.querySelector("[data-reveal]:not(.is-revealed)");
  if (!hidden) return;

  const rect = hidden.getBoundingClientRect();
  if (rect.top < window.innerHeight && rect.bottom > 0) {
    hidden.classList.add("is-revealed");
  }
}, 5000);
