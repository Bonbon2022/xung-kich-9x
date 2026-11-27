# Việt hóa Riposte: Frontline — Giai đoạn 1 + 2 + 3 (hạ tầng i18n, từ điển, mặc định tiếng Việt, tin tức, README, đổi tên Xung Kích 9X)

Fork: `Bonbon2022/Riposte-Frontline-Source`, từ upstream `BenDBSS/Riposte-Frontline-Source` v5.6.0 (commit 31ca050d).
Trạng thái giai đoạn 1: **hoàn thành, đã đẩy lên fork (commit 82e68590).** Giai đoạn 2: **hoàn thành, đã đẩy lên fork (commit c68bf282).**
Giai đoạn 3: **hoàn thành ở local, chưa commit/push** — từ giai đoạn này game mang thương hiệu riêng **Xung Kích 9X** (mục 6).

## 1. Hạ tầng tiếng Việt — file đã sửa

| File | Thay đổi |
|---|---|
| `i18n/vi.txt` (mới) | Từ điển tiếng Việt, cùng format với `i18n/en.txt`: `khóa tiếng Pháp ⇒ bản dịch Việt`, `=` nghĩa là giữ nguyên khóa (tên riêng). 1.616 entry. |
| `src/00-i18n.js` | Thêm `I18N_VI` (marker `/*__I18N_VI__*/`, build.py nhúng vào như `I18N_EN`). `LANG_PREF` chấp nhận `'vi'`; tự động nhận diện: trình duyệt có `vi` đứng trước `fr`/`en` đầu tiên thì chọn `vi`; `LOCALE = 'vi-VN'` khi `LANG==='vi'`; `_t` tra từ điển theo ngôn ngữ đang dùng (`I18N_DICT`), thiếu khóa thì giữ tiếng Pháp và ghi `I18N_MISS` như tiếng Anh; `_tn`: tiếng Việt dùng form "one" khi `n===1`, "many" khi khác (tiếng Việt không có số nhiều — cả hai khóa Pháp đều được dịch trong vi.txt, thường về cùng một câu trung tính); `i18nDom` và dịch `document.title` chạy cho cả `vi`. |
| `build.py` | Nạp thêm `i18n.load_vi()`, lỗi format thì dừng build như en; nhúng `I18N_VI` vào marker mới. In `dictionnaire vietnamien : 1616 entrées`. |
| `tools/i18n.py` | Tách loader chung `_load(root, prefix)`, thêm `load_vi()` đối xứng `load_en()` (glob `i18n/vi*.txt`). |
| `src/09e-menus.js` | Menu **Tùy chọn → Ngôn ngữ** có thêm lựa chọn **Tiếng Việt** (`['vi', 'Tiếng Việt']`) cạnh English/Français; lưu vào `dc_settings` và tải lại trang như các ngôn ngữ khác (`langApply`). |
| `src/09-game.js` | `ordinal()`: tiếng Việt không thêm hậu tố thứ hạng (tránh rơi vào hậu tố Pháp `1er`/`2e`). |
| `src/09n-armurerie.js` | Định dạng số trong kho vũ khí dùng hằng `LOCALE` chung thay cho cặp `fr-FR`/`en-US` cứng (vi → `vi-VN`). |

Cách chọn ngôn ngữ: Cài đặt trong game (Tùy chọn → Ngôn ngữ → Tiếng Việt), hoặc tự động theo ngôn ngữ trình duyệt. Từ giai đoạn 2, **tiếng Việt là mặc định** khi trình duyệt không công bố vi/fr/en (xem mục 4).

## 2. Bảng thuật ngữ (nhất quán toàn bộ vi.txt)

| Gốc | Tiếng Việt |
|---|---|
| killstreak | chuỗi hạ gục |
| respawn | hồi sinh |
| minimap | bản đồ nhỏ |
| loadout | bộ trang bị |
| salon / lobby | phòng chờ (phòng chơi theo ngữ cảnh phòng trận) |
| headshot | trúng đầu |
| ammo / reload / scope / recoil | đạn / nạp đạn / ống ngắm / độ giật |
| damage / health / armor | sát thương / máu / giáp |
| grenade / helicopter / airstrike | lựu đạn / trực thăng / không kích |
| outfit / challenge | trang phục / thử thách |
| settings / account / password | cài đặt / tài khoản / mật khẩu |
| recovery code | mã khôi phục |
| camo | họa tiết ngụy trang |
| UAV, Drone, Mecha, Killcam | giữ nguyên |
| IEM (FR) | EMP (như bản Anh) |

Giọng dịch: tự nhiên theo cách nói của game thủ Việt; các mô tả map/vũ khí giữ nguyên tính hài hước của bản gốc bằng cách dịch ý hài sang tiếng Việt (ví dụ: chuyến tàu "đã trễ từ năm 1987", "Xin đừng giẫm lên cỏ, kể cả khi đã chết"). Văn pháp lý/tài khoản dịch trang trọng, chính xác. Tên riêng (map, vũ khí, địa danh trên bản đồ nhỏ) giữ nguyên khi bản Anh giữ nguyên.

## 3. Độ phủ và kiểm chứng (2026-11-27)

- **Độ phủ: 1.616 / 1.616 entry (100%), thiếu 0, thừa 0.** Kiểm tra bằng loader thật (`tools/i18n.py`): `load_vi` 0 lỗi format, placeholder `{0} {1}` khớp 100% giữa khóa và bản dịch, 12 entry `=` ở vi khớp đúng 12 entry `=` ở en.
- `python3 build.py`: **thành công** — in `dictionnaire vietnamien : 1616 entrées`, cú pháp script đã lắp ráp "correcte" (build tự chạy `node --check`), `dist/riposte-frontline.html` chứa `I18N_VI` và các chuỗi Việt mẫu (chuỗi hạ gục, hồi sinh, bản đồ nhỏ...).
- `python3 tools/dev/check_i18n.py` (kiểm tra gốc cho tiếng Anh): **0 lỗi** — hạ tầng mới không làm hỏng kiểm tra cũ.
- Harness Node mô phỏng `localStorage`/`navigator`: chọn thủ công `vi` → `LANG='vi'`, `LOCALE='vi-VN'`, `_t`/`_tn` dịch đúng, số định dạng kiểu Việt (`1.234.567`); trình duyệt `vi-VN` → tự chọn vi; `fr` đứng trước vi → vẫn chọn fr; ngôn ngữ lạ → về en.
- **Kiểm chứng trực quan bằng headless Chromium (localhost):** đặt `dc_settings.lang='vi'`, menu chính hiển thị hoàn toàn bằng tiếng Việt — "Chơi / Lớp nhân vật / Trang phục / Tùy chọn / Có gì mới / Hồ sơ", tiêu đề tab: *"Riposte: Frontline, FPS miễn phí ngay trong trình duyệt"*, dấu tiếng Việt hiển thị đúng. (Trong môi trường kiểm thử, CDN PeerJS/Google Fonts không tải được do hạn chế mạng của máy ảo — không liên quan thay đổi này; ngoài đời thực tải bình thường.)

## 4. Giai đoạn 2 (2026-11-27) — mặc định tiếng Việt, tin tức, font, README

### 4.1 Tiếng Việt là ngôn ngữ mặc định ưu tiên (`src/00-i18n.js`)

- Chế độ tự động (chưa từng chọn thủ công): duyệt `navigator.languages`, gặp vi/fr/en đầu tiên thì dùng ngôn ngữ đó — như trước; **khi không gặp ngôn ngữ nào trong ba ngôn ngữ này, mặc định cuối cùng đổi từ `'en'` (upstream) thành `'vi'`**, vì fork này dành cho người Việt. Comment đầu file đã cập nhật cho khớp.
- Lựa chọn thủ công đã lưu trong `dc_settings` (`en`/`fr`/`vi`) vẫn được tôn trọng tuyệt đối; trình duyệt công bố rõ tiếng Anh/Pháp vẫn vào en/fr.
- Kiểm chứng bằng harness Node trên chính `src/00-i18n.js`: `de-DE` → **vi**; `vi-VN` → vi; `en-US` → en; `fr` đứng trước vi → fr; danh sách rỗng → vi; pref đã lưu `en` (dù trình duyệt là vi) → en; pref `fr` → fr; pref `vi` (dù trình duyệt là en) → vi. Trong bản build, đoạn mã đã rút gọn chứa `return'vi'`.

### 4.2 Tin tức tiếng Việt (`changelog.json`, `src/09f-news.js`, `build.py`)

- Đã thêm `x_vi` cho **50/50 thay đổi của 10 entry mới nhất** (5.6.0 → 4.22.0) và `title_vi` cho entry có tiêu đề trong nhóm này (5.0.0: « Tự chọn chuỗi hạ gục »). Entry major X.0.0 gần nhất (5.0.0, vị trí thứ 9) nằm sẵn trong top 10 nên không phải dịch thêm entry ngoài nhóm. Dịch thật từ Pháp + Anh, theo bảng thuật ngữ mục 2 (chuỗi hạ gục, hồi sinh, bản đồ nhỏ, Áo ghi lê vàng…).
- `newsTitle`/`newsText`: ở `LANG==='vi'` ưu tiên `title_vi`/`x_vi`, thiếu thì lùi về bản Anh (`_en`), rồi mới tới bản Pháp. Các entry cũ hơn top 10 chưa có `_vi` nên ở chế độ vi sẽ hiện tiếng Anh (fallback mới) thay vì tiếng Pháp như giai đoạn 1.
- `build.py`: bổ sung validate nhẹ cho tiếng Việt, **chỉ áp dụng cho 10 entry đầu**: entry có `title` thì phải có `title_vi`; change nào cũng phải có `x_vi` (đối xứng với validate `x_en`/`title_en` vốn áp dụng cho mọi entry). Không bắt buộc 122 entry còn lại.
- Kiểm chứng trực quan bằng Chromium headless (localhost, `dc_settings.lang='vi'`): màn Tin tức (« Có gì mới ») hiển thị hoàn toàn tiếng Việt ở các entry mới nhất — thẻ MỚI / CẢI TIẾN / ĐÃ SỬA, ngày kiểu « 25 tháng 10, 2026 », dòng tóm tắt « Phiên bản hiện tại: 5.6.0. 10 bản cập nhật gần nhất. » (ảnh: `/tmp/vi_news.png` trong môi trường kiểm thử).

### 4.3 Font hiển thị — đã xác minh, **không cần thay font**

Kiểm chứng bằng hai nguồn độc lập: `METADATA.pb` trong kho `google/fonts` và CSS API trực tiếp của Google Fonts (`css2`, có block `/* vietnamese */`):

| Font | Vai trò | Subset vietnamese |
|---|---|---|
| Saira Stencil One | `--stencil` (tiêu đề) | **Có** (`subsets: "vietnamese"` trong `ofl/sairastencilone/METADATA.pb`; css2 trả về block vietnamese) |
| Barlow Condensed | `--hud` (giao diện) | **Có** (`ofl/barlowcondensed/METADATA.pb`; css2 trả về block vietnamese cho cả 4 trọng lượng 400–700) |

Kết luận: cả hai font đều hỗ trợ tiếng Việt đầy đủ, dấu tiếng Việt ở tiêu đề lớn và HUD hiển thị bằng font thật, không rơi về font dự phòng — **không cần thêm Bungee/Be Vietnam Pro và không sửa `shell.html`**. (Lưu ý: máy ảo kiểm thử không tải được CDN Google Fonts nên ảnh chụp local dùng font dự phòng; kết luận dựa trên metadata + CSS API chính thức ở trên.)

### 4.4 README tiếng Việt

- Tạo mới `README.vi.md`: dịch trung thực `README.md` (giới thiệu, nội dung, build & chơi, tổ chức code) + mục **Ngôn ngữ** và mục riêng **Bản Việt hóa này (fork)**: tiếng Việt là mặc định, cách đổi ngôn ngữ trong Tùy chọn → Trò chơi → Ngôn ngữ, độ phủ bản dịch, và tóm tắt giấy phép dẫn về `LICENSE`/`NOTICE.md` (chỉ tóm tắt + dẫn link, không thay thế văn bản gốc).
- `README.md`: thêm 2 dòng ở đầu trỏ tới `README.vi.md`. Không sửa nội dung khác.

### 4.5 Kiểm chứng giai đoạn 2

- `python3 build.py`: **thành công** (validate changelog mới đạt); `dist/riposte-frontline.html` chứa `x_vi`/`title_vi` và logic mặc định `return'vi'`.
- `python3 tools/dev/check_i18n.py`: **0 lỗi** (1.616 khóa Anh, 1.616 khóa cần dịch).
- `changelog.json`: `json.load` hợp lệ, 132 entry; độ phủ `_vi` trong top 10: 50/50 change + 1/1 title.
- Chromium headless: `LANG='vi'`, tiêu đề tab tiếng Việt, màn Tin tức tiếng Việt (mục 4.2). Trường hợp trình duyệt công bố ngôn ngữ lạ (de-DE) không mô phỏng được trong Chromium headless của máy ảo (cờ `--lang` và `Emulation.setLocaleOverride` đều bị bỏ qua, trình duyệt vẫn công bố en-US) — trường hợp này đã được harness Node bao phủ (mục 4.1).

## 5. Còn lại sau giai đoạn 2

- **Tin tức cũ:** 122 entry ngoài top 10 chưa có `title_vi`/`x_vi` (ở chế độ vi hiện fallback tiếng Anh). Dịch tiếp khi có nhu cầu; validate của `build.py` chỉ bắt buộc top 10.
- **Chuỗi chưa qua `_t`:** báo cáo kết nối (`netdReport`, `src/09c-net.js`) và phần trang trí map cố ý giữ ngôn ngữ gốc theo thiết kế upstream (nằm trong `i18n/ignore.txt`).
- **Trước khi public bản Việt hóa** — các mục `NOTICE.md` của upstream vẫn áp dụng. Tên/logo và nhạc Suno đã được xử lý ở giai đoạn 3 (mục 6); còn lại: animation lính từ Mixamo (mục 6.5) và một số âm thanh CC BY phải ghi credit.
- Rà soát chất lượng dịch bởi người chơi thật (đặc biệt là các câu đùa mô tả map và văn pháp lý), và dịch nốt các chuỗi phát sinh khi upstream ra bản mới (chạy lại kiểm tra độ phủ khóa en/vi).

## 6. Giai đoạn 3 (2026-11-27) — Đổi tên « Xung Kích 9X » và dọn thương hiệu

Theo `NOTICE.md` của upstream, tên và logo « Riposte: Frontline » không thuộc MIT. Giai đoạn 3 cho fork một
thương hiệu riêng: **Xung Kích 9X** — emblem tia sét vàng + số 9 trên nền tối, giữ tông vàng/đen của game gốc
(màu nhấn `--xp: #F6C445`). Địa chỉ đích: `https://xung-kich-9x.vercel.app`; repo đích:
`https://github.com/Bonbon2022/xung-kich-9x` (**user tự rename repo trên GitHub** — code đã trỏ sẵn về địa chỉ mới).

### 6.1 Đổi tên trong source (chỉ sửa source, `dist/` do `build.py` sinh lại)

- `build.py`: `SITE="https://xung-kich-9x.vercel.app"`; manifest PWA: `name`/`short_name` = « Xung Kích 9X »,
  `description` tiếng Việt « FPS miễn phí trên trình duyệt: solo đấu bot hoặc online với bạn bè, không cần tải. »
- `shell.html`: `lang="vi"`; apple-mobile-web-app-title, application-name, og:site_name, og:title, og:image:alt →
  « Xung Kích 9X »; meta description + og:description → câu tiếng Việt của manifest; og:locale → `vi_VN`
  (alternate `en_US`, `fr_FR`); JSON-LD (WebSite + VideoGame): `name` « Xung Kích 9X », **bỏ hẳn `alternateName`**,
  `inLanguage: ["vi","en","fr"]`, description tiếng Việt; **xóa thẻ `google-site-verification`** của upstream;
  3 thẻ `<h1 class="logo">` đổi `aria-label` → « Xung Kích 9X ».
  Lưu ý về `<title>`: tiêu đề trang là một **khóa i18n** (chuỗi Pháp trong shell được dịch qua từ điển), nên tiêu đề
  đổi thành « Xung Kích 9X, FPS gratuit dans le navigateur » và khóa tương ứng được đổi đồng bộ trong cả
  `i18n/en.txt` lẫn `i18n/vi.txt` (giá trị: « Xung Kích 9X, free FPS in your browser » / « Xung Kích 9X, FPS miễn phí
  ngay trong trình duyệt »). Đây là khóa duy nhất phải đổi tên ở giai đoạn này, vì chính chuỗi khóa chứa tên cũ.
- `i18n/vi.txt` + `i18n/en.txt`: **chỉ đổi giá trị dịch** (sau `⇒`), không đổi khóa Pháp — 5 entry mỗi file:
  văn điều khoản, tiêu đề trang, lời nhắc PWA, câu chào mừng, « Cài đặt Riposte » → « Cài đặt Xung Kích 9X » /
  « Install Xung Kích 9X ». `tools/dev/check_i18n.py`: danh sách ngoại lệ `SHELL_SAME` đổi « Riposte: Frontline »
  → « Xung Kích 9X » (tên riêng giữ nguyên mọi ngôn ngữ); kiểm tra lại **0 lỗi, 1.616/1.616**.
- Chuỗi cứng trong `src/*.js`: nút mã nguồn (`09e-menus.js`) trỏ về `github.com/Bonbon2022/xung-kich-9x`;
  `DECK_SITE` (`09ra-deck.js`) → domain mới; tiêu đề share/báo cáo trong `01a-gpu.js`, `09c-net.js` (kèm mục tương
  ứng trong `i18n/ignore.txt`), dòng đầu file sao lưu tài khoản (`09j-compte.js`), đầu báo cáo hiệu năng
  (`09zo-perfs.js`) → « Xung Kích 9X ».
  **Giữ nguyên theo chủ ý:** khóa Pháp của `_t()` (giá trị dịch đã đổi; riêng chế độ tiếng Pháp vẫn hiện tên cũ vì
  Pháp là ngôn ngữ nguồn của khóa — chấp nhận được, mặc định của fork là tiếng Việt), tiền tố PeerJS `cod-lc1-`,
  tên localStorage, biến môi trường `RIPOSTE_LISIBLE`, comment tiếng Pháp, `changelog.json` lịch sử,
  `assets/sfx/credits.json` (ghi công giọng nói), regex `PREVIEW_HOST`, `NOTICE.md` và `LICENSE` (văn bản pháp lý gốc).
- `assets/deck/installer.sh`: `APP="Xung Kích 9X"`, `SITE` và URL curl trong comment → domain mới (đường dẫn kỹ
  thuật `riposte-frontline` giữ nguyên).
- `README.md` / `README.vi.md`: alt logo, tên game và link chơi → Xung Kích 9X + domain mới; **giữ** dòng ghi
  nguồn fork từ BenDBSS/Riposte-Frontline-Source và trỏ `LICENSE`/`NOTICE.md`. `CONTRIBUTING.md` viết lại thành
  ghi chú của fork (phát triển bản Việt hóa tại repo này), bỏ hướng dẫn cộng đồng playriposte.com.

### 6.2 Logo và assets hình ảnh (tái tạo toàn bộ, đúng tên/kích thước gốc)

Dựng bằng Python PIL, font **Saira Stencil One** (TTF tải từ google/fonts, có subset tiếng Việt), vàng gradient
`#FFD76A → #F6C445 → #D9A41F`:

- `assets/logo.webp` (1000×230, RGBA trong suốt như bản gốc) và `assets/deck/logo.png` (1000×230): emblem sét +
  chữ « XUNG KÍCH 9X ».
- `assets/icon/`: nền tối `#0E110D`, emblem sét + số 9 — `favicon.ico` (16/32/48 trong một file), `favicon-64.png`
  (64, RGB), `favicon-96.png` (96), `apple-touch-icon.png` (180), `icon-192.png` (192), `icon-512.png` (512),
  `maskable-192.png` / `maskable-512.png` (emblem thu về ~60% để nằm trong vùng an toàn maskable).
- `assets/menu-bg.webp` (1916×821): key art mới do AI tạo ảnh sinh (lính đặc nhiệm hiện đại lúc hoàng hôn, tông
  đen/vàng, không chữ); `assets/menu-depth.webp` (958×411) tạo lại từ key art mới (grayscale + blur) để parallax khớp.
- `assets/apercu.jpg` (1200×630): key art + logo ngang + dòng « FPS miễn phí trong trình duyệt ».
- `assets/deck/`: `capsule.jpg` (920×430), `hero.jpg` (1920×620), `jaquette.jpg` (600×900) — key art + logo;
  `icone.png` (256×256) — emblem như bộ icon.

### 6.3 Nhạc Suno — đã thay toàn bộ 4 file trong danh sách NOTICE

- **Xóa `dist/menu-theme.mp3`** (ngoại lệ được sửa thẳng `dist/`: file này chỉ tồn tại ở `dist/`, `build.py` ghi
  rõ vắng file = không nhạc menu; build sau khi xóa in « musique des menus : aucune », game chạy bình thường).
- **Thay bằng bản tự tổng hợp** (Python tổng hợp sóng → WAV 48 kHz stereo → ffmpeg/libmp3lame MP3 thật):
  `assets/sfx/fin/m_victory.mp3` (3,0 s, hợp âm Đô trưởng đi lên), `assets/sfx/fin/m_defeat.mp3` (3,0 s, nốt trầm
  đi xuống), `assets/rankup.mp3` (1,1 s, quét đi lên). Các SFX khác (CC0/CC BY theo credits) giữ nguyên.

### 6.4 Kiểm chứng giai đoạn 3

- `python3 build.py`: **thành công** — manifest dist mang tên/description mới, `dist/` không còn `menu-theme.mp3`,
  build xác nhận « musique des menus : aucune ».
- `python3 tools/dev/check_i18n.py`: **0 lỗi** (1.616 khóa).
- Grep rà soát « Riposte »/« playriposte » ở các vị trí người dùng thấy (shell, build, giá trị i18n, README):
  chỉ còn ở các chỗ chấp nhận được — khóa Pháp của từ điển, lịch sử `changelog.json`, comment code, credits.json,
  và câu ghi nguồn fork trong README/CONTRIBUTING.
- Chromium headless (localhost, `dc_settings.lang='vi'`): tab « Xung Kích 9X, FPS miễn phí ngay trong trình
  duyệt », màn hình tải và menu chính hiển thị logo mới trên key art mới, toàn bộ menu tiếng Việt
  (ảnh: `/tmp/xk9x_menu.png` trong môi trường kiểm thử; CDN Google Fonts không tải được trong máy ảo nên chữ
  menu dùng font dự phòng ở ảnh chụp — logo là ảnh nên hiện đúng).

### 6.5 Tồn đọng sau giai đoạn 3

- **Animation Mixamo (`assets/anim/clips.*`): giữ nguyên — chờ user bake lại từ tài khoản Mixamo của chính user
  trước khi public chính thức.** Đây là hạng mục NOTICE duy nhất chưa dọn; không tự ý thay vì cần tài khoản
  Mixamo cá nhân và kiểm chứng trực quan trong game.
- **User cần tự rename repo** trên GitHub thành `xung-kich-9x` (code, README và nút mã nguồn trong game đã trỏ
  sẵn về tên mới).
- Placeholder pháp lý trong `src/09k-legal.js` (`LEGAL.name`, address, email) vẫn chưa điền — `build.py` cảnh báo
  mỗi lần build; cần thông tin chủ thể của user trước khi production.
- Chế độ tiếng Pháp vẫn hiện tên « Riposte: Frontline » ở vài chuỗi (Pháp là ngôn ngữ nguồn/khóa của i18n, xem
  6.1) — nếu sau này muốn sạch tuyệt đối ở cả chế độ Pháp thì phải đổi khóa Pháp đồng bộ cả hai từ điển như đã
  làm với khóa tiêu đề.

## 7. Cầu nối tích hợp Sân Chơi 9X — T1 (2026-11-27)

Sân Chơi 9X (https://san-choi-9x.vercel.app) nhúng game trong iframe và cấp sẵn nick + mã phòng qua
URL. Giao ước đầy đủ nằm ở **`TICH-HOP.md`** (file riêng ở gốc repo, là tài liệu hai phía cùng theo).
Tóm tắt phần đã làm ở phía game, **hoàn thành ở local, chưa commit/push**:

- `src/09c-net.js`: thêm một khối « Cầu nối Sân Chơi 9X (XK9X) » ngay trước `netInit()` (hằng
  `XK9X_Q`/`XK9X_ON`/`XK9X_ORIGIN`, hàm `xk9xPost`, `xk9xApplyNick`, `xk9xWatch`) và ba điểm chạm tối
  thiểu: `netInit()` gọi `xk9xApplyNick()` trước chỗ đọc `cod_nick` (nick qua URL ghi đè `cod_nick`
  sau khi qua `netClean`), gửi sự kiện `ready` + chạy interval 500 ms theo dõi `NET.joined` +
  `pagehide` gửi `left`; `netAutoJoin()` thêm nhánh `creer` (host theo mã Sân Chơi chỉ định bằng
  `netHost({ code })`, đúng mẫu `acctWhenReady` của nhánh `salon`; có `salon` thì `salon` vẫn ưu tiên).
  Sự kiện gửi về cha qua `postMessage` tới đúng `xk9x_origin` (không bao giờ `'*'`):
  `{ src: 'xk9x', ev: 'ready' | 'hosted' | 'joined' | 'left', code }`.
- `vercel.json`: thêm header cho `/riposte-frontline.html` —
  `Content-Security-Policy: frame-ancestors 'self' https://san-choi-9x.vercel.app http://localhost:2567`
  (localhost:2567 là cổng dev của Sân Chơi). Các cấu hình khác giữ nguyên, kể cả `buildCommand` có
  `tools/restore_assets.py`.
- Kiểm chứng: `python3 build.py` sạch, `check_i18n.py` 0 lỗi, dist chứa đủ mã cầu nối. Headless
  Chromium với trang cha khác origin nhúng iframe `?xk9x=1&nick=ChienSi9X&creer=AB3CD&xk9x_origin=…`:
  cha nhận `ready` rồi `hosted` (`code 'AB3CD'`); trong iframe `cod_nick` và `NET.nick` đều là
  `ChienSi9X`, `NET.role === 'host'`, `NET.code === 'AB3CD'`, `NET.joined === true`. Hạn chế môi
  trường: máy ảo không ra được Internet nên PeerJS trên CDN không tải được — bước host được kiểm
  chứng bằng `Peer` giả lập tiêm vào trang (chứng minh vá gọi đúng `netHost` với mã chỉ định và phát
  sự kiện); kết nối PeerJS cloud thật cần kiểm chứng lại trên bản deploy.

## 8. Tính năng fork: chọn súng solo — mọi súng đều mở khóa trong solo (2026-11-27)

Theo yêu cầu người chơi (duyệt bởi user): ở màn Solo, chọn trực tiếp súng chính cho trận solo; trong solo
**mọi súng chính đều dùng được bất kể cấp độ/khóa tiến trình**. Ngoài solo (kho vũ khí, lớp nhân vật, online)
`weaponLock` áp dụng như cũ — tính năng này không đụng hệ lớp nhân vật và không đụng online.
**Hoàn thành ở local, chưa commit/push.**

- **Cài đặt:** `Settings.soloGun` (mặc định `null` = dùng súng theo lớp) thêm vào literal `Settings` ở
  `src/01-core.js`; lưu/tải qua `saveSettings()`/`dc_settings` như mọi cài đặt khác (bản lưu cũ không có khóa
  này thì `Object.assign` giữ mặc định `null`).
- **Hàm dùng chung:** `soloGunDef()` ở `src/06r-arsenal.js` (cạnh `classWeapons`) — trả
  `weaponDef(Settings.soloGun, [], null)` (súng trần, không phụ kiện/camo) nếu id hợp lệ và `cat !== 'pistol'`,
  ngược lại `null`. `arsenalPrebuild()` được mở rộng để `gunPrebuild` thêm def của súng solo, tránh khựng
  nạp model khi vào trận.
- **Áp dụng:** `giveLoadout()` ở `src/08-player.js` — cờ phân biệt solo/online là `MATCH.online` (cờ chuẩn,
  đã dùng sẵn trong chính file này và ở `07-bots.js`, `06r-arsenal.js`). Khi `!MATCH.online` và
  `soloGunDef()` khác `null`: `classWeapons(...)[0]` được thay bằng def súng solo rồi mới `makeArms(...)`;
  súng phụ, chuỗi hạ gục, lựu đạn vẫn của lớp. Online giữ nguyên 100% hành vi cũ.
- **Giao diện (`src/09e-menus.js`):** màn Solo (`SOLO_PAGES.solo`) thêm dòng link « Arme principale »
  (giá trị: tên súng đã chọn hoặc « Theo lớp nhân vật ») trỏ tới trang mới `SOLO_PAGES.gun` — lưới thẻ theo
  mẫu trang `map` (`grid: true`, thẻ `lcard`): thẻ đầu « Theo lớp nhân vật » (chọn = xóa override), rồi mọi
  súng `cat !== 'pistol'` xếp theo `WEAPON_CATS` với tiêu đề nhóm chèn bằng hàng `node` chiếm trọn chiều
  ngang lưới; ảnh thẻ là thumbnail kho vũ khí (`weaponThumb(id)`, `09o-vitrine.js`), mở trang có gọi
  `thumbsStart()` để nạp nốt thumbnail. Đầu trang có ghi chú « Ở chế độ solo, mọi súng đều được mở khóa. »
  Trang này **không gọi `weaponLock`** — đó là cốt lõi của tính năng. Chọn thẻ → lưu `Settings.soloGun` +
  `saveSettings()` + `lmPop` về màn Solo như mẫu trang map.
- **i18n:** khóa « Arme principale » đã có sẵn trong từ điển (Anh « Primary weapon », Việt « Vũ khí chính » —
  giữ nguyên bản dịch cũ cho nhất quán toàn game). Thêm 2 khóa mới vào section `09e-menus.js` của cả
  `i18n/en.txt` và `i18n/vi.txt`: « Selon la classe » (Class default / Theo lớp nhân vật) và
  « En solo, toutes les armes sont débloquées. » (In solo, all weapons are unlocked. / Ở chế độ solo, mọi
  súng đều được mở khóa.). Từ điển: **1.618/1.618 entry**, `check_i18n.py` **0 lỗi**, `python3 build.py` sạch.
- **Kiểm chứng headless (Chromium, bản build local, `dc_settings.lang='vi'`): 19/19 PASS** — màn Solo có
  dòng « Vũ khí chính » với giá trị mặc định « Theo lớp nhân vật »; trang súng có đúng 15 thẻ (1 lớp + 14
  súng chính: 4 nhóm AR/SMG/súng tỉa/shotgun), có AK-47 và SCAR-H, không thẻ nào khóa, không súng lục;
  chọn L96A1 → dòng súng hiện « L96A1 », đã lưu vào `dc_settings`, reload trang vẫn còn; gọi trực tiếp
  `giveLoadout()` trong ngữ cảnh trang (cách thay thế việc vào trận thật, theo đúng điểm trang bị khi
  vào trận/hồi sinh): solo + `soloGun='l96'` → `PL.ent.arms` = [l96, m9 của lớp]; `soloGun=null` → [m4, m9]
  như cũ; giả lập cờ `MATCH.online=true` → soloGun bị bỏ qua, dùng súng lớp. Chưa kiểm chứng bằng một trận
  solo chơi thật từ đầu tới cuối trong máy ảo (nặng), nhưng `giveLoadout()` là đúng hàm mà luồng vào
  trận/hồi sinh gọi.

### 8.1 Công tắc mở khóa súng online tạm thời — `?unlockall=` (2026-11-27)

- **Mục đích:** mở toàn bộ súng cả khi chơi **online** cho đợt người dùng trải nghiệm, có tham số bật/tắt
  để tắt sau này mà không sửa logic.
- **Bật:** mở game kèm `?unlockall=1` (Sân Chơi 9X tự thêm tham số này vào URL iframe mở game).
  **Tắt:** mở game kèm `?unlockall=0` một lần, hoặc xóa `dc_settings` trong localStorage của trình duyệt.
- **Cơ chế:** `src/00-i18n.js` đọc tham số rất sớm thành hằng `UNLOCKALL_URL` (true/false/null);
  `src/01-core.js` áp dụng vào `Settings.unlockAll` (mặc định `false`) ngay sau khi nạp `dc_settings`
  và **lưu lại** qua `saveSettings()` — các lần vào sau, kể cả vào thẳng không qua link có tham số, vẫn
  giữ trạng thái cho tới khi nhận `unlockall=0`. `weaponLock()` trong `src/06r-arsenal.js` trả về
  « không khóa » cho mọi súng khi công tắc bật, nên kho vũ khí, màn sửa lớp và kiểm tra trang bị đều mở
  hết theo cùng một cổng duy nhất.
- **Không đụng (bản đầu):** khóa ô lớp tùy biến theo cấp người chơi (`CUSTOM_UNLOCK`), khóa phụ kiện/camo theo
  cấp súng, và hành vi `soloGun` (solo vẫn luôn mở toàn bộ như mục 8).
- **Mở rộng 2026-11-27 (user duyệt):** `unlockall` nay mở **luôn cả 5 ô lớp tùy biến** — `customUnlocked()`
  trong `src/06r-arsenal.js` trả về true khi công tắc bật, và UI lớp (`classesHeader`, danh sách ô, panel
  chi tiết trong `src/09e-menus.js`) đi qua cùng cổng này nên hiện « 5/5, tous débloqués » và nút Tạo lớp
  ngay ở cấp 1. Tắt bằng `?unlockall=0` thì các ô **chưa tạo** khóa lại theo cấp như cũ; lớp đã tạo trong
  lúc bật vẫn còn dữ liệu nhưng không chọn được cho tới khi đủ cấp hoặc bật lại.
- **Mở rộng tiếp 2026-11-27 (user duyệt):** rà soát toàn bộ game — khóa theo cấp chỉ có đúng 4 cổng, tất cả
  tập trung trong `src/06r-arsenal.js`: `weaponLock` (súng), `customUnlocked` (ô lớp), `attLock` (phụ kiện
  theo cấp cây súng đang gắn), `camoLock` (ngụy trang theo cấp cây súng, cao nhất Holo cấp 30). Nay
  `attLock`/`camoLock` cũng trả về « không khóa » khi `unlockAll` bật, và `arsNextUnlock()` trả về null
  (kho vũ khí hiện « đã mở hết » thay vì báo mốc cấp tiếp theo). Vậy `unlockall=1` = mở **toàn bộ nội dung
  bị khóa theo cấp**; `unlockall=0` khóa lại tất cả — phụ kiện/camo đã gắn trong lúc bật sẽ bị
  `classCleanAll` gỡ khi tải lại ở trạng thái tắt, đúng như hành vi với súng khóa từ trước. Các thứ không
  theo cấp (thử thách/défi, killstreak theo số mạng trong trận) không thuộc phạm vi công tắc này.

## 9. Cải thiện cho máy yếu — Phase 1: phân loại lại iGPU 2015–2020 + gợi ý tiết kiệm trên desktop (2026-11-27)

Theo kế hoạch `KE-HOACH-CAI-THIEN-MAY-YEU.md` (Phase 1). Mục tiêu của user: game chạy được trên **nhiều máy
nhất có thể** — thà xuất phát hơi thấp rồi leo lên còn hơn xuất phát quá nặng. **Hoàn thành ở local, chưa
commit/push.**

- **Bối cảnh lỗi:** `GPU_WEAK` (`src/01-core.js`) chỉ nhận iGPU Intel đời 2010–2012, nên HD 520/620, UHD
  620/630… (máy trường học/văn phòng 2015–2020) rơi vào tier xuất phát **medium**: MSAA 4×, POM bật, shadow
  1536 × 3 cascade — quá nặng cho iGPU chia sẻ băng thông với CPU.
- **Quyết định thiết kế (quan trọng): KHÔNG nhét các chip này vào `GPU_WEAK`.** Trong code này `GPU_WEAK`
  đồng nghĩa « khởi động ở Minimale » qua `ultraAtBoot()` — tắt bóng tính toán, không pre-pass, texture còn
  1/3, và phải tải lại trang mới thoát được. Quá tay cho HD 620/UHD 620. Thay vào đó tạo nhóm riêng
  **`GPU_IGPU`** ngay sau `GPU_WEAK` trong `src/01-core.js`: HD Graphics 515/520/530/620, UHD Graphics
  610/620/630 + UHD không số (Ice Lake G1), Iris Graphics 5100/6100, Iris Plus Graphics 640/650/655 + Iris
  Plus không số (Ice Lake G4/G7). Regex cố ý hẹp: **không** bắt Iris Pro, Iris Xe, UHD 7xx, GPU rời,
  Apple M, Adreno/Mali đời mới.
- **Tier xuất phát:** ánh xạ `GPU.tier` (IIFE `GPU`, `src/01-core.js`): khi quality = auto, nhóm `GPU_IGPU`
  xuất phát ở **`medium2`** thay vì `medium`. Đã xác nhận `medium2` có thật trong `QUALITY` và nhẹ hơn thật:
  MSAA 2× (vs 4×), `pom: [0,0,1,0]` = tắt hẳn (vs bật `[8,6,10,0.85]`), đèn chớp sáng 3 (vs 4), `scaleMin`
  0,65; shadow giữ 1536 như medium. Không đổi: tier cố định do người dùng chọn, GPU rời → high, `GPU_SOFT`
  → ultra từ khởi động, cảm ứng → low. Lưu ý đúng code: `AUTO_LADDER` giữ nguyên và `rungMin` là trần leo
  của mode auto (thang không tự đổi profile cao hơn profile xuất phát) — xuất phát medium2 được bù bằng
  độ phân giải động leo tới mật độ màn hình ngay trong rung xuất phát, không tự nhảy lên profile medium.
- **Gợi ý eco cho desktop yếu (`src/09zl-economie.js`):** hộp thoại Économie d'énergie trước đây chỉ hiện
  ở thiết bị cảm ứng (vì `Settings.ecoAsk` chỉ được đặt = `COARSE` ở `src/01-core.js`). Nay `ecoAsk()` tự
  « thăng » `ecoAsk` khi: không phải cảm ứng (`!COARSE`), máy yếu (`GPU_WEAK || GPU_SOFT || GPU_IGPU`) và
  chưa từng được hỏi (`!Settings.ecoWeakAsked` — cờ mới thêm vào literal `Settings` ở `src/01-core.js`).
  `ecoClose()` đặt `ecoWeakAsked = true` + lưu qua `saveSettings()` như mọi cài đặt khác: đã trả lời (kể cả
  từ chối) thì không bao giờ hỏi lại; đóng trang trước khi trả lời thì lần sau hỏi tiếp (như hành vi cảm ứng).
  Tái dùng **nguyên** hộp thoại và chuỗi sẵn có trong `shell.html` — không thêm khóa i18n nào.
- **Kiểm chứng:** `python3 build.py` sạch (chỉ còn cảnh báo placeholder pháp lý `09k-legal.js` có từ trước);
  `tools/dev/check_i18n.py` **0 lỗi, 1.618/1.618**. Headless Chromium (bản build local, ghi đè chuỗi renderer
  WebGL bằng init script chặn `getParameter(37445/37446/7937)` để **chính code thật của game tự phân loại**):
  **121/121 PASS** — 19 chuỗi mẫu: HD 520/530/620, UHD 610/620/630, UHD không số, Iris 6100, Iris Plus
  640/655/không số → `GPU_IGPU=true`, tier `medium2`; GTX 1650, RX 580 → `high`; SwiftShader →
  `GPU_SOFT=true`, tier `ultra`; Apple M1 → `medium`; Iris Xe, UHD 770, Iris Pro 6200 → **không** bị bắt,
  tier `medium`; HD 4000 → `GPU_WEAK=true`, tier `ultra` (hành vi cũ giữ nguyên). Hồ sơ sạch không ghi đè:
  Settings mặc định không đổi (`quality 'auto'`, `eco false`, `ecoWeakAsked false`, `soloGun null`,
  `unlockAll false`), không lỗi JS. Luồng eco trọn vòng trên desktop giả lập UHD 620: vào được menu chính →
  hộp thoại hiện → bấm « Non merci » → `ecoWeakAsked=true` đã lưu trong `dc_settings` → tải lại trang → gọi
  `ecoAsk()` cũng không hiện nữa.
- **Chưa kiểm chứng:** FPS thật trên phần cứng UHD 620 (đó là Phase 0 của kế hoạch — cần máy thật của user).
  Trường hợp hiếm: người dùng đã tự bật/tắt eco trong Options trước khi từng thấy hộp thoại vẫn có thể bị
  hỏi một lần — chấp nhận được.

## 10. Cải thiện cho máy yếu — Phase 2: thích ứng trong trận sớm hơn, không bị chặn oan + giảm render 3D ngoài trận (2026-11-27)

Theo kế hoạch `KE-HOACH-CAI-THIEN-MAY-YEU.md` (Phase 2), nối tiếp mục 9. **Hoàn thành ở local, chưa
commit/push.** Không thêm chuỗi i18n nào (`check_i18n.py` 0 lỗi, 1.618/1.618; `python3 build.py` sạch).

- **Hằng dùng chung `GPU_LOW`** (`src/01-core.js`, ngay sau `GPU_IGPU`): `GPU_SOFT || GPU_WEAK || GPU_IGPU` —
  nhóm máy áp dụng mọi thích ứng « máy yếu » của phase này.
- **2.1 Hạ scale cả khi nghẽn hỗn hợp (`src/01-core.js`, `updateDynRes` + hàm mới `dynScaleDown`):** trước đây
  điều kiện `gpuBound` chặn mọi lần hạ khi nút thắt không thuần GPU — đúng ca máy CPU yếu + iGPU dùng chung, hoặc
  trình duyệt không có `EXT_disjoint_timer_query_webgl2` (không đo được thời gian GPU). Nay chia 2 nấc: khi
  `gpuBound` (hoặc scale > 1) vẫn đi `stepQuality` như cũ — chỉ đường này mới được tụt bậc thang/đổi profile
  (việc phải tạo lại render target vẫn giữ điều kiện chặt); khi không `gpuBound` mà FPS thấp bền vững qua **2 cửa
  sổ đo liên tiếp**, `dynScaleDown(step)` hạ **chỉ độ phân giải** trong sàn của profile/bậc hiện tại (cùng sàn và
  cùng quy tắc đóng băng GFX_SAFE như `stepQuality`), không bao giờ đổi profile. **Hysteresis:** `DYN.lastDown`
  ghi thời điểm hạ gần nhất; nhánh tăng (`roomy`) bị khóa 10 giây sau mỗi lần hạ (`DYN.good` bị xóa về 0), hết
  dao động mờ–nét; logic tăng khi máy khỏe không đổi ngoài khóa này.
- **2.2 Thích ứng nhanh đầu trận cho máy yếu (`updateDynRes`, `dynDown`):** thời gian miễn trừ đầu đợt render
  liên tục (`GPUF.t0`) rút từ 5 giây xuống **2 giây** chỉ khi `GPU_LOW` (GPU rời giữ 5 giây — lý do miễn trừ là
  compile shader muộn, máy yếu trả giá mỗi giây full-res đắt hơn). Bước hạ đầu tiên của máy yếu khi frame rất
  chậm (`med > budget × 1,6`) và scale còn cao (0,9–1,2): `dynDown` nhảy thẳng về **0,80** thay vì gặm 5%/cửa sổ;
  các bước sau theo nhịp cũ.
- **2.3 Giảm render 3D ngoài trận trên máy yếu:**
  - *Vue aérienne* (màn chọn lớp trước trận, `src/09-game.js` trong `frame()`): khi `GPU_LOW` và dynres bật,
    frame được render ở **scale 0,6** — kẹp tạm `RQ.scale` + `applyScale()` ngay trước `renderFrame()` và khôi
    phục ngay sau, trong cùng frame: chỉ đổi phần vẽ của render target (RS), không tạo lại gì, và
    `updateDynRes` ở cuối frame vẫn phán xét trên scale thật.
  - *Thumbnail 3D* (`src/09o-vitrine.js`): `thumbsAllowed()` thêm điều kiện — trên `GPU_LOW`, hàng đợi chỉ làm
    việc ở menu thường: **không** render trong pause của trận (thẻ lớp hiện ảnh súng trần mờ — đúng fallback
    thiết kế sẵn) và **không** render ở vue aérienne; nhịp ở menu giãn từ 40 ms xuống **300 ms**/thumbnail
    (`thumbsStep`). Ảnh súng trần vẫn là fallback như cũ qua `weaponThumbKey`.
  - *Preview 3D ở menu* (`src/09-game.js`, nhánh menu của `frame()`): trên `GPU_LOW`, `vwTick` (kho vũ khí) và
    `skinTick`/`skinLive` (trang phục) chỉ render **1 frame trên 2**; thời gian của frame bị bỏ được cộng dồn
    (`menuAcc`, trần 0,1 s) và trả cho lần render sau — pose của preview hoạt hình vốn tích lũy thời gian nên
    không mất nhịp. Nền menu hoạt hình giữ nguyên mọi frame.
- **Kiểm chứng (headless Chromium, bản build local, hồ sơ sạch SwiftShader → `GPU_SOFT`/`GPU_LOW` thật, tier
  ultra):** build sạch + i18n 0 lỗi; không lỗi JS từ code game. Lái trực tiếp hàm thật `updateDynRes` bằng
  tham số tổng hợp (interval 50 ms, CPU 40 ms = nghẽn CPU, stub thời gian GPU): **miễn trừ 2 giây** — trong
  2 giây đầu không thích ứng gì, ở mốc 3 giây (trước đây còn bị miễn trừ 5 giây) đã hạ; cửa sổ 1 chưa hạ (cần
  2 cửa sổ chậm), cửa sổ 2 nhảy thẳng **1,0 → 0,80**, rồi mỗi 2 cửa sổ −0,1 tới sàn 0,50, đơn điệu, bậc thang
  đóng băng. Hồ sơ medium2 mô phỏng: nghẽn hỗn hợp hạ scale tới sàn 0,70 và **không bao giờ đổi bậc**; cùng
  hồ sơ nhưng GPU-bound (GPU 45 ms) thì vẫn tụt bậc bình thường medium2 → low → ultra. **Hysteresis:** sau
  khi hạ, 20 cửa sổ frame tốt trong 6 giây mô phỏng không nâng được scale; qua mốc 10 giây thì nâng lại
  0,70 → 0,75. Hồi quy máy khỏe: 10 cửa sổ frame tốt, scale giữ nguyên 1,0. `thumbsAllowed` trên máy yếu:
  menu thường = được phép, vue aérienne = chặn, pause trong trận = chặn. **Vue aérienne đo từ bên trong
  `renderFrame`:** 8/8 mẫu ở scale 0,6 (vùng vẽ 576 px = 1280 × 0,75 × 0,6), và `RQ.scale` đọc từ ngoài frame
  vẫn là 1,0 (khôi phục đúng).
- **Chưa kiểm chứng được trong máy ảo:** một trận solo chơi thật đo scale tụt theo thời gian thực — máy ảo
  SwiftShader chạy dưới 4 FPS, khoảng cách frame > 250 ms khiến cửa sổ đo 30 frame của chính game bị xóa theo
  thiết kế (và gap > 2,5 s đặt lại `GPUF.t0`), nên dynres không tích lũy được cửa sổ nào; đây là giới hạn môi
  trường đo, không phải hành vi trên máy thật (máy UHD 620 ở 15–40 FPS có interval 25–66 ms, nằm trọn trong
  cửa sổ đo). Việc tụt scale trong trận thật cần xác nhận lại ở Phase 0 trên máy yếu thật của user. Nhịp
  `vwTick`/`skinLive` giảm một nửa được kiểm chứng bằng đọc code + không lỗi runtime, chưa đo FPS menu thực tế.

## 11. Cải thiện cho máy yếu — Phase 2.5: UHD 7xx GT1 vào nhóm iGPU + chia nhịp bot chống spike (2026-11-27)

Xuất phát từ báo cáo hiệu năng THẬT đầu tiên trên máy yếu (tester: i3 + **Intel UHD Graphics 730**, 16GB, FHD,
solo TDM map sable, đo trên bản cũ `a36d4d63` — trước Phase 1): FPS trung bình 33,1 (1% low 14,9); game tự hạ
hết cỡ medium → medium2 → low → Minimale ở scale 0,50 mà GPU vẫn ~20 ms/khung; draw calls ~450–570, tam giác
~1,5–1,9 triệu ngay cả ở Minimale; CPU code ~12,2 ms/khung, trong đó cột bots trung bình 2,0 ms nhưng có khung
vọt **30,9 ms**. Hai kết luận: (1) nút thắt là chi phí cố định, không phải độ phân giải; (2) UHD 730 chưa nằm
trong nhóm GPU_IGPU của Phase 1 (tester cũng không thấy bảng hỏi Tiết kiệm pin — hệ quả cùng một khe hở).

### A. Bổ sung UHD 710/730/750 vào GPU_IGPU — `src/01-core.js`

- Regex `GPU_IGPU` (dòng ~271): nhóm UHD có số thêm `710|730|750` (GT1 của Rocket Lake / Alder Lake, sức mạnh
  ngang UHD 630). Các máy này nay xuất phát ở **medium2** trong chế độ Tự động và được gợi ý eco như các iGPU
  2015–2020 khác. Comment khối phía trên được sửa tương ứng (bỏ "ni UHD 7xx", ghi rõ lý do + mốc đo).
- TUYỆT ĐỐI không bắt: **UHD 770** (GT2, mạnh hơn hẳn — đã kiểm chứng âm tính), Iris Xe, Iris Pro, GPU rời, Apple.
- Kiểm chứng bằng chuỗi renderer ANGLE ghi đè qua init script (code thật tự phân loại): UHD 710 / 730 (đúng
  chuỗi của tester, có mã `0x00004692`) / 750 → `GPU_IGPU = true`, tier `medium2`; UHD 770 → `false`, tier
  `medium`; hồi quy UHD 620 → medium2, UHD không số → medium2, GTX 1650 → high, Iris Xe → không bắt. **8/8 đạt.**

### B. Chia nhịp bot chống spike — `src/07-bots.js`, `src/07b-tactics.js`

Bằng chứng đồng bộ pha tìm được trong code (nguồn gốc của khung bots 30,9 ms):

- `botSense` vốn đã chia nhịp tốt: `senseT` khởi tạo ngẫu nhiên trong `makeBot`, mỗi chu kỳ tung lại
  `rand(0,12–0,22)` s và KHÔNG reset khi hồi sinh → pha trôi, không khóa nhau. Chu kỳ quyết định ổn định cũng
  tự rải (`decideT = rand(0,6–1,2)` sau mỗi lần quyết định). Phần thiếu nằm ở các **sự kiện đồng bộ**:
- `initTactics()` đặt `b.decideT = 0` cho MỌI bot mỗi lần hồi sinh; bot chết cùng lúc (nổ, loạt đạn) hồi sinh
  cùng lúc (TDM `botRespawn` 5,5 s như nhau) → quyết định + tìm đường dồn một khung.
- `forceDecide = true` được đặt đồng loạt cho nhiều bot trong cùng một khung khi người chơi lộ diện / dính
  flash → khung kế tiếp tất cả cùng chạy `decideTactic` (quét `findCover`, `flankPoint`, `pickGoal` + A*
  `findPath`).
- `setPath()` đặt `b.repathT = 1,5` CỐ ĐỊNH → các bot tìm đường cùng lúc sẽ tìm lại cùng lúc sau 1,5 s (tiếng
  vọng đồng bộ). Ngay đầu trận, 11 bot cùng `pickGoal` + A* trong vài khung đầu sau đếm ngược.

Đã làm (chỉ đổi THỜI ĐIỂM tính trong vài chục ms; không đổi chất lượng quyết định, độ khó DIFFS, hành vi
bắn/di chuyển từng frame):

1. **Ngân sách quyết định nặng mỗi khung** (`decideGate` trong `07b-tactics.js`, ngay trước `updateBot`):
   tối đa **2** lần `decideTactic`/khung, cộng 1 slot riêng cho quyết định bị ép (tổng trần 3). Bot thường bị
   hoãn được đặt `decideT = 0,03 + (id % 4) × 0,012` (thử lại sau ~30–70 ms); bot bị ép vượt trần **giữ nguyên
   `forceDecide`** để chạy ở khung kế tiếp (trễ 1–3 khung = 16–50 ms, vô hình so với thời gian phản ứng
   160–800 ms của bot; bắn không qua cổng này nên bot mới hồi sinh vẫn phản ứng ngay bằng cảm biến + súng).
   Bộ đếm khóa theo đồng hồ trận `now` — mọi bot trong cùng một lượt `botsTick` dùng chung một `now`.
2. **Rải quyết định + mục tiêu đầu sau hồi sinh** (`initTactics`): `decideT = (id % 6) × 0,12 + rand(0–0,15)`
   (trước đây là 0 cho tất cả); trường mới `goalT` (khai báo trong `BOT_STATE` ở `07-bots.js`, đặt
   `(id % 6) × 0,09 + rand(0–0,12)`) — nhánh `roam` mặc định của `updateBot` chờ `goalT` mới gọi
   `pickGoal`/`setPath` lần đầu (bot đứng yên, súng sẵn sàng, vẫn bắn được nếu thấy địch).
3. **Rải repath** (`setPath` trong `07-bots.js`): `repathT = 1,5 + (id % 5) × 0,15 + rand(0–0,25)` (1,5–2,35 s);
   cơ chế "mục tiêu lệch > 3 m thì tìm lại ngay" trong `follow()` giữ nguyên nên truy đuổi không bị cũ.

Kiểm chứng (headless SwiftShader, script `~/workspace/test-rig/phase25-test*.js`):

- Build sạch, `check_i18n.py` 0 lỗi (1.618/1.618). Vào được trận solo TDM thật (dùng hook test chính thức của
  game `window.MATCH_COUNTDOWN = 0` để bỏ đếm ngược giữ bot), **không lỗi JS** của game.
- Cổng ngân sách: kiểm tra đơn vị trên `decideGate` + kiểm tra sống trong `updateBot` — ép cả 11 bot đến hạn
  cùng một khung: đúng **2** quyết định chạy, 9 bot hoãn; ép `forceDecide` cả 11: đúng **3** chạy, 8 bot giữ
  cờ sang khung sau. Công thức rải `decideT`/`goalT`/`repathT` khớp theo chỉ số bot trên cả 11 bot thật.
- Mô phỏng logic 1.500 tick (75 giây game, lái trực tiếp `botsTick`): tổng 1.014 lần `decideTactic`, **không
  tick nào vượt 3**; bot di chuyển thật (12 giây đầu: 11/11 bot rời spawn, tổng quãng đường 589 m) và đấu súng
  thật (**1.101 phát bắn** trong 75 giây). Kill = 0 trong harness này — giao tranh tầm xa + bot hồi 30 máu/s
  sau 5 giây không trúng đạn; bản vá không đụng đường cảm biến/ngắm/sát thương nên không quy cho bản vá.
- **Giới hạn đo:** máy ảo SwiftShader chỉ chạy được ~14 khung hình/90 giây giờ tường (CPU ảo bị throttle) nên
  không đo được cột bots (ms) trong trận render thật; bằng chứng giảm spike là cấu trúc (số quyết định nặng mỗi
  khung bị chặn cứng 2+1, kiểm đếm được) + không hồi quy hành vi. Số ms thật cần đo lại trên máy UHD 730 của
  tester theo file hướng dẫn đo FPS (mục 9/10) sau khi bản này lên sóng.

### C. Khảo sát draw call / tam giác ở Minimale trên sable — CHỈ ĐỀ XUẤT, chưa làm

Đo trong trang (boot ULTRA, sable, nhìn từ điểm spawn): **209 draw calls, ~697k tam giác/khung**; tổng hình
học map đã gộp `WORLD.tris = 624.296`; 358 mesh (51 InstancedMesh, 27 SkinnedMesh); nav 7.683 nút; bóng tính
sẵn TẮT khi boot ULTRA. Con số của tester cao hơn (450–570 calls, 1,5–1,9M tris) vì: máy tester boot ở medium
nên khi thang tự động tụt xuống Minimale **shadow pass vẫn bật** (512, 1 cascade) = vẽ lại gần như toàn cảnh
một lần nữa; cộng thêm góc nhìn giữa map, viewmodel súng và hiệu ứng. Phân bổ ước lượng: **map gộp theo vật
liệu chiếm ~85–90% tam giác** (mesh đơn lớn nhất: steel 34,4k, plastic 30,2k, concrete 28,1k tris — gộp toàn
map nên frustum culling gần như vô hiệu); lính + súng: hình học LOD cao ~24,4k tris/con, `lodPx` ở Minimale là
260 nên đổi LOD muộn; địa hình sable phẳng nằm trong chính các buffer gộp; sky/nước nhỏ.

Đòn bẩy đề xuất (chưa triển khai, chờ duyệt): (1) tắt shadow pass khi thang auto chạm rung Minimale — neo
`SHADOWS.on`/đường áp chất lượng trong `01-core.js` + `09-game.js`, tiết kiệm gần một lần vẽ toàn cảnh đúng
kịch bản của tester, rủi ro thị giác thấp; (2) chia buffer map gộp theo khu vực để frustum culling có tác
dụng — neo `02a-kit.js` (`WORLD.bufs`/`kitEnd`), tiềm năng −30–50% tam giác map, công sức trung bình, phải giữ
build tất định cho netcode; (3) `lodPx` Minimale 260 → ~400 — neo `QUALITY.ultra` (`01-core.js`), lính dùng
LOD thấp sớm hơn, ở scale 0,5 gần như không thấy khác; (4) `detail`/`scatter` Minimale 24 m/14 m → ~16 m/10 m —
neo `QUALITY.ultra` + `updateMapDetail` (`02a-kit.js`), rủi ro pop-in gần; (5) `updateMapDetail` hiện quét
toàn bộ danh sách fine/scatter mỗi khung — giảm nhịp xuống ~150 ms, rủi ro bằng không.

## 12. Cách build lại

```bash
python3 build.py   # sinh dist/riposte-frontline.html, đã nhúng cả I18N_EN và I18N_VI
```

### Ghi chú kỹ thuật: đưa assets nhị phân lên GitHub (2026-11-27)

Kênh đẩy file của Muse lên GitHub chỉ nhận file văn bản (UTF-8), nên 20 assets nhị phân mới (logo, icon, key art, ảnh deck, 3 file nhạc tự tổng hợp — tổng ~1,1MB) được lưu thêm dưới dạng mã hóa base64 trong `assets-b64/` (cấu trúc thư mục giống `assets/`, thêm đuôi `.b64`). Script `tools/restore_assets.py` giải mã chúng về `assets/` trước khi build; `vercel.json` đã cấu hình chạy script này tự động trước `build.py`, và đã kiểm chứng giải mã không làm thay đổi nội dung file (hash khớp). Hệ quả khi xem repo trên GitHub: các file trong `assets/` (logo.webp, icon…) vẫn là bản cũ của upstream cho tới khi có một lần commit trực tiếp bằng git — bản chạy trên Vercel vẫn đúng bản mới nhờ bước khôi phục. Khi nào tiện, chạy `git add -A && git commit` từ máy có clone đầy đủ rồi xóa `assets-b64/` + `tools/restore_assets.py` và đưa `buildCommand` trong vercel.json về `python3 build.py`.
