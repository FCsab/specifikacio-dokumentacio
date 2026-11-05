# Tételek összeépítése

A valódi feladatok ritkán férnek bele egyetlen tételbe. Kétféleképpen
kombinálják a tételeket:

- **beágyazással**: az egyik tétel feltétele vagy értéke maga is tétel
  („keress egy napot, amikor *minden* szünetben…”),
- **egymásutánnal**: az egyik tétel eredménye a következő bemenete
  („keresd meg a maximumot, aztán gyűjtsd ki az összes vele egyenlőt”).

## Beágyazás

Tedd a belső tételt a külső ciklusváltozó egy [függvényébe](ch05-01-nested.md).
*Keress egy napot, amikor minden kávészünetben 5 liternél több fogyott:*

| Szint | Kérdés | Tétel |
|-------|--------|-------|
| külső | melyik nap? | `SEARCH` a napokon |
| belső | az *i*. nap minden szünetében 5 felett volt? | `FORALL` a szüneteken |

```speci
Be: n∈N, kave∈N[1..n,1..4]
Sa: van∈L
Ki: ind∈N
Fv: tobb5:N->L, tobb5(i)=FORALL(j=1..4, kave[i,j]>5)
Ef: -
Uf: (van,ind)=SEARCH(i=1..n, tobb5(i))
```

```yaml
n: 3
kave: [[4, 5, 7, 5], [6, 8, 7, 9], [4, 5, 7, 5]]
van: true
ind: 2
```

A tárgyi anyag ezt így írja le: *„compound pattern; search is the main pattern,
and decision all is the nested pattern”*. Magyarul: összetett minta, a keresés
a fő minta, az eldöntés (mind) a beágyazott.

## Egymásután segédváltozókkal

Ha egy későbbi lépésnek szüksége van egy korábbi eredményre, tárold egy
**segédváltozóban** (`Sa:`), és hivatkozz rá.

> *Melyik elemek egyenlők a maximummal? Sorold fel az indexeiket.*

```speci
Be: n∈N, x∈Z[1..n]
Sa: m∈Z
Ki: db∈N, hol∈N[1..db]
Ef: n>0
Uf: (,m)=MAX(i=1..n, x[i]) és
    (db,hol)=MIS(i=1..n, x[i]=m)
```

```yaml
n: 6
x: [3, 9, 2, 9, 9, 1]
m: 9
db: 3
hol: [2, 4, 5]
```

A segédváltozók is szerepelnek a tesztesetben, az elvárt értékükkel.

## Recept

1. Írd le, mit **kérdez** a feladat. Az a külső tétel.
2. Ha ennek a tételnek a feltétele (vagy értéke) maga is „van-e…”, „hány…”,
   „a legnagyobb…” egy másik tartományon, az egy **belső tétel**. Legyen a
   külső index függvénye.
3. Ha a feladat több lépésből áll („először…, aztán…”), írj lépésenként egy
   tételt, kapcsold őket `és`-sel, és az eredményeket segédváltozókon keresztül
   add tovább.
4. Írj olyan teszteket, amelyek **minden szintet** megmozgatnak: egy elemet,
   amely csak a belső ellenőrzésen bukik meg, egy olyat, amelyik átmegy rajta,
   és egy üres bemenetet.

## Példák a könyvben

| Feladat | Kombináció |
|---------|------------|
| [Yossarian térképe](ch09-02-yossarian.md) | sormaximumokat adó függvény `MAX`-a |
| [Trurl robotjai](ch09-03-trurl.md) | `MIS` beágyazott `SUM`-mal |
| [Catbert kávészünetei](ch09-04-catbert.md) | `SEARCH` beágyazott `FORALL`-lal |
| [Az utazási iroda](ch09-06-travel.md) | `MAX`, aztán `MIS`, aztán `MIN` |
| [További rövid példák](ch09-10-more.md) | `DARAB` beágyazott `FORALL`-lal, `MIS` beágyazott `FORALL`-lal |
