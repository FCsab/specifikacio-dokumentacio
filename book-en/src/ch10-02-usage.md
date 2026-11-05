# Using the editor

The window is laid out like the online editor: the specification on the left,
the test cases on the right, and the evaluation below.

## Evaluation

Everything is re-evaluated **automatically** in the background as you type, and
the test tabs turn green or red. Untick **Auto** if you'd rather evaluate
manually with **Evaluate** (<kbd>Ctrl</kbd>+<kbd>Enter</kbd>).

When evaluation finds an error, its line is tinted in the editor. Click the
location on an error card to jump there.

## Writing with completion

The editor has syntax highlighting, line numbers and context-aware completion:

- at the start of a line it offers the **block headers**,
- after `∈` it offers **set names**,
- elsewhere it offers the **variables, types and functions** you have declared,
- **theorem macros and quantifiers** are inserted as snippets: `SUM` becomes
  `SUM(i=1..n, |)` with the cursor at the `|`,
- typing `forall`, `exists` or `leq` inserts `∀`, `∃` or `≤`.

Use <kbd>↑</kbd> <kbd>↓</kbd> to choose, <kbd>Tab</kbd> or <kbd>Enter</kbd> to
insert, and <kbd>Esc</kbd> to close the list.

## Special characters

Use the symbol buttons, or <kbd>Alt</kbd>+<kbd>1</kbd> … <kbd>Alt</kbd>+<kbd>6</kbd>:

| Keys | Symbol |
|------|:------:|
| <kbd>Alt</kbd>+<kbd>1</kbd> | `∈` |
| <kbd>Alt</kbd>+<kbd>2</kbd> | `∀` |
| <kbd>Alt</kbd>+<kbd>3</kbd> | `∃` |
| <kbd>Alt</kbd>+<kbd>4</kbd> | `≠` |
| <kbd>Alt</kbd>+<kbd>5</kbd> | `≤` |
| <kbd>Alt</kbd>+<kbd>6</kbd> | `≥` |

## The stepper

Pick **Stepper** in the Evaluation pane to walk through the selected test case
one reduction at a time:

- the formula is shown with the part being evaluated highlighted, along with its
  value and the current loop variables,
- `↓`/`↑` mark entering and leaving your `Fn:` functions. Inside a
  function, its body becomes the formula shown,
- step with <kbd>←</kbd> / <kbd>→</kbd>, the buttons or the slider,
- **Step list** shows every step at once. Click one to jump to it.

## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| <kbd>Ctrl</kbd>+<kbd>Enter</kbd> | evaluate |
| <kbd>Ctrl</kbd>+<kbd>N</kbd> | new specification |
| <kbd>Ctrl</kbd>+<kbd>O</kbd> | open a `.sp` file |
| <kbd>Ctrl</kbd>+<kbd>S</kbd> | save |
| <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> | save as |
| <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> | copy the whole project as one line |
| <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd> | paste a project (or plain specification text) |
| <kbd>Alt</kbd>+<kbd>1</kbd>…<kbd>6</kbd> | `∈ ∀ ∃ ≠ ≤ ≥` |
| <kbd>←</kbd> / <kbd>→</kbd> | previous / next step in the stepper |

## Appearance

Light, dark or system theme, and an adjustable font size. The interface uses
the 0xProto font, with Noto Sans Math as the fallback for `∈ ∀ ∃`. Both are
embedded in the program.
