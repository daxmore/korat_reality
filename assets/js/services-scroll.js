/**
 * Korat Reality - Services Section Scroll-Driven Animation
 * Slides a vertical track of cards upward as the user scrolls.
 * Cards are always at full scale — no opacity/scale pop-in.
 */
document.addEventListener("DOMContentLoaded", function () {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;

    const section = document.querySelector('.services-section');
    if (!section) return;

    gsap.registerPlugin(ScrollTrigger);

    // ============================
    // ELEMENTS
    // ============================
    const track = document.getElementById('cardsTrack');
    const cards = section.querySelectorAll('.service-card-scroll');
    const stepItems = section.querySelectorAll('.step-item');
    const progressFill = document.getElementById('progressFill');
    const totalSteps = cards.length;

    if (totalSteps === 0 || !track) return;

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
    // Measure: total slide distance
    // We want to scroll through (totalSteps - 1) card heights
    // so the last card ends up at the top of the viewport.
    // ============================
    function getCardHeight() {
        return cards[0].offsetHeight + 24; // card height + margin-bottom (1.5rem ≈ 24px)
    }

    const totalSlide = () => getCardHeight() * (totalSteps - 1);

    // ============================
    // GSAP SCROLL TRIGGER
    // Translate the track upward by the total slide distance.
    // ============================
    gsap.to(track, {
        y: () => -totalSlide(),
        ease: 'none',
        scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=3000',
            pin: true,
            scrub: 2,
            anticipatePin: 1,
            invalidateOnRefresh: true, // recalc on resize
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
    // INITIAL STATE
    // ============================
    setActiveStep(0);
});
