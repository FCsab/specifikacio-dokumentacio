# Combining theorems

Real tasks rarely fit a single theorem. They combine theorems in two ways:

- **nesting**: the condition or value of one theorem is itself a theorem
  ("find a day on which *every* break…"),
- **sequencing**: the result of one theorem is the input of the next
  ("find the maximum, then collect everything equal to it").

## Nesting

Put the inner theorem in a [function](ch05-01-nested.md) of the outer loop
variable. *Find a day on which every coffee break was above 5 litres:*

| Level | Question | Theorem |
|-------|----------|---------|
| outer | which day? | `SEARCH` over days |
| inner | was every break of day *i* above 5? | `FORALL` over breaks |

```speci
In: n∈N, coffe∈N[1..n,1..4]
Aux: found∈L
Out: ind∈N
Fn: more5:N->L, more5(i)=FORALL(j=1..4, coffe[i,j]>5)
Pre: -
Post: (found,ind)=SEARCH(i=1..n, more5(i))
```

```yaml
n: 3
coffe: [[4, 5, 7, 5], [6, 8, 7, 9], [4, 5, 7, 5]]
found: true
ind: 2
```

The task type in the course material is written as *"compound pattern; search
is the main pattern, and decision all is the nested pattern"*.

## Sequencing with auxiliary variables

When a later step needs an earlier result, store it in an **auxiliary**
variable (`Aux:`) and refer to it.

> *Which elements are equal to the maximum? List their indices.*

```speci
In: n∈N, x∈Z[1..n]
Aux: m∈Z
Out: c∈N, where∈N[1..c]
Pre: n>0
Post: (,m)=MAX(i=1..n, x[i]) and
      (c,where)=MIS(i=1..n, x[i]=m)
```

```yaml
n: 6
x: [3, 9, 2, 9, 9, 1]
m: 9
c: 3
where: [2, 4, 5]
```

Auxiliary variables appear in the test case too, with their expected values.

## Recipe

1. Write down the **question** the task asks. That's the outer theorem.
2. If the condition (or value) in that theorem is itself "is there…",
   "how many…", "the largest…" over another range, that's an **inner
   theorem**. Make it a function of the outer index.
3. If the task has several steps ("first…, then…"), write a theorem per
   step and connect them with `and`, passing results through auxiliary
   variables.
4. Write tests that exercise **every level**: an element that
   fails only the inner check, one that passes it, and an empty input.

## Examples in the book

| Task | Combination |
|------|-------------|
| [Yossarian's map](ch09-02-yossarian.md) | `MAX` of a function returning row maxima |
| [Trurl's robots](ch09-03-trurl.md) | `MIS` with a nested `SUM` |
| [Catbert's coffee breaks](ch09-04-catbert.md) | `SEARCH` with a nested `FORALL` |
| [The travel agency](ch09-06-travel.md) | `MAX`, then `MIS`, then `MIN` |
| [More short examples](ch09-10-more.md) | `COUNT` with a nested `FORALL`, `MIS` with a nested `FORALL` |
