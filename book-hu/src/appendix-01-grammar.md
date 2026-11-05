# A. függelék: Nyelvtani összefoglaló

Ez a függelék egy oldalon foglalja össze a teljes specifikációs nyelvet. A
magyarázatokat és a példákat a linkek mögött találod.

## Szerkezet

```text
specifikáció   =  Be-blokk [Sa-blokk] Ki-blokk [Fv-blokk] Ef-blokk Uf-blokk

Be-blokk       =  ("Be:" | "In:")   deklarációk
Sa-blokk       =  ("Sa:" | "Aux:")  deklarációk
Ki-blokk       =  ("Ki:" | "Out:")  deklarációk
Fv-blokk       =  ("Fv:" | "Fn:")   függvény { "," függvény }
Ef-blokk       =  ("Ef:" | "Pre:")  feltétel | "-"
Uf-blokk       =  ("Uf:" | "Post:") feltétel

deklarációk    =  elem { "," elem }
elem           =  név "∈" halmaz [ "=" literál ]   |   Halmaznév "=" halmaz
függvény       =  név ":" halmaz "->" halmaz "," név "(" paraméterek ")" "=" kifejezés
```

A `∈` helyett `element` is írható. Megjegyzés (`// …` és `/* … */`) bárhol
állhat. [Bővebben →](ch02-01-blocks.md)

## Halmazok

| Alak | Jelentés | Bővebben |
|------|----------|----------|
| `N` `Z` `R` `L` `S` `C`/`K` | természetes, egész, valós, logikai, szöveg, karakter | [→](ch03-01-sets.md) |
| `[a..b]` | egészek intervalluma | [→](ch03-01-sets.md#intervallumok) |
| `T[a..b]`, `T[a..]`, `T[]` | tömb (sorozat) | [→](ch03-02-arrays.md) |
| `T[a..b,c..d]`, `T[,]` | mátrix | [→](ch03-03-matrices.md) |
| `T[][]`, `Sor[]`, ahol `Sor=T[]` | tömbök tömbje | [→](ch03-03-matrices.md#tömbök-tömbjei) |
| `(m1:T1 x m2:T2 x …)` | rekord (direkt szorzat) | [→](ch03-04-records.md) |
| `T1 x T2` | szorzat (függvények ÉT/ÉK) | [→](ch05-00-functions.md) |
| `Nev` | elnevezett halmaz (`Nev=…`) | [→](ch03-05-aliases.md) |

## Kifejezések

| Kategória | Szintaxis |
|-----------|-----------|
| konstansok | `5`, `-3`, `2.5`, `"szöveg"`, `true`, `false` |
| elérés | `x[i]`, `m[i,j]`, `a[i][j]`, `r.mezo`, `t.1`, `MAX(…).maxval` |
| aritmetika | `+ - * /`, `mod` vagy `%`, `ABS(e)` |
| összehasonlítás | `=`, `≠`/`!=`, `<`, `>`, `≤`/`<=`, `≥`/`>=`, láncolva `a≤b≤c` |
| oszthatóság | `a\|b` (a osztója b-nek) |
| logika | `és`/`and`, `vagy`/`or`, `nem`/`not`, `→`/`->` |
| tartalmazás | `e∈[a..b]` |
| kvantorok | `∀i∈[a..b]:(…)`, `∃i∈[a..b]:(…)`; szóval `forall`, `exists` |
| beépítettek | `length(x)`, `from(x)`, `to(x)` |
| tuple-ök | `(a, b)`, tuple-célok `(a,b)=…`, `(a,)=…`, `(,b)=…`, `(a,,c)=…` |

Precedencia a leggyengébbtől a legerősebbig: `→`, `vagy`, `és`, `nem`,
összehasonlítások, `+ -`, `* / mod`, előjel, elérés. [Bővebben →](ch04-01-operators.md)

## Tételmakrók

| Makró | Eredmény |
|-------|----------|
| `SUM(i=e..u, f(i))`, `SUM(i=e..u, f(i), β(i))` | összeg |
| `DARAB(i=e..u, β(i))`, `COUNT(…)` | darabszám |
| `MAX(i=e..u, f(i))`, `MIN(…)` | (index, érték) |
| `EXISTS(i=e..u, β(i))`, `FORALL(…)` | logikai |
| `SELECT(i≥e, β(i))` | index |
| `SEARCH(i=e..u, β(i))` | (logikai, index) |
| `COPY(i=e..u, f(i))` | tömb |
| `MIS(i=e..u, β(i))`, `MIS(i=e..u, β(i), f(i))` | (darabszám, tömb) |
| `CONDMAX(i=e..u, f(i), β(i))`, `CONDMIN(…)` | (logikai, index, érték) |

[Bővebben →](ch06-00-theorems.md)

## A szerkesztő által kikényszerített szabályok

1. A fejlécek kis- és nagybetű-érzékenyek, és pontosan a fenti módon írandók.
2. A deklarációk megelőzik a feltételeket: `Be`, `Sa`, `Ki`, `Fv`, aztán `Ef`, `Uf`.
3. A változók kisbetűvel, a halmazok nagybetűvel kezdődnek.
4. A foglalt szavak (`és`, `vagy`, `nem`, `and`, `or`, `not`, `mod`, `element`,
   `exists`, `forall`, `true`, `false`) nem lehetnek nevek.
5. Minden bemeneti változó szerepel az utófeltételben.
6. A tesztadat illeszkedik a deklarált típusokra: hossz, tartományok, mezők.
