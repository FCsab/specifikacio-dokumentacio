# speci-local: the offline editor

[**speci-local**](https://github.com/FCsab/speci-local) is an offline
replacement for the ELTE Specification Editor, written by csabi.zip. It's a
single native program for Linux and Windows. It needs no login, no network and no
browser.

You write the specification and the YAML test cases exactly as in the online
editor. speci-local evaluates everything **automatically as you type**, and
each test tab turns green or red.

## Why use it?

- **It works when the university login doesn't.** Write and test your
  specification anywhere: on a train, at home, or the night before the deadline
  when the server is slow.
- **Its error messages are more detailed.** Every message shows the line, a
  caret under the problem, an explanation and a concrete fix. When a postcondition
  fails, it tells you *which part* failed and what the specification computes,
  for example "`cnt`: the test case says 2, the specification gives 3".
- **It checks the same rules as the ELTE editor**: the all-variables rule,
  reserved names such as `exists`, block order, header spelling. A
  specification that is green here should also be green there.
- **It fills in missing outputs.** Values you leave out of a test case are
  computed and shown, which helps when you're writing tests.
- **It completes as you type**: headers, set names, your variables and
  functions, and theorem snippets.
- **Your work is plain files.** `.sp` files can be pasted into the ELTE editor
  as-is.

Every example in this book is checked automatically with speci-local.

## In this chapter

- [Installing](ch10-01-install.md)
- [Using the editor](ch10-02-usage.md)
- [Files and sharing](ch10-03-files.md)
- [Differences from the online editor](ch10-04-differences.md)
