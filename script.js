/* =========================================================
   MUHAMMAD MOIZ PORTFOLIO
   CLEAN & STABLE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* ================= MOBILE MENU ================= */

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinks = document.querySelectorAll(".nav-link");

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");

            menuToggle.textContent = isOpen ? "✕" : "☰";
            menuToggle.setAttribute("aria-expanded", isOpen);
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("open");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            });
        });

        // Close menu when clicking outside
        document.addEventListener("click", (event) => {
            if (
                navMenu.classList.contains("open") &&
                !navMenu.contains(event.target) &&
                !menuToggle.contains(event.target)
            ) {
                navMenu.classList.remove("open");
                menuToggle.textContent = "☰";
                menuToggle.setAttribute("aria-expanded", "false");
            }
        });

    }


    /* ================= DARK / LIGHT MODE ================= */

    const themeToggle = document.getElementById("themeToggle");

    if (themeToggle) {

        const savedTheme = localStorage.getItem("portfolio-theme");

        // Apply saved theme
        if (savedTheme === "light") {
            document.body.classList.add("light-theme");
        }

        updateThemeButton();


        themeToggle.addEventListener("click", () => {

            document.body.classList.toggle("light-theme");

            const isLight =
                document.body.classList.contains("light-theme");

            localStorage.setItem(
                "portfolio-theme",
                isLight ? "light" : "dark"
            );

            updateThemeButton();

        });


        function updateThemeButton() {

            const isLight =
                document.body.classList.contains("light-theme");

            themeToggle.textContent = isLight ? "🌙" : "☀️";

            themeToggle.setAttribute(
                "aria-label",
                isLight
                    ? "Switch to dark mode"
                    : "Switch to light mode"
            );

            themeToggle.setAttribute(
                "title",
                isLight
                    ? "Switch to dark mode"
                    : "Switch to light mode"
            );
        }

    }


    /* ================= SCROLL REVEAL ================= */

    const revealElements =
        document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {

                    entries.forEach((entry) => {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("show");

                            observer.unobserve(entry.target);

                        }

                    });

                },
                {
                    threshold: 0.1,
                    rootMargin: "0px 0px -40px 0px"
                }
            );


        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });

    } else {

        // Fallback for older browsers
        revealElements.forEach((element) => {
            element.classList.add("show");
        });

    }


    /* ================= ACTIVE NAVIGATION ================= */

    const sections =
        document.querySelectorAll("section[id]");

    if (sections.length && navLinks.length) {

        const updateActiveNavigation = () => {

            const scrollPosition =
                window.scrollY + 180;

            let currentSection = "";

            sections.forEach((section) => {

                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;

                if (
                    scrollPosition >= sectionTop &&
                    scrollPosition < sectionTop + sectionHeight
                ) {
                    currentSection = section.id;
                }

            });


            navLinks.forEach((link) => {

                const target =
                    link.getAttribute("href");

                link.classList.toggle(
                    "active",
                    target === `#${currentSection}`
                );

            });

        };


        let ticking = false;

        window.addEventListener(
            "scroll",
            () => {

                if (!ticking) {

                    window.requestAnimationFrame(() => {

                        updateActiveNavigation();

                        ticking = false;

                    });

                    ticking = true;
                }

            },
            { passive: true }
        );


        updateActiveNavigation();

    }


    /* ================= CURRENT YEAR ================= */

    const yearElement =
        document.getElementById("year");

    if (yearElement) {
        yearElement.textContent =
            new Date().getFullYear();
    }


    /* ================= ESCAPE KEY ================= */

    document.addEventListener("keydown", (event) => {

        if (
            event.key === "Escape" &&
            navMenu &&
            navMenu.classList.contains("open")
        ) {

            navMenu.classList.remove("open");

            if (menuToggle) {
                menuToggle.textContent = "☰";
                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }

        }

    });

});
