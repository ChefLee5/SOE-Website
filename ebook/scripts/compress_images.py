"""
SOE Rhythm Quest — Image Compression Pipeline
Phase 5: Reduce EPUB size from ~120MB to target <40MB

Strategy:
1. Resize oversized images to max 1024px width (EPUB readers don't need more)
2. Convert PNG → optimized PNG with reduced palette where safe
3. Apply maximum lossless compression
4. For images >500KB, convert to high-quality JPEG (q=85)
5. Backup originals before processing
"""
import os
import sys
import shutil
from pathlib import Path
from PIL import Image

# Configuration
IMAGE_DIR = Path(__file__).parent.parent / "OEBPS" / "images"
BACKUP_DIR = Path(__file__).parent.parent / "OEBPS" / "images_backup"
MAX_WIDTH = 1024
MAX_HEIGHT = 1024
JPEG_QUALITY = 85
PNG_SIZE_THRESHOLD_KB = 500  # Convert to JPEG if PNG > this size after resize


def compress_images():
    if not IMAGE_DIR.exists():
        print(f"ERROR: Image directory not found: {IMAGE_DIR}")
        sys.exit(1)

    images = list(IMAGE_DIR.glob("*.png"))
    if not images:
        print("No PNG images found.")
        return

    # Create backup
    if not BACKUP_DIR.exists():
        print(f"Creating backup at {BACKUP_DIR}...")
        shutil.copytree(IMAGE_DIR, BACKUP_DIR)
        print(f"  Backed up {len(images)} images.")
    else:
        print("Backup already exists, skipping backup step.")

    total_before = 0
    total_after = 0
    converted_to_jpg = 0
    resized_count = 0

    print(f"\nProcessing {len(images)} images...")
    print(f"{'File':<50} {'Before':>8} {'After':>8} {'Saved':>8} {'Action'}")
    print("-" * 90)

    for img_path in sorted(images):
        before_size = img_path.stat().st_size
        total_before += before_size
        before_kb = before_size / 1024

        try:
            with Image.open(img_path) as img:
                orig_w, orig_h = img.size
                action = "optimized"

                # Step 1: Resize if too large
                if orig_w > MAX_WIDTH or orig_h > MAX_HEIGHT:
                    img.thumbnail((MAX_WIDTH, MAX_HEIGHT), Image.LANCZOS)
                    resized_count += 1
                    action = f"resized {orig_w}x{orig_h} → {img.size[0]}x{img.size[1]}"

                # Step 2: Convert RGBA to RGB if no transparency needed
                has_transparency = False
                if img.mode == 'RGBA':
                    # Check if any pixel actually uses transparency
                    extrema = img.getextrema()
                    if len(extrema) == 4:  # RGBA
                        alpha_min = extrema[3][0]
                        has_transparency = alpha_min < 255

                # Step 3: Save as optimized PNG first
                if has_transparency:
                    # Keep as PNG (transparency required)
                    img.save(img_path, "PNG", optimize=True)
                else:
                    # Convert to RGB and try both PNG and JPEG
                    rgb_img = img.convert("RGB") if img.mode != "RGB" else img

                    # Save optimized PNG
                    img_path_tmp = img_path.with_suffix(".tmp.png")
                    rgb_img.save(img_path_tmp, "PNG", optimize=True)
                    png_size = img_path_tmp.stat().st_size

                    if png_size / 1024 > PNG_SIZE_THRESHOLD_KB:
                        # PNG still too big — convert to JPEG
                        jpg_path = img_path.with_suffix(".jpg")
                        rgb_img.save(jpg_path, "JPEG", quality=JPEG_QUALITY, optimize=True)

                        # Remove old PNG and temp
                        img_path_tmp.unlink()
                        img_path.unlink()

                        after_size = jpg_path.stat().st_size
                        total_after += after_size
                        converted_to_jpg += 1
                        action = f"→ JPEG (q={JPEG_QUALITY})" if "resized" not in action else action + " + JPEG"

                        after_kb = after_size / 1024
                        saved = before_kb - after_kb
                        print(f"{jpg_path.name:<50} {before_kb:>7.0f}K {after_kb:>7.0f}K {saved:>7.0f}K  {action}")
                        continue
                    else:
                        # PNG is fine, use it
                        shutil.move(str(img_path_tmp), str(img_path))

                after_size = img_path.stat().st_size
                total_after += after_size
                after_kb = after_size / 1024
                saved = before_kb - after_kb
                print(f"{img_path.name:<50} {before_kb:>7.0f}K {after_kb:>7.0f}K {saved:>7.0f}K  {action}")

        except Exception as e:
            print(f"  ERROR processing {img_path.name}: {e}")
            total_after += before_size

    # Summary
    print("\n" + "=" * 90)
    total_before_mb = total_before / (1024 * 1024)
    total_after_mb = total_after / (1024 * 1024)
    saved_mb = total_before_mb - total_after_mb
    pct = (saved_mb / total_before_mb) * 100 if total_before_mb > 0 else 0

    print(f"\nSUMMARY")
    print(f"  Images processed: {len(images)}")
    print(f"  Resized:          {resized_count}")
    print(f"  Converted to JPG: {converted_to_jpg}")
    print(f"  Before:           {total_before_mb:.1f} MB")
    print(f"  After:            {total_after_mb:.1f} MB")
    print(f"  Saved:            {saved_mb:.1f} MB ({pct:.0f}%)")
    print(f"\n  Backups at: {BACKUP_DIR}")


if __name__ == "__main__":
    compress_images()
