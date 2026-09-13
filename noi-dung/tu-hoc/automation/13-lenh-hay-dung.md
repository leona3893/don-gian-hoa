---
so: 13
title: Phụ lục — Lệnh hay dùng
mota: Toàn bộ lệnh trong lộ trình gom một chỗ, dán vào ghi chú.
---

```powershell
# Cài đặt (1 lần / khi mới clone)
npm install
npx playwright install chromium

# Chạy web local
npx serve -l 4173 .

# Chạy test
npm test                                          # tất cả
npx playwright test tests/lo-trinh.spec.js        # 1 file
npx playwright test -g "tiêu đề"                  # test có tên chứa chữ
npx playwright test --headed                      # nhìn thấy trình duyệt
npx playwright test --debug                       # dừng từng bước
npx playwright test --trace on                    # ghi trace
npm run report                                    # mở báo cáo
npx playwright codegen http://localhost:4173      # ghi thao tác thành code

# Git hàng ngày
git checkout main; git pull
git checkout -b test/ten-viec
git status; git diff
git add <file>; git commit -m "..."
git push -u origin test/ten-viec
git log --oneline
```

