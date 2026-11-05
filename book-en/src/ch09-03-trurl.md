# Trurl's robots

> *For n days, Trurl recorded how many robots he built. List the days on which
> he built more robots than the total number of robots built in the previous d
> days (1 < d < n).*

**Task type:** compound pattern. Multiple item selection is the main pattern,
and summation is the nested pattern.

## Analysis

- **Data.** `n`, `d`, and the daily counts `tr∈N[1..n]`.
- **Question.** *List the days on which…* means collecting several indices, so
  **MIS**.
- **Condition for day i.** `tr[i]` is greater than the sum of the previous *d*
  days, `tr[i-d] + … + tr[i-1]`. That's a **SUM**, which becomes a function.
- **Range.** Day *i* needs *d* previous days, so `i` starts at `d+1`.
- **Precondition.** The statement says `1 < d < n`.

## Specification

```speci
In: n∈N, d∈N, tr∈N[1..n]
Out: cnt∈N, days∈N[1..cnt]
Fn: total:N->N, total(i)=SUM(j=i-d..i-1, tr[j])
Pre: 1<d<n
Post: (cnt,days)=MIS(i=d+1..n, total(i)<tr[i], i)
```

The third argument of `MIS`, `i`, collects the day numbers. With two
arguments the result would be the same, because two-argument `MIS` collects the
indices anyway. The course solution writes it out explicitly.

## Tests

The nominal case, with two matching days:

```yaml
n: 10
d: 3
tr: [2, 4, 5, 1, 13, 1, 1, 1, 4, 5]
cnt: 2
days: [5, 9]
```

Negative, with production declining:

```yaml
n: 5
d: 2
tr: [100, 50, 20, 10, 5]
cnt: 0
days: []
```

Boundary, `d = n-1`, so only the last day can qualify:

```yaml
n: 4
d: 3
tr: [1, 1, 1, 10]
cnt: 1
days: [4]
```

The precondition excludes `d = 1`:

```yaml,red
n: 4
d: 1
tr: [1, 2, 3, 4]
cnt: 3
days: [2, 3, 4]
```

## Walkthrough (first test, d = 3)

| day i | previous days | total(i) | tr[i] | total(i) < tr[i]? |
|------:|---------------|---------:|------:|:-----------------:|
| 4 | 2 + 4 + 5 | 11 | 1 | no |
| 5 | 4 + 5 + 1 | 10 | 13 | **yes** |
| 6 | 5 + 1 + 13 | 19 | 1 | no |
| 7 | 1 + 13 + 1 | 15 | 1 | no |
| 8 | 13 + 1 + 1 | 15 | 1 | no |
| 9 | 1 + 1 + 1 | 3 | 4 | **yes** |
| 10 | 1 + 1 + 4 | 6 | 5 | no |

Days 5 and 9 match, so `cnt = 2` and `days = [5, 9]`.
