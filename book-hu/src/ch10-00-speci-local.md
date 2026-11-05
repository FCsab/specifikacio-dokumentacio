# speci-local: az offline szerkesztő

A [**speci-local**](https://github.com/FCsab/speci-local) az ELTE
Specifikációszerkesztő offline helyettesítője, csabi.zip munkája. Egyetlen
natív program Linuxra és Windowsra. Nem kell hozzá se bejelentkezés, se
hálózat, se böngésző.

A specifikációt és a YAML teszteseteket pontosan úgy írod, mint az online
szerkesztőben. A speci-local **gépelés közben automatikusan** mindent
kiértékel, és minden teszt füle zöld vagy piros lesz.

## Miért érdemes használni?

- **Akkor is működik, amikor az egyetemi bejelentkezés nem.** Bárhol
  megírhatod és tesztelheted a specifikációdat: vonaton, otthon, vagy a
  határidő előtti éjszakán, amikor lassú a szerver.
- **Részletesebbek a hibaüzenetei.** Minden üzenet megmutatja a sort, egy
  kalapjelet a hiba alatt, egy magyarázatot és egy konkrét javítást. Ha egy
  utófeltétel hamis, megmondja, *melyik része* bukott meg, és mit számol ki a
  specifikáció, például: „`cnt`: the test case says 2, the specification gives 3”.
- **Ugyanazokat a szabályokat ellenőrzi, mint az ELTE-s szerkesztő**: a
  minden-változó szabályt, a foglalt neveket (pl. `exists`), a blokkok
  sorrendjét és a fejlécek írásmódját. Ami itt zöld, annak ott is zöldnek kell
  lennie.
- **Kitölti a hiányzó kimeneteket.** A tesztesetből kihagyott értékeket
  kiszámolja és megmutatja, ami tesztíráskor hasznos.
- **Gépelés közben kiegészít**: fejléceket, halmazneveket, a saját
  változóidat és függvényeidet, valamint tételsablonokat.
- **A munkád sima fájlokban van.** A `.sp` fájlok változtatás nélkül
  bemásolhatók az ELTE-s szerkesztőbe.

A könyv minden példáját automatikusan ellenőrizzük a speci-locallal.

## A fejezet tartalma

- [Telepítés](ch10-01-install.md)
- [A szerkesztő használata](ch10-02-usage.md)
- [Fájlok és megosztás](ch10-03-files.md)
- [Eltérések az online szerkesztőtől](ch10-04-differences.md)
