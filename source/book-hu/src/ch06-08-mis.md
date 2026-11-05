# Kiválogatás: MIS

A **kiválogatás** összegyűjti mindazokat az indexeket (vagy belőlük kiszámolt
értékeket), amelyekre egy feltétel teljesül. Visszaadja, hány ilyen van, és
magukat az összegyűjtött elemeket is.

<div class="syntax-card">

**Alak:** `(db,y)=MIS(i=e..u, β(i))`<br>
**Átalakítással:** `(db,y)=MIS(i=e..u, β(i), f(i))`<br>
**Eredmény:** pár. A `db` az illeszkedő `i`-k száma, az `y` pedig `db` elemű tömb: az illeszkedő **indexek** (két argumentum esetén), vagy minden illeszkedő indexre az `f(i)` (három argumentum esetén), `i` szerint növekvő sorrendben

</div>

A kimeneti tömb hossza a darabszám, ezért `y∈N[1..db]` alakban deklaráld, a
darabszám-változóval mint határral.

## A kétargumentumos alak: illeszkedő indexek

> *Melyik napokon volt fagypont alatt a hőmérséklet?*

```speci
Be: n∈N, t∈Z[1..n]
Ki: db∈N, napok∈N[1..db]
Ef: -
Uf: (db,napok)=MIS(i=1..n, t[i]<0)
```

```yaml
n: 6
t: [2, -1, -4, 3, 0, -2]
db: 3
napok: [2, 3, 6]
```

```yaml
n: 2
t: [5, 7]
db: 0
napok: []
```

> [!NOTE]
> Két argumentummal a `MIS` az `i` **indexeket** gyűjti össze, nem a `t[i]`
> elemeket. Az értékek összegyűjtéséhez használd a háromargumentumos alakot
> `f(i) = t[i]`-vel.

## A háromargumentumos alak

A harmadik argumentum megmondja, *mit* gyűjtsünk össze minden illeszkedő
indexre:

```speci
Be: n∈N, t∈Z[1..n]
Ki: db∈N, hideg∈Z[1..db]
Ef: -
Uf: (db,hideg)=MIS(i=1..n, t[i]<0, t[i])
```

```yaml
n: 6
t: [2, -1, -4, 3, 0, -2]
db: 3
hideg: [-1, -4, -2]
```

> [!WARNING]
> **Figyelj az argumentumok sorrendjére.** A `MIS`-ben a feltétel a *második*,
> az összegyűjtött érték a *harmadik*. A szűrt `SUM`-nál fordítva van:
> `SUM(i=…, érték, feltétel)`.

### Példa: rekordok mezői

Gyűjtsük össze minden 30 percnél hosszabb futás helyszínét. Ez tárgyi példa
(ezért angol nevekkel). Figyeld meg a megjegyzést, amely az általános alakot a
feladatra illeszti:

```speci
In: Trun=(time:N x loc:S), n∈N, runs∈Trun[1..n]
Out: cnt∈N, location∈S[1..cnt]
Pre: -
Post: (cnt,location)=MIS(i=1..n, runs[i].time>30, runs[i].loc)
/* (cnt,y)=MIS(i=b..e, A(i), f(i))
   cnt, y ~ cnt, location
   b..e   ~ 1..n
   A(i)   ~ runs[i].time>30
   f(i)   ~ runs[i].loc
*/
```

```yaml
n: 4
runs:
  - time: 15
    loc: office
  - time: 35
    loc: restaurant
  - time: 40
    loc: gym
  - time: 5
    loc: shop
cnt: 2
location: [restaurant, gym]
```

## Más tételekkel kombinálva

Az összegyűjtött tömb egy másik tétel bemenete lehet. *A legtávolabbi városok
közül mennyi a legolcsóbb jegy?* A `MAX` megtalálja a legnagyobb távolságot, a
`MIS` összegyűjti az ekkora távolsághoz tartozó árakat, a `MIN` pedig kiválasztja
a legolcsóbbat:

```speci
Be: n∈N, varos∈Varos[1..n], Varos=(tav:N x ar:N)
Sa: leg∈N, db∈N, arak∈N[1..db]
Ki: jegy∈N
Ef: n>0
Uf: (,leg)=MAX(i=1..n, varos[i].tav) és
    (db,arak)=MIS(i=1..n, varos[i].tav=leg, varos[i].ar) és
    (,jegy)=MIN(i=1..db, arak[i])
```

```yaml
n: 4
varos: [{tav: 500, ar: 90}, {tav: 900, ar: 120}, {tav: 900, ar: 80}, {tav: 300, ar: 20}]
leg: 900
db: 2
arak: [120, 80]
jegy: 80
```

A segédváltozóknak (`leg`, `db`, `arak`) is szerepelniük kell a tesztesetben, az
elvárt értékükkel.
