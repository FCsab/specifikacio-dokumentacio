# The Specification Editor Book · A Specifikációszerkesztő könyve

A complete, unofficial guide to the ELTE Specification Editor
([progalap.elte.hu/specifikacio](https://progalap.elte.hu/specifikacio/)),
used in the course PROGRAMMING (`IP-18fPROGEG`), and to
[speci-local](https://github.com/FCsab/speci-local), its offline
reimplementation. The full book is written in both English and Hungarian.

Documentation by [csabi.zip](https://csabi.zip). If it helped you, you can
[support it with XMR](donate.html).

## Structure

The repository is the website: plain static HTML, CSS and JavaScript. There is
no build step. Edit the HTML files directly and upload them.

| Path | Contents |
|------|----------|
| `index.html` | landing page (the entry point) |
| `donate.html` | XMR donation page |
| `en/`, `hu/` | the two books, one HTML file per chapter; same file names in both |
| `en/theme/`, `hu/theme/` | shared look: `custom.css`, spec-language highlighting (`speci-hl.js`), language switch and footer (`site.js`) |
| `assets/` | the landing pages' script, stylesheet and QR code |
| `source/` | reference material and tools, not needed on the server |

Inside `source/`:

| Path | Contents |
|------|----------|
| `SKILL.md`, `onsite.txt` | the collected reference, and the editor's built-in documentation |
| `tools/check-links.py` | optional: checks every internal link and anchor of the site |
| `speci-local-edits.md` | where speci-local behaves differently from the online editor (1.5.2), with fixes |

The landing and donation pages use the books' own stylesheets (`en/css`,
`en/theme/custom.css`) and follow the theme chosen in the books.

The books were first generated with mdBook, but the HTML is now the only
source. Old Markdown sources are in the git history.

## Previewing

Open `index.html` in a browser, or run `python3 -m http.server` in the
repository root and open <http://localhost:8000>.

Optionally, check the links after editing:

```sh
python3 source/tools/check-links.py .
```

## Publishing

Copy `index.html`, `donate.html`, `assets/`, `en/` and `hu/` to the web root,
for example:

```sh
rsync -av --delete --exclude source --exclude .git ./ <name>@caesar.elte.hu:public_html/
```

## Editing

- A chapter is one file, e.g. `en/ch06-01-sum.html`. Its text is inside
  `<main>`. Change the same file in `hu/` too, so the EN/HU switch lands on
  the matching page.
- The left-hand table of contents is repeated in every page. If you add,
  rename or remove a chapter, update it in every file of that book.
- Search uses `searchindex.js`, which is not updated by hand edits. New text
  will not be found by search until the index is regenerated.
- Code examples are `<pre><code class="language-…">` blocks. The class
  decides the label and colouring:

| Class | Meaning |
|-------|---------|
| `language-speci` | complete specification |
| `language-speci fragment` | partial snippet |
| `language-speci online` | uses syntax only the online editor knows (shown with an "online editor" label) |
| `language-speci error` | a specification the editor rejects |
| `language-yaml` | test case that is green |
| `language-yaml red` | test case that is red (shown with a "✗ red" label) |
| `language-yaml fragment` | data snippet |

Inside code blocks, escape `<`, `>` and `&` as `&lt;`, `&gt;` and `&amp;`.

## Credits

The text and the site are by csabi.zip. The UI screenshots come from the
official course manual (*Manual for the Specification Editor tool*). The
Specification Editor itself is the work of its authors at ELTE IK. This project
is not affiliated with ELTE.
