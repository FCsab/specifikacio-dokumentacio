# Eltérések az online szerkesztőtől

A speci-local célja, hogy pontosan azt fogadja el, amit az ELTE-s szerkesztő,
és minden tesztet ugyanúgy ítéljen meg. Néhány eltérés azért maradt. Ezek a
könyv példáinak ellenőrzése közben derültek ki.

## Csak az online szerkesztő fogadja el

| Lehetőség | Példa | A speci-localban |
|-----------|-------|------------------|
| magyar logikai konstansok | `igaz`, `hamis` | `true`, `false` |
| magyar kvantor- és tartalmazás-szavak | `minden i eleme [1..n]:(…)`, `létezik` | `∀`, `∃`, `∈`, vagy `forall`, `exists`, `element` |
| magyar tömbfüggvények | `hossz(x)`, `tól(x)`, `ig(x)` | `length`, `from`, `to` |
| indextartományos tömbliterálok | `[0..:1, 2, 3]`, `[1..,1..:[1,2],[3,4]]` | sima literálok |
| külön `Fv:` fejléc minden függvénynek | `Fv: f…` `Fv: g…` | egy `Fv:` blokk, vesszővel elválasztott függvényekkel |

Az ilyen lehetőségeket használó példákat a könyvben **CSAK ONLINE** felirat
jelöli.

## Ismert hibák

- Egy **kezdőértékkel megadott, nem 1-től indexelt mátrixot**, például az
  `m5∈Z[-1..1,-1..1]=[[2,1,2],[1,0,1],[2,1,1]]`-t, a speci-local 1-től
  indexel. Az `m5[-1,-1]`-et tartományon kívülinek jelzi.

## Ami csak a speci-localban van

- Sokkal részletesebb hibaüzenetek, javítási javaslattal.
- A tesztből hiányzó kimeneti értékeket kiszámolja és megmutatja.
- Automatikus kiértékelés gépelés közben.
- Kiegészítés és sablonok.
- Felismeri a fejlécek néhány gyakori elírását (például `Segéd:` vagy
  `Bemenet:`), és javasolja a helyeset.
- `CONDMIN`, a `CONDMAX` minimumos párja.
- Helyi `.sp` fájlok és egysoros projektmegosztás (`SPECI1:`).

## Ami hiányzik

- Az előzmények (History) panel.
- Szerveroldali mentés és állandó linkek. Helyettük `.sp` fájlokat és
  `SPECI1:` sorokat használj.
