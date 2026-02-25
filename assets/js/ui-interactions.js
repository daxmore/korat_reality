
// ============================================
// UI INTERACTIONS
// ============================================

document.addEventListener('DOMContentLoaded', () => {

    // ============================================
    // MENU INTERACTIONS
    // ============================================
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const closeMenuBtn = document.getElementById('menuCloseBtn');
    const body = document.body;

    function openMenu() {
        if (!mobileMenu) return;

        mobileMenu.classList.add('is-active');
        body.classList.add('menu-active');

        // Stagger in ALL links and buttons
        const menuItems = mobileMenu.querySelectorAll('a, button');

        // Ensure they start hidden properly before animating in
        gsap.set(menuItems, { clearProps: 'all' }); // Return to CSS state (opacity: 0)

        gsap.fromTo(menuItems,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.35, stagger: 0.03, delay: 0.1, ease: "power2.out" }
        );
    }

    function closeMenu() {
        if (!mobileMenu) return;

        // Animate out very quickly
        const menuItems = mobileMenu.querySelectorAll('a, button');
        gsap.to(menuItems, {
            y: -10,
            opacity: 0,
            duration: 0.15,
            stagger: 0,
            onComplete: () => {
                mobileMenu.classList.remove('is-active');
                body.classList.remove('menu-active');
                // Reset to CSS state (opacity: 0)
                gsap.set(menuItems, { clearProps: 'all' });
            }
        });
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

    faqQuestions.forEach((btn) => {
        btn.addEventListener('click', () => {
            const answer = btn.nextElementSibling;
            const isOpen = btn.getAttribute('aria-expanded') === 'true';

            // Close all others
            faqQuestions.forEach(otherBtn => {
                if (otherBtn !== btn) {
                    otherBtn.setAttribute('aria-expanded', 'false');
                    const otherAnswer = otherBtn.nextElementSibling;
                    gsap.to(otherAnswer, {
                        height: 0,
                        duration: 0.35,
                        ease: 'power2.out'
                    });
                }
            });

            if (!isOpen) {
                btn.setAttribute('aria-expanded', 'true');

                // Measure content height
                const inner = answer.querySelector('.faq-answer-inner');
                const targetHeight = inner.offsetHeight;

                gsap.to(answer, {
                    height: targetHeight,
                    duration: 0.35,
                    ease: 'power2.out',
                    onComplete: () => {
                        // Let it breathe after animation
                        answer.style.height = 'auto';
                    }
                });

            } else {
                btn.setAttribute('aria-expanded', 'false');

                gsap.to(answer, {
                    height: 0,
                    duration: 0.35,
                    ease: 'power2.out'
                });
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

/* =========================================================================
   PORTFOLIO FILTER ELASTIC MENU
   ========================================================================= */
document.addEventListener('DOMContentLoaded', () => {
    const filterBtn = document.querySelector('.filter-toggle-btn');
    const filterOptions = document.querySelector('.filter-options');
    const filterOptionBtns = document.querySelectorAll('.filter-option');
    
    if (filterBtn && filterOptions) {
        // Toggle menu on click
        filterBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            filterOptions.classList.toggle('active');
            
            // Toggle view text based on state
            const viewText = filterBtn.querySelector('.view-text');
            if(filterOptions.classList.contains('active')) {
                viewText.textContent = 'Close -';
            } else {
                viewText.textContent = 'Filter +';
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!filterBtn.contains(e.target) && !filterOptions.contains(e.target) && filterOptions.classList.contains('active')) {
                filterOptions.classList.remove('active');
                filterBtn.querySelector('.view-text').textContent = 'Filter +';
            }
        });

        // Handle option click (visual active state only for now)
        filterOptionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active from all
                filterOptionBtns.forEach(b => b.classList.remove('active'));
                // Add active to clicked
                btn.classList.add('active');
                
                // Optionally close menu after selection
                setTimeout(() => {
                    filterOptions.classList.remove('active');
                    filterBtn.querySelector('.view-text').textContent = 'Filter +';
                }, 300);
            });
        });
    }
});
