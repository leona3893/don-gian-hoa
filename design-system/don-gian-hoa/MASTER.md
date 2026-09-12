# Design System — Đơn Giản Hoá (MASTER)

> Nguồn sự thật cho mọi trang/component mới. Token thật nằm ở `:root` trong `styles.css`;
> file này giải thích *vì sao* và *dùng khi nào*. Override theo trang đặt trong `pages/<ten-trang>.md`.

## 1. Định vị phong cách

Lai giữa ba style trong bộ `ui-ux-pro-max`:

| Lấy từ | Cái gì | Cái gì **không** lấy |
|---|---|---|
| **Neubrutalism** (bản mềm) | Bóng cứng lệch góc, card nghiêng 2°, chữ đậm letter-spacing âm, marker lime gạch dưới chữ | Viền đen 3px, góc vuông, màu chói đỏ/vàng |
| **Organic / Biophilic** | Bảng màu xanh rừng + nền giấy, bo tròn 16–24px, cảm giác tự nhiên | Blob SVG, texture, tông nâu đất |
| **Soft UI Evolution** | Bóng mềm đa lớp cho panel nổi, contrast ≥ 4.5:1, transition 150–300ms | Hiệu ứng lõm/lồi neumorphism |

Một câu mô tả: **"Tươi sáng nhưng không gắt, mọi thứ bo tròn, thứ quan trọng thì được bóng lime đẩy nổi lên."**

## 2. Màu

```
--ink        #18251e   chữ chính (contrast 15:1 trên --paper)
--muted      #66736b   chữ phụ (4.8:1 trên --paper)
--line       #dfe8df   viền 1px
--paper      #f7faf4   nền trang
--card       #ffffff   nền thẻ

--green      #177245   màu chính: nút, link, số thứ tự, focus ring
--green-deep #193629   dự phòng cho chữ rất đậm; KHÔNG dùng làm nền khối
--green-text #207145   chữ nhấn xanh trên nền sáng
--lime       #d9f26c   điểm nhấn: bóng pop, marker, chip active. KHÔNG dùng làm nền chữ dài
--purple     #6c48da   liên kết chéo / "xem thêm" (chỉ 1 vai trò, không lạm dụng)
--purple-text#573ab6

Tint (nền nhạt cho hộp ghi chú):
--tint-green #f1f8e6  hover gợi ý     --tint-lime #f4f8ee  hộp ví von
--tint-mint  #eef4ed  nút phụ/thead   --tint-purple #f0edff  thẻ liên quan
--tint-sand  #fdf5ec  hộp "hay nhầm"  --sand-text #8a5a22
```

Quy tắc:
- **Không có khối nền tối.** Thứ cần nổi bật dùng nền trắng/tint + viền 2px `--green` + bóng lime pop (hero card, TL;DR), không dùng nền sẫm.
- Lime chỉ đi cùng `--ink`/`#123a26` (chữ tối). Không đặt chữ trắng lên lime.
- Không thêm màu mới; cần trạng thái mới thì tạo tint từ màu sẵn có.

## 3. Bo tròn

```
--r-sm   10px   nút nhỏ, thẻ liên quan, nút trong ô tìm kiếm
--r-md   12px   hộp ghi chú, khối code, ô bảng
--r-lg   16px   thẻ thuật ngữ, ô tìm kiếm, panel nổi, banner
--r-xl   24px   hero card, modal
--r-pill 100px  chip, tag, nút CTA dạng viên
```
Hộp có viền trái (analogy/leak/nho) dùng `0 var(--r-md) var(--r-md) 0`.

## 4. Bóng — hai họ, không trộn

**Pop (bóng cứng, màu lime)** — cho thứ *muốn được nhìn thấy đầu tiên*:
```
--pop-sm  4px 4px 0 var(--lime)     logo mark
--pop-md  8px 8px 0 var(--lime)     hero card trên mobile
--pop-lg  12px 13px 0 var(--lime)   hero card desktop (+ rotate(2deg))
```
**Float (bóng mềm xanh mờ)** — cho thứ *nổi lên trên nội dung*:
```
--float-sm  0 10px 30px #17452a12   ô tìm kiếm, thẻ khi hover
--float-md  0 16px 32px #123a2620   dropdown gợi ý, kết quả tìm
```
Mỗi trang tối đa **một** phần tử dùng pop-lg.

## 5. Chữ

- Font: `Inter` → system-ui. Không thêm font hiển thị.
- Tiêu đề lớn: weight 800, `letter-spacing: -.04em … -.075em`, `line-height .96–1.1`.
- Thân bài: 16–19px, `line-height 1.5–1.6`. Chữ phụ 13–14px, không nhỏ hơn 12px.
- Eyebrow / nhãn tầng: 13px, uppercase, `letter-spacing .08em`, màu `--green`.
- Marker: `.accent` — lime dày 17px, xoay -1.5°, chỉ dùng cho 1–2 từ trong H1.

## 6. Chuyển động

```
--fast 150ms   hover màu/nền, chip, nút
--base 220ms   nâng thẻ (translateY -3px + float-sm)
--ease cubic-bezier(.2,.7,.2,1)
```
- Nút bấm: `:active { transform: translateY(1px) }` — có phản hồi vật lý.
- Tôn trọng `prefers-reduced-motion`: tắt transition, bỏ rotate của hero card.

## 7. Thành phần chuẩn

| Thành phần | Công thức |
|---|---|
| Thẻ thuật ngữ `.term` | card + line 1px + r-lg + padding 20; hover: nâng 3px + float-sm |
| Chip lọc `.chip` | pill, viền line, chữ muted; active: nền lime, viền lime, chữ #123a26 |
| Nút chính | nền green, chữ trắng, weight 750, r-sm (trong form) hoặc pill (CTA) |
| Nút phụ | nền tint-mint hoặc tint-purple, không viền |
| Hộp ghi chú | tint + viền trái 4px + r-md; màu viền nói nội dung: lime = ví von, cam = hay nhầm |
| Khối nhấn (hero card, TL;DR) | card hoặc tint-lime + viền 2px green + pop-lg/sm, nhãn green uppercase 12px |
| Khối code | tint-mint, viền line, chữ ink; comment muted, string green-text |
| Panel nổi | card, line, r-lg, float-md, offset 8px dưới trigger |

## 8. Tránh

- Emoji làm icon chức năng (emoji trong `.term .icon` là minh hoạ, không phải nút).
- Gradient, blur nền, viền đen dày, **nền khối màu sẫm** — lệch khỏi tông "tươi sáng, mềm".
- Bóng pop cho phần tử nhỏ lặp lại (list item, chip) — bóng pop mất giá trị khi xuất hiện nhiều.
- Chữ xám trên nền xám (`--muted` chỉ đặt trên `--paper`/`--card`).
- Hardcode hex trong CSS mới — dùng token; thiếu token thì thêm vào `:root` và ghi vào đây.

## 9. Checklist trước khi merge

- [ ] Contrast chữ ≥ 4.5:1 (kiểm tra nhanh: chữ muted không nằm trên tint)
- [ ] Mọi phần tử bấm được có `:focus-visible` (đã có rule chung trong `styles.css`)
- [ ] Vùng chạm ≥ 44px trên mobile cho nút/chip
- [ ] Không có hex mới ngoài `:root`
- [ ] Xem ở 375 / 768 / 1024 / 1440 — không cuộn ngang
- [ ] `prefers-reduced-motion` không làm vỡ layout
