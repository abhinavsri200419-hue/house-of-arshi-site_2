"""
Makes phone-friendly copies of every photo in assets/img/ and lists them in
assets/data/image-variants.data.js, which the site picks up automatically.

For each photo it writes, into assets/img/optimized/:
  - WebP files in several widths (phones download the small ones)
  - one JPEG for the rare browser without WebP support
  - for hero banners with a "mobile_focus" value in images.data.js, a
    portrait crop that phones show instead of the wide banner

It also updates the "hero-preload" lines near the top of index.html, which let
phones start downloading the first hero banner straight away.

Run it from the house-of-arshi-site folder whenever you add or replace a photo:

    pip install pillow        (only needed once)
    python3 dev-tools/optimize_images.py

A photo that hasn't been optimised yet still works; it is just shown at
full size (slower on phones). File names include a fingerprint of the photo,
so replacing a photo and re-running this script always shows the new one.
"""
import hashlib
import json
import sys
from pathlib import Path

try:
    from PIL import Image, ImageOps
except ImportError:
    sys.exit('This script needs Pillow. Install it with:  pip install pillow')

ROOT = Path(__file__).resolve().parent.parent
IMG_DIR = ROOT / 'assets' / 'img'
OUT_DIR = IMG_DIR / 'optimized'
MANIFEST = ROOT / 'assets' / 'data' / 'image-variants.data.js'
IMAGES_DATA = ROOT / 'assets' / 'data' / 'images.data.js'
HOME_PAGE = ROOT / 'index.html'
PRELOAD_START = '<!-- hero-preload:start'
PRELOAD_END = '<!-- hero-preload:end -->'

WIDTHS = [480, 800, 1200, 1600, 1920]  # widths offered to the browser
FALLBACK_MAX = 1200                    # largest width of the JPEG fallback
MOBILE_ASPECT = 0.62                   # phone hero crop: width / height
MOBILE_WIDTHS = [480, 720, 1080]
WEBP_QUALITY = 78
JPEG_QUALITY = 80
SOURCE_TYPES = {'.jpg', '.jpeg', '.png', '.webp'}


def load_js_object(path, name):
    """Reads the JSON object assigned to `const <name> = {...};` in a data file."""
    text = path.read_text(encoding='utf-8')
    start = text.index('{', text.index(f'const {name}'))
    end = text.rindex('}') + 1
    return json.loads(text[start:end])


def mobile_focus_by_image():
    """Maps an image path to its "mobile_focus" (0 = left edge, 1 = right edge)."""
    focus = {}
    try:
        data = load_js_object(IMAGES_DATA, 'IMAGES')
    except (OSError, ValueError) as err:
        print(f'Note: could not read mobile_focus values from images.data.js ({err})')
        return focus
    for section in data.values():
        if not isinstance(section, dict):
            continue
        for entry in section.values():
            if isinstance(entry, dict) and entry.get('src') and entry.get('mobile_focus') is not None:
                focus[entry['src']] = min(max(float(entry['mobile_focus']), 0.0), 1.0)
    return focus


def update_hero_preload(manifest):
    """Writes <link rel="preload"> tags for the first hero banner into index.html,
    so phones start downloading it before the page's scripts have run."""
    try:
        html = HOME_PAGE.read_text(encoding='utf-8')
        start = html.index('\n', html.index(PRELOAD_START)) + 1
        end = html.index(PRELOAD_END, start)
    except (OSError, ValueError):
        print('Note: no hero-preload markers in index.html, so no preload tags were written')
        return
    try:
        entry = manifest.get(load_js_object(IMAGES_DATA, 'IMAGES')['homepage']['hero_slide_1']['src'])
    except (OSError, ValueError, KeyError, TypeError):
        entry = None

    def link(variant, media=''):
        srcset = ', '.join(f'assets/img/{variant["base"]}-{w}.webp {w}w' for w in variant['widths'])
        return (f'<link rel="preload" as="image" type="image/webp"{media} '
                f'imagesrcset="{srcset}" imagesizes="100vw" fetchpriority="high">\n')

    # Must match what responsiveImageHTML() in assets/app.js builds for the slide
    tags = ''
    if entry and entry.get('mobile'):
        tags = link(entry['mobile'], ' media="(max-width: 720px)"') + link(entry, ' media="(min-width: 721px)"')
    elif entry:
        tags = link(entry)
    if html[start:end] != tags:
        HOME_PAGE.write_text(html[:start] + tags + html[end:], encoding='utf-8')
        print(f'Updated the hero banner preload in {HOME_PAGE.name}')


def widths_for(native, candidates):
    """Candidate widths smaller than the photo, plus the photo's own width."""
    widths = [w for w in candidates if w < native]
    if native <= candidates[-1]:
        widths.append(native)
    return sorted(set(widths)) or [native]


def resized(img, width):
    if img.width == width:
        return img
    return img.resize((width, round(img.height * width / img.width)), Image.LANCZOS)


def save(img, path, fmt, icc):
    extra = {'icc_profile': icc} if icc else {}
    if fmt == 'webp':
        img.save(path, 'WEBP', quality=WEBP_QUALITY, method=6, **extra)
    elif fmt == 'png':
        img.save(path, 'PNG', optimize=True, **extra)
    else:
        img.convert('RGB').save(path, 'JPEG', quality=JPEG_QUALITY, optimize=True, progressive=True, **extra)


def main():
    focus = mobile_focus_by_image()
    manifest = {}
    keep = set()
    created = 0

    def write(img, path, fmt, icc):
        nonlocal created
        keep.add(path)
        if not path.exists():
            save(img, path, fmt, icc)
            created += 1

    for src in sorted(IMG_DIR.rglob('*')):
        if src.suffix.lower() not in SOURCE_TYPES or OUT_DIR in src.parents:
            continue
        rel = src.relative_to(IMG_DIR).as_posix()               # sections/Slide1hero.png
        digest = hashlib.sha1(src.read_bytes()).hexdigest()[:8]
        stem = f'{Path(rel).with_suffix("").as_posix()}-{digest}'  # sections/Slide1hero-1a2b3c4d
        (OUT_DIR / stem).parent.mkdir(parents=True, exist_ok=True)

        with Image.open(src) as opened:
            icc = opened.info.get('icc_profile')
            img = ImageOps.exif_transpose(opened)
            alpha = img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info)
            img = img.convert('RGBA' if alpha else 'RGB')

        widths = widths_for(img.width, WIDTHS)
        for w in widths:
            write(resized(img, w), OUT_DIR / f'{stem}-{w}.webp', 'webp', icc)
        fallback_w = max([w for w in widths if w <= FALLBACK_MAX] or [widths[0]])
        fallback_ext = 'png' if alpha else 'jpg'
        fallback = f'optimized/{stem}-{fallback_w}.{fallback_ext}'
        write(resized(img, fallback_w), IMG_DIR / fallback, fallback_ext, icc)

        entry = {'w': img.width, 'h': img.height, 'base': f'optimized/{stem}',
                 'widths': widths, 'fallback': fallback}

        if rel in focus:
            crop_w = min(img.width, round(img.height * MOBILE_ASPECT))
            centre = focus[rel] * img.width
            left = round(min(max(centre - crop_w / 2, 0), img.width - crop_w))
            crop = img.crop((left, 0, left + crop_w, img.height))
            mobile_stem = f'{stem}-m{round(focus[rel] * 100)}'
            mobile_widths = widths_for(crop_w, MOBILE_WIDTHS)
            for w in mobile_widths:
                write(resized(crop, w), OUT_DIR / f'{mobile_stem}-{w}.webp', 'webp', icc)
            entry['mobile'] = {'w': crop_w, 'h': img.height, 'base': f'optimized/{mobile_stem}',
                               'widths': mobile_widths}

        manifest[rel] = entry

    # Remove copies of photos that were replaced or deleted
    removed = 0
    for f in sorted(OUT_DIR.rglob('*'), reverse=True):
        if f.is_file() and f not in keep:
            f.unlink()
            removed += 1
        elif f.is_dir() and not any(f.iterdir()):
            f.rmdir()

    MANIFEST.write_text(
        '// AUTO-GENERATED by dev-tools/optimize_images.py -- do not edit by hand.\n'
        '// Lists the optimised copies of the photos in assets/img/; the site uses\n'
        '// them automatically. Re-run the script after adding or replacing photos.\n'
        'const IMAGE_VARIANTS = ' + json.dumps(manifest, indent=2) + ';\n',
        encoding='utf-8')
    update_hero_preload(manifest)

    total = sum(f.stat().st_size for f in OUT_DIR.rglob('*') if f.is_file())
    print(f'{len(manifest)} photos optimised: {created} files written, {removed} old files removed, '
          f'{total / 1e6:.1f} MB in assets/img/optimized/')
    print(f'Updated {MANIFEST.relative_to(ROOT)}')


if __name__ == '__main__':
    main()
