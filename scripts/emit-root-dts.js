import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const cwd = process.cwd();
const pkg = JSON.parse(fs.readFileSync(path.resolve(cwd, 'package.json'), 'utf-8'));

/** @type {string[]} */
const names = ['index'];
for (let name of Object.keys(pkg.exports)) {
	if (name === '.' || name.endsWith('.css')) continue;
	name = name.slice(2);
	if (name.split('/').length > 1) {
		console.error('Detected 2nd level sub package; only supports 1st for now...');
		process.exit(1);
	}
	names.push(name);
}
const ts = String.raw;
console.log('Emitting .d.ts files for publication purposes:');
for (const name of names) {
	const filepath = path.resolve(cwd, `${name}.d.ts`);
	console.log(`  - ${filepath}`);
	fs.writeFileSync(filepath, ts`import './types/index.js';`);
}
