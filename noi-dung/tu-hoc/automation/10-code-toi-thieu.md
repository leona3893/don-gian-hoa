---
so: 10
title: Code tối thiểu cần biết
mota: Tám thứ JavaScript đủ dùng: biến, chuỗi, số, mảng, object, hàm, async/await, import.
---

Bạn KHÔNG cần học hết JavaScript. Chỉ cần 8 thứ này, đều đã xuất hiện trong test của repo.

## 10.1 Biến — đặt tên cho một thứ để dùng lại

```js
const input = page.getByRole('combobox', { name: 'Tìm thuật ngữ' });
//    ▲ tên   ▲ giá trị
// const = không đổi giá trị sau này (dùng 95% thời gian)
// let   = sẽ đổi
```

## 10.2 Chuỗi (string) — chữ

```js
'api'                 // nháy đơn
"api"                 // nháy kép — như nhau
`${TERMS.length} thuật ngữ`   // nháy ngược: chèn biến vào giữa bằng ${...}
name.toLowerCase()    // đổi về chữ thường
name.trim()           // bỏ khoảng trắng đầu/cuối
```

## 10.3 Số & so sánh

```js
5, 83, TERMS.length
a === b     // bằng (dùng 3 dấu =)
a !== b     // khác
a > b, a <= b
```

## 10.4 Mảng (array) — danh sách

```js
const names = ['API', 'Bug', 'Cache'];
names.length          // 3
names[0]              // 'API' (đếm từ 0!)
names.filter(n => n.startsWith('B'))   // ['Bug'] — lọc
for (const name of names) { ... }      // lặp qua từng cái
```

## 10.5 Đối tượng (object) — thứ có nhiều thuộc tính

```js
const term = { name: 'API', cat: 'Backend' };
term.name             // 'API'
term.cat              // 'Backend'
// TERMS trong terms.js là mảng các object như thế
TERMS.filter(t => t.cat === 'Kiểm thử').length   // đếm thuật ngữ nhóm Kiểm thử
```

## 10.6 Hàm (function) — gói việc để gọi lại

```js
// Dạng mũi tên, gặp suốt trong test:
async ({ page }) => { ... }
//    ▲ nhận vào page   ▲ thân hàm
t => t.cat === 'Kiểm thử'     // hàm 1 dòng: nhận t, trả về true/false
```

## 10.7 `async` / `await` — thứ khó hiểu nhất, giải thích đời thường

Trình duyệt làm việc **chậm** (mở trang mất 1 giây, bấm nút mất 0.2 giây). Code chạy **nhanh**. Nếu không "chờ", code sẽ bấm nút khi trang chưa load xong.

- `await` = "**chờ việc này xong rồi mới xuống dòng tiếp**".
- Hàm nào có `await` bên trong thì phải khai `async` ở đầu.

**Quy tắc thực dụng:** mọi lệnh có `page.` hoặc `expect(...).toXxx()` → đặt `await` phía trước. Quên `await` là lỗi số 1 của người mới — test sẽ xanh giả tạo hoặc đỏ lung tung.

## 10.8 `import` — mượn đồ

```js
import { test, expect } from '@playwright/test';   // từ thư viện
import { TERMS } from '../terms.js';               // từ file trong dự án
// '../' = lùi lên 1 folder (từ tests/ lên gốc)
```

## Cách học 8 thứ này

Không học lý thuyết. Mở `tests/trang-chu.spec.js`, với mỗi dòng tự hỏi "dòng này thuộc mục nào trong 10.1–10.8". Làm 2 file là thuộc.

Nếu muốn nền: khoá "JavaScript for Testers" trên Test Automation University (miễn phí, tiếng Anh, ~3 giờ). Chỉ học tới phần async/await là dừng.

---
