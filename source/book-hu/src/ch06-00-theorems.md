# Utófeltételek és tételek

Az **utófeltétel** (`Uf:`, angolul `Post:`) a specifikáció legfontosabb része.
Logikai állítás a bemenetről **és** a kimenetről, és pontosan akkor igaz, ha a
kimenet helyes válasz a bemenetre. Minden bemeneti változót említenie kell
(lásd [A minden-változó szabály](ch02-03-all-variables.md)).

Minden utófeltételt meg lehetne írni pusztán kvantorokkal, az
[Utófeltétel tételek nélkül](ch06-11-relational.md) fejezet meg is mutatja,
hogyan. A tárgy feladatainak többsége azonban néhány szabványos **programozási
tétel** példánya. Mindegyik egy algoritmikus minta, ismert és bizonyított
algoritmussal. A szerkesztőben mindegyikhez tartozik egy makró, így az
utófeltétel közvetlenül megnevezheti a mintát:

```speci
Be: n∈N, szamok∈N[1..n]
Ki: osszeg∈N
Ef: -
Uf: osszeg=SUM(i=1..n, szamok[i])
```

```yaml
n: 4
szamok: [5, 1, 4, 2]
osszeg: 12
```

A tétel felismerése a feladatban maga az algoritmustervezés: ha az utófeltétel
`SUM`-ot mond, az algoritmus az összegzés algoritmusa.

## A tételek áttekintése

A táblázatban a `β(i)` egy `i`-től függő logikai feltétel, az `f(i)` pedig egy
`i`-ből kiszámolt érték.

| Tétel | Angolul | Makró | Eredmény |
|-------|---------|-------|----------|
| [Összegzés](ch06-01-sum.md) | summation | `s=SUM(i=e..u, f(i))`<br>`s=SUM(i=e..u, f(i), β(i))` | szám |
| [Megszámolás](ch06-02-count.md) | counting | `c=DARAB(i=e..u, β(i))` (vagy `COUNT`) | természetes szám |
| [Maximumkiválasztás](ch06-03-max-min.md) | maximum selection | `(ind,ert)=MAX(i=e..u, f(i))` | (index, érték) |
| [Minimumkiválasztás](ch06-03-max-min.md) | minimum selection | `(ind,ert)=MIN(i=e..u, f(i))` | (index, érték) |
| [Eldöntés](ch06-04-decision.md) | decision | `l=EXISTS(i=e..u, β(i))` | logikai |
| [Eldöntés (mind)](ch06-04-decision.md) | decision (all) | `l=FORALL(i=e..u, β(i))` | logikai |
| [Kiválasztás](ch06-05-select.md) | selection | `ind=SELECT(i>=e, β(i))` | index |
| [Keresés](ch06-06-search.md) | search | `(van,ind)=SEARCH(i=e..u, β(i))` | (logikai, index) |
| [Másolás](ch06-07-copy.md) | copy | `y=COPY(i=e..u, f(i))` | tömb |
| [Kiválogatás](ch06-08-mis.md) | multiple item selection | `(db,y)=MIS(i=e..u, β(i))`<br>`(db,y)=MIS(i=e..u, β(i), f(i))` | (darabszám, tömb) |
| [Feltételes maximumkeresés](ch06-09-condmax.md) | conditional maximum | `(van,ind,ert)=CONDMAX(i=e..u, f(i), β(i))` | (logikai, index, érték) |
| [Feltételes minimumkeresés](ch06-09-condmax.md) | conditional minimum | `(van,ind,ert)=CONDMIN(i=e..u, f(i), β(i))` | (logikai, index, érték) |

Minden makró első argumentuma ugyanaz: a **ciklustartomány**, `i=e..u`. Ez
megnevezi a ciklusváltozót (bármilyen kisbetűs név: `i`, `j`, `p`, …), és
megadja az intervallumot, amelyet bejár. Kivétel a `SELECT`: annak csak
kezdőpontja van, `i>=e`.

## Melyik tétel kell?

Abból indulj ki, mit kérdez a feladat. Milyen választ vár?

<div class="decision-tree">
<ul>
<li><strong>Egyetlen számot</strong>, amelyet az összes elemből számolunk
  <ul>
  <li>az összegüket → <a href="ch06-01-sum.html"><code>SUM</code></a></li>
  <li>hány elem teljesít egy feltételt → <a href="ch06-02-count.html"><code>DARAB</code> / <code>COUNT</code></a></li>
  <li>a legnagyobbat vagy a legkisebbet
    <ul>
    <li>az összes elem közül → <a href="ch06-03-max-min.html"><code>MAX</code> / <code>MIN</code></a></li>
    <li>csak a feltételt teljesítők közül → <a href="ch06-09-condmax.html"><code>CONDMAX</code> / <code>CONDMIN</code></a></li>
    </ul></li>
  </ul></li>
<li><strong>Igen vagy nem</strong> választ
  <ul>
  <li>van-e adott tulajdonságú elem? → <a href="ch06-04-decision.html"><code>EXISTS</code></a></li>
  <li>minden elem ilyen-e? → <a href="ch06-04-decision.html"><code>FORALL</code></a></li>
  </ul></li>
<li><strong>Egy elemet</strong> (az indexét), amelynek megvan egy tulajdonsága
  <ul>
  <li>biztosan létezik → <a href="ch06-05-select.html"><code>SELECT</code></a></li>
  <li>lehet, hogy nem létezik
    <ul>
    <li>az elsőt → <a href="ch06-06-search.html"><code>SEARCH</code></a></li>
    <li>az utolsót → <a href="ch06-06-search.html#keresés-hátulról"><code>SEARCH</code> visszafelé</a></li>
    </ul></li>
  </ul></li>
<li><strong>Több elemet</strong>
  <ul>
  <li>mindet, átalakítva → <a href="ch06-07-copy.html"><code>COPY</code></a></li>
  <li>csak az adott tulajdonságúakat → <a href="ch06-08-mis.html"><code>MIS</code></a></li>
  <li>csak az adott tulajdonságúakat, átalakítva → <a href="ch06-08-mis.html#a-háromargumentumos-alak"><code>MIS</code> három argumentummal</a></li>
  </ul></li>
</ul>
</div>

Ha egy elem tulajdonsága *maga is* sok elemre vonatkozó kérdés (például „a
nap minden kávészünetében 5 liternél több fogyott”), két egymásba ágyazott
tétel kell. Lásd [Tételek összeépítése](ch06-10-compound.md).

## Egy tételmakró olvasása

Vegyük a `db=DARAB(i=1..n, szamok[i] mod 2 = 1)` makrót:

| Rész | Jelentés |
|------|----------|
| `db=` | az eredmény a `db` kimeneti változóhoz kötődik |
| `DARAB` | a tétel: megszámolás |
| `i=1..n` | az `i` ciklusváltozó az 1, 2, …, n értékeken fut végig |
| `szamok[i] mod 2 = 1` | minden `i`-re ellenőrzött feltétel |

Ha egy tétel több értéket ad vissza, a bal oldal **változókból álló tuple**:
`(ind, ert)=MAX(…)`. Egy pozíciót üresen hagyva azt az értéket figyelmen kívül
hagyod: `(ind,)=MAX(…)` vagy `(van,,ert)=CONDMAX(…)`.

## A tételek `és`-sel kapcsolhatók

Egy utófeltételben több tétel is lehet, mindegyik a saját kimeneteit köti meg:

```speci
Be: n∈N, x∈Z[1..n]
Ki: s∈Z, c∈N
Ef: -
Uf: s=SUM(i=1..n, x[i]) és c=DARAB(i=1..n, x[i]<0)
```

```yaml
n: 4
x: [3, -1, -4, 10]
s: 8
c: 2
```

Egy későbbi tétel felhasználhatja egy korábbinak az eredményét, például egy
segédváltozót. Így írjuk le a többlépéses feladatokat. Lásd
[Tételek összeépítése](ch06-10-compound.md).
