# Appendix D: Frequently asked questions

### My test is red, but I'm sure the specification is right.

Then check the test. The most common causes are a wrong expected output, a
miscounted array length (`n: 4` with five elements), a value that doesn't fit
the type (−1 in `N`), and input that violates the precondition. Open the
[step list](ch08-01-stepper.md), or paste everything into speci-local, which
tells you which part is false and what the specification computes.

### "… is missing from the post condition!" What does that mean?

An input variable isn't used in `Post:`. See
[The all-variables rule](ch02-03-all-variables.md). Use it, or add `and n=n`.

### Can I name my flag `exists`?

No. It's a reserved word, even though old material uses it. Use `found`, `van`
or `talalt`. See [Search](ch06-06-search.md).

### What should `ind` be in the test when a search fails?

Anything. When nothing is found, the postcondition doesn't constrain it.
`0` and `n+1` are both common, and you can also leave it out.

### Should I use `SELECT` or `SEARCH`?

`SELECT` only if the precondition **guarantees** that a match exists.
Otherwise use `SEARCH`. See [Selection](ch06-05-select.md).

### Does `MIS` collect the indices or the elements?

With two arguments, the **indices**. To collect the elements (or anything else),
give a third argument: `MIS(i=1..n, β(i), x[i])`. See [MIS](ch06-08-mis.md).

### `In:` or `Be:`?

Both are valid, and they mean exactly the same thing. Use one language
consistently in a file. Hungarian course tasks are usually solved with `Be:`,
`Ki:`, `Ef:`, `Uf:`.

### Do I need a space after the colon?

When the content is on the same line, yes: `In: n∈N`. When the header stands
on its own line, the content simply starts on the next line.

### How do I write "nothing to say" in the precondition?

`Pre: -` (or `Pre: true`).

### Theorems or quantifiers in the postcondition?

Theorems lead to the algorithm, so most tasks want them. Some tasks ask for the
relational (quantifier) form. Both are evaluated. See
[Postconditions without theorems](ch06-11-relational.md).

### How many test cases should I write?

At least three: a typical one, one with no answer (or an empty input), and a
boundary case. See [Writing a good test suite](ch07-02-good-tests.md).

### The editor doesn't load / I can't log in.

Use [speci-local](ch10-00-speci-local.md) offline, and copy the result into
the online editor when it's back.

### How do I share a specification?

Save it, then copy the address (it contains `?uuid=…`). See
[Saving and sharing](ch01-03-save-share.md). With speci-local, send the `.sp`
file or the `SPECI1:` line.

### I found a mistake in this book.

Open an issue on [GitHub](https://github.com/FCsab/specifikacio-dokumentacio/issues).
