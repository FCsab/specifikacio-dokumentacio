# Típusok és adatok

Minden változót egy **halmaz elemeként** deklarálunk:

```speci,fragment
a∈N
```

Így olvasd: „*a* a természetes számok halmazának egy eleme”. A halmaz a típus
szerepét tölti be. A szerkesztő ez alapján ellenőrzi a tesztadatokat, és ez
korlátozza, milyen értéket vehet fel a változó.

A `∈` jelet az **Insert** gombbal szúrhatod be, vagy írhatod helyette az
`element` szót (az online szerkesztőben az `eleme` szót is):

```speci
Be: a element N, b∈Z
Ki: c∈Z
Ef: -
Uf: c=a+b
```

```yaml
a: 3
b: -5
c: -2
```

A használható halmazok néhány egyszerű építőelemből állnak össze:

| Fajta | Példa | Fejezet |
|-------|-------|---------|
| Elemi halmazok | `N`, `Z`, `R`, `L`, `S`, `C` | [Elemi halmazok és intervallumok](ch03-01-sets.md) |
| Intervallumok | `[1..10]` | [Elemi halmazok és intervallumok](ch03-01-sets.md) |
| Tömbök (sorozatok) | `N[1..n]`, `Z[]` | [Tömbök](ch03-02-arrays.md) |
| Mátrixok | `Z[1..n,1..m]` | [Mátrixok és tömbök tömbjei](ch03-03-matrices.md) |
| Rekordok (direkt szorzatok) | `(nev:S x kor:N)` | [Rekordok és tuple-ök](ch03-04-records.md) |
| Saját nevek | `Hallgato=(nev:S x jegy:N)` | [Saját halmaznevek](ch03-05-aliases.md) |

Az elemek szabadon kombinálhatók, például rekordok tömbjévé, amelynek a mezői
maguk is tömbök.
