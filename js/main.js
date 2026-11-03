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
            let result = null;
            try { result = fn(); } catch (e) { result = null; }
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
    if (!menu) return;
    const isShown = menu.classList.contains('show') || menu.style.display === 'block';

    document.querySelectorAll('.lang-menu-list').forEach(el => {
        el.classList.remove('show');
        el.style.setProperty('display', 'none', 'important');
    });

    if (!isShown) {
        menu.classList.add('show');
        menu.style.setProperty('display', 'block', 'important');
    }
}

document.addEventListener('click', () => {
    document.querySelectorAll('.lang-menu-list').forEach(el => {
        el.classList.remove('show');
        el.style.setProperty('display', 'none', 'important');
    });
});

// Language configuration mapping
const siteLangMap = {
    en: { code: 'US', flag: 'https://flagcdn.com/w40/us.png' },
    ar: { code: 'AE', flag: 'https://flagcdn.com/w40/ae.png' },
    ru: { code: 'RU', flag: 'https://flagcdn.com/w40/ru.png' },
    fr: { code: 'FR', flag: 'https://flagcdn.com/w40/fr.png' },
    bn: { code: 'BD', flag: 'https://flagcdn.com/w40/bd.png' }
};

// ---------------------------------------------------------------------------
// Language persistence (site-wide)
//
//  * `site_lang` cookie (+ localStorage fallback) = our own source of truth.
//    It survives closing the browser and applies to every page of the site.
//  * `googtrans` cookie = derived value that Google Translate reads to decide
//    what to translate. It is always rebuilt from `site_lang`.
//
// Google writes its own googtrans copies on the host AND on parent domains.
// To switch back to English reliably, every scope must be cleared, otherwise
// a stale copy re-translates the page on the next load.
// ---------------------------------------------------------------------------
const LANG_COOKIE = 'site_lang';
const GOOGTRANS_COOKIE = 'googtrans';
const LANG_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year
const LANG_RESET_GUARD_KEY = 'site_lang_reset_once';

function isValidLang(lang) {
    return typeof lang === 'string' && Object.prototype.hasOwnProperty.call(siteLangMap, lang);
}

function readCookie(name) {
    try {
        const match = document.cookie.match(new RegExp('(?:^|;\\s*)' + name + '=([^;]*)'));
        if (!match) return null;
        try {
            return decodeURIComponent(match[1]);
        } catch (e) {
            return match[1];
        }
    } catch (e) {
        return null;
    }
}

function cookieSecureFlag() {
    return window.location.protocol === 'https:' ? '; Secure' : '';
}

// Every domain/path combination a googtrans cookie could have been written to.
function getCookieScopes() {
    const host = window.location.hostname;
    const isIpOrLocal = /^(localhost|\d{1,3}(\.\d{1,3}){3}|\[.*\])$/.test(host);

    const domains = [null]; // null = host-only cookie
    if (!isIpOrLocal) {
        const parts = host.split('.');
        for (let i = 0; i <= parts.length - 2; i++) {
            const d = parts.slice(i).join('.');
            domains.push(d, '.' + d);
        }
    }

    const paths = ['/'];
    let acc = '';
    window.location.pathname.split('/').filter(Boolean).forEach(seg => {
        acc += '/' + seg;
        paths.push(acc);
    });

    return { domains, paths };
}

function expireCookieEverywhere(name) {
    const { domains, paths } = getCookieScopes();
    domains.forEach(domain => {
        paths.forEach(path => {
            try {
                document.cookie =
                    `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; max-age=0; path=${path}` +
                    (domain ? `; domain=${domain}` : '');
            } catch (e) { /* ignore */ }
        });
    });
}

function storageGet(key) {
    try { return window.localStorage.getItem(key); } catch (e) { return null; }
}

function storageSet(key, value) {
    try { window.localStorage.setItem(key, value); } catch (e) { /* ignore */ }
}

// Returns the saved language: site_lang cookie -> localStorage -> legacy googtrans -> 'en'.
function getSavedLang() {
    const own = readCookie(LANG_COOKIE);
    if (isValidLang(own)) return own;

    const stored = storageGet(LANG_COOKIE);
    if (isValidLang(stored)) return stored;

    // Migration for visitors who only have Google's cookie from before this fix.
    const goog = readCookie(GOOGTRANS_COOKIE);
    if (goog) {
        const fromGoog = goog.split('/').pop();
        if (isValidLang(fromGoog)) return fromGoog;
    }
    return 'en';
}

// Rebuilds the googtrans cookie from scratch: clear every scope, then set one clean copy.
function setGoogtransCookie(lang) {
    expireCookieEverywhere(GOOGTRANS_COOKIE);
    if (lang !== 'en' && isValidLang(lang)) {
        document.cookie =
            `${GOOGTRANS_COOKIE}=/en/${lang}; max-age=${LANG_COOKIE_MAX_AGE}; path=/; SameSite=Lax${cookieSecureFlag()}`;
    }
}

function saveLang(lang) {
    if (!isValidLang(lang)) return;
    try {
        document.cookie =
            `${LANG_COOKIE}=${lang}; max-age=${LANG_COOKIE_MAX_AGE}; path=/; SameSite=Lax${cookieSecureFlag()}`;
    } catch (e) { /* ignore */ }
    storageSet(LANG_COOKIE, lang);
    setGoogtransCookie(lang);
}

// Runs before the Google script loads so a stale cookie can never translate the page
// into the wrong language. Also upgrades existing visitors to the new cookie.
function normalizeLangCookies() {
    const lang = getSavedLang();
    if (!isValidLang(readCookie(LANG_COOKIE))) {
        saveLang(lang);          // first visit / migration: persist site_lang
    } else {
        setGoogtransCookie(lang); // keep googtrans in sync with site_lang
    }
}

// One-time reload guard (prevents any possibility of a reload loop).
function canResetReloadOnce() {
    try {
        if (window.sessionStorage.getItem(LANG_RESET_GUARD_KEY)) return false;
        window.sessionStorage.setItem(LANG_RESET_GUARD_KEY, '1');
        return true;
    } catch (e) {
        return false; // can't guard safely -> don't reload
    }
}

function clearResetReloadGuard() {
    try { window.sessionStorage.removeItem(LANG_RESET_GUARD_KEY); } catch (e) { /* ignore */ }
}

function syncActiveLangUI(language) {
    const current = isValidLang(language) ? language : getSavedLang();
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

// Drives Google's hidden dropdown to the target language.
// Google may ignore the first change event while its engine is still loading,
// so apply, verify and retry. Resolves true when the page is translated.
async function applyTranslation(lang) {
    initTranslateWidget();
    const translateSelect = await waitForTranslateCombo();

    const hasOption = translateSelect &&
        Array.from(translateSelect.options).some(opt => opt.value === lang);

    if (!hasOption) return false;

    const MAX_ATTEMPTS = 3;
    for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
        translateSelect.value = lang;
        translateSelect.dispatchEvent(new Event('change', { bubbles: true }));

        if (await waitFor(isPageTranslated, 1500)) {
            return true;
        }
    }
    return false;
}

// Switch Language and Trigger Site-Wide Translation
let langChangeInProgress = false;

async function changeSiteLanguage(lang) {
    if (!isValidLang(lang)) {
        return;
    }
    if (langChangeInProgress) {
        return; // ignore rapid double-clicks while a change is being applied
    }
    langChangeInProgress = true;

    try {
        const previousLang = getSavedLang();

        saveLang(lang);          // updates site_lang + rebuilds googtrans (cleared for English)
        syncActiveLangUI(lang);
        clearResetReloadGuard();

        if (lang === 'en') {
            // Back to the source language: all cookie scopes are cleared, a reload restores the original page.
            if (previousLang !== 'en' || isPageTranslated()) {
                window.location.reload();
            }
            return;
        }

        const translated = await applyTranslation(lang);

        if (!translated) {
            // Widget unavailable (blocked / slow network): the cookie is already set,
            // so a reload applies the language reliably.
            window.location.reload();
        }
    } finally {
        langChangeInProgress = false;
    }
}

// Re-applies the user's saved language on every page load.
async function restoreSavedLanguage() {
    const lang = getSavedLang();
    syncActiveLangUI(lang);

    if (lang === 'en') {
        // Saved language is English: make sure nothing translated the page.
        setGoogtransCookie('en');
        if (isPageTranslated()) {
            if (canResetReloadOnce()) window.location.reload();
        } else {
            clearResetReloadGuard();
        }
        return;
    }

    clearResetReloadGuard();
    setGoogtransCookie(lang); // make sure Google sees one clean cookie on this page

    // Google normally picks the cookie up by itself once the widget starts.
    if (await waitFor(isPageTranslated, 2500)) return;

    // If it did not, drive the dropdown ourselves.
    await applyTranslation(lang);
}

// Normalise cookies FIRST, then load Google Translate, so Google can only ever
// read the cookie that matches the user's saved language.
normalizeLangCookies();

// Google Translate Script Dynamic Load
(function loadGoogleTranslate() {
    const s = document.createElement('script');
    s.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    s.async = true;
    document.head.appendChild(s);
})();

// Auto-sync language UI after header fetch completes

// ---------------------------------------------------------------------------
// Dynamic Active Nav Link Synchronization
// Highlights the current page in Desktop Navbar & Mobile Drawer
// ---------------------------------------------------------------------------
function syncActiveNavLink() {
    try {
        const pathName = window.location.pathname.toLowerCase();
        let currentPage = pathName.substring(pathName.lastIndexOf('/') + 1) || 'index.html';
        if (currentPage === '' || currentPage === '/') currentPage = 'index.html';

        // Clear all existing active classes in navigation
        document.querySelectorAll('.navbar-nav .nav-link, .mobile-menu-drawer .drawer-link, .treattopheder a, .drawer-submenu-list a').forEach(el => {
            el.classList.remove('active');
        });

        let matched = false;

        // 1. Direct match for standalone pages (Home, Hospitals, Doctors, Cost, Blog, Patient Stories, etc.)
        document.querySelectorAll('.navbar-nav .nav-link, .mobile-menu-drawer .drawer-link').forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href === '#' || href.startsWith('javascript:')) return;
            const target = href.substring(href.lastIndexOf('/') + 1).toLowerCase();
            if (target === currentPage) {
                link.classList.add('active');
                matched = true;
            }
        });

        // 2. Treatment subpages -> Highlight "Treatments" dropdown & specific dropdown item
        const treatmentPages = [
            'cardiac-surgery.html', 'orthopedic-surgery.html', 'ivf-fertility.html',
            'cosmetic-surgery.html', 'knee-hipreplacement.html', 'spine-surgery.html',
            'cancer-treatment.html', 'dental-implants.html', 'bariatric-surgery.html',
            'liver-kidney-transplant.html', 'neuro-surgeries.html', 'eye-surgery.html',
            'orthopedic-trauma-surgery.html', 'hair-transplant.html', 'stem-cell-therapy.html'
        ];
        if (treatmentPages.includes(currentPage)) {
            document.querySelectorAll('.navbar-nav .dropdown-toggle, .mobile-menu-drawer .drawer-accordion-toggle').forEach(btn => {
                if (/treatment/i.test(btn.textContent)) {
                    btn.classList.add('active');
                }
            });
            document.querySelectorAll('.treattopheder a, .drawer-submenu-list a').forEach(a => {
                const href = a.getAttribute('href');
                if (href && href.substring(href.lastIndexOf('/') + 1).toLowerCase() === currentPage) {
                    a.classList.add('active');
                }
            });
            matched = true;
        }

        // 3. Service subpages -> Highlight "Services" dropdown
        const servicePages = [
            'air-ambulance-service.html', 'online-doctor-consultation.html',
            'accommodation-service.html', 'pre-post-arrival-services.html',
            'flight-booking.html', 'hotel-booking.html', 'visa-assistance.html'
        ];
        if (servicePages.includes(currentPage)) {
            document.querySelectorAll('.navbar-nav .dropdown-toggle, .mobile-menu-drawer .drawer-accordion-toggle').forEach(btn => {
                if (/service/i.test(btn.textContent)) {
                    btn.classList.add('active');
                }
            });
            matched = true;
        }

        // 4. Fallback for Root URL -> Highlight Home
        if (!matched && (currentPage === 'index.html' || currentPage === '')) {
            document.querySelectorAll('.navbar-nav .nav-link, .mobile-menu-drawer .drawer-link').forEach(link => {
                const href = link.getAttribute('href');
                if (href && href.includes('index.html')) {
                    link.classList.add('active');
                }
            });
        }
    } catch (err) {
        console.error('Error syncing active nav link:', err);
    }
}

fetch('/partials/header.html')
    .then(res => res.text())
    .then(data => {
        const headerEl = document.getElementById('header');
        if (headerEl) {
            headerEl.innerHTML = data;
            syncActiveNavLink();
            initTranslateWidget();   // header now has #google_translate_element
            const callModal = document.getElementById('callModal');
            if (callModal && callModal.parentElement !== document.body) {
                document.body.appendChild(callModal);
            }
            syncActiveLangUI();
            restoreSavedLanguage();
        }
    });