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
      if (event.key === "Escape") {
        closeNav();
      }
    });
  }

  var revealItems = document.querySelectorAll(
    ".hero-copy > *, .hero-panel, .section-head, .feature-card, .glass-panel, " +
    ".stat-card, .engagement-step, .info-card, .timeline-card, .contact-card, " +
    ".payment-card, .cta-band"
  );

  if (!revealItems.length) {
    return;
  }

  document.body.classList.add("motion-ready");

  revealItems.forEach(function (item, index) {
    item.classList.add("reveal-item");
    item.style.setProperty("--reveal-delay", String((index % 4) * 80) + "ms");
  });

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealItems.forEach(function (item) {
      item.classList.add("is-visible");
    });
    return;
  }

  var revealObserver = new IntersectionObserver(
    function (entries, observer) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealItems.forEach(function (item) {
    revealObserver.observe(item);
  });
});
