"""
Generates the section hub pages: Fusion Wear and Indo Western.
Each shows 4 subsection tile cards (image + name + Shop Now), linking to
that subsection's dedicated product page.
"""
import json
import partials

with open('assets/data/site-structure.data.js') as f:
    content = f.read()
    structure = json.loads(content.split('const SITE_STRUCTURE = ', 1)[1].rstrip(';\n'))

# Maps subsection key -> images.data.js card key, for editable tile images
CARD_IMAGE_KEY = {
    "short-kurtis": ("fusion_wear", "card_short_kurtis"),
    "kurtas": ("fusion_wear", "card_kurtas"),
    "anarkali-sets": ("fusion_wear", "card_anarkali_sets"),
    "long-frocks": ("fusion_wear", "card_long_frocks"),
    "tops": ("fusion_wear", "card_tops"),
    "nightwear": ("fusion_wear", "card_nightwear"),
    "suits": ("formals", "card_suits"),
    "trousers": ("formals", "card_trousers"),
    "blazers": ("formals", "card_blazers"),
}

HUB_TEMPLATE = """{head}
{navbar}
{marquee}

<main id="main">
<div class="page-header has-bg-img theme-{theme}">
  <div class="page-header-pattern">
    <img class="motif-1" src="../assets/mark-white.png" alt="" style="object-fit:contain;">
    <img class="motif-2" src="../assets/mark-white.png" alt="" style="object-fit:contain;">
  </div>
  <div class="page-header-content container">
    <div class="breadcrumb"><a href="../index.html">Home</a> / <span style="color:var(--ivory);">{title}</span></div>
    <span class="eyebrow">{eyebrow}</span>
    <h1 style="margin:14px 0 16px;">{title}</h1>
    <p style="max-width:560px; margin:0 auto;">{desc}</p>
  </div>
</div>

<section class="section tight">
  <div class="container">
    <div class="section-title center">
      <span class="eyebrow">Shop By Style</span>
      <h2>Explore {title}</h2>
    </div>
    <div class="showcase-strip">
      {tiles}
    </div>
  </div>
</section>
</main>

{footer}
{toast}
{drawers}

{scripts}
</body>
</html>
"""

TILE_TEMPLATE = """
      <a href="{page}" class="showcase-tile">
        <div id="tile-{key}" style="position:absolute; inset:0;"></div>
        <div class="showcase-label" style="z-index:3;">
          <div class="stitle">{title}</div>
          <div class="sarrow">Shop Now →</div>
        </div>
      </a>"""

THEME_MAP = {"fusion-wear": "fusion", "formals": "formal"}

HUB_FILES = {
    "fusion-wear": "fusion-wear.html",
    "formals": "formals.html",
}

generated = []
for sec_key, filename in HUB_FILES.items():
    sec = structure['sections'][sec_key]
    theme = THEME_MAP[sec_key]

    tiles_html = ""
    tile_init_scripts = []
    for sub in sec['subsections']:
        tiles_html += TILE_TEMPLATE.format(
            page=sub['page'],
            key=sub['key'],
            title=sub['title']
        )
        img_section, img_key = CARD_IMAGE_KEY[sub['key']]
        tile_init_scripts.append(
            f"document.getElementById('tile-{sub['key']}').innerHTML = sectionImageHTML('{img_section}', '{img_key}', {(len(tile_init_scripts) % 6) + 1}, 'large', {{ sizes: '(max-width: 980px) 50vw, 25vw' }});"
        )

    html = HUB_TEMPLATE.format(
        head=partials.head(f"{sec['title']} | House of Arshi"),
        navbar=partials.navbar(),
        marquee=partials.marquee(),
        footer=partials.footer(),
        toast=partials.toast(),
        drawers=partials.drawers(pages_prefix=""),
        scripts=partials.scripts(),
        theme=theme,
        title=sec['title'],
        eyebrow=sec['title'],
        desc=sec['desc'],
        tiles=tiles_html
    )

    # Insert the tile image rendering script right before </body>
    init_script = "\n<script>\n  " + "\n  ".join(tile_init_scripts) + "\n</script>\n"
    html = html.replace("</body>", init_script + "</body>")

    out_path = f"pages/{filename}"
    with open(out_path, 'w') as f:
        f.write(html)
    generated.append(out_path)

print(f"Generated {len(generated)} hub pages:")
for p in generated:
    print(f"  {p}")
