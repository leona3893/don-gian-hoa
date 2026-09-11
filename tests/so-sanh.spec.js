// Trang so sánh: danh sách + từng bảng so sánh.
import { test, expect } from '@playwright/test';
import { SO_SANH } from '../so-sanh.js';

test('trang danh sách có link tới đúng mọi bài so sánh', async ({ page }) => {
  await page.goto('/so-sanh/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Hay bị nhầm lẫn');

  // Link nội bộ dạng "mock-va-stub/" — mỗi bài đúng một slug, không thừa không thiếu.
  const hrefs = await page.locator('main a').evaluateAll(as => as.map(a => a.getAttribute('href')));
  const slugs = new Set(hrefs.filter(h => /^[a-z0-9-]+\/$/.test(h)).map(h => h.slice(0, -1)));
  expect([...slugs].sort()).toEqual(SO_SANH.map(s => s.slug).sort());
});

test('bài "Mock và Stub" có bảng so sánh và phần chọn khi nào', async ({ page }) => {
  await page.goto('/so-sanh/mock-va-stub/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(/Mock/i);

  const table = page.locator('table.bang');
  await expect(table).toBeVisible();
  expect(await table.locator('tbody tr').count()).toBeGreaterThan(0);
  await expect(page.locator('.chon')).toBeVisible();
});
