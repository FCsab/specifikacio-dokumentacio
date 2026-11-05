# Introduction

Welcome to *The Specification Editor Book*. It is a complete guide to the
**ELTE Specification Editor** (*Specifikációszerkesztő*), the web application at
<https://progalap.elte.hu/specifikacio/> that is used throughout the course
**PROGRAMMING** (*Programozás alapjai*, `IP-18fPROGEG`) at the Faculty of
Informatics of Eötvös Loránd University.

The editor lets you write a *formal specification* of a programming task:
which data goes in, which data comes out, what must be true of the input, and
what relationship must hold between input and output. It does more than store
the text. It **evaluates** your specification against test cases you provide and
shows, step by step, how it reaches its verdict. A green test means your
specification describes the expected answer, and a red one means it doesn't.

```speci
In: n∈N, nums∈N[1..n]
Out: cnt∈N
Pre: -
Post: cnt=COUNT(i=1..n, nums[i] mod 2 = 1)
```

```yaml
n: 5
nums: [3, 72, 81, 4, 5]
cnt: 3
```

By the end of this book you will be able to read and write specifications like
the one above, and much harder ones, with confidence.

## Who this book is for

The book is for students taking the course, and for anyone else who has to use
the Specification Editor. You don't need prior programming experience. You
should be comfortable with basic mathematical notation such as sets, intervals
and "for every"/"there exists". The book explains everything else as it goes.

## How to use this book

The chapters build on each other, so the first time through, read them in order:

- **Getting started** walks through the user interface and has you write,
  test and share a complete specification within a few minutes.
- **The specification language** covers the grammar in detail: blocks,
  types, expressions, quantifiers and functions.
- **Programming theorems** gives one chapter to each algorithmic pattern
  (`SUM`, `COUNT`, `MAX`, `SEARCH`, `MIS`, `CONDMAX`, …). Each one explains the
  pattern's meaning, its exact syntax, a complete example and the usual mistakes.
- **Testing and evaluation** explains the test-data format, the stepper,
  and what each error message means.
- **Worked examples** solves real course tasks from the problem statement
  to a green test suite.
- **speci-local** describes the offline editor that reimplements the
  online tool, with more detailed error messages.
- The **appendices** are a quick reference: grammar, symbols and keyboard
  shortcuts, an English–Hungarian glossary, and an FAQ.

Once you know your way around, use the search button (<kbd>S</kbd> or <kbd>/</kbd>)
to jump straight to what you need.

## Conventions

Code blocks with a specification look like this:

```speci,fragment
Post: sum=SUM(i=1..n, numbers[i])
```

Test cases (the content of the editor's *Data* pane) are marked **TEST** in
the lower right corner:

```yaml,fragment
n: 3
numbers: [1, 2, 3]
sum: 6
```

A test marked **✗ RED** is *supposed* to fail. It shows what the editor does
when the data doesn't fit the specification.

The editor accepts English keywords (`In:`, `Out:`, `Pre:`, `Post:`, `and`,
`or`) and Hungarian ones (`Be:`, `Ki:`, `Ef:`, `Uf:`, `és`, `vagy`). This book
mostly uses the English forms and always shows the Hungarian equivalent
alongside. Appendix [C](appendix-03-glossary.md) lists every pair.

You'll also see the following callouts:

> [!NOTE]
> Background information that helps you understand *why*.

> [!TIP]
> A shortcut or habit that saves time.

> [!WARNING]
> A mistake that is easy to make and costs points.

> [!IMPORTANT]
> A rule the editor enforces. If you break it, you get an error.

Every complete example in this book (a specification followed by test cases) is
checked automatically with [speci-local](ch10-00-speci-local.md), so you can
copy it into the editor and expect the same result. A few examples use
syntax only the online editor supports. Those are labelled **ONLINE EDITOR**.

## Sources

This book brings together everything known about the tool. Its sources are the
official course manual (*Manual for the Specification Editor tool*, 3rd
edition), the editor's own built-in documentation, many verified course
solutions, and behaviour confirmed by experiment. Where the sources disagreed,
the behaviour of the live editor won. Anything still uncertain is marked as such.

The book was written by [csabi.zip](https://csabi.zip). The source is on
[GitHub](https://github.com/FCsab/specifikacio-dokumentacio), and
corrections are welcome. Every page has an edit button in its top right corner.
