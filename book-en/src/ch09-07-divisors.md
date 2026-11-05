# Divisors

Three short Hungarian course tasks about the divisors of a number. They show
the Hungarian counting macro `DARAB`, the divisibility relation `|` and the
filtered `SUM`.

## Number of divisors

> *Ask for an integer, then print the number of its divisors!*

```speci
Be: szam∈N

Ki: osztok∈N

Ef: szam>=1

Uf: osztok=DARAB(i=1..szam, i|szam)    // szam mod i = 0
```

```yaml
szam: 12
osztok: 6
```

```yaml
szam: 1
osztok: 1
```

```yaml
szam: 13
osztok: 2
```

- `DARAB` is the Hungarian spelling of `COUNT`.
- `i|szam` reads "i divides szam", the same as `szam mod i = 0`. The line
  comment says so.
- The precondition excludes 0, which would have infinitely many divisors.

## Sum of divisors

> *Ask for an integer, then print the sum of its divisors!*

```speci
Be: n∈N

Ki: sum∈N

Ef: n>=1

Uf: sum=SUM(i=1..n, i, i|n)
```

```yaml
n: 12
sum: 28
```

```yaml
n: 1
sum: 1
```

The third argument of `SUM` is the filter: only the divisors are added.

## Sum of the odd divisors

> *Ask for an integer, then print the sum of its odd divisors!*

A solution that circulated in the course:

```speci
Be: n∈N

Ki: sum∈N

Ef: n>=1

Uf: sum = SUM(i=1..n,i,i%2=1)
```

```yaml,red
n: 10
sum: 6
```

> [!WARNING]
> This doesn't solve the task. The filter `i%2=1` keeps *every odd number*
> up to n. For n = 10 it gives 1+3+5+7+9 = 25, not the odd divisors
> 1+5 = 6. The test with the correct answer is red, which exposes the bug.

The correct filter has both conditions:

```speci
Be: n∈N

Ki: sum∈N

Ef: n>=1

Uf: sum=SUM(i=1..n, i, i%2=1 and i|n)
```

```yaml
n: 10
sum: 6
```

```yaml
n: 12
sum: 4
```

`%` and `mod` are interchangeable.
