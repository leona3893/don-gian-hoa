// Hình minh hoạ cho ảnh chia sẻ (og:image). Mỗi hình vẽ đúng ẩn dụ của thuật ngữ đó.
// Toạ độ: tâm (0,0), gói trong khoảng ±130. Nét lime, không tô — style pictogram.
// Thuộc tính stroke/fill đặt ở <g> bao ngoài trong build.mjs; ở đây chỉ ghi đè khi cần.

const BG = '#193629', LIME = '#d9f26c';

export const HINH = {

// ═══════════ NỀN TẢNG ═══════════

// người phục vụ bưng món có nắp
'API': `<path d="M-96,10 A96,96 0 0 1 96,10"/><line x1="-124" y1="10" x2="124" y2="10"/><line x1="0" y1="-86" x2="0" y2="-100"/><circle cx="0" cy="-110" r="10"/><path d="M-22,10 L-22,54 Q0,76 22,54 L22,10"/>`,

// tủ hồ sơ
'Database': `<rect x="-80" y="-120" width="160" height="240" rx="10"/><line x1="-80" y1="-40" x2="80" y2="-40"/><line x1="-80" y1="40" x2="80" y2="40"/><line x1="-22" y1="-80" x2="22" y2="-80"/><line x1="-22" y1="0" x2="22" y2="0"/><line x1="-22" y1="80" x2="22" y2="80"/>`,

// chuông quầy — luôn trực
'Server': `<path d="M-80,30 A80,80 0 0 1 80,30"/><line x1="-110" y1="30" x2="110" y2="30"/><line x1="-90" y1="52" x2="90" y2="52"/><line x1="0" y1="-50" x2="0" y2="-70"/><rect x="-16" y="-96" width="32" height="26" rx="8"/>`,

// mặt tiền cửa hàng có mái hiên
'Frontend': `<path d="M-120,-40 L-120,-90 L120,-90 L120,-40"/><path d="M-120,-40 Q-100,-12 -80,-40 Q-60,-12 -40,-40 Q-20,-12 0,-40 Q20,-12 40,-40 Q60,-12 80,-40 Q100,-12 120,-40"/><line x1="-100" y1="-28" x2="-100" y2="110"/><line x1="100" y1="-28" x2="100" y2="110"/><line x1="-120" y1="110" x2="120" y2="110"/><rect x="-30" y="20" width="60" height="90"/><rect x="-88" y="20" width="40" height="40"/><rect x="48" y="20" width="40" height="40"/>`,

// kho hàng — thùng xếp chồng
'Backend': `<rect x="-110" y="20" width="100" height="90"/><rect x="10" y="20" width="100" height="90"/><rect x="-50" y="-70" width="100" height="90"/><line x1="-60" y1="20" x2="-60" y2="110"/><line x1="60" y1="20" x2="60" y2="110"/><line x1="0" y1="-70" x2="0" y2="20"/>`,

// căn hộ thuê sẵn
'Cloud': `<rect x="-80" y="-120" width="160" height="240"/><rect x="-55" y="-95" width="30" height="30"/><rect x="25" y="-95" width="30" height="30"/><rect x="-55" y="-40" width="30" height="30"/><rect x="25" y="-40" width="30" height="30"/><rect x="-55" y="15" width="30" height="30"/><rect x="25" y="15" width="30" height="30"/><rect x="-20" y="70" width="40" height="50"/>`,

// chìa khoá để trên khay cạnh cửa
'Cache': `<rect x="-110" y="10" width="220" height="70" rx="14"/><circle cx="-50" cy="-40" r="28"/><line x1="-26" y1="-28" x2="76" y2="14"/><line x1="44" y1="2" x2="54" y2="-22"/><line x1="66" y1="10" x2="76" y2="-14"/>`,

// tài liệu có lịch sử quay lại
'Git': `<rect x="-100" y="-110" width="140" height="180" rx="10"/><line x1="-70" y1="-70" x2="10" y2="-70"/><line x1="-70" y1="-35" x2="10" y2="-35"/><line x1="-70" y1="0" x2="-20" y2="0"/><circle cx="62" cy="62" r="52" fill="${BG}"/><line x1="62" y1="34" x2="62" y2="62"/><line x1="62" y1="62" x2="82" y2="76"/>`,

// máy ảnh — mỗi commit là một ảnh chụp
'Commit': `<rect x="-120" y="-60" width="240" height="150" rx="16"/><path d="M-50,-60 L-36,-92 L36,-92 L50,-60"/><circle cx="0" cy="15" r="46"/><circle cx="0" cy="15" r="22"/><rect x="72" y="-40" width="26" height="14" rx="4"/>`,

// mũi tên đi lên, rời khỏi khay
'Push': `<path d="M-110,40 L-110,100 L110,100 L110,40"/><line x1="0" y1="60" x2="0" y2="-110"/><path d="M-50,-60 L0,-110 L50,-60"/>`,

// mũi tên đi xuống, rơi vào khay
'Pull': `<path d="M-110,40 L-110,100 L110,100 L110,40"/><line x1="0" y1="-110" x2="0" y2="60"/><path d="M-50,10 L0,60 L50,10"/>`,

// thân chính thẳng, một nhánh tách ra
'Branch': `<line x1="-50" y1="-110" x2="-50" y2="110"/><path d="M-50,-20 Q-50,40 50,40"/><circle cx="-50" cy="-110" r="16" fill="${BG}"/><circle cx="-50" cy="110" r="16" fill="${BG}"/><circle cx="66" cy="40" r="16" fill="${BG}"/>`,

// hai đường chụm về một
'Merge': `<path d="M-90,-110 L-90,-20 Q-90,40 0,50 L0,110"/><path d="M90,-110 L90,-20 Q90,40 0,50"/><circle cx="-90" cy="-110" r="16" fill="${BG}"/><circle cx="90" cy="-110" r="16" fill="${BG}"/><circle cx="0" cy="110" r="16" fill="${BG}"/>`,

// biểu tượng PR: nhánh bên trái, mũi tên cong sang nhánh phải
'Pull Request': `<line x1="-80" y1="-90" x2="-80" y2="90"/><circle cx="-80" cy="-110" r="18" fill="${BG}"/><circle cx="-80" cy="110" r="18" fill="${BG}"/><circle cx="80" cy="110" r="18" fill="${BG}"/><path d="M-20,-80 L40,-80 Q80,-80 80,-40 L80,90"/><path d="M6,-104 L-20,-80 L6,-56"/>`,

// đưa món ra quầy — đĩa bốc khói
'Deploy': `<ellipse cx="0" cy="60" rx="120" ry="30"/><ellipse cx="0" cy="60" rx="80" ry="18"/><path d="M-40,20 Q-55,-10 -40,-40 Q-25,-70 -40,-100"/><path d="M0,20 Q-15,-10 0,-40 Q15,-70 0,-100"/><path d="M40,20 Q25,-10 40,-40 Q55,-70 40,-100"/>`,

// công thức ghi nhầm — bát và muỗng
'Bug': `<path d="M-110,0 A110,110 0 0 0 110,0 Z"/><line x1="-110" y1="0" x2="110" y2="0"/><line x1="30" y1="-20" x2="88" y2="-108"/><ellipse cx="100" cy="-124" rx="17" ry="24" transform="rotate(35 100 -124)"/>`,

// lần theo dấu hiệu — kính lúp
'Debug': `<circle cx="-22" cy="-22" r="72"/><line x1="30" y1="30" x2="112" y2="112" stroke-width="13"/>`,

// biển chỉ dẫn của quán
'UI/UX': `<line x1="0" y1="-120" x2="0" y2="120"/><path d="M0,-90 L90,-90 L115,-65 L90,-40 L0,-40 Z"/><path d="M0,-10 L-90,-10 L-115,15 L-90,40 L0,40 Z"/><line x1="-30" y1="120" x2="30" y2="120"/>`,

// ═══════════ AI ═══════════

// người học việc nhìn nhiều ví dụ — con mắt
'AI': `<path d="M-120,0 Q0,-92 120,0 Q0,92 -120,0 Z"/><circle cx="0" cy="0" r="38"/><circle cx="0" cy="0" r="12" fill="${LIME}" stroke="none"/>`,

// cho xem nhiều con mèo
'Machine Learning': `<circle cx="0" cy="12" r="82"/><path d="M-66,-38 L-84,-112 L-22,-68"/><path d="M66,-38 L84,-112 L22,-68"/><circle cx="-30" cy="2" r="7" fill="${LIME}" stroke="none"/><circle cx="30" cy="2" r="7" fill="${LIME}" stroke="none"/><path d="M-12,34 L0,44 L12,34"/><line x1="-60" y1="30" x2="-120" y2="22"/><line x1="-60" y1="48" x2="-120" y2="54"/><line x1="60" y1="30" x2="120" y2="22"/><line x1="60" y1="48" x2="120" y2="54"/>`,

// dây chuyền nhiều công đoạn
'Deep Learning': `<rect x="-130" y="-35" width="60" height="70" rx="8"/><rect x="-30" y="-35" width="60" height="70" rx="8"/><rect x="70" y="-35" width="60" height="70" rx="8"/><line x1="-70" y1="0" x2="-30" y2="0"/><line x1="30" y1="0" x2="70" y2="0"/><line x1="-130" y1="62" x2="130" y2="62"/>`,

// hội đồng nhiều vòng — mạng nút
'Neural Network': `<circle cx="-100" cy="-70" r="18"/><circle cx="-100" cy="0" r="18"/><circle cx="-100" cy="70" r="18"/><circle cx="0" cy="-40" r="18"/><circle cx="0" cy="40" r="18"/><circle cx="100" cy="0" r="18"/><line x1="-82" y1="-64" x2="-18" y2="-46"/><line x1="-82" y1="-58" x2="-18" y2="30"/><line x1="-82" y1="-6" x2="-18" y2="-34"/><line x1="-82" y1="6" x2="-18" y2="34"/><line x1="-82" y1="58" x2="-18" y2="-30"/><line x1="-82" y1="64" x2="-18" y2="46"/><line x1="18" y1="-34" x2="82" y2="-6"/><line x1="18" y1="34" x2="82" y2="6"/>`,

// công thức đúc kết
'Model': `<rect x="-90" y="-120" width="180" height="240" rx="12"/><line x1="-55" y1="-75" x2="55" y2="-75" stroke-width="10"/><line x1="-55" y1="-30" x2="55" y2="-30"/><line x1="-55" y1="5" x2="55" y2="5"/><line x1="-55" y1="40" x2="20" y2="40"/><path d="M-55,92 L-40,107 L-14,77"/>`,

// luyện đề — dò đáp án
'Training': `<rect x="-90" y="-120" width="180" height="240" rx="12"/><path d="M-60,-72 L-48,-60 L-30,-84"/><line x1="-12" y1="-70" x2="55" y2="-70"/><path d="M-60,-12 L-36,12 M-36,-12 L-60,12"/><line x1="-12" y1="0" x2="55" y2="0"/><path d="M-60,58 L-48,70 L-30,46"/><line x1="-12" y1="60" x2="55" y2="60"/>`,

// bộ đề — chồng giấy
'Dataset': `<rect x="-50" y="-90" width="150" height="180" rx="10"/><path d="M-75,-65 L-75,115 L75,115"/><path d="M-100,-40 L-100,140 L50,140"/><line x1="-20" y1="-50" x2="70" y2="-50"/><line x1="-20" y1="-15" x2="70" y2="-15"/><line x1="-20" y1="20" x2="30" y2="20"/>`,

// đọc gần hết thư viện
'LLM': `<line x1="-130" y1="100" x2="130" y2="100"/><rect x="-118" y="-60" width="34" height="160"/><rect x="-72" y="-90" width="34" height="190"/><rect x="-26" y="-40" width="34" height="140"/><rect x="20" y="-75" width="34" height="175"/><rect x="82" y="-58" width="34" height="158" transform="rotate(13 99 21)"/>`,

// đặt hàng thợ may — thước đo
'Prompt': `<rect x="-130" y="-30" width="260" height="60" rx="8"/><line x1="-108" y1="-30" x2="-108" y2="2"/><line x1="-86" y1="-30" x2="-86" y2="-14"/><line x1="-64" y1="-30" x2="-64" y2="2"/><line x1="-42" y1="-30" x2="-42" y2="-14"/><line x1="-20" y1="-30" x2="-20" y2="2"/><line x1="2" y1="-30" x2="2" y2="-14"/><line x1="24" y1="-30" x2="24" y2="2"/><line x1="46" y1="-30" x2="46" y2="-14"/><line x1="68" y1="-30" x2="68" y2="2"/><line x1="90" y1="-30" x2="90" y2="-14"/><line x1="112" y1="-30" x2="112" y2="2"/>`,

// đếm tiền theo tờ
'Token': `<rect x="-120" y="-20" width="240" height="110" rx="10"/><path d="M-104,-42 L118,-42 L118,-20"/><path d="M-88,-64 L104,-64 L104,-42"/><circle cx="0" cy="35" r="26"/>`,

// mặt bàn có hạn — tờ rơi khỏi bàn
'Context window': `<line x1="-140" y1="30" x2="90" y2="30"/><line x1="-120" y1="30" x2="-120" y2="120"/><line x1="70" y1="30" x2="70" y2="120"/><rect x="-110" y="-30" width="60" height="60" rx="4"/><rect x="-35" y="-30" width="60" height="60" rx="4"/><rect x="95" y="25" width="60" height="60" rx="4" transform="rotate(32 125 55)"/>`,

// kể chuyện quá tự tin — lời uốn éo
'Hallucination': `<path d="M-110,-80 h220 a20,20 0 0 1 20,20 v90 a20,20 0 0 1 -20,20 h-140 l-40,40 v-40 h-40 a20,20 0 0 1 -20,-20 v-90 a20,20 0 0 1 20,-20 z"/><path d="M-72,-18 Q-54,-44 -36,-18 T0,-18 T36,-18 T72,-18"/><path d="M-72,20 Q-54,-6 -36,20 T0,20"/>`,

// tinh chỉnh — các núm gạt
'Fine-tuning': `<line x1="-120" y1="-70" x2="120" y2="-70"/><circle cx="-40" cy="-70" r="16" fill="${BG}"/><line x1="-120" y1="0" x2="120" y2="0"/><circle cx="52" cy="0" r="16" fill="${BG}"/><line x1="-120" y1="70" x2="120" y2="70"/><circle cx="-4" cy="70" r="16" fill="${BG}"/>`,

// thi mở tài liệu — sách mở có đánh dấu
'RAG': `<path d="M-130,-80 Q-65,-100 0,-80 L0,100 Q-65,80 -130,100 Z"/><path d="M130,-80 Q65,-100 0,-80 L0,100 Q65,80 130,100 Z"/><path d="M50,-96 L50,-20 L66,-36 L82,-20 L82,-96"/>`,

// xếp sách theo chủ đề — cụm gần nhau
'Embedding': `<circle cx="-72" cy="-42" r="58" stroke-dasharray="7 9"/><circle cx="-84" cy="-54" r="11" fill="${LIME}" stroke="none"/><circle cx="-56" cy="-70" r="11" fill="${LIME}" stroke="none"/><circle cx="-60" cy="-28" r="11" fill="${LIME}" stroke="none"/><circle cx="-94" cy="-22" r="11" fill="${LIME}" stroke="none"/><circle cx="82" cy="52" r="48" stroke-dasharray="7 9"/><circle cx="68" cy="46" r="11" fill="${LIME}" stroke="none"/><circle cx="96" cy="32" r="11" fill="${LIME}" stroke="none"/><circle cx="88" cy="74" r="11" fill="${LIME}" stroke="none"/>`,

// vào → xử lý → ra
'Inference': `<rect x="-50" y="-50" width="100" height="100" rx="12"/><line x1="-130" y1="0" x2="-62" y2="0"/><path d="M-82,-18 L-62,0 L-82,18"/><line x1="62" y1="0" x2="130" y2="0"/><path d="M110,-18 L130,0 L110,18"/>`,

// cả trăm thợ phụ cùng làm — lưới
'GPU': `<rect x="-115" y="-115" width="62" height="62" rx="6"/><rect x="-31" y="-115" width="62" height="62" rx="6"/><rect x="53" y="-115" width="62" height="62" rx="6"/><rect x="-115" y="-31" width="62" height="62" rx="6"/><rect x="-31" y="-31" width="62" height="62" rx="6"/><rect x="53" y="-31" width="62" height="62" rx="6"/><rect x="-115" y="53" width="62" height="62" rx="6"/><rect x="-31" y="53" width="62" height="62" rx="6"/><rect x="53" y="53" width="62" height="62" rx="6"/>`,

// cân lệch
'Bias': `<line x1="0" y1="-104" x2="0" y2="92"/><line x1="-64" y1="92" x2="64" y2="92"/><g transform="rotate(-14)"><line x1="-114" y1="-78" x2="114" y2="-78"/><line x1="-114" y1="-78" x2="-114" y2="-14"/><path d="M-158,-14 Q-114,26 -70,-14"/><line x1="114" y1="-78" x2="114" y2="-14"/><path d="M70,-14 Q114,26 158,-14"/></g>`,

// trợ lý được giao việc — bảng kẹp
'Agent': `<rect x="-90" y="-100" width="180" height="220" rx="12"/><rect x="-35" y="-118" width="70" height="34" rx="8" fill="${BG}"/><path d="M-60,-42 L-48,-30 L-30,-54"/><line x1="-10" y1="-40" x2="55" y2="-40"/><path d="M-60,8 L-48,20 L-30,-4"/><line x1="-10" y1="10" x2="55" y2="10"/><rect x="-62" y="50" width="24" height="24" rx="4"/><line x1="-10" y1="62" x2="55" y2="62"/>`,

// biển báo giao thông
'Computer Vision': `<path d="M0,-120 L100,40 L-100,40 Z"/><line x1="0" y1="-52" x2="0" y2="0"/><circle cx="0" cy="20" r="5" fill="${LIME}" stroke="none"/><line x1="0" y1="40" x2="0" y2="120"/>`,

// phiên dịch — hai bên nói chuyện
'NLP': `<path d="M-130,-90 h110 a14,14 0 0 1 14,14 v60 a14,14 0 0 1 -14,14 h-70 l-26,26 v-26 h-14 a14,14 0 0 1 -14,-14 v-60 a14,14 0 0 1 14,-14 z"/><path d="M130,90 h-110 a14,14 0 0 1 -14,-14 v-60 a14,14 0 0 1 14,-14 h70 l26,-26 v26 h14 a14,14 0 0 1 14,14 v60 a14,14 0 0 1 -14,14 z"/>`,

// nhân viên tổng đài — tai nghe
'Chatbot': `<path d="M-90,20 A90,90 0 0 1 90,20"/><rect x="-110" y="10" width="34" height="60" rx="10"/><rect x="76" y="10" width="34" height="60" rx="10"/><path d="M93,70 Q93,110 40,110"/><circle cx="28" cy="110" r="10"/>`,

// học tủ — đường vẽ luồn qua từng điểm
'Overfitting': `<path d="M-125,60 L-110,30 L-95,-20 L-70,-40 L-50,10 L-30,50 L-10,20 L10,-20 L30,10 L50,40 L70,-10 L90,-50 L105,-10 L120,20 L130,-30"/><circle cx="-110" cy="30" r="9" fill="${LIME}" stroke="none"/><circle cx="-70" cy="-40" r="9" fill="${LIME}" stroke="none"/><circle cx="-30" cy="50" r="9" fill="${LIME}" stroke="none"/><circle cx="10" cy="-20" r="9" fill="${LIME}" stroke="none"/><circle cx="50" cy="40" r="9" fill="${LIME}" stroke="none"/><circle cx="90" cy="-50" r="9" fill="${LIME}" stroke="none"/><circle cx="120" cy="20" r="9" fill="${LIME}" stroke="none"/>`,

// ═══════════ KIỂM THỬ ═══════════

// dây chuyền soi hàng
'Test Automation': `<line x1="-130" y1="30" x2="130" y2="30"/><line x1="-130" y1="70" x2="130" y2="70"/><circle cx="-90" cy="50" r="14"/><circle cx="-30" cy="50" r="14"/><circle cx="30" cy="50" r="14"/><circle cx="90" cy="50" r="14"/><rect x="-110" y="-30" width="60" height="60"/><rect x="20" y="-30" width="60" height="60"/>`,

// câu hỏi có sẵn đáp án
'Test Case': `<rect x="-90" y="-120" width="180" height="240" rx="12"/><path d="M-26,-72 Q-26,-100 0,-100 Q28,-100 28,-76 Q28,-56 0,-46 L0,-26"/><circle cx="0" cy="-4" r="5" fill="${LIME}" stroke="none"/><line x1="-55" y1="34" x2="55" y2="34"/><path d="M-30,76 L-12,94 L30,56"/>`,

// cả đề thi — bìa hồ sơ
'Test Suite': `<path d="M-120,-70 L-120,100 L120,100 L120,-40 L-10,-40 L-30,-70 Z"/><line x1="-120" y1="-40" x2="-10" y2="-40"/><path d="M-60,18 L-48,30 L-30,6"/><line x1="-10" y1="20" x2="70" y2="20"/><path d="M-60,58 L-48,70 L-30,46"/><line x1="-10" y1="60" x2="70" y2="60"/>`,

// kịch bản quay phim
'Test Script': `<rect x="-120" y="-20" width="240" height="130" rx="8"/><rect x="-120" y="-80" width="240" height="60" rx="8"/><line x1="-70" y1="-80" x2="-95" y2="-20"/><line x1="-10" y1="-80" x2="-35" y2="-20"/><line x1="50" y1="-80" x2="25" y2="-20"/><line x1="110" y1="-80" x2="85" y2="-20"/>`,

// chấm đúng sai — dấu tích trong khung
'Assertion': `<rect x="-100" y="-100" width="200" height="200" rx="20"/><path d="M-55,0 L-15,40 L60,-45" stroke-width="11"/>`,

// giám thị canh giờ — đồng hồ bấm
'Test Runner': `<circle cx="0" cy="15" r="95"/><line x1="0" y1="-80" x2="0" y2="-110"/><line x1="-25" y1="-110" x2="25" y2="-110"/><line x1="0" y1="15" x2="0" y2="-42"/><line x1="0" y1="15" x2="42" y2="36"/><line x1="72" y1="-58" x2="90" y2="-76"/>`,

// thử riêng từng linh kiện — bánh răng
'Unit Test': `<circle cx="0" cy="0" r="72"/><circle cx="0" cy="0" r="28"/><g stroke-width="22" stroke-linecap="butt"><line x1="68" y1="0" x2="102" y2="0"/><line x1="48" y1="48" x2="72" y2="72"/><line x1="0" y1="68" x2="0" y2="102"/><line x1="-48" y1="48" x2="-72" y2="72"/><line x1="-68" y1="0" x2="-102" y2="0"/><line x1="-48" y1="-48" x2="-72" y2="-72"/><line x1="0" y1="-68" x2="0" y2="-102"/><line x1="48" y1="-48" x2="72" y2="-72"/></g>`,

// cắm điện cả mạch — phích và ổ
'Integration Test': `<rect x="10" y="-70" width="120" height="140" rx="16"/><rect x="40" y="-30" width="16" height="32" rx="3"/><rect x="84" y="-30" width="16" height="32" rx="3"/><rect x="-125" y="-45" width="80" height="90" rx="14"/><line x1="-45" y1="-14" x2="-8" y2="-14"/><line x1="-45" y1="14" x2="-8" y2="14"/><line x1="-125" y1="0" x2="-145" y2="0"/>`,

// đóng vai khách — túi mua hàng
'E2E Test': `<path d="M-90,-30 L-105,110 L105,110 L90,-30 Z"/><path d="M-45,-30 L-45,-62 A45,45 0 0 1 45,-62 L45,-30"/>`,

// mở thử vòi khác — vòi nước rỉ
'Regression Test': `<path d="M-60,-100 L-60,-60 L40,-60 L40,-22"/><rect x="-92" y="-122" width="64" height="30" rx="6"/><rect x="18" y="-26" width="44" height="30" rx="6"/><path d="M40,30 Q28,50 40,62 Q52,50 40,30 Z"/><path d="M40,82 Q28,102 40,114 Q52,102 40,82 Z"/>`,

// nổ máy xe — nút nguồn
'Smoke Test': `<path d="M-57,-57 A80,80 0 1 0 57,-57"/><line x1="0" y1="-100" x2="0" y2="-10"/>`,

// vá lốp xong bơm thử
'Sanity Test': `<circle cx="0" cy="0" r="110"/><circle cx="0" cy="0" r="60"/><rect x="55" y="-96" width="36" height="36" rx="6" transform="rotate(35 73 -78)"/>`,

// điều khiển từ xa
'Selenium': `<rect x="-50" y="-130" width="100" height="260" rx="20"/><circle cx="0" cy="-72" r="28"/><circle cx="-22" cy="-6" r="8" fill="${LIME}" stroke="none"/><circle cx="22" cy="-6" r="8" fill="${LIME}" stroke="none"/><circle cx="-22" cy="30" r="8"/><circle cx="22" cy="30" r="8"/><circle cx="-22" cy="66" r="8"/><circle cx="22" cy="66" r="8"/><rect x="-30" y="92" width="60" height="18" rx="9"/>`,

// xe có trợ lái — vô lăng
'Playwright': `<circle cx="0" cy="0" r="110"/><circle cx="0" cy="0" r="28"/><line x1="0" y1="28" x2="0" y2="110"/><line x1="-24" y1="-14" x2="-95" y2="-55"/><line x1="24" y1="-14" x2="95" y2="-55"/>`,

// camera hành trình
'Cypress': `<rect x="-120" y="-50" width="160" height="110" rx="14"/><path d="M40,-10 L120,-50 L120,60 L40,20"/><circle cx="-40" cy="5" r="28"/><circle cx="-40" cy="5" r="10"/>`,

// điện thoại
'Appium': `<rect x="-65" y="-130" width="130" height="260" rx="22"/><line x1="-28" y1="-102" x2="28" y2="-102"/><rect x="-45" y="-82" width="90" height="150" rx="6"/><circle cx="0" cy="100" r="12"/>`,

// mọi hãng xe lái giống nhau
'WebDriver': `<path d="M-130,40 L-130,0 L-90,0 L-60,-50 L50,-50 L90,0 L130,0 L130,40 Z"/><circle cx="-75" cy="45" r="26" fill="${BG}"/><circle cx="75" cy="45" r="26" fill="${BG}"/><line x1="-40" y1="-50" x2="-40" y2="0"/><line x1="30" y1="-50" x2="30" y2="0"/>`,

// địa chỉ nhà — ghim bản đồ
'Locator': `<path d="M0,-130 C-46,-130 -72,-94 -72,-58 C-72,-12 0,52 0,52 C0,52 72,-12 72,-58 C72,-94 46,-130 0,-130 Z"/><circle cx="0" cy="-60" r="24"/><line x1="-100" y1="112" x2="100" y2="112"/>`,

// chỉ đường bằng mô tả — lối đi nhiều khúc rẽ
'XPath': `<path d="M-120,110 L-120,20 L-30,20 L-30,-60 L60,-60 L60,-110" stroke-dasharray="12 12"/><circle cx="-120" cy="110" r="10" fill="${LIME}" stroke="none"/><path d="M60,-150 L112,-134 L60,-118"/><line x1="60" y1="-150" x2="60" y2="-110"/>`,

// danh bạ
'Page Object Model': `<rect x="-80" y="-120" width="160" height="240" rx="10"/><rect x="80" y="-90" width="24" height="40" rx="4"/><rect x="80" y="-30" width="24" height="40" rx="4"/><rect x="80" y="30" width="24" height="40" rx="4"/><circle cx="-40" cy="-60" r="14"/><line x1="-14" y1="-60" x2="45" y2="-60"/><circle cx="-40" cy="0" r="14"/><line x1="-14" y1="0" x2="45" y2="0"/><circle cx="-40" cy="60" r="14"/><line x1="-14" y1="60" x2="45" y2="60"/>`,

// công tắc tiếp xúc kém — bóng đèn chập chờn
'Flaky Test': `<circle cx="0" cy="-28" r="62"/><path d="M-26,28 L-26,66 L26,66 L26,28"/><line x1="-18" y1="86" x2="18" y2="86"/><line x1="-92" y1="-28" x2="-124" y2="-28"/><line x1="-66" y1="-92" x2="-90" y2="-116"/><line x1="0" y1="-118" x2="0" y2="-148"/><line x1="92" y1="-28" x2="124" y2="-28" stroke-dasharray="7 9"/><line x1="66" y1="-92" x2="90" y2="-116" stroke-dasharray="7 9"/>`,

// chờ bếp báo — đồng hồ cát
'Wait': `<line x1="-70" y1="-120" x2="70" y2="-120"/><line x1="-70" y1="120" x2="70" y2="120"/><path d="M-55,-120 L-55,-70 L0,0 L-55,70 L-55,120"/><path d="M55,-120 L55,-70 L0,0 L55,70 L55,120"/><path d="M-32,82 L0,50 L32,82 Z" fill="${LIME}" stroke="none"/><path d="M-20,-62 L0,-36 L20,-62 Z" fill="${LIME}" stroke="none"/>`,

// bếp kín — mũ đầu bếp
'Headless': `<rect x="-80" y="50" width="160" height="50" rx="8"/><path d="M-80,50 L-80,-10 A46,46 0 0 1 -50,-92 A56,56 0 0 1 50,-92 A46,46 0 0 1 80,-10 L80,50"/>`,

// ma-nơ-canh tiệm may
'Mock': `<circle cx="0" cy="-108" r="24"/><path d="M-48,-62 C-58,-10 -34,10 -26,52 L26,52 C34,10 58,-10 48,-62 Z"/><line x1="0" y1="52" x2="0" y2="112"/><line x1="-50" y1="112" x2="50" y2="112"/>`,

// đoạn ghi âm sẵn — băng cassette
'Stub': `<rect x="-130" y="-80" width="260" height="160" rx="14"/><circle cx="-55" cy="0" r="30"/><circle cx="55" cy="0" r="30"/><circle cx="-55" cy="0" r="10"/><circle cx="55" cy="0" r="10"/><line x1="-25" y1="-30" x2="25" y2="-30"/><line x1="-25" y1="30" x2="25" y2="30"/><line x1="-100" y1="60" x2="100" y2="60"/>`,

// bột và trứng để tập làm bánh
'Test Data': `<path d="M-110,20 A110,110 0 0 0 110,20 Z"/><line x1="-110" y1="20" x2="110" y2="20"/><ellipse cx="-42" cy="-48" rx="32" ry="40"/><ellipse cx="36" cy="-40" rx="32" ry="40" transform="rotate(20 36 -40)"/>`,

// quét nhà — sơ đồ phòng, còn một phòng chưa quét
'Test Coverage': `<rect x="-120" y="-90" width="240" height="180"/><line x1="-120" y1="0" x2="120" y2="0"/><line x1="0" y1="-90" x2="0" y2="90"/><path d="M-80,-52 L-64,-36 L-38,-68"/><path d="M40,-52 L56,-36 L82,-68"/><path d="M-80,38 L-64,54 L-38,22"/>`,

// băng chuyền tự trôi — vòng lặp
'CI/CD': `<path d="M-96,-28 A100,100 0 0 1 96,-28"/><path d="M76,-54 L96,-28 L122,-42"/><path d="M96,28 A100,100 0 0 1 -96,28"/><path d="M-76,54 L-96,28 L-122,42"/>`,

// dựng khuôn bánh trước rồi mới đổ bột
'TDD': `<path d="M-110,-40 L-90,90 L90,90 L110,-40"/><path d="M-110,-40 Q-96,-62 -82,-40 Q-68,-62 -54,-40 Q-40,-62 -26,-40 Q-12,-62 2,-40 Q16,-62 30,-40 Q44,-62 58,-40 Q72,-62 86,-40 Q98,-58 110,-40"/><line x1="0" y1="-125" x2="0" y2="-78"/><path d="M-16,-94 L0,-78 L16,-94"/>`,

// kể chuyện cho cả đội hiểu — lời nói có dấu tích
'BDD': `<path d="M-110,-80 h220 a20,20 0 0 1 20,20 v90 a20,20 0 0 1 -20,20 h-140 l-40,40 v-40 h-40 a20,20 0 0 1 -20,-20 v-90 a20,20 0 0 1 20,-20 z"/><path d="M-50,-12 L-14,24 L56,-46" stroke-width="10"/>`,

// công thức chia mục rõ ràng
'Gherkin': `<rect x="-100" y="-120" width="200" height="240" rx="12"/><circle cx="-60" cy="-66" r="12"/><line x1="-34" y1="-66" x2="60" y2="-66"/><circle cx="-60" cy="0" r="12"/><line x1="-34" y1="0" x2="60" y2="0"/><circle cx="-60" cy="66" r="12"/><line x1="-34" y1="66" x2="60" y2="66"/>`,

// bảng điểm cuối kỳ
'Test Report': `<rect x="-110" y="-110" width="220" height="220" rx="12"/><rect x="-72" y="10" width="30" height="70"/><rect x="-15" y="-42" width="30" height="122"/><rect x="42" y="-12" width="30" height="92"/><line x1="-86" y1="80" x2="86" y2="80"/>`,

// sân tập của đội bóng
'Test Environment': `<rect x="-130" y="-80" width="260" height="160"/><line x1="0" y1="-80" x2="0" y2="80"/><circle cx="0" cy="0" r="30"/><rect x="-130" y="-36" width="36" height="72"/><rect x="94" y="-36" width="36" height="72"/>`,

// hỏi thẳng nhà bếp — nồi
'API Testing': `<rect x="-80" y="-20" width="160" height="110" rx="10"/><line x1="-112" y1="0" x2="-80" y2="0"/><line x1="80" y1="0" x2="112" y2="0"/><line x1="-95" y1="-32" x2="95" y2="-32"/><line x1="0" y1="-122" x2="0" y2="-58"/><path d="M-16,-74 L0,-58 L16,-74"/>`,

// đoàn xe tải lên cầu
'Load Test': `<line x1="-130" y1="30" x2="130" y2="30"/><line x1="-90" y1="30" x2="-90" y2="112"/><line x1="90" y1="30" x2="90" y2="112"/><path d="M-130,30 Q0,-140 130,30"/><rect x="-72" y="-6" width="44" height="36"/><rect x="-12" y="-6" width="44" height="36"/><rect x="48" y="-6" width="44" height="36"/>`,

// tìm điểm khác nhau giữa hai bức
'Visual Testing': `<rect x="-130" y="-70" width="115" height="140" rx="8"/><rect x="15" y="-70" width="115" height="140" rx="8"/><circle cx="-72" cy="-20" r="22"/><circle cx="72" cy="12" r="22"/><line x1="-106" y1="32" x2="-40" y2="32"/><line x1="40" y1="32" x2="106" y2="32"/>`,

// an toàn thực phẩm — tấm khiên
'QA': `<path d="M0,-120 L100,-80 L100,0 Q100,80 0,120 Q-100,80 -100,0 L-100,-80 Z"/><path d="M-45,2 L-12,35 L52,-33" stroke-width="10"/>`,

// ═══════════ TRANG CHUNG ═══════════

'_home': `<path d="M-112,-78 h224 a22,22 0 0 1 22,22 v96 a22,22 0 0 1 -22,22 h-138 l-46,46 v-46 h-40 a22,22 0 0 1 -22,-22 v-96 a22,22 0 0 1 22,-22 z"/><circle cx="-54" cy="-8" r="9" fill="${LIME}" stroke="none"/><circle cx="0" cy="-8" r="9" fill="${LIME}" stroke="none"/><circle cx="54" cy="-8" r="9" fill="${LIME}" stroke="none"/>`,

'_lo-trinh': `<line x1="-120" y1="0" x2="120" y2="0"/><circle cx="-100" cy="0" r="18" fill="${LIME}"/><circle cx="0" cy="0" r="18" fill="${BG}"/><circle cx="100" cy="0" r="18" fill="${BG}"/><path d="M-100,-18 L-100,-80 L-50,-65 L-100,-50"/>`,

'_so-sanh': `<line x1="0" y1="-104" x2="0" y2="92"/><line x1="-64" y1="92" x2="64" y2="92"/><line x1="-114" y1="-78" x2="114" y2="-78"/><line x1="-114" y1="-78" x2="-114" y2="-14"/><path d="M-158,-14 Q-114,26 -70,-14"/><line x1="114" y1="-78" x2="114" y2="-14"/><path d="M70,-14 Q114,26 158,-14"/>`

};
