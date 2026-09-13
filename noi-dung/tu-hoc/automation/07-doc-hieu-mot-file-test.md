---
so: 7
title: Đọc hiểu một file test thật, từng dòng một
mota: Dịch từng dòng của tests/trang-chu.spec.js, và từ điển các động từ dùng 90% thời gian.
---

Mở [`tests/trang-chu.spec.js`](https://github.com/leona3893/don-gian-hoa/blob/main/tests/trang-chu.spec.js). Đây là bản dịch từng dòng:

```js
// Dòng 1: ghi chú, máy bỏ qua. Dấu // = ghi chú.
// Trang chủ: lưới thuật ngữ, ô tìm kiếm có gợi ý, chip lọc nhóm, modal chi tiết.

// Dòng 2: "mượn" 2 công cụ từ thư viện Playwright.
//   test   = để khai báo 1 test
//   expect = để nói "tôi mong đợi..."
import { test, expect } from '@playwright/test';

// Dòng 3: mượn danh sách thuật ngữ từ file terms.js (cùng dữ liệu web đang dùng)
// để biết chính xác có bao nhiêu thuật ngữ, khỏi hard-code số 83.
import { TERMS } from '../terms.js';

// "Trước MỖI test, làm việc này": mở trang chủ.
// async/await: xem Bài 10. Tạm hiểu: "await" = "chờ việc này xong rồi mới đi tiếp".
test.beforeEach(async ({ page }) => {
  await page.goto('/');          // '/' + baseURL trong config = http://localhost:4173/
});

// Khai báo 1 test. Chuỗi trong ngoặc là TÊN test, viết tiếng Việt thoải mái.
// { page } = cái trình duyệt Playwright đưa cho bạn.
test('hiện đủ toàn bộ thuật ngữ khi chưa lọc gì', async ({ page }) => {
  // Mong: số thẻ .term trong #grid = số phần tử trong TERMS
  await expect(page.locator('#grid .term')).toHaveCount(TERMS.length);
  // Mong: chữ trong #count là "83 thuật ngữ" (TERMS.length tự điền số)
  await expect(page.locator('#count')).toHaveText(`${TERMS.length} thuật ngữ`);
  // Mong: khung "không có kết quả" đang ẩn
  await expect(page.locator('#empty')).toBeHidden();
});
```

Tiếp:

```js
test('gõ vào ô tìm kiếm thì hiện gợi ý và lọc lưới', async ({ page }) => {
  // Tìm ô input theo vai trò "combobox" và tên "Tìm thuật ngữ". Gán vào biến input để dùng lại.
  const input = page.getByRole('combobox', { name: 'Tìm thuật ngữ' });
  // Gõ chữ "api" vào (fill = xoá sạch rồi gõ)
  await input.fill('api');

  // Tìm các dòng gợi ý
  const suggestions = page.locator('#suggestions .suggestion');
  // Mong: dòng gợi ý đầu tiên hiện ra
  await expect(suggestions.first()).toBeVisible();
  // Mong: số gợi ý ≤ 5
  expect(await suggestions.count()).toBeLessThanOrEqual(5);
  // Mong: gợi ý đầu có chứa chữ "API"
  await expect(suggestions.first()).toContainText('API');

  // Lấy toàn bộ tên thuật ngữ đang hiện trong lưới (thành 1 danh sách chuỗi)
  const names = await page.locator('#grid .term h4').allTextContents();
  // Mong: còn ít nhất 1 thẻ
  expect(names.length).toBeGreaterThan(0);
  // Với TỪNG tên: đổi về chữ thường, mong nó chứa "api"
  for (const name of names) expect(name.toLowerCase()).toContain('api');
});
```

## 7.1 Từ điển các "động từ" bạn sẽ dùng 90% thời gian

**Đi:**
- `page.goto('/duong-dan')` — mở trang.

**Tìm phần tử (locator):**
- `page.getByRole('button', { name: 'Tìm hiểu' })` — theo vai trò + tên.
- `page.getByText('chữ')` — theo chữ.
- `page.getByLabel('nhãn')` — theo nhãn.
- `page.locator('#id')`, `page.locator('.class')` — theo CSS.
- `.first()`, `.nth(2)`, `.last()` — chọn cái thứ mấy khi có nhiều.
- `.filter({ hasText: 'x' })` — lọc.

**Làm:**
- `.click()` — bấm.
- `.fill('chữ')` — gõ vào ô.
- `.press('Enter')` — bấm phím.
- `.check()` — tick checkbox.
- `.selectOption('gia-tri')` — chọn dropdown.
- `.hover()` — rê chuột.

**Mong đợi (assertion):**
- `toBeVisible()` / `toBeHidden()` — hiện / ẩn.
- `toHaveText('chữ')` — chữ đúng y hệt.
- `toContainText('chữ')` — có chứa chữ.
- `toHaveCount(5)` — có đúng 5 cái.
- `toHaveURL(/regex/)` — URL đúng.
- `toHaveTitle(/regex/)` — title tab đúng.
- `toHaveAttribute('href', '/x')` — thuộc tính đúng.
- `toBeEnabled()` / `toBeDisabled()` — nút bấm được / bị mờ.

Quy tắc: **locator → hành động → expect**. Ba khối, mọi test đều thế.

> ✅ **Làm ngay:** đọc hết 4 file trong `tests/`. Với mỗi test, viết 1 dòng tiếng Việt "test này kiểm tra cái gì" vào file ghi chú riêng. Bạn sẽ thấy 80% là lặp lại cùng pattern.

---
