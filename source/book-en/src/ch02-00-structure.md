# Anatomy of a specification

A specification is a sequence of **blocks**. Each block starts with a header
(a keyword followed by a colon) and describes one part of the task:

| Block | English | Hungarian | Required | Contents |
|-------|---------|-----------|:--------:|----------|
| Input | `In:` | `Be:` | **yes** | Declarations of the input data. |
| Auxiliary | `Aux:` | `Sa:` | no | Declarations of helper data used by the postcondition. |
| Output | `Out:` | `Ki:` | **yes** | Declarations of the output data. |
| Functions | `Fn:` | `Fv:` | no | Definitions of helper functions. |
| Precondition | `Pre:` | `Ef:` | **yes** | A logical statement about the input. |
| Postcondition | `Post:` | `Uf:` | **yes** | A logical statement linking input and output. |

Mathematically, the declaration blocks define the *state space* of the task, the
set of all possible combinations of input, auxiliary and output values. The
precondition picks out the *meaningful inputs*, and the postcondition picks out,
for each such input, the *correct outputs*.

Here is a specification that uses all six blocks:

```speci
In: n∈N, k∈N, prices∈N[1..n]
Aux: found∈L, ind∈N
Out: first∈Z
Fn: cheap:N->L, cheap(i)=prices[i]<k
Pre: n≥1
Post: (found,ind)=SEARCH(i=1..n, cheap(i)) and
      (found -> first=ind) and
      (not found -> first=-1)
```

```yaml
n: 4
k: 100
prices: [250, 90, 120, 40]
found: true
ind: 2
first: 2
```

```yaml
n: 2
k: 10
prices: [250, 90]
found: false
ind: 1
first: -1
```

Read it like this: *given n, k and n prices, where n is at least 1, the output
first is the index of the first price below k, or −1 if there is none.* Don't
worry if `SEARCH` isn't clear yet. Its chapter is [Search](ch06-06-search.md).

## In this chapter

- [Blocks and layout](ch02-01-blocks.md): how to write headers, the order
  of the blocks, single-line vs. multi-line layout.
- [Names, comments and reserved words](ch02-02-lexical.md): which names are
  legal and how to comment.
- [The all-variables rule](ch02-03-all-variables.md): the check that
  surprises everyone once.
