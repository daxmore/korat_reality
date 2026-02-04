/**
 * Korat Reality - General UI Scripts
 * Mobile menu, FAQ accordion, service icons, and other interactive elements
 */

document.addEventListener("DOMContentLoaded", function () {

    // ============================================
    // SHERY JS INITIALIZATION
    // ============================================
    // ============================================
    // SHERY JS INITIALIZATION
    // ============================================
    // if (typeof Shery !== 'undefined') {
    //     // Only initialize on larger screens (>= 1199px)
    //     if (window.innerWidth >= 1199) {
    //         Shery.mouseFollower({
    //             skew: true,
    //             ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    //             duration: 0.4,
    //         });
    //
    //         Shery.makeMagnet(".btn, .magnet-target", {
    //             ease: "cubic-bezier(0.23, 1, 0.320, 1)",
    //             duration: 0.2,
    //         });
    //     }
    // }

    // ============================================
    // MOBILE MENU LOGIC
    // ============================================
    const mobileMenu = document.getElementById('mobileMenu');
    const menuToggleBtn = document.getElementById('menuToggleBtn');
    const menuCloseBtn = document.getElementById('menuCloseBtn');

    function toggleMenu() {
        if (!mobileMenu) return;
        mobileMenu.classList.toggle('is-active');
        document.body.classList.toggle('menu-active', mobileMenu.classList.contains('is-active'));
    }


    if (menuToggleBtn) menuToggleBtn.addEventListener('click', toggleMenu);
    if (menuCloseBtn) menuCloseBtn.addEventListener('click', toggleMenu);

    // Close menu when clicking navigation links (except dropdown toggles)
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
    // ============================================
    // SERVICES SWIPER INITIALIZATION
    // ============================================
    if (document.querySelector('.services-swiper')) {
        const swiper = new Swiper('.services-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            // autoplay: {
            //     delay: 3500,
            //     disableOnInteraction: false,
            // },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            navigation: {
                nextEl: ".services-next",
                prevEl: ".services-prev",
            },
            breakpoints: {
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
            },
        });
    }

});

// ============================================
// SERVICE ICON HOVER ANIMATION
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
// FAQ ACCORDION FUNCTIONALITY
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

        // Toggle current
        item.classList.toggle('is-active');
        const isNowActive = item.classList.contains('is-active');
        question.setAttribute('aria-expanded', isNowActive);

        if (isNowActive) {
            gsap.to(answer, {
                maxHeight: answer.scrollHeight,
                duration: 0.5,
                ease: 'power3.inOut'
            });
        } else {
            gsap.to(answer, {
                maxHeight: 0,
                duration: 0.5,
                ease: 'power3.inOut'
            });
        }
    });
});

// ============================================
// PROCESS CARD BACKGROUND FOLLOWER
// ============================================
const processSection = document.querySelector('.process-section');
if (processSection) {
    const grid = processSection.querySelector('.process-grid');

    if (grid) {
        // Append to the GRID directly (relative positioned)
        const follower = document.createElement('div');
        follower.classList.add('process-bg-follower');
        grid.appendChild(follower);

        // Initially hide
        gsap.set(follower, { opacity: 0 });

        const cards = processSection.querySelectorAll('.process-step-card');

        cards.forEach(card => {
            card.addEventListener('mouseenter', () => {
                // CHECK: Only active on Large Screens (>= 1200px)
                if (window.innerWidth < 1200) return;

                // 1. Get positions relative to the GRID
                const cardRect = card.getBoundingClientRect();
                const gridRect = grid.getBoundingClientRect();

                const relativeTop = cardRect.top - gridRect.top;
                const relativeLeft = cardRect.left - gridRect.left;
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

                // 3. Toggle Active State on Card Text
                cards.forEach(c => c.classList.remove('is-active'));
                card.classList.add('is-active');
            });

            // Add mouseleave for individual cards primarily to handle quick exits
            card.addEventListener('mouseleave', () => {
                // Optional: We can rely on the section leave for full hide, 
                // but this ensures state is clean if moving between cards.
            });
        });

        // Hide when leaving the SECTION or GRID
        // Using section covers cases where mouse moves to padding area
        processSection.addEventListener('mouseleave', () => {
            gsap.to(follower, {
                opacity: 0,
                duration: 0.3,
                overwrite: true
            });
            cards.forEach(c => c.classList.remove('is-active'));
        });
    }
}
