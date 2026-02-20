/**
 * Counter Animation — count-up on scroll
 * Triggers when .estat-num elements enter the viewport.
 * Handles suffixes like "+", "%", etc.
 */
(function () {
    'use strict';

    /**
     * Parse a raw text like "500+", "11%", "15+" into
     * { target: 500, suffix: "+" }
     */
    function parseValue(text) {
        text = text.trim();
        // Match leading number (int or float), then any trailing suffix
        var match = text.match(/^(\d+(?:\.\d+)?)(.*)$/);
        if (!match) return null;
        return {
            target: parseFloat(match[1]),
            suffix: match[2] || ''
        };
    }

    /**
     * Animate a single .estat-num element from 0 → target.
     */
    function animateCounter(el) {
        var parsed = parseValue(el.dataset.counterTarget || el.textContent);
        if (!parsed) return;

        var target = parsed.target;
        var suffix = parsed.suffix;
        var duration = 1000; // ms
        var startTime = null;
        var isFloat = target !== Math.floor(target);

        // Ease-out cubic
        function easeOut(t) {
            return 1 - Math.pow(1 - t, 3);
        }

        function step(timestamp) {
            if (!startTime) startTime = timestamp;
            var elapsed = timestamp - startTime;
            var progress = Math.min(elapsed / duration, 1);
            var value = easeOut(progress) * target;

            el.textContent = (isFloat ? value.toFixed(1) : Math.floor(value)) + suffix;

            if (progress < 1) {
                requestAnimationFrame(step);
            } else {
                // Ensure exact final value
                el.textContent = (isFloat ? target.toFixed(1) : target) + suffix;
            }
        }

        requestAnimationFrame(step);
    }

    /**
     * Set up IntersectionObserver to fire the animation
     * when the stat section scrolls into view.
     */
    function initCounters() {
        var elements = document.querySelectorAll('.estat-num');
        if (!elements.length) return;

        // Store the original text as a data attribute so
        // parseValue always reads the correct target.
        elements.forEach(function (el) {
            if (!el.dataset.counterTarget) {
                el.dataset.counterTarget = el.textContent.trim();
            }
        });

        if (!('IntersectionObserver' in window)) {
            // Fallback: animate immediately
            elements.forEach(animateCounter);
            return;
        }

        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target); // only once
                }
            });
        }, {
            threshold: 0.4  // fire when 40% of the element is visible
        });

        elements.forEach(function (el) {
            observer.observe(el);
        });
    }

    // Run after DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initCounters);
    } else {
        initCounters();
    }
})();
