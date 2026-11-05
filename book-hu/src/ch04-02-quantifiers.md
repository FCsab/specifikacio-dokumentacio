# Kvantorok: ∀ és ∃

A kvantorokkal egyetlen állítás szólhat egy intervallum **minden eleméről**,
vagy arról, hogy **legalább egy** elemére teljesül valami. Ezekre épül az
előfeltételek és sok utófeltétel gerince.

## Az univerzális kvantor: ∀

```speci,fragment
∀i∈[1..3]:(i>0)
```

Így olvasd: *minden i-re, ami [1..3] eleme, teljesül, hogy i > 0.* Az
általános alak:

```text
∀változó∈[tól..ig]:(állítás)
```

Leggyakrabban egy tömb indexeinek bejárására használjuk:

```speci
Be: n∈N, x∈Z[1..n]
Ki: mindNagy∈L
Ef: -
Uf: mindNagy=∀i∈[1..n]:(x[i]>10)
```

```yaml
n: 3
x: [11, 25, 12]
mindNagy: true
```

```yaml
n: 3
x: [11, 5, 12]
mindNagy: false
```

## Az egzisztenciális kvantor: ∃

```speci,fragment
∃i∈[1..3]:(i=2)
```

Így olvasd: *létezik olyan i [1..3]-ban, amelyre i = 2.* Tömböknél ez azt
mondja ki, hogy valamelyik elemnek megvan egy tulajdonsága:

```speci
Be: n∈N, x∈Z[1..n]
Ki: vanKicsi∈L
Ef: -
Uf: vanKicsi=∃i∈[1..n]:(x[i]<3)
```

```yaml
n: 4
x: [7, 9, 2, 8]
vanKicsi: true
```

## Szóalakok

A jelek szóval is írhatók:

| Jel | Angol szó | Magyar szó |
|:---:|-----------|------------|
| `∀` | `forall` | `minden` |
| `∃` | `exists` | `létezik` |
| `∈` | `element` | `eleme` |

```speci
Be: n∈N, x∈N[1..n]
Ki: jo∈L
Ef: -
Uf: jo=forall i element [1..n]:(x[i]>0)
```

```yaml
n: 2
x: [1, 2]
jo: true
```

A magyar szóalakok a beépített dokumentációból származnak, és csak az online
szerkesztő ismeri őket:

```speci,online
Be: n∈N, x∈N[1..n]
Ki: jo∈L
Ef: igaz
Uf: jo=minden i eleme [1..n]:(x[i]>0) és létezik i eleme [1..n]:(x[i]=1)
```

## Nyitott hosszúságú tömbök

Ha a tömb hossza nem bemenet, a határokat a tömbtől kérdezzük le:

```speci
Be: x∈N[]
Ki: vanKicsi∈L
Ef: -
Uf: vanKicsi=(∃i∈[1..length(x)]:(x[i]<3) és ∃i∈[from(x)..to(x)]:(x[i]<3))
```

```yaml
x: [5, 1, 9]
vanKicsi: true
```

## Beágyazás

A kvantorok egymásba ágyazhatók, például hogy egy mátrix minden soráról és a
soron belüli elemekről mondjunk valamit. *Minden sorban van 10-es:*

```speci
Be: m∈N[1..3,1..3]
Ki: jo∈L
Ef: -
Uf: jo=∀i∈[1..3]:(∃j∈[1..3]:(m[i,j]=10))
```

```yaml
m: [[10, 0, 0], [0, 10, 0], [1, 2, 10]]
jo: true
```

A belső kvantor hivatkozhat a külső változójára. *x nem csökkenő sorrendű*,
vagyis minden elem legfeljebb akkora, mint bármelyik későbbi:

```speci
Be: n∈N, x∈Z[1..n]
Ki: rendezett∈L
Ef: -
Uf: rendezett=∀i∈[1..n]:(∀j∈[i+1..n]:(x[i]≤x[j]))
```

```yaml
n: 4
x: [1, 3, 3, 8]
rendezett: true
```

```yaml
n: 4
x: [1, 3, 2, 8]
rendezett: false
```

## Üres tartományok

Ha az intervallum üres (például `[1..0]`, amikor n = 0):

- a `∀` **igaz**: nincs olyan elem, amely megsértené az állítást,
- a `∃` **hamis**: nincs olyan elem, amely teljesítené.

Ezt folyamatosan használni fogod. A `∀j∈[1..i-1]:(…)` azt jelenti, „semmi sem
volt i előtt, ami…”, és i = 1-re automatikusan igaz.

```speci
Be: n∈N, x∈Z[1..n]
Ki: a∈L, e∈L
Ef: -
Uf: a=∀i∈[1..n]:(x[i]>0) és e=∃i∈[1..n]:(x[i]>0)
```

```yaml
n: 0
x: []
a: true
e: false
```

## Kvantor vagy tétel?

A `∀i∈[1..n]:(β(i))` és a `FORALL(i=1..n, β(i))` ugyanazt jelenti, ahogy a
`∃i∈[1..n]:(β(i))` és az `EXISTS(i=1..n, β(i))` is. A kvantoros alak az
előadásokon használt matematikai jelölés. A makrós alak megnevezi a
programozási tételt (*eldöntés*), és jelzi az olvasónak, melyik algoritmust kell
használni. Lásd [Eldöntés](ch06-04-decision.md).
