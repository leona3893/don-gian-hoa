// Trang so sánh: trả lời thẳng câu "X và Y khác nhau thế nào?"
// Nguyên liệu lấy từ mục "dùng khi / đừng dùng khi" của chi-tiet.js, gom lại thành bảng.

export const SO_SANH = [

{
  slug:'mock-va-stub', cat:'Kiểm thử', terms:['Mock','Stub'],
  h1:'Mock và Stub khác nhau thế nào?',
  tldr:'Stub trả sẵn một câu cố định. Mock cũng trả sẵn, nhưng <strong>còn nhớ nó đã bị gọi mấy lần và với tham số gì</strong> — để test kiểm tra được đúng điều đó.',
  cols:['Stub','Mock'],
  rows:[
    {k:'Việc chính', v:['Cung cấp dữ liệu để code chạy tiếp','Cung cấp dữ liệu <em>và</em> ghi lại cách nó bị gọi']},
    {k:'Có trí nhớ không', v:['Không','Có']},
    {k:'Test kiểm tra gì', v:['Kết quả cuối cùng đúng chưa','Kết quả, <em>và</em> hàm kia có được gọi đúng cách không']},
    {k:'Test dính vào cài đặt', v:['Ít — đổi cách viết code, test vẫn xanh','Nhiều — đổi cách gọi hàm là test đỏ dù hành vi không đổi']},
    {k:'Nên chọn khi', v:['Chỉ cần có dữ liệu để chạy','Việc “có gọi hay không” chính là thứ cần kiểm']}
  ],
  nho:'Bạn có cần kiểm tra <em>“hàm đó có được gọi không”</em> không? <strong>Có → mock. Không → stub.</strong>',
  chon:[
    {neu:'Cần tỉ giá giả để tính tiền chạy tiếp', thi:'Stub — trả về 25000 là xong'},
    {neu:'Cần chắc chắn hàm gửi mail được gọi đúng một lần', thi:'Mock — chỉ mock mới kiểm được'},
    {neu:'Không chắc', thi:'Bắt đầu bằng stub. Nâng lên mock khi thật sự cần kiểm cách gọi'}
  ],
  bay:'Dùng mock ở mọi chỗ là cái bẫy phổ biến nhất. Nó khiến test dính chặt vào <em>cách code được viết</em> chứ không phải <em>code làm được gì</em>. Kết quả: dọn dẹp code mà không đổi hành vi thì hàng loạt test vẫn đỏ, và dần dần không ai dám sửa code nữa.',
  faq:[
    {h:'Mock và Stub cái nào dùng nhiều hơn?', a:'Stub dùng nhiều hơn trong thực tế vì đơn giản và ít làm test dễ vỡ. Mock chỉ nên dùng khi việc kiểm tra cách gọi hàm thật sự quan trọng.'},
    {h:'Fake khác gì Mock và Stub?', a:'Fake là bản giả có logic thật thu nhỏ, ví dụ một database chạy trong bộ nhớ. Nó phức tạp hơn stub nhưng chạy thật hơn. Ở giai đoạn đầu chỉ cần nhớ stub và mock là đủ.'}
  ]
},

{
  slug:'smoke-test-va-sanity-test', cat:'Kiểm thử', terms:['Smoke Test','Sanity Test'],
  h1:'Smoke Test và Sanity Test khác nhau thế nào?',
  tldr:'Smoke hỏi <strong>“bản build này còn sống không?”</strong> — rộng và nông. Sanity hỏi <strong>“chỗ vừa sửa đã đúng chưa?”</strong> — hẹp và sâu.',
  cols:['Smoke Test','Sanity Test'],
  rows:[
    {k:'Câu hỏi trả lời', v:['Có đáng bỏ công test tiếp không?','Chỗ vừa vá đã chạy đúng chưa?']},
    {k:'Phạm vi', v:['Rộng — chạm mọi chức năng sống còn','Hẹp — chỉ quanh chỗ vừa động vào']},
    {k:'Độ sâu', v:['Nông — chỉ cần chạy được','Sâu — soi kỹ các trường hợp của tính năng đó']},
    {k:'Chạy khi nào', v:['Ngay khi có bản build mới','Ngay sau khi dev báo đã fix']},
    {k:'Số ca test', v:['5–10 ca, dưới 2 phút','Vài ca, khoảng 1 phút']}
  ],
  nho:'<strong>Smoke = rộng và nông. Sanity = hẹp và sâu.</strong> Smoke chạy trước để khỏi phí công; sanity chạy sau khi có người vừa sửa gì đó.',
  chon:[
    {neu:'Vừa nhận bản build mới từ dev', thi:'Smoke — xem nó có mở nổi không đã'},
    {neu:'Dev vừa báo “đã fix lỗi làm tròn tiền”', thi:'Sanity — soi đúng chỗ đó'},
    {neu:'Sắp phát hành cho người dùng thật', thi:'Không phải hai cái này — chạy bộ hồi quy đầy đủ'}
  ],
  bay:'Ranh giới giữa hai loại này <strong>không rõ ràng như sách vở</strong>, và mỗi công ty định nghĩa một kiểu. Đừng tốn thời gian tranh cãi định nghĩa với đồng nghiệp — hỏi thẳng “ở đây mình đang hiểu smoke test là gì” rồi làm theo cách đội đang dùng.',
  faq:[
    {h:'Smoke test có phải là regression test không?', a:'Không. Smoke chỉ vài ca kiểm tra chức năng sống còn, chạy dưới 2 phút. Regression là bộ đầy đủ chạy lại mọi thứ, thường mất hàng chục phút tới hàng giờ.'},
    {h:'Có cần chạy cả hai không?', a:'Có, nhưng ở hai thời điểm khác nhau. Smoke chạy khi có bản build mới. Sanity chạy khi có người vừa sửa một chỗ cụ thể.'}
  ]
},

{
  slug:'unit-test-integration-test-va-e2e-test', cat:'Kiểm thử', terms:['Unit Test','Integration Test','E2E Test'],
  h1:'Unit Test, Integration Test và E2E Test khác nhau thế nào?',
  tldr:'Ba tầng từ dưới lên: <strong>càng lên cao càng giống thật, càng chậm, và càng khó biết hỏng ở đâu.</strong> Nên viết nhiều ở dưới, ít ở trên.',
  cols:['Unit','Integration','E2E'],
  rows:[
    {k:'Phạm vi', v:['Một hàm, một lớp','Vài thành phần ghép nhau','Cả hệ thống, từ giao diện xuống database']},
    {k:'Tốc độ', v:['Vài mili giây','Vài trăm mili giây','10–30 giây một ca']},
    {k:'Độ giống thật', v:['Thấp','Vừa','Cao nhất']},
    {k:'Khi đỏ thì biết gì', v:['Biết ngay hàm nào sai','Biết vùng nào sai','Chỉ biết “có gì đó sai”']},
    {k:'Tỉ lệ nên có', v:['Nhiều nhất','Vừa phải','Ít nhất, chỉ luồng sống còn']},
    {k:'Hay chập chờn không', v:['Gần như không','Thỉnh thoảng','Rất hay']}
  ],
  nho:'Hình dung kim tự tháp: <strong>đáy rộng là unit, giữa là integration, chóp nhọn là E2E.</strong> Bộ test nào có hình dáng ngược lại — nhiều E2E, ít unit — sẽ chậm và chập chờn.',
  chon:[
    {neu:'Kiểm tra logic tính tiền, nhiều nhánh if', thi:'Unit — rẻ nhất, nhanh nhất'},
    {neu:'Kiểm tra code lưu đúng xuống database', thi:'Integration'},
    {neu:'Kiểm tra luồng mua hàng từ đầu tới cuối', thi:'E2E — nhưng chỉ vài ca thôi'},
    {neu:'Kiểm tra mọi trường hợp lỗi của một API', thi:'API testing, không phải E2E'}
  ],
  bay:'Sai lầm phổ biến nhất của người mới: thấy E2E “giống thật nhất” nên viết tất cả bằng E2E. Kết quả là bộ test chạy hai tiếng, đỏ ngẫu nhiên vài ca mỗi lần, rồi cả đội mất niềm tin và bỏ luôn không thèm nhìn.',
  faq:[
    {h:'Nên có bao nhiêu phần trăm mỗi loại?', a:'Con số hay được nhắc là 70% unit, 20% integration, 10% E2E. Đừng bám cứng vào số, ý chính là: càng lên cao càng ít.'},
    {h:'Tester chỉ viết E2E thôi đúng không?', a:'Không nhất thiết. Rất nhiều thứ tester muốn kiểm có thể kiểm bằng API testing, vừa nhanh vừa ổn định hơn E2E rất nhiều.'}
  ]
},

{
  slug:'selenium-playwright-va-cypress', cat:'Kiểm thử', terms:['Selenium','Playwright','Cypress'],
  h1:'Selenium, Playwright và Cypress — chọn cái nào?',
  tldr:'Dự án mới dùng JS hoặc Python → <strong>Playwright</strong>. Đội đã có sẵn Selenium, hoặc cần Java/C# → <strong>Selenium</strong>. Đội frontend muốn tự test, ứng dụng gói trong một tên miền → <strong>Cypress</strong>.',
  cols:['Selenium','Playwright','Cypress'],
  rows:[
    {k:'Ngôn ngữ', v:['Java, C#, Python, JS, Ruby','JS/TS, Python, Java, C#','Chỉ JS/TS']},
    {k:'Tự chờ phần tử', v:['Không — phải tự viết','Có sẵn','Có sẵn']},
    {k:'Nhiều tab, nhiều tên miền', v:['Được','Được','Rất hạn chế']},
    {k:'Safari / WebKit', v:['Được','Được','Không']},
    {k:'Gỡ lỗi khi test đỏ', v:['Đọc log','Trace tua lại từng bước','Giao diện tua lại trực quan']},
    {k:'Tuổi đời', v:['Lâu nhất, tài liệu nhiều nhất','Mới, đang lên nhanh','Vừa, cộng đồng frontend mạnh']}
  ],
  nho:'Khác biệt lớn nhất <strong>không phải cú pháp mà là chuyện tự chờ</strong>. Selenium bấm ngay khi được lệnh, kể cả lúc trang chưa vẽ xong — đó là nguồn gốc phần lớn test chập chờn trong các dự án Selenium.',
  chon:[
    {neu:'Bắt đầu dự án mới, đội biết JS hoặc Python', thi:'Playwright'},
    {neu:'Công ty đã có hàng nghìn ca test Selenium', thi:'Giữ Selenium — đổi không đáng'},
    {neu:'Bắt buộc dùng Java hoặc C#', thi:'Selenium (Playwright có hỗ trợ nhưng hệ sinh thái mỏng hơn)'},
    {neu:'Luồng test có bước sang trang thanh toán của ngân hàng', thi:'Đừng chọn Cypress'},
    {neu:'Cần test cả app điện thoại', thi:'Không cái nào — dùng Appium'}
  ],
  bay:'Cái bẫy lớn nhất là <strong>chọn công cụ trước khi biết mình cần test gì</strong>. Công cụ nào cũng mở được trang và bấm được nút. Thứ quyết định bộ test của bạn sống hay chết là chiến lược chọn ca test và cách chọn locator — không phải tên công cụ.',
  faq:[
    {h:'Playwright có thay thế hẳn Selenium không?', a:'Với dự án mới thì Playwright thường là lựa chọn tốt hơn. Nhưng Selenium vẫn là chuẩn thực tế ở rất nhiều công ty lớn và không biến mất trong nhiều năm tới.'},
    {h:'Học cái nào trước nếu mới bắt đầu?', a:'Playwright, vì cơ chế tự chờ giúp bạn tránh được lớp lỗi khó nhất khi mới học. Hiểu nguyên lý rồi thì chuyển sang Selenium rất nhanh.'}
  ]
},

{
  slug:'tdd-va-bdd', cat:'Kiểm thử', terms:['TDD','BDD'],
  h1:'TDD và BDD khác nhau thế nào?',
  tldr:'TDD viết test trước <strong>cho chính người code</strong>. BDD viết kịch bản trước <strong>cho cả đội cùng hiểu giống nhau</strong> — dev, tester và người làm nghiệp vụ.',
  cols:['TDD','BDD'],
  rows:[
    {k:'Viết cho ai đọc', v:['Người viết code','Cả đội, kể cả người không kỹ thuật']},
    {k:'Ngôn ngữ', v:['Code','Tiếng Việt/Anh thường, dạng Given–When–Then']},
    {k:'Tầng', v:['Hàm, lớp','Hành vi người dùng']},
    {k:'Ai tham gia viết', v:['Chủ yếu dev','Dev + BA + tester cùng ngồi']},
    {k:'Chi phí', v:['Thấp, bắt đầu ngay được','Cao — mỗi dòng cần một đoạn code đứng sau']}
  ],
  nho:'<strong>TDD là kỷ luật cá nhân. BDD là công cụ giao tiếp.</strong> Nếu chỉ có một người đọc thứ bạn viết ra thì bạn đang làm TDD, dù có gõ chữ Given–When–Then.',
  chon:[
    {neu:'Muốn code chặt hơn, ít bug hơn', thi:'TDD'},
    {neu:'Dev và BA hay hiểu lệch nhau về yêu cầu', thi:'BDD — nhưng phải có BA chịu ngồi viết cùng'},
    {neu:'Chỉ tester viết rồi tự đọc', thi:'Đừng làm BDD, viết ca test thường là đủ'}
  ],
  bay:'Phần lớn dự án BDD thất bại vì <strong>giữ lại phần hình thức và bỏ mất phần trò chuyện</strong>. Nếu người làm nghiệp vụ không thật sự ngồi viết cùng, bạn chỉ vừa thêm một lớp cú pháp mà không ai ngoài tester đọc — tốn công gấp đôi, được lợi bằng không.',
  faq:[
    {h:'BDD có phải là Cucumber không?', a:'Không. Cucumber chỉ là một công cụ chạy kịch bản Gherkin. BDD là cách làm việc, có thể làm mà không dùng công cụ nào.'},
    {h:'Có thể làm cả hai cùng lúc không?', a:'Có, và nhiều đội làm vậy. BDD ở tầng hành vi để thống nhất yêu cầu, TDD ở tầng code khi dev bắt tay viết.'}
  ]
},

{
  slug:'frontend-va-backend', cat:'Nền tảng', terms:['Frontend','Backend'],
  h1:'Frontend và Backend khác nhau thế nào?',
  tldr:'Frontend chạy <strong>trong máy người dùng</strong> nên ai cũng sửa được bằng F12. Backend chạy <strong>trên server</strong> nên là nơi duy nhất kiểm tra được thật.',
  cols:['Frontend','Backend'],
  rows:[
    {k:'Chạy ở đâu', v:['Trình duyệt của người dùng','Máy chủ']},
    {k:'Người dùng sửa được không', v:['Được — mở F12 là sửa','Không']},
    {k:'Việc chính', v:['Hiển thị, nhận thao tác, phản hồi tức thì','Logic nghiệp vụ, dữ liệu, quyền hạn']},
    {k:'Kiểm tra dữ liệu để làm gì', v:['Cho người dùng đỡ bực','Để bảo vệ hệ thống — mới là thật']},
    {k:'Test bằng gì', v:['E2E, visual testing','API testing, unit test']}
  ],
  nho:'Câu duy nhất cần nhớ: <strong>mọi thứ frontend gửi lên đều có thể đã bị sửa.</strong> Vì thế backend luôn phải kiểm lại, kể cả khi frontend đã kiểm rồi.',
  chon:[
    {neu:'Nút bị lệch, chữ hiển thị sai', thi:'Frontend'},
    {neu:'Đặt được đơn hàng với số lượng 0', thi:'Backend — frontend chặn không tính'},
    {neu:'Trang tải chậm', thi:'Có thể cả hai — xem tab Network để biết chờ ở đâu'}
  ],
  bay:'Bẫy kinh điển khi test: thấy nút Thanh toán bị mờ đi nên kết luận “không đặt được đơn sai”. Mở F12 gõ một dòng là nút sáng lại và bấm được. <strong>Chỉ khi backend từ chối thì mới thật sự là chặn.</strong>',
  faq:[
    {h:'Fullstack là gì?', a:'Là người làm được cả hai phía. Không phải một phần thứ ba, chỉ là một người kiêm hai việc.'},
    {h:'Tester cần biết code frontend hay backend?', a:'Biết đủ để mở F12, đọc tab Network và hiểu request/response là đã đi được rất xa. Không cần viết được ứng dụng.'}
  ]
},

{
  slug:'add-commit-va-push', cat:'Nền tảng', terms:['Commit','Push'],
  h1:'git add, commit và push khác nhau thế nào?',
  tldr:'Ba bước, ba nơi khác nhau. <strong>add</strong> chọn thay đổi nào sẽ được lưu. <strong>commit</strong> lưu thật, nhưng chỉ trên máy bạn. <strong>push</strong> mới đưa lên GitHub để người khác và CI nhìn thấy. Thiếu bước nào thì bước sau không có gì để làm.',
  cols:['git add','git commit','git push'],
  rows:[
    {k:'Việc chính', v:['Chọn file/thay đổi đưa vào “khung hình”','Chụp ảnh khung hình đó, kèm lời ghi chú','Gửi các ảnh đã chụp lên kho chung']},
    {k:'Kết quả nằm ở đâu', v:['Vùng chờ (staging) trên máy bạn','Lịch sử Git trên máy bạn','Kho chung trên mạng (GitHub, GitLab…)']},
    {k:'Người khác thấy chưa', v:['Chưa','Chưa','<strong>Rồi</strong>']},
    {k:'CI chạy chưa', v:['Chưa','Chưa','<strong>Rồi</strong> — push là tín hiệu để CI thức dậy']},
    {k:'Làm lại được không', v:['Dễ — <code>git restore --staged</code>','Dễ nếu chưa push — <code>git commit --amend</code>','Khó — đã lên là người khác có thể đã kéo về']},
    {k:'Quên bước này thì', v:['<code>commit</code> báo “nothing to commit”','<code>push</code> báo “Everything up-to-date”','GitHub vẫn là bản cũ, đồng đội tưởng bạn chưa làm gì']}
  ],
  nho:'Nhớ theo trình tự: <strong>add = chọn · commit = chụp · push = nộp.</strong> Chụp mà không nộp thì ảnh vẫn nằm trong máy.',
  chon:[
    {neu:'Gõ <code>git commit</code> mà Git bảo “nothing to commit”', thi:'Quên add — chạy <code>git add -A</code> rồi commit lại'},
    {neu:'Đã commit, mở GitHub không thấy gì', thi:'Quên push — chạy <code>git push</code>'},
    {neu:'Push bị từ chối (rejected)', thi:'Kho chung đã có commit mới — <code>git pull</code> rồi push lại'},
    {neu:'Lỡ commit sai lời, chưa push', thi:'<code>git commit --amend -m "lời mới"</code>'}
  ],
  bay:'Bẫy phổ biến nhất của người mới: commit đều đặn, cảm giác rất an toàn, nhưng <strong>cả tuần không push</strong>. Ổ cứng hỏng là mất sạch, và đồng đội không hề biết bạn đang làm gì. Commit là bảo hiểm trên máy bạn; push mới là bảo hiểm thật.',
  faq:[
    {h:'Tại sao Git không gộp add và commit làm một?', a:'Để bạn chọn được <em>một phần</em> thay đổi cho mỗi commit. Sửa lỗi và đổi tên biến trong cùng buổi làm việc có thể thành hai commit riêng, sau này tìm lỗi dễ hơn. Khi mới học cứ dùng <code>git add -A</code> là đủ.'},
    {h:'Có cần push sau mỗi commit không?', a:'Không bắt buộc, nhưng nên push ít nhất cuối mỗi buổi làm việc. Nhiều commit nhỏ rồi push một lần cũng bình thường.'},
    {h:'Push rồi có rút lại được không?', a:'Rút bằng cách tạo commit mới đảo ngược (<code>git revert</code>), không xoá lịch sử. Xoá lịch sử đã push (<code>push --force</code>) chỉ nên làm trên nhánh của riêng bạn.'}
  ]
},

{
  slug:'rag-va-fine-tuning', cat:'AI', terms:['RAG','Fine-tuning'],
  h1:'RAG và Fine-tuning — chọn cái nào?',
  tldr:'Cần model <strong>biết thêm dữ liệu</strong> của bạn → RAG. Cần model <strong>cư xử khác</strong>, đúng giọng và đúng định dạng → fine-tuning.',
  cols:['RAG','Fine-tuning'],
  rows:[
    {k:'Giải quyết việc gì', v:['Model không biết dữ liệu của bạn','Model trả lời không đúng giọng, sai định dạng']},
    {k:'Cập nhật dữ liệu mới', v:['Ngay lập tức — chỉ cần thêm tài liệu','Phải huấn luyện lại']},
    {k:'Chi phí', v:['Thấp','Cao hơn nhiều']},
    {k:'Trích được nguồn', v:['Có','Không']},
    {k:'Cần chuẩn bị gì', v:['Kho tài liệu','Vài trăm tới vài nghìn ví dụ mẫu']},
    {k:'Giảm bịa đặt', v:['Có, đáng kể','Không — vẫn bịa như thường']}
  ],
  nho:'Một câu tự vấn: bạn cần nó <strong>biết thêm</strong> hay cần nó <strong>cư xử khác</strong>? Biết thêm → RAG. Cư xử khác → fine-tuning.',
  chon:[
    {neu:'Muốn AI trả lời theo bảng giá và chính sách công ty', thi:'RAG'},
    {neu:'Muốn AI luôn viết đúng giọng thương hiệu', thi:'Fine-tuning'},
    {neu:'Tài liệu đổi hàng tuần', thi:'RAG — fine-tune không theo kịp'},
    {neu:'Chưa thử tối ưu prompt cho tử tế', thi:'Làm prompt trước đã, rất nhiều trường hợp thế là đủ'}
  ],
  bay:'Sai lầm tốn kém phổ biến nhất là <strong>fine-tune để nhồi kiến thức</strong>. Vừa đắt, vừa không cập nhật được, và model vẫn bịa như thường vì fine-tuning không dạy nó biết mình đang không biết. Muốn nó biết dữ liệu của bạn thì RAG rẻ hơn và chính xác hơn nhiều.',
  faq:[
    {h:'Có thể dùng cả hai không?', a:'Có. Cách làm phổ biến là fine-tune để chốt giọng điệu và định dạng, rồi ghép RAG để cấp dữ liệu cập nhật.'},
    {h:'Nên thử cái nào trước?', a:'Prompt trước, RAG sau, fine-tuning cuối cùng. Đi theo thứ tự đó tiết kiệm được rất nhiều tiền và thời gian.'}
  ]
},

{
  slug:'ai-machine-learning-va-deep-learning', cat:'AI', terms:['AI','Machine Learning','Deep Learning'],
  h1:'AI, Machine Learning và Deep Learning khác nhau thế nào?',
  tldr:'Ba vòng tròn lồng nhau: <strong>AI là mục tiêu lớn nhất, Machine Learning là cách phổ biến nhất để đạt nó, Deep Learning là một nhánh của Machine Learning</strong> dùng mạng nơ-ron nhiều tầng.',
  cols:['AI','Machine Learning','Deep Learning'],
  rows:[
    {k:'Là gì', v:['Mục tiêu: máy làm việc cần trí thông minh','Cách làm: để máy tự rút quy tắc từ dữ liệu','Một nhánh của ML dùng mạng nhiều tầng']},
    {k:'Phạm vi', v:['Rộng nhất','Nằm trong AI','Nằm trong ML']},
    {k:'Có cần dữ liệu không', v:['Không nhất thiết — có thể là quy tắc viết tay','Bắt buộc','Bắt buộc, và cần rất nhiều']},
    {k:'Giải thích được quyết định', v:['Tuỳ cách làm','Thường được','Rất khó — gần như hộp đen']},
    {k:'Ví dụ', v:['Máy chơi cờ theo luật lập trình sẵn','Lọc thư rác, chấm điểm tín dụng','Nhận diện khuôn mặt, ChatGPT']}
  ],
  nho:'<strong>AI ⊃ Machine Learning ⊃ Deep Learning.</strong> Mọi Deep Learning đều là ML, mọi ML đều là AI — nhưng không ngược lại.',
  chon:[
    {neu:'Quy tắc rõ ràng, viết ra được', thi:'Không cần ML — cứ viết quy tắc, rẻ và giải thích được'},
    {neu:'Dữ liệu dạng bảng, vài nghìn dòng', thi:'Machine Learning cổ điển, thường tốt hơn deep learning'},
    {neu:'Ảnh, âm thanh, ngôn ngữ', thi:'Deep Learning'},
    {neu:'Bắt buộc giải thích được từng quyết định', thi:'Tránh Deep Learning'}
  ],
  bay:'Bẫy giao tiếp: dùng lẫn lộn ba từ này trong cùng một cuộc họp khiến không ai biết bạn đang nói ở mức nào. Và trong bán hàng, <strong>“AI” thường được dùng cho cả những thứ chỉ là vài câu lệnh <code>if</code></strong> — nghe thấy từ này thì nên hỏi lại cụ thể là gì.',
  faq:[
    {h:'ChatGPT thuộc loại nào?', a:'Cả ba. Nó là một ứng dụng AI, xây bằng Machine Learning, cụ thể là Deep Learning với kiến trúc mạng nơ-ron nhiều tầng.'},
    {h:'Deep Learning có luôn tốt hơn Machine Learning không?', a:'Không. Với dữ liệu dạng bảng và lượng vừa phải, các mô hình cổ điển thường chính xác hơn, chạy nhanh hơn và giải thích được — trong khi deep learning cần rất nhiều dữ liệu và máy mạnh.'}
  ]
}

];
