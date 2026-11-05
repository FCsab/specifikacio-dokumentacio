# Rekordok és tuple-ök

## Rekordok

A **rekord** (struktúra) *különböző* típusú értékeket fog össze egy egységbe. A
specifikációban a mezők halmazainak **direkt szorzata**, a mezők között `x`
jellel:

```speci,fragment
r1∈(nev:S x jegy:N)
```

Az `r1` az *S × N* egy eleme, egy név–jegy pár. A mezőket ponttal érjük el:
`r1.nev`, `r1.jegy`.

| Deklaráció | Jelentés |
|------------|----------|
| `r1∈nev:S x jegy:N` | a zárójel elhagyható |
| `r2∈(nev:S x jegy:N)` | a szokásos forma |
| `r3∈(eszak:L x kelet:L x del:L x nyugat:L)` | tetszőleges számú mező |
| `r4∈(a:[1..2] x b:[3..4])` | a mezők intervallumok is lehetnek: r4 az (1,3), (1,4), (2,3), (2,4) egyike |

> [!IMPORTANT]
> Az `x` mindkét oldalán szóköz kell: `nev:S x jegy:N`.

A tesztadatban a rekord többsoros YAML alakban vagy tömör `{…}` alakban írható:

```speci
Be: r∈(nev:S x jegy:N)
Ki: atment∈L
Ef: r.jegy≥1 és r.jegy≤5
Uf: atment=(r.jegy≥2)
```

```yaml
r:
  nev: Anna
  jegy: 4
atment: true
```

```yaml
r: {nev: Bence, jegy: 1}
atment: false
```

## Rekordok tömbje

A legtöbb valódi feladatban **rekordok tömbje** szerepel: hallgatók listája,
mérések sorozata. Átláthatóbb, ha a rekord típusát előbb elnevezzük (lásd
[Saját halmaznevek](ch03-05-aliases.md)):

```speci
Be: n∈N, h∈Hallgato[1..n], Hallgato=(nev:S x jegy:N)
Ki: c∈N
Ef: ∀i∈[1..n]:(1≤h[i].jegy≤5)
Uf: c=DARAB(i=1..n, h[i].jegy=5)
```

```yaml
n: 3
h:
  - nev: Anna
    jegy: 5
  - nev: Bence
    jegy: 3
  - nev: Cili
    jegy: 5
c: 2
```

```yaml
n: 2
h: [{nev: Anna, jegy: 2}, {nev: Bence, jegy: 4}]
c: 0
```

A `h[i].jegy` jelentése: „a h *i*-edik elemének jegy mezője”.

> [!WARNING]
> A tesztadat mezőneveinek pontosan egyezniük kell a deklarációval, kis- és
> nagybetűre is: a `jegy` nem `Jegy`.

## Tuple-ök

A **tuple** (rendezett n-es) rekord deklarálása nélkül fog össze értékeket:
`(3, 5)`. A komponenseit 1-től számozzuk: `(3, 5).1 = 3`, `(3, 5).2 = 5`.

```speci
Be: a∈Z, b∈Z
Ki: jo∈L
Ef: -
Uf: jo=((a, b).2=b és (a, b)=(a, b))
```

```yaml
a: 3
b: 5
jo: true
```

Tuple típusú változót nem lehet deklarálni, de a tuple-ök a **programozási
tételek** lényegéhez tartoznak: sok tétel egyszerre több értéket ad vissza. A
`MAX` egy (index, érték) párt, a `SEARCH` egy (van, index) párt. Szétszedni úgy
lehet őket, hogy a bal oldalra változókból álló tuple-t írunk:

```speci
Be: n∈N, x∈Z[1..n]
Ki: ind∈N, ert∈Z
Ef: n>0
Uf: (ind, ert)=MAX(i=1..n, x[i])
```

```yaml
n: 4
x: [3, 9, -2, 9]
ind: 2
ert: 9
```

Ha egy pozíciót üresen hagysz, azt a komponenst figyelmen kívül hagyod: az
`(ind,)=MAX(…)` csak az indexet tartja meg, a `(,ert)=MAX(…)` csak az értéket.
A részletek a [Maximum- és minimumkiválasztás](ch06-03-max-min.md) fejezetben
vannak.

A függvények is visszaadhatnak tuple-t: `csere:Z x Z->Z x Z, csere(a,b)=(b,a)`.
A tételek eredményének komponensei **névvel** is elérhetők, például a `MAX`-nál
a `.maxval` és a `.maxind`. A [Yossarian térképe](ch09-02-yossarian.md) példa
ezt használja.
