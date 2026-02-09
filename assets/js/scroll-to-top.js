/**
 * Scroll to Top Button with Circular Progress Indicator
 */

document.addEventListener("DOMContentLoaded", function () {

    // Create the scroll to top button HTML structure
    const scrollTopHTML = `
        <button id="scrollTopBtn" class="scroll-to-top" aria-label="Scroll to top">
            <svg class="progress-ring" width="50" height="50">
                <circle class="progress-ring-bg" cx="25" cy="25" r="22" />
                <circle class="progress-ring-circle" cx="25" cy="25" r="22" />
            </svg>
            <svg class="arrow-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="18 15 12 9 6 15"></polyline>
            </svg>
        </button>
    `;

    // Append to body
    document.body.insertAdjacentHTML('beforeend', scrollTopHTML);

    const scrollTopBtn = document.getElementById('scrollTopBtn');
    const progressCircle = document.querySelector('.progress-ring-circle');

    // Calculate circle circumference
    const radius = progressCircle.r.baseVal.value;
    const circumference = radius * 2 * Math.PI;

    // Set initial progress
    progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
    progressCircle.style.strokeDashoffset = circumference;

    // Update progress on scroll
    function updateProgress() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrollPercent = scrollTop / docHeight;

        // Update circle progress
        const offset = circumference - (scrollPercent * circumference);
        progressCircle.style.strokeDashoffset = offset;

        // Show/hide button
        if (scrollTop > 300) {
            scrollTopBtn.classList.add('visible');
        } else {
            scrollTopBtn.classList.remove('visible');
        }
    }

    // Scroll to top function
    function scrollToTop() {
        // Check if Lenis is active
        if (window.lenis) {
            window.lenis.scrollTo(0, {
                duration: 1.5,
                easing: (t) => 1 - Math.pow(1 - t, 3)
            });
        } else {
            // Fallback to native smooth scroll
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    }

    // Event listeners
    window.addEventListener('scroll', updateProgress, { passive: true });
    scrollTopBtn.addEventListener('click', scrollToTop);

    // Initial check
    updateProgress();
});
