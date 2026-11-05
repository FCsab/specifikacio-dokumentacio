# Feltételes maximumkeresés: CONDMAX, CONDMIN

A **feltételes maximumkeresés** egy kifejezés legnagyobb értékét keresi, de
csak **a feltételt teljesítő indexek között**. Mivel lehet, hogy egyetlen ilyen
index sincs, azt is megmondja, talált-e.

<div class="syntax-card">

**Alak:** `(van,ind,ert)=CONDMAX(i=e..u, f(i), β(i))`<br>
**Minimum:** `(van,ind,ert)=CONDMIN(i=e..u, f(i), β(i))`<br>
**Eredmény:** hármas. A `van` megmondja, teljesíti-e `β(i)`-t valamelyik `i`. Ha igen, az `ind` az első olyan index, ahol köztük `f` a legnagyobb, és `ert = f(ind)`<br>
**Argumentumsorrend:** tartomány, *érték*, *feltétel*

</div>

## Példa: a legnagyobb páros szám

> *Mi a tömb legnagyobb páros eleme, ha van ilyen?*

```speci
Be: n∈N, x∈N[1..n]
Ki: van∈L, ind∈N, ert∈N
Ef: -
Uf: (van,ind,ert)=CONDMAX(i=1..n, x[i], x[i] mod 2 = 0)
```

```yaml
n: 5
x: [7, 4, 9, 10, 3]
van: true
ind: 4
ert: 10
```

```yaml
n: 3
x: [7, 9, 3]
van: false
ind: 0
ert: 0
```

Egy sima `MAX` itt a 9-et találná meg, ami páratlan.

## Pozíciók kihagyása

A `MAX`-hoz hasonlóan a tuple üres pozíciói elhagyják a nem kívánt
eredményeket:

| Írás | Eredmény |
|------|----------|
| `(van,ind,ert)=CONDMAX(…)` | minden |
| `(van,,ert)=CONDMAX(…)` | van-e, és az érték (két vessző!) |
| `(van,ind,)=CONDMAX(…)` | van-e, és az index |

```speci
Be: n∈N, t∈Z[1..n]
Ki: vanPoz∈L, legkisebbPoz∈Z
Ef: -
Uf: (vanPoz,,legkisebbPoz)=CONDMIN(i=1..n, t[i], t[i]>0)
```

```yaml
n: 5
t: [-3, 8, 2, -1, 5]
vanPoz: true
legkisebbPoz: 2
```

(Itt a `CONDMIN` a *legkisebb* pozitív hőmérsékletet adja.)

## Feltétel szomszédos elemekre

A feltétel és az érték is nézhet több elemet. A [Dogbert csillaga](ch09-05-dogbert.md)
feladatban az érték két egymást követő mérés közötti változás, a feltétel
pedig az, hogy mindkettő egy küszöb fölött legyen:

```speci
Be: k∈N, adat∈Z[1..]
Ki: van∈L, maxert∈Z
Ef: -
Uf: (van,,maxert)=CONDMAX(i=1..length(adat)-1,
    adat[i]-adat[i+1], adat[i]>k és adat[i+1]>k)
```

```yaml
k: 10
adat: [34, 30, 1, 2, 1, 30, 33, 27, 30, 32]
van: true
maxert: 6
```

## Ha semmi sem illeszkedik

Ha a `van` hamis, az `ind`-nek és az `ert`-nek nincs jelentése, a tesztesetben
bármilyen értékük átmegy. A 0 megadása a bevett szokás.

> [!TIP]
> Ha a feladat egy konkrét „nincs válasz” értéket kér, azt implikációkkal
> állítsd elő az utófeltételben, ahogy a
> [Keresés](ch06-06-search.md#különleges-érték-jelző-helyett) fejezetben:
> `(van → ki=ert) és (nem van → ki=-1)`.
