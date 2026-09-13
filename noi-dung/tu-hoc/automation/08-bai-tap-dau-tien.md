---
so: 8
title: Bài tập đầu tiên: tự viết 1 test
mota: Viết 4 test cho trang Lộ trình từ nhìn trang → lấy địa chỉ → viết → chạy → commit.
---

Mục tiêu: viết test cho trang **Lộ trình** (`/lo-trinh/`) — trang này hiện chưa có test.

## Bước 1 — Xem trang bằng mắt

```powershell
npx serve -l 4173 .
```

Mở `http://localhost:4173/lo-trinh/`. Nhìn: tiêu đề là gì? Có những mục gì? Có link nào?

## Bước 2 — Lấy "địa chỉ" bằng F12

Bấm F12 → `Ctrl+Shift+C` → rê vào tiêu đề chính. Ghi lại: thẻ gì (`h1`?), chữ gì.

## Bước 3 — Viết test case tay trước (trên giấy)

```
TC-LT-01: Mở /lo-trinh/ → title tab có chữ "Lộ trình", h1 là "Bạn đang ở mốc nào?"
TC-LT-02: Có đúng 3 nhóm (h3): "Kiểm thử", "AI", "Nền tảng"
TC-LT-03: Nhóm "Kiểm thử" có 3 mốc, mốc 2 chứa chữ "Tự viết được cái đầu tiên"
TC-LT-04: Bấm link "So sánh" trên menu → URL đổi sang /so-sanh/
```

(Tôi đã xem trang này trước: nó KHÔNG có link tới từng thuật ngữ, chỉ có 3 nhóm mốc và menu. Bài học đầu tiên: **luôn nhìn trang thật trước khi viết test**, đừng đoán.)

## Bước 4 — Tạo file test

Tạo file mới `tests/lo-trinh.spec.js` (chuột phải folder `tests` → New File). Dán:

```js
// Trang lộ trình: tiêu đề, 3 nhóm mốc, menu.
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/lo-trinh/');
});

test('mở được trang và có tiêu đề đúng', async ({ page }) => {
  await expect(page).toHaveTitle(/Lộ trình/);
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Bạn đang ở mốc nào?');
});

test('có đúng 3 nhóm lộ trình', async ({ page }) => {
  const nhom = page.getByRole('heading', { level: 3 });
  await expect(nhom).toHaveCount(3);
  await expect(nhom).toHaveText(['Kiểm thử', 'AI', 'Nền tảng']);
});

test('nhóm Kiểm thử có mốc "Tự viết được cái đầu tiên"', async ({ page }) => {
  await expect(page.getByText('Tự viết được cái đầu tiên')).toBeVisible();
});

test('bấm "So sánh" trên menu thì sang trang so sánh', async ({ page }) => {
  await page.getByRole('link', { name: 'So sánh' }).first().click();
  await expect(page).toHaveURL(/\/so-sanh\/$/);
});
```

Test thứ 3 tôi cố tình để "lỏng" (chỉ kiểm tra chữ có hiện). Khi chạy xanh rồi, bạn tự nâng cấp: dùng F12 tìm xem mỗi mốc nằm trong thẻ gì, rồi đếm đúng 3 mốc trong nhóm Kiểm thử. Đó là bài tập thật sự.

## Bước 5 — Chạy đúng file này thôi

```powershell
npx playwright test tests/lo-trinh.spec.js --headed
```

`--headed` để nhìn thấy trình duyệt. Xanh cả 4 → chúc mừng, bạn vừa viết automation test đầu tiên.

Đỏ → sang Bài 9. Khả năng cao nhất: test 4 báo `strict mode violation` vì có nhiều link "So sánh" (menu + footer) — đó là lý do tôi thêm `.first()`. Thử **bỏ `.first()` đi chạy lại** để tận mắt thấy lỗi này, rồi thêm lại. **Đó là bình thường** — bạn đoán, chạy, sửa theo thực tế.

## Bước 6 — Chạy toàn bộ để chắc không hỏng cái khác

```powershell
npm test
```

## Bước 7 — Commit lên nhánh riêng (chưa merge, chưa lên web)

```powershell
git checkout -b test/them-test-lo-trinh
git add tests/lo-trinh.spec.js
git commit -m "Thêm test cho trang lộ trình"
git push -u origin test/them-test-lo-trinh
```

Lên GitHub mở PR → xem Actions chạy. Vì bạn dặn chưa update web: **chỉ mở PR, đừng merge**. Job deploy chỉ chạy khi push lên `main`, nên nhánh riêng an toàn tuyệt đối.

## Bài tập nâng dần (làm sau khi xong bài trên)

1. Viết test cho trang so sánh `/so-sanh/` (đã có 1 file — đọc rồi thêm 1 test mới).
2. Viết test: mở `/thuat-ngu/api/` → bấm link "Liên quan" đầu tiên → URL đổi.
3. Viết test: trang chủ, gõ "GIT" (chữ hoa) → gợi ý vẫn hiện (test không phân biệt hoa thường).
4. Viết test chạy vòng lặp qua 5 thuật ngữ đầu trong `TERMS`, mỗi cái mở trang riêng và kiểm tra `h1` = tên.

---
