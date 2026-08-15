/**
 * Dev-only link checker for the built static site.
 * - Crawls every dist/**\/*.html
 * - Verifies internal links resolve to a real built file (Astro directory routes)
 * - Collects external URLs for a separate liveness check
 * Usage: node scripts/check-links.mjs
 */
import { readFileSync, existsSync, statSync } from 'node:fs';
import { globSync } from 'node:fs';
import { join, resolve } from 'node:path';

const DIST = resolve('dist');
const htmlFiles = globSync('**/*.html', { cwd: DIST });

/** Extract href/src attribute values from HTML. */
const extractLinks = (html) => {
  const links = [];
  const re = /(?:href|src)\s*=\s*"([^"]*)"/g;
  let m;
  while ((m = re.exec(html))) links.push(m[1]);
  return links;
};

/** Does an internal absolute path resolve to a built file? */
const resolvesInDist = (pathname) => {
  // Strip query/hash.
  let p = pathname.split('#')[0].split('?')[0];
  if (p === '') return true;
  const candidates = [];
  const full = join(DIST, p);
  candidates.push(full);
  // Directory-style route -> index.html
  candidates.push(join(full, 'index.html'));
  // Extensionless -> .html
  if (!/\.[a-z0-9]+$/i.test(p)) candidates.push(full + '.html');
  return candidates.some((c) => existsSync(c) && statSync(c).isFile());
};

const externalSet = new Set();
const brokenInternal = [];
const mailtoTel = new Set();

for (const rel of htmlFiles) {
  const html = readFileSync(join(DIST, rel), 'utf8');
  for (const link of extractLinks(html)) {
    if (!link || link.startsWith('#') || link.startsWith('data:')) continue;
    if (/^https?:\/\//i.test(link)) {
      externalSet.add(link);
    } else if (/^(mailto:|tel:)/i.test(link)) {
      mailtoTel.add(link);
    } else if (link.startsWith('//')) {
      externalSet.add('https:' + link);
    } else if (link.startsWith('/')) {
      if (!resolvesInDist(link)) brokenInternal.push({ page: rel, link });
    }
    // Relative links (rare in dist) — resolve against page dir.
    else if (!link.startsWith('/')) {
      const base = join(DIST, rel, '..');
      const target = join(base, link);
      if (!existsSync(target)) brokenInternal.push({ page: rel, link });
    }
  }
}

console.log(`Pages scanned: ${htmlFiles.length}`);
console.log(`Unique external URLs: ${externalSet.size}`);
console.log(`mailto/tel: ${[...mailtoTel].join(', ')}`);
console.log(`\n=== BROKEN INTERNAL LINKS (${brokenInternal.length}) ===`);
for (const b of brokenInternal) console.log(`  ${b.link}   (on ${b.page})`);

console.log(`\n=== EXTERNAL URLS ===`);
for (const u of [...externalSet].sort()) console.log(u);
