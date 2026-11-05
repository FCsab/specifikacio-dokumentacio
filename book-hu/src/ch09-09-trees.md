# Karácsonyfák

> *Egy karácsonyi vásáron N fenyőfát árulnak. Írj programot, amely megad egy K
> forintnál olcsóbb fát!*
>
> **Bemenet:** N (1 ≤ N ≤ 100) és K (1 ≤ K ≤ 10 000), majd az N ár
> (1 ≤ Ár ≤ 10 000).
> **Kimenet:** egy K-nál olcsóbb fa sorszáma; **−1**, ha nincs ilyen; több ilyen
> esetén a **legkisebb** sorszám.

Példa: N = 6, K = 2000, az árak 2500, 5300, 1900, 2400, 8800, 5300 → **3**.

## Elemzés

- A kérdés *az első adott tulajdonságú index, amely lehet, hogy nem létezik*,
  tehát **keresés**.
- A kimenet viszont nem egy van/nincs jelző, hanem egy index **vagy −1**. Ezért:
  - a kimenet `Z` legyen (a −1 nincs `N`-ben),
  - a −1-et magának az utófeltételnek kell előállítania.

Mindkét alábbi megoldást az élő szerkesztőben ellenőriztük.

## 1. megoldás: relációs

```speci
Be:

n∈N, k∈N, ar∈N[1..n]

Ki:

sorszam∈Z

Ef:

1<=n<=100 and 1<=k<=10000 and ∀i∈[1..n]:(1<=ar[i] and ar[i]<=10000)

Uf:

(sorszam=-1 and ∀i∈[1..n]:(ar[i]>=k)) or ∃i∈[1..n]:(sorszam=i and ar[i]<k and ∀j∈[1..i-1]:(ar[j]>=k))
```

A `vagy` két oldala kizárja egymást:

- **bal:** egyik fa sem elég olcsó, és a válasz −1,
- **jobb:** az *i*. fa elég olcsó, egyik korábbi sem (`∀j∈[1..i-1]`), és a
  válasz *i*.

A kimenetet a tanún keresztül kötjük meg (`sorszam=i`), így a formula soha nem
olvassa az `ar[-1]` elemet.

```yaml
n: 6
k: 2000
ar: [2500, 5300, 1900, 2400, 8800, 5300]
sorszam: 3
```

```yaml
n: 3
k: 100
ar: [2500, 5300, 1900]
sorszam: -1
```

A *legkisebb* sorszám, nem a legolcsóbb fa: a 2. helyen álló 3000 megelőzi a 4.
helyen álló 200-at.

```yaml
n: 4
k: 5000
ar: [6000, 3000, 1000, 200]
sorszam: 2
```

A `k = 1` nem üthető, mert minden ár legalább 1:

```yaml
n: 4
k: 1
ar: [1, 1, 10000, 7]
sorszam: -1
```

Egyetlen fa, amely megfelel:

```yaml
n: 1
k: 3000
ar: [2500]
sorszam: 1
```

> [!TIP]
> A `∀j∈[1..i-1]:(ar[j]>=k)` nélkül *bármelyik* megfelelő indexet elfogadná. A
> példa akkor is átmenne, de a harmadik teszten a `sorszam: 4` is zöld lenne.
> Mindig legyen olyan teszt, ahol több elem is megfelel.

## 2. megoldás: SEARCH-csel, minden magyar blokkal

Ez a változat mind a hat magyar blokkot egyszerre használja. Az `egyeb` extra
bemenet és a `db` kimenet csak azért van benne, hogy minden lehetőség
látszódjon:

```speci
Be:
n∈N,
k∈N,
ar∈N[1..n],
egyeb∈N

Sa:
van∈L,
ind∈N

Ki:
sorszam∈Z,
db∈N

Fv:
kisebb:N->L,
kisebb(i)=ar[i]<k

Ef:
1<=n<=100 and 1<=k<=10000 and egyeb>=0 and ∀i∈[1..n]:(1<=ar[i] and ar[i]<=10000)

Uf:
(van,ind)=SEARCH(i=1..n, kisebb(i)) and
(van -> sorszam=ind) and
(not van -> sorszam=-1) and
db=DARAB(i=1..n, ar[i]<k) and
egyeb=egyeb
```

```yaml
n: 6
k: 2000
ar: [2500, 5300, 1900, 2400, 8800, 1000]
egyeb: 0
van: true
ind: 3
sorszam: 3
db: 2
```

```yaml
n: 3
k: 100
ar: [2500, 5300, 1900]
egyeb: 5
van: false
ind: 4
sorszam: -1
db: 0
```

Mit mutat meg ez az egy zöld futás?

| Elem | Mit mutat |
|------|-----------|
| `Be:` `Sa:` `Ki:` `Fv:` `Ef:` `Uf:` | mind a hat magyar fejlécet, a tartalommal a következő sorokban |
| `kisebb:N->L,`, a törzs a következő sorban | magyar függvényblokk, ASCII nyíl |
| `kisebb(i)` a `SEARCH` feltételeként | saját függvény hajt egy tételt |
| `van∈L` | a jelző neve `van`, soha nem `exists` |
| `->` és `not` | implikáció és tagadás |
| `egyeb=egyeb` | az azonosság, amely teljesíti a [minden-változó szabályt](ch02-03-all-variables.md) |
