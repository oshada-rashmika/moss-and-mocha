import { MainCategory, PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  throw new Error("DATABASE_URL is required to run prisma seed.");
}

const pool = new Pool({ connectionString: databaseUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

type SeedProduct = {
  id: string;
  name: string;
  price: number;
  mainCategory: MainCategory;
  subCategory: string;
  isSpecial?: boolean;
};

const imageFor = (productName: string): string =>
  `https://placehold.co/600x400?text=${encodeURIComponent(productName)}`;

const products: SeedProduct[] = [
  // BREWS -> Pacific Cold Brews
  {
    id: "brews-pacific-cold-brews-coconut-cold-brew",
    name: "Coconut Tide Cold Brew",
    price: 520.0,
    mainCategory: MainCategory.BREWS,
    subCategory: "Pacific Cold Brews",
  },
  {
    id: "brews-pacific-cold-brews-macadamia-cold-brew",
    name: "Macadamia Wave Brew",
    price: 560.0,
    mainCategory: MainCategory.BREWS,
    subCategory: "Pacific Cold Brews",
  },
  {
    id: "brews-pacific-cold-brews-sea-salt-cold-brew",
    name: "Sea Salt Twilight Brew",
    price: 590.0,
    mainCategory: MainCategory.BREWS,
    subCategory: "Pacific Cold Brews",
    isSpecial: true,
  },

  // BREWS -> Island Espresso Creations
  {
    id: "brews-island-espresso-creations-ohana-shot",
    name: "Ohana Espresso Shot",
    price: 470.0,
    mainCategory: MainCategory.BREWS,
    subCategory: "Island Espresso Creations",
  },
  {
    id: "brews-island-espresso-creations-volcano-caramel",
    name: "Volcano Caramel Espresso",
    price: 610.0,
    mainCategory: MainCategory.BREWS,
    subCategory: "Island Espresso Creations",
  },
  {
    id: "brews-island-espresso-creations-tropical-rain-shot",
    name: "Tropical Rain Double",
    price: 680.0,
    mainCategory: MainCategory.BREWS,
    subCategory: "Island Espresso Creations",
    isSpecial: true,
  },

  // BREWS -> Hibiscus Infused Lattes
  {
    id: "brews-hibiscus-infused-lattes-sunset-latte",
    name: "Hibiscus Sunset Latte",
    price: 640.0,
    mainCategory: MainCategory.BREWS,
    subCategory: "Hibiscus Infused Lattes",
  },
  {
    id: "brews-hibiscus-infused-lattes-rose-foam-latte",
    name: "Rose Foam Hibiscus Latte",
    price: 690.0,
    mainCategory: MainCategory.BREWS,
    subCategory: "Hibiscus Infused Lattes",
  },
  {
    id: "brews-hibiscus-infused-lattes-pink-moon-latte",
    name: "Pink Moon Hibiscus Latte",
    price: 730.0,
    mainCategory: MainCategory.BREWS,
    subCategory: "Hibiscus Infused Lattes",
    isSpecial: true,
  },

  // BOTANICALS -> Monstera Mists
  {
    id: "botanicals-monstera-mists-jade-monstera-mist",
    name: "Jade Monstera Mist",
    price: 780.0,
    mainCategory: MainCategory.BOTANICALS,
    subCategory: "Monstera Mists",
  },
  {
    id: "botanicals-monstera-mists-tropical-canopy-mist",
    name: "Tropical Canopy Mist",
    price: 820.0,
    mainCategory: MainCategory.BOTANICALS,
    subCategory: "Monstera Mists",
  },
  {
    id: "botanicals-monstera-mists-midnight-leaf-mist",
    name: "Midnight Leaf Mist",
    price: 860.0,
    mainCategory: MainCategory.BOTANICALS,
    subCategory: "Monstera Mists",
    isSpecial: true,
  },

  // BOTANICALS -> Lava-Soil Succulents
  {
    id: "botanicals-lava-soil-succulents-ember-succulent",
    name: "Ember Succulent Pot",
    price: 900.0,
    mainCategory: MainCategory.BOTANICALS,
    subCategory: "Lava-Soil Succulents",
  },
  {
    id: "botanicals-lava-soil-succulents-basalt-bloom",
    name: "Basalt Bloom Succulent",
    price: 980.0,
    mainCategory: MainCategory.BOTANICALS,
    subCategory: "Lava-Soil Succulents",
  },
  {
    id: "botanicals-lava-soil-succulents-magma-mini-garden",
    name: "Magma Mini Garden",
    price: 1120.0,
    mainCategory: MainCategory.BOTANICALS,
    subCategory: "Lava-Soil Succulents",
    isSpecial: true,
  },

  // BOTANICALS -> Rainforest Ferns
  {
    id: "botanicals-rainforest-ferns-misty-fern-bundle",
    name: "Misty Fern Bundle",
    price: 740.0,
    mainCategory: MainCategory.BOTANICALS,
    subCategory: "Rainforest Ferns",
  },
  {
    id: "botanicals-rainforest-ferns-emerald-fern-set",
    name: "Emerald Fern Set",
    price: 810.0,
    mainCategory: MainCategory.BOTANICALS,
    subCategory: "Rainforest Ferns",
  },
  {
    id: "botanicals-rainforest-ferns-riverbank-fern",
    name: "Riverbank Fern Collection",
    price: 930.0,
    mainCategory: MainCategory.BOTANICALS,
    subCategory: "Rainforest Ferns",
    isSpecial: true,
  },

  // AESTHETIC_LABELS -> Artisanal Ohana Blends
  {
    id: "aesthetic-artisanal-ohana-blends-coastal-label-kit",
    name: "Coastal Ohana Label Kit",
    price: 450.0,
    mainCategory: MainCategory.AESTHETIC_LABELS,
    subCategory: "Artisanal Ohana Blends",
  },
  {
    id: "aesthetic-artisanal-ohana-blends-vintage-blend-tag",
    name: "Vintage Blend Signature Tag",
    price: 520.0,
    mainCategory: MainCategory.AESTHETIC_LABELS,
    subCategory: "Artisanal Ohana Blends",
  },
  {
    id: "aesthetic-artisanal-ohana-blends-handcrafted-series",
    name: "Handcrafted Ohana Series",
    price: 610.0,
    mainCategory: MainCategory.AESTHETIC_LABELS,
    subCategory: "Artisanal Ohana Blends",
    isSpecial: true,
  },

  // AESTHETIC_LABELS -> Botanical Bites
  {
    id: "aesthetic-botanical-bites-garden-mark-collection",
    name: "Garden Mark Collection",
    price: 470.0,
    mainCategory: MainCategory.AESTHETIC_LABELS,
    subCategory: "Botanical Bites",
  },
  {
    id: "aesthetic-botanical-bites-floral-note-set",
    name: "Floral Note Label Set",
    price: 540.0,
    mainCategory: MainCategory.AESTHETIC_LABELS,
    subCategory: "Botanical Bites",
  },
  {
    id: "aesthetic-botanical-bites-jungle-accent-pack",
    name: "Jungle Accent Pack",
    price: 620.0,
    mainCategory: MainCategory.AESTHETIC_LABELS,
    subCategory: "Botanical Bites",
    isSpecial: true,
  },

  // BARISTA_CLASSICS
  {
    id: "barista-classics-americano",
    name: "Americano",
    price: 480.0,
    mainCategory: MainCategory.BARISTA_CLASSICS,
    subCategory: "Americano",
  },
  {
    id: "barista-classics-mocha",
    name: "Mocha",
    price: 620.0,
    mainCategory: MainCategory.BARISTA_CLASSICS,
    subCategory: "Mocha",
  },
  {
    id: "barista-classics-cappuccino",
    name: "Cappuccino",
    price: 560.0,
    mainCategory: MainCategory.BARISTA_CLASSICS,
    subCategory: "Cappuccino",
  },
  {
    id: "barista-classics-latte",
    name: "Latte",
    price: 590.0,
    mainCategory: MainCategory.BARISTA_CLASSICS,
    subCategory: "Latte",
  },
  {
    id: "barista-classics-flat-white",
    name: "Flat White",
    price: 610.0,
    mainCategory: MainCategory.BARISTA_CLASSICS,
    subCategory: "Flat White",
  },
];

async function main() {
  for (const product of products) {
    await prisma.product.upsert({
      where: { id: product.id },
      update: {
        name: product.name,
        price: product.price,
        image: imageFor(product.name),
        mainCategory: product.mainCategory,
        subCategory: product.subCategory,
        isSpecial: product.isSpecial ?? false,
      },
      create: {
        id: product.id,
        name: product.name,
        price: product.price,
        image: imageFor(product.name),
        mainCategory: product.mainCategory,
        subCategory: product.subCategory,
        isSpecial: product.isSpecial ?? false,
      },
    });
  }

  console.log(`Seeded ${products.length} products.`);
}

main()
  .catch((error) => {
    console.error("Seeding failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
