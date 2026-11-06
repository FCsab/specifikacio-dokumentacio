# Expressions and logic

The precondition and the postcondition are **logical statements**: expressions
whose value is `true` or `false`. They are built from

- **values**: variables, constants (`3`, `-1`, `2.5`, `"text"`, `true`), array
  elements (`x[i]`), fields (`r.name`), tuples (`(3,5)`),
- **operators**: arithmetic (`+ - * / mod`), comparison
  (`= ≠ < > ≤ ≥`) and logic (`and or not ->`),
- **quantifiers**: `∀` (for all) and `∃` (there exists),
- **function calls**: built-in (`length(x)`) or your own (`f(i)`),
- **theorem macros**: `SUM`, `COUNT`, `MAX`, … (in
  [Part III](ch06-00-theorems.md)).

```speci
In: n∈N, x∈Z[1..n]
Out: ok∈L
Pre: n>0
Post: ok=(∀i∈[1..n]:(x[i]≥0) and x[1] mod 2 = 0)
```

```yaml
n: 3
x: [4, 7, 0]
ok: true
```

```yaml
n: 3
x: [4, -7, 0]
ok: false
```

## In this chapter

- [Operators](ch04-01-operators.md): arithmetic, comparison and logic,
  with their Hungarian and ASCII forms.
- [Quantifiers: ∀ and ∃](ch04-02-quantifiers.md): statements about many
  elements at once.
- [Writing preconditions](ch04-03-preconditions.md): what belongs in `Pre:`.
