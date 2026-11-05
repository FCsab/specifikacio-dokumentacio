# Differences from the online editor

speci-local aims to accept exactly what the ELTE editor accepts and to judge
every test the same way. A few differences remain. They were found while
checking the examples of this book.

## Accepted only by the online editor

| Feature | Example | In speci-local |
|---------|---------|----------------|
| Hungarian logical constants | `igaz`, `hamis` | use `true`, `false` |
| Hungarian quantifier and membership words | `minden i eleme [1..n]:(…)`, `létezik` | use `∀`, `∃`, `∈` or `forall`, `exists`, `element` |
| Hungarian array functions | `hossz(x)`, `tól(x)`, `ig(x)` | use `length`, `from`, `to` |
| Array literals with an index range | `[0..:1, 2, 3]`, `[1..,1..:[1,2],[3,4]]` | write plain literals |
| A separate `Fn:` header for each function | `Fn: f…` `Fn: g…` | one `Fn:` block, functions separated by commas |

Examples using these features are marked **ONLINE EDITOR** in this book.

## Known issues

- A **matrix with an initial value and a non-1-based range**, such as
  `m5∈Z[-1..1,-1..1]=[[2,1,2],[1,0,1],[2,1,1]]`, is indexed from 1 in
  speci-local. `m5[-1,-1]` is reported out of range.

## Extras in speci-local

- Much more detailed error messages, with a suggested fix.
- Output values missing from a test are computed and shown.
- Automatic evaluation as you type.
- Completion and snippets.
- Recognises a few common misspellings of headers (for example `Segéd:` or
  `Input:`) and suggests the right one.
- `CONDMIN`, the minimum counterpart of `CONDMAX`.
- Local `.sp` files, and one-line project sharing (`SPECI1:`).

## Not included

- The history pane.
- Server-side saving and permalinks. Use `.sp` files and `SPECI1:` lines instead.
