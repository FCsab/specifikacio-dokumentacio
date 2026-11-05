# Counting: COUNT / DARAB

**Counting** (*megszámolás*) tells how many indices in a range satisfy a
condition.

<div class="syntax-card">

**Form:** `c=COUNT(i=b..e, β(i))`<br>
**Hungarian:** `c=DARAB(i=b..e, β(i))`<br>
**Result:** a natural number, the number of `i` in `b..e` for which `β(i)` holds<br>
**Empty range:** 0

</div>

## Example: odd numbers

```speci
In: n∈N, nums∈N[1..n]
Out: cnt∈N
Pre: -
Post: cnt=COUNT(i=1..n, nums[i] mod 2 = 1)
```

```yaml
n: 5
nums: [3, 72, 81, 4, 5]
cnt: 3
```

```yaml
n: 3
nums: [2, 4, 6]
cnt: 0
```

This is the official course example
([open in the editor](https://progalap.elte.hu/specifikacio/v1/?uuid=058de53d-56cd-4733-93f1-8f4cf2212a86)).

## The Hungarian name

`DARAB` ("piece", as in *hány darab*: "how many") means exactly the same as
`COUNT`. *How many divisors does a number have?*

```speci
Be: szam∈N
Ki: osztok∈N
Ef: szam>=1
Uf: osztok=DARAB(i=1..szam, i|szam)    // i divides szam
```

```yaml
szam: 12
osztok: 6
```

```yaml
szam: 13
osztok: 2
```

## Counting with a complex condition

The condition can be any logical expression: it may compare neighbours,
call functions or contain quantifiers. *How many times did the temperature
rise from one day to the next?*

```speci
In: n∈N, t∈Z[1..n]
Out: rises∈N
Pre: -
Post: rises=COUNT(i=1..n-1, t[i]<t[i+1])
```

```yaml
n: 6
t: [3, 5, 4, 4, 8, 9]
rises: 3
```

Note the range `1..n-1`: for `i = n`, `t[i+1]` wouldn't exist.

## COUNT versus SUM

`COUNT(i=b..e, β(i))` is the same as `SUM(i=b..e, 1, β(i))`: add 1 for each
matching index. Use `COUNT`, though. It names the theorem.

## Common mistakes

- **Only one argument after the range.** `COUNT` takes exactly the range and one
  condition. To count with a value, you probably need `SUM`.
- **Counting values instead of conditions.** `COUNT(i=1..n, x[i])` is
  wrong when `x` holds numbers. The second argument must be true or false.
