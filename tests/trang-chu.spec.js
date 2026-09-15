// Trang chủ: lưới thuật ngữ, ô tìm kiếm có gợi ý, chip lọc nhóm, modal chi tiết.
import { test, expect } from '@playwright/test';
import { TERMS, slugify, thuatNguHomNay } from '../terms.js';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('hiện đủ toàn bộ thuật ngữ khi chưa lọc gì', async ({ page }) => {
  await expect(page.locator('#grid .term')).toHaveCount(TERMS.length);
  await expect(page.locator('#count')).toHaveText(`${TERMS.length} thuật ngữ`);
  await expect(page.locator('#empty')).toBeHidden();
});

test('gõ vào ô tìm kiếm thì hiện gợi ý và lọc lưới', async ({ page }) => {
  const input = page.getByRole('combobox', { name: 'Tìm thuật ngữ' });
  await input.fill('api');

  const suggestions = page.locator('#suggestions .suggestion');
  await expect(suggestions.first()).toBeVisible();
  expect(await suggestions.count()).toBeLessThanOrEqual(5); // dropdown chỉ tối đa 5 gợi ý
  await expect(suggestions.first()).toContainText('API');
  await expect(input).toHaveAttribute('aria-expanded', 'true');

  // Lưới bên dưới cũng chỉ còn những thuật ngữ khớp "api".
  const names = await page.locator('#grid .term h4').allTextContents();
  expect(names.length).toBeGreaterThan(0);
  for (const name of names) expect(name.toLowerCase()).toContain('api');
});

test('tìm chuỗi vô nghĩa thì báo không có kết quả', async ({ page }) => {
  await page.getByRole('combobox', { name: 'Tìm thuật ngữ' }).fill('xyzkhongcothuatngunay');
  await page.getByRole('button', { name: 'Tìm hiểu' }).click();

  await expect(page.locator('#searchResult')).toContainText('Chưa có kết quả');
  await expect(page.locator('#empty')).toBeVisible();
  await expect(page.locator('#grid .term')).toHaveCount(0);
});

test('phím mũi tên + Enter trên gợi ý mở đúng thuật ngữ', async ({ page }) => {
  const input = page.getByRole('combobox', { name: 'Tìm thuật ngữ' });
  await input.fill('cache');
  await input.press('ArrowDown');
  await expect(page.locator('#suggestions .suggestion.selected')).toHaveCount(1);
  await input.press('Enter');

  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();
  await expect(modal.getByRole('heading', { level: 2 })).toContainText('Cache');
});

test('chip lọc nhóm chỉ hiện thuật ngữ thuộc nhóm đó', async ({ page }) => {
  const cat = 'Kiểm thử';
  const expected = TERMS.filter(t => t.cat === cat).length;

  await page.locator('#chips .chip', { hasText: cat }).click();
  await expect(page.locator('#chips .chip.active')).toHaveText(cat);
  await expect(page.locator('#grid .term')).toHaveCount(expected);
  await expect(page.locator('#count')).toHaveText(`${expected} thuật ngữ`);

  // Bấm "Tất cả" thì trả về đủ.
  await page.locator('#chips .chip', { hasText: 'Tất cả' }).click();
  await expect(page.locator('#grid .term')).toHaveCount(TERMS.length);
});

test('bấm thẻ thuật ngữ mở modal, đổi URL, Escape đóng lại', async ({ page }) => {
  await page.locator('#grid .term', { has: page.locator('h4', { hasText: /^API$/ }) }).click();

  const modal = page.getByRole('dialog');
  await expect(modal).toBeVisible();
  await expect(modal.getByRole('heading', { level: 2 })).toContainText('API');
  await expect(page).toHaveURL(/\/thuat-ngu\/api\/$/);
  await expect(page).toHaveTitle(/API là gì\?/);
  // Nút "Mở trang đầy đủ" trỏ đúng trang tĩnh.
  await expect(modal.locator('#fullLink')).toHaveAttribute('href', /\/thuat-ngu\/api\/$/);

  await page.keyboard.press('Escape');
  await expect(modal).toBeHidden();
  await expect(page).toHaveURL(/\/$/);
});

test('link "Liên quan" trong modal chuyển sang thuật ngữ khác', async ({ page }) => {
  await page.locator('#grid .term', { has: page.locator('h4', { hasText: /^API$/ }) }).click();
  const modal = page.getByRole('dialog');
  const related = modal.locator('#related a').first();
  const name = (await related.textContent()).trim();

  await related.click();
  await expect(modal.getByRole('heading', { level: 2 })).toContainText(name);
});

test('thẻ "Hôm nay hiểu nhanh" hiện đúng thuật ngữ của ngày và link về trang tĩnh', async ({ page }) => {
  const t = thuatNguHomNay();
  const card = page.locator('#heroCard');
  await expect(card.locator('#heroLink')).toHaveText(`${t.name} là gì?`);
  await expect(card.locator('#heroLink')).toHaveAttribute('href', new RegExp(`/thuat-ngu/${slugify(t.name)}/$`));
  await expect(card.locator('#heroText')).toHaveText(t.analogy);
  // Sơ đồ mũi tên chỉ hiện với thuật ngữ có sẵn flow.
  if (t.flow) await expect(card.locator('#heroFlow .flow-box')).toHaveText(t.flow);
  else await expect(card.locator('#heroFlow')).toBeHidden();
});

test('thuatNguHomNay xoay qua toàn bộ thuật ngữ, mỗi ngày một cái, không lặp trong một vòng', async () => {
  const goc = new Date(2026, 0, 1, 12);
  const thay = new Set();
  for (let i = 0; i < TERMS.length; i++) {
    thay.add(thuatNguHomNay(new Date(goc.getTime() + i * 86400000)).name);
  }
  expect(thay.size).toBe(TERMS.length);
  // Cùng một ngày, sáng hay tối đều ra một thuật ngữ.
  expect(thuatNguHomNay(new Date(2026, 5, 10, 0, 5)).name).toBe(thuatNguHomNay(new Date(2026, 5, 10, 23, 55)).name);
});
