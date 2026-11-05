# Kiválasztás: SELECT

A **kiválasztás** megkeresi az első olyan indexet egy adott kezdőponttól, ahol
egy feltétel teljesül, **ha tudjuk, hogy ilyen index létezik**.

<div class="syntax-card">

**Alak:** `ind=SELECT(i≥e, β(i))`<br>
**Eredmény:** a legkisebb `i ≥ e`, amelyre `β(i)` teljesül<br>
**Követelmény:** az előfeltételnek garantálnia kell, hogy ilyen `i` létezik

</div>

A többi tétellel ellentétben a `SELECT`-nek **nincs felső határa**, csak azt
mondja meg, honnan induljon. Éppen ezért kell garantálni a létezést: nélküle a
keresés soha nem érne véget.

## Példa: az első páratlan szám

Ez a hivatalos tárgyi példa
([megnyitás a szerkesztőben](https://progalap.elte.hu/specifikacio/v1/?uuid=ecacc1f7-a451-4d14-8444-8527ff11a613)):

```speci
Be: n∈N, szamok∈Z[1..n]
Ki: ind∈N
Ef: ∃i∈[1..n]:(szamok[i] mod 2 = 1)
Uf: ind=SELECT(i≥1, szamok[i] mod 2 = 1) és n=n
```

```yaml
n: 5
szamok: [23, 25, 26, 28, 29]
ind: 1
```

```yaml
n: 4
szamok: [2, 4, 7, 9]
ind: 3
```

Két dolgot érdemes megfigyelni:

1. **Az előfeltétel**, az `∃i∈[1..n]:(szamok[i] mod 2 = 1)`, garantálja, hogy
   van páratlan szám. Nélküle a `SELECT` hibás lenne.
2. **`és n=n`**: az `n` nem szerepel a `SELECT`-ben (nincs felső határ), ezért
   kell az `n=n` azonosság a [minden-változó szabály](ch02-03-all-variables.md)
   teljesítéséhez.

A páratlan szám nélküli bemenet megsérti az előfeltételt, így a teszt piros:

```yaml,red
n: 2
szamok: [2, 4]
ind: 1
```

## Kiválasztás tömb nélkül

A `SELECT` természetes választás az „első adott tulajdonságú szám” kérdésekre,
ha a válasz matematikailag garantált. *n legkisebb 1-nél nagyobb osztója*
(n ≥ 2 esetén maga az n mindig osztó):

```speci
Be: n∈N
Ki: d∈N
Ef: n≥2
Uf: d=SELECT(i≥2, i|n)
```

```yaml
n: 35
d: 5
```

```yaml
n: 13
d: 13
```

## SELECT vagy SEARCH?

| | `SELECT` | `SEARCH` |
|-|----------|----------|
| Garantált a találat? | **igen**, az előfeltétel szerint | nem |
| Tartomány | csak kezdőpont: `i≥e` | `i=e..u` |
| Eredmény | az index | (van-e?, index) |

Ha az előfeltételben nem tudod igazolni, hogy van találat, használd a
[`SEARCH`](ch06-06-search.md)-et.
