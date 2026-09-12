// Sổ tay: ghi lại LỖI THẬT gặp khi thực hành, theo đúng một khuôn —
// máy báo gì → gõ gì để sửa → vì sao & nhớ gì cho lần sau.
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
}

];
