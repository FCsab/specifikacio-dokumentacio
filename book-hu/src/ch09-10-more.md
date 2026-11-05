# További rövid példák

## Különböző értékek

> *Adott versenyeredmények listája (név és idő). Hány különböző célidőt
> jegyeztek fel?*

Egy idő akkor „új”, ha korábban nem fordult elő a listában. Számoljuk meg az
újakat: `DARAB`, beágyazott, **visszafelé** néző `FORALL`-lal.

```speci
Be: n∈N, v∈Verseny[1..n], Verseny=(nev:S x ido:N)
Ki: db∈N
Fv: uj:N->L, uj(i)=FORALL(j=1..i-1, v[i].ido≠v[j].ido)
Ef: -
Uf: db=DARAB(i=1..n, uj(i))
```

```yaml
n: 4
v:
  - nev: AS
    ido: 37
  - nev: BE
    ido: 31
  - nev: FG
    ido: 30
  - nev: PS
    ido: 37
db: 3
```

```yaml
n: 2
v: [{nev: AS, ido: 37}, {nev: BE, ido: 31}]
db: 2
```

| i | idő | korábbi idők | új? |
|--:|----:|--------------|:---:|
| 1 | 37 | (nincs: az 1..0 tartomány üres, így a `FORALL` igaz) | igen |
| 2 | 31 | 37 | igen |
| 3 | 30 | 37, 31 | igen |
| 4 | 37 | 37, 31, 30 | nem |

## Hosszú futások

> *Egy futónaplóból (idő, helyszín) sorold fel a 30 percnél hosszabb futások
> helyszíneit.*

Háromargumentumos `MIS`, egy mezőt gyűjtve. A megjegyzés az általános alakot a
feladatra illeszti:

```speci
Be: Futas=(ido:N x hely:S), n∈N, f∈Futas[1..n]
Ki: db∈N, helyek∈S[1..db]
Ef: -
Uf: (db,helyek)=MIS(i=1..n, f[i].ido>30, f[i].hely)
/* (db,y)=MIS(i=e..u, T(i), g(i))
   db, y  ~ db, helyek
   e..u   ~ 1..n
   T(i)   ~ f[i].ido>30
   g(i)   ~ f[i].hely
*/
```

```yaml
n: 4
f:
  - ido: 15
    hely: iroda
  - ido: 35
    hely: étterem
  - ido: 40
    hely: edzőterem
  - ido: 5
    hely: bolt
db: 2
helyek: [étterem, edzőterem]
```

## Órák, amelyekről mindenki késett

> *Egy mátrix rögzíti, hogy n hallgató közül ki hány percet késett m óra
> mindegyikéről. Sorold fel azokat az órákat, amelyekről minden hallgató k
> percnél többet késett.*

Ez **oszlopokat** jár be. A külső `MIS` az órákon (`j`) fut, a belső `FORALL` a
hallgatókon (`i`):

```speci
Be: n∈N, m∈N, k∈N, kesesek∈N[1..n,1..m]
Ki: db∈N, orak∈N[1..db]
Fv: kes:N->L, kes(j)=FORALL(i=1..n, kesesek[i,j]>k)
Ef: -
Uf: (db,orak)=MIS(j=1..m, kes(j))
```

```yaml
n: 3
m: 4
k: 5
kesesek: [
  [6, 8, 2, 7],
  [7, 9, 4, 8],
  [6, 6, 1, 9]
]
db: 3
orak: [1, 2, 4]
```

## A leglátogatottabb hely

> *n látogatást jegyeztek fel, mindegyik az 1..k helyek egyikére történt.
> Melyik helyet látogatták a legtöbbször?*

```speci
Be: n∈N, k∈N, hely∈N[1..n]
Ki: legjobb∈N
Fv: latog:N->N, latog(p)=DARAB(j=1..n, hely[j]=p)
Ef: k≥1 és ∀i∈[1..n]:(1≤hely[i]≤k)
Uf: (legjobb,)=MAX(p=1..k, latog(p))
```

```yaml
n: 7
k: 4
hely: [4, 1, 4, 2, 1, 4, 3]
legjobb: 4
```

## Az utolsó páratlan elem

Visszafelé keresés:

```speci
Be: n∈N, szamok∈N[1..n]
Sa: van∈L
Ki: ind∈N
Ef: -
Uf: (van,-ind)=SEARCH(i=-n..-1, szamok[-i] mod 2 = 1)
```

```yaml
n: 5
szamok: [3, 4, 7, 8, 10]
van: true
ind: 3
```

## Rendezett-e a tömb?

Relációs utófeltétel. Elég a szomszédokat összehasonlítani:

```speci
Be: n∈N, x∈Z[1..n]
Ki: rendezett∈L
Ef: -
Uf: rendezett=∀i∈[1..n-1]:(x[i]≤x[i+1])
```

```yaml
n: 5
x: [-2, 0, 0, 3, 9]
rendezett: true
```

```yaml
n: 3
x: [1, 5, 4]
rendezett: false
```
