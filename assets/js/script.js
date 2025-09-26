// // =======================================================
// //   1. DOM Element References & Initialization
// // =======================================================
// const html = document.documentElement;
// const navbar = document.getElementById("navbar");
// const langSwitch = document.getElementById("lang-switch");
// const langMenu = document.getElementById("lang-menu");
// const themeToggleButton = document.getElementById("theme-toggle");
// const themeIcon = document.getElementById("theme-icon");
// const preloader = document.querySelector(".preloader");
// const currentYearElement = document.getElementById("current-year");
// const contactForm = document.getElementById("contactform");
// const submitButton = document.getElementById("send-msg");
// const submitIcon = document.getElementById("send-icon");
// const modal = document.getElementById("modal");
// const modalMessage = document.getElementById("modal-message");
// const modalCloseBtn = document.getElementById("modal-close-btn");
// const modalContent = document.getElementById("modal-content");
//
// // Google Form URL (ensure this is correct)
// const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScQW83ZO4ig1h-0JMDqr_d7_PxbPcxcz1SL1J48jexh7-y4Dg/formResponse";
//
// // =======================================================
// //   2. Utility Functions
// // =======================================================
//
// // --- Modal Functions ---
// const showModal = (message) => {
//     modalMessage.textContent = message;
//     modal.classList.remove("hidden");
//     setTimeout(() => {
//         modalContent.classList.remove("-translate-y-10", "scale-95");
//         modalContent.classList.add("translate-y-0", "scale-100");
//     }, 10);
// };
//
// const hideModal = () => {
//     modalContent.classList.add("-translate-y-10", "scale-95");
//     modalContent.classList.remove("translate-y-0", "scale-100");
//     setTimeout(() => {
//         modal.classList.add("hidden");
//     }, 300); // Match Tailwind transition duration
// };
//
// // --- Form Validation ---
// const isValidEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
// };
//
// const validateContactForm = (nameInput, emailInput, messageInput) => {
//     let isValid = true;
//     const inputs = [nameInput, emailInput, messageInput];
//
//     inputs.forEach(input => {
//         if (input) input.classList.remove("border-red-500");
//     });
//
//     if (!nameInput || nameInput.value.trim() === "") {
//         nameInput.classList.add("border-red-500");
//         isValid = false;
//     }
//     if (!emailInput || !isValidEmail(emailInput.value.trim())) {
//         emailInput.classList.add("border-red-500");
//         isValid = false;
//     }
//     if (!messageInput || messageInput.value.trim() === "") {
//         messageInput.classList.add("border-red-500");
//         isValid = false;
//     }
//
//     return isValid;
// };
//
// // =======================================================
// //   3. Event Listeners & Main Logic
// // =======================================================
//
// document.addEventListener("DOMContentLoaded", () => {
//     // --- Preloader Fade Out ---
//     if (preloader) {
//         preloader.classList.add("fade-out");
//         setTimeout(() => {
//             preloader.style.display = "none";
//         }, 100);
//     }
//
//     // --- Footer Year Update ---
//     if (currentYearElement) {
//         currentYearElement.innerText = new Date().getFullYear();
//     }
//
//     // --- Theme Switcher ---
//     const applyInitialTheme = () => {
//         const storedTheme = localStorage.getItem("theme");
//         const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
//         const useDark = storedTheme === "dark" || (!storedTheme && prefersDark);
//
//         if (useDark) {
//             html.classList.add("dark");
//             themeIcon.classList.replace("fa-sun", "fa-moon");
//         } else {
//             html.classList.remove("dark");
//             themeIcon.classList.replace("fa-moon", "fa-sun");
//         }
//     };
//
//     const toggleTheme = () => {
//         const currentTheme = localStorage.getItem("theme");
//         if (currentTheme === "dark") {
//             html.classList.remove("dark");
//             themeIcon.classList.replace("fa-moon", "fa-sun");
//             localStorage.setItem("theme", "light");
//         } else {
//             html.classList.add("dark");
//             themeIcon.classList.replace("fa-sun", "fa-moon");
//             localStorage.setItem("theme", "dark");
//         }
//     };
//
//     if (themeToggleButton) {
//         themeToggleButton.addEventListener("click", toggleTheme);
//         applyInitialTheme();
//     }
//
//     // --- Navbar Scroll Shrink ---
//     window.addEventListener("scroll", () => {
//         if (navbar) {
//             if (window.scrollY > 50) {
//                 navbar.classList.add("shrink");
//             } else {
//                 navbar.classList.remove("shrink");
//             }
//         }
//     });
//
//     // --- Contact Form Submission ---
//     if (contactForm) {
//         contactForm.addEventListener("submit", (event) => {
//             event.preventDefault();
//
//             const nameInput = contactForm.querySelector("input[type='text']");
//             const emailInput = contactForm.querySelector("input[type='email']");
//             const messageInput = contactForm.querySelector("textarea");
//
//             if (!validateContactForm(nameInput, emailInput, messageInput)) {
//                 return;
//             }
//
//             if (submitIcon) submitIcon.classList.replace("fa-paper-plane", "fa-spinner fa-spin");
//             submitButton.disabled = true;
//
//             const formData = new FormData(contactForm);
//
//             fetch(FORM_URL, {
//                 method: "POST",
//                 mode: "no-cors",
//                 body: formData,
//             })
//                 .then(() => {
//                     showModal("Thank you, your message has been sent!");
//                     contactForm.reset();
//                 })
//                 .catch(() => {
//                     showModal("Sorry! Something went wrong.");
//                 })
//                 .finally(() => {
//                     if (submitIcon) submitIcon.classList.replace("fa-spinner fa-spin", "fa-paper-plane");
//                     submitButton.disabled = false;
//                 });
//         });
//     }
//
//     // --- Language Switcher ---
//     const langSwitcher = (isExpanded) => {
//         langSwitch.setAttribute("aria-expanded", String(!isExpanded));
//         langMenu.classList.toggle("hidden");
//         langSwitch.classList.toggle("rounded-b-full");
//         langMenu.classList.toggle("active");
//     }
//     if (langSwitch && langMenu) {
//         langSwitch.addEventListener("click", (e) => {
//             e.stopPropagation();
//             const isExpanded = langSwitch.getAttribute("aria-expanded") === "true";
//             langSwitcher(isExpanded);
//         });
//
//         document.addEventListener("click", (e) => {
//             const isExpanded = langSwitch.getAttribute("aria-expanded") === "true";
//             if (isExpanded) {
//                 langSwitcher(isExpanded);
//             }
//         });
//     }
//
//     // --- Modal Closing ---
//     if (modalCloseBtn) {
//         modalCloseBtn.addEventListener("click", hideModal);
//     }
// });
//
//
// // Mobile menu
//   const mobileMenu = document.getElementById("mobile-menu");
//   const mobileClose = document.getElementById("mobile-close");
//   const mobileToggle = document.getElementById("mobile-toggle");
//   if (mobileToggle && mobileMenu && mobileClose) {
//     mobileToggle.addEventListener("click", () => {
//       mobileMenu.classList.remove("hidden");
//       setTimeout(() => mobileMenu.classList.add("show"), 10);
//     });
//     const closeMenu = () => {
//       mobileMenu.classList.remove("show");
//       setTimeout(() => mobileMenu.classList.add("hidden"), 300);
//     };
//     mobileClose.addEventListener("click", closeMenu);
//     mobileMenu.addEventListener("click", closeMenu);
//   }


// =======================================================
//   1. DOM Element References & Initialization
// =======================================================
const html = document.documentElement;
const navbar = document.getElementById("navbar");
const langSwitch = document.getElementById("lang-switch");
const langMenu = document.getElementById("lang-menu");
const themeToggleButton = document.getElementById("theme-toggle");
const themeToggleButton2 = document.getElementById("theme-toggle-2");
const themeIcon = document.getElementById("theme-icon");
const themeIcon2 = document.getElementById("theme-icon-2");
const preloader = document.querySelector(".preloader");
const currentYearElement = document.getElementById("current-year");
const contactForm = document.getElementById("contactform");
const submitButton = document.getElementById("send-msg");
const submitIcon = document.getElementById("send-icon");
const modal = document.getElementById("modal");
const modalMessage = document.getElementById("modal-message");
const modalCloseBtn = document.getElementById("modal-close-btn");
const modalContent = document.getElementById("modal-content");

// Mobile menu elements
const mobileMenu = document.getElementById("mobile-menu");
const mobileClose = document.getElementById("mobile-close");
const mobileToggle = document.getElementById("mobile-toggle");

// Google Form URL
const FORM_URL = "https://docs.google.com/forms/d/e/1FAIpQLScQW83ZO4ig1h-0JMDqr_d7_PxbPcxcz1SL1J48jexh7-y4Dg/formResponse";

// =======================================================
//   2. Utility Functions
// =======================================================

// --- Modal Functions ---
const showModal = (message) => {
    modalMessage.textContent = message;
    modal.classList.remove("hidden");
    setTimeout(() => {
        modalContent.classList.remove("-translate-y-10", "scale-95");
        modalContent.classList.add("translate-y-0", "scale-100");
    }, 10);
};

const hideModal = () => {
    modalContent.classList.add("-translate-y-10", "scale-95");
    modalContent.classList.remove("translate-y-0", "scale-100");
    setTimeout(() => {
        modal.classList.add("hidden");
    }, 300);
};

// --- Form Validation ---
const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateContactForm = (nameInput, emailInput, messageInput) => {
    let isValid = true;
    [nameInput, emailInput, messageInput].forEach(input => {
        if (input) input.classList.remove("border-red-500");
    });

    if (!nameInput?.value.trim()) {
        nameInput.classList.add("border-red-500");
        isValid = false;
    }
    if (!emailInput?.value.trim() || !isValidEmail(emailInput.value.trim())) {
        emailInput.classList.add("border-red-500");
        isValid = false;
    }
    if (!messageInput?.value.trim()) {
        messageInput.classList.add("border-red-500");
        isValid = false;
    }

    return isValid;
};

// =======================================================
//   3. Event Listeners & Main Logic
// =======================================================

document.addEventListener("DOMContentLoaded", () => {
    // --- Preloader Fade Out ---
    if (preloader) {
        preloader.classList.add("fade-out");
        setTimeout(() => preloader.style.display = "none", 100);
    }

    // --- Footer Year Update ---
    if (currentYearElement) {
        currentYearElement.innerText = new Date().getFullYear();
    }

    // --- Theme Switcher ---
    const applyInitialTheme = () => {
        const storedTheme = localStorage.getItem("theme");
        const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
        const useDark = storedTheme === "dark" || (!storedTheme && prefersDark);

        if (useDark) {
            html.classList.add("dark");
            themeIcon?.classList.replace("fa-sun", "fa-moon");
            themeIcon2?.classList.replace("fa-sun", "fa-moon");
        } else {
            html.classList.remove("dark");
            themeIcon?.classList.replace("fa-moon", "fa-sun");
            themeIcon2?.classList.replace("fa-moon", "fa-sun");
        }
    };

    const toggleTheme = () => {
        const currentTheme = localStorage.getItem("theme");
        if (currentTheme === "dark") {
            html.classList.remove("dark");
            themeIcon?.classList.replace("fa-moon", "fa-sun");
            themeIcon2?.classList.replace("fa-moon", "fa-sun");
            localStorage.setItem("theme", "light");
        } else {
            html.classList.add("dark");
            themeIcon?.classList.replace("fa-sun", "fa-moon");
            themeIcon2?.classList.replace("fa-sun", "fa-moon");
            localStorage.setItem("theme", "dark");
        }
    };

    if (themeToggleButton) themeToggleButton.addEventListener("click", toggleTheme);
    if (themeToggleButton2) themeToggleButton2.addEventListener("click", toggleTheme);
    applyInitialTheme();

    // --- Navbar Scroll Shrink ---
    window.addEventListener("scroll", () => {
        if (navbar) {
            navbar.classList.toggle("shrink", window.scrollY > 50);
        }
    });

    // --- Contact Form Submission ---
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const nameInput = contactForm.querySelector("input[type='text']");
            const emailInput = contactForm.querySelector("input[type='email']");
            const messageInput = contactForm.querySelector("textarea");

            if (!validateContactForm(nameInput, emailInput, messageInput)) return;

            if (submitIcon) {
                submitIcon.classList.remove("fa-paper-plane");
                submitIcon.classList.add("fa-spinner", "fa-spin");
            }
            submitButton.disabled = true;

            const formData = new FormData(contactForm);

            fetch(FORM_URL, { method: "POST", mode: "no-cors", body: formData })
                .then(() => {
                    showModal("Thank you, your message has been sent!");
                    contactForm.reset();
                })
                .catch(() => {
                    showModal("Sorry! Something went wrong.");
                })
                .finally(() => {
                    if (submitIcon) {
                        submitIcon.classList.remove("fa-spinner", "fa-spin");
                        submitIcon.classList.add("fa-paper-plane");
                    }
                    submitButton.disabled = false;
                });
        });
    }

    // --- Language Switcher ---
    const langSwitcher = (isExpanded) => {
        langSwitch.setAttribute("aria-expanded", String(!isExpanded));
        langMenu.classList.toggle("hidden");
    };
    if (langSwitch && langMenu) {
        langSwitch.addEventListener("click", (e) => {
            e.stopPropagation();
            const isExpanded = langSwitch.getAttribute("aria-expanded") === "true";
            langSwitcher(isExpanded);
        });
        document.addEventListener("click", (e) => {
            const isExpanded = langSwitch.getAttribute("aria-expanded") === "true";
            if (isExpanded) langSwitcher(isExpanded);
        });
    }

    // --- Modal Closing ---
    modalCloseBtn?.addEventListener("click", hideModal);

    // --- Mobile Menu ---
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
    }

    // --- Reveal on scroll for timelines ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // --- Highlight active nav link on scroll ---
    const sections = Array.from(document.querySelectorAll('header[id], section[id]'));
    const navLinks = Array.from(document.querySelectorAll('a.nav-link[href^="#"]'));

    const setActive = (id) => {
        navLinks.forEach((a) => {
            const href = a.getAttribute('href');
            if (!href) return;
            const target = href.replace('#','');
            const isActive = target === id;
            a.classList.toggle('active', isActive);
            if (isActive) {
              a.setAttribute('aria-current', 'true');
            } else {
              a.removeAttribute('aria-current');
            }
        });
    };

    const updateActiveLink = () => {
        const viewportCenter = window.innerHeight / 2;
        let candidate = null;
        let minDist = Infinity;
        sections.forEach((sec) => {
            const rect = sec.getBoundingClientRect();
            const secCenter = rect.top + rect.height / 2;
            const withinView = rect.top <= viewportCenter && rect.bottom >= viewportCenter;
            const dist = Math.abs(secCenter - viewportCenter);
            if (withinView && dist < minDist) {
                minDist = dist;
                candidate = sec.id;
            }
        });
        if (!candidate) {
            // Fallback: choose the first section whose top is just below the top
            let first = null;
            sections.forEach((sec) => {
                const rect = sec.getBoundingClientRect();
                if (rect.top >= 0 && (first === null || rect.top < first.top)) {
                    first = { id: sec.id, top: rect.top };
                }
            });
            if (first) candidate = first.id;
        }
        if (candidate) setActive(candidate);
    };

    let ticking = false;
    const onScroll = () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateActiveLink();
                ticking = false;
            });
            ticking = true;
        }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', updateActiveLink);
    updateActiveLink();
});
