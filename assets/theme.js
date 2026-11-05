// Applies the theme chosen in the books (or the system preference) to the
// landing and donation pages, exactly as mdBook does. Runs in <head>.
(function () {
    'use strict';
    var theme = null;
    try { theme = localStorage.getItem('mdbook-theme'); } catch (e) { /* storage blocked */ }
    if (theme) { theme = theme.replace(/^"|"$/g, ''); }
    if (!theme || theme === 'default_theme') {
        theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'navy' : 'light';
    }
    var html = document.documentElement;
    html.classList.remove('light');
    html.classList.add(theme, 'js');

    var dark = theme === 'coal' || theme === 'navy';
    var sheets = {
        highlight: document.getElementById('mdbook-highlight-css'),
        night: document.getElementById('mdbook-tomorrow-night-css'),
        ayu: document.getElementById('mdbook-ayu-highlight-css')
    };
    if (sheets.highlight) { sheets.highlight.disabled = dark || theme === 'ayu'; }
    if (sheets.night) { sheets.night.disabled = !dark; }
    if (sheets.ayu) { sheets.ayu.disabled = theme !== 'ayu'; }
})();
