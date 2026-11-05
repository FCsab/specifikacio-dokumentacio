# Összegzés: SUM

Az **összegzés** egy értéket ad össze egy indextartományon.

<div class="syntax-card">

**Alak:** `s=SUM(i=e..u, f(i))`<br>
**Szűrt alak:** `s=SUM(i=e..u, f(i), β(i))`<br>
**Eredmény:** szám, `f(e) + f(e+1) + … + f(u)` (szűrő esetén csak azok a tagok, ahol `β(i)` teljesül)<br>
**Üres tartomány:** 0

</div>

## Példa: egy tömb összege

> *Tudjuk, hogy n napon át mennyi pénzt költöttünk naponta. Mennyit költöttünk
> összesen?*

```speci
Be: n∈N, koltes∈N[1..n]
Ki: ossz∈N
Ef: -
Uf: ossz=SUM(i=1..n, koltes[i])
```

```yaml
n: 5
koltes: [1200, 0, 3500, 800, 450]
ossz: 5950
```

```yaml
n: 0
koltes: []
ossz: 0
```

## Az összegzett érték bármilyen kifejezés lehet

Az `f(i)` nem csak tömbelem lehet, hanem `i` bármilyen kifejezése:

```speci
Be: n∈N
Ki: s∈N
Ef: -
Uf: s=SUM(i=1..n, i*i)
```

```yaml
n: 4
s: 30
```

## A szűrt alak

Egy **harmadik argumentummal**, egy feltétellel, csak azok a tagok adódnak
össze, amelyekre a feltétel teljesül. *A páros elemek összege:*

```speci
Be: n∈N, x∈N[1..n]
Ki: s∈N
Ef: -
Uf: s=SUM(i=1..n, x[i], x[i] mod 2 = 0)
```

```yaml
n: 5
x: [1, 2, 3, 4, 10]
s: 16
```

Az *n osztóinak összege* a szűrőt az oszthatósági relációval, a `|` jellel
kombinálja:

```speci
Be: n∈N
Ki: s∈N
Ef: n≥1
Uf: s=SUM(i=1..n, i, i|n)
```

```yaml
n: 12
s: 28
```

> [!WARNING]
> **Minden megszorítás kerüljön a szűrőbe.** Az „n *páratlan osztóinak*
> összege” két feltételt tartalmaz. A `SUM(i=1..n, i, i mod 2 = 1)` n-ig *minden*
> páratlan számot összead (n = 10-re 25-öt) a páratlan osztók (1 + 5 = 6)
> helyett. A helyes szűrő: `i mod 2 = 1 és i|n`.

```speci
Be: n∈N
Ki: s∈N
Ef: n≥1
Uf: s=SUM(i=1..n, i, i mod 2 = 1 és i|n)
```

```yaml
n: 10
s: 6
```

## A tömb egy ablaka

A tartománynak nem kell a teljes tömböt lefednie. *Az i index előtti d érték
összege*: `SUM(j=i-d..i-1, x[j])`. Ez a [Trurl robotjai](ch09-03-trurl.md)
feladat belső része.

## Átlag

Átlagra nincs külön makró. Oszd el az összeget a darabszámmal:

```speci
Be: n∈N, x∈N[1..n]
Ki: atlag∈R
Ef: n>0
Uf: atlag=SUM(i=1..n, x[i])/n
```

```yaml
n: 4
x: [2, 3, 5, 6]
atlag: 4
```

## Gyakori hibák

- **Túl szűk az eredmény típusa.** Ha az összeadott értékek negatívak is
  lehetnek, az eredmény `Z` legyen, ne `N`. Ha valós számok, akkor `R`.
- **A szűrő a második argumentum.** A `SUM(i=1..n, β(i), f(i))` sorrendje
  rossz. Elöl az érték, utána a feltétel, *fordítva*, mint a háromargumentumos
  `MIS`-nél.
