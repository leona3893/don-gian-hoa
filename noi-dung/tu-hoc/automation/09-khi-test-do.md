---
so: 9
title: Khi test đỏ: cách đọc lỗi và sửa
mota: Cấu trúc một thông báo lỗi Playwright, bảng tra lỗi thường gặp, ba công cụ debug.
---

## 9.1 Cấu trúc một thông báo lỗi Playwright

```
  1) tests/lo-trinh.spec.js:9:1 › mở được trang và có tiêu đề
                    ▲ file      ▲ dòng   ▲ tên test

    Error: Timed out 5000ms waiting for expect(locator).toBeVisible()
           ▲ chờ 5 giây mà không thấy

    Locator: getByRole('heading', { level: 1 })
             ▲ "địa chỉ" bạn viết
    Expected: visible
    Received: <element(s) not found>
              ▲ KHÔNG TÌM THẤY phần tử nào khớp địa chỉ

      11 |   await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
         |                                                          ^
                                                                    ▲ dòng bị lỗi
```

Đọc từ trên xuống: **file nào → test nào → lỗi gì → địa chỉ nào → mong gì → nhận gì → dòng nào**.

## 9.2 Bảng tra lỗi thường gặp

| Thấy chữ | Nghĩa | Sửa |
|---|---|---|
| `element(s) not found` | Địa chỉ sai, phần tử không tồn tại | F12 xem lại, sửa locator |
| `strict mode violation: ... resolved to 3 elements` | Địa chỉ trúng 3 cái, Playwright không biết bấm cái nào | Thêm `.first()` hoặc lọc cụ thể hơn |
| `Timed out ... waiting for` | Chờ mãi không thấy | Phần tử ẩn / chưa load / địa chỉ sai |
| `Expected: "83 thuật ngữ" Received: "84 thuật ngữ"` | Dữ liệu đổi | Test đúng, có thể web đổi thật → báo dev hoặc cập nhật test |
| `net::ERR_CONNECTION_REFUSED` | Web chưa bật | Kiểm tra server / `webServer` trong config |
| `SyntaxError: Unexpected token` | Gõ sai cú pháp (thiếu ngoặc, dấu phẩy) | Nhìn dòng báo, đếm ngoặc `( ) { }` |
| `Cannot find module` | Import sai đường dẫn | Kiểm tra `'../terms.js'` có đúng vị trí |

## 9.3 Ba công cụ debug theo thứ tự nên dùng

1. **`--headed`**: nhìn trình duyệt làm gì.
   ```powershell
   npx playwright test tests/lo-trinh.spec.js --headed
   ```
2. **`--debug`**: dừng từng bước, bạn bấm Next như xem phim chậm.
   ```powershell
   npx playwright test tests/lo-trinh.spec.js --debug
   ```
3. **Trace viewer** (mạnh nhất): ghi lại toàn bộ, xem lại như video có thể tua.
   ```powershell
   npx playwright test --trace on
   npx playwright show-trace test-results/<folder>/trace.zip
   ```
   Hoặc mở `npm run report` → bấm vào test đỏ → có ảnh chụp + trace.

Trên CI: tải artifact `playwright-report` về, mở `index.html`, y hệt.

## 9.4 Quy trình khi đỏ (áp dụng máy móc)

1. Đọc dòng `Error:` — hiểu nó thuộc loại nào trong bảng 9.2.
2. Chạy lại đúng 1 test đó với `--headed`.
3. Nếu là locator: F12, tìm lại, sửa, chạy lại.
4. Nếu web đổi thật: hỏi dev "đây là cố ý hay bug?". Cố ý → sửa test. Bug → báo bug, giữ nguyên test (test đỏ là đúng).
5. Nếu lúc xanh lúc đỏ (flaky): thường do chờ chưa đủ → đảm bảo dùng `await expect(...)` thay vì `expect(await ...)` khi kiểm tra trạng thái.

---
