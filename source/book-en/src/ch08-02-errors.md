# Error messages and common mistakes

## Messages from the online editor

The online editor reports errors as `Line L, column C: message`. The most
frequent ones:

### `Expected …, but "X" found.`

A **syntax error**. The editor lists what it *would* have accepted at that
position. Read the list, because it tells you what's missing.

```text
Line 8, column 1: Expected ",", "Aux:", "Ki:", "Out:", "Sa:", new line, or white space but "S" found.
```

Here a line started with `Segéd:`, which isn't a header. After the declarations
only a comma or another declaration block can come. The fix is `Sa:`.

Typical causes:

- a misspelled header (`Segéd:`, `in:`, `Pre :`),
- a missing comma between declarations,
- a missing `and` between two conditions,
- unbalanced parentheses,
- `:=` instead of `=`.

### `X is missing from the post condition!`

The [all-variables rule](ch02-03-all-variables.md): input `X` doesn't appear in
the postcondition. Use it, or add `and X=X`.

### `incomplite type for exists: undefined is not boolean`

A variable is named `exists` (a reserved word). Rename it, for example to `found`
or `van`, everywhere: in the declaration, the postcondition and the test cases.

## Common mistakes

| # | Mistake | Symptom | Fix |
|--:|---------|---------|-----|
| 1 | no space after a header on the same line (`In:n∈N`) | syntax error on line 1 | `In: n∈N`, or put the header on its own line |
| 2 | an input not used in `Post:` | "… is missing from the post condition!" | use it, or `and n=n` |
| 3 | `:=` instead of `=` | syntax error in `Fn:` or a set definition | `f(x)=x*2`, `Student=(…)` |
| 4 | matrix vs. array of arrays | indexing errors | `Z[1..n,1..m]` → `m[i,j]`; `Z[1..n][1..m]` → `m[i][j]` |
| 5 | index range off by one (`0..` vs `1..`) | out-of-range index | check `from`/`to`, or loop over `from(x)..to(x)` |
| 6 | comparing neighbours up to `n` | `x[i+1]` out of range | loop to `n-1` |
| 7 | `SELECT` without an existence guarantee | wrong results or errors | add `∃…` to `Pre:`, or use `SEARCH` |
| 8 | wrong tuple shape | type mismatch | `(ind,)=MAX(…)`, `(found,,val)=CONDMAX(…)` |
| 9 | Unicode `→` (signature or implication) | syntax error | use `->` |
| 10 | backward search without negating everything | wrong index | `(found,-ind)=SEARCH(i=-n..-1, β(-i))` |
| 11 | YAML indentation or tabs | data can't be read | 2 spaces, or the compact `{…}` form |
| 12 | field names with different case | field "missing" | match the declaration exactly |
| 13 | rewriting a working Hungarian spec in English (or vice versa) | nothing breaks, but it's pointless | both keyword sets are valid; keep the file's style |
| 14 | a precondition too loose | nothing turns red! | check each bound against the statement |
| 15 | a missing filter condition in `SUM`/`COUNT` | wrong numbers on some inputs | put *every* restriction into the condition |
| 16 | a variable named `exists` / an invented keyword | "incomplite type…" / "Expected …" | rename / use `Sa:` |
| 17 | a −1 result declared as `N` | the "not found" test fails | declare it `Z` and produce the −1 in `Post:` |
| 18 | an implication without parentheses | wrong data still passes | `… and (found -> …)` |

## speci-local's messages

[speci-local](ch10-00-speci-local.md) checks the same rules, but its messages
are longer. Each one shows the line, a caret under the problem, an explanation
and a concrete fix:

```text
Specification, line 2, column 6: `exists` is a reserved word and can't be used as a name
 2 | Aux: exists∈L
   |      ^
`exists` is the ASCII spelling of ∃, so it is read as an operator, not as a variable name.
Fix: Rename it everywhere (declaration, postcondition and test data), e.g. to `van` or `talalt`.
```

```text
Specification, line 4, column 30: `x[i+1]`: index 4 is out of range
 4 | Post: c=COUNT(i=1..n, x[i]<x[i+1])
   |                              ^
`x` has 3 element(s), its indexes are 1..3.
Fix: Check the loop bounds; when you look at `x[i+1]`, the loop must stop at n-1.
```

A red test tells you *which* part is false, and what the specification computes:

```text
Specification, line 4, column 7: The postcondition (Post) is false: `cnt=COUNT(i=1..n, nums[i] mod 2 = 1)` does not hold
 4 | Post: cnt=COUNT(i=1..n, nums[i] mod 2 = 1)
   |       ^
Values used: cnt = 2, n = 5, nums = [3, 72, 81, 4, 5].
`cnt`: the test case says 2, the specification gives 3
Fix: Either the expected output in the test case is wrong, or the postcondition does not describe the task.
```

When an online error message is hard to understand, paste the specification into
speci-local. Its explanation usually makes the problem clear.
