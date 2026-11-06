# A specifikáció felépítése

A specifikáció **blokkok** sorozata. Minden blokk egy fejléccel (kulcsszó és
kettőspont) kezdődik, és a feladat egy részét írja le:

| Blokk | Magyar | Angol | Kötelező | Tartalom |
|-------|--------|-------|:--------:|----------|
| Bemenet | `Be:` | `In:` | **igen** | A bemeneti adatok deklarációi. |
| Segédadatok | `Sa:` | `Aux:` | nem | Az utófeltétel által használt segédadatok deklarációi. |
| Kimenet | `Ki:` | `Out:` | **igen** | A kimeneti adatok deklarációi. |
| Függvények | `Fv:` | `Fn:` | nem | Segédfüggvények definíciói. |
| Előfeltétel | `Ef:` | `Pre:` | **igen** | Logikai állítás a bemenetről. |
| Utófeltétel | `Uf:` | `Post:` | **igen** | A bemenetet és a kimenetet összekötő logikai állítás. |

Matematikailag a deklarációs blokkok a feladat *állapotterét* adják meg: a
bemeneti, segéd- és kimeneti értékek összes lehetséges kombinációjának
halmazát. Az előfeltétel kiválasztja az *értelmes bemeneteket*, az utófeltétel
pedig mindegyikhez a *helyes kimeneteket*.

Íme egy specifikáció, amely mind a hat blokkot használja:

```speci
Be: n∈N, k∈N, arak∈N[1..n]
Sa: van∈L, ind∈N
Ki: elso∈Z
Fv: olcso:N->L, olcso(i)=arak[i]<k
Ef: n≥1
Uf: (van,ind)=SEARCH(i=1..n, olcso(i)) és
    (van -> elso=ind) és
    (nem van -> elso=-1)
```

```yaml
n: 4
k: 100
arak: [250, 90, 120, 40]
van: true
ind: 2
elso: 2
```

```yaml
n: 2
k: 10
arak: [250, 90]
van: false
ind: 1
elso: -1
```

Így olvasd: *adott n, k és n darab ár, ahol n legalább 1; az elso kimenet az
első k-nál kisebb ár indexe, vagy −1, ha nincs ilyen.* Ha a `SEARCH` még nem
világos, nem baj. A saját fejezete a [Keresés](ch06-06-search.md).

## A fejezet tartalma

- [Blokkok és elrendezés](ch02-01-blocks.md): a fejlécek írásmódja, a
  blokkok sorrendje, egysoros és többsoros elrendezés.
- [Nevek, megjegyzések, foglalt szavak](ch02-02-lexical.md): milyen nevek
  megengedettek, és hogyan írjunk megjegyzést.
- [A minden-változó szabály](ch02-03-all-variables.md): az ellenőrzés,
  amin egyszer mindenki fennakad.
