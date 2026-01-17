/**
 * Korat Reality - Smooth Scrolling (Lenis)
 * Desktop-only smooth scroll implementation
 * Synchronized with GSAP ScrollTrigger
 */

document.addEventListener("DOMContentLoaded", function () {

    // --------------------------------------------------------
    // CONFIGURATION
    // --------------------------------------------------------
    const cfg = {
        mobileBreakpoint: 1024, // Breakpoint for enabling smooth scroll
        smoothDuration: 1.2,
        debug: false
    };

    // --------------------------------------------------------
    // LENIS INITIALIZATION
    // --------------------------------------------------------
    if (typeof Lenis !== 'undefined') {

        let lenis = null;
        let isActive = false;

        // Function to determine if we should enable smooth scroll
        function shouldEnableLenis() {
            // 1. Check viewport width (Desktop only)
            if (window.innerWidth < cfg.mobileBreakpoint) {
                return false;
            }

            // 2. Check for form-heavy or legal pages (User Constraint)
            const body = document.body;
            if (body.id === 'page-contact' ||
                body.classList.contains('page-legal') ||
                body.classList.contains('no-smooth-scroll')) {
                return false;
            }

            // 3. Check if there are large forms present
            if (document.querySelector('form.wpforms-form') || document.querySelector('form.heavy-form')) {
                return false;
            }

            return true;
        }

        function initLenis() {
            const enable = shouldEnableLenis();

            if (enable && !isActive) {
                // Initialize Lenis
                lenis = new Lenis({
                    duration: cfg.smoothDuration,
                    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    direction: 'vertical',
                    gestureDirection: 'vertical',
                    smooth: true,
                    mouseMultiplier: 1,
                    smoothTouch: false,
                    touchMultiplier: 2,
                });

                window.lenis = lenis; // Expose global
                isActive = true;
                document.documentElement.classList.add('lenis-active');

                // --------------------------------------------------------
                // GSAP SYNCHRONIZATION (MANDATORY)
                // --------------------------------------------------------
                if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
                    // Update ScrollTrigger on Lenis scroll
                    lenis.on('scroll', ScrollTrigger.update);

                    // Use GSAP ticker for Lenis RAF (performance & sync)
                    gsap.ticker.add((time) => {
                        lenis.raf(time * 1000);
                    });

                    // Disable lag smoothing to prevent jumps
                    gsap.ticker.lagSmoothing(0);

                    // Refresh to sync positions
                    ScrollTrigger.refresh();
                } else {
                    // Fallback RAF if GSAP is missing
                    function raf(time) {
                        lenis.raf(time);
                        requestAnimationFrame(raf);
                    }
                    requestAnimationFrame(raf);
                }

                if (cfg.debug) console.log('Lenis Active');

            } else if (!enable && isActive) {
                // Destroy if active but should not be
                if (lenis) {
                    lenis.destroy();
                    lenis = null;
                }
                isActive = false;
                document.documentElement.classList.remove('lenis-active');

                // Ensure native scroll works
                document.body.style.overflow = '';

                if (cfg.debug) console.log('Lenis Deactivated (Mobile/Constraint)');
            }
        }

        // Initial Start
        initLenis();

        // Handle Resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(initLenis, 200);
        });

    } else {
        console.warn('Lenis script not loaded.');
    }
});
