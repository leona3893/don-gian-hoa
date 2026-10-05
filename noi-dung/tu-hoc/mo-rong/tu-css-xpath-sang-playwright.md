---
title: Từ CSS / XPath sang Playwright
mota: Tìm được selector trong DevTools rồi — 3 bước viết nó thành dòng test, bảng tra thẻ → role, và cách viết ở ngôn ngữ khác.
bai: automation-ap-dung-vao-dau
---

Trang này nối tiếp [Quy tắc CSS và XPath](../css-va-xpath/): bên đó là cách **tìm** element trong DevTools, bên này là cách **viết** nó thành code.

## 3 bước

**Bước 1 — Bọc nguyên vào `page.locator()`.** Cách nào cũng chạy.

CSS hay XPath tìm được trong DevTools đều **dán nguyên văn** được:

```js
page.locator('#searchButton')                    // CSS: dán y nguyên
page.locator('//button[text()="Tìm hiểu"]')      // XPath: dán y nguyên — bắt đầu bằng // nên Playwright tự nhận ra
```

Dịch "máy móc" thế này chạy được 100%. Chưa biết làm gì hơn thì dừng ở đây cũng được.

**Bước 2 — Đổi sang `getBy…` cho bền hơn.** Đọc lại selector, có phần nào trong bảng thì đổi phần đó:

| Trong CSS / XPath có | Đổi thành |
|---|---|
| Thẻ `button` | `getByRole('button')` |
| Thẻ `a` | `getByRole('link')` |
| Thẻ `h1` … `h6` | `getByRole('heading', { level: 1 })` |
| Thẻ `input` (ô gõ chữ) | `getByRole('textbox')` — trừ khi có `role="…"` ghi thẳng, xem bảng tra bên dưới |
| Thẻ `tr` | `getByRole('row')` |
| Chữ hiển thị `text()="…"` | Thêm `{ name: '…' }` vào getByRole — hoặc `getByText('…')` |
| `[aria-label="…"]` | `getByLabel('…')` |
| `[placeholder="…"]` | `getByPlaceholder('…')` |
| `[data-testid="…"]` | `getByTestId('…')` |
| **Dấu cách** (CSS) / **`//` ở giữa** (XPath) | **Dấu chấm nối** `.getBy…()` |
| `contains(., "…")` trên một khung | `.filter({ hasText: '…' })` |
| `#id`, `.class`, thuộc tính khác | Không có getBy tương ứng → **giữ trong `locator()`** |

**Bước 3 — Ghép thành một dòng code.** Mọi dòng test đều có đúng 3 phần:

```
await   +   [locator]   +   [làm gì / kiểm tra gì]
```

```js
await page.getByRole('button', { name: 'Tìm hiểu' }).click();                  // làm gì
await expect(page.getByRole('button', { name: 'Tìm hiểu' })).toBeVisible();     // kiểm tra gì
```

**Dịch thử:**

| DevTools | Đọc ra | Playwright |
|---|---|---|
| `//button[text()="Tìm hiểu"]` | button + chữ | `getByRole('button', { name: 'Tìm hiểu' })` |
| `input[aria-label="Tìm thuật ngữ"]` | có aria-label | `getByLabel('Tìm thuật ngữ')` |
| `[role="dialog"] h2` | dialog · **dấu cách** · h2 | `getByRole('dialog').getByRole('heading', { level: 2 })` |
| `//tr[contains(., "Elaine")]//button` | tr · chứa chữ · **//** · button | `getByRole('row').filter({ hasText: 'Elaine' }).getByRole('button')` |
| `#grid .term` | chỉ có id + class | Giữ nguyên: `locator('#grid .term')` |

Dòng cuối: không phải lúc nào cũng đổi được — **giữ `locator()` không sai**.

`getByRole('dialog', { name: 'Create a dataset' })` và `getByRole('dialog').getByRole('heading', { name: 'Create a dataset' })` đều đúng, nhưng trỏ vào **hai thứ khác nhau**: cái đầu là cả hộp thoại, cái sau là riêng dòng tiêu đề. Chọn theo việc định làm tiếp.

## Bảng tra: thẻ → role

`getByRole` nhận **vai trò** của element, không nhận **tên thẻ**. Nhiều khi trùng chữ, nhiều khi không:

| Thẻ HTML | Role |
|---|---|
| `<button>` | `'button'` |
| `<a href>` | `'link'` |
| `<h1>` … `<h6>` | `'heading'` |
| `<input type="text">` | `'textbox'` |
| `<input type="checkbox">` | `'checkbox'` |
| `<input type="radio">` | `'radio'` |
| `<select>` | `'combobox'` |
| `<tr>` / `<td>` | `'row'` / `'cell'` |
| `<img>` | `'img'` |
| `<nav>` | `'navigation'` |

Không có role tên `'input'`, `'div'` hay `'a'`.

**Thẻ có ghi `role="…"` thẳng trong HTML thì role đó đè lên bảng trên.** Ví dụ ô tìm kiếm site này là `<input … role="combobox">` → role là `'combobox'`, không phải `'textbox'`. Không chắc thì F12 → tab **Accessibility**: nó ghi đúng Role và Name để điền vào `getByRole`.

## Sang ngôn ngữ khác thì sao?

Selector CSS / XPath **giống hệt** ở mọi ngôn ngữ, mọi công cụ. Chỉ khác hàm bọc ngoài:

| | Bọc CSS / XPath | Dạng getByRole |
|---|---|---|
| Playwright JavaScript | `page.locator('#searchButton')` | `page.getByRole('button', { name: 'Tìm hiểu' })` |
| Playwright Python | `page.locator("#searchButton")` | `page.get_by_role("button", name="Tìm hiểu")` |
| Playwright Java | `page.locator("#searchButton")` | `page.getByRole(AriaRole.BUTTON, new Page.GetByRoleOptions().setName("Tìm hiểu"))` |
| Selenium (Java) | `driver.findElement(By.cssSelector("#searchButton"))`, `By.xpath("…")` | Không có — Selenium chỉ dùng CSS / XPath / id |

Nên kỹ năng đọc CSS / XPath **mang theo được** sang mọi công cụ. `getBy…` là phần riêng của Playwright.

## Thử `getBy…` trực tiếp trên trang

```powershell
npx playwright codegen http://localhost:4173
```

Cửa sổ Inspector có tab **Locator**: gõ `getByRole('button', { name: 'Tìm hiểu' })`, phần tử khớp được tô sáng trên trang. Nút **Pick locator** làm ngược lại — bấm vào phần tử, nó gợi ý locator.

**Tóm lại:** DevTools thử chữ / CSS / XPath. Playwright Inspector thử `getBy…`.

## Ba câu để nhớ

1. Bọc nguyên vào `page.locator()` trước — chạy được rồi mới đổi dần sang `getBy…`.
2. Role không phải tên thẻ: `input` → `'textbox'`, `a` → `'link'`, `h1` → `'heading'`. Có `role="…"` ghi thẳng thì dùng đúng chữ đó.
3. Dấu cách trong CSS = dấu chấm nối trong Playwright.
