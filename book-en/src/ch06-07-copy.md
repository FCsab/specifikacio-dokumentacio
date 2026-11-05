# Copy: COPY

**Copy** (*másolás*) produces a new array by applying a transformation to
every element of a range.

<div class="syntax-card">

**Form:** `y=COPY(i=b..e, f(i))`<br>
**Result:** an array of `e−b+1` elements, `f(b), f(b+1), …, f(e)`, indexed from 1

</div>

## Example: absolute values

```speci
In: n∈N, numbers∈Z[1..n]
Out: target∈N[1..n]
Pre: -
Post: target=COPY(i=1..n, ABS(numbers[i]))
```

```yaml
n: 4
numbers: [3, -5, 0, -1]
target: [3, 5, 0, 1]
```

The output array is declared with the same size as the input: `N[1..n]`.

## Example: converting units

> *We have n temperatures in Celsius. Give them in Fahrenheit.*

```speci
In: n∈N, c∈R[1..n]
Out: f∈R[1..n]
Pre: -
Post: f=COPY(i=1..n, c[i]*9/5+32)
```

```yaml
n: 3
c: [0, 100, -40]
f: [32, 212, -40]
```

## Extracting a field

`COPY` can also pick one field out of an array of records:

```speci
In: n∈N, st∈Student[1..n], Student=(name:S x grade:N)
Out: names∈S[1..n]
Pre: -
Post: names=COPY(i=1..n, st[i].name)
```

```yaml
n: 2
st: [{name: Anna, grade: 5}, {name: Bence, grade: 3}]
names: [Anna, Bence]
```

## COPY versus MIS

`COPY` keeps **every** element. When only some elements should go into the
result, use [`MIS`](ch06-08-mis.md), whose output length depends on the data.
