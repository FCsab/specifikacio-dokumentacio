# Osztók

Három rövid magyar tárgyi feladat egy szám osztóiról. A `DARAB` megszámoló
makrót, a `|` oszthatósági relációt és a szűrt `SUM`-ot mutatják be.

## Az osztók száma

> *Kérj be egy egész számot, majd írd ki az osztóinak a számát!*

```speci
Be: szam∈N

Ki: osztok∈N

Ef: szam>=1

Uf: osztok=DARAB(i=1..szam, i|szam)    // szam mod i = 0
```

```yaml
szam: 12
osztok: 6
```

```yaml
szam: 1
osztok: 1
```

```yaml
szam: 13
osztok: 2
```

- A `DARAB` a `COUNT` magyar alakja.
- Az `i|szam` jelentése „i osztója szam-nak”, ami ugyanaz, mint a
  `szam mod i = 0`. A sorvégi megjegyzés ki is mondja.
- Az előfeltétel kizárja a 0-t, amelynek végtelen sok osztója lenne.

## Az osztók összege

> *Kérj be egy egész számot, majd írd ki az osztóinak az összegét!*

```speci
Be: n∈N

Ki: sum∈N

Ef: n>=1

Uf: sum=SUM(i=1..n, i, i|n)
```

```yaml
n: 12
sum: 28
```

```yaml
n: 1
sum: 1
```

A `SUM` harmadik argumentuma a szűrő: csak az osztókat adja össze.

## A páratlan osztók összege

> *Kérj be egy egész számot, majd írd ki a páratlan osztóinak az összegét!*

Egy, a tárgyban terjedő megoldás:

```speci
Be: n∈N

Ki: sum∈N

Ef: n>=1

Uf: sum = SUM(i=1..n,i,i%2=1)
```

```yaml,red
n: 10
sum: 6
```

> [!WARNING]
> Ez nem oldja meg a feladatot. Az `i%2=1` szűrő n-ig *minden páratlan számot*
> megtart. n = 10-re 1+3+5+7+9 = 25-öt ad, nem a páratlan osztók 1+5 = 6
> összegét. A helyes választ tartalmazó teszt piros, és ez leleplezi a hibát.

A helyes szűrőben mindkét feltétel szerepel:

```speci
Be: n∈N

Ki: sum∈N

Ef: n>=1

Uf: sum=SUM(i=1..n, i, i%2=1 és i|n)
```

```yaml
n: 10
sum: 6
```

```yaml
n: 12
sum: 4
```

A `%` és a `mod` felcserélhető.
