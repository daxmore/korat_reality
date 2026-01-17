/**
 * Korat Reality - General UI Scripts
 * Mobile menu, FAQ accordion, service icons, and other interactive elements
 */

document.addEventListener("DOMContentLoaded", function () {

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
    // MOBILE MENU LOGIC
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
