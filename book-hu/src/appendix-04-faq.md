# D. függelék: Gyakori kérdések

### Piros a tesztem, pedig biztos vagyok benne, hogy jó a specifikáció.

Akkor nézd meg a tesztet. A leggyakoribb okok: rossz elvárt kimenet,
elszámolt tömbhossz (`n: 4` öt elemmel), a típusra nem illő érték (−1 `N`-ben),
és az előfeltételt megsértő bemenet. Nyisd meg a
[lépéslistát](ch08-01-stepper.md), vagy másolj be mindent a speci-localba, amely
megmondja, melyik rész hamis, és mit számol a specifikáció.

### „… is missing from the post condition!” Ez mit jelent?

Egy bemeneti változó nem szerepel az `Uf:`-ben. Lásd
[A minden-változó szabály](ch02-03-all-variables.md). Használd, vagy írd hozzá:
`és n=n`.

### Elnevezhetem a jelzőmet `exists`-nek?

Nem. Foglalt szó, akkor is, ha régi anyagok használják. Legyen `van` vagy
`talalt`. Lásd [Keresés](ch06-06-search.md).

### Mi legyen az `ind` a tesztben, ha a keresés sikertelen?

Bármi. Ha nincs találat, az utófeltétel nem köti meg. A `0` és az `n+1` is
bevett, és ki is hagyhatod.

### `SELECT` vagy `SEARCH`?

`SELECT` csak akkor, ha az előfeltétel **garantálja**, hogy van találat.
Egyébként `SEARCH`. Lásd [Kiválasztás](ch06-05-select.md).

### A `MIS` az indexeket vagy az elemeket gyűjti?

Két argumentummal az **indexeket**. Az elemek (vagy bármi más) gyűjtéséhez adj
meg egy harmadik argumentumot: `MIS(i=1..n, β(i), x[i])`. Lásd [MIS](ch06-08-mis.md).

### `Be:` vagy `In:`?

Mindkettő érvényes, és pontosan ugyanazt jelentik. Egy fájlban egy nyelvet
használj következetesen. A magyar tárgyi feladatokat általában `Be:`, `Ki:`,
`Ef:`, `Uf:` alakkal oldjuk meg.

### Kell szóköz a kettőspont után?

Ha a tartalom ugyanabban a sorban van, igen: `Be: n∈N`. Ha a fejléc külön
sorban áll, a tartalom egyszerűen a következő sorban kezdődik.

### Hogyan írjam, hogy „nincs mit mondani” az előfeltételben?

`Ef: -` (vagy `Ef: true`).

### Tételek vagy kvantorok az utófeltételben?

A tételekből algoritmus lesz, ezért a legtöbb feladat ezeket kéri. Egyes
feladatok a relációs (kvantoros) alakot kérik. A szerkesztő mindkettőt
kiértékeli. Lásd [Utófeltétel tételek nélkül](ch06-11-relational.md).

### Hány tesztesetet írjak?

Legalább hármat: egy tipikusat, egyet, amelyre nincs válasz (vagy üres
bemenetet), és egy határesetet. Lásd [Jó tesztkészlet írása](ch07-02-good-tests.md).

### Nem tölt be a szerkesztő / nem tudok belépni.

Használd offline a [speci-localt](ch10-00-speci-local.md), és ha újra elérhető,
másold át az eredményt az online szerkesztőbe.

### Hogyan osszak meg egy specifikációt?

Mentsd el, aztán másold ki a címet (tartalmazza a `?uuid=…` részt). Lásd
[Mentés és megosztás](ch01-03-save-share.md). A speci-localból a `.sp` fájlt
vagy a `SPECI1:` sort küldd el.

### Hibát találtam a könyvben.

Kattints az oldal jobb felső sarkában lévő szerkesztés ikonra, vagy nyiss egy
issue-t a [GitHubon](https://github.com/FCsab/specifikacio-dokumentacio).
