# Utófeltétel tételek nélkül

Az utófeltételnek nem *kell* tételmakrókat használnia. A bemenetről és a
kimenetről szóló bármilyen logikai állítás érvényes, és a szerkesztő
közvetlenül kiértékeli. Ez a `∀`, `∃`, `és`, `vagy`, `→` elemekből építkező
**relációs** stílus az előadások jelölése, és egyes feladatok kifejezetten ezt
kérik.

## Ugyanaz a feladat mindkét stílusban

> *Egy utazási iroda n városba árul repülőjegyet. Add meg a legtávolabbi
> városba szóló jegy árát. Ha több ugyanolyan messze van, a köztük legolcsóbbét.*

**Tételekkel.** Keresd meg a legnagyobb távolságot, gyűjtsd ki az ahhoz
tartozó árakat, és vedd a minimumukat:

```speci
Be: n∈N, varos∈Varos[1..n], Varos=(tav:N x ar:N)
Sa: leg∈N, db∈N, arak∈N[1..db]
Ki: jegy∈N
Ef: n>0
Uf: (,leg)=MAX(i=1..n, varos[i].tav) és
    (db,arak)=MIS(i=1..n, varos[i].tav=leg, varos[i].ar) és
    (,jegy)=MIN(i=1..db, arak[i])
```

```yaml
n: 3
varos: [{tav: 1000, ar: 500}, {tav: 1000, ar: 250}, {tav: 500, ar: 100}]
leg: 1000
db: 2
arak: [500, 250]
jegy: 250
```

**Relációsan.** *Létezik egy i város, amelynek az ára a válasz, és minden más
j város vagy közelebb van, vagy ugyanolyan messze, de nem olcsóbb:*

```speci
Be: n∈N, tav∈N[1..n], ar∈N[1..n]
Ki: jegy∈N
Ef: n>0
Uf: ∃i∈[1..n]:(ar[i]=jegy és
      ∀j∈[1..n]:(tav[j]<tav[i] vagy (tav[j]=tav[i] és ar[j]≥ar[i])))
```

```yaml
n: 3
tav: [1000, 1000, 500]
ar: [500, 250, 100]
jegy: 250
```

## Hogyan írjunk relációs utófeltételt?

A tipikus szerkezet: **egy `∃`, amely megnevez egy tanút, és `∀`-k, amelyek
elmondják, miért ő a jó tanú.**

- *„a válasz egy P tulajdonságú elem”*: `∃i∈[…]:(P(i) és ki=…(i))`
- *„… és ez a legjobb”*: tegyél hozzá egy `∀j∈[…]:(i legalább olyan jó, mint j)` tagot
- *„… és ez az első”*: tegyél hozzá egy `∀j∈[1..i-1]:(nem P(j))` tagot
- *„vagy egy különleges érték, ha nincs ilyen”*:
  `(ki=-1 és ∀i∈[…]:(nem P(i))) vagy ∃i∈[…]:(…)`

### Példa: első találat vagy −1

```speci
Be: n∈N, k∈N, ar∈N[1..n]
Ki: sorszam∈Z
Ef: -
Uf: (sorszam=-1 és ∀i∈[1..n]:(ar[i]≥k)) vagy
    ∃i∈[1..n]:(sorszam=i és ar[i]<k és ∀j∈[1..i-1]:(ar[j]≥k))
```

```yaml
n: 4
k: 5000
ar: [6000, 3000, 1000, 200]
sorszam: 2
```

```yaml
n: 2
k: 100
ar: [2500, 5300]
sorszam: -1
```

A kimenetet *a tanún keresztül* kötjük meg (`sorszam=i`), így a formula soha nem
olvassa az `ar[sorszam]` elemet, amikor a `sorszam` −1. Ha `ar[sorszam]<k`-t
írnánk, a sikertelen ágon tartományon kívüli olvasás történne.

## Melyik stílust válasszam?

| Használd | Mikor? |
|----------|--------|
| a **tételeket** | ha a specifikációból algoritmusnak kell születnie: minden makróból egy ismert algoritmus lesz a tervezési szakaszban |
| a **relációs** alakot | ha a kimenetet egy tulajdonság definiálja, a feladat a relációs alakot kéri, vagy a tételes változathoz sok segédváltozó kellene |

Mindkét stílusnak teljesítenie kell a [minden-változó szabályt](ch02-03-all-variables.md).
A szerkesztő mindkettőt kiértékeli, de a léptető a tételmakrókat ciklusként
mutatja, és azt gyakran könnyebb követni.
