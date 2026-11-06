# Eltérések az online szerkesztőtől

Ez a könyv az online szerkesztőt dokumentálja. A speci-local célja, hogy
pontosan azt fogadja el, amit az online szerkesztő, és minden tesztet ugyanúgy
ítéljen meg, de néhány eltérés maradt. Ezek úgy derültek ki, hogy a könyv
összes példáját és kis tesztspecifikációkat mindkét szerkesztőben lefuttattunk
(2026. november, az online szerkesztő 1.5.2-es verziója).

## Csak az online szerkesztő fogadja el

| Lehetőség | Online szerkesztő | A speci-localban |
|-----------|-------------------|------------------|
| magyar logikai konstansok | `igaz`, `hamis` | `true`, `false` |
| magyar kvantorszavak | `minden`, `létezik` | `∀`, `∃`, `forall`, `exists` |
| tartalmazás-szavak | `eleme`, `in` (`∀i in [1..n]`) | csak `∈` |
| magyar tömbfüggvények | `hossz(x)`, `tól(x)`, `ig(x)` | `length`, `from`, `to` |
| további beépített függvények | `sqrt(x)`, `round(x)` / `kerekít(x)` | nincsenek |
| további műveletek | `<>` (nem egyenlő), `∤` (nem osztója) | `≠` vagy `!=`; `nem (a\|b)` |
| indextartományos tömbliterálok | `[0..:1, 2, 3]`, `[1..,1..:[1,2],[3,4]]` | sima literálok |
| függvényblokkok | függvényenként egy fejléc: `Fv: f…` `Fv: g…`; a `Def:` az `Fv:`/`Fn:` harmadik neve | egy `Fv:` blokk, vesszővel elválasztott függvényekkel; a második fejléc hiba |
| a minták további nevei | `SZUMMA`/`SZUM`, `MEGSZÁMOL`, `ELDÖNT`/`DECISION`/`VAN`/`LÉTEZIK`, `MIND`/`EVERY`, `KERES`, `KIVÁLASZT`, `MÁSOL`/`MAP`, `KIVÁLOGAT`/`FILTER`, `MAXHA`/`MAXIF`/`FELTMAX`, `MINHA`/`MINIF`/`FELTMIN` | `SUM`, `COUNT`/`DARAB`, `EXISTS`, `FORALL`, `SEARCH`, `SELECT`, `COPY`, `MIS`, `CONDMAX`, `CONDMIN` |

A függvényblokkok szabálya miatt **két vagy több függvényt nem lehet úgy
megírni, hogy mindkét szerkesztő elfogadja**. Az online alakokat használó
példákat a könyvben **CSAK ONLINE** felirat jelöli.

## Csak a speci-local fogadja el

Ezek az online szerkesztőben hibák. Beadandó specifikációban ne használd őket.

| A speci-local elfogadja | Az online szerkesztő üzenete | Helyette |
|-------------------------|------------------------------|----------|
| Unicode nyíl: `a → b` | szintaktikai hiba | `a -> b` |
| `SELECT(i≥1, …)` | Expected ">=" but "≥" found | `SELECT(i>=1, …)` |
| `ABS(x)` | szintaktikai hiba (csak a kisbetűs függvény) | `abs(x)` |
| az `element` szó (`a element N`) | szintaktikai hiba | `∈`, `eleme` vagy `in` |
| több függvény egy `Fv:` blokkban, vesszővel elválasztva | szintaktikai hiba | függvényenként egy `Fv:` fejléc |
| kimeneti változó az előfeltételben (`Ef: m>0`, ahol `m` a `Ki:`-ben van) | Output data m is in the precondition! | a kimenetre vonatkozó feltétel az utófeltételbe való |

## Másként megítélt tesztek

| Tesztadat | Online szerkesztő | speci-local |
|-----------|-------------------|-------------|
| megismétel egy kezdőértékkel deklarált konstans tömböt (`napok∈N[1..12]=[…]`, és a tesztben `napok: […]`) | piros: „data cannot contain item with the same name” | zöld |
| kihagy egy segéd- vagy kimeneti értéket, akár egy mellékeset is, például az `ind`-et, amikor a `SEARCH` nem talált semmit | piros: „incomplite type for ind: undefined is not natural” | zöld; a hiányzó értéket kiszámolja és megmutatja |
| egy kezdőértékkel megadott, nem 1-től indexelt mátrixot indexel, például az `m5∈Z[-1..1,-1..1]=[[2,1,2],[1,0,1],[2,1,1]]` mátrixot `m5[-1,-1]`-gyel | zöld | piros: a speci-local 1-től indexel, és az `m5[-1,-1]`-et tartományon kívülinek jelzi |

## Ami csak a speci-localban van

- Sokkal részletesebb hibaüzenetek, javítási javaslattal.
- A tesztből hiányzó kimeneti értékeket kiszámolja és megmutatja.
- Automatikus kiértékelés gépelés közben.
- Kiegészítés és sablonok.
- Felismeri a fejlécek néhány gyakori elírását (például `Segéd:` vagy
  `Bemenet:`), és javasolja a helyeset.
- Helyi `.sp` fájlok és egysoros projektmegosztás (`SPECI1:`).

## Ami hiányzik

- Az előzmények (History) panel.
- Szerveroldali mentés és állandó linkek. Helyettük `.sp` fájlokat és
  `SPECI1:` sorokat használj.

## A könyv ellenőrzése az online szerkesztővel

A `source/tools/check-online.mjs` letölti az online szerkesztő kiértékelőjét, és
mindkét könyv összes példáját lefuttatja vele, ahogy a `check-examples` a
speci-locallal:

```sh
node source/tools/check-online.mjs
```
