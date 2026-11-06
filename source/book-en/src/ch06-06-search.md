# Search: SEARCH

**Linear search** (*keresés*) looks for the first index in a range where a
condition holds. It also reports **whether** there is one.

<div class="syntax-card">

**Form:** `(found,ind)=SEARCH(i=b..e, β(i))`<br>
**Result:** a pair. `found` is a logical value telling whether any `i` in `b..e` satisfies `β(i)`, and `ind` is the first such `i`<br>
**If nothing is found:** `found` is false, and `ind` carries no meaning

</div>

`found` must be declared, usually in `Aux:` (if the task only asks for the
index) or in `Out:` (if the task asks whether there is a match).

## Example: the first negative number

```speci
In: n∈N, x∈Z[1..n]
Aux: found∈L
Out: ind∈N
Pre: -
Post: (found,ind)=SEARCH(i=1..n, x[i]<0)
```

```yaml
n: 5
x: [3, 8, -2, 7, -5]
found: true
ind: 3
```

```yaml
n: 3
x: [3, 8, 7]
found: false
ind: 0
```

> [!WARNING]
> **Don't call the flag `exists`.** Older manuals and screenshots use
> `Aux: exists∈L`, but `exists` is a reserved word (the ASCII form of `∃`), and
> the current editor rejects it with
> `incomplite type for exists: undefined is not boolean`. Use `found`, `van`
> or `talalt`.

## What is `ind` when nothing is found?

When `found` is false, `ind` has no meaningful value. The postcondition only
says something about it when the search succeeds. In practice:

- The editor's step list shows the loop index running past the end, so it
  displays `n+1` (for example `ind: 4` when n = 3).
- In test cases, people write either `ind: 0` or `ind: n+1`. Both pass,
  and so does leaving `ind` out of the test case.

```yaml
n: 3
x: [3, 8, 7]
found: false
ind: 4
```

## Making the output depend on the result

Often the task wants something *derived* from the found element, and only if
there is one. Use an implication. Wrap it in parentheses:

```speci
In: n∈N, names∈S[1..n], ages∈N[1..n]
Aux: found∈L, ind∈N
Out: name∈S
Pre: -
Post: (found,ind)=SEARCH(i=1..n, ages[i]<18) and
      (found -> name=names[ind])
```

```yaml
n: 3
names: [Anna, Bence, Cili]
ages: [21, 17, 15]
found: true
ind: 2
name: Bence
```

```yaml
n: 2
names: [Anna, Dani]
ages: [21, 30]
found: false
ind: 1
name: ""
```

When nothing is found, `found -> …` is true no matter what `name` is.

> [!WARNING]
> `->` is the weakest operator. Without the parentheses,
> `(found,ind)=SEARCH(…) and found -> name=names[ind]` parses as
> `((found,ind)=SEARCH(…) and found) -> name=…`, which is true whenever the
> search part is wrong, so a test with wrong data can still pass. Always
> write `and (found -> …)`.

## A sentinel value instead of a flag

Some tasks don't want a logical value. They want a special output, usually −1,
when there is no match:

> *Print the index of the first tree cheaper than K forints, or −1 if there is
> none.*

Two changes are needed. The output must be `Z` (−1 isn't a natural number),
and the postcondition must produce the −1 itself:

```speci
In: n∈N, k∈N, price∈N[1..n]
Aux: found∈L, ind∈N
Out: res∈Z
Pre: -
Post: (found,ind)=SEARCH(i=1..n, price[i]<k) and
      (found -> res=ind) and
      (not found -> res=-1)
```

```yaml
n: 6
k: 2000
price: [2500, 5300, 1900, 2400, 8800, 5300]
found: true
ind: 3
res: 3
```

```yaml
n: 3
k: 100
price: [2500, 5300, 1900]
found: false
ind: 1
res: -1
```

The worked example [Christmas trees](ch09-09-trees.md) solves the same task
without `SEARCH` as well.

## Searching from the back

To find the **last** matching index, run the search backwards. The trick is to
negate the indices: let `i` run from `-n` to `-1`, look at `x[-i]`, and take the
result as `-ind`:

```speci
In: n∈N, x∈Z[1..n]
Aux: found∈L
Out: ind∈N
Pre: -
Post: (found,-ind)=SEARCH(i=-n..-1, x[-i]<0)
```

```yaml
n: 5
x: [3, -8, 2, -7, 5]
found: true
ind: 4
```

As `i` goes −5, −4, …, −1, `-i` goes 5, 4, …, 1, so the array is scanned from
the end. The first hit is at `i = -4`, which gives `-ind = -4`, so `ind = 4`.
The general form is `(found,-ind)=SEARCH(i=-e..-b, β(-i))`.

## Searching in a compound condition

The condition is often a function containing another theorem, for example
*find a day on which every coffee break was above 5 litres*. That's in
[Catbert's coffee breaks](ch09-04-catbert.md).

## SEARCH, SELECT, EXISTS

| You need | Use |
|----------|-----|
| only *whether* there is a match | [`EXISTS`](ch06-04-decision.md) |
| the first match, which is guaranteed to exist | [`SELECT`](ch06-05-select.md) |
| the first match, which may not exist | `SEARCH` |
