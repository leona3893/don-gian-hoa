---
so: 1
title: Chuẩn bị máy (làm 1 lần)
mota: Cài VS Code, Node, Git — và lệnh kiểm tra từng thứ đã đúng chưa.
---

Hướng dẫn viết cho Windows; Mac/Linux thay PowerShell bằng Terminal, lệnh giống nhau. Kiểm tra từng thứ bằng cách mở **PowerShell** (bấm phím Windows, gõ `powershell`, Enter) và gõ lệnh.

## 1.1 Danh sách cần có

| # | Công cụ | Để làm gì | Lệnh kiểm tra | Kết quả mong đợi |
|---|---|---|---|---|
| 1 | **VS Code** | Nơi mở và sửa file code | Mở Start menu tìm "Visual Studio Code" | Có ứng dụng |
| 2 | **Node.js** | "Động cơ" chạy JavaScript ngoài trình duyệt; Playwright cần nó | `node -v` | In ra số kiểu `v24.x.x` |
| 3 | **npm** | Đi kèm Node; tải và chạy thư viện | `npm -v` | In ra số kiểu `10.x.x` |
| 4 | **Git** | Quản lý phiên bản code, nói chuyện với GitHub | `git --version` | `git version 2.x` |
| 5 | **Tài khoản GitHub** | Nơi code của dự án nằm | Vào github.com đăng nhập | Tạo miễn phí tại github.com nếu chưa có |
| 6 | **Trình duyệt Chrome/Edge** | Xem web, dùng DevTools (F12) | — | Có sẵn |

Nếu thiếu cái nào: tải từ trang chủ (code.visualstudio.com, nodejs.org bản LTS, git-scm.com), cài kiểu Next-Next-Finish, rồi **đóng và mở lại PowerShell** để lệnh kiểm tra nhận.

## 1.2 Cài extension VS Code (giúp rất nhiều)

Mở VS Code → bấm `Ctrl+Shift+X` → tìm và cài:

- **Playwright Test for VSCode** (của Microsoft) — cho nút ▶ bấm chạy từng test, có nút "Record new test" tự sinh code khi bạn bấm chuột trên web.
- **GitLens** — nhìn được ai sửa dòng nào, khi nào.
- **Error Lens** — hiện lỗi thẳng cạnh dòng code thay vì phải mò.

## 1.3 Cấu hình Git 1 lần (nếu máy mới)

```powershell
git config --global user.name "ten-cua-ban"
git config --global user.email "email-ban-dung-tren-github"
```

> ✅ **Làm ngay:** chạy 4 lệnh kiểm tra ở bảng 1.1. Chụp màn hình kết quả để sau này so.

---
