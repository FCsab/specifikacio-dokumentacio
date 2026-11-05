# Elementary sets and intervals

## Elementary sets

| Set | Name | Values | Example | Test data |
|:---:|------|--------|---------|-----------|
| `N` | natural numbers | 0, 1, 2, … | `a∈N` | `a: 7` |
| `Z` | integers | …, −1, 0, 1, … | `b∈Z` | `b: -3` |
| `R` | real numbers | e.g. 3.14 | `c∈R` | `c: 2.5` |
| `L` | logical values | `true`, `false` | `d∈L` | `d: true` |
| `S` | strings (texts) | e.g. "apple" | `e∈S` | `e: apple` or `e: "apple"` |
| `C` | characters | e.g. 'x' | `f∈C` | `f: 'x'` |

`K` (*karakter*) is accepted as the Hungarian name of `C`: `f2∈K`.

> [!NOTE]
> `N` includes 0. If a quantity must be positive, say so in the precondition:
> `Pre: n>0`. If a value can be negative, such as a "−1 if not found" result,
> declare it in `Z`, not `N`.

An example using several of them:

```speci
In: name∈S, age∈N, height∈R
Out: adult∈L
Pre: height>0
Post: adult=(age≥18) and name=name and height=height
```

```yaml
name: Anna
age: 19
height: 1.68
adult: true
```

```yaml
name: "Bence"
age: 12
height: 1.45
adult: false
```

## Intervals

An interval is the set of integers between two bounds, both included:

```speci,fragment
iv∈[1..3]
```

`iv` can be 1, 2 or 3. The bounds can be expressions involving other
input variables: `[2+3..n*2]`.

Intervals are useful for small, fixed ranges such as grades and
months:

```speci
In: grade∈[1..5]
Out: pass∈L
Pre: -
Post: pass=(grade≥2)
```

```yaml
grade: 4
pass: true
```

A value outside the interval makes the test case fail, because the data
doesn't fit its declared type:

```yaml,red
grade: 6
pass: true
```

Intervals also show up in quantifiers, `∀i∈[1..n]:(…)`, which is covered in
[Quantifiers](ch04-02-quantifiers.md), and as the index range of arrays,
covered next.
