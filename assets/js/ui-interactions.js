
// ============================================
// UI INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // MENU INTERACTIONS
    // ============================================
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenuBtn = document.getElementById('closeMenuBtn');
    const body = document.body;

    function openMenu() {
        if (!mobileMenu) return;

        mobileMenu.style.visibility = 'visible';
        mobileMenu.style.clipPath = 'inset(0 0 0 0)';
        body.classList.add('menu-active');

        // Stagger in links
        const links = mobileMenu.querySelectorAll('a');
        gsap.fromTo(links,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.4, stagger: 0.05, delay: 0.3 }
        );
    }

    function closeMenu() {
        if (!mobileMenu) return;

        mobileMenu.style.clipPath = 'inset(0 0 0 100%)';
        body.classList.remove('menu-active');

        setTimeout(() => {
            mobileMenu.style.visibility = 'hidden';
            // Reset links for next open
            const links = mobileMenu.querySelectorAll('a');
            gsap.set(links, { clearProps: 'all' });
        }, 500);
    }

    if (menuToggleBtn) {
        menuToggleBtn.addEventListener('click', openMenu);
    }

    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMenu);
    }

    // Close on link click
    const menuLinks = mobileMenu?.querySelectorAll('a');
    if (menuLinks) {
        menuLinks.forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    // ============================================
    // FAQ ACCORDION
    // ============================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqAnswers = document.querySelectorAll('.faq-answer');
    const faqCta = document.querySelector('.faq-cta');

    // Initialize all answers to height 0
    faqAnswers.forEach(answer => {
        answer.style.height = '0px';
        answer.style.overflow = 'hidden';
    });

    // Initialize CTA if exists
    if (faqCta) {
        faqCta.style.opacity = '0';
        faqCta.style.display = 'none';
    }

    // Add click handlers
    faqQuestions.forEach((question, index) => {
        question.addEventListener('click', function () {
            const isCurrentlyExpanded = this.getAttribute('aria-expanded') === 'true';
            const answer = this.nextElementSibling;

            // Close all other FAQs
            faqQuestions.forEach((otherQuestion, otherIndex) => {
                if (otherIndex !== index) {
                    otherQuestion.setAttribute('aria-expanded', 'false');
                    const otherAnswer = otherQuestion.nextElementSibling;
                    if (otherAnswer) {
                        otherAnswer.style.height = '0px';
                    }
                }
            });

            // Toggle current FAQ
            if (isCurrentlyExpanded) {
                // Close it
                this.setAttribute('aria-expanded', 'false');
                answer.style.height = '0px';
            } else {
                // Open it
                this.setAttribute('aria-expanded', 'true');
                const fullHeight = answer.scrollHeight;
                answer.style.height = fullHeight + 'px';

                // Show CTA on first interaction
                if (faqCta && faqCta.style.opacity === '0') {
                    setTimeout(() => {
                        faqCta.style.display = 'block';
                        faqCta.style.opacity = '1';
                    }, 300);
                }
            }
        });
    });


    // ============================================
    // SERVICES SECTION: ARROW ROTATION
    // ============================================
    const serviceCards = document.querySelectorAll('.service-card-new');

    serviceCards.forEach(card => {
        const arrow = card.querySelector('.arrow-icon');

        card.addEventListener('mouseenter', () => {
            if (arrow) {
                gsap.to(arrow, { rotation: -45, duration: 0.3, ease: "back.out(1.7)" });
            }
        });

        card.addEventListener('mouseleave', () => {
            if (arrow) {
                gsap.to(arrow, { rotation: 0, duration: 0.3, ease: "power2.out" });
            }
        });
    });

    // ============================================
    // PROCESS CARD BACKGROUND FOLLOWER
    // ============================================
    const processSection = document.querySelector('.process-section');
    if (processSection) {
        const grid = processSection.querySelector('.process-grid');

        // Check if grid exists before proceeding
        if (grid) {
            // Create the follower element
            const follower = document.createElement('div');
            follower.classList.add('process-bg-follower');

            // Append to the SECTION instead of the grid/row 
            // to avoid Bootstrap negative margin issues
            processSection.appendChild(follower);

            // Initially hide the follower
            gsap.set(follower, { opacity: 0 });

            // Get all process step cards
            const cards = processSection.querySelectorAll('.process-step-card');

            // Flag to track if cards are loaded and ready for interaction
            let cardsReady = false;

            // Wait for section to be visible and images/content loaded
            const enableCardsInteraction = () => {
                // Check if section is in viewport
                const sectionRect = processSection.getBoundingClientRect();
                const isVisible = sectionRect.top < window.innerHeight && sectionRect.bottom > 0;

                if (isVisible && !cardsReady) {
                    // Small delay to ensure everything is rendered
                    setTimeout(() => {
                        cardsReady = true;
                        processSection.classList.add('cards-ready');
                    }, 300);
                }
            };

            // Check on scroll and on load
            window.addEventListener('scroll', enableCardsInteraction, { passive: true });
            window.addEventListener('load', enableCardsInteraction);
            // Also check immediately in case section is already visible
            enableCardsInteraction();

            // Add event listeners to each card
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    // Only active on desktop (>= 1200px) and when cards are ready
                    if (window.innerWidth < 1200 || !cardsReady) return;

                    // 1. Calculate Layout relative to the SECTION
                    const cardRect = card.getBoundingClientRect();
                    const sectionRect = processSection.getBoundingClientRect();

                    // Calculate position relative to the section
                    const relativeTop = cardRect.top - sectionRect.top;
                    const relativeLeft = cardRect.left - sectionRect.left;

                    const width = cardRect.width;
                    const height = cardRect.height;

                    // 2. Animate Follower
                    gsap.to(follower, {
                        x: relativeLeft,
                        y: relativeTop,
                        width: width,
                        height: height,
                        opacity: 1,
                        duration: 0.4,
                        ease: "power2.out",
                        overwrite: true
                    });

                    // 3. Update Card State
                    cards.forEach(c => c.classList.remove('is-active'));
                    card.classList.add('is-active');
                });
            });

            // Handle Mouse Leaving the Grid
            grid.addEventListener('mouseleave', () => {
                if (!cardsReady) return; // Don't animate if not ready

                gsap.to(follower, {
                    opacity: 0,
                    duration: 0.3,
                    overwrite: true
                });
                // Remove active state from all cards
                cards.forEach(c => c.classList.remove('is-active'));
            });
        }
    }
});
