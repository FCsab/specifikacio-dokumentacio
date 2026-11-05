# Solving tasks step by step

This part solves complete tasks, most of them from the course material,
from the problem statement to a green test suite. Each one follows the same
method:

1. **Read the task** and underline what is given and what is asked.
2. **Declare the data.** Inputs, outputs, and any auxiliary values the
   postcondition needs.
3. **Write the precondition** from the constraints in the statement.
4. **Choose the theorem(s)** with the [decision tree](ch06-00-theorems.md#which-theorem-do-i-need).
   Look for nesting ("for each … every …") and for steps ("first … then …").
5. **Write the postcondition.**
6. **Write tests**: the statement's example, a negative case, boundaries.
7. **Evaluate**, and if something is red, use the
   [step list](ch08-01-stepper.md).

| Task | Theorems | Data |
|------|----------|------|
| [The Discworld libraries](ch09-01-discworld.md) | `SEARCH` + implication | array of records |
| [Yossarian's map](ch09-02-yossarian.md) | `MAX` of `MAX` | matrix |
| [Trurl's robots](ch09-03-trurl.md) | `MIS` + nested `SUM` | array |
| [Catbert's coffee breaks](ch09-04-catbert.md) | `SEARCH` + nested `FORALL` | matrix |
| [Dogbert's star](ch09-05-dogbert.md) | `CONDMAX`, slot skipping | open array |
| [The travel agency](ch09-06-travel.md) | relational, or `MAX`+`MIS`+`MIN` | parallel arrays |
| [Divisors](ch09-07-divisors.md) | `DARAB`, filtered `SUM` | a single number |
| [Card values](ch09-08-cards.md) | relational, lookup table | constant arrays |
| [Christmas trees](ch09-09-trees.md) | `SEARCH` with a −1 result, relational | array |
| [More short examples](ch09-10-more.md) | `COUNT`+`FORALL`, `MIS`+`FORALL`, … | various |

The examples are written in the style of their source: the official manual's
tasks in English, the Hungarian course tasks with Hungarian keywords and
names.
