document.addEventListener('DOMContentLoaded', () => {

    /* ===============================================================
       SERVICES SWIPER
       =============================================================== */
    if (document.querySelector('.services-swiper')) {
        const servicesSwiper = new Swiper('.services-swiper', {
            slidesPerView: 1,
            spaceBetween: 20,
            loop: true,
            speed: 800,
            grabCursor: true,
            loopAdditionalSlides: 1,

            // Navigation
            navigation: {
                nextEl: '.services-next',
                prevEl: '.services-prev',
            },

            // Pagination
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },

            // Responsive Breakpoints
            breakpoints: {
                // Mobile
                575: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                // Tablet
                768: {
                    slidesPerView: 2,
                    spaceBetween: 20
                },
                // Desktop
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30
                }
            }
        });
    }
});
