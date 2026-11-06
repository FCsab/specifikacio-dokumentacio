# The Discworld libraries

> *The Librarian of the Unseen University stores the name and the coordinates
> of each Library in the Discworld. Give the first library in the list that is
> further north (its y coordinate is smaller) than the next one.*

**Task type:** search over an array of records.
[Official solution](https://progalap.elte.hu/specifikacio/v1/?uuid=6117a7d1-fd33-48e3-8f5b-55bafbb65a64).

## Analysis

- **Data.** n libraries, each with a name and two coordinates. That calls for
  a record `Tpl=(name:S x x:N x y:N)` and an array of them.
- **Question.** *The first library that…* We look for one element, and there may
  be none. That's **search**.
- **Condition.** Library *i* is further north than library *i+1*. Wait:
  "further north" means a *smaller* y. Compare that with the official
  solution's condition, `pl[i].y<pl[i+1].y`, which says y of *i* is smaller than y
  of *i+1*. Library *i* has the smaller y, so it is the one further north. Good.
- **Range.** Because we compare with the next one, `i` runs only to `n-1`.
- **Output.** The library's *name*, which only exists if the search
  succeeds. That calls for an implication.

## Specification

```speci
In: n∈N, pl∈Tpl[1..n], Tpl=(name:S x x:N x y:N)
Aux: found∈L, ind∈N
Out: lib∈S
Pre: ∀i∈[1..n]:(pl[i].x≥0 and pl[i].y≥0)
Post: (found,ind)=SEARCH(i=1..n-1, pl[i].y<pl[i+1].y) and
      (found -> lib=pl[ind].name)
```

## Tests

The statement's example, where L4 (y = 4) is followed by L5 (y = 47):

```yaml
n: 5
pl: [
  {name: "L1", x: 12, y: 24},
  {name: "L2", x: 5, y: 15},
  {name: "L3", x: 69, y: 4},
  {name: "L4", x: 12, y: 4},
  {name: "L5", x: 212, y: 47}
]
lib: L4
found: true
ind: 4
```

Negative, where every library is further south than the previous one:

```yaml
n: 4
pl: [
  {name: "L1", x: 10, y: 50},
  {name: "L2", x: 20, y: 40},
  {name: "L3", x: 30, y: 30},
  {name: "L4", x: 40, y: 20}
]
lib: ""
found: false
ind: 4
```

Boundary, with a single library (the range `1..0` is empty):

```yaml
n: 1
pl: [{name: "L1", x: 0, y: 10}]
lib: ""
found: false
ind: 1
```

A wrong expectation must be caught:

```yaml,red
n: 5
pl: [
  {name: "L1", x: 12, y: 24},
  {name: "L2", x: 5, y: 15},
  {name: "L3", x: 69, y: 4},
  {name: "L4", x: 12, y: 4},
  {name: "L5", x: 212, y: 47}
]
lib: L3
found: true
ind: 3
```

## Walkthrough

| i | y[i] | y[i+1] | y[i] < y[i+1]? |
|--:|-----:|-------:|:--------------:|
| 1 | 24 | 15 | no |
| 2 | 15 | 4 | no |
| 3 | 4 | 4 | no |
| 4 | 4 | 47 | **yes** |

The search stops at i = 4, so `found = true` and `ind = 4`, and the
implication requires `lib = pl[4].name = "L4"`.

## About the parentheses

The official solution writes the last line without parentheses:

```speci,fragment
Post: (exists,ind)=SEARCH(i=1..n-1,pl[i].y<pl[i+1].y) and
      exists -> lib=pl[ind].name
```

Because `->` binds more weakly than `and`, this means
`(SEARCH… and exists) -> lib=…`. If a test case has wrong values for `exists` or
`ind`, the left side is false and the whole statement is *true*, so
the error goes unnoticed. With the parentheses, as above, the red test is
correctly red. (The official solution also names the flag `exists`, which the
current editor rejects. See [Search](ch06-06-search.md).)
