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

function googleTranslateElementInit() {
    new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,ar,ru,fr,bn',
        autoDisplay: false
    }, 'google_translate_element');
}

// Dropdown Toggle
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
    'en': { code: 'US', flag: 'https://flagcdn.com/w40/us.png' },
    'ar': { code: 'AE', flag: 'https://flagcdn.com/w40/ae.png' },
    'ru': { code: 'RU', flag: 'https://flagcdn.com/w40/ru.png' },
    'fr': { code: 'FR', flag: 'https://flagcdn.com/w40/fr.png' },
    'bn': { code: 'BD', flag: 'https://flagcdn.com/w40/bd.png' }
};

function syncActiveLangUI() {
    let current = 'en';
    const match = document.cookie.match(/googtrans=\/en\/([a-z]{2})/i);
    if (match && match[1]) {
        current = match[1].toLowerCase();
    }
    const info = siteLangMap[current] || siteLangMap['en'];
    document.querySelectorAll('.activeLangFlag').forEach(el => el.src = info.flag);
    document.querySelectorAll('.activeLangCode').forEach(el => el.textContent = info.code);

    // Apply RTL for Arabic
    if (current === 'ar') {
        document.documentElement.setAttribute('dir', 'rtl');
        document.documentElement.classList.add('rtl-mode');
    } else {
        document.documentElement.setAttribute('dir', 'ltr');
        document.documentElement.classList.remove('rtl-mode');
    }
}

// Switch Language and Trigger Site-Wide Translation
function changeSiteLanguage(lang, flagSrc, label) {
    document.cookie = `googtrans=/en/${lang}; path=/;`;
    document.cookie = `googtrans=/en/${lang}; domain=${window.location.hostname}; path=/;`;
    window.location.reload();
}

// Auto-sync language UI after header fetch completes
const origHeaderFetch = fetch('/partials/header.html');
origHeaderFetch
    .then(res => res.text())
    .then(data => {
        const headerEl = document.getElementById('header');
        if (headerEl) {
            headerEl.innerHTML = data;
            syncActiveLangUI();
        }
    });