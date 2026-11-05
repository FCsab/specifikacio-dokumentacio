// Landing and donation pages: language choice, code highlighting, copy button.
(function () {
    'use strict';

    // ------------------------------------------------------------ language
    var KEY = 'spec-book-lang';
    var TITLES = {
        en: { index: 'The Specification Editor Book', donate: 'Support · The Specification Editor Book' },
        hu: { index: 'A Specifikációszerkesztő könyve', donate: 'Támogatás · A Specifikációszerkesztő könyve' }
    };
    var page = /donate\.html$/.test(location.pathname) ? 'donate' : 'index';

    function initial() {
        var q = new URLSearchParams(location.search).get('lang');
        if (q === 'en' || q === 'hu') { return q; }
        try {
            var s = localStorage.getItem(KEY);
            if (s === 'en' || s === 'hu') { return s; }
        } catch (e) { /* storage blocked */ }
        return (navigator.language || '').toLowerCase().indexOf('hu') === 0 ? 'hu' : 'en';
    }

    var lang;
    var toggle = document.getElementById('lang-toggle');
    function apply(l) {
        lang = l;
        document.documentElement.lang = l;
        document.title = TITLES[l][page];
        document.querySelectorAll('[data-en]').forEach(function (e) {
            e.textContent = e.getAttribute('data-' + l);
        });
        if (toggle) {
            toggle.textContent = l === 'hu' ? 'EN' : 'HU';
            toggle.title = l === 'hu' ? 'English version' : 'Magyar változat';
        }
        try { localStorage.setItem(KEY, l); } catch (e) { /* ignore */ }
    }
    apply(initial());
    if (toggle) { toggle.addEventListener('click', function () { apply(lang === 'hu' ? 'en' : 'hu'); }); }

    // ------------------------------------------------------------ highlighting
    if (typeof hljs !== 'undefined') {
        document.querySelectorAll('pre > code').forEach(function (b) {
            if (!b.classList.contains('language-speci')) { hljs.highlightBlock(b); }
            b.classList.add('hljs');
        });
    }

    // ------------------------------------------------------------ copy button
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var el = document.getElementById(btn.getAttribute('data-copy'));
            var done = function () {
                btn.textContent = lang === 'hu' ? 'Másolva ✓' : 'Copied ✓';
                setTimeout(function () { btn.textContent = btn.getAttribute('data-' + lang); }, 1600);
            };
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(el.textContent.trim()).then(done);
            } else {
                var r = document.createRange();
                r.selectNodeContents(el);
                var s = getSelection();
                s.removeAllRanges();
                s.addRange(r);
                try { document.execCommand('copy'); done(); } catch (e) { /* left selected */ }
            }
        });
    });
})();
