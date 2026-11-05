// Landing/donation page behaviour: language switch and the hero animation.
(function () {
    'use strict';

    // ---------------------------------------------------------------- language
    var KEY = 'spec-book-lang';
    function initialLang() {
        var q = new URLSearchParams(window.location.search).get('lang');
        if (q === 'hu' || q === 'en') { return q; }
        try {
            var saved = localStorage.getItem(KEY);
            if (saved === 'hu' || saved === 'en') { return saved; }
        } catch (e) { /* storage may be blocked */ }
        return (navigator.language || '').toLowerCase().indexOf('hu') === 0 ? 'hu' : 'en';
    }

    var lang = initialLang();
    function apply(l) {
        lang = l;
        document.documentElement.lang = l;
        document.querySelectorAll('[data-en]').forEach(function (el) {
            var t = el.getAttribute('data-' + l);
            if (t !== null) { el.textContent = t; }
        });
        document.querySelectorAll('[data-href-hu]').forEach(function (el) {
            if (!el.hasAttribute('data-href-en')) { el.setAttribute('data-href-en', el.getAttribute('href')); }
            el.setAttribute('href', el.getAttribute('data-href-' + l));
        });
        var t = document.querySelector('[data-title-' + l + ']');
        if (t) { document.title = t.getAttribute('data-title-' + l); }
        var btn = document.getElementById('lang-toggle');
        if (btn) { btn.textContent = l === 'hu' ? 'EN' : 'HU'; }
        try { localStorage.setItem(KEY, l); } catch (e) { /* ignore */ }
    }
    apply(lang);
    var toggle = document.getElementById('lang-toggle');
    if (toggle) {
        toggle.addEventListener('click', function () { apply(lang === 'hu' ? 'en' : 'hu'); });
    }

    // ---------------------------------------------------------------- copy button (donation page)
    document.querySelectorAll('[data-copy]').forEach(function (btn) {
        btn.addEventListener('click', function () {
            var text = document.getElementById(btn.getAttribute('data-copy')).textContent.trim();
            var done = function () {
                var old = btn.textContent;
                btn.textContent = lang === 'hu' ? 'Másolva ✓' : 'Copied ✓';
                setTimeout(function () { btn.textContent = old; }, 1600);
            };
            if (navigator.clipboard && window.isSecureContext) {
                navigator.clipboard.writeText(text).then(done);
            } else {
                var r = document.createRange();
                r.selectNodeContents(document.getElementById(btn.getAttribute('data-copy')));
                var s = window.getSelection();
                s.removeAllRanges();
                s.addRange(r);
                try { document.execCommand('copy'); done(); } catch (e) { /* selected, user can copy */ }
            }
        });
    });

    // ---------------------------------------------------------------- hero: typing editor
    var pre = document.getElementById('typed');
    if (!pre) { return; }
    var lines = [
        [['kw', 'In: '], ['', 'n'], ['op', '∈'], ['ty', 'N'], ['', ', nums'], ['op', '∈'], ['ty', 'N'], ['', '[1..n]']],
        [['kw', 'Out: '], ['', 'cnt'], ['op', '∈'], ['ty', 'N']],
        [['kw', 'Pre: '], ['', '-']],
        [['kw', 'Post: '], ['', 'cnt='], ['mc', 'COUNT'], ['', '(i=1..n,'], ['', '\n      nums[i] '], ['op', 'mod'], ['', ' 2 = 1)']]
    ];
    var tabs = document.querySelectorAll('.tab');
    var verdict = document.getElementById('verdict');
    var reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function esc(s) { return s.replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
    function render(upto) {
        var html = '', left = upto;
        for (var li = 0; li < lines.length && left > 0; li++) {
            for (var si = 0; si < lines[li].length && left > 0; si++) {
                var cls = lines[li][si][0], txt = lines[li][si][1];
                var part = txt.slice(0, left);
                left -= part.length;
                html += cls ? '<span class="' + cls + '">' + esc(part) + '</span>' : esc(part);
            }
            if (left > 0 && li < lines.length - 1) { html += '\n'; left--; }
        }
        return html;
    }
    var total = lines.reduce(function (a, l) {
        return a + l.reduce(function (b, s) { return b + s[1].length; }, 0);
    }, 0) + lines.length - 1;

    function finish() {
        pre.innerHTML = render(total) + '<span class="cursor"></span>';
        tabs.forEach(function (t, i) {
            setTimeout(function () { t.classList.add('pass'); }, reduce ? 0 : 350 * (i + 1));
        });
        setTimeout(function () {
            verdict.textContent = lang === 'hu' ? '✓ 3/3 teszt zöld' : '✓ 3/3 tests passed';
            verdict.classList.add('show');
        }, reduce ? 0 : 350 * (tabs.length + 1));
        if (!reduce) { setTimeout(restart, 7000); }
    }
    function restart() {
        tabs.forEach(function (t) { t.classList.remove('pass'); });
        verdict.classList.remove('show');
        type(0);
    }
    function type(n) {
        if (n > total) { finish(); return; }
        pre.innerHTML = render(n) + '<span class="cursor"></span>';
        setTimeout(function () { type(n + 1); }, 28 + Math.random() * 40);
    }
    if (reduce) { finish(); } else { type(0); }
})();
