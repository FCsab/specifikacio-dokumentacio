# Appendix E: The built-in documentation

The online editor's **Documentation** button opens a specification that
documents the language itself, as comments, in Hungarian. It's a concise
reference to everything the editor accepts, written by the editor's author.

Below is that document with its comments **translated into English**. The code
is unchanged, so names such as `név` (name) and `jegy` (grade) stay
Hungarian. The [Hungarian edition](../hu/appendix-05-builtin.html) of this book
shows the original text.

The document uses the Hungarian word forms (`igaz`, `minden`, `eleme`,
`hossz`, …) and several `Fv:` headers, so it runs only in the online editor.

```speci,online
/** Documentation */

/** Description of the input data */
Be: /** Elementary sets */
    // Declaration: dataname∈Set
    // the data name starts with a lowercase letter
    a∈N,            // Set of natural numbers; "a" is ONE value among the natural numbers
                    // Declarations are separated by commas
    a2 eleme N,     // "eleme" (element of) can also be used
    b∈Z,            // Set of integers
    c∈R,            // Set of real numbers
    d∈L,            // Set of logical values
    e∈S,            // Set of strings
    f∈C, f2∈K,      // Set of characters

    /** Intervals */
    iv1∈[1..3],     // the value of iv can be between 1 and 3

    /** Indexed sequences, arrays */
    /** For handling many elements of the same type */
    // An array of 3 natural numbers with the index range 1..3
    // More precisely: x1 is an element of the set containing every
    // 3-element sequence of natural numbers with index range 1..3.
    // One of all the possible ones.
    // (Later, an element of the array is referenced like x1[2])
    x1∈N[1..3],
    // An array of 3 natural numbers with the index range -1..1
    x2∈N[-1..1],
    // Often the number of elements is part of the input:
    n∈N, x∈Z[1..n],
    // An array of natural numbers of some length;
    // its actual length is determined by the concrete input
    // and can be queried with hossz(x3),
    // indexed from 1.
    // A simplified alternative to the previous example,
    // where the length can be queried from the concrete data
    x3∈N[1..],
    x4∈N[0..],      // the same, indexed from 0
    x5∈N[],         // shorthand, equivalent to: x5∈N[1..]
    x6∈N[]=[5, 1, 2],   // array with an initial value, constant array
    x7∈N[2+3..n*2], // the bounds of the index range can be simple expressions

    /** Matrices */
    m1∈Z[1..8,1..8],// 8x8 matrix, reference: e.g. m1[3,6]
    m2∈Z[1..n,1..n],// nxn matrix
    m3∈Z[0..,0..],  // a matrix of some size indexed from 0; the data tells the size
    m4∈Z[,],        // equivalent: m4∈Z[1..,1..]
    m5∈Z[-1..1,-1..1] = [   // matrix with an initial value
        [2, 1, 2],
        [1, 0, 1],
        [2, 1, 1]
    ],

    /** Records (structures, objects) */
    /** For packaging values of different types into one unit */
    // A unit of a string and a natural number.
    // This is essentially a pair: the right side of ∈ is the set of all
    // possible string-natural number pairs, and r1 is one element of it.
    // All the possible pairs are produced by the direct product set operation:
    // r1 takes its value from the set S x N.
    // Later, a part of the record is referenced by its field name:
    // e.g. r1.név
    r1∈név:S x jegy:N,
    r2∈(név:S x jegy:N),    // the sets after ∈ can be parenthesised (any of them)
    r3∈(észak:L x kelet:L x dél:L x nyugat:L),  // a more complex example
    // All possible pairs of the direct product:
    // {(1,3), (1,4), (2,3), (2,4)}
    // r4 will be one of these
    r4∈(m1:[1..2] x m2:[3..4]),

    /** Custom set names (types) */
    // Any set seen so far can be given another name
    // Format: Set1=Set2
    // Custom set names start with an uppercase letter
    j∈Jegy, Jegy=[1..5],
    // We can even build long renaming chains
    j2∈Érdemjegy, Érdemjegy=EgytőlÖtig, EgytőlÖtig=[1..5],
    // Often used to describe complex data structures clearly
    // Instead of this:
    // h1∈(név:S x jegy:N)[1..]
    // it's more readable to write:
    h2∈Hallgató[1..], Hallgató=(név:S x jegy:N),
    // Or if a student can have several grades
    h3∈HallgatóTömb, HallgatóTömb=Hallgató2[], Hallgató2=(név:S x jegyek:Jegy[]), // Jegy: see above
    // If we want an array of variable-length arrays instead of a matrix:
    cikkcakk∈Sor[], Sor=N[]

/** Description of the auxiliary data
    Sometimes intermediate helper data is used to describe the output.
    It is defined here, and must be given in the test data too!
*/
Sa: /** The same comma-separated declarations as for the input */
    sa∈N

/** Description of the output data */
Ki: /** The same comma-separated declarations as for the input */
    ki∈L,
    y∈N[]

/** Function definitions
    Custom functions can be defined the way it was done
    in secondary-school mathematics.
    First the domain and range of the function are given (sets),
    then the rule of assignment.
*/
Fv: f:N->N,
    f(p)=p*2            // doubling function
Fv: négyzet:Z->N,
    négyzet(n)=n*n      // a more descriptive function name (négyzet = square)
Fv: add:Z x Z->Z,
    add(a,b)=a+b        // several parameters; a space is needed before and after x!
Fv: csere:Z x Z->Z x Z,
    csere(a, b)=(b, a)  // returns a tuple (csere = swap)
Fv: f2:Z -> Z, f2(p)=p+n// sees the declared variables (unless a parameter hides the name)
Fv: jegy:Hallgató->N,
    jegy(h)=h.jegy      // record parameter
Fv: index:N[] x N->N,
    index(x,i)=x[i]     // array parameter

/** The preconditions on the input data.
    The precondition is a logical expression on the input data;
    the execution of the program makes sense when it is true.

    The logical expression contains the usual logical operators (and, or, not),
    the usual comparison operators (=,<,>,<=,>=),
    and some more complex elements of first-order logic (exists, for all)
*/
// Ef: -    // the simplest precondition, equivalent: Ef: igaz
Ef: igaz és
    nem hamis és
    3=3 és
    n>0 és  // data declared in the input can be referenced
    (3<4 vagy ((3)>4)) és   // any number of parentheses

    (igaz -> igaz) és       // implication: false only if true implies false
    nem(igaz -> hamis) és   // this alone is false, so we negate it to keep the precondition true
    (hamis -> igaz) és      // true
    (hamis -> hamis) és     // true

    // More complex: to say something about every element of an interval
    // E.g. every element of the interval 1..3 is greater than 0
    // That is: for every i that is an element of [1..3], i>0 holds
    minden i eleme [1..3]:(i>0) és
    ∀i∈[1..3]:(i>0) és      // shorter form, read the same way as above
    // This is an excellent way to state something about many elements at once
    // E.g. arrays have many elements,
    // so we go through the index range and state something about each element:
    // (for the declarations of n and x, see above)
    ∀i∈[1..n]:(x[i]>10) és

    // Our other compound operator states about an interval
    // that it has an element for which a property holds
    // E.g. there is a value in the interval 1..3 that is 2.
    // That is: the interval 1..3 has an element that is 2
    létezik i eleme [1..3]:(i=2) és
    ∃i∈[1..3]:(i=2) és  // shorter
    // The same is especially useful for arrays
    // E.g. the array x has an index whose value is <3
    ∃i∈[1..n]:(x[i]<3) és

    // If the end of the array's index range wasn't declared, use hossz()
    ∃i∈[1..hossz(x3)]:(x3[i]<3) és
    // Even the index range can be queried:
    ∃i∈[tól(x3)..ig(x3)]:(x3[i]<3) és

    // For a two-dimensional array (matrix), something must be said
    // about the rows and about the elements within the rows
    // E.g. every row of a matrix contains the value 10
    ∀i∈[1..8]:(∃j∈[1..8]:(m1[i,j]=10)) és

    // Nothing special about records
    r1.név="Győző" és r1.jegy=5 és

    // Tuples can be used as well.
    // They cannot be declared (yet).
    // They are used to group several values quickly without
    // having to define e.g. a record.
    // Tuple elements are referenced by numbers
    (3, 5)=(3, 5) és
    (3, 5).1=3 és (3, 5).2=5 és
    // They are used heavily in the programming patterns
    // (where the values can also be accessed by name)

    // Using array literals (rare!)
    [1, 2, 3]=[1, 2, 3] és
    [0..:1, 2, 3]=[0..:1, 2, 3] és  // with an index range
    [[1, 2], [3, 4]]=[1..,1..:[1, 2], [3, 4]] és  // index ranges work for matrices too

    igaz

/** The postcondition is the most important part of the specification.
    It is also a logical statement describing the relationship between input and output data;
    more precisely, it is true if for a given input (satisfying the precondition)
    we give the output that meets the expectations.
    Every declared data item must appear in the postcondition.
    The logical expression has the same elements as the precondition.
*/
// Since it would make no sense to state something about every data item here,
// we omit the description of the postcondition now.
Uf: igaz
```

## Where each part is explained in this book

| Part of the document | Chapter |
|----------------------|---------|
| elementary sets, intervals | [Elementary sets and intervals](ch03-01-sets.md) |
| arrays, `hossz`, constant arrays | [Arrays](ch03-02-arrays.md) |
| matrices, `cikkcakk∈Sor[]` | [Matrices and arrays of arrays](ch03-03-matrices.md) |
| records, `r4∈(m1:[1..2] x m2:[3..4])` | [Records and tuples](ch03-04-records.md) |
| custom set names | [Naming your own sets](ch03-05-aliases.md) |
| `Sa:`, `Ki:` | [Blocks and layout](ch02-01-blocks.md) |
| `Fv:` | [Functions](ch05-00-functions.md) |
| `Ef:`, implication, quantifiers | [Operators](ch04-01-operators.md), [Quantifiers](ch04-02-quantifiers.md), [Writing preconditions](ch04-03-preconditions.md) |
| tuples, array literals | [Records and tuples](ch03-04-records.md), [Arrays](ch03-02-arrays.md) |
| `Uf:` | [Postconditions and theorems](ch06-00-theorems.md) |

> [!NOTE]
> The document ends with `Uf: igaz` because it is a language sample, not a
> task. In a real specification, the
> [all-variables rule](ch02-03-all-variables.md) requires the postcondition to
> mention every input.
