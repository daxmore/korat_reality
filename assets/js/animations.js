/**
 * Korat Reality - GSAP Animations
 * RELOAD-SAFE VERSION
 * 
 * Pattern used: gsap.set() for initial state + gsap.to() with ScrollTrigger
 * This ensures elements are always visible on page load, regardless of scroll position.
 * 
 * WHY THE PREVIOUS CODE CAUSED BLANK STATES:
 * - gsap.from() with toggleActions: "play reverse play reverse" sets elements to their
 *   "from" state (opacity: 0, y: 30, etc.) on initialization
 * - On page reload, if user was scrolled past the trigger point, the animation
 *   stays in "reversed" state = elements remain hidden
 * - The "reverse" action means scroll-up causes elements to return to hidden state
 */

document.addEventListener("DOMContentLoaded", function () {
    // Guard: Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded - animations disabled');
        return;
    }

    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // ============================================
    // SHERY JS INITIALIZATION
    // ============================================
    if (typeof Shery !== 'undefined') {
        Shery.mouseFollower({
            skew: true,
            ease: "cubic-bezier(0.23, 1, 0.320, 1)",
            duration: 0.4,
        });

        Shery.makeMagnet(".btn, .magnet-target", {
            ease: "cubic-bezier(0.23, 1, 0.320, 1)",
            duration: 0.2,
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
    // HERO / HEADER (On Load - One time)
    // These are NOT scroll-triggered, they run once on page load
    // Using fromTo ensures consistent behavior
    // ============================================
    const headerTimeline = gsap.timeline();

    headerTimeline
        .fromTo(".main-header",
            { y: -30, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.0, ease: "power3.out" }
        )
        .fromTo(".hero-title",
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
            "-=0.6"
        )
        .fromTo(".hero-description",
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
            "-=0.5"
        )
        .fromTo(".hero-buttons",
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: "power3.out" },
            "-=0.4"
        );


    // ============================================
    // SCROLL ANIMATIONS (RELOAD-SAFE)
    // Pattern: gsap.set() initial visible state, then gsap.to() for animation
    // Using toggleActions: "play none none none" - play once when entering
    // ============================================

    // 1. ABOUT TITLE: Word Stagger Reveal
    const wordInners = document.querySelectorAll(".about-title-anim .word-inner");
    if (wordInners.length > 0) {
        // Set initial state (visible)
        gsap.set(wordInners, { y: 0, opacity: 1 });

        gsap.fromTo(wordInners,
            { y: "100%", opacity: 0 },
            {
                scrollTrigger: {
                    trigger: ".about-title-anim",
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.03,
                ease: "power4.out"
            }
        );
    }

    // 2. ABOUT LEAD PARAGRAPH
    const heroLead = document.querySelector(".hero-lead-reveal");
    if (heroLead) {
        gsap.set(heroLead, { y: 0, opacity: 1 });

        gsap.fromTo(heroLead,
            { y: 30, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: ".hero-lead-reveal",
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: "power3.out"
            }
        );
    }

    // 3. ABOUT IMAGE: Clip-Path Reveal
    const aboutImageWrapper = document.querySelector(".about-image-wrapper");
    if (aboutImageWrapper) {
        gsap.set(aboutImageWrapper, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 });

        gsap.fromTo(aboutImageWrapper,
            { clipPath: "inset(10% 10% 10% 10%)", opacity: 0 },
            {
                scrollTrigger: {
                    trigger: ".about-image-wrapper",
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                clipPath: "inset(0% 0% 0% 0%)",
                opacity: 1,
                duration: 1.0,
                ease: "expo.out"
            }
        );
    }

    // Zoom Out Effect (Parallax) - This is fine as scrub-based
    const parallaxImage = document.querySelector(".parallax-image");
    if (parallaxImage) {
        gsap.to(".parallax-image", {
            scrollTrigger: {
                trigger: ".about-image-wrapper",
                start: "top bottom",
                end: "bottom top",
                scrub: 0.5
            },
            scale: 1.0,
            yPercent: 10,
            ease: "none"
        });
    }

    // 4. ABOUT COLUMNS (Staggered Slide Up)
    const aboutColumns = document.querySelectorAll(".about-section .row.g-5 .col-lg-4 > div:not(.reveal-center-width)");
    if (aboutColumns.length > 0) {
        gsap.set(aboutColumns, { y: 0, opacity: 1, scale: 1 });

        gsap.fromTo(aboutColumns,
            { y: 40, opacity: 0, scale: 0.98 },
            {
                scrollTrigger: {
                    trigger: ".about-section .row.g-5",
                    start: "top 75%",
                    toggleActions: "play none none none"
                },
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                stagger: 0.1,
                ease: "power3.out"
            }
        );
    }

    // 4.1 ABOUT BOTTOM IMAGES (Center Reveal)
    gsap.utils.toArray(".reveal-center-width").forEach(function (img) {
        gsap.set(img, { clipPath: "inset(0 0% 0 0%)", opacity: 1 });

        gsap.fromTo(img,
            { clipPath: "inset(0 50% 0 50%)", opacity: 0 },
            {
                scrollTrigger: {
                    trigger: img,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                clipPath: "inset(0 0% 0 0%)",
                opacity: 1,
                duration: 1.0,
                ease: "expo.out"
            }
        );
    });

    // 5. GENERIC SECTION TITLES
    gsap.utils.toArray(".section-title, .bg-dark h2, .services-section h2, .why-korat-title").forEach(function (element) {
        gsap.set(element, { y: 0, opacity: 1 });

        gsap.fromTo(element,
            { y: 40, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: element,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out"
            }
        );
    });

    // 6. SERVICES GRID ITEMS
    gsap.utils.toArray(".services-grid > div").forEach(function (card, index) {
        gsap.set(card, { y: 0, opacity: 1 });

        gsap.fromTo(card,
            { y: 40, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: card,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                delay: index % 2 === 0 ? 0 : 0.1,
                ease: "power3.out"
            }
        );
    });

    // 7. WHY KORAT ROWS
    gsap.utils.toArray("#why-korat .row.py-5").forEach(function (row) {
        gsap.set(row, { x: 0, opacity: 1 });

        gsap.fromTo(row,
            { x: -20, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: row,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                x: 0,
                opacity: 1,
                duration: 0.6,
                ease: "power3.out"
            }
        );
    });

    // 8. PROCESS STEPS
    const processSteps = document.querySelectorAll(".process-wrapper .col-lg-3");
    if (processSteps.length > 0) {
        gsap.set(processSteps, { y: 0, opacity: 1 });

        gsap.fromTo(processSteps,
            { y: 30, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: ".process-wrapper",
                    start: "top 80%",
                    toggleActions: "play none none none"
                },
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power3.out"
            }
        );
    }

    // 9. GENERIC REVEALS (Content, Images)
    gsap.utils.toArray(".reveal-content, .reveal-scale-up").forEach(function (elem) {
        const isScaleUp = elem.classList.contains('reveal-scale-up');

        // Set initial visible state
        gsap.set(elem, { y: 0, opacity: 1, scale: 1 });

        if (isScaleUp) {
            gsap.fromTo(elem,
                { scale: 0.95, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    scale: 1,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out"
                }
            );
        } else {
            gsap.fromTo(elem,
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: "power3.out"
                }
            );
        }
    });

    // ============================================
    // 10. ABOUT PAGE SPECIFIC ANIMATIONS
    // ============================================

    // 1. Hero Content (About Page) - One-time on load, NOT scroll-triggered
    if (document.querySelector('.hero-bg-wrapper')) {
        const aboutHeroTl = gsap.timeline();

        aboutHeroTl.fromTo(".hero-bg-wrapper",
            { scale: 1.1 },
            { scale: 1, duration: 1.5, ease: "power2.out" }
        )
            .fromTo(".hero-content.reveal-content h1",
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
                "-=1.0"
            );
    }

    // 2. Who We Are Section
    if (document.querySelector('#who-we-are')) {
        const whoH2 = document.querySelector("#who-we-are h2");
        if (whoH2) {
            gsap.set(whoH2, { x: 0, opacity: 1 });
            gsap.fromTo(whoH2,
                { x: -50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: "#who-we-are",
                        start: "top 80%",
                        toggleActions: "play none none none"
                    },
                    x: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: "power3.out"
                }
            );
        }

        const whoParas = document.querySelectorAll("#who-we-are p");
        if (whoParas.length > 0) {
            gsap.set(whoParas, { y: 0, opacity: 1 });
            gsap.fromTo(whoParas,
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: "#who-we-are",
                        start: "top 75%",
                        toggleActions: "play none none none"
                    },
                    y: 0,
                    opacity: 1,
                    stagger: 0.2,
                    duration: 0.8,
                    ease: "power3.out"
                }
            );
        }
    }

    // 3. Vision & Mission Cards
    const visionCards = document.querySelectorAll('#our-mission .col-lg-4');
    if (visionCards.length > 0) {
        gsap.set(visionCards, { y: 0, opacity: 1 });
        gsap.fromTo(visionCards,
            { y: 50, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: "#our-mission",
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "back.out(1.7)"
            }
        );
    }

    // 4. Specialization Cards
    const specCards = document.querySelectorAll('.bg-warning-subtle');
    if (specCards.length > 0) {
        gsap.set(specCards, { y: 0, opacity: 1 });
        gsap.fromTo(specCards,
            { y: 40, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: specCards[0],
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            }
        );
    }

    // 5. Approach List Items
    const approachItems = document.querySelectorAll('#approach ul li');
    if (approachItems.length > 0) {
        gsap.set(approachItems, { x: 0, opacity: 1 });
        gsap.fromTo(approachItems,
            { x: -30, opacity: 0 },
            {
                scrollTrigger: {
                    trigger: "#approach",
                    start: "top 75%",
                    toggleActions: "play none none none"
                },
                x: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.1,
                ease: "power2.out"
            }
        );
    }


    // ============================================
    // FAQ SECTION SCROLL ANIMATIONS (RELOAD-SAFE)
    // ============================================
    if (document.querySelector('.faq-section')) {
        const faqLabel = document.querySelector('.faq-header-label');
        const faqTitle = document.querySelector('.faq-title');
        const faqIntro = document.querySelector('.faq-intro');
        const faqItemsAnim = document.querySelectorAll('.faq-item');
        const faqCta = document.querySelector('.faq-cta');

        // Set all to visible initially
        if (faqLabel) gsap.set(faqLabel, { y: 0, opacity: 1 });
        if (faqTitle) gsap.set(faqTitle, { y: 0, opacity: 1 });
        if (faqIntro) gsap.set(faqIntro, { y: 0, opacity: 1 });
        if (faqItemsAnim.length > 0) gsap.set(faqItemsAnim, { y: 0, opacity: 1 });
        if (faqCta) gsap.set(faqCta, { y: 0, opacity: 1 });

        // Header animation
        if (faqLabel) {
            gsap.fromTo(faqLabel,
                { y: 20, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: '.faq-section',
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    ease: 'power3.out'
                }
            );
        }

        if (faqTitle) {
            gsap.fromTo(faqTitle,
                { y: 40, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: '.faq-section',
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.1,
                    ease: 'power3.out'
                }
            );
        }

        if (faqIntro) {
            gsap.fromTo(faqIntro,
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: '.faq-section',
                        start: 'top 80%',
                        toggleActions: 'play none none none'
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    delay: 0.2,
                    ease: 'power3.out'
                }
            );
        }

        // FAQ Items stagger animation
        if (faqItemsAnim.length > 0) {
            gsap.fromTo(faqItemsAnim,
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: '.faq-accordion',
                        start: 'top 85%',
                        toggleActions: 'play none none none'
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: 'power3.out'
                }
            );
        }

        // CTA animation
        if (faqCta) {
            gsap.fromTo(faqCta,
                { y: 30, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: '.faq-cta',
                        start: 'top 90%',
                        toggleActions: 'play none none none'
                    },
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out'
                }
            );
        }
    }


    // ============================================
    // MENU LOGIC (Unchanged)
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
// SERVICE ICON HOVER ANIMATION (Unchanged - not scroll-triggered)
// ============================================
const serviceHeaders = document.querySelectorAll('.service-header-trigger');

serviceHeaders.forEach(header => {
    const iconAnim = header.querySelector('.service-icon-anim');
    if (!iconAnim) return;

    const arrowMain = iconAnim.querySelector('.arrow-main');
    const arrowClone = iconAnim.querySelector('.arrow-clone');

    // Ensure initial state
    if (typeof gsap !== 'undefined') {
        gsap.set(arrowClone, { x: '-100%', y: '100%' });
    }

    header.addEventListener('mouseenter', () => {
        if (typeof gsap === 'undefined') return;
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
        if (typeof gsap === 'undefined') return;
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

// ============================================
// FAQ ACCORDION FUNCTIONALITY (Unchanged - not scroll-triggered)
// ============================================
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    if (!question || !answer) return;

    question.addEventListener('click', () => {
        if (typeof gsap === 'undefined') return;

        const isActive = item.classList.contains('is-active');

        // Close all other items first
        faqItems.forEach(otherItem => {
            if (otherItem !== item && otherItem.classList.contains('is-active')) {
                const otherAnswer = otherItem.querySelector('.faq-answer');
                otherItem.classList.remove('is-active');
                otherItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');

                gsap.to(otherAnswer, {
                    maxHeight: 0,
                    duration: 0.5,
                    ease: 'power3.inOut'
                });
            }
        });

        // Toggle current item
        if (isActive) {
            item.classList.remove('is-active');
            question.setAttribute('aria-expanded', 'false');

            gsap.to(answer, {
                maxHeight: 0,
                duration: 0.5,
                ease: 'power3.inOut'
            });
        } else {
            item.classList.add('is-active');
            question.setAttribute('aria-expanded', 'true');

            const answerInner = answer.querySelector('.faq-answer-inner');
            const naturalHeight = answerInner ? answerInner.offsetHeight : 150;

            gsap.to(answer, {
                maxHeight: naturalHeight + 40,
                duration: 0.6,
                ease: 'power3.out'
            });
        }
    });
});
