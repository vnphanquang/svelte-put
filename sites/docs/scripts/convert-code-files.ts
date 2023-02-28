import fs from 'fs';
import path from 'path';

import { typescript } from 'svelte-preprocess';
import { preprocess } from 'svelte/compiler';
import glob from 'tiny-glob';

(async function () {
  const files = await glob('**/*.code.svelte');
  files.forEach(async (file) => {
    const source = fs.readFileSync(file, 'utf-8');
    const processed = await preprocess(source, [typescript()], {
      // https://github.com/sveltejs/svelte-preprocess/issues/488
      filename: 'dummy',
    });
    const transpiled = processed.code.replace('<script lang="ts">', '<script>');
    const outDir = path.join(path.dirname(file), 'js.generated');
    if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);
    const basename = path.basename(file);
    const outFile = basename.replace('.code.svelte', '.code.js.svelte');
    const outPath = path.join(outDir, outFile);
    fs.writeFileSync(outPath, transpiled, 'utf-8');
  });
})();
