# Postconditions without theorems

A postcondition doesn't *have* to use theorem macros. Any logical statement
over the input and output is valid, and the editor evaluates it directly. This
**relational** style, built from `∀`, `∃`, `and`, `or` and `→`, is the
notation of the lectures, and some assignments ask for it explicitly.

## The same task in both styles

> *A travel agency sells tickets to n cities. Give the price of the ticket to
> the farthest city. If several are equally far, the cheapest among them.*

**With theorems.** Find the maximum distance, collect the prices at that
distance, and take the minimum:

```speci
In: n∈N, city∈City[1..n], City=(dist:N x price:N)
Aux: far∈N, cnt∈N, prices∈N[1..cnt]
Out: ticket∈N
Pre: n>0
Post: (,far)=MAX(i=1..n, city[i].dist) and
      (cnt,prices)=MIS(i=1..n, city[i].dist=far, city[i].price) and
      (,ticket)=MIN(i=1..cnt, prices[i])
```

```yaml
n: 3
city: [{dist: 1000, price: 500}, {dist: 1000, price: 250}, {dist: 500, price: 100}]
far: 1000
cnt: 2
prices: [500, 250]
ticket: 250
```

**Relational.** *There is a city i whose price is the answer, and every other
city j is either nearer, or equally far and not cheaper:*

```speci
In: n∈N, dist∈N[1..n], price∈N[1..n]
Out: ticket∈N
Pre: n>0
Post: ∃i∈[1..n]:(price[i]=ticket and
        ∀j∈[1..n]:(dist[j]<dist[i] or (dist[j]=dist[i] and price[j]≥price[i])))
```

```yaml
n: 3
dist: [1000, 1000, 500]
price: [500, 250, 100]
ticket: 250
```

## How to write a relational postcondition

The typical shape: **an `∃` that names a witness, plus `∀`s that say why the
witness is the right one.**

- *"the answer is an element with property P"*: `∃i∈[…]:(P(i) and out=…(i))`
- *"… and it is the best one"*: add `∀j∈[…]:(i is at least as good as j)`
- *"… and it is the first one"*: add `∀j∈[1..i-1]:(not P(j))`
- *"or a special value if there is none"*:
  `(out=-1 and ∀i∈[…]:(not P(i))) or ∃i∈[…]:(…)`

### Example: first match or −1

```speci
In: n∈N, k∈N, price∈N[1..n]
Out: res∈Z
Pre: -
Post: (res=-1 and ∀i∈[1..n]:(price[i]≥k)) or
      ∃i∈[1..n]:(res=i and price[i]<k and ∀j∈[1..i-1]:(price[j]≥k))
```

```yaml
n: 4
k: 5000
price: [6000, 3000, 1000, 200]
res: 2
```

```yaml
n: 2
k: 100
price: [2500, 5300]
res: -1
```

The output is bound *through the witness* (`res=i`), so the formula never reads
`price[res]` when `res` is −1. Writing `price[res]<k` would be an out-of-range
read on the failing branch.

## Which style should I use?

| Use | When |
|-----|------|
| **theorems** | the specification should lead to an algorithm: each macro becomes a known algorithm in the design phase |
| **relational** | the output is defined by a property, the assignment asks for the relational form, or the theorem version would need many auxiliary variables |

Both styles must satisfy the [all-variables rule](ch02-03-all-variables.md).
Both are evaluated by the editor, but the stepper shows theorem macros as loops,
which is often easier to follow.
