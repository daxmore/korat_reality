/**
 * Korat Reality - Services Section Scroll-Driven Animation
 * GSAP + ScrollTrigger powered step-based storytelling
 */
document.addEventListener("DOMContentLoaded", function () {
    // Guard: Check if GSAP and ScrollTrigger are available
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    // Guard: Check if the services section exists on this page
    const section = document.querySelector('.services-section');
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    // ============================
    // ELEMENTS
    // ============================
    const cards = section.querySelectorAll('.service-card-scroll');
    const stepItems = section.querySelectorAll('.step-item');
    const progressFill = document.getElementById('progressFill');
    const totalSteps = cards.length;

    if (totalSteps === 0) return;

    // ============================
    // HELPER: Set active step
    // ============================
    function setActiveStep(index) {
        index = Math.max(0, Math.min(index, totalSteps - 1));

        stepItems.forEach((item, i) => {
            item.classList.toggle('active', i === index);
        });

        const progressPercent = ((index + 1) / totalSteps) * 100;
        if (progressFill) {
            progressFill.style.height = progressPercent + '%';
        }
    }

    // ============================
    // GSAP TIMELINE + SCROLL TRIGGER
    // ============================
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=3000',
            pin: true,
            scrub: 2,
            anticipatePin: 1,
            onUpdate: (self) => {
                const progress = self.progress;
                const stepIndex = Math.min(
                    Math.floor(progress * totalSteps),
                    totalSteps - 1
                );
                setActiveStep(stepIndex);
            }
        }
    });

    // ============================
    // BUILD THE TIMELINE
    // Each card gets: fade in → hold → fade out
    // Last card: fade in → hold (no fade out)
    // ============================
    cards.forEach((card, i) => {
        const segmentDuration = 1;

        if (i === 0) {
            // First card: start visible
            gsap.set(card, { opacity: 1, y: 0, scale: 1 });
            card.classList.add('active');

            // Hold
            tl.to(card, {
                opacity: 1, y: 0, scale: 1,
                duration: segmentDuration * 0.6,
                ease: 'none'
            });

            // Fade out
            tl.to(card, {
                opacity: 0, y: -30, scale: 0.96,
                duration: segmentDuration * 0.4,
                ease: 'power2.in',
                onStart: () => card.classList.remove('active'),
                onReverseComplete: () => card.classList.add('active')
            });
        } else if (i === totalSteps - 1) {
            // Last card: fade in and hold (no exit)
            tl.fromTo(card,
                { opacity: 0, y: 40, scale: 0.96 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: segmentDuration * 0.4,
                    ease: 'power2.out',
                    onComplete: () => card.classList.add('active'),
                    onReverseComplete: () => card.classList.remove('active')
                }
            );

            // Hold at end
            tl.to(card, {
                opacity: 1, y: 0, scale: 1,
                duration: segmentDuration * 0.6,
                ease: 'none'
            });
        } else {
            // Middle cards: fade in → hold → fade out
            tl.fromTo(card,
                { opacity: 0, y: 40, scale: 0.96 },
                {
                    opacity: 1, y: 0, scale: 1,
                    duration: segmentDuration * 0.3,
                    ease: 'power2.out',
                    onComplete: () => card.classList.add('active'),
                    onReverseComplete: () => card.classList.remove('active')
                }
            );

            tl.to(card, {
                opacity: 1, y: 0, scale: 1,
                duration: segmentDuration * 0.4,
                ease: 'none'
            });

            tl.to(card, {
                opacity: 0, y: -30, scale: 0.96,
                duration: segmentDuration * 0.3,
                ease: 'power2.in',
                onStart: () => card.classList.remove('active'),
                onReverseComplete: () => card.classList.add('active')
            });
        }
    });

    // ============================
    // INITIAL STATE
    // ============================
    setActiveStep(0);
});
