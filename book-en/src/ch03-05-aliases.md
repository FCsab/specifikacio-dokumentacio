# Naming your own sets

Any set can be given a name with `Name=Set`. The name starts with an
**uppercase letter**, and the definition goes into a declaration block next
to the variables:

```speci
In: j∈Grade, Grade=[1..5]
Out: ok∈L
Pre: -
Post: ok=(j≥2)
```

```yaml
j: 3
ok: true
```

Use `=` for the definition, not `:=`.

## Why name sets?

Names make complex data readable. Compare

```speci,fragment
h1∈(name:S x grade:N)[1..]
```

with

```speci,fragment
h2∈Student[1..], Student=(name:S x grade:N)
```

The second one says what the data *is*. Once a set has a name you can use it
in several places: in other declarations, in function signatures
(`grade:Student->N`), and inside other named sets.

## Chains and nesting

Names can refer to other names, so you can build long chains:

```speci
In: j2∈Mark, Mark=OneToFive, OneToFive=[1..5]
Out: ok∈L
Pre: -
Post: ok=(j2=j2)
```

```yaml
j2: 5
ok: true
```

They can also be nested to describe deep structures. In this example
each student has a list of grades:

```speci
In: cls∈Class, Class=Student[], Student=(name:S x grades:Grade[]), Grade=[1..5]
Out: c∈N
Pre: -
Post: c=COUNT(i=1..length(cls), length(cls[i].grades)>0)
```

```yaml
cls:
  - name: Anna
    grades: [5, 4, 5]
  - name: Bence
    grades: []
c: 1
```

A definition can come before or after its first use. The built-in documentation
writes `j∈Grade, Grade=[1..5]`. Some course solutions put the record definition
first: `In: Trun=(time:N x loc:S), n∈N, runs∈Trun[1..n]`.

## Where to put the definitions

The definitions go into the declaration blocks (`In:`, `Aux:`, `Out:`) and are
separated from the variables by commas. Convention is to put them in the block
where they're first needed, usually `In:`.
