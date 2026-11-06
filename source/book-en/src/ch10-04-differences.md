# Differences from the online editor

This book documents the online editor. speci-local aims to accept exactly what
the online editor accepts and to judge every test the same way, but some
differences remain. They were found by running every example of this book, and
small test specifications, through both editors (November 2026, online editor
version 1.5.2).

## Accepted only by the online editor

| Feature | Online editor | In speci-local |
|---------|---------------|----------------|
| Hungarian logical constants | `igaz`, `hamis` | `true`, `false` |
| Hungarian quantifier words | `minden`, `létezik` | `∀`, `∃`, `forall`, `exists` |
| Membership words | `eleme`, `in` (`∀i in [1..n]`) | `∈` only |
| Hungarian array functions | `hossz(x)`, `tól(x)`, `ig(x)` | `length`, `from`, `to` |
| Further built-in functions | `sqrt(x)`, `round(x)` / `kerekít(x)` | not available |
| Further operators | `<>` (not equal), `∤` (does not divide) | `≠` or `!=`; `not (a\|b)` |
| Array literals with an index range | `[0..:1, 2, 3]`, `[1..,1..:[1,2],[3,4]]` | plain literals |
| Function blocks | one header per function: `Fn: f…` `Fn: g…`; `Def:` is a third name for `Fn:`/`Fv:` | one `Fn:` block, functions separated by commas; a second header is an error |
| Other names of the patterns | `SZUMMA`/`SZUM`, `MEGSZÁMOL`, `ELDÖNT`/`DECISION`/`VAN`/`LÉTEZIK`, `MIND`/`EVERY`, `KERES`, `KIVÁLASZT`, `MÁSOL`/`MAP`, `KIVÁLOGAT`/`FILTER`, `MAXHA`/`MAXIF`/`FELTMAX`, `MINHA`/`MINIF`/`FELTMIN` | `SUM`, `COUNT`/`DARAB`, `EXISTS`, `FORALL`, `SEARCH`, `SELECT`, `COPY`, `MIS`, `CONDMAX`, `CONDMIN` |

The rule for function blocks means there is **no way to write two or more
functions that both editors accept**. Examples that use the online-only forms
are marked **ONLINE EDITOR** in this book.

## Accepted only by speci-local

These are errors in the online editor. Don't use them in specifications you
hand in.

| speci-local accepts | Online editor says | Write instead |
|---------------------|--------------------|---------------|
| Unicode arrow `a → b` | syntax error | `a -> b` |
| `SELECT(i≥1, …)` | Expected ">=" but "≥" found | `SELECT(i>=1, …)` |
| `ABS(x)` | syntax error (only lowercase is a function) | `abs(x)` |
| the word `element` (`a element N`) | syntax error | `∈`, `in` or `eleme` |
| several functions in one `Fn:` block, separated by commas | syntax error | one `Fn:` header per function |
| an output variable in the precondition (`Pre: m>0` with `m` in `Out:`) | Output data m is in the precondition! | conditions on outputs belong in the postcondition |

## Tests judged differently

| Test data | Online editor | speci-local |
|-----------|---------------|-------------|
| repeats a constant array declared with a value (`days∈N[1..12]=[…]` and `days: […]` in the test) | red: "data cannot contain item with the same name" | green |
| leaves out an auxiliary or output value, even an irrelevant one such as `ind` when `SEARCH` found nothing | red: "incomplite type for ind: undefined is not natural" | green; the missing value is computed and shown |
| indexes a matrix with an initial value and a range not starting at 1, such as `m5∈Z[-1..1,-1..1]=[[2,1,2],[1,0,1],[2,1,1]]` with `m5[-1,-1]` | green | red: speci-local indexes it from 1 and reports `m5[-1,-1]` out of range |

## Extras in speci-local

- Much more detailed error messages, with a suggested fix.
- Output values missing from a test are computed and shown.
- Automatic evaluation as you type.
- Completion and snippets.
- Recognises a few common misspellings of headers (for example `Segéd:` or
  `Input:`) and suggests the right one.
- Local `.sp` files, and one-line project sharing (`SPECI1:`).

## Not included

- The history pane.
- Server-side saving and permalinks. Use `.sp` files and `SPECI1:` lines instead.

## Checking the book against the online editor

`source/tools/check-online.mjs` downloads the online editor's evaluator and runs
every example of both books through it, the way `check-examples` does with
speci-local:

```sh
node source/tools/check-online.mjs
```
