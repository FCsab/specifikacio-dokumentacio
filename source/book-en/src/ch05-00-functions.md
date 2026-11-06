# Functions

The `Fn:` block (Hungarian `Fv:`) defines helper functions, the same way as in
secondary-school mathematics. First comes the signature, with the domain and
range sets, and then the rule that assigns the value:

```speci,fragment
Fn: f:N->N, f(p)=p*2
```

Read: *f maps natural numbers to natural numbers, and f(p) = 2p.*

The block is optional. You need it mostly for **compound tasks**, where one
programming theorem is nested in another (see
[Patterns inside functions](ch05-01-nested.md)). Even in simple tasks, a
well-named function can make the postcondition much easier to read.

## Syntax

```text
Fn: name:Domain->Range, name(parameters)=expression
```

- The **signature** `name:Domain->Range` gives the sets.
- After a comma comes the **definition** `name(parameters)=expression`.
- Several parameters: the domain is a direct product with `x` (spaces on
  both sides!), e.g. `Z x Z`.
- Several results: the range is a direct product too, and the body returns a
  tuple.

> [!TIP]
> Write the arrow as ASCII `->`. The Insert bar has no arrow button, and the
> Unicode `→` is a syntax error everywhere: in signatures and as implication
> alike. The arrows you see in screenshots are `->` drawn by the editor's font.

## Examples

| Definition | Meaning |
|------------|---------|
| `f:N->N, f(p)=p*2` | doubling |
| `square:Z->N, square(n)=n*n` | a more descriptive name |
| `add:Z x Z->Z, add(a,b)=a+b` | two parameters |
| `swap:Z x Z->Z x Z, swap(a,b)=(b,a)` | returns a tuple |
| `f2:Z->Z, f2(p)=p+n` | uses the input variable `n` |
| `grade:Student->N, grade(h)=h.grade` | record parameter |
| `index:N[] x N->N, index(x,i)=x[i]` | array parameter |
| `even:N->L, even(i)=x[i] mod 2 = 0` | logical function |

A complete example:

```speci
In: n∈N, x∈Z[1..n]
Out: s∈N
Fn: square:Z->N, square(a)=a*a
Pre: -
Post: s=SUM(i=1..n, square(x[i]))
```

```yaml
n: 3
x: [1, -2, 3]
s: 14
```

## Seeing the input variables

A function can use every declared variable, not just its parameters. In
the example below, `big` refers to the input `k` and the array `x`. This is
very common: functions usually take only the **index** as a parameter and look
up everything else.

```speci
In: n∈N, k∈N, x∈N[1..n]
Out: c∈N
Fn: big:N->L, big(i)=x[i]>k
Pre: -
Post: c=COUNT(i=1..n, big(i))
```

```yaml
n: 5
k: 10
x: [4, 12, 10, 30, 11]
c: 3
```

If a parameter has the same name as a declared variable, the parameter
**shadows** it: inside the function the name means the parameter.

## Functions with several results

```speci
In: a∈Z, b∈Z
Out: c∈Z, d∈Z
Fn: swap:Z x Z->Z x Z, swap(p,q)=(q,p)
Pre: -
Post: (c,d)=swap(a,b)
```

```yaml
a: 3
b: 8
c: 8
d: 3
```

## Several functions

Give every definition its own `Fn:` header. A comma-separated list in one
block is a syntax error. Each function may use the ones before it:

```speci,online
In: n∈N, x∈N[1..n]
Out: c∈N
Fn: even:N->L, even(v)=v mod 2 = 0
Fn: good:N->L, good(i)=even(x[i]) and x[i]>0
Pre: -
Post: c=COUNT(i=1..n, good(i))
```

```yaml
n: 5
x: [0, 2, 3, 8, 7]
c: 2
```

## Record parameters

```speci
In: n∈N, st∈Student[1..n], Student=(name:S x grade:N)
Out: s∈N
Fn: grade:Student->N, grade(h)=h.grade
Pre: -
Post: s=SUM(i=1..n, grade(st[i]))
```

```yaml
n: 2
st: [{name: Anna, grade: 5}, {name: Bence, grade: 3}]
s: 8
```
