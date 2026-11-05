# The Specification Editor

At ELTE, solving a programming task is split into three formal phases:

1. **Specification** (*specifikáció*): describe *what* the program must do.
   You fix the state space (input, auxiliary and output data), a
   precondition on the input and a postcondition that links input to output.
2. **Algorithm design** (*algoritmus*): derive *how* to do it, usually by
   recognising a programming theorem in the specification and using its
   ready-made algorithm.
3. **Implementation and testing** (*implementáció*): translate the
   algorithm into a real programming language and test it.

The Specification Editor is the tool for phase 1. A specification written on
paper can't be checked. One written in the editor can be *run*. The editor:

1. parses your specification and reports any syntax errors,
2. reads each test case you wrote and checks that the data matches the declared types,
3. checks the precondition on the test input,
4. evaluates the postcondition with the test's input *and* expected output, and
5. marks the test green if everything holds, and red otherwise.

It can also show the evaluation step by step, which helps a lot when a test is
unexpectedly red.

## Getting access

Open <https://progalap.elte.hu/specifikacio/> in a browser. The editor requires
your ELTE account: sign in with the same username and password you use for the
university network (your Caesar/INF login). Your name appears at the bottom
left of the window once you are logged in.

> [!TIP]
> The login service is sometimes unavailable, for example right before a
> deadline. The offline editor [speci-local](ch10-00-speci-local.md) runs on
> your own computer without any login and accepts the same specifications.

## In this chapter

- [A tour of the interface](ch01-01-interface.md) explains every button
  and pane.
- [Your first specification](ch01-02-first-spec.md) takes you from an
  empty editor to a green test.
- [Saving and sharing](ch01-03-save-share.md) shows how to keep your work
  and send it to someone.
