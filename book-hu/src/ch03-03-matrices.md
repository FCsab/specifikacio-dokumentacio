# Mátrixok és tömbök tömbjei

## Mátrixok

A **mátrixnak** (kétdimenziós tömbnek) két indextartománya van, vesszővel
elválasztva:

```speci,fragment
m1∈Z[1..8,1..8]
```

Ez egy 8×8-as egész mátrix. Egy elemét **mindkét indexszel, egy zárójelpárban**
címezzük: `m1[3,6]` a 3. sor 6. eleme.

| Deklaráció | Jelentés |
|------------|----------|
| `m1∈Z[1..8,1..8]` | 8×8-as mátrix |
| `m2∈Z[1..n,1..m]` | *n*×*m*-es mátrix, *n* és *m* bemenet |
| `m3∈Z[0..,0..]` | tetszőleges méretű, 0-tól indexelve; a méretet az adat dönti el |
| `m4∈Z[,]` | a `Z[1..,1..]` rövidítése |
| `m5∈Z[-1..1,-1..1]=[[2,1,2],[1,0,1],[2,1,1]]` | mátrix kezdőértékkel |

A tesztadatban a mátrix sorok listája:

```speci
Be: n∈N, m∈N, t∈Z[1..n,1..m]
Ki: s∈Z
Ef: -
Uf: s=SUM(i=1..n, SUM(j=1..m, t[i,j]))
```

```yaml
n: 2
m: 3
t: [
  [1, 2, 3],
  [4, 5, 6]
]
s: 21
```

Ugyanez egy sorban is működik: `t: [[1,2,3],[4,5,6]]`.

<figure>
<img src="img/data-matrix.png" alt="Mátrix bemenet a Data panelben">
<figcaption>Egy 3×4-es mátrix a Data panelben. A segédvonalak a beágyazást
mutatják.</figcaption>
</figure>

## Tömbök tömbjei

> [!WARNING]
> Az `m∈Z[1..n,1..m]` és az `m∈Z[1..n][1..m]` **nem ugyanaz**.
> Az első mátrix, `m[i,j]` alakban indexeljük. A második *sorozatok
> sorozata*, `m[i][j]` alakban indexeljük. Nem cserélhetők fel egymással.

A tömbök tömbje akkor hasznos, ha a sorok **különböző hosszúak**. Ezt a
„cikkcakkos” szerkezetet mátrix nem tudja leírni. A legtisztább, ha a sor
típusának nevet adunk:

```speci
Be: sorok∈Sor[], Sor=N[]
Ki: ossz∈N
Ef: -
Uf: ossz=SUM(i=1..length(sorok), length(sorok[i]))
```

```yaml
sorok: [[1, 2, 3], [4], [], [5, 6]]
ossz: 6
```

Itt a `sorok[i]` maga is tömb, ezért a `length(sorok[i])` az *i*-edik sor
hossza, a `sorok[i][j]` pedig egy elem.

## Kvantorok mátrixokon

Egy mátrix bejárása két egymásba ágyazott ciklus. A kvantorok és a tételek
ugyanígy ágyazhatók egymásba. Ez azt mondja, hogy „minden sorban van 10-es”:

```speci
Be: n∈N, m∈N, t∈N[1..n,1..m]
Ki: jo∈L
Ef: -
Uf: jo=FORALL(i=1..n, EXISTS(j=1..m, t[i,j]=10))
```

```yaml
n: 2
m: 3
t: [[10, 1, 2], [3, 10, 10]]
jo: true
```

```yaml
n: 2
m: 3
t: [[10, 1, 2], [3, 4, 5]]
jo: false
```

A [Yossarian térképe](ch09-02-yossarian.md) kidolgozott példa egy mátrix
maximumát keresi meg.
