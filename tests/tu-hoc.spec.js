// Trang tự học: danh sách series, mục lục bài, từng bài có nội dung + điều hướng, trang mở rộng.
import { test, expect } from '@playwright/test';
import fs from 'node:fs';

const bai = fs.readdirSync('noi-dung/tu-hoc/automation').filter(f => f.endsWith('.md')).sort()
  .map(f => f.replace(/^\d+-/, '').replace(/\.md$/, ''));
const moRong = fs.readdirSync('noi-dung/tu-hoc/mo-rong').filter(f => f.endsWith('.md')).sort()
  .map(f => f.replace(/\.md$/, ''));

test('trang Tự học dẫn tới series automation', async ({ page }) => {
  await page.goto('/tu-hoc/');
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Tự học');
  await page.getByRole('link', { name: /Automation cho người không giỏi code/ }).click();
  await expect(page).toHaveURL(/\/tu-hoc\/automation\/$/);
});

test('mục lục series liệt kê đúng mọi bài theo thứ tự file', async ({ page }) => {
  await page.goto('/tu-hoc/automation/');
  const hrefs = await page.locator('.muc-luc a').evaluateAll(as => as.map(a => a.getAttribute('href')));
  expect(hrefs).toEqual(bai.map(s => `${s}/`));
  // Mọi trang mở rộng đều có link.
  for (const m of moRong) await expect(page.locator(`a[href="../mo-rong/${m}/"]`)).toBeVisible();
});

test('mỗi bài có tiêu đề, nội dung Markdown đã render, và nút bài trước/sau đúng', async ({ page }) => {
  for (let i = 0; i < bai.length; i++) {
    await page.goto(`/tu-hoc/automation/${bai[i]}/`);
    await expect(page.locator('.article h1')).not.toBeEmpty();
    // Markdown đã thành HTML: có bảng/code/đoạn văn, và không còn ký hiệu Markdown thô.
    expect(await page.locator('.md p, .md table, .md pre').count()).toBeGreaterThan(0);
    await expect(page.locator('.md')).not.toContainText(/(^|\n)## |\|---\|/);
    if (i > 0) await expect(page.locator('.bai-nav a.truoc')).toHaveAttribute('href', `../${bai[i - 1]}/`);
    if (i < bai.length - 1) await expect(page.locator('.bai-nav a.sau')).toHaveAttribute('href', `../${bai[i + 1]}/`);
  }
});

test('bài 2 và bài 3 có khung mở rộng trỏ tới trang mở rộng thật', async ({ page }) => {
  await page.goto('/tu-hoc/automation/ngay-dau-vao-du-an/');
  await page.locator('.mo-rong a', { hasText: 'package.json' }).click();
  await expect(page).toHaveURL(/\/tu-hoc\/mo-rong\/package-json\/$/);
  await expect(page.locator('.md table').first()).toBeVisible();
  // Quay lại đúng bài.
  await page.getByRole('link', { name: /Quay lại Bài 2/ }).click();
  await expect(page).toHaveURL(/\/ngay-dau-vao-du-an\/$/);

  await page.goto('/tu-hoc/automation/giai-phau-folder-du-an/');
  await expect(page.locator('.mo-rong a[href="../../mo-rong/cau-truc-du-an-js/"]')).toBeVisible();
});

test('menu mọi trang chính đều có "Tự học"', async ({ page }) => {
  for (const u of ['/', '/lo-trinh/', '/so-sanh/', '/so-tay/', '/thuat-ngu/git/']) {
    await page.goto(u);
    await expect(page.locator('header .nav a', { hasText: 'Tự học' })).toHaveAttribute('href', /tu-hoc\/$/);
  }
});
