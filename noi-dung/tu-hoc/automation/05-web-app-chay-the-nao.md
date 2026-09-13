---
so: 5
title: Web / app chạy như thế nào
mota: Frontend, backend, localhost, port, ba môi trường, build vs deploy, và dùng F12.
---

## 5.1 Bức tranh tổng thể

```
   Người dùng                    Máy chủ (server)
 ┌───────────┐   HTTP request   ┌────────────┐   query   ┌──────────┐
 │ Trình duyệt│ ───────────────▶ │  Backend   │ ────────▶ │ Database │
 │ (Frontend) │ ◀─────────────── │  (API)     │ ◀──────── │          │
 └───────────┘   HTML/JSON      └────────────┘           └──────────┘
```

- **Frontend**: thứ hiện lên trên trình duyệt — HTML (khung), CSS (áo), JavaScript (hành vi bấm/gõ).
- **Backend / API**: máy chủ nhận yêu cầu, xử lý, trả dữ liệu (thường dạng JSON).
- **Database**: nơi cất dữ liệu.

**Repo này là site tĩnh**: chỉ có frontend, không backend, không database. Dữ liệu nằm sẵn trong `terms.js`. Nên nó rất dễ để học: chỉ cần "bật file lên" là chạy.

## 5.2 `localhost` và `port` là gì

- `localhost` = "chính máy này". `http://localhost:4173` = "web đang chạy trên máy tôi, cổng 4173".
- **Port** = số cửa. Một máy có nhiều cửa, mỗi app chiếm 1 cửa. Quy ước hay gặp: 3000, 4173, 5173, 8080.
- Khi dev nói "chạy local lên" nghĩa là: bật server trên máy → mở `localhost:<port>`.

## 5.3 Ba môi trường bạn sẽ nghe suốt

| Môi trường | Là gì | URL kiểu |
|---|---|---|
| **Local** | Trên máy bạn | `http://localhost:4173` |
| **Staging / Test / Dev** | Máy chủ nội bộ để test trước | `https://staging.congty.com` |
| **Production (Prod)** | Thật, khách đang dùng | `https://congty.com` |

Automation thường chạy trên **local** (khi dev) và **staging** (trên CI). Rất hiếm khi chạy test phá hoại trên prod.

Trong repo này, [`playwright.config.js`](https://github.com/leona3893/don-gian-hoa/blob/main/playwright.config.js) chỉ định môi trường:

```js
use: {
  baseURL: `http://localhost:4173`,   ← mọi page.goto('/') sẽ thành localhost:4173/
},
webServer: {
  command: `npx serve -l 4173 --no-clipboard .`,   ← Playwright TỰ bật server trước khi test
  url: `http://localhost:4173/`,
},
```

Nghĩa là bạn chỉ cần `npm test`, Playwright tự bật web, tự test, tự tắt. Ở dự án khác không có `webServer`, bạn phải tự bật web ở 1 cửa sổ PowerShell rồi chạy test ở cửa sổ khác.

## 5.4 "Build" và "Deploy" là gì

- **Build** = biến code nguồn thành thứ chạy được / thứ đưa lên server. Repo này: `npm run build` đọc `terms.js` và sinh ra 83 file HTML trong `thuat-ngu/`.
- **Deploy** = đưa bản build lên server cho người dùng. Repo này: job `deploy` trong Actions đẩy lên GitHub Pages.

## 5.5 Dùng DevTools (F12) — công cụ số 1 của tester automation

Mở `http://localhost:4173`, bấm `F12`:

- Tab **Elements**: xem HTML. Bấm icon mũi tên góc trên trái (hoặc `Ctrl+Shift+C`) rồi rê chuột vào ô tìm kiếm → thấy HTML của nó, ví dụ `<input id="q" role="combobox" aria-label="Tìm thuật ngữ">`. Đây là cách bạn **tìm "địa chỉ" của phần tử** để test bấm vào.
- Tab **Console**: lỗi JavaScript hiện ở đây.
- Tab **Network**: mọi yêu cầu web gửi đi (API call). Rất cần khi test API.

> ✅ **Làm ngay:** bật web local, F12, dùng mũi tên chọn: (1) ô tìm kiếm, (2) một thẻ thuật ngữ, (3) nút chip "Kiểm thử". Ghi lại `id`, `class`, `role`, `aria-label` của từng cái.

## 5.6 App mobile khác gì?

- Web: trình duyệt hiển thị HTML → Playwright/Cypress/Selenium.
- Mobile app (Android/iOS): app cài trên máy, không có HTML → dùng **Appium** (cần Android Studio + máy ảo). Khó hơn web nhiều. **Học web trước**, 3–6 tháng sau mới sang mobile.
- API: không có giao diện, gọi thẳng backend → Postman (bấm tay) hoặc Playwright `request` (tự động). Học ngay sau web.

---
