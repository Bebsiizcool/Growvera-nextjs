import { NextResponse } from 'next/server';

const products = [
  {
    id: "hair-oil",
    name: "Growvera Hair Oil",
    category: "Scalp & lengths",
    description:
      "A rich overnight oil with rosemary, amla, coconut, and argan to support softness, scalp comfort, and luminous shine.",
    price: 1399,
    compareAt: 1800,
    size: "100 ml",
    tags: ["Rosemary", "Amla", "Overnight ritual"],
  },
  {
    id: "face-gel",
    name: "Growvera Face Gel",
    category: "Daily hydration",
    description:
      "A cooling aloe and niacinamide gel that feels fresh on the skin, wears well under SPF, and leaves a refined dewy finish.",
    price: 1499,
    compareAt: 1900,
    size: "50 ml",
    tags: ["Aloe vera", "Niacinamide", "Cooling glow"],
  },
  {
    id: "ritual-bundle",
    name: "Growvera Ritual Bundle",
    category: "Best value",
    description:
      "The complete ritual pairing Hair Oil and Face Gel in one premium bundle for gifting, first orders, and full-routine shoppers.",
    price: 2499,
    compareAt: 3000,
    size: "2-piece set",
    tags: ["Bundle save", "Gift ready", "Best seller"],
  }
];

export async function GET() {
  return NextResponse.json(products);
}
