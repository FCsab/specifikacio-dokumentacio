#!/usr/bin/env bash
# Builds the whole site into public/:
#   public/index.html, donate.html   landing and donation pages
#   public/en/, public/hu/           the two books
# Upload the contents of public/ to the web root (e.g. <name>.web.elte.hu).
set -euo pipefail
cd "$(dirname "$0")"

if [[ "${1:-}" != "--no-check" ]]; then
    echo "==> checking examples with speci-local"
    cargo run --quiet --release --manifest-path tools/check-examples/Cargo.toml -- book-en/src book-hu/src
fi

echo "==> building the books"
mdbook build book-en
mdbook build book-hu

echo "==> copying the landing pages"
cp landing/index.html landing/donate.html landing/landing.css landing/landing.js landing/xmr-qr.svg public/
cp theme/favicon.svg public/favicon.svg

echo "==> done: $(find public -type f | wc -l) files in public/"
