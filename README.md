# The Specification Editor Book · A Specifikációszerkesztő könyve

A complete, unofficial guide to the ELTE Specification Editor
([progalap.elte.hu/specifikacio](https://progalap.elte.hu/specifikacio/)),
used in the course PROGRAMMING (`IP-18fPROGEG`), and to
[speci-local](https://github.com/FCsab/speci-local), its offline
reimplementation. The full book is written in both English and Hungarian.

Documentation by [csabi.zip](https://csabi.zip). If it helped you, you can
[support it with XMR](donate.html).

## Structure

The repository is the website, as plain static files. There is no build step:
edit the HTML directly.

| Path | Contents |
|------|----------|
| `index.html` | landing page (the entry point) |
| `donate.html` | XMR donation page |
| `en/`, `hu/` | the two books; same file names in both, so the EN/HU switch lands on the matching page |
| `assets/` | the landing pages' script, stylesheet and QR code |
| `source/` | not needed on the server: `onsite.txt` (the editor's built-in documentation) and `tools/check-links.py` |

The landing and donation pages use the books' own stylesheets (`en/css`,
`en/theme/custom.css`) and follow the theme chosen in the books.

Each book page exists twice: as its own file and inside `print.html`. The
search index (`searchindex.js`) is not updated by hand, so new text is not
searchable until it is regenerated.

## Checking

```sh
python3 source/tools/check-links.py .   # every internal link and anchor
```

Every example was last checked against the online editor's evaluator
([progalap.elte.hu/specifikacio](https://progalap.elte.hu/specifikacio/)) in
November 2026: paste the specification, paste each test into the Data tab, and
the tab number turns green or red.

To preview the site locally, run `python3 -m http.server` in the repository
root and open <http://localhost:8000>.

## Publishing

Copy `index.html`, `donate.html`, `assets/`, `en/` and `hu/` to the web root,
for example:

```sh
rsync -av --delete --exclude source --exclude .git ./ <name>@caesar.elte.hu:public_html/
```

## Credits

The text, the site and all the tasks and test data are by csabi.zip. The tasks are
invented for this book and are not course assignments. The Specification Editor itself is the work of its authors at ELTE IK. This project
is not affiliated with ELTE.
