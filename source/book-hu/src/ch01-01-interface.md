# Ismerkedés a felülettel

A szerkesztő ablaka panelekre oszlik, felül egy eszköztárral. A képernyőkép
számai a lenti táblázat sorainak felelnek meg.

<figure>
<img src="img/ui-overview.png" alt="A Specifikációszerkesztő, a részei 1-től 18-ig számozva">
<figcaption>A Specifikációszerkesztő (1.5.1-es verzió), számozott részekkel.</figcaption>
</figure>

| # | Elem | Mire való? |
|--:|------|------------|
| 1 | **Specification panel** | Ide írod a specifikációt (bal felül). |
| 2 | **Data panel** | Ide írod a teszteseteket (jobb oldalt). |
| 3 | **Visualization panel** | A kiválasztott teszteset kiértékelését mutatja (bal alul). |
| 4 | Betűméret-csúszka | A szerkesztők betűméretét állítja. |
| 5 | <kbd>S</kbd> | Megjeleníti/elrejti a Specification panelt. |
| 6 | <kbd>D</kbd> | Megjeleníti/elrejti a Data panelt. |
| 7 | <kbd>V</kbd> | Megjeleníti/elrejti a Visualization panelt. |
| 8 | <kbd>H</kbd> | Megjeleníti/elrejti a History (előzmények) panelt a korábban mentett változatokkal. |
| 9 | **New** | Új, üres specifikációt kezd. |
| 10 | **Save** | Elmenti a specifikációt a szerverre (lásd [Mentés és megosztás](ch01-03-save-share.md)). |
| 11 | **Documentation** | Megnyitja a beépített, magyar nyelvű dokumentációt (lásd [E függelék](appendix-05-builtin.md)). |
| 12 | **Usage** | Megnyitja a magyar nyelvű használati útmutatót. |
| 13 | **Insert** | A `∈ ∀ ∃ ≠ ≤ ≥` különleges karaktereket beszúró gombok. |
| 14 | **Evaluate** | Kiértékeli a specifikációt az összes tesztesetre. |
| 15 | **Teszteset-fülek** | Minden tesztesetnek saját füle van. A `+` újat ad hozzá, a `-` törli a kiválasztottat. Kiértékelés után a fül zöld (átment) vagy piros (elbukott) lesz. |
| 16 | Aktuális felhasználó | A neved és az azonosítód, *Logout* (kijelentkezés) linkkel. |
| 17 | Szerzői adatok | Készítő és verzió. |
| 18 | **Feladat neve** | A specifikáció címe. Mentés előtt adj nevet minden specifikációnak. |

A zöld <kbd>S</kbd>, <kbd>D</kbd>, <kbd>V</kbd> gombok kapcsolók: a zöld azt
jelenti, hogy a panel látszik. Kis képernyőn rejtsd el, amire épp nincs
szükséged. Például a Data panelt, amíg a specifikáción dolgozol.

## A Specification panel

Ez egy szintaxiskiemeléses szövegszerkesztő. Ide írod a specifikációt
blokkonként (`Be:`, `Ki:`, `Ef:`, `Uf:`, …). A felette lévő **Insert** gombok
(13) a kurzorhoz szúrják be a matematikai jeleket. Ezeket ASCII alakban is
beírhatod:

| Jel | Gomb | Helyette írható |
|:---:|:----:|-----------------|
| `∈` | ∈ | `eleme` (angolul `in`) |
| `∀` | ∀ | `minden` (angolul `forall`) |
| `∃` | ∃ | `létezik` (angolul `exists`) |
| `≠` | ≠ | `!=` |
| `≤` | ≤ | `<=` |
| `≥` | ≥ | `>=` |

Ha a specifikációban hiba van, a szerkesztő megjelöli a sort, és kiír egy
üzenetet, például `Line 3, column 7: Expected …`. A gyakoriakat a
[Hibaüzenetek és gyakori hibák](ch08-02-errors.md) fejezet magyarázza el.

## A Data panel

A Data panel minden fülén egy teszteset van: a bemeneti változók értékei, és
a kimeneti (meg a segéd-) változók *elvárt* értékei, YAML-szerű formátumban:

```yaml,fragment
n: 5
szamok: [3, 72, 81, 4, 5]
db: 3
```

> [!TIP]
> Állj egy üres tesztesetbe, és nyomd meg a <kbd>Shift</kbd>+<kbd>Space</kbd>,
> majd a <kbd>Tab</kbd> billentyűt. A szerkesztő beszúr egy sablont az összes
> deklarált változóval, így csak az értékeket kell kitöltened.

<figure>
<img src="img/test-tabs.png" alt="Specifikáció négy zöld teszteset-füllel">
<figcaption>Négy teszteset, mind átment (zöld fülek). Az adatok a többsoros
rekordformátumot használják.</figcaption>
</figure>

## A Visualization panel

Az **Evaluate** megnyomása után ez a panel mutatja, hogyan értékelődött ki az
utófeltétel a kiválasztott tesztesetre. Két nézete van:

- **Stepper** (léptető): egyszerre egy kiértékelési lépés. A <kbd>←</kbd> és
  <kbd>→</kbd> billentyűkkel lehet lépkedni.
- **Step list** (lépéslista): az összes lépés egyszerre, soronként egy.

A **Post.cond.** jelölőnégyzet dönti el, hogy látszik-e az utófeltétel
kiértékelése. A [Léptető és lépéslista](ch08-01-stepper.md) fejezet elmagyarázza,
hogyan kell olvasni.
