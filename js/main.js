(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();


    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar (Smooth Permanent Fixed at Top: 0 with Soft Shadow)
    $(window).scroll(function () {
        if ($(this).scrollTop() > 30) {
            $('.sticky-top').addClass('shadow-sm');
        } else {
            $('.sticky-top').removeClass('shadow-sm');
        }
    });


    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });


    // Facts counter
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 2000
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });

    // Effect of Show more button
    $(".show-more").click(function (event) {
        var txt = $(".hide-part").is(':visible') ? 'Read More' : 'Read Less';
        $(".hide-part").toggleClass("show-part");
        $(this).html(txt);
        event.preventDefault();
    });
    // Header carousel
    $(".header-carousel").owlCarousel({
        autoplay: true,
        animateOut: 'fadeOutLeft',
        items: 1,
        dots: true,
        loop: true,
        nav: false,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ]
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });
    // Testimonials carousel
    $('.treatments-carousel').owlCarousel({
        loop: false,
        margin: 10,
        nav: true,
        autoplay: true,
        smartSpeed: 2000,
        dots: false,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
     $('.media-carousel').owlCarousel({
        loop: false,
        margin: 10,
        nav: false,
        dots: true,
        autoplay: true,
        smartSpeed: 2000,
        navText: [
            '<i class="bi bi-chevron-left"></i>',
            '<i class="bi bi-chevron-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            1000: {
                items: 3
            }
        }
    });
    
    // $(".media-carousel").owlCarousel({
    //     autoplay: false,
    //     smartSpeed: 1000,
    //     margin: 20,
    //     center: true,
    //     dots: true,
    //     loop: true,
    //     nav: false,
    //     navText: [
    //         '<i class="bi bi-chevron-left"></i>',
    //         '<i class="bi bi-chevron-right"></i>'
    //     ],
    //     responsive: {
    //         0: {
    //             items: 1
    //         },
    //         768: {
    //             items: 3
    //         }
    //     }
    // });


})(jQuery);


 //Component for header and footer 


    

    fetch('/partials/footer.html')
      .then(res => res.text())
      .then(data => document.getElementById('footer').innerHTML = data);


// Google Translate Script Dynamic Load
(function loadGoogleTranslate() {
    const s = document.createElement('script');
    s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    document.head.appendChild(s);
})();

// Idempotent widget initialiser.
// Safe to call from both the Google callback and after the header is injected;
// whichever happens last will succeed.
let translateWidgetReady = false;

function initTranslateWidget() {
    if (translateWidgetReady) return;
    if (!(window.google && google.translate && google.translate.TranslateElement)) return;
    if (!document.getElementById('google_translate_element')) return;

    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,ar,ru,fr,bn',
        autoDisplay: false
    }, 'google_translate_element');

    translateWidgetReady = true;
}

function googleTranslateElementInit() {
    initTranslateWidget();
}

// Generic poller: resolves with the first truthy value returned by fn, or null on timeout.
function waitFor(fn, timeoutMs = 5000, intervalMs = 100) {
    return new Promise(resolve => {
        const start = Date.now();
        (function check() {
            const result = fn();
            if (result) return resolve(result);
            if (Date.now() - start >= timeoutMs) return resolve(null);
            setTimeout(check, intervalMs);
        })();
    });
}

// Resolves with the Google combo <select> once it exists AND its options are populated.
function waitForTranslateCombo(timeoutMs = 5000) {
    return waitFor(() => {
        const combo = document.querySelector('.goog-te-combo');
        return combo && combo.options.length > 1 ? combo : null;
    }, timeoutMs);
}

// Google adds translated-ltr / translated-rtl to <html> once a translation is applied.
function isPageTranslated() {
    return /\btranslated-(ltr|rtl)\b/.test(document.documentElement.className);
}

// Dropdown Toggle (Closes any other open menu and toggles active one)
function toggleLangDropdown(e) {
    e.stopPropagation();
    const dropdownWrap = e.target.closest('.custom-lang-dropdown');
    const menu = dropdownWrap ? dropdownWrap.querySelector('.lang-menu-list') : null;
    const isShown = menu && menu.classList.contains('show');
    
    document.querySelectorAll('.lang-menu-list').forEach(el => el.classList.remove('show'));
    if (menu && !isShown) {
        menu.classList.add('show');
    }
}

document.addEventListener('click', () => {
    document.querySelectorAll('.lang-menu-list').forEach(el => el.classList.remove('show'));
});

// Language configuration mapping
const siteLangMap = {
    en: { code: 'US', flag: 'https://flagcdn.com/w40/us.png' },
    ar: { code: 'AE', flag: 'https://flagcdn.com/w40/ae.png' },
    ru: { code: 'RU', flag: 'https://flagcdn.com/w40/ru.png' },
    fr: { code: 'FR', flag: 'https://flagcdn.com/w40/fr.png' },
    bn: { code: 'BD', flag: 'https://flagcdn.com/w40/bd.png' }
};

function syncActiveLangUI(language) {
    const cookieMatch = document.cookie.match(
        /(?:^|;\s*)googtrans=([^;]+)/
    );

    const savedLanguage = cookieMatch
        ? decodeURIComponent(cookieMatch[1]).split('/').pop()
        : 'en';

    const current = language || savedLanguage;
    const info = siteLangMap[current] || siteLangMap.en;

    document.querySelectorAll('.activeLangFlag').forEach(el => {
        el.src = info.flag;
    });

    document.querySelectorAll('.activeLangCode').forEach(el => {
        el.textContent = info.code;
    });

    const isArabic = current === 'ar';

    document.documentElement.dir = isArabic ? 'rtl' : 'ltr';
    document.documentElement.classList.toggle('rtl-mode', isArabic);
}

// Switch Language and Trigger Site-Wide Translation
async function changeSiteLanguage(lang) {
    if (!Object.prototype.hasOwnProperty.call(siteLangMap, lang)) {
        return;
    }

    const expiry = new Date();
    expiry.setFullYear(expiry.getFullYear() + 1);

    // Google expects the raw "/en/xx" value (do not URL-encode the slashes)
    document.cookie = [
        `googtrans=/en/${lang}`,
        `expires=${expiry.toUTCString()}`,
        'path=/',
        'SameSite=Lax'
    ].join('; ');

    syncActiveLangUI(lang);

    // Make sure the widget exists, then wait for its dropdown to be populated
    initTranslateWidget();
    const translateSelect = await waitForTranslateCombo();

    const hasOption = translateSelect &&
        Array.from(translateSelect.options).some(opt => opt.value === lang);

    if (!hasOption) {
        // Widget unavailable or target is the source language (en):
        // the cookie is already set, so a reload applies it reliably.
        window.location.reload();
        return;
    }

    // Google may ignore the first change event while its engine is still loading,
    // so apply, verify, and retry before falling back to a reload.
    const MAX_ATTEMPTS = 3;
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        translateSelect.value = lang;
        translateSelect.dispatchEvent(new Event('change', { bubbles: true }));

        if (await waitFor(isPageTranslated, 1500)) {
            return; // translation applied
        }
    }

    window.location.reload();
}

// Auto-sync language UI after header fetch completes
fetch('/partials/header.html')
    .then(res => res.text())
    .then(data => {
        const headerEl = document.getElementById('header');
        if (headerEl) {
            headerEl.innerHTML = data;
            initTranslateWidget();   // header now has #google_translate_element
            syncActiveLangUI();
        }
    });