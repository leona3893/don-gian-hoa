---
so: 2
title: Ngày đầu tiên vào một dự án
mota: Checklist 12 bước đúng thứ tự: clone, đọc package.json, cài, chạy web, chạy test có sẵn.
moRong: package-json
---

Đây là phần bạn hỏi nhiều nhất: "vào dự án thì bắt đầu từ đâu?". Dưới đây là checklist **đúng thứ tự**, áp dụng cho mọi dự án. Cột phải là ví dụ với repo `don-gian-hoa`.

## 2.1 Checklist 12 bước ngày đầu

| Bước | Việc | Vì sao | Ví dụ với repo này |
|---|---|---|---|
| 1 | **Xin link GitHub repo** và được thêm quyền (collaborator) | Không có quyền thì không clone/push được | `github.com/leona3893/don-gian-hoa` |
| 2 | **Clone về máy** (tải code về) | Cần bản copy ở local để chạy | `git clone <link>` vào `D:\du-an\` |
| 3 | **Mở folder bằng VS Code** | Nhìn toàn cảnh | File → Open Folder → chọn `don-gian-hoa` |
| 4 | **Đọc `README.md`** (nếu có) | Là "hướng dẫn sử dụng" của dự án | Repo này chưa có README — thực tế nhiều dự án cũng vậy, đừng hoảng |
| 5 | **Mở `package.json`** — nhìn mục `scripts` | Đây là danh sách "nút bấm" của dự án | Thấy 4 nút: `build`, `test`, `report`, `indexnow` |
| 6 | **Chạy `npm install`** | Tải toàn bộ thư viện dự án cần | Tạo ra folder `node_modules` |
| 7 | **Chạy dự án lên xem** | Phải thấy web/app chạy trước khi test gì | `npx serve .` → mở `http://localhost:3000` |
| 8 | **Tìm folder test có sẵn** | Xem dự án đã automation tới đâu | Folder `tests/` có 4 file `.spec.js` |
| 9 | **Chạy test có sẵn** | Xác nhận môi trường OK | `npm test` → thấy toàn xanh. Báo `unknown command` thì xem [Sổ tay](../../../so-tay/npm-test-unknown-command/) |
| 10 | **Mở file cấu hình test** | Biết test chạy trên URL nào, trình duyệt nào | `playwright.config.js` |
| 11 | **Xem tab Actions trên GitHub** | Biết dự án có CI/CD chưa, test chạy tự động khi nào | Có file `.github/workflows/ci-cd.yml` |
| 12 | **Ghi lại 5 câu hỏi** để hỏi dev/lead | Ngày đầu không ai bắt bạn biết hết | Ví dụ: "Test chạy trên môi trường nào? staging hay local?" |

## 2.2 Chi tiết từng bước với lệnh cụ thể

**Bước 2 — Clone:**

```powershell
cd D:\du-an
git clone https://github.com/leona3893/don-gian-hoa.git
cd don-gian-hoa
```

> Repo `don-gian-hoa` là mã nguồn của chính site này, công khai — ai cũng clone được. Nó là sân tập cho cả lộ trình.

**Bước 5 — Đọc `package.json`:**

Mở file, tìm mục `"scripts"`:

```json
"scripts": {
  "build": "node build.mjs",        ← npm run build  → sinh lại HTML từ dữ liệu
  "test": "playwright test",        ← npm test       → chạy toàn bộ test
  "report": "playwright show-report", ← npm run report → mở báo cáo HTML
  "indexnow": "node indexnow.mjs"   ← npm run indexnow → báo Google/Bing có trang mới
}
```

Quy tắc: tên bên trái là "nút", bạn bấm bằng `npm run <tên>` (riêng `test` và `start` được gõ tắt `npm test` / `npm start`).

Mục `"devDependencies"` cho biết dự án dùng **Playwright** để test (`@playwright/test`) và `serve` để bật web local. Nhìn vào đây bạn biết ngay "dự án này automation bằng Playwright, không phải Selenium/Cypress".

> 📎 **Mở rộng:** `package.json` của dự án khác còn nhiều mục hơn — xem [Mở rộng 2](../../../tu-hoc/mo-rong/package-json/). Chưa cần đọc ở lần đầu.

**Bước 6 — Cài thư viện:**

```powershell
npm install
npx playwright install chromium
```

Lệnh thứ hai tải trình duyệt Chromium riêng cho Playwright (khoảng 150MB, chỉ tải 1 lần).

**Bước 7 — Chạy web lên:**

```powershell
npx serve -l 4173 .
```

Mở trình duyệt vào `http://localhost:4173`. Thấy trang "Đơn giản hoá" hiện lên = thành công. Bấm `Ctrl+C` trong PowerShell để tắt.

**Bước 9 — Chạy test:**

```powershell
npm test
```

Bạn sẽ thấy dòng chữ chạy, cuối cùng kiểu `25 passed (30s)`. Chưa cần hiểu, chỉ cần thấy xanh.

Muốn **nhìn thấy trình duyệt** tự bấm (rất nên xem lần đầu, cảm giác rất đã):

```powershell
npx playwright test --headed
```

Muốn xem báo cáo đẹp:

```powershell
npm run report
```

> ✅ **Làm ngay:** làm hết 12 bước với repo này. Bước nào lỗi, ghi lại thông báo lỗi nguyên văn.

---
