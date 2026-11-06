# speci-local: edits to match the online editor

Found on 2026-11-06 by running every example of the book (185 test cases)
and about 60 extra probes through the online editor
(<https://progalap.elte.hu/specifikacio/>, **version 1.5.2**), and by reading
23 saved course specifications from the History pane.

Re-check after the book was fixed: the 18 changed English examples all pass
online. The Hungarian book was checked only up to job 57 of 219; the rest is
in `tools/online-tests/` (see its README).

Line numbers refer to speci-local commit `e1bfb40` (2026-11-05), the version
in the Cargo cache. Your working copy may have moved on, so search for the
quoted names when a line number doesn't match.

Priority: **P1** = the two editors give a different verdict on the same input
(a test is green in one and red in the other). **P2** = the online editor
accepts something speci-local rejects. **P3** = speci-local accepts something
the online editor rejects (should at least warn). **P4** = nice to have.

---

## P1: different verdicts

### 1. Precedence of `->`

Online, `->` binds **tighter than `and` and `or`**, looser than `not` and
comparisons, and groups to the right. Verified:

| Input | Online reads it as |
|-------|--------------------|
| `a and b -> c` | `a and (b -> c)` |
| `a or b -> c` | `a or (b -> c)` |
| `not a -> b` | `(not a) -> b` |
| `a -> b = c` | `a -> (b = c)` |
| `a -> b -> c` | `a -> (b -> c)` |

speci-local makes `->` the weakest operator (`src/parser.rs:1035` `fn expr`).
Real course specs depend on the online behaviour, e.g. a case list
`(x>=0 and y>=0) -> s=1 and (x<0 and y>=0) -> s=2 and …`, which online means
`(…->s=1) and (…->s=2) and …`.

Fix: put implication between `and` and `not`:

```rust
fn expr(&mut self) -> PResult<Expr> { self.or() }          // was: or() [-> expr()]
fn and(&mut self) -> PResult<Expr> {                        // operands are now imp()
    let start = self.peek().start;
    let mut l = self.imp()?;
    while self.eat("and") {
        let r = self.imp()?;
        l = self.mk(start, ExprKind::Bin(BinOp::And, l, r));
    }
    Ok(l)
}
fn imp(&mut self) -> PResult<Expr> {                        // new, right-associative
    let start = self.peek().start;
    let l = self.not()?;
    if self.eat("->") {
        let r = self.imp()?;
        return Ok(self.mk(start, ExprKind::Bin(BinOp::Imp, l, r)));
    }
    Ok(l)
}
```

Also update the error hint in `fn condition` ("`and`, `or`, `->` or the end of
the condition") only if the wording changes, and add test cases for the five
rows above.

### 2. A declared variable missing from a test case

Online: the test is **red**, e.g. `incomplite type for ind: undefined is not natural`
(`… is not float` for `R`). This happens even when the value is irrelevant
(`ind` when `SEARCH` found nothing).

speci-local: `src/data.rs:326` `None => continue` computes the value instead.

Fix (keeps the extra): still compute and show the value, but mark the test
**red** (or at least a warning that turns the tab yellow) with a message such as
"`ind` is missing. The online editor fails this test (`incomplite type for ind`).
Add `ind: <value>`". Inputs are already an error (`data.rs:317`).

### 3. A constant given in the data

A variable declared with an initial value (`days∈N[1..12]=[…]`) must **not**
appear in a test case online: `data cannot contain item with the same name: days`.

speci-local takes the value from the data (`src/data.rs` around line 290, the
branch before `None => match &d.init`).

Fix: if `d.init.is_some()` and the test case has the key, report
"`days` has an initial value in its declaration, so it can't be in the test
data. Remove the line `days: …`" and make the test red.

### 4. An undeclared name used in a condition

Online (no error at parse time):

- if the name is in the test data, its value is used silently
  (`Post: s=n+q` with `q: 2` in the data is green);
- if it isn't, `Identifier: no data found in context: ["n","s"], q`;
- if it's **indexed** (`nev[i]`) the editor crashes with
  `Cannot read properties of undefined (reading 'toString')`.

Suggestion for speci-local: report undeclared names as an error at parse time
(it's always a mistake), and mention in the hint that the online editor may
silently take the value from the data or show the `toString` crash.

---

## P2: accepted online, rejected by speci-local

### 5. One `Fn:` header per function

Online accepts **only** this form:

```text
Fn: sq:N->N, sq(a)=a*a
Fn: even:N->L, even(a)=a mod 2 = 0
```

and rejects the comma form `Fn: sq…, even…` with `Expected … but "," found`
at the comma after the first body.

speci-local rejects repeated blocks (`src/parser.rs:578` "Second `{}` block").
Fix: allow any number of `Fn`/`Fv`/`Def` blocks (they may appear anywhere
between Out and Pre), each with one function. Keep the comma form working, but
give it a warning (see 13).

### 6. `Def:` header

`Def:` is a third spelling of the function header (`Def: f:N->N, f(a)=a*2`
works online and appears in its "Expected …" lists). Add `("Def", Kind::Fn)` to
`HEADERS` (`src/parser.rs:410`), the highlighter list in `src/editor.rs:76`, and
the `all_headers` string in `split_blocks`.

### 7. Operators

| Operator | Meaning (verified) | Where |
|----------|--------------------|-------|
| `<>` | not equal (`a<>b` ≡ `a!=b`) | add to `SYMS` and to the comparison loop in `fn cmp` as `!=` |
| `div` | integer division (`7 div 2 = 3`) | `word_sym` → new `BinOp::IntDiv` in `fn mul` |
| `∤` | does not divide (`3 ∤ 7` true, `3 ∤ 6` false) | `glyph_sym` → negated `|` in `fn cmp` |

### 8. Macro aliases

All accepted by the online parser; ✓ = verified to give the same result as the
English macro.

| Macro | Aliases |
|-------|---------|
| `SUM` | `SZUMMA` ✓, `SZUM` |
| `COUNT` | `DARAB` (already), `MEGSZÁMOL` |
| `EXISTS` | `DECISION` ✓, `VAN`, `ELDÖNT`, `LÉTEZIK` |
| `FORALL` | `EVERY` ✓, `MIND` ✓ |
| `SELECT` | `KIVÁLASZT` |
| `SEARCH` | `KERES` ✓ |
| `COPY` | `MAP` ✓, `MÁSOL` |
| `MIS` | `FILTER` ✓, `KIVÁLOGAT` ✓ (also the 3-argument form) |
| `CONDMAX` | `MAXIF` ✓, `FELTMAX` ✓, `MAXHA` |
| `CONDMIN` | `MINIF`, `FELTMIN`, `MINHA` |

Add them to `MACROS` (`src/parser.rs:146`) as aliases that resolve to the
English name (so `eval.rs` doesn't change), and to the completion list in
`src/editor.rs` (~line 398).

### 9. Hungarian words (already listed in the book as "online only")

- `igaz`, `hamis` → `true`, `false`
- `eleme` → `∈`, `minden` → `∀`, `létezik` → `∃` (in `word_sym`, `src/parser.rs:216`)
- `hossz`, `tól`, `ig` → `length`, `from`, `to` (`BUILTINS`, line 183)
- array literals with an index range: `[0..:1, 2, 3]`, `[1..,1..:[1,2],[3,4]]`

### 10. Piecewise function bodies

From the course material (parses and evaluates online; verified with the
book's "Piecewise definitions" example):

```text
Fv: max: N x N -> N,
max(a, b)={a, ha a>=b; b egyébként}
```

Grammar: `{ value "," "ha" condition { ";" value "," "ha" condition } [ ";" value "egyébként" ] }`.
Evaluate the cases in order; `egyébként` (otherwise) matches when no earlier
condition held.

---

## P3: accepted by speci-local, rejected online (warn)

To keep "works in speci-local ⇒ works online", each of these should produce a
**warning** ("the online editor rejects this") with the online spelling as a
quick fix, or an error behind a "strict online" setting.

### 11. Unicode `→`

Online rejects `→` everywhere (signatures and implication):
`Expected "!=", …, "->", … but "→" found.` The editor's font draws `->` as an
arrow, which is why people think `→` works. speci-local maps it to `->`
(`glyph_sym`, `src/parser.rs:237`; test in `tests/cases.rs:449`).

### 12. The word `element`

Online accepts `eleme` but not `element`: it reads `eleme`, then fails on the
rest with `Expected halmaz or white space but "n" found.`
(`word_sym`, `src/parser.rs:222`; keyword list `src/editor.rs:80`; completion
item `src/editor.rs:405`.) Suggest offering `∈`/`eleme` instead.

### 13. Several functions in one `Fn:` block

Rejected online (see 5). Warn on the comma between two function definitions.

### 14. `ABS(…)`

Online has only lowercase `abs(…)`. `ABS(` is a syntax error
(`Expected … but "A" found`). `BUILTINS` (`src/parser.rs:187`) and
`eval.rs:803` accept both; warn on `ABS` and suggest `abs`. The completion list
(`src/editor.rs:425`) should offer `abs`.

### 15. `≥` in `SELECT`

Online the bound must be written `SELECT(i>=b, …)`; `SELECT(i≥b, …)` gives
`Expected ">=" but "≥" found.` (`≥` works everywhere else.) speci-local accepts
both (`src/parser.rs:1344`; the lexer already turns `≥` into `>=`, so keep the
original token text to detect it). Also change the usage string at
`src/parser.rs:160` from `SELECT(i≥b, …)` to `SELECT(i>=b, …)`.

---

## P4: nice to have

### 16. Remove `CONDMIN` and "automatic evaluation" from the list of extras

Both exist online too (online re-evaluates about a second after typing stops;
the Evaluate button only fills the Visualization pane). Already fixed in the
book's "Differences" chapter; check README/SKILL.md of speci-local.

### 17. Error message parity

When speci-local reports one of these, it could quote the online message too,
so students recognise it:

| Situation | Online message |
|-----------|----------------|
| missing value | `incomplite type for x: undefined is not natural` / `… not float` |
| constant in data | `extractInitialDataFromDeclarations: data cannot contain item with the same name: x` |
| array length | `x length is not correct: 1..3 != 4` |
| interval | `grade interval, value must be in the interval: 6 not in 1..5` |
| all-variables rule | `Line 1, column 21: extra is missing from the post condition!` |
| undeclared name | `Identifier: no data found in context: [...], q` |
| array mismatch | `EqualityExpression: the two array operands are not equal at index 1: 5, 10` |
| conditions | `Precondition is not true` / `Postcondition is not true` |

### 18. Keyboard shortcuts

Online: `Alt+1 … Alt+6` (`Cmd` on Mac) insert `∈ ∀ ∃ ≠ ≤ ≥`, the same as
speci-local. `Ctrl+S` saves.

### 19. Re-check the book with the checker

The book's `speci,online` examples now include the one-header-per-function and
piecewise examples. Once 5, 6 and 10 are in, those can lose the `online` label.
