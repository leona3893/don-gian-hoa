---
title: package.json còn những mục gì?
mota: Cả file của repo mẫu, dependencies vs devDependencies, số phiên bản, và bảng các mục dự án khác hay có.
bai: ngay-dau-vao-du-an
---

## Toàn bộ file của repo này

Trong Bài 2 bạn mới nhìn mục `scripts`. Đây là **cả file**, chỉ có 6 mục:

```json
{
  "name": "don-gian-hoa",          ← tên dự án
  "private": true,                 ← không cho lỡ tay đăng lên kho npm công khai
  "type": "module",                ← cho phép viết import … from (thay vì require)
  "scripts": { … },                ← bảng nút bấm (đã học)
  "dependencies": {                ← thư viện cần khi CHẠY THẬT
    "@resvg/resvg-js": "^2.6.2"
  },
  "devDependencies": {             ← thư viện chỉ cần khi DEV / TEST
    "@playwright/test": "^1.63.0",
    "serve": "^14.2.6"
  }
}
```

Hai mục quan trọng nhất với tester là `scripts` và `devDependencies`. Phần còn lại đọc để biết, không phải để sửa.

## `dependencies` và `devDependencies` khác gì?

| | `dependencies` | `devDependencies` |
|---|---|---|
| Cần khi nào | Khi app chạy thật cho người dùng | Chỉ khi dev viết code hoặc chạy test |
| Ví dụ | React, Express, thư viện vẽ ảnh | Playwright, Jest, ESLint, Prettier |
| Tester nhìn vào để | Biết app xây bằng gì | **Biết dự án test bằng gì** — Playwright hay Cypress, Jest hay Vitest |
| Cài thêm bằng | `npm install ten-thu-vien` | `npm install -D ten-thu-vien` (D = dev) |

Cách nhớ: **dev** = chỉ dùng trong lúc làm; không có chữ dev = phải có mới chạy được.

## Số phiên bản `^1.63.0` nghĩa là gì?

- `1.63.0` = phiên bản đúng lúc cài.
- Dấu `^` = "được phép lên bản mới hơn **cùng số đầu**" — `1.64`, `1.70` OK, `2.0` không.
- Không có dấu gì (`1.63.0`) = khoá cứng đúng bản này.
- `~1.63.0` = chỉ được lên số cuối: `1.63.1`, `1.63.9`.

Với tester: nếu test đỏ "tự nhiên" sau khi ai đó `npm install`, khả năng là thư viện nhảy bản trong khoảng `^` cho phép. Đó là lý do có `package-lock.json` (bên dưới).

## Dự án khác thường có thêm

| Mục | Nghĩa | Tester có cần đụng? |
|---|---|---|
| `"version": "1.4.2"` | Phiên bản của chính dự án | Không. Chỉ có ý nghĩa với thư viện đem đi đăng |
| `"description"`, `"author"`, `"license"`, `"repository"` | Thông tin mô tả | Không |
| `"main"` / `"exports"` | File đầu vào khi dự án được import như thư viện | Không |
| `"engines": { "node": ">=20" }` | Đòi Node tối thiểu | **Đọc** — máy bạn Node cũ hơn số này là lỗi lạ. `node -v` để so |
| `"packageManager": "pnpm@9.1.0"` | Dự án dùng pnpm/yarn thay vì npm | **Đọc** — thấy dòng này thì gõ `pnpm install` / `yarn`, không `npm install` |
| `"workspaces": ["packages/*"]` | Một repo chứa nhiều dự án con (monorepo) | Đọc — test có thể nằm trong từng `packages/<tên>/` |
| `"browserslist"` | Danh sách trình duyệt app hỗ trợ | Đọc lướt — gợi ý bạn nên test trình duyệt nào |
| `"lint-staged"`, `"husky"` | Tự kiểm tra code trước mỗi commit | Đọc — giải thích vì sao `git commit` bỗng chạy cái gì đó rồi từ chối |
| `"jest"`, `"prettier"`, `"eslintConfig"` | Cấu hình công cụ nhét thẳng vào đây thay vì file riêng | Đọc nếu dự án dùng Jest — còn Playwright luôn có file `playwright.config` riêng |
| `"overrides"` / `"resolutions"` | Ép một thư viện con dùng đúng bản chỉ định | Không |
| `"peerDependencies"`, `"optionalDependencies"` | Kiểu phụ thuộc dành cho người viết thư viện | Không |

## Hai file đi kèm

**`package-lock.json`** — npm tự sinh, ghi **chính xác** bản của từng thư viện (kể cả thư viện của thư viện) đã cài. `package.json` nói "^1.63", lock nói "1.63.2, tải từ link này, checksum này".

- Có commit lên Git: **có**, luôn luôn.
- Sửa tay: **không bao giờ**.
- Trên CI dùng `npm ci` thay vì `npm install`: `ci` cài đúng y lock, nhanh hơn, và **báo lỗi nếu lock lệch với package.json** — chính là dòng `npm ci` trong file `ci-cd.yml` của repo này.

**`node_modules/`** — chỗ chứa thư viện tải về. Nặng (hàng trăm MB), nằm trong `.gitignore`, mỗi bản clone tự tải lại. Hỏng gì khó hiểu thì xoá cả folder rồi `npm install` lại — chữa được 30% lỗi "trên máy tôi chạy được mà".

## Khi vào dự án lạ, đọc `package.json` theo thứ tự này

1. `packageManager` / `engines` — biết dùng npm hay pnpm, Node bản nào.
2. `scripts` — biết có nút `test`, `test:e2e`, `dev`, `build` không.
3. `devDependencies` — biết test bằng gì.
4. Còn lại: bỏ qua.

---
