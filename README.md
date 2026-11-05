# The Specification Editor Book · A Specifikációszerkesztő könyve

A complete, unofficial guide to the ELTE Specification Editor
([progalap.elte.hu/specifikacio](https://progalap.elte.hu/specifikacio/)),
used in the course PROGRAMMING (`IP-18fPROGEG`), and to
[speci-local](https://github.com/FCsab/speci-local), its offline
reimplementation. The full book is written in both English and Hungarian.

Documentation by [csabi.zip](https://csabi.zip). If it helped you, you can
[support it with XMR](landing/donate.html).

## What's in the repository

| Path | Contents |
|------|----------|
| `book-en/`, `book-hu/` | the two books ([mdBook](https://rust-lang.github.io/mdBook/) sources; same file names in both) |
| `theme/` | shared look: CSS, spec-language highlighting, language switch, footer, favicon |
| `landing/` | the landing page (`index.html`) and the donation page |
| `tools/check-examples/` | runs every example of both books through speci-local |
| `tools/check-links.py` | checks every internal link and anchor in the built site |
| `public/` | **the built site**, ready to upload |
| `SKILL.md`, `onsite.txt` | source material: the collected reference, and the editor's built-in documentation |

## Building

Requirements: [Rust](https://rustup.rs) and mdBook (`cargo install mdbook`).

```sh
./build.sh                # check all examples, build both books, assemble public/
./build.sh --no-check     # skip the example check
python3 tools/check-links.py public
```

To preview it locally, run `python3 -m http.server -d public` and open
<http://localhost:8000>.

## Publishing on web.elte.hu

`public/` is a plain static site with relative links and no external
dependencies. Upload **the contents** of `public/` to the web root, for
example `public_html/` for `<name>.web.elte.hu`:

```sh
rsync -av --delete public/ <name>@caesar.elte.hu:public_html/
```

`index.html` is the landing page. The books live in `en/` and `hu/`, and the
donation page is `donate.html`.

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

## License and credits

The text and the site are by csabi.zip. The UI screenshots come from the
official course manual (*Manual for the Specification Editor tool*). The
Specification Editor itself is the work of its authors at ELTE IK. This project
is not affiliated with ELTE.
