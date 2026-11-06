# Blocks and layout

## Header spelling

The headers are **case-sensitive** and must be spelled exactly:

| English | Hungarian | Hungarian meaning |
|---------|-----------|-------------------|
| `In:` | `Be:` | *Bemenet*: input |
| `Aux:` | `Sa:` | *Segédadat*: auxiliary data |
| `Out:` | `Ki:` | *Kimenet*: output |
| `Fn:` | `Fv:` | *Függvény*: function |
| `Pre:` | `Ef:` | *Előfeltétel*: precondition |
| `Post:` | `Uf:` | *Utófeltétel*: postcondition |

Spellings such as `in:`, `IN:`, `Pre :` (space before the colon) or `Input:`
are not headers, and the editor reports a syntax error at them.

> [!WARNING]
> The Hungarian auxiliary header is **`Sa:`**, not `Segéd:`. The obvious
> translation is wrong, and the editor answers it with
> `Expected ",", "Aux:", "Ki:", "Out:", "Sa:", new line, or white space but "S" found.`

> [!TIP]
> If you are unsure what is allowed at some point, look at the error message:
> it lists everything the editor *expected* there. The message above, for
> example, shows that after a declaration list only a comma or another
> declaration block may follow.

## Block order

The declaration blocks come first, and the logical statements come last:

```text
In/Be  →  Aux/Sa  →  Out/Ki  →  Fn/Fv  →  Pre/Ef  →  Post/Uf
```

Note that the output block comes *before* the conditions. It declares the result,
so it isn't the last block. Blocks you don't need (`Aux:`, `Fn:`) are simply
left out.

You may mix English and Hungarian headers in one specification, but
don't. Pick one language per file.

## Layout A: everything on one line

The payload can follow the header on the same line, after a space:

```speci
In: n∈N, nums∈Z[1..n]
Out: s∈Z
Pre: -
Post: s=SUM(i=1..n, nums[i])
```

```yaml
n: 3
nums: [4, -1, 10]
s: 13
```

The official manual describes each header as including the trailing space,
"`In: ` (there is a space at the end of the string)". In this layout the
space is required.

## Layout B: the header on its own line

The header can also stand alone, with the payload on the following lines. This
is common in Hungarian course solutions, with one declaration per line:

```speci
Be:
n∈N,
k∈N,
ar∈N[1..n]

Ki:
db∈N

Ef:
n>=1 és k>=1

Uf:
db=DARAB(i=1..n, ar[i]<k)
```

```yaml
n: 4
k: 100
ar: [250, 90, 120, 40]
db: 2
```

The rules for this layout:

1. Each declaration except the last in its block ends with a comma, just as it
   would on a single line.
2. Blank lines between blocks, and even between declarations within a block,
   are allowed.
3. The header spelling is still case-sensitive.

## Long conditions

A precondition or postcondition can continue across several lines. End the
line with an operator such as `and` so it's clear the statement continues:

```speci
In: n∈N, x∈Z[1..n]
Out: pos∈N, neg∈N
Pre: -
Post: pos=COUNT(i=1..n, x[i]>0) and
      neg=COUNT(i=1..n, x[i]<0)
```

```yaml
n: 5
x: [3, -2, 0, 7, -9]
pos: 2
neg: 2
```

The indentation of the continuation lines is only for readability.

## Several functions

Each function gets its own `Fn:` header (`Fv:` and `Def:` work too). Each
definition is a signature followed by the body:

```speci,online
In: n∈N, x∈N[1..n]
Out: s∈N
Fn: sq:N->N, sq(a)=a*a
Fn: even:N->L, even(a)=a mod 2 = 0
Pre: -
Post: s=SUM(i=1..n, sq(x[i]), even(x[i]))
```

```yaml
n: 4
x: [1, 2, 3, 4]
s: 20
```

Listing several functions in one `Fn:` block, separated by commas, is a
syntax error in the online editor. (speci-local works the other way round: it
wants the comma form, see [Differences](ch10-04-differences.md).)

Chapter [Functions](ch05-00-functions.md) explains functions in detail.
