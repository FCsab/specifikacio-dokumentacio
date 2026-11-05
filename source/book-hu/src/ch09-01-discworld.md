# A Korongvilág könyvtárai

> *A Láthatatlan Egyetem Könyvtárosa tárolja a Korongvilág minden könyvtárának
> nevét és koordinátáit. Add meg a lista első olyan könyvtárát, amely északabbra
> van (kisebb az y koordinátája), mint a következő.*

**Feladattípus:** keresés rekordok tömbjében.
[Hivatalos megoldás](https://progalap.elte.hu/specifikacio/v1/?uuid=6117a7d1-fd33-48e3-8f5b-55bafbb65a64).

## Elemzés

- **Adatok.** n könyvtár, mindegyiknek neve és két koordinátája van. Ehhez egy
  `Konyvtar=(nev:S x x:N x y:N)` rekord kell, és ezekből egy tömb.
- **Kérdés.** *Az első olyan könyvtár, amely…* Egyetlen elemet keresünk, és
  lehet, hogy nincs ilyen. Ez **keresés**.
- **Feltétel.** Az *i*. könyvtár északabbra van, mint az *i+1*. Vigyázat:
  „északabbra” *kisebb* y-t jelent. Vessük össze a hivatalos megoldás
  feltételével, a `pl[i].y<pl[i+1].y`-nal, amely szerint az *i*. y-ja kisebb, mint
  az *i+1*.-é. A kisebb y az *i*. könyvtáré, tehát ő van északabbra. Rendben.
- **Tartomány.** Mivel a következővel hasonlítunk össze, az `i` csak `n-1`-ig
  megy.
- **Kimenet.** A könyvtár *neve*, ami csak sikeres keresés esetén létezik. Ehhez
  implikáció kell.

## Specifikáció

```speci
Be: n∈N, kt∈Konyvtar[1..n], Konyvtar=(nev:S x x:N x y:N)
Sa: van∈L, ind∈N
Ki: nev∈S
Ef: ∀i∈[1..n]:(kt[i].x≥0 és kt[i].y≥0)
Uf: (van,ind)=SEARCH(i=1..n-1, kt[i].y<kt[i+1].y) és
    (van → nev=kt[ind].nev)
```

## Tesztek

A feladat példája, ahol az L4-et (y = 4) az L5 (y = 47) követi:

```yaml
n: 5
kt: [
  {nev: "L1", x: 12, y: 24},
  {nev: "L2", x: 5, y: 15},
  {nev: "L3", x: 69, y: 4},
  {nev: "L4", x: 12, y: 4},
  {nev: "L5", x: 212, y: 47}
]
nev: L4
van: true
ind: 4
```

Negatív eset, ahol minden könyvtár délebbre van az előzőnél:

```yaml
n: 4
kt: [
  {nev: "L1", x: 10, y: 50},
  {nev: "L2", x: 20, y: 40},
  {nev: "L3", x: 30, y: 30},
  {nev: "L4", x: 40, y: 20}
]
nev: ""
van: false
ind: 4
```

Határeset, egyetlen könyvtárral (az `1..0` tartomány üres):

```yaml
n: 1
kt: [{nev: "L1", x: 0, y: 10}]
nev: ""
van: false
ind: 1
```

A rossz elvárásnak le kell buknia:

```yaml,red
n: 5
kt: [
  {nev: "L1", x: 12, y: 24},
  {nev: "L2", x: 5, y: 15},
  {nev: "L3", x: 69, y: 4},
  {nev: "L4", x: 12, y: 4},
  {nev: "L5", x: 212, y: 47}
]
nev: L3
van: true
ind: 3
```

## Végigkövetés

| i | y[i] | y[i+1] | y[i] < y[i+1]? |
|--:|-----:|-------:|:--------------:|
| 1 | 24 | 15 | nem |
| 2 | 15 | 4 | nem |
| 3 | 4 | 4 | nem |
| 4 | 4 | 47 | **igen** |

A keresés i = 4-nél áll meg, így `van = true` és `ind = 4`, az implikáció pedig
megköveteli, hogy `nev = kt[4].nev = "L4"`.

## A zárójelekről

A hivatalos megoldás az utolsó sort zárójel nélkül írja:

```speci,fragment
Post: (exists,ind)=SEARCH(i=1..n-1,pl[i].y<pl[i+1].y) and
      exists → lib=pl[ind].name
```

Mivel a `→` gyengébben köt, mint az `and`, ez azt jelenti:
`(SEARCH… and exists) → lib=…`. Ha egy tesztesetben rossz az `exists` vagy az
`ind` értéke, a bal oldal hamis, és az egész állítás *igaz*, így a hiba
észrevétlen marad. A fenti zárójelezéssel a piros teszt helyesen piros. (A
hivatalos megoldás a jelzőt is `exists`-nek nevezi, amit a mostani szerkesztő
elutasít, lásd [Keresés](ch06-06-search.md).)
