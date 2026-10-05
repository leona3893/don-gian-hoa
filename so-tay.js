// Sổ tay: ghi lại LỖI THẬT gặp khi thực hành, theo đúng một khuôn —
// máy báo gì → gõ gì để sửa → vì sao & nhớ gì cho lần sau.
// Khối đầu là `loi` (máy báo gì, nguyên văn) hoặc `hoi` (câu hỏi) — chọn một.
// Mỗi ghi chú tối đa 4 bài học; nhiều hơn thì tách thành ghi chú mới.
// Lệnh, tên file, đoạn code trong `ten` và `y` bọc bằng <code>…</code> để nổi bật.
// Lưu ý: đường dẫn Windows phải viết \\ (hai dấu) trong chuỗi JS, không thì \t thành tab.

export const SO_TAY = [

{
  slug:'npm-test-unknown-command', cat:'Kiểm thử',
  h1:'Gõ npm test thì báo "unknown command test"',
  loi:`PS D:\\thu-nghiem\\don-gian-hoa\\tests> npm test
error: unknown command 'test'`,
  sua:[
    'cd D:\\thu-nghiem\\don-gian-hoa',
    'npm install',
    'npx playwright install chromium',
    'npm test'
  ],
  baiHoc:[
    {ten:'Nhìn dòng nhắc trước khi gõ', y:'Dòng <code>PS D:\\...&gt;</code> cho biết bạn đang đứng ở đâu. Mọi lệnh <code>npm</code>/<code>npx</code> phải gõ ở gốc dự án — chỗ có <code>package.json</code>.'},
    {ten:'Clone mới = cài lại thư viện', y:'<code>node_modules</code> không nằm trong Git (xem <code>.gitignore</code>), nên mỗi bản clone phải tự <code>npm install</code>. Thiếu nó, máy gọi nhầm một <code>playwright</code> khác cài sẵn — bản đó không có lệnh <code>test</code>.'},
    {ten:'<code>cd ..</code> lùi ra, <code>cd tên-folder</code> đi vào', y:'Muốn sang folder ngang hàng thì lùi ra trước rồi mới đi vào.'}
  ],
  terms:['Git','Playwright','Test Runner']
},

{
  slug:'npm-run-report-va-npx-playwright-show-report', cat:'Kiểm thử',
  h1:'npm run report và npx playwright show-report khác nhau gì?',
  hoi:'Hai lệnh này đều mở báo cáo test. Gõ cái nào cũng được, hay có khác gì?',
  sua:[
    'npm run report',
    'npx playwright show-report'
  ],
  baiHoc:[
    {ten:'Hai lệnh làm cùng một việc', y:'Mở <code>package.json</code>, mục <code>scripts</code> có dòng <code>"report": "playwright show-report"</code>. <code>npm run report</code> chỉ là phím tắt: npm tra bảng đó rồi chạy đúng lệnh bên phải hộ bạn.'},
    {ten:'<code>npm</code> = quản kho + bấm nút có sẵn', y:'<code>npm install</code> tải thư viện về <code>node_modules</code>; <code>npm run &lt;tên&gt;</code> bấm nút đã đặt tên trong <code>scripts</code>. Riêng <code>npm test</code> và <code>npm start</code> được gõ tắt, không cần chữ <code>run</code>.'},
    {ten:'<code>npx</code> = chạy thẳng một chương trình trong kho', y:'Khi cần thêm tuỳ chọn mà nút không có — chạy 1 file, bật <code>--headed</code> — thì dùng <code>npx playwright test …</code>. Việc lặp lại hàng ngày thì dùng nút <code>npm run</code> để cả team gõ giống nhau.'}
  ],
  terms:['npm','npx','Playwright','Test Report']
},

{
  slug:'await-expect-va-expect-await', cat:'Kiểm thử',
  h1:'await expect(...) và expect(await ...) khác gì nhau?',
  hoi:'Hai dòng nhìn gần giống nhau, cùng có await, cùng kiểm tra 81 thẻ. Vì sao một dòng ổn định, dòng kia lúc xanh lúc đỏ?',
  sua:[
    "await expect(page.locator('#grid .term')).toHaveCount(81);   // ✅ thử lại tới 5 giây",
    "expect(await page.locator('#grid .term').count()).toBe(81);  // ❌ đếm 1 lần rồi so",
    "",
    "await expect.soft(page.locator('#count')).toHaveText('81 thuật ngữ');  // sai vẫn chạy tiếp"
  ],
  baiHoc:[
    {ten:'<code>await expect(locator)</code> thử lại tới 5 giây', y:'Trang vừa mở, JavaScript chưa kịp vẽ xong. Playwright kiểm tra đi kiểm tra lại — 0 thẻ, 40 thẻ, 81 thẻ — đúng thì đi tiếp. Bạn không phải viết lệnh chờ.'},
    {ten:'<code>expect(await …count())</code> chỉ đếm một lần', y:'<code>await</code> nằm bên trong nên chỉ chờ phép đếm, không chờ trang. Đếm lúc trang chưa xong là ra 0 → đỏ oan. Cách nhận biết viết đúng: <strong>await đứng trước expect</strong>, trong ngoặc của expect là <strong>locator</strong>, không phải một con số.'},
    {ten:'Sai thì dừng test đó, các test khác vẫn chạy', y:'Hết 5 giây vẫn sai → test đó ❌, các dòng phía dưới không chạy. Test khác chạy bình thường; báo cáo in ra sau khi chạy hết. Khi test đỏ, chỉ cần đọc <strong>dòng đầu tiên bị đỏ</strong>.'},
    {ten:'Muốn chạy tiếp sau khi sai: <code>expect.soft</code>', y:'Ghi lại lỗi rồi đi tiếp, cuối cùng test vẫn ❌ và báo cáo liệt kê <strong>tất cả</strong> chỗ sai. Dùng khi kiểm tra nhiều thứ độc lập trên một màn hình. Đừng dùng khi bước sau phụ thuộc bước trước.'}
  ],
  terms:['await','async','Assertion','Flaky Test']
}

];
