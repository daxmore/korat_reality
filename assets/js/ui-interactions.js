
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
    // FAQ ACCORDION AND CTA
    // ============================================
    const faqQuestions = document.querySelectorAll('.faq-question');
    const faqCta = document.querySelector('.faq-cta');

    // Initially hide CTA if it exists
    if (faqCta) {
        // We will reveal it when user interacts
        gsap.set(faqCta, { opacity: 0, y: 20, display: 'none' });
    }

    faqQuestions.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('aria-expanded') === 'true';

            // Close all others
            faqQuestions.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.setAttribute('aria-expanded', 'false');
                    const answer = otherBtn.nextElementSibling;
                    gsap.to(answer, { height: 0, duration: 0.3, ease: 'power2.out' });
                }
            });

            // Toggle clicked
            const answer = btn.nextElementSibling;
            if (!isExpanded) {
                btn.setAttribute('aria-expanded', 'true');
                // Auto height animation
                gsap.set(answer, { height: 'auto' });
                gsap.from(answer, { height: 0, duration: 0.3, ease: 'power2.out' });

                // Show CTA after first interaction (optional check)
                if (faqCta && gsap.getProperty(faqCta, 'opacity') === 0) {
                    gsap.to(faqCta, { display: 'block', opacity: 1, y: 0, duration: 0.5, delay: 0.5 });
                }

            } else {
                btn.setAttribute('aria-expanded', 'false');
                gsap.to(answer, { height: 0, duration: 0.3, ease: 'power2.out' });
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
                gsap.to(arrow, { rotation: 45, duration: 0.3, ease: "back.out(1.7)" });
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

            // Add event listeners to each card
            cards.forEach(card => {
                card.addEventListener('mouseenter', () => {
                    // Only active on desktop (>= 1200px) based on CSS
                    if (window.innerWidth < 1200) return;

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
