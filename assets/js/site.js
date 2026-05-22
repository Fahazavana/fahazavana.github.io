(function () {
  document.addEventListener("DOMContentLoaded", () => {
    const preloader = document.querySelector(".preloader");
    const currentYearElement = document.getElementById("current-year");

    if (preloader) {
      preloader.classList.add("fade-out");
      setTimeout(() => {
        preloader.style.display = "none";
      }, 100);
    }

    if (currentYearElement) {
      currentYearElement.textContent = String(new Date().getFullYear());
    }

    const revealElements = document.querySelectorAll(".reveal");
    if (!revealElements.length) {
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealElements.forEach((element) => observer.observe(element));
  });
})();
