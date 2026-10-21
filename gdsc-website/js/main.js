(() => {
  const revealItems = [...document.querySelectorAll(".reveal")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reducedMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach((element) => element.classList.add("is-visible"));
  } else {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 5, 4) * 60}ms`;
      revealObserver.observe(element);
    });
  }

  const counters = [...document.querySelectorAll("[data-count]")];
  function countUp(counter) {
    const target = Number(counter.dataset.count);
    const suffix = counter.dataset.suffix || "";
    if (!Number.isFinite(target)) return;
    if (reducedMotion) {
      counter.textContent = `${target}${suffix}`;
      return;
    }
    const start = performance.now();
    const duration = 1000;
    function frame(now) {
      const progress = Math.min((now - start) / duration, 1);
      counter.textContent = `${Math.floor(target * progress)}${suffix}`;
      if (progress < 1) window.requestAnimationFrame(frame);
    }
    window.requestAnimationFrame(frame);
  }
  if ("IntersectionObserver" in window) {
    const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          countUp(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    counters.forEach((counter) => counterObserver.observe(counter));
  } else {
    counters.forEach(countUp);
  }

  const navLinks = [...document.querySelectorAll(".navbar__links .nav-link[href^='#']")];
  const sections = navLinks.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const spy = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute("href") === `#${entry.target.id}`;
          link.classList.toggle("is-active", active);
          if (active) link.setAttribute("aria-current", "location");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-30% 0px -60% 0px" });
    sections.forEach((section) => spy.observe(section));
  }

  document.querySelectorAll("[data-current-year]").forEach((element) => {
    element.textContent = String(new Date().getFullYear());
  });
  const backToTop = document.querySelector(".back-to-top");
  if (backToTop) {
    const updateBackToTop = () => backToTop.classList.toggle("is-visible", window.scrollY > 600);
    window.addEventListener("scroll", updateBackToTop, { passive: true });
    updateBackToTop();
    backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" }));
  }

  // Update the floating header and Google-color progress indicator on scroll.
  const header = document.querySelector(".site-header");
  const progress = document.querySelector(".scroll-progress");
  function updateScrollChrome() {
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
    if (progress) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const ratio = scrollable > 0 ? window.scrollY / scrollable : 0;
      progress.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
    }
  }
  window.addEventListener("scroll", updateScrollChrome, { passive: true });
  updateScrollChrome();

  // Rotate the existing hero tagline without removing its no-script text.
  const rotatingTagline = document.querySelector("[data-rotating-tagline]");
  if (rotatingTagline && !reducedMotion) {
    const taglines = ["Learn. Build. Grow.", "Android · Web · Cloud · ML"];
    let taglineIndex = 0;
    window.setInterval(() => {
      taglineIndex = (taglineIndex + 1) % taglines.length;
      rotatingTagline.classList.add("is-changing");
      window.setTimeout(() => {
        rotatingTagline.textContent = taglines[taglineIndex];
        rotatingTagline.classList.remove("is-changing");
      }, 160);
    }, 3200);
  }

  // Keep pointer-follow effects off touch devices and reduced-motion setups.
  const cursorGlow = document.querySelector(".cursor-glow");
  const heroArt = document.querySelector(".hero-art");
  if (cursorGlow && !reducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    let pointerFrame = 0;
    document.addEventListener("pointermove", (event) => {
      if (pointerFrame) return;
      pointerFrame = window.requestAnimationFrame(() => {
        cursorGlow.style.left = `${event.clientX}px`;
        cursorGlow.style.top = `${event.clientY}px`;
        pointerFrame = 0;
      });
    }, { passive: true });
    heroArt?.addEventListener("pointermove", (event) => {
      const bounds = heroArt.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - .5;
      const y = (event.clientY - bounds.top) / bounds.height - .5;
      heroArt.style.setProperty("--parallax-x", `${x * 8}px`);
      heroArt.style.setProperty("--parallax-y", `${y * 8}px`);
    }, { passive: true });
    heroArt?.addEventListener("pointerleave", () => {
      heroArt.style.setProperty("--parallax-x", "0px");
      heroArt.style.setProperty("--parallax-y", "0px");
    });
  }
})();
