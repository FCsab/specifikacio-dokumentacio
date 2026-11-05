# Jó tesztkészlet írása

Egy zöld teszt azt mutatja, hogy a specifikáció *egy* példára illik. A jó
tesztkészlet olyan példákat választ, amelyek a legvalószínűbb hibákat
kiszűrik. Legalább három tesztet írj, ezekből a kategóriákból válogatva:

| Kategória | Milyen kérdésre válaszol? | Példa („az első negatív elem”) |
|-----------|---------------------------|--------------------------------|
| **tipikus** | működik egy átlagos bemenetre? | `[3, -2, 5, -7]` → 2. index |
| **negatív** | mi van, ha nincs válasz? | `[3, 2, 5]` → nincs találat |
| **határeset** | mi történik a széleken? | találat az első vagy utolsó helyen, n = 1, n = 0 |
| **holtverseny** | mi van, ha több elem is megfelel? | két egyenlő maximum → az első |

## Kidolgozott példa

> *Keresés: annak az első napnak a sorszáma, amikor 10 mm-nél több eső esett.*

```speci
Be: n∈N, eso∈N[1..n]
Sa: van∈L
Ki: nap∈N
Ef: -
Uf: (van,nap)=SEARCH(i=1..n, eso[i]>10)
```

Tipikus, több találattal (az *elsőt* kell választani):

```yaml
n: 5
eso: [0, 12, 3, 25, 0]
van: true
nap: 2
```

Negatív, nem volt esős nap:

```yaml
n: 3
eso: [0, 10, 3]
van: false
nap: 4
```

Határeset: találat az utolsó helyen, és egy érték pontosan a küszöbön (a 10 nem
számíthat):

```yaml
n: 3
eso: [10, 10, 11]
van: true
nap: 3
```

Határeset, üres bemenet:

```yaml
n: 0
eso: []
van: false
nap: 1
```

## Tippek

- **Az elvárt kimenetet kézzel írd, a feladat szövegéből**, ne a szerkesztő
  által kiszámolt értékről olvasd le. Különben a teszt csak a specifikációt
  ismétli meg, és semmit sem tesztel.
- **Legyen egy elbukó teszted is**, legalább fejlesztés közben. Egy zöld teszt
  másolatában változtasd meg az elvárt kimenetet, és nézd meg, piros lesz-e. Ha
  nem, a specifikáció nem köti meg azt a kimenetet.
- **Teszteld az előfeltétel széleit.** Ha `Ef: n>0`, egy `n: 1` teszt
  érdekesebb, mint egy `n: 10`.
- **A feladat szövegében szereplő példa** legyen az egyik teszt. Az oktatók
  általában ezt nézik meg először.
- **A pontosan a küszöbre eső értékek** (a `k`-val egyenlő érték) a `<` és `≤`
  összetévesztését fogják meg, ami az egyik leggyakoribb hiba.

> [!TIP]
> A speci-local kiszámolja és megmutatja azokat a kimeneti értékeket, amelyeket
> kihagysz egy tesztből. Ez tesztkészlet *építésekor* hasznos. Töröld az
> elvárt kimenetet, nézd meg, mit számol a specifikáció, és vesd össze a feladat
> szövegével. Aztán írd vissza a helyes értéket.
