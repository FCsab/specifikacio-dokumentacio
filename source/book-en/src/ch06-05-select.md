# Selection: SELECT

**Selection** (*kiválasztás*) finds the first index, starting from a given
point, at which a condition holds, **when such an index is known to exist**.

<div class="syntax-card">

**Form:** `ind=SELECT(i>=b, β(i))`<br>
**Result:** the smallest `i ≥ b` for which `β(i)` holds<br>
**Requirement:** the precondition must guarantee that such an `i` exists

</div>

> [!WARNING]
> Inside `SELECT` the start must be written `>=`. `SELECT(i≥1, …)` is a syntax
> error ("Expected ">=" but "≥" found"), even though `≥` works everywhere else.

Unlike the other theorems, `SELECT` has **no upper bound**. It only says where
to start. That is exactly why existence must be guaranteed: without it, the
search could run forever.

## Example: the first odd number

This is the official course example
([open in the editor](https://progalap.elte.hu/specifikacio/v1/?uuid=ecacc1f7-a451-4d14-8444-8527ff11a613)):

```speci
In: n∈N, nums∈Z[1..n]
Out: ind∈N
Pre: ∃i∈[1..n]:(nums[i] mod 2 = 1)
Post: ind=SELECT(i>=1, nums[i] mod 2 = 1) and n=n
```

```yaml
n: 5
nums: [23, 25, 26, 28, 29]
ind: 1
```

```yaml
n: 4
nums: [2, 4, 7, 9]
ind: 3
```

Two things to notice:

1. **The precondition** `∃i∈[1..n]:(nums[i] mod 2 = 1)` guarantees that there
   is an odd number. Without it, `SELECT` would be wrong.
2. **`and n=n`**: `n` doesn't appear in `SELECT` (there is no upper bound),
   so the identity `n=n` is needed to satisfy the
   [all-variables rule](ch02-03-all-variables.md).

Input with no odd number violates the precondition, so the test is red:

```yaml,red
n: 2
nums: [2, 4]
ind: 1
```

## Selection without an array

`SELECT` is natural for "the first number with a property" questions where
the answer is guaranteed mathematically. *The smallest divisor of n greater
than 1* (for n ≥ 2, n itself is always a divisor):

```speci
In: n∈N
Out: d∈N
Pre: n≥2
Post: d=SELECT(i>=2, i|n)
```

```yaml
n: 35
d: 5
```

```yaml
n: 13
d: 13
```

## SELECT or SEARCH?

| | `SELECT` | `SEARCH` |
|-|----------|----------|
| Is a match guaranteed? | **yes**, by the precondition | no |
| Range | only a start: `i>=b` | `i=b..e` |
| Result | the index | (found?, index) |

If you can't prove in the precondition that a match exists, use
[`SEARCH`](ch06-06-search.md).
