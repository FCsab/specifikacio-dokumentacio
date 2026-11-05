# Names, comments and reserved words

## Variable names

A variable name

- **starts with a lowercase letter**,
- continues with letters and digits,
- contains no spaces or punctuation (`-`, `.`, …).

| Valid | Invalid | Why it's invalid |
|-------|---------|------------------|
| `nums`, `x1`, `visitedCount` | `Nums` | starts with an uppercase letter (that's a set name) |
| `szam`, `ar`, `tav` | `visited count` | contains a space |
| `r1`, `maxval` | `1x` | starts with a digit |
| `osztok`, `db` | `max-val` | contains `-` (read as subtraction) |

Hungarian accented letters (`á`, `é`, `ő`, …) are accepted in names, as the
built-in documentation does with `név` and `jegy`. Many people avoid them
anyway, because they are awkward to type on some keyboards.

## Set (type) names

The names of sets, both the built-in ones (`N`, `Z`, `R`, `L`, `S`, `C`) and
your own ([Naming your own sets](ch03-05-aliases.md)), start with an
**uppercase letter**: `Student`, `Grade`, `Walk`.

## Reserved words

Some lowercase words are part of the language, so you can't use them as
variable names:

| Word | Meaning |
|------|---------|
| `and`, `or`, `not` | logical operators |
| `és`, `vagy`, `nem` | the same in Hungarian |
| `mod` | remainder |
| `element` | the word form of `∈` |
| `exists`, `forall` | the word forms of `∃` and `∀` |
| `true`, `false` | logical constants |

> [!WARNING]
> **Don't name a variable `exists`**, even though old screenshots and
> manuals do: `Aux: exists∈L`. The current editor rejects it with the cryptic
> message `incomplite type for exists: undefined is not boolean`. Use `van`,
> `talalt` or `found` instead, and rename it everywhere: in the declaration, in
> the postcondition and in every test case.

The theorem macros are written in uppercase (`SUM`, `MAX`, `COUNT`, …), so the
lowercase words `sum`, `max`, `min` and `count` *are* legal variable names:

```speci
In: n∈N, x∈N[1..n]
Out: sum∈N, max∈N
Pre: n>0
Post: sum=SUM(i=1..n, x[i]) and (,max)=MAX(i=1..n, x[i])
```

```yaml
n: 3
x: [4, 9, 2]
sum: 15
max: 9
```

## Comments

Two kinds of comments are accepted, both borrowed from C:

- `// …` is a **line comment** that runs to the end of the line. It can follow
  real content on the same line.
- `/* … */` is a **block comment** that can span several lines.

```speci
/* Count the divisors of a number.
   i|n means: i divides n. */
In: n∈N
Out: d∈N
Pre: n>=1          // 0 would have infinitely many divisors
Post: d=COUNT(i=1..n, i|n)
```

```yaml
n: 12
d: 6
```

A common habit in course solutions is to write the general form of the
theorem in a comment and match it with the concrete names:

```speci,fragment
Post: (cnt,location)=MIS(i=1..n, runs[i].time>30, runs[i].loc)
/* (cnt,y)=MIS(i=b..e, A(i), f(i))
   cnt, y ~ cnt, location
   b..e   ~ 1..n
   A(i)   ~ runs[i].time>30
   f(i)   ~ runs[i].loc
*/
```

The built-in documentation also uses `/** … */` for headings. It's an ordinary
block comment.

## Whitespace

Spaces around operators are optional: `sum = SUM(…)` and `sum=SUM(…)` mean the
same. One exception is the `x` of the direct product (records, function
signatures), which needs a space on both sides: `Z x Z`.
