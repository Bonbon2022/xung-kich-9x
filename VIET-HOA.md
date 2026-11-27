# Việt hóa Riposte: Frontline — Giai đoạn 1 (hạ tầng i18n + từ điển tiếng Việt)

Fork: `Bonbon2022/Riposte-Frontline-Source`, từ upstream `BenDBSS/Riposte-Frontline-Source` v5.6.0 (commit 31ca050d).
Trạng thái giai đoạn 1: **hoàn thành ở local, chưa commit/push.**

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

Cách chọn ngôn ngữ: Cài đặt trong game (Tùy chọn → Ngôn ngữ → Tiếng Việt), hoặc tự động khi ngôn ngữ trình duyệt đầu tiên khớp là tiếng Việt. Mặc định vẫn là tiếng Anh như upstream.

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

## 4. Còn lại cho giai đoạn 2

- **Chuỗi chưa qua `_t`:** tin tức trong game (`src/09f-news.js`) chỉ có bản Pháp + Anh (`title_en`/`x_en`) — ở chế độ vi sẽ hiện tiếng Pháp; cần cơ chế `title_vi`/`x_vi` hoặc khóa từ điển riêng. Báo cáo kết nối (`netdReport`, `src/09c-net.js`) và phần trang trí map cố ý giữ ngôn ngữ gốc theo thiết kế upstream (nằm trong `i18n/ignore.txt`).
- **README tiếng Việt** cho fork và ghi chú nguồn gốc bản dịch.
- **Trước khi public bản Việt hóa** — các mục `NOTICE.md` của upstream vẫn áp dụng: không dùng tên/logo "Riposte: Frontline" cho bản phân phối riêng, nhạc Suno chỉ phi thương mại, animation lính từ Mixamo không được phân phối rời, một số âm thanh CC BY phải ghi credit. Cần quyết định tên/logo riêng cho bản Việt.
- **Font:** game dùng font hiển thị tải từ Google Fonts (Saira/Saira Stencil) — dấu tiếng Việt ở menu/HUD hiển thị đúng qua font hệ thống dự phòng trong lần kiểm thử; nên kiểm tra lại trên trình duyệt thật có mạng, và cân nhắc bổ sung subset Vietnamese cho font hiển thị nếu có ký tự lỗi.
- Rà soát chất lượng dịch bởi người chơi thật (đặc biệt là các câu đùa mô tả map và văn pháp lý), và dịch nốt các chuỗi phát sinh khi upstream ra bản mới (chạy lại kiểm tra độ phủ khóa en/vi).

## 5. Cách build lại

```bash
python3 build.py   # sinh dist/riposte-frontline.html, đã nhúng cả I18N_EN và I18N_VI
```
