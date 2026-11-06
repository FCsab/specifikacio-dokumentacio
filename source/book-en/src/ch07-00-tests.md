# Test cases

A specification is only useful if it is *right*, and the editor checks that
with your **test cases**. A test case is one concrete example of the task: a
specific input and the output you expect for it. The editor checks that the
example satisfies the specification.

What a test case contains:

- a value for **every input** variable,
- the expected value of the **output** variables,
- a value for **every auxiliary** variable, even one whose value doesn't
  matter (for example `ind` when `SEARCH` found nothing; any valid value will do).

Constant arrays declared with a value (`x∈N[]=[…]`) are the exception: leave
them out, a test that repeats them is red.

If an output or auxiliary value is missing, the test is red with an
"incomplite type for …: undefined is not …" message. (speci-local instead fills
in such values and shows them.)

## The status of a test

After **Evaluate**, every test tab is coloured:

| Colour | Meaning |
|--------|---------|
| **green** | the data matches the types, the input satisfies the precondition, and the postcondition is true |
| **red** | a type mismatch, the precondition is false, or the postcondition is false |

A red test can mean two different things: the specification is wrong, or the
*expected output* in the test is wrong. When a test turns red, check both.

## Managing tests

- **`+`** adds a new test case tab,
- **`-`** deletes the selected one,
- clicking a tab selects it. The Visualization pane always shows the
  selected test.

The course recommends **at least three test cases** for every
specification.

## In this chapter

- [The data format](ch07-01-format.md): how to write numbers, strings,
  arrays, matrices and records.
- [Writing a good test suite](ch07-02-good-tests.md): which test cases to
  choose.
