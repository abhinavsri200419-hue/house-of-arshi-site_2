"""
Generates assets/data/products.json — the full product catalog for House of Arshi v2.

Structure per product:
{
  id, name, price, mrp, tag,
  sizes: [...],
  about, material, delivery,
  images: [ {src: null, alt: "..."} x4 ]
}

Existing products (from the old flat catalog) are preserved and extended to
10 per subsection. New subsections get freshly generated placeholder products.
"""
import json

STANDARD_SIZES = ["S", "M", "L", "XL", "XXL"]
DEFAULT_DELIVERY = "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange."

def make_gallery(product_label):
    return [
        {"src": None, "alt": f"{product_label}, image {i+1}"} for i in range(4)
    ]

def make_product(id, name, price, mrp, material, about=None, tag=None, sizes=None):
    return {
        "id": id,
        "name": name,
        "price": price,
        "mrp": mrp,
        "tag": tag,
        "sizes": sizes or STANDARD_SIZES,
        "about": about or f"{name}, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
        "material": material,
        "delivery": DEFAULT_DELIVERY,
        "images": make_gallery(name)
    }

CATALOG = {}

# ---------------------------------------------------------------------------
# FUSION WEAR
# ---------------------------------------------------------------------------

CATALOG["short-kurtis"] = [
    make_product("sk1", "Marigold Mirror Work Short Kurti", 1299, 1899, "Pure cotton with mirror embroidery", tag="Bestseller"),
    make_product("sk2", "Ivory Chikankari Short Kurti", 1199, 1599, "Cotton with hand done chikankari embroidery", tag="New"),
    make_product("sk3", "Sunset Block Print Short Kurti", 999, 1499, "Hand block printed cotton"),
    make_product("sk4", "Maroon Bandhani Short Kurti", 1399, 1999, "Bandhani print on soft cotton", tag="Bestseller"),
    make_product("sk5", "Sage Embroidered Short Kurti", 1149, 1599, "Cotton blend with thread embroidery"),
    make_product("sk6", "Coral Floral Short Kurti", 1049, 1399, "Floral printed rayon", tag="New"),
    make_product("sk7", "Powder Blue Tassel Short Kurti", 1099, 1549, "Cotton with tassel detailing"),
    make_product("sk8", "Mustard Yellow A Line Short Kurti", 999, 1399, "Soft rayon blend"),
    make_product("sk9", "White Schiffli Short Kurti", 1249, 1699, "Schiffli embroidered cotton", tag="New"),
    make_product("sk10", "Dusty Pink Printed Short Kurti", 1029, 1449, "Lightweight printed cotton")
]

CATALOG["aline-kurtas"] = [
    make_product("ak1", "Classic Ivory A Line Kurta", 1399, 1899, "Pure cotton"),
    make_product("ak2", "Festive Gota Patti A Line Kurta", 1799, 2499, "Cotton silk with gota patti work", tag="Bestseller"),
    make_product("ak3", "Pastel Yellow A Line Kurta", 1249, 1699, "Soft cotton blend"),
    make_product("ak4", "Block Print A Line Kurta", 1099, 1499, "Hand block printed cotton", tag="New"),
    make_product("ak5", "Embroidered Rust A Line Kurta", 1599, 2199, "Cotton with thread embroidery"),
    make_product("ak6", "Chanderi Silk A Line Kurta", 2199, 2899, "Chanderi silk blend", tag="Premium"),
    make_product("ak7", "Sage Green Flared A Line Kurta", 1349, 1849, "Rayon blend"),
    make_product("ak8", "Maroon Festive A Line Kurta", 1699, 2299, "Cotton silk with zari border", tag="New"),
    make_product("ak9", "Powder Blue Printed A Line Kurta", 1199, 1649, "Lightweight cotton"),
    make_product("ak10", "Ivory Embroidered A Line Kurta", 1799, 2399, "Cotton with delicate embroidery", tag="Bestseller")
]

CATALOG["anarkali-sets"] = [
    make_product("an1", "Emerald Floral Anarkali Set", 2899, 3999, "Georgette with floral print", tag="Bestseller"),
    make_product("an2", "Rani Pink Anarkali with Dupatta", 3199, 4499, "Silk blend with dupatta", tag="New"),
    make_product("an3", "Mustard Printed Anarkali Set", 2499, 3499, "Printed rayon"),
    make_product("an4", "Navy Sequinned Anarkali Set", 3599, 4999, "Georgette with sequin work", tag="Premium"),
    make_product("an5", "Powder Blue Anarkali Set", 2799, 3899, "Soft georgette"),
    make_product("an6", "Maroon Velvet Anarkali Set", 3899, 5299, "Velvet with zari work", tag="Festive"),
    make_product("an7", "Peach Embroidered Anarkali Set", 3299, 4599, "Georgette with thread embroidery"),
    make_product("an8", "Wine Sequinned Anarkali Set", 3699, 5099, "Net with sequin embellishment", tag="New"),
    make_product("an9", "Sage Green Anarkali Set", 2999, 4199, "Cotton silk blend"),
    make_product("an10", "Royal Blue Festive Anarkali Set", 3499, 4799, "Silk with embroidered yoke", tag="Bestseller")
]

CATALOG["long-frocks"] = [
    make_product("lf1", "Ivory Tiered Maxi Frock", 1799, 2499, "Cotton blend", tag="New"),
    make_product("lf2", "Floral Wrap Maxi Dress", 1649, 2299, "Rayon with floral print", tag="Bestseller"),
    make_product("lf3", "Rust Puff Sleeve Long Frock", 1549, 2199, "Soft cotton"),
    make_product("lf4", "Sage Empire Waist Frock", 1699, 2399, "Rayon blend", tag="New"),
    make_product("lf5", "Printed A Line Maxi", 1499, 1999, "Lightweight rayon"),
    make_product("lf6", "Pleated Sunshine Yellow Frock", 1599, 2199, "Cotton blend", tag="Bestseller"),
    make_product("lf7", "Powder Pink Tiered Frock", 1749, 2399, "Georgette"),
    make_product("lf8", "Block Print Maxi Frock", 1599, 2199, "Hand block printed cotton", tag="New"),
    make_product("lf9", "Maroon Festive Maxi Frock", 1899, 2599, "Silk blend"),
    make_product("lf10", "Ivory Lace Trim Maxi Frock", 1849, 2549, "Cotton with lace detailing")
]

# ---------------------------------------------------------------------------
# INDO WESTERN
# ---------------------------------------------------------------------------

CATALOG["coord-sets"] = [
    make_product("cs1", "Printed Co-Ord Set", 1899, 2599, "Rayon blend", tag="New"),
    make_product("cs2", "Striped Shirt and Pant Co-Ord", 1799, 2499, "Cotton blend", tag="Bestseller"),
    make_product("cs3", "Floral Crop Top Co-Ord Set", 1699, 2299, "Soft cotton"),
    make_product("cs4", "Solid Blazer Co-Ord Set", 2399, 3299, "Cotton blend with structured blazer", tag="Premium"),
    make_product("cs5", "Tie Dye Co-Ord Set", 1599, 2199, "Rayon"),
    make_product("cs6", "Pastel Knit Co-Ord Set", 1899, 2599, "Knit fabric", tag="New"),
    make_product("cs7", "Checked Shirt Co-Ord Set", 1749, 2399, "Cotton"),
    make_product("cs8", "Linen Blend Co-Ord Set", 2099, 2899, "Linen blend", tag="Bestseller"),
    make_product("cs9", "Halter Top Co-Ord Set", 1649, 2249, "Rayon blend"),
    make_product("cs10", "Embroidered Co-Ord Set", 2199, 2999, "Cotton with embroidery detail", tag="New")
]

CATALOG["indo-tops"] = [
    make_product("tp1", "Ivory Tie Front Top", 899, 1299, "Rayon blend", tag="New"),
    make_product("tp2", "Sage Sleeveless Top", 799, 1099, "Cotton blend"),
    make_product("tp3", "Printed Wrap Top", 949, 1349, "Soft rayon", tag="Bestseller"),
    make_product("tp4", "Office Edit Collared Top", 1049, 1499, "Cotton blend"),
    make_product("tp5", "Rust Asymmetric Top", 999, 1399, "Rayon", tag="New"),
    make_product("tp6", "Beige Linen Blend Top", 899, 1199, "Linen blend"),
    make_product("tp7", "Black Cowl Neck Top", 999, 1399, "Crepe"),
    make_product("tp8", "Floral Puff Sleeve Top", 949, 1349, "Rayon blend", tag="New"),
    make_product("tp9", "Mustard Knot Detail Top", 1029, 1429, "Cotton blend"),
    make_product("tp10", "White Ruffle Sleeve Top", 1099, 1549, "Soft cotton", tag="Bestseller")
]

CATALOG["indo-frocks"] = [
    make_product("if1", "Belted Shirt Dress", 1799, 2499, "Cotton blend", tag="New"),
    make_product("if2", "Asymmetric Hem Dress", 1999, 2799, "Crepe", tag="Bestseller"),
    make_product("if3", "Printed Wrap Dress", 1699, 2299, "Rayon"),
    make_product("if4", "Denim Shirt Dress", 1899, 2599, "Denim"),
    make_product("if5", "Floral Tiered Dress", 1749, 2399, "Georgette", tag="New"),
    make_product("if6", "Solid A Line Dress", 1599, 2199, "Cotton blend"),
    make_product("if7", "Cape Sleeve Dress", 2099, 2899, "Crepe", tag="Premium"),
    make_product("if8", "Polka Dot Fit and Flare Dress", 1649, 2249, "Rayon blend"),
    make_product("if9", "Ruffled Hem Dress", 1899, 2599, "Georgette", tag="New"),
    make_product("if10", "Striped Shirt Dress", 1599, 2199, "Cotton")
]

CATALOG["office-wear"] = [
    make_product("ow1", "Tailored Collar Office Top", 1099, 1549, "Cotton blend", tag="New"),
    make_product("ow2", "Structured Pencil Dress", 1999, 2799, "Crepe", tag="Bestseller"),
    make_product("ow3", "Formal Shirt and Trouser Set", 2199, 2999, "Cotton blend"),
    make_product("ow4", "Minimal Wrap Top", 999, 1399, "Rayon"),
    make_product("ow5", "Tailored Sheath Dress", 2099, 2899, "Crepe blend", tag="New"),
    make_product("ow6", "Solid Boat Neck Top", 949, 1349, "Cotton blend"),
    make_product("ow7", "Formal Blazer Dress", 2499, 3399, "Structured crepe", tag="Premium"),
    make_product("ow8", "Pintuck Office Shirt", 1149, 1599, "Cotton"),
    make_product("ow9", "Straight Fit Midi Dress", 1899, 2599, "Crepe blend", tag="Bestseller"),
    make_product("ow10", "Collared Shift Dress", 1799, 2499, "Cotton blend")
]

# ---------------------------------------------------------------------------
# SAREES
# ---------------------------------------------------------------------------

CATALOG["sarees"] = [
    make_product("sr1", "Banarasi Silk Saree", 4299, 5999, "Banarasi silk", tag="Premium"),
    make_product("sr2", "Mysore Silk Saree with Blouse", 3699, 4999, "Mysore silk", tag="Bestseller"),
    make_product("sr3", "Chiffon Printed Saree", 1899, 2599, "Chiffon", tag="New"),
    make_product("sr4", "Kanjeevaram Inspired Saree", 4899, 6499, "Art silk", tag="Festive"),
    make_product("sr5", "Linen Handloom Saree", 2599, 3499, "Linen"),
    make_product("sr6", "Georgette Party Saree", 2199, 2999, "Georgette", tag="New"),
    make_product("sr7", "Cotton Handloom Saree", 2299, 3099, "Handloom cotton"),
    make_product("sr8", "Organza Floral Saree", 2799, 3799, "Organza", tag="Bestseller"),
    make_product("sr9", "Tussar Silk Saree", 3299, 4499, "Tussar silk"),
    make_product("sr10", "Net Embroidered Party Saree", 3199, 4399, "Net with embroidery", tag="New")
]

# ---------------------------------------------------------------------------
# FORMALS (subsections built now, section stays "Coming Soon" publicly)
# ---------------------------------------------------------------------------

CATALOG["suits"] = [
    make_product("su1", "Tailored Ivory Pant Suit", 3499, 4799, "Cotton blend", tag="Premium"),
    make_product("su2", "Charcoal Two Piece Suit", 3799, 5199, "Polyester viscose blend"),
    make_product("su3", "Beige Blazer Suit Set", 3299, 4499, "Cotton blend", tag="New"),
    make_product("su4", "Classic Black Formal Suit", 3999, 5499, "Polyester viscose blend"),
    make_product("su5", "Pinstripe Tailored Suit", 3699, 4999, "Cotton blend", tag="Bestseller"),
    make_product("su6", "Sand Trouser Suit Set", 3399, 4599, "Cotton blend"),
    make_product("su7", "Navy Formal Suit Set", 3899, 5299, "Polyester viscose blend", tag="New"),
    make_product("su8", "Grey Check Pant Suit", 3599, 4899, "Cotton blend"),
    make_product("su9", "Olive Tailored Suit Set", 3499, 4799, "Cotton blend", tag="Premium"),
    make_product("su10", "White Structured Pant Suit", 3799, 5199, "Cotton blend")
]

CATALOG["trousers"] = [
    make_product("tr1", "High Waist Formal Trousers", 1399, 1899, "Cotton blend", tag="Bestseller"),
    make_product("tr2", "Wide Leg Office Trousers", 1499, 1999, "Polyester viscose blend"),
    make_product("tr3", "Tapered Charcoal Trousers", 1349, 1799, "Cotton blend", tag="New"),
    make_product("tr4", "Pleated Beige Trousers", 1299, 1699, "Cotton blend"),
    make_product("tr5", "Straight Fit Navy Trousers", 1449, 1899, "Polyester viscose blend"),
    make_product("tr6", "Cigarette Fit Formal Trousers", 1399, 1799, "Cotton blend", tag="New"),
    make_product("tr7", "Olive Wide Leg Trousers", 1499, 1999, "Cotton blend"),
    make_product("tr8", "Grey Tapered Trousers", 1349, 1799, "Polyester viscose blend"),
    make_product("tr9", "Black Straight Fit Trousers", 1399, 1899, "Cotton blend", tag="Bestseller"),
    make_product("tr10", "Sand Pleated Trousers", 1299, 1699, "Cotton blend")
]

CATALOG["blazers"] = [
    make_product("bl1", "Structured Ivory Blazer", 2799, 3799, "Cotton blend", tag="Premium"),
    make_product("bl2", "Oversized Charcoal Blazer", 2999, 3999, "Polyester viscose blend", tag="New"),
    make_product("bl3", "Fitted Black Blazer", 2699, 3599, "Cotton blend", tag="Bestseller"),
    make_product("bl4", "Beige Double Breasted Blazer", 3099, 4199, "Cotton blend"),
    make_product("bl5", "Pinstripe Tailored Blazer", 2899, 3899, "Cotton blend"),
    make_product("bl6", "Cropped Formal Blazer", 2599, 3499, "Polyester viscose blend", tag="New"),
    make_product("bl7", "Olive Structured Blazer", 2899, 3899, "Cotton blend"),
    make_product("bl8", "Navy Double Breasted Blazer", 3199, 4299, "Cotton blend", tag="Premium"),
    make_product("bl9", "Grey Check Blazer", 2999, 3999, "Cotton blend"),
    make_product("bl10", "White Tailored Blazer", 2799, 3799, "Cotton blend", tag="Bestseller")
]

# ---------------------------------------------------------------------------
# Write output
# ---------------------------------------------------------------------------

# ---------------------------------------------------------------------------
# Write output directly as a loadable JS data file (no intermediate JSON,
# this avoids file:// fetch/CORS issues and keeps one single source of truth)
# ---------------------------------------------------------------------------

with open('/home/claude/hoa2/assets/data/products.data.js', 'w') as f:
    f.write('// Product catalog for House of Arshi.\n')
    f.write('// To add a real photo: find the product below, then inside its "images"\n')
    f.write('// array change "src": null to "src": "img/products/yourfile.jpg"\n')
    f.write('// See docs/IMAGE_GUIDE.md for the full picture-by-picture map.\n')
    f.write('const PRODUCTS = ')
    f.write(json.dumps(CATALOG, indent=2))
    f.write(';\n')

total = sum(len(v) for v in CATALOG.values())
print(f"Generated {len(CATALOG)} subsections, {total} total products")
for k, v in CATALOG.items():
    print(f"  {k}: {len(v)} products")
