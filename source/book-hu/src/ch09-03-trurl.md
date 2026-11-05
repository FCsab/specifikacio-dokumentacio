# Trurl robotjai

> *Trurl n napon át feljegyezte, hány robotot épített. Sorold fel azokat a
> napokat, amikor több robotot épített, mint az előző d nap alatt összesen
> (1 < d < n)!*

**Feladattípus:** összetett minta. A fő minta a kiválogatás, a beágyazott az
összegzés.

## Elemzés

- **Adatok.** `n`, `d`, és a napi darabszámok: `tr∈N[1..n]`.
- **Kérdés.** *Sorold fel azokat a napokat, amikor…*: több index
  összegyűjtése, tehát **MIS**.
- **Feltétel az i. napra.** A `tr[i]` nagyobb, mint az előző *d* nap összege,
  `tr[i-d] + … + tr[i-1]`. Ez egy **SUM**, amiből függvény lesz.
- **Tartomány.** Az *i*. naphoz *d* előző nap kell, ezért az `i` `d+1`-től
  indul.
- **Előfeltétel.** A feladat szerint `1 < d < n`.

## Specifikáció

```speci
Be: n∈N, d∈N, tr∈N[1..n]
Ki: db∈N, napok∈N[1..db]
Fv: ossz:N->N, ossz(i)=SUM(j=i-d..i-1, tr[j])
Ef: 1<d<n
Uf: (db,napok)=MIS(i=d+1..n, ossz(i)<tr[i], i)
```

A `MIS` harmadik argumentuma, az `i`, a napok sorszámát gyűjti össze. Két
argumentummal is ugyanez lenne az eredmény, mert a kétargumentumos `MIS` eleve
az indexeket gyűjti. A tárgyi megoldás kiírja.

## Tesztek

Tipikus eset, két megfelelő nappal:

```yaml
n: 10
d: 3
tr: [2, 4, 5, 1, 13, 1, 1, 1, 4, 5]
db: 2
napok: [5, 9]
```

Negatív eset, csökkenő termeléssel:

```yaml
n: 5
d: 2
tr: [100, 50, 20, 10, 5]
db: 0
napok: []
```

Határeset, `d = n-1`, így csak az utolsó nap jöhet szóba:

```yaml
n: 4
d: 3
tr: [1, 1, 1, 10]
db: 1
napok: [4]
```

Az előfeltétel kizárja a `d = 1` esetet:

```yaml,red
n: 4
d: 1
tr: [1, 2, 3, 4]
db: 3
napok: [2, 3, 4]
```

## Végigkövetés (első teszt, d = 3)

| i. nap | előző napok | ossz(i) | tr[i] | ossz(i) < tr[i]? |
|-------:|-------------|--------:|------:|:----------------:|
| 4 | 2 + 4 + 5 | 11 | 1 | nem |
| 5 | 4 + 5 + 1 | 10 | 13 | **igen** |
| 6 | 5 + 1 + 13 | 19 | 1 | nem |
| 7 | 1 + 13 + 1 | 15 | 1 | nem |
| 8 | 13 + 1 + 1 | 15 | 1 | nem |
| 9 | 1 + 1 + 1 | 3 | 4 | **igen** |
| 10 | 1 + 1 + 4 | 6 | 5 | nem |

Az 5. és a 9. nap felel meg, így `db = 2` és `napok = [5, 9]`.
