import { Product, Collection } from "./types";

const RAW_PRODUCTS: Omit<Product, "asin" | "affiliateLink" | "pinterestTitle" | "pinterestDescription" | "pinterestMetadata">[] = [
  {
    id: "velvet-accent-chair",
    name: "Rivet Mid-Century Modern Tufted Accent Chair",
    designer: "Amazon Rivet",
    price: 249,
    category: "Living Room",
    isNewArrival: true,
    description: "An elegant, clean-lined tufted accent chair upholstered in premium velvet with solid wood tapered legs.",
    longDescription: "Bring sleek mid-century style to your living space with this tufted accent chair by Rivet. Featuring soft velvet fabric, a deep padded seat cushion, and a sturdy solid wood frame with tapered legs, it coordinates perfectly with minimalist or Scandinavian-inspired room designs.",
    colorSwatches: [
      {
        name: "Emerald Velvet",
        value: "#1A3B32",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCD968xpkN_m3uklvAs5PH0Ur0cnNI7pBK6B694YXGpYy5ok4dX68UhGbg_WK0NRcPtvPVO_oeOhf-uZOB4sYukVxqoICPsfks20zpG4UW7SZiU8ywAbIT56OelhmyHU6AZXmPzYgTshKC_qAv3AMouaZ1z1xT_zck48SFqLCmtzOX8I16gJhef3kqzcq3N_R7YC0ACVpXvCgry_6Y2pmmTVlqDurPkTRf6h-vUH86MWlQyWQmqTtqfYtT6X4pkNZwFYg4PHAya_BmQ",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDDFqASPcKrSBo7-2D-ESDNCUm8dQojnF8WIQ_21SQxkGV7LYWyGQCWTBBc1Sy6lbIqNRotIV_v8OcboOHbsTGdjWRr3y-xqoAHcfZbR587RQtIbjBpnYxGD8lDyxNRPtOvj2Pzuy7AcbMJKCZm1RJOejZoNUg2INuPJRFrkjJNB2Y6OxK9zBrX6EXtc3xGppPEsZmn4umic59oeZojxd6UglZw5dzzMooUY2E-WbMcXv8oOGDl44NKGsBnIU5_FZHdVOKgmZxwkTuX",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDaJ90AAmTVSKC46KE-A19nG_N7bbzOF7Mo2uBwOp4c_EsPTmjr77NbvM7zsj2Tnmm6zWq7LcQLJ5SgkHfIIkQyoo4hVQndLXg7SvTYAql0d47a5vP7VJBq2P9iFEPvdiMk4RCu7TbY5oxJkxOs3SQNlMnLye-V2F_nkYbsKvgszA0J3YDabwPVhOcwSKsSM9JZSx9irYG1Qv6YPI4vd9X67tPx3n5Ztxt8fsulG52wRPQC542M7sFwwMWK2ibulanSfR3FAAu7Mr32"
        ]
      },
      {
        name: "Pebble Grey",
        value: "#E5D3B3",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBXhy1nLzG0HfpJ8XVrQR9nZYWv2-R6APon7wZMM35_fT2fuyoEPWZbPy0yWG38qW5RcqHmknJBp2x4apPSdIsxyAlw2x1GJdFqskpR5Acr84RTfEDPFEv6IZIC7yYZHivsu-N44ah3mwg3EQWRkCi5S4SFo4ZTxnIsRe62IKF50qA-7-e1KJ32SxAFOIHPucieACcxngaB2m20GQeGVOvdqcwsIgEAj8CIOTsdHBwwlSYyscB9fvkpLAloHSLVwC5tYykmRnSbhAPN",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCF4LwapbmwvadpaSkGLHY21mhWjUiVugEbbOa0PVFI076N5sringJ3iKtaL8H5lj0stx2cqRFxaZKQc3TpGhsn2NZw1uX14oeawCn3479qw-6LoXcCG_KD3C5wqS6BoJRmpbxlvF7D7OKz3FzNWTmJdMp60Jou4QYsK-4TBRpZT2SPaSaY_D6QkzZ1r_0CJF3tXVlRuQeGY9OL4DgWKYaQwPg-9ftwWm4JnlymwuVqiuPQ4yCQZmjL0sVNe0kR55FLkWqhh2ScYHRh"
        ]
      }
    ],
    specifications: [
      "Plush tufted velvet fabric upholstery",
      "Robust solid wood tapered legs",
      "Smart modern geometric design elements",
      "Easy assembly: Under 15 minutes",
      "Dimensions: 32.5\"W x 31.5\"D x 34.5\"H"
    ]
  },
  {
    id: "minimalist-floor-lamp",
    name: "Brightech Carter LED Floor Lamp",
    designer: "Brightech",
    price: 129,
    category: "Living Room",
    description: "Sleek constructed floor lamp in matte black metal with brushed brass accent.",
    longDescription: "A sleek, minimalist floor lamp constructed of matte black metal with a brushed brass accent, positioned elegantly to elevate any bright, sparsely decorated corner. The soft natural illumination creates subtle structural shadows that emphasize geometric shapes and premium style.",
    colorSwatches: [
      {
        name: "Brushed Brass",
        value: "#C9A96E",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDQpC-smqKzNMRVSY_gm47POSgv0VCYdSd4ZJRsKqsWPJjn1mDfpsCPlL3-P-GOj4cgT3FXb0x2o8d-hMRM_ODlFQj-JZiQ4vBNjXEmmAIzZ9zxHkqlOc9PWo346io2Ehrm-t4z186CAptYXwZB43l_bodEmM84_J8E-OapmXhfjKhXQeqclbJXqnVnyBbpM9jCYQXKLyx9bYSwbzAdCkIVok66ymGy3uKbSFYWVdcBP2CKFBPE52JUrqsW_07eLojd1fx2JDbxsy89",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDmEYpLnaaASfYUG6Fl3Br684pD0VO5XrWrV1hebAo3ZcLSDU180cM-sg8y-9qZ4mpDKce-kaYPLBCP7EgirQvkhnEyD-IFx7aKslfdmco4688xgTu7CWKZmLDVlZiGnjW2d9xiCh_IDDoc0nKBSeOdetjX-QskDLmNVPZeaJdn8UWCRQl0EmWARZcEg2fBpiTkAx760AtpAPI4pAjfe7NB442fXqfq6bQeD3dqdR9tc8YxyLLpoZrmAPDtRPzBNFBh1DXa8cAYCCBS"
        ]
      }
    ],
    specifications: [
      "Premium brass and metal finishes",
      "Stark geometric round weighted base",
      "Comfortable pedal switch control",
      "Dimensions: 65\" H, base 11\" diameter",
      "Includes Energy-saving 9W LED bulb"
    ]
  },
  {
    id: "ceramic-dinnerware-set",
    name: "Mora Ceramic Dinnerware Sets - Plates and Bowls",
    designer: "Mora Ceramics",
    price: 89,
    category: "Kitchen",
    description: "Crafted arrange of hand-made artisanal ceramic plates and bowls in muted earth tones.",
    longDescription: "A curated arrangement of handmade, artisanal ceramic plates and bowls in muted earth tones, specifically charcoal and sand glaze finishes. They are stacked perfectly to convey a sense of quiet luxury, rustic authenticity, and intentional minimalist dining aesthetics.",
    colorSwatches: [
      {
        name: "Vanilla Sand",
        value: "#8F897F",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAAUhxsV2UQlMSY8uo7JwHgjm8jlsp3DtzOdSz0uArneRnYBB1T1ltSI2x6Ik0y80ZXm7GUxoNG-owsp2XbzO8DFfCQ5kIMf6ZNZ6S4Dne_YTA1rjP4qivLjFe2Z-ulPq5YbUEk3pmRa_9ZA03_Su31XWcQ6ew1B7YKQ2n0tsNQbP62hVJUloZBUHfqj0Uxthn2yrifx4hDWuQslpAS-wH6K173qz-KT9GPr7x8OkYe7m4S55quL3uR0AbwqUm0m505IM7pFoA3YnIF"
        ]
      }
    ],
    specifications: [
      "Eco-friendly clay with premium lead-free glaze",
      "Stackable minimalist layout styling",
      "Highly scratch-resistant glaze finishing",
      "Microwave, oven, and dishwasher safe"
    ]
  },
  {
    id: "matte-black-flatware",
    name: "LIANYU 20-Piece Matte Black Silverware Set",
    designer: "LIANYU",
    price: 45,
    category: "Kitchen",
    description: "Sleek modern matte black stainless steel flatware for clean table environments.",
    longDescription: "A perfectly aligned set of modern matte black stainless steel flatware resting on a textured linen napkin in a light sand color. Impeccably engineered with sleek contemporary silhouettes that embody curated contemporary lifestyles.",
    colorSwatches: [
      {
        name: "Matte Black",
        value: "#1C1C1C",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBVO6Hkb-XM7MukG1I1b9aoNtUrj38SN1QUXTS-lNJJVbSPtCnneY_aI_wIFdg8kmbdZJYBywqVgxZXPlCoD7-2vre4kX3ptrpV5gy-QF2msoR-k6g1jr_bhb0Rn8i1ddyzj1lZv-tBbVxaX2oRy1Oz5_tLp2Gr9V_wGf6nDYpyVYpEzBJE5s3NIsBoytaXd_suwbIwIU6n7rPHHhhGuwD38LJ3o9nFmDLnZTxtk0BwJKTypfKfL8L3tOlLU2ZjlSO2PD967WCUMn6K"
        ]
      }
    ],
    specifications: [
      "18/0 food-grade rust-resistant stainless steel",
      "Ergonomic handle shapes with satin black surface",
      "Perfect flatware weight distribution",
      "Includes 20 pieces: full dining service for 4"
    ]
  },
  {
    id: "boucle-armchair",
    name: "YAHEETECH Cozy Boucle Accent Chair with Ottoman",
    designer: "YAHEETECH",
    price: 1250,
    category: "Living Room",
    description: "Minimalist armchair upholstered in luxurious premium ivory boucle fabric.",
    longDescription: "A high-end, minimalist armchair upholstered in textured ivory boucle fabric. The lighting and shape highlight the organic curves and premium design craftsmanship, creating an exceptionally elegant statement anchor in high-end environments.",
    colorSwatches: [
      {
        name: "Ivory White",
        value: "#EFECE6",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDA5bx6ybwg2IDXhwyyiJmeMTdSyfguj0xl5T6xNcSzk6Q9xjKWlAsZvPCsBRk0lutLIjuHnzvcJ5EtJYqeyUv3ENWs9uVqP8Bmu9Pam3pTpGfwf9XNLwCCW0XOGvaIxVmc8rtOJMUf9G0kOfw45V6xg_1ZOSm3S9i0EhO3gQx-poVs36kWRkcf7VngcRxrx08B9tHcvo75oH7S8b3csYC-VPSjubBiMErCpj_n_GFBS9C_OrH7eE__heJIp3KHbJqg7ZuRr1l292g-"
        ]
      }
    ],
    specifications: [
      "Cloud-textured thick boucle fabric upholstery",
      "Supportive wooden frame construction",
      "Includes matching boucle supportive ottoman",
      "Dimensions: 29\"W x 30\"D x 38.5\"H"
    ]
  },
  {
    id: "charred-oak-table",
    name: "Nathan James Mid-Century Modern Coffee Table",
    designer: "Nathan James",
    price: 890,
    category: "Living Room",
    description: "Low-profile coffee table crafted from beautiful dark blackened charred oak.",
    longDescription: "A sculptural, low-profile coffee table crafted from solid, dark charred oak wood. Embodying geometric architecture blended with minimalist elegance, this piece features strong lines that accentuate organic wood grain and tactile finishes.",
    colorSwatches: [
      {
        name: "Espresso Brown",
        value: "#121213",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuC3Ha7aBhWpibJGMZPC44w_VDtxtNwkpB91B4182niAEXN4Pc_DiMRT28sFsvBiYpo5MlfRv6nN0_17Qj1EZJ5Y9ijcv-1nXbaO_e5Oai0-7rXYuelsF7YSbaDavtVeW-T-C80dbSrt7mYcdd6axGRtTUav7JC20o_1R8ZJMsRHBrQ-k0KKG8TWpj8Vdt7lBhBvs9H3iphdIG5hn0q8zUNgdS3o1Cbn5Y3AbiuygVn4x8SgcX-PoxbS9sisamHEMLDUffuzF2cKj0Oh"
        ]
      }
    ],
    specifications: [
      "Solid pine wood leg configurations",
      "High-grade dark oak veneer countertop",
      "Sleek oval organic structural design",
      "Dimensions: 43\" W x 23\" D x 17\" H"
    ]
  },
  {
    id: "linen-modular-sofa",
    name: "Stone & Beam Lauren Down-Filled Oversized Loveseat",
    designer: "Stone & Beam",
    price: 3400,
    category: "Living Room",
    isNewArrival: true,
    description: "Premium modular sectional upholstered in beautiful washed linen oatmeal custom fabric.",
    longDescription: "A sprawling modular couch wrapped in premium organic linen. This section features clean layouts and absolute geometric elegance that let the materials breathe, anchoring your living space in serene comfort.",
    colorSwatches: [
      {
        name: "Oatmeal Linen",
        value: "#DACDC3",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDARIFp_BGrj4aFM0YS7R7oyzTlnMRsZsHHqt3_eMsQOtpNSlGOqipg1JnNJ2-Uzb_YbrK-uboFKPw1LtpbKskO_8MGaLFPT-onjyNZQv69jLWp-_CgAyzvl47VEP7cC96kBp1lYiyV0ff9vSFDtbLfob866Rl7aArMYKZZ2Zk0oKvPDEtwKF1HNr_lu4rb66nc2NqUgzzXj37RbhClqxPCI6uyUFxgb8PV1HqgP8L1Mv2eJSA7rF_NAS4MC_dvXLPnQhlzAxpuFq2z"
        ]
      }
    ],
    specifications: [
      "Linen-blend high-durability performance fabric",
      "Hypoallergenic down feather back cushion filling",
      "Heavy-duty solid wood framing construction",
      "Dimensions: 89\"W x 44.9\"D x 37.4\"H"
    ]
  },
  {
    id: "brass-floor-lamp-lumina",
    name: "Brightech Logan LED Arc Floor Lamp",
    designer: "Brightech",
    price: 450,
    category: "Living Room",
    description: "Thin profile brushed brass accent floor lamp with elegant geometric silhouette.",
    longDescription: "An elegant, minimalist floor lamp made of brushed brass and matte black metal. Standing tall in a sparsely decorated space, the warm ambient glow creates majestic atmospheric complexity in high-end living areas.",
    colorSwatches: [
      {
        name: "Brushed Gold",
        value: "#D4AF37",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDZYk-KXouf9FjKzfOiqMZ53ABRq32F9bWkW_Ir2ykHCNDf7e_X0_wo8_ipDjuDjVj5QJkKCS_rMXskAGzMr4dV8OHl8AcEJc0Dk4lWbG_GCWWd0b-e1PWR1CVVYcYIRAxAowAmgaPIQ99pJJpgAfjLcAjd4Il2W4sKGkekGOu63HgK98VBHc8AabkTpB7VoZiAUxJ0BkNeeGhNeFhdNJ-0mt98H9wlmEC3nzKE79uM1LVLDUqSEiCcXNeM7iRypn6aJXSeb3Ez6PZU"
        ]
      }
    ],
    specifications: [
      "Durable brushed brass metal arch",
      "Heavy black marble base preventing tipping",
      "Stately structured linen lampshade dome",
      "Dimensions: 76\" max height, 12\" marble base"
    ]
  },
  {
    id: "walnut-sideboard",
    name: "Walker Edison Mid-Century Modern Wood Sideboard Console",
    designer: "Walker Edison",
    price: 2100,
    category: "Office",
    description: "Sleek reeded sliding door walnut sideboard for modern offices or media rooms.",
    longDescription: "A beautifully detailed reeded walnut sideboard. The warm organic tones of premium walnut contrast elegantly with single sculptural stoneware elements, bringing highly intentional layout organization to minimalist gallery-like settings.",
    colorSwatches: [
      {
        name: "Dark Walnut",
        value: "#6B5041",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAqlQAAF44edqdwAZDHY7Us6FSctXWeV8vlqbIMcgPVkJ_hMkdn8tAw_17SM4lrCT2ahXx23TTbn4LqTU2hz7WTsNtELkAOjDV09yySrXluBZDSy5ko2gjvJGC1Ah3pSyVhzKbSEId4WXuYyhNWNnEQWKMx2F-i6SUIIWkHN46nJHr59fMXP88qvgTKB3_JcUt0ld7lUZ6YWu-maOeUbeeXFALJoelog-IEMKr8bbK50k0tWWGLX9Q39t9e0d7S5U-NdF7ZUEng6dzf"
        ]
      }
    ],
    specifications: [
      "High-grade MDF wood composite with rich walnut veneer",
      "Adjustable wooden interior storage shelving",
      "Smooth modern hardware hinges",
      "Dimensions: 60\"W x 15.75\"D x 30\"H"
    ]
  },
  {
    id: "woven-leather-lounge",
    name: "Christopher Knight Home Woven Accent Chair",
    designer: "Christopher Knight Home",
    price: 1650,
    category: "Living Room",
    description: "Solid teak accent lounge chair woven in espresso full-grain leather straps.",
    longDescription: "A low-slung, mid-century inspired lounge chair featuring woven leather straps in deep espresso brown over a hand-carved solid teak frame. Emphasizes artisanal high craftsmanship and relaxed luxury in curated settings.",
    colorSwatches: [
      {
        name: "Rich Brown Leather",
        value: "#3B2519",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDZEIjFq3kLKmeX3KjjdLqAIIpelwhYMbA8s52JobmE6YYnBByHqPprea8MHUBOVSGUSMGn74SGL46wlpkIRNt3l6gt_xIDSeKP8Jwq6MEcfeXlvQoe5bsc0OjqOe5RNEVtM9fMWdGrSgkEHU2hGNrs-D0q1MVkBJMVMIyqMq8K77aNZpBLN2GczRBaQKBEfKj9P5JoZ8fmLNWRx9iDEsPdiNKlq_qxUQKnjbaBxl7rhaP716PPue7tJUuzDcvDsIa-rYlkc0mQqCVl"
        ]
      }
    ],
    specifications: [
      "Natural premium rubberwood construction",
      "Handcrafted faux leather woven basket weave straps",
      "Comfortable low-pitch angles",
      "Dimensions: 30\"W x 27.5\"D x 29.5\"H"
    ]
  },
  {
    id: "lounge-chair-no-5",
    name: "Rivet Mid-Century Modern Tufted Upholstered Chair",
    designer: "Amazon Rivet",
    price: 1200,
    category: "Living Room",
    description: "Solid walnut wrapped accent chair with sage linen cushioning.",
    longDescription: "A meticulously crafted lounge chair featuring rich sage linen cushions. The organic curves of the warm walnut structure create beautiful shadows, anchoring any high-end living setup.",
    colorSwatches: [
      {
        name: "Sage Green & Beech",
        value: "#5B6955",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuC-XkrkpEVsj9Koca11fkMW_m1x8xxe5cX2RgYGoMSYJms47fOjQlcPozwdLV9rAX4LAEhgBhuU--6hGMFefF1xb9gVMchbzZVWeglnorGzIjAGZ5VT74kxnuna7TnUiIkGWr_tJ-3kXeZnnNk104rdZfK4G7ainW2RQQDDCjMDsIHZbBNLjbefOHJkqaIDOYuD1Q2757H0LQaUKU0YKXybcKx1Kb1l3KinsNKjNnZYVGIPoUJretPx2f8qALxzptKwSBbbfbQjjjVf"
        ]
      }
    ],
    specifications: [
      "High performance stain resistant cotton blend fabric",
      "Sturdy solid wood legs and framing coordinates",
      "Deep supportive tufted back cushion grids",
      "Dimensions: 34.3\"W x 34.3\"D x 35.4\"H"
    ]
  },
  {
    id: "orbital-lamp",
    name: "Sengled Smart Frosted Glass Globe Table Lamp",
    designer: "Sengled",
    price: 180,
    category: "Bedroom",
    description: "Frosted glass globe table lamp sitting beautifully on a golden brass support pillar.",
    longDescription: "A sleek, contemporary table lamp featuring a glowing frosted white glass sphere supported on a solid brushed gold brass support stack. Perfect for placing on bedside marble tables to output beautiful, diffuse luxury glow.",
    colorSwatches: [
      {
        name: "Frosted Glass Globe",
        value: "#F3EAD3",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCPoWRW2zR3-X7UiF2FQ8tmfFqTlJVcZAXIPXNWPMJS9fiGerzAfrJjklpY2YsU0W2nGkm48BdBQF9Szv8wgvq37RlMECtKyOYjxD8m0gbjCNHKsRqIgoUs4rfldPh6S6s6Yan8t_B1iJDxWy4ffQFfMUian4EOKLgk1TavE4xoZuNiwU7HNNqC9AoWwG0WZMIyo8mYg5pwCSp-_XMQLybEfZFQkxBvjrIRwN8FHvePVXZA5_mSGBn9tU9lK7mku4wfjfSfxy8rGQya"
        ]
      }
    ],
    specifications: [
      "Turned sleek gold brass support stack base",
      "Frosted hand-blown white opal glass sphere diffuse",
      "Smart remote control app pairing bulb included",
      "Dimensions: 14\"H, Glass dome 7\" diameter"
    ]
  },
  {
    id: "marble-side-table",
    name: "DHP Round Marble Side Table with Metal Frame",
    designer: "DHP",
    price: 189,
    category: "Bedroom",
    description: "Circular solid marble side table on modern slim iron powder-coated frame.",
    longDescription: "High-key organic bedside table pairing flawless circular natural white Carrara marble top with sleek black iron frame coordinates. Its pure architecture enhances high-end lifestyle standards.",
    colorSwatches: [
      {
        name: "Faux Carrara Marble",
        value: "#EBEBEB",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCITOfAtlE2AQN5QqN118AOwxVSUdxsR0FxakLT6_aRa-zg2BE2ZlB72anMAP3spj7DjSpLYTyAlri4SHm2afEBPcGTk_GZKahhNsBRgl5gs-bYzQFfHsYIYlcVJqi64z_QcOF4DjcKCE9CaA0f7USyj_C7K7x9e6YALdrXDMm3uwthY3rUUaeGdZZil-s0yWeUMnipOVu6VtYkgpUiGdVU5V-T46sDjn_jyCrXPgFIJFxM6O3KQnA3-nGu7U-g2xWI8DT2e694Vh33"
        ]
      }
    ],
    specifications: [
      "Carrara white marble faux pattern laminate countertop",
      "Powder coated black metal cross frame design",
      "Waterproof and exceptionally easy-wipe cleanable",
      "Dimensions: 16\" Diameter x 18.5\" Height"
    ]
  },
  {
    id: "woven-throw-pillow",
    name: "Phantoscope Linen Blend Textured Throw Pillow Covers",
    designer: "Phantoscope",
    price: 45,
    category: "Bedroom",
    description: "Textured weave custom throw pillow in soft natural sage hue.",
    longDescription: "Soft, organic lifestyle accent cushion constructed from thick linen blend yarn in custom sage color. The textured surface filters studio light to emit extreme tactile warmth, bringing subtle layered balance.",
    colorSwatches: [
      {
        name: "Sage Green Cover",
        value: "#7D8C75",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCvkk1_YBHLH5s8R_cjwIX_GUM4iz6h1SMotaq3iXW_Yf7LfFE4488nBhA6GrqJXIWP94R7vF5jsaXHhJrZ_RhXtd8ECPkj3_pneyoufl9Ii-W_MgY-fEUSa2CWfzyLfHZ67K7j5JxldI3r4JAMkkYlSDPwy-LzHFJpVFfpUU4t5WAtk_gjNWfBBM_h60cProJ6UGB_YRtGHIRdapJF1vAtPFTuUZWTYubloYj-ILT9UNRH8ur6v15fFEx5FnM7diYmTxsVW2vn7c34"
        ]
      }
    ],
    specifications: [
      "Natural premium linen and polyester blend weave cover",
      "Pack of 2 pillow covers (inserts not included)",
      "Concealed color matching zipper line",
      "Dimensions: 18\" x 18\" square sizing"
    ]
  }
];

const DEFAULT_ASINS: Record<string, string> = {
  "velvet-accent-chair": "B07521H3T3",
  "minimalist-floor-lamp": "B07H8D339F",
  "ceramic-dinnerware-set": "B089DMYQZ1",
  "matte-black-flatware": "B07D3H1H1L",
  "boucle-armchair": "B09TDFM7J9",
  "charred-oak-table": "B07R11R663",
  "linen-modular-sofa": "B073DFY986",
  "brass-floor-lamp-lumina": "B075MMX1D1",
  "walnut-sideboard": "B07NMS994N",
  "woven-leather-lounge": "B083QPR8N5",
  "lounge-chair-no-5": "B08Z4CKL1M",
  "orbital-lamp": "B08P1Q1TNL",
  "marble-side-table": "B07FYGLMGD",
  "woven-throw-pillow": "B07FMQ8C9F"
};

export const PRODUCTS: Product[] = (RAW_PRODUCTS as any[]).map((p, idx) => {
  const asin = DEFAULT_ASINS[p.id] || `B0MO${idx}TEMP`;
  const affiliateTag = "curatedpin-20";
  const affiliateLink = `https://www.amazon.com/dp/${asin}?tag=${affiliateTag}`;
  return {
    ...p,
    asin,
    affiliateLink,
    pinterestTitle: `${p.name} - Aesthetic ${p.category} Decor Inspo`,
    pinterestDescription: `${p.description} Perfect cozy interior accent. Find details & alternative collections on Amazon.`,
    pinterestMetadata: `og:product:brand=${p.designer};og:product:price:amount=${p.price};og:product:price:currency=USD`
  };
});

export const COLLECTIONS: Collection[] = [
  {
    id: "art-deco-lighting",
    name: "Art Deco Lighting",
    subtitle: "Collection",
    description: "Opulent classic geometric silhouettes pairing exquisite glass and heavy brass coordinates.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCtWcdnq0hJM49NcLZ6Is8GJJCtmzEqLwnADirVB0ewC9dkZhAJDnMOecBQY8fEkKoAOmZcbiiPzmr1vMC-UTtFmc0GZ-efvbNx5FAmmyHwVLutqlJ1Tbt-o1HlA57qUezB2wcdPU1Mwi0GvgowUVqKaLJyxRKQ3BsXWbmWUXCEpfoZ9qxW5_5uRay8CXwtE7DYdq5qhu_ZMif61dTRqeSJDpd_mK23cHCXzXjeaGKzI0zle5Axr0hBQ9XTRI5D7kJFPjaXPlCGIYEJ",
    productIds: ["minimalist-floor-lamp", "brass-floor-lamp-lumina", "orbital-lamp"]
  },
  {
    id: "minimalist-ceramics",
    name: "Minimalist Ceramics",
    subtitle: "Collection",
    description: "Tactile unglazed stoneware in organic sand tones highlighting quiet purity.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCwVPWpr013VxSGeg_AramCf4DGm9MutLOzkJh-IAppz-KpFS-Vp18ib9wFrAuWZ_cBk054j_IizUcheZa6ouqCSSKuk0bW_X7MIN_2OZakURZ8vlCyAhT6bm0lILHNCn68HL2X46sZpzZcNaP51OU3MbhCMv7k7TEqeMfOn57AylbUnvCuZLoM8OgA9WL8Y139sorlTLC-ViLuLS5LxouWdWBJi9-O2-ELURomTVRb6imGnCV_nJ47rKYVfhh2DkfT2xTSoL5O88Rs",
    productIds: ["ceramic-dinnerware-set", "matte-black-flatware"]
  },
  {
    id: "boucle-seating",
    name: "Bouclé Seating",
    subtitle: "Collection",
    description: "Sculpted, low-profile frames wrapped in cloud-like textured woven fabrics.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnQsr7Ed8tCUBmvXYBOP-Uloky4P2znXwK9qPGtWlXaOus8e2oVUMj1aA78aRuMzTyC3pIkEk539voZ7LQ3UQSRT-cKB0tBV09LJFy3_W2p73R_NxpCBUf1EDxkvDvDhn9oAJ3CJh_iKdpiElMaiHiLwIrYAeEb-pTm8wCkvzlZE_WyXwXEn-w9M67mDkq59ph3ZA1wT_ipIV6lBPBFOJxsM9wnXrHdB4VGtjnh7d1zFkWdbc4vcN-ok7q-qk6UkKz6SLCQLbmqM2A",
    productIds: ["boucle-armchair", "lounge-chair-no-5", "velvet-accent-chair"]
  }
];

export const CATEGORIES = ["All", "Living Room", "Kitchen", "Bedroom", "Office"];

export const RECENT_SEARCHES_DEFAULT = [
  "Mid-Century Modern Accent Chair",
  "Round Wood Coffee Table",
  "Matte Black Silverware Set"
];
