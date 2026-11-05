# Hibaüzenetek és gyakori hibák

## Az online szerkesztő üzenetei

Az online szerkesztő angolul, `Line L, column C: üzenet` alakban jelzi a
hibákat. A leggyakoribbak:

### `Expected …, but "X" found.`

**Szintaktikai hiba.** A szerkesztő felsorolja, mit *fogadott volna el* azon a
helyen. Olvasd el a listát, mert megmondja, mi hiányzik.

```text
Line 8, column 1: Expected ",", "Aux:", "Ki:", "Out:", "Sa:", new line, or white space but "S" found.
```

Itt egy sor `Segéd:`-del kezdődött, ami nem fejléc. A deklarációk után csak
vessző vagy újabb deklarációs blokk jöhet. A javítás: `Sa:`.

Tipikus okok:

- elírt fejléc (`Segéd:`, `be:`, `Ef :`),
- hiányzó vessző a deklarációk között,
- hiányzó `és` két feltétel között,
- páratlan zárójelek,
- `:=` az `=` helyett.

### `X is missing from the post condition!`

A [minden-változó szabály](ch02-03-all-variables.md): az `X` bemenet nem
szerepel az utófeltételben. Használd, vagy írd hozzá: `és X=X`.

### `incomplite type for exists: undefined is not boolean`

Egy változó neve `exists` (foglalt szó). Nevezd át, például `van`-ra vagy
`talalt`-ra, mindenhol: a deklarációban, az utófeltételben és a
tesztesetekben.

## Gyakori hibák

| # | Hiba | Tünet | Javítás |
|--:|------|-------|---------|
| 1 | nincs szóköz a fejléc után ugyanabban a sorban (`Be:n∈N`) | szintaktikai hiba az 1. sorban | `Be: n∈N`, vagy tedd a fejlécet külön sorba |
| 2 | egy bemenet nincs az `Uf:`-ben | „… is missing from the post condition!” | használd, vagy `és n=n` |
| 3 | `:=` az `=` helyett | szintaktikai hiba az `Fv:`-ben vagy halmazdefinícióban | `f(x)=x*2`, `Hallgato=(…)` |
| 4 | mátrix és tömbök tömbje | indexelési hibák | `Z[1..n,1..m]` → `m[i,j]`; `Z[1..n][1..m]` → `m[i][j]` |
| 5 | eggyel elcsúszott indextartomány (`0..` vagy `1..`) | tartományon kívüli index | ellenőrizd a `from`/`to` értékét, vagy járd be a `from(x)..to(x)` tartományt |
| 6 | szomszédok összehasonlítása `n`-ig | az `x[i+1]` kilóg a tartományból | menj `n-1`-ig |
| 7 | `SELECT` létezési garancia nélkül | hibás eredmény vagy hiba | írj `∃…`-t az `Ef:`-be, vagy használj `SEARCH`-et |
| 8 | rossz alakú tuple | típushiba | `(ind,)=MAX(…)`, `(van,,ert)=CONDMAX(…)` |
| 9 | Unicode `→` a függvényszignatúrában | szintaktikai hiba az `Fv:`-ben | használd a `->` alakot |
| 10 | visszafelé keresés, de nem minden van negálva | rossz index | `(van,-ind)=SEARCH(i=-n..-1, β(-i))` |
| 11 | YAML-behúzás vagy tabulátor | nem olvasható az adat | 2 szóköz, vagy a tömör `{…}` alak |
| 12 | eltérő kis- és nagybetűs mezőnevek | „hiányzó” mező | pontosan egyezzen a deklarációval |
| 13 | működő magyar specifikáció átírása angolra (vagy fordítva) | semmi sem romlik el, csak fölösleges | mindkét kulcsszókészlet érvényes, tartsd meg a fájl stílusát |
| 14 | túl laza előfeltétel | semmi sem lesz piros! | minden határt vess össze a feladattal |
| 15 | hiányzó szűrőfeltétel a `SUM`/`DARAB`-ban | egyes bemenetekre rossz számok | *minden* megszorítást tegyél a feltételbe |
| 16 | `exists` nevű változó / kitalált kulcsszó | „incomplite type…” / „Expected …” | nevezd át / használd a `Sa:`-t |
| 17 | `N`-ként deklarált −1-es eredmény | a „nincs találat” teszt elbukik | deklaráld `Z`-ként, és az `Uf:`-ben állítsd elő a −1-et |
| 18 | zárójel nélküli implikáció | a rossz adat is átmegy | `… és (van → …)` |

## A speci-local üzenetei

A [speci-local](ch10-00-speci-local.md) ugyanezeket a szabályokat ellenőrzi,
de bővebb üzenetekkel. Mindegyik megmutatja a sort, egy kalapjelet a hiba
alatt, egy magyarázatot és egy konkrét javítást (angolul):

```text
Specification, line 2, column 6: `exists` is a reserved word and can't be used as a name
 2 | Aux: exists∈L
   |      ^
`exists` is the ASCII spelling of ∃, so it is read as an operator, not as a variable name.
Fix: Rename it everywhere (declaration, postcondition and test data), e.g. to `van` or `talalt`.
```

```text
Specification, line 4, column 30: `x[i+1]`: index 4 is out of range
 4 | Post: c=COUNT(i=1..n, x[i]<x[i+1])
   |                              ^
`x` has 3 element(s), its indexes are 1..3.
Fix: Check the loop bounds; when you look at `x[i+1]`, the loop must stop at n-1.
```

A piros tesztnél megmondja, *melyik* rész hamis, és mit számol ki a
specifikáció:

```text
Specification, line 4, column 7: The postcondition (Post) is false: `cnt=COUNT(i=1..n, nums[i] mod 2 = 1)` does not hold
 4 | Post: cnt=COUNT(i=1..n, nums[i] mod 2 = 1)
   |       ^
Values used: cnt = 2, n = 5, nums = [3, 72, 81, 4, 5].
`cnt`: the test case says 2, the specification gives 3
Fix: Either the expected output in the test case is wrong, or the postcondition does not describe the task.
```

Ha egy online hibaüzenetet nehéz megérteni, másold be a specifikációt a
speci-localba. A magyarázatából általában kiderül, mi a gond.
