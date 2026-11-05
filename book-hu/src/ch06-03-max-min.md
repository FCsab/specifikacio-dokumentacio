# Maximum- és minimumkiválasztás: MAX, MIN

A **maximumkiválasztás** megkeresi egy kifejezés legnagyobb értékét egy
tartományon, és azt is, *hol* veszi fel. A **minimumkiválasztás** ugyanezt
teszi a legkisebbel.

<div class="syntax-card">

**Alak:** `(ind,ert)=MAX(i=e..u, f(i))` és `(ind,ert)=MIN(i=e..u, f(i))`<br>
**Eredmény:** pár: az `ind` index, ahol `f` a legnagyobb (legkisebb), és az `ert = f(ind)` érték<br>
**Egyenlőség esetén:** az **első** ilyen index<br>
**Üres tartomány:** nem megengedett, az előfeltételnek garantálnia kell legalább egy elemet

</div>

## Példa: a legmelegebb nap

```speci
Be: n∈N, t∈Z[1..n]
Ki: nap∈N, hom∈Z
Ef: n>0
Uf: (nap,hom)=MAX(i=1..n, t[i])
```

```yaml
n: 5
t: [12, 17, 9, 17, 3]
nap: 2
hom: 17
```

A maximum, a 17, a 2. és a 4. napon fordul elő. A `MAX` az elsőt választja, a
2. napot.

```yaml,red
n: 5
t: [12, 17, 9, 17, 3]
nap: 4
hom: 17
```

## Csak az egyik eredmény megtartása

Hagyj egy üres pozíciót a tuple-ben:

| Írás | Eredmény |
|------|----------|
| `(ind,ert)=MAX(…)` | mindkettő |
| `(ind,)=MAX(…)` | csak az index (figyeld a záró vesszőt) |
| `(,ert)=MAX(…)` | csak az érték |

```speci
Be: n∈N, t∈Z[1..n]
Ki: leghidegebb∈Z
Ef: n>0
Uf: (,leghidegebb)=MIN(i=1..n, t[i])
```

```yaml
n: 4
t: [3, -2, 8, -2]
leghidegebb: -2
```

## Egy kifejezés maximuma

Az `f(i)` bármilyen kifejezés lehet. *Melyik napon volt a legnagyobb a
változás az előző naphoz képest?*

```speci
Be: n∈N, t∈Z[1..n]
Ki: nap∈N
Ef: n≥2
Uf: (nap,)=MAX(i=2..n, ABS(t[i]-t[i-1]))
```

```yaml
n: 5
t: [10, 12, 4, 6, 7]
nap: 3
```

## A komponensek elérése névvel

A `MAX` eredménye közvetlenül használható egy kifejezésben. A részei a
**`.maxind`** és a **`.maxval`** nevet viselik. Ez akkor hasznos, ha a maximum egy
függvényből jön:

```speci
Be: n∈N, t∈Z[1..n]
Ki: v∈Z
Ef: n>0
Uf: v=MAX(i=1..n, t[i]).maxval
```

```yaml
n: 3
t: [4, 9, 1]
v: 9
```

A [Yossarian térképe](ch09-02-yossarian.md) ezzel keresi meg egy mátrix
maximumát.

## Gyakori hibák

- **Hiányzó előfeltétel.** A semmi maximuma nem létezik. `n∈N` esetén az
  `n: 0` teszt lehetséges, ezért az előfeltételnek `n>0`-t kell mondania.
- **Elfelejtett tuple.** Az `m=MAX(i=1..n, x[i])` egy számot hasonlít össze egy
  párral. Írd így: `(,m)=MAX(…)`.
- **Az értékbe rejtett feltétel.** „A legnagyobb *páros* szám” nem `MAX`, mert
  a maximum lehet páratlan is. Használd a [`CONDMAX`](ch06-09-condmax.md)-ot.
