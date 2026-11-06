# Conditional maximum: CONDMAX, CONDMIN

**Conditional maximum selection** (*feltételes maximumkeresés*) finds the
largest value of an expression, but only **among the indices that satisfy a
condition**. Because there may be no such index, it also reports whether one
was found.

<div class="syntax-card">

**Form:** `(found,ind,val)=CONDMAX(i=b..e, f(i), β(i))`<br>
**Minimum:** `(found,ind,val)=CONDMIN(i=b..e, f(i), β(i))`<br>
**Result:** a triple. `found` tells whether any `i` satisfies `β(i)`. If so, `ind` is the first index where `f` is largest among them, and `val = f(ind)`<br>
**Argument order:** range, *value*, *condition*

</div>

## Example: the largest even number

> *What is the largest even number in the array, if there is one?*

```speci
In: n∈N, x∈N[1..n]
Out: found∈L, ind∈N, val∈N
Pre: -
Post: (found,ind,val)=CONDMAX(i=1..n, x[i], x[i] mod 2 = 0)
```

```yaml
n: 5
x: [7, 4, 9, 10, 3]
found: true
ind: 4
val: 10
```

```yaml
n: 3
x: [7, 9, 3]
found: false
ind: 0
val: 0
```

Note that a plain `MAX` would find 9 here, which is odd.

## Skipping slots

As with `MAX`, empty slots in the tuple drop the results you don't need:

| Write | You get |
|-------|---------|
| `(found,ind,val)=CONDMAX(…)` | everything |
| `(found,,val)=CONDMAX(…)` | found and the value (two commas!) |
| `(found,ind,)=CONDMAX(…)` | found and the index |

```speci
In: n∈N, t∈Z[1..n]
Out: any∈L, warmest∈Z
Pre: -
Post: (any,,warmest)=CONDMIN(i=1..n, t[i], t[i]>0)
```

```yaml
n: 5
t: [-3, 8, 2, -1, 5]
any: true
warmest: 2
```

(Here `CONDMIN` gives the *smallest* positive temperature.)

## Conditions on neighbouring elements

The condition and the value can both look at several elements. In
[Dogbert's star](ch09-05-dogbert.md), the value is the change between two
consecutive measurements, and the condition requires both to be above a
threshold:

```speci
In: k∈N, data∈Z[1..]
Out: found∈L, maxval∈Z
Pre: -
Post: (found,,maxval)=CONDMAX(i=1..length(data)-1,
      data[i]-data[i+1], data[i]>k and data[i+1]>k)
```

```yaml
k: 10
data: [34, 30, 1, 2, 1, 30, 33, 27, 30, 32]
found: true
maxval: 6
```

## When nothing matches

When `found` is false, `ind` and `val` carry no meaning, and any value in the
test case passes. Writing 0 is a common convention.

> [!TIP]
> If the task wants a specific "no answer" value, produce it in the
> postcondition with implications, as in
> [Search](ch06-06-search.md#a-sentinel-value-instead-of-a-flag):
> `(found -> res=val) and (not found -> res=-1)`.
