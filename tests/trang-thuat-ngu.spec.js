// Trang tĩnh của từng thuật ngữ (do build.mjs sinh ra).
import { test, expect } from '@playwright/test';

test('trang API có đủ 4 tầng và link "Đi đâu tiếp" dẫn tới trang thật', async ({ page }) => {
  await page.goto('/thuat-ngu/api/');

  await expect(page).toHaveTitle(/API là gì\?/);
  await expect(page.getByRole('heading', { level: 1 })).toContainText('API');
  await expect(page.locator('.layer-name')).toHaveText([
    'Hiểu nó là gì', 'Code trông thế nào', 'Khi nào bạn dùng nó', 'Đi đâu tiếp',
  ]);

  await page.locator('.nextlist a').first().click();
  await expect(page).toHaveURL(/\/thuat-ngu\/[a-z0-9-]+\/$/);
  await expect(page.getByRole('heading', { level: 1 })).not.toBeEmpty();
});

test('breadcrumb "Trang chủ" dẫn về lưới thuật ngữ', async ({ page }) => {
  await page.goto('/thuat-ngu/cache/');
  await page.locator('.crumb a', { hasText: 'Trang chủ' }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.locator('#grid .term').first()).toBeVisible();
});

test('thẻ og:image của trang thuật ngữ trỏ tới ảnh có thật', async ({ page, request }) => {
  await page.goto('/thuat-ngu/bug/');
  const og = await page.locator('meta[property="og:image"]').getAttribute('content');
  expect(og).toMatch(/\/og\/bug\.png$/);

  // Ảnh nằm sẵn trong repo nên phải lấy được ở local.
  const res = await request.get(og.replace('https://leona3893.github.io/don-gian-hoa/', '/'));
  expect(res.status()).toBe(200);
  expect(res.headers()['content-type']).toContain('image/png');
});
