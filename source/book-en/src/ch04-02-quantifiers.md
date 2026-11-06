# Quantifiers: ∀ and ∃

Quantifiers let one statement talk about **every element** of an interval, or
about **at least one** of them. They are the backbone of preconditions and of
many postconditions.

## The universal quantifier ∀

```speci,fragment
∀i∈[1..3]:(i>0)
```

Read: *for every i in [1..3], i > 0 holds.* The general form is

```text
∀variable∈[from..to]:(statement)
```

It is most often used to go through the indices of an array:

```speci
In: n∈N, x∈Z[1..n]
Out: allBig∈L
Pre: -
Post: allBig=∀i∈[1..n]:(x[i]>10)
```

```yaml
n: 3
x: [11, 25, 12]
allBig: true
```

```yaml
n: 3
x: [11, 5, 12]
allBig: false
```

## The existential quantifier ∃

```speci,fragment
∃i∈[1..3]:(i=2)
```

Read: *there is an i in [1..3] for which i = 2.* For arrays, this says that some
element has a property:

```speci
In: n∈N, x∈Z[1..n]
Out: hasSmall∈L
Pre: -
Post: hasSmall=∃i∈[1..n]:(x[i]<3)
```

```yaml
n: 4
x: [7, 9, 2, 8]
hasSmall: true
```

## Word forms

The symbols can be typed as words too:

| Symbol | English word | Hungarian word |
|:------:|--------------|----------------|
| `∀` | `forall` | `minden` |
| `∃` | `exists` | `létezik` |
| `∈` | `in` | `eleme` |

```speci,online
In: n∈N, x∈N[1..n]
Out: ok∈L
Pre: -
Post: ok=forall i in [1..n]:(x[i]>0)
```

```yaml
n: 2
x: [1, 2]
ok: true
```

The Hungarian word forms are from the built-in documentation, and only the online
editor knows them:

```speci,online
Be: n∈N, x∈N[1..n]
Ki: ok∈L
Ef: igaz
Uf: ok=minden i eleme [1..n]:(x[i]>0) és létezik i eleme [1..n]:(x[i]=1)
```

## Open-ended arrays

When the array's length isn't an input, take the bounds from the array itself:

```speci
In: x∈N[]
Out: hasSmall∈L
Pre: -
Post: hasSmall=(∃i∈[1..length(x)]:(x[i]<3) and ∃i∈[from(x)..to(x)]:(x[i]<3))
```

```yaml
x: [5, 1, 9]
hasSmall: true
```

## Nesting

Quantifiers can be nested, for example to talk about every row of a matrix and
the elements within the row. *Every row contains a 10:*

```speci
In: m∈N[1..3,1..3]
Out: ok∈L
Pre: -
Post: ok=∀i∈[1..3]:(∃j∈[1..3]:(m[i,j]=10))
```

```yaml
m: [[10, 0, 0], [0, 10, 0], [1, 2, 10]]
ok: true
```

The inner quantifier can refer to the outer variable. *x is sorted in
non-decreasing order*, meaning every element is at most every later one:

```speci
In: n∈N, x∈Z[1..n]
Out: sorted∈L
Pre: -
Post: sorted=∀i∈[1..n]:(∀j∈[i+1..n]:(x[i]≤x[j]))
```

```yaml
n: 4
x: [1, 3, 3, 8]
sorted: true
```

```yaml
n: 4
x: [1, 3, 2, 8]
sorted: false
```

## Empty ranges

If the interval is empty (for example `[1..0]` when n = 0),

- `∀` is **true**: there is no element that violates the statement,
- `∃` is **false**: there is no element that satisfies it.

You'll use this constantly. `∀j∈[1..i-1]:(…)` is "nothing before i…", and for
i = 1 it is automatically true.

```speci
In: n∈N, x∈Z[1..n]
Out: a∈L, e∈L
Pre: -
Post: a=∀i∈[1..n]:(x[i]>0) and e=∃i∈[1..n]:(x[i]>0)
```

```yaml
n: 0
x: []
a: true
e: false
```

## Quantifiers versus theorems

`∀i∈[1..n]:(β(i))` and `FORALL(i=1..n, β(i))` mean the same thing, and so do
`∃i∈[1..n]:(β(i))` and `EXISTS(i=1..n, β(i))`. The quantifier form is the
mathematical notation used in lectures. The macro form names the programming
theorem (*decision*) and tells the reader which algorithm to use. See
[Decision](ch06-04-decision.md).
