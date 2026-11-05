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

A konstans tömbök a deklarált bemenet részei, ezért a tesztadatban is
szerepelnek:

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

Nem létező lap megsérti az előfeltételt:

```yaml,red
lapok: ["also", "felso", "kiraly", "VII", "VIII", "IX", "X", "asz"]
ertekek: [2, 3, 4, 7, 8, 9, 10, 11]
lap: "joker"
ertek: 0
```

> [!NOTE]
> A <kbd>Shift</kbd>+<kbd>Space</kbd>, <kbd>Tab</kbd> által generált sablon
> minden bemenetet felsorol, a konstans tömböket is. Ha a szerkesztőd
> verziója a deklarációból tölti ki őket, és panaszkodik a duplikátumokra,
> töröld azt a két sort a tesztből.
