"""
SOE Rhythm Quest — EPUB3 Packager
Creates a valid .epub file from the OEBPS directory structure.

Usage: python build_epub.py
Output: ebook/output/soe-rhythm-quest-dictionary.epub
"""
import os
import zipfile
from pathlib import Path

EBOOK_DIR = Path("ebook")
OEBPS_DIR = EBOOK_DIR / "OEBPS"
OUTPUT_DIR = EBOOK_DIR / "output"
EPUB_NAME = "soe-rhythm-quest-dictionary.epub"


def build_epub():
    OUTPUT_DIR.mkdir(exist_ok=True)
    epub_path = OUTPUT_DIR / EPUB_NAME

    with zipfile.ZipFile(epub_path, "w", zipfile.ZIP_DEFLATED) as epub:
        # 1. mimetype MUST be first entry, stored (not compressed)
        epub.writestr("mimetype", "application/epub+zip", compress_type=zipfile.ZIP_STORED)

        # 2. META-INF/container.xml
        container_xml = """<?xml version="1.0" encoding="UTF-8"?>
<container xmlns="urn:oasis:names:tc:opendocument:xmlns:container" version="1.0">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>"""
        epub.writestr("META-INF/container.xml", container_xml)

        # 3. Walk the OEBPS directory and add all files
        file_count = 0
        for root, dirs, files in os.walk(OEBPS_DIR):
            # Skip backup directory
            if "images_backup" in root:
                continue
            for filename in sorted(files):
                filepath = Path(root) / filename
                arcname = str(filepath.relative_to(EBOOK_DIR)).replace("\\", "/")
                epub.write(filepath, arcname)
                file_count += 1

    size_mb = epub_path.stat().st_size / (1024 * 1024)
    print(f"EPUB built successfully!")
    print(f"  File: {epub_path}")
    print(f"  Size: {size_mb:.1f} MB")
    print(f"  Files packaged: {file_count}")


if __name__ == "__main__":
    build_epub()
