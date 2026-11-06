# Kártyaértékek

> *Írj programot, amely megmondja, mennyit ér egy magyar kártya a huszonegyes
> játékban!* A lapok: `also, felso, kiraly, VII, VIII, IX, X, asz`, az értékük
> `2, 3, 4, 7, 8, 9, 10, 11`.

## Elemzés

- A lapnevek és az értékeik **rögzített adatok**: a feladat részei, nem a
  bemenetéi. Ezekből az értékeikkel együtt deklarált **konstans tömbök** lesznek.
- A valódi bemenet egyetlen lapnév, a `lap`.
- A válasz „az érték azon a helyen, ahol a név egyezik”. Egy `∃`-es relációs
  utófeltétel egyszerre megtalálja a helyet és megköti az értéket.

## Specifikáció

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

- A `Be:` blokkon belül is lehetnek **üres sorok**.
- Az előfeltétel garantálja, hogy a lap létezik, így az utófeltétel `∃`-e
  mindig teljesíthető.
- Nem kell sem `Sa:`, sem `Fv:`: a hozzárendelés adat, nem logika.

## Tesztek

A konstans tömbök a deklarációból kapják az értéküket, ezért a tesztadat csak
a `lap`-ot és az `ertek`-et adja meg:

```yaml
lap: "asz"
ertek: 11
```

```yaml
lap: "also"
ertek: 2
```

Nem létező lap megsérti az előfeltételt:

```yaml,red
lap: "joker"
ertek: 0
```

> [!NOTE]
> A <kbd>Shift</kbd>+<kbd>Space</kbd>, <kbd>Tab</kbd> által generált sablon
> a konstans tömböket is felsorolhatja. Töröld azt a két sort: az a teszt, amely
> megismétli őket, piros lesz („data cannot contain item with the same name:
> lapok”).
