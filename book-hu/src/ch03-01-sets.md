# Elemi halmazok és intervallumok

## Elemi halmazok

| Halmaz | Neve | Értékek | Példa | Tesztadat |
|:------:|------|---------|-------|-----------|
| `N` | természetes számok | 0, 1, 2, … | `a∈N` | `a: 7` |
| `Z` | egész számok | …, −1, 0, 1, … | `b∈Z` | `b: -3` |
| `R` | valós számok | pl. 3.14 | `c∈R` | `c: 2.5` |
| `L` | logikai értékek | `true`, `false` | `d∈L` | `d: true` |
| `S` | szövegek | pl. "alma" | `e∈S` | `e: alma` vagy `e: "alma"` |
| `C` | karakterek | pl. 'x' | `f∈C` | `f: 'x'` |

A `C` magyar neve, a `K` (karakter) is használható: `f2∈K`.

> [!NOTE]
> Az `N` tartalmazza a 0-t. Ha egy mennyiségnek pozitívnak kell lennie, mondd
> ki az előfeltételben: `Ef: n>0`. Ha egy érték negatív is lehet (például egy
> „−1, ha nincs ilyen” eredmény), `Z`-ként deklaráld, ne `N`-ként.

Egy példa, amely többet is használ közülük:

```speci
Be: nev∈S, kor∈N, magassag∈R
Ki: felnott∈L
Ef: magassag>0
Uf: felnott=(kor≥18) és nev=nev és magassag=magassag
```

```yaml
nev: Anna
kor: 19
magassag: 1.68
felnott: true
```

```yaml
nev: "Bence"
kor: 12
magassag: 1.45
felnott: false
```

## Intervallumok

Az intervallum két határ közötti egész számok halmaza, a határokat is
beleértve:

```speci,fragment
iv∈[1..3]
```

Az `iv` értéke 1, 2 vagy 3 lehet. A határok más bemeneti változókat tartalmazó
kifejezések is lehetnek: `[2+3..n*2]`.

Az intervallumok kis, rögzített tartományokra valók, például jegyekre vagy
hónapokra:

```speci
Be: jegy∈[1..5]
Ki: atment∈L
Ef: -
Uf: atment=(jegy≥2)
```

```yaml
jegy: 4
atment: true
```

Az intervallumon kívüli érték bukott tesztesetet ad, mert az adat nem illik a
deklarált típusra:

```yaml,red
jegy: 6
atment: true
```

Az intervallumok a kvantorokban is megjelennek, `∀i∈[1..n]:(…)` alakban (lásd
[Kvantorok](ch04-02-quantifiers.md)), és a tömbök indextartományaként is, erről
a következő alfejezet szól.
