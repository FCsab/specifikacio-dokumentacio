# A Specifikációszerkesztő

Az ELTE-n egy programozási feladat megoldása három formális szakaszra bomlik:

1. **Specifikáció.** Leírjuk, *mit* kell a programnak csinálnia. Rögzítjük
   az állapotteret (bemeneti, segéd- és kimeneti adatok), a bemenetre
   vonatkozó előfeltételt, és a bemenetet a kimenettel összekötő
   utófeltételt.
2. **Algoritmus.** Megtervezzük, *hogyan* csinálja. Általában úgy, hogy
   felismerünk a specifikációban egy programozási tételt, és felhasználjuk a
   kész algoritmusát.
3. **Implementáció és tesztelés.** Az algoritmust lefordítjuk egy valódi
   programozási nyelvre, és teszteljük.

A Specifikációszerkesztő az első szakasz eszköze. A papíron megírt
specifikációt nem lehet ellenőrizni, a szerkesztőben megírtat viszont
*futtatni* lehet. A szerkesztő:

1. beolvassa a specifikációt, és jelzi a szintaktikai hibákat,
2. beolvassa a megadott teszteseteket, és ellenőrzi, hogy az adatok
   illeszkednek-e a deklarált típusokra,
3. kiértékeli az előfeltételt a teszt bemenetén,
4. kiértékeli az utófeltételt a teszt bemenetével *és* elvárt kimenetével,
5. zöldre színezi a tesztet, ha minden teljesül, különben pirosra.

A kiértékelést lépésenként is meg tudja mutatni, ami nagyon hasznos, ha egy
teszt váratlanul piros.

## Hozzáférés

Nyisd meg a <https://progalap.elte.hu/specifikacio/> címet egy böngészőben. A
szerkesztőhöz ELTE-s fiók kell: ugyanazzal a felhasználónévvel és jelszóval
lépsz be, amivel az egyetemi hálózatra (Caesar/INF azonosító). Belépés után a
neved az ablak bal alsó sarkában jelenik meg.

> [!TIP]
> A bejelentkezés néha nem működik, például közvetlenül egy határidő előtt.
> Az offline [speci-local](ch10-00-speci-local.md) a saját gépeden fut,
> bejelentkezés nélkül, és ugyanazokat a specifikációkat fogadja el.

## A fejezet tartalma

- [Ismerkedés a felülettel](ch01-01-interface.md): minden gomb és panel.
- [Az első specifikációd](ch01-02-first-spec.md): az üres szerkesztőtől a
  zöld tesztig.
- [Mentés és megosztás](ch01-03-save-share.md): hogyan tartsd meg és küldd
  el a munkádat.
