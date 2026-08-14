// Product catalog for House of Arshi.
// To add a real photo: find the product below, then inside its "images"
// array change "src": null to "src": "img/products/yourfile.jpg"
// See docs/IMAGE_GUIDE.md for the full picture-by-picture map.
const PRODUCTS = {
  "short-kurtis": [
    {
      "id": "sk1",
      "name": "Marigold Mirror Work Short Kurti",
      "price": 1299,
      "mrp": 1899,
      "tag": "Bestseller",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Marigold Mirror Work Short Kurti, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Pure cotton with mirror embroidery",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": "products/Heroimagesk1.jpeg",
          "alt": "Marigold Mirror Work Short Kurti, image 1"
        },
        {
          "src": "products/heroimagesk2.png",
          "alt": "Marigold Mirror Work Short Kurti, image 2"
        },
        {
          "src": null,
          "alt": "Marigold Mirror Work Short Kurti, image 3"
        },
        {
          "src": null,
          "alt": "Marigold Mirror Work Short Kurti, image 4"
        }
      ]
    },
    {
      "id": "sk2",
      "name": "Ivory Chikankari Short Kurti",
      "price": 1199,
      "mrp": 1599,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Ivory Chikankari Short Kurti, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton with hand done chikankari embroidery",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Ivory Chikankari Short Kurti, image 1"
        },
        {
          "src": null,
          "alt": "Ivory Chikankari Short Kurti, image 2"
        },
        {
          "src": null,
          "alt": "Ivory Chikankari Short Kurti, image 3"
        },
        {
          "src": null,
          "alt": "Ivory Chikankari Short Kurti, image 4"
        }
      ]
    },
    {
      "id": "sk3",
      "name": "Sunset Block Print Short Kurti",
      "price": 999,
      "mrp": 1499,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Sunset Block Print Short Kurti, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Hand block printed cotton",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Sunset Block Print Short Kurti, image 1"
        },
        {
          "src": null,
          "alt": "Sunset Block Print Short Kurti, image 2"
        },
        {
          "src": null,
          "alt": "Sunset Block Print Short Kurti, image 3"
        },
        {
          "src": null,
          "alt": "Sunset Block Print Short Kurti, image 4"
        }
      ]
    },
    {
      "id": "sk4",
      "name": "Maroon Bandhani Short Kurti",
      "price": 1399,
      "mrp": 1999,
      "tag": "Bestseller",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Maroon Bandhani Short Kurti, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Bandhani print on soft cotton",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Maroon Bandhani Short Kurti, image 1"
        },
        {
          "src": null,
          "alt": "Maroon Bandhani Short Kurti, image 2"
        },
        {
          "src": null,
          "alt": "Maroon Bandhani Short Kurti, image 3"
        },
        {
          "src": null,
          "alt": "Maroon Bandhani Short Kurti, image 4"
        }
      ]
    },
    {
      "id": "sk5",
      "name": "Sage Embroidered Short Kurti",
      "price": 1149,
      "mrp": 1599,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Sage Embroidered Short Kurti, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend with thread embroidery",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Sage Embroidered Short Kurti, image 1"
        },
        {
          "src": null,
          "alt": "Sage Embroidered Short Kurti, image 2"
        },
        {
          "src": null,
          "alt": "Sage Embroidered Short Kurti, image 3"
        },
        {
          "src": null,
          "alt": "Sage Embroidered Short Kurti, image 4"
        }
      ]
    },
    {
      "id": "sk6",
      "name": "Coral Floral Short Kurti",
      "price": 1049,
      "mrp": 1399,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Coral Floral Short Kurti, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Floral printed rayon",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Coral Floral Short Kurti, image 1"
        },
        {
          "src": null,
          "alt": "Coral Floral Short Kurti, image 2"
        },
        {
          "src": null,
          "alt": "Coral Floral Short Kurti, image 3"
        },
        {
          "src": null,
          "alt": "Coral Floral Short Kurti, image 4"
        }
      ]
    }
  ],
  "kurtas": [
    {
      "id": "kt1",
      "name": "Classic Cotton Straight Kurta",
      "price": 1399,
      "mrp": 1899,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Classic Cotton Straight Kurta, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Pure cotton",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Classic Cotton Straight Kurta, image 1"
        },
        {
          "src": null,
          "alt": "Classic Cotton Straight Kurta, image 2"
        },
        {
          "src": null,
          "alt": "Classic Cotton Straight Kurta, image 3"
        },
        {
          "src": null,
          "alt": "Classic Cotton Straight Kurta, image 4"
        }
      ]
    },
    {
      "id": "kt2",
      "name": "Festive Gota Patti Kurta",
      "price": 1799,
      "mrp": 2499,
      "tag": "Bestseller",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Festive Gota Patti Kurta, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton silk with gota patti work",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Festive Gota Patti Kurta, image 1"
        },
        {
          "src": null,
          "alt": "Festive Gota Patti Kurta, image 2"
        },
        {
          "src": null,
          "alt": "Festive Gota Patti Kurta, image 3"
        },
        {
          "src": null,
          "alt": "Festive Gota Patti Kurta, image 4"
        }
      ]
    },
    {
      "id": "kt3",
      "name": "Pastel Yellow A Line Kurta",
      "price": 1249,
      "mrp": 1699,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Pastel Yellow A Line Kurta, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Soft rayon blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Pastel Yellow A Line Kurta, image 1"
        },
        {
          "src": null,
          "alt": "Pastel Yellow A Line Kurta, image 2"
        },
        {
          "src": null,
          "alt": "Pastel Yellow A Line Kurta, image 3"
        },
        {
          "src": null,
          "alt": "Pastel Yellow A Line Kurta, image 4"
        }
      ]
    },
    {
      "id": "kt4",
      "name": "Block Print Cotton Kurta",
      "price": 1099,
      "mrp": 1499,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Block Print Cotton Kurta, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Hand block printed cotton",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Block Print Cotton Kurta, image 1"
        },
        {
          "src": null,
          "alt": "Block Print Cotton Kurta, image 2"
        },
        {
          "src": null,
          "alt": "Block Print Cotton Kurta, image 3"
        },
        {
          "src": null,
          "alt": "Block Print Cotton Kurta, image 4"
        }
      ]
    },
    {
      "id": "kt5",
      "name": "Embroidered Rust Kurta",
      "price": 1599,
      "mrp": 2199,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Embroidered Rust Kurta, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton with thread embroidery",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Embroidered Rust Kurta, image 1"
        },
        {
          "src": null,
          "alt": "Embroidered Rust Kurta, image 2"
        },
        {
          "src": null,
          "alt": "Embroidered Rust Kurta, image 3"
        },
        {
          "src": null,
          "alt": "Embroidered Rust Kurta, image 4"
        }
      ]
    },
    {
      "id": "kt6",
      "name": "Chanderi Silk Kurta",
      "price": 2199,
      "mrp": 2899,
      "tag": "Premium",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Chanderi Silk Kurta, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Chanderi silk blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Chanderi Silk Kurta, image 1"
        },
        {
          "src": null,
          "alt": "Chanderi Silk Kurta, image 2"
        },
        {
          "src": null,
          "alt": "Chanderi Silk Kurta, image 3"
        },
        {
          "src": null,
          "alt": "Chanderi Silk Kurta, image 4"
        }
      ]
    }
  ],
  "anarkali-sets": [
    {
      "id": "an1",
      "name": "Emerald Floral Anarkali Set",
      "price": 2899,
      "mrp": 3999,
      "tag": "Bestseller",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Emerald Floral Anarkali Set, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Georgette with floral print",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Emerald Floral Anarkali Set, image 1"
        },
        {
          "src": null,
          "alt": "Emerald Floral Anarkali Set, image 2"
        },
        {
          "src": null,
          "alt": "Emerald Floral Anarkali Set, image 3"
        },
        {
          "src": null,
          "alt": "Emerald Floral Anarkali Set, image 4"
        }
      ]
    },
    {
      "id": "an2",
      "name": "Rani Pink Anarkali with Dupatta",
      "price": 3199,
      "mrp": 4499,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Rani Pink Anarkali with Dupatta, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Silk blend with dupatta",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Rani Pink Anarkali with Dupatta, image 1"
        },
        {
          "src": null,
          "alt": "Rani Pink Anarkali with Dupatta, image 2"
        },
        {
          "src": null,
          "alt": "Rani Pink Anarkali with Dupatta, image 3"
        },
        {
          "src": null,
          "alt": "Rani Pink Anarkali with Dupatta, image 4"
        }
      ]
    },
    {
      "id": "an3",
      "name": "Mustard Printed Anarkali Set",
      "price": 2499,
      "mrp": 3499,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Mustard Printed Anarkali Set, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Printed rayon",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Mustard Printed Anarkali Set, image 1"
        },
        {
          "src": null,
          "alt": "Mustard Printed Anarkali Set, image 2"
        },
        {
          "src": null,
          "alt": "Mustard Printed Anarkali Set, image 3"
        },
        {
          "src": null,
          "alt": "Mustard Printed Anarkali Set, image 4"
        }
      ]
    },
    {
      "id": "an4",
      "name": "Navy Sequinned Anarkali Set",
      "price": 3599,
      "mrp": 4999,
      "tag": "Premium",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Navy Sequinned Anarkali Set, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Georgette with sequin work",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Navy Sequinned Anarkali Set, image 1"
        },
        {
          "src": null,
          "alt": "Navy Sequinned Anarkali Set, image 2"
        },
        {
          "src": null,
          "alt": "Navy Sequinned Anarkali Set, image 3"
        },
        {
          "src": null,
          "alt": "Navy Sequinned Anarkali Set, image 4"
        }
      ]
    },
    {
      "id": "an5",
      "name": "Powder Blue Anarkali Set",
      "price": 2799,
      "mrp": 3899,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Powder Blue Anarkali Set, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Soft georgette",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Powder Blue Anarkali Set, image 1"
        },
        {
          "src": null,
          "alt": "Powder Blue Anarkali Set, image 2"
        },
        {
          "src": null,
          "alt": "Powder Blue Anarkali Set, image 3"
        },
        {
          "src": null,
          "alt": "Powder Blue Anarkali Set, image 4"
        }
      ]
    },
    {
      "id": "an6",
      "name": "Maroon Velvet Anarkali Set",
      "price": 3899,
      "mrp": 5299,
      "tag": "Festive",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Maroon Velvet Anarkali Set, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Velvet with zari work",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Maroon Velvet Anarkali Set, image 1"
        },
        {
          "src": null,
          "alt": "Maroon Velvet Anarkali Set, image 2"
        },
        {
          "src": null,
          "alt": "Maroon Velvet Anarkali Set, image 3"
        },
        {
          "src": null,
          "alt": "Maroon Velvet Anarkali Set, image 4"
        }
      ]
    }
  ],
  "long-frocks": [
    {
      "id": "lf1",
      "name": "Ivory Tiered Maxi Frock",
      "price": 1799,
      "mrp": 2499,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Ivory Tiered Maxi Frock, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Ivory Tiered Maxi Frock, image 1"
        },
        {
          "src": null,
          "alt": "Ivory Tiered Maxi Frock, image 2"
        },
        {
          "src": null,
          "alt": "Ivory Tiered Maxi Frock, image 3"
        },
        {
          "src": null,
          "alt": "Ivory Tiered Maxi Frock, image 4"
        }
      ]
    },
    {
      "id": "lf2",
      "name": "Floral Wrap Maxi Dress",
      "price": 1649,
      "mrp": 2299,
      "tag": "Bestseller",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Floral Wrap Maxi Dress, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Rayon with floral print",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Floral Wrap Maxi Dress, image 1"
        },
        {
          "src": null,
          "alt": "Floral Wrap Maxi Dress, image 2"
        },
        {
          "src": null,
          "alt": "Floral Wrap Maxi Dress, image 3"
        },
        {
          "src": null,
          "alt": "Floral Wrap Maxi Dress, image 4"
        }
      ]
    },
    {
      "id": "lf3",
      "name": "Rust Puff Sleeve Long Frock",
      "price": 1549,
      "mrp": 2199,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Rust Puff Sleeve Long Frock, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Soft cotton",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Rust Puff Sleeve Long Frock, image 1"
        },
        {
          "src": null,
          "alt": "Rust Puff Sleeve Long Frock, image 2"
        },
        {
          "src": null,
          "alt": "Rust Puff Sleeve Long Frock, image 3"
        },
        {
          "src": null,
          "alt": "Rust Puff Sleeve Long Frock, image 4"
        }
      ]
    },
    {
      "id": "lf4",
      "name": "Sage Empire Waist Frock",
      "price": 1699,
      "mrp": 2399,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Sage Empire Waist Frock, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Rayon blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Sage Empire Waist Frock, image 1"
        },
        {
          "src": null,
          "alt": "Sage Empire Waist Frock, image 2"
        },
        {
          "src": null,
          "alt": "Sage Empire Waist Frock, image 3"
        },
        {
          "src": null,
          "alt": "Sage Empire Waist Frock, image 4"
        }
      ]
    },
    {
      "id": "lf5",
      "name": "Printed A Line Maxi",
      "price": 1499,
      "mrp": 1999,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Printed A Line Maxi, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Lightweight rayon",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Printed A Line Maxi, image 1"
        },
        {
          "src": null,
          "alt": "Printed A Line Maxi, image 2"
        },
        {
          "src": null,
          "alt": "Printed A Line Maxi, image 3"
        },
        {
          "src": null,
          "alt": "Printed A Line Maxi, image 4"
        }
      ]
    },
    {
      "id": "lf6",
      "name": "Pleated Sunshine Yellow Frock",
      "price": 1599,
      "mrp": 2199,
      "tag": "Bestseller",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Pleated Sunshine Yellow Frock, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Pleated Sunshine Yellow Frock, image 1"
        },
        {
          "src": null,
          "alt": "Pleated Sunshine Yellow Frock, image 2"
        },
        {
          "src": null,
          "alt": "Pleated Sunshine Yellow Frock, image 3"
        },
        {
          "src": null,
          "alt": "Pleated Sunshine Yellow Frock, image 4"
        }
      ]
    }
  ],
  "tops": [
    {
      "id": "tp1",
      "name": "Ivory Tie Front Top",
      "price": 899,
      "mrp": 1299,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Ivory Tie Front Top, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Rayon crepe",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Ivory Tie Front Top, image 1"
        },
        {
          "src": null,
          "alt": "Ivory Tie Front Top, image 2"
        },
        {
          "src": null,
          "alt": "Ivory Tie Front Top, image 3"
        },
        {
          "src": null,
          "alt": "Ivory Tie Front Top, image 4"
        }
      ]
    },
    {
      "id": "tp2",
      "name": "Sage Sleeveless Top",
      "price": 799,
      "mrp": 1099,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Sage Sleeveless Top, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Sage Sleeveless Top, image 1"
        },
        {
          "src": null,
          "alt": "Sage Sleeveless Top, image 2"
        },
        {
          "src": null,
          "alt": "Sage Sleeveless Top, image 3"
        },
        {
          "src": null,
          "alt": "Sage Sleeveless Top, image 4"
        }
      ]
    },
    {
      "id": "tp3",
      "name": "Printed Wrap Top",
      "price": 949,
      "mrp": 1349,
      "tag": "Bestseller",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Printed Wrap Top, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Printed rayon",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Printed Wrap Top, image 1"
        },
        {
          "src": null,
          "alt": "Printed Wrap Top, image 2"
        },
        {
          "src": null,
          "alt": "Printed Wrap Top, image 3"
        },
        {
          "src": null,
          "alt": "Printed Wrap Top, image 4"
        }
      ]
    },
    {
      "id": "tp4",
      "name": "Office Edit Collared Top",
      "price": 1049,
      "mrp": 1499,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Office Edit Collared Top, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton poplin",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Office Edit Collared Top, image 1"
        },
        {
          "src": null,
          "alt": "Office Edit Collared Top, image 2"
        },
        {
          "src": null,
          "alt": "Office Edit Collared Top, image 3"
        },
        {
          "src": null,
          "alt": "Office Edit Collared Top, image 4"
        }
      ]
    },
    {
      "id": "tp5",
      "name": "Rust Asymmetric Top",
      "price": 999,
      "mrp": 1399,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Rust Asymmetric Top, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Georgette",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Rust Asymmetric Top, image 1"
        },
        {
          "src": null,
          "alt": "Rust Asymmetric Top, image 2"
        },
        {
          "src": null,
          "alt": "Rust Asymmetric Top, image 3"
        },
        {
          "src": null,
          "alt": "Rust Asymmetric Top, image 4"
        }
      ]
    },
    {
      "id": "tp6",
      "name": "Beige Linen Blend Top",
      "price": 899,
      "mrp": 1199,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Beige Linen Blend Top, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Linen blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Beige Linen Blend Top, image 1"
        },
        {
          "src": null,
          "alt": "Beige Linen Blend Top, image 2"
        },
        {
          "src": null,
          "alt": "Beige Linen Blend Top, image 3"
        },
        {
          "src": null,
          "alt": "Beige Linen Blend Top, image 4"
        }
      ]
    }
  ],
  "nightwear": [
    {
      "id": "nw1",
      "name": "Lavender Cotton Night Set",
      "price": 999,
      "mrp": 1399,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Lavender Cotton Night Set, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Pure cotton",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Lavender Cotton Night Set, image 1"
        },
        {
          "src": null,
          "alt": "Lavender Cotton Night Set, image 2"
        },
        {
          "src": null,
          "alt": "Lavender Cotton Night Set, image 3"
        },
        {
          "src": null,
          "alt": "Lavender Cotton Night Set, image 4"
        }
      ]
    },
    {
      "id": "nw2",
      "name": "Floral Print Sleep Shirt",
      "price": 749,
      "mrp": 1099,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Floral Print Sleep Shirt, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Printed cotton",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Floral Print Sleep Shirt, image 1"
        },
        {
          "src": null,
          "alt": "Floral Print Sleep Shirt, image 2"
        },
        {
          "src": null,
          "alt": "Floral Print Sleep Shirt, image 3"
        },
        {
          "src": null,
          "alt": "Floral Print Sleep Shirt, image 4"
        }
      ]
    },
    {
      "id": "nw3",
      "name": "Satin Camisole Night Set",
      "price": 1299,
      "mrp": 1799,
      "tag": "Bestseller",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Satin Camisole Night Set, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Satin",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Satin Camisole Night Set, image 1"
        },
        {
          "src": null,
          "alt": "Satin Camisole Night Set, image 2"
        },
        {
          "src": null,
          "alt": "Satin Camisole Night Set, image 3"
        },
        {
          "src": null,
          "alt": "Satin Camisole Night Set, image 4"
        }
      ]
    },
    {
      "id": "nw4",
      "name": "Powder Pink Pyjama Set",
      "price": 899,
      "mrp": 1299,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Powder Pink Pyjama Set, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Powder Pink Pyjama Set, image 1"
        },
        {
          "src": null,
          "alt": "Powder Pink Pyjama Set, image 2"
        },
        {
          "src": null,
          "alt": "Powder Pink Pyjama Set, image 3"
        },
        {
          "src": null,
          "alt": "Powder Pink Pyjama Set, image 4"
        }
      ]
    },
    {
      "id": "nw5",
      "name": "Ivory Lace Trim Night Dress",
      "price": 1149,
      "mrp": 1599,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Ivory Lace Trim Night Dress, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton with lace trim",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Ivory Lace Trim Night Dress, image 1"
        },
        {
          "src": null,
          "alt": "Ivory Lace Trim Night Dress, image 2"
        },
        {
          "src": null,
          "alt": "Ivory Lace Trim Night Dress, image 3"
        },
        {
          "src": null,
          "alt": "Ivory Lace Trim Night Dress, image 4"
        }
      ]
    },
    {
      "id": "nw6",
      "name": "Mint Striped Night Set",
      "price": 849,
      "mrp": 1199,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Mint Striped Night Set, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton jersey",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Mint Striped Night Set, image 1"
        },
        {
          "src": null,
          "alt": "Mint Striped Night Set, image 2"
        },
        {
          "src": null,
          "alt": "Mint Striped Night Set, image 3"
        },
        {
          "src": null,
          "alt": "Mint Striped Night Set, image 4"
        }
      ]
    }
  ],
  "indo-western": [
    {
      "id": "iw1",
      "name": "Draped Palazzo Jumpsuit",
      "price": 2199,
      "mrp": 2999,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Draped Palazzo Jumpsuit, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Crepe",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Draped Palazzo Jumpsuit, image 1"
        },
        {
          "src": null,
          "alt": "Draped Palazzo Jumpsuit, image 2"
        },
        {
          "src": null,
          "alt": "Draped Palazzo Jumpsuit, image 3"
        },
        {
          "src": null,
          "alt": "Draped Palazzo Jumpsuit, image 4"
        }
      ]
    },
    {
      "id": "iw2",
      "name": "Cape Sleeve Cowl Dress",
      "price": 1999,
      "mrp": 2799,
      "tag": "Bestseller",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Cape Sleeve Cowl Dress, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Georgette",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Cape Sleeve Cowl Dress, image 1"
        },
        {
          "src": null,
          "alt": "Cape Sleeve Cowl Dress, image 2"
        },
        {
          "src": null,
          "alt": "Cape Sleeve Cowl Dress, image 3"
        },
        {
          "src": null,
          "alt": "Cape Sleeve Cowl Dress, image 4"
        }
      ]
    },
    {
      "id": "iw3",
      "name": "Asymmetric Hem Kurti Gown",
      "price": 2399,
      "mrp": 3299,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Asymmetric Hem Kurti Gown, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Rayon blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Asymmetric Hem Kurti Gown, image 1"
        },
        {
          "src": null,
          "alt": "Asymmetric Hem Kurti Gown, image 2"
        },
        {
          "src": null,
          "alt": "Asymmetric Hem Kurti Gown, image 3"
        },
        {
          "src": null,
          "alt": "Asymmetric Hem Kurti Gown, image 4"
        }
      ]
    },
    {
      "id": "iw4",
      "name": "Belted Dhoti Pant Set",
      "price": 1899,
      "mrp": 2599,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Belted Dhoti Pant Set, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton silk blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Belted Dhoti Pant Set, image 1"
        },
        {
          "src": null,
          "alt": "Belted Dhoti Pant Set, image 2"
        },
        {
          "src": null,
          "alt": "Belted Dhoti Pant Set, image 3"
        },
        {
          "src": null,
          "alt": "Belted Dhoti Pant Set, image 4"
        }
      ]
    },
    {
      "id": "iw5",
      "name": "Mirror Work Cape Set",
      "price": 2699,
      "mrp": 3699,
      "tag": "Premium",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Mirror Work Cape Set, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Georgette with mirror work",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Mirror Work Cape Set, image 1"
        },
        {
          "src": null,
          "alt": "Mirror Work Cape Set, image 2"
        },
        {
          "src": null,
          "alt": "Mirror Work Cape Set, image 3"
        },
        {
          "src": null,
          "alt": "Mirror Work Cape Set, image 4"
        }
      ]
    },
    {
      "id": "iw6",
      "name": "High Low Kurti with Pants",
      "price": 1799,
      "mrp": 2399,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "High Low Kurti with Pants, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "High Low Kurti with Pants, image 1"
        },
        {
          "src": null,
          "alt": "High Low Kurti with Pants, image 2"
        },
        {
          "src": null,
          "alt": "High Low Kurti with Pants, image 3"
        },
        {
          "src": null,
          "alt": "High Low Kurti with Pants, image 4"
        }
      ]
    }
  ],
  "semi-formals": [
    {
      "id": "sf1",
      "name": "Sleeveless Crepe Kurti",
      "price": 1149,
      "mrp": 1599,
      "tag": "Bestseller",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Sleeveless Crepe Kurti, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Crepe",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Sleeveless Crepe Kurti, image 1"
        },
        {
          "src": null,
          "alt": "Sleeveless Crepe Kurti, image 2"
        },
        {
          "src": null,
          "alt": "Sleeveless Crepe Kurti, image 3"
        },
        {
          "src": null,
          "alt": "Sleeveless Crepe Kurti, image 4"
        }
      ]
    },
    {
      "id": "sf2",
      "name": "Tailored Collar Office Top",
      "price": 999,
      "mrp": 1399,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Tailored Collar Office Top, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton poplin",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Tailored Collar Office Top, image 1"
        },
        {
          "src": null,
          "alt": "Tailored Collar Office Top, image 2"
        },
        {
          "src": null,
          "alt": "Tailored Collar Office Top, image 3"
        },
        {
          "src": null,
          "alt": "Tailored Collar Office Top, image 4"
        }
      ]
    },
    {
      "id": "sf3",
      "name": "Solid Sleeveless Kurti Set",
      "price": 1349,
      "mrp": 1799,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Solid Sleeveless Kurti Set, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Rayon blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Solid Sleeveless Kurti Set, image 1"
        },
        {
          "src": null,
          "alt": "Solid Sleeveless Kurti Set, image 2"
        },
        {
          "src": null,
          "alt": "Solid Sleeveless Kurti Set, image 3"
        },
        {
          "src": null,
          "alt": "Solid Sleeveless Kurti Set, image 4"
        }
      ]
    },
    {
      "id": "sf4",
      "name": "Pintuck Formal Top",
      "price": 1099,
      "mrp": 1499,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Pintuck Formal Top, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Crepe",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Pintuck Formal Top, image 1"
        },
        {
          "src": null,
          "alt": "Pintuck Formal Top, image 2"
        },
        {
          "src": null,
          "alt": "Pintuck Formal Top, image 3"
        },
        {
          "src": null,
          "alt": "Pintuck Formal Top, image 4"
        }
      ]
    },
    {
      "id": "sf5",
      "name": "Minimal Straight Kurti",
      "price": 1199,
      "mrp": 1599,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Minimal Straight Kurti, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Minimal Straight Kurti, image 1"
        },
        {
          "src": null,
          "alt": "Minimal Straight Kurti, image 2"
        },
        {
          "src": null,
          "alt": "Minimal Straight Kurti, image 3"
        },
        {
          "src": null,
          "alt": "Minimal Straight Kurti, image 4"
        }
      ]
    },
    {
      "id": "sf6",
      "name": "Boat Neck Office Kurti",
      "price": 1249,
      "mrp": 1699,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Boat Neck Office Kurti, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Rayon crepe",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Boat Neck Office Kurti, image 1"
        },
        {
          "src": null,
          "alt": "Boat Neck Office Kurti, image 2"
        },
        {
          "src": null,
          "alt": "Boat Neck Office Kurti, image 3"
        },
        {
          "src": null,
          "alt": "Boat Neck Office Kurti, image 4"
        }
      ]
    }
  ],
  "sarees": [
    {
      "id": "sr1",
      "name": "Banarasi Silk Saree",
      "price": 4299,
      "mrp": 5999,
      "tag": "Premium",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Banarasi Silk Saree, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Banarasi silk",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Banarasi Silk Saree, image 1"
        },
        {
          "src": null,
          "alt": "Banarasi Silk Saree, image 2"
        },
        {
          "src": null,
          "alt": "Banarasi Silk Saree, image 3"
        },
        {
          "src": null,
          "alt": "Banarasi Silk Saree, image 4"
        }
      ]
    },
    {
      "id": "sr2",
      "name": "Mysore Silk Saree with Blouse",
      "price": 3699,
      "mrp": 4999,
      "tag": "Bestseller",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Mysore Silk Saree with Blouse, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Mysore silk",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Mysore Silk Saree with Blouse, image 1"
        },
        {
          "src": null,
          "alt": "Mysore Silk Saree with Blouse, image 2"
        },
        {
          "src": null,
          "alt": "Mysore Silk Saree with Blouse, image 3"
        },
        {
          "src": null,
          "alt": "Mysore Silk Saree with Blouse, image 4"
        }
      ]
    },
    {
      "id": "sr3",
      "name": "Chiffon Printed Saree",
      "price": 1899,
      "mrp": 2599,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Chiffon Printed Saree, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Chiffon",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Chiffon Printed Saree, image 1"
        },
        {
          "src": null,
          "alt": "Chiffon Printed Saree, image 2"
        },
        {
          "src": null,
          "alt": "Chiffon Printed Saree, image 3"
        },
        {
          "src": null,
          "alt": "Chiffon Printed Saree, image 4"
        }
      ]
    },
    {
      "id": "sr4",
      "name": "Kanjeevaram Inspired Saree",
      "price": 4899,
      "mrp": 6499,
      "tag": "Festive",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Kanjeevaram Inspired Saree, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Art silk",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Kanjeevaram Inspired Saree, image 1"
        },
        {
          "src": null,
          "alt": "Kanjeevaram Inspired Saree, image 2"
        },
        {
          "src": null,
          "alt": "Kanjeevaram Inspired Saree, image 3"
        },
        {
          "src": null,
          "alt": "Kanjeevaram Inspired Saree, image 4"
        }
      ]
    },
    {
      "id": "sr5",
      "name": "Linen Handloom Saree",
      "price": 2599,
      "mrp": 3499,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Linen Handloom Saree, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Linen",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Linen Handloom Saree, image 1"
        },
        {
          "src": null,
          "alt": "Linen Handloom Saree, image 2"
        },
        {
          "src": null,
          "alt": "Linen Handloom Saree, image 3"
        },
        {
          "src": null,
          "alt": "Linen Handloom Saree, image 4"
        }
      ]
    },
    {
      "id": "sr6",
      "name": "Georgette Party Saree",
      "price": 2199,
      "mrp": 2999,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Georgette Party Saree, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Georgette",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Georgette Party Saree, image 1"
        },
        {
          "src": null,
          "alt": "Georgette Party Saree, image 2"
        },
        {
          "src": null,
          "alt": "Georgette Party Saree, image 3"
        },
        {
          "src": null,
          "alt": "Georgette Party Saree, image 4"
        }
      ]
    }
  ],
  "suits": [
    {
      "id": "su1",
      "name": "Tailored Ivory Pant Suit",
      "price": 3499,
      "mrp": 4799,
      "tag": "Premium",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Tailored Ivory Pant Suit, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Tailored Ivory Pant Suit, image 1"
        },
        {
          "src": null,
          "alt": "Tailored Ivory Pant Suit, image 2"
        },
        {
          "src": null,
          "alt": "Tailored Ivory Pant Suit, image 3"
        },
        {
          "src": null,
          "alt": "Tailored Ivory Pant Suit, image 4"
        }
      ]
    },
    {
      "id": "su2",
      "name": "Charcoal Two Piece Suit",
      "price": 3799,
      "mrp": 5199,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Charcoal Two Piece Suit, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Polyester viscose blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Charcoal Two Piece Suit, image 1"
        },
        {
          "src": null,
          "alt": "Charcoal Two Piece Suit, image 2"
        },
        {
          "src": null,
          "alt": "Charcoal Two Piece Suit, image 3"
        },
        {
          "src": null,
          "alt": "Charcoal Two Piece Suit, image 4"
        }
      ]
    },
    {
      "id": "su3",
      "name": "Beige Blazer Suit Set",
      "price": 3299,
      "mrp": 4499,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Beige Blazer Suit Set, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Beige Blazer Suit Set, image 1"
        },
        {
          "src": null,
          "alt": "Beige Blazer Suit Set, image 2"
        },
        {
          "src": null,
          "alt": "Beige Blazer Suit Set, image 3"
        },
        {
          "src": null,
          "alt": "Beige Blazer Suit Set, image 4"
        }
      ]
    },
    {
      "id": "su4",
      "name": "Classic Black Formal Suit",
      "price": 3999,
      "mrp": 5499,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Classic Black Formal Suit, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Polyester viscose blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Classic Black Formal Suit, image 1"
        },
        {
          "src": null,
          "alt": "Classic Black Formal Suit, image 2"
        },
        {
          "src": null,
          "alt": "Classic Black Formal Suit, image 3"
        },
        {
          "src": null,
          "alt": "Classic Black Formal Suit, image 4"
        }
      ]
    },
    {
      "id": "su5",
      "name": "Pinstripe Tailored Suit",
      "price": 3699,
      "mrp": 4999,
      "tag": "Bestseller",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Pinstripe Tailored Suit, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Pinstripe Tailored Suit, image 1"
        },
        {
          "src": null,
          "alt": "Pinstripe Tailored Suit, image 2"
        },
        {
          "src": null,
          "alt": "Pinstripe Tailored Suit, image 3"
        },
        {
          "src": null,
          "alt": "Pinstripe Tailored Suit, image 4"
        }
      ]
    },
    {
      "id": "su6",
      "name": "Sand Trouser Suit Set",
      "price": 3399,
      "mrp": 4599,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Sand Trouser Suit Set, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Sand Trouser Suit Set, image 1"
        },
        {
          "src": null,
          "alt": "Sand Trouser Suit Set, image 2"
        },
        {
          "src": null,
          "alt": "Sand Trouser Suit Set, image 3"
        },
        {
          "src": null,
          "alt": "Sand Trouser Suit Set, image 4"
        }
      ]
    }
  ],
  "trousers": [
    {
      "id": "tr1",
      "name": "High Waist Formal Trousers",
      "price": 1399,
      "mrp": 1899,
      "tag": "Bestseller",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "High Waist Formal Trousers, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "High Waist Formal Trousers, image 1"
        },
        {
          "src": null,
          "alt": "High Waist Formal Trousers, image 2"
        },
        {
          "src": null,
          "alt": "High Waist Formal Trousers, image 3"
        },
        {
          "src": null,
          "alt": "High Waist Formal Trousers, image 4"
        }
      ]
    },
    {
      "id": "tr2",
      "name": "Wide Leg Office Trousers",
      "price": 1499,
      "mrp": 1999,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Wide Leg Office Trousers, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Polyester viscose blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Wide Leg Office Trousers, image 1"
        },
        {
          "src": null,
          "alt": "Wide Leg Office Trousers, image 2"
        },
        {
          "src": null,
          "alt": "Wide Leg Office Trousers, image 3"
        },
        {
          "src": null,
          "alt": "Wide Leg Office Trousers, image 4"
        }
      ]
    },
    {
      "id": "tr3",
      "name": "Tapered Charcoal Trousers",
      "price": 1349,
      "mrp": 1799,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Tapered Charcoal Trousers, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Tapered Charcoal Trousers, image 1"
        },
        {
          "src": null,
          "alt": "Tapered Charcoal Trousers, image 2"
        },
        {
          "src": null,
          "alt": "Tapered Charcoal Trousers, image 3"
        },
        {
          "src": null,
          "alt": "Tapered Charcoal Trousers, image 4"
        }
      ]
    },
    {
      "id": "tr4",
      "name": "Pleated Beige Trousers",
      "price": 1299,
      "mrp": 1699,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Pleated Beige Trousers, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Pleated Beige Trousers, image 1"
        },
        {
          "src": null,
          "alt": "Pleated Beige Trousers, image 2"
        },
        {
          "src": null,
          "alt": "Pleated Beige Trousers, image 3"
        },
        {
          "src": null,
          "alt": "Pleated Beige Trousers, image 4"
        }
      ]
    },
    {
      "id": "tr5",
      "name": "Straight Fit Navy Trousers",
      "price": 1449,
      "mrp": 1899,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Straight Fit Navy Trousers, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Polyester viscose blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Straight Fit Navy Trousers, image 1"
        },
        {
          "src": null,
          "alt": "Straight Fit Navy Trousers, image 2"
        },
        {
          "src": null,
          "alt": "Straight Fit Navy Trousers, image 3"
        },
        {
          "src": null,
          "alt": "Straight Fit Navy Trousers, image 4"
        }
      ]
    },
    {
      "id": "tr6",
      "name": "Cigarette Fit Formal Trousers",
      "price": 1399,
      "mrp": 1799,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Cigarette Fit Formal Trousers, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Cigarette Fit Formal Trousers, image 1"
        },
        {
          "src": null,
          "alt": "Cigarette Fit Formal Trousers, image 2"
        },
        {
          "src": null,
          "alt": "Cigarette Fit Formal Trousers, image 3"
        },
        {
          "src": null,
          "alt": "Cigarette Fit Formal Trousers, image 4"
        }
      ]
    }
  ],
  "blazers": [
    {
      "id": "bl1",
      "name": "Structured Ivory Blazer",
      "price": 2799,
      "mrp": 3799,
      "tag": "Premium",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Structured Ivory Blazer, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Structured Ivory Blazer, image 1"
        },
        {
          "src": null,
          "alt": "Structured Ivory Blazer, image 2"
        },
        {
          "src": null,
          "alt": "Structured Ivory Blazer, image 3"
        },
        {
          "src": null,
          "alt": "Structured Ivory Blazer, image 4"
        }
      ]
    },
    {
      "id": "bl2",
      "name": "Oversized Charcoal Blazer",
      "price": 2999,
      "mrp": 3999,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Oversized Charcoal Blazer, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Polyester viscose blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Oversized Charcoal Blazer, image 1"
        },
        {
          "src": null,
          "alt": "Oversized Charcoal Blazer, image 2"
        },
        {
          "src": null,
          "alt": "Oversized Charcoal Blazer, image 3"
        },
        {
          "src": null,
          "alt": "Oversized Charcoal Blazer, image 4"
        }
      ]
    },
    {
      "id": "bl3",
      "name": "Fitted Black Blazer",
      "price": 2699,
      "mrp": 3599,
      "tag": "Bestseller",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Fitted Black Blazer, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Fitted Black Blazer, image 1"
        },
        {
          "src": null,
          "alt": "Fitted Black Blazer, image 2"
        },
        {
          "src": null,
          "alt": "Fitted Black Blazer, image 3"
        },
        {
          "src": null,
          "alt": "Fitted Black Blazer, image 4"
        }
      ]
    },
    {
      "id": "bl4",
      "name": "Beige Double Breasted Blazer",
      "price": 3099,
      "mrp": 4199,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Beige Double Breasted Blazer, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Beige Double Breasted Blazer, image 1"
        },
        {
          "src": null,
          "alt": "Beige Double Breasted Blazer, image 2"
        },
        {
          "src": null,
          "alt": "Beige Double Breasted Blazer, image 3"
        },
        {
          "src": null,
          "alt": "Beige Double Breasted Blazer, image 4"
        }
      ]
    },
    {
      "id": "bl5",
      "name": "Pinstripe Tailored Blazer",
      "price": 2899,
      "mrp": 3899,
      "tag": null,
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Pinstripe Tailored Blazer, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Cotton blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Pinstripe Tailored Blazer, image 1"
        },
        {
          "src": null,
          "alt": "Pinstripe Tailored Blazer, image 2"
        },
        {
          "src": null,
          "alt": "Pinstripe Tailored Blazer, image 3"
        },
        {
          "src": null,
          "alt": "Pinstripe Tailored Blazer, image 4"
        }
      ]
    },
    {
      "id": "bl6",
      "name": "Cropped Formal Blazer",
      "price": 2599,
      "mrp": 3499,
      "tag": "New",
      "sizes": [
        "S",
        "M",
        "L",
        "XL",
        "XXL"
      ],
      "about": "Cropped Formal Blazer, designed for everyday wear with a focus on comfort and fit. A versatile piece that moves easily between occasions.",
      "material": "Polyester viscose blend",
      "delivery": "Delivered in 4 to 6 business days. Free shipping on orders above ₹1,999. Easy 7 day exchange.",
      "images": [
        {
          "src": null,
          "alt": "Cropped Formal Blazer, image 1"
        },
        {
          "src": null,
          "alt": "Cropped Formal Blazer, image 2"
        },
        {
          "src": null,
          "alt": "Cropped Formal Blazer, image 3"
        },
        {
          "src": null,
          "alt": "Cropped Formal Blazer, image 4"
        }
      ]
    }
  ]
};
