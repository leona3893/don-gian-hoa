// Trang sổ tay: danh sách + từng ghi chú (lỗi → sửa → bài học).
import { test, expect } from '@playwright/test';
import { SO_TAY } from '../so-tay.js';

test('trang danh sách có link tới đúng mọi ghi chú', async ({ page }) => {
  await page.goto('/so-tay/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Sổ tay');

  const hrefs = await page.locator('main a').evaluateAll(as => as.map(a => a.getAttribute('href')));
  const slugs = new Set(hrefs.filter(h => /^[a-z0-9-]+\/$/.test(h)).map(h => h.slice(0, -1)));
  expect([...slugs].sort()).toEqual(SO_TAY.map(n => n.slug).sort());
});

test('mỗi ghi chú có đủ khối lỗi/câu hỏi, lệnh và đúng số bài học', async ({ page }) => {
  for (const n of SO_TAY) {
    await page.goto(`/so-tay/${n.slug}/`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(n.h1);
    // Khối đầu: lỗi nguyên văn (pre.loi) hoặc câu hỏi (.hoi) — tuỳ ghi chú.
    if (n.loi) await expect(page.locator('pre.loi')).toContainText(n.loi.split('\n')[0]);
    else await expect(page.locator('.hoi')).toBeVisible();
    await expect(page.locator('pre.code')).toContainText(n.sua[0]);
    await expect(page.locator('.bai-hoc li')).toHaveCount(n.baiHoc.length);
    await expect(page.locator('.bai-hoc li b').first()).toHaveText(n.baiHoc[0].ten.replace(/<[^>]+>/g, ''));
  }
});

test('menu mọi trang chính đều có "Sổ tay"', async ({ page }) => {
  for (const u of ['/', '/lo-trinh/', '/so-sanh/', '/thuat-ngu/git/']) {
    await page.goto(u);
    await expect(page.locator('header .nav a', { hasText: 'Sổ tay' })).toHaveAttribute('href', /so-tay\/$/);
  }
});
