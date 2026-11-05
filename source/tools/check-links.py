#!/usr/bin/env python3
"""Checks every internal link and image in the built site.

Reports links to missing files and to missing #anchors. External links
(http/https/mailto/monero) are not fetched.

Usage: python3 source/tools/check-links.py [site-root]
"""
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.ids, self.links = set(), []

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if "id" in a:
            self.ids.add(a["id"])
        if tag == "a" and "name" in a:
            self.ids.add(a["name"])
        for key in ("href", "src"):
            if a.get(key) and not (tag == "link" and a.get("rel") in ("canonical",)):
                self.links.append((key, a[key]))


def parse(path, cache={}):
    if path not in cache:
        p = Page()
        p.feed(path.read_text(encoding="utf-8", errors="replace"))
        cache[path] = p
    return cache[path]


def main():
    root = Path(sys.argv[1] if len(sys.argv) > 1 else ".").resolve()
    bad = 0
    # the site: the pages at the root plus the two books (not source/)
    pages = sorted(root.glob("*.html")) + sorted(root.glob("en/**/*.html")) + sorted(root.glob("hu/**/*.html"))
    for page in pages:
        # print.html and toc.html repeat every page's links; checking them adds nothing
        if page.name in ("print.html", "toc.html", "404.html"):
            continue
        for _, link in parse(page).links:
            u = urlsplit(link)
            if u.scheme or link.startswith(("//", "javascript:")) or not (u.path or u.fragment):
                continue
            target = page if not u.path else (page.parent / unquote(u.path)).resolve()
            if target.is_dir():
                target = target / "index.html"
            if not target.exists():
                print(f"{page.relative_to(root)}: missing file {link}")
                bad += 1
                continue
            if u.fragment and target.suffix == ".html":
                frag = unquote(u.fragment)
                if frag not in parse(target).ids:
                    print(f"{page.relative_to(root)}: missing anchor {link}")
                    bad += 1
    print(f"{len(pages)} pages checked, {bad} broken links")
    sys.exit(1 if bad else 0)


if __name__ == "__main__":
    main()
