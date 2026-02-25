
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


    // ============================================
    // PORTFOLIO FILTER LOGIC
    // ============================================
    const filterBtn = document.querySelector('.filter-toggle-btn');
    const filterOptions = document.querySelector('.filter-options');
    const filterOptionBtns = document.querySelectorAll('.filter-option'); // these are the sticky filter options

    // Also attach logic to the top pill filters if clicked
    const heroPillBtns = document.querySelectorAll('.hero-cat-pill');

    const portfolioGrid = document.querySelector('.portfolio-works-grid');
    let allPortfolioItems = [];

    // Store all initial portfolio items
    if (portfolioGrid) {
        allPortfolioItems = Array.from(portfolioGrid.querySelectorAll('.pw-item'));
    }

    // Function to apply filter with crazy animations
    function applyPortfolioFilter(category) {
        if (!portfolioGrid) return;

        // Normalize category by optionally removing " Projects" so "Residential Projects" matches "Residential"
        const categoryNormalized = category.replace(' Projects', '').trim();

        // Sync active states across both navigation sets
        if (heroPillBtns) {
            heroPillBtns.forEach(btn => {
                if (btn.textContent.trim() === category) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        if (filterOptionBtns) {
            filterOptionBtns.forEach(btn => {
                if (btn.textContent.trim() === category) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
        }

        // 1. Get currently visible items
        const currentItems = Array.from(portfolioGrid.children);

        // 2. Animate current items OUT elegantly
        if (currentItems.length > 0) {
            gsap.to(currentItems, {
                opacity: 0,
                y: 20,
                duration: 0.1,
                stagger: 0.03,
                ease: "power2.inOut",
                onComplete: () => {
                    renderNewItems(category, categoryNormalized);
                }
            });
        } else {
            renderNewItems(category, categoryNormalized);
        }
    }

    function renderNewItems(category, categoryNormalized) {
        // Clear the current grid in DOM
        portfolioGrid.innerHTML = '';

        const itemsToShow = [];

        // Filter elements
        allPortfolioItems.forEach(item => {
            const itemCategoryEl = item.querySelector('.pw-meta-type');
            const itemCategory = itemCategoryEl ? itemCategoryEl.textContent.trim() : '';

            if (category === 'All' || itemCategory === categoryNormalized || itemCategory === category) {
                itemsToShow.push(item);
                portfolioGrid.appendChild(item);
            }
        });

        // 3. Animate new items IN elegantly
        if (itemsToShow.length > 0) {
            // Set initial hidden state
            gsap.set(itemsToShow, {
                scale: 0.98,
                opacity: 0,
                y: 40
            });

            // The elegant fade and slide reveal
            gsap.to(itemsToShow, {
                scale: 1,
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "power3.out",
                overwrite: true
            });
        }
    }

    if (filterBtn && filterOptions) {
        // Toggle menu on click
        filterBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            filterOptions.classList.toggle('active');

            // Toggle view text based on state
            const viewText = filterBtn.querySelector('.view-text');
            if (filterOptions.classList.contains('active')) {
                viewText.textContent = 'Close -';
            } else {
                viewText.textContent = 'Filter +';
            }
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!filterBtn.contains(e.target) && !filterOptions.contains(e.target) && filterOptions.classList.contains('active')) {
                filterOptions.classList.remove('active');
                if (filterBtn.querySelector('.view-text')) {
                    filterBtn.querySelector('.view-text').textContent = 'Filter +';
                }
            }
        });

        // Handle sticky option click
        if (filterOptionBtns) {
            filterOptionBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    const category = btn.textContent.trim();
                    applyPortfolioFilter(category);

                    // Optionally close menu after selection
                    setTimeout(() => {
                        filterOptions.classList.remove('active');
                        if (filterBtn.querySelector('.view-text')) {
                            filterBtn.querySelector('.view-text').textContent = 'Filter +';
                        }
                    }, 300);
                });
            });
        }
    }

    // Top pill buttons interactions
    if (heroPillBtns.length > 0) {
        heroPillBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.textContent.trim();
                applyPortfolioFilter(category);
            });
        });
    }

    // Initial page load elegant staggered entry animation
    if (allPortfolioItems.length > 0) {
        gsap.set(allPortfolioItems, { opacity: 0, y: 30, scale: 0.98 });
        gsap.to(allPortfolioItems, {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 1,
            stagger: 0.08,
            ease: "power3.out",
            delay: 0.1
        });
    }

    // ============================================
    // PORTFOLIO PILL MOUSE FOLLOWER
    // ============================================
    const portfolioImages = document.querySelectorAll('.pw-image');

    portfolioImages.forEach(image => {
        const pill = image.querySelector('.pw-pill-btn');
        if (!pill) return;

        image.addEventListener('mouseenter', (e) => {
            // Initial positioning to avoid jump
            const rect = image.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            gsap.set(pill, {
                x: x,
                y: y,
                xPercent: -50,
                yPercent: -50,
                scale: 0,
                opacity: 0
            });

            gsap.to(pill, {
                opacity: 1,
                scale: 0.85,
                duration: 0.1,
                ease: "power2.out"
            });
        });

        image.addEventListener('mousemove', (e) => {
            const rect = image.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            // Follow with extreme snappiness and perfect centering
            gsap.to(pill, {
                x: x,
                y: y,
                xPercent: -50,
                yPercent: -50,
                duration: 0.4, // Balanced for smooth follow
                ease: "power2.out",
                overwrite: 'auto',
                scale: 0.85
            });
        });

        image.addEventListener('mouseleave', () => {
            gsap.to(pill, {
                opacity: 0,
                scale: 0,
                duration: 0.1,
                ease: "power2.in"
            });
        });
    });

    // ============================================
    // PROJECT MODAL LOGIC
    // ============================================
    const projectModal = document.getElementById('projectModal');
    const closeProjectModal = document.getElementById('closeProjectModal');
    const modalBackdrop = projectModal?.querySelector('.project-modal-backdrop');
    const modalContainer = projectModal?.querySelector('.project-modal-container');

    // Elements to populate
    const modalTitle = document.getElementById('modalProjectTitle');
    const modalCategory = document.getElementById('modalProjectCategory');
    const modalLocation = document.getElementById('modalProjectLocation');
    const modalArea = document.getElementById('modalProjectArea');
    const modalYear = document.getElementById('modalProjectYear');
    const modalStatus = document.getElementById('modalProjectStatus');
    const modalImage = document.getElementById('modalProjectImage');

    function openModal(data) {
        if (!projectModal) return;

        // Populate content
        if (modalTitle) modalTitle.textContent = data.title;
        if (modalCategory) modalCategory.textContent = data.category;
        if (modalLocation) modalLocation.textContent = data.location;
        if (modalArea) modalArea.textContent = data.area;
        if (modalYear) modalYear.textContent = data.year;
        if (modalStatus) modalStatus.textContent = data.status;
        if (modalImage) {
            modalImage.src = data.image;
            modalImage.alt = data.title;
        }

        projectModal.classList.add('is-active');
        body.classList.add('modal-open'); // Prevent body scroll

        // GSAP Animation
        gsap.to(modalBackdrop, { opacity: 1, duration: 0.5, ease: "power2.out" });
        gsap.fromTo(modalContainer,
            { y: 50, scale: 0.95, opacity: 0 },
            { y: 0, scale: 1, opacity: 1, duration: 0.6, ease: "power3.out", delay: 0.1 }
        );
    }

    function closeModal() {
        if (!projectModal) return;

        gsap.to(modalContainer, {
            y: 30,
            opacity: 0,
            scale: 0.98,
            duration: 0.4,
            ease: "power3.in"
        });

        gsap.to(modalBackdrop, {
            opacity: 0,
            duration: 0.4,
            ease: "power2.in",
            onComplete: () => {
                projectModal.classList.remove('is-active');
                body.classList.remove('modal-open');
            }
        });
    }

    // Attach click events to project items
    // We use event delegation or re-attach after filtering
    document.addEventListener('click', (e) => {
        const projectItem = e.target.closest('.pw-item');
        if (projectItem) {
            e.preventDefault();
            const data = {
                title: projectItem.dataset.title,
                category: projectItem.dataset.category,
                year: projectItem.dataset.year,
                location: projectItem.dataset.location,
                area: projectItem.dataset.area,
                status: projectItem.dataset.status,
                image: projectItem.dataset.image
            };
            openModal(data);
        }
    });

    if (closeProjectModal) {
        closeProjectModal.addEventListener('click', closeModal);
    }

    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', closeModal);
    }

    // Escape key to close
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('is-active')) {
            closeModal();
        }
    });

});
