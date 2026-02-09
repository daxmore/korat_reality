/**
 * Number Counter Animation
 * Animates numbers from 0 to target value on scroll
 */

document.addEventListener("DOMContentLoaded", function () {

    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded - counter animations disabled');
        return;
    }

    // Register ScrollTrigger if available
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
    }

    // Get all counter elements
    const counters = document.querySelectorAll('.counter');

    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const suffix = counter.getAttribute('data-suffix') || '';
        const duration = parseFloat(counter.getAttribute('data-duration')) || 0.6;
        const decimals = parseInt(counter.getAttribute('data-decimals')) || 0;

        // Create counter object for animation
        const counterObj = { val: 0 };

        // Create ScrollTrigger animation
        gsap.to(counterObj, {
            val: target,
            duration: duration,
            ease: "power2.out",
            scrollTrigger: {
                trigger: counter,
                start: "top 85%",
                toggleActions: "play none none none",
                once: true // Only animate once
            },
            onUpdate: function () {
                // Update the counter text
                if (decimals > 0) {
                    counter.textContent = counterObj.val.toFixed(decimals) + suffix;
                } else {
                    counter.textContent = Math.ceil(counterObj.val) + suffix;
                }
            },
            onComplete: function () {
                // Ensure final value is exact
                if (decimals > 0) {
                    counter.textContent = target.toFixed(decimals) + suffix;
                } else {
                    counter.textContent = target + suffix;
                }
            }
        });
    });
});
