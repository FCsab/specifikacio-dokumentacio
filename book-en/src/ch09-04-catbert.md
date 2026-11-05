# Catbert's coffee breaks

> *Catbert organised a multi-day conference with four coffee breaks each day.
> She recorded how much coffee was consumed during each break. Find a day on
> which the participants drank more than 5 litres of coffee in each of the
> coffee breaks.*

**Task type:** compound pattern. Search is the main pattern, and decision
(all) is the nested pattern.
[Official solution](https://progalap.elte.hu/specifikacio/v1/?uuid=96a3095f-cd78-482b-91cf-89e8a92229ab).

## Analysis

- **Data.** n days × 4 breaks, a matrix `coffe∈N[1..n,1..4]`. (The course
  solution spells it `coffe`.)
- **Question.** *Find a day*, which may not exist, so **search**.
- **Condition for day i.** *Each* of the four breaks was above 5, so
  **FORALL**, as a function of the day.

## Specification

```speci
In: n∈N, coffe∈N[1..n,1..4]
Aux: found∈L
Out: ind∈N
Fn: more5:N->L, more5(i)=FORALL(j=1..4, coffe[i,j]>5)
Pre: -
Post: (found,ind)=SEARCH(i=1..n, more5(i))
```

## Tests

Day 2 is the only day with all four breaks above 5:

```yaml
n: 3
coffe: [
  [4, 5, 7, 5],
  [6, 8, 7, 9],
  [4, 5, 7, 5]
]
found: true
ind: 2
```

No such day. Day 2 has a break of exactly 5, which is not *more* than 5:

```yaml
n: 3
coffe: [
  [4, 3, 5, 6],
  [6, 7, 5, 6],
  [5, 6, 5, 6]
]
found: false
ind: 0
```

The official example of a failed search. It writes `ind: 4` (n + 1), which is
what the step list shows:

```yaml
n: 3
coffe: [
  [5, 6, 7, 4],
  [6, 4, 6, 8],
  [1, 2, 3, 4]
]
found: false
ind: 4
```

Several good days, so the first one must be chosen:

```yaml
n: 3
coffe: [[1, 1, 1, 1], [6, 6, 6, 6], [9, 9, 9, 9]]
found: true
ind: 2
```

## In the step list

The step list of the official solution is explained line by line in
[Stepper and step list](ch08-01-stepper.md). It shows the evaluation entering
`more5` (↓) for each day and returning (↑) with the result.

## Variants

- *How many days* had every break above 5? Use `COUNT` instead of `SEARCH`:
  `c=COUNT(i=1..n, more5(i))`.
- *Was there a day* with a break under 5? Use `EXISTS` with a nested `EXISTS`:
  `l=EXISTS(i=1..n, EXISTS(j=1..4, coffe[i,j]<5))`.
- *Which* days? Use `MIS`: `(c,days)=MIS(i=1..n, more5(i))`.
