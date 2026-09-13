---
so: 12
title: Câu hỏi hay gặp
mota: Playwright hay Selenium? Học ngôn ngữ nào? Bao nhiêu test là đủ? Bao lâu thì giỏi?
---

**"Playwright, Selenium, Cypress — học cái nào?"**
Playwright. Mới nhất, cài dễ nhất, tài liệu tốt, tự chờ phần tử (ít lỗi flaky), có codegen và trace viewer. Selenium cũ, nhiều việc nhưng cấu hình mệt. Cypress ổn nhưng giới hạn nhiều trình duyệt. Học Playwright xong, sang cái khác chỉ mất 1 tuần vì tư duy y hệt.

**"Học JavaScript hay Python hay Java?"**
Dự án bạn đang có là JavaScript → JavaScript. Ngôn ngữ chỉ là cú pháp, tư duy test mới quan trọng. Chuyển ngôn ngữ sau này dễ hơn bạn tưởng.

**"Vào dự án dev nói toàn từ lạ, làm sao?"**
Ghi lại từng từ, tối tra trên chính site `don-gian-hoa` của bạn. Không hiểu thì hỏi: "Anh giải thích giúp em X là gì trong dự án mình?" — không ai chê người hỏi ngày đầu.

**"Test tự động có thay được test tay không?"**
Không. Nó thay phần **lặp lại**. Bạn vẫn test tay tính năng mới, rồi cái nào ổn định thì chuyển thành tự động.

**"Bao nhiêu test là đủ?"**
Bắt đầu 5 smoke test. Mỗi sprint thêm 3–5 test cho tính năng vừa ổn định. Không đua số lượng; 20 test chạy ổn định giá trị hơn 200 test lúc đỏ lúc xanh.

**"Tôi sợ làm hỏng code dev."**
Không thể. Bạn làm trên **nhánh riêng**, chỉ sửa trong `tests/`. Muốn vào `main` phải qua PR, có người review. Git giữ lịch sử, xoá nhầm cũng khôi phục được.

**"Nên ghi test bằng codegen rồi dùng luôn không?"**
Không. Codegen để **học cách gọi tên phần tử**. Code nó sinh thường dùng locator xấu, không có assertion có ý nghĩa. Ghi xong, đọc, viết lại tay theo Bài 6.5.

**"Bao lâu thì 'giỏi'?"**
12 tuần để tự tin. 6 tháng để được tin giao việc. 1 năm để thiết kế framework cho team. Người test tay chuyển sang thường nhanh hơn dev chuyển sang, vì tư duy "cái gì có thể sai" quan trọng hơn "viết code đẹp".

---
