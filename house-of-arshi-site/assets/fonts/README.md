# Web fonts

Self-hosted copies of the two Google Fonts the site uses, so pages no longer
wait on fonts.googleapis.com / fonts.gstatic.com before they can render.

| File | Family | Subset | Weights |
|---|---|---|---|
| `playfair-display-v40-latin.woff2` | Playfair Display (v40) | Latin | variable 400–900 |
| `playfair-display-v40-latin-ext.woff2` | Playfair Display (v40) | Latin Extended (includes ₹) | variable 400–900 |
| `outfit-v15-latin.woff2` | Outfit (v15) | Latin | variable 100–900 |
| `outfit-v15-latin-ext.woff2` | Outfit (v15) | Latin Extended | variable 100–900 |

The `@font-face` rules are at the top of `assets/style.css`; the two Latin
files are also preloaded from each page's `<head>`.

Both families are licensed under the SIL Open Font License 1.1, which allows
self-hosting: https://fonts.google.com/specimen/Playfair+Display/license and
https://fonts.google.com/specimen/Outfit/license

The version number is part of each file name because browsers are told to
cache these files for a year. If you ever update a font, give the new file a
new name (and update `style.css` and the preload links) rather than
overwriting the old one.
