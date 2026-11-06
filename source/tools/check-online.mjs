// Runs every example of both books through the evaluator of the live online editor
// (https://progalap.elte.hu/specifikacio/), the same code the web page runs in its worker.
// Same fences and flags as check-examples, except that `speci,online` blocks are checked too.
//
// Usage: node source/tools/check-online.mjs   (from the repository root; needs Node 18+)
import fs from 'fs';
import os from 'os';
import path from 'path';
import { pathToFileURL } from 'url';

const SITE = 'https://progalap.elte.hu/specifikacio/';
const get = async u => { const r = await fetch(u); if (!r.ok) throw new Error(`${u}: ${r.status}`); return r.text(); };

// index.html -> app bundle -> evaluator worker (file names change with every deploy)
const app = (await get(SITE)).match(/assets\/index-[\w-]+\.js/)[0];
const worker = (await get(SITE + app)).match(/evaluator\.worker-[\w-]+\.js/)[0];
let src = await get(SITE + 'assets/' + worker);
// shortcut: cut the worker's message hookup and export its handler; breaks if the bundle's tail changes
const cut = src.indexOf('const lp=typeof process');
if (cut < 0 || !/async function ia\(/.test(src)) throw new Error(`unexpected layout of ${worker}, update check-online.mjs`);
const file = path.join(fs.mkdtempSync(path.join(os.tmpdir(), 'speci-online-')), 'evaluator.mjs');
fs.writeFileSync(file, src.slice(0, cut) + 'export { ia };\n');
const { ia } = await import(pathToFileURL(file));

// Same block extraction as check-examples/src/main.rs
function blocks(text) {
  const lines = text.split('\n'), out = [];
  for (let i = 0; i < lines.length; i++) {
    const t = lines[i].trimStart();
    if (!t.startsWith('```')) continue;
    const indent = lines[i].length - t.length, line = i + 1;
    const [lang, ...flags] = t.slice(3).trim().split(',').map(s => s.trim());
    let body = '';
    for (i++; i < lines.length && !lines[i].trimStart().startsWith('```'); i++) {
      const c = lines[i].length - lines[i].trimStart().length;
      body += lines[i].slice(Math.min(c, indent)) + '\n';
    }
    out.push({ lang, flags, body, line });
  }
  return out;
}

let id = 0, specs = 0, tests = 0;
const failures = [];
for (const book of ['book-en', 'book-hu']) {
  const dir = path.join('source', book, 'src');
  for (const f of fs.readdirSync(dir).filter(f => f.endsWith('.md')).sort()) {
    let spec = null;
    for (const b of blocks(fs.readFileSync(path.join(dir, f), 'utf8'))) {
      const at = `${dir}/${f}:${b.line}`;
      if (b.lang === 'speci') {
        spec = null;
        if (b.flags.includes('fragment')) continue;
        specs++;
        // with no data, a specification that parses stops at EmptyDataError ("tp" in the bundle)
        const r = await ia({ id: ++id, specificationSource: b.body, dataSource: '' });
        const ok = r.ok || r.errorName === 'tp';
        if (ok && b.flags.includes('error')) failures.push(`${at}: expected a specification error, but it parsed`);
        else if (!ok && !b.flags.includes('error')) failures.push(`${at}: specification rejected: ${r.message}`);
        if (ok && !b.flags.includes('error')) spec = b.body;
      } else if (b.lang === 'yaml' && spec && !b.flags.includes('fragment')) {
        tests++;
        const r = await ia({ id: ++id, specificationSource: spec, dataSource: b.body });
        const red = b.flags.includes('red');
        if (r.ok === red) failures.push(`${at}: expected ${red ? 'red' : 'green'}, got ${r.ok ? 'green' : 'red'}${r.ok ? '' : ': ' + r.message}`);
      }
    }
  }
}
for (const f of failures) console.error('FAIL ' + f + '\n');
console.log(`online editor (${worker}): ${specs} specifications, ${tests} test cases, ${failures.length} failures`);
process.exit(failures.length ? 1 : 0);
