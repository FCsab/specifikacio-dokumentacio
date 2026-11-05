# A szerkesztő használata

Az ablak elrendezése az online szerkesztőét követi: balra a specifikáció,
jobbra a tesztesetek, alul a kiértékelés.

## Kiértékelés

Gépelés közben a háttérben **automatikusan** minden újra kiértékelődik, és a
teszt fülek zöldre vagy pirosra váltanak. Ha inkább kézzel értékelnél ki,
vedd ki a pipát az **Auto** elől, és használd az **Evaluate** gombot
(<kbd>Ctrl</kbd>+<kbd>Enter</kbd>).

Ha a kiértékelés hibát talál, a hibás sor a szerkesztőben színezve jelenik
meg. A hibakártyán a helyre kattintva odaugorhatsz.

## Írás kiegészítéssel

A szerkesztőben szintaxiskiemelés, sorszámozás és környezetfüggő kiegészítés
van:

- sor elején a **blokkfejléceket** ajánlja,
- `∈` után a **halmazneveket**,
- máshol a deklarált **változóidat, típusaidat és függvényeidet**,
- a **tételmakrók és kvantorok** sablonként szúródnak be: a `SUM`-ból
  `SUM(i=1..n, |)` lesz, a kurzor a `|` helyére kerül,
- a `forall`, `exists` vagy `leq` beírása `∀`-t, `∃`-t vagy `≤`-t szúr be.

A <kbd>↑</kbd> <kbd>↓</kbd> billentyűkkel választhatsz, a <kbd>Tab</kbd> vagy
<kbd>Enter</kbd> beszúr, az <kbd>Esc</kbd> bezárja a listát.

## Különleges karakterek

Használd a jelgombokat, vagy az <kbd>Alt</kbd>+<kbd>1</kbd> … <kbd>Alt</kbd>+<kbd>6</kbd>
billentyűket:

| Billentyű | Jel |
|-----------|:---:|
| <kbd>Alt</kbd>+<kbd>1</kbd> | `∈` |
| <kbd>Alt</kbd>+<kbd>2</kbd> | `∀` |
| <kbd>Alt</kbd>+<kbd>3</kbd> | `∃` |
| <kbd>Alt</kbd>+<kbd>4</kbd> | `≠` |
| <kbd>Alt</kbd>+<kbd>5</kbd> | `≤` |
| <kbd>Alt</kbd>+<kbd>6</kbd> | `≥` |

## A léptető

Az Evaluation panelen a **Stepper** nézetet választva redukciónként lépkedhetsz
végig a kiválasztott teszteseten:

- a formula a kiértékelt rész kiemelésével jelenik meg, az értékével és az
  aktuális ciklusváltozókkal együtt,
- a `↓`/`↑` jelzi a belépést az `Fv:` függvényeidbe és a kilépést belőlük. A
  függvényen belül a törzse lesz a mutatott formula,
- léptetni a <kbd>←</kbd> / <kbd>→</kbd> billentyűkkel, a gombokkal vagy a
  csúszkával lehet,
- a **Step list** az összes lépést egyszerre mutatja. Egyre kattintva
  odaugorhatsz.

## Billentyűparancsok

| Parancs | Művelet |
|---------|---------|
| <kbd>Ctrl</kbd>+<kbd>Enter</kbd> | kiértékelés |
| <kbd>Ctrl</kbd>+<kbd>N</kbd> | új specifikáció |
| <kbd>Ctrl</kbd>+<kbd>O</kbd> | `.sp` fájl megnyitása |
| <kbd>Ctrl</kbd>+<kbd>S</kbd> | mentés |
| <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd> | mentés másként |
| <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd> | a teljes projekt másolása egy sorként |
| <kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd> | projekt (vagy sima specifikáció) beillesztése |
| <kbd>Alt</kbd>+<kbd>1</kbd>…<kbd>6</kbd> | `∈ ∀ ∃ ≠ ≤ ≥` |
| <kbd>←</kbd> / <kbd>→</kbd> | előző / következő lépés a léptetőben |

## Megjelenés

Világos, sötét vagy rendszer szerinti téma, és állítható betűméret. A felület
a 0xProto betűtípust használja, a `∈ ∀ ∃` jelekhez a Noto Sans Math a
tartalék. Mindkettő be van építve a programba.
