# The all-variables rule

> [!IMPORTANT]
> **Every input variable must appear in the postcondition.** The editor
> checks this and rejects the specification otherwise.

The idea behind the rule is that if an input doesn't influence the result,
either it isn't really input, or the postcondition forgot about it. The
official manual puts it this way: *"The postcondition must include all declared
data."*

## What the error looks like

```speci,error
In: n∈N, x∈N[1..n], extra∈N
Out: s∈N
Pre: extra>0
Post: s=SUM(i=1..n, x[i])
```

The editor answers:

```text
Line 1, column 21: extra is missing from the post condition!
```

Three details about this message:

- It points at the variable's **declaration**, not at the postcondition. A
  red mark inside the `In:` block means "this input is never used".
- Using the variable **only in the precondition doesn't count**, as the example
  shows with `extra>0`.
- This check runs after everything else has been parsed. If this is the only
  error you get, the syntax of the whole specification is fine.

## Using a variable "indirectly"

A variable counts as used if it appears **anywhere** in the postcondition: as
a loop bound, inside an index, or inside a function the postcondition calls.
Here `n` appears only as the upper bound of the range, and `k` only inside the
function:

```speci
In: n∈N, k∈N, x∈N[1..n]
Out: c∈N
Fn: big:N->L, big(i)=x[i]>k
Pre: -
Post: c=COUNT(i=1..n, big(i))
```

```yaml
n: 4
k: 5
x: [3, 8, 6, 1]
c: 2
```

## Filling the gap: `n=n`

Sometimes a pattern really doesn't need an input. The typical case is
[`SELECT`](ch06-05-select.md), which has no upper bound. Then add a trivially
true identity to the postcondition:

```speci
In: n∈N, nums∈Z[1..n]
Out: ind∈N
Pre: ∃i∈[1..n]:(nums[i] mod 2 = 1)
Post: ind=SELECT(i>=1, nums[i] mod 2 = 1) and n=n
```

```yaml
n: 5
nums: [23, 25, 26, 28, 29]
ind: 1
```

`n=n` is always true, so it doesn't change the meaning, but `n` now appears in
the postcondition. If several variables are unused, chain them:
`… and n=n and k=k`.

> [!NOTE]
> The rule covers the **input** variables. Auxiliary and output variables are
> constrained by the postcondition anyway, because that's their whole point.
