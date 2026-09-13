---
so: 4
title: GitHub của dự án hoạt động thế nào
mota: Repo, nhánh, commit, PR — vòng lặp 7 lệnh mỗi ngày, và đọc kết quả Actions từng bước bằng chuột.
---

## 4.1 Các khái niệm, giải thích kiểu đời thường

| Từ | Hiểu đơn giản | Trên repo này |
|---|---|---|
| **Repository (repo)** | Cái tủ chứa toàn bộ code + lịch sử sửa đổi | `don-gian-hoa` |
| **Clone** | Photo cả cái tủ về máy mình | `git clone ...` |
| **Commit** | Một "điểm lưu game" có ghi chú | `aba48f5 Sáng hoá giao diện...` |
| **Branch (nhánh)** | Bản sao để làm việc riêng, không ảnh hưởng bản chính | `main` là bản chính; bạn sẽ tạo `test/them-test-lo-trinh` |
| **Push** | Đẩy điểm lưu từ máy mình lên GitHub | `git push` |
| **Pull** | Kéo thay đổi mới nhất của người khác về máy | `git pull` |
| **Pull Request (PR)** | "Xin phép" gộp nhánh của mình vào `main`, người khác review | Tab Pull requests trên GitHub |
| **Merge** | Gộp thật sau khi PR được duyệt | Nút "Merge pull request" |
| **Actions** | Robot của GitHub, tự chạy test/deploy mỗi khi có push/PR | Tab Actions |
| **Issues** | Danh sách việc / bug | Tab Issues |

> Site này có trang riêng cho từng từ: [Commit](../../../thuat-ngu/commit/), [Branch](../../../thuat-ngu/branch/), [Pull Request](../../../thuat-ngu/pull-request/), và bảng so sánh [add vs commit vs push](../../../so-sanh/add-commit-va-push/).

## 4.2 Quy trình làm việc hàng ngày (nhớ thuộc lòng)

Đây là vòng lặp bạn làm **mỗi ngày** trong dự án thật. Copy 7 lệnh này dán vào ghi chú:

```powershell
# 1. Sáng vào: đứng ở main, lấy code mới nhất
git checkout main
git pull

# 2. Tạo nhánh riêng cho việc hôm nay (đặt tên có ý nghĩa)
git checkout -b test/them-test-trang-lo-trinh

# 3. ... sửa file, viết test, chạy npm test cho xanh ...

# 4. Xem mình đã sửa gì
git status          # file nào đổi
git diff            # đổi dòng nào

# 5. Đóng gói thay đổi thành 1 commit
git add tests/lo-trinh.spec.js
git commit -m "Thêm test cho trang lộ trình"

# 6. Đẩy nhánh lên GitHub
git push -u origin test/them-test-trang-lo-trinh

# 7. Lên GitHub → bấm "Compare & pull request" → điền mô tả → Create
#    Chờ Actions chạy xanh → nhờ người review → Merge
```

Lần push sau trên cùng nhánh chỉ cần `git push`.

## 4.3 GitHub Actions — robot tự chạy test khi nào, và đọc kết quả ở đâu

**Actions là gì, nói đơn giản:** GitHub cho bạn thuê một máy tính ảo. Bạn viết sẵn một kịch bản ("lấy code → cài Node → chạy test"), và bảo GitHub "mỗi khi có người push, hãy chạy kịch bản này trên máy ảo đó". Kịch bản nằm trong file `.github/workflows/*.yml`. Máy ảo chạy xong thì báo xanh/đỏ ngay trên PR.

Nghĩa là: **test bạn viết ở Bài 8 không chỉ chạy trên máy bạn.** Từ lúc push lên, nó chạy tự động mỗi lần bất kỳ ai thay đổi code — kể cả dev không biết test của bạn tồn tại.

## 4.3.1 Đọc file kịch bản — từng khối một

Mở [`.github/workflows/ci-cd.yml`](https://github.com/leona3893/don-gian-hoa/blob/main/.github/workflows/ci-cd.yml). Một file workflow luôn có 3 khối: **khi nào chạy** (`on`), **chạy trên máy gì** (`runs-on`), **làm những bước gì** (`steps`).

**Khối 1 — `on`: khi nào robot thức dậy**

```yaml
on:
  push:
    branches: [main]     # có ai push lên nhánh main → chạy
  pull_request:          # có ai mở PR (hoặc push thêm vào PR đang mở) → chạy
  workflow_dispatch:     # hoặc bạn tự bấm nút "Run workflow" trên tab Actions
```

Với bạn: push nhánh `test/…` lên **chưa** kích hoạt gì (vì không phải `main`). Mở PR mới kích hoạt. Đó là lý do bước 7 trong vòng lặp hàng ngày là "mở PR rồi chờ Actions".

**Khối 2 — `jobs`: các "việc lớn"**

File này có 2 job: `test` và `deploy`.

```yaml
jobs:
  test:
    name: Build + test
    runs-on: ubuntu-latest        # máy ảo Linux — KHÔNG phải Windows như máy bạn
    steps:
      - name: Lấy code
        uses: actions/checkout@v4          # clone repo vào máy ảo
      - name: Cài Node
        uses: actions/setup-node@v4        # cài Node.js bản 24
        with:
          node-version: 24
      - name: Cài thư viện (theo đúng package-lock)
        run: npm ci                        # như npm install nhưng cài đúng y lock file
      - name: Dựng lại site
        run: npm run build
      - name: Kiểm tra HTML trong repo khớp với bản build
        run: git diff --exit-code --stat -- . ':!og'
      - name: Cài trình duyệt cho Playwright
        run: npx playwright install --with-deps chromium
      - name: Chạy Playwright
        run: npm test                      # ← test của bạn chạy ở đây
      - name: Lưu báo cáo test
        if: always()                       # kể cả khi bước trên đỏ
        uses: actions/upload-artifact@v4
        with:
          name: playwright-report
          path: playwright-report/
```

Đọc `steps` từ trên xuống, bạn thấy nó **y hệt 12 bước ngày đầu của Bài 2**: lấy code → cài Node → cài thư viện → build → cài trình duyệt → chạy test. Robot làm đúng những gì bạn làm bằng tay, chỉ là trên máy sạch mỗi lần.

Hai kiểu bước:
- `uses:` — mượn một "bước có sẵn" người khác viết (checkout, setup-node, upload-artifact).
- `run:` — gõ đúng lệnh như bạn gõ trong PowerShell.

Bước "Kiểm tra HTML khớp với bản build" đáng chú ý: nếu ai sửa `terms.js` mà quên chạy `npm run build` trước khi commit, HTML trong repo lệch với HTML vừa sinh → bước này đỏ. Đây là một loại test không cần Playwright.

**Job `deploy`:**

```yaml
  deploy:
    needs: test                                   # chỉ chạy khi job test xanh
    if: github.event_name == 'push' && github.ref == 'refs/heads/main'
    steps:
      … đưa toàn bộ folder lên GitHub Pages
```

Hai dòng `needs` và `if` là **cái chốt an toàn**: deploy chỉ chạy khi (1) test xanh **và** (2) là push lên `main`. PR của bạn dù xanh cũng không deploy. Test đỏ trên `main` thì site đang chạy giữ nguyên bản cũ.

Sơ đồ:

```
push nhánh test/…  → không có gì xảy ra
mở PR              → [test] chạy → xanh ✓ / đỏ ✗ hiện trên PR   (không deploy)
merge PR vào main  → [test] chạy → xanh → [deploy] → site cập nhật
                                 → đỏ   → dừng, site giữ bản cũ
```

## 4.3.2 Xem kết quả — đi từng bước bằng chuột

**Trên trang PR:**

1. Kéo xuống cuối PR, trên nút Merge có khung "checks". Đang chạy: vòng tròn vàng 🟡. Xong: ✅ hoặc ❌.
2. Bấm chữ **Details** bên phải dòng "Build + test" → nhảy thẳng vào log.

**Trên tab Actions (xem mọi lần chạy):**

1. GitHub → tab **Actions** (cạnh Pull requests).
2. Cột trái: danh sách workflow — bấm **CI/CD**.
3. Giữa màn hình: mỗi dòng là 1 lần chạy, ghi tên commit + nhánh + ai push + mất bao lâu. Bấm vào dòng cần xem.
4. Màn hình lần chạy: sơ đồ 2 ô `Build + test` → `Deploy`. Bấm ô **Build + test**.
5. Danh sách các bước, mỗi bước 1 dòng ✅/❌ kèm thời gian. **Bước đỏ đầu tiên** là chỗ hỏng — bấm vào để xổ log.
6. Trong log của bước "Chạy Playwright", tìm dòng bắt đầu bằng `Error:` hoặc `✘` — đó là chính thông báo lỗi bạn học đọc ở Bài 9, chỉ khác là in trên GitHub.

**Tải báo cáo HTML về (khi test đỏ trên CI):**

1. Ở màn hình lần chạy (bước 4 ở trên), kéo xuống **cuối trang**, mục **Artifacts**.
2. Bấm `playwright-report` → tải file `.zip`.
3. Giải nén → mở `index.html` bằng trình duyệt → y hệt `npm run report` ở máy bạn, có ảnh chụp lúc lỗi và trace.

Mẹo: nếu thấy dòng `Annotations` màu đỏ ngay trên sơ đồ job — đó là GitHub tóm tắt lỗi cho bạn, đọc trước khi mở log.

## 4.3.3 Ba tình huống hay gặp và cách xử lý

| Tình huống | Nghĩa là | Làm gì |
|---|---|---|
| **Đỏ trên CI, xanh ở máy bạn** | Khác môi trường: CI là Linux, máy bạn Windows; CI clone sạch (không có `.env`, không có `node_modules` cũ); CI chậm hơn → timeout | Tải artifact xem ảnh chụp. Hay gặp nhất: đường dẫn viết `\` (Windows) thay vì `/`; hoặc chờ chưa đủ — dùng `await expect(...)` thay vì `expect(await ...)` |
| **Đỏ ở bước `npm ci`** | `package-lock.json` lệch với `package.json` — ai đó sửa tay hoặc cài thư viện mà không commit lock | Chạy `npm install` ở máy, commit cả `package-lock.json` |
| **Đỏ ở bước "Kiểm tra HTML khớp"** | Sửa dữ liệu mà quên `npm run build` | Chạy `npm run build`, commit các file HTML sinh ra, push lại |
| **Đỏ do mạng chập chờn** (tải trình duyệt lỗi) | Không phải lỗi của bạn | Vào lần chạy → nút **Re-run failed jobs** góc trên phải. File config đã đặt `retries: 1` trên CI cho trường hợp này |
| **Xanh mà site không đổi** | Đang xem PR — deploy chỉ chạy khi merge vào `main` | Merge rồi chờ job Deploy xanh, `Ctrl+F5` trình duyệt |

## 4.3.4 Thử một lần cho biết

Toàn bộ bài này làm **trên một nhánh riêng** — không bao giờ sửa trực tiếp trên `main`.

**Bước 0 — Tạo nhánh trước khi sửa bất cứ gì**

```powershell
git checkout main
git pull
git checkout -b thu-nghiem/ci-do
```

> Lỡ sửa trên `main` rồi (chưa commit)? Cứ gõ `git checkout -b thu-nghiem/ci-do` — Git mang thay đổi sang nhánh mới, `main` trở lại sạch.

**Bước 1 — Làm hỏng một test cố ý**

Mở `tests/trang-chu.spec.js`, tìm dòng `page.getByRole('combobox', { name: 'Tìm thuật ngữ' })` đầu tiên, đổi `'Tìm thuật ngữ'` thành `'Tìm thuật ngữ XYZ'`. Lưu.

**Bước 2 — Thấy đỏ ở local trước**

```powershell
npx playwright test tests/trang-chu.spec.js -g "gõ vào ô tìm kiếm"
```

Mong đợi `1 failed` và dòng `Error: Timed out … 'Tìm thuật ngữ XYZ'`. Nhớ mặt dòng này — lát nữa gặp lại trên GitHub.

**Bước 3 — Commit, push nhánh**

```powershell
git add tests/trang-chu.spec.js
git commit -m "Thử: cố ý làm hỏng test để xem CI đỏ"
git push -u origin thu-nghiem/ci-do
```

PowerShell in ra link `…/pull/new/thu-nghiem/ci-do` — mở link đó.

**Bước 4 — Mở PR**: kiểm tra `base: main` ← `compare: thu-nghiem/ci-do`, mô tả "Thử nghiệm — không merge", bấm **Create pull request**.

**Bước 5 — Xem robot đỏ**: khung checks dưới PR quay vàng 🟡 ~1–2 phút → ❌. Bấm **Details** → bước ❌ **Chạy Playwright** → tìm dòng `Error: Timed out`. Bấm **Summary** → cuối trang có **Annotations** và **Artifacts**.

**Bước 6 — Tải báo cáo**: bấm `playwright-report` → giải nén `.zip` → mở `index.html` → bấm test đỏ → xem ảnh chụp lúc lỗi.

**Bước 7 — Sửa lại, push thêm commit vào cùng nhánh**

Đổi lại thành `'Tìm thuật ngữ'`, rồi:

```powershell
npx playwright test tests/trang-chu.spec.js     # xanh ở local trước
git add tests/trang-chu.spec.js
git commit -m "Sửa lại locator cho đúng"
git push
```

**Bước 8 — Thấy xanh**: về tab PR, F5 → checks quay vàng → ✅. Không cần mở PR mới — robot tự chạy lại mỗi khi có push vào nhánh của PR.

**Bước 9 — Dọn**: trên PR bấm **Close pull request** (nút xám, không phải Merge) → **Delete branch**. Về máy:

```powershell
git checkout main
git branch -D thu-nghiem/ci-do
git status        # phải sạch
```

Cái cần rút ra: lỗi trên CI đọc **y hệt** lỗi ở máy bạn — cùng dòng `Error:`, cùng tên test, cùng số dòng. Khác duy nhất là chỗ tìm nó và cách xem ảnh. Làm xong là bạn đã qua mốc 3 trong trang Lộ trình bằng tay mình.

## 4.4 Những lỗi Git người mới hay gặp

| Tình huống | Cách xử lý |
|---|---|
| Quên tạo nhánh, lỡ sửa trên `main` | `git stash` → `git checkout -b ten-nhanh` → `git stash pop` |
| `git push` báo `rejected` | Người khác đã push trước. `git pull` rồi push lại |
| Có chữ `CONFLICT` | Mở file, tìm `<<<<<<<` và `>>>>>>>`, chọn giữ phần nào, xoá dấu, `git add`, `git commit` |
| Muốn huỷ hết sửa đổi chưa commit | `git checkout -- .` (cẩn thận: mất thật) |
| Muốn xem lịch sử | `git log --oneline` |

> ✅ **Làm ngay:** tạo nhánh `thu-nghiem/git`, tạo file `ghi-chu.txt` bất kỳ, commit, push, mở PR trên GitHub, xem Actions chạy, rồi **đóng PR không merge** và xoá nhánh. Chỉ để luyện tay.

---
