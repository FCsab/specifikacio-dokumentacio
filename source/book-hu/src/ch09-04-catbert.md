# Catbert kávészünetei

> *Catbert többnapos konferenciát szervezett, naponta négy kávészünettel. Minden
> szünetben feljegyezte, mennyi kávé fogyott. Keress egy olyan napot, amikor a
> résztvevők minden kávészünetben 5 liternél több kávét ittak!*

**Feladattípus:** összetett minta. A fő minta a keresés, a beágyazott az
eldöntés (mind).
[Hivatalos megoldás](https://progalap.elte.hu/specifikacio/v1/?uuid=96a3095f-cd78-482b-91cf-89e8a92229ab).

## Elemzés

- **Adatok.** n nap × 4 szünet, egy `kave∈N[1..n,1..4]` mátrix. (A hivatalos
  megoldásban `coffe` a neve.)
- **Kérdés.** *Keress egy napot*, ami lehet, hogy nem létezik. Ez **keresés**.
- **Feltétel az i. napra.** A négy szünet *mindegyikében* 5 felett, ez
  **FORALL**, a nap függvényeként.

## Specifikáció

```speci
Be: n∈N, kave∈N[1..n,1..4]
Sa: van∈L
Ki: ind∈N
Fv: tobb5:N->L, tobb5(i)=FORALL(j=1..4, kave[i,j]>5)
Ef: -
Uf: (van,ind)=SEARCH(i=1..n, tobb5(i))
```

## Tesztek

A 2. az egyetlen nap, amikor mind a négy szünet 5 felett volt:

```yaml
n: 3
kave: [
  [4, 5, 7, 5],
  [6, 8, 7, 9],
  [4, 5, 7, 5]
]
van: true
ind: 2
```

Nincs ilyen nap. A 2. napon van egy pontosan 5-ös szünet, az pedig nem *több*
5-nél:

```yaml
n: 3
kave: [
  [4, 3, 5, 6],
  [6, 7, 5, 6],
  [5, 6, 5, 6]
]
van: false
ind: 0
```

A hivatalos sikertelen keresés példája. Ez `ind: 4`-et (n + 1) ír, mert a
lépéslista ezt mutatja:

```yaml
n: 3
kave: [
  [5, 6, 7, 4],
  [6, 4, 6, 8],
  [1, 2, 3, 4]
]
van: false
ind: 4
```

Több jó nap, így az elsőt kell választani:

```yaml
n: 3
kave: [[1, 1, 1, 1], [6, 6, 6, 6], [9, 9, 9, 9]]
van: true
ind: 2
```

## A lépéslistában

A hivatalos megoldás lépéslistáját soronként a
[Léptető és lépéslista](ch08-01-stepper.md) fejezet magyarázza el. Látszik
benne, ahogy a kiértékelés minden napra belép a `more5` függvénybe (↓), és az
eredménnyel visszatér (↑).

## Változatok

- *Hány napon* volt minden szünet 5 felett? `SEARCH` helyett `DARAB`:
  `c=DARAB(i=1..n, tobb5(i))`.
- *Volt-e olyan nap*, amikor valamelyik szünet 5 alatt maradt? `EXISTS`
  beágyazott `EXISTS`-szel: `l=EXISTS(i=1..n, EXISTS(j=1..4, kave[i,j]<5))`.
- *Melyik* napokon? `MIS`: `(db,napok)=MIS(i=1..n, tobb5(i))`.
