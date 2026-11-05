# Writing a good test suite

A green test shows that the specification fits *one* example. A good test
suite chooses examples that would catch the most likely mistakes. Aim for at
least three tests, chosen from these categories:

| Category | Question it answers | Example (for "first negative element") |
|----------|---------------------|----------------------------------------|
| **nominal** | does it work on a typical input? | `[3, -2, 5, -7]` → index 2 |
| **negative** | what if there is no answer? | `[3, 2, 5]` → not found |
| **boundary** | what happens at the edges? | match at the first or last position, n = 1, n = 0 |
| **tie** | what if several elements qualify? | two equal maxima → the first one |

## A worked example

> *Search: the index of the first day on which it rained more than 10 mm.*

```speci
In: n∈N, rain∈N[1..n]
Aux: found∈L
Out: day∈N
Pre: -
Post: (found,day)=SEARCH(i=1..n, rain[i]>10)
```

Nominal, with several matches (the *first* one must be chosen):

```yaml
n: 5
rain: [0, 12, 3, 25, 0]
found: true
day: 2
```

Negative, no rainy day:

```yaml
n: 3
rain: [0, 10, 3]
found: false
day: 4
```

Boundary, a match at the last position and a value exactly at the
threshold (10 must not count):

```yaml
n: 3
rain: [10, 10, 11]
found: true
day: 3
```

Boundary, an empty input:

```yaml
n: 0
rain: []
found: false
day: 1
```

## Tips

- **Write the expected output by hand, from the task statement**, not by
  reading what the editor computes. Otherwise the test only confirms the
  specification and tests nothing.
- **Include a test that should fail**, at least while developing. Change the
  expected output in a copy of a green test and check that it turns red. If it
  doesn't, the specification doesn't constrain that output.
- **Test the precondition's edges.** If `Pre: n>0`, a test with `n: 1` is
  more interesting than one with `n: 10`.
- **Use the example from the task statement** as one of the tests. Teachers
  usually check it first.
- **Exact-threshold values** (a value equal to `k`) catch `<` vs `≤`
  mistakes, which are among the most common errors.

> [!TIP]
> speci-local computes and shows output values you leave out of a test. That
> is handy when *building* a test suite. Delete the expected output, see what
> the specification computes, and check it against the task statement. Then
> write the correct value back in.
