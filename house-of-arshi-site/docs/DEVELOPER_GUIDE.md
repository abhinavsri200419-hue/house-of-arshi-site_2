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
4. Make the photos fast on phones (see PART 9): from the
   `house-of-arshi-site` folder run

   ```
   python3 dev-tools/optimize_images.py
   ```

   and commit the new files it creates. Skipping this step doesn't break
   anything, but phones then download the full-size photo.

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

Recommended photo size: at least 1200x1600px (3:4 ratio), JPG. The
optimizer in PART 9 makes the small phone-sized copies for you, so there's
no need to shrink photos by hand.

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
though any path inside `assets/` will work. After adding or replacing an
image, run the optimizer (PART 9).

### Hero banners on phones

The hero banners are wide landscape photos, but phones show a tall, narrow
slice of them. Each hero entry has a `"mobile_focus"` value that picks which
part of the photo phones see, from `0` (left edge) to `1` (right edge):

```js
"hero_slide_1": { "src": "sections/Slide1hero.png", "alt": "...", "mobile_focus": 0.21 }
```

`0.21` centres the phone crop on the model standing on the left of that
banner. After changing it, re-run the optimizer so it re-cuts the crop.

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

The navbar shows: Fusion Wear, Indo Western, Semi Formals, Sarees, Formals.
This is hardcoded into each page's navbar for simplicity, if you want to
change nav labels or add a new top-level section, you would need to update
the navbar markup across all pages (ask for help with this if needed, since
it touches many files at once).

On phones and tablets (up to 1180px wide) the navbar collapses into a menu
button. That slide-out menu is built automatically by `assets/app.js` from
`assets/data/site-structure.data.js` (the `nav` list plus each section's
`subsections`), so it always matches the data file. It also holds product
search, Login, Wishlist and Your Bag.

The shared page parts (navbar, footer, drawers, product popup) are written
in `dev-tools/partials.py`. Running `python3 dev-tools/gen_subsection_pages.py`
and `python3 dev-tools/gen_hub_pages.py` from the site folder rebuilds the 14
category and hub pages from it. The other 8 pages (home, About, bag,
checkout, wishlist, order confirmation, login, sign up) are edited by hand,
so a navbar or footer change must be made there too.

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
## PART 9: Phone Speed, Images and Fonts
----------------------------------------------------------------------

Phones are the main way people shop the site, so pages are kept light:

- **Photos.** `dev-tools/optimize_images.py` (needs `pip install pillow`
  once) makes WebP copies of every photo in `assets/img/` in several widths,
  plus a JPEG for old browsers and the portrait hero crops, and lists them
  in `assets/data/image-variants.data.js`. The site picks the right size for
  each screen automatically. Run it whenever you add or replace a photo,
  and commit everything it creates. It also deletes copies of photos you
  removed.
- **First hero banner.** The optimizer also writes two "preload" lines
  near the top of `index.html`, between the `hero-preload` markers, so
  phones start downloading the first banner straight away. Leave the
  markers in place; the script keeps the lines up to date.
- **Fonts.** Playfair Display and Outfit are served from `assets/fonts/`
  instead of Google Fonts (see the README there).
- **Caching.** `vercel.json` tells browsers to keep optimised photos and
  fonts for a year. That's safe because their file names change whenever
  the content does.
- **Site icons.** `favicon.ico` (browser tab) and `apple-touch-icon.png`
  (phone home screen) are made from the logo mark by
  `dev-tools/make_icons.py`. Re-run it only if the logo changes.

----------------------------------------------------------------------
## PART 10: Mobile Layout Notes (for developers)
----------------------------------------------------------------------

- Breakpoints in `assets/style.css`: up to 1180px the header uses the menu
  button, up to 980px is the tablet layout, and up to 720px is the phone
  layout. These media queries sit at the end of the file on purpose: a
  media query only wins over a normal rule written later in the file if it
  comes after it, so keep new responsive rules below the component rules
  they change.
- Product links look like `pages/short-kurtis.html#p-sk1`. Opening one
  shows that product's popup, so they can be shared on WhatsApp or
  Instagram. The phone's back button closes the popup.
- On phones the product popup fills the screen, photos can be swiped, and
  Add to Cart / Buy Now stay pinned at the bottom.
- The newsletter popup (home page only) appears after the visitor scrolls
  half-way down or after 25 seconds, and at most once every 14 days. On
  phones it's a small sheet at the bottom that doesn't block the page.
- Closed popups, drawers and the menu are hidden with `visibility: hidden`
  (not just made transparent), so keyboard and screen-reader users can't
  land on buttons they can't see. Keep that pattern for any new overlay.

----------------------------------------------------------------------
## Folder Structure Reference
----------------------------------------------------------------------

```
index.html                    <- homepage
vercel.json                   <- caching rules for Vercel
favicon.ico, apple-touch-icon.png  <- site icons (made by make_icons.py)
pages/
  fusion-wear.html             <- Fusion Wear hub (6 tiles)
  short-kurtis.html             <- category pages (6 products each)
  kurtas.html
  anarkali-sets.html
  long-frocks.html
  tops.html
  nightwear.html
  indo-western.html             <- standalone category pages
  semi-formals.html
  sarees.html
  formals.html                  <- Formals hub (3 tiles)
  suits.html
  trousers.html
  blazers.html
  about.html
  cart.html, checkout.html, order-confirmation.html
  wishlist.html
  login.html, signup.html
assets/
  style.css
  app.js                        <- cart, wishlist, search, mobile menu
  modal.js                      <- product detail popup logic
  api-client.js                 <- calls to the backend
  mark-black.png, mark-white.png  <- logo mark, two color variants
  fonts/                        <- self-hosted web fonts
  data/
    products.data.js            <- EDIT THIS for product info and photos
    images.data.js               <- EDIT THIS for section/banner photos
    site-structure.data.js       <- navigation and section descriptions
    footer-legal.data.js         <- FAQ, Privacy Policy, Terms text
    image-variants.data.js       <- generated by optimize_images.py
  img/
    products/                    <- put product photos here
    sections/                    <- put banner/hero photos here
    optimized/                   <- generated by optimize_images.py
dev-tools/
  optimize_images.py            <- run after adding or replacing photos
  make_icons.py                 <- rebuilds the site icons from the logo
  partials.py, gen_*.py         <- rebuild the category and hub pages
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
