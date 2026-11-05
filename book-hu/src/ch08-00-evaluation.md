# Kiértékelés

Ha a specifikáció kész, és van legalább egy teszteset, nyomd meg az
**Evaluate** gombot. A szerkesztő ekkor minden tesztesetet feldolgoz:

1. **Beolvasás.** Elolvassa a specifikációt. A szintaktikai hiba mindent
   leállít, és a Specification panelben jelenik meg.
2. **Statikus ellenőrzések.** Feloldja a neveket, ellenőrzi a típusokat és a
   [minden-változó szabályt](ch02-03-all-variables.md).
3. **Az adatok betöltése.** Beolvassa a teszteseteket, és összeveti őket a
   deklarált típusokkal: hossz, tartományok, rekordmezők.
4. **Előfeltétel.** Kiértékeli az előfeltételt a bemenetre. Ha hamis, a teszt
   piros.
5. **Utófeltétel.** Kiértékeli az utófeltételt a bemenettel és az elvárt
   kimenetekkel. Ha igaz, a teszt zöld, különben piros.

A szerkesztő tehát nem kiszámolja a kimenetet, hogy összevesse a tiéddel.
*Egy állítást* értékel ki a kimenetedről. Egy `db=DARAB(…)` jellegű
tételmakrónál a különbség nem látszik: kiszámolja a `DARAB` értékét, és
összeveti a `db`-vel. Egy relációs utófeltételnél (`∃i…`) viszont tényleg csak
azt ellenőrzi, igaz-e az állítás.

## A fejezet tartalma

- [Léptető és lépéslista](ch08-01-stepper.md): hogyan kövesd egy
  teszteset kiértékelését.
- [Hibaüzenetek és gyakori hibák](ch08-02-errors.md): mit jelentenek az
  üzenetek, és hogyan javítsd a leggyakoribb hibákat.
