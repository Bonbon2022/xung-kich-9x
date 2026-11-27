# Việt hóa Riposte: Frontline — Giai đoạn 1 + 2 (hạ tầng i18n, từ điển, mặc định tiếng Việt, tin tức, README)

Fork: `Bonbon2022/Riposte-Frontline-Source`, từ upstream `BenDBSS/Riposte-Frontline-Source` v5.6.0 (commit 31ca050d).
Trạng thái giai đoạn 1: **hoàn thành, đã đẩy lên fork (commit 82e68590).** Giai đoạn 2: **hoàn thành ở local, chưa commit/push.**

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
- **Trước khi public bản Việt hóa** — các mục `NOTICE.md` của upstream vẫn áp dụng: không dùng tên/logo "Riposte: Frontline" cho bản phân phối riêng, nhạc Suno chỉ phi thương mại, animation lính từ Mixamo không được phân phối rời, một số âm thanh CC BY phải ghi credit. Cần quyết định tên/logo riêng cho bản Việt (chưa làm trong giai đoạn 2 theo chỉ đạo).
- Rà soát chất lượng dịch bởi người chơi thật (đặc biệt là các câu đùa mô tả map và văn pháp lý), và dịch nốt các chuỗi phát sinh khi upstream ra bản mới (chạy lại kiểm tra độ phủ khóa en/vi).

## 6. Cách build lại

```bash
python3 build.py   # sinh dist/riposte-frontline.html, đã nhúng cả I18N_EN và I18N_VI
```
