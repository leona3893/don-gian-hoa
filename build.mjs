// Sinh trang tĩnh cho từng thuật ngữ + trang lộ trình + sitemap.
// Chạy lại mỗi khi sửa terms.js hoặc chi-tiet.js:   node build.mjs
import fs from 'fs';
import path from 'path';
import { TERMS, slugify } from './terms.js';
import { TRACKS, CHI_TIET } from './chi-tiet.js';
import { SO_SANH } from './so-sanh.js';
import { renderOG } from './og.mjs';
import { HINH } from './hinh.js';

const SITE = 'https://leona3893.github.io/don-gian-hoa/';
const OUT = 'thuat-ngu';

// Thẻ meta ảnh chia sẻ. Ảnh do og.mjs sinh ra, nằm trong thư mục og/.
const ogMeta = file => `<meta property="og:image" content="${SITE}${file}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:image" content="${SITE}${file}" />`;

const esc = s => String(s).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Nhóm nào dùng bộ mốc nào. Không khai báo riêng thì rơi về bộ nền tảng.
const trackOf = cat => TRACKS[cat] || TRACKS._default;

// Mô tả cho thẻ meta: gọn, dưới ~160 ký tự để Google không cắt giữa chừng.
const metaDesc = t => {
  const s = `${t.name} là gì? ${t.plain}`;
  return s.length <= 158 ? s : s.slice(0, 155).replace(/\s+\S*$/, '') + '…';
};

// ── Bốn tầng: chỉ dựng khi thuật ngữ có mục trong chi-tiet.js ──
const layer = (n, ten) =>
  `<div class="layer"><div class="layer-no">${n}</div><div class="layer-name">${ten}</div><div class="layer-line"></div></div>`;

const bonTang = (t, d) => {
  const tr = trackOf(t.cat);
  const mocCuoi = tr.moc[d.notYet.toiMoc];
  const linkNext = n => TERMS.some(x => x.name === n.ten)
    ? `<a href="../${slugify(n.ten)}/">${esc(n.ten)}</a>`
    : `<span>${esc(n.ten)}</span>`;

  return `
    ${layer(1, 'Hiểu nó là gì')}
    <p class="plain">${esc(t.plain)}</p>
    <div class="analogy"><strong>Nói theo đời thường:</strong><br>${esc(t.analogy)}</div>
    <div class="leak"><h4>⚠ Chỗ ẩn dụ này hỏng</h4>${d.leak}</div>

    ${layer(2, 'Code trông thế nào')}
    <pre class="code">${d.code}</pre>
    <p class="cap">${d.cap}</p>

    ${layer(3, 'Khi nào bạn dùng nó')}
    <div class="two">
      <div class="box yes"><h4>✓ Dùng khi</h4><ul>${d.yes.map(x => `<li>${x}</li>`).join('')}</ul></div>
      <div class="box no"><h4>✗ Đừng dùng khi</h4><ul>${d.no.map(x => `<li>${x}</li>`).join('')}</ul></div>
    </div>
    <div class="notyet">
      <div class="row"><span class="k">Chưa cần biết:</span> ${d.notYet.gi}.</div>
      <div class="row"><span class="k">Để dành tới Mốc ${d.notYet.toiMoc} — ${esc(mocCuoi.ten)}:</span> ${esc(mocCuoi.tuKiem)}</div>
      <div class="row sign"><span class="k">Dấu hiệu bạn đã cần học nó:</span> ${d.notYet.dauHieu}</div>
    </div>

    ${layer(4, 'Đi đâu tiếp')}
    <ul class="nextlist">${d.next.map(n => `<li>${linkNext(n)}<span>${n.vi}</span></li>`).join('')}</ul>

    <div class="try"><h4>🧪 Thử 2 phút, không cần cài gì</h4>${d.try}</div>
    ${khoiSoSanh(t)}`;
};

// Trang thuật ngữ nào có mặt trong một bảng so sánh thì dẫn sang bảng đó.
const khoiSoSanh = t => {
  const lien = SO_SANH.filter(s => s.terms.includes(t.name));
  if (!lien.length) return '';
  return `
    <div class="so-sanh-lien">
      <h4>⚖ Hay bị nhầm với thuật ngữ khác</h4>
      <ul class="nextlist">${lien.map(s =>
        `<li><a href="../../so-sanh/${s.slug}/">${esc(s.h1)}</a><span>${s.terms.filter(x => x !== t.name).map(esc).join(' · ')}</span></li>`
      ).join('')}</ul>
    </div>`;
};

// Bản rút gọn cho thuật ngữ chưa có nội dung 4 tầng.
const banGon = t => {
  const related = t.related
    .filter(r => TERMS.some(x => x.name === r))
    .map(r => `<a href="../${slugify(r)}/">${esc(r)}</a>`)
    .join('');
  return `
      <p class="brief">${esc(t.brief)}</p>
      <p class="plain">${esc(t.plain)}</p>
      <div class="analogy"><strong>Nói theo đời thường:</strong><br>${esc(t.analogy)}</div>
      <h2>Thuật ngữ liên quan</h2>
      <div class="related">${related}</div>`;
};

const page = t => {
  const slug = slugify(t.name);
  const url = `${SITE}${OUT}/${slug}/`;
  const title = `${t.name} là gì? Giải thích dễ hiểu — IT nói tiếng người`;
  const desc = metaDesc(t);
  const d = CHI_TIET[t.name];
  const tr = trackOf(t.cat);

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

  const badge = d
    ? `<a class="badge-moc" href="../../lo-trinh/#${tr.id}-${d.moc}">Mốc ${d.moc} · ${esc(tr.moc[d.moc].ten)}</a>`
    : '';

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
  ${ogMeta('og/' + slug + '.png')}
  <link rel="stylesheet" href="../../styles.css?v=3" />
  <script type="application/ld+json">${JSON.stringify(ld)}</script>
  <script type="application/ld+json">${JSON.stringify(crumbs)}</script>
</head>
<body>
  <main class="wrap">
    <header><a class="brand" href="../../"><div class="mark">⌁</div> IT nói tiếng người</a><div class="nav"><span class="tagline">Không cần biết code vẫn hiểu được công nghệ.</span><a href="../../lo-trinh/">Lộ trình</a><a href="../../so-sanh/">So sánh</a></div></header>
    <nav class="crumb"><a href="../../">Trang chủ</a> › ${esc(t.name)}</nav>
    <article class="article">
      <span class="tag">${esc(t.cat)}</span>${badge}
      <h1>${t.icon} ${esc(t.name)} là gì?</h1>
      ${d ? `<p class="brief">${esc(t.brief)}</p>${bonTang(t, d)}` : banGon(t)}
      <a class="back" href="../../">← Xem tất cả thuật ngữ</a>
    </article>
    <footer>Được làm cho những người tò mò về công nghệ · Bản MVP 01</footer>
  </main>
</body>
</html>
`;
};

// ── Trang lộ trình: giải thích các mốc của từng nhóm ──
const trangLoTrinh = () => {
  const url = `${SITE}lo-trinh/`;
  const nhom = Object.entries(TRACKS).map(([key, tr]) => {
    const soTerm = TERMS.filter(t => key === '_default' ? !TRACKS[t.cat] : t.cat === key).length;
    return `
    <div class="track" id="${tr.id}">
      <h3>${esc(tr.ten)}</h3>
      <p class="cho">Cho: ${esc(tr.cho)} · ${soTerm} thuật ngữ</p>
      ${Object.entries(tr.moc).map(([n, m]) => `
      <div class="moc-row" id="${tr.id}-${n}">
        <div class="num">${n}</div>
        <div><b>${esc(m.ten)}</b><span>Tự kiểm: ${esc(m.tuKiem)}</span></div>
      </div>`).join('')}
    </div>`;
  }).join('');

  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Lộ trình — bạn đang ở mốc nào? · IT nói tiếng người</title>
  <meta name="description" content="Ba mốc học cho từng nhóm: Kiểm thử, AI và Nền tảng. Đo bằng việc bạn làm được, không đo bằng thời gian đã học." />
  <link rel="canonical" href="${url}" />
  <link rel="icon" href="../favicon.svg" type="image/svg+xml" />
  <meta property="og:type" content="article" />
  <meta property="og:site_name" content="IT nói tiếng người" />
  <meta property="og:locale" content="vi_VN" />
  <meta property="og:title" content="Lộ trình — bạn đang ở mốc nào?" />
  <meta property="og:description" content="Ba mốc học cho từng nhóm, đo bằng việc bạn làm được chứ không phải thời gian đã học." />
  <meta property="og:url" content="${url}" />
  ${ogMeta('og/lo-trinh.png')}
  <link rel="stylesheet" href="../styles.css?v=3" />
</head>
<body>
  <main class="wrap">
    <header><a class="brand" href="../"><div class="mark">⌁</div> IT nói tiếng người</a><div class="nav"><span class="tagline">Không cần biết code vẫn hiểu được công nghệ.</span><a href="../lo-trinh/">Lộ trình</a><a href="../so-sanh/">So sánh</a></div></header>
    <nav class="crumb"><a href="../">Trang chủ</a> › Lộ trình</nav>
    <article class="article">
      <h1>Bạn đang ở mốc nào?</h1>
      <p class="plain">“Người mới” hay “đã có kinh nghiệm” là cách chia gần như vô nghĩa, vì mỗi người học một tốc độ. Ở đây chia theo <strong>việc bạn làm được</strong>: đọc câu tự kiểm, trả lời được thì bạn đã qua mốc đó.</p>
      <p class="cap">Mỗi nhóm thuật ngữ có bộ mốc riêng, vì người học automation và người muốn hiểu AI đi hai con đường khác nhau.</p>
      ${nhom}
      <a class="back" href="../">← Xem tất cả thuật ngữ</a>
    </article>
    <footer>Được làm cho những người tò mò về công nghệ · Bản MVP 01</footer>
  </main>
</body>
</html>
`;
};

// ── Trang so sánh ──
const trangSoSanh = s => {
  const url = `${SITE}so-sanh/${s.slug}/`;
  const title = `${s.h1} — IT nói tiếng người`;
  const desc = s.tldr.replace(/<[^>]+>/g, '').slice(0, 155).replace(/\s+\S*$/, '') + '…';
  const linkTerm = n => TERMS.some(x => x.name === n)
    ? `<a href="../../thuat-ngu/${slugify(n)}/">${esc(n)}</a>` : esc(n);

  const faqLd = {
    '@context': 'https://schema.org', '@type': 'FAQPage',
    mainEntity: s.faq.map(f => ({
      '@type': 'Question', name: f.h,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
  const crumbs = {
    '@context': 'https://schema.org', '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Trang chủ', item: SITE },
      { '@type': 'ListItem', position: 2, name: 'So sánh', item: `${SITE}so-sanh/` },
      { '@type': 'ListItem', position: 3, name: s.h1, item: url }
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
  <meta property="og:title" content="${esc(s.h1)}" />
  <meta property="og:description" content="${esc(desc)}" />
  <meta property="og:url" content="${url}" />
  ${ogMeta('og/so-sanh-' + s.slug + '.png')}
  <link rel="stylesheet" href="../../styles.css?v=3" />
  <script type="application/ld+json">${JSON.stringify(faqLd)}</script>
  <script type="application/ld+json">${JSON.stringify(crumbs)}</script>
</head>
<body>
  <main class="wrap">
    <header><a class="brand" href="../../"><div class="mark">⌁</div> IT nói tiếng người</a><div class="nav"><span class="tagline">Không cần biết code vẫn hiểu được công nghệ.</span><a href="../../lo-trinh/">Lộ trình</a><a href="../../so-sanh/">So sánh</a></div></header>
    <nav class="crumb"><a href="../../">Trang chủ</a> › <a href="../">So sánh</a> › ${esc(s.h1)}</nav>
    <article class="article">
      <span class="tag">${esc(s.cat)}</span>
      <h1>${esc(s.h1)}</h1>
      <div class="tldr"><b>Trả lời ngắn</b>${s.tldr}</div>

      <h2>Bảng so sánh</h2>
      <div class="bang-wrap"><table class="bang">
        <thead><tr><th></th>${s.cols.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead>
        <tbody>${s.rows.map(r =>
          `<tr><th scope="row">${esc(r.k)}</th>${r.v.map(v => `<td>${v}</td>`).join('')}</tr>`
        ).join('')}</tbody>
      </table></div>

      <div class="nho"><h4>💡 Cách nhớ</h4>${s.nho}</div>

      <h2>Chọn cái nào?</h2>
      <ul class="chon">${s.chon.map(c =>
        `<li><b>Nếu ${c.neu}</b><span>→ ${c.thi}</span></li>`
      ).join('')}</ul>

      <div class="leak"><h4>⚠ Bẫy thường gặp</h4><p>${s.bay}</p></div>

      <h2>Câu hỏi hay gặp</h2>
      <dl class="faq">${s.faq.map(f =>
        `<dt>${esc(f.h)}</dt><dd>${esc(f.a)}</dd>`
      ).join('')}</dl>

      <h2>Đọc kỹ từng thuật ngữ</h2>
      <div class="related">${s.terms.map(linkTerm).join('')}</div>

      <a class="back" href="../">← Xem các bảng so sánh khác</a>
    </article>
    <footer>Được làm cho những người tò mò về công nghệ · Bản MVP 01</footer>
  </main>
</body>
</html>
`;
};

const trangSoSanhIndex = () => {
  const url = `${SITE}so-sanh/`;
  const nhom = [...new Set(SO_SANH.map(s => s.cat))];
  return `<!doctype html>
<html lang="vi">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>So sánh — những thuật ngữ hay bị nhầm lẫn · IT nói tiếng người</title>
  <meta name="description" content="Mock hay Stub? Smoke hay Sanity? Unit, Integration hay E2E? Bảng so sánh trả lời thẳng, kèm cách nhớ và bẫy thường gặp." />
  <link rel="canonical" href="${url}" />
  <link rel="icon" href="../favicon.svg" type="image/svg+xml" />
  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="IT nói tiếng người" />
  <meta property="og:locale" content="vi_VN" />
  <meta property="og:title" content="So sánh — những thuật ngữ hay bị nhầm lẫn" />
  <meta property="og:description" content="Bảng so sánh trả lời thẳng, kèm cách nhớ và bẫy thường gặp." />
  <meta property="og:url" content="${url}" />
  ${ogMeta('og/so-sanh.png')}
  <link rel="stylesheet" href="../styles.css?v=3" />
</head>
<body>
  <main class="wrap">
    <header><a class="brand" href="../"><div class="mark">⌁</div> IT nói tiếng người</a><div class="nav"><span class="tagline">Không cần biết code vẫn hiểu được công nghệ.</span><a href="../lo-trinh/">Lộ trình</a><a href="../so-sanh/">So sánh</a></div></header>
    <nav class="crumb"><a href="../">Trang chủ</a> › So sánh</nav>
    <article class="article">
      <h1>Hay bị nhầm lẫn</h1>
      <p class="plain">Biết định nghĩa từng cái là một chuyện. Biết <strong>khi nào dùng cái nào</strong> lại là chuyện khác. Mỗi bảng dưới đây trả lời thẳng trong một câu, rồi mới đi vào chi tiết.</p>
      ${nhom.map(c => `
      <h2>${esc(c)}</h2>
      <ul class="nextlist">${SO_SANH.filter(s => s.cat === c).map(s =>
        `<li><a href="${s.slug}/">${esc(s.h1)}</a><span>${s.tldr.replace(/<[^>]+>/g, '')}</span></li>`
      ).join('')}</ul>`).join('')}
      <a class="back" href="../">← Xem tất cả thuật ngữ</a>
    </article>
    <footer>Được làm cho những người tò mò về công nghệ · Bản MVP 01</footer>
  </main>
</body>
</html>
`;
};

// --- Sinh trang ---
let written = 0, coChiTiet = 0;
for (const t of TERMS) {
  const dir = path.join(OUT, slugify(t.name));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), page(t), 'utf8');
  written++;
  if (CHI_TIET[t.name]) coChiTiet++;
}

fs.mkdirSync('lo-trinh', { recursive: true });
fs.writeFileSync(path.join('lo-trinh', 'index.html'), trangLoTrinh(), 'utf8');

fs.mkdirSync('so-sanh', { recursive: true });
fs.writeFileSync(path.join('so-sanh', 'index.html'), trangSoSanhIndex(), 'utf8');
for (const s of SO_SANH) {
  fs.mkdirSync(path.join('so-sanh', s.slug), { recursive: true });
  fs.writeFileSync(path.join('so-sanh', s.slug, 'index.html'), trangSoSanh(s), 'utf8');
}

// --- Ảnh chia sẻ ---
const stripHtml = s => String(s).replace(/<[^>]+>/g, '');
fs.mkdirSync('og', { recursive: true });
const anh = [
  { file: 'home.png', title: 'IT không khó. Chỉ cần được giải thích đúng.', sub: `${TERMS.length} thuật ngữ công nghệ giải thích bằng ví dụ đời thường.`, hinhKey: '_home' },
  { file: 'lo-trinh.png', title: 'Bạn đang ở mốc nào?', sub: 'Ba mốc học, đo bằng việc bạn làm được chứ không phải thời gian.', hinhKey: '_lo-trinh' },
  { file: 'so-sanh.png', title: 'Hay bị nhầm lẫn', sub: 'Mock hay Stub? Smoke hay Sanity? Trả lời thẳng trong một câu.', hinhKey: '_so-sanh' },
  ...TERMS.map(t => ({ file: `${slugify(t.name)}.png`, title: `${t.name} là gì?`, sub: t.brief, hinhKey: t.name })),
  ...SO_SANH.map(s => ({ file: `so-sanh-${s.slug}.png`, title: s.h1, sub: stripHtml(s.tldr), hinhKey: '_so-sanh' }))
];
let thieuHinh = 0;
for (const a of anh) {
  if (!(a.hinhKey in HINH)) { thieuHinh++; console.warn('  chưa có hình cho:', a.hinhKey); }
  fs.writeFileSync(path.join('og', a.file), renderOG(a));
}

// --- Sitemap ---
const today = new Date().toISOString().slice(0, 10);
const urls = [
  SITE,
  `${SITE}lo-trinh/`,
  `${SITE}so-sanh/`,
  ...SO_SANH.map(s => `${SITE}so-sanh/${s.slug}/`),
  ...TERMS.map(t => `${SITE}${OUT}/${slugify(t.name)}/`)
];
fs.writeFileSync('sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
  urls.map(u => `  <url><loc>${u}</loc><lastmod>${today}</lastmod></url>`).join('\n') +
  `\n</urlset>\n`, 'utf8');

fs.writeFileSync('robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}sitemap.xml\n`, 'utf8');

console.log(`Đã sinh ${written} trang thuật ngữ (${coChiTiet} bản 4 tầng, ${written - coChiTiet} bản gọn) + trang lộ trình, sitemap ${urls.length} URL.`);
console.log(`Ảnh chia sẻ: ${anh.length} ảnh trong og/${thieuHinh ? `, ${thieuHinh} ảnh dùng hình mặc định` : ''}.`);
