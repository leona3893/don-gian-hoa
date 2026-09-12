// Nội dung 4 tầng cho từng thuật ngữ. Tách khỏi terms.js để file gốc gọn.
// Mục nào chưa có ở đây thì build.mjs vẫn sinh trang như cũ (3 phần: brief/plain/analogy).

// ── Mốc đo bằng việc làm được, tách riêng theo từng nhóm người học ──
export const TRACKS = {
  'Kiểm thử': {
    id: 'kiem-thu', ten: 'Kiểm thử', cho: 'Tester, QA, người chuyển sang automation',
    moc: {
      1: {ten:'Nói chuyện được', tuKiem:'Dev bảo “cái này để tao mock lại”, bạn hiểu họ định làm gì.'},
      2: {ten:'Tự viết được cái đầu tiên', tuKiem:'Bạn viết được một test mở trang, bấm nút, kiểm tra chữ hiện ra — và nó chạy xanh trên máy bạn.'},
      3: {ten:'Tự sửa được khi nó hỏng', tuKiem:'Test đỏ trên CI mà xanh ở máy bạn, và bạn biết bắt đầu tìm từ đâu.'}
    }
  },
  'AI': {
    id: 'ai', ten: 'AI', cho: 'BA, PM, Marketer, người dùng AI trong công việc',
    moc: {
      1: {ten:'Nói chuyện được', tuKiem:'Nghe “model này hay hallucinate”, bạn hiểu vấn đề đang nằm ở đâu.'},
      2: {ten:'Tự dùng được', tuKiem:'Bạn viết được prompt cho ra kết quả dùng được thật, và giải thích được vì sao lần trước nó hỏng.'},
      3: {ten:'Tự ghép được', tuKiem:'Bạn nối được AI vào tài liệu của mình và biết cách kiểm tra nó trả lời đúng hay đang bịa.'}
    }
  },
  _default: {
    id: 'nen-tang', ten: 'Nền tảng', cho: 'BA, Designer, Founder, người không code muốn hiểu hệ thống',
    moc: {
      1: {ten:'Nói chuyện được', tuKiem:'Dev nói “chỗ này gọi API rồi cache lại”, bạn hình dung được đường đi của dữ liệu.'},
      2: {ten:'Đọc hiểu được', tuKiem:'Nhìn một sơ đồ hệ thống hoặc một log lỗi, bạn đoán được chỗ nào đang hỏng.'},
      3: {ten:'Tự dựng được', tuKiem:'Bạn tự đưa được một trang lên mạng, và biết phải sờ vào đâu khi nó không lên.'}
    }
  }
};

export const CHI_TIET = {

'Test Automation': { moc:1,
  leak:`<p>Dây chuyền soi hàng lắp xong là chạy mãi. Bộ test tự động thì <strong>phải nuôi</strong>: giao diện đổi một chút là hàng loạt test đỏ.</p>
<p><span class="punch">Automation không phải “làm một lần chạy mãi mãi”.</span> Nó là một phần mềm thứ hai bạn phải bảo trì song song với phần mềm chính. Nhiều đội bỏ automation giữa chừng vì tốn công sửa test hơn công test tay tiết kiệm được.</p>`,
  code:`test(<span class="s">'thêm vào giỏ hàng'</span>, async ({ page }) =&gt; {
  await page.goto(<span class="s">'/san-pham/ao-thun'</span>)
  await page.getByRole(<span class="s">'button'</span>, { name: <span class="s">'Thêm vào giỏ'</span> }).click()
  await expect(page.getByTestId(<span class="s">'so-luong-gio'</span>)).toHaveText(<span class="s">'1'</span>)
})`,
  cap:'Ba việc, luôn theo thứ tự này: <strong>đi tới đâu → làm gì → kiểm tra thấy gì</strong>.',
  yes:['Một ca test phải chạy đi chạy lại nhiều lần','Cần chạy trên nhiều trình duyệt hoặc nhiều máy','Muốn biết ngay khi code mới làm hỏng tính năng cũ'],
  no:['Tính năng còn đang đổi từng ngày','Ca test chỉ chạy đúng một lần rồi thôi','Thứ cần mắt người đánh giá: đẹp hay xấu, thuận tay hay không'],
  notYet:{gi:'chọn framework nào, thiết kế khung test, chạy song song, tích hợp CI', toiMoc:2,
    dauHieu:'Khi bạn thấy mình copy-paste cùng một đoạn “mở trang rồi đăng nhập” sang ca test thứ tư.'},
  next:[{ten:'Test Case', vi:'Phải biết viết ca test bằng tiếng Việt trước khi bảo máy làm nó.'},
        {ten:'Test Script', vi:'Chỗ ca test biến thành code chạy được.'},
        {ten:'Regression Test', vi:'Lý do lớn nhất khiến người ta chịu bỏ công làm automation.'}],
  try:`Mở một trang bất kỳ, bấm <strong>F12</strong> → Console, gõ:
<pre class="code">document.querySelector(<span class="s">'button'</span>).click()</pre>
Bạn vừa ra lệnh cho trình duyệt làm việc thay tay mình. Đó là hạt nhân của mọi automation.`},

'Test Case': { moc:1,
  leak:`<p>Đề thi có đáp án cố định. Ca test thì <span class="punch">phần “đáp án đúng” nhiều khi chính là thứ chưa ai chốt.</span></p>
<p>Nửa số tranh cãi trong nghề test không phải “code chạy sai”, mà là “thế nào mới đúng”. Viết ca test giỏi thực ra là kỹ năng <em>đặt câu hỏi cho người ra đề</em>, không phải kỹ năng chấm bài.</p>`,
  code:`<span class="c">Ca test: Đăng nhập sai mật khẩu</span>

Điều kiện:  Đã có tài khoản na@vd.com
Các bước:   1. Mở /dang-nhap
            2. Nhập na@vd.com / matkhausai
            3. Bấm Đăng nhập
Mong đợi:   Hiện chữ "Sai email hoặc mật khẩu"
            Vẫn ở lại trang đăng nhập`,
  cap:'Ca test tốt viết bằng tiếng Việt trước, ai đọc cũng làm theo được — chưa cần dòng code nào.',
  yes:['Cần người khác làm lại đúng y như bạn','Muốn biết rõ “đạt” nghĩa là gì trước khi bắt tay test','Chuẩn bị giao cho máy chạy tự động'],
  no:['Đang dò thử tính năng mới để tìm hiểu (lúc đó cứ nghịch tự do)','Ca quá hiển nhiên, viết ra chỉ tốn giấy'],
  notYet:{gi:'ma trận ca test, phân vùng tương đương, phân tích giá trị biên', toiMoc:2,
    dauHieu:'Khi bạn nhận ra mình viết 30 ca test mà chúng chỉ khác nhau đúng một con số.'},
  next:[{ten:'Assertion', vi:'Phần “mong đợi” khi viết thành code thì thành assertion.'},
        {ten:'Test Suite', vi:'Nhiều ca test gom lại thành bộ.'},
        {ten:'Test Data', vi:'Phần “điều kiện” lấy dữ liệu từ đâu ra.'}],
  try:`Lấy một tính năng bạn dùng hàng ngày — nút tìm kiếm của Shopee chẳng hạn. Viết ra giấy 3 ca test theo đúng 4 dòng trên. Bạn sẽ phát hiện ít nhất một chỗ mình không chắc “thế nào mới là đúng”.`},

'Test Suite': { moc:1,
  leak:`<p>Đề thi thì làm câu nào trước cũng được. Bộ test thì <span class="punch">thứ tự chạy có thể quyết định đỏ hay xanh</span> — nếu ca số 3 để lại dữ liệu rác làm ca số 7 chết.</p>
<p>Bộ test tốt phải chạy được theo <em>bất kỳ thứ tự nào</em>, kể cả chạy song song. Ca test phụ thuộc vào ca test khác là mầm mống của flaky test.</p>`,
  code:`describe(<span class="s">'Giỏ hàng'</span>, () =&gt; {
  test(<span class="s">'thêm sản phẩm'</span>, ...)
  test(<span class="s">'xoá sản phẩm'</span>, ...)
  test(<span class="s">'cập nhật số lượng'</span>, ...)
})`,
  cap:'Gom theo tính năng, không gom theo “ca dễ trước ca khó sau”.',
  yes:['Nhiều ca test cùng phục vụ một tính năng','Muốn chạy riêng một nhóm mà không chạy cả nghìn ca','Cần báo cáo tách theo từng mảng'],
  no:['Mới có 2-3 ca test tổng cộng','Gom bừa cho có nhóm, sau tìm không ra ca nào ở đâu'],
  notYet:{gi:'gắn thẻ (tag), lọc theo nhóm khi chạy, chia nhỏ để chạy song song', toiMoc:3,
    dauHieu:'Khi bộ test chạy quá 10 phút và bạn bắt đầu ngại bấm nút chạy.'},
  next:[{ten:'Test Runner', vi:'Thứ đọc bộ test của bạn rồi chạy nó.'},
        {ten:'Test Case', vi:'Đơn vị nhỏ nhất tạo nên bộ test.'},
        {ten:'Regression Test', vi:'Bộ test lớn nhất thường là bộ hồi quy.'}],
  try:`Nhìn lại 3 ca test bạn vừa viết ở mục Test Case. Thử hỏi: nếu chạy ca số 3 trước ca số 1 thì có sao không? Nếu có, bạn vừa tìm ra một phụ thuộc ngầm.`},

'Test Script': { moc:2,
  leak:`<p>Kịch bản phim viết cho diễn viên biết suy đoán. <span class="punch">Máy thì không suy đoán gì cả.</span></p>
<p>Bạn ghi “bấm nút Đăng nhập” thì máy hỏi lại: nút nào, nếu có hai nút cùng chữ đó thì sao, nếu nút chưa hiện thì đợi bao lâu, nếu nút bị che thì tính là bấm được không. Mọi thứ bạn coi là hiển nhiên đều phải viết ra.</p>`,
  code:`<span class="c">// Ca test bằng tiếng Việt → thành code</span>
await page.goto(<span class="s">'/dang-nhap'</span>)
await page.getByLabel(<span class="s">'Email'</span>).fill(<span class="s">'na@vd.com'</span>)
await page.getByLabel(<span class="s">'Mật khẩu'</span>).fill(<span class="s">'matkhausai'</span>)
await page.getByRole(<span class="s">'button'</span>, { name: <span class="s">'Đăng nhập'</span> }).click()
await expect(page.getByRole(<span class="s">'alert'</span>)).toContainText(<span class="s">'Sai email hoặc mật khẩu'</span>)`,
  cap:'Từng dòng ứng đúng một bước trong ca test viết tay ở trên.',
  yes:['Ca test đã ổn định, không đổi mỗi tuần','Cần chạy lại thường xuyên','Muốn máy chạy lúc mình đang ngủ'],
  no:['Còn đang dò xem tính năng chạy thế nào','Ca test viết tay còn chưa rõ “đúng” là gì'],
  notYet:{gi:'gom code dùng chung, fixture, hook trước/sau, tham số hoá ca test', toiMoc:2,
    dauHieu:'Khi bạn sửa một cái nút mà phải mở 12 file test ra sửa cùng một dòng.'},
  next:[{ten:'Locator', vi:'Phần khó nhất của script: chỉ đúng phần tử cần bấm.'},
        {ten:'Assertion', vi:'Dòng cuối quyết định test đỗ hay trượt.'},
        {ten:'Page Object Model', vi:'Cách dọn script khi nó bắt đầu lặp lại.'}],
  try:`F12 → Console, trên một trang có ô tìm kiếm:
<pre class="code">document.querySelector(<span class="s">'input'</span>).value = <span class="s">'áo thun'</span></pre>
Bạn vừa viết dòng script đầu tiên: điền dữ liệu vào ô mà không đụng bàn phím.`},

'Assertion': { moc:2,
  leak:`<p>Người chấm thi biết linh động: viết “Hà Nội” hay “hà nội” đều cho đúng. <span class="punch">Assertion thì so từng ký tự.</span></p>
<p>Thừa một dấu cách, khác hoa thường, ngày ghi 01/09 thay vì 1/9 — đều fail. Và ngược lại, assertion lỏng quá (chỉ cần “có chữ Hà”) thì test xanh cả khi sản phẩm sai. Chọn độ chặt của assertion là cả một nghề.</p>`,
  code:`<span class="c">// Quá chặt — đổi một dấu cách là đỏ</span>
await expect(el).toHaveText(<span class="s">'Chào Na,  bạn có 3 đơn'</span>)

<span class="c">// Vừa đủ — kiểm tra đúng thứ mình quan tâm</span>
await expect(el).toContainText(<span class="s">'3 đơn'</span>)`,
  cap:'Kiểm tra <strong>đúng thứ bạn quan tâm</strong>, đừng kiểm tra cả những thứ tình cờ nằm cạnh.',
  yes:['Mọi ca test — không có assertion thì không phải test','Cần chốt “thế nào là đạt” thành thứ máy hiểu được'],
  no:['Chưa biết kết quả đúng là gì (đi hỏi cho ra trước đã)','Kiểm tra cả những thứ không liên quan tới ca test này'],
  notYet:{gi:'soft assertion, snapshot testing, matcher tự viết', toiMoc:3,
    dauHieu:'Khi test đỏ ở dòng đầu và bạn muốn nó chạy tiếp để xem còn sai chỗ nào nữa.'},
  next:[{ten:'Test Report', vi:'Nơi hiện ra assertion nào trượt và trượt vì sao.'},
        {ten:'Visual Testing', vi:'Khi thứ cần kiểm tra là hình ảnh chứ không phải chữ.'},
        {ten:'Test Case', vi:'Phần “mong đợi” của ca test chính là assertion.'}],
  try:`F12 → Console:
<pre class="code">console.assert(1 + 1 === 3, <span class="s">'sai rồi'</span>)</pre>
Đó là assertion trần trụi nhất: đúng thì im lặng, sai thì kêu lên.`},

'Test Runner': { moc:2,
  leak:`<p>Giám thị chỉ phát đề rồi thu bài. Test runner làm nhiều hơn: nó <span class="punch">dựng sẵn môi trường trước mỗi ca và dọn dẹp sau đó</span> — mở trình duyệt, đăng nhập, xoá dữ liệu cũ.</p>
<p>Phần lớn thời gian chạy test thật ra nằm ở khâu dựng và dọn này, chứ không phải ở mấy dòng bấm nút bạn viết.</p>`,
  code:`<span class="c"># Chạy cả bộ</span>
npx playwright test

<span class="c"># Chạy một file, hiện trình duyệt ra xem</span>
npx playwright test gio-hang.spec.js --headed

<span class="c"># Chạy lại đúng những ca vừa trượt</span>
npx playwright test --last-failed`,
  cap:'Ba lệnh này đủ dùng cho vài tháng đầu.',
  yes:['Có từ 2 ca test trở lên','Muốn chạy chọn lọc thay vì chạy hết','Cần báo cáo tổng hợp sau mỗi lần chạy'],
  no:['Mới đang thử một dòng lệnh trong Console'],
  notYet:{gi:'chạy song song, chia shard, retry tự động, cấu hình nhiều môi trường', toiMoc:3,
    dauHieu:'Khi bộ test chạy 40 phút và CI bắt cả đội ngồi chờ.'},
  next:[{ten:'Test Report', vi:'Đầu ra của runner sau mỗi lần chạy.'},
        {ten:'CI/CD', vi:'Nơi runner chạy tự động thay vì bạn gõ tay.'},
        {ten:'Headless', vi:'Chế độ runner chạy không hiện cửa sổ.'}],
  try:`Chưa cài gì cũng xem được: vào trang playwright.dev, mục Getting Started. Đọc đúng phần “Running tests” — ba lệnh ở trên là toàn bộ thứ bạn cần trong hai tháng đầu.`},

'Unit Test': { moc:1,
  leak:`<p>Thử riêng bóng đèn thì bóng nào cũng như bóng nào. Nhưng <span class="punch">một hàm hiếm khi đứng một mình</span> — nó gọi hàm khác, đọc giờ hệ thống, lấy dữ liệu từ đâu đó.</p>
<p>Để test được “riêng”, bạn phải cắt hết các dây nối đó bằng mock. Và cắt càng nhiều thì cái bạn đang test càng xa với cái chạy thật. Đó là đánh đổi cố hữu của unit test, không phải lỗi ai làm sai.</p>`,
  code:`<span class="c">// Hàm cần test</span>
function tinhTien(gia, soLuong) { return gia * soLuong }

<span class="c">// Unit test</span>
test(<span class="s">'nhân giá với số lượng'</span>, () =&gt; {
  expect(tinhTien(100, 3)).toBe(300)
})`,
  cap:'Không mở trình duyệt, không gọi mạng. Chạy xong trong vài mili giây.',
  yes:['Hàm có logic tính toán, nhiều nhánh if','Muốn phản hồi trong 1 giây thay vì 1 phút','Cần cố định một quy tắc nghiệp vụ để sau không ai vô tình đổi'],
  no:['Hàm chỉ gọi thẳng sang hàm khác, không có logic gì','Thứ cần kiểm tra là các mảnh ghép với nhau'],
  notYet:{gi:'độ phủ nhánh, kiểm thử theo tính chất, mutation testing', toiMoc:3,
    dauHieu:'Khi coverage báo 90% mà production vẫn lỗi đều đều.'},
  next:[{ten:'Mock', vi:'Công cụ cắt dây nối để hàm đứng một mình được.'},
        {ten:'Integration Test', vi:'Tầng trên: thử các mảnh ghép lại với nhau.'},
        {ten:'Test Coverage', vi:'Đo xem unit test đã chạm tới bao nhiêu phần code.'}],
  try:`F12 → Console, tự làm một unit test thô sơ:
<pre class="code">const f = (a,b) =&gt; a * b
console.assert(f(100,3) === 300, <span class="s">'sai'</span>)</pre>`},

'Integration Test': { moc:1,
  leak:`<p>Cắm điện cả mạch thì đèn sáng hoặc không sáng, biết ngay. <span class="punch">Integration test hỏng thì thường không biết hỏng ở mảnh nào.</span></p>
<p>Đó là cái giá: càng ghép nhiều thành phần, test càng giống thật nhưng càng khó lần ra nguyên nhân. Unit test đỏ là biết ngay hàm nào; integration test đỏ là bắt đầu cuộc điều tra.</p>`,
  code:`test(<span class="s">'lưu đơn hàng xuống database'</span>, async () =&gt; {
  const don = await taoDonHang({ ma:<span class="s">'DH01'</span>, tien:300 })
  const trongDb = await db.donHang.findOne({ ma:<span class="s">'DH01'</span> })
  expect(trongDb.tien).toBe(300)
})`,
  cap:'Có database thật (thường là bản dựng riêng cho test), không mock.',
  yes:['Cần chắc code nói chuyện đúng với database hoặc API','Chỗ ghép nối hay hỏng trong quá khứ','Unit test đã xanh hết mà thực tế vẫn sai'],
  no:['Logic thuần tính toán (unit test rẻ hơn nhiều)','Chưa có môi trường test riêng, sợ đụng dữ liệu thật'],
  notYet:{gi:'testcontainers, dựng database tạm trong Docker, seed dữ liệu tự động', toiMoc:3,
    dauHieu:'Khi test của bạn xanh ở máy vì database local còn dữ liệu cũ, còn máy đồng nghiệp thì đỏ.'},
  next:[{ten:'Test Environment', vi:'Nơi integration test cần có để chạy.'},
        {ten:'E2E Test', vi:'Tầng trên nữa: đi trọn hành trình người dùng.'},
        {ten:'API Testing', vi:'Dạng integration test phổ biến nhất và rẻ nhất.'}],
  try:`Không cần code: mở F12 → Network trên một trang thương mại điện tử, bấm “thêm vào giỏ”. Bạn đang nhìn đúng chỗ mà integration test kiểm tra — lời gọi giữa giao diện và server.`},

'E2E Test': { moc:1,
  leak:`<p>Đóng vai khách một lần thì biết quy trình trôi hay không. Nhưng <span class="punch">E2E test đắt hơn mọi loại test khác vài chục lần</span> — chậm, hay chập chờn, và hỏng chỗ nào cũng khó lần.</p>
<p>Sai lầm phổ biến nhất của người mới: thấy E2E “giống thật nhất” nên viết tất cả bằng E2E. Kết quả là bộ test chạy hai tiếng, đỏ liên tục, rồi cả đội bỏ luôn không thèm nhìn.</p>`,
  code:`test(<span class="s">'mua hàng từ đầu tới cuối'</span>, async ({ page }) =&gt; {
  await page.goto(<span class="s">'/'</span>)
  await page.getByPlaceholder(<span class="s">'Tìm sản phẩm'</span>).fill(<span class="s">'áo thun'</span>)
  await page.getByRole(<span class="s">'button'</span>, { name:<span class="s">'Tìm'</span> }).click()
  await page.getByText(<span class="s">'Áo thun trắng'</span>).click()
  await page.getByRole(<span class="s">'button'</span>, { name:<span class="s">'Mua ngay'</span> }).click()
  await expect(page.getByText(<span class="s">'Đặt hàng thành công'</span>)).toBeVisible()
})`,
  cap:'Một ca như thế này chạy 10-30 giây. Nhân với 500 ca thì bạn hiểu vì sao phải tiết chế.',
  yes:['Luồng quan trọng nhất, mất tiền nếu hỏng: đăng nhập, thanh toán, đặt hàng','Cần bằng chứng cả hệ thống ghép lại vẫn chạy'],
  no:['Kiểm tra mọi trường hợp lỗi nhỏ (để cho unit hoặc API test)','Tính năng còn đang đổi giao diện liên tục'],
  notYet:{gi:'kim tự tháp test, tái dùng trạng thái đăng nhập, chạy song song', toiMoc:3,
    dauHieu:'Khi bộ E2E của bạn vượt 15 phút và bắt đầu đỏ ngẫu nhiên vài ca mỗi lần chạy.'},
  next:[{ten:'Flaky Test', vi:'Bệnh nghề nghiệp của E2E, gần như chắc chắn sẽ gặp.'},
        {ten:'Playwright', vi:'Công cụ viết E2E phổ biến nhất hiện nay.'},
        {ten:'API Testing', vi:'Cách rẻ hơn để kiểm phần lớn thứ bạn định kiểm bằng E2E.'}],
  try:`Tự làm E2E bằng tay một lần: mở trang bạn đang test, bấm đúng luồng mua hàng từ đầu tới cuối, vừa làm vừa ghi lại từng bước. Đếm xem bao nhiêu bước. Đó chính là số dòng code bạn sắp phải viết.`},

'Regression Test': { moc:1,
  leak:`<p>Mở thử vài vòi nước khác thì mất một phút. <span class="punch">Bộ test hồi quy thật thì lớn tới mức không ai chạy đủ trước mỗi lần sửa.</span></p>
<p>Nên nghề này thực chất là nghề <em>chọn</em>: chạy nhóm nào, bỏ nhóm nào, chấp nhận rủi ro tới đâu. Không phải nghề chạy hết.</p>`,
  code:`<span class="c"># Trước khi phát hành: chạy toàn bộ</span>
npx playwright test

<span class="c"># Mỗi lần đẩy code: chỉ chạy nhóm quan trọng</span>
npx playwright test --grep @smoke`,
  cap:'Gắn thẻ cho ca test để chọn nhóm mà chạy — đây là lý do chính người ta dùng thẻ.',
  yes:['Sau mỗi lần sửa code','Trước mỗi lần phát hành','Sau khi nâng cấp thư viện hoặc đổi hạ tầng'],
  no:['Tính năng đang xây dở, chưa chốt hành vi'],
  notYet:{gi:'chọn ca test theo vùng code đã đổi, phân tầng bộ hồi quy', toiMoc:3,
    dauHieu:'Khi bộ hồi quy chạy lâu tới mức cả đội bắt đầu bỏ qua nó cho nhanh.'},
  next:[{ten:'Smoke Test', vi:'Bộ nhỏ chạy trước, để không phí thời gian chạy bộ lớn.'},
        {ten:'CI/CD', vi:'Nơi hồi quy nên chạy tự động thay vì nhớ chạy tay.'},
        {ten:'Test Suite', vi:'Cách gom và gắn thẻ để chọn nhóm chạy.'}],
  try:`Nghĩ về lần gần nhất sản phẩm bạn làm bị lỗi ở một chỗ mà không ai đụng vào. Đó chính xác là ca test hồi quy mà lẽ ra nên có.`},

'Smoke Test': { moc:1,
  leak:`<p>Xe nổ máy được thì ít ra còn chạy. Nhưng <span class="punch">smoke test xanh không có nghĩa bản build dùng được</span> — chỉ nghĩa là nó chưa chết hẳn.</p>
<p>Nguy hiểm khi có người nhìn smoke test xanh rồi kết luận “ổn rồi, phát hành thôi”. Nó chỉ trả lời đúng một câu: có đáng bỏ công test tiếp không.</p>`,
  code:`<span class="c">// Chỉ 5-10 ca, chạy dưới 2 phút</span>
test(<span class="s">'@smoke trang chủ mở được'</span>, ...)
test(<span class="s">'@smoke đăng nhập được'</span>, ...)
test(<span class="s">'@smoke tìm kiếm ra kết quả'</span>, ...)`,
  cap:'Tiêu chí chọn: hỏng cái này thì mọi ca test khác đằng nào cũng đỏ.',
  yes:['Ngay sau khi có bản build mới','Sau khi deploy lên môi trường test','Trước khi cho cả đội bắt đầu test tay'],
  no:['Thay cho bộ hồi quy đầy đủ','Đưa vào quá nhiều ca, mất luôn tính “nhanh”'],
  notYet:{gi:'cổng chặn tự động trong pipeline, tự rollback khi smoke đỏ', toiMoc:3,
    dauHieu:'Khi bạn đã ba lần ngồi chờ bộ test đầy đủ chạy 40 phút chỉ để phát hiện trang chủ không mở nổi.'},
  next:[{ten:'Sanity Test', vi:'Anh em gần nhất, hay bị nhầm lẫn với smoke.'},
        {ten:'Regression Test', vi:'Bộ lớn chạy sau khi smoke đã xanh.'},
        {ten:'Deploy', vi:'Thời điểm smoke test hay được kích hoạt nhất.'}],
  try:`Liệt kê ra giấy 5 chức năng mà nếu hỏng thì sản phẩm coi như chết. Đó là bộ smoke test của bạn. Nếu liệt kê quá 10 cái, bạn đang nhầm nó với hồi quy.`},

'Sanity Test': { moc:1,
  leak:`<p>Ranh giới với smoke test <span class="punch">không rõ ràng như sách vở nói</span>, và mỗi công ty định nghĩa một kiểu.</p>
<p>Cách nhớ thực dụng: <strong>smoke</strong> hỏi “bản build này còn sống không?” (rộng, nông). <strong>Sanity</strong> hỏi “chỗ vừa sửa đã đúng chưa?” (hẹp, sâu). Đừng tranh cãi định nghĩa với đồng nghiệp — hỏi thẳng công ty bạn đang hiểu từ đó theo nghĩa nào.</p>`,
  code:`<span class="c">// Dev vừa vá lỗi làm tròn tiền ở giỏ hàng</span>
<span class="c">// Sanity: chỉ soi đúng chỗ đó, chưa cần chạy cả bộ</span>
test(<span class="s">'tiền giỏ hàng làm tròn đúng'</span>, ...)
test(<span class="s">'tiền giỏ hàng cộng phí ship đúng'</span>, ...)`,
  cap:'Vài ca, chạy trong một phút, chỉ quanh chỗ vừa động vào.',
  yes:['Dev vừa vá xong một lỗi và cần xác nhận nhanh','Chưa muốn tốn 40 phút chạy bộ đầy đủ'],
  no:['Thay cho hồi quy — sanity không nói gì về phần còn lại của hệ thống'],
  notYet:{gi:'chọn ca test tự động theo vùng code đã đổi', toiMoc:3,
    dauHieu:'Khi bạn phải tự đoán “sửa chỗ này thì nên test lại những gì” quá nhiều lần trong tuần.'},
  next:[{ten:'Smoke Test', vi:'Rộng và nông, ngược với sanity.'},
        {ten:'Regression Test', vi:'Bộ đầy đủ chạy sau khi sanity đã đạt.'},
        {ten:'Bug', vi:'Sanity thường chạy ngay sau khi một bug được vá.'}],
  try:`Lần tới dev báo “đã fix rồi”, đừng chạy cả bộ. Viết ra 3 câu hỏi hẹp nhất kiểm tra đúng chỗ đó. Đấy là sanity test.`},

'Selenium': { moc:2,
  leak:`<p>Điều khiển đa năng thì tiện, nhưng <span class="punch">Selenium không tự chờ giúp bạn.</span></p>
<p>Nó bấm ngay khi được lệnh, kể cả lúc trang chưa vẽ xong — và đây là nguồn gốc của phần lớn flaky test trong các dự án Selenium. Playwright và Cypress sinh sau nên có sẵn cơ chế tự chờ, đó là khác biệt lớn nhất chứ không phải cú pháp.</p>`,
  code:`<span class="c">// Java + Selenium</span>
driver.get(<span class="s">"https://vd.com/dang-nhap"</span>);
driver.findElement(By.id(<span class="s">"email"</span>)).sendKeys(<span class="s">"na@vd.com"</span>);
driver.findElement(By.id(<span class="s">"submit"</span>)).click();

<span class="c">// Gần như luôn phải tự thêm chờ</span>
new WebDriverWait(driver, Duration.ofSeconds(10))
    .until(ExpectedConditions.visibilityOfElementLocated(By.id(<span class="s">"loi"</span>)));`,
  cap:'Bốn dòng việc chính, một dòng chờ đợi — tỉ lệ này khá tiêu biểu cho Selenium.',
  yes:['Công ty đã có sẵn bộ test Selenium lớn','Cần ngôn ngữ Java hoặc C# (Playwright mạnh nhất ở JS/Python)','Cần chạy trên trình duyệt hoặc thiết bị cũ mà công cụ mới không đỡ'],
  no:['Dự án mới hoàn toàn — cân nhắc Playwright trước','Đội chưa quen xử lý chờ đợi thủ công'],
  notYet:{gi:'Selenium Grid, chạy phân tán nhiều máy, tích hợp cloud device farm', toiMoc:3,
    dauHieu:'Khi bạn cần chạy cùng lúc trên 5 trình duyệt và máy cá nhân không kham nổi.'},
  next:[{ten:'WebDriver', vi:'Giao thức nằm dưới Selenium, hiểu nó thì hiểu vì sao Selenium làm được vậy.'},
        {ten:'Wait', vi:'Kỹ năng bắt buộc phải giỏi nếu dùng Selenium.'},
        {ten:'Playwright', vi:'Lựa chọn thay thế phổ biến cho dự án mới.'}],
  try:`Chưa cần cài Selenium: F12 → Console, gõ <code>document.getElementById('email')</code> trên một trang đăng nhập bất kỳ. Đó chính là thứ <code>findElement(By.id(...))</code> làm ở bên trong.`},

'Playwright': { moc:2,
  leak:`<p>“Có trợ lái” không có nghĩa không bao giờ đâm. <span class="punch">Tự chờ chỉ giải quyết chờ phần tử hiện ra, không giải quyết được dữ liệu chưa sẵn sàng.</span></p>
<p>Test vẫn chập chờn như thường nếu đơn hàng bạn vừa tạo chưa kịp đồng bộ, hoặc hai ca test dùng chung một tài khoản. Công cụ tốt hạ thấp mặt sàn chứ không xoá được flaky test.</p>`,
  code:`<span class="c">// Không cần khai báo chờ — Playwright tự đợi nút bấm được</span>
await page.getByRole(<span class="s">'button'</span>, { name:<span class="s">'Đăng nhập'</span> }).click()

<span class="c">// Tự đợi tới khi chữ xuất hiện, tối đa 5 giây</span>
await expect(page.getByRole(<span class="s">'alert'</span>)).toBeVisible()`,
  cap:'So với Selenium ở trên: cùng việc, không dòng chờ nào phải tự viết.',
  yes:['Dự án mới, đội dùng JS/TS hoặc Python','Cần chạy cả Chrome, Firefox, Safari','Muốn xem lại chính xác chuyện gì xảy ra khi test đỏ (trace viewer)'],
  no:['Đội đã đầu tư sâu vào Selenium và không có lý do đổi','Cần hỗ trợ trình duyệt rất cũ'],
  notYet:{gi:'fixture, tái dùng trạng thái đăng nhập, chia shard, component testing', toiMoc:3,
    dauHieu:'Khi mỗi ca test của bạn đều mất 8 giây chỉ để đăng nhập lại từ đầu.'},
  next:[{ten:'Locator', vi:'Cách Playwright chỉ tới phần tử, khác hẳn tư duy Selenium.'},
        {ten:'Mock', vi:'Playwright chặn network rất gọn, nên đây là cặp đi liền nhau.'},
        {ten:'Flaky Test', vi:'Vẫn sẽ gặp, chỉ là ít hơn.'}],
  try:`Không cần cài: vào playwright.dev, mục “Getting started”. Đọc đúng đoạn code đầu tiên và so với ví dụ Selenium ở trang bên cạnh. Khác biệt nằm ở chỗ không có dòng nào tên là <code>wait</code>.`},

'Cypress': { moc:2,
  leak:`<p>Camera hành trình quay lại mọi thứ — nhưng <span class="punch">Cypress chạy bên trong chính trang web đang test.</span></p>
<p>Đó vừa là điểm mạnh (thấy được mọi thứ bên trong) vừa là giới hạn thật: khó test nhiều tab, khó nhảy sang tên miền khác, và không chạy được Safari. Nếu luồng của bạn có bước thanh toán chuyển sang trang ngân hàng, cân nhắc kỹ trước khi chọn.</p>`,
  code:`cy.visit(<span class="s">'/dang-nhap'</span>)
cy.get(<span class="s">'#email'</span>).type(<span class="s">'na@vd.com'</span>)
cy.get(<span class="s">'#submit'</span>).click()
cy.contains(<span class="s">'Sai email hoặc mật khẩu'</span>).should(<span class="s">'be.visible'</span>)`,
  cap:'Cú pháp nối chuỗi, đọc gần như tiếng Anh. Đây là điểm nhiều người thích ở Cypress.',
  yes:['Đội frontend muốn tự test phần mình làm','Cần công cụ gỡ lỗi trực quan, tua lại từng bước','Ứng dụng gói gọn trong một tên miền'],
  no:['Luồng test đi qua nhiều tên miền hoặc nhiều tab','Bắt buộc phải hỗ trợ Safari'],
  notYet:{gi:'lệnh tự viết, chặn network nâng cao, Cypress Cloud', toiMoc:3,
    dauHieu:'Khi bạn lặp lại cùng một chuỗi 6 lệnh đăng nhập ở đầu mọi file test.'},
  next:[{ten:'Playwright', vi:'Lựa chọn còn lại, mạnh hơn ở đa tab và đa trình duyệt.'},
        {ten:'E2E Test', vi:'Loại test mà Cypress sinh ra để phục vụ.'},
        {ten:'Assertion', vi:'Phần <code>.should()</code> trong cú pháp Cypress.'}],
  try:`Vào cypress.io, xem đoạn video demo ở trang chủ. Chú ý phần bên trái tua lại từng bước — đó là thứ khiến người ta chọn Cypress, không phải cú pháp.`},

'Appium': { moc:2,
  leak:`<p>“Selenium cho điện thoại” là cách nói cho dễ hình dung, nhưng <span class="punch">test mobile khó hơn test web một bậc rõ rệt.</span></p>
<p>Bạn phải lo thêm: máy thật hay máy ảo, phiên bản hệ điều hành, quyền truy cập, thông báo đẩy chen ngang, xoay ngang xoay dọc, mạng yếu. Cùng một đoạn code chạy ngon trên Android có thể chết trên iOS vì lý do chẳng liên quan gì tới code.</p>`,
  code:`<span class="c">// Gần giống Selenium, khác ở cách tìm phần tử</span>
driver.findElement(AppiumBy.accessibilityId(<span class="s">"nut-dang-nhap"</span>)).click();
driver.findElement(AppiumBy.xpath(<span class="s">"//android.widget.EditText[@text='Email']"</span>)).sendKeys(<span class="s">"na@vd.com"</span>);`,
  cap:'<code>accessibilityId</code> là cách tìm phần tử ổn định nhất trên mobile — xin dev gắn sẵn cho bạn.',
  yes:['Sản phẩm có app iOS hoặc Android cần test lặp lại','Cần chạy cùng bộ test trên cả hai nền tảng'],
  no:['Sản phẩm chỉ có web (dùng Playwright nhẹ hơn nhiều)','Đội chưa có máy thật hoặc chưa có dịch vụ thuê máy'],
  notYet:{gi:'device farm, chạy song song nhiều máy, test theo cử chỉ phức tạp', toiMoc:3,
    dauHieu:'Khi bạn cần kiểm tra trên 6 đời máy mà trong tay chỉ có đúng một cái điện thoại.'},
  next:[{ten:'WebDriver', vi:'Appium dùng lại đúng giao thức này.'},
        {ten:'Selenium', vi:'Hiểu Selenium trước thì Appium học rất nhanh.'},
        {ten:'Locator', vi:'Phần khác biệt lớn nhất khi chuyển từ web sang mobile.'}],
  try:`Trên điện thoại Android, bật <em>Tùy chọn nhà phát triển → Hiển thị giới hạn bố cục</em>. Bạn sẽ thấy app được chia thành các ô chữ nhật — đó đúng là những phần tử mà Appium tìm và bấm.`},

'WebDriver': { moc:2,
  leak:`<p>Vô lăng xe nào cũng như nhau, nhưng <span class="punch">các trình duyệt lại hiểu cùng một lệnh theo cách hơi khác nhau.</span></p>
<p>Cùng lệnh “click”, Chrome và Firefox có thể xử lý khác nhau khi phần tử bị che một nửa hoặc đang trong animation. Chuẩn chung giúp bạn viết một lần chạy nhiều nơi, nhưng không xoá được khác biệt giữa các trình duyệt — đó là lý do test cross-browser vẫn cần chạy thật.</p>`,
  code:`<span class="c"># WebDriver thực chất là các lời gọi HTTP</span>
POST /session/{id}/element        <span class="c"># tìm phần tử</span>
POST /session/{id}/element/{e}/click   <span class="c"># bấm vào nó</span>
GET  /session/{id}/element/{e}/text    <span class="c"># đọc chữ trong nó</span>`,
  cap:'Mọi thư viện Selenium ở mọi ngôn ngữ, bên dưới đều chỉ đang gửi mấy request này.',
  yes:['Muốn hiểu vì sao Selenium và Appium làm được điều chúng làm','Đang gỡ lỗi ở tầng sâu, log Selenium khó hiểu'],
  no:['Mới bắt đầu — cứ dùng thư viện, chưa cần biết bên dưới'],
  notYet:{gi:'BiDi protocol, CDP, tự viết client WebDriver', toiMoc:3,
    dauHieu:'Khi bạn cần bắt lỗi console của trình duyệt trong lúc test chạy, và thư viện không cho sẵn.'},
  next:[{ten:'Selenium', vi:'Cách dùng WebDriver phổ biến nhất.'},
        {ten:'Appium', vi:'Dùng lại WebDriver cho app điện thoại.'},
        {ten:'API Testing', vi:'WebDriver chính là một API — hiểu API testing thì hiểu luôn cơ chế này.'}],
  try:`Không cần code: WebDriver hoạt động đúng như những gì bạn thấy ở tab Network khi bấm nút trên web. Mở F12 → Network, bấm vài nút, nhìn danh sách request hiện ra. Selenium cũng đang gửi những request y hệt vậy, chỉ là gửi cho trình duyệt.`},

'Locator': { moc:2,
  leak:`<p>Địa chỉ nhà thì cố định. <span class="punch">Locator thì đổi mỗi lần dev sửa giao diện</span> — và họ sửa liên tục mà không báo bạn.</p>
<p>Đây là nguyên nhân số một khiến bộ test tự động chết dần: không phải vì logic sai, mà vì cái nút đổi class. Cách chữa duy nhất bền vững là xin dev gắn <code>data-testid</code> — thuộc tính sinh ra chỉ để cho test bám vào và không ai được đổi vì lý do thẩm mỹ.</p>`,
  code:`<span class="c">// Dễ gãy — class do công cụ CSS sinh ra tự động</span>
page.locator(<span class="s">'.btn-primary.css-1x7y9z'</span>)

<span class="c">// Bền — theo vai trò và chữ người dùng thật sự nhìn thấy</span>
page.getByRole(<span class="s">'button'</span>, { name:<span class="s">'Đăng nhập'</span> })

<span class="c">// Bền nhất — thuộc tính dành riêng cho test</span>
page.getByTestId(<span class="s">'nut-dang-nhap'</span>)`,
  cap:'Thứ tự ưu tiên: testid → vai trò và nhãn → cuối cùng mới tới CSS.',
  yes:['Mọi lúc bạn cần chỉ vào một phần tử để bấm hoặc đọc'],
  no:['Bám vào class trang trí hoặc vị trí thứ mấy trong danh sách'],
  notYet:{gi:'locator lồng nhau, lọc theo phần tử con, shadow DOM', toiMoc:3,
    dauHieu:'Khi bạn cần bấm nút Xoá nằm trong đúng dòng có chữ “Áo thun trắng”, giữa một bảng 50 dòng.'},
  next:[{ten:'XPath', vi:'Vũ khí cuối cùng khi không còn cách nào khác bám vào.'},
        {ten:'Flaky Test', vi:'Locator chọn dở là nguồn flaky phổ biến nhất.'},
        {ten:'Page Object Model', vi:'Cách gom locator về một chỗ để sửa một lần.'}],
  try:`F12 → Console, trên trang bất kỳ:
<pre class="code">document.querySelectorAll(<span class="s">'[data-testid]'</span>).length</pre>
Ra 0 nghĩa là đội dev chưa gắn testid nào. Đó là cuộc trò chuyện đầu tiên bạn nên có với họ.`},

'XPath': { moc:2,
  leak:`<p>Chỉ đường bằng mô tả thì <span class="punch">chỉ cần hàng xóm xây thêm cái cổng là lạc</span> — và với XPath thì “cái cổng” là một thẻ <code>div</code> dev thêm vào để chỉnh khoảng cách.</p>
<p>XPath dạng đường dẫn tuyệt đối (<code>/html/body/div[3]/div[2]/...</code>) gãy gần như chắc chắn. Nếu buộc phải dùng XPath, hãy bám vào chữ hoặc thuộc tính, đừng bám vào vị trí.</p>`,
  code:`<span class="c">// Rất dễ gãy</span>
/html/body/div[3]/div[2]/button[1]

<span class="c">// Đỡ hơn nhiều — bám vào chữ người dùng nhìn thấy</span>
//button[text()=<span class="s">'Đăng nhập'</span>]

<span class="c">// Bám vào thuộc tính riêng</span>
//*[@data-testid=<span class="s">'nut-dang-nhap'</span>]`,
  cap:'Quy tắc: đếm được thì đừng đếm, tả được thì hãy tả.',
  yes:['Phần tử không có id, class ổn định hay testid','Cần tìm theo nội dung chữ bên trong','Cần đi ngược lên phần tử cha (CSS không làm được)'],
  no:['Đã có testid hoặc vai trò rõ ràng để bám','Chép XPath từ menu chuột phải của trình duyệt (gần như luôn là dạng dễ gãy)'],
  notYet:{gi:'trục XPath (ancestor, following-sibling), hàm XPath nâng cao', toiMoc:3,
    dauHieu:'Khi bạn cần đi từ ô chữ lên tìm cái dòng chứa nó rồi mới bấm nút Xoá trong dòng đó.'},
  next:[{ten:'Locator', vi:'Cách bám phần tử nên thử trước khi tới XPath.'},
        {ten:'Flaky Test', vi:'XPath tuyệt đối là nguồn gãy test kinh điển.'},
        {ten:'Test Script', vi:'Nơi XPath được dùng.'}],
  try:`F12 → Console, thử XPath ngay:
<pre class="code">$x(<span class="s">"//button"</span>)</pre>
Ra danh sách mọi nút trên trang. Đổi thành <code>$x("//button[text()='Tìm']")</code> để lọc theo chữ.`},

'Page Object Model': { moc:2,
  leak:`<p>Danh bạ chỉ lưu số. Page Object <span class="punch">rất dễ phình thành nơi chứa cả logic nghiệp vụ</span>, rồi thành một mớ không ai dám sửa.</p>
<p>Dấu hiệu đã đi quá xa: một lớp Page có 40 phương thức, hoặc Page này gọi Page kia gọi Page nọ. Nguyên tắc giữ mình: page object chỉ biết <em>cách bấm</em>, không biết <em>bấm để làm gì</em>.</p>`,
  code:`class TrangDangNhap {
  constructor(page) { this.page = page }
  get oEmail()  { return this.page.getByLabel(<span class="s">'Email'</span>) }
  get nutGui()  { return this.page.getByRole(<span class="s">'button'</span>, { name:<span class="s">'Đăng nhập'</span> }) }
  async dangNhap(email, mk) { ... }
}

<span class="c">// Trong test — không còn locator nào lộ ra</span>
await new TrangDangNhap(page).dangNhap(<span class="s">'na@vd.com'</span>, <span class="s">'123'</span>)`,
  cap:'Dev đổi id nút Đăng nhập? Sửa đúng một dòng, cả trăm ca test sống lại.',
  yes:['Từ khoảng 10 ca test trở lên trên cùng một trang','Cùng một locator xuất hiện ở nhiều file','Giao diện hay thay đổi'],
  no:['Mới có 2-3 ca test (thêm tầng chỉ tổ rối)','Trang chỉ dùng đúng một lần'],
  notYet:{gi:'component object, screenplay pattern, fixture nâng cao', toiMoc:3,
    dauHieu:'Khi một lớp Page của bạn vượt quá 200 dòng và bạn phải cuộn để tìm phương thức.'},
  next:[{ten:'Locator', vi:'Thứ page object sinh ra để cất giữ.'},
        {ten:'Test Script', vi:'Trở nên ngắn và dễ đọc hẳn sau khi có page object.'},
        {ten:'Test Automation', vi:'Page object là bước trưởng thành đầu tiên của bộ test.'}],
  try:`Mở một file test bạn có (hoặc ví dụ trên mạng), đếm xem cùng một locator xuất hiện mấy lần. Từ 3 lần trở lên là đã đến lúc gom lại.`},

'Flaky Test': { moc:3,
  leak:`<p>Công tắc tiếp xúc kém thì thay là xong. <span class="punch">Flaky test thì nguyên nhân thường không nằm ở test.</span></p>
<p>Nó nằm ở thời gian, ở dữ liệu dùng chung, ở việc hai ca chạy song song giẫm chân nhau, hoặc chính sản phẩm có lỗi đua tranh mà chỉ lộ ra khi máy chậm. Phản xạ sai phổ biến nhất là thêm <code>sleep(5)</code> cho qua chuyện — điều đó giấu lỗi đi chứ không sửa, và có khi bạn vừa che mất một bug thật.</p>`,
  code:`<span class="c">// Chữa triệu chứng — đừng làm thế này</span>
await page.waitForTimeout(5000)

<span class="c">// Chữa nguyên nhân — chờ đúng điều kiện cần</span>
await expect(page.getByTestId(<span class="s">'so-luong-gio'</span>)).toHaveText(<span class="s">'1'</span>)`,
  cap:'Mọi <code>sleep</code> cứng trong bộ test đều là một tờ giấy nợ.',
  yes:['— Không ai muốn có nó. Việc của bạn là tìm ra và diệt.'],
  no:['Cho retry tự động rồi coi như xong: test vẫn dối, chỉ là dối kín hơn'],
  notYet:{gi:'phát hiện flaky tự động, cách ly ca test, thống kê tỉ lệ đỏ theo thời gian', toiMoc:3,
    dauHieu:'Bạn đã ở đúng mốc rồi. Bắt đầu bằng việc ghi lại ca nào đỏ, bao lâu một lần.'},
  next:[{ten:'Wait', vi:'Nguyên nhân số một, và cũng là cách chữa số một.'},
        {ten:'Test Data', vi:'Nguyên nhân số hai: hai ca test dùng chung một tài khoản.'},
        {ten:'CI/CD', vi:'Nơi flaky test lộ ra rõ nhất vì máy CI thường chậm hơn máy bạn.'}],
  try:`Nếu có bộ test trong tay, chạy cùng một ca 10 lần liên tiếp. Nếu không xanh cả 10 lần thì bạn vừa bắt được một con flaky — và nó vẫn ở đó dù hôm nay bạn có nhìn thấy hay không.`},

'Wait': { moc:2,
  leak:`<p>Chờ bếp báo có món nghe rất hợp lý, nhưng <span class="punch">“món đã ra” và “món ăn được” là hai chuyện khác nhau.</span></p>
<p>Phần tử hiện ra không có nghĩa nó bấm được: có thể đang trong animation, đang bị popup che, hoặc vừa hiện xong đã bị React vẽ lại. Chờ đúng thứ cần chờ (dữ liệu đã lên chưa) khó hơn nhiều so với chờ phần tử xuất hiện.</p>`,
  code:`<span class="c">// Chờ mù — chậm và vẫn có thể thiếu</span>
await page.waitForTimeout(3000)

<span class="c">// Chờ theo điều kiện — nhanh và chắc</span>
await expect(page.getByRole(<span class="s">'alert'</span>)).toBeVisible()

<span class="c">// Chờ đúng thứ mình thực sự cần</span>
await page.waitForResponse(r =&gt; r.url().includes(<span class="s">'/api/gio-hang'</span>))`,
  cap:'Ba kiểu chờ, độ tin cậy tăng dần từ trên xuống.',
  yes:['Mọi chỗ trang tải dữ liệu sau khi mở','Sau khi bấm nút gây gọi mạng','Trang có hiệu ứng chuyển động'],
  no:['Chờ cứng theo số giây khi có cách chờ theo điều kiện'],
  notYet:{gi:'tự viết điều kiện chờ, chờ theo trạng thái mạng, đặt timeout riêng từng ca', toiMoc:3,
    dauHieu:'Khi bạn phát hiện mình rải <code>waitForTimeout</code> khắp nơi để “cho chắc”.'},
  next:[{ten:'Flaky Test', vi:'Hậu quả trực tiếp của chờ sai cách.'},
        {ten:'Playwright', vi:'Tự chờ sẵn, đỡ được phần lớn trường hợp thường gặp.'},
        {ten:'Selenium', vi:'Phải tự viết chờ, nên đây là kỹ năng bắt buộc.'}],
  try:`F12 → tab Network → chọn “Slow 3G” rồi tải lại một trang bất kỳ. Mọi chỗ bạn thấy nội dung nhảy vào muộn chính là chỗ test sẽ cần chờ.`},

'Headless': { moc:2,
  leak:`<p>Bếp kín nấu ra cùng món — <span class="punch">nhưng không phải lúc nào cũng vậy.</span></p>
<p>Chế độ headless đôi khi có kích thước cửa sổ khác, thiếu font, hoặc trình duyệt nhận diện được và trả nội dung khác. Kinh điển: test xanh khi mở cửa sổ, đỏ khi chạy headless — hoặc ngược lại. Khi gặp, hãy nghi ngờ kích thước màn hình trước tiên.</p>`,
  code:`<span class="c"># Mặc định là headless</span>
npx playwright test

<span class="c"># Hiện cửa sổ ra xem khi cần gỡ lỗi</span>
npx playwright test --headed --slow-mo=500`,
  cap:'<code>--slow-mo</code> làm chậm từng thao tác để mắt người kịp nhìn.',
  yes:['Chạy trên máy chủ CI không có màn hình','Muốn chạy nhanh hơn và tốn ít máy hơn','Chạy hàng loạt ca cùng lúc'],
  no:['Đang gỡ một ca test khó (bật cửa sổ lên mà nhìn)','Test liên quan tới hiển thị và bố cục'],
  notYet:{gi:'chỉnh viewport, cài font cho container, chụp màn hình lúc lỗi', toiMoc:3,
    dauHieu:'Khi cùng một ca test xanh trên máy bạn nhưng đỏ trên CI, và bạn chưa biết vì sao.'},
  next:[{ten:'CI/CD', vi:'Nơi headless gần như bắt buộc.'},
        {ten:'Test Runner', vi:'Chỗ bật tắt chế độ này.'},
        {ten:'Visual Testing', vi:'Loại test nhạy cảm nhất với khác biệt headless.'}],
  try:`Chưa cần cài gì: thu nhỏ cửa sổ trình duyệt xuống thật hẹp rồi tải lại một trang. Giao diện đổi hẳn đúng không? Máy CI cũng đang nhìn thấy một phiên bản trang khác với bạn như vậy.`},

'Mock': { moc:2,
  leak:`<p>Ma-nơ-canh chỉ đứng yên. Mock thì <strong>có trí nhớ</strong>: nó ghi lại đã bị gọi mấy lần, với tham số gì — và test thường kiểm tra đúng chuyện đó (“hàm gửi mail phải được gọi <em>đúng một lần</em>”). Đây chính là chỗ mock khác stub.</p>
<p>Nguy hiểm hơn: <span class="punch">ma-nơ-canh mặc vừa không có nghĩa khách mặc vừa.</span> API thật đổi định dạng mà mock của bạn vẫn trả dữ liệu cũ → test vẫn xanh trong khi sản phẩm đã hỏng. Càng mock nhiều, bộ test càng đẹp và càng ít nói lên sự thật.</p>`,
  code:`<span class="c">// Chặn lời gọi ra API thật, trả về dữ liệu mình tự đặt</span>
await page.route(<span class="s">'**/api/ty-gia'</span>, route =&gt;
  route.fulfill({ json: { usd: 25000 } })
)

await page.goto(<span class="s">'/bang-gia'</span>)
await expect(page.getByTestId(<span class="s">'gia-usd'</span>)).toHaveText(<span class="s">'25.000'</span>)`,
  cap:'Không có mạng nào bị gọi ra ngoài — trang tưởng mình vừa hỏi server thật.',
  yes:['Thứ thật chậm, tốn tiền, hoặc có hạn mức gọi','Cần dựng tình huống lỗi khó tạo thật (server trả 500, mạng timeout)','Muốn test chạy được cả khi không có internet'],
  no:['Chính chỗ ghép nối đó là thứ bạn cần kiểm tra','Ở tầng E2E — mock ở đây thì test còn lại gần như vô nghĩa'],
  notYet:{gi:'phân biệt spy / fake / dummy, dependency injection, contract testing', toiMoc:3,
    dauHieu:'Khi API thật đã đổi định dạng mà bộ test của bạn vẫn xanh hết. Lúc đó mock đã lệch khỏi thực tế.'},
  next:[{ten:'Stub', vi:'Bản giả đơn giản hơn, không có trí nhớ — hiểu stub xong thì ranh giới rõ hẳn.'},
        {ten:'Test Data', vi:'Dữ liệu nhét vào mock phải dựng lại được y hệt mỗi lần chạy.'},
        {ten:'Flaky Test', vi:'Mock đặt sai chỗ là nguồn gây test chập chờn phổ biến.'}],
  try:`Mở một trang web bất kỳ, F12 → Network. Chuột phải một request → <strong>Block request URL</strong>, tải lại trang. Bạn vừa làm phiên bản thô sơ nhất của mock: chặn thứ thật để xem trang xoay xở ra sao.`},

'Stub': { moc:2,
  leak:`<p>Đoạn ghi âm tổng đài phát mãi một câu — <span class="punch">và đó chính là giới hạn thật của stub.</span></p>
<p>Nếu test của bạn cần biết “hàm đó có được gọi không, gọi mấy lần, với tham số gì” thì stub chịu, phải dùng mock. Nhưng nếu chỉ cần “có dữ liệu để chạy tiếp” thì stub đơn giản hơn nhiều và ít làm test dính chặt vào chi tiết cài đặt.</p>`,
  code:`<span class="c">// Stub: hỏi gì cũng trả đúng một câu</span>
const layTyGia = async () =&gt; 25000

<span class="c">// Mock: có trí nhớ, kiểm tra được</span>
const layTyGia = jest.fn(async () =&gt; 25000)
expect(layTyGia).toHaveBeenCalledTimes(1)`,
  cap:'Khác nhau đúng một chỗ: dòng cuối. Stub không kiểm tra được điều đó.',
  yes:['Chỉ cần dữ liệu để chạy tiếp, không quan tâm nó bị gọi thế nào','Muốn test đơn giản, ít dính vào chi tiết cài đặt'],
  no:['Cần kiểm tra hàm có được gọi đúng cách không (lúc đó dùng mock)'],
  notYet:{gi:'fake (bản giả có logic thật thu nhỏ), in-memory database', toiMoc:3,
    dauHieu:'Khi stub của bạn bắt đầu phải có <code>if</code> để trả về giá trị khác nhau tuỳ đầu vào.'},
  next:[{ten:'Mock', vi:'Bản có trí nhớ — so hai cái là hiểu ngay ranh giới.'},
        {ten:'Unit Test', vi:'Nơi stub được dùng nhiều nhất.'},
        {ten:'Test Data', vi:'Giá trị stub trả về nên lấy từ dữ liệu mẫu thật.'}],
  try:`F12 → Console:
<pre class="code">const layGio = () =&gt; <span class="s">'09:00'</span>
layGio()</pre>
Bạn vừa viết một stub: một hàm luôn trả về đúng một giá trị, để phần code phía sau có cái mà chạy.`},

'Test Data': { moc:1,
  leak:`<p>Bột và trứng dùng xong là hết. <span class="punch">Dữ liệu test thì ở lại</span> — và ca test sau sẽ vấp phải nó.</p>
<p>Kinh điển: ca test tạo tài khoản <code>na@vd.com</code>, chạy lần hai thì đỏ vì email đã tồn tại. Dữ liệu test phải <em>dựng lại được</em> và <em>dọn sạch được</em>, nếu không bộ test của bạn chỉ xanh đúng lần chạy đầu tiên trên máy mới.</p>`,
  code:`<span class="c">// Dễ vỡ — chạy lần hai là đỏ</span>
await taoTaiKhoan(<span class="s">'na@vd.com'</span>)

<span class="c">// Bền — mỗi lần chạy một email khác nhau</span>
await taoTaiKhoan(<span class="s">\`na+\${Date.now()}@vd.com\`</span>)`,
  cap:'Mẹo đơn giản mà cứu được rất nhiều ca: gắn thêm dấu thời gian vào dữ liệu.',
  yes:['Mọi ca test cần dữ liệu đầu vào','Cần tình huống cụ thể: đơn hàng đã huỷ, tài khoản bị khoá'],
  no:['Dùng dữ liệu thật của khách hàng (vừa nguy hiểm vừa vi phạm quyền riêng tư)','Dùng chung một tài khoản cho mọi ca test'],
  notYet:{gi:'factory sinh dữ liệu, seed tự động, dọn dữ liệu sau mỗi ca', toiMoc:3,
    dauHieu:'Khi bạn phải vào database xoá tay dữ liệu rác trước mỗi lần chạy bộ test.'},
  next:[{ten:'Test Environment', vi:'Nơi dữ liệu test được phép tồn tại.'},
        {ten:'Flaky Test', vi:'Dữ liệu dùng chung là nguyên nhân flaky phổ biến thứ nhì.'},
        {ten:'Mock', vi:'Cách tránh phải dựng dữ liệu thật.'}],
  try:`F12 → Console:
<pre class="code"><span class="s">\`na+\${Date.now()}@vd.com\`</span></pre>
Gõ lại lần nữa, ra email khác. Đó là cách đơn giản nhất để ca test chạy được nhiều lần.`},

'Test Coverage': { moc:1,
  leak:`<p>Quét nhà: đi hết phòng chưa chắc đã sạch. Với coverage thì tệ hơn — <span class="punch">chỉ tiêu coverage cao còn khiến người ta viết test dối.</span></p>
<p>Ép chỉ tiêu 80% thì đội sẽ viết test gọi hàm mà không kiểm tra gì cả, chỉ để dòng code được “chạy qua”. Coverage là <em>chỉ báo</em>, không phải <em>mục tiêu</em>. Nó chỉ nói chắc chắn một điều: phần chưa được chạm tới thì chắc chắn chưa được test.</p>`,
  code:`<span class="c"># Đo coverage</span>
npx jest --coverage

File        | % Stmts | % Branch |
------------|---------|----------|
tinhTien.js |   100   |    50    |  <span class="c">← chạy hết dòng, mới nửa nhánh if</span>`,
  cap:'Cột <strong>Branch</strong> đáng tin hơn cột Stmts nhiều — nó đếm các nhánh <code>if</code> đã đi qua.',
  yes:['Tìm vùng code chưa ai test','Theo dõi xu hướng qua thời gian (đang tăng hay giảm)'],
  no:['Đặt thành KPI ép đội đạt cho bằng được','Coi 100% coverage là code không còn bug'],
  notYet:{gi:'mutation testing, coverage theo vùng thay đổi, cổng chặn trong CI', toiMoc:3,
    dauHieu:'Khi coverage 90% mà lỗi production vẫn đều đặn — lúc đó cần mutation testing để biết test có thực sự bắt lỗi không.'},
  next:[{ten:'Unit Test', vi:'Loại test đóng góp nhiều nhất vào coverage.'},
        {ten:'Test Report', vi:'Coverage thường nằm chung trong báo cáo.'},
        {ten:'Assertion', vi:'Test không có assertion vẫn tính coverage — đó là lỗ hổng lớn nhất.'}],
  try:`Nghĩ về một hàm có <code>if/else</code>. Viết một ca test đi vào nhánh <code>if</code>. Coverage dòng có thể đã 100%, nhưng nhánh <code>else</code> chưa ai bước vào bao giờ. Đó là khoảng cách giữa hai con số.`},

'CI/CD': { moc:3,
  leak:`<p>Băng chuyền nhà máy chạy đều. <span class="punch">Pipeline thì hỏng suốt</span> — và thường hỏng vì lý do chẳng liên quan gì tới code bạn vừa sửa.</p>
<p>Máy CI sạch hơn máy bạn (không có dữ liệu cũ), chậm hơn (nên lộ hết flaky test), và khác múi giờ. “Chạy được ở máy tôi” là câu nói kinh điển đúng vào lúc CI đỏ.</p>`,
  code:`<span class="c"># .github/workflows/test.yml</span>
on: [push]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npm ci
      - run: npx playwright test`,
  cap:'Mỗi lần đẩy code là chạy lại toàn bộ. Không ai phải nhớ bấm nút.',
  yes:['Nhiều người cùng sửa một dự án','Muốn biết ngay khi có người làm hỏng cái cũ','Phát hành thường xuyên'],
  no:['Dự án một người, chạy tay vẫn kịp','Bộ test còn quá chập chờn — CI sẽ đỏ liên miên rồi cả đội mất niềm tin'],
  notYet:{gi:'ma trận nhiều môi trường, cache dependency, chia shard, tự rollback', toiMoc:3,
    dauHieu:'Khi pipeline chạy quá 20 phút và cả đội bắt đầu ngồi chờ nhau.'},
  next:[{ten:'Deploy', vi:'Phần CD — đưa lên môi trường thật sau khi test đạt.'},
        {ten:'Headless', vi:'Chế độ bắt buộc để test chạy được trên máy CI.'},
        {ten:'Flaky Test', vi:'CI là nơi flaky test lộ mặt rõ nhất.'}],
  try:`Vào một repo mã nguồn mở bất kỳ trên GitHub, bấm tab <strong>Actions</strong>. Bạn đang nhìn CI của họ chạy thật — mở một lần chạy đỏ ra xem log, đó đúng là thứ bạn sẽ đọc hàng ngày.`},

'TDD': { moc:2,
  leak:`<p>Dựng khuôn trước rồi đổ bột — hay, nhưng <span class="punch">chỉ làm được khi bạn đã biết cái bánh trông thế nào.</span></p>
<p>TDD hợp với logic đã rõ yêu cầu (tính tiền, kiểm tra dữ liệu). Nó vướng khi bạn đang dò tìm giải pháp, đang thử giao diện, hay đang tích hợp với thứ chưa hiểu rõ. TDD là một công cụ, không phải một tôn giáo — và người bán khoá học hay quên nói vế sau.</p>`,
  code:`<span class="c">// 1. Đỏ — viết test cho hàm chưa tồn tại</span>
expect(tinhThue(1000)).toBe(100)

<span class="c">// 2. Xanh — viết vừa đủ để nó chạy</span>
const tinhThue = t =&gt; t * 0.1

<span class="c">// 3. Dọn — sửa cho gọn, test vẫn phải xanh</span>`,
  cap:'Đỏ → Xanh → Dọn. Vòng lặp chỉ nên mất vài phút mỗi lần.',
  yes:['Logic nghiệp vụ đã rõ yêu cầu','Nhiều trường hợp biên cần chốt trước','Đang sửa code cũ và muốn có lưới an toàn'],
  no:['Đang thử nghiệm, chưa biết mình muốn gì','Code giao diện thuần trang trí'],
  notYet:{gi:'TDD ở tầng tích hợp, kiến trúc hexagonal, London vs Chicago school', toiMoc:3,
    dauHieu:'Khi bạn muốn áp TDD cho một hàm gọi 4 dịch vụ bên ngoài và không biết bắt đầu từ đâu.'},
  next:[{ten:'Unit Test', vi:'Loại test TDD dùng chủ yếu.'},
        {ten:'BDD', vi:'Cùng tinh thần nhưng viết ở tầng hành vi, ai cũng đọc được.'},
        {ten:'Test Case', vi:'Biết viết ca test rõ ràng là điều kiện cần của TDD.'}],
  try:`Lấy giấy, viết ra kết quả mong đợi của một hàm tính giảm giá trước khi nghĩ tới cách viết nó: <em>1000 giảm 10% ra 900</em>. Bạn vừa làm bước Đỏ của TDD mà không cần máy.`},

'BDD': { moc:1,
  leak:`<p>Ai nghe cũng gật — nhưng <span class="punch">gật không có nghĩa là hiểu giống nhau.</span></p>
<p>BDD chỉ có giá trị nếu người làm nghiệp vụ <em>thật sự</em> ngồi vào viết cùng. Nếu chỉ có tester tự viết Given/When/Then rồi tự đọc, bạn đã tốn thêm một lớp cú pháp mà chẳng ai ngoài bạn đọc. Đây là lý do phần lớn dự án BDD thất bại: giữ lại phần hình thức, bỏ mất phần trò chuyện.</p>`,
  code:`Tính năng: Đăng nhập

  Kịch bản: Sai mật khẩu
    Cho trước  tài khoản na@vd.com đã tồn tại
    Khi        tôi đăng nhập bằng mật khẩu sai
    Thì        tôi thấy thông báo "Sai email hoặc mật khẩu"`,
  cap:'Người làm nghiệp vụ đọc được, sửa được — đó mới là mục đích.',
  yes:['Nghiệp vụ phức tạp, dev và BA hay hiểu lệch nhau','Có người làm nghiệp vụ chịu ngồi viết cùng'],
  no:['Chỉ tester tự viết tự đọc','Nghiệp vụ đơn giản, viết ca test thường là đủ'],
  notYet:{gi:'nối bước với code (step definition), tham số hoá kịch bản, sinh tài liệu sống', toiMoc:2,
    dauHieu:'Khi cả đội đã đồng ý dùng Gherkin và bạn cần biến các dòng đó thành test chạy được.'},
  next:[{ten:'Gherkin', vi:'Cú pháp cụ thể để viết kịch bản BDD.'},
        {ten:'Test Case', vi:'Cùng mục đích, khác cách trình bày.'},
        {ten:'TDD', vi:'Anh em cùng tinh thần, ở tầng kỹ thuật hơn.'}],
  try:`Lấy một tính năng đang làm, viết đúng ba dòng Cho trước / Khi / Thì. Rồi đưa cho một người không làm kỹ thuật đọc. Nếu họ sửa được một chữ, BDD đang có tác dụng.`},

'Gherkin': { moc:1,
  leak:`<p>Công thức nấu ăn thì đọc là làm được. Gherkin thì <span class="punch">mỗi dòng phải có một đoạn code đứng sau nó</span>, và đoạn code đó ai đó phải viết.</p>
<p>Viết Gherkin mất 2 phút, viết step definition cho nó mất 2 giờ. Đó là chi phí ẩn khiến nhiều đội bỏ giữa chừng. Và nếu mỗi kịch bản dùng một cách diễn đạt khác nhau, số bước cần code sẽ phình không kiểm soát.</p>`,
  code:`<span class="c"># Kịch bản</span>
Khi tôi đăng nhập bằng mật khẩu sai

<span class="c">// Đoạn code đứng sau nó — phần tốn công</span>
When(<span class="s">'tôi đăng nhập bằng mật khẩu sai'</span>, async () =&gt; {
  await page.getByLabel(<span class="s">'Mật khẩu'</span>).fill(<span class="s">'sai'</span>)
  await page.getByRole(<span class="s">'button'</span>, { name:<span class="s">'Đăng nhập'</span> }).click()
})`,
  cap:'Mẹo sống còn: dùng lại y nguyên câu chữ giữa các kịch bản để tái dùng được bước.',
  yes:['Đã chọn làm BDD và có người nghiệp vụ tham gia','Cần tài liệu mà đọc xong chạy được luôn'],
  no:['Chỉ đội kỹ thuật dùng với nhau','Chưa đủ người để nuôi lớp step definition'],
  notYet:{gi:'Scenario Outline, bảng dữ liệu, hook, gắn thẻ kịch bản', toiMoc:2,
    dauHieu:'Khi bạn có 8 kịch bản giống hệt nhau chỉ khác mỗi con số.'},
  next:[{ten:'BDD', vi:'Phương pháp mà Gherkin phục vụ.'},
        {ten:'Test Script', vi:'Step definition thực chất là test script.'},
        {ten:'Test Case', vi:'Gherkin là một cách trình bày ca test.'}],
  try:`Viết lại ca test “đăng nhập sai mật khẩu” của bạn thành đúng 3 dòng Cho trước / Khi / Thì. Đếm xem có bao nhiêu từ mà máy sẽ phải hiểu — đó là số bước bạn sắp phải code.`},

'Test Report': { moc:1,
  leak:`<p>Bảng điểm chỉ có điểm. <span class="punch">Test report tốt phải trả lời được câu “vì sao trượt”</span>, không chỉ “trượt mấy ca”.</p>
<p>Report chỉ hiện “12 fail” là gần như vô dụng — người đọc vẫn phải chạy lại tay để biết chuyện gì. Cái đáng tiền là ảnh chụp màn hình lúc lỗi, video, và trace tua lại được từng bước.</p>`,
  code:`<span class="c"># Mở báo cáo sau khi chạy</span>
npx playwright show-report

<span class="c"># Bật trace để tua lại từng bước khi ca test đỏ</span>
<span class="c"># playwright.config.js</span>
use: { trace: <span class="s">'on-first-retry'</span>, screenshot: <span class="s">'only-on-failure'</span> }`,
  cap:'Hai dòng cấu hình này tiết kiệm hàng giờ điều tra mỗi tuần.',
  yes:['Sau mỗi lần chạy bộ test','Cần báo cáo cho người không chạy test','Điều tra ca đỏ trên CI'],
  no:['Chỉ nhìn con số pass/fail rồi kết luận chất lượng'],
  notYet:{gi:'gộp báo cáo nhiều lần chạy, thống kê xu hướng, tự gửi Slack', toiMoc:3,
    dauHieu:'Khi bạn cần biết ca nào đỏ nhiều nhất trong tháng chứ không chỉ trong lần chạy này.'},
  next:[{ten:'Test Runner', vi:'Thứ sinh ra báo cáo.'},
        {ten:'Flaky Test', vi:'Báo cáo theo thời gian là cách duy nhất phát hiện flaky.'},
        {ten:'CI/CD', vi:'Nơi báo cáo được sinh tự động sau mỗi lần đẩy code.'}],
  try:`Vào một repo mã nguồn mở có CI trên GitHub, mở tab Actions, chọn một lần chạy đỏ. Đọc log tìm dòng đầu tiên báo lỗi. Đó chính là kỹ năng đọc test report.`},

'Test Environment': { moc:1,
  leak:`<p>Sân tập cùng kích thước sân thật — <span class="punch">nhưng môi trường test gần như không bao giờ giống thật.</span></p>
<p>Ít dữ liệu hơn (nên nhanh hơn giả tạo), cấu hình khác, phiên bản dịch vụ ngoài khác. Đó là lý do có lỗi chỉ xuất hiện trên production. Càng gần thật càng tốt, nhưng phải chấp nhận không bao giờ bằng — và biết chỗ nào đang khác.</p>`,
  code:`<span class="c"># Mỗi môi trường một cấu hình</span>
BASE_URL=https://staging.vd.com   <span class="c"># test</span>
BASE_URL=https://vd.com           <span class="c"># thật</span>

<span class="c">// Test không hardcode tên miền</span>
await page.goto(<span class="s">'/gio-hang'</span>)  <span class="c">// tự ghép với BASE_URL</span>`,
  cap:'Đừng viết cứng tên miền trong test — đó là thứ khiến bộ test chỉ chạy được ở một nơi.',
  yes:['Cần test mà không đụng dữ liệu người dùng thật','Nhiều người cùng test song song','Cần dựng lại trạng thái sạch trước mỗi lần chạy'],
  no:['Test thẳng trên production (trừ vài ca giám sát có kiểm soát)'],
  notYet:{gi:'môi trường tạm theo từng nhánh, Docker Compose, quản lý bí mật', toiMoc:3,
    dauHieu:'Khi hai người test cùng lúc và giẫm chân nhau trên cùng một môi trường.'},
  next:[{ten:'Test Data', vi:'Thứ sống trong môi trường test.'},
        {ten:'Deploy', vi:'Cách code lên được môi trường test.'},
        {ten:'CI/CD', vi:'Nơi môi trường test hay được dựng tự động.'}],
  try:`Hỏi đội bạn: “môi trường staging khác production ở những điểm nào?” Nếu không ai trả lời được đầy đủ, bạn vừa tìm ra một nguồn lỗi production tiềm tàng.`},

'API Testing': { moc:2,
  leak:`<p>Hỏi thẳng nhà bếp thì nhanh thật, nhưng <span class="punch">bếp làm đúng không có nghĩa khách nhận đúng.</span></p>
<p>API trả về dữ liệu chuẩn mà giao diện hiển thị sai định dạng ngày, hoặc nút bị che mất — API test không bắt được. Nó rẻ và ổn định, nên nên chiếm phần lớn bộ test; nhưng vẫn cần vài ca E2E để chắc phần khách nhìn thấy cũng đúng.</p>`,
  code:`const res = await request.post(<span class="s">'/api/dang-nhap'</span>, {
  data: { email:<span class="s">'na@vd.com'</span>, matKhau:<span class="s">'sai'</span> }
})

expect(res.status()).toBe(401)
expect(await res.json()).toMatchObject({ loi: <span class="s">'Sai thông tin đăng nhập'</span> })`,
  cap:'Chạy trong vài chục mili giây, không mở trình duyệt. Rẻ hơn E2E khoảng 100 lần.',
  yes:['Kiểm tra logic nghiệp vụ và các trường hợp lỗi','Cần test nhanh và ổn định','Giao diện chưa làm xong nhưng API đã có'],
  no:['Cần kiểm tra thứ người dùng nhìn thấy','Vấn đề nằm ở bố cục hoặc thao tác trên giao diện'],
  notYet:{gi:'kiểm tra schema, contract testing, test chuỗi nhiều bước có trạng thái', toiMoc:3,
    dauHieu:'Khi backend đổi kiểu một trường và test của bạn vẫn xanh vì chỉ kiểm tra status 200.'},
  next:[{ten:'API', vi:'Hiểu API là gì trước đã.'},
        {ten:'Integration Test', vi:'API test là dạng phổ biến nhất của nó.'},
        {ten:'Mock', vi:'Mặt còn lại: giả lập API thay vì gọi thật.'}],
  try:`F12 → Console, trên trang bất kỳ:
<pre class="code">await fetch(<span class="s">'/api/khong-ton-tai'</span>).then(r =&gt; r.status)</pre>
Bạn vừa gọi API và kiểm tra mã trạng thái — đúng việc mà API test làm.`},

'Load Test': { moc:3,
  leak:`<p>Cho đoàn xe tải chạy lên cầu — nhưng <span class="punch">1000 người dùng ảo không giống 1000 người thật.</span></p>
<p>Người thật vào rải rác, thao tác khác nhau, có người bỏ giữa chừng, dùng mạng yếu. Công cụ load test bắn đều tăm tắp từ một chỗ, nên dễ ra kết quả đẹp hơn hoặc xấu hơn thực tế. Con số load test là để <em>so sánh giữa các lần</em>, đừng đọc nó như lời tiên tri.</p>`,
  code:`<span class="c">// k6 — tăng dần lên 100 người trong 30 giây</span>
export const options = {
  stages: [{ duration: <span class="s">'30s'</span>, target: 100 }]
}
export default function () {
  http.get(<span class="s">'https://vd.com/san-pham'</span>)
}`,
  cap:'Đo hai thứ: thời gian phản hồi và tỉ lệ lỗi. Ngưỡng chịu tải là chỗ hai đường này gãy.',
  yes:['Sắp có đợt cao điểm: sale, tuyển sinh, ra mắt','Vừa đổi hạ tầng hoặc tối ưu lớn','Cần biết ngưỡng chịu tải trước khi khách phát hiện ra'],
  no:['Chạy trên production giờ cao điểm','Hệ thống còn đang thay đổi kiến trúc từng tuần'],
  notYet:{gi:'soak test, spike test, đọc biểu đồ phân vị p95/p99, phân tích nút thắt', toiMoc:3,
    dauHieu:'Bạn đã ở mốc này rồi nếu đang lo về ngày sale. Bắt đầu bằng việc đo trạng thái bình thường để có mốc so sánh.'},
  next:[{ten:'Cache', vi:'Vũ khí số một để chịu tải cao.'},
        {ten:'Server', vi:'Thứ đang bị bạn ép tới giới hạn.'},
        {ten:'Test Environment', vi:'Load test phải chạy ở môi trường riêng, không phải production.'}],
  try:`F12 → Network → chọn “Slow 3G”, tải lại một trang. Bạn vừa thấy trải nghiệm của người dùng lúc hệ thống quá tải — chậm cũng là một dạng hỏng.`},

'Visual Testing': { moc:3,
  leak:`<p>Trò tìm điểm khác nhau — nhưng <span class="punch">máy không phân biệt được “khác” và “sai”.</span></p>
<p>Đổi font một chút, con trỏ nhấp nháy, quảng cáo khác, ảnh chưa tải xong: tất cả đều bị báo là khác. Visual test nổi tiếng ồn ào, và đội nào cũng phải đi qua giai đoạn duyệt hàng loạt ảnh khác biệt vô nghĩa trước khi nó thành hữu ích.</p>`,
  code:`<span class="c">// Lần đầu: lưu ảnh chuẩn. Lần sau: so với nó</span>
await expect(page).toHaveScreenshot(<span class="s">'trang-chu.png'</span>, {
  maxDiffPixelRatio: 0.01,
  mask: [page.getByTestId(<span class="s">'quang-cao'</span>)]   <span class="c">// che vùng hay đổi</span>
})`,
  cap:'<code>mask</code> là thứ cứu bạn: che những vùng vốn dĩ luôn thay đổi.',
  yes:['Thư viện thành phần giao diện dùng chung nhiều nơi','Trang marketing mà bố cục là sản phẩm','Sau khi nâng cấp thư viện CSS'],
  no:['Trang có nội dung động liên tục (bảng giá, tin tức)','Đội chưa đủ người để duyệt ảnh khác biệt mỗi lần chạy'],
  notYet:{gi:'so sánh theo thành phần, dịch vụ visual trên cloud, duyệt khác biệt theo nhánh', toiMoc:3,
    dauHieu:'Khi bạn đã chán ngán việc mỗi lần chạy lại phải duyệt 30 ảnh khác biệt mà 29 cái vô hại.'},
  next:[{ten:'E2E Test', vi:'Nơi visual test thường được gắn kèm.'},
        {ten:'Headless', vi:'Chế độ headless hay làm ảnh lệch — nguồn nhiễu số một.'},
        {ten:'UI/UX', vi:'Thứ visual test đang bảo vệ.'}],
  try:`Mở cùng một trang trên Chrome và Firefox, chụp màn hình cả hai rồi đặt cạnh nhau. Đếm điểm khác biệt. Đó chính xác là thứ visual test phải xử lý mỗi ngày.`},

'QA': { moc:1,
  leak:`<p>Bên an toàn thực phẩm kiểm cả quy trình — nhưng <span class="punch">QA không phải người gác cổng có quyền chặn.</span></p>
<p>Ở nhiều đội, QA bị hiểu thành “người bấm nút cuối cùng trước khi phát hành”, và thành nơi đổ lỗi khi có sự cố. QA đúng nghĩa là làm chất lượng thành việc của <em>cả đội</em> — đặt câu hỏi từ lúc còn đang bàn yêu cầu, chứ không phải đứng cuối dây chuyền bắt lỗi.</p>`,
  code:`<span class="c">QC (kiểm soát): sản phẩm làm xong rồi — có lỗi không?</span>
<span class="c">QA (đảm bảo): quy trình đang chạy thế nào — sao để lỗi đừng sinh ra?</span>

Ví dụ việc của QA:
  · Đọc yêu cầu và hỏi "trường hợp này thì sao?" trước khi dev code
  · Đề xuất gắn data-testid ngay từ lúc thiết kế
  · Dựng bộ smoke test chạy tự động sau mỗi lần deploy`,
  cap:'Câu hỏi đúng lúc bàn yêu cầu rẻ hơn một bug tìm ra ở production khoảng trăm lần.',
  yes:['Từ lúc bắt đầu bàn yêu cầu, không phải lúc sắp phát hành','Khi cùng một loại lỗi lặp lại nhiều lần'],
  no:['Chỉ được gọi vào ở khâu cuối để “test hộ”','Bị coi là người duy nhất chịu trách nhiệm chất lượng'],
  notYet:{gi:'chiến lược test, quản lý rủi ro, chỉ số chất lượng, shift-left', toiMoc:2,
    dauHieu:'Khi bạn phải trả lời câu “test bao nhiêu là đủ?” trước cả đội và không biết dựa vào đâu.'},
  next:[{ten:'Test Case', vi:'Công cụ hàng ngày của QA.'},
        {ten:'Bug', vi:'Thứ QA muốn ngăn từ đầu chứ không phải đi nhặt.'},
        {ten:'Test Automation', vi:'Cách QA nhân sức mình lên nhiều lần.'}],
  try:`Lần tới trong buổi họp bàn tính năng mới, hỏi đúng một câu: “nếu người dùng làm việc này hai lần liên tiếp thì sao?” Bạn vừa làm đúng công việc của QA, trước khi có dòng code nào.`},

// ══════════════ NỀN TẢNG ══════════════

'API': { moc:1,
  leak:`<p>Người phục vụ nhớ bàn nào gọi món gì. <span class="punch">API thì mặc định quên sạch sau mỗi lần gọi.</span></p>
<p>Mỗi request là một cuộc gặp mới hoàn toàn: bạn phải tự khai lại mình là ai (token) mỗi lần. Đó là lý do có đăng nhập, có API key, có session — toàn bộ những thứ đó sinh ra chỉ để bù cho việc người phục vụ này bị mất trí nhớ sau mỗi câu.</p>`,
  code:`<span class="c"># Gọi: cho tôi thông tin người dùng số 7</span>
GET /api/nguoi-dung/7
Authorization: Bearer eyJhbGc...   <span class="c"># tự khai lại mình là ai</span>

<span class="c"># Trả về</span>
200 OK
{ "id": 7, "ten": "Na", "email": "na@vd.com" }`,
  cap:'Bốn phần luôn có: <strong>gọi cái gì · kèm giấy tờ gì · mã trạng thái · dữ liệu trả về</strong>.',
  yes:['Cần lấy dữ liệu từ hệ thống khác','Muốn tách giao diện khỏi phần xử lý','Cho bên thứ ba dùng dịch vụ của mình'],
  no:['Hai đoạn code nằm cùng một chương trình (gọi thẳng hàm nhanh hơn)','Dữ liệu tĩnh không bao giờ đổi'],
  notYet:{gi:'REST khác GraphQL, phiên bản API, giới hạn tần suất, webhook', toiMoc:2,
    dauHieu:'Khi bạn thấy một trang phải gọi 12 API chỉ để hiển thị xong một màn hình.'},
  next:[{ten:'Server', vi:'Nơi API sống và trả lời.'},
        {ten:'API Testing', vi:'Cách kiểm tra API mà không cần mở giao diện.'},
        {ten:'Backend', vi:'Nơi API được viết ra và quyết định trả về gì.'}],
  try:`F12 → Console, gọi thử một API công khai:
<pre class="code">await fetch(<span class="s">'https://api.github.com/users/github'</span>).then(r =&gt; r.json())</pre>
Bạn vừa gọi API thật và nhận về dữ liệu thật.`},

'Database': { moc:1,
  leak:`<p>Tủ hồ sơ thì lấy ra là xong. Database <span class="punch">phải trả lời hàng nghìn người cùng lúc, trong đó có người đang sửa đúng tờ hồ sơ người khác đang đọc.</span></p>
<p>Phần khó nhất của database không phải lưu, mà là xử lý chuyện đó cho không ai đọc nhầm và không mất dữ liệu. Đó là lý do sinh ra transaction, khoá, và cả một ngành nghề riêng.</p>`,
  code:`<span class="c">-- Lấy 5 đơn hàng mới nhất của khách số 7</span>
SELECT ma_don, tong_tien, ngay_tao
FROM don_hang
WHERE khach_id = 7
ORDER BY ngay_tao DESC
LIMIT 5;`,
  cap:'SQL đọc gần như tiếng Anh: <em>chọn gì · từ bảng nào · lọc điều kiện · sắp xếp · lấy bao nhiêu</em>.',
  yes:['Dữ liệu cần tồn tại sau khi tắt máy','Cần tìm kiếm và lọc nhanh trong lượng lớn dữ liệu','Nhiều người cùng đọc ghi'],
  no:['Dữ liệu tạm chỉ dùng trong một lần chạy','Vài dòng cấu hình (file là đủ)'],
  notYet:{gi:'index, transaction, chuẩn hoá, SQL khác NoSQL, sao lưu và phục hồi', toiMoc:2,
    dauHieu:'Khi một câu truy vấn chạy 8 giây và bạn không biết vì sao nó chậm.'},
  next:[{ten:'Cache', vi:'Lớp đứng trước database để nó đỡ phải làm việc.'},
        {ten:'Backend', vi:'Nơi viết các câu truy vấn.'},
        {ten:'Test Data', vi:'Dữ liệu bạn nhét vào database khi test.'}],
  try:`Mở F12 → tab Application → Local Storage trên một trang bạn hay dùng. Đó là một database tí hon ngay trong trình duyệt bạn, đang lưu thật.`},

'Server': { moc:1,
  leak:`<p>Quầy bếp luôn mở — nhưng <span class="punch">“server” ngày nay thường không phải một cái máy nào cả.</span></p>
<p>Nó có thể là hàng chục máy ảo tự sinh ra tự mất đi theo lượng khách, hoặc một hàm chạy đúng 200 mili giây rồi biến mất (serverless). Hình dung “một cái máy đứng đâu đó” giúp bạn bắt đầu, nhưng sẽ vướng khi nghe tới auto-scaling hay container.</p>`,
  code:`<span class="c">// Một server tối giản bằng Node.js</span>
import http from <span class="s">'http'</span>

http.createServer((req, res) =&gt; {
  res.end(<span class="s">'Chào bạn'</span>)
}).listen(3000)

<span class="c">// Mở trình duyệt vào localhost:3000 là thấy</span>`,
  cap:'Bốn dòng. Server thực chất chỉ là một chương trình ngồi chờ và trả lời.',
  yes:['Cần chỗ chạy code liên tục để phục vụ người dùng','Cần nơi giữ dữ liệu chung cho mọi người','Xử lý việc nặng mà máy người dùng không kham nổi'],
  no:['Trang tĩnh thuần (dùng hosting tĩnh rẻ hơn nhiều)','Việc chỉ chạy một lần rồi thôi'],
  notYet:{gi:'cân bằng tải, container, tự co giãn, serverless', toiMoc:3,
    dauHieu:'Khi trang của bạn sập vào đúng giờ đông người và bạn không biết thêm máy kiểu gì.'},
  next:[{ten:'Cloud', vi:'Cách thuê server mà không phải mua máy.'},
        {ten:'API', vi:'Cách người ngoài nói chuyện với server.'},
        {ten:'Deploy', vi:'Cách đưa code lên server.'}],
  try:`F12 → Network, tải lại một trang. Cột <em>Time</em> cho biết server mất bao lâu để trả lời bạn. Trên 500ms là người dùng bắt đầu thấy chậm.`},

'Frontend': { moc:1,
  leak:`<p>Mặt tiền cửa hàng thì chỉ để trưng bày. <span class="punch">Frontend hiện đại chứa rất nhiều logic thật</span> — tính tiền, kiểm tra dữ liệu, lưu tạm khi mất mạng.</p>
<p>Hệ quả quan trọng với người test: <strong>mọi thứ ở frontend đều sửa được bằng F12.</strong> Kiểm tra dữ liệu ở frontend chỉ để người dùng đỡ bực, không phải để bảo mật. Backend vẫn phải kiểm lại tất cả.</p>`,
  code:`<span class="c">&lt;!-- Nhìn thấy được, sửa được bằng F12 --&gt;</span>
&lt;button disabled&gt;Mua ngay&lt;/button&gt;

<span class="c">// Gõ dòng này trong Console là nút bấm được ngay</span>
document.querySelector(<span class="s">'button'</span>).disabled = false`,
  cap:'Đây là lý do không bao giờ được tin dữ liệu do frontend gửi lên.',
  yes:['Mọi thứ người dùng nhìn thấy và bấm vào','Phản hồi tức thì không cần chờ server'],
  no:['Kiểm tra bảo mật hoặc quyền hạn','Tính toán liên quan tới tiền bạc (làm lại ở backend)'],
  notYet:{gi:'React/Vue, quản lý trạng thái, render phía máy chủ, đóng gói', toiMoc:2,
    dauHieu:'Khi bạn cần biết vì sao trang hiện dữ liệu cũ dù server đã trả về dữ liệu mới.'},
  next:[{ten:'Backend', vi:'Nửa còn lại, nơi kiểm tra thật sự diễn ra.'},
        {ten:'UI/UX', vi:'Phần quyết định frontend có dễ dùng hay không.'},
        {ten:'Locator', vi:'Cách automation bám vào frontend.'}],
  try:`F12 → Elements, chuột phải một dòng chữ bất kỳ → Edit text, gõ gì đó. Trang đổi ngay. Tải lại là mất — vì bạn chỉ vừa sửa bản sao trong máy mình.`},

'Backend': { moc:1,
  leak:`<p>Kho và sổ sách của cửa hàng — nhưng <span class="punch">backend còn là nơi duy nhất được phép nói “không”.</span></p>
<p>Frontend chỉ gợi ý và làm đẹp. Mọi câu hỏi thật sự quan trọng — người này có quyền xem đơn hàng kia không, số dư có đủ không — chỉ backend trả lời mới tính. Vì frontend nằm trong tay người dùng, còn backend thì không.</p>`,
  code:`<span class="c">// Backend luôn phải kiểm lại, dù frontend đã kiểm</span>
app.post(<span class="s">'/don-hang'</span>, (req, res) =&gt; {
  if (!nguoiDungHopLe(req)) return res.status(401).json({ loi:<span class="s">'Chưa đăng nhập'</span> })
  if (req.body.soLuong &lt; 1)  return res.status(400).json({ loi:<span class="s">'Số lượng không hợp lệ'</span> })
  ...
})`,
  cap:'Hai dòng kiểm tra này frontend cũng có — nhưng chỉ dòng ở đây mới thật sự chặn được.',
  yes:['Xử lý nghiệp vụ và quy tắc','Đọc ghi dữ liệu','Kiểm tra quyền và bảo mật'],
  no:['Hiệu ứng giao diện thuần trang trí','Việc frontend làm được ngay mà không cần dữ liệu chung'],
  notYet:{gi:'kiến trúc microservice, hàng đợi, xử lý nền, mở rộng theo chiều ngang', toiMoc:3,
    dauHieu:'Khi một chức năng chạy 30 giây và bạn cần nó chạy nền để người dùng không phải ngồi chờ.'},
  next:[{ten:'API', vi:'Cửa ra vào của backend.'},
        {ten:'Database', vi:'Nơi backend cất dữ liệu.'},
        {ten:'API Testing', vi:'Cách test backend trực tiếp, rẻ hơn test qua giao diện.'}],
  try:`F12 → Network, đăng nhập sai mật khẩu ở một trang bất kỳ. Tìm request vừa gửi đi, xem mã trả về — thường là 401. Đó là backend đang nói “không”.`},

'Cloud': { moc:1,
  leak:`<p>Thuê căn hộ có sẵn điện nước — nhưng <span class="punch">tiền điện tính theo từng giây và hoá đơn có thể tăng gấp trăm lần trong một đêm.</span></p>
<p>Khác biệt lớn nhất với thuê nhà thật: cloud không có trần chi phí mặc định. Một vòng lặp viết sai hoặc một đợt tấn công có thể sinh hoá đơn khổng lồ. Việc đầu tiên khi mở tài khoản cloud là đặt cảnh báo chi phí — không phải học dịch vụ nào.</p>`,
  code:`<span class="c"># Tự mua máy: trả trước 30 triệu, dùng 3 năm</span>

<span class="c"># Cloud: trả theo giờ thật sự chạy</span>
t3.small   ~0.5 nghìn/giờ   →  ~360 nghìn/tháng nếu chạy 24/7
                            →  ~15 nghìn/tháng nếu chỉ chạy giờ hành chính`,
  cap:'Điểm mạnh thật sự không phải rẻ, mà là <strong>tắt được khi không dùng</strong>.',
  yes:['Chưa biết cần bao nhiêu tài nguyên','Lượng truy cập lên xuống thất thường','Không muốn nuôi người trông máy'],
  no:['Tải đều và biết trước chính xác (mua máy có khi rẻ hơn)','Dữ liệu bắt buộc phải nằm trong nước theo quy định'],
  notYet:{gi:'VPC, IAM, tối ưu chi phí, hạ tầng khai báo bằng code', toiMoc:3,
    dauHieu:'Khi hoá đơn cloud tháng này gấp ba tháng trước và không ai biết vì sao.'},
  next:[{ten:'Server', vi:'Thứ bạn đang thuê trên cloud.'},
        {ten:'Deploy', vi:'Cách đưa code lên đó.'},
        {ten:'CI/CD', vi:'Cách tự động hoá việc đưa lên.'}],
  try:`Vào trang tính giá của bất kỳ nhà cung cấp nào, chọn một máy nhỏ nhất và xem giá mỗi giờ. Nhân với 720 giờ. Đó là hoá đơn tháng nếu bạn quên tắt.`},

'Cache': { moc:1,
  leak:`<p>Khay để chìa khoá cạnh cửa — <span class="punch">nhưng chìa khoá thì không tự cũ đi, còn dữ liệu thì có.</span></p>
<p>Câu nói nổi tiếng nhất ngành: hai việc khó nhất là đặt tên biến và <em>biết lúc nào phải xoá cache</em>. Cache sai khiến người dùng thấy giá cũ, tồn kho cũ, hoặc thấy dữ liệu của người khác. Lỗi cache thường khó tái hiện, vì nó chỉ xảy ra đúng lúc bộ nhớ đệm còn hạn.</p>`,
  code:`<span class="c"># Lần đầu: hỏi database, mất 800ms</span>
GET /san-pham/7  →  database  →  lưu vào cache 60 giây

<span class="c"># 60 giây sau đó: lấy từ cache, mất 2ms</span>
GET /san-pham/7  →  cache

<span class="c"># Nhưng nếu giá vừa đổi ở giây thứ 3 thì sao?</span>`,
  cap:'Câu hỏi cuối chính là toàn bộ độ khó của cache.',
  yes:['Dữ liệu đọc nhiều, sửa ít','Tính toán tốn kém mà kết quả lặp lại','Cần chịu tải cao'],
  no:['Dữ liệu đổi liên tục và phải chính xác tuyệt đối (số dư, tồn kho)','Dữ liệu riêng của từng người mà cache dùng chung'],
  notYet:{gi:'chiến lược xoá cache, TTL, cache nhiều tầng, CDN', toiMoc:3,
    dauHieu:'Khi người dùng báo “tôi sửa rồi mà vẫn thấy cái cũ” và bạn phải giải thích vì sao.'},
  next:[{ten:'Database', vi:'Thứ cache đang gánh đỡ.'},
        {ten:'Load Test', vi:'Cách chứng minh cache thật sự có tác dụng.'},
        {ten:'Server', vi:'Nơi cache thường được đặt.'}],
  try:`Mở một trang, bấm Ctrl+F5 (tải lại bỏ qua cache) rồi so với F5 thường ở tab Network. Chênh lệch thời gian chính là phần cache đang tiết kiệm cho bạn.`},

'Git': { moc:2,
  leak:`<p>Cỗ máy thời gian — nhưng <span class="punch">Git không lưu “thay đổi”, nó lưu toàn bộ ảnh chụp dự án ở mỗi lần commit.</span></p>
<p>Hiểu sai chỗ này là nguồn gốc của mọi nỗi sợ Git. Khi biết mỗi commit là một ảnh chụp đầy đủ và gần như không bao giờ mất, bạn sẽ thôi sợ thao tác sai — vì hầu hết thứ bạn tưởng đã mất vẫn nằm trong <code>git reflog</code>.</p>`,
  code:`git status            <span class="c"># đang có gì thay đổi</span>
git add .             <span class="c"># chọn thứ muốn lưu</span>
git commit -m <span class="s">"sửa lỗi tính tiền"</span>   <span class="c"># chụp một ảnh</span>
git push              <span class="c"># đẩy lên chỗ chung</span>

git log --oneline     <span class="c"># xem lại các mốc đã chụp</span>`,
  cap:'Năm lệnh này đủ dùng cho 90% công việc hàng ngày.',
  yes:['Nhiều người cùng sửa một dự án','Cần quay lại phiên bản cũ khi hỏng','Muốn biết ai đổi dòng nào lúc nào'],
  no:['File nhị phân lớn như video (Git không hợp)','Lưu mật khẩu và khoá bí mật (commit lên là lộ vĩnh viễn)'],
  notYet:{gi:'rebase, cherry-pick, giải quyết xung đột phức tạp, mô hình nhánh', toiMoc:3,
    dauHieu:'Khi bạn cần gộp nhánh của mình với nhánh chung mà hai bên cùng sửa một file.'},
  next:[{ten:'Commit', vi:'Đơn vị nhỏ nhất của cỗ máy thời gian: một ảnh chụp.'},
        {ten:'Push', vi:'Cách đưa ảnh chụp từ máy bạn lên chỗ chung.'},
        {ten:'Branch', vi:'Cách thử nghiệm mà không làm hỏng bản chính.'}],
  try:`Vào một repo bất kỳ trên GitHub, bấm vào một file rồi chọn <strong>History</strong>. Bạn đang xem cỗ máy thời gian của người khác — mỗi dòng là một ảnh chụp.`},

'Commit': { moc:2,
  leak:`<p>Ảnh chụp căn phòng — nhưng <span class="punch">không phải cứ dọn xong là máy tự chụp. Bạn phải chọn thứ gì vào ảnh (<code>git add</code>) rồi mới bấm chụp (<code>git commit</code>).</span></p>
<p>Đây là chỗ người mới hay vấp: sửa xong 5 file, gõ <code>git commit</code> và Git bảo “không có gì để commit”. Vì chưa <code>add</code>. Bước add tồn tại để bạn có thể chụp <em>một phần</em> thay đổi thôi — ví dụ sửa lỗi và sửa chính tả thành hai commit riêng, sau này dễ tìm.</p>`,
  code:`git status                      <span class="c"># đang sửa dở những file nào</span>
git add -A                      <span class="c"># đưa TẤT CẢ thay đổi vào khung hình</span>
git commit -m <span class="s">"Thêm thuật ngữ Docker"</span>   <span class="c"># bấm chụp, kèm ghi chú</span>

git log --oneline -5            <span class="c"># 5 ảnh gần nhất, mỗi dòng một commit</span>
<span class="c">a1b2c3d Thêm thuật ngữ Docker
2595a41 Thêm Playwright test và pipeline CI/CD
599c4b6 Sinh ảnh chia sẻ cho cả 83 trang</span>`,
  cap:'Lời commit tốt trả lời câu <strong>“commit này làm gì?”</strong> — không phải “sửa”, “update”, “fix bug”.',
  yes:['Vừa xong một việc trọn vẹn: một tính năng nhỏ, một lỗi đã sửa','Sắp thử một thứ có thể hỏng — chụp lại trước để có đường lui','Cuối buổi làm việc, dù chưa xong hẳn (ghi rõ “đang dở”)'],
  no:['Gom cả tuần làm việc vào một commit khổng lồ — hỏng chỗ nào không lần ra được','Commit file chứa mật khẩu, API key — lên rồi là lộ vĩnh viễn dù xoá sau','Commit thư mục node_modules hay file build nặng không cần thiết'],
  notYet:{gi:'amend, squash, rebase để viết lại lịch sử, ký commit', toiMoc:3,
    dauHieu:'Khi bạn nhìn lịch sử của mình và thấy 10 commit liên tiếp cùng tên “fix”.'},
  next:[{ten:'Push', vi:'Commit mới chỉ nằm trên máy bạn. Đây là bước đưa nó lên.'},
        {ten:'Branch', vi:'Chuỗi commit này đang nằm trên nhánh nào?'},
        {ten:'Git', vi:'Bức tranh lớn mà commit là viên gạch.'}],
  try:`Mở bất kỳ repo nào trên GitHub, bấm vào số <strong>“commits”</strong> ngay dưới tên repo. Đọc 10 dòng đầu: bạn phân biệt được commit nào viết tốt, commit nào chỉ ghi “update” không?`},

'Push': { moc:2,
  leak:`<p>Nộp lên bảng tin — nhưng <span class="punch">bảng tin có thể từ chối nếu ai đó đã dán bài mới lên trước bạn.</span></p>
<p>Git không cho push đè lên thay đổi của người khác. Nếu kho chung đã có commit bạn chưa có, push bị từ chối (<em>rejected</em>) và bạn phải <code>pull</code> về gộp trước rồi push lại. Đây không phải lỗi — nó là Git đang bảo vệ công sức của đồng đội bạn.</p>`,
  code:`git push                        <span class="c"># đẩy các commit mới lên</span>

<span class="c"># Bị từ chối vì kho chung đã đi trước:</span>
<span class="c">! [rejected]  main -> main (fetch first)</span>
git pull                        <span class="c"># kéo về, gộp</span>
git push                        <span class="c"># đẩy lại, giờ thì được</span>

<span class="c"># Lần đầu đẩy một nhánh mới lên:</span>
git push -u origin ten-nhanh`,
  cap:'<strong>Push là lúc CI bắt đầu chạy.</strong> Commit mà chưa push thì GitHub chưa biết gì.',
  yes:['Đã commit xong và muốn đồng đội (hoặc CI) thấy','Cuối ngày — code nằm trên máy cá nhân là code có thể mất','Muốn mở Pull Request (phải push nhánh lên trước)'],
  no:['Push thẳng lên main khi đội đã thống nhất đi qua PR','Dùng <code>push --force</code> lên nhánh chung — xoá mất commit của người khác','Push khi test ở local đang đỏ mà bạn biết rõ'],
  notYet:{gi:'force-with-lease, push tag, nhiều remote, push một phần commit', toiMoc:3,
    dauHieu:'Khi bạn lỡ commit sai lên nhánh chung và cần sửa lịch sử mà không phá của người khác.'},
  next:[{ten:'Pull', vi:'Chiều ngược lại: lấy của người khác về.'},
        {ten:'CI/CD', vi:'Thứ tự động thức dậy mỗi khi bạn push.'},
        {ten:'Pull Request', vi:'Push nhánh lên rồi làm gì tiếp.'}],
  try:`Sửa một dòng bất kỳ trong dự án của bạn, commit rồi <code>git push</code>. Mở tab <strong>Actions</strong> (hoặc trang repo) trên GitHub ngay sau đó — bạn sẽ thấy commit vừa xuất hiện, và nếu có CI thì nó đang chạy.`},

'Pull': { moc:2,
  leak:`<p>Tải bản mới nhất về — nhưng <span class="punch">pull không chỉ tải, nó còn tự gộp vào bản bạn đang làm dở.</span></p>
<p>Thực ra <code>git pull</code> = <code>git fetch</code> (tải về, chưa đụng gì) + <code>git merge</code> (gộp vào). Nếu bạn và người kia cùng sửa một dòng, bước gộp dừng lại báo xung đột. Người mới thấy chữ CONFLICT thì hoảng, nhưng đó chỉ là Git hỏi: “hai bên khác nhau, chọn bên nào?”</p>`,
  code:`git pull                        <span class="c"># lấy commit mới trên kho chung, gộp vào máy bạn</span>

<span class="c"># Kết quả thường thấy:</span>
<span class="c">Updating 599c4b6..2595a41
Fast-forward                    ← gộp êm, không ai sửa trùng chỗ</span>

<span class="c"># Hoặc:</span>
<span class="c">CONFLICT (content): Merge conflict in terms.js
                                ← mở file, chọn giữ bên nào, rồi add + commit</span>`,
  cap:'Thói quen tốt: <strong>pull trước khi bắt đầu làm</strong>, để không sửa lên bản đã cũ.',
  yes:['Bắt đầu một buổi làm việc mới','Push bị từ chối vì kho chung đã có commit mới','Vừa merge một PR trên web, muốn máy mình có bản đó'],
  no:['Đang sửa dở nhiều file chưa commit — pull có thể trộn lộn xộn; commit hoặc stash trước','Muốn xem có gì mới mà chưa muốn gộp — dùng <code>git fetch</code> rồi xem'],
  notYet:{gi:'fetch tách riêng, pull --rebase, theo dõi nhiều nhánh remote', toiMoc:3,
    dauHieu:'Khi lịch sử của bạn đầy những commit tên “Merge branch main…” mà bạn không cố tình tạo.'},
  next:[{ten:'Merge', vi:'Nửa sau của lệnh pull.'},
        {ten:'Push', vi:'Chiều ngược lại.'},
        {ten:'Branch', vi:'Pull lấy về nhánh nào?'}],
  try:`Trên GitHub, sửa một file ngay trên web (bút chì → Commit changes). Về máy gõ <code>git pull</code>: bạn vừa lấy về một thay đổi được tạo ở “nơi khác” — giống hệt khi đồng đội làm.`},

'Branch': { moc:2,
  leak:`<p>Photocopy bản thảo ra để viết nháp — nhưng <span class="punch">tạo nhánh trong Git không tốn một giây và không copy file nào cả.</span></p>
<p>Một nhánh chỉ là cái nhãn trỏ vào một commit. Nên đừng tiếc nhánh: tạo mỗi việc một nhánh, làm xong gộp, xoá. Người mới hay làm tất cả trên main vì “tạo nhánh phiền” — thật ra nó là một lệnh, và nó cứu bạn khỏi việc phá bản đang chạy.</p>`,
  code:`git switch -c them-nut-danh-gia   <span class="c"># tạo nhánh mới và nhảy sang</span>
<span class="c"># ... sửa, commit thoải mái, main không bị đụng ...</span>

git branch                        <span class="c"># đang có nhánh nào, dấu * là nhánh đang đứng</span>
<span class="c">  main
* them-nut-danh-gia</span>

git switch main                   <span class="c"># quay về bản chính</span>
git branch -d them-nut-danh-gia   <span class="c"># xoá nhánh sau khi đã gộp xong</span>`,
  cap:'Đặt tên nhánh theo <strong>việc đang làm</strong>: <code>them-nut-danh-gia</code>, <code>sua-loi-tim-kiem</code> — không phải <code>test</code>, <code>nhanh2</code>.',
  yes:['Bắt đầu một tính năng hoặc sửa một lỗi','Muốn thử một ý tưởng chưa chắc dùng','Nhiều người cùng làm — mỗi người một nhánh, không giẫm chân'],
  no:['Sửa lỗi chính tả một dòng khi làm một mình — commit thẳng main cũng được','Để nhánh sống hàng tháng không gộp — càng lâu càng khó gộp'],
  notYet:{gi:'Git Flow, trunk-based, nhánh release/hotfix, bảo vệ nhánh', toiMoc:3,
    dauHieu:'Khi đội bạn có 5 người và ai cũng hỏi “giờ nhánh nào là bản mới nhất?”'},
  next:[{ten:'Pull Request', vi:'Cách đưa nhánh trở lại main một cách có kiểm soát.'},
        {ten:'Merge', vi:'Thao tác gộp nhánh về đích.'},
        {ten:'Commit', vi:'Thứ nằm trên nhánh.'}],
  try:`Trong dự án của bạn: <code>git switch -c thu-nghiem</code>, sửa lung tung một file, rồi <code>git switch main</code>. Mở file đó ra — nó nguyên vẹn. Nhánh chính là bảo hiểm miễn phí.`},

'Merge': { moc:2,
  leak:`<p>Gộp hai tờ kế hoạch — nhưng <span class="punch">Git gộp rất giỏi khi hai người sửa hai chỗ khác nhau, và hoàn toàn bó tay khi cùng sửa một dòng.</span></p>
<p>Khi đó nó không đoán, mà dừng lại và ghi cả hai phiên bản vào file, đánh dấu bằng <code>&lt;&lt;&lt;&lt;&lt;&lt;&lt;</code> và <code>&gt;&gt;&gt;&gt;&gt;&gt;&gt;</code>. Việc của bạn: mở file, giữ lại phần đúng, xoá mấy dòng đánh dấu, commit. Xung đột không phải tai nạn — nó là hệ quả tự nhiên của việc hai người cùng sửa một thứ.</p>`,
  code:`git switch main
git merge them-nut-danh-gia     <span class="c"># đưa các commit của nhánh kia vào main</span>

<span class="c"># Nếu có xung đột, file sẽ trông thế này:</span>
&lt;&lt;&lt;&lt;&lt;&lt;&lt; HEAD
  brief: <span class="s">'Gộp thay đổi từ nhánh này vào nhánh kia.'</span>
=======
  brief: <span class="s">'Trộn hai nhánh làm một.'</span>
&gt;&gt;&gt;&gt;&gt;&gt;&gt; them-nut-danh-gia
<span class="c"># → giữ một bên, xoá các dòng đánh dấu, rồi: git add -A && git commit</span>`,
  cap:'Trên thực tế bạn ít gõ <code>git merge</code> tay — thường bấm nút <strong>Merge</strong> trên Pull Request.',
  yes:['Nhánh đã xong việc, test xanh, đã có người xem','Cần đưa thay đổi mới của main vào nhánh đang làm dở để không lệch quá xa'],
  no:['Gộp khi test đang đỏ — bạn đang đưa lỗi vào bản chính','Giải quyết xung đột bằng cách chọn bừa một bên mà không đọc'],
  notYet:{gi:'rebase thay merge, squash merge, fast-forward, chiến lược gộp của đội', toiMoc:3,
    dauHieu:'Khi lịch sử main trông như mạng nhện và không ai đọc nổi thứ tự thay đổi.'},
  next:[{ten:'Pull Request', vi:'Nơi merge thường xảy ra ngoài đời.'},
        {ten:'Branch', vi:'Thứ được gộp.'},
        {ten:'CI/CD', vi:'Người gác cổng nên đứng trước mỗi lần merge.'}],
  try:`Tạo hai nhánh từ main, trên mỗi nhánh sửa <em>cùng một dòng</em> thành hai câu khác nhau, commit. Gộp nhánh thứ nhất vào main (êm), rồi gộp nhánh thứ hai — bạn sẽ gặp xung đột đầu tiên trong môi trường an toàn.`},

'Pull Request': { moc:2,
  leak:`<p>Nộp bản thảo cho biên tập — nhưng <span class="punch">Pull Request không phải một tính năng của Git. Nó là của GitHub (GitLab gọi là Merge Request).</span></p>
<p>Git chỉ biết nhánh và merge. PR là lớp bọc ngoài: một trang web hiện từng dòng thay đổi, chỗ để bình luận, và nơi CI treo kết quả xanh/đỏ. Giá trị thật của PR không nằm ở việc gộp — mà ở chỗ <em>có người thứ hai đọc code trước khi nó vào bản chính</em>.</p>`,
  code:`<span class="c"># 1. Làm trên nhánh riêng, push lên</span>
git switch -c them-nut-danh-gia
git commit -m <span class="s">"Thêm nút đánh giá bài viết"</span>
git push -u origin them-nut-danh-gia

<span class="c"># 2. Trên GitHub: bấm "Compare & pull request"
#    → CI tự chạy test trên nhánh này
#    → đồng đội đọc, góp ý, bạn sửa và push thêm
#    → xanh + được duyệt → bấm Merge</span>

<span class="c"># 3. Về máy</span>
git switch main
git pull`,
  cap:'Vòng đời một PR: <strong>nhánh → push → mở PR → test + review → merge → xoá nhánh</strong>.',
  yes:['Mọi thay đổi vào main khi làm việc nhóm','Muốn CI chạy test trước khi code chạm bản chính','Cần người khác nhìn qua — kể cả khi bạn tự tin'],
  no:['Làm một mình một dự án cá nhân nhỏ và không cần CI — push thẳng cũng được','Mở PR 3.000 dòng — không ai đọc nổi, chia nhỏ ra'],
  notYet:{gi:'quy tắc bảo vệ nhánh, yêu cầu số người duyệt, CODEOWNERS, draft PR', toiMoc:3,
    dauHieu:'Khi có người merge PR chưa ai xem và bạn ước gì GitHub đã chặn lại.'},
  next:[{ten:'CI/CD', vi:'Thứ chạy test trên mỗi PR và hiện dấu tick.'},
        {ten:'Merge', vi:'Cái nút cuối cùng của PR.'},
        {ten:'Branch', vi:'Không có nhánh thì không có PR.'}],
  try:`Vào tab <strong>Pull requests</strong> của một dự án mã nguồn mở lớn (React, VS Code…). Mở một PR đã merge: đọc mô tả, cuộn xuống xem bình luận và dấu tick CI. Đó là cách phần lớn phần mềm trên thế giới được thay đổi.`},

'Deploy': { moc:2,
  leak:`<p>Đưa món ra quầy — nhưng <span class="punch">deploy không phải một khoảnh khắc, nó là một quá trình có thể hỏng giữa chừng.</span></p>
<p>Trong lúc chuyển đổi, một số người dùng nhận bản mới, số khác vẫn bản cũ. Nếu bản mới đổi cấu trúc database thì bản cũ có thể vỡ ngay lập tức. Đó là lý do có blue-green, canary, và vì sao “deploy xong rồi” chưa có nghĩa là an toàn.</p>`,
  code:`<span class="c"># Deploy thủ công — dễ quên bước</span>
build → copy file lên server → khởi động lại → kiểm tra bằng mắt

<span class="c"># Deploy tự động — luôn đủ bước, luôn cùng thứ tự</span>
git push  →  CI chạy test  →  test xanh  →  tự đưa lên`,
  cap:'Deploy thủ công lúc 5 giờ chiều thứ Sáu là truyền thống xấu của cả ngành.',
  yes:['Code đã qua test và sẵn sàng cho người dùng thật','Cần đưa bản vá gấp lên'],
  no:['Bộ test chưa xanh','Cuối ngày thứ Sáu, không còn ai trực để xử lý nếu hỏng'],
  notYet:{gi:'blue-green, canary, feature flag, chiến lược quay lui', toiMoc:3,
    dauHieu:'Khi bạn deploy xong phát hiện lỗi và không biết cách quay về bản cũ nhanh nhất.'},
  next:[{ten:'CI/CD', vi:'Cách tự động hoá toàn bộ việc này.'},
        {ten:'Smoke Test', vi:'Bộ test chạy ngay sau khi deploy.'},
        {ten:'Test Environment', vi:'Nơi tập deploy trước khi làm thật.'}],
  try:`Trang bạn đang đọc chính là một bản deploy: file HTML được đẩy lên GitHub rồi tự xuất hiện trên mạng. Sửa file, push, chờ một phút — đó là toàn bộ chu trình.`},

'Bug': { moc:1,
  leak:`<p>Công thức ghi nhầm muối — nhưng <span class="punch">phần lớn bug không phải do ai gõ sai.</span></p>
<p>Chúng sinh ra ở chỗ hai người hiểu yêu cầu khác nhau, hoặc ở tình huống không ai nghĩ tới: người dùng bấm hai lần, mạng rớt giữa chừng, nhập tên có dấu tiếng Việt. Bug đắt nhất thường không nằm trong code — nó nằm trong bản yêu cầu mà không ai đọc kỹ.</p>`,
  code:`<span class="c">Báo cáo bug tốt luôn có đủ ba phần:</span>

Các bước:   1. Mở /gio-hang  2. Nhập số lượng 0  3. Bấm Thanh toán
Mong đợi:   Báo lỗi "Số lượng phải lớn hơn 0"
Thực tế:    Đơn hàng tạo thành công với tổng tiền 0đ

Kèm: ảnh chụp, trình duyệt, thời điểm, tài khoản dùng để test`,
  cap:'Thiếu phần “các bước” thì dev không tái hiện được, và bug sẽ bị đóng với lý do “không lặp lại được”.',
  yes:['Sản phẩm chạy khác với điều đã thống nhất','Có cách tái hiện lại được'],
  no:['Bạn không thích thiết kế (đó là góp ý, không phải bug)','Chưa ai chốt hành vi đúng là gì (đi hỏi trước đã)'],
  notYet:{gi:'phân loại mức độ, quy trình vòng đời bug, phân tích nguyên nhân gốc', toiMoc:2,
    dauHieu:'Khi bạn phải trả lời “bug này có đáng hoãn ngày phát hành không?”'},
  next:[{ten:'Debug', vi:'Việc tiếp theo sau khi bug được báo.'},
        {ten:'Test Case', vi:'Mỗi bug tìm ra nên thành một ca test mới.'},
        {ten:'QA', vi:'Nghề tìm cách để bug đừng sinh ra từ đầu.'}],
  try:`Lấy một lỗi bạn từng gặp trên app nào đó, viết lại theo đúng ba dòng trên. Nếu không viết nổi phần “các bước”, bạn hiểu vì sao dev hay bảo không tái hiện được.`},

'Debug': { moc:2,
  leak:`<p>Thợ sửa xe lần theo dấu hiệu — nhưng <span class="punch">chiếc xe không đổi trạng thái trong lúc thợ đang xem, còn phần mềm thì có.</span></p>
<p>Nhiều bug biến mất ngay khi bạn thêm dòng log vào để quan sát, vì dòng đó làm thay đổi thời điểm chạy. Đây là loại bug khó nhất trong nghề, và nó lý giải vì sao debug đôi khi giống săn ma hơn là sửa xe.</p>`,
  code:`<span class="c">// Cách nhanh nhất và vẫn hiệu quả nhất</span>
console.log(<span class="s">'gio hang:'</span>, gioHang)

<span class="c">// Dừng lại ngay tại dòng này để soi mọi biến</span>
debugger

<span class="c">// Thu hẹp dần: nửa trên hay nửa dưới gây lỗi?</span>`,
  cap:'Debug là <strong>thu hẹp phạm vi</strong>, không phải đọc code chằm chằm cho tới lúc nhìn ra.',
  yes:['Có bug tái hiện được','Cần biết giá trị thật của biến tại một thời điểm'],
  no:['Chưa tái hiện được lỗi (đi tìm cách tái hiện trước đã)','Đoán mò rồi sửa bừa xem có hết không'],
  notYet:{gi:'breakpoint có điều kiện, debug từ xa, đọc stack trace nhiều tầng, git bisect', toiMoc:3,
    dauHieu:'Khi lỗi chỉ xuất hiện trên production và bạn không tài nào tái hiện được ở máy.'},
  next:[{ten:'Bug', vi:'Thứ bạn đang đi tìm nguyên nhân.'},
        {ten:'Test Report', vi:'Nơi có log và ảnh chụp giúp thu hẹp phạm vi.'},
        {ten:'Git', vi:'Công cụ tìm ra commit nào đã làm sinh lỗi.'}],
  try:`F12 → Sources, mở một file JS bất kỳ, bấm vào số dòng để đặt breakpoint, rồi thao tác trên trang. Trang đứng lại và bạn thấy mọi biến tại đúng khoảnh khắc đó.`},

'UI/UX': { moc:1,
  leak:`<p>Màu sơn và biển chỉ dẫn của quán — nhưng <span class="punch">UX không phải thứ nhìn thấy được, nên không kiểm tra được bằng cách ngắm.</span></p>
<p>Giao diện đẹp long lanh vẫn có thể khiến người dùng không hoàn thành nổi việc mình định làm. UX chỉ đo được bằng cách nhìn người thật dùng thật: họ mất bao lâu, kẹt ở đâu, bỏ cuộc chỗ nào. Không có ảnh chụp nào nói lên điều đó.</p>`,
  code:`<span class="c">UI đẹp, UX tệ:</span>
  Nút "Xoá tài khoản" và "Lưu thay đổi" cùng màu, cạnh nhau

<span class="c">UI xấu, UX ổn:</span>
  Form thuế trông cũ kỹ nhưng báo rõ sai ở dòng nào và sửa thế nào`,
  cap:'Đẹp và dễ dùng là hai trục khác nhau — một sản phẩm có thể mạnh trục này yếu trục kia.',
  yes:['Trước khi code, lúc còn sửa được rẻ','Khi người dùng bỏ giữa chừng mà không ai biết vì sao'],
  no:['Bàn màu nút trong khi luồng chính còn chưa chạy được','Quyết định theo ý thích của người to tiếng nhất trong phòng'],
  notYet:{gi:'nghiên cứu người dùng, A/B testing, kiểm định khả năng tiếp cận, design system', toiMoc:2,
    dauHieu:'Khi cả đội cãi nhau về một thiết kế mà không ai có dữ liệu người dùng thật.'},
  next:[{ten:'Frontend', vi:'Nơi UI/UX biến thành thứ bấm được.'},
        {ten:'Visual Testing', vi:'Cách tự động bảo vệ giao diện khỏi bị vỡ.'},
        {ten:'QA', vi:'Người hay phát hiện vấn đề UX sớm nhất vì dùng sản phẩm nhiều nhất.'}],
  try:`Đưa điện thoại cho một người chưa từng dùng app bạn làm, nhờ họ hoàn thành một việc, và <em>không nói gì cả</em>. Ba phút im lặng đó cho bạn nhiều thông tin hơn ba cuộc họp.`},

// ══════════════ AI ══════════════

'AI': { moc:1,
  leak:`<p>“Máy thông minh như người” là cách nói dễ hiểu nhất và <span class="punch">cũng gây hiểu lầm nhiều nhất.</span></p>
<p>AI hiện nay không hiểu gì cả theo nghĩa con người hiểu. Nó rất giỏi nhận ra khuôn mẫu trong lượng dữ liệu khổng lồ. Vì vậy nó có thể viết luận văn trôi chảy nhưng đếm sai số chữ cái trong một từ — chuyện vô lý nếu nó “thông minh”, nhưng hoàn toàn hợp lý nếu nó chỉ đang khớp khuôn mẫu.</p>`,
  code:`<span class="c">Phần mềm thường: người viết ra quy tắc</span>
  nếu email chứa "trúng thưởng" thì đánh dấu spam

<span class="c">AI: đưa 10 triệu email đã gán nhãn, máy tự rút ra quy tắc</span>
  (và quy tắc đó thường không ai đọc hiểu được)`,
  cap:'Khác biệt cốt lõi: <strong>ai là người viết ra quy tắc</strong>.',
  yes:['Vấn đề có nhiều dữ liệu mẫu và khó viết quy tắc rõ ràng','Chấp nhận được sai một tỉ lệ nhất định'],
  no:['Cần đúng tuyệt đối và giải thích được từng quyết định','Quy tắc đơn giản, viết thẳng ra được'],
  notYet:{gi:'các loại mô hình, cách huấn luyện, chỉ số đánh giá', toiMoc:2,
    dauHieu:'Khi bạn phải quyết định dùng AI hay viết quy tắc tay cho một bài toán cụ thể của công ty.'},
  next:[{ten:'Machine Learning', vi:'Cách AI học từ dữ liệu.'},
        {ten:'LLM', vi:'Loại AI đang tạo ra làn sóng hiện nay.'},
        {ten:'Bias', vi:'Mặt tối đi kèm mọi hệ thống AI.'}],
  try:`Hỏi một chatbot AI: “trong từ strawberry có mấy chữ r?” Nhiều model trả lời sai. Đó là bằng chứng rõ nhất rằng nó khớp khuôn mẫu chứ không đếm.`},

'Machine Learning': { moc:1,
  leak:`<p>“Máy tự học” nghe như nó tự mày mò. <span class="punch">Thực ra nó chỉ dò tìm con số sao cho sai ít nhất trên bộ dữ liệu bạn đưa.</span></p>
<p>Không có tò mò, không có hiểu biết. Nếu dữ liệu bạn đưa lệch, nó học đúng cái lệch đó và tự tin y hệt. Câu nói cửa miệng trong ngành: rác vào, rác ra — và với ML thì rác ra còn được trình bày rất thuyết phục.</p>`,
  code:`<span class="c">Ba thứ luôn cần có:</span>

Dữ liệu   →  10.000 ảnh đã gán nhãn "chó" hoặc "mèo"
Mô hình   →  cấu trúc toán học có hàng triệu con số điều chỉnh được
Huấn luyện →  chỉnh dần các con số đó cho tới khi đoán ít sai nhất`,
  cap:'Không có bước nào ở đây giống “hiểu” cả — chỉ là dò số cho sai ít đi.',
  yes:['Có nhiều dữ liệu mẫu chất lượng','Bài toán khó viết thành quy tắc rõ ràng'],
  no:['Dữ liệu ít hoặc lệch nặng','Cần giải thích rõ vì sao ra quyết định đó'],
  notYet:{gi:'các thuật toán cụ thể, chọn đặc trưng, kiểm định chéo, siêu tham số', toiMoc:3,
    dauHieu:'Khi bạn cần đánh giá một model do người khác làm có thật sự tốt không.'},
  next:[{ten:'Dataset', vi:'Nguyên liệu quyết định chất lượng đầu ra.'},
        {ten:'Training', vi:'Quá trình dò số.'},
        {ten:'Overfitting', vi:'Cái bẫy phổ biến nhất khi huấn luyện.'}],
  try:`Vào Google Photos hoặc ứng dụng ảnh trên điện thoại, tìm từ “biển”. Nó tìm ra ảnh biển dù bạn chưa gắn nhãn gì — đó là machine learning đang chạy trong túi bạn.`},

'Deep Learning': { moc:1,
  leak:`<p>“Mạng nhiều tầng nên học sâu hơn” — <span class="punch">chữ “sâu” chỉ nói về số tầng, không nói về độ sâu sắc.</span></p>
<p>Nhiều tầng cho phép model nhận ra khuôn mẫu phức tạp hơn, nhưng cũng khiến nó thành hộp đen: gần như không ai giải thích được vì sao nó ra quyết định đó. Trong y tế hay tín dụng, chỗ này là vấn đề pháp lý thật, không phải chuyện học thuật.</p>`,
  code:`<span class="c">Ảnh một con mèo đi qua các tầng:</span>

tầng 1  →  nhận ra cạnh và góc
tầng 5  →  nhận ra mắt, tai, ria
tầng 20 →  "đây là mèo"

<span class="c">Không ai lập trình các tầng giữa. Chúng tự hình thành.</span>`,
  cap:'Điểm mạnh và điểm yếu là một: <strong>không ai bảo nó phải nhìn vào đâu</strong>.',
  yes:['Dữ liệu phức tạp: ảnh, âm thanh, ngôn ngữ','Có rất nhiều dữ liệu và đủ máy để huấn luyện'],
  no:['Dữ liệu bảng đơn giản (mô hình cổ điển thường tốt hơn và rẻ hơn)','Bắt buộc phải giải thích được quyết định'],
  notYet:{gi:'kiến trúc mạng, lan truyền ngược, hàm kích hoạt, transformer', toiMoc:3,
    dauHieu:'Khi bạn cần chọn giữa fine-tuning một model có sẵn và huấn luyện từ đầu.'},
  next:[{ten:'Neural Network', vi:'Cấu trúc nền tảng của deep learning.'},
        {ten:'GPU', vi:'Thứ phần cứng khiến deep learning khả thi.'},
        {ten:'Computer Vision', vi:'Lĩnh vực deep learning thành công sớm nhất.'}],
  try:`Mở camera điện thoại hướng vào mặt người. Khung vuông bám theo mặt chính là deep learning chạy thời gian thực, ngay trên máy bạn, không cần mạng.`},

'Neural Network': { moc:1,
  leak:`<p>“Mô phỏng não người” là ẩn dụ <span class="punch">gây hiểu lầm nhiều nhất trong cả ngành AI.</span></p>
<p>Nơ-ron nhân tạo chỉ là một phép nhân cộng rồi so ngưỡng. Nó không giống nơ-ron sinh học về cơ chế, tốc độ hay cách học. Cái tên là di sản lịch sử từ những năm 1950. Nghĩ nó “giống não” sẽ khiến bạn kỳ vọng sai về những gì nó làm được.</p>`,
  code:`<span class="c">Một "nơ-ron" thực chất chỉ là:</span>

ket_qua = (dau_vao1 × trong_so1) + (dau_vao2 × trong_so2) + do_lech
nếu ket_qua &gt; ngưỡng thì kích hoạt

<span class="c">Ghép vài triệu cái như vậy lại → mạng nơ-ron</span>`,
  cap:'Toàn bộ “trí thông minh” nằm ở việc chỉnh các <em>trọng số</em> đó cho đúng.',
  yes:['Cần hiểu nền tảng bên dưới mọi model AI hiện nay'],
  no:['Chỉ muốn dùng AI (không cần biết bên trong)'],
  notYet:{gi:'lan truyền ngược, gradient descent, các loại tầng, chuẩn hoá', toiMoc:3,
    dauHieu:'Khi bạn muốn tự huấn luyện một model thay vì dùng model có sẵn.'},
  next:[{ten:'Deep Learning', vi:'Điều xảy ra khi xếp thật nhiều tầng nơ-ron.'},
        {ten:'Training', vi:'Quá trình chỉnh trọng số.'},
        {ten:'Model', vi:'Sản phẩm cuối cùng sau khi huấn luyện xong.'}],
  try:`Vào playground.tensorflow.org. Bạn thấy một mạng nơ-ron thật, thêm bớt tầng được và xem nó học ngay trước mắt. Không cần cài gì.`},

'Model': { moc:1,
  leak:`<p>“Mô hình” nghe như một bản thiết kế tĩnh. <span class="punch">Thực ra model chỉ là một file chứa hàng tỉ con số.</span></p>
<p>Nó không chứa dữ liệu gốc, không tra cứu gì cả — chỉ là các trọng số đã được chỉnh. Hệ quả quan trọng: model <strong>đóng băng tại thời điểm huấn luyện</strong>. Nó không biết chuyện xảy ra sau ngày đó, và không tự cập nhật khi thế giới đổi.</p>`,
  code:`<span class="c"># Model chỉ là một file</span>
model.safetensors    14 GB

<span class="c"># Bên trong: hàng tỉ con số, không có chữ nào của dữ liệu gốc</span>
[0.0234, -0.9912, 0.4471, ...]`,
  cap:'Vì thế model không “tra” được thông tin mới — muốn vậy phải ghép thêm RAG.',
  yes:['Cần thứ đã học xong để đem ra dùng','Muốn chạy cùng một logic ở nhiều nơi'],
  no:['Cần thông tin cập nhật theo thời gian thực','Cần truy vết vì sao ra kết quả đó'],
  notYet:{gi:'định dạng model, lượng tử hoá, phục vụ model, phiên bản model', toiMoc:3,
    dauHieu:'Khi bạn cần chạy model trên máy riêng và thấy nó ngốn hết RAM.'},
  next:[{ten:'Training', vi:'Quá trình sinh ra model.'},
        {ten:'Inference', vi:'Lúc đem model ra dùng thật.'},
        {ten:'Fine-tuning', vi:'Cách dạy thêm cho model có sẵn.'}],
  try:`Hỏi một chatbot: “hôm nay là ngày mấy?” Nếu nó không có công cụ tra cứu, nó sẽ đoán hoặc nói không biết — vì model đóng băng từ lúc huấn luyện.`},

'Training': { moc:1,
  leak:`<p>“Đi học” gợi ra hình ảnh tiếp thu dần dần. <span class="punch">Training thực ra là dò tìm bằng cách sai đi sai lại hàng triệu lần.</span></p>
<p>Model đoán, so với đáp án, chỉnh lại một chút, rồi lặp lại. Không có “hiểu ra” ở bước nào. Và khác với người đi học, training cực kỳ tốn kém: các model lớn tốn hàng triệu đô tiền điện và không thể học thêm sau khi xong.</p>`,
  code:`<span class="c">Vòng lặp huấn luyện, lặp hàng triệu lần:</span>

1. Đưa vào một mẫu
2. Model đoán
3. So với đáp án đúng → tính độ sai
4. Chỉnh trọng số cho lần sau sai ít hơn
5. Quay lại bước 1`,
  cap:'Không có bước nào tên là “hiểu”. Chỉ có giảm sai số.',
  yes:['Cần model chuyên cho lĩnh vực riêng','Có đủ dữ liệu và đủ máy'],
  no:['Model có sẵn đã đủ tốt (gần như luôn là trường hợp này)','Dữ liệu dưới vài nghìn mẫu'],
  notYet:{gi:'siêu tham số, lịch trình học, huấn luyện phân tán, checkpoint', toiMoc:3,
    dauHieu:'Khi bạn thật sự cần huấn luyện chứ không phải chỉ viết prompt tốt hơn.'},
  next:[{ten:'Dataset', vi:'Nguyên liệu đầu vào của training.'},
        {ten:'Overfitting', vi:'Điều xảy ra khi huấn luyện quá lâu.'},
        {ten:'Fine-tuning', vi:'Bản rút gọn và rẻ hơn nhiều của training.'}],
  try:`Nghĩ về việc học lái xe: bạn không đọc lý thuyết rồi lái giỏi ngay, mà đạp nhầm chân ga vài chục lần rồi quen dần. Training giống vậy, chỉ là lặp hàng triệu lần và không có cảm giác nào.`},

'Dataset': { moc:1,
  leak:`<p>“Tập dữ liệu” nghe trung tính, khách quan. <span class="punch">Nhưng mọi dataset đều mang sẵn quan điểm của người thu thập nó.</span></p>
<p>Chọn lấy dữ liệu ở đâu, gán nhãn thế nào, bỏ qua trường hợp nào — mỗi quyết định đó đều là một lựa chọn của con người, và model sẽ học đúng những lựa chọn ấy. Dataset không phải tấm gương phản chiếu thế giới; nó là bức ảnh chụp từ một góc cụ thể.</p>`,
  code:`<span class="c">Chia dataset ba phần, không bao giờ trộn lẫn:</span>

Train  70%  →  để model học
Valid  15%  →  để chỉnh trong lúc học
Test   15%  →  model chưa từng thấy, dùng chấm điểm cuối

<span class="c">Trộn lẫn = tự chấm bài mình bằng đề đã biết trước</span>`,
  cap:'Rò rỉ dữ liệu giữa ba phần là lỗi kinh điển khiến model đẹp trên giấy, tệ ngoài đời.',
  yes:['Chuẩn bị huấn luyện hoặc đánh giá model','Cần đo model tốt tới đâu một cách trung thực'],
  no:['Dùng dữ liệu thật của khách mà chưa xin phép','Gộp dữ liệu test vào dữ liệu học'],
  notYet:{gi:'tăng cường dữ liệu, cân bằng lớp, quy trình gán nhãn, dữ liệu tổng hợp', toiMoc:3,
    dauHieu:'Khi model đạt 95% khi chấm nhưng dùng thật thì sai liên tục.'},
  next:[{ten:'Bias', vi:'Hậu quả trực tiếp của dataset lệch.'},
        {ten:'Training', vi:'Nơi dataset được đem ra dùng.'},
        {ten:'Overfitting', vi:'Điều xảy ra khi model học thuộc tập train.'}],
  try:`Nghĩ về một dataset ảnh “bác sĩ” lấy từ internet. Thử đoán tỉ lệ giới tính trong đó. Đó chính là thứ model sẽ học và lặp lại.`},

'LLM': { moc:1,
  leak:`<p>“Mô hình ngôn ngữ lớn” nghe như nó biết ngôn ngữ. <span class="punch">Thực chất nó chỉ đoán token tiếp theo, từng cái một.</span></p>
<p>Không có kế hoạch cho cả câu trả lời, không kiểm tra lại. Hiểu điều này giải thích được gần hết hành vi kỳ lạ của nó: vì sao nó bịa ra tên sách nghe rất thật, vì sao bảo nó “nghĩ từng bước” lại cho kết quả tốt hơn, và vì sao nó không đếm nổi chữ cái.</p>`,
  code:`<span class="c">Cách LLM sinh câu trả lời:</span>

"Thủ đô của Việt Nam là"  →  đoán: "Hà"
"Thủ đô của Việt Nam là Hà"  →  đoán: "Nội"
"...Hà Nội"  →  đoán: "."

<span class="c">Mỗi lần chỉ đoán đúng một mẩu, dựa trên toàn bộ phần trước</span>`,
  cap:'Không có bước nào nó “biết” đáp án trước rồi mới viết ra.',
  yes:['Việc liên quan tới ngôn ngữ: viết, tóm tắt, dịch, phân loại','Chấp nhận kiểm tra lại kết quả'],
  no:['Cần con số chính xác tuyệt đối','Cần thông tin mới hơn ngày model được huấn luyện'],
  notYet:{gi:'nhiệt độ, top-p, cửa sổ ngữ cảnh, gọi hàm, so sánh model', toiMoc:2,
    dauHieu:'Khi cùng một prompt cho ra kết quả khác nhau mỗi lần và bạn cần nó ổn định.'},
  next:[{ten:'Prompt', vi:'Cách điều khiển LLM.'},
        {ten:'Hallucination', vi:'Hệ quả trực tiếp của việc chỉ đoán token tiếp theo.'},
        {ten:'RAG', vi:'Cách cho LLM tra tài liệu để bớt bịa.'}],
  try:`Bảo một chatbot: “viết một câu 7 chữ”. Đếm lại. Nhiều model đếm sai — vì nó đang đoán từng mẩu chứ không đếm.`},

'Prompt': { moc:2,
  leak:`<p>“Ra lệnh cho AI” gợi cảm giác bạn đang điều khiển. <span class="punch">Thực ra bạn đang gợi ý, và kết quả có tính ngẫu nhiên.</span></p>
<p>Cùng một prompt có thể ra hai câu trả lời khác nhau. Đó không phải lỗi, đó là thiết kế. Nên đừng coi prompt như dòng lệnh chắc chắn chạy đúng — hãy coi nó như lời dặn cho một cộng tác viên rất giỏi nhưng hay quên và đôi khi tự tin thái quá.</p>`,
  code:`<span class="c">Prompt yếu:</span>
"Viết về sản phẩm của tôi"

<span class="c">Prompt tốt: có vai, có ngữ cảnh, có định dạng, có ví dụ</span>
"Bạn là người viết nội dung cho dân văn phòng Việt Nam.
Viết 3 tiêu đề cho app quản lý chi tiêu.
Mỗi tiêu đề dưới 12 chữ, giọng gần gũi, không dùng từ Hán Việt.
Ví dụ giọng mong muốn: 'Tiêu gì hết tiền, mở ra là biết'"`,
  cap:'Bốn thứ làm nên khác biệt: <strong>vai · ngữ cảnh · định dạng · ví dụ</strong>.',
  yes:['Mọi lúc bạn dùng AI','Cần kết quả theo đúng định dạng để đưa vào chỗ khác'],
  no:['Kỳ vọng kết quả giống hệt nhau mỗi lần chạy','Nhét dữ liệu nhạy cảm vào prompt'],
  notYet:{gi:'chuỗi suy luận, few-shot có hệ thống, prompt hệ thống, đánh giá tự động', toiMoc:3,
    dauHieu:'Khi bạn cần prompt chạy ổn định cho 1000 lượt gọi chứ không phải một lần dùng thử.'},
  next:[{ten:'LLM', vi:'Thứ đang nhận prompt của bạn.'},
        {ten:'Token', vi:'Đơn vị tính chi phí và độ dài của prompt.'},
        {ten:'Hallucination', vi:'Prompt tốt giảm được đáng kể, nhưng không hết.'}],
  try:`Lấy một prompt bạn hay dùng, thêm đúng một dòng: “Nếu không chắc, hãy nói không chắc thay vì đoán.” So sánh kết quả trước và sau.`},

'Token': { moc:2,
  leak:`<p>“Mẩu chữ” khiến người ta tưởng một token là một từ. <span class="punch">Với tiếng Việt thì lệch rất xa.</span></p>
<p>Model chủ yếu được huấn luyện trên tiếng Anh, nên tiếng Việt có dấu bị cắt vụn hơn nhiều: một từ như “nghiêng” có thể tốn 3-4 token trong khi “tilt” chỉ tốn 1. Hệ quả thực tế: <strong>cùng một nội dung, viết bằng tiếng Việt tốn tiền và tốn chỗ hơn tiếng Anh khoảng 2-3 lần.</strong></p>`,
  code:`<span class="c">"Hello world"        →  2 token</span>
<span class="c">"Xin chào thế giới"  →  ~8 token</span>

<span class="c">Chi phí và giới hạn độ dài đều tính theo token,</span>
<span class="c">nên cùng một ý, tiếng Việt đắt hơn đáng kể.</span>`,
  cap:'Đây là lý do thực tế khiến nhiều sản phẩm AI cho thị trường Việt tốn hơn dự tính.',
  yes:['Cần ước lượng chi phí gọi API','Cần biết còn bao nhiêu chỗ trong cửa sổ ngữ cảnh'],
  no:['Đếm token bằng cách đếm từ (luôn sai với tiếng Việt)'],
  notYet:{gi:'thuật toán tách token, khác biệt giữa các model, tối ưu chi phí', toiMoc:3,
    dauHieu:'Khi hoá đơn API cao hơn dự tính và bạn cần biết chỗ nào đang tốn.'},
  next:[{ten:'Context window', vi:'Giới hạn tính bằng token.'},
        {ten:'Prompt', vi:'Prompt dài tốn token, nên viết gọn có giá trị thật.'},
        {ten:'LLM', vi:'Thứ đọc theo token chứ không theo từ.'}],
  try:`Tìm “tokenizer” trên trang của bất kỳ nhà cung cấp AI nào, dán một đoạn tiếng Việt vào. Xem nó bị cắt thành bao nhiêu mẩu — thường nhiều hơn bạn tưởng.`},

'Context window': { moc:2,
  leak:`<p>Mặt bàn có hạn — nhưng <span class="punch">không phải mọi chỗ trên bàn đều được chú ý như nhau.</span></p>
<p>Model chú ý tới đầu và cuối ngữ cảnh nhiều hơn phần giữa. Nhét một tài liệu 200 trang vào không có nghĩa nó đọc kỹ cả 200 trang; thông tin nằm giữa rất dễ bị bỏ qua. Cửa sổ lớn giải quyết vấn đề “chứa được”, không giải quyết vấn đề “để ý tới”.</p>`,
  code:`<span class="c">Cửa sổ 128.000 token — nghe rất nhiều</span>

[ prompt hệ thống ][ tài liệu bạn dán vào ][ lịch sử chat ][ câu hỏi ]
   được chú ý          ← dễ bị lướt qua →              được chú ý

<span class="c">Mẹo: đặt câu hỏi quan trọng ở CUỐI, sau tài liệu</span>`,
  cap:'Đây là mẹo đơn giản nhất mà hiệu quả nhất khi làm việc với tài liệu dài.',
  yes:['Cần đưa nhiều tài liệu cho model đọc','Chat dài và cần model nhớ đoạn trước'],
  no:['Nhét mọi thứ vào cho chắc — vừa tốn tiền vừa loãng','Kỳ vọng model nhớ chính xác chi tiết ở giữa tài liệu dài'],
  notYet:{gi:'nén ngữ cảnh, quản lý bộ nhớ hội thoại, chọn lọc tài liệu', toiMoc:3,
    dauHieu:'Khi chat dài dần và model bắt đầu quên mất yêu cầu bạn nêu từ đầu.'},
  next:[{ten:'Token', vi:'Đơn vị đo cửa sổ ngữ cảnh.'},
        {ten:'RAG', vi:'Cách chỉ đưa vào đúng phần tài liệu cần thiết.'},
        {ten:'Prompt', vi:'Thứ chiếm chỗ trong cửa sổ.'}],
  try:`Trong một cuộc chat dài, hỏi lại: “yêu cầu đầu tiên tôi nêu là gì?” Nếu model trả lời sai, bạn vừa chạm tới giới hạn của cửa sổ ngữ cảnh.`},

'Hallucination': { moc:1,
  leak:`<p>“Ảo giác” gợi ra một trạng thái bất thường, thi thoảng mới xảy ra. <span class="punch">Thực ra bịa và trả lời đúng là cùng một cơ chế.</span></p>
<p>Model luôn đoán token có khả năng nhất. Khi nó biết, kết quả đúng. Khi nó không biết, nó vẫn đoán — và câu bịa nghe y hệt câu đúng, cùng giọng tự tin. Không có công tắc nào bật lên khi nó đang bịa, kể cả với chính nó. Đó là lý do không thể tin vào độ chắc chắn trong giọng văn của AI.</p>`,
  code:`<span class="c">Câu hỏi: "Điều 47 Luật Doanh nghiệp 2020 quy định gì?"</span>

Model trả lời trôi chảy, có số điều, có trích dẫn.
Nghe rất thuyết phục. Có thể hoàn toàn bịa.

<span class="c">Cách duy nhất chắc chắn: tự tra lại nguồn gốc.</span>`,
  cap:'Càng chuyên ngành hẹp, tỉ lệ bịa càng cao — và bạn càng khó phát hiện.',
  yes:['— Không ai muốn có. Việc của bạn là biết nó luôn có thể xảy ra.'],
  no:['Tin vào số liệu, trích dẫn, tên riêng mà chưa tra lại','Dùng AI làm nguồn cuối cùng cho việc quan trọng'],
  notYet:{gi:'đo tỉ lệ bịa, chấm điểm bằng model khác, hệ thống trích nguồn', toiMoc:3,
    dauHieu:'Khi bạn cần đưa AI vào sản phẩm thật và phải trả lời câu “làm sao biết nó không bịa?”'},
  next:[{ten:'RAG', vi:'Cách giảm bịa hiệu quả nhất hiện nay.'},
        {ten:'LLM', vi:'Hiểu cơ chế đoán token thì hiểu vì sao có hallucination.'},
        {ten:'Prompt', vi:'Prompt tốt giảm được phần nào.'}],
  try:`Hỏi một chatbot về một cuốn sách không tồn tại: “tóm tắt cuốn <em>Đường về Ba Vì</em> của Nguyễn Văn A”. Nhiều model sẽ tóm tắt rất mượt một cuốn sách chưa từng có.`},

'Fine-tuning': { moc:3,
  leak:`<p>“Đào tạo thêm quy trình nội bộ” — nghe như cách nhồi kiến thức vào model. <span class="punch">Nhưng fine-tuning dạy giọng điệu và cách làm tốt hơn nhiều so với dạy sự kiện.</span></p>
<p>Muốn model biết bảng giá công ty bạn thì RAG rẻ hơn và chính xác hơn nhiều. Fine-tuning hợp khi bạn cần nó <em>trả lời theo một phong cách nhất quán</em>, hoặc theo một định dạng cố định. Nhầm hai việc này là sai lầm tốn kém phổ biến nhất.</p>`,
  code:`<span class="c">Cần model biết bảng giá mới nhất?</span>
  → RAG. Rẻ, cập nhật ngay, có trích nguồn.

<span class="c">Cần model luôn trả lời theo giọng thương hiệu, đúng mẫu?</span>
  → Fine-tuning. Cần vài trăm tới vài nghìn ví dụ mẫu.`,
  cap:'Câu hỏi tự vấn: bạn cần nó <em>biết thêm</em> hay cần nó <em>cư xử khác</em>?',
  yes:['Cần giọng điệu hoặc định dạng rất nhất quán','Prompt đã tối ưu hết mà vẫn không đủ','Có sẵn vài trăm ví dụ chất lượng'],
  no:['Chỉ cần model biết dữ liệu mới (dùng RAG)','Chưa thử tối ưu prompt cho tử tế'],
  notYet:{gi:'LoRA, chuẩn bị dữ liệu huấn luyện, đánh giá sau fine-tune, quên kiến thức cũ', toiMoc:3,
    dauHieu:'Bạn đã ở mốc này nếu đang cân nhắc fine-tune. Hãy thử RAG trước, thường là đủ.'},
  next:[{ten:'RAG', vi:'Lựa chọn nên cân nhắc trước fine-tuning.'},
        {ten:'Training', vi:'Fine-tuning là bản rút gọn của nó.'},
        {ten:'Dataset', vi:'Chất lượng ví dụ quyết định kết quả.'}],
  try:`Trước khi nghĩ tới fine-tuning, thử đưa 3 ví dụ mẫu ngay trong prompt. Rất nhiều trường hợp chỉ cần vậy là đủ, không tốn đồng nào.`},

'RAG': { moc:3,
  leak:`<p>“Thi mở tài liệu” — nhưng <span class="punch">thí sinh chỉ được đọc đúng những trang mà hệ thống tìm ra hộ.</span></p>
<p>Nếu bước tìm kiếm lấy nhầm đoạn, model sẽ trả lời sai một cách rất tự tin, dựa trên tài liệu sai. Chất lượng RAG phụ thuộc vào chất lượng tìm kiếm nhiều hơn phụ thuộc vào model. Phần lớn dự án RAG thất bại ở khâu tìm kiếm, không phải ở khâu sinh câu trả lời.</p>`,
  code:`<span class="c">Câu hỏi: "Chính sách đổi trả bao nhiêu ngày?"</span>

1. Chuyển câu hỏi thành vector
2. Tìm trong kho tài liệu → lấy 3 đoạn giống nhất   <span class="c">← khâu hay hỏng</span>
3. Nhét 3 đoạn đó vào prompt kèm câu hỏi
4. Model trả lời dựa trên 3 đoạn đó`,
  cap:'Bước 2 quyết định tất cả. Model giỏi tới đâu cũng không cứu được tài liệu lấy nhầm.',
  yes:['Cần AI trả lời dựa trên tài liệu riêng của công ty','Tài liệu cập nhật thường xuyên','Cần trích dẫn nguồn cho câu trả lời'],
  no:['Tài liệu quá ít (nhét thẳng vào prompt là xong)','Cần model đổi giọng điệu chứ không cần thêm kiến thức'],
  notYet:{gi:'chia đoạn tài liệu, tìm kiếm lai, xếp hạng lại, đánh giá chất lượng truy xuất', toiMoc:3,
    dauHieu:'Bạn đã ở mốc này. Bắt đầu bằng việc kiểm tra bước tìm kiếm có lấy đúng đoạn không, trước khi đổ lỗi cho model.'},
  next:[{ten:'Embedding', vi:'Cơ chế đứng sau bước tìm kiếm.'},
        {ten:'Hallucination', vi:'Vấn đề mà RAG sinh ra để giảm bớt.'},
        {ten:'Context window', vi:'Giới hạn số đoạn tài liệu nhét vào được.'}],
  try:`Tải một file PDF lên một chatbot rồi hỏi về nội dung trong đó. Bạn vừa dùng RAG. Thử hỏi điều <em>không</em> có trong file để xem nó phản ứng thế nào.`},

'Embedding': { moc:3,
  leak:`<p>Xếp sách theo chủ đề — nhưng <span class="punch">“gần nhau” theo máy không phải lúc nào cũng là “liên quan” theo người.</span></p>
<p>“Tôi thích món này” và “tôi ghét món này” nằm rất gần nhau trong không gian vector, vì cấu trúc câu giống hệt. Đó là lý do tìm kiếm bằng embedding đôi khi trả về đoạn văn ngược hẳn ý bạn cần — và vì sao người ta phải ghép thêm tìm kiếm theo từ khoá.</p>`,
  code:`<span class="c">Chữ → dãy số</span>
"chó"    →  [0.21, -0.88, 0.34, ...]
"cún"    →  [0.23, -0.85, 0.31, ...]   ← rất gần
"máy bay" →  [-0.71, 0.42, 0.90, ...]  ← rất xa

<span class="c">Máy so khoảng cách giữa các dãy số, không đọc chữ</span>`,
  cap:'Nhờ vậy tìm được “cún” khi người dùng gõ “chó” — điều tìm kiếm theo từ khoá không làm được.',
  yes:['Cần tìm theo ý nghĩa thay vì theo đúng từ','Xây RAG hoặc gợi ý nội dung tương tự','Gom nhóm tài liệu tự động'],
  no:['Cần khớp chính xác mã sản phẩm, số hợp đồng (dùng tìm kiếm thường)','Ngữ cảnh phủ định quan trọng'],
  notYet:{gi:'cơ sở dữ liệu vector, chọn model embedding, tìm kiếm lai, chia đoạn', toiMoc:3,
    dauHieu:'Bạn đã ở mốc này nếu đang xây RAG. Bắt đầu bằng việc kiểm tra thủ công 20 truy vấn xem nó lấy đúng đoạn không.'},
  next:[{ten:'RAG', vi:'Ứng dụng phổ biến nhất của embedding.'},
        {ten:'Model', vi:'Embedding cũng do một model sinh ra.'},
        {ten:'Dataset', vi:'Chất lượng tài liệu quyết định chất lượng tìm kiếm.'}],
  try:`Tìm trong Google Photos bằng từ “bữa tối”. Nó ra ảnh đồ ăn dù bạn chưa gắn nhãn nào. Đó là embedding đang so ý nghĩa giữa chữ và ảnh.`},

'Inference': { moc:2,
  leak:`<p>“Học xong rồi hành nghề” — nhưng <span class="punch">model không tích luỹ kinh nghiệm qua từng ca như người hành nghề.</span></p>
<p>Mỗi lần gọi là một lần hoàn toàn mới. Nó không nhớ gì về lần trước trừ khi bạn tự nhét lại lịch sử vào prompt. Cảm giác “chatbot nhớ mình” thực ra là ứng dụng đang gửi lại toàn bộ cuộc trò chuyện mỗi lần — và đó là lý do chat càng dài càng tốn tiền.</p>`,
  code:`<span class="c">Bạn tưởng:</span>
  bạn: "tên tôi là Na"     → model ghi nhớ
  bạn: "tôi tên gì?"       → model nhớ lại

<span class="c">Thực tế mỗi lần gọi:</span>
  gửi đi: ["tên tôi là Na", "chào Na", "tôi tên gì?"]   ← gửi lại tất cả`,
  cap:'Không có trí nhớ nào cả — chỉ là gửi lại toàn bộ lịch sử mỗi lượt.',
  yes:['Bất cứ khi nào bạn dùng AI thật sự','Cần ước lượng chi phí và độ trễ vận hành'],
  no:['Kỳ vọng model tự học từ phản hồi người dùng (không có chuyện đó)'],
  notYet:{gi:'gộp lô, phục vụ model, tối ưu độ trễ, lượng tử hoá', toiMoc:3,
    dauHieu:'Khi ứng dụng của bạn có người dùng thật và chi phí gọi API bắt đầu đáng kể.'},
  next:[{ten:'Model', vi:'Thứ đang được đem ra chạy.'},
        {ten:'Context window', vi:'Giới hạn lịch sử gửi lại được.'},
        {ten:'Token', vi:'Đơn vị tính tiền cho mỗi lần gọi.'}],
  try:`Trong một chat dài, để ý xem có bao giờ AI tự nhắc lại chuyện bạn kể ở cuộc chat <em>khác</em> không. Không, vì mỗi cuộc chat là một tờ giấy trắng.`},

'GPU': { moc:2,
  leak:`<p>“Trăm thợ phụ cùng làm” — đúng, nhưng <span class="punch">nút thắt thật thường không phải tốc độ tính, mà là bộ nhớ.</span></p>
<p>Model 70 tỉ tham số cần khoảng 140GB bộ nhớ chỉ để nạp vào. GPU chơi game mạnh nhất cũng chỉ có 24GB. Đó là lý do người ta không chạy được model lớn ở nhà dù card rất khoẻ — và vì sao câu hỏi đầu tiên luôn là “card bao nhiêu VRAM”, không phải “card nhanh bao nhiêu”.</p>`,
  code:`<span class="c">Ước lượng nhanh bộ nhớ cần có:</span>

Model 7 tỉ tham số   →  ~14 GB   (chạy được trên card cao cấp)
Model 70 tỉ tham số  →  ~140 GB  (cần nhiều card ghép lại)

<span class="c">Lượng tử hoá giảm được khoảng một nửa, đổi lấy chút chất lượng</span>`,
  cap:'Quy tắc thô: số tỉ tham số nhân đôi ra số GB cần.',
  yes:['Huấn luyện hoặc chạy model lớn','Xử lý ảnh và video hàng loạt'],
  no:['Chỉ gọi API của nhà cung cấp (họ lo phần cứng)','Model nhỏ chạy CPU vẫn đủ'],
  notYet:{gi:'VRAM và băng thông, ghép nhiều card, thuê GPU trên cloud', toiMoc:3,
    dauHieu:'Khi bạn muốn chạy model riêng vì lý do bảo mật dữ liệu và phải tự lo phần cứng.'},
  next:[{ten:'Inference', vi:'Việc GPU làm khi model đã huấn luyện xong.'},
        {ten:'Training', vi:'Việc tốn GPU nhất.'},
        {ten:'Cloud', vi:'Cách thuê GPU theo giờ thay vì mua.'}],
  try:`Trên Windows bấm Ctrl+Shift+Esc → tab Performance → GPU. Mở một video 4K và nhìn đường biểu đồ. Đó là GPU đang làm đúng loại việc song song mà AI cần.`},

'Bias': { moc:1,
  leak:`<p>“Học theo hồ sơ cũ nên lặp lại thói quen cũ” — đúng, nhưng <span class="punch">bỏ trường giới tính hay dân tộc ra không hề xoá được thiên lệch.</span></p>
<p>Model sẽ tìm ra thứ thay thế: mã vùng, tên trường học, thậm chí cách viết tên. Đây là điều khiến bias khó xử lý hơn người ta tưởng — không phải cứ giấu thông tin nhạy cảm đi là công bằng. Phải đo kết quả thật trên từng nhóm người mới biết.</p>`,
  code:`<span class="c">Bỏ trường "giới tính" khỏi dữ liệu tuyển dụng</span>
  → model học từ "câu lạc bộ bóng đá nữ" trong CV
  → vẫn phân biệt như cũ, chỉ khó phát hiện hơn

<span class="c">Cách duy nhất: đo tỉ lệ chấp nhận trên từng nhóm sau khi chạy</span>`,
  cap:'Công bằng phải <strong>đo được ở đầu ra</strong>, không đảm bảo được ở đầu vào.',
  yes:['Mọi hệ thống AI ảnh hưởng tới con người: tuyển dụng, tín dụng, y tế','Trước khi đưa model vào dùng thật'],
  no:['Cho rằng bỏ trường nhạy cảm là đã xử lý xong','Chỉ đo độ chính xác tổng thể mà không tách theo nhóm'],
  notYet:{gi:'các định nghĩa công bằng, kiểm định thiên lệch, tài liệu model', toiMoc:3,
    dauHieu:'Khi model của bạn sắp được dùng để ra quyết định ảnh hưởng tới quyền lợi người khác.'},
  next:[{ten:'Dataset', vi:'Nơi thiên lệch bắt đầu.'},
        {ten:'Training', vi:'Nơi thiên lệch được khuếch đại.'},
        {ten:'AI', vi:'Bối cảnh chung của vấn đề này.'}],
  try:`Yêu cầu một công cụ tạo ảnh vẽ “một giám đốc điều hành” 10 lần. Đếm tỉ lệ giới tính và độ tuổi trong kết quả. Đó là bias hiện ra bằng mắt thường.`},

'Agent': { moc:3,
  leak:`<p>“Trợ lý tự làm xong việc rồi báo lại” — <span class="punch">nhưng trợ lý này không biết mình đang sai.</span></p>
<p>Agent tự chia việc, tự gọi công cụ, tự đánh giá kết quả — bằng chính cái model có thể bịa. Sai ở bước 2 sẽ được mang sang bước 3, 4, 5 và khuếch đại lên. Đó là lý do agent chạy nhiều bước thường trôi rất xa khỏi mục tiêu, và vì sao mọi agent nghiêm túc đều cần điểm dừng cho người kiểm tra.</p>`,
  code:`<span class="c">Mục tiêu: "đặt lịch họp với team tuần sau"</span>

bước 1: gọi API lịch → xem ai rảnh
bước 2: chọn khung giờ            ← nếu chọn sai múi giờ ở đây
bước 3: gửi thư mời                 thì mọi bước sau đều sai theo
bước 4: tự kiểm tra → "xong rồi!"   và nó vẫn báo thành công`,
  cap:'Càng nhiều bước tự động, càng cần chốt chặn có người duyệt.',
  yes:['Việc lặp lại, nhiều bước, rủi ro thấp','Có thể kiểm tra lại kết quả dễ dàng'],
  no:['Việc động tới tiền, dữ liệu quan trọng hay gửi ra ngoài mà không ai duyệt','Chưa có cách phát hiện khi nó làm sai'],
  notYet:{gi:'khung agent, thiết kế công cụ, quản lý bộ nhớ, cơ chế dừng an toàn', toiMoc:3,
    dauHieu:'Bạn đã ở mốc này nếu đang xây agent. Bắt đầu bằng việc ghi log mọi bước để xem nó thật sự làm gì.'},
  next:[{ten:'LLM', vi:'Bộ não của agent, và cũng là nguồn rủi ro.'},
        {ten:'API', vi:'Cách agent gọi công cụ bên ngoài.'},
        {ten:'Hallucination', vi:'Vấn đề bị khuếch đại qua nhiều bước.'}],
  try:`Giao cho một AI có công cụ tìm kiếm một việc nhiều bước, rồi đọc kỹ từng bước nó làm thay vì chỉ đọc kết quả cuối. Bạn sẽ thấy chỗ nó đi chệch.`},

'Computer Vision': { moc:1,
  leak:`<p>“Dạy máy nhìn” — nhưng <span class="punch">máy không nhìn thấy vật thể, nó xử lý một bảng số.</span></p>
<p>Hệ quả rất thực tế: đổi ánh sáng, đổi góc chụp, hay thêm vài điểm nhiễu mắt người không thấy cũng có thể khiến nó nhận nhầm hoàn toàn. Con người nhận ra cái ghế dù ở góc nào; model thì chỉ nhận ra những góc nó từng thấy trong dữ liệu huấn luyện.</p>`,
  code:`<span class="c">Ảnh với máy chỉ là bảng số:</span>

mỗi điểm ảnh  →  [đỏ, xanh lá, xanh dương]  →  [237, 28, 36]
ảnh 1000×1000 →  3 triệu con số

<span class="c">"Nhận ra con mèo" = tìm khuôn mẫu trong 3 triệu con số đó</span>`,
  cap:'Không có khái niệm “con mèo” ở đâu cả — chỉ có khuôn mẫu số học.',
  yes:['Đếm, phân loại, phát hiện vật thể trong ảnh và video','Đọc chữ từ ảnh chụp giấy tờ','Kiểm tra chất lượng sản phẩm trên dây chuyền'],
  no:['Cần độ chính xác tuyệt đối trong điều kiện ánh sáng thất thường','Dữ liệu huấn luyện không phủ được điều kiện thực tế'],
  notYet:{gi:'CNN, phát hiện vật thể, phân đoạn ảnh, tăng cường dữ liệu', toiMoc:3,
    dauHieu:'Khi model chạy tốt ở phòng thí nghiệm nhưng sai liên tục ngoài công trường.'},
  next:[{ten:'Deep Learning', vi:'Công nghệ đứng sau computer vision hiện đại.'},
        {ten:'Dataset', vi:'Điều kiện chụp trong dataset quyết định tất cả.'},
        {ten:'Visual Testing', vi:'Họ hàng gần trong lĩnh vực kiểm thử.'}],
  try:`Mở Google Lens hoặc tính năng tìm kiếm bằng ảnh, chụp một vật quen thuộc trong điều kiện thiếu sáng. So với lúc đủ sáng. Khác biệt cho bạn thấy giới hạn thật.`},

'NLP': { moc:1,
  leak:`<p>“Phiên dịch giữa người và máy” — nhưng <span class="punch">tiếng Việt là một trong những ngôn ngữ khó nhất cho NLP.</span></p>
<p>Không có dấu cách giữa các tiếng trong một từ (“học sinh” là một từ hay hai?), có dấu thanh, có nhiều cách viết không dấu. Phần lớn công cụ NLP được xây cho tiếng Anh nên chạy trên tiếng Việt luôn kém hơn — điều bạn phải tính tới khi làm sản phẩm cho thị trường Việt.</p>`,
  code:`<span class="c">Tiếng Anh: tách từ theo dấu cách, xong</span>
"I love you"  →  ["I", "love", "you"]

<span class="c">Tiếng Việt: dấu cách không phải ranh giới từ</span>
"học sinh giỏi"  →  ["học sinh", "giỏi"]?  hay  ["học", "sinh", "giỏi"]?`,
  cap:'Bài toán tách từ này là bước đầu tiên và cũng là bước hay hỏng nhất với tiếng Việt.',
  yes:['Phân loại, tóm tắt, trích xuất thông tin từ văn bản','Phân tích cảm xúc bình luận khách hàng'],
  no:['Kỳ vọng công cụ tiếng Anh chạy tốt như vậy trên tiếng Việt','Văn bản quá ít để rút ra kết luận'],
  notYet:{gi:'tách từ tiếng Việt, nhận dạng thực thể, phân tích cú pháp, model Việt hoá', toiMoc:2,
    dauHieu:'Khi công cụ phân tích cảm xúc trả kết quả sai liên tục trên bình luận tiếng Việt.'},
  next:[{ten:'LLM', vi:'Bước nhảy khiến nhiều bài toán NLP cũ trở nên dễ.'},
        {ten:'Token', vi:'Cách model cắt tiếng Việt ra để xử lý.'},
        {ten:'Embedding', vi:'Cách biến chữ thành số để so sánh ý nghĩa.'}],
  try:`Gõ một câu tiếng Việt có dấu vào Google Dịch, dịch sang tiếng Anh rồi dịch ngược lại. Chỗ nghĩa bị lệch là chỗ NLP còn khó.`},

'Chatbot': { moc:1,
  leak:`<p>“Nói chuyện với nhân viên hiểu được câu hỏi lòng vòng” — nhưng <span class="punch">chatbot LLM dễ bị dẫn dắt ra khỏi vai của nó.</span></p>
<p>Bot đời cũ theo kịch bản thì cứng nhưng an toàn. Bot LLM linh hoạt nhưng người dùng có thể thuyết phục nó hứa hẹn điều công ty không định hứa, tiết lộ hướng dẫn nội bộ, hoặc nói những câu gây rắc rối pháp lý. Linh hoạt và kiểm soát được là hai thứ đánh đổi lẫn nhau.</p>`,
  code:`<span class="c">Bot kịch bản: an toàn nhưng cứng</span>
  Bấm 1 để tra đơn · Bấm 2 để gặp nhân viên

<span class="c">Bot LLM: linh hoạt nhưng cần rào chắn</span>
  Hiểu "đơn tui đặt hôm kia sao chưa thấy đâu"
  ...và cũng có thể bị dụ hứa hoàn tiền 200%`,
  cap:'Bot càng thông minh thì càng cần rào chắn và kiểm duyệt đầu ra.',
  yes:['Câu hỏi lặp lại nhiều, có tài liệu để dựa vào','Cần trực 24/7 cho việc đơn giản'],
  no:['Việc liên quan tới tiền, pháp lý, y tế mà không có người duyệt','Chưa có tài liệu chuẩn để bot dựa vào'],
  notYet:{gi:'rào chắn an toàn, chuyển tiếp cho người thật, đo mức độ hài lòng, chống tấn công prompt', toiMoc:3,
    dauHieu:'Khi bot của bạn sắp nói chuyện với khách hàng thật và bạn phải trả lời “nếu nó nói bậy thì sao?”'},
  next:[{ten:'LLM', vi:'Bộ não của chatbot đời mới.'},
        {ten:'RAG', vi:'Cách cho bot trả lời dựa trên tài liệu công ty.'},
        {ten:'Hallucination', vi:'Rủi ro lớn nhất khi bot nói chuyện với khách.'}],
  try:`Thử với một chatbot chăm sóc khách hàng bất kỳ: hỏi một câu ngoài phạm vi của nó. Cách nó từ chối (hay không từ chối được) cho bạn biết rào chắn của họ tốt tới đâu.`},

'Overfitting': { moc:1,
  leak:`<p>“Học tủ đúng đề năm ngoái” — ẩn dụ này rất sát, nhưng <span class="punch">khác một chỗ quan trọng: học sinh biết mình đang học tủ, model thì không.</span></p>
<p>Model overfit báo cáo độ chính xác 99% và hoàn toàn “tin” vào con số đó. Chỉ khi gặp dữ liệu thật nó mới lộ. Đó là lý do phải giữ riêng một phần dữ liệu mà model chưa từng thấy — không có nó thì bạn không có cách nào biết mình đang bị lừa.</p>`,
  code:`<span class="c">Dấu hiệu kinh điển:</span>

độ chính xác trên tập train:  99%   ← thuộc lòng
độ chính xác trên tập test:   61%   ← gặp cái mới là hỏng

<span class="c">Chênh lệch càng lớn, overfit càng nặng</span>`,
  cap:'Chỉ nhìn con số đầu tiên là cách tự lừa mình phổ biến nhất trong ML.',
  yes:['— Không ai muốn có. Việc của bạn là phát hiện sớm.'],
  no:['Đánh giá model bằng chính dữ liệu đã dùng để huấn luyện','Huấn luyện thêm mãi vì thấy con số vẫn đang đẹp lên'],
  notYet:{gi:'chính quy hoá, dừng sớm, dropout, kiểm định chéo', toiMoc:3,
    dauHieu:'Khi model của bạn đạt điểm rất cao lúc chấm nhưng người dùng thật phàn nàn liên tục.'},
  next:[{ten:'Dataset', vi:'Cách chia dữ liệu để phát hiện overfitting.'},
        {ten:'Training', vi:'Quá trình sinh ra vấn đề này.'},
        {ten:'Model', vi:'Thứ đang học thuộc thay vì học hiểu.'}],
  try:`Nghĩ về một người ôn thi bằng cách làm đi làm lại đúng một đề. Điểm đề đó rất cao. Đổi đề là rớt. Model cũng vậy, chỉ khác là nó không tự biết.`}

};
