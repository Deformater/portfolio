// Build step: precompile the JSX screens in src-jsx/ into plain, minified JS
// in src/ so the browser never has to run Babel at runtime.
//
//   node build.mjs
//
// No npm install required: it fetches @babel/standalone once into .cache/
// (gitignored) and reuses it on subsequent runs. Content edits (data.js) and
// the design-system bundle (_ds_bundle.js) are plain JS and are NOT compiled.
import { readFileSync, writeFileSync, readdirSync, existsSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const root = dirname(fileURLToPath(import.meta.url));
const srcDir = join(root, 'src-jsx');
const outDir = join(root, 'src');
const cacheDir = join(root, '.cache');
const BABEL_VERSION = '7.29.0';
const babelPath = join(cacheDir, `babel-standalone-${BABEL_VERSION}.js`);

if (!existsSync(babelPath)) {
  mkdirSync(cacheDir, { recursive: true });
  process.stdout.write(`fetching @babel/standalone@${BABEL_VERSION} …\n`);
  const res = await fetch(`https://unpkg.com/@babel/standalone@${BABEL_VERSION}/babel.min.js`);
  if (!res.ok) throw new Error(`failed to fetch Babel: ${res.status}`);
  writeFileSync(babelPath, await res.text());
}

const Babel = createRequire(import.meta.url)(babelPath);

let count = 0;
for (const file of readdirSync(srcDir).sort()) {
  if (!file.endsWith('.jsx')) continue;
  const code = readFileSync(join(srcDir, file), 'utf8');
  const { code: out } = Babel.transform(code, {
    presets: ['react'],
    minified: true,
    comments: false,
    sourceType: 'script',
    // Keep Cyrillic as literal UTF-8 instead of \uXXXX escapes — the content
    // is Russian, so escaping every letter would ~triple those bytes.
    generatorOpts: { jsescOption: { minimal: true } },
  });
  const outFile = file.replace(/\.jsx$/, '.js');
  writeFileSync(join(outDir, outFile), out + '\n');
  console.log(`compiled  src-jsx/${file}  →  src/${outFile}  (${out.length} B)`);
  count++;
}
console.log(`\ndone — ${count} file(s) compiled.`);
