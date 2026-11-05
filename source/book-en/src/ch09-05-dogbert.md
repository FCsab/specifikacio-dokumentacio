# Dogbert's star

> *Dogbert measured a star's brightness at regular intervals. Measurements below
> k indicate cloud cover. Determine the maximum change in brightness between two
> consecutive measurements taken under clear skies (no cloud cover).*

**Task type:** conditional maximum selection in a sequence.
[Official solution](https://progalap.elte.hu/specifikacio/v1/?uuid=e0d5b6d7-8231-455d-aed5-e8a7f5420c5e).

## Analysis

- **Data.** The threshold `k` and the measurements. Their number isn't given
  separately, so the array is open-ended: `data∈Z[1..]`, with
  `length(data)` as its size.
- **Question.** *The maximum change*, but only between pairs where **both**
  measurements are clear. That's a maximum with a condition, so **CONDMAX**.
- **Value for pair i.** `data[i]-data[i+1]`.
- **Condition for pair i.** `data[i]>k and data[i+1]>k`.
- **Range.** Pairs (i, i+1), so `i` runs to `length(data)-1`.
- **Output.** Whether there was any clear pair, and the maximum. The index isn't
  asked for, so its slot is skipped: `(found,,maxval)`.

## Specification

```speci
In: k∈N, data∈Z[1..]
Out: found∈L, maxval∈Z
Pre: -
Post: (found,,maxval)=CONDMAX(i=1..length(data)-1,
      data[i]-data[i+1], data[i]>k and data[i+1]>k)
```

## Tests

The nominal case, with several clear pairs and a maximum change of 6:

```yaml
k: 10
data: [34, 30, 1, 2, 1, 30, 33, 27, 30, 32]
found: true
maxval: 6
```

The same data under heavier clouds, with no clear pair at all:

```yaml
k: 50
data: [34, 30, 1, 2, 1, 30, 33, 27, 30, 32]
found: false
maxval: 0
```

Exactly two measurements, both clear:

```yaml
k: 10
data: [45, 20]
found: true
maxval: 25
```

## Walkthrough (first test, k = 10)

| i | data[i] | data[i+1] | both > 10? | change |
|--:|--------:|----------:|:----------:|-------:|
| 1 | 34 | 30 | yes | 4 |
| 2 | 30 | 1 | no | |
| 3 | 1 | 2 | no | |
| 4 | 2 | 1 | no | |
| 5 | 1 | 30 | no | |
| 6 | 30 | 33 | yes | −3 |
| 7 | 33 | 27 | yes | **6** |
| 8 | 27 | 30 | yes | −3 |
| 9 | 30 | 32 | yes | −2 |

The largest change among the clear pairs is 6 (at i = 7).

> [!NOTE]
> This specification measures the change as `data[i]-data[i+1]`, a *signed*
> difference, exactly like the official solution. If "change" should mean
> the size of the change in either direction, use
> `ABS(data[i]-data[i+1])`. Then the answer for the first test is still 6,
> but for `data: [20, 45]` it would be 25 instead of −25.
