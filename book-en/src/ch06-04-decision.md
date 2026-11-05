# Decision: EXISTS, FORALL

**Decision** (*eldöntés*) answers a yes/no question about a range: is there an
index with a property (`EXISTS`), or do all of them have it (`FORALL`)?

<div class="syntax-card">

**Form:** `l=EXISTS(i=b..e, β(i))` and `l=FORALL(i=b..e, β(i))`<br>
**Result:** a logical value (`L`)<br>
**Empty range:** `EXISTS` is false, and `FORALL` is true<br>
**Equivalent quantifiers:** `∃i∈[b..e]:(β(i))` and `∀i∈[b..e]:(β(i))`

</div>

## EXISTS: is there…?

> *Is there an odd number among the numbers?*

```speci
In: n∈N, numbers∈N[1..n]
Out: odd∈L
Pre: -
Post: odd=EXISTS(i=1..n, numbers[i] mod 2 = 1)
```

```yaml
n: 4
numbers: [2, 8, 7, 4]
odd: true
```

```yaml
n: 3
numbers: [2, 8, 4]
odd: false
```

## FORALL: is every…?

> *Are all the numbers positive?*

```speci
In: n∈N, numbers∈Z[1..n]
Out: positive∈L
Pre: -
Post: positive=FORALL(i=1..n, numbers[i]>0)
```

```yaml
n: 3
numbers: [5, 1, 9]
positive: true
```

```yaml
n: 3
numbers: [5, 0, 9]
positive: false
```

## The two are related

"Not every element is positive" is the same as "some element is not
positive":

```text
not FORALL(i=1..n, β(i))   =   EXISTS(i=1..n, not β(i))
```

Use whichever reads more naturally for the task.

## Macro or quantifier?

```speci
In: n∈N, x∈Z[1..n]
Out: a∈L, b∈L
Pre: -
Post: a=EXISTS(i=1..n, x[i]<0) and b=∃i∈[1..n]:(x[i]<0)
```

```yaml
n: 3
x: [4, -1, 2]
a: true
b: true
```

The two always give the same value. The difference is intent. The macro says
"this is the *decision* theorem, implement it with the decision algorithm".
The quantifier is a purely logical statement. Preconditions usually use the
quantifier, and postconditions that define an output use the macro.

## As a building block

Decision is often the *inner* part of a compound task. *Find a day on which
every coffee break was above 5 litres* is a search whose condition is a
`FORALL`. See [Catbert's coffee breaks](ch09-04-catbert.md).

```speci
In: n∈N, coffe∈N[1..n,1..4]
Out: someDay∈L
Fn: more5:N->L, more5(i)=FORALL(j=1..4, coffe[i,j]>5)
Pre: -
Post: someDay=EXISTS(i=1..n, more5(i))
```

```yaml
n: 2
coffe: [[6, 6, 6, 5], [7, 8, 9, 6]]
someDay: true
```
