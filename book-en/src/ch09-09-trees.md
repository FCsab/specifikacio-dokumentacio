# Christmas trees

> *A Christmas market sells N fir trees. Write a program that gives a tree
> cheaper than K forints!*
>
> **Input:** N (1 ≤ N ≤ 100) and K (1 ≤ K ≤ 10 000), then the N prices
> (1 ≤ Ár ≤ 10 000).
> **Output:** the index of a tree cheaper than K; **−1** if there is none; the
> **smallest** index if there are several.

Sample: N = 6, K = 2000, prices 2500, 5300, 1900, 2400, 8800, 5300 → **3**.

## Analysis

- The question is *the first index with a property, which may not exist*, so a
  **search**.
- But the output isn't a found/not-found flag. It's an index **or −1**. So:
  - the output must be `Z` (−1 is not in `N`),
  - the postcondition itself must produce the −1.

Both formulations below were verified on the live editor.

## Solution 1: relational

```speci
Be:

n∈N, k∈N, ar∈N[1..n]

Ki:

sorszam∈Z

Ef:

1<=n<=100 and 1<=k<=10000 and ∀i∈[1..n]:(1<=ar[i] and ar[i]<=10000)

Uf:

(sorszam=-1 and ∀i∈[1..n]:(ar[i]>=k)) or ∃i∈[1..n]:(sorszam=i and ar[i]<k and ∀j∈[1..i-1]:(ar[j]>=k))
```

The two sides of the `or` exclude each other:

- **left:** no tree is cheap enough, and the answer is −1,
- **right:** tree *i* is cheap enough, no earlier tree is (`∀j∈[1..i-1]`), and
  the answer is *i*.

The output is bound through the witness (`sorszam=i`), so the formula never
reads `ar[-1]`.

```yaml
n: 6
k: 2000
ar: [2500, 5300, 1900, 2400, 8800, 5300]
sorszam: 3
```

```yaml
n: 3
k: 100
ar: [2500, 5300, 1900]
sorszam: -1
```

The *smallest* index, not the cheapest tree: 3000 at index 2 comes before 200
at index 4.

```yaml
n: 4
k: 5000
ar: [6000, 3000, 1000, 200]
sorszam: 2
```

`k = 1` can never be beaten, since every price is at least 1:

```yaml
n: 4
k: 1
ar: [1, 1, 10000, 7]
sorszam: -1
```

A single tree, matching:

```yaml
n: 1
k: 3000
ar: [2500]
sorszam: 1
```

> [!TIP]
> Without `∀j∈[1..i-1]:(ar[j]>=k)`, *any* qualifying index would be accepted.
> The sample would still pass, but `sorszam: 4` would also be green on the third
> test. Always include a test where several elements qualify.

## Solution 2: with SEARCH, every Hungarian block

This version uses all six Hungarian blocks at once. The extra input `egyeb` and
output `db` are only there to show every feature:

```speci
Be:
n∈N,
k∈N,
ar∈N[1..n],
egyeb∈N

Sa:
van∈L,
ind∈N

Ki:
sorszam∈Z,
db∈N

Fv:
kisebb:N->L,
kisebb(i)=ar[i]<k

Ef:
1<=n<=100 and 1<=k<=10000 and egyeb>=0 and ∀i∈[1..n]:(1<=ar[i] and ar[i]<=10000)

Uf:
(van,ind)=SEARCH(i=1..n, kisebb(i)) and
(van -> sorszam=ind) and
(not van -> sorszam=-1) and
db=DARAB(i=1..n, ar[i]<k) and
egyeb=egyeb
```

```yaml
n: 6
k: 2000
ar: [2500, 5300, 1900, 2400, 8800, 1000]
egyeb: 0
van: true
ind: 3
sorszam: 3
db: 2
```

```yaml
n: 3
k: 100
ar: [2500, 5300, 1900]
egyeb: 5
van: false
ind: 4
sorszam: -1
db: 0
```

What this one green run demonstrates:

| Element | Shows |
|---------|-------|
| `Be:` `Sa:` `Ki:` `Fv:` `Ef:` `Uf:` | all six Hungarian headers, each with the content on the next lines |
| `kisebb:N->L,` with the body on the next line | a Hungarian function block, ASCII arrow |
| `kisebb(i)` as the `SEARCH` condition | a user function driving a theorem |
| `van∈L` | the flag named `van`, never `exists` |
| `->` and `not` | implication and negation |
| `egyeb=egyeb` | the identity that satisfies the [all-variables rule](ch02-03-all-variables.md) |
