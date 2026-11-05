# Operators

## Arithmetic

| Operator | Meaning | Example |
|----------|---------|---------|
| `+` `-` `*` | addition, subtraction, multiplication | `a+b*2` |
| `/` | division | `s/n` |
| `mod` or `%` | remainder | `x mod 2 = 1`, `i%2=1` |
| `-` (prefix) | negation | `-x[i]` |
| `ABS(…)` | absolute value | `ABS(x[i])` |

The usual precedence applies (`*` before `+`), and parentheses can be added
freely.

## Comparison

| Symbol | ASCII | Meaning |
|:------:|:-----:|---------|
| `=` | `=` | equal |
| `≠` | `!=` | not equal |
| `<` | `<` | less than |
| `>` | `>` | greater than |
| `≤` | `<=` | less than or equal |
| `≥` | `>=` | greater than or equal |
| `\|` | | divides: `a\|b` means *b mod a = 0* |

Both forms are accepted, so you can type a whole specification on an ordinary
keyboard: `1<=n and n<=100`.

Comparisons can be **chained** as in mathematics: `2≤a≤7` means `2≤a and a≤7`.

```speci
In: a∈Z
Out: inRange∈L
Pre: -
Post: inRange=(2≤a≤7)
```

```yaml
a: 5
inRange: true
```

```yaml
a: 8
inRange: false
```

The divisibility relation `|` is a compact way to talk about divisors:

```speci
In: n∈N
Out: d∈N
Pre: n≥1
Post: d=COUNT(i=1..n, i|n)
```

```yaml
n: 12
d: 6
```

## Logic

| Operator | Hungarian | Meaning |
|----------|-----------|---------|
| `and` | `és` | both are true |
| `or` | `vagy` | at least one is true |
| `not` | `nem` | negation |
| `→` or `->` | | implication |
| `true`, `false` | `igaz`, `hamis` | constants |

> [!NOTE]
> The Hungarian constants `igaz` and `hamis` come from the editor's built-in
> documentation. speci-local doesn't accept them. Use `true`/`false` if you
> want your specification to work in both.

### Implication

`A → B` ("if A then B") is false only when A is true and B is false:

| A | B | A → B |
|:-:|:-:|:-----:|
| true | true | true |
| true | false | **false** |
| false | true | true |
| false | false | true |

When A is false, the implication is true **whatever B is**. That makes
implication the tool for *conditional* requirements: "if a match was found, the
output is its name, and otherwise the output doesn't matter".

```speci
In: n∈N, x∈Z[1..n]
Aux: found∈L, ind∈N
Out: neg∈Z
Pre: -
Post: (found,ind)=SEARCH(i=1..n, x[i]<0) and
      (found → neg=x[ind])
```

```yaml
n: 3
x: [5, -2, -8]
found: true
ind: 2
neg: -2
```

```yaml
n: 2
x: [5, 2]
found: false
neg: 0
```

In the second test nothing was found, so `neg` may be anything. Chapter
[Search](ch06-06-search.md) has more on this.

### Precedence

From strongest to weakest: arithmetic, then comparisons, then `not`, `and`,
`or`, `→`. When in doubt, add parentheses. They cost nothing:

```speci,fragment
Pre: n>0 and (3<4 or ((3)>4))
```

> [!TIP]
> Don't mix the English and Hungarian operators in one statement
> (`a vagy b and c`). It parses, but it's hard to read.

## Logical values as data

A variable of type `L` is an ordinary value: it can be compared and combined
like any other.

```speci
In: a∈L, b∈L
Out: x∈L
Pre: -
Post: x=(a and not b)
```

```yaml
a: true
b: false
x: true
```
