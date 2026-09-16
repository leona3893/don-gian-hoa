---
so: 6
title: Automation nên áp dụng vào đâu
mota: Cái gì nên và không nên tự động, thứ tự ưu tiên, biến test case tay thành test tự động, chọn locator.
---

## 6.1 Cái gì NÊN và KHÔNG NÊN tự động hoá

| NÊN tự động | KHÔNG nên (test tay tốt hơn) |
|---|---|
| Luồng lặp lại mỗi lần release (đăng nhập, tìm kiếm, thanh toán) | Tính năng mới, đang thay đổi giao diện hàng ngày |
| Smoke test: "web có mở được không, trang chính có hiện không" | Đánh giá "đẹp/xấu", UX, cảm giác |
| Kiểm tra dữ liệu số lượng lớn (83 trang thuật ngữ đều mở được?) | Test khám phá (exploratory) |
| Regression: sửa chỗ này có làm hỏng chỗ kia không | Test 1 lần rồi thôi |
| Cross-browser cơ bản | Captcha, OTP thật, thanh toán thật |

Nguyên tắc: **tự động hoá cái nhàm chán, lặp lại, ổn định**. Giữ sức người cho cái cần óc.

## 6.2 Bắt đầu từ đâu trong một dự án thật — thứ tự ưu tiên

1. **Smoke test (tuần đầu)**: 3–5 test kiểm tra "trang mở được, không lỗi, thấy đúng tiêu đề". Ví dụ trong repo: [`tests/lien-ket.spec.js`](https://github.com/leona3893/don-gian-hoa/blob/main/tests/lien-ket.spec.js) kiểm tra tất cả link không bị 404.
2. **Luồng chính (happy path)**: mỗi tính năng lớn 1 test đi đúng đường. Ví dụ: tìm "api" → có gợi ý → bấm → mở modal.
3. **Trường hợp biên & lỗi**: tìm chuỗi vô nghĩa → thấy "Chưa có kết quả".
4. **Regression theo bug**: mỗi bug từng xảy ra → 1 test đảm bảo không tái phát.

> ✅ **Làm ngay — lập kế hoạch automation cho chính site này.** Đây là kỹ năng *quyết định*, không phải kỹ năng gõ code, nên bài tập là **lập kế hoạch trên giấy trước, code sau**.
>
> **Bước 1 — Đi dạo 10 phút** trên site như người dùng. Rồi mở file `ke-hoach.md` (hoặc giấy), viết 4 nhóm theo đúng thứ tự trên, mỗi dòng dạng *"Ở đâu → làm gì → mong gì"*, **không viết code**:
> 1. **Smoke** (3–5 dòng) — "site còn sống không?". Ví dụ: *trang chủ → mở → thấy lưới thuật ngữ*.
> 2. **Happy path** (mỗi tính năng 1 dòng) — tìm kiếm, lọc chip, mở modal, so sánh, sổ tay, tự học…
> 3. **Biên & lỗi** (3–5 dòng) — tìm chuỗi không có; gõ chữ hoa; mở URL sai `/thuat-ngu/khong-ton-tai/`…
> 4. **Regression theo bug** — để trống. Điền khi gặp bug đầu tiên.
>
> **Bước 2 — Đối chiếu với thực tế.** Mở folder [`tests/`](https://github.com/leona3893/don-gian-hoa/tree/main/tests), đọc **tên** các test đang có. Đánh dấu vào kế hoạch: dòng nào *đã có* test, dòng nào *chưa*. Bạn sẽ thấy ngay bộ test hiện tại thiếu smoke cho trang nào, thiếu case biên nào — và bạn tự tìm ra, không ai chỉ.
>
> **Bước 3 — Chọn 1 dòng "chưa có" ở nhóm smoke hoặc happy path**, viết thành test (Bài 8 dạy cách viết). Đừng chọn case biên — ưu tiên đúng thứ tự.
>
> **Bước 4 — Tự hỏi:** trong kế hoạch có dòng nào thuộc cột "KHÔNG nên tự động" ở bảng 6.1 không? Gạch đi. Gạch được ít nhất 1 dòng là bạn đã hiểu 6.1.
>
> Bước 2 là phần quan trọng nhất: ngay cả một site có sẵn CI và hơn 20 test vẫn có lỗ hổng. Việc ngày đầu ở dự án thật không phải là viết test — mà là **nhìn ra test nào đang thiếu**.

## 6.3 Kim tự tháp test (chỉ cần biết để hiểu dev nói gì)

```
        /\        E2E (Playwright) — ít, chậm, giống người dùng nhất  ← BẠN Ở ĐÂY
       /  \
      /----\      Integration / API — vừa                            ← bước tiếp theo
     /      \
    /--------\    Unit — nhiều, nhanh, dev viết                       ← không phải việc bạn
```

## 6.4 Quy trình biến 1 test case tay thành 1 test tự động

Lấy test case tay bạn hay viết:

> **TC-05**: Bấm chip "Kiểm thử" → chỉ hiện thuật ngữ nhóm Kiểm thử, số đếm đúng.

Biến thành tự động qua 5 bước:

| Bước | Câu hỏi | Trả lời cho TC-05 | Code |
|---|---|---|---|
| 1 | Bắt đầu ở trang nào? | Trang chủ | `await page.goto('/')` |
| 2 | Phần tử cần bấm "địa chỉ" là gì? (F12) | chip có class `.chip` và chữ "Kiểm thử" | `page.locator('#chips .chip', { hasText: 'Kiểm thử' })` |
| 3 | Hành động? | Click | `.click()` |
| 4 | Mong đợi gì? | Chip sáng lên; lưới chỉ còn N thẻ | `expect(...).toHaveText('Kiểm thử')`, `expect(...).toHaveCount(N)` |
| 5 | N là bao nhiêu? | Đếm từ `terms.js` | `TERMS.filter(t => t.cat === 'Kiểm thử').length` |

Test này **đã có sẵn** trong [`tests/trang-chu.spec.js`](https://github.com/leona3893/don-gian-hoa/blob/main/tests/trang-chu.spec.js) — test tên "chip lọc nhóm chỉ hiện thuật ngữ thuộc nhóm đó". Bài 7 sẽ mổ xẻ nó.

## 6.5 Cách tìm "địa chỉ" phần tử (locator) — thứ tự ưu tiên

Đây là kỹ năng cốt lõi nhất của automation web. Ưu tiên từ trên xuống:

| Ưu tiên | Cách | Ví dụ | Vì sao |
|---|---|---|---|
| 1 | Theo **vai trò + tên** (cái người dùng thấy) | `page.getByRole('button', { name: 'Tìm hiểu' })` | Dev đổi CSS không ảnh hưởng |
| 2 | Theo **chữ hiển thị** | `page.getByText('Chưa có kết quả')` | Dễ đọc |
| 3 | Theo **label / placeholder** | `page.getByLabel('Tìm thuật ngữ')` | Ổn định |
| 4 | Theo **`data-testid`** (nhờ dev gắn) | `page.getByTestId('search-input')` | Dành riêng cho test |
| 5 | Theo **id** | `page.locator('#grid')` | Khá ổn |
| 6 | Theo **class CSS** | `page.locator('.term')` | Dễ đổi khi dev chỉnh giao diện |
| ❌ | XPath dài ngoằng | `//div[2]/div[1]/span[3]` | Vỡ ngay khi dev thêm 1 thẻ |

### Tìm bằng F12 — không cần tool gì thêm

Đây là cách nên học **trước**, vì mọi công cụ khác chỉ là F12 được tự động hoá.

**Cách 1 — Rê chuột (khi chưa biết phần tử tên gì)**

`F12` → bấm icon mũi tên góc trên trái của DevTools (hoặc `Ctrl+Shift+C`) → rê lên phần tử → bấm. Tab **Elements** nhảy tới đúng dòng HTML, ví dụ ô tìm kiếm của site này:

```html
<input id="q" role="combobox" aria-label="Tìm thuật ngữ" placeholder="Gõ một thuật ngữ…">
```

Đọc thuộc tính theo đúng bảng ưu tiên ở trên: có `role` + tên → `getByRole('combobox', { name: 'Tìm thuật ngữ' })`. Xong. Chưa có mới lùi dần xuống `placeholder` → `data-testid` → `id` → `class`.

Nhược điểm của rê chuột: nó bắt thẻ **nhỏ nhất** dưới con trỏ (một `<span>` trong `<button>`), bạn phải lần ngược lên thẻ cha.

**Cách 2 — `Ctrl+F` trong tab Elements (khi đã biết mình tìm gì) — nên dùng hơn**

Bấm vào tab Elements rồi `Ctrl+F`. Ô tìm này nhận **3 kiểu**:

| Bạn gõ | DevTools hiểu là | Ví dụ |
|---|---|---|
| Chữ thường | Tìm trong chữ hiển thị **và** giá trị thuộc tính | `Tìm thuật ngữ`, `Kiểm thử` |
| CSS selector | Y hệt `page.locator('…')` | `#grid .term`, `[role="combobox"]`, `.chip` |
| XPath (bắt đầu bằng `/`) | Đường dẫn XPath | `//button[text()="Tìm hiểu"]` |

Góc phải ô tìm hiện **1 of N**. Enter để nhảy tới cái tiếp theo — dòng HTML được tô sáng và phần tử trên trang cũng được viền lên. **N = 1** → locator đủ chính xác. **N > 1** → cần thu hẹp (thêm cha: `#grid .term h4`) hoặc chấp nhận `.first()`. Đây chính là cách bắt lỗi *strict mode violation* (Bài 9) trước khi viết một dòng code nào.

Quy trình không cần chuột:

1. Nhìn màn hình, ghi lại **chữ** người dùng thấy trên phần tử (tên nút, nhãn ô nhập).
2. `Ctrl+F` → gõ chữ đó → xem dòng HTML: thẻ gì, có `role` / `aria-label` / `id` / `data-testid` không.
3. Gõ lại dưới dạng CSS selector định dùng → xem N.
4. Chuyển thành locator Playwright theo bảng ưu tiên.

Thẻ nào có `role` sẵn mà không cần ghi: `<button>` = button, `<a href>` = link, `<input type="text">` = textbox, `<input type="checkbox">` = checkbox, `<h1>`–`<h6>` = heading, `<select>` = combobox, `<dialog>` = dialog.

**Hai thứ phụ trong Elements đáng biết**

- **Chuột phải lên dòng HTML → Copy → Copy selector**: DevTools tự sinh CSS selector. Thường ra kiểu `#grid > a:nth-child(3) > h4` — dễ vỡ, chỉ để tham khảo rồi tự rút gọn.
- **Tab Accessibility** (cạnh Styles, có thể phải bấm `»`): chọn phần tử, nó hiện đúng **Role** và **Name** mà `getByRole` dùng. Chắc chắn nhất khi không biết `name` nên điền gì.

**Kiểm tra nhanh trong tab Console** (không cần chạy test):

```js
$$('#grid .term').length          // đếm số phần tử khớp CSS selector
$$('[role="combobox"]')           // in ra danh sách thẻ khớp
```

**Phần tử biến mất khi rời chuột** (dropdown gợi ý, menu hover): gõ chữ cho dropdown hiện → sang Elements → **không rê chuột nữa**, dùng `Ctrl+F` tìm chữ trong dropdown. Hoặc Console gõ `setTimeout(() => { debugger }, 3000)` rồi mở dropdown — 3 giây sau trang đóng băng, tha hồ soi.

> ✅ **Làm ngay:** trên trang chủ, tìm locator cho 3 thứ bằng `Ctrl+F` (không rê chuột): chip "Kiểm thử", thẻ thuật ngữ "API", nút đóng modal. Ghi lại N của mỗi cái. Rồi mở [`tests/trang-chu.spec.js`](https://github.com/leona3893/don-gian-hoa/blob/main/tests/trang-chu.spec.js) so với cách file đó viết.

### Codegen — F12 được tự động hoá

Chạy `npx playwright codegen http://localhost:4173` → mở trình duyệt, bạn bấm gì nó sinh code nấy, gợi ý locator theo cùng thứ tự ưu tiên. Dùng để **đối chiếu**: tự tìm bằng F12 trước, rồi bật codegen bấm cùng phần tử, so hai kết quả — khớp là bạn đã đọc HTML đúng. **Không copy nguyên xi** code nó sinh ra (thường xấu, không có assertion có ý nghĩa).

## 6.6 Page Object — khi test bắt đầu nhiều

Khi có > 10 file test, bạn sẽ thấy `page.getByRole('combobox', { name: 'Tìm thuật ngữ' })` lặp lại ở 15 chỗ. Dev đổi tên → sửa 15 chỗ. Giải pháp: gom "địa chỉ" và hành động của 1 trang vào 1 file:

```js
// tests/pages/TrangChu.js
export class TrangChu {
  constructor(page) {
    this.page = page;
    this.oTim = page.getByRole('combobox', { name: 'Tìm thuật ngữ' });
    this.luoi = page.locator('#grid .term');
  }
  async mo() { await this.page.goto('/'); }
  async tim(tuKhoa) { await this.oTim.fill(tuKhoa); }
}
```

Rồi test chỉ còn:

```js
const trangChu = new TrangChu(page);
await trangChu.mo();
await trangChu.tim('api');
```

Chưa cần làm bây giờ. Tuần 7–8 trong lộ trình mới đụng.

---
