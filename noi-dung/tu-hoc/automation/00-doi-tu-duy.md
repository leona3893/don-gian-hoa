---
so: 0
title: Đổi tư duy trước khi bắt đầu
mota: Automation là gì nói kiểu không màu mè, vì sao không giỏi code không phải rào cản, và ba câu thần chú.
---

## 0.1 Automation là gì, nói kiểu không màu mè

Bạn đang test tay: mở web → gõ "api" vào ô tìm → nhìn xem có gợi ý không → bấm → xem modal mở đúng chưa.

Automation là: **viết cái kịch bản đó ra thành chữ để máy tự làm**, và máy tự **so sánh** kết quả với cái bạn mong đợi. Xong máy báo: xanh (đúng) hoặc đỏ (sai).

Chỉ có vậy. Mỗi test tự động = 3 phần:

| Phần | Test tay bạn đang làm | Test tự động |
|---|---|---|
| **Đi tới đâu** | Mở trình duyệt, vào trang chủ | `page.goto('/')` |
| **Làm gì** | Gõ "api" vào ô tìm kiếm | `input.fill('api')` |
| **Mong gì** | Nhìn thấy dropdown gợi ý hiện ra | `expect(suggestions.first()).toBeVisible()` |

## 0.2 "Không giỏi code" không phải rào cản như bạn nghĩ

Sự thật quan trọng nhất: **90% việc viết automation test là đọc – copy – sửa**, không phải sáng tác từ trang giấy trắng.

- Bạn không cần biết viết thuật toán.
- Bạn cần biết: đọc hiểu 1 file test có sẵn, copy 1 test giống nhất với việc bạn muốn, sửa vài chữ.
- Kỹ năng quan trọng hơn code: **tư duy test case** (cái này bạn đã có từ test tay) và **kiên nhẫn đọc lỗi**.

## 0.3 Ba câu thần chú

1. **"Chạy được trước, hiểu sau."** Đừng cố hiểu hết rồi mới chạy. Chạy cái có sẵn, thấy nó xanh, rồi mới mổ xẻ.
2. **"Sửa một chữ, chạy lại."** Mỗi lần chỉ thay đổi một thứ nhỏ. Đỏ thì biết ngay do chỗ nào.
3. **"Lỗi là bản đồ, không phải bản án."** Dòng lỗi màu đỏ chính là chỉ dẫn. Học đọc nó (Bài 9).

---
