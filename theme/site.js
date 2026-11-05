// Site chrome shared by both books: language switch, home link and footer.
// Pages are laid out as <root>/en/<page>.html and <root>/hu/<page>.html, so the
// other language's version of a page is found by swapping the language folder.
(function () {
    'use strict';

    var lang = document.documentElement.lang === 'hu' ? 'hu' : 'en';
    var other = lang === 'hu' ? 'en' : 'hu';
    var T = {
        en: {
            home: 'Home', switchTo: 'Magyar változat', credit: 'Documentation by',
            source: 'Source', donate: 'Support with XMR', tool: 'Try speci-local'
        },
        hu: {
            home: 'Kezdőlap', switchTo: 'English version', credit: 'A dokumentációt készítette:',
            source: 'Forráskód', donate: 'Támogatás XMR-rel', tool: 'Próbáld ki a speci-localt'
        }
    }[lang];

    // path_to_root is set by mdBook's template; the site root is one level higher
    var toRoot = (typeof path_to_root === 'string' ? path_to_root : '') + '../';

    function otherLanguageUrl() {
        var path = window.location.pathname;
        var marker = '/' + lang + '/';
        var at = path.lastIndexOf(marker);
        if (at < 0) { return toRoot + other + '/index.html'; }
        var page = path.slice(at + marker.length) || 'index.html';
        return path.slice(0, at) + '/' + other + '/' + page + window.location.hash;
    }

    function el(tag, attrs, text) {
        var e = document.createElement(tag);
        Object.keys(attrs || {}).forEach(function (k) { e.setAttribute(k, attrs[k]); });
        if (text) { e.textContent = text; }
        return e;
    }

    // header: language switch + home
    var right = document.querySelector('.right-buttons');
    if (right) {
        var sw = el('a', {
            href: otherLanguageUrl(), class: 'lang-switch', hreflang: other,
            title: T.switchTo, 'aria-label': T.switchTo
        }, other.toUpperCase());
        right.insertBefore(sw, right.firstChild);
        var home = el('a', { href: toRoot + 'index.html', class: 'home-link', title: T.home, 'aria-label': T.home });
        home.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill="currentColor" d="M12 3 2 11h3v9h6v-6h2v6h6v-9h3z"/></svg>';
        right.insertBefore(home, right.firstChild);
    }

    // footer: credit, source, donation (small but visible)
    var main = document.querySelector('#mdbook-content main, #content main, main');
    if (main) {
        var f = el('footer', { class: 'site-footer' });
        f.innerHTML =
            '<span>' + T.credit + ' <a href="https://csabi.zip">csabi.zip</a></span>' +
            '<span class="sep">·</span>' +
            '<a href="https://github.com/FCsab/specifikacio-dokumentacio">' + T.source + '</a>' +
            '<span class="sep">·</span>' +
            '<a href="https://github.com/FCsab/speci-local">' + T.tool + '</a>' +
            '<span class="sep">·</span>' +
            '<a class="donate-link" href="' + toRoot + 'donate.html' + (lang === 'hu' ? '?lang=hu' : '') + '">' +
            '<span class="xmr-dot" aria-hidden="true"></span>' + T.donate + '</a>';
        main.appendChild(f);
    }
})();
