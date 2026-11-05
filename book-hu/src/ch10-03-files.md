# Fájlok és megosztás

## `.sp` fájlok

Menteni a <kbd>Ctrl</kbd>+<kbd>S</kbd> (*Mentés másként*:
<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd>), megnyitni a
<kbd>Ctrl</kbd>+<kbd>O</kbd> billentyűkkel lehet. A fájlt az ablakra is
húzhatod. Megnyitás után azonnal kiértékelődik.

A `.sp` fájl sima szöveg: a cím megjegyzésként, a specifikáció, és minden
teszteset blokkmegjegyzésként:

```speci
// title: Páratlan számok
Be:
n∈N,
szamok∈N[1..n]
Ki:
db∈N
Ef: -
Uf: db=DARAB(i=1..n, szamok[i] mod 2 = 1)

/*--- test ---
n: 5
szamok: [3, 72, 81, 4, 5]
db: 3
---*/

/*--- test ---
n: 0
szamok: []
db: 0
---*/
```

Mivel a tesztesetek megjegyzések, **a teljes fájl továbbra is érvényes
specifikáció**. Változtatás nélkül bemásolhatod az ELTE-s szerkesztőbe. (Az
online szerkesztő viszont nem olvassa ki a teszteket a megjegyzésekből, azokat
külön kell a Data panelbe másolni.)

A munkamenet kilépéskor automatikusan is mentődik.

## Egy teljes projekt másolása és beillesztése

A másolás gomb (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd>) a specifikációt
**az összes tesztesettel együtt** egyetlen tömör sorként teszi a vágólapra:

```text
SPECI1:…néhány száz betű, számjegy, - és _…
```

Ez chaten keresztüli küldéshez hasznos. A csevegőprogramok és levelezők által
beszúrt sortörések visszaolvasáskor nem számítanak.

A beillesztés gomb (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd>) egy ilyen sort,
vagy sima specifikációs szöveget, visszaalakít projektté. Ha a rendszer
vágólapja nem olvasható, megnyílik egy mező, ahová <kbd>Ctrl</kbd>+<kbd>V</kbd>-vel
illesztheted be.

> [!NOTE]
> A `SPECI1:` formátum a deflate-tel tömörített, URL-biztos base64 kódolású
> `.sp` szöveg. Az `1` a formátum verziószáma.

## Munka átvitele az online szerkesztőbe

1. A speci-localban jelöld ki a specifikáció szövegét (a teszt-megjegyzések
   nélkül), és másold be a Specification panelbe.
2. Minden tesztesethez nyiss egy fület a `+` gombbal, és másold be a teszt
   tartalmát.
3. Nyomd meg az **Evaluate** gombot. Mindennek zöldnek kell lennie, ahogy a
   speci-localban is volt.
4. **Save**, aztán másold ki a linket.
