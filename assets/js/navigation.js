(function () {
  const navbar = document.getElementById("navbar");
  const langSwitch = document.getElementById("lang-switch");
  const langMenu = document.getElementById("lang-menu");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileClose = document.getElementById("mobile-close");
  const mobileToggle = document.getElementById("mobile-toggle");

  const setMenuVisibility = (isOpen) => {
    if (!langSwitch || !langMenu) return;
    langSwitch.setAttribute("aria-expanded", String(isOpen));
    langMenu.classList.toggle("hidden", !isOpen);
  };

  if (langSwitch && langMenu) {
    langSwitch.addEventListener("click", (event) => {
      event.stopPropagation();
      const isExpanded = langSwitch.getAttribute("aria-expanded") === "true";
      setMenuVisibility(!isExpanded);
    });

    document.addEventListener("click", () => {
      if (langSwitch.getAttribute("aria-expanded") === "true") {
        setMenuVisibility(false);
      }
    });
  }

  if (mobileToggle && mobileMenu && mobileClose) {
    const openMenu = () => {
      mobileMenu.classList.remove("hidden");
      setTimeout(() => mobileMenu.classList.add("show"), 10);
    };

    const closeMenu = () => {
      mobileMenu.classList.remove("show");
      setTimeout(() => mobileMenu.classList.add("hidden"), 300);
    };

    mobileToggle.addEventListener("click", openMenu);
    mobileClose.addEventListener("click", closeMenu);
    mobileMenu.addEventListener("click", closeMenu);
    mobileMenu.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeMenu));
  }

  const sections = Array.from(document.querySelectorAll("header[id], section[id]"));
  const navLinks = Array.from(document.querySelectorAll('a.nav-link[href^="#"]'));

  const setActiveLink = (id) => {
    navLinks.forEach((link) => {
      const href = link.getAttribute("href");
      if (!href) return;

      const target = href.replace("#", "");
      const isActive = target === id;
      link.classList.toggle("active", isActive);

      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const updateActiveLink = () => {
    if (!sections.length || !navLinks.length) return;

    const viewportCenter = window.innerHeight / 2;
    let candidate = null;
    let minDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height / 2;
      const withinView = rect.top <= viewportCenter && rect.bottom >= viewportCenter;
      const distance = Math.abs(sectionCenter - viewportCenter);

      if (withinView && distance < minDistance) {
        minDistance = distance;
        candidate = section.id;
      }
    });

    if (!candidate) {
      let firstVisible = null;
      sections.forEach((section) => {
        const rect = section.getBoundingClientRect();
        if (rect.top >= 0 && (!firstVisible || rect.top < firstVisible.top)) {
          firstVisible = { id: section.id, top: rect.top };
        }
      });
      if (firstVisible) candidate = firstVisible.id;
    }

    if (candidate) setActiveLink(candidate);
  };

  if (sections.length && navLinks.length) {
    let ticking = false;
    const onScroll = () => {
      if (navbar) {
        navbar.classList.toggle("shrink", window.scrollY > 50);
      }

      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveLink();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateActiveLink);
    updateActiveLink();
  } else if (navbar) {
    window.addEventListener("scroll", () => {
      navbar.classList.toggle("shrink", window.scrollY > 50);
    }, { passive: true });
  }
})();
