# The travel agency

> *A travel agency stores which cities it sells plane tickets to, how far away
> they are, and at what price. Give the price of the ticket to the farthest
> city! If several cities are equally far, give the cheapest of them.*
>
> **Input:** N (1 ≤ N ≤ 100), then N lines with the distance
> (1 ≤ T ≤ 20 000) and the price (1 ≤ Á ≤ 2 000 000).
> **Output:** one integer, the price.

This Hungarian course task was verified on the live editor. It is written in
the canonical Hungarian style: Hungarian headers and names, one declaration per
line, a blank line between blocks.

## Analysis

- **Data.** The input comes as N lines of (distance, price). Two parallel
  arrays, `tav` (distance) and `ar` (price), mirror that directly.
- **Question.** A single price, defined by a property: the price of a city
  that is farthest, and cheapest among the farthest ones.
- **Style.** The property translates directly into a relational postcondition. A
  theorem version is shown below too.

## Specification (relational)

```speci
Be:
n∈N,
ar∈N[1..n],
tav∈N[1..n]

Ki:
max∈N

Ef:
1<=n and n<=100 and ∀i∈[1..n]:(1<=ar[i] and ar[i]<=2000000 and 1<=tav[i] and tav[i]<=20000)

Uf:
∃i∈[1..n]:(∀j∈[1..n]:(tav[j]<tav[i] vagy (tav[j]=tav[i] és ar[j]>=ar[i])) és ar[i]=max)
```

Read the postcondition as: *there is a city i such that every city j is either
nearer than i, or equally far but not cheaper, and the answer is the price of i.*

## Tests

The statement's sample. The farthest city is no. 6 (2100), at 30 000:

```yaml
n: 6
ar: [30000, 200000, 150000, 38000, 150000, 30000]
tav: [50, 1900, 2000, 900, 600, 2100]
max: 30000
```

A tie on the farthest distance, so the cheaper of the two is the answer:

```yaml
n: 3
ar: [500, 250, 100]
tav: [1000, 1000, 500]
max: 250
```

A single city:

```yaml
n: 1
ar: [1]
tav: [1]
max: 1
```

All cities equally far, with the cheapest one last:

```yaml
n: 4
ar: [100, 100, 2000000, 1]
tav: [20000, 20000, 20000, 20000]
max: 1
```

Not the cheapest of the farthest:

```yaml,red
n: 3
ar: [500, 250, 100]
tav: [1000, 1000, 500]
max: 500
```

> [!WARNING]
> **Check every bound.** It's easy to copy the price limit (2 000 000) onto the
> distance as well. Such a precondition is too loose, and no test will turn
> red because of it. Compare each bound in `Ef:` with the statement.

## Specification (with theorems)

The same task in three steps: the largest distance (`MAX`), the prices at
that distance (`MIS`), and the smallest of those (`MIN`):

```speci
Be:
n∈N,
ar∈N[1..n],
tav∈N[1..n]

Sa:
legtav∈N,
db∈N,
arak∈N[1..db]

Ki:
max∈N

Ef:
1<=n and n<=100 and ∀i∈[1..n]:(1<=ar[i] and ar[i]<=2000000 and 1<=tav[i] and tav[i]<=20000)

Uf:
(,legtav)=MAX(i=1..n, tav[i]) és
(db,arak)=MIS(i=1..n, tav[i]=legtav, ar[i]) és
(,max)=MIN(i=1..db, arak[i])
```

```yaml
n: 6
ar: [30000, 200000, 150000, 38000, 150000, 30000]
tav: [50, 1900, 2000, 900, 600, 2100]
legtav: 2100
db: 1
arak: [30000]
max: 30000
```

```yaml
n: 3
ar: [500, 250, 100]
tav: [1000, 1000, 500]
legtav: 1000
db: 2
arak: [500, 250]
max: 250
```

The output variable is called `max`, and that's fine: `MAX` the theorem is
uppercase, so the two don't collide.
