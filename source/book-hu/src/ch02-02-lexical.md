# Nevek, megjegyzések, foglalt szavak

## Változónevek

A változónév

- **kisbetűvel kezdődik**,
- betűkkel és számjegyekkel folytatódik,
- nem tartalmaz szóközt és írásjelet (`-`, `.`, …).

| Helyes | Hibás | Miért hibás? |
|--------|-------|--------------|
| `szamok`, `x1`, `latogatasDb` | `Szamok` | nagybetűvel kezdődik (az halmaznév) |
| `szam`, `ar`, `tav` | `latogatas db` | szóközt tartalmaz |
| `r1`, `maxert` | `1x` | számjeggyel kezdődik |
| `osztok`, `db` | `max-ert` | `-` van benne (kivonásnak olvassa) |

Ékezetes betűk (`á`, `é`, `ő`, …) is lehetnek a nevekben, a beépített
dokumentáció is használja őket (`név`, `jegy`). Sokan mégis kerülik, mert
egyes billentyűzeteken nehézkes beírni őket.

## Halmaznevek (típusnevek)

A halmazok neve, a beépítetteké (`N`, `Z`, `R`, `L`, `S`, `C`) és a sajátjaidé
([Saját halmaznevek](ch03-05-aliases.md)) is, **nagybetűvel kezdődik**:
`Hallgato`, `Jegy`, `Seta`.

## Foglalt szavak

Néhány kisbetűs szó a nyelv része, ezért nem lehet változónév:

| Szó | Jelentés |
|-----|----------|
| `és`, `vagy`, `nem` | logikai műveletek |
| `and`, `or`, `not` | ugyanezek angolul |
| `mod` | maradékos osztás |
| `in` | a `∈` szóalakja |
| `exists`, `forall` | a `∃` és a `∀` szóalakja |
| `true`, `false` | logikai konstansok |

> [!WARNING]
> **Ne nevezz el változót `exists`-nek**, akkor sem, ha régi képernyőképek és
> segédletek így tesznek: `Aux: exists∈L`. A mostani szerkesztő elutasítja,
> ezzel a rejtélyes üzenettel: `incomplite type for exists: undefined is not boolean`.
> Használd helyette a `van` vagy `talalt` nevet, és nevezd át mindenhol: a
> deklarációban, az utófeltételben és minden tesztesetben.

A tételek makrói nagybetűsek (`SUM`, `MAX`, `COUNT`, …), ezért a kisbetűs
`sum`, `max`, `min` és `count` *lehetnek* változónevek:

```speci
Be: n∈N, x∈N[1..n]
Ki: sum∈N, max∈N
Ef: n>0
Uf: sum=SUM(i=1..n, x[i]) és (,max)=MAX(i=1..n, x[i])
```

```yaml
n: 3
x: [4, 9, 2]
sum: 15
max: 9
```

## Megjegyzések

Kétféle megjegyzés van, mindkettő a C nyelvből:

- `// …` a **sorvégi megjegyzés**, a sor végéig tart. Állhat valódi tartalom
  után is ugyanabban a sorban.
- `/* … */` a **blokkmegjegyzés**, amely több soron át is tarthat.

```speci
/* Egy szám osztóinak száma.
   i|n jelentése: i osztója n-nek. */
Be: n∈N
Ki: d∈N
Ef: n>=1          // a 0-nak végtelen sok osztója lenne
Uf: d=DARAB(i=1..n, i|n)
```

```yaml
n: 12
d: 6
```

A tárgyi megoldásokban bevett szokás, hogy megjegyzésben leírják a tétel
általános alakját, és megfeleltetik a konkrét neveknek:

```speci,fragment
Uf: (db,helyek)=MIS(i=1..n, futas[i].ido>30, futas[i].hely)
/* (db,y)=MIS(i=e..u, T(i), f(i))
   db, y  ~ db, helyek
   e..u   ~ 1..n
   T(i)   ~ futas[i].ido>30
   f(i)   ~ futas[i].hely
*/
```

A beépített dokumentáció `/** … */` alakot is használ a címekhez. Ez közönséges
blokkmegjegyzés.

## Szóközök

A műveleti jelek körüli szóközök elhagyhatók: a `sum = SUM(…)` és a
`sum=SUM(…)` ugyanazt jelenti. Egy kivétel van: a direkt szorzat `x` jele
(rekordok, függvényszignatúrák) mindkét oldalán szóköz kell: `Z x Z`.
