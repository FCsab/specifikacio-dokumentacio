# Kifejezések és logika

Az előfeltétel és az utófeltétel **logikai állítás**: olyan kifejezés, amelynek
értéke `true` (igaz) vagy `false` (hamis). Ezekből épül fel:

- **értékek**: változók, konstansok (`3`, `-1`, `2.5`, `"szöveg"`, `true`),
  tömbelemek (`x[i]`), mezők (`r.nev`), tuple-ök (`(3,5)`),
- **műveletek**: aritmetikai (`+ - * / mod`), összehasonlító
  (`= ≠ < > ≤ ≥`) és logikai (`és vagy nem →`),
- **kvantorok**: `∀` (minden) és `∃` (létezik),
- **függvényhívások**: beépített (`length(x)`) vagy saját (`f(i)`),
- **tételmakrók**: `SUM`, `COUNT`, `MAX`, … (a [III. részben](ch06-00-theorems.md)).

```speci
Be: n∈N, x∈Z[1..n]
Ki: jo∈L
Ef: n>0
Uf: jo=(∀i∈[1..n]:(x[i]≥0) és x[1] mod 2 = 0)
```

```yaml
n: 3
x: [4, 7, 0]
jo: true
```

```yaml
n: 3
x: [4, -7, 0]
jo: false
```

## A fejezet tartalma

- [Műveletek](ch04-01-operators.md): aritmetika, összehasonlítás és logika,
  magyar és ASCII alakokkal.
- [Kvantorok: ∀ és ∃](ch04-02-quantifiers.md): állítások sok elemről
  egyszerre.
- [Előfeltételek írása](ch04-03-preconditions.md): mi kerüljön az `Ef:`-be.
