# Records and tuples

## Records

A **record** (structure, *rekord*) bundles values of *different* types into one
unit. In the specification it is the **direct product** of its fields'
sets, written with `x` between the fields:

```speci,fragment
r1∈(name:S x grade:N)
```

`r1` is one element of *S × N*, a name–grade pair. Fields are accessed with a dot:
`r1.name`, `r1.grade`.

| Declaration | Meaning |
|-------------|---------|
| `r1∈name:S x grade:N` | parentheses are optional |
| `r2∈(name:S x grade:N)` | the usual form |
| `r3∈(north:L x east:L x south:L x west:L)` | any number of fields |
| `r4∈(a:[1..2] x b:[3..4])` | fields can be intervals: r4 is one of (1,3), (1,4), (2,3), (2,4) |

> [!IMPORTANT]
> The `x` needs a space on both sides: `name:S x grade:N`.

In the test data, a record is written either in the multi-line YAML form or
in the compact `{…}` form:

```speci
In: r∈(name:S x grade:N)
Out: pass∈L
Pre: r.grade≥1 and r.grade≤5
Post: pass=(r.grade≥2)
```

```yaml
r:
  name: Anna
  grade: 4
pass: true
```

```yaml
r: {name: Bence, grade: 1}
pass: false
```

## Arrays of records

Most real tasks have an **array of records**, such as a list of students or
measurements. It's clearer to name the record type first (see
[Naming your own sets](ch03-05-aliases.md)):

```speci
In: n∈N, st∈Student[1..n], Student=(name:S x grade:N)
Out: c∈N
Pre: ∀i∈[1..n]:(1≤st[i].grade≤5)
Post: c=COUNT(i=1..n, st[i].grade=5)
```

```yaml
n: 3
st:
  - name: Anna
    grade: 5
  - name: Bence
    grade: 3
  - name: Cili
    grade: 5
c: 2
```

```yaml
n: 2
st: [{name: Anna, grade: 2}, {name: Bence, grade: 4}]
c: 0
```

`st[i].grade` reads "the grade field of element *i* of st".

> [!WARNING]
> Field names in the test data must match the declaration exactly, including
> upper and lower case: `grade` is not `Grade`.

## Tuples

A **tuple** groups values without declaring a record: `(3, 5)`. Its
components are numbered from 1: `(3, 5).1 = 3`, `(3, 5).2 = 5`.

```speci
In: a∈Z, b∈Z
Out: ok∈L
Pre: -
Post: ok=((a, b).2=b and (a, b)=(a, b))
```

```yaml
a: 3
b: 5
ok: true
```

You can't declare a variable of tuple type, but tuples are central to the
**programming theorems**: many of them return several values at once.
`MAX` returns an (index, value) pair, and `SEARCH` returns a (found, index) pair.
You take them apart by putting a tuple of variables on the left side:

```speci
In: n∈N, x∈Z[1..n]
Out: ind∈N, val∈Z
Pre: n>0
Post: (ind, val)=MAX(i=1..n, x[i])
```

```yaml
n: 4
x: [3, 9, -2, 9]
ind: 2
val: 9
```

Leave a position empty to ignore that component: `(ind,)=MAX(…)` keeps only
the index, and `(,val)=MAX(…)` keeps only the value. See
[Maximum and minimum](ch06-03-max-min.md) for details.

Functions can return tuples too: `swap:Z x Z->Z x Z, swap(a,b)=(b,a)`. The
components of a theorem result can also be accessed **by name**, for example
`.maxval` and `.maxind` for `MAX`. The worked example
[Yossarian's map](ch09-02-yossarian.md) uses this.
