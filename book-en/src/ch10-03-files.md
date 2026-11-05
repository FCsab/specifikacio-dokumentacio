# Files and sharing

## `.sp` files

Save with <kbd>Ctrl</kbd>+<kbd>S</kbd> (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>S</kbd>
for *Save as*) and open with <kbd>Ctrl</kbd>+<kbd>O</kbd>. You can also drag a file
onto the window. The file is evaluated as soon as it opens.

A `.sp` file is plain text: the title as a comment, the specification, and each
test case stored as a block comment:

```speci
// title: Odd numbers
Be:
n∈N,
szamok∈N[1..n]
Ki:
db∈N
Ef: -
Uf: db=DARAB(i=1..n, szamok[i] mod 2 = 1)

/*--- test ---
n: 5
szamok: [3, 72, 81, 4, 5]
db: 3
---*/

/*--- test ---
n: 0
szamok: []
db: 0
---*/
```

Because the test cases are comments, **the whole file is still a valid
specification**. You can paste it into the ELTE editor as-is. (The online
editor doesn't read the tests back out of the comments, though. Paste those into
its Data pane separately.)

Your session is also saved automatically when you quit.

## Copy and paste a whole project

The copy button (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>C</kbd>) puts the
specification **and all test cases** on the clipboard as one compact line:

```text
SPECI1:…a few hundred letters, digits, - and _…
```

This is handy for sending a project through chat. Line breaks added by chat
apps and mail clients are ignored when it's read back.

The paste button (<kbd>Ctrl</kbd>+<kbd>Shift</kbd>+<kbd>V</kbd>) turns such a line,
or plain specification text, back into a project. If the system clipboard
can't be read, a box opens where you can paste with <kbd>Ctrl</kbd>+<kbd>V</kbd>
instead.

> [!NOTE]
> The `SPECI1:` format is the `.sp` text, compressed with deflate and encoded in
> URL-safe base64. The `1` is a format version.

## Moving work to the online editor

1. In speci-local, select the specification text (without the test comments)
   and paste it into the Specification pane.
2. For each test case, add a tab with `+` and paste the test's content.
3. Press **Evaluate**. Everything should be green, as it was in speci-local.
4. **Save** and copy the link.
