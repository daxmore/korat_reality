document.addEventListener('DOMContentLoaded', function () {
    // Normal Carousel for Services Section
    const servicesSwiper = new Swiper('.services-swiper', {
        slidesPerView: 1,
        spaceBetween: 24,
        loop: true,
        grabCursor: true,
        navigation: {
            nextEl: '.services-next',
            prevEl: '.services-prev',
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        keyboard: {
            enabled: true,
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            }
        }
    });
});
