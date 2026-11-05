# More short examples

## Distinct values

> *We have a list of race results (name and time). How many different finish
> times were recorded?*

A time is "new" if it didn't occur earlier in the list. Count the new
ones: `COUNT` with a nested `FORALL` that looks **backwards**.

```speci
In: n∈N, races∈Race[1..n], Race=(name:S x time:N)
Out: cnt∈N
Fn: nV:N->L, nV(i)=FORALL(j=1..i-1, races[i].time≠races[j].time)
Pre: -
Post: cnt=COUNT(i=1..n, nV(i))
```

```yaml
n: 4
races:
  - name: AS
    time: 37
  - name: BE
    time: 31
  - name: FG
    time: 30
  - name: PS
    time: 37
cnt: 3
```

```yaml
n: 2
races: [{name: AS, time: 37}, {name: BE, time: 31}]
cnt: 2
```

| i | time | earlier times | new? |
|--:|-----:|---------------|:----:|
| 1 | 37 | (none: the range 1..0 is empty, so `FORALL` is true) | yes |
| 2 | 31 | 37 | yes |
| 3 | 30 | 37, 31 | yes |
| 4 | 37 | 37, 31, 30 | no |

## Long runs

> *From a running log (time, location), list the locations of the runs longer
> than 30 minutes.*

Three-argument `MIS`, collecting a field. The comment maps the general form
onto the task:

```speci
In: Trun=(time:N x loc:S), n∈N, runs∈Trun[1..n]
Out: cnt∈N, location∈S[1..cnt]
Pre: -
Post: (cnt,location)=MIS(i=1..n, runs[i].time>30, runs[i].loc)
/* (cnt,y)=MIS(i=b..e, A(i), f(i))
   cnt, y ~ cnt, location
   b..e   ~ 1..n
   A(i)   ~ runs[i].time>30
   f(i)   ~ runs[i].loc
*/
```

```yaml
n: 4
runs:
  - time: 15
    loc: office
  - time: 35
    loc: restaurant
  - time: 40
    loc: gym
  - time: 5
    loc: shop
cnt: 2
location: [restaurant, gym]
```

## Sessions where everyone was late

> *A matrix records how many minutes each of n students was late to each of m
> sessions. List the sessions where every student was more than k minutes
> late.*

This one goes over **columns**. The outer `MIS` runs over the sessions `j`, and
the inner `FORALL` over the students `i`:

```speci
In: n∈N, m∈N, k∈N, lates∈N[1..n,1..m]
Out: cnt∈N, every∈N[1..cnt]
Fn: lt:N->L, lt(j)=FORALL(i=1..n, lates[i,j]>k)
Pre: -
Post: (cnt,every)=MIS(j=1..m, lt(j))
```

```yaml
n: 3
m: 4
k: 5
lates: [
  [6, 8, 2, 7],
  [7, 9, 4, 8],
  [6, 6, 1, 9]
]
cnt: 3
every: [1, 2, 4]
```

## Most visited place

> *n visits were recorded, each to one of the places 1..k. Which place was
> visited the most?*

```speci
In: n∈N, k∈N, visited∈N[1..n]
Out: best∈N
Fn: numOfVisits:N->N, numOfVisits(p)=COUNT(j=1..n, visited[j]=p)
Pre: k≥1 and ∀i∈[1..n]:(1≤visited[i]≤k)
Post: (best,)=MAX(p=1..k, numOfVisits(p))
```

```yaml
n: 7
k: 4
visited: [4, 1, 4, 2, 1, 4, 3]
best: 4
```

## Last odd element

A backward search:

```speci
In: n∈N, numbers∈N[1..n]
Aux: found∈L
Out: ind∈N
Pre: -
Post: (found,-ind)=SEARCH(i=-n..-1, numbers[-i] mod 2 = 1)
```

```yaml
n: 5
numbers: [3, 4, 7, 8, 10]
found: true
ind: 3
```

## Is the array sorted?

A relational postcondition with nested quantifiers. It's enough to compare
neighbours:

```speci
In: n∈N, x∈Z[1..n]
Out: sorted∈L
Pre: -
Post: sorted=∀i∈[1..n-1]:(x[i]≤x[i+1])
```

```yaml
n: 5
x: [-2, 0, 0, 3, 9]
sorted: true
```

```yaml
n: 3
x: [1, 5, 4]
sorted: false
```
