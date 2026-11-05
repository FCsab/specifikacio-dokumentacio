# Másolás: COPY

A **másolás** új tömböt állít elő úgy, hogy egy tartomány minden elemére
alkalmaz egy átalakítást.

<div class="syntax-card">

**Alak:** `y=COPY(i=e..u, f(i))`<br>
**Eredmény:** `u−e+1` elemű tömb, `f(e), f(e+1), …, f(u)`, 1-től indexelve

</div>

## Példa: abszolút értékek

```speci
Be: n∈N, szamok∈Z[1..n]
Ki: cel∈N[1..n]
Ef: -
Uf: cel=COPY(i=1..n, ABS(szamok[i]))
```

```yaml
n: 4
szamok: [3, -5, 0, -1]
cel: [3, 5, 0, 1]
```

A kimeneti tömböt ugyanakkorának deklaráljuk, mint a bemenetet: `N[1..n]`.

## Példa: mértékegység-átváltás

> *n hőmérséklet adott Celsiusban. Add meg őket Fahrenheitben.*

```speci
Be: n∈N, c∈R[1..n]
Ki: f∈R[1..n]
Ef: -
Uf: f=COPY(i=1..n, c[i]*9/5+32)
```

```yaml
n: 3
c: [0, 100, -40]
f: [32, 212, -40]
```

## Egy mező kiemelése

A `COPY` rekordok tömbjéből egyetlen mezőt is kiemelhet:

```speci
Be: n∈N, h∈Hallgato[1..n], Hallgato=(nev:S x jegy:N)
Ki: nevek∈S[1..n]
Ef: -
Uf: nevek=COPY(i=1..n, h[i].nev)
```

```yaml
n: 2
h: [{nev: Anna, jegy: 5}, {nev: Bence, jegy: 3}]
nevek: [Anna, Bence]
```

## COPY vagy MIS?

A `COPY` **minden** elemet megtart. Ha csak néhány elem kerülhet az
eredménybe, a [`MIS`](ch06-08-mis.md)-t használd, amelynek a kimeneti hossza az
adattól függ.
