---
title: Dự án JavaScript có những folder/file nào?
mota: Ba mức cứng — hay gặp — tuỳ dự án, mỗi thứ một dòng “thấy nó = biết gì”, và bên trong folder test.
bai: giai-phau-folder-du-an
---

## Ba mức: cứng — hay gặp — tuỳ dự án

```
du-an/
│
│  ── CỨNG: repo JS nào cũng có ──────────────────────────
├── package.json            bảng nút bấm + danh sách thư viện
├── package-lock.json       khoá chính xác phiên bản (tự sinh)
├── node_modules/           thư viện tải về (không có trong Git)
├── .gitignore              danh sách thứ KHÔNG đưa lên Git
│
│  ── HAY GẶP: 8/10 dự án có ─────────────────────────────
├── README.md               hướng dẫn cài & chạy — đọc đầu tiên
├── src/                    code chính của app (dev làm ở đây)
├── public/  hoặc  static/  ảnh, font, file tĩnh
├── tests/  hoặc  e2e/  hoặc  __tests__/   ← nhà của bạn
├── .github/workflows/      CI: robot tự chạy test
├── *.config.js / *.config.ts   cấu hình công cụ (playwright, vite, jest…)
│
│  ── TUỲ DỰ ÁN: thấy thì biết, không thấy cũng bình thường ──
├── .env  /  .env.example   biến môi trường: URL, tài khoản test
├── tsconfig.json           dự án dùng TypeScript
├── .eslintrc*  /  eslint.config.js   kiểm tra lỗi code tự động
├── .prettierrc             quy tắc format code
├── .nvmrc  /  .node-version   Node bản nào
├── Dockerfile  /  docker-compose.yml   đóng gói chạy trong container
├── .vscode/                cài đặt VS Code chung cho team
├── dist/  /  build/  /  .next/  /  out/   kết quả build (thường bị gitignore)
└── docs/                   tài liệu
```

## Giải thích từng thứ — và tester có cần đụng không

**Nhóm CỨNG**

| Thấy | Biết gì | Tester có cần đụng? |
|---|---|---|
| `package.json` | Xem [Mở rộng 2](../../../tu-hoc/mo-rong/package-json/) | Đọc `scripts` và `devDependencies` |
| `package-lock.json` | Tự sinh | Không sửa. Nếu thấy nó thay đổi trong `git status` mà bạn không cài gì → hỏi |
| `node_modules/` | Thư viện | Không mở, không commit. Lỗi lạ → xoá rồi `npm install` |
| `.gitignore` | Mỗi dòng là 1 thứ Git bỏ qua | Đọc 1 lần để biết vì sao `node_modules`, `test-results`, `.env` không lên GitHub |

**Nhóm HAY GẶP**

| Thấy | Biết gì | Tester có cần đụng? |
|---|---|---|
| `README.md` | Hướng dẫn của dự án | **Đọc đầu tiên.** Tìm mục "Getting started", "Setup", "Testing" |
| `src/` | Code app. Bên trong thường có `components/`, `pages/`, `services/` hoặc `api/`, `utils/` | Đọc khi cần tìm `id`/`data-testid` của một nút; không sửa |
| `public/` | File tĩnh | Không |
| `tests/` / `e2e/` / `__tests__/` | Test. `e2e/` = test giả lập người dùng; `__tests__/` hoặc `*.test.js` nằm cạnh code = unit test của dev | **Nhà của bạn.** E2E là việc bạn; unit test là của dev |
| `.github/workflows/*.yml` | Mỗi file là 1 pipeline | Đọc để biết test chạy khi nào, trên môi trường nào |
| `playwright.config.*` | URL, trình duyệt, timeout, chụp ảnh khi lỗi | **Đọc kỹ**, thỉnh thoảng sửa |
| `vite.config.*`, `next.config.*`, `webpack.config.*` | Cấu hình build/dev server của app | Không sửa. Chỉ nhìn để biết port dev server (thường 5173 / 3000 / 8080) |
| `jest.config.*`, `vitest.config.*` | Cấu hình unit test | Không, trừ khi bạn được giao unit test |

**Nhóm TUỲ DỰ ÁN**

| Thấy | Biết gì | Tester có cần đụng? |
|---|---|---|
| `.env.example` | Mẫu biến môi trường. Bạn **copy thành `.env`** rồi điền giá trị thật | **Có** — bước cài đặt hay bị quên nhất. `.env` thật không bao giờ commit |
| `tsconfig.json` | Dự án dùng TypeScript: file `.ts` thay vì `.js` | Đọc test `.ts` cũng như `.js`, chỉ thêm vài chỗ ghi kiểu (`: string`). Không sợ |
| `.eslintrc*` / `eslint.config.js` | Có kiểm tra code tự động; VS Code sẽ gạch đỏ | Không sửa. Nếu commit bị chặn vì lint → chạy `npm run lint` xem lỗi gì |
| `.prettierrc` | Quy tắc format (dấu nháy, thụt lề) | Không. Cài extension Prettier để VS Code tự format lúc lưu |
| `.nvmrc` / `.node-version` | Node bản nào | Đọc — `node -v` so với số trong file |
| `Dockerfile` / `docker-compose.yml` | App (hoặc DB) chạy trong container | Chưa cần. Nếu README bảo `docker compose up` thì làm theo, hỏi khi kẹt |
| `.vscode/settings.json`, `extensions.json` | Team chia sẻ cài đặt VS Code | Mở VS Code sẽ được gợi ý cài extension — bấm đồng ý |
| `dist/`, `build/`, `.next/`, `out/` | Kết quả build, tự sinh | Không đụng, không commit |
| `docs/` | Tài liệu | Đọc nếu có |
| `.husky/` | Script tự chạy trước commit/push (lint, test nhanh) | Đọc — giải thích vì sao `git commit` lâu hoặc bị từ chối |
| `coverage/` | Báo cáo độ phủ test, tự sinh | Xem, không commit |

## Bên trong folder test — khi dự án đã automation lâu

```
tests/  (hoặc e2e/)
├── *.spec.ts               các file test — mỗi file một trang / một tính năng
├── pages/  hoặc  pom/      Page Object: "địa chỉ" và hành động của từng trang
├── fixtures/               dữ liệu mẫu, tài khoản test, hàm setup dùng chung
├── utils/  hoặc  helpers/  hàm tiện ích: đăng nhập nhanh, sinh dữ liệu
├── data/                   file JSON/CSV dữ liệu test
└── .auth/                  trạng thái đăng nhập lưu sẵn (thường bị gitignore)

playwright.config.ts        ở gốc dự án, không nằm trong tests/
playwright-report/          báo cáo HTML sau khi chạy (gitignore)
test-results/               ảnh chụp, trace khi test đỏ (gitignore)
```

Repo `don-gian-hoa` mới có `tests/*.spec.js` và `playwright.config.js`. Tuần 8 trong lộ trình bạn sẽ tự tạo `tests/pages/` — lúc đó folder của bạn bắt đầu giống dự án thật.

## Định vị trong 10 phút — bản đầy đủ

1. `README.md` → mục cài đặt & chạy.
2. `package.json` → `packageManager`, `engines`, `scripts`, `devDependencies`.
3. `.env.example` → có thì copy thành `.env`, hỏi giá trị thật.
4. `tests/` hoặc `e2e/` → test viết bằng gì, có Page Object chưa.
5. `playwright.config.*` → baseURL, trình duyệt, có `webServer` tự bật app không.
6. `.github/workflows/` → CI chạy test khi nào.
7. `src/` → chỉ mở khi cần tìm địa chỉ phần tử.

Mọi thứ khác: **thấy thì biết, không mở**.

---
