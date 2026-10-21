// Copies the site into dist/, which is all Cloudflare serves (see wrangler.jsonc).
// Everything at the top level is published except the entries below, so .git never goes public.
import { cpSync, mkdirSync, readdirSync, rmSync } from 'node:fs';

const SKIP = new Set(['.git', '.github', '.gitignore', 'dist', 'node_modules', 'build.mjs', 'wrangler.jsonc', 'README.md']);

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
for (const name of readdirSync('.')) {
  if (!SKIP.has(name) && !name.startsWith('.')) cpSync(name, `dist/${name}`, { recursive: true });
}
console.log('Copied site into dist/:', readdirSync('dist').join(', '));
