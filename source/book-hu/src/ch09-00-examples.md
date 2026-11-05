# Feladatmegoldás lépésről lépésre

Ez a rész teljes feladatokat old meg, többségüket a tárgyi anyagból, a feladat
szövegétől a zöld tesztkészletig. Mindegyik ugyanazt a módszert követi:

1. **Olvasd el a feladatot**, és húzd alá, mi adott és mi a kérdés.
2. **Deklaráld az adatokat.** Bemenetek, kimenetek, és ha az utófeltételnek
   kell, segédadatok.
3. **Írd meg az előfeltételt** a feladat szövegében szereplő megszorításokból.
4. **Válaszd ki a tétel(eke)t** a [döntési fa](ch06-00-theorems.md#melyik-tétel-kell)
   segítségével. Figyeld a beágyazást („minden egyes … minden …”) és a lépéseket
   („először … aztán …”).
5. **Írd meg az utófeltételt.**
6. **Írj teszteket**: a feladat példáját, egy negatív esetet, határeseteket.
7. **Értékeld ki**, és ha valami piros, használd a
   [lépéslistát](ch08-01-stepper.md).

| Feladat | Tételek | Adatok |
|---------|---------|--------|
| [A Korongvilág könyvtárai](ch09-01-discworld.md) | `SEARCH` + implikáció | rekordok tömbje |
| [Yossarian térképe](ch09-02-yossarian.md) | `MAX`-ok `MAX`-a | mátrix |
| [Trurl robotjai](ch09-03-trurl.md) | `MIS` + beágyazott `SUM` | tömb |
| [Catbert kávészünetei](ch09-04-catbert.md) | `SEARCH` + beágyazott `FORALL` | mátrix |
| [Dogbert csillaga](ch09-05-dogbert.md) | `CONDMAX`, pozíció kihagyása | nyitott tömb |
| [Az utazási iroda](ch09-06-travel.md) | relációs, vagy `MAX`+`MIS`+`MIN` | párhuzamos tömbök |
| [Osztók](ch09-07-divisors.md) | `DARAB`, szűrt `SUM` | egyetlen szám |
| [Kártyaértékek](ch09-08-cards.md) | relációs, keresőtábla | konstans tömbök |
| [Karácsonyfák](ch09-09-trees.md) | `SEARCH` −1-es eredménnyel, relációs | tömb |
| [További rövid példák](ch09-10-more.md) | `DARAB`+`FORALL`, `MIS`+`FORALL`, … | vegyes |

A hivatalos angol segédlet feladatait magyarra fordítva, magyar kulcsszavakkal
és nevekkel oldjuk meg. A hivatalos megoldások linkjei mindenhol szerepelnek.
