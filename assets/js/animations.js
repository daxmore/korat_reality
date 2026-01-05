document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);



    const navLinks = document.querySelectorAll(".nav-link");
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const menuCloseBtn = document.getElementById('menuCloseBtn');



    // Hero and header animations
    gsap.from(".main-header", {
        y: -30,
        opacity: 0,
        duration: 2,
        ease: "power3.out"
    }, "-=0.8");

    gsap.from(".hero-title", {
        y: 100,
        opacity: 0,
        duration: 1.4,
        ease: "power4.out",
        skewY: 2
    }, "-=1.0");

    gsap.from(".hero-description", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    }, "-=1.0");

    gsap.from(".hero-buttons", {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out"
    }, "-=1.2");


    // ============================================
    // SCROLL ANIMATIONS (ScrollTrigger)
    // ============================================

    // 1. Section Titles (Reveal Up on Scroll)
    gsap.utils.toArray(".section-title, .bg-dark h2, .services-section h2, .why-korat-title").forEach(function (element) {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play none none reverse"
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // 2. About Lead Paragraph (Specific Reveal)
    gsap.from(".hero-lead-reveal", {
        scrollTrigger: {
            trigger: ".hero-lead-reveal",
            start: "top 85%"
        },
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    });

    // 3. Cards & Grid Items
    // About Section Columns
    gsap.from(".about-section .col-lg-4", {
        scrollTrigger: {
            trigger: ".about-section .row.g-5",
            start: "top 75%"
        },
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Services
    gsap.utils.toArray(".services-grid > div").forEach(function (card) {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%"
            },
            y: 50, // Subtle move
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        });
    });

    // Why Korat Rows
    gsap.utils.toArray("#why-korat .row.py-5").forEach(function (row) {
        gsap.from(row, {
            scrollTrigger: {
                trigger: row,
                start: "top 90%"
            },
            x: -30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });

    // Process Steps
    gsap.from(".process-wrapper .col-lg-3", {
        scrollTrigger: {
            trigger: ".process-wrapper",
            start: "top 75%"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out"
    });

    // Main Feature Image Reveal (Scale Up)
    gsap.from(".reveal-scale-up", {
        scrollTrigger: {
            trigger: ".reveal-scale-up",
            start: "top 80%"
        },
        scale: 0.95,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    });

    // Content Reveal (Opportunities, NRI, CTA)
    gsap.utils.toArray(".reveal-content").forEach(function (elem) {
        let children = elem.querySelectorAll("h2, p, h6, .row, a, .btn, .mb-4");
        gsap.from(children, {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%"
            },
            y: 30,
            opacity: 0,
            duration: 0.8,
            stagger: 0.05,
            ease: "power3.out"
        });
    });


    // ============================================
    // MENU LOGIC
    // ============================================
    function toggleMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.toggle('is-active');
        if (mobileMenu.classList.contains('is-active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }

    if (menuToggleBtn) menuToggleBtn.addEventListener('click', toggleMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', toggleMenu);

    const menuLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];
    menuLinks.forEach(link => {
        if (link.hasAttribute('data-bs-toggle') && link.getAttribute('data-bs-toggle') === 'collapse') {
            return;
        }
        link.addEventListener('click', function () {
            if (mobileMenu.classList.contains('is-active')) {
                toggleMenu();
            }
        });
    });
});
