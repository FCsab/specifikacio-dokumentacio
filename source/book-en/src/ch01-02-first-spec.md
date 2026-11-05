# Your first specification

Let's solve a small task completely, from the problem statement to a green test.

> **Task.** We are given *n* natural numbers. How many of them are odd?

## Step 1: Decide the data

Read the task and list what goes **in** and what comes **out**:

- in: how many numbers there are (`n`) and the numbers themselves (`nums`),
- out: the count of odd numbers (`cnt`).

In the editor, every piece of data is declared as *name ∈ set*. A natural
number is an element of `N`, and *n* natural numbers indexed from 1 to *n* are
an element of `N[1..n]`:

```speci,fragment
In: n∈N, nums∈N[1..n]
Out: cnt∈N
```

Variable names start with a lowercase letter. Set names (`N`, `Z`, …) start
with an uppercase letter. Declarations in one block are separated by commas.

## Step 2: The precondition

The precondition says what must be true about the input. Here any input makes
sense, so the precondition is simply "true". The usual way to write that is a
dash:

```speci,fragment
Pre: -
```

## Step 3: The postcondition

The postcondition states what must be true of the output. `cnt` is *the number
of indices i between 1 and n for which nums[i] is odd*. This is the
**counting** pattern, and the editor has a macro for it:

```speci,fragment
Post: cnt=COUNT(i=1..n, nums[i] mod 2 = 1)
```

`COUNT(i=1..n, condition)` goes through `i = 1, 2, …, n` and counts how many
times the condition holds. `mod` is the remainder operator, so
`nums[i] mod 2 = 1` means "nums[i] is odd".

Put together, the specification looks like this. Type it into the
Specification pane (use the **Insert** buttons for `∈`):

```speci
In: n∈N, nums∈N[1..n]
Out: cnt∈N
Pre: -
Post: cnt=COUNT(i=1..n, nums[i] mod 2 = 1)
```

## Step 4: A test case

Click into the Data pane and write a test. The input values come first, then
the output value you expect:

```yaml
n: 5
nums: [3, 72, 81, 4, 5]
cnt: 3
```

Three of the five numbers (3, 81 and 5) are odd, so we expect `cnt: 3`.

## Step 5: Evaluate

Press **Evaluate**. The test tab turns **green**: with this input and this
output, the postcondition is true.

Now see what a mistake looks like. Add a second test case with `+` and enter a
wrong expectation on purpose:

```yaml,red
n: 5
nums: [3, 72, 81, 4, 5]
cnt: 2
```

This tab turns **red**: `COUNT` gives 3, but the test says 2. Open the
Visualization pane to watch the evaluation step by step.

> [!NOTE]
> The editor doesn't "run a program". It checks a **statement**: *the given
> output fits the given input*. That's why every test case must contain the
> expected output too. You are describing the answer, not computing it.

## Step 6: More tests

A single test proves little. Add a few that probe the edges of the task:

```yaml
n: 3
nums: [2, 4, 6]
cnt: 0
```

```yaml
n: 0
nums: []
cnt: 0
```

The second one is an empty input. `COUNT` over the empty range `1..0` is 0.
Chapter [Writing a good test suite](ch07-02-good-tests.md) explains how to
choose tests systematically.

## The same in Hungarian

The editor accepts the Hungarian keywords too. This specification is exactly
equivalent:

```speci
Be: n∈N, szamok∈N[1..n]
Ki: db∈N
Ef: -
Uf: db=DARAB(i=1..n, szamok[i] mod 2 = 1)
```

```yaml
n: 5
szamok: [3, 72, 81, 4, 5]
db: 3
```

Here `Be`, `Ki`, `Ef`, `Uf` stand for *bemenet* (input), *kimenet* (output),
*előfeltétel* (precondition) and *utófeltétel* (postcondition), and `DARAB` is
the Hungarian name of `COUNT`.

## What's next

You have written, tested and evaluated a complete specification. The next
section shows how to save it. After that, [Part II](ch02-00-structure.md)
explains each element of the language in detail.
