# The Specification Editor Book · A Specifikációszerkesztő könyve

A complete, unofficial guide to the ELTE Specification Editor
([progalap.elte.hu/specifikacio](https://progalap.elte.hu/specifikacio/)),
used in the course PROGRAMMING (`IP-18fPROGEG`), and to
[speci-local](https://github.com/FCsab/speci-local), its offline
reimplementation. The full book is written in both English and Hungarian.

Documentation by [csabi.zip](https://csabi.zip). If it helped you, you can
[support it with XMR](donate.html).

## Structure

The repository root is the website:

| Path | Contents |
|------|----------|
| `index.html` | landing page (the entry point) |
| `donate.html` | XMR donation page |
| `en/`, `hu/` | the two books (generated) |
| `assets/` | the landing pages' script, stylesheet and QR code |
| `source/` | everything the books are built from (not needed on the server) |

Inside `source/`:

| Path | Contents |
|------|----------|
| `book-en/`, `book-hu/` | [mdBook](https://rust-lang.github.io/mdBook/) sources; same file names in both |
| `theme/` | shared look: CSS, spec-language highlighting, language switch, footer |
| `tools/check-examples/` | runs every example of both books through speci-local |
| `tools/check-links.py` | checks every internal link and anchor of the site |
| `SKILL.md`, `onsite.txt` | source material: the collected reference, and the editor's built-in documentation |

The landing and donation pages use the books' own stylesheets (`en/css`,
`en/theme/custom.css`) and follow the theme chosen in the books.

## Building

Requirements: [Rust](https://rustup.rs) and mdBook (`cargo install mdbook`).

```sh
./build.sh              # check all examples, build en/ and hu/, check links
./build.sh --no-check   # skip the example check
```

To preview it locally, run `python3 -m http.server` in the repository root and
open <http://localhost:8000>.

## Publishing

The site is plain static files with relative links and no external
dependencies. Copy `index.html`, `donate.html`, `assets/`, `en/` and `hu/` to the
web root, for example:

```sh
rsync -av --delete --exclude source --exclude .git ./ <name>@caesar.elte.hu:public_html/
```

## Writing examples

Every code block tagged `speci` is a complete specification. The `yaml` blocks
after it are its test cases, and `build.sh` runs them all through speci-local.
Flags after a comma change what is checked:

| Fence | Meaning |
|-------|---------|
| ```` ```speci ```` | complete specification; must parse |
| ```` ```speci,fragment ```` | partial snippet, not checked |
| ```` ```speci,online ```` | uses syntax only the online editor knows, not checked (shown with an "online editor" label) |
| ```` ```speci,error ```` | must be **rejected** |
| ```` ```yaml ```` | test case; must be green |
| ```` ```yaml,red ```` | test case that must be **red** (shown with a "✗ red" label) |
| ```` ```yaml,fragment ```` | data snippet, not checked |

Keep `book-en` and `book-hu` in sync: same file names, same examples
(translated), so the EN/HU switch lands on the matching page.

## Credits

The text and the site are by csabi.zip. The UI screenshots come from the
official course manual (*Manual for the Specification Editor tool*). The
Specification Editor itself is the work of its authors at ELTE IK. This project
is not affiliated with ELTE.
