// Báo cho Bing / Yandex / Naver biết site vừa có nội dung mới.
// Đọc thẳng sitemap.xml nên không cần liệt kê URL bằng tay.
//   node indexnow.mjs           → gửi toàn bộ URL trong sitemap
//   node indexnow.mjs --dry     → chỉ in ra xem sẽ gửi gì, không gửi thật
//
// Google KHÔNG dùng IndexNow. Với Google vẫn phải submit sitemap trong
// Search Console — nhưng cái đó chỉ làm một lần, không phải mỗi lần cập nhật.

import fs from 'fs';

const KEY  = '12278e89b9214ef4ca2f8709bb127f5b';
const HOST = 'leona3893.github.io';
const KEY_LOCATION = `https://${HOST}/don-gian-hoa/${KEY}.txt`;
const DRY = process.argv.includes('--dry');

const xml = fs.readFileSync('sitemap.xml', 'utf8');
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);

if (!urlList.length) {
  console.error('Không đọc được URL nào từ sitemap.xml. Chạy `node build.mjs` trước.');
  process.exit(1);
}

// Key nằm trong thư mục con nên mọi URL gửi đi phải thuộc thư mục đó.
const goc = `https://${HOST}/don-gian-hoa/`;
const ngoaiPhamVi = urlList.filter(u => !u.startsWith(goc));
if (ngoaiPhamVi.length) {
  console.error('URL nằm ngoài phạm vi của key:', ngoaiPhamVi);
  process.exit(1);
}

console.log(`Sẽ gửi ${urlList.length} URL tới IndexNow.`);
console.log(`Key location: ${KEY_LOCATION}`);

if (DRY) {
  urlList.forEach(u => console.log('  ' + u));
  console.log('\n(--dry: chưa gửi gì cả)');
  process.exit(0);
}

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList })
});

const body = await res.text();
const nghia = {
  200: 'OK — đã nhận',
  202: 'Đã nhận, đang chờ xác thực key',
  400: 'Sai định dạng request',
  403: 'Key không hợp lệ hoặc không đọc được file key',
  422: 'URL không thuộc host, hoặc key không khớp',
  429: 'Gửi quá nhiều lần, thử lại sau'
}[res.status] || 'Không rõ';

console.log(`\nHTTP ${res.status} — ${nghia}`);
if (body.trim()) console.log(body.trim());
