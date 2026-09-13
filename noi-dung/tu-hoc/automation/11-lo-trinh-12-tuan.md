---
so: 11
title: Lộ trình 12 tuần
mota: Mỗi tuần một chủ đề, một việc cụ thể, một bằng chứng phải có mới sang tuần sau.
---

Mỗi tuần ~5–7 giờ. Cột "Bằng chứng" là thứ bạn phải có trong tay cuối tuần — không có thì chưa qua tuần.

| Tuần | Chủ đề | Việc cụ thể | Bằng chứng |
|---|---|---|---|
| 1 | **Môi trường + chạy được** | Bài 1, 2. Clone, cài, `npm test` xanh, `--headed` nhìn trình duyệt chạy | Ảnh chụp `25 passed` |
| 2 | **Đọc hiểu** | Bài 3, 7. Đọc 4 file test, viết ghi chú từng test kiểm tra gì. F12 lấy locator 10 phần tử | File ghi chú 20+ dòng |
| 3 | **Viết test đầu tiên** | Bài 8. `lo-trinh.spec.js` 3 test xanh | File test + commit trên nhánh riêng |
| 4 | **Git + PR** | Bài 4. Luyện vòng lặp branch → commit → push → PR → Actions xanh. Làm 3 lần | 3 PR (có thể đóng không merge) |
| 5 | **Locator sâu** | Bài 6.5. Viết lại 5 locator dạng `.class` trong test cũ thành `getByRole`. Dùng `codegen` để so sánh | Diff 5 chỗ sửa |
| 6 | **Assertion + dữ liệu** | Test vòng lặp qua `TERMS` (bài nâng dần #4). Test so sánh số đếm với dữ liệu | 2 test dùng vòng lặp |
| 7 | **Debug** | Bài 9. Cố ý làm hỏng 3 test (sửa locator sai), đọc lỗi, dùng trace viewer sửa lại | Ghi chú 3 lỗi + cách sửa |
| 8 | **Page Object** | Bài 6.6. Tạo `tests/pages/TrangChu.js`, chuyển 3 test sang dùng nó | File Page Object + 3 test đã refactor |
| 9 | **CI/CD** | Đọc kỹ `ci-cd.yml`. Thêm 1 bước mới (ví dụ in ra số test). Xem Actions | 1 commit sửa workflow chạy xanh |
| 10 | **API test cơ bản** | Dùng `request` của Playwright gọi `GET /sitemap.xml`, `GET /thuat-ngu/api/`, kiểm tra status 200 + nội dung | File `api.spec.js` 3 test |
| 11 | **Áp vào dự án lạ** | Chọn 1 web public (ví dụ demo site `the-internet.herokuapp.com` hoặc `saucedemo.com`), làm lại Bài 2 + viết 5 test | Repo mới trên GitHub có test + Actions |
| 12 | **Tổng kết + CV** | Viết README cho repo test tuần 11: cách chạy, cấu trúc, kết quả. Chuẩn bị nói 5 phút về nó | README + link repo |

Sau 12 tuần bạn có: 2 repo có test tự động chạy trên CI, hiểu Git, đọc được cấu trúc dự án, tự viết và debug test. Đủ để nhận việc automation junior hoặc tự động hoá cho team hiện tại.

**Sau đó (tháng 4–6):** TypeScript cơ bản, test API sâu hơn, fixtures/dữ liệu test, chạy song song nhiều trình duyệt, báo cáo Allure, và tùy nhu cầu: Appium cho mobile.

---
