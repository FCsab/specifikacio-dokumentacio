# Patterns inside functions

The real power of functions is **decomposition**. When a task needs one
theorem inside another, put the inner one in a function. The postcondition
then shows the outer pattern clearly, and the function shows the inner one.

The table collects the most frequent combinations from the course material.
Each is used in a complete example later in the book.

| Function | Inner pattern | Used in |
|----------|---------------|---------|
| `maxcol:N->N x N, maxcol(i)=MAX(j=1..m, map[i,j])` | maximum of row *i* | [Yossarian's map](ch09-02-yossarian.md) |
| `total:N->N, total(i)=SUM(j=i-d..i-1, tr[j])` | sum of the *d* previous values | [Trurl's robots](ch09-03-trurl.md) |
| `more5:N->L, more5(i)=FORALL(j=1..4, coffe[i,j]>5)` | every value of row *i* is > 5 | [Catbert's coffee breaks](ch09-04-catbert.md) |
| `less5:N->L, less5(i)=EXISTS(j=1..4, coffe[i,j]<5)` | some value of row *i* is < 5 | |
| `visits:N->N, visits(i)=COUNT(j=1..n, visited[j]=i)` | how often *i* occurs | |
| `nV:N->L, nV(i)=FORALL(j=1..i-1, rs[i].time≠rs[j].time)` | value *i* didn't occur before | [More short examples](ch09-10-more.md) |
| `lt:N->L, lt(j)=FORALL(i=1..n, lates[i,j]>k)` | every value of column *j* > k | [More short examples](ch09-10-more.md) |

## Example: rows with a property

> *A conference lasted n days, with four coffee breaks a day. On how many days
> was every break above 5 litres?*

The outer pattern is **counting** (how many days?), and the inner one is
**decision** (is every break above 5?):

```speci
In: n∈N, coffe∈N[1..n,1..4]
Out: c∈N
Fn: more5:N->L, more5(i)=FORALL(j=1..4, coffe[i,j]>5)
Pre: -
Post: c=COUNT(i=1..n, more5(i))
```

```yaml
n: 3
coffe: [
  [4, 5, 7, 5],
  [6, 8, 7, 9],
  [6, 6, 7, 8]
]
c: 2
```

## Example: how many times does each value occur?

> *n visits were recorded, each to one of the places 1..k. Which place was
> visited the most often?*

The outer pattern is a **maximum** over the places. The function counts the
visits to one place:

```speci
In: n∈N, k∈N, visited∈N[1..n]
Out: best∈N
Fn: visits:N->N, visits(p)=COUNT(j=1..n, visited[j]=p)
Pre: k≥1 and ∀i∈[1..n]:(1≤visited[i]≤k)
Post: (best,)=MAX(p=1..k, visits(p))
```

```yaml
n: 6
k: 3
visited: [2, 3, 2, 1, 2, 3]
best: 2
```

> [!TIP]
> When you read a task, look for "**for each** … **how many / the largest /
> is there**". The word *each* usually marks the outer loop, and the question
> asked about each element marks the inner theorem that becomes a function.

## Can I nest without a function?

Yes. A theorem can appear directly inside another:

```speci
In: n∈N, coffe∈N[1..n,1..4]
Out: c∈N
Pre: -
Post: c=COUNT(i=1..n, FORALL(j=1..4, coffe[i,j]>5))
```

```yaml
n: 2
coffe: [[6, 6, 6, 6], [6, 1, 6, 6]]
c: 1
```

The meaning is the same. The function version is preferred in the course,
because it names the inner pattern and makes the algorithm design (one
function per nested theorem) straightforward.
