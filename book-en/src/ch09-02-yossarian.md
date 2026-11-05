# Yossarian's map

> *Yossarian marked on a grid map (n × m) how many times he had been to each
> place. Which place had he been to the most? Give the "coordinates" of the
> first such place.*

**Task type:** maximum selection in a matrix.
[Official solution](https://progalap.elte.hu/specifikacio/v1/?uuid=0ae47017-4755-40de-82b5-00ba484d7637).

## Analysis

- **Data.** An n × m matrix of natural numbers: `map∈N[1..n,1..m]`.
- **Question.** The position of the largest value: a **maximum**, but over two
  indices.
- **Decomposition.** First find the maximum of each row (inner `MAX` over the
  columns), then the row with the largest row-maximum (outer `MAX` over the
  rows). The inner one becomes a function returning (column, value).
- **"The first such place"**: `MAX` already takes the first maximum, in both
  the row and the column.

## Specification

```speci
In: n∈N, m∈N, map∈N[1..n,1..m]
Out: mpx∈N, mpy∈N
Fn: maxcol:N->N x N, maxcol(i)=MAX(j=1..m, map[i,j])
Pre: n>0 and m>0
Post: (mpx,)=MAX(i=1..n, maxcol(i).maxval) and
      mpy=maxcol(mpx).maxind
```

- `maxcol(i)` is the pair (column of the maximum, maximum) for row *i*.
- `maxcol(i).maxval` is the maximum of row *i*. The outer `MAX` keeps only the
  row index: `(mpx,)`.
- `maxcol(mpx).maxind` is the column of the maximum within the chosen row.

> [!NOTE]
> The official solution's precondition is `∀i∈[1..n]:(∀j∈[1..m]:(map[i,j]≥0))`,
> which is always true for `N`. What `MAX` actually needs is a non-empty
> matrix, so this version says `n>0 and m>0`.

## Tests

The statement's example, where the maximum 23 occurs in rows 2 and 4 (the first
one wins):

```yaml
n: 6
m: 4
map: [
  [12, 3, 1, 4],
  [3, 2, 23, 5],
  [4, 2, 2, 1],
  [5, 2, 23, 0],
  [0, 2, 4, 1],
  [0, 0, 0, 1]
]
mpx: 2
mpy: 3
```

The maximum in the top-left corner:

```yaml
n: 3
m: 3
map: [[99, 10, 5], [20, 30, 40], [15, 25, 35]]
mpx: 1
mpy: 1
```

All cells equal, so the first cell is chosen:

```yaml
n: 2
m: 2
map: [[7, 7], [7, 7]]
mpx: 1
mpy: 1
```

The second occurrence is *not* accepted:

```yaml,red
n: 2
m: 2
map: [[1, 9], [9, 1]]
mpx: 2
mpy: 1
```

## Walkthrough (first test)

| row i | `maxcol(i)` | `.maxval` |
|------:|:-----------:|----------:|
| 1 | (1, 12) | 12 |
| 2 | (3, 23) | **23** |
| 3 | (1, 4) | 4 |
| 4 | (3, 23) | 23 |
| 5 | (3, 4) | 4 |
| 6 | (4, 1) | 1 |

The outer `MAX` finds 23 first in row 2, so `mpx = 2`. Then
`maxcol(2).maxind = 3`, so `mpy = 3`.
