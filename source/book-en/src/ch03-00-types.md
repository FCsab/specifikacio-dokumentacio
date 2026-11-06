# Types and data

Every variable is declared as an **element of a set**:

```speci,fragment
a∈N
```

This reads "*a* is one element of the set of natural numbers". The set
plays the role of the type. The editor uses it to check the test data, and it
restricts which values the variable may take.

You can type `∈` with the **Insert** button, or write the word `in`
(Hungarian: `eleme`) instead:

```speci,online
In: a in N, b∈Z
Out: c∈Z
Pre: -
Post: c=a+b
```

```yaml
a: 3
b: -5
c: -2
```

The sets you can use are built from a few simple pieces:

| Kind | Example | Chapter |
|------|---------|---------|
| Elementary sets | `N`, `Z`, `R`, `L`, `S`, `C` | [Elementary sets and intervals](ch03-01-sets.md) |
| Intervals | `[1..10]` | [Elementary sets and intervals](ch03-01-sets.md) |
| Arrays (sequences) | `N[1..n]`, `Z[]` | [Arrays](ch03-02-arrays.md) |
| Matrices | `Z[1..n,1..m]` | [Matrices and arrays of arrays](ch03-03-matrices.md) |
| Records (direct products) | `(name:S x age:N)` | [Records and tuples](ch03-04-records.md) |
| Your own names | `Student=(name:S x grade:N)` | [Naming your own sets](ch03-05-aliases.md) |

The pieces can be combined freely, for example into an array of records whose
fields are arrays.
