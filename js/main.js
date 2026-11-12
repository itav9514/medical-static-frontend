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
        // Strip origin, hashes and query parameters
        let path = (window.location.pathname || '').toLowerCase().split('#')[0].split('?')[0];
        // Strip trailing slashes
        path = path.replace(/\/+$/, '');
        // Get the current file or slug
        let rawSegment = path.substring(path.lastIndexOf('/') + 1) || 'index';
        if (rawSegment === '' || rawSegment === '/') rawSegment = 'index';
        
        // Both with extension and without extension for clean URL support
        const currentWithExt = rawSegment.endsWith('.html') ? rawSegment : rawSegment + '.html';
        const currentBase = rawSegment.replace(/\.html$/, '');

        // Clear all existing active classes in navigation
        document.querySelectorAll('.navbar-nav .nav-link, .mobile-menu-drawer .drawer-link, .treattopheder a, .drawer-submenu-list a').forEach(el => {
            el.classList.remove('active');
        });

        let matched = false;

        // 1. Direct match for standalone pages (Home, Hospitals, Doctors, Cost, Blog, Patient Stories, etc.)
        document.querySelectorAll('.navbar-nav .nav-link, .mobile-menu-drawer .drawer-link').forEach(link => {
            const href = link.getAttribute('href');
            if (!href || href === '#' || href.startsWith('javascript:')) return;
            const target = href.split('#')[0].split('?')[0].substring(href.lastIndexOf('/') + 1).toLowerCase();
            const targetBase = target.replace(/\.html$/, '');

            if (target === currentWithExt || targetBase === currentBase) {
                // If it matches 'index', make sure current really is index/root
                if (targetBase === 'index') {
                    if (currentBase === 'index' || currentBase === '') {
                        link.classList.add('active');
                        matched = true;
                    }
                } else {
                    link.classList.add('active');
                    matched = true;
                }
            }
        });

        // 2. Treatment subpages -> Highlight "Treatments" dropdown & specific dropdown item
        const treatmentBases = [
            'treatment', 'treatmemt',
            'cardiac-surgery', 'orthopedic-surgery', 'ivf-fertility',
            'cosmetic-surgery', 'knee-hipreplacement', 'spine-surgery',
            'cancer-treatment', 'dental-implants', 'bariatric-surgery',
            'liver-kidney-transplant', 'neuro-surgeries', 'eye-surgery',
            'orthopedic-trauma-surgery', 'hair-transplant', 'stem-cell-therapy'
        ];
        if (treatmentBases.includes(currentBase)) {
            document.querySelectorAll('.navbar-nav .dropdown-toggle, .mobile-menu-drawer .drawer-accordion-toggle').forEach(btn => {
                if (/treatment/i.test(btn.textContent)) {
                    btn.classList.add('active');
                }
            });
            document.querySelectorAll('.treattopheder a, .drawer-submenu-list a').forEach(a => {
                const href = a.getAttribute('href');
                if (!href) return;
                const aTarget = href.split('#')[0].split('?')[0].substring(href.lastIndexOf('/') + 1).toLowerCase();
                const aBase = aTarget.replace(/\.html$/, '');
                if (aBase === currentBase) {
                    a.classList.add('active');
                }
            });
            matched = true;
        }

        // 3. Service subpages -> Highlight "Services" dropdown
        const serviceBases = [
            'air-ambulance-service', 'online-doctor-consultation',
            'accommodation-service', 'pre-post-arrival-services',
            'flight-booking', 'hotel-booking', 'visa-assistance'
        ];
        if (serviceBases.includes(currentBase)) {
            document.querySelectorAll('.navbar-nav .dropdown-toggle, .mobile-menu-drawer .drawer-accordion-toggle').forEach(btn => {
                if (/service/i.test(btn.textContent)) {
                    btn.classList.add('active');
                }
            });
            matched = true;
        }

        // 4. Fallback for Root URL -> Highlight Home
        if (!matched && (currentBase === 'index' || currentBase === '')) {
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


/* ==========================================================================
   Desktop nav "More" overflow (sirf >= 992px)

   Algorithm (deterministic):
   1. Saare links wapas apni jagah rakho (restore) -> natural widths naapo.
   2. "More" button ki width alag se naapo.
   3. Available width = nav ki inner width (yeh visible links ki ginti par
      depend nahi karti).
   4. Aakhri link se shuru karke ek-ek hide karo jab tak:
         sum(visible widths) + More width + (n-1) * gap <= available
   5. Measurement state-independent hai, isliye same width hamesha same layout
      deti hai (flicker nahi).
   Links ka size aur gap (CSS column-gap) kabhi nahi badalte; jagah kam padne par
   sirf aakhri link ek-ek karke More me jata hai.
   Treatments / Services / Home kabhi move nahi hote. < 992px par kuch nahi.
   ========================================================================== */
(function () {
    'use strict';
    var DESKTOP = '(min-width: 992px)';
    var nav, more, moreMenu, moreToggle, moved = [], ticking = false, lastCount = 0;
    var lastW = 0, resetGuard = true, lastChrome = null, lastLogged = -1;   // monotonic guard: pichhli viewport width aur pichhla hidden count

    function isDesktop() { return window.matchMedia(DESKTOP).matches; }

    function build() {
        more = document.createElement('div');
        more.className = 'nav-item dropdown nav-more';
        more.innerHTML =
            '<a href="#" class="nav-link dropdown-toggle" data-bs-toggle="dropdown" role="button" aria-expanded="false">More</a>' +
            '<div class="dropdown-menu dropdown-menu-end rounded-0 rounded-bottom m-0"></div>';
        moreToggle = more.firstChild;
        moreMenu = more.lastChild;
    }

    function restore() {
        while (moved.length) {
            var el = moved.pop();
            el.className = el.getAttribute('data-nm-class') || '';
            el.removeAttribute('data-nm-class');
            if (el._nmPh && el._nmPh.parentNode) el._nmPh.parentNode.replaceChild(el, el._nmPh);
            el._nmPh = null;
        }
        moreToggle.classList.remove('active');
        if (more.parentNode) more.parentNode.removeChild(more);
    }

    // Available width = nav ki apni asli rendered inner width.
    // CSS me nav `flex: 1 1 0` + `min-width: 0` hai, isliye uski width sirf logo aur phone
    // section ke baad bachi hui jagah hai - visible links ki ginti par depend nahi karti.
    function innerWidth_() {
        var cs = window.getComputedStyle(nav);
        return nav.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
    }

    // kitne links hide karne padenge (0 = sab fit), diye gaye gap par
    function countFor(widths, movableIdx, moreW, inner, gap) {   // gap = CSS ka fixed column-gap (kabhi nahi badalta)
        var total = 0, i;
        for (i = 0; i < widths.length; i++) total += widths[i];
        for (var h = 0; h <= movableIdx.length; h++) {
            var sum = total, n = widths.length;
            for (i = 0; i < h; i++) { sum -= widths[movableIdx[movableIdx.length - 1 - i]]; n--; }
            if (h > 0) { sum += moreW; n++; }
            if (sum + (n - 1) * gap <= inner) return h;
        }
        return movableIdx.length;
    }

    function update() {
        ticking = false;
        if (!nav) return;
        restore();                       // hamesha full layout se measure karo
        if (!isDesktop()) { lastCount = 0; lastW = 0; resetGuard = true; return; }

        var kids = [].slice.call(nav.children);
        var widths = kids.map(function (el) { return el.offsetWidth; });
        var movableIdx = [];
        kids.forEach(function (el, i) {
            if (i > 0 && el.tagName === 'A' && el.classList.contains('nav-link') &&
                !el.classList.contains('dropdown-toggle')) movableIdx.push(i);
        });
        if (!movableIdx.length) { lastCount = 0;  return; }

        // More ki width alag se naapo
        nav.appendChild(more);
        var moreW = more.offsetWidth;
        nav.removeChild(more);

        var inner = innerWidth_();
        var gap = parseFloat(window.getComputedStyle(nav).columnGap) || 0;
        var cnt = countFor(widths, movableIdx, moreW, inner, gap);

        // MONOTONIC GUARD: viewport chhota (ya same) hone par visible links kabhi nahi badhenge.
        // Agar header ki koi aur CSS kisi width par logo/phone ki jagah ghata de (jisse nav ko
        // achanak zyada jagah mile), tab bhi hidden count pichhle se kam nahi hoga.
        // Sirf "content badla" events (font, language, image load) par guard reset hota hai.
        var W = window.innerWidth;
        // DIAGNOSTIC: logo/language/phone ki total jagah (chrome = viewport - nav) agar width badalne
        // par badalti hai, to nav ko achanak zyada jagah milti hai. Yahi non-monotonic behaviour ki jad hai.
        var chrome = W - Math.round(inner);
        if (lastChrome !== null && Math.abs(chrome - lastChrome) > 2 && Math.abs(W - lastW) <= 40) {
            console.warn('[nav-more] header ki baaki jagah (logo+lang+phone) ' + lastChrome + 'px se ' + chrome +
                'px ho gayi (viewport ' + lastW + ' -> ' + W + '). Koi CSS is width par logo/phone ki size ya padding badal rahi hai.');
        }
        lastChrome = chrome;
        var truthCnt = cnt, guardHeld = false;
        if (!resetGuard && lastW && W <= lastW && cnt < lastCount) { cnt = Math.min(lastCount, movableIdx.length); guardHeld = true; }
        // DEBUG LOG: sirf tab chhapta hai jab hidden count badalta hai (resize karte waqt kuch hi lines)
        if (cnt !== lastLogged) {
            var sumAll = widths.reduce(function (x, y) { return x + y; }, 0);
            console.log('[nav-more] viewport=' + W + ' navInner=' + Math.round(inner) + ' chrome=' + chrome +
                ' linksSum=' + sumAll + ' moreW=' + moreW + ' gap=' + gap + ' hidden=' + lastLogged + '->' + cnt +
                ' truth=' + truthCnt + (guardHeld ? ' (GUARD held)' : '') + (resetGuard ? ' (guard was reset)' : ''));
            lastLogged = cnt;
        }
        resetGuard = false;
        lastW = W;
        // Measurement visible links par depend nahi karti, isliye same width = same layout (hysteresis ki zaroorat nahi)
        lastCount = cnt;
        if (!cnt) return;

        nav.appendChild(more);           // Services ke baad
        for (var k = 0; k < cnt; k++) {
            var el = kids[movableIdx[movableIdx.length - 1 - k]];
            el._nmPh = document.createComment('nm');
            el.parentNode.insertBefore(el._nmPh, el);
            el.setAttribute('data-nm-class', el.className);
            if (el.classList.contains('active')) moreToggle.classList.add('active');
            el.className = 'dropdown-item';
            moreMenu.insertBefore(el, moreMenu.firstChild);   // original order
            moved.push(el);
        }
    }

    function schedule(isContentChange) {
        if (isContentChange === true) resetGuard = true;
        if (ticking) return;
        ticking = true;
        if (window.requestAnimationFrame) window.requestAnimationFrame(update);
        else setTimeout(update, 50);
    }

    function init() {
        var n = document.querySelector('.navbar .navbar-nav');
        if (!n || !n.querySelector('.nav-link')) return false;
        nav = n;
        console.log('[nav-more v3] ready');
        build();
        update();
        window.addEventListener('resize', schedule);

        // Navbar ki asli width badalne par (zoom, font load) bhi dobara measure
        if (window.ResizeObserver) {
            var ro = new ResizeObserver(function () { schedule(); });
            // nav ki width hi "available space" hai; logo/phone badge badle to bhi dobara measure
            [nav, nav.closest('.navbar'), nav.parentNode].concat(
                [].slice.call((nav.closest('.navbar') || document).querySelectorAll('.navbar-brand, .call-top, .custom-lang-dropdown'))
            ).forEach(function (el) { if (el) ro.observe(el); });
        }

        // Language badalne par (translated-ltr/rtl, dir) nav dobara measure karo
        if (window.MutationObserver) {
            var lastLangKey = document.documentElement.getAttribute('dir') + '|' + /\btranslated-(ltr|rtl)\b/.test(document.documentElement.className);
            new MutationObserver(function () {
                var key = document.documentElement.getAttribute('dir') + '|' + /\btranslated-(ltr|rtl)\b/.test(document.documentElement.className);
                if (key === lastLangKey) return;       // koi aur class badli = resize se related nahi, guard na tode
                lastLangKey = key;
                schedule(true);
                setTimeout(function () { schedule(true); }, 600);   // Google ka text badalna poora hone ke baad
            }).observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'dir'] });
        }

        window.addEventListener('orientationchange', function () { schedule(true); });
        // Logo jaise images der se load hon to width badalti hai -> dobara measure
        [].forEach.call((nav.closest('.navbar') || document).querySelectorAll('img'), function (im) {
            if (!im.complete) im.addEventListener('load', function () { schedule(true); });
        });
        window.addEventListener('load', function () { schedule(true); });
        if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { schedule(true); });
        setTimeout(function () { schedule(true); }, 400);
        return true;
    }

    // header fetch hone ke baad hi chalega
    if (!init() && window.MutationObserver) {
        var mo = new MutationObserver(function () { if (init()) mo.disconnect(); });
        mo.observe(document.documentElement, { childList: true, subtree: true });
    }
})();