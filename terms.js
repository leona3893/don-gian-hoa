// Nguồn dữ liệu duy nhất: index.html và build.mjs cùng đọc file này.
export const slugify = s => String(s)
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd').replace(/Đ/g, 'D')
  .toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

export const TERMS = [
  {name:'API', icon:'🍽️', cat:'Web', brief:'Người phục vụ giúp hai phần mềm nói chuyện.', plain:'API là cánh cửa có quy tắc để một ứng dụng yêu cầu dữ liệu hoặc việc gì đó từ ứng dụng khác.', analogy:'Hãy hình dung bạn không vào bếp tự nấu: bạn gọi món với người phục vụ. Họ chuyển đúng yêu cầu vào bếp và mang kết quả ra.', related:['Frontend','Backend','Server']},
  {name:'Database', icon:'🗄️', cat:'Dữ liệu', brief:'Tủ hồ sơ được sắp xếp để tìm lại thật nhanh.', plain:'Database là nơi lưu trữ dữ liệu có tổ chức: tài khoản, sản phẩm, đơn hàng, bài viết…', analogy:'Nó như kho hồ sơ của thư viện: mỗi thứ có vị trí riêng, nên cần là tìm được thay vì lục tung mọi thứ.', related:['Server','Backend','Cache']},
  {name:'Server', icon:'🏢', cat:'Web', brief:'Nơi luôn trực để trả lời yêu cầu từ người dùng.', plain:'Server là máy tính hoặc chương trình cung cấp dữ liệu, xử lý yêu cầu và gửi kết quả về cho thiết bị của bạn.', analogy:'Giống quầy bếp luôn mở: bạn đặt món từ điện thoại, quầy bếp nhận đơn, làm món rồi gửi lại.', related:['API','Cloud','Database']},
  {name:'Frontend', icon:'🪟', cat:'Phát triển', brief:'Phần bạn nhìn và trực tiếp bấm vào.', plain:'Frontend là giao diện website hoặc ứng dụng chạy trước mắt người dùng.', analogy:'Đây là sảnh, menu và nút bấm của một cửa hàng — thứ khách thấy và tương tác.', related:['Backend','UI/UX','API']},
  {name:'Backend', icon:'⚙️', cat:'Phát triển', brief:'Phần hậu trường xử lý mọi việc phía sau.', plain:'Backend chứa logic, dữ liệu và các quy tắc vận hành để ứng dụng hoạt động đúng.', analogy:'Nếu frontend là mặt tiền cửa hàng thì backend là kho, sổ sách và đội vận hành bên trong.', related:['Frontend','Server','Database']},
  {name:'Cloud', icon:'☁️', cat:'Hạ tầng', brief:'Thuê tài nguyên máy tính qua Internet.', plain:'Cloud cho phép bạn dùng máy chủ, lưu trữ hay phần mềm của nhà cung cấp thay vì tự mua và chăm máy.', analogy:'Như thuê căn hộ có sẵn điện nước thay vì tự mua đất, xây nhà và bảo trì từng thứ.', related:['Server','Deploy','Database']},
  {name:'Cache', icon:'⚡', cat:'Hiệu năng', brief:'Ngăn để đồ hay dùng, giúp lấy nhanh hơn.', plain:'Cache giữ tạm dữ liệu thường xuyên được dùng để lần sau không cần tính hoặc tải lại từ đầu.', analogy:'Bạn để chìa khóa ở một cái khay cạnh cửa, thay vì mỗi lần ra ngoài lại đi tìm khắp nhà.', related:['Database','Server','API']},
  {name:'Git', icon:'🕰️', cat:'Công cụ', brief:'Cỗ máy thời gian cho mã nguồn.', plain:'Git lưu các mốc thay đổi của dự án và giúp nhiều người làm cùng nhau mà không mất công việc.', analogy:'Như Google Docs có lịch sử chỉnh sửa, nhưng mạnh hơn và dành cho việc làm phần mềm.', related:['Deploy','Backend','Frontend']},
  {name:'Deploy', icon:'🚀', cat:'Hạ tầng', brief:'Đưa sản phẩm từ máy làm việc đến nơi người dùng dùng được.', plain:'Deploy là quá trình phát hành phiên bản ứng dụng để nó chạy ở môi trường thật.', analogy:'Nấu xong trong bếp chưa đủ; deploy là lúc đưa món ra quầy để khách có thể gọi.', related:['Cloud','Server','Git']},
  {name:'Bug', icon:'🐛', cat:'Cơ bản', brief:'Lỗi khiến sản phẩm hoạt động không đúng ý.', plain:'Bug là sai sót trong mã, dữ liệu hoặc thiết kế gây ra hành vi ngoài dự tính.', analogy:'Như công thức ghi nhầm một muỗng muối thành một bát muối: mọi bước vẫn làm, nhưng kết quả sai.', related:['Debug','Git','Backend']},
  {name:'Debug', icon:'🔎', cat:'Cơ bản', brief:'Tìm và sửa nguyên nhân của lỗi.', plain:'Debug là công việc quan sát, đặt giả thuyết và kiểm tra để biết vì sao bug xảy ra.', analogy:'Giống thợ sửa xe lần theo dấu hiệu để biết xe không nổ máy vì hết xăng, yếu bình hay hỏng bugi.', related:['Bug','Git','Backend']},
  {name:'UI/UX', icon:'✨', cat:'Thiết kế', brief:'Làm sản phẩm vừa đẹp, vừa dễ dùng.', plain:'UI là giao diện nhìn thấy; UX là toàn bộ trải nghiệm khi một người cố hoàn thành việc gì đó.', analogy:'UI là màu sơn và biển chỉ dẫn của quán; UX là việc khách có tìm được bàn, gọi món và thanh toán thoải mái không.', related:['Frontend','API','Backend']}
];

export const ALIASES = {
  'API':'giao dien lap trinh ket noi ung dung', 'Database':'co so du lieu du lieu', 'Server':'may chu',
  'Frontend':'giao dien phia nguoi dung', 'Backend':'phia may chu xu ly he thong', 'Cloud':'dien toan dam may',
  'Cache':'bo nho dem luu tam', 'Git':'quan ly phien ban ma nguon', 'Deploy':'trien khai phat hanh',
  'Bug':'loi phan mem', 'Debug':'sua loi tim loi', 'UI/UX':'thiet ke giao dien trai nghiem nguoi dung'
};
