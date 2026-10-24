const shot = (id) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&h=1333&q=80`;

const CARE = "Machine wash cold with like colors. Tumble dry low.";

const C = {
  white: { name: "White", hex: "#f4f4f4" },
  black: { name: "Black", hex: "#1c1c1c" },
  navy: { name: "Navy", hex: "#1e2a44" },
  indigo: { name: "Indigo", hex: "#3a4e78" },
  blush: { name: "Blush", hex: "#e4cfc6" },
  camel: { name: "Camel", hex: "#c2a36b" },
  olive: { name: "Olive", hex: "#5d6246" },
  burgundy: { name: "Burgundy", hex: "#6d3038" },
  heather: { name: "Heather gray", hex: "#b5b5b5" },
  ecru: { name: "Ecru", hex: "#e7dcc8" },
  light: { name: "Light wash", hex: "#c5d4e0" },
  dark: { name: "Dark wash", hex: "#3d4c5e" },
  khaki: { name: "Khaki", hex: "#c4b48a" },
  amber: { name: "Amber", hex: "#c46a2f" },
  sage: { name: "Sage", hex: "#9aab90" },
  yellow: { name: "Yellow", hex: "#e0b000" },
  rust: { name: "Rust", hex: "#b86a45" },
  rose: { name: "Rose", hex: "#d7a99a" },
  taupe: { name: "Taupe", hex: "#a89890" },
};

const ADULT = ["XS", "S", "M", "L", "XL", "XXL"];
const KID = ["XS", "S", "M", "L", "XL"];
const BABY = ["0-3M", "3-6M", "6-12M", "12-18M", "18-24M"];
const TODDLER = ["2T", "3T", "4T", "5T"];

function item(product) {
  let sizes = ADULT;
  if (product.category === "girls" || product.category === "boys") sizes = KID;
  if (product.category === "baby") sizes = BABY;
  if (product.category === "toddler") sizes = TODDLER;
  return { care: CARE, sizes, ...product };
}

export const heroes = {
  women:
    "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&h=1800&q=80",
  men:
    "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=1400&h=1800&q=80",
  denim:
    "https://images.unsplash.com/photo-1604176354204-9268737828e4?auto=format&fit=crop&w=1600&h=1200&q=80",
};

export const categories = [
  {
    id: "women",
    label: "Women",
    blurb: "Denim, shirts, and coats for every day.",
    image: shot("photo-1475178626620-a4d074967452"),
  },
  {
    id: "men",
    label: "Men",
    blurb: "Tees, denim, and layers with an easy fit.",
    image: heroes.men,
  },
  {
    id: "girls",
    label: "Girls",
    blurb: "Soft staples for school and weekends.",
    image: shot("photo-1516627145497-ae6968895b74"),
  },
  {
    id: "boys",
    label: "Boys",
    blurb: "Cardigans, denim, and everyday layers.",
    image: shot("photo-1519238263530-99bdd11df2ea"),
  },
  {
    id: "baby",
    label: "Baby",
    blurb: "Gentle cotton in the smallest sizes.",
    image: shot("photo-1522771930-78848d9293e8"),
  },
  {
    id: "toddler",
    label: "Toddler",
    blurb: "Play clothes with room to move.",
    image: shot("photo-1503919545889-aef636e10ad4"),
  },
];

export const TYPE_ORDER = [
  "Tees",
  "Jeans",
  "Shirts",
  "Sweaters",
  "Fleece",
  "Outerwear",
  "Pants",
  "Blazers",
  "Sets",
  "Bodysuits",
];

export const products = [
  item({
    id: "w-tee",
    name: "Solid Crew Tee",
    price: 24.95,
    category: "women",
    type: "Tees",
    colors: [C.white, C.black, C.navy, C.burgundy],
    image: shot("photo-1562157873-818bc0726f68"),
    photoNote: "Photo shows the core colors.",
    fit: "A straight crew with a rib collar.",
    description: "Heavier cotton in the colors you actually reach for.",
    fabric: "100% cotton.",
    details: ["Rib collar", "Pre-shrunk", "Double-needle hem"],
    isNew: true,
  }),
  item({
    id: "w-jean",
    name: "Light-Wash Straight Jean",
    price: 68,
    compareAt: 98,
    category: "women",
    type: "Jeans",
    colors: [C.light, C.indigo, C.dark],
    image: shot("photo-1475178626620-a4d074967452"),
    fit: "Sits at the waist, straight through the leg.",
    description: "A light wash with a little stretch, worn with a tucked shirt.",
    fabric: "99% cotton, 1% elastane.",
    details: ["Five-pocket", "Button fly", "Sits at the waist"],
  }),
  item({
    id: "w-shirt",
    name: "Star Chambray Shirt",
    price: 54.95,
    category: "women",
    type: "Shirts",
    colors: [C.indigo, C.white],
    image: shot("photo-1596755094514-f87e34085b2c"),
    fit: "Easy through the body, with a standard collar.",
    description: "A chambray button-down scattered with small stars.",
    fabric: "100% cotton chambray.",
    details: ["Button front", "Button cuffs", "Curved hem"],
  }),
  item({
    id: "w-crew",
    name: "Crewneck Sweatshirt",
    price: 59.95,
    category: "women",
    type: "Fleece",
    colors: [C.white, C.heather, C.navy],
    image: shot("photo-1620799140408-edc6dcb6d633"),
    fit: "Relaxed, with a ribbed hem and cuff.",
    description: "A plain crew you can wear on its own or under a jacket.",
    fabric: "80% cotton, 20% polyester.",
    details: ["Rib neck, cuff, and hem", "Fleece back"],
    isNew: true,
  }),
  item({
    id: "w-jacket",
    name: "Sherpa Denim Jacket",
    price: 79,
    compareAt: 118,
    category: "women",
    type: "Outerwear",
    colors: [C.light, C.indigo],
    image: shot("photo-1543076447-215ad9ba6923"),
    fit: "Straight, with a sherpa collar.",
    description: "Washed denim lined with sherpa at the collar.",
    fabric: "100% cotton denim. Sherpa collar.",
    details: ["Button front", "Chest pockets", "Sherpa collar"],
  }),
  item({
    id: "w-coat",
    name: "Camel Wrap Coat",
    price: 148,
    category: "women",
    type: "Outerwear",
    colors: [C.camel, C.black],
    image: shot("photo-1539533018447-63fcce2678e3"),
    fit: "Knee length, with a self belt.",
    description: "A wool wrap coat for the cold months.",
    fabric: "80% wool, 20% nylon.",
    care: "Dry clean.",
    details: ["Notch lapel", "Self belt", "Side pockets"],
    isNew: true,
  }),
  item({
    id: "w-pant",
    name: "Pull-On Pant",
    price: 69.95,
    category: "women",
    type: "Pants",
    colors: [C.rose, C.black, C.olive],
    image: shot("photo-1594633312681-425c7b97ccd1"),
    fit: "Elastic waist, tapered leg.",
    description: "A soft pant with patch pockets, no belt required.",
    fabric: "95% polyester, 5% elastane.",
    details: ["Elastic waist", "Patch pockets", "Cuffed ankle"],
  }),
  item({
    id: "w-set",
    name: "Fleece Set",
    price: 79.95,
    category: "women",
    type: "Fleece",
    colors: [C.yellow, C.heather, C.navy],
    image: shot("photo-1515886657613-9f3515b0c78f"),
    fit: "Cropped hoodie with a relaxed jogger.",
    description: "A matching hoodie and jogger in one bright color.",
    fabric: "80% cotton, 20% polyester.",
    details: ["Hood with drawcord", "Rib cuffs", "Elastic waist jogger"],
    isNew: true,
  }),
  item({
    id: "m-tee",
    name: "Heavyweight Crew Tee",
    price: 24.95,
    category: "men",
    type: "Tees",
    colors: [C.white, C.black, C.heather, C.navy],
    image: shot("photo-1521572163474-6864f9cf17ab"),
    fit: "Standard fit, not too slim.",
    description: "A heavier tee with a collar that stays put.",
    fabric: "100% cotton.",
    details: ["Rib collar", "Pre-shrunk", "Double-needle hem"],
    isNew: true,
  }),
  item({
    id: "m-jean",
    name: "Straight Jean",
    price: 68,
    compareAt: 98,
    category: "men",
    type: "Jeans",
    colors: [C.dark, C.indigo, C.light],
    image: shot("photo-1604176354204-9268737828e4"),
    photoNote: "Photo shows the washes.",
    fit: "Straight from hip to hem.",
    description: "Rigid at first, soft after a few wears.",
    fabric: "100% cotton denim.",
    details: ["Five-pocket", "Button fly", "Sits at the waist"],
  }),
  item({
    id: "m-oxford",
    name: "Stretch Oxford",
    price: 54.95,
    category: "men",
    type: "Shirts",
    colors: [C.white, C.navy],
    image: shot("photo-1603252109303-2751441dd157"),
    fit: "Tailored through the chest, with room at the arm.",
    description: "An oxford you can wear to work and keep on after.",
    fabric: "97% cotton, 3% elastane.",
    details: ["Button-down collar", "Chest pocket", "Rounded hem"],
    isNew: true,
  }),
  item({
    id: "m-chino",
    name: "Slim Chino",
    price: 69.95,
    category: "men",
    type: "Pants",
    colors: [C.khaki, C.navy, C.olive],
    image: shot("photo-1473966968600-fa801b869a1a"),
    fit: "Slim through the leg, with a clean ankle.",
    description: "A cotton chino that pairs with a tee or a denim jacket.",
    fabric: "98% cotton, 2% elastane.",
    details: ["Belt loops", "Side pockets", "Uncuffed hem"],
  }),
  item({
    id: "m-bomber",
    name: "Bomber Jacket",
    price: 98,
    category: "men",
    type: "Outerwear",
    colors: [C.rust, C.navy, C.black],
    image: shot("photo-1591047139829-d91aecb6caea"),
    fit: "Slightly cropped, with a rib hem.",
    description: "A light bomber for the days a coat is too much.",
    fabric: "100% nylon shell. Polyester lining.",
    details: ["Center zip", "Rib collar, cuff, and hem", "Side pockets"],
  }),
  item({
    id: "m-hoodie",
    name: "Fleece Hoodie",
    price: 64.95,
    category: "men",
    type: "Fleece",
    colors: [C.heather, C.navy, C.black],
    image: shot("photo-1556821840-3a63f95609a7"),
    fit: "Relaxed, with a hood that stays up.",
    description: "Brushed fleece, heavy enough for a cool morning.",
    fabric: "80% cotton, 20% polyester.",
    details: ["Kangaroo pocket", "Rib cuffs", "Hood"],
    isNew: true,
  }),
  item({
    id: "g-tee",
    name: "Girls' Striped Tee",
    price: 16.95,
    category: "girls",
    type: "Tees",
    colors: [C.white, C.navy],
    image: shot("photo-1516627145497-ae6968895b74"),
    photoNote: "Photo shows the stripe.",
    fit: "Standard kids' fit.",
    description: "A soft striped tee for school and weekends.",
    fabric: "100% cotton.",
    details: ["Rib collar", "Tag-free neck"],
    isNew: true,
  }),
  item({
    id: "b-cardigan",
    name: "Boys' Cardigan",
    price: 29.95,
    compareAt: 44,
    category: "boys",
    type: "Sweaters",
    colors: [C.navy, C.ecru],
    image: shot("photo-1519238263530-99bdd11df2ea"),
    photoNote: "Shown with a shirt and shorts.",
    fit: "Button front, with a bit of room.",
    description: "A navy cardigan for layering over a collared shirt.",
    fabric: "100% cotton.",
    details: ["Button front", "Rib trim", "Patch pocket"],
  }),
  item({
    id: "b-jacket",
    name: "Boys' Denim Jacket",
    price: 39.95,
    category: "boys",
    type: "Outerwear",
    colors: [C.indigo, C.light],
    image: shot("photo-1514090458221-65bb69cf63e6"),
    photoNote: "Photo shows the denim jacket.",
    fit: "Straight, sized to go over a shirt.",
    description: "A small trucker in washed denim.",
    fabric: "100% cotton denim.",
    details: ["Button front", "Chest pockets"],
  }),
  item({
    id: "y-sherpa",
    name: "Sherpa Bear One-Piece",
    price: 34.95,
    compareAt: 48,
    category: "baby",
    type: "Sets",
    colors: [C.taupe, C.ecru],
    image: shot("photo-1522771930-78848d9293e8"),
    fit: "Hooded, with room to kick.",
    description: "A soft sherpa one-piece with a hood.",
    fabric: "100% polyester sherpa.",
    details: ["Zip front", "Attached hood", "Footed"],
  }),
  item({
    id: "y-knit",
    name: "Knit Two-Piece",
    price: 29.95,
    category: "baby",
    type: "Sets",
    colors: [C.ecru, C.sage],
    image: shot("photo-1515488042361-ee00e0ddd4e4"),
    fit: "Easy pullover top with a pull-on pant.",
    description: "A cream knit set for naps and outings.",
    fabric: "100% cotton.",
    details: ["Pullover top", "Pull-on pant"],
  }),
  item({
    id: "t-rain",
    name: "Hooded Rain Jacket",
    price: 36.95,
    category: "toddler",
    type: "Outerwear",
    colors: [C.yellow, C.navy],
    image: shot("photo-1503919545889-aef636e10ad4"),
    fit: "Hooded, with room for a layer underneath.",
    description: "A bright rain jacket for the walk outside.",
    fabric: "100% polyester.",
    details: ["Attached hood", "Zip front", "Side pockets"],
    isNew: true,
  }),
];

export function getProduct(id) {
  return products.find((product) => product.id === id);
}

export function getCategory(id) {
  return categories.find((category) => category.id === id);
}

export function labelFor(id) {
  if (id === "sale") return "Sale";
  return getCategory(id)?.label || "";
}

export function productsByCategory(id) {
  if (id === "sale") return products.filter((product) => product.compareAt);
  return products.filter((product) => product.category === id);
}

export function searchProducts(query) {
  const needle = query.trim().toLowerCase();
  if (!needle) return [];
  return products.filter((product) => {
    const haystack = [
      product.name,
      product.type,
      product.category,
      product.description,
      product.fit,
      ...product.colors.map((color) => color.name),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(needle);
  });
}
