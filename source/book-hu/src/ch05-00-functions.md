# Függvények

Az `Fv:` blokk (angolul `Fn:`) segédfüggvényeket definiál, ugyanúgy, ahogy a
középiskolai matematikában. Először jön a szignatúra az értelmezési
tartománnyal és az értékkészlettel (halmazok), aztán a hozzárendelési szabály:

```speci,fragment
Fv: f:N->N, f(p)=p*2
```

Így olvasd: *f természetes számokhoz természetes számokat rendel, és f(p) = 2p.*

A blokk nem kötelező. Leginkább **összetett feladatokhoz** kell, ahol egy
programozási tétel egy másikba ágyazódik (lásd
[Tételek függvényekben](ch05-01-nested.md)). Egyszerű feladatoknál is jól
olvashatóbbá teheti az utófeltételt egy jól elnevezett függvény.

## Szintaxis

```text
Fv: név:Értelmezési_tartomány->Értékkészlet, név(paraméterek)=kifejezés
```

- A **szignatúra**, a `név:ÉT->ÉK`, adja meg a halmazokat.
- Vessző után jön a **definíció**: `név(paraméterek)=kifejezés`.
- Több paraméter: az értelmezési tartomány direkt szorzat `x` jellel
  (mindkét oldalán szóköz!), például `Z x Z`.
- Több eredmény: az értékkészlet is direkt szorzat, a törzs pedig tuple-t ad
  vissza.

> [!TIP]
> A nyilat ASCII alakban, `->`-ként írd. Az Insert sávon nincs nyíl gomb, és a
> Unicode `→` mindenhol szintaktikai hiba: a szignatúrában és implikációként is.
> A képernyőképeken látható nyilak a szerkesztő betűtípusa által rajzolt `->`
> jelek.

## Példák

| Definíció | Jelentés |
|-----------|----------|
| `f:N->N, f(p)=p*2` | kétszerező függvény |
| `negyzet:Z->N, negyzet(n)=n*n` | beszédesebb név |
| `add:Z x Z->Z, add(a,b)=a+b` | két paraméter |
| `csere:Z x Z->Z x Z, csere(a,b)=(b,a)` | tuple-t ad vissza |
| `f2:Z->Z, f2(p)=p+n` | az `n` bemeneti változót használja |
| `jegy:Hallgato->N, jegy(h)=h.jegy` | rekordparaméter |
| `index:N[] x N->N, index(x,i)=x[i]` | tömbparaméter |
| `paros:N->L, paros(i)=x[i] mod 2 = 0` | logikai függvény |

Egy teljes példa:

```speci
Be: n∈N, x∈Z[1..n]
Ki: s∈N
Fv: negyzet:Z->N, negyzet(a)=a*a
Ef: -
Uf: s=SUM(i=1..n, negyzet(x[i]))
```

```yaml
n: 3
x: [1, -2, 3]
s: 14
```

## A bemeneti változók láthatók

A függvény minden deklarált változót lát, nem csak a paramétereit. Az alábbi
példában a `nagy` a `k` bemenetre és az `x` tömbre hivatkozik. Ez nagyon
gyakori: a függvények többnyire csak az **indexet** kapják paraméterként, minden
mást maguk néznek meg.

```speci
Be: n∈N, k∈N, x∈N[1..n]
Ki: c∈N
Fv: nagy:N->L, nagy(i)=x[i]>k
Ef: -
Uf: c=DARAB(i=1..n, nagy(i))
```

```yaml
n: 5
k: 10
x: [4, 12, 10, 30, 11]
c: 3
```

Ha egy paraméter neve megegyezik egy deklarált változóéval, a paraméter
**eltakarja** azt: a függvényen belül a név a paramétert jelenti.

## Több eredményt adó függvény

```speci
Be: a∈Z, b∈Z
Ki: c∈Z, d∈Z
Fv: csere:Z x Z->Z x Z, csere(p,q)=(q,p)
Ef: -
Uf: (c,d)=csere(a,b)
```

```yaml
a: 3
b: 8
c: 8
d: 3
```

## Több függvény

Minden definíció kapjon saját `Fv:` fejlécet. Ha egy blokkban vesszővel
sorolod fel őket, az szintaktikai hiba. Mindegyik használhatja az előtte állókat:

```speci,online
Be: n∈N, x∈N[1..n]
Ki: c∈N
Fv: paros:N->L, paros(v)=v mod 2 = 0
Fv: jo:N->L, jo(i)=paros(x[i]) és x[i]>0
Ef: -
Uf: c=DARAB(i=1..n, jo(i))
```

```yaml
n: 5
x: [0, 2, 3, 8, 7]
c: 2
```

## Rekordparaméter

```speci
Be: n∈N, h∈Hallgato[1..n], Hallgato=(nev:S x jegy:N)
Ki: s∈N
Fv: jegy:Hallgato->N, jegy(e)=e.jegy
Ef: -
Uf: s=SUM(i=1..n, jegy(h[i]))
```

```yaml
n: 2
h: [{nev: Anna, jegy: 5}, {nev: Bence, jegy: 3}]
s: 8
```
