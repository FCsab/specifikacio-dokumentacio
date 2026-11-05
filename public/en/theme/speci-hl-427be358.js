// Syntax highlighting for specification code blocks (```speci).
// Registers a highlight.js language and re-highlights the blocks that book.js
// already processed without knowing the language.
(function () {
    'use strict';
    if (typeof hljs === 'undefined') { return; }

    // Latin letters incl. Hungarian accents (highlight.js 10 drops the `u` flag)
    var WORD = '[A-Za-z\u00C0-\u017E_][A-Za-z0-9\u00C0-\u017E_]*';

    hljs.registerLanguage('speci', function () {
        return {
            name: 'Specification',
            aliases: ['spec', 'sp'],
            keywords: {
                $pattern: WORD,
                keyword: 'and or not mod element exists forall és vagy nem eleme létezik minden',
                literal: 'true false igaz hamis',
                built_in: 'abs length from to hossz tól ig'
            },
            contains: [
                hljs.C_LINE_COMMENT_MODE,
                hljs.C_BLOCK_COMMENT_MODE,
                {
                    // block headers at the start of a line
                    className: 'section',
                    begin: '^[ \\t]*(In|Be|Aux|Sa|Out|Ki|Fn|Fv|Pre|Ef|Post|Uf):',
                    relevance: 10
                },
                { className: 'keyword', begin: '[\u2200\u2203\u2208\u2192\u00AC\u2227\u2228]|->' },
                {
                    // theorem macros (before `type`, which would claim any capitalised word)
                    className: 'built_in',
                    begin: '\\b(SUM|COUNT|DARAB|MAX|MIN|EXISTS|FORALL|SELECT|SEARCH|COPY|MIS|CONDMAX|CONDMIN|ABS)\\b'
                },
                { className: 'type', begin: '\\b[A-Z\u00C0-\u00DE\u0150\u0170][A-Za-z0-9\u00C0-\u017E_]*', relevance: 0 },
                hljs.QUOTE_STRING_MODE,
                { className: 'number', begin: '\\b\\d+(\\.\\d+)?\\b', relevance: 0 }
            ]
        };
    });

    document.querySelectorAll('code.language-speci, code.language-spec').forEach(function (block) {
        block.textContent = block.textContent; // drop markup from the first pass
        hljs.highlightBlock(block);
        block.classList.add('hljs');
    });
})();
