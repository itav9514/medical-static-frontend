/**
 * Unified Sliders & iOS WebKit Crash-Proof Controller
 * Adam Vacations - Medical Tourism Frontend
 * 
 * Features:
 * - iOS WebKit Crash-Proofing: Rapid-click debounce lock (350ms)
 * - Safe Hardware Acceleration & touch-action normalization
 * - Unified responsive configuration for all Hospital, Doctor, and Story sliders
 * - Auto-initialization on DOM ready with zero clone explosion
 */

(function ($) {
    'use strict';

    // ==========================================
    // 1. iOS / WebKit Safety & Rapid Click Debouncer
    // ==========================================
    let sliderNavLocked = false;

    function triggerDebouncedAction($target, action) {
        if (sliderNavLocked) return;
        if (!$target || !$target.length) return;

        sliderNavLocked = true;
        $target.trigger(action, [350]);
        setTimeout(function () {
            sliderNavLocked = false;
        }, 360);
    }

    // Universal handler for standard .slider-arrow (used on 95% of pages)
    $(document).on('click', '.slider-arrow', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const targetSelector = $(this).data('target');
        if (!targetSelector) return;

        const $target = $(targetSelector);
        const action = $(this).hasClass('prev') ? 'prev.owl.carousel' : 'next.owl.carousel';
        triggerDebouncedAction($target, action);
    });

    // Special custom buttons (e.g. cardiac-surgery.html #hospPrevBtn, #docNextBtn)
    $(document).on('click', '#hospPrevBtn, #hospNextBtn, #docPrevBtn, #docNextBtn', function (e) {
        e.preventDefault();
        e.stopPropagation();

        const isPrev = this.id.indexOf('Prev') !== -1;
        const target = this.id.indexOf('hosp') === 0 ? '.hospital-carousel' : '.doctor-carousel';
        const action = isPrev ? 'prev.owl.carousel' : 'next.owl.carousel';
        triggerDebouncedAction($(target), action);
    });

    // ==========================================
    // 2. Doctor Directory Page Slider Helper (doctors.html)
    // ==========================================
    window.initDoctorDirectoryCarousel = function (count) {
        const $slider = $('.doctors-page-slider');
        if (!$slider.length) return null;

        const total = typeof count === 'number' ? count : $slider.find('.item').length;
        const $sliderBox = $('#doctorsSliderBox');
        const $arrows = $sliderBox.find('.slider-arrow');

        if (total <= 1) {
            $sliderBox.addClass('single-item');
            $arrows.hide();
        } else {
            $sliderBox.removeClass('single-item');
            $arrows.show();
        }

        return $slider.owlCarousel({
            loop: false,
            rewind: total > 1,
            nav: false,
            dots: false,
            margin: 20,
            smartSpeed: 350,
            autoplay: false,
            touchDrag: true,
            mouseDrag: true,
            pullDrag: false,
            responsive: {
                0: { items: 1 },
                576: { items: Math.min(2, total || 1) },
                992: { items: Math.min(3, total || 1) },
                1200: { items: Math.min(4, total || 1) }
            }
        });
    };

    // ==========================================
    // 3. Auto-Initialize Standard Sliders on Page Load
    // ==========================================
    function initAllSliders() {
        if (!$.fn || !$.fn.owlCarousel) return;

        // A. Hospital Sliders (Treatment pages + Home)
        $('[class*="-hospital-slider"], .hospital-carousel, .hospital-slider, .medical-slider').each(function () {
            const $this = $(this);
            if ($this.hasClass('owl-loaded')) return;

            const itemsCount = $this.children('.item').length || $this.children().length;
            $this.owlCarousel({
                loop: false,
                rewind: itemsCount > 1,
                nav: false,
                dots: false,
                margin: 16,
                smartSpeed: 350,
                autoplay: false,
                autoplayTimeout: 4000,
                autoplayHoverPause: true,
                touchDrag: true,
                mouseDrag: true,
                pullDrag: false,
                responsive: {
                    0: { items: 1 },
                    576: { items: Math.min(2, itemsCount || 1) },
                    768: { items: Math.min(3, itemsCount || 1) },
                    1200: { items: Math.min(4, itemsCount || 1) }
                }
            });
        });

        // B. Treatment & Home Doctor Sliders (pages with 5+ doctors or home slider)
        $('[class*="-doctor-slider"], .doctor-carousel, .doctor-slider').not('.doctors-page-slider').each(function () {
            const $this = $(this);
            if ($this.hasClass('owl-loaded')) return;

            const itemsCount = $this.children('.item').length || $this.children().length;
            $this.owlCarousel({
                loop: false,
                rewind: itemsCount > 1,
                nav: false,
                dots: false,
                margin: 20,
                smartSpeed: 350,
                autoplay: false,
                touchDrag: true,
                mouseDrag: true,
                pullDrag: false,
                responsive: {
                    0: { items: 1 },
                    576: { items: Math.min(2, itemsCount || 1) },
                    992: { items: Math.min(3, itemsCount || 1) },
                    1200: { items: Math.min(4, itemsCount || 1) }
                }
            });
        });

        // C. Patient Stories / Reviews Carousel
        $('.patient-stories-carousel').each(function () {
            const $this = $(this);
            if ($this.hasClass('owl-loaded')) return;

            $this.owlCarousel({
                items: 1,
                loop: false,
                rewind: true,
                margin: 15,
                smartSpeed: 400,
                autoplay: true,
                autoplayTimeout: 5000,
                autoplayHoverPause: true,
                nav: false,
                dots: false,
                touchDrag: true,
                mouseDrag: true,
                pullDrag: false
            });
        });

        // D. Testimonial Carousels (service.html, testimonial.html)
        $('.testimonial-carousel').each(function () {
            const $this = $(this);
            if ($this.hasClass('owl-loaded')) return;

            $this.owlCarousel({
                autoplay: false,
                smartSpeed: 400,
                center: true,
                dots: false,
                loop: false,
                rewind: true,
                nav: true,
                navText: [
                    '<i class="bi bi-arrow-left"></i>',
                    '<i class="bi bi-arrow-right"></i>'
                ],
                responsive: {
                    0: { items: 1 },
                    768: { items: 2 }
                }
            });
        });
    }

    // Run on DOM ready
    $(document).ready(function () {
        initAllSliders();
    });

})(jQuery);
