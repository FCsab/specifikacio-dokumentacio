# Postconditions and theorems

The **postcondition** (`Post:`, Hungarian `Uf:`) is the most important part of
a specification. It is a logical statement about the input **and** the output,
and it is true exactly when the output is a correct answer for the input. It
has to mention every input variable (see
[The all-variables rule](ch02-03-all-variables.md)).

You could write every postcondition with quantifiers alone, and
[Postconditions without theorems](ch06-11-relational.md) shows how. Most
course tasks, though, are instances of a small number of standard
**programming theorems** (*programozási tételek*). Each one is an algorithmic
pattern with a known, proven algorithm. The editor has a macro for each, so the
postcondition can name the pattern directly:

```speci
In: n∈N, nums∈N[1..n]
Out: sum∈N
Pre: -
Post: sum=SUM(i=1..n, nums[i])
```

```yaml
n: 4
nums: [5, 1, 4, 2]
sum: 12
```

Recognising the theorem in the task *is* the algorithm design: once the
postcondition says `SUM`, the algorithm is the summation algorithm.

## The theorems at a glance

In the table, `β(i)` is a logical condition on `i`, and `f(i)` is a value computed from `i`.

| Theorem | Hungarian | Macro | Result |
|---------|-----------|-------|--------|
| [Summation](ch06-01-sum.md) | összegzés | `s=SUM(i=b..e, f(i))`<br>`s=SUM(i=b..e, f(i), β(i))` | number |
| [Counting](ch06-02-count.md) | megszámolás | `c=COUNT(i=b..e, β(i))` (or `DARAB`) | natural number |
| [Maximum selection](ch06-03-max-min.md) | maximumkiválasztás | `(ind,val)=MAX(i=b..e, f(i))` | (index, value) |
| [Minimum selection](ch06-03-max-min.md) | minimumkiválasztás | `(ind,val)=MIN(i=b..e, f(i))` | (index, value) |
| [Decision](ch06-04-decision.md) | eldöntés | `l=EXISTS(i=b..e, β(i))` | logical |
| [Decision (all)](ch06-04-decision.md) | eldöntés (mind) | `l=FORALL(i=b..e, β(i))` | logical |
| [Selection](ch06-05-select.md) | kiválasztás | `ind=SELECT(i≥b, β(i))` | index |
| [Search](ch06-06-search.md) | keresés | `(found,ind)=SEARCH(i=b..e, β(i))` | (logical, index) |
| [Copy](ch06-07-copy.md) | másolás | `y=COPY(i=b..e, f(i))` | array |
| [Multiple item selection](ch06-08-mis.md) | kiválogatás | `(c,y)=MIS(i=b..e, β(i))`<br>`(c,y)=MIS(i=b..e, β(i), f(i))` | (count, array) |
| [Conditional maximum](ch06-09-condmax.md) | feltételes maximumkeresés | `(found,ind,val)=CONDMAX(i=b..e, f(i), β(i))` | (logical, index, value) |
| [Conditional minimum](ch06-09-condmax.md) | feltételes minimumkeresés | `(found,ind,val)=CONDMIN(i=b..e, f(i), β(i))` | (logical, index, value) |

All macros share the same first argument, the **loop range** `i=b..e`. It
names the loop variable (any lowercase name: `i`, `j`, `p`, …) and the
interval it runs through. `SELECT` is the exception: it only has a starting
point, `i≥b`.

## Which theorem do I need?

Start from the question the task asks. What kind of answer does it want?

<div class="decision-tree">
<ul>
<li><strong>A single number</strong> computed from all elements
  <ul>
  <li>their total → <a href="ch06-01-sum.html"><code>SUM</code></a></li>
  <li>how many satisfy a condition → <a href="ch06-02-count.html"><code>COUNT</code></a></li>
  <li>the largest or smallest
    <ul>
    <li>of all elements → <a href="ch06-03-max-min.html"><code>MAX</code> / <code>MIN</code></a></li>
    <li>only among those satisfying a condition → <a href="ch06-09-condmax.html"><code>CONDMAX</code> / <code>CONDMIN</code></a></li>
    </ul></li>
  </ul></li>
<li><strong>Yes or no</strong>
  <ul>
  <li>is there an element with the property? → <a href="ch06-04-decision.html"><code>EXISTS</code></a></li>
  <li>does every element have it? → <a href="ch06-04-decision.html"><code>FORALL</code></a></li>
  </ul></li>
<li><strong>One element</strong> (its index) with a property
  <ul>
  <li>it is guaranteed to exist → <a href="ch06-05-select.html"><code>SELECT</code></a></li>
  <li>it might not exist
    <ul>
    <li>the first one → <a href="ch06-06-search.html"><code>SEARCH</code></a></li>
    <li>the last one → <a href="ch06-06-search.html#searching-from-the-back"><code>SEARCH</code> backwards</a></li>
    </ul></li>
  </ul></li>
<li><strong>Several elements</strong>
  <ul>
  <li>all of them, each transformed → <a href="ch06-07-copy.html"><code>COPY</code></a></li>
  <li>only those with a property → <a href="ch06-08-mis.html"><code>MIS</code></a></li>
  <li>only those with a property, transformed → <a href="ch06-08-mis.html#the-three-argument-form"><code>MIS</code> with 3 arguments</a></li>
  </ul></li>
</ul>
</div>

If the property of an element is *itself* a question about many elements
(for example "every coffee break of the day was above 5 litres"), you need
two theorems, one inside the other. See
[Combining theorems](ch06-10-compound.md).

## Reading a theorem macro

Take `cnt=COUNT(i=1..n, nums[i] mod 2 = 1)`:

| Part | Meaning |
|------|---------|
| `cnt=` | the result is bound to the output variable `cnt` |
| `COUNT` | the theorem: counting |
| `i=1..n` | loop variable `i` runs over 1, 2, …, n |
| `nums[i] mod 2 = 1` | the condition checked for each `i` |

When a theorem returns several values, the left side is a **tuple of
variables**: `(ind, val)=MAX(…)`. Leave a slot empty to ignore that value:
`(ind,)=MAX(…)` or `(found,,val)=CONDMAX(…)`.

## Theorems can be combined with `and`

A postcondition can contain several theorems, each binding its own outputs:

```speci
In: n∈N, x∈Z[1..n]
Out: s∈Z, c∈N
Pre: -
Post: s=SUM(i=1..n, x[i]) and c=COUNT(i=1..n, x[i]<0)
```

```yaml
n: 4
x: [3, -1, -4, 10]
s: 8
c: 2
```

A later theorem may use the result of an earlier one, for example an
auxiliary variable. This is how multi-step tasks are written. See
[Combining theorems](ch06-10-compound.md).
