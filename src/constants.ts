import { Product, Collection } from "./types";

const RAW_PRODUCTS: Omit<Product, "asin" | "affiliateLink" | "pinterestTitle" | "pinterestDescription" | "pinterestMetadata">[] = [
  {
    id: "velvet-accent-chair",
    name: "Velvet Accent Chair",
    designer: "Atelier Reserve",
    price: 249,
    category: "Living Room",
    isNewArrival: true,
    description: "Modern, curved accent chair with premium soft velvet upholstery and elegant modernist forms.",
    longDescription: "Elevate your living space with our Velvet Accent Chair. Designed with intentionality and a deep appreciation for modernist forms, this piece serves as a quiet anchor in any curated room. The plush velvet upholstery provides a tactile contrast to its structured silhouette, offering both visual atmospheric depth and uncompromising comfort.",
    colorSwatches: [
      {
        name: "Emerald",
        value: "#1A3B32",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCD968xpkN_m3uklvAs5PH0Ur0cnNI7pBK6B694YXGpYy5ok4dX68UhGbg_WK0NRcPtvPVO_oeOhf-uZOB4sYukVxqoICPsfks20zpG4UW7SZiU8ywAbIT56OelhmyHU6AZXmPzYgTshKC_qAv3AMouaZ1z1xT_zck48SFqLCmtzOX8I16gJhef3kqzcq3N_R7YC0ACVpXvCgry_6Y2pmmTVlqDurPkTRf6h-vUH86MWlQyWQmqTtqfYtT6X4pkNZwFYg4PHAya_BmQ",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDDFqASPcKrSBo7-2D-ESDNCUm8dQojnF8WIQ_21SQxkGV7LYWyGQCWTBBc1Sy6lbIqNRotIV_v8OcboOHbsTGdjWRr3y-xqoAHcfZbR587RQtIbjBpnYxGD8lDyxNRPtOvj2Pzuy7AcbMJKCZm1RJOejZoNUg2INuPJRFrkjJNB2Y6OxK9zBrX6EXtc3xGppPEsZmn4umic59oeZojxd6UglZw5dzzMooUY2E-WbMcXv8oOGDl44NKGsBnIU5_FZHdVOKgmZxwkTuX",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDaJ90AAmTVSKC46KE-A19nG_N7bbzOF7Mo2uBwOp4c_EsPTmjr77NbvM7zsj2Tnmm6zWq7LcQLJ5SgkHfIIkQyoo4hVQndLXg7SvTYAql0d47a5vP7VJBq2P9iFEPvdiMk4RCu7TbY5oxJkxOs3SQNlMnLye-V2F_nkYbsKvgszA0J3YDabwPVhOcwSKsSM9JZSx9irYG1Qv6YPI4vd9X67tPx3n5Ztxt8fsulG52wRPQC542M7sFwwMWK2ibulanSfR3FAAu7Mr32"
        ]
      },
      {
        name: "Sand",
        value: "#E5D3B3",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuBXhy1nLzG0HfpJ8XVrQR9nZYWv2-R6APon7wZMM35_fT2fuyoEPWZbPy0yWG38qW5RcqHmknJBp2x4apPSdIsxyAlw2x1GJdFqskpR5Acr84RTfEDPFEv6IZIC7yYZHivsu-N44ah3mwg3EQWRkCi5S4SFo4ZTxnIsRe62IKF50qA-7-e1KJ32SxAFOIHPucieACcxngaB2m20GQeGVOvdqcwsIgEAj8CIOTsdHBwwlSYyscB9fvkpLAloHSLVwC5tYykmRnSbhAPN",
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCF4LwapbmwvadpaSkGLHY21mhWjUiVugEbbOa0PVFI076N5sringJ3iKtaL8H5lj0stx2cqRFxaZKQc3TpGhsn2NZw1uX14oeawCn3479qw-6LoXcCG_KD3C5wqS6BoJRmpbxlvF7D7OKz3FzNWTmJdMp60Jou4QYsK-4TBRpZT2SPaSaY_D6QkzZ1r_0CJF3tXVlRuQeGY9OL4DgWKYaQwPg-9ftwWm4JnlymwuVqiuPQ4yCQZmjL0sVNe0kR55FLkWqhh2ScYHRh"
        ]
      },
      {
        name: "Charcoal",
        value: "#2C302E",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAnQsr7Ed8tCUBmvXYBOP-Uloky4P2znXwK9qPGtWlXaOus8e2oVUMj1aA78aRuMzTyC3pIkEk539voZ7LQ3UQSRT-cKB0tBV09LJFy3_W2p73R_NxpCBUf1EDxkvDvDhn9oAJ3CJh_iKdpiElMaiHiLwIrYAeEb-pTm8wCkvzlZE_WyXwXEn-w9M67mDkq59ph3ZA1wT_ipIV6lBPBFOJxsM9wnXrHdB4VGtjnh7d1zFkWdbc4vcN-ok7q-qk6UkKz6SLCQLbmqM2A"
        ]
      }
    ],
    specifications: [
      "Plush woven velvet upholstery material",
      "Ergonomic curved backrest structure",
      "Slender brass-finished metallic legs",
      "Assembly required: Easy (~15 mins)",
      "Dimensions: 32\"W x 30\"D x 28\"H"
    ]
  },
  {
    id: "minimalist-floor-lamp",
    name: "Minimalist Floor Lamp",
    designer: "Lumina",
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
      "Matte black metal frame",
      "Brushed brass highlight elements",
      "Cord length: 6.5 ft with foot switch",
      "Dimensions: 58\"Height, Base 10\" diameter",
      "Requires standard E26 bulb (~7W LED included)"
    ]
  },
  {
    id: "ceramic-dinnerware-set",
    name: "Ceramic Dinnerware Set",
    designer: "Atelier Reserve",
    price: 89,
    category: "Kitchen",
    description: "Crafted arrange of hand-made artisanal ceramic plates and bowls in muted earth tones.",
    longDescription: "A curated arrangement of handmade, artisanal ceramic plates and bowls in muted earth tones, specifically charcoal and sand glaze finishes. They are stacked perfectly to convey a sense of quiet luxury, rustic authenticity, and intentional minimalist dining aesthetics.",
    colorSwatches: [
      {
        name: "Muted Earth",
        value: "#8F897F",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAAUhxsV2UQlMSY8uo7JwHgjm8jlsp3DtzOdSz0uArneRnYBB1T1ltSI2x6Ik0y80ZXm7GUxoNG-owsp2XbzO8DFfCQ5kIMf6ZNZ6S4Dne_YTA1rjP4qivLjFe2Z-ulPq5YbUEk3pmRa_9ZA03_Su31XWcQ6ew1B7YKQ2n0tsNQbP62hVJUloZBUHfqj0Uxthn2yrifx4hDWuQslpAS-wH6K173qz-KT9GPr7x8OkYe7m4S55quL3uR0AbwqUm0m505IM7pFoA3YnIF"
        ]
      }
    ],
    specifications: [
      "Artisanal stoneware ceramics",
      "Set includes: 4 Dinner Plates, 4 Bowls, 4 Salad Plates",
      "Dishwasher and Microwave safe",
      "Semi-matte premium raw clay glaze"
    ]
  },
  {
    id: "matte-black-flatware",
    name: "Matte Black Flatware",
    designer: "Studio Arp",
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
      "18/10 Stainless steel core",
      "Premium matte black titanium PVD coating",
      "Dishwasher safe & rust resistant",
      "Set of 5 standard utensils: Knife, Dinner Spoon, Fork, Salad Fork, Teaspoon"
    ]
  },
  {
    id: "boucle-armchair",
    name: "The Boucle Armchair",
    designer: "Atelier Reserve",
    price: 1250,
    category: "Living Room",
    description: "Minimalist armchair upholstered in luxurious premium ivory boucle fabric.",
    longDescription: "A high-end, minimalist armchair upholstered in textured ivory boucle fabric. The lighting and shape highlight the organic curves and premium design craftsmanship, creating an exceptionally elegant statement anchor in high-end environments.",
    colorSwatches: [
      {
        name: "Ivory",
        value: "#EFECE6",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDA5bx6ybwg2IDXhwyyiJmeMTdSyfguj0xl5T6xNcSzk6Q9xjKWlAsZvPCsBRk0lutLIjuHnzvcJ5EtJYqeyUv3ENWs9uVqP8Bmu9Pam3pTpGfwf9XNLwCCW0XOGvaIxVmc8rtOJMUf9G0kOfw45V6xg_1ZOSm3S9i0EhO3gQx-poVs36kWRkcf7VngcRxrx08B9tHcvo75oH7S8b3csYC-VPSjubBiMErCpj_n_GFBS9C_OrH7eE__heJIp3KHbJqg7ZuRr1l292g-"
        ]
      }
    ],
    specifications: [
      "Textured premium boucle fabric upholstery",
      "Solid ash wood base structure",
      "Removable sage green plush lumbar accent pillow Included",
      "Dimensions: 34\"W x 34\"D x 30\"H"
    ]
  },
  {
    id: "charred-oak-table",
    name: "Charred Oak Table",
    designer: "Studio Arp",
    price: 890,
    category: "Living Room",
    description: "Low-profile coffee table crafted from beautiful dark blackened charred oak.",
    longDescription: "A sculptural, low-profile coffee table crafted from solid, dark charred oak wood. Embodying geometric architecture blended with minimalist elegance, this piece features strong lines that accentuate organic wood grain and tactile finishes.",
    colorSwatches: [
      {
        name: "Ebonized Oak",
        value: "#121213",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuC3Ha7aBhWpibJGMZPC44w_VDtxtNwkpB91B4182niAEXN4Pc_DiMRT28sFsvBiYpo5MlfRv6nN0_17Qj1EZJ5Y9ijcv-1nXbaO_e5Oai0-7rXYuelsF7YSbaDavtVeW-T-C80dbSrt7mYcdd6axGRtTUav7JC20o_1R8ZJMsRHBrQ-k0KKG8TWpj8Vdt7lBhBvs9H3iphdIG5hn0q8zUNgdS3o1Cbn5Y3AbiuygVn4x8SgcX-PoxbS9sisamHEMLDUffuzF2cKj0Oh"
        ]
      }
    ],
    specifications: [
      "Solid white oak with traditional black Shou Sugi Ban charring",
      "Satin clear-coat protective sealer",
      "Brutalist geometric architectural legs",
      "Dimensions: 42\"W x 42\"D x 14\"H"
    ]
  },
  {
    id: "linen-modular-sofa",
    name: "Linen Modular Sofa",
    designer: "Found Objects",
    price: 3400,
    category: "Living Room",
    isNewArrival: true,
    description: "Premium modular sectional upholstered in beautiful washed linen oatmeal custom fabric.",
    longDescription: "A sprawling modular couch wrapped in premium organic linen. This section features clean layouts and absolute geometric elegance that let the materials breathe, anchoring your living space in serene comfort.",
    colorSwatches: [
      {
        name: "Oatmeal",
        value: "#DACDC3",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDARIFp_BGrj4aFM0YS7R7oyzTlnMRsZsHHqt3_eMsQOtpNSlGOqipg1JnNJ2-Uzb_YbrK-uboFKPw1LtpbKskO_8MGaLFPT-onjyNZQv69jLWp-_CgAyzvl47VEP7cC96kBp1lYiyV0ff9vSFDtbLfob866Rl7aArMYKZZ2Zk0oKvPDEtwKF1HNr_lu4rb66nc2NqUgzzXj37RbhClqxPCI6uyUFxgb8PV1HqgP8L1Mv2eJSA7rF_NAS4MC_dvXLPnQhlzAxpuFq2z"
        ]
      }
    ],
    specifications: [
      "Washed premium ecological linen custom blend",
      "Feather blend down-wrapped luxury cushions",
      "Infinite modular layouts: 3 pieces sectional",
      "Dimensions total: 110\"W x 40\"D x 26\"H"
    ]
  },
  {
    id: "brass-floor-lamp-lumina",
    name: "Brass Floor Lamp",
    designer: "Lumina",
    price: 450,
    category: "Living Room",
    description: "Thin profile brushed brass accent floor lamp with elegant geometric silhouette.",
    longDescription: "An elegant, minimalist floor lamp made of brushed brass and matte black metal. Standing tall in a sparsely decorated space, the warm ambient glow creates majestic atmospheric complexity in high-end living areas.",
    colorSwatches: [
      {
        name: "Brushed Brass",
        value: "#D4AF37",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDZYk-KXouf9FjKzfOiqMZ53ABRq32F9bWkW_Ir2ykHCNDf7e_X0_wo8_ipDjuDjVj5QJkKCS_rMXskAGzMr4dV8OHl8AcEJc0Dk4lWbG_GCWWd0b-e1PWR1CVVYcYIRAxAowAmgaPIQ99pJJpgAfjLcAjd4Il2W4sKGkekGOu63HgK98VBHc8AabkTpB7VoZiAUxJ0BkNeeGhNeFhdNJ-0mt98H9wlmEC3nzKE79uM1LVLDUqSEiCcXNeM7iRypn6aJXSeb3Ez6PZU"
        ]
      }
    ],
    specifications: [
      "Premium solid brass poles",
      "Stark weighted carbon-steel round base",
      "Warm ambient diffuse 3000K bulb included",
      "Dimensions: 63\"H x 12\" Base Diameter"
    ]
  },
  {
    id: "walnut-sideboard",
    name: "Walnut Sideboard",
    designer: "Kura Design",
    price: 2100,
    category: "Office",
    description: "Sleek reeded sliding door walnut sideboard for modern offices or media rooms.",
    longDescription: "A beautifully detailed reeded walnut sideboard. The warm organic tones of premium walnut contrast elegantly with single sculptural stoneware elements, bringing highly intentional layout organization to minimalist gallery-like settings.",
    colorSwatches: [
      {
        name: "Walnut",
        value: "#6B5041",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuAqlQAAF44edqdwAZDHY7Us6FSctXWeV8vlqbIMcgPVkJ_hMkdn8tAw_17SM4lrCT2ahXx23TTbn4LqTU2hz7WTsNtELkAOjDV09yySrXluBZDSy5ko2gjvJGC1Ah3pSyVhzKbSEId4WXuYyhNWNnEQWKMx2F-i6SUIIWkHN46nJHr59fMXP88qvgTKB3_JcUt0ld7lUZ6YWu-maOeUbeeXFALJoelog-IEMKr8bbK50k0tWWGLX9Q39t9e0d7S5U-NdF7ZUEng6dzf"
        ]
      }
    ],
    specifications: [
      "FSC-certified solid American Walnut structure",
      "Sliding reeded timber doors",
      "Soft close magnetic catches",
      "Dimensions: 72\"W x 18\"D x 28\"H"
    ]
  },
  {
    id: "woven-leather-lounge",
    name: "Woven Leather Lounge",
    designer: "Atelier Reserve",
    price: 1650,
    category: "Living Room",
    description: "Solid teak accent lounge chair woven in espresso full-grain leather straps.",
    longDescription: "A low-slung, mid-century inspired lounge chair featuring woven leather straps in deep espresso brown over a hand-carved solid teak frame. Emphasizes artisanal high craftsmanship and relaxed luxury in curated settings.",
    colorSwatches: [
      {
        name: "Espresso",
        value: "#3B2519",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuDZEIjFq3kLKmeX3KjjdLqAIIpelwhYMbA8s52JobmE6YYnBByHqPprea8MHUBOVSGUSMGn74SGL46wlpkIRNt3l6gt_xIDSeKP8Jwq6MEcfeXlvQoe5bsc0OjqOe5RNEVtM9fMWdGrSgkEHU2hGNrs-D0q1MVkBJMVMIyqMq8K77aNZpBLN2GczRBaQKBEfKj9P5JoZ8fmLNWRx9iDEsPdiNKlq_qxUQKnjbaBxl7rhaP716PPue7tJUuzDcvDsIa-rYlkc0mQqCVl"
        ]
      }
    ],
    specifications: [
      "Sustainably sourced natural solid Teak wood frame",
      "Full-grain cowhide leather strap weaves",
      "Comfortable low-pitch angles",
      "Dimensions: 26\"W x 31\"D x 29\"H"
    ]
  },
  {
    id: "lounge-chair-no-5",
    name: "Lounge Chair No. 5",
    designer: "Studio Arp",
    price: 1200,
    category: "Living Room",
    description: "Solid walnut wrapped accent chair with sage linen cushioning.",
    longDescription: "A meticulously crafted lounge chair featuring rich sage linen cushions. The organic curves of the warm walnut structure create beautiful shadows, anchoring any high-end living setup.",
    colorSwatches: [
      {
        name: "Sage & Walnut",
        value: "#5B6955",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuC-XkrkpEVsj9Koca11fkMW_m1x8xxe5cX2RgYGoMSYJms47fOjQlcPozwdLV9rAX4LAEhgBhuU--6hGMFefF1xb9gVMchbzZVWeglnorGzIjAGZ5VT74kxnuna7TnUiIkGWr_tJ-3kXeZnnNk104rdZfK4G7ainW2RQQDDCjMDsIHZbBNLjbefOHJkqaIDOYuD1Q2757H0LQaUKU0YKXybcKx1Kb1l3KinsNKjNnZYVGIPoUJretPx2f8qALxzptKwSBbbfbQjjjVf"
        ]
      }
    ],
    specifications: [
      "Washed natural Belgian linen in custom Sage tone",
      "Premium American walnut solid wood surround",
      "Resilient high-density comfort core fill",
      "Dimensions: 30\"W x 32\"D x 29\"H"
    ]
  },
  {
    id: "orbital-lamp",
    name: "Orbital Lamp",
    designer: "Lumina",
    price: 180,
    category: "Bedroom",
    description: "Frosted glass globe table lamp sitting beautifully on a golden brass support pillar.",
    longDescription: "A sleek, contemporary table lamp featuring a glowing frosted white glass sphere supported on a solid brushed gold brass support stack. Perfect for placing on bedside marble tables to output beautiful, diffuse luxury glow.",
    colorSwatches: [
      {
        name: "Gold & Frosted Glass",
        value: "#F3EAD3",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCPoWRW2zR3-X7UiF2FQ8tmfFqTlJVcZAXIPXNWPMJS9fiGerzAfrJjklpY2YsU0W2nGkm48BdBQF9Szv8wgvq37RlMECtKyOYjxD8m0gbjCNHKsRqIgoUs4rfldPh6S6s6Yan8t_B1iJDxWy4ffQFfMUian4EOKLgk1TavE4xoZuNiwU7HNNqC9AoWwG0WZMIyo8mYg5pwCSp-_XMQLybEfZFQkxBvjrIRwN8FHvePVXZA5_mSGBn9tU9lK7mku4wfjfSfxy8rGQya"
        ]
      }
    ],
    specifications: [
      "Solid turned heavy brass base columns",
      "Handblown white opal frosted glass sphere shade",
      "Requires standard socket G9 bulb (LED included)",
      "Dimensions: 14\"Height, Globe 6.5\" Diameter"
    ]
  },
  {
    id: "marble-side-table",
    name: "Marble Side Table",
    designer: "Minimalist Collective",
    price: 189,
    category: "Bedroom",
    description: "Circular solid marble side table on modern slim iron powder-coated frame.",
    longDescription: "High-key organic bedside table pairing flawless circular natural white Carrara marble top with sleek black iron frame coordinates. Its pure architecture enhances high-end lifestyle standards.",
    colorSwatches: [
      {
        name: "Carrara White",
        value: "#EBEBEB",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCITOfAtlE2AQN5QqN118AOwxVSUdxsR0FxakLT6_aRa-zg2BE2ZlB72anMAP3spj7DjSpLYTyAlri4SHm2afEBPcGTk_GZKahhNsBRgl5gs-bYzQFfHsYIYlcVJqi64z_QcOF4DjcKCE9CaA0f7USyj_C7K7x9e6YALdrXDMm3uwthY3rUUaeGdZZil-s0yWeUMnipOVu6VtYkgpUiGdVU5V-T46sDjn_jyCrXPgFIJFxM6O3KQnA3-nGu7U-g2xWI8DT2e694Vh33"
        ]
      }
    ],
    specifications: [
      "Natural premium white Carrara honed marble slab",
      "Powder coated slender structural iron legs",
      "Each marble slab features completely unique visual veining",
      "Dimensions: 16\" Diameter x 18.5\" Height"
    ]
  },
  {
    id: "woven-throw-pillow",
    name: "Woven Throw Pillow",
    designer: "Atelier Reserve",
    price: 45,
    category: "Bedroom",
    description: "Textured weave custom structural throw pillow in soft natural sage hue.",
    longDescription: "Soft, organic lifestyle accent cushion constructed from thick linen blend yarn in custom sage color. The textured surface filters studio light to emit extreme tactile warmth, bringing subtle layered balance.",
    colorSwatches: [
      {
        name: "Sage Green",
        value: "#7D8C75",
        images: [
          "https://lh3.googleusercontent.com/aida-public/AB6AXuCvkk1_YBHLH5s8R_cjwIX_GUM4iz6h1SMotaq3iXW_Yf7LfFE4488nBhA6GrqJXIWP94R7vF5jsaXHhJrZ_RhXtd8ECPkj3_pneyoufl9Ii-W_MgY-fEUSa2CWfzyLfHZ67K7j5JxldI3r4JAMkkYlSDPwy-LzHFJpVFfpUU4t5WAtk_gjNWfBBM_h60cProJ6UGB_YRtGHIRdapJF1vAtPFTuUZWTYubloYj-ILT9UNRH8ur6v15fFEx5FnM7diYmTxsVW2vn7c34"
        ]
      }
    ],
    specifications: [
      "Heavy handwoven chunky cotton/linen thread blend",
      "Hidden low-profile matching brass YKK zipper closure",
      "Hypoallergenic duck down synthetic luxury insert included",
      "Dimensions: 20\" x 20\" square"
    ]
  }
];

const DEFAULT_ASINS: Record<string, string> = {
  "velvet-accent-chair": "B0B859N6XG",
  "minimalist-floor-lamp": "B07T87H97L",
  "ceramic-dinnerware-set": "B089DMYQZ1",
  "matte-black-flatware": "B07FBK9G9Y",
  "boucle-armchair": "B09MLT2W8D",
  "charred-oak-table": "B09HSD17C1",
  "linen-modular-sofa": "B0BD5Q5S2W",
  "brass-floor-lamp-lumina": "B08HGPD8B4",
  "walnut-sideboard": "B08YXZ7W6H",
  "woven-leather-lounge": "B09B1KLN5C",
  "lounge-chair-no-5": "B08Z4CKL1M",
  "orbital-lamp": "B09CL63F56",
  "marble-side-table": "B08P5KCRB3",
  "woven-throw-pillow": "B08HMRM8D4"
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
    description: "Scuplted, low-profile frames wrapped in cloud-like textured woven fabrics.",
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAnQsr7Ed8tCUBmvXYBOP-Uloky4P2znXwK9qPGtWlXaOus8e2oVUMj1aA78aRuMzTyC3pIkEk539voZ7LQ3UQSRT-cKB0tBV09LJFy3_W2p73R_NxpCBUf1EDxkvDvDhn9oAJ3CJh_iKdpiElMaiHiLwIrYAeEb-pTm8wCkvzlZE_WyXwXEn-w9M67mDkq59ph3ZA1wT_ipIV6lBPBFOJxsM9wnXrHdB4VGtjnh7d1zFkWdbc4vcN-ok7q-qk6UkKz6SLCQLbmqM2A",
    productIds: ["boucle-armchair", "lounge-chair-no-5", "velvet-accent-chair"]
  }
];

export const CATEGORIES = ["All", "Living Room", "Kitchen", "Bedroom", "Office", "Outdoor"];

export const RECENT_SEARCHES_DEFAULT = [
  "Mid-Century Modern Lounge Chair",
  "Travertine Coffee Tables",
  "Matte Black Flatware"
];
