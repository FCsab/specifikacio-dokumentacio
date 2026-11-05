# Az első specifikációd

Oldjunk meg egy kis feladatot teljesen, a feladat szövegétől a zöld tesztig.

> **Feladat.** Adott *n* darab természetes szám. Hány páratlan van köztük?

## 1. lépés: az adatok

Olvasd el a feladatot, és gyűjtsd ki, mi **megy be** és mi **jön ki**:

- be: a számok darabszáma (`n`) és maguk a számok (`szamok`),
- ki: a páratlanok száma (`db`).

A szerkesztőben minden adatot *név ∈ halmaz* alakban deklarálunk. Egy
természetes szám az `N` eleme, *n* darab, 1-től *n*-ig indexelt természetes szám
pedig az `N[1..n]` eleme:

```speci,fragment
Be: n∈N, szamok∈N[1..n]
Ki: db∈N
```

A változónevek kisbetűvel, a halmaznevek (`N`, `Z`, …) nagybetűvel kezdődnek.
Egy blokkon belül a deklarációkat vessző választja el.

## 2. lépés: az előfeltétel

Az előfeltétel azt mondja meg, minek kell igaznak lennie a bemenetre. Itt
bármilyen bemenetnek van értelme, tehát az előfeltétel egyszerűen „igaz”. Ezt
általában egy kötőjellel írjuk:

```speci,fragment
Ef: -
```

## 3. lépés: az utófeltétel

Az utófeltétel azt rögzíti, minek kell igaznak lennie a kimenetre. A `db` az
*olyan 1 és n közötti i indexek száma, amelyekre szamok[i] páratlan*. Ez a
**megszámolás** tétele, és a szerkesztőben van rá makró:

```speci,fragment
Uf: db=DARAB(i=1..n, szamok[i] mod 2 = 1)
```

A `DARAB(i=1..n, feltétel)` végigmegy az `i = 1, 2, …, n` értékeken, és
megszámolja, hányszor teljesül a feltétel. A `mod` a maradékos osztás, így a
`szamok[i] mod 2 = 1` azt jelenti, hogy „szamok[i] páratlan”.

Összerakva a specifikáció így néz ki. Gépeld be a Specification panelbe (a `∈`
jelhez használd az **Insert** gombot):

```speci
Be: n∈N, szamok∈N[1..n]
Ki: db∈N
Ef: -
Uf: db=DARAB(i=1..n, szamok[i] mod 2 = 1)
```

## 4. lépés: egy teszteset

Kattints a Data panelbe, és írj egy tesztet. Előbb a bemeneti értékek jönnek,
aztán az elvárt kimenet:

```yaml
n: 5
szamok: [3, 72, 81, 4, 5]
db: 3
```

Az öt számból három (3, 81 és 5) páratlan, ezért `db: 3`-at várunk.

## 5. lépés: kiértékelés

Nyomd meg az **Evaluate** gombot. A teszt füle **zöld** lesz: ezzel a
bemenettel és ezzel a kimenettel az utófeltétel igaz.

Most nézzük meg, milyen egy hiba. Adj hozzá egy második tesztesetet a `+`
gombbal, és írj bele szándékosan rossz elvárást:

```yaml,red
n: 5
szamok: [3, 72, 81, 4, 5]
db: 2
```

Ez a fül **piros** lesz: a `DARAB` 3-at ad, a teszt viszont 2-t mond. Nyisd meg a
Visualization panelt, és kövesd lépésről lépésre a kiértékelést.

> [!NOTE]
> A szerkesztő nem „futtat egy programot”. Egy **állítást** ellenőriz: *a
> megadott kimenet illik a megadott bemenethez*. Ezért kell minden tesztesetbe
> az elvárt kimenetet is beírni. A választ írod le, nem kiszámolod.

## 6. lépés: további tesztek

Egyetlen teszt keveset bizonyít. Írj néhányat, amelyek a feladat széleit
próbálgatják:

```yaml
n: 3
szamok: [2, 4, 6]
db: 0
```

```yaml
n: 0
szamok: []
db: 0
```

A második üres bemenet. Az üres `1..0` tartományon a `DARAB` értéke 0. A
[Jó tesztkészlet írása](ch07-02-good-tests.md) fejezet megmutatja, hogyan
érdemes rendszerezetten teszteket választani.

## Ugyanez angolul

A szerkesztő az angol kulcsszavakat is elfogadja. Ez a specifikáció pontosan
ugyanazt jelenti:

```speci
In: n∈N, nums∈N[1..n]
Out: cnt∈N
Pre: -
Post: cnt=COUNT(i=1..n, nums[i] mod 2 = 1)
```

```yaml
n: 5
nums: [3, 72, 81, 4, 5]
cnt: 3
```

Az `In`, `Out`, `Pre`, `Post` a *bemenet*, *kimenet*, *előfeltétel* és
*utófeltétel* angol neve, a `COUNT` pedig a `DARAB` angol megfelelője.

## Hogyan tovább?

Megírtál, teszteltél és kiértékeltél egy teljes specifikációt. A következő
alfejezet megmutatja, hogyan mentsd el. Utána a [II. rész](ch02-00-structure.md)
egyenként, részletesen elmagyarázza a nyelv elemeit.
