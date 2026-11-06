# Online editor test run

`examples.json` holds every example to re-check: the 18 English examples that
were changed, and every example of the Hungarian book (136 specs, 219 test
runs). Jobs 0–57 were run on 2026-11-06 and all matched the book (job 46 is an
`error` example that is correctly rejected). `remaining.json` lists jobs
58–218, which still have to be run.

How the run works (Claude in Chrome, on https://progalap.elte.hu/specifikacio/):

1. `python3 serve.py <this folder>` serves the files on `127.0.0.1:8765`
   with CORS, and the page loads the job list with `fetch`.
2. For each job: put the spec on the clipboard (`navigator.clipboard.writeText`),
   click the Specification editor, press Ctrl+A Ctrl+V; do the same with the
   test data in the Data editor. Synthetic paste events are ignored, and typing
   breaks YAML indentation (auto-indent), so a real Ctrl+V is needed.
3. Wait at least 1 s, then until the tab colour and the red error bar
   (`.bg-red-600`) stay the same for 0.75 s. Test tabs are `#test-nav a`
   (class `bg-green-300` / `bg-red-300`).
4. Expected: green for ```` ```yaml ````, red without an `Expected …` parse
   error for ```` ```yaml,red ````, a rejection for ```` ```speci,error ````.
