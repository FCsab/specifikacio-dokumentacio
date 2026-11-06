# Az adatformátum

A tesztadat **YAML** formátumú, soronként egy változóval: a név, kettőspont,
**szóköz**, aztán az érték.

```yaml,fragment
n: 5
```

> [!TIP]
> Egy üres tesztesetben nyomd meg a <kbd>Shift</kbd>+<kbd>Space</kbd>, majd a
> <kbd>Tab</kbd> billentyűt. A szerkesztő sablont készít az összes deklarált
> változóval, a megfelelő formátumban.

## Egyszerű értékek

| Típus | Példa |
|-------|-------|
| `N`, `Z` | `n: 5`, `d: -3` |
| `R` | `atlag: 2.75` |
| `L` | `van: true`, `van: false` |
| `S` | `nev: Anna`, `nev: "Kiss Anna"`, `ures: ""` |
| `C` | `c: 'x'` |

A szövegek körüli idézőjel elhagyható, kivéve, ha a szöveg üres, vagy a YAML
számára különleges karaktert tartalmaz (`:`, `#`, kezdő szóköz, …).

## Tömbök

Szögletes zárójelben, vesszővel elválasztva:

```yaml,fragment
szamok: [3, 72, 81, 4, 5]
nevek: [Anna, Bence, "Kovács Cili"]
ures: []
```

A YAML listás alakja is működik, soronként egy elemmel, kötőjellel:

```yaml,fragment
szamok:
  - 3
  - 72
  - 81
```

## Mátrixok

Sorok listája. Az olvashatóság kedvéért több sorba írható, de egy sorban is
lehet:

```yaml,fragment
kave: [
  [4, 5, 7, 5],
  [6, 8, 7, 9],
  [4, 5, 7, 5]
]
```

```yaml,fragment
kave: [[4,5,7,5],[6,8,7,9],[4,5,7,5]]
```

Minden sornak a deklarált számú oszlopa kell legyen.

## Rekordok

**Többsoros alak.** Minden mező külön sorban, a változó alá behúzva:

```yaml,fragment
r:
  nev: Anna
  jegy: 5
```

**Tömör alak**, kapcsos zárójelben:

```yaml,fragment
r: {nev: Anna, jegy: 5}
```

## Rekordok tömbje

A többsoros alakban minden elem egy kötőjellel kezdődik, alá behúzva jönnek a
mezői:

```yaml,fragment
versenyek:
  - nev: AS
    ido: 37
  - nev: BE
    ido: 31
```

A tömör alakban `{…}` elemek listája:

```yaml,fragment
versenyek: [{nev: AS, ido: 37}, {nev: BE, ido: 31}]
```

A kettő egyenértékű. A többsoros alakot könnyebb olvasni, a tömörrel a nagy
adat kisebb helyen elfér.

> [!WARNING]
> A YAML **érzékeny a behúzásra**. Egy rekord mezőinek pontosan egymás alatt
> kell kezdődniük. Szóközt használj, ne tabulátort.

## Egy teljes példa

```speci
Be: n∈N, versenyek∈Verseny[1..n], Verseny=(nev:S x ido:N), hatar∈R
Sa: van∈L, ind∈N
Ki: gyoztes∈S
Ef: n>0
Uf: (van,ind)=SEARCH(i=1..n, versenyek[i].ido<hatar) és
    (van -> gyoztes=versenyek[ind].nev)
```

```yaml
n: 3
versenyek:
  - nev: AS
    ido: 37
  - nev: BE
    ido: 31
  - nev: FG
    ido: 30
hatar: 31.5
van: true
ind: 2
gyoztes: BE
```

```yaml
n: 2
versenyek: [{nev: AS, ido: 37}, {nev: BE, ido: 41}]
hatar: 30
van: false
ind: 0
gyoztes: ""
```

## Gyakori adathibák

| Tünet | Valószínű ok |
|-------|--------------|
| egy érték „nem illik” egy tömbre | a tömb hossza eltér a deklarált tartománytól, pl. `n: 3` és 4 elem |
| negatív számot elutasít | a változó `N` típusú, legyen `Z` |
| egy mező „hiányzik” | a mező neve el van írva, vagy más a kis- és nagybetűs írásmódja |
| a rekordot rosszul olvassa be | egy szóközzel el van csúszva a behúzás |
| gondot okoz az `exists` | foglalt szó, nevezd át a változót (lásd [Keresés](ch06-06-search.md)) |
