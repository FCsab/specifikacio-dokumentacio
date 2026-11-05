# Eldöntés: EXISTS, FORALL

Az **eldöntés** igen/nem kérdésre válaszol egy tartományról: van-e olyan index,
amelynek megvan egy tulajdonsága (`EXISTS`), vagy mindegyiknek megvan-e
(`FORALL`).

<div class="syntax-card">

**Alak:** `l=EXISTS(i=e..u, β(i))` és `l=FORALL(i=e..u, β(i))`<br>
**Eredmény:** logikai érték (`L`)<br>
**Üres tartomány:** az `EXISTS` hamis, a `FORALL` igaz<br>
**Egyenértékű kvantorok:** `∃i∈[e..u]:(β(i))` és `∀i∈[e..u]:(β(i))`

</div>

## EXISTS: van-e…?

> *Van-e páratlan szám a számok között?*

```speci
Be: n∈N, szamok∈N[1..n]
Ki: paratlan∈L
Ef: -
Uf: paratlan=EXISTS(i=1..n, szamok[i] mod 2 = 1)
```

```yaml
n: 4
szamok: [2, 8, 7, 4]
paratlan: true
```

```yaml
n: 3
szamok: [2, 8, 4]
paratlan: false
```

## FORALL: minden…?

> *Minden szám pozitív?*

```speci
Be: n∈N, szamok∈Z[1..n]
Ki: pozitiv∈L
Ef: -
Uf: pozitiv=FORALL(i=1..n, szamok[i]>0)
```

```yaml
n: 3
szamok: [5, 1, 9]
pozitiv: true
```

```yaml
n: 3
szamok: [5, 0, 9]
pozitiv: false
```

## A kettő összefügg

„Nem minden elem pozitív” ugyanaz, mint „van olyan elem, amely nem pozitív”:

```text
nem FORALL(i=1..n, β(i))   =   EXISTS(i=1..n, nem β(i))
```

Azt használd, amelyik természetesebben hangzik a feladatban.

## Makró vagy kvantor?

```speci
Be: n∈N, x∈Z[1..n]
Ki: a∈L, b∈L
Ef: -
Uf: a=EXISTS(i=1..n, x[i]<0) és b=∃i∈[1..n]:(x[i]<0)
```

```yaml
n: 3
x: [4, -1, 2]
a: true
b: true
```

A kettő mindig ugyanazt adja. A különbség a szándékban van. A makró azt mondja:
„ez az *eldöntés* tétele, az eldöntés algoritmusával kell megvalósítani”. A
kvantor tisztán logikai állítás. Az előfeltételekben általában a kvantort, a
kimenetet definiáló utófeltételekben a makrót használjuk.

## Építőelemként

Az eldöntés gyakran egy összetett feladat *belső* része. *Keress egy napot,
amikor minden kávészünetben 5 liternél több fogyott*: ez egy keresés, amelynek
a feltétele egy `FORALL`. Lásd [Catbert kávészünetei](ch09-04-catbert.md).

```speci
Be: n∈N, kave∈N[1..n,1..4]
Ki: vanIlyenNap∈L
Fv: tobb5:N->L, tobb5(i)=FORALL(j=1..4, kave[i,j]>5)
Ef: -
Uf: vanIlyenNap=EXISTS(i=1..n, tobb5(i))
```

```yaml
n: 2
kave: [[6, 6, 6, 5], [7, 8, 9, 6]]
vanIlyenNap: true
```
