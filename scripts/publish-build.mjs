import { cp, readFile, readdir, unlink, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
const root = fileURLToPath(new URL('../', import.meta.url));
const build = path.join(root, 'frontend/build');
const manifest = JSON.parse(await readFile(path.join(build, 'asset-manifest.json'), 'utf8'));
// Remove only obsolete files previously listed in the generated asset manifest.
try {
  const previous = JSON.parse(await readFile(path.join(root, 'asset-manifest.json'), 'utf8'));
  for (const name of Object.values(previous.files)) {
    const relative = name.replace(/^\.\//, '').replace(/^\//, '');
    if (relative.startsWith('static/') && !Object.values(manifest.files).includes(name)) {
      await unlink(path.join(root, relative)).catch(error => { if (error.code !== 'ENOENT') throw error; });
    }
  }
} catch (error) { if (error.code !== 'ENOENT') throw error; }
for (const name of await readdir(build)) await cp(path.join(build, name), path.join(root, name), { recursive: true });
await cp(path.join(build, 'index.html'), path.join(root, '404.html'));
await writeFile(path.join(root, '.nojekyll'), '');
console.log('Production build copied to the GitHub Pages root. CNAME preserved.');
