# Bevezetés

Üdv *A Specifikációszerkesztő könyvében*! Ez teljes útmutató az **ELTE
Specifikációszerkesztőhöz**, a <https://progalap.elte.hu/specifikacio/> címen
elérhető webalkalmazáshoz, amelyet az ELTE Informatikai Karán a
**Programozás alapjai** (*PROGRAMMING*, `IP-18fPROGEG`) tárgyban használunk.

A szerkesztőben egy programozási feladat *formális specifikációját* írod
meg: milyen adat megy be, milyen jön ki, minek kell igaznak lennie a
bemenetre, és milyen kapcsolatnak kell fennállnia a bemenet és a kimenet
között. A szerkesztő nem csak tárolja a szöveget. **Ki is értékeli** a
specifikációt a megadott tesztesetekre, és lépésről lépésre megmutatja, hogyan
jutott az eredményre. A zöld teszt azt jelenti, hogy a specifikáció leírja a
várt választ, a piros pedig azt, hogy nem.

```speci
Be: n∈N, szamok∈N[1..n]
Ki: db∈N
Ef: -
Uf: db=DARAB(i=1..n, szamok[i] mod 2 = 1)
```

```yaml
n: 5
szamok: [3, 72, 81, 4, 5]
db: 3
```

A könyv végére magabiztosan fogsz olvasni és írni ilyen specifikációkat, és
ennél jóval nehezebbeket is.

## Kinek szól ez a könyv?

A tárgy hallgatóinak, és mindenkinek, aki a Specifikációszerkesztőt használja.
Programozási előismeret nem kell. Az alapvető matematikai jelölésekkel
(halmazok, intervallumok, „minden” és „létezik”) jó, ha tisztában vagy, a többit
menet közben elmagyarázzuk.

## Hogyan olvasd?

A fejezetek egymásra épülnek, ezért elsőre érdemes sorban haladni:

- Az **Első lépések** bemutatja a felületet, és néhány perc alatt végigvisz
  egy teljes specifikáció megírásán, tesztelésén és megosztásán.
- **A specifikációs nyelv** részletesen leírja a nyelvtant: blokkok,
  típusok, kifejezések, kvantorok, függvények.
- A **Programozási tételek** rész minden tételnek (`SUM`, `COUNT`, `MAX`,
  `SEARCH`, `MIS`, `CONDMAX`, …) saját fejezetet szán: jelentés, pontos szintaxis,
  teljes példa és a szokásos hibák.
- A **Tesztelés és kiértékelés** bemutatja a tesztadatok formátumát, a
  léptetőt, és hogy mit jelentenek az egyes hibaüzenetek.
- A **Kidolgozott példák** valódi feladatokat old meg a szövegtől a zöld
  tesztkészletig.
- A **speci-local** rész az online eszközt újraimplementáló, részletesebb
  hibaüzeneteket adó offline szerkesztőt mutatja be.
- A **függelékek** gyors referenciák: nyelvtan, jelek és billentyűparancsok,
  magyar–angol szójegyzék, GYIK.

Ha már kiismered magad, a keresővel (<kbd>S</kbd> vagy <kbd>/</kbd>) azonnal
odaugorhatsz, amire szükséged van.

## Jelölések

A specifikációt tartalmazó kódblokkok így néznek ki:

```speci,fragment
Uf: osszeg=SUM(i=1..n, szamok[i])
```

A teszteseteket (a szerkesztő *Data* paneljének tartalmát) a jobb alsó
sarokban **TESZT** felirat jelöli:

```yaml,fragment
n: 3
szamok: [1, 2, 3]
osszeg: 6
```

A **✗ PIROS** jelölésű teszt *szándékosan* bukik el. Azt mutatja, mit csinál a
szerkesztő, ha az adat nem illik a specifikációhoz.

A szerkesztő magyar (`Be:`, `Ki:`, `Ef:`, `Uf:`, `és`, `vagy`) és angol
(`In:`, `Out:`, `Pre:`, `Post:`, `and`, `or`) kulcsszavakat is elfogad. Ez a
kiadás főleg a magyar alakokat használja, és mindig megadja az angol párjukat
is. A [C függelék](appendix-03-glossary.md) minden párt felsorol.

Ezekkel a kiemelésekkel is találkozol majd:

> [!NOTE]
> Háttér-információ, ami segít megérteni, *miért* van valami így.

> [!TIP]
> Időt spóroló trükk vagy szokás.

> [!WARNING]
> Könnyen elkövethető, pontot érő hiba.

> [!IMPORTANT]
> A szerkesztő által kikényszerített szabály. Ha megszeged, hibát kapsz.

A könyv minden teljes példáját (specifikáció és a hozzá tartozó tesztesetek)
automatikusan ellenőrizzük a [speci-locallal](ch10-00-speci-local.md), így
bemásolhatod a szerkesztőbe, és ugyanazt az eredményt kapod. Néhány példa olyan
szintaxist használ, amelyet csak az online szerkesztő ismer. Ezeket **CSAK ONLINE**
felirat jelöli.

## Források

A könyv mindazt összegyűjti, ami az eszközről tudható. Forrásai a hivatalos
tárgyi segédlet (*Manual for the Specification Editor tool*, 3. kiadás), a
szerkesztő beépített dokumentációja, sok ellenőrzött tárgyi megoldás, és
kísérletekkel igazolt viselkedés. Ahol a források ellentmondtak egymásnak, az
élő szerkesztő viselkedése döntött. Ami még bizonytalan, azt jelöljük.

A könyvet [csabi.zip](https://csabi.zip) írta. A forrása a
[GitHubon](https://github.com/FCsab/specifikacio-dokumentacio) érhető el, a
javításokat szívesen fogadjuk. Minden oldal jobb felső sarkában van
szerkesztés gomb.
