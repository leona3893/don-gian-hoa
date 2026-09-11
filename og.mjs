// Sinh ảnh chia sẻ (og:image) 1200×630 cho từng trang.
// Bố cục: tên site · tiêu đề · một câu · hình minh hoạ bên phải. Không hơn.
import { Resvg } from '@resvg/resvg-js';
import { HINH } from './hinh.js';

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// Ngắt dòng theo số ký tự, tránh để một từ ngắn lẻ loi ở dòng cuối.
const wrap = (text, max, maxLines) => {
  const words = text.split(/\s+/), lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > max && cur) { lines.push(cur); cur = w; }
    else cur = (cur + ' ' + w).trim();
  }
  if (cur) lines.push(cur);
  if (lines.length > maxLines) {
    lines.length = maxLines;
    lines[maxLines - 1] = lines[maxLines - 1].replace(/\s+\S*$/, '') + '…';
  }
  if (lines.length > 1) {
    const last = lines[lines.length - 1], prev = lines[lines.length - 2].split(' ');
    if (last.split(' ').length === 1 && last.length <= 8 && prev.length > 2) {
      lines[lines.length - 1] = prev.pop() + ' ' + last;
      lines[lines.length - 2] = prev.join(' ');
    }
  }
  return lines;
};

const FONT = 'Segoe UI, Arial, sans-serif';

const svg = ({ title, sub, hinh }) => {
  const tSize = title.length > 26 ? 52 : title.length > 15 ? 62 : 74;
  const tMax = tSize === 74 ? 15 : tSize === 62 ? 19 : 24;
  const tLines = wrap(title, tMax, 2);
  const sLines = wrap(sub, 44, 3);
  const tLineH = Math.round(tSize * 1.12);
  const gap = 64, sLineH = 42;

  const blockH = tLines.length * tLineH + gap + sLines.length * sLineH;
  const blockTop = Math.round(322 - blockH / 2);
  const titleY = blockTop + Math.round(tSize * 0.82);
  const subY = titleY + (tLines.length - 1) * tLineH + gap;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
<rect width="1200" height="630" fill="#193629"/>
<text x="80" y="96" font-family="${FONT}" font-size="26" fill="#b5ccb8">${esc('IT nói tiếng người')}</text>
${tLines.map((l, i) => `<text x="80" y="${titleY + i * tLineH}" font-family="${FONT}" font-size="${tSize}" font-weight="700" fill="#ffffff" letter-spacing="-1.5">${esc(l)}</text>`).join('\n')}
<rect x="80" y="${subY - 38}" width="52" height="5" rx="2.5" fill="#d9f26c"/>
${sLines.map((l, i) => `<text x="80" y="${subY + 6 + i * sLineH}" font-family="${FONT}" font-size="30" fill="#dce8df">${esc(l)}</text>`).join('\n')}
<g transform="translate(960 318)" stroke="#d9f26c" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round">${hinh}</g>
</svg>`;
};

export const renderOG = ({ title, sub, hinhKey }) => {
  const hinh = HINH[hinhKey] ?? HINH._home;
  return new Resvg(svg({ title, sub, hinh }), {
    fitTo: { mode: 'width', value: 1200 },
    font: { loadSystemFonts: true, defaultFontFamily: 'Segoe UI' }
  }).render().asPng();
};
