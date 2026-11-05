# Arrays

An **array** (indexed sequence, *tömb*) holds many values of the same type,
each reachable through an index. Write the element set first, then the
index range in square brackets:

```speci,fragment
x∈N[1..3]
```

`x` is a sequence of three natural numbers with indices 1, 2, 3. Its elements are
`x[1]`, `x[2]`, `x[3]`.

## Ways to declare an array

| Declaration | Meaning |
|-------------|---------|
| `x1∈N[1..3]` | exactly 3 elements, indexed 1..3 |
| `x2∈N[-1..1]` | 3 elements, indexed −1, 0, 1 |
| `n∈N, x∈Z[1..n]` | *n* elements, where *n* is also input (the usual course convention) |
| `x3∈N[1..]` | any length, indexed from 1; the test data decides the length |
| `x4∈N[0..]` | any length, indexed from 0 |
| `x5∈N[]` | shorthand for `N[1..]` |
| `x6∈N[]=[5,1,2]` | constant array with initial values |
| `x7∈N[2+3..n*2]` | bounds may be simple expressions |

The most common form is the third: the length *n* is an input, and the array
is `N[1..n]`. The editor then checks that the test data really has *n* elements.

```speci
In: n∈N, temps∈Z[1..n]
Out: s∈Z
Pre: -
Post: s=SUM(i=1..n, temps[i])
```

```yaml
n: 4
temps: [-3, 2, 5, -1]
s: 3
```

If the length in the data doesn't match `n`, the test fails:

```yaml,red
n: 3
temps: [-3, 2, 5, -1]
s: 3
```

## Length and bounds: `length`, `from`, `to`

When the array has an open range (`N[1..]`, `N[]`), you can query its size in
the specification:

| Function | Hungarian | Result |
|----------|-----------|--------|
| `length(x)` | `hossz(x)` | number of elements |
| `from(x)` | `tól(x)` | first index |
| `to(x)` | `ig(x)` | last index |

```speci
In: x∈Z[]
Out: s∈Z
Pre: -
Post: s=SUM(i=1..length(x), x[i])
```

```yaml
x: [10, 20, 30]
s: 60
```

With `from` and `to`, a specification works for any index range. Here the
input is indexed from 0:

```speci
In: x∈Z[0..]
Out: s∈Z
Pre: -
Post: s=SUM(i=from(x)..to(x), x[i])
```

```yaml
x: [10, 20, 30]
s: 60
```

> [!NOTE]
> The Hungarian names `hossz`, `tól`, `ig` appear in the editor's built-in
> documentation. speci-local only understands the English ones.

## Indexing

`x[i]` is the element at index `i`. The index can be any expression:
`x[i+1]`, `x[n]`, `x[-i]`. Reading outside the index range is an error during
evaluation. This often happens when comparing neighbours:

```speci,fragment
// wrong: for i=n, x[i+1] doesn't exist
Post: c=COUNT(i=1..n, x[i]<x[i+1])
// right: stop one earlier
Post: c=COUNT(i=1..n-1, x[i]<x[i+1])
```

## Constant arrays

An array with an initial value is fixed data that is part of the task, for
example a lookup table:

```speci
In: days∈N[1..12]=[31,28,31,30,31,30,31,31,30,31,30,31], m∈[1..12]
Out: d∈N
Pre: -
Post: d=days[m]
```

```yaml
days: [31,28,31,30,31,30,31,31,30,31,30,31]
m: 4
d: 30
```

The worked example [Card values](ch09-08-cards.md) uses the same technique with
strings.

## Array literals

In conditions you can also write arrays directly, but that's rarely needed:

```speci,fragment
[1, 2, 3]=[1, 2, 3]
[0..:1, 2, 3]       // literal with an explicit index range: indices 0..2
```

The second form, a literal with an index range, is only understood by the online
editor.
