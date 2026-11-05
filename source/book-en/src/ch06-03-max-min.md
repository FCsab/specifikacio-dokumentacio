# Maximum and minimum: MAX, MIN

**Maximum selection** (*maximumkiválasztás*) finds the largest value of an
expression over a range, and *where* it occurs. **Minimum selection** does the
same for the smallest.

<div class="syntax-card">

**Form:** `(ind,val)=MAX(i=b..e, f(i))` and `(ind,val)=MIN(i=b..e, f(i))`<br>
**Result:** a pair: the index `ind` where `f` is largest (smallest), and the value `val = f(ind)`<br>
**Ties:** the **first** such index<br>
**Empty range:** not allowed. The precondition must guarantee at least one element.

</div>

## Example: the warmest day

```speci
In: n∈N, t∈Z[1..n]
Out: day∈N, temp∈Z
Pre: n>0
Post: (day,temp)=MAX(i=1..n, t[i])
```

```yaml
n: 5
t: [12, 17, 9, 17, 3]
day: 2
temp: 17
```

The maximum, 17, occurs on days 2 and 4. `MAX` chooses the first, day 2.

```yaml,red
n: 5
t: [12, 17, 9, 17, 3]
day: 4
temp: 17
```

## Keeping only one of the two results

Leave an empty slot in the tuple:

| Write | You get |
|-------|---------|
| `(ind,val)=MAX(…)` | both |
| `(ind,)=MAX(…)` | only the index (note the trailing comma) |
| `(,val)=MAX(…)` | only the value |

```speci
In: n∈N, t∈Z[1..n]
Out: coldest∈Z
Pre: n>0
Post: (,coldest)=MIN(i=1..n, t[i])
```

```yaml
n: 4
t: [3, -2, 8, -2]
coldest: -2
```

## Maximising an expression

`f(i)` can be any expression. *On which day was the largest change from the
previous day?*

```speci
In: n∈N, t∈Z[1..n]
Out: day∈N
Pre: n≥2
Post: (day,)=MAX(i=2..n, ABS(t[i]-t[i-1]))
```

```yaml
n: 5
t: [10, 12, 4, 6, 7]
day: 3
```

## Accessing the components by name

The result of `MAX` can be used directly in an expression, with its parts
named **`.maxind`** and **`.maxval`**. This is handy when the maximum comes from a
function:

```speci
In: n∈N, t∈Z[1..n]
Out: v∈Z
Pre: n>0
Post: v=MAX(i=1..n, t[i]).maxval
```

```yaml
n: 3
t: [4, 9, 1]
v: 9
```

[Yossarian's map](ch09-02-yossarian.md) uses this to find the maximum of a
matrix.

## Common mistakes

- **Missing precondition.** The maximum of nothing doesn't exist. With
  `n∈N`, the test `n: 0` is possible, so the precondition must say `n>0`.
- **Forgetting the tuple.** `m=MAX(i=1..n, x[i])` compares a number with a
  pair. Write `(,m)=MAX(…)`.
- **A condition hidden in the value.** "The largest *even* number" is not a
  `MAX`, because the maximum might be odd. Use
  [`CONDMAX`](ch06-09-condmax.md).
