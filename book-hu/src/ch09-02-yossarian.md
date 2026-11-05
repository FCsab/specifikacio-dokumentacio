# Yossarian térképe

> *Yossarian egy négyzethálós térképen (n × m) feljegyezte, hogy az egyes
> helyeken hányszor járt. Melyik helyen járt a legtöbbször? Add meg az első
> ilyen hely „koordinátáit”.*

**Feladattípus:** maximumkiválasztás mátrixban.
[Hivatalos megoldás](https://progalap.elte.hu/specifikacio/v1/?uuid=0ae47017-4755-40de-82b5-00ba484d7637).

## Elemzés

- **Adatok.** Egy n × m-es, természetes számokból álló mátrix:
  `terkep∈N[1..n,1..m]`.
- **Kérdés.** A legnagyobb érték helye: ez **maximum**, de két indexre.
- **Felbontás.** Először minden sor maximumát keressük meg (belső `MAX` az
  oszlopokon), aztán azt a sort, amelynek a legnagyobb a sormaximuma (külső
  `MAX` a sorokon). A belsőből egy (oszlop, érték) párt visszaadó függvény lesz.
- **„Az első ilyen hely”**: a `MAX` eleve az első maximumot veszi, a sorban és
  az oszlopban is.

## Specifikáció

```speci
Be: n∈N, m∈N, terkep∈N[1..n,1..m]
Ki: sor∈N, oszlop∈N
Fv: maxoszl:N->N x N, maxoszl(i)=MAX(j=1..m, terkep[i,j])
Ef: n>0 és m>0
Uf: (sor,)=MAX(i=1..n, maxoszl(i).maxval) és
    oszlop=maxoszl(sor).maxind
```

- A `maxoszl(i)` az *i*. sorra a (maximum oszlopa, maximum) pár.
- A `maxoszl(i).maxval` az *i*. sor maximuma. A külső `MAX` csak a sor indexét
  tartja meg: `(sor,)`.
- A `maxoszl(sor).maxind` a maximum oszlopa a kiválasztott sorban.

> [!NOTE]
> A hivatalos megoldás előfeltétele `∀i∈[1..n]:(∀j∈[1..m]:(map[i,j]≥0))`, ami
> `N` esetén mindig igaz. Amire a `MAX`-nak valójában szüksége van, az a nem
> üres mátrix, ezért ez a változat `n>0 és m>0`-t mond.

## Tesztek

A feladat példája, ahol a 23-as maximum a 2. és a 4. sorban is előfordul (az
első nyer):

```yaml
n: 6
m: 4
terkep: [
  [12, 3, 1, 4],
  [3, 2, 23, 5],
  [4, 2, 2, 1],
  [5, 2, 23, 0],
  [0, 2, 4, 1],
  [0, 0, 0, 1]
]
sor: 2
oszlop: 3
```

A maximum a bal felső sarokban:

```yaml
n: 3
m: 3
terkep: [[99, 10, 5], [20, 30, 40], [15, 25, 35]]
sor: 1
oszlop: 1
```

Minden mező egyenlő, így az első mezőt választja:

```yaml
n: 2
m: 2
terkep: [[7, 7], [7, 7]]
sor: 1
oszlop: 1
```

A második előfordulást *nem* fogadja el:

```yaml,red
n: 2
m: 2
terkep: [[1, 9], [9, 1]]
sor: 2
oszlop: 1
```

## Végigkövetés (első teszt)

| i. sor | `maxoszl(i)` | `.maxval` |
|-------:|:------------:|----------:|
| 1 | (1, 12) | 12 |
| 2 | (3, 23) | **23** |
| 3 | (1, 4) | 4 |
| 4 | (3, 23) | 23 |
| 5 | (3, 4) | 4 |
| 6 | (4, 1) | 1 |

A külső `MAX` először a 2. sorban találja meg a 23-at, így `sor = 2`. Aztán
`maxoszl(2).maxind = 3`, így `oszlop = 3`.
