// Sinh trang tĩnh cho từng thuật ngữ + sitemap.
// Chạy lại mỗi khi sửa terms.js:   node build.mjs
import fs from 'fs';
import path from 'path';
import { TERMS, slugify } from './terms.js';

const SITE = 'https://leona3893.github.io/don-gian-hoa/';
const OUT = 'thuat-ngu';

const esc = s => String(s).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Mô tả cho thẻ meta: gọn, dưới ~160 ký tự để Google không cắt giữa chừng.
const metaDesc = t => {
  const s = `${t.name} là gì? ${t.plain}`;
  return s.length <= 158 ? s : s.slice(0, 155).replace(/\s+\S*$/, '') + '…';
};

const page = t => {
  const slug = slugify(t.name);
  const url = `${SITE}${OUT}/${slug}/`;
  const title = `${t.name} là gì? Giải thích dễ hiểu — IT nói tiếng người`;
  const desc = metaDesc(t);
  const related = t.related
    .filter(r => TERMS.some(x => x.name === r))
    .map(r => `<a href="../${slugify(r)}/">${esc(r)}</a>`)
    .join('');

  const ld = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTerm',
    name: t.name,
    description: t.plain,
    inLanguage: 'vi',
    url,
    inDefinedTermSet: { '@type': 'DefinedTermSet', name: 'IT nói tiếng người', url: SITE }
  };
  const crumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE },
      { '@type': 'ListItem', position: 2, name: t.name, item: url }
    ]
  };

  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${esc(title)}</title>
  <meta name="description" content="${esc(desc)}" />
  <link rel="canonical" href="${url}" />
  <link rel="icon" href="../../favicon.svg" type="image/svg+xml" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="IT nói tiếng người" />
  <meta property="og:locale" content="vi_VN" />
  <meta property="og:title" content="${esc(title)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:url" content="${url}" />
  <meta name="twitter:card" content="summary" />
  <link rel="stylesheet" href="../../styles.css" />
  <script type="application/ld+json">${JSON.stringify(ld)}</script>
  <script type="application/ld+json">${JSON.stringify(crumbs)}</script>
</head>
<body>
  <main class="wrap">
    <header><a class="brand" href="../../"><div class="mark">⌁</div> IT nói tiếng người</a><div class="nav">Không cần biết code vẫn hiểu được công nghệ.</div></header>
    <nav class="crumb"><a href="../../">Trang chủ</a> › ${esc(t.name)}</nav>
    <article class="article">
      <span class="tag">${esc(t.cat)}</span>
      <h1>${t.icon} ${esc(t.name)} là gì?</h1>
      <p class="brief">${esc(t.brief)}</p>
      <p class="plain">${esc(t.plain)}</p>
      <div class="analogy"><strong>Nói theo đời thường:</strong><br>${esc(t.analogy)}</div>
      <h2>Thuật ngữ liên quan</h2>
      <div class="related">${related}</div>
      <a class="back" href="../../">← Xem tất cả thuật ngữ</a>
    </article>
    <footer>Được làm cho những người tò mò về công nghệ · Bản MVP 01</footer>
  </main>
</body>
</html>
`;
};

// --- Sinh trang ---
let written = 0;
for (const t of TERMS) {
  const dir = path.join(OUT, slugify(t.name));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(t), 'utf8');
  written++;
}

// --- Sitemap ---
const today = new Date().toISOString().slice(0, 10);
const urls = [SITE, ...TERMS.map(t => `${SITE}${OUT}/${slugify(t.name)}/`)];
fs.writeFileSync('sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
  `\n</urlset>\n`, 'utf8');

fs.writeFileSync('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`, 'utf8');

console.log(`Đã sinh ${written} trang thuật ngữ, sitemap ${urls.length} URL.`);
