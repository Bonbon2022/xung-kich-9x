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

## 9. Cách build lại

```bash
python3 build.py   # sinh dist/riposte-frontline.html, đã nhúng cả I18N_EN và I18N_VI
```

### Ghi chú kỹ thuật: đưa assets nhị phân lên GitHub (2026-11-27)

Kênh đẩy file của Muse lên GitHub chỉ nhận file văn bản (UTF-8), nên 20 assets nhị phân mới (logo, icon, key art, ảnh deck, 3 file nhạc tự tổng hợp — tổng ~1,1MB) được lưu thêm dưới dạng mã hóa base64 trong `assets-b64/` (cấu trúc thư mục giống `assets/`, thêm đuôi `.b64`). Script `tools/restore_assets.py` giải mã chúng về `assets/` trước khi build; `vercel.json` đã cấu hình chạy script này tự động trước `build.py`, và đã kiểm chứng giải mã không làm thay đổi nội dung file (hash khớp). Hệ quả khi xem repo trên GitHub: các file trong `assets/` (logo.webp, icon…) vẫn là bản cũ của upstream cho tới khi có một lần commit trực tiếp bằng git — bản chạy trên Vercel vẫn đúng bản mới nhờ bước khôi phục. Khi nào tiện, chạy `git add -A && git commit` từ máy có clone đầy đủ rồi xóa `assets-b64/` + `tools/restore_assets.py` và đưa `buildCommand` trong vercel.json về `python3 build.py`.
