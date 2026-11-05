# Saját halmaznevek

Bármelyik halmaznak nevet adhatunk `Nev=Halmaz` alakban. A név **nagybetűvel**
kezdődik, és a definíció a változók mellé, egy deklarációs blokkba kerül:

```speci
Be: j∈Jegy, Jegy=[1..5]
Ki: jo∈L
Ef: -
Uf: jo=(j≥2)
```

```yaml
j: 3
jo: true
```

A definícióhoz `=`-t használj, ne `:=`-t.

## Miért adjunk nevet?

A nevek olvashatóvá teszik a bonyolult adatokat. Hasonlítsd össze ezt:

```speci,fragment
h1∈(nev:S x jegy:N)[1..]
```

ezzel:

```speci,fragment
h2∈Hallgato[1..], Hallgato=(nev:S x jegy:N)
```

A második elmondja, *mi* az adat. Az elnevezett halmazt több helyen is
használhatod: más deklarációkban, függvényszignatúrákban
(`jegy:Hallgato->N`), és más elnevezett halmazok belsejében.

## Láncok és beágyazás

A nevek más nevekre is hivatkozhatnak, így akár hosszú átnevezési láncok is
készülhetnek:

```speci
Be: j2∈Erdemjegy, Erdemjegy=EgytolOtig, EgytolOtig=[1..5]
Ki: jo∈L
Ef: -
Uf: jo=(j2=j2)
```

```yaml
j2: 5
jo: true
```

Egymásba is ágyazhatók, így mély szerkezetek is leírhatók. Ebben a példában
minden hallgatónak jegylistája van:

```speci
Be: csop∈Csoport, Csoport=Hallgato[], Hallgato=(nev:S x jegyek:Jegy[]), Jegy=[1..5]
Ki: c∈N
Ef: -
Uf: c=DARAB(i=1..length(csop), length(csop[i].jegyek)>0)
```

```yaml
csop:
  - nev: Anna
    jegyek: [5, 4, 5]
  - nev: Bence
    jegyek: []
c: 1
```

A definíció állhat az első használat előtt és után is. A beépített
dokumentáció a `j∈Jegy, Jegy=[1..5]` alakot használja. Egyes tárgyi megoldások
előre veszik a rekord definícióját: `In: Trun=(time:N x loc:S), n∈N, runs∈Trun[1..n]`.

## Hová kerülnek a definíciók?

A definíciók a deklarációs blokkokba (`Be:`, `Sa:`, `Ki:`) kerülnek, a
változóktól vesszővel elválasztva. Szokás szerint abba a blokkba tesszük őket,
ahol először szükség van rájuk, általában a `Be:`-be.
