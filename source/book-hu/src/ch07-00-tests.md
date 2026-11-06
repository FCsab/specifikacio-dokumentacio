# Tesztesetek

Egy specifikáció csak akkor ér valamit, ha *helyes*, és ezt a szerkesztő a
**teszteseteid** segítségével ellenőrzi. Egy teszteset a feladat egy konkrét
példája: egy adott bemenet és a rá várt kimenet. A szerkesztő azt ellenőrzi,
hogy a példa megfelel-e a specifikációnak.

Egy teszteset tartalma:

- **minden bemeneti** változó értéke,
- a **kimeneti** változók elvárt értéke,
- **minden segédváltozó** értéke, akkor is, ha mindegy, mi az (például az
  `ind`, amikor a `SEARCH` nem talált semmit; bármilyen érvényes érték jó).

Kivételek a kezdőértékkel deklarált konstans tömbök (`x∈N[]=[…]`): ezeket hagyd
ki, az a teszt, amely megismétli őket, piros.

Ha egy kimeneti vagy segédérték hiányzik, a teszt piros, „incomplite type for
…: undefined is not …” üzenettel. (A speci-local ehelyett kiszámolja és
megmutatja az ilyen értékeket.)

## A teszt állapota

Az **Evaluate** után minden teszt füle színt kap:

| Szín | Jelentés |
|------|----------|
| **zöld** | az adat illik a típusokra, a bemenet teljesíti az előfeltételt, és az utófeltétel igaz |
| **piros** | típushiba, hamis előfeltétel vagy hamis utófeltétel |

A piros teszt kétféle dolgot jelenthet: hibás a specifikáció, vagy hibás a
tesztben megadott *elvárt kimenet*. Ha egy teszt piros lesz, mindkettőt
ellenőrizd.

## Tesztek kezelése

- a **`+`** új teszteset-fület ad hozzá,
- a **`-`** törli a kiválasztottat,
- egy fülre kattintva kiválasztod. A Visualization panel mindig a
  kiválasztott tesztet mutatja.

A tárgy legalább **három tesztesetet** javasol minden specifikációhoz.

## A fejezet tartalma

- [Az adatformátum](ch07-01-format.md): hogyan írjunk számokat, szövegeket,
  tömböket, mátrixokat és rekordokat.
- [Jó tesztkészlet írása](ch07-02-good-tests.md): milyen teszteseteket
  válasszunk.
