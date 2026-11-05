# Léptető és lépéslista

A Visualization panel (a <kbd>V</kbd> gombbal kapcsolható) azt mutatja, hogyan
értékelődött ki a **kiválasztott** teszteset utófeltétele. Olyan, mint egy
hibakereső a specifikációhoz. Ha egy teszt váratlanul piros, megmutatja,
*hol* lett hamis az állítás.

## A két nézet

| Nézet | Mit mutat? | Mire jó? |
|-------|-----------|----------|
| **Stepper** (léptető, alapértelmezett) | egyszerre egy lépést; a <kbd>←</kbd> és <kbd>→</kbd> billentyűkkel lehet lépni | a kiértékelés lassú, értékenkénti követésére |
| **Step list** (lépéslista) | az összes lépést egyszerre, soronként egyet | áttekintésre, és annak megtalálására, hol változik valami |

A **Post.cond.** jelölőnégyzet ki- és bekapcsolja az utófeltétel
kiértékelésének megjelenítését.

## A lépések olvasása

Minden lépés az utófeltétel, amelyben egy részt az értéke váltott fel. Az adott
lépésben megváltozott rész **sárgával van kiemelve**. Íme egy keresés
lépéslistája („keress egy napot, amikor minden kávészünetben 5 felett
fogyott”):

<figure>
<img src="img/step-list.png" alt="Egy beágyazott függvényes SEARCH lépéslistája">
<figcaption>A lépéslista. A sárga kiemelés jelzi az adott lépésben
kiértékelt részt, a ↓/↑ pedig egy függvénybe való belépést és a kilépést
belőle.</figcaption>
</figure>

A lépések sorban:

```text
Post: (exists,ind)=SEARCH(i=1..n, more5(i))     az eredeti állítás
Post: (true,2)=SEARCH(i=1..n, more5(i))         behelyettesíti a kimeneteket
Post: (true,2)=SEARCH(i=1..n, more5(i))         az alsó határ: 1
Post: (true,2)=SEARCH(i=1..3, more5(i))         a felső határ: n = 3
Post: (true,2)=SEARCH(i=1..3, more5(1))         első iteráció: i = 1
Post: (true,2)=SEARCH(i=1..3, ↓)                belép a more5(1)-be…
Post: (true,2)=SEARCH(i=1..3, more5(2))         …hamis, következő iteráció: i = 2
Post: (true,2)=SEARCH(i=1..3, ↑)                a more5(2) igazzal tért vissza
Post: (true,2)=(true,2)                         a SEARCH eredménye (true, 2)
Post: ↑                                         az összehasonlítás igaz
```

## Belépés függvénybe és kilépés: ↓ és ↑

Amikor az utófeltétel meghívja valamelyik `Fv:` függvényedet, a nyomkövetés
megjelöli:

- **↓**: a kiértékelés *belép* a függvénybe. A következő lépések a függvény
  törzsét mutatják, behelyettesített paraméterrel.
- **↑**: a függvény *visszatér* a hívóhoz, és az értéke felváltja a hívást.

A záró `↑` sorok a teljes utófeltétel kiértékelésének végét jelzik.

## Egy tipikus hibakeresés

1. Válaszd ki a piros tesztesetet.
2. Nyisd meg a **Step list** nézetet, és keresd meg az első lépést, amelynek
   az értéke meglep: rossz határt, vagy egy függvényt, amely `false`-t ad ott,
   ahol `true`-t vártál.
3. Válts a **Stepper** nézetre, és lépkedj végig azon a részen részletesen.
4. Döntsd el, hogy a **specifikáció** vagy az **elvárt kimenet** a hibás, és
   javítsd.

> [!TIP]
> Előbb tedd a lehető legkisebbé a bukó tesztet. Egy háromelemű teszt
> lépéslistáját egy pillantással átlátod.

## A speci-localban

A speci-localban is van léptető: válaszd az Evaluation panelen a *Stepper*
lehetőséget. A formulát a kiértékelt rész kiemelésével, az értékkel és az
aktuális ciklusváltozókkal mutatja. A ↓/↑ jelek és a lépéslista ugyanígy
működnek. A hibaüzenetei azt is megmondják, az utófeltétel *melyik* része hamis,
és mit számol ki a specifikáció, például:
„`cnt`: the test case says 2, the specification gives 3”.
