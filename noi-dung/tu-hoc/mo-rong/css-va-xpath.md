---
title: Gõ gì vào ô tìm element? Quy tắc CSS và XPath
mota: Mọi element có cùng một hình dạng — học cách dịch từng phần sang ký hiệu CSS, XPath, rồi sang Playwright.
bai: automation-ap-dung-vao-dau
---

## Ô `Ctrl+F` hiểu 3 kiểu — và không hiểu kiểu thứ 4

Trong tab Elements, ô tìm (`Ctrl+F`) nhận:

| Gõ | Ví dụ |
|---|---|
| Chữ thường | `Tìm hiểu` |
| CSS selector | `#searchInput`, `button[type="button"]` |
| XPath (bắt đầu bằng `/`) | `//button[text()="Tìm hiểu"]` |

Nó **không** hiểu code Playwright. Gõ `page.getByText('…')` vào đó sẽ luôn ra *No matches* — DevTools đi tìm nguyên chuỗi chữ đó trong HTML. Muốn thử `getBy…` thì dùng cửa sổ của Playwright (cuối trang).

## Mọi element đều có cùng một hình dạng

```
<button   type="button"   id="luu"   class="nut to"   >  Lưu  </button>
 ───┬──   ─────┬──────   ───┬───   ──────┬──────        ──┬─
 tên thẻ   thuộc tính     id           class            chữ hiển thị
```

`button`, `input`, `a`, `div`, `h2`, `td`… đều theo dạng này. Chỉ khác **tên thẻ** và **có thuộc tính nào**. Nên chỉ cần học cách dịch từng phần — áp được cho mọi thẻ.

## CSS: mỗi phần một ký hiệu

| Phần trong HTML | Ký hiệu CSS | Ví dụ |
|---|---|---|
| Tên thẻ | Viết thẳng | `button`, `input`, `h2` |
| Thuộc tính bất kỳ | Ngoặc vuông `[ ]` | `[type="button"]`, `[aria-label="Tìm thuật ngữ"]` |
| `id` | Dấu thăng `#` | `#searchInput` |
| `class` | Dấu chấm `.` | `.chip` |
| Chữ hiển thị | **Không có** | CSS không tìm được |

`[ ]` chỉ có nghĩa là **"có thuộc tính này"** — thẻ nào cũng dùng được. `#` và `.` là viết tắt: `#searchInput` chính là `[id="searchInput"]`.

Biến thể hay dùng của `[ ]`:

| Viết | Nghĩa |
|---|---|
| `[tên="giá trị"]` | Bằng đúng |
| `[tên^="giá trị"]` | Bắt đầu bằng |
| `[tên*="giá trị"]` | Có chứa |
| `[tên]` | Chỉ cần có thuộc tính đó, giá trị gì cũng được |

## Ghép lại: dính liền hay có dấu cách

| Viết | Nghĩa | Ví dụ |
|---|---|---|
| **Dính liền** | Cùng **một** element có đủ các đặc điểm | `button[type="button"]` — một button có type là button |
| **Có dấu cách** | Cái sau nằm **bên trong** cái trước | `#grid .term` — thẻ `.term` nằm trong `#grid` |

Lỗi hay gặp nhất: `button [type="button"]` (thừa một dấu cách) nghĩa là *"thứ có type=button nằm **bên trong** một button"* — khác hẳn.

## Chọn thuộc tính nào?

Đọc thẻ mở, chọn **một** thuộc tính theo thứ tự:

| Ưu tiên | Thuộc tính | Vì sao |
|---|---|---|
| 1 | `data-testid`, `id` | Thường là duy nhất |
| 2 | `aria-label`, `name`, `placeholder`, `type`, `href`, `role` | Mô tả **chức năng**, ít đổi |
| 3 | `class` | Cùng đường mới dùng |

Hai cái bẫy:

- **`id` tự sinh** như `id="radix-:re:"`, `id="mui-4823"` — nhìn không ra nghĩa, đổi mỗi lần mở trang. Bỏ qua, dù nó là `id`. (Dấu `:` trong đó còn làm CSS báo lỗi.)
- **Class để tô màu** như `inline-flex items-center h-9 px-6` — hàng chục nút khác cũng có y hệt. Tìm theo nó sẽ ra rất nhiều.

## Đọc số "1 of N"

| Thấy | Làm gì |
|---|---|
| **1 of 1** | Trúng duy nhất — xong |
| **1 of 5** | Thêm **cha** phía trước (có dấu cách), hoặc thêm một thuộc tính nữa (dính liền). Đôi khi nhiều là đúng — 8 dòng bảng thì 8 nút `…` |
| **No matches** | Gõ sai: kiểm tra ngoặc kép, dấu cách thừa, giá trị phải khớp từng ký tự |

Ví dụ: gõ `h2` ra **2 of 2** vì trang có hai tiêu đề `h2`. Muốn cái nằm trong hộp thoại → `[role="dialog"] h2` → **1 of 1**.

## Dịch thử trên site này

| HTML | CSS |
|---|---|
| `<input id="searchInput" aria-label="Tìm thuật ngữ" ...>` | `#searchInput` hoặc `input[aria-label="Tìm thuật ngữ"]` |
| `<button type="button" id="searchButton">Tìm hiểu</button>` | `#searchButton` |
| `<div class="chips" id="chips">` chứa các nút chip | `#chips .chip` |
| Thẻ thuật ngữ trong lưới | `#grid .term` |
| `<div role="dialog" ...>` chứa `<h2>` | `[role="dialog"] h2` |

## Tìm theo chữ → dùng XPath

CSS không tìm được chữ. XPath thì được, và tư duy y hệt — chỉ khác ký hiệu:

| Muốn | CSS | XPath |
|---|---|---|
| Theo tên thẻ | `button` | `//button` |
| Theo thuộc tính | `button[type="button"]` | `//button[@type="button"]` |
| Nằm bên trong | `nav a` | `//nav//a` |
| **Theo chữ** | — | `//button[text()="Tìm hiểu"]` |
| Theo chữ, bỏ khoảng trắng thừa | — | `//button[normalize-space()="Tìm hiểu"]` |
| Chứa chữ | — | `//button[contains(., "Tìm")]` |
| Dòng có chứa chữ X, lấy nút trong dòng đó | — | `//tr[contains(., "Elaine")]//button` |

Khác biệt cần nhớ: XPath bắt đầu bằng `//`, thuộc tính phải có `@`.

Dùng `normalize-space()` khi `text()` không ra: chữ trong HTML thường có xuống dòng và thụt lề hai đầu, `text()` so từng ký tự nên trượt.

## Từ CSS / XPath sang Playwright

Tìm được trong DevTools rồi, viết sang Playwright:

| DevTools | Playwright |
|---|---|
| `#searchButton` | `page.locator('#searchButton')` — hoặc tốt hơn: `page.getByRole('button', { name: 'Tìm hiểu' })` |
| `[role="dialog"] h2` | `page.getByRole('dialog').getByRole('heading')` |
| `//tr[contains(., "Elaine")]//button` | `page.getByRole('row').filter({ hasText: 'Elaine' }).getByRole('button')` |

**Một dấu cách trong CSS = một dấu chấm nối trong Playwright.** Mỗi `.getBy…()` nối thêm là thu hẹp chỗ tìm vào bên trong kết quả trước.

`getByRole('dialog', { name: 'Create a dataset' })` và `getByRole('dialog').getByRole('heading', { name: 'Create a dataset' })` đều đúng, nhưng trỏ vào **hai thứ khác nhau**: cái đầu là cả hộp thoại, cái sau là riêng dòng tiêu đề. Chọn theo việc định làm tiếp.

CSS/XPath là để **tìm hiểu** trang. Khi viết test, vẫn ưu tiên `getByRole` / `getByText` / `getByLabel` như bảng ưu tiên ở Bài 6.

## Thử `getBy…` trực tiếp trên trang

```powershell
npx playwright codegen http://localhost:4173
```

Cửa sổ Inspector có tab **Locator**: gõ `getByRole('button', { name: 'Tìm hiểu' })`, phần tử khớp được tô sáng trên trang. Nút **Pick locator** làm ngược lại — bấm vào phần tử, nó gợi ý locator.

**Tóm lại:** DevTools thử chữ / CSS / XPath. Playwright Inspector thử `getBy…`.

## Bốn câu để nhớ

1. Tên thẻ viết thẳng. Thuộc tính bỏ vào `[ ]`. `id` là `#`, `class` là `.`.
2. Dính liền là *cùng một element*. Có dấu cách là *nằm bên trong*.
3. Trúng nhiều thì thêm cha phía trước. Bỏ qua `id` tự sinh và class tô màu.
4. Cần tìm theo chữ thì dùng XPath: `//thẻ[normalize-space()="…"]`.
