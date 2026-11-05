# Előfeltételek írása

Az **előfeltétel** (`Ef:`, angolul `Pre:`) állítás a **bemenetről**. Igaznak
kell lennie ahhoz, hogy a feladatnak értelme legyen. Ha egy teszteset bemenete
megsérti, a teszt piros, bármi is a kimenet.

Az előfeltétel blokkja **kötelező**. Ha a feladat semmilyen megszorítást nem
tesz a bemenetre, írd az alábbi egyenértékű alakok egyikét:

```speci,fragment
Ef: -
Ef: true
Ef: nem false
Ef: 3=3
```

A kötőjel a megszokott forma.

## Tipikus előfeltételek

**Egyedi értékek tartománya.** *a 2 és 7 között van.* Három egyenértékű alak:

```speci,fragment
Ef: a∈[2..7]
Ef: 2≤a≤7
Ef: a≥2 és a≤7
```

**Pozitív méret.** *Legalább egy elem van:*

```speci,fragment
Ef: n>0
```

**Megszorítás minden elemre.** *Minden ár 1 és 10 000 között van:*

```speci,fragment
Ef: ∀i∈[1..n]:(1≤ar[i]≤10000)
```

**Bemenetek közötti kapcsolat.** *1 < d < n:*

```speci,fragment
Ef: 1<d<n
```

**Garancia, amelyre az utófeltétel épít.** *Van páratlan szám*, ezt a
[`SELECT`](ch06-05-select.md) igényli:

```speci,fragment
Ef: ∃i∈[1..n]:(szamok[i] mod 2 = 1)
```

Több állítás `és`-sel kapcsolható össze. Ne felejtsd ki köztük a műveleti
jelet: két egymás után írt állítás szintaktikai hiba.

## Példa

> *Adott n ≥ 1 gyerek magassága centiméterben (mindegyik 50 és 250 között).
> Mennyi az átlagmagasság?*

```speci
Be: n∈N, m∈N[1..n]
Ki: atlag∈R
Ef: n≥1 és ∀i∈[1..n]:(50≤m[i]≤250)
Uf: atlag=SUM(i=1..n, m[i])/n
```

```yaml
n: 4
m: [120, 130, 125, 135]
atlag: 127.5
```

Az előfeltételt megsértő bemenet piros tesztet ad:

```yaml,red
n: 2
m: [120, 300]
atlag: 210
```

> [!WARNING]
> **A határokat egyenként másold ki a feladatból.** A túl *laza* előfeltétel
> soha nem okoz piros tesztet. A tesztjeid átmennek, miközben a specifikáció a
> feladat által tiltott bemeneteket is elfogadja. Az `Ef:` minden számát vesd
> össze a feladat szövegével.

## Ami nem az előfeltételbe való

- Állítás a **kimenetről**. Az előfeltétel csak a bemenetet korlátozza.
- Amit a **típus** már garantál. Az `n∈N` már kizárja a −1-et, így az `n≥0`
  semmit sem tesz hozzá.
- Maga a válasz. Akkor is, ha tudod, hogy „a válasz létezik”, az utófeltételnek
  meg kell mondania, mi az.
