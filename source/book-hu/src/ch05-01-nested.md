# Tételek függvényekben

A függvények igazi ereje a **feladat felbontása**. Ha egy feladatban az egyik
tétel a másikba ágyazódik, tedd a belsőt egy függvénybe. Így az utófeltételben
tisztán látszik a külső tétel, a függvényben pedig a belső.

A táblázat a tárgyi anyagban leggyakrabban előforduló kombinációkat gyűjti
össze. Mindegyik szerepel teljes példaként a könyv későbbi részében.

| Függvény | Belső tétel | Hol szerepel? |
|----------|-------------|---------------|
| `maxoszl:N->N x N, maxoszl(i)=MAX(j=1..m, terkep[i,j])` | az *i*. sor maximuma | [Yossarian térképe](ch09-02-yossarian.md) |
| `ossz:N->N, ossz(i)=SUM(j=i-d..i-1, tr[j])` | az előző *d* érték összege | [Trurl robotjai](ch09-03-trurl.md) |
| `tobb5:N->L, tobb5(i)=FORALL(j=1..4, kave[i,j]>5)` | az *i*. sor minden eleme > 5 | [Catbert kávészünetei](ch09-04-catbert.md) |
| `kev5:N->L, kev5(i)=EXISTS(j=1..4, kave[i,j]<5)` | az *i*. sor valamelyik eleme < 5 | |
| `latog:N->N, latog(i)=DARAB(j=1..n, hely[j]=i)` | hányszor fordul elő *i* | |
| `uj:N->L, uj(i)=FORALL(j=1..i-1, v[i].ido≠v[j].ido)` | az *i*. érték nem fordult elő korábban | [További rövid példák](ch09-10-more.md) |
| `kes:N->L, kes(j)=FORALL(i=1..n, kesesek[i,j]>k)` | a *j*. oszlop minden eleme > k | [További rövid példák](ch09-10-more.md) |

## Példa: tulajdonságú sorok

> *Egy konferencia n napig tartott, naponta négy kávészünettel. Hány napon
> fogyott minden szünetben 5 liternél több kávé?*

A külső tétel a **megszámolás** (hány nap?), a belső az **eldöntés** (minden
szünet 5 felett volt?):

```speci
Be: n∈N, kave∈N[1..n,1..4]
Ki: c∈N
Fv: tobb5:N->L, tobb5(i)=FORALL(j=1..4, kave[i,j]>5)
Ef: -
Uf: c=DARAB(i=1..n, tobb5(i))
```

```yaml
n: 3
kave: [
  [4, 5, 7, 5],
  [6, 8, 7, 9],
  [6, 6, 7, 8]
]
c: 2
```

## Példa: melyik érték hányszor fordul elő?

> *n látogatást jegyeztek fel, mindegyik az 1..k helyek egyikére történt.
> Melyik helyet látogatták a legtöbbször?*

A külső tétel egy **maximum** a helyeken. A függvény egy hely látogatásait
számolja meg:

```speci
Be: n∈N, k∈N, hely∈N[1..n]
Ki: legjobb∈N
Fv: latog:N->N, latog(p)=DARAB(j=1..n, hely[j]=p)
Ef: k≥1 és ∀i∈[1..n]:(1≤hely[i]≤k)
Uf: (legjobb,)=MAX(p=1..k, latog(p))
```

```yaml
n: 6
k: 3
hely: [2, 3, 2, 1, 2, 3]
legjobb: 2
```

> [!TIP]
> Feladatolvasáskor figyeld a „**minden egyes** … **hány / legnagyobb / van-e**”
> szerkezetet. A *minden egyes* általában a külső ciklust jelzi, az egyes
> elemekről feltett kérdés pedig a belső tételt, amiből függvény lesz.

## Lehet függvény nélkül is?

Igen. Egy tétel közvetlenül is állhat egy másik belsejében:

```speci
Be: n∈N, kave∈N[1..n,1..4]
Ki: c∈N
Ef: -
Uf: c=DARAB(i=1..n, FORALL(j=1..4, kave[i,j]>5))
```

```yaml
n: 2
kave: [[6, 6, 6, 6], [6, 1, 6, 6]]
c: 1
```

A jelentés ugyanaz. A tárgyban mégis a függvényes változat a javasolt, mert
megnevezi a belső tételt, és egyértelművé teszi az algoritmus tervezését
(minden beágyazott tétel egy függvény lesz).
