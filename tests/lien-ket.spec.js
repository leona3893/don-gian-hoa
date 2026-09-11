// Mọi URL khai trong sitemap.xml phải mở được ở local — không có trang chết.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';

const SITE = 'https://leona3893.github.io/don-gian-hoa/';
const urls = [...fs.readFileSync('sitemap.xml', 'utf8').matchAll(/<loc>(.*?)<\/loc>/g)]
  .map(m => m[1].replace(SITE, '/'));

test('sitemap có ít nhất 80 trang', () => {
  expect(urls.length).toBeGreaterThan(80);
});

test('mọi URL trong sitemap đều trả về 200', async ({ request }) => {
  const dead = [];
  for (const u of urls) {
    const res = await request.get(u);
    if (res.status() !== 200) dead.push(`${u} → ${res.status()}`);
  }
  expect(dead, 'Các trang không mở được:\n' + dead.join('\n')).toEqual([]);
});
