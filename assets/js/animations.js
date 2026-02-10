/**
 * Korat Reality - Enhanced GSAP Scroll Animations
 * 10+ Different Animation Types Applied Uniquely Across All Pages
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
    // ANIMATION TYPE DEFINITIONS
    // ============================================

    const animationTypes = {
        // 1. Fade Up
        fadeUp: (elem, options = {}) => {
            gsap.set(elem, { y: 0, opacity: 1 });
            gsap.fromTo(elem,
                { y: 50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: options.start || "top 85%",
                        toggleActions: "play none none none"
                    },
                    y: 0,
                    opacity: 1,
                    duration: options.duration || 0.8,
                    ease: options.ease || "power3.out",
                    delay: options.delay || 0,
                    stagger: options.stagger || 0
                }
            );
        },

        // 2. Fade Down
        fadeDown: (elem, options = {}) => {
            gsap.set(elem, { y: 0, opacity: 1 });
            gsap.fromTo(elem,
                { y: -50, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: options.start || "top 85%",
                        toggleActions: "play none none none"
                    },
                    y: 0,
                    opacity: 1,
                    duration: options.duration || 0.8,
                    ease: options.ease || "power3.out",
                    delay: options.delay || 0,
                    stagger: options.stagger || 0
                }
            );
        },

        // 3. Slide From Left
        slideLeft: (elem, options = {}) => {
            gsap.set(elem, { x: 0, opacity: 1 });
            gsap.fromTo(elem,
                { x: -80, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: options.start || "top 85%",
                        toggleActions: "play none none none"
                    },
                    x: 0,
                    opacity: 1,
                    duration: options.duration || 0.9,
                    ease: options.ease || "power3.out",
                    delay: options.delay || 0,
                    stagger: options.stagger || 0
                }
            );
        },

        // 4. Slide From Right
        slideRight: (elem, options = {}) => {
            gsap.set(elem, { x: 0, opacity: 1 });
            gsap.fromTo(elem,
                { x: 80, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: options.start || "top 85%",
                        toggleActions: "play none none none"
                    },
                    x: 0,
                    opacity: 1,
                    duration: options.duration || 0.9,
                    ease: options.ease || "power3.out",
                    delay: options.delay || 0,
                    stagger: options.stagger || 0
                }
            );
        },

        // 5. Scale Up
        scaleUp: (elem, options = {}) => {
            gsap.set(elem, { scale: 1, opacity: 1 });
            gsap.fromTo(elem,
                { scale: 0.85, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: options.start || "top 85%",
                        toggleActions: "play none none none"
                    },
                    scale: 1,
                    opacity: 1,
                    duration: options.duration || 0.9,
                    ease: options.ease || "back.out(1.4)",
                    delay: options.delay || 0,
                    stagger: options.stagger || 0
                }
            );
        },

        // 6. Clip Path Reveal (Center)
        clipCenter: (elem, options = {}) => {
            gsap.set(elem, { clipPath: "inset(0 0% 0 0%)", opacity: 1 });
            gsap.fromTo(elem,
                { clipPath: "inset(0 50% 0 50%)", opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: options.start || "top 85%",
                        toggleActions: "play none none none"
                    },
                    clipPath: "inset(0 0% 0 0%)",
                    opacity: 1,
                    duration: options.duration || 1.0,
                    ease: options.ease || "expo.out",
                    delay: options.delay || 0
                }
            );
        },

        // 7. Clip Path Reveal (Top to Bottom)
        clipTop: (elem, options = {}) => {
            gsap.set(elem, { clipPath: "inset(0% 0% 0% 0%)", opacity: 1 });
            gsap.fromTo(elem,
                { clipPath: "inset(0% 0% 100% 0%)", opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: options.start || "top 85%",
                        toggleActions: "play none none none"
                    },
                    clipPath: "inset(0% 0% 0% 0%)",
                    opacity: 1,
                    duration: options.duration || 1.0,
                    ease: options.ease || "expo.out",
                    delay: options.delay || 0
                }
            );
        },

        // 8. Rotate In
        rotateIn: (elem, options = {}) => {
            gsap.set(elem, { rotation: 0, opacity: 1, scale: 1 });
            gsap.fromTo(elem,
                { rotation: -15, scale: 0.9, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: options.start || "top 85%",
                        toggleActions: "play none none none"
                    },
                    rotation: 0,
                    scale: 1,
                    opacity: 1,
                    duration: options.duration || 1.0,
                    ease: options.ease || "back.out(1.7)",
                    delay: options.delay || 0,
                    stagger: options.stagger || 0
                }
            );
        },

        // 9. Blur In
        blurIn: (elem, options = {}) => {
            gsap.set(elem, { filter: "blur(0px)", opacity: 1, y: 0 });
            gsap.fromTo(elem,
                { filter: "blur(10px)", opacity: 0, y: 30 },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: options.start || "top 85%",
                        toggleActions: "play none none none"
                    },
                    filter: "blur(0px)",
                    opacity: 1,
                    y: 0,
                    duration: options.duration || 0.9,
                    ease: options.ease || "power2.out",
                    delay: options.delay || 0,
                    stagger: options.stagger || 0
                }
            );
        },

        // 10. Split Reveal (Left + Right)
        splitReveal: (elem, options = {}) => {
            gsap.set(elem, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", opacity: 1 });
            gsap.fromTo(elem,
                { clipPath: "polygon(50% 0%, 50% 0%, 50% 100%, 50% 100%)", opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: options.start || "top 85%",
                        toggleActions: "play none none none"
                    },
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    opacity: 1,
                    duration: options.duration || 1.1,
                    ease: options.ease || "power3.out",
                    delay: options.delay || 0
                }
            );
        },

        // 11. Stagger Word Reveal
        wordReveal: (elem, options = {}) => {
            // Split text into words
            if (!elem.dataset.splitted) {
                const text = elem.innerText;
                const words = text.split(" ");
                elem.innerHTML = "";
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
                    elem.appendChild(wrapper);
                });
                elem.dataset.splitted = "true";
            }

            const wordInners = elem.querySelectorAll('.word-inner');
            gsap.set(wordInners, { y: 0, opacity: 1 });
            gsap.fromTo(wordInners,
                { y: "100%", opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: options.start || "top 85%",
                        toggleActions: "play none none none"
                    },
                    y: 0,
                    opacity: 1,
                    duration: options.duration || 0.6,
                    stagger: options.stagger || 0.03,
                    ease: options.ease || "power4.out"
                }
            );
        },

        // 12. Elastic Pop
        elasticPop: (elem, options = {}) => {
            gsap.set(elem, { scale: 1, opacity: 1 });
            gsap.fromTo(elem,
                { scale: 0, opacity: 0 },
                {
                    scrollTrigger: {
                        trigger: elem,
                        start: options.start || "top 85%",
                        toggleActions: "play none none none"
                    },
                    scale: 1,
                    opacity: 1,
                    duration: options.duration || 1.0,
                    ease: options.ease || "elastic.out(1, 0.6)",
                    delay: options.delay || 0,
                    stagger: options.stagger || 0
                }
            );
        }
    };

    // ============================================
    // HELPER FUNCTION TO APPLY ANIMATIONS
    // ============================================
    function applyAnimation(selector, animationType, options = {}) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0 && animationTypes[animationType]) {
            elements.forEach((elem, index) => {
                const elemOptions = { ...options };
                if (options.stagger && index > 0) {
                    elemOptions.delay = (options.delay || 0) + (options.stagger * index);
                    elemOptions.stagger = 0;
                }
                animationTypes[animationType](elem, elemOptions);
            });
        }
    }

    // ============================================
    // PAGE-SPECIFIC ANIMATION MAPPINGS
    // Each section gets a unique animation per page
    // ============================================

    // HERO SECTION (On Load - All Pages)
    const heroTimeline = gsap.timeline();
    heroTimeline
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
    // INDEX.HTML ANIMATIONS
    // ============================================

    // About/Overlap Section - Fade Up
    applyAnimation('.section-overlap .dashboard-header', 'fadeUp', { duration: 0.8 });
    applyAnimation('.section-overlap .inner-card', 'fadeUp', { stagger: 0.15, delay: 0.2 });

    // Services Section - Slide from Left
    applyAnimation('.services-section .section-title', 'slideLeft', { duration: 0.9 });
    applyAnimation('.service-card-new', 'scaleUp', { stagger: 0.12, duration: 0.8 });

    // Why Korat Section - Slide from Right
    applyAnimation('.why-korat-title', 'slideRight', { duration: 0.9 });
    applyAnimation('#why-korat .feature-item', 'fadeUp', { stagger: 0.1 });

    // Process Section - Rotate In
    applyAnimation('.process-section .process-header', 'fadeDown', { duration: 0.5 });
    applyAnimation('.process-step-card', 'rotateIn', { stagger: 0.05, duration: 0.5 });

    // FAQ Section - Blur In (Faster)
    applyAnimation('.faq-title', 'blurIn', { duration: 0.4 });
    applyAnimation('.faq-item', 'fadeUp', { stagger: 0.04, delay: 0.1, duration: 0.4 });

    // CTA Section - Scale Up
    applyAnimation('.cta-section h2', 'scaleUp', { duration: 1.0 });
    applyAnimation('.cta-section p', 'fadeUp', { delay: 0.2 });
    applyAnimation('.cta-section .btn', 'elasticPop', { delay: 0.4 });

    // ============================================
    // ABOUT.HTML ANIMATIONS
    // ============================================

    // Hero Content - Word Reveal
    if (document.querySelector('.about-title-anim')) {
        applyAnimation('.about-title-anim', 'wordReveal', { stagger: 0.03 });
    }

    // Who We Are - Clip Top
    applyAnimation('#who-we-are h2', 'clipTop', { duration: 1.0 });
    applyAnimation('#who-we-are p', 'fadeUp', { stagger: 0.2, delay: 0.3 });

    // Mission/Vision Cards - Elastic Pop
    applyAnimation('#our-mission .col-lg-4', 'elasticPop', { stagger: 0.2, duration: 1.0 });

    // Specialization - Slide Left
    applyAnimation('.bg-warning-subtle', 'slideLeft', { stagger: 0.15 });

    // Approach Section - Fade Down
    applyAnimation('#approach h2', 'fadeDown', { duration: 0.8 });
    applyAnimation('#approach ul li', 'fadeUp', { stagger: 0.1 });

    // Connect CTA - Split Reveal
    applyAnimation('#connect-cta .inner-card', 'splitReveal', { duration: 1.2 });

    // ============================================
    // CONTACT.HTML ANIMATIONS
    // ============================================

    // Contact Form Section - Slide Right
    applyAnimation('#contact-form h2', 'slideRight', { duration: 0.9 });
    applyAnimation('.form-group', 'fadeUp', { stagger: 0.1 });

    // Contact Info Cards - Scale Up
    applyAnimation('.contact-info-card', 'scaleUp', { stagger: 0.15, duration: 0.9 });

    // Map Section - Clip Center
    applyAnimation('#map-section', 'clipCenter', { duration: 1.1 });

    // ============================================
    // SERVICE PAGES (Land Acquisition, Development, Why Invest)
    // ============================================

    // Hero Content - Blur In
    applyAnimation('#land-hero .hero-content', 'blurIn', { duration: 1.0 });
    applyAnimation('#land-dev-hero .hero-content', 'blurIn', { duration: 1.0 });
    applyAnimation('#nri-hero .hero-content', 'blurIn', { duration: 1.0 });

    // Introduction Section - Rotate In
    applyAnimation('.intro-section h2', 'rotateIn', { duration: 0.9 });
    applyAnimation('.intro-section p', 'fadeUp', { delay: 0.2 });

    // Image Sections - Split Reveal
    applyAnimation('.image-wrapper', 'splitReveal', { duration: 1.1 });

    // Feature Lists - Slide Left
    applyAnimation('.features-list li', 'slideLeft', { stagger: 0.08 });

    // Benefits Section - Fade Down
    applyAnimation('.benefits-section h3', 'fadeDown', { duration: 0.8 });
    applyAnimation('.benefit-card', 'scaleUp', { stagger: 0.12 });

    // Stats Section - Elastic Pop
    applyAnimation('.stat-card', 'elasticPop', { stagger: 0.15, duration: 1.0 });

    // Content Rows - Alternating Animations
    const contentRows = document.querySelectorAll('.content-row');
    contentRows.forEach((row, index) => {
        // Simpler fadeUp for better performance on scroll
        animationTypes['fadeUp'](row, { duration: 0.6 });
    });

    // ============================================
    // BLOG DETAIL ANIMATIONS (Run on Load)
    // ============================================
    if (document.querySelector('#blog-detail')) {
        // PREVENT GENERIC TEXT ANIMATIONS
        // Mark text elements as 'animated' so generic fallbacks skip them
        const textElements = document.querySelectorAll('.blog-detail-section p, .blog-detail-section h1, .blog-detail-section h2, .blog-detail-section h3, .blog-detail-section h4, .blog-detail-section h5, .blog-detail-section h6, .blog-detail-section ul li, .blog-detail-section span');
        textElements.forEach(el => el.classList.add('animated'));

        const blogDetailTl = gsap.timeline({ delay: 0.1 });

        // Main Article Container (animate container only)
        if (document.querySelector('.blog-detail-article')) {
            gsap.set('.blog-detail-article', { y: 20, opacity: 0 });
            blogDetailTl.to('.blog-detail-article', { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" });
        }

        // Sidebar Widgets (Categories) & Author Card
        const sidebarWidgets = document.querySelectorAll('.sidebar-widget, .author-card');
        if (sidebarWidgets.length > 0) {
            gsap.set(sidebarWidgets, { y: 20, opacity: 0 });
            blogDetailTl.to(sidebarWidgets, { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out" }, "-=0.6");
        }

        // Related Posts (Keep scroll trigger as they are lower down)
        applyAnimation('.related-posts-section .blog-card', 'fadeUp', { stagger: 0.15 });
    }

    // ============================================
    // Custom Animation: Why Choose Us (Unified Batch Trigger)
    // ============================================
    const whyUsSection = document.querySelector('#why-choose-us');
    if (whyUsSection) {
        const header = whyUsSection.querySelector('.why-choose-header');
        const cards = whyUsSection.querySelectorAll('.why-choose-card-anim');

        // Initial States
        if (header) gsap.set(header, { y: 30, opacity: 0 });
        if (cards.length > 0) gsap.set(cards, { y: 50, opacity: 0 });

        ScrollTrigger.create({
            trigger: whyUsSection,
            start: "top 75%", // Trigger when section is well into view
            toggleActions: "play none none none",
            onEnter: () => {
                // Animation Timeline
                const tl = gsap.timeline();

                if (header) {
                    tl.to(header, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        ease: "power3.out"
                    });
                }

                if (cards.length > 0) {
                    tl.to(cards, {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.1,
                        ease: "power3.out"
                    }, "-=0.6"); // Overlap with header animation
                }
            }
        });
    }

    // Specific optimization for NRI Preference Section to fix lag
    applyAnimation('.nri-pref-grid .reveal-content', 'fadeUp', {
        duration: 0.6,
        stagger: 0.1, // Reduced stagger
        start: "top 90%" // Trigger earlier
    });

    // ============================================
    // GENERIC FALLBACK ANIMATIONS
    // For any elements not specifically targeted
    // ============================================

    // Generic section titles
    applyAnimation('section h2:not([class*="anim-"])', 'fadeUp', { duration: 0.8 });

    // Section labels/tags (small uppercase text above titles)
    applyAnimation('section .text-uppercase.small:not(.animated)', 'fadeUp', { duration: 0.5 });
    applyAnimation('section span.text-teal:not(.animated)', 'fadeUp', { duration: 0.5 });
    applyAnimation('section span.text-primary-teal:not(.animated)', 'fadeUp', { duration: 0.5 });

    // Hero section descriptions
    applyAnimation('.hero-description:not(.animated)', 'fadeUp', { duration: 0.6, delay: 0.2 });
    applyAnimation('.hero-content p:not(.animated)', 'fadeUp', { duration: 0.6, delay: 0.2 });

    // Section descriptions and lead paragraphs
    applyAnimation('section p.lead:not(.animated)', 'fadeUp', { duration: 0.6, delay: 0.1 });
    applyAnimation('section .section-description:not(.animated)', 'fadeUp', { duration: 0.6 });

    // Text in feature/info sections
    applyAnimation('.feature-card p:not(.animated)', 'fadeUp', { duration: 0.5, delay: 0.1 });
    applyAnimation('.feature-card-text:not(.animated)', 'fadeUp', { duration: 0.5, delay: 0.1 });

    // Small text and labels
    applyAnimation('section small:not(.animated)', 'fadeUp', { duration: 0.4 });
    applyAnimation('.text-muted:not(.animated)', 'fadeUp', { duration: 0.5 });

    // Stats and metrics text
    applyAnimation('.stat-item p:not(.animated)', 'fadeUp', { duration: 0.4, delay: 0.1 });
    applyAnimation('.bottom-stat-item p:not(.animated)', 'fadeUp', { duration: 0.4, delay: 0.1 });

    // List items that aren't already animated
    applyAnimation('section ul li:not(.animated)', 'fadeUp', { stagger: 0.05, duration: 0.5 });

    // Paragraphs in content sections
    applyAnimation('section .story-text:not(.animated)', 'fadeUp', { stagger: 0.1, duration: 0.6 });
    applyAnimation('section .content-text:not(.animated)', 'fadeUp', { duration: 0.6 });

    // Generic images
    applyAnimation('.reveal-scale-up', 'scaleUp', { duration: 0.9 });

    // Generic content blocks
    applyAnimation('.reveal-content', 'fadeUp', { duration: 0.7 });

    // Cards
    applyAnimation('.card', 'fadeUp', { stagger: 0.1 });

    // Buttons in sections
    applyAnimation('section .btn:not(.menu-link-large)', 'scaleUp', { delay: 0.3, duration: 0.6 });

    // Footer - Slide Up
    if (!document.querySelector('#blog-detail')) {
        applyAnimation('.main-footer', 'fadeUp', { start: "top 95%", duration: 0.8 });
    }

});
