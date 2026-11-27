# Tích hợp Sân Chơi 9X — cầu nối iframe (XK9X bridge, T1)

Tài liệu này mô tả **giao ước cầu nối** giữa **Sân Chơi 9X** (trang cha, https://san-choi-9x.vercel.app)
và **Xung Kích 9X** (game này, nhúng trong iframe). Phía Sân Chơi được triển khai song song theo đúng
giao ước ở đây — thay đổi một phía thì phải sửa tài liệu này và báo phía còn lại.

## 1. Cách Sân Chơi nhúng game

Sân Chơi mở game trong một iframe với URL dạng:

```
https://xung-kich-9x.vercel.app/riposte-frontline.html?xk9x=1&nick=<nick>&creer=<MÃ>&xk9x_origin=<origin cha>
https://xung-kich-9x.vercel.app/riposte-frontline.html?xk9x=1&nick=<nick>&salon=<MÃ>&xk9x_origin=<origin cha>
```

Cho phép nhúng được khai báo ở `vercel.json`: header `Content-Security-Policy: frame-ancestors
'self' https://san-choi-9x.vercel.app http://localhost:2567` cho `/riposte-frontline.html`
(origin localhost để phát triển Sân Chơi ở cổng 2567). CSP trong thẻ meta của game không chứa
`frame-ancestors` (chỉ thị này chỉ có tác dụng khi đi qua header), nên không xung đột.

## 2. Tham số URL (game đọc)

| Param | Bắt buộc | Ý nghĩa |
|---|---|---|
| `xk9x=1` | Có | Bật cầu nối. Thiếu param này, game chạy hoàn toàn như bình thường, không đọc các param còn lại (trừ `salon` vốn có từ trước). |
| `lang` | Không | Ngôn ngữ cho phiên chơi này: `vi`, `en` hoặc `fr`. Tham số URL thắng mọi thứ khác (kể cả lựa chọn đã lưu trong `dc_settings`) nhưng chỉ trong phiên, không ghi lại vào `dc_settings`. Khi có `xk9x=1` mà không có `lang`, mặc định là `vi` — vì người vào từ Sân Chơi từng bị kẹt tiếng Anh do `dc_settings` cũ trên origin của game đã lưu `lang: 'en'`. Phía Sân Chơi hiện gửi kèm `lang=vi` tường minh. |
| `nick` | Không | Nick của người chơi bên Sân Chơi. Game ghi đè `localStorage 'cod_nick'` bằng nick này (qua `netClean` như mọi nick khác: bỏ ký tự điều khiển/chevron, tối đa 16 ký tự, lọc tên) trước khi khởi tạo mạng, nên nick trong phòng chơi là nick Sân Chơi. |
| `creer=<MÃ>` | Một trong hai | Vai **chủ phòng**: game tự tạo phòng với đúng mã này (5 ký tự, viết hoa, chỉ gồm A–Z/0–9) ngay khi sẵn sàng, rồi mở màn hình Nhiều người chơi. |
| `salon=<MÃ>` | Một trong hai | Vai **khách**: dùng nguyên cơ chế link mời sẵn có của game (tự vào phòng theo mã). Nếu có cả `salon` lẫn `creer`, `salon` được ưu tiên như hành vi gốc. |
| `xk9x_origin` | Có (để nhận sự kiện) | Origin của trang cha, ví dụ `https://san-choi-9x.vercel.app`. Mọi `postMessage` từ game chỉ gửi tới đúng origin này. Thiếu param này thì game không gửi sự kiện nào. |

## 3. Sự kiện game → trang cha (postMessage)

Game gửi tới `window.parent`, đích danh `xk9x_origin` (không bao giờ `'*'`), payload luôn có dạng:

```js
{ src: 'xk9x', ev: <sự kiện>, code: <mã phòng hiện tại hoặc ''> }
```

| `ev` | Khi nào | Ghi chú |
|---|---|---|
| `ready` | Ngay khi phần mạng của game khởi tạo xong (`netInit`) | `code` thường là `''` ở thời điểm này. Trang cha dùng để biết iframe đã sống và cầu nối đang bật. |
| `hosted` | `NET.joined` chuyển thành `true` với vai chủ phòng (`NET.role === 'host'`) | Gửi một lần mỗi lần chuyển trạng thái (rời phòng rồi vào lại sẽ gửi lại). `code` là mã phòng đang host. |
| `joined` | `NET.joined` chuyển thành `true` với vai khách (`NET.role === 'client'`) | Như trên, cho vai vào phòng có sẵn. |
| `left` | Sự kiện `pagehide` của trang game (đóng/hủy iframe, chuyển trang) | Báo cho cha dọn dẹp trạng thái bàn chơi. |

Việc theo dõi `joined` dùng một interval nhẹ 500 ms trong game (không can thiệp vào logic mạng gốc).

Trang cha **phải** kiểm tra `event.origin` (đúng origin của game) và `event.data.src === 'xk9x'`
trước khi tin payload — phía game đã khóa đích gửi, nhưng kiểm tra hai chiều mới đủ an toàn.

## 4. Các điểm đã vá trong `src/09c-net.js`

Toàn bộ vá nằm trong một khối đánh dấu **« Cầu nối Sân Chơi 9X (XK9X) »** ngay trước `netInit()`,
cộng ba điểm chạm tối thiểu:

1. **Khối cầu nối**: hằng `XK9X_Q` / `XK9X_ON` / `XK9X_ORIGIN` đọc từ URL; hàm `xk9xPost(ev)`
   (chỉ gửi khi `xk9x=1`, có `xk9x_origin`, và trang thật sự nằm trong iframe);
   `xk9xApplyNick()` (ghi đè `cod_nick`); `xk9xWatch()` (theo dõi chuyển trạng thái `NET.joined`).
2. **`netInit()`**: gọi `xk9xApplyNick()` ở dòng đầu (trước chỗ đọc `cod_nick` vào `NET.nick`);
   sau `netRender()` thì gửi `ready`, khởi động interval theo dõi và đăng ký `pagehide` → `left`.
3. **`netAutoJoin()`**: thêm nhánh `else if` — khi không có `salon` mà cầu nối bật và có `creer`
   hợp lệ, dùng đúng mẫu `acctWhenReady` của nhánh salon để gọi `netHost({ code: MÃ })`
   (hàm `netHost` gốc đã hỗ trợ nhận mã chỉ định sẵn) rồi `uiGo('multi')` như nhánh salon.

Không sửa logic mạng sẵn có nào khác: cơ chế `salon`, PeerJS, relais, tài khoản… giữ nguyên.

## 5. Lưu ý bảo mật

- Game chỉ gửi `postMessage` tới origin được khai báo qua `xk9x_origin` và chỉ khi `xk9x=1`;
  ai nhúng game mà không khai báo đúng origin của mình sẽ không nhận được sự kiện.
  Ngược lại, `xk9x_origin` do chính URL quyết định — trang cha thật (Sân Chơi) luôn tự khai báo
  origin của mình; một trang lạ nhúng game và khai báo origin của chúng cũng chỉ nhận được các
  sự kiện vô hại dưới đây.
- Dữ liệu qua cầu nối **không nhạy cảm**: nick hiển thị công khai trong phòng chơi và mã phòng
  5 ký tự (vốn là mã mời, ai có mã đều vào được phòng). Không có token, mật khẩu hay dữ liệu
  tài khoản nào đi qua cầu nối, theo cả hai chiều (cha → game chỉ có nick + mã phòng qua URL).
- Nick và mã phòng xuất hiện trong URL iframe: chấp nhận được vì cùng mức độ công khai như trên;
  đừng đưa thông tin nhạy cảm vào các param này.

## 6. Kiểm chứng (2026-11-27, bản T1)

- `python3 build.py` sạch; `tools/dev/check_i18n.py` 0 lỗi; bản build chứa đủ mã cầu nối.
- Headless Chromium, trang cha ở origin khác (cổng khác) nhúng iframe với
  `?xk9x=1&nick=ChienSi9X&creer=AB3CD&xk9x_origin=<origin cha>`:
  trang cha nhận được `ready`, sau đó `hosted` với `code: 'AB3CD'`; trong iframe,
  `localStorage cod_nick === 'ChienSi9X'`, `NET.nick === 'ChienSi9X'`, `NET.role === 'host'`,
  `NET.code === 'AB3CD'`, `NET.joined === true`.
  (Môi trường kiểm thử không ra được Internet nên thư viện PeerJS trên CDN không tải được;
  bước host được kiểm chứng với một `Peer` giả lập tiêm vào trang — tức là đã chứng minh vá
  hoạt động đúng tới mức gọi `netHost` với mã chỉ định và phát sự kiện. Kết nối PeerJS cloud
  thật cần kiểm chứng lại trên bản deploy, nơi CDN tải bình thường.)
