# Multiple item selection: MIS

**Multiple item selection** (*kiválogatás*) collects every index, or a value
computed from it, for which a condition holds. It returns how many there are and
the collected items themselves.

<div class="syntax-card">

**Form:** `(c,y)=MIS(i=b..e, β(i))`<br>
**With transformation:** `(c,y)=MIS(i=b..e, β(i), f(i))`<br>
**Result:** a pair. `c` is the number of matching `i`, and `y` is an array of `c` elements: the matching **indices** (2 arguments), or `f(i)` for each matching index (3 arguments), in increasing order of `i`

</div>

The output array's length is the count, so declare it as `y∈N[1..c]`, using the
count variable as the bound.

## The two-argument form: matching indices

> *On which days was it below freezing?*

```speci
In: n∈N, t∈Z[1..n]
Out: c∈N, days∈N[1..c]
Pre: -
Post: (c,days)=MIS(i=1..n, t[i]<0)
```

```yaml
n: 6
t: [2, -1, -4, 3, 0, -2]
c: 3
days: [2, 3, 6]
```

```yaml
n: 2
t: [5, 7]
c: 0
days: []
```

> [!NOTE]
> With two arguments, `MIS` collects the **indices** `i`, not the elements
> `t[i]`. To collect the values, use the three-argument form with
> `f(i) = t[i]`.

## The three-argument form

The third argument says *what* to collect for each matching index:

```speci
In: n∈N, t∈Z[1..n]
Out: c∈N, cold∈Z[1..c]
Pre: -
Post: (c,cold)=MIS(i=1..n, t[i]<0, t[i])
```

```yaml
n: 6
t: [2, -1, -4, 3, 0, -2]
c: 3
cold: [-1, -4, -2]
```

> [!WARNING]
> **Mind the argument order.** In `MIS` the condition comes *second* and the
> collected value *third*. In the filtered `SUM` it's the other way round:
> `SUM(i=…, value, condition)`.

### Example: fields of records

Collect the location of every run longer than 30 minutes. This is a course
example. Note the comment that maps the general form onto the task:

```speci
In: Trun=(time:N x loc:S), n∈N, runs∈Trun[1..n]
Out: cnt∈N, location∈S[1..cnt]
Pre: -
Post: (cnt,location)=MIS(i=1..n, runs[i].time>30, runs[i].loc)
/* (cnt,y)=MIS(i=b..e, A(i), f(i))
   cnt, y ~ cnt, location
   b..e   ~ 1..n
   A(i)   ~ runs[i].time>30
   f(i)   ~ runs[i].loc
*/
```

```yaml
n: 4
runs:
  - time: 15
    loc: office
  - time: 35
    loc: restaurant
  - time: 40
    loc: gym
  - time: 5
    loc: shop
cnt: 2
location: [restaurant, gym]
```

## Combining with other theorems

The collected array can feed another theorem. *Among the cities farthest away,
what is the cheapest ticket?* `MAX` finds the farthest distance, `MIS`
collects the prices at that distance, and `MIN` picks the cheapest:

```speci
In: n∈N, city∈City[1..n], City=(dist:N x price:N)
Aux: far∈N, cnt∈N, prices∈N[1..cnt]
Out: ticket∈N
Pre: n>0
Post: (,far)=MAX(i=1..n, city[i].dist) and
      (cnt,prices)=MIS(i=1..n, city[i].dist=far, city[i].price) and
      (,ticket)=MIN(i=1..cnt, prices[i])
```

```yaml
n: 4
city: [{dist: 500, price: 90}, {dist: 900, price: 120}, {dist: 900, price: 80}, {dist: 300, price: 20}]
far: 900
cnt: 2
prices: [120, 80]
ticket: 80
```

The auxiliary variables (`far`, `cnt`, `prices`) also have to appear in the
test case, with their expected values.
