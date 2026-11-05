# Appendix A: Grammar reference

This appendix summarises the whole specification language on one page.
Follow the links for explanations and examples.

## Structure

```text
specification  =  In-block [Aux-block] Out-block [Fn-block] Pre-block Post-block

In-block       =  ("In:"  | "Be:") declarations
Aux-block      =  ("Aux:" | "Sa:") declarations
Out-block      =  ("Out:" | "Ki:") declarations
Fn-block       =  ("Fn:"  | "Fv:") function { "," function }
Pre-block      =  ("Pre:" | "Ef:") condition | "-"
Post-block     =  ("Post:"| "Uf:") condition

declarations   =  item { "," item }
item           =  name "∈" set  [ "=" literal ]   |   SetName "=" set
function       =  name ":" set "->" set "," name "(" params ")" "=" expression
```

`∈` can be written `element`. Comments, `// …` and `/* … */`, may appear anywhere.
[More →](ch02-01-blocks.md)

## Sets

| Form | Meaning | More |
|------|---------|------|
| `N` `Z` `R` `L` `S` `C`/`K` | natural, integer, real, logical, string, character | [→](ch03-01-sets.md) |
| `[a..b]` | interval of integers | [→](ch03-01-sets.md#intervals) |
| `T[a..b]`, `T[a..]`, `T[]` | array (sequence) | [→](ch03-02-arrays.md) |
| `T[a..b,c..d]`, `T[,]` | matrix | [→](ch03-03-matrices.md) |
| `T[][]`, `Row[]` with `Row=T[]` | array of arrays | [→](ch03-03-matrices.md#arrays-of-arrays) |
| `(f1:T1 x f2:T2 x …)` | record (direct product) | [→](ch03-04-records.md) |
| `T1 x T2` | product (function domains/ranges) | [→](ch05-00-functions.md) |
| `Name` | a named set (`Name=…`) | [→](ch03-05-aliases.md) |

## Expressions

| Category | Syntax |
|----------|--------|
| constants | `5`, `-3`, `2.5`, `"text"`, `true`, `false` |
| access | `x[i]`, `m[i,j]`, `a[i][j]`, `r.field`, `t.1`, `MAX(…).maxval` |
| arithmetic | `+ - * /`, `mod` or `%`, `ABS(e)` |
| comparison | `=`, `≠`/`!=`, `<`, `>`, `≤`/`<=`, `≥`/`>=`, chained `a≤b≤c` |
| divisibility | `a\|b` (a divides b) |
| logic | `and`/`és`, `or`/`vagy`, `not`/`nem`, `→`/`->` |
| membership | `e∈[a..b]` |
| quantifiers | `∀i∈[a..b]:(…)`, `∃i∈[a..b]:(…)`; words `forall`, `exists` |
| built-ins | `length(x)`, `from(x)`, `to(x)` |
| tuples | `(a, b)`, tuple targets `(a,b)=…`, `(a,)=…`, `(,b)=…`, `(a,,c)=…` |

Precedence, from weakest to strongest: `→`, `or`, `and`, `not`, comparisons,
`+ -`, `* / mod`, unary minus, access. [More →](ch04-01-operators.md)

## Theorem macros

| Macro | Result |
|-------|--------|
| `SUM(i=b..e, f(i))`, `SUM(i=b..e, f(i), β(i))` | sum |
| `COUNT(i=b..e, β(i))`, `DARAB(…)` | count |
| `MAX(i=b..e, f(i))`, `MIN(…)` | (index, value) |
| `EXISTS(i=b..e, β(i))`, `FORALL(…)` | logical |
| `SELECT(i≥b, β(i))` | index |
| `SEARCH(i=b..e, β(i))` | (logical, index) |
| `COPY(i=b..e, f(i))` | array |
| `MIS(i=b..e, β(i))`, `MIS(i=b..e, β(i), f(i))` | (count, array) |
| `CONDMAX(i=b..e, f(i), β(i))`, `CONDMIN(…)` | (logical, index, value) |

[More →](ch06-00-theorems.md)

## Rules the editor enforces

1. Headers are case-sensitive and spelled exactly as above.
2. Declarations come before conditions: `In`, `Aux`, `Out`, `Fn`, then `Pre`, `Post`.
3. Variables start lowercase, and sets start uppercase.
4. Reserved words (`and`, `or`, `not`, `mod`, `element`, `exists`, `forall`,
   `true`, `false`, and the Hungarian `és`, `vagy`, `nem`) are not names.
5. Every input variable appears in the postcondition.
6. Test data matches the declared types: lengths, ranges, fields.
