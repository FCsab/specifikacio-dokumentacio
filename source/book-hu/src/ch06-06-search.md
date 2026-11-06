# Keresés: SEARCH

A **(lineáris) keresés** az első olyan indexet keresi egy tartományban, ahol egy
feltétel teljesül. Azt is megmondja, **van-e** egyáltalán ilyen.

<div class="syntax-card">

**Alak:** `(van,ind)=SEARCH(i=e..u, β(i))`<br>
**Eredmény:** pár. A `van` logikai érték, amely megmondja, teljesíti-e `β(i)`-t valamelyik `e..u`-beli `i`, az `ind` pedig az első ilyen `i`<br>
**Ha nincs találat:** a `van` hamis, az `ind`-nek nincs jelentése

</div>

A `van` változót deklarálni kell, általában a `Sa:` blokkban (ha a feladat csak
az indexet kéri), vagy a `Ki:` blokkban (ha azt is kérdezi, van-e találat).

## Példa: az első negatív szám

```speci
Be: n∈N, x∈Z[1..n]
Sa: van∈L
Ki: ind∈N
Ef: -
Uf: (van,ind)=SEARCH(i=1..n, x[i]<0)
```

```yaml
n: 5
x: [3, 8, -2, 7, -5]
van: true
ind: 3
```

```yaml
n: 3
x: [3, 8, 7]
van: false
ind: 0
```

> [!WARNING]
> **Ne nevezd el a jelzőt `exists`-nek.** Régi segédletek és képernyőképek az
> `Aux: exists∈L` alakot használják, de az `exists` foglalt szó (a `∃` ASCII
> alakja), és a mostani szerkesztő elutasítja:
> `incomplite type for exists: undefined is not boolean`. Használd a `van` vagy
> `talalt` nevet.

## Mennyi az `ind`, ha nincs találat?

Ha a `van` hamis, az `ind`-nek nincs értelmes értéke. Az utófeltétel csak
sikeres keresés esetén mond róla valamit. A gyakorlatban:

- A szerkesztő lépéslistája szerint a ciklusindex túlfut a végén, ezért `n+1`-et
  mutat (például n = 3 esetén `ind: 4`).
- A tesztesetekben `ind: 0`-t vagy `ind: n+1`-et szokás írni. Mindkettő
  átmegy, és az is, ha az `ind` kimarad a tesztesetből.

```yaml
n: 3
x: [3, 8, 7]
van: false
ind: 4
```

## A kimenet függjön az eredménytől

Gyakran a feladat valami *származtatott* értéket kér a talált elemből, és csak
akkor, ha van ilyen elem. Erre az implikáció való. Tedd zárójelbe:

```speci
Be: n∈N, nevek∈S[1..n], korok∈N[1..n]
Sa: van∈L, ind∈N
Ki: nev∈S
Ef: -
Uf: (van,ind)=SEARCH(i=1..n, korok[i]<18) és
    (van -> nev=nevek[ind])
```

```yaml
n: 3
nevek: [Anna, Bence, Cili]
korok: [21, 17, 15]
van: true
ind: 2
nev: Bence
```

```yaml
n: 2
nevek: [Anna, Dani]
korok: [21, 30]
van: false
ind: 1
nev: ""
```

Ha nincs találat, a `van -> …` igaz, bármi is a `nev`.

> [!WARNING]
> A `->` a leggyengébb művelet. Zárójel nélkül a
> `(van,ind)=SEARCH(…) és van -> nev=nevek[ind]` jelentése
> `((van,ind)=SEARCH(…) és van) -> nev=…`, ami igaz, valahányszor a keresés része
> hibás. Így rossz adatú teszt is átmehet. Mindig `és (van -> …)` alakban írd.

## Különleges érték jelző helyett

Egyes feladatok nem logikai értéket kérnek, hanem egy különleges kimenetet,
általában −1-et, ha nincs találat:

> *Írd ki az első K forintnál olcsóbb fa sorszámát, vagy −1-et, ha nincs ilyen.*

Két dolgot kell változtatni. A kimenet `Z` legyen (a −1 nem természetes szám),
és a −1-et magának az utófeltételnek kell előállítania:

```speci
Be: n∈N, k∈N, ar∈N[1..n]
Sa: van∈L, ind∈N
Ki: sorszam∈Z
Ef: -
Uf: (van,ind)=SEARCH(i=1..n, ar[i]<k) és
    (van -> sorszam=ind) és
    (nem van -> sorszam=-1)
```

```yaml
n: 6
k: 2000
ar: [2500, 5300, 1900, 2400, 8800, 5300]
van: true
ind: 3
sorszam: 3
```

```yaml
n: 3
k: 100
ar: [2500, 5300, 1900]
van: false
ind: 1
sorszam: -1
```

A [Karácsonyfák](ch09-09-trees.md) kidolgozott példa ugyanezt a feladatot
`SEARCH` nélkül is megoldja.

## Keresés hátulról

Az **utolsó** illeszkedő index megkereséséhez visszafelé kell keresni. A trükk
az indexek negálása: az `i` fusson `-n`-től `-1`-ig, nézzük az `x[-i]` elemet, az
eredményt pedig `-ind`-ként vegyük át:

```speci
Be: n∈N, x∈Z[1..n]
Sa: van∈L
Ki: ind∈N
Ef: -
Uf: (van,-ind)=SEARCH(i=-n..-1, x[-i]<0)
```

```yaml
n: 5
x: [3, -8, 2, -7, 5]
van: true
ind: 4
```

Ahogy az `i` a −5, −4, …, −1 értékeken halad, úgy a `-i` az 5, 4, …, 1 értékeken,
vagyis a tömböt a végétől járjuk be. Az első találat az `i = -4`-nél van, ami
`-ind = -4`-et, azaz `ind = 4`-et ad. Az általános alak:
`(van,-ind)=SEARCH(i=-u..-e, β(-i))`.

## Keresés összetett feltétellel

A feltétel gyakran egy másik tételt tartalmazó függvény, például *keress egy
napot, amikor minden kávészünetben 5 liternél több fogyott*. Ez a
[Catbert kávészünetei](ch09-04-catbert.md) feladat.

## SEARCH, SELECT, EXISTS

| Erre van szükséged | Ezt használd |
|--------------------|--------------|
| csak arra, hogy *van-e* találat | [`EXISTS`](ch06-04-decision.md) |
| az első találatra, amely garantáltan létezik | [`SELECT`](ch06-05-select.md) |
| az első találatra, amely lehet, hogy nem létezik | `SEARCH` |
