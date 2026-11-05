# Az utazási iroda

> *Egy utazási iroda tárolja, mely városokba árul repülőjegyet, azok milyen
> messze vannak, és mennyibe kerül a jegy. Írj programot, amely megadja a
> legtávolabbi városba szóló jegy árát! Ha több város ugyanolyan messze van, a
> köztük legolcsóbbét.*
>
> **Bemenet:** N (1 ≤ N ≤ 100), majd N sorban a távolság (1 ≤ T ≤ 20 000) és az
> ár (1 ≤ Á ≤ 2 000 000).
> **Kimenet:** egy egész szám, az ár.

Ezt a magyar tárgyi feladatot az élő szerkesztőben ellenőriztük. A kanonikus
magyar stílusban készült: magyar fejlécek és nevek, soronként egy deklaráció,
üres sor a blokkok között.

## Elemzés

- **Adatok.** A bemenet N darab (távolság, ár) sor. Két párhuzamos tömb, a
  `tav` és az `ar`, közvetlenül ezt tükrözi.
- **Kérdés.** Egyetlen ár, amelyet egy tulajdonság határoz meg: egy olyan város
  ára, amely a legtávolabbi, és a legtávolabbiak közül a legolcsóbb.
- **Stílus.** A tulajdonság közvetlenül relációs utófeltétellé fordítható.
  Lent a tételes változat is szerepel.

## Specifikáció (relációs)

```speci
Be:
n∈N,
ar∈N[1..n],
tav∈N[1..n]

Ki:
max∈N

Ef:
1<=n and n<=100 and ∀i∈[1..n]:(1<=ar[i] and ar[i]<=2000000 and 1<=tav[i] and tav[i]<=20000)

Uf:
∃i∈[1..n]:(∀j∈[1..n]:(tav[j]<tav[i] vagy (tav[j]=tav[i] és ar[j]>=ar[i])) és ar[i]=max)
```

Az utófeltétel jelentése: *van olyan i város, hogy minden j város vagy közelebb
van i-nél, vagy ugyanolyan messze, de nem olcsóbb, és a válasz az i ára.* (Az
ellenőrzött megoldás az `Ef:`-ben angol `and`-et, az `Uf:`-ben magyar `és`-t
használ. Mindkettő működik, de saját munkában maradj egy nyelvnél.)

## Tesztek

A feladat példája. A legtávolabbi a 6. város (2100), 30 000-ért:

```yaml
n: 6
ar: [30000, 200000, 150000, 38000, 150000, 30000]
tav: [50, 1900, 2000, 900, 600, 2100]
max: 30000
```

Holtverseny a legnagyobb távolságon, így a kettő közül az olcsóbb a válasz:

```yaml
n: 3
ar: [500, 250, 100]
tav: [1000, 1000, 500]
max: 250
```

Egyetlen város:

```yaml
n: 1
ar: [1]
tav: [1]
max: 1
```

Minden város ugyanolyan messze van, és a legolcsóbb az utolsó:

```yaml
n: 4
ar: [100, 100, 2000000, 1]
tav: [20000, 20000, 20000, 20000]
max: 1
```

Nem a legtávolabbiak közül a legolcsóbb:

```yaml,red
n: 3
ar: [500, 250, 100]
tav: [1000, 1000, 500]
max: 500
```

> [!WARNING]
> **Minden határt ellenőrizz.** Könnyű az ár korlátját (2 000 000) a
> távolságra is átmásolni. Az ilyen előfeltétel túl laza, és emiatt egyetlen
> teszt sem lesz piros. Az `Ef:` minden határát vesd össze a feladattal.

## Specifikáció (tételekkel)

Ugyanez a feladat három lépésben: a legnagyobb távolság (`MAX`), az ekkora
távolsághoz tartozó árak (`MIS`), és ezek közül a legkisebb (`MIN`):

```speci
Be:
n∈N,
ar∈N[1..n],
tav∈N[1..n]

Sa:
legtav∈N,
db∈N,
arak∈N[1..db]

Ki:
max∈N

Ef:
1<=n és n<=100 és ∀i∈[1..n]:(1<=ar[i] és ar[i]<=2000000 és 1<=tav[i] és tav[i]<=20000)

Uf:
(,legtav)=MAX(i=1..n, tav[i]) és
(db,arak)=MIS(i=1..n, tav[i]=legtav, ar[i]) és
(,max)=MIN(i=1..db, arak[i])
```

```yaml
n: 6
ar: [30000, 200000, 150000, 38000, 150000, 30000]
tav: [50, 1900, 2000, 900, 600, 2100]
legtav: 2100
db: 1
arak: [30000]
max: 30000
```

```yaml
n: 3
ar: [500, 250, 100]
tav: [1000, 1000, 500]
legtav: 1000
db: 2
arak: [500, 250]
max: 250
```

A kimeneti változó neve `max`, és ez rendben van: a `MAX` tétel nagybetűs, így a
kettő nem ütközik.
