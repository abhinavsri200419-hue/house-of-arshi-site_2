"""
Generates every subsection page (Short Kurtis, A-Line Kurtas, Co-Ord Sets,
Tops, Frocks, Office Wear, Suits, Trousers, Blazers) plus the standalone
Sarees page. Each shows 10 products in a grid; clicking a product opens
the shared product modal.
"""
import json
import partials

with open('assets/data/site-structure.data.js') as f:
    content = f.read()
    structure = json.loads(content.split('const SITE_STRUCTURE = ', 1)[1].rstrip(';\n'))

SUBSECTION_PAGE_TEMPLATE = """{head}
{navbar}
{marquee}

<main id="main">
<div class="page-header has-bg-img theme-{theme}">
  <div class="page-header-pattern">
    <img class="motif-1" src="../assets/mark-white.png" alt="" style="object-fit:contain;">
    <img class="motif-2" src="../assets/mark-white.png" alt="" style="object-fit:contain;">
  </div>
  <div class="page-header-content container">
    <div class="breadcrumb">
      <a href="../index.html">Home</a> / {breadcrumb_parent} <span style="color:var(--ivory);">{title}</span>
    </div>
    <span class="eyebrow">{eyebrow}</span>
    <h1 style="margin:14px 0 16px;">{title}</h1>
    <p style="max-width:560px; margin:0 auto;">{desc}</p>
  </div>
</div>

<section class="section tight">
  <div class="container">
    <div class="filter-bar">
      <div class="filter-chips">
        <button type="button" class="filter-chip active" aria-pressed="true">All</button>
        <button type="button" class="filter-chip" aria-pressed="false">Bestseller</button>
        <button type="button" class="filter-chip" aria-pressed="false">New</button>
        <button type="button" class="filter-chip" aria-pressed="false">Under ₹1,500</button>
      </div>
      <span class="result-count" id="resultCount"></span>
    </div>

    <div class="product-grid" id="productGrid"></div>
  </div>
</section>
</main>

{footer}
{toast}
{drawers}
{modal}

{scripts}
<script>
  function renderSubsectionGrid() {{
    const container = document.getElementById('productGrid');
    const items = PRODUCTS['{key}'];
    container.innerHTML = items.map((p, i) => productCardHTML(p, i)).join('');
    document.getElementById('resultCount').textContent = `${{items.length}} items`;
  }}
  renderSubsectionGrid();

  document.querySelectorAll('.filter-chip').forEach(chip => {{
    chip.addEventListener('click', () => {{
      document.querySelectorAll('.filter-chip').forEach(c => {{ c.classList.remove('active'); c.setAttribute('aria-pressed', 'false'); }});
      chip.classList.add('active');
      chip.setAttribute('aria-pressed', 'true');
      const label = chip.textContent.trim();
      const cards = document.querySelectorAll('#productGrid .product-card');
      let visible = 0;
      cards.forEach(card => {{
        let show = true;
        if (label === 'Bestseller' || label === 'New') {{
          const tag = card.querySelector('.product-tag');
          show = tag && tag.textContent.trim() === label;
        }} else if (label === 'Under ₹1,500') {{
          const priceText = card.querySelector('.pprice').childNodes[0].textContent;
          const price = parseInt(priceText.replace(/[^0-9]/g, ''));
          show = price < 1500;
        }}
        card.style.display = show ? '' : 'none';
        if (show) visible++;
      }});
      document.getElementById('resultCount').textContent = `${{visible}} item${{visible !== 1 ? 's' : ''}}`;
    }});
  }});
</script>
</body>
</html>
"""

# Maps subsection key -> (page filename, theme name for header background)
PAGE_FILENAME = {
    "short-kurtis": "short-kurtis.html",
    "kurtas": "kurtas.html",
    "anarkali-sets": "anarkali-sets.html",
    "long-frocks": "long-frocks.html",
    "tops": "tops.html",
    "nightwear": "nightwear.html",
    "suits": "suits.html",
    "trousers": "trousers.html",
    "blazers": "blazers.html",
}

THEME_BY_SECTION = {
    "fusion-wear": "fusion",
    "indo-western": "indo",
    "formals": "formal",
}

def find_subsection_meta(key):
    """Returns (section_name, section_obj, subsection_obj) for a given subsection key."""
    for sec_name, sec in structure['sections'].items():
        for sub in sec.get('subsections', []):
            if sub['key'] == key:
                return sec_name, sec, sub
    return None, None, None

generated = []
for key, filename in PAGE_FILENAME.items():
    sec_name, sec, sub = find_subsection_meta(key)
    if not sec:
        print(f"WARNING: no structure entry found for {key}, skipping")
        continue

    theme = THEME_BY_SECTION.get(sec_name, "fusion")
    breadcrumb_parent = f'<a href="{sec["hub_page"]}">{sec["title"]}</a> /'

    html = SUBSECTION_PAGE_TEMPLATE.format(
        head=partials.head(f"{sub['title']} | House of Arshi"),
        navbar=partials.navbar(),
        marquee=partials.marquee(),
        footer=partials.footer(),
        toast=partials.toast(),
        drawers=partials.drawers(pages_prefix=""),
        modal=partials.product_modal(),
        scripts=partials.scripts(),
        theme=theme,
        breadcrumb_parent=breadcrumb_parent,
        title=sub['title'],
        eyebrow=sec['title'],
        desc=sub['desc'],
        key=key
    )

    out_path = f"pages/{filename}"
    with open(out_path, 'w') as f:
        f.write(html)
    generated.append(out_path)

# ---------------------------------------------------------------------------
# Sarees page (standalone, no subsection wrapper)
# ---------------------------------------------------------------------------

# ---------------------------------------------------------------------------
# Standalone product pages (no subsection wrapper): sarees, indo-western,
# semi-formals -- any section with a product_key and no subsections.
# ---------------------------------------------------------------------------

STANDALONE_THEME = {"sarees": "saree", "indo-western": "indo", "semi-formals": "formal"}

for sec_key, sec in structure['sections'].items():
    if not sec.get('product_key') or sec.get('subsections'):
        continue
    html = SUBSECTION_PAGE_TEMPLATE.format(
        head=partials.head(f"{sec['title']} | House of Arshi"),
        navbar=partials.navbar(),
        marquee=partials.marquee(),
        footer=partials.footer(),
        toast=partials.toast(),
        drawers=partials.drawers(pages_prefix=""),
        modal=partials.product_modal(),
        scripts=partials.scripts(),
        theme=STANDALONE_THEME.get(sec_key, "fusion"),
        breadcrumb_parent="",
        title=sec['title'],
        eyebrow=sec['title'],
        desc=sec['desc'],
        key=sec['product_key']
    )
    out_path = f"pages/{sec['hub_page']}"
    with open(out_path, 'w') as f:
        f.write(html)
    generated.append(out_path)

print(f"Generated {len(generated)} subsection pages:")
for p in generated:
    print(f"  {p}")
