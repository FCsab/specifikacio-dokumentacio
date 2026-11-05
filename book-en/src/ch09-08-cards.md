# Card values

> *Write a program that tells you how much a Hungarian card is worth in the
> game of 21!* The cards are `also, felso, kiraly, VII, VIII, IX, X, asz`, worth
> `2, 3, 4, 7, 8, 9, 10, 11`.

## Analysis

- The card names and their values are **fixed data**, part of the task rather
  than the input. They become **constant arrays** declared with their values.
- The real input is a single card name `lap`.
- The answer is "the value at the position where the name matches". A
  relational postcondition with `∃` finds the position and binds the value at once.

## Specification

```speci
Be:

lapok∈S[1..8]=["also","felso","kiraly","VII","VIII","IX","X","asz"],

ertekek∈N[1..8]=[2,3,4,7,8,9,10,11], lap∈S

Ki:

ertek∈N

Ef:

lap!="" and ∃i∈[1..8]:(lapok[i]=lap)

Uf:

∃i∈[1..8]:(lapok[i]=lap and ertek=ertekek[i])
```

- **Blank lines** inside the `Be:` block are allowed.
- The precondition guarantees the card exists, so the postcondition's `∃` can
  always be satisfied.
- No `Sa:` and no `Fv:` are needed: the mapping is data, not logic.

## Tests

The constant arrays are part of the declared input, so they also appear in the
test data:

```yaml
lapok: ["also", "felso", "kiraly", "VII", "VIII", "IX", "X", "asz"]
ertekek: [2, 3, 4, 7, 8, 9, 10, 11]
lap: "asz"
ertek: 11
```

```yaml
lapok: ["also", "felso", "kiraly", "VII", "VIII", "IX", "X", "asz"]
ertekek: [2, 3, 4, 7, 8, 9, 10, 11]
lap: "also"
ertek: 2
```

A card that doesn't exist violates the precondition:

```yaml,red
lapok: ["also", "felso", "kiraly", "VII", "VIII", "IX", "X", "asz"]
ertekek: [2, 3, 4, 7, 8, 9, 10, 11]
lap: "joker"
ertek: 0
```

> [!NOTE]
> The template that <kbd>Shift</kbd>+<kbd>Space</kbd>, <kbd>Tab</kbd> generates
> lists every input, the constant arrays included. If your editor version fills
> them in from the declaration and complains about the duplicates, delete those
> two lines from the test.
