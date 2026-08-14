# House of Arshi, Developer & Editing Guide

This guide explains how to maintain and update the site: swapping images,
adding products, editing the About page, and understanding how everything
is wired together.

----------------------------------------------------------------------
## How This Site Is Built
----------------------------------------------------------------------

This is a plain HTML, CSS, and JavaScript site, no build tools, no server,
no installation required. You can open `index.html` directly in a browser,
or host the whole folder on Vercel (or any static host) with zero changes.

All editable content lives in three files inside `assets/data/`:

| File | What it controls |
|---|---|
| `products.data.js` | Every product: name, price, sizes, description, images |
| `images.data.js` | Every homepage/banner/hero image across the site |
| `site-structure.data.js` | Navigation, section titles, and descriptions |

You will spend almost all of your editing time in the first two files.

----------------------------------------------------------------------
## PART 1: Adding Product Photos
----------------------------------------------------------------------

Open `assets/data/products.data.js`. Every product looks like this:

```js
{
  "id": "sk1",
  "name": "Marigold Mirror Work Short Kurti",
  "price": 1299,
  "mrp": 1899,
  "tag": "Bestseller",
  "sizes": ["S", "M", "L", "XL", "XXL"],
  "about": "...",
  "material": "Pure cotton with mirror embroidery",
  "delivery": "...",
  "images": [
    { "src": null, "alt": "Marigold Mirror Work Short Kurti, image 1" },
    { "src": null, "alt": "Marigold Mirror Work Short Kurti, image 2" },
    { "src": null, "alt": "Marigold Mirror Work Short Kurti, image 3" },
    { "src": null, "alt": "Marigold Mirror Work Short Kurti, image 4" }
  ]
}
```

### To add real photos for this product:

1. Put your 4 photos somewhere inside `assets/img/products/`. Suggested
   naming: `sk1-1.jpg`, `sk1-2.jpg`, `sk1-3.jpg`, `sk1-4.jpg` (product id,
   then image number).
2. Change each `"src": null` to the path of your photo:

```js
"images": [
  { "src": "products/sk1-1.jpg", "alt": "Marigold Mirror Work Short Kurti, front" },
  { "src": "products/sk1-2.jpg", "alt": "Marigold Mirror Work Short Kurti, back" },
  { "src": "products/sk1-3.jpg", "alt": "Marigold Mirror Work Short Kurti, side" },
  { "src": "products/sk1-4.jpg", "alt": "Marigold Mirror Work Short Kurti, detail" }
]
```

3. Save the file, refresh the page. That product's grid thumbnail AND its
   modal gallery will now show your real photos. The first image in the
   array is what shows on the product grid card; all 4 show in the
   gallery when someone clicks the product.

You can update products one at a time. Any product still set to `null`
keeps showing its designed placeholder, nothing breaks.

### Full list of product IDs by subsection

| Subsection | IDs |
|---|---|
| Short Kurtis | sk1 to sk10 |
| A-Line Kurtas | ak1 to ak10 |
| Anarkali Suit Sets | an1 to an10 |
| Long Frocks | lf1 to lf10 |
| Co-Ord Sets | cs1 to cs10 |
| Tops (Indo Western) | tp1 to tp10 |
| Frocks (Indo Western) | if1 to if10 |
| Office Wear | ow1 to ow10 |
| Sarees | sr1 to sr10 |
| Suits | su1 to su10 |
| Trousers | tr1 to tr10 |
| Blazers | bl1 to bl10 |

Recommended photo size: 900x1200px (3:4 ratio), JPG, under 500KB each.

----------------------------------------------------------------------
## PART 2: Adding a New Product
----------------------------------------------------------------------

To add an 11th product to any subsection, open `products.data.js`, find
that subsection's array, and add a new entry following the same shape as
the others. Give it a unique `id` that does not clash with existing ones
(e.g. `sk11` for an 11th Short Kurti). No other file needs to change,
the product will automatically appear in that subsection's grid.

----------------------------------------------------------------------
## PART 3: Editing Product Details
----------------------------------------------------------------------

Inside the same product entry in `products.data.js`, you can directly edit:

- `name`, `price`, `mrp` (the struck-through original price)
- `tag` (shows as a small badge, e.g. "New", "Bestseller". Set to `null`
  for no badge)
- `sizes` (the array of size options shown in the product modal)
- `about` (the "About The Product" text in the modal)
- `material` (the "Material" text in the modal)
- `delivery` (the "Delivery" text in the modal)

----------------------------------------------------------------------
## PART 4: Swapping Homepage and Banner Images
----------------------------------------------------------------------

Open `assets/data/images.data.js`. This file is organized by page section.
Every entry looks like:

```js
"hero_slide_1": { "src": null, "alt": "Hero slide 1, House of Arshi" }
```

Change `"src": null` to a path written relative to the `assets/img/`
folder, e.g. `"src": "sections/hero-1.jpg"` for a file saved at
`assets/img/sections/hero-1.jpg`, and save. That image will appear
wherever it is used on the site, you do not need to add `assets/img/`
or `../` yourself, the site works that out automatically.

### Full map of editable image slots

**Homepage**
- `hero_slide_1`, `hero_slide_2`, `hero_slide_3`, the rotating hero banner
- `formals_teaser_banner`, background behind the Formals teaser block
- `about_teaser_image`, the small photo in the About preview section
- `newsletter_popup_image`, the photo in the signup popup

**Fusion Wear**
- `hub_banner`, background on the Fusion Wear hub page
- `card_short_kurtis`, `card_aline_kurtas`, `card_anarkali_sets`,
  `card_long_frocks`, the 4 tile images shown on the homepage and hub page
- `page_banner_short_kurtis`, `page_banner_aline_kurtas`,
  `page_banner_anarkali_sets`, `page_banner_long_frocks`, background on
  each subsection's own page

**Indo Western**
- `hub_banner`
- `card_coord_sets`, `card_indo_tops`, `card_indo_frocks`, `card_office_wear`
- `page_banner_coord_sets`, `page_banner_indo_tops`,
  `page_banner_indo_frocks`, `page_banner_office_wear`

**Sarees**
- `homepage_banner`, the "Sarees Reimagined" banner on the homepage
- `page_banner`, background on the Sarees page

**Formals**
- `teaser_banner`, the dark Coming Soon page background
- `page_banner_suits`, `page_banner_trousers`, `page_banner_blazers`,
  ready for when Formals goes live

**About**
- `hero_banner`, the full-bleed photo at the top of the About page
- `who_we_are_image`, `our_beginning_image`, `motive_image`, the 3 story
  photos further down the page

Put your image files in `assets/img/sections/` to keep things organized,
though any path inside `assets/` will work.

----------------------------------------------------------------------
## PART 5: Editing About Us Content
----------------------------------------------------------------------

The About page text is NOT in a data file, it is written directly into
`pages/about.html` since it is long-form prose, not a repeatable list.
Open that file in a text editor and look for sections marked `[Filler]`,
those are the placeholders the client should replace with real copy:

- "Who We Are" section, your founding story
- "Our Beginning" section, founding year and backstory
- "Our Motive and Inspiration" section, your mission

Just edit the text between the `<p>` and `</p>` tags. Do not remove the
tags themselves.

----------------------------------------------------------------------
## PART 6: Understanding the Navigation
----------------------------------------------------------------------

The navbar shows: Fusion Wear, Indo Western, Sarees, Formals. This is
hardcoded into each page's navbar for simplicity, if you want to change
nav labels or add a new top-level section, you would need to update the
navbar markup across all pages (ask for help with this if needed, since
it touches many files at once).

----------------------------------------------------------------------
## PART 7: The Formals Section, Why It Looks Different
----------------------------------------------------------------------

Formals currently shows a "Coming Soon" teaser page when clicked from the
navbar. However, the full Suits, Trousers, and Blazers pages already exist
and work (`pages/suits.html`, `pages/trousers.html`, `pages/blazers.html`),
complete with 10 products each and the full shopping experience.

When you are ready to launch Formals, the simplest approach is to replace
the navbar's Formals link (currently pointing to
`coming-soon-formals.html`) with a new Formals hub page that shows tiles
for Suits, Trousers, and Blazers, the same way Fusion Wear and Indo Western
work today. Ask for help building that hub page when you are ready to flip
this section live.

----------------------------------------------------------------------
## PART 8: Cart and Wishlist, How They Work
----------------------------------------------------------------------

The cart and wishlist are temporary and reset when the page is refreshed
or closed. This is expected for a preview site, there is no backend
database yet. When real checkout/accounts are needed, this is the part
that would connect to a payment provider and a database.

Clicking a product anywhere on the site opens a popup with a photo
gallery, size selection, and Add to Cart / Buy Now buttons. A size must
be selected before either button will work, the person will see a small
warning message if they try without picking one.

----------------------------------------------------------------------
## Folder Structure Reference
----------------------------------------------------------------------

```
index.html                    <- homepage
pages/
  fusion-wear.html             <- Fusion Wear hub (4 tiles)
  indo-western.html            <- Indo Western hub (4 tiles)
  short-kurtis.html             <- subsection page (10 products)
  aline-kurtas.html
  anarkali-sets.html
  long-frocks.html
  coord-sets.html
  indo-tops.html
  indo-frocks.html
  office-wear.html
  sarees.html                   <- standalone, no hub needed
  suits.html                    <- built, not yet linked from nav
  trousers.html
  blazers.html
  coming-soon-formals.html      <- public Formals teaser
  about.html
  cart.html
  wishlist.html
assets/
  style.css
  app.js                        <- cart, wishlist, search logic
  modal.js                      <- product detail popup logic
  mark-black.png, mark-white.png  <- logo mark, two color variants
  data/
    products.data.js            <- EDIT THIS for product info and photos
    images.data.js               <- EDIT THIS for section/banner photos
    site-structure.data.js       <- navigation and section descriptions
  img/
    products/                    <- put product photos here
    sections/                    <- put banner/hero photos here
```

----------------------------------------------------------------------
## Troubleshooting: Broken Image Icon Instead Of Your Photo
----------------------------------------------------------------------

If you see a small broken image icon with text spilling out next to it
(instead of either your photo or the designed placeholder), this means
the path you typed does not point to a real file. The fix is almost
always the path format.

**Always write paths starting from inside `assets/img/`, nothing before it:**

Correct, write the path starting right after `img/`:
```js
"src": "products/sk1-1.jpg"
"src": "sections/hero-1.jpg"
```

Incorrect, do not include `assets/` or `img/` yourself, and do not add `../`:
```js
"src": "assets/img/sections/hero-1.jpg"   // has assets/img/ already, remove it
"src": "../assets/img/sections/hero-1.jpg" // has ../ already, remove it
```

To be extra clear: your photo's real location on disk should be
`assets/img/sections/hero-1.jpg`. The text you type in `"src"` should be
everything AFTER `assets/img/`, which is just `sections/hero-1.jpg`. You
do not need to write `assets/img/` yourself, and you do not need to add
`../` even on subsection pages, the site figures out the right prefix
for you automatically based on which page is showing the image.

**Safety net:** if you forget to include `sections/` or `products/` and
just type a bare filename (like `"src": "hero-1.jpg"`), the site will
automatically look in both folders for you. This means a typo like that
will still work, just very slightly slower on first load since it tries
one folder, then the other. It is still better to write the folder
explicitly when you can, both for speed and so the path is clear to
read later, but this safety net means a forgotten folder name will not
break the image anymore.

If it is still broken after checking the path format, double check:
- The filename matches exactly, including capitalization and the file
  extension (`.jpg` vs `.jpeg` vs `.png` are not interchangeable)
- The file actually saved into `assets/img/products/` or
  `assets/img/sections/`, and not into `assets/` directly or some other
  folder
- There are no extra spaces typed into the path by accident

----------------------------------------------------------------------
## Need Help?
----------------------------------------------------------------------

If an edit causes something to look broken (a page goes blank, an image
looks stretched), the most common cause is a typo in `products.data.js`
or `images.data.js` that breaks the file's structure, like a missing
comma or quotation mark. If this happens, undo your last change and try
again more carefully, or share the file for a check.
