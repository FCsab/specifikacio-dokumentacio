# Dogbert csillaga

> *Dogbert rendszeres időközönként megmérte egy csillag fényességét. A k alatti
> mérések felhős eget jeleznek. Határozd meg a fényesség legnagyobb változását
> két, derült égnél (felhő nélkül) végzett, egymást követő mérés között!*

**Feladattípus:** feltételes maximumkeresés sorozatban.
[Hivatalos megoldás](https://progalap.elte.hu/specifikacio/v1/?uuid=e0d5b6d7-8231-455d-aed5-e8a7f5420c5e).

## Elemzés

- **Adatok.** A `k` küszöb és a mérések. A számuk nincs külön megadva, ezért a
  tömb nyitott: `adat∈Z[1..]`, a mérete `length(adat)`.
- **Kérdés.** *A legnagyobb változás*, de csak olyan pároknál, ahol **mindkét**
  mérés derült. Ez feltételes maximum, tehát **CONDMAX**.
- **Érték az i. párra.** `adat[i]-adat[i+1]`.
- **Feltétel az i. párra.** `adat[i]>k és adat[i+1]>k`.
- **Tartomány.** (i, i+1) párok, ezért az `i` `length(adat)-1`-ig megy.
- **Kimenet.** Volt-e egyáltalán derült pár, és a maximum. Az indexet nem kérdezi
  a feladat, ezért a helyét kihagyjuk: `(van,,maxert)`.

## Specifikáció

```speci
Be: k∈N, adat∈Z[1..]
Ki: van∈L, maxert∈Z
Ef: -
Uf: (van,,maxert)=CONDMAX(i=1..length(adat)-1,
    adat[i]-adat[i+1], adat[i]>k és adat[i+1]>k)
```

## Tesztek

Tipikus eset, több derült párral, 6-os legnagyobb változással:

```yaml
k: 10
adat: [34, 30, 1, 2, 1, 30, 33, 27, 30, 32]
van: true
maxert: 6
```

Ugyanez az adat sűrűbb felhőzettel, egyetlen derült pár nélkül:

```yaml
k: 50
adat: [34, 30, 1, 2, 1, 30, 33, 27, 30, 32]
van: false
maxert: 0
```

Pontosan két mérés, mindkettő derült:

```yaml
k: 10
adat: [45, 20]
van: true
maxert: 25
```

## Végigkövetés (első teszt, k = 10)

| i | adat[i] | adat[i+1] | mindkettő > 10? | változás |
|--:|--------:|----------:|:---------------:|---------:|
| 1 | 34 | 30 | igen | 4 |
| 2 | 30 | 1 | nem | |
| 3 | 1 | 2 | nem | |
| 4 | 2 | 1 | nem | |
| 5 | 1 | 30 | nem | |
| 6 | 30 | 33 | igen | −3 |
| 7 | 33 | 27 | igen | **6** |
| 8 | 27 | 30 | igen | −3 |
| 9 | 30 | 32 | igen | −2 |

A derült párok közül a legnagyobb változás 6 (i = 7-nél).

> [!NOTE]
> Ez a specifikáció a változást `adat[i]-adat[i+1]`-ként, *előjeles*
> különbségként méri, pontosan úgy, mint a hivatalos megoldás. Ha a „változás”
> bármelyik irányú változás nagyságát jelenti, használd az
> `ABS(adat[i]-adat[i+1])` alakot. Az első tesztre a válasz így is 6, de az
> `adat: [20, 45]` esetén −25 helyett 25 lenne.
