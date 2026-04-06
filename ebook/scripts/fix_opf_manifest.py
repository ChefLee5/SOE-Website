"""
Generate manifest entries for all images and fonts in the EPUB,
then inject them into content.opf.
"""
import os
from pathlib import Path

OPF_PATH = os.path.join("ebook", "OEBPS", "content.opf")
IMAGE_DIR = os.path.join("ebook", "OEBPS", "images")
FONT_DIR = os.path.join("ebook", "OEBPS", "fonts")

# Read current OPF
with open(OPF_PATH, "r", encoding="utf-8") as f:
    content = f.read()

# Generate image manifest entries
image_entries = []
for img in sorted(os.listdir(IMAGE_DIR)):
    if img.endswith(".jpg"):
        item_id = "img_" + img.replace("-", "_").replace(".", "_").replace(" ", "_")
        image_entries.append(
            f'    <item id="{item_id}" href="images/{img}" media-type="image/jpeg"/>'
        )
    elif img.endswith(".png"):
        item_id = "img_" + img.replace("-", "_").replace(".", "_").replace(" ", "_")
        image_entries.append(
            f'    <item id="{item_id}" href="images/{img}" media-type="image/png"/>'
        )

# Generate font manifest entries
font_entries = []
if os.path.exists(FONT_DIR):
    for font in sorted(os.listdir(FONT_DIR)):
        if font.endswith(".woff2"):
            item_id = "font_" + font.replace("-", "_").replace(".", "_")
            font_entries.append(
                f'    <item id="{item_id}" href="fonts/{font}" media-type="font/woff2"/>'
            )

# Build the injection block
injection = "\n".join(
    ["    <!-- Images -->"] + image_entries +
    ["    <!-- Fonts -->"] + font_entries
)

# Insert before </manifest>
if "<!-- Images -->" not in content:
    content = content.replace("  </manifest>", injection + "\n  </manifest>")
    with open(OPF_PATH, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Added {len(image_entries)} image + {len(font_entries)} font entries to OPF manifest")
else:
    print("Image entries already present in OPF, skipping")
