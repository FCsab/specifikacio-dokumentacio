# Műveletek

## Aritmetika

| Művelet | Jelentés | Példa |
|---------|----------|-------|
| `+` `-` `*` | összeadás, kivonás, szorzás | `a+b*2` |
| `/` | osztás | `s/n` |
| `mod` vagy `%` | maradékos osztás | `x mod 2 = 1`, `i%2=1` |
| `-` (előjel) | ellentett | `-x[i]` |
| `ABS(…)` | abszolút érték | `ABS(x[i])` |

A szokásos precedencia érvényes (`*` előbb, mint `+`), és a zárójelek
szabadon használhatók.

## Összehasonlítás

| Jel | ASCII | Jelentés |
|:---:|:-----:|----------|
| `=` | `=` | egyenlő |
| `≠` | `!=` | nem egyenlő |
| `<` | `<` | kisebb |
| `>` | `>` | nagyobb |
| `≤` | `<=` | kisebb vagy egyenlő |
| `≥` | `>=` | nagyobb vagy egyenlő |
| `\|` | | osztója: `a\|b` jelentése *b mod a = 0* |

Mindkét alak elfogadott, így egy teljes specifikációt be lehet gépelni egy
átlagos billentyűzeten: `1<=n és n<=100`.

Az összehasonlítások a matematikához hasonlóan **láncolhatók**: a `2≤a≤7`
jelentése `2≤a és a≤7`.

```speci
Be: a∈Z
Ki: benne∈L
Ef: -
Uf: benne=(2≤a≤7)
```

```yaml
a: 5
benne: true
```

```yaml
a: 8
benne: false
```

Az oszthatósági reláció, a `|`, tömören fejezi ki az osztókat:

```speci
Be: n∈N
Ki: d∈N
Ef: n≥1
Uf: d=DARAB(i=1..n, i|n)
```

```yaml
n: 12
d: 6
```

## Logika

| Művelet | Angolul | Jelentés |
|---------|---------|----------|
| `és` | `and` | mindkettő igaz |
| `vagy` | `or` | legalább az egyik igaz |
| `nem` | `not` | tagadás |
| `→` vagy `->` | | implikáció (következtetés) |
| `igaz`, `hamis` | `true`, `false` | konstansok |

> [!NOTE]
> Az `igaz` és a `hamis` magyar konstans a szerkesztő beépített
> dokumentációjából származik. A speci-local nem fogadja el őket. Ha azt
> szeretnéd, hogy a specifikációd mindkettőben működjön, használd a
> `true`/`false` alakot.

### Implikáció

Az `A → B` („ha A, akkor B”) csak akkor hamis, ha A igaz és B hamis:

| A | B | A → B |
|:-:|:-:|:-----:|
| igaz | igaz | igaz |
| igaz | hamis | **hamis** |
| hamis | igaz | igaz |
| hamis | hamis | igaz |

Ha A hamis, az implikáció **B-től függetlenül** igaz. Ezért az implikáció a
*feltételes* követelmények eszköze: „ha találtunk ilyet, akkor a kimenet a
neve, ha nem, akkor mindegy, mi a kimenet”.

```speci
Be: n∈N, x∈Z[1..n]
Sa: van∈L, ind∈N
Ki: neg∈Z
Ef: -
Uf: (van,ind)=SEARCH(i=1..n, x[i]<0) és
    (van → neg=x[ind])
```

```yaml
n: 3
x: [5, -2, -8]
van: true
ind: 2
neg: -2
```

```yaml
n: 2
x: [5, 2]
van: false
neg: 0
```

A második tesztben nem találtunk semmit, így a `neg` bármi lehet. Erről a
[Keresés](ch06-06-search.md) fejezetben bővebben is olvashatsz.

### Precedencia

A legerősebbtől a leggyengébbig: aritmetika, összehasonlítások, `nem`, `és`,
`vagy`, `→`. Ha bizonytalan vagy, tegyél zárójelet. Semmibe sem kerül:

```speci,fragment
Ef: n>0 és (3<4 vagy ((3)>4))
```

> [!TIP]
> Egy állításon belül ne keverd a magyar és angol műveleteket
> (`a vagy b and c`). Beolvasható, de nehéz olvasni.

## Logikai értékek mint adatok

Egy `L` típusú változó közönséges érték: összehasonlítható és kombinálható,
mint bármi más.

```speci
Be: a∈L, b∈L
Ki: x∈L
Ef: -
Uf: x=(a és nem b)
```

```yaml
a: true
b: false
x: true
```
