# The data format

Test data is written in **YAML**, one variable per line:
`name`, a colon, **a space**, then the value.

```yaml,fragment
n: 5
```

> [!TIP]
> Press <kbd>Shift</kbd>+<kbd>Space</kbd>, then <kbd>Tab</kbd> in an empty
> test case. The editor generates a template with every declared variable
> in the right format.

## Scalars

| Type | Example |
|------|---------|
| `N`, `Z` | `n: 5`, `d: -3` |
| `R` | `avg: 2.75` |
| `L` | `found: true`, `found: false` |
| `S` | `name: Anna`, `name: "Anna Kiss"`, `empty: ""` |
| `C` | `c: 'x'` |

Quotes around strings are optional, unless the text is empty or contains
characters YAML treats specially (`:`, `#`, leading spaces, …).

## Arrays

In square brackets, separated by commas:

```yaml,fragment
nums: [3, 72, 81, 4, 5]
names: [Anna, Bence, "Cili Kovács"]
empty: []
```

The YAML list form, one item per line with a dash, also works:

```yaml,fragment
nums:
  - 3
  - 72
  - 81
```

## Matrices

A list of rows. It can be written on several lines for readability, or on a single line:

```yaml,fragment
coffee: [
  [4, 5, 7, 5],
  [6, 8, 7, 9],
  [4, 5, 7, 5]
]
```

```yaml,fragment
coffee: [[4,5,7,5],[6,8,7,9],[4,5,7,5]]
```

Every row must have the declared number of columns.

## Records

**Multi-line form.** Each field on its own line, indented under the variable:

```yaml,fragment
r:
  name: Anna
  grade: 5
```

**Compact form**, in braces:

```yaml,fragment
r: {name: Anna, grade: 5}
```

## Arrays of records

The multi-line form uses a dash for each element, with that element's
fields indented under it:

```yaml,fragment
races:
  - name: AS
    time: 37
  - name: BE
    time: 31
```

In the compact form, a list of `{…}` items:

```yaml,fragment
races: [{name: AS, time: 37}, {name: BE, time: 31}]
```

Both are equivalent. The multi-line form is easier to read, and the compact
form fits large data into less space.

> [!WARNING]
> YAML is **sensitive to indentation**. The fields of a record must line up
> exactly. Use spaces, not tabs.

## A complete example

```speci
In: n∈N, races∈Race[1..n], Race=(name:S x time:N), limit∈R
Aux: found∈L, ind∈N
Out: winner∈S
Pre: n>0
Post: (found,ind)=SEARCH(i=1..n, races[i].time<limit) and
      (found -> winner=races[ind].name)
```

```yaml
n: 3
races:
  - name: AS
    time: 37
  - name: BE
    time: 31
  - name: FG
    time: 30
limit: 31.5
found: true
ind: 2
winner: BE
```

```yaml
n: 2
races: [{name: AS, time: 37}, {name: BE, time: 41}]
limit: 30
found: false
ind: 0
winner: ""
```

## Common data errors

| Symptom | Likely cause |
|---------|--------------|
| a value "doesn't fit" an array | the array has a different length than its declared range, e.g. `n: 3` with 4 elements |
| a negative number is rejected | the variable is declared `N`, so make it `Z` |
| a field is "missing" | the field name is misspelled, or has different capitalisation |
| the record is read wrongly | indentation is off by one space |
| `exists` causes trouble | it's a reserved word; rename the variable (see [Search](ch06-06-search.md)) |
