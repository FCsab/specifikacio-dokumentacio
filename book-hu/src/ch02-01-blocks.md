# Blokkok és elrendezés

## A fejlécek írásmódja

A fejlécek **kis- és nagybetű-érzékenyek**, és pontosan így kell írni őket:

| Magyar | Angol | Jelentés |
|--------|-------|----------|
| `Be:` | `In:` | bemenet |
| `Sa:` | `Aux:` | segédadat |
| `Ki:` | `Out:` | kimenet |
| `Fv:` | `Fn:` | függvény |
| `Ef:` | `Pre:` | előfeltétel |
| `Uf:` | `Post:` | utófeltétel |

Az olyan alakok, mint a `be:`, a `BE:`, az `Ef :` (szóköz a kettőspont előtt)
vagy a `Bemenet:`, nem fejlécek, és a szerkesztő szintaktikai hibát jelez
náluk.

> [!WARNING]
> A segédadatok fejléce **`Sa:`**, nem `Segéd:`. A kézenfekvő fordítás
> rossz, a szerkesztő így válaszol rá:
> `Expected ",", "Aux:", "Ki:", "Out:", "Sa:", new line, or white space but "S" found.`

> [!TIP]
> Ha nem vagy biztos benne, mit lehet egy adott helyre írni, nézd meg a
> hibaüzenetet: felsorolja, mit *várt* ott a szerkesztő. A fenti üzenetből
> például kiderül, hogy deklarációs lista után csak vessző vagy egy újabb
> deklarációs blokk jöhet.

## A blokkok sorrendje

Elöl a deklarációs blokkok, a végén a logikai állítások:

```text
Be/In  →  Sa/Aux  →  Ki/Out  →  Fv/Fn  →  Ef/Pre  →  Uf/Post
```

Figyelj: a kimenet blokkja a feltételek *előtt* van. A `Ki:` deklarálja az
eredményt, nem az utolsó blokk. A nem használt blokkokat (`Sa:`, `Fv:`)
egyszerűen elhagyjuk.

Egy specifikáción belül keverheted a magyar és angol fejléceket, de ne tedd.
Egy fájlban maradj egy nyelvnél.

## „A” elrendezés: minden egy sorban

A tartalom a fejléc után, ugyanabban a sorban, egy szóközzel elválasztva is
jöhet:

```speci
Be: n∈N, szamok∈Z[1..n]
Ki: s∈Z
Ef: -
Uf: s=SUM(i=1..n, szamok[i])
```

```yaml
n: 3
szamok: [4, -1, 10]
s: 13
```

A hivatalos segédlet a záró szóközt a fejléc részének tekinti: „`In: ` (there
is a space at the end of the string)”. Ebben az elrendezésben a szóköz
kötelező.

## „B” elrendezés: a fejléc külön sorban

A fejléc állhat egyedül is, a tartalom pedig a következő sorokban jön. A magyar
tárgyi megoldásokban gyakori, soronként egy deklarációval:

```speci
Be:
n∈N,
k∈N,
ar∈N[1..n]

Ki:
db∈N

Ef:
n>=1 és k>=1

Uf:
db=DARAB(i=1..n, ar[i]<k)
```

```yaml
n: 4
k: 100
ar: [250, 90, 120, 40]
db: 2
```

Ennek az elrendezésnek a szabályai:

1. A blokk utolsó deklarációja kivételével mindegyik vesszővel zárul, ugyanúgy,
   mintha egy sorban lennének.
2. Üres sor állhat a blokkok között, sőt egy blokkon belül a deklarációk
   között is.
3. A fejléc továbbra is kis- és nagybetű-érzékeny.

## Hosszú feltételek

Az elő- és utófeltétel több sorra is tördelhető. A sort egy műveleti jellel,
például `és`-sel zárd, hogy egyértelmű legyen: az állítás folytatódik.

```speci
Be: n∈N, x∈Z[1..n]
Ki: poz∈N, neg∈N
Ef: -
Uf: poz=DARAB(i=1..n, x[i]>0) és
    neg=DARAB(i=1..n, x[i]<0)
```

```yaml
n: 5
x: [3, -2, 0, 7, -9]
poz: 2
neg: 2
```

A folytatósorok behúzása csak az olvashatóságot szolgálja.

## Több függvény

Egy `Fv:` blokk több függvényt is definiálhat, vesszővel elválasztva. Minden
definíció egy szignatúrából és a törzsből áll:

```speci
Be: n∈N, x∈N[1..n]
Ki: s∈N
Fv: negyzet:N->N, negyzet(a)=a*a,
    paros:N->L, paros(a)=a mod 2 = 0
Ef: -
Uf: s=SUM(i=1..n, negyzet(x[i]), paros(x[i]))
```

```yaml
n: 4
x: [1, 2, 3, 4]
s: 20
```

Az online szerkesztő minden függvénynek külön `Fv:` fejlécet is elfogad. A
beépített dokumentációja is így van megírva:

```speci,online
Be: n∈N, x∈N[1..n]
Ki: s∈N
Fv: negyzet:N->N, negyzet(a)=a*a
Fv: paros:N->L, paros(a)=a mod 2 = 0
Ef: -
Uf: s=SUM(i=1..n, negyzet(x[i]), paros(x[i]))
```

A speci-local egyetlen `Fv:` blokkot enged, ezért a vesszős alak az, ami
mindenhol működik.

A függvényekről részletesen a [Függvények](ch05-00-functions.md) fejezet szól.
