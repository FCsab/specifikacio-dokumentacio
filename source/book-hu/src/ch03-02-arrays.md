# Tömbök

A **tömb** (indexelt sorozat) sok azonos típusú értéket tárol, mindegyiket egy
indexen keresztül érjük el. Először az elemek halmazát írjuk, utána szögletes
zárójelben az indextartományt:

```speci,fragment
x∈N[1..3]
```

Az `x` három természetes számból álló sorozat, 1, 2, 3 indexekkel. Az elemei:
`x[1]`, `x[2]`, `x[3]`.

## A tömbdeklaráció formái

| Deklaráció | Jelentés |
|------------|----------|
| `x1∈N[1..3]` | pontosan 3 elem, 1..3 indexekkel |
| `x2∈N[-1..1]` | 3 elem, −1, 0, 1 indexekkel |
| `n∈N, x∈Z[1..n]` | *n* elem, ahol *n* is bemenet (a tárgyban szokásos forma) |
| `x3∈N[1..]` | tetszőleges hosszú, 1-től indexelve; a hosszát a tesztadat dönti el |
| `x4∈N[0..]` | tetszőleges hosszú, 0-tól indexelve |
| `x5∈N[]` | az `N[1..]` rövidítése |
| `x6∈N[]=[5,1,2]` | konstans tömb kezdőértékkel |
| `x7∈N[2+3..n*2]` | a határok egyszerű kifejezések is lehetnek |

A leggyakoribb a harmadik: a hossz (*n*) bemenet, a tömb pedig `N[1..n]`. A
szerkesztő ilyenkor ellenőrzi, hogy a tesztadatnak tényleg *n* eleme van-e.

```speci
Be: n∈N, hom∈Z[1..n]
Ki: s∈Z
Ef: -
Uf: s=SUM(i=1..n, hom[i])
```

```yaml
n: 4
hom: [-3, 2, 5, -1]
s: 3
```

Ha az adat hossza nem egyezik `n`-nel, a teszt elbukik:

```yaml,red
n: 3
hom: [-3, 2, 5, -1]
s: 3
```

## Hossz és határok: `length`, `from`, `to`

Nyitott tartományú tömb (`N[1..]`, `N[]`) méretét a specifikációban le lehet
kérdezni:

| Függvény | Online szerkesztőben magyarul | Eredmény |
|----------|-------------------------------|----------|
| `length(x)` | `hossz(x)` | az elemek száma |
| `from(x)` | `tól(x)` | az első index |
| `to(x)` | `ig(x)` | az utolsó index |

```speci
Be: x∈Z[]
Ki: s∈Z
Ef: -
Uf: s=SUM(i=1..length(x), x[i])
```

```yaml
x: [10, 20, 30]
s: 60
```

A `from` és a `to` segítségével a specifikáció bármilyen indextartományra
működik. Itt a bemenet 0-tól indexelt:

```speci
Be: x∈Z[0..]
Ki: s∈Z
Ef: -
Uf: s=SUM(i=from(x)..to(x), x[i])
```

```yaml
x: [10, 20, 30]
s: 60
```

> [!NOTE]
> A `hossz`, `tól`, `ig` magyar nevek a szerkesztő beépített dokumentációjában
> szerepelnek. A speci-local csak az angol neveket ismeri.

## Indexelés

Az `x[i]` az `i` indexű elem. Az index tetszőleges kifejezés lehet: `x[i+1]`,
`x[n]`, `x[-i]`. Az indextartományon kívüli olvasás kiértékelési hiba. Ez
gyakran szomszédok összehasonlításánál fordul elő:

```speci,fragment
// rossz: i=n esetén x[i+1] nem létezik
Uf: c=DARAB(i=1..n, x[i]<x[i+1])
// jó: eggyel előbb álljunk meg
Uf: c=DARAB(i=1..n-1, x[i]<x[i+1])
```

## Konstans tömbök

A kezdőértékkel megadott tömb rögzített adat, amely a feladat része, például
egy keresőtábla:

```speci
Be: napok∈N[1..12]=[31,28,31,30,31,30,31,31,30,31,30,31], h∈[1..12]
Ki: d∈N
Ef: -
Uf: d=napok[h]
```

```yaml
h: 4
d: 30
```

Az érték a deklarációból jön, ezért a tesztadat **nem tartalmazza a `napok`-at**.
Ha a teszt megismétli, piros lesz: „data cannot contain item with the same
name: napok”.

A [Kártyaértékek](ch09-08-cards.md) kidolgozott példa ugyanezt a technikát
szövegekkel használja.

## Tömbliterálok

Feltételekben közvetlenül is írhatunk tömböket, de erre ritkán van szükség:

```speci,fragment
[1, 2, 3]=[1, 2, 3]
[0..:1, 2, 3]       // literál megadott indextartománnyal: 0..2 indexek
```

A második alakot, az indextartományos literált, csak az online szerkesztő érti.
