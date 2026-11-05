# A minden-változó szabály

> [!IMPORTANT]
> **Minden bemeneti változónak szerepelnie kell az utófeltételben.** A
> szerkesztő ellenőrzi ezt, és ha nem teljesül, elutasítja a specifikációt.

A szabály mögötti gondolat: ha egy bemenet nem befolyásolja az eredményt, akkor
vagy nem is igazi bemenet, vagy az utófeltétel megfeledkezett róla. A hivatalos
segédlet szerint: *„The postcondition must include all declared data.”*, vagyis
az utófeltételnek minden deklarált adatot tartalmaznia kell.

## Milyen a hibaüzenet?

```speci,error
Be: n∈N, x∈N[1..n], egyeb∈N
Ki: s∈N
Ef: egyeb>0
Uf: s=SUM(i=1..n, x[i])
```

A szerkesztő válasza:

```text
Line 1, column 21: egyeb is missing from the post condition!
```

Három részlet az üzenetről:

- A változó **deklarációjára** mutat, nem az utófeltételre. Ha a `Be:`
  blokkon belül látsz piros jelet, az azt jelenti: „ezt a bemenetet sehol nem
  használod”.
- Ha a változó **csak az előfeltételben** szerepel, az **nem számít**, ahogy a
  példában az `egyeb>0` mutatja.
- Ez az ellenőrzés minden más után fut le. Ha csak ezt a hibát kapod, a
  specifikáció többi része szintaktikailag rendben van.

## „Közvetett” használat

Egy változó akkor is használtnak számít, ha az utófeltételben **bárhol**
megjelenik: ciklushatárként, indexben, vagy egy olyan függvényben, amit az
utófeltétel meghív. Itt az `n` csak a tartomány felső határa, a `k` pedig csak a
függvényben szerepel:

```speci
Be: n∈N, k∈N, x∈N[1..n]
Ki: c∈N
Fv: nagy:N->L, nagy(i)=x[i]>k
Ef: -
Uf: c=DARAB(i=1..n, nagy(i))
```

```yaml
n: 4
k: 5
x: [3, 8, 6, 1]
c: 2
```

## A hézag kitöltése: `n=n`

Néha egy tételnek tényleg nincs szüksége valamelyik bemenetre. A tipikus eset a
[`SELECT`](ch06-05-select.md), amelynek nincs felső határa. Ilyenkor írj egy
mindig igaz azonosságot az utófeltételbe:

```speci
Be: n∈N, szamok∈Z[1..n]
Ki: ind∈N
Ef: ∃i∈[1..n]:(szamok[i] mod 2 = 1)
Uf: ind=SELECT(i≥1, szamok[i] mod 2 = 1) és n=n
```

```yaml
n: 5
szamok: [23, 25, 26, 28, 29]
ind: 1
```

Az `n=n` mindig igaz, tehát nem változtat a jelentésen, de így az `n` szerepel
az utófeltételben. Ha több változó is kimarad, fűzd őket egymás után:
`… és n=n és k=k`.

> [!NOTE]
> A szabály a **bemeneti** változókra vonatkozik. A segéd- és kimeneti
> változókat az utófeltétel amúgy is megköti, hiszen éppen arra valók.
