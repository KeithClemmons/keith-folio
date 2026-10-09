import { readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const outDir = path.resolve("out");

async function htmlFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith(".html") || entry.name.endsWith(".txt")) files.push(full);
  }
  return files;
}

for (const file of await htmlFiles(outDir)) {
  const rel = path.relative(outDir, file);
  const depth = rel.split(path.sep).length - 1;
  const prefix = "../".repeat(depth);
  const original = await readFile(file, "utf8");
  // Next emits the favicon as /icon?hash in both the <link> and the
  // embedded payload that the client reapplies. A root-absolute path
  // breaks file://. Keep it relative to this HTML file.
  let text = original.replace(/\/icon\?[A-Za-z0-9]+/g, `${prefix}icon`);
  if (depth > 0 && file.endsWith(".html")) {
    text = text
      .replaceAll('href="./_next/', `href="${prefix}_next/`)
      .replaceAll('src="./_next/', `src="${prefix}_next/`)
      .replaceAll('href="logo-white.png"', `href="${prefix}logo-white.png"`)
      .replaceAll('src="logo-white.png"', `src="${prefix}logo-white.png"`)
      .replaceAll('src="ocean.js"', `src="${prefix}ocean.js"`)
      .replaceAll('href="index.html', `href="${prefix}index.html`);
  }
  if (text !== original) {
    await writeFile(file, text);
    console.log(`relativized ${rel}`);
  }
}
