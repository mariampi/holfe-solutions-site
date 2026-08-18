document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.querySelector("[data-nav-toggle]");
  var nav = document.querySelector("[data-nav]");

  if (toggle && nav) {
    function closeNav() {
      toggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("open");
    }

    toggle.addEventListener("click", function () {
      var isOpen = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("open", !isOpen);
    });

    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNav();
    });
  }

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    document.documentElement.classList.add("reduced-motion");
    return;
  }

  loadScript("https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/gsap.min.js", function () {
    loadScript(
      "https://cdn.jsdelivr.net/npm/gsap@3.13.0/dist/ScrollTrigger.min.js",
      startGsapEnhancements
    );
  });
});

function loadScript(src, onLoad) {
  var script = document.createElement("script");
  script.src = src;
  script.defer = true;
  script.onload = onLoad;
  script.onerror = function () {
    document.documentElement.classList.add("motion-fallback");
  };
  document.head.appendChild(script);
}

function startGsapEnhancements() {
  if (!window.gsap || !window.ScrollTrigger) return;

  gsap.registerPlugin(ScrollTrigger);
  document.documentElement.classList.add("gsap-enhanced");

  var entranceEase = "power3.out";
  var heroItems = gsap.utils.toArray(".hero-copy > *");
  var heroPanel = document.querySelector(".hero-panel");
  var pageIntro = document.querySelector(".page-hero, .page-intro");
  var header = document.querySelector(".site-header");
  var intro = gsap.timeline({ defaults: { ease: entranceEase } });

  if (header) {
    intro.from(header, {
      y: -18,
      opacity: 0,
      duration: 0.55,
      clearProps: "opacity,transform"
    });
  }

  if (heroItems.length) {
    intro.from(
      heroItems,
      {
        y: 26,
        opacity: 0,
        duration: 0.7,
        stagger: 0.085,
        clearProps: "opacity,transform"
      },
      "-=0.2"
    );
  }

  if (heroPanel) {
    intro.from(
      heroPanel,
      {
        x: 26,
        scale: 0.96,
        opacity: 0,
        duration: 0.9,
        clearProps: "opacity,transform"
      },
      "-=0.72"
    );
  } else if (pageIntro) {
    intro.from(
      pageIntro,
      { y: 22, opacity: 0, duration: 0.72, clearProps: "opacity,transform" },
      "-=0.2"
    );
  }

  var workflowNodes = gsap.utils.toArray(".workflow-node");
  if (workflowNodes.length) {
    workflowNodes.forEach(function (node, index) {
      gsap.to(node, { y: index % 2 ? 7 : -7, duration: 2.4 + index * 0.35, repeat: -1, yoyo: true, ease: "sine.inOut" });
    });
    gsap.to(".workflow-path", { strokeDashoffset: -34, duration: 3.2, repeat: -1, ease: "none" });
    gsap.to(".workflow-core", { boxShadow: "0 0 78px rgba(83,127,255,.36)", duration: 2.2, repeat: -1, yoyo: true, ease: "sine.inOut" });
  }

  var revealSelectors = [
    ".section-head",
    ".glass-panel",
    ".contact-card",
    ".payment-card",
    ".cta-band"
  ];

  gsap.utils.toArray(revealSelectors.join(",")).forEach(function (item) {
    gsap.from(item, {
      scrollTrigger: { trigger: item, start: "top 88%", once: true },
      y: 24,
      opacity: 0,
      duration: 0.72,
      ease: entranceEase,
      clearProps: "opacity,transform"
    });
  });

  [
    ".trust-grid",
    ".outcome-grid",
    ".services-grid",
    ".feature-grid",
    ".stats-grid",
    ".stats",
    ".engagement-grid",
    ".method-steps",
    ".platform-grid",
    ".info-grid",
    ".timeline-grid",
    ".payment-grid",
    ".about-journey",
    ".about-principles",
    ".home-care-grid",
    ".demo-grid"
  ].forEach(function (groupSelector) {
    gsap.utils.toArray(groupSelector).forEach(function (group) {
      var children = Array.prototype.filter.call(group.children, function (child) {
        return child.nodeType === 1;
      });
      if (!children.length) return;

      gsap.from(children, {
        scrollTrigger: { trigger: group, start: "top 86%", once: true },
        y: 26,
        opacity: 0,
        duration: 0.68,
        stagger: 0.09,
        ease: entranceEase,
        clearProps: "opacity,transform"
      });
    });
  });

  var aboutHeadshot = document.querySelector(".story-grid .headshot img");
  if (aboutHeadshot) {
    gsap.from(aboutHeadshot, {
      scrollTrigger: { trigger: aboutHeadshot, start: "top 88%", once: true },
      scale: 1.06,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      clearProps: "opacity,transform"
    });
    gsap.to(aboutHeadshot, {
      yPercent: 4,
      ease: "none",
      scrollTrigger: { trigger: ".story-grid", start: "top bottom", end: "bottom top", scrub: 0.6 }
    });
  }

  gsap.utils.toArray(".demo-thumb").forEach(function (thumb) {
    gsap.to(thumb, { backgroundSize: "108%", duration: 6, repeat: -1, yoyo: true, ease: "sine.inOut" });
  });

  gsap.utils.toArray(".demo-card").forEach(function (card) {
    card.addEventListener("pointerenter", function () {
      gsap.to(card, { y: -6, boxShadow: "0 34px 90px rgba(0,0,0,.38)", duration: .28, ease: "power2.out" });
    });
    card.addEventListener("pointerleave", function () {
      gsap.to(card, { y: 0, duration: .32, ease: "power2.out", clearProps: "transform,boxShadow" });
    });
  });

  gsap.utils.toArray(".btn, .header-cta").forEach(function (button) {
    button.addEventListener("pointerenter", function () {
      gsap.to(button, { y: -2, duration: 0.2, ease: "power2.out" });
    });
    button.addEventListener("pointerleave", function () {
      gsap.to(button, {
        y: 0,
        duration: 0.25,
        ease: "power2.out",
        clearProps: "transform"
      });
    });
  });

  window.addEventListener("load", function () {
    ScrollTrigger.refresh();
  });
}
