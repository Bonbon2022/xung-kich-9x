<h1 align="center"><img src="assets/logo.webp" alt="Riposte: Frontline" width="640"></h1>

**Riposte: Frontline** là một game bắn súng góc nhìn thứ nhất (FPS) miễn phí, chơi ngay trong trình duyệt, trên máy tính và
điện thoại, theo tinh thần của các game Call of Duty hiện đại: https://www.playriposte.com

Kho mã này là một bản chụp (snapshot) mã nguồn của game, phiên bản 5.6.0. Nó được cập nhật theo đợt chứ không theo từng
bản phát hành của game. Bạn có thể đọc, tải về và dùng nó cho game của riêng mình theo Giấy phép MIT (`LICENSE`), ngoại trừ
các hạng mục liệt kê trong `NOTICE.md` (tên và logo, nhạc, hoạt ảnh người lính, một số âm thanh). Việc phát triển diễn ra ở
nơi khác, nên các pull request sẽ không được hợp nhất. Để báo lỗi, hãy dùng mục Community trong game.

## Có gì bên trong

Toàn bộ game: bộ kết xuất (three.js), các bản đồ, khung cảnh, vũ khí, người lính và trang phục, bot, vật lý, âm thanh, các
menu, điều khiển bằng bàn phím, chuột, tay cầm và cảm ứng, cùng chế độ nhiều người chơi từ trình duyệt tới trình duyệt. Mọi
hình khối đều được dựng bằng code, không nhập bất kỳ mô hình 3D nào từ bên ngoài.

Phần máy chủ của trang chính thức không có trong kho này: tài khoản, tiến trình đã lưu, bảng xếp hạng, bạn bè, cộng đồng,
kiểm duyệt và máy chủ game cho các phòng chơi trực tuyến. Thiếu nó, game chạy ở chế độ chơi đơn, còn các trận trực tuyến đi
từ trình duyệt tới trình duyệt (PeerJS). Các màn hình tài khoản sẽ thông báo rằng tài khoản không khả dụng.

## Build và chơi

Không cần cài đặt gì, chỉ cần Python 3:

```bash
python3 build.py
```

Script sẽ lắp ráp `dist/riposte-frontline.html` — trang game — cùng với `dist/tex/` và `dist/sfx/` (hình nền và âm thanh,
được tải khi một bản đồ bắt đầu). Mở `dist/riposte-frontline.html` trong một trình duyệt gần đây (Chrome, Edge, Firefox) với
các thư mục đó đặt ngay bên cạnh nó. Thư mục `dist/` trong kho này đã được build sẵn.

## Code được tổ chức thế nào

Game được viết bằng tiếng Pháp: code, chú thích và thông báo của công cụ. Các file `src/*.js` được nối theo thứ tự bảng chữ
cái, rồi chèn vào `shell.html` (trang, kiểu dáng và các menu). Mỗi hàm chỉ được khai báo một lần
(`python3 tools/dev/check_decl.py`).

| File | Nội dung |
| --- | --- |
| `src/00-*`, `src/01-*` | bản dịch, khởi động, kết xuất và cài đặt GPU |
| `src/02-*` | bản đồ và khung cảnh: địa hình, vật liệu, ánh sáng, nước, cây cối, bộ trang trí của từng bản đồ |
| `src/03-*`, `src/07-*` | điều hướng và AI của bot |
| `src/04-*` | hiệu ứng, vật lý của vật thể |
| `src/05-*` | âm thanh |
| `src/06-*` | vũ khí và mô hình của chúng, người lính, hoạt ảnh, trang phục, ragdoll |
| `src/08-*` | người chơi, điều khiển, chuỗi hạ gục, phương tiện |
| `src/09-*` | trận đấu, tải trận, mạng, menu, điều khiển cảm ứng và tay cầm, giao diện |
| `i18n/en.txt` | văn bản tiếng Anh (game được viết bằng tiếng Pháp, tiếng Anh là ngôn ngữ mặc định ở bản gốc) |
| `i18n/vi.txt` | văn bản tiếng Việt (bản Việt hóa của fork này, xem mục dưới) |
| `assets/` | hình nền, âm thanh, hoạt ảnh đã nướng sẵn, biểu tượng |
| `tools/` | xây dựng tài nguyên (`build_*.py`), các kiểm tra và kiểm thử trực quan (`tools/dev/`) |

Các kiểm thử trực quan trong `tools/dev/visual/` mở game trong Chromium (`cd tools/dev && npm ci`, rồi ví dụ
`node tools/dev/visual/menus.js`).

## Ngôn ngữ

Ở bản gốc, game có tiếng Pháp (ngôn ngữ viết code, là khóa gốc của mọi bản dịch) và tiếng Anh (từ điển `i18n/en.txt`).
Fork này bổ sung tiếng Việt (từ điển `i18n/vi.txt`) và đặt tiếng Việt làm ngôn ngữ ưu tiên: xem mục riêng ngay dưới đây.

## Bản Việt hóa này (fork)

Đây là bản Việt hóa không chính thức, fork từ `BenDBSS/Riposte-Frontline-Source`, dành cho người chơi Việt Nam. Chi tiết kỹ
thuật và tiến độ nằm trong `VIET-HOA.md`.

- **Tiếng Việt là mặc định.** Khi chưa từng chọn ngôn ngữ thủ công, game tự nhận diện ngôn ngữ trình duyệt: nếu ngôn ngữ
  được ưu tiên là tiếng Việt, tiếng Pháp hay tiếng Anh thì dùng ngôn ngữ đó; ngoài ra game mặc định dùng **tiếng Việt**
  (bản gốc mặc định là tiếng Anh).
- **Đổi ngôn ngữ:** trong game, vào **Tùy chọn → Trò chơi → Ngôn ngữ** và chọn *Tiếng Việt*, *English* hoặc *Français*.
  Lựa chọn được lưu lại và luôn được tôn trọng ở các lần chơi sau.
- **Độ phủ:** toàn bộ từ điển giao diện đã dịch (`i18n/vi.txt`, 1.616 mục), và mục Tin tức (« Có gì mới ») đã dịch cho các
  bản cập nhật mới nhất; các tin cũ hơn tạm hiển thị tiếng Anh/Pháp.
- **Giấy phép:** bản Việt hóa vẫn tuân theo `LICENSE` (MIT) và `NOTICE.md` của bản gốc. Nói ngắn gọn: code dùng theo MIT;
  tên và logo « Riposte: Frontline », nhạc, hoạt ảnh người lính và một số âm thanh **không** thuộc MIT và giữ điều kiện
  riêng của chúng. Mục này chỉ là tóm tắt để tiện tham khảo — văn bản có giá trị là `LICENSE` và `NOTICE.md`, hãy đọc hai
  file đó trước khi phân phối lại.
