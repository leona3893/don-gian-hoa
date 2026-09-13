---
so: 3
title: Giải phẫu folder dự án
mota: File nào để làm gì, tester có cần đụng không, và cách định vị trong dự án lạ trong 10 phút.
moRong: cau-truc-du-an-js
---

## 3.1 Bảng "file này để làm gì" — repo `don-gian-hoa`

Mở folder trong VS Code và đối chiếu:

| Tên | Loại | Nó là gì | Bạn (tester) có cần đụng không? |
|---|---|---|---|
| `index.html` | Trang web | Trang chủ, cái người dùng nhìn thấy | Đọc để tìm id/tên nút cho test |
| `styles.css` | Giao diện | Màu sắc, font, khoảng cách | Không |
| `terms.js` | Dữ liệu | Danh sách thuật ngữ (tên, mô tả, nhóm) | Đọc — test dùng nó để biết "có bao nhiêu thuật ngữ" |
| `chi-tiet.js`, `so-sanh.js`, `hinh.js` | Dữ liệu + logic | Nội dung chi tiết, trang so sánh, hình vẽ | Không |
| `build.mjs` | Script | Chạy `npm run build` → đọc dữ liệu, **sinh ra** các folder `thuat-ngu/`, `so-sanh/`, `og/` | Không |
| `thuat-ngu/`, `so-sanh/`, `lo-trinh/` | HTML sinh ra | Mỗi thuật ngữ 1 folder có `index.html` | Không sửa tay (build sinh lại) |
| `og/` | Ảnh | Ảnh chia sẻ khi gửi link lên Facebook/Zalo | Không |
| **`tests/`** | **Test** | **4 file test Playwright — sân chơi của bạn** | **CÓ — đây là nhà của bạn** |
| **`playwright.config.js`** | **Cấu hình test** | URL, trình duyệt, chụp ảnh khi lỗi... | **Đọc kỹ, thỉnh thoảng sửa** |
| `playwright-report/` | Kết quả | Báo cáo HTML sau khi chạy test | Xem, không sửa |
| `test-results/` | Kết quả | Ảnh chụp, trace khi test đỏ | Xem, không sửa |
| `.github/workflows/ci-cd.yml` | CI/CD | Kịch bản GitHub tự chạy test + deploy | Đọc hiểu, sau này sửa |
| `package.json` | Cấu hình dự án | Tên, "nút bấm" (scripts), thư viện | Đọc `scripts` |
| `package-lock.json` | Tự sinh | Khoá chính xác phiên bản thư viện | Không bao giờ sửa tay |
| `node_modules/` | Tự sinh | Thư viện tải về, rất nặng | Không đụng, không commit |
| `.gitignore` | Git | Danh sách thứ KHÔNG đưa lên GitHub | Đọc để biết vì sao `node_modules` không lên |
| `robots.txt`, `sitemap.xml`, `favicon.svg` | SEO/web | Cho Google, icon tab | Không |
| `design-system/` | Tài liệu | Quy ước màu/chữ | Không |

## 3.2 Pattern chung cho MỌI dự án

Repo này nhỏ nên mọi thứ nằm ở gốc. Dự án công ty thường có cấu trúc thế này — bạn học cách **nhận diện**:

```
ten-du-an/
├── README.md              ← ĐỌC ĐẦU TIÊN. Cách cài, cách chạy.
├── package.json           ← (JS) danh sách nút bấm + thư viện
│   pom.xml / build.gradle ← (Java) tương đương
│   requirements.txt       ← (Python) tương đương
├── .env.example           ← mẫu biến môi trường (URL, mật khẩu test...) — copy thành .env
├── .gitignore
├── .github/workflows/     ← CI/CD (GitHub Actions)
│   hoặc .gitlab-ci.yml, Jenkinsfile
├── src/                   ← CODE CHÍNH của app (dev làm ở đây)
│   ├── components/        ← (frontend) các mảnh giao diện
│   ├── pages/             ← các trang
│   ├── api/ hoặc services/← gọi backend
│   └── ...
├── public/ hoặc static/   ← ảnh, font, file tĩnh
├── tests/ hoặc test/ hoặc e2e/ hoặc __tests__/   ← TEST — nhà của bạn
│   ├── e2e/               ← test giả lập người dùng (Playwright/Cypress)
│   ├── unit/              ← test hàm nhỏ (dev viết)
│   ├── fixtures/          ← dữ liệu mẫu cho test
│   └── pages/ hoặc pom/   ← Page Object (xem Bài 6.5)
├── playwright.config.*    ← cấu hình test (hoặc cypress.config, jest.config...)
└── docs/                  ← tài liệu
```

## 3.3 Cách "định vị" trong dự án lạ trong 10 phút

1. Tìm `README.md` → đọc phần "Getting started" / "Cài đặt" / "Chạy".
2. Tìm file khai báo thư viện (`package.json` / `pom.xml` / `requirements.txt`) → biết ngôn ngữ + framework test.
3. Tìm folder có chữ `test` / `spec` / `e2e` → biết test đang ở đâu, viết bằng gì.
4. Tìm file `*.config.*` → biết test chạy trên URL nào.
5. Tìm `.github/workflows` hoặc `Jenkinsfile` / `.gitlab-ci.yml` → biết CI chạy gì.
6. Tìm `.env.example` → biết cần biến môi trường gì (URL staging, tài khoản test).

Mẹo VS Code: bấm `Ctrl+P` gõ tên file để nhảy tới; bấm `Ctrl+Shift+F` để tìm chữ trong toàn dự án.

> ✅ **Làm ngay:** mở từng file trong bảng 3.1, mỗi file nhìn 30 giây. Không cần hiểu, chỉ cần "đã thấy mặt".

> 📎 **Mở rộng:** dự án JS ngoài đời có nhiều folder/file hơn repo này — cái nào cứng, cái nào tuỳ dự án, xem [Mở rộng 3](../../../tu-hoc/mo-rong/cau-truc-du-an-js/). Đọc trước khi clone repo lạ.

---
