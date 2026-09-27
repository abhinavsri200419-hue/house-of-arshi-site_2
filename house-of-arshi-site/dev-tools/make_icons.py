"""
Makes the site icons from the logo mark (assets/mark-black.png):
  - favicon.ico           the small icon in browser tabs and bookmarks
  - apple-touch-icon.png  the icon a phone shows when someone adds the
                          site to their home screen

Run it from the house-of-arshi-site folder only if the logo changes:

    pip install pillow        (only needed once)
    python3 dev-tools/make_icons.py
"""
import sys
from pathlib import Path

try:
    from PIL import Image
except ImportError:
    sys.exit('This script needs Pillow. Install it with:  pip install pillow')

ROOT = Path(__file__).resolve().parent.parent
MARK = ROOT / 'assets' / 'mark-black.png'
BACKGROUND = '#161310'   # brand black
MARK_COLOUR = '#D8B883'  # brand light gold


def icon(mark, size, padding):
    """The mark in gold, centred on a black square. Drawn 4x larger, then scaled down for smooth edges."""
    big = size * 4
    canvas = Image.new('RGBA', (big, big), BACKGROUND)
    m = mark.copy()
    inner = round(big * (1 - 2 * padding))
    m.thumbnail((inner, inner), Image.LANCZOS)
    gold = Image.new('RGBA', m.size, MARK_COLOUR)
    gold.putalpha(m.getchannel('A'))
    canvas.alpha_composite(gold, ((big - m.width) // 2, (big - m.height) // 2))
    return canvas.resize((size, size), Image.LANCZOS)


def main():
    mark = Image.open(MARK).convert('RGBA')
    mark = mark.crop(mark.getchannel('A').getbbox())

    sizes = [(16, 0.06), (32, 0.08), (48, 0.10)]
    icons = [icon(mark, s, pad).convert('RGB') for s, pad in sizes]
    icons[-1].save(ROOT / 'favicon.ico', format='ICO', sizes=[(s, s) for s, _ in sizes],
                   append_images=icons[:-1])
    icon(mark, 180, 0.16).convert('RGB').save(ROOT / 'apple-touch-icon.png', optimize=True)
    print('Wrote favicon.ico and apple-touch-icon.png')


if __name__ == '__main__':
    main()
