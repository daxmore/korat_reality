document.addEventListener("DOMContentLoaded", function () {
    gsap.registerPlugin(ScrollTrigger);

    // ============================================
    // ============================================
    // SHERY JS INITIALIZATION (FASTER)
    // ============================================
    // 1. Mouse Follower (Refined)
    if (typeof Shery !== 'undefined') {
        Shery.mouseFollower({
            skew: true,
            ease: "cubic-bezier(0.23, 1, 0.320, 1)",
            duration: 0.4,
        });

        // 2. Magnet Effect (Shery.js - Ultra Fast)
        Shery.makeMagnet(".btn, .nav-link, .menu-link-large, .magnet-target", {
            ease: "cubic-bezier(0.23, 1, 0.320, 1)",
            duration: 0.2, // Ultra fast response (similar to custom)
        });
    }

    // ============================================
    // HELPER: SPLIT TEXT
    // ============================================
    function splitTextToWords(selector) {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
            if (el.dataset.splitted) return;
            const text = el.innerText;
            const words = text.split(" ");
            el.innerHTML = "";
            words.forEach(word => {
                const wrapper = document.createElement("span");
                wrapper.style.display = "inline-block";
                wrapper.style.overflow = "hidden";
                wrapper.style.verticalAlign = "bottom";
                wrapper.style.marginRight = "0.25em";

                const inner = document.createElement("span");
                inner.style.display = "inline-block";
                inner.className = "word-inner";
                inner.innerText = word;

                wrapper.appendChild(inner);
                el.appendChild(wrapper);
            });
            el.dataset.splitted = "true";
        });
    }

    splitTextToWords(".about-title-anim");

    // ============================================
    // HERO / HEADER (On Load - One time - FASTER)
    // ============================================
    const headerTimeline = gsap.timeline();

    headerTimeline
        .from(".main-header", {
            y: -30, opacity: 0, duration: 1.0, ease: "power3.out"
        })
        .from(".hero-title", {
            y: 50, opacity: 0, duration: 0.8, ease: "power3.out"
        }, "-=0.6")
        .from(".hero-description", {
            y: 30, opacity: 0, duration: 0.6, ease: "power3.out"
        }, "-=0.5")
        .from(".hero-buttons", {
            y: 20, opacity: 0, duration: 0.5, ease: "power3.out"
        }, "-=0.4");


    // ============================================
    // SCROLL ANIMATIONS (Replayable & Fast)
    // Global Config: toggleActions: "play reverse play reverse"
    // ============================================

    // 1. ABOUT TITLE: Word Stagger Reveal
    gsap.from(".about-title-anim .word-inner", {
        scrollTrigger: {
            trigger: ".about-title-anim",
            start: "top 85%",
            toggleActions: "play reverse play reverse"
        },
        y: "100%",
        opacity: 0,
        duration: 0.6, // Faster
        stagger: 0.03, // Tighter stagger
        ease: "power4.out"
    });

    // 2. ABOUT LEAD PARAGRAPH
    gsap.from(".hero-lead-reveal", {
        scrollTrigger: {
            trigger: ".hero-lead-reveal",
            start: "top 85%",
            toggleActions: "play reverse play reverse"
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
    });

    // 3. ABOUT IMAGE: Clip-Path Reveal + Zoom Out Parallax
    gsap.from(".about-image-wrapper", {
        scrollTrigger: {
            trigger: ".about-image-wrapper",
            start: "top 85%",
            toggleActions: "play reverse play reverse"
        },
        clipPath: "inset(10% 10% 10% 10%)",
        opacity: 0,
        duration: 1.0, // Faster reveal
        ease: "expo.out"
    });

    // Zoom Out Effect (Parallax)
    gsap.to(".parallax-image", {
        scrollTrigger: {
            trigger: ".about-image-wrapper",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5 // More responsive scrubbing
        },
        scale: 1.0,
        yPercent: 10,
        ease: "none"
    });

    // 4. ABOUT COLUMNS (Staggered Slide Up)
    gsap.from(".about-section .row.g-5 .col-lg-4 > div:not(.reveal-center-width)", {
        scrollTrigger: {
            trigger: ".about-section .row.g-5",
            start: "top 75%",
            toggleActions: "play reverse play reverse"
        },
        y: 40, // Reduced distance
        opacity: 0,
        duration: 0.8,
        scale: 0.98,
        stagger: 0.1, // Faster flow
        ease: "power3.out"
    });

    // 4.1 ABOUT BOTTOM IMAGES (Center Reveal)
    gsap.utils.toArray(".reveal-center-width").forEach(function (img) {
        gsap.from(img, {
            scrollTrigger: {
                trigger: img,
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            },
            clipPath: "inset(0 50% 0 50%)",
            opacity: 0,
            duration: 1.0, // Faster
            ease: "expo.out"
        });
    });



    // 5. GENERIC SECTION TITLES
    gsap.utils.toArray(".section-title, .bg-dark h2, .services-section h2, .why-korat-title").forEach(function (element) {
        gsap.from(element, {
            scrollTrigger: {
                trigger: element,
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out"
        });
    });

    // 6. SERVICES GRID ITEMS
    gsap.utils.toArray(".services-grid > div").forEach(function (card, index) {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            },
            y: 40,
            opacity: 0,
            duration: 0.6,
            delay: index % 2 === 0 ? 0 : 0.1,
            ease: "power3.out"
        });
    });

    // 7. WHY KORAT ROWS
    gsap.utils.toArray("#why-korat .row.py-5").forEach(function (row) {
        gsap.from(row, {
            scrollTrigger: {
                trigger: row,
                start: "top 90%",
                toggleActions: "play reverse play reverse"
            },
            x: -20,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out"
        });
    });

    // 8. PROCESS STEPS
    gsap.from(".process-wrapper .col-lg-3", {
        scrollTrigger: {
            trigger: ".process-wrapper",
            start: "top 80%",
            toggleActions: "play reverse play reverse"
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power3.out"
    });

    // 9. GENERIC REVEALS (Content, Images)
    gsap.utils.toArray(".reveal-content, .reveal-scale-up").forEach(function (elem) {
        let animVars = {
            scrollTrigger: {
                trigger: elem,
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            },
            y: 30,
            opacity: 0,
            duration: 0.6,
            ease: "power3.out"
        };

        if (elem.classList.contains('reveal-scale-up')) {
            animVars.scale = 0.95;
            animVars.y = 0;
            animVars.duration = 0.8;
        }

        gsap.from(elem, animVars);
    });

    // ============================================
    // 10. ABOUT PAGE SPECIFIC ANIMATIONS
    // ============================================

    // 1. Hero Content Stagger (About Page)
    if (document.querySelector('.hero-bg-wrapper')) {
        const aboutHeroTl = gsap.timeline();

        // Scale down bg image slightly
        aboutHeroTl.from(".hero-bg-wrapper", {
            scale: 1.1,
            duration: 1.5,
            ease: "power2.out"
        })
            .from(".hero-content.reveal-content h1", {
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out"
            }, "-=1.0");
    }

    // 2. Who We Are Section
    if (document.querySelector('#who-we-are')) {
        // Title Reveal
        gsap.from("#who-we-are h2", {
            scrollTrigger: {
                trigger: "#who-we-are",
                start: "top 80%",
                toggleActions: "play reverse play reverse"
            },
            x: -50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });

        // Paragraphs Stagger
        gsap.from("#who-we-are p", {
            scrollTrigger: {
                trigger: "#who-we-are",
                start: "top 75%",
                toggleActions: "play reverse play reverse"
            },
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8,
            ease: "power3.out"
        });
    }

    // 3. Vision & Mission Cards
    const visionCards = document.querySelectorAll('#our-mission .col-lg-4');
    if (visionCards.length > 0) {
        gsap.from(visionCards, {
            scrollTrigger: {
                trigger: "#our-mission",
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            stagger: 0.2, // Stagger effect for 3 columns
            ease: "back.out(1.7)"
        });
    }

    // 4. Specialization Cards (Hover Lift Effect is in CSS, this is entrance)
    const specCards = document.querySelectorAll('.bg-warning-subtle');
    if (specCards.length > 0) {
        gsap.from(specCards, {
            scrollTrigger: {
                trigger: specCards[0], // Trigger first one
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            },
            y: 40,
            opacity: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power2.out"
        });
    }

    // 5. Approach List Items
    const approachItems = document.querySelectorAll('#approach ul li');
    if (approachItems.length > 0) {
        gsap.from(approachItems, {
            scrollTrigger: {
                trigger: "#approach",
                start: "top 75%",
                toggleActions: "play reverse play reverse"
            },
            x: -30,
            opacity: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: "power2.out"
        });
    }


    // ============================================
    // MENU LOGIC
    // ============================================
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const menuCloseBtn = document.getElementById('menuCloseBtn');

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

// ============================================
// 8. SERVICE ICON HOVER ANIMATION
// ============================================
// Select the new triggers we added
const serviceHeaders = document.querySelectorAll('.service-header-trigger');

serviceHeaders.forEach(header => {
    const iconAnim = header.querySelector('.service-icon-anim');
    if (!iconAnim) return;

    const arrowMain = iconAnim.querySelector('.arrow-main');
    const arrowClone = iconAnim.querySelector('.arrow-clone');

    // Ensure initial state
    gsap.set(arrowClone, { x: '-100%', y: '100%' });

    header.addEventListener('mouseenter', () => {
        // Arrow Cycle
        gsap.to(arrowMain, {
            x: '100%',
            y: '-100%',
            duration: 0.4,
            ease: 'power2.in',
            overwrite: true
        });
        gsap.to(arrowClone, {
            x: '0%',
            y: '0%',
            duration: 0.4,
            delay: 0.1,
            ease: 'power2.out',
            overwrite: true
        });
    });

    header.addEventListener('mouseleave', () => {
        // Arrow Reverse
        gsap.to(arrowClone, {
            x: '-100%',
            y: '100%',
            duration: 0.4,
            ease: 'power2.in',
            overwrite: true
        });
        gsap.to(arrowMain, {
            x: '0%',
            y: '0%',
            duration: 0.4,
            delay: 0.1,
            ease: 'power2.out',
            overwrite: true
        });
    });
});


