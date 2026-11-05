# Tesztesetek

Egy specifikáció csak akkor ér valamit, ha *helyes*, és ezt a szerkesztő a
**teszteseteid** segítségével ellenőrzi. Egy teszteset a feladat egy konkrét
példája: egy adott bemenet és a rá várt kimenet. A szerkesztő azt ellenőrzi,
hogy a példa megfelel-e a specifikációnak.

Egy teszteset tartalma:

- **minden bemeneti** változó értéke,
- a **kimeneti** változók elvárt értéke,
- a **segédváltozók** elvárt értéke (ha az utófeltétel megköti őket).

Ha egy kimeneti vagy segédértéket kihagysz, a szerkesztő nem tudja
összehasonlítani. A speci-local kiszámolja és megmutatja az ilyen értékeket.
Ettől még írd ki őket: az elvárás nélküli teszt semmit sem tesztel.

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
