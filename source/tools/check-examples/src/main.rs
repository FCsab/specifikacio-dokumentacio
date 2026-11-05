//! Extracts every example from the book sources and runs it through speci-local.
//!
//! Conventions in the Markdown:
//!
//! * ```` ```speci ```` opens a complete specification. Every ```` ```yaml ```` block that
//!   follows it (until the next `speci` block or the end of the file) is a test case for it.
//! * Flags after the language, separated by commas, change what is checked:
//!   * `speci,fragment`  – not a complete specification, skipped (also its yaml blocks)
//!   * `speci,online`    – uses syntax only the online editor accepts, skipped
//!   * `speci,error`     – the specification itself must be rejected
//!   * `yaml,red`        – this test case must fail (red tab)
//!   * `yaml,fragment`   – not a test case, skipped
//!
//! Usage: `cargo run --release -- ../../book-en/src ../../book-hu/src`

use speci_local::{parse, run_test};
use std::path::{Path, PathBuf};

struct Block {
    lang: String,
    flags: Vec<String>,
    body: String,
    line: usize,
}

fn blocks(text: &str) -> Vec<Block> {
    let mut out = Vec::new();
    let mut lines = text.lines().enumerate();
    while let Some((i, l)) = lines.next() {
        let t = l.trim_start();
        let Some(info) = t.strip_prefix("```") else { continue };
        let fence_indent = l.len() - t.len();
        let mut parts = info.trim().split(',').map(|s| s.trim().to_string());
        let lang = parts.next().unwrap_or_default();
        let flags: Vec<String> = parts.collect();
        let mut body = String::new();
        for (_, l2) in lines.by_ref() {
            if l2.trim_start().starts_with("```") {
                break;
            }
            // strip the indentation of fences nested in lists
            let cut = l2.len() - l2.trim_start().len();
            body.push_str(&l2[cut.min(fence_indent)..]);
            body.push('\n');
        }
        out.push(Block { lang, flags, body, line: i + 1 });
    }
    out
}

fn md_files(dir: &Path, out: &mut Vec<PathBuf>) {
    let mut entries: Vec<_> = std::fs::read_dir(dir).expect("read dir").flatten().collect();
    entries.sort_by_key(|e| e.path());
    for e in entries {
        let p = e.path();
        if p.is_dir() {
            md_files(&p, out);
        } else if p.extension().is_some_and(|x| x == "md") {
            out.push(p);
        }
    }
}

fn main() {
    let dirs: Vec<String> = std::env::args().skip(1).collect();
    let mut files = Vec::new();
    for d in &dirs {
        md_files(Path::new(d), &mut files);
    }
    let (mut specs, mut tests, mut skipped, mut failures) = (0, 0, 0, Vec::new());

    for f in &files {
        let text = std::fs::read_to_string(f).unwrap();
        let mut current: Option<(speci_local::parser::Spec, String, usize)> = None;
        let mut skipping = false;
        for b in blocks(&text) {
            let has = |x: &str| b.flags.iter().any(|f| f == x);
            let at = format!("{}:{}", f.display(), b.line);
            match b.lang.as_str() {
                "speci" => {
                    current = None;
                    skipping = has("fragment") || has("online");
                    if skipping {
                        skipped += 1;
                        continue;
                    }
                    specs += 1;
                    match (parse(&b.body), has("error")) {
                        (Ok(s), false) => current = Some((s, b.body.clone(), b.line)),
                        (Err(_), true) => skipping = true,
                        (Ok(_), true) => failures.push(format!("{at}: expected a specification error, but it parsed")),
                        (Err(d), false) => failures.push(format!(
                            "{at}: specification rejected:\n{}",
                            d.iter().map(|d| d.render(&b.body, "")).collect::<Vec<_>>().join("\n")
                        )),
                    }
                }
                "yaml" if !skipping && !has("fragment") => {
                    let Some((spec, src, _)) = &current else { continue };
                    tests += 1;
                    let o = run_test(spec, &b.body);
                    let want_red = has("red");
                    if o.pass == want_red {
                        failures.push(format!(
                            "{at}: expected {}, got {}\n{}",
                            if want_red { "red" } else { "green" },
                            if o.pass { "green" } else { "red" },
                            o.diags.iter().map(|d| d.render(src, &b.body)).collect::<Vec<_>>().join("\n")
                        ));
                    }
                }
                _ => {}
            }
        }
    }

    for f in &failures {
        eprintln!("FAIL {f}\n");
    }
    println!(
        "{} files, {specs} specifications, {tests} test cases, {skipped} skipped, {} failures",
        files.len(),
        failures.len()
    );
    if !failures.is_empty() {
        std::process::exit(1);
    }
}
