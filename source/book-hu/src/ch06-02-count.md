# Megszámolás: COUNT / DARAB

A **megszámolás** megmondja, egy tartomány hány indexére teljesül egy feltétel.

<div class="syntax-card">

**Alak:** `c=DARAB(i=e..u, β(i))`<br>
**Angolul:** `c=COUNT(i=e..u, β(i))`<br>
**Eredmény:** természetes szám: azoknak az `e..u`-beli `i`-knek a száma, amelyekre `β(i)` teljesül<br>
**Üres tartomány:** 0

</div>

## Példa: páratlan számok

```speci
Be: n∈N, szamok∈N[1..n]
Ki: db∈N
Ef: -
Uf: db=DARAB(i=1..n, szamok[i] mod 2 = 1)
```

```yaml
n: 5
szamok: [3, 72, 81, 4, 5]
db: 3
```

```yaml
n: 3
szamok: [2, 4, 6]
db: 0
```

Ez a hivatalos tárgyi példa, angol kulcsszavakkal
([megnyitás a szerkesztőben](https://progalap.elte.hu/specifikacio/v1/?uuid=058de53d-56cd-4733-93f1-8f4cf2212a86)).

## DARAB és COUNT

A `DARAB` („hány darab?”) pontosan ugyanazt jelenti, mint a `COUNT`.
*Hány osztója van egy számnak?*

```speci
Be: szam∈N
Ki: osztok∈N
Ef: szam>=1
Uf: osztok=DARAB(i=1..szam, i|szam)    // i osztója szam-nak
```

```yaml
szam: 12
osztok: 6
```

```yaml
szam: 13
osztok: 2
```

## Megszámolás összetett feltétellel

A feltétel tetszőleges logikai kifejezés lehet: összehasonlíthat
szomszédokat, hívhat függvényt, tartalmazhat kvantort. *Hányszor emelkedett a
hőmérséklet egyik napról a másikra?*

```speci
Be: n∈N, t∈Z[1..n]
Ki: emel∈N
Ef: -
Uf: emel=DARAB(i=1..n-1, t[i]<t[i+1])
```

```yaml
n: 6
t: [3, 5, 4, 4, 8, 9]
emel: 3
```

Figyeld meg az `1..n-1` tartományt: `i = n`-re a `t[i+1]` nem létezne.

## DARAB vagy SUM?

A `DARAB(i=e..u, β(i))` ugyanaz, mint a `SUM(i=e..u, 1, β(i))`: minden
illeszkedő indexre 1-et adunk hozzá. Mégis a `DARAB`-ot használd, mert
megnevezi a tételt.

## Gyakori hibák

- **Csak egy argumentum jöhet a tartomány után.** A `DARAB` pontosan a
  tartományt és egy feltételt kap. Ha értéket is számolnál, valószínűleg
  `SUM` kell.
- **Értéket számolsz feltétel helyett.** A `DARAB(i=1..n, x[i])` hibás, ha az
  `x` számokat tartalmaz. A második argumentumnak igaznak vagy hamisnak kell
  lennie.
