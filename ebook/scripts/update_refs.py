"""Update all XHTML image references from .png to .jpg"""
import os

pages_dir = os.path.join("ebook", "OEBPS", "pages")
count = 0

for f in sorted(os.listdir(pages_dir)):
    if f.endswith(".xhtml"):
        path = os.path.join(pages_dir, f)
        with open(path, "r", encoding="utf-8") as fh:
            content = fh.read()
        if ".png" in content:
            content = content.replace('.png"', '.jpg"')
            content = content.replace(".png'", ".jpg'")
            with open(path, "w", encoding="utf-8") as fh:
                fh.write(content)
            count += 1

print(f"Updated {count} XHTML files: .png -> .jpg")
