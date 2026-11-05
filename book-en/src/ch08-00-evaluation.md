# Evaluation

Once the specification is written and there is at least one test case, press
**Evaluate**. The editor then processes every test case:

1. **Parsing.** The specification is read. A syntax error stops everything
   and is shown in the Specification pane.
2. **Static checks.** Names are resolved, types are checked, and the
   [all-variables rule](ch02-03-all-variables.md) is verified.
3. **Loading the data.** Each test case is read and checked against the
   declared types: lengths, ranges, record fields.
4. **Precondition.** The precondition is evaluated on the input. If it is false,
   the test is red.
5. **Postcondition.** The postcondition is evaluated using the input and the
   expected outputs. If it is true, the test is green, and otherwise it is red.

So the editor doesn't compute the output and compare it with yours.
It evaluates *a statement about* your output. For a theorem macro like
`cnt=COUNT(…)` the difference is invisible: `COUNT` is computed and compared
with `cnt`. For a relational postcondition (`∃i…`) the editor really just
checks whether the statement holds.

## In this chapter

- [Stepper and step list](ch08-01-stepper.md): how to follow the
  evaluation of one test case.
- [Error messages and common mistakes](ch08-02-errors.md): what the
  messages mean and how to fix the most frequent problems.
