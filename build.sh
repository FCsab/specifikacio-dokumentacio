#!/usr/bin/env bash
# Builds the two books into en/ and hu/ next to index.html.
# The repository root is the website: upload index.html, donate.html,
# assets/, en/ and hu/ (or just the whole folder) to the web root.
set -euo pipefail
cd "$(dirname "$0")"

if [[ "${1:-}" != "--no-check" ]]; then
    echo "==> checking examples with speci-local"
    cargo run --quiet --release --manifest-path source/tools/check-examples/Cargo.toml -- \
        source/book-en/src source/book-hu/src
fi

echo "==> building the books"
mdbook build source/book-en
mdbook build source/book-hu

echo "==> checking links"
python3 source/tools/check-links.py .
