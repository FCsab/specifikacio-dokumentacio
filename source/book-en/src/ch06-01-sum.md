# Summation: SUM

**Summation** (*összegzés*) adds up a value over a range of indices.

<div class="syntax-card">

**Form:** `s=SUM(i=b..e, f(i))`<br>
**Filtered form:** `s=SUM(i=b..e, f(i), β(i))`<br>
**Result:** a number, `f(b) + f(b+1) + … + f(e)` (only the terms where `β(i)` holds, if a filter is given)<br>
**Empty range:** 0

</div>

## Example: the total of an array

> *We know how much money we spent on each of n days. How much did we spend in
> total?*

```speci
In: n∈N, spent∈N[1..n]
Out: total∈N
Pre: -
Post: total=SUM(i=1..n, spent[i])
```

```yaml
n: 5
spent: [1200, 0, 3500, 800, 450]
total: 5950
```

```yaml
n: 0
spent: []
total: 0
```

## The summed value can be any expression

`f(i)` doesn't have to be an array element. It can be any expression of `i`:

```speci
In: n∈N
Out: s∈N
Pre: -
Post: s=SUM(i=1..n, i*i)
```

```yaml
n: 4
s: 30
```

## The filtered form

With a **third argument**, a condition, only the terms for which the
condition holds are added. *Sum of the even elements:*

```speci
In: n∈N, x∈N[1..n]
Out: s∈N
Pre: -
Post: s=SUM(i=1..n, x[i], x[i] mod 2 = 0)
```

```yaml
n: 5
x: [1, 2, 3, 4, 10]
s: 16
```

*Sum of the divisors of n* combines the filter with the divisibility relation `|`:

```speci
In: n∈N
Out: s∈N
Pre: n≥1
Post: s=SUM(i=1..n, i, i|n)
```

```yaml
n: 12
s: 28
```

> [!WARNING]
> **Put every restriction into the filter.** "Sum of the *odd divisors* of n"
> has two conditions. `SUM(i=1..n, i, i mod 2 = 1)` adds *every* odd number up to
> n (25 for n = 10) instead of the odd divisors (1 + 5 = 6). The correct
> filter is `i mod 2 = 1 and i|n`.

```speci
In: n∈N
Out: s∈N
Pre: n≥1
Post: s=SUM(i=1..n, i, i mod 2 = 1 and i|n)
```

```yaml
n: 10
s: 6
```

## A window of the array

The range doesn't have to cover the whole array. *Sum of the d values before
index i* is `SUM(j=i-d..i-1, x[j])`. This is the inner part of
[Trurl's robots](ch09-03-trurl.md).

## Averages

There's no separate macro for averages. Divide the sum by the count:

```speci
In: n∈N, x∈N[1..n]
Out: avg∈R
Pre: n>0
Post: avg=SUM(i=1..n, x[i])/n
```

```yaml
n: 4
x: [2, 3, 5, 6]
avg: 4
```

## Common mistakes

- **The result type is too small.** If the summed values can be negative,
  the result must be `Z`, not `N`. If they are real numbers, use `R`.
- **The filter is the second argument.** In `SUM(i=1..n, β(i), f(i))`
  the order is wrong. The value comes first and the condition second, the
  *opposite* of 3-argument `MIS`.
