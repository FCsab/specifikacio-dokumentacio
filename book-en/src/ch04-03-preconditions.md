# Writing preconditions

The **precondition** (`Pre:`, Hungarian `Ef:`) is a statement about the
**input**. It must be true for the task to make sense. If a test case's input
violates it, the test is red, whatever the output.

The precondition block is **required**. When the task puts no restriction on
the input, write one of these equivalent forms:

```speci,fragment
Pre: -
Pre: true
Pre: not false
Pre: 3=3
```

The dash is the usual convention.

## Typical preconditions

**Ranges of single values.** *a is between 2 and 7.* Three equivalent forms:

```speci,fragment
Pre: a∈[2..7]
Pre: 2≤a≤7
Pre: a≥2 and a≤7
```

**Positive sizes.** *There is at least one element:*

```speci,fragment
Pre: n>0
```

**Constraints on every element.** *Every price is between 1 and 10 000:*

```speci,fragment
Pre: ∀i∈[1..n]:(1≤price[i]≤10000)
```

**Relations between inputs.** *1 < d < n:*

```speci,fragment
Pre: 1<d<n
```

**Guarantees the postcondition relies on.** *There is an odd number*,
required by [`SELECT`](ch06-05-select.md):

```speci,fragment
Pre: ∃i∈[1..n]:(nums[i] mod 2 = 1)
```

Statements can be combined with `and`. Don't forget the operator between
them: two statements written one after the other are a syntax error.

## Example

> *We are given the heights of n ≥ 1 children in centimetres (each between 50
> and 250). What is the average height?*

```speci
In: n∈N, h∈N[1..n]
Out: avg∈R
Pre: n≥1 and ∀i∈[1..n]:(50≤h[i]≤250)
Post: avg=SUM(i=1..n, h[i])/n
```

```yaml
n: 4
h: [120, 130, 125, 135]
avg: 127.5
```

Input that violates the precondition makes the test red:

```yaml,red
n: 2
h: [120, 300]
avg: 210
```

> [!WARNING]
> **Copy bounds from the statement one by one.** A precondition that is
> too *loose* never shows up as a red test. Your tests pass while the
> specification accepts inputs the task forbids. Check every number in your
> `Pre:` against the statement.

## What doesn't belong in the precondition

- Statements about the **output**. The precondition only restricts the input.
- Things already guaranteed by the **types**. `n∈N` already excludes −1, so
  `n≥0` adds nothing.
- The answer itself. Even when you know "the answer exists", the
  postcondition still has to say what it is.
