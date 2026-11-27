#!/usr/bin/env python3
"""Khôi phục các assets nhị phân từ bản mã hóa base64 trong assets-b64/.

Vì sao cần file này: các assets hình/nhạc mới của Xung Kích 9X (logo, icon,
key art, nhạc tự tổng hợp) được đưa lên GitHub dưới dạng .b64 (văn bản) do
giới hạn của kênh đẩy file; script này giải mã chúng về đúng vị trí trong
assets/ trước khi build. Chạy tay:  python3 tools/restore_assets.py
Vercel tự chạy script này trước build.py (xem vercel.json). Khi nào các file
nhị phân thật đã được commit trực tiếp bằng git, có thể xóa assets-b64/ và
script này.
"""
import base64, os, sys

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, "assets-b64")

def main():
    n = 0
    for dirpath, _dirs, files in os.walk(SRC):
        for f in files:
            if not f.endswith(".b64"):
                continue
            src = os.path.join(dirpath, f)
            rel = os.path.relpath(src, SRC)[:-4]  # bỏ đuôi .b64
            dst = os.path.join(ROOT, "assets", rel)
            os.makedirs(os.path.dirname(dst), exist_ok=True)
            with open(src, "r", encoding="ascii") as fh:
                data = base64.b64decode(fh.read())
            with open(dst, "wb") as fh:
                fh.write(data)
            n += 1
    print(f"restore_assets: đã khôi phục {n} file vào assets/")

if __name__ == "__main__":
    sys.exit(main())
