export type Size = "small" | "medium" | "large";

export type MenuItem = {
  id: string;
  name: string;
  description: string;
  category: "mains" | "sides" | "drinks" | "desserts";
  basePrice: number;
  image: string;
  availableSizes?: Size[];
  availableModifiers?: string[];
  vegetarian?: boolean;
  spicy?: boolean;
};

export const MENU: MenuItem[] = [
  {
    id: "m1",
    name: "Classic Cheeseburger",
    description: "Juicy beef patty with melted cheddar, lettuce, tomato, and our house sauce.",
    category: "mains",
    basePrice: 12.99,
    image: "🍔",
    availableModifiers: ["extra cheese", "bacon", "no onions", "no pickles"],
  },
  {
    id: "m2",
    name: "Spicy Chicken Sandwich",
    description: "Crispy fried chicken breast with jalapeños, sriracha mayo, and pickles.",
    category: "mains",
    basePrice: 11.99,
    image: "🥪",
    spicy: true,
    availableModifiers: ["extra spicy", "no mayo", "add avocado"],
  },
  {
    id: "m3",
    name: "Margherita Pizza",
    description: "Classic tomato base with fresh mozzarella, basil, and extra virgin olive oil.",
    category: "mains",
    basePrice: 14.99,
    image: "🍕",
    vegetarian: true,
    availableModifiers: ["extra cheese", "add mushrooms", "add basil"],
  },
  {
    id: "m4",
    name: "Caesar Salad",
    description: "Crisp romaine lettuce, parmesan, croutons, and classic Caesar dressing.",
    category: "mains",
    basePrice: 9.99,
    image: "🥗",
    vegetarian: true,
    availableModifiers: ["add chicken", "no croutons", "dressing on side"],
  },
  {
    id: "m5",
    name: "French Fries",
    description: "Golden crispy fries seasoned with sea salt.",
    category: "sides",
    basePrice: 4.99,
    image: "🍟",
    vegetarian: true,
    availableSizes: ["small", "medium", "large"],
    availableModifiers: ["cheese sauce", "extra salt", "truffle oil"],
  },
  {
    id: "m6",
    name: "Onion Rings",
    description: "Beer-battered onion rings fried to a golden crisp.",
    category: "sides",
    basePrice: 5.49,
    image: "🧅",
    vegetarian: true,
  },
  {
    id: "m7",
    name: "Coca-Cola",
    description: "Ice-cold classic Coca-Cola.",
    category: "drinks",
    basePrice: 2.99,
    image: "🥤",
    availableSizes: ["small", "medium", "large"],
  },
  {
    id: "m8",
    name: "Water",
    description: "Still mineral water.",
    category: "drinks",
    basePrice: 1.99,
    image: "💧",
    availableSizes: ["small", "medium", "large"],
  },
  {
    id: "m9",
    name: "Iced Coffee",
    description: "Cold brew over ice with your choice of milk.",
    category: "drinks",
    basePrice: 4.49,
    image: "☕",
    availableSizes: ["small", "medium", "large"],
    availableModifiers: ["extra shot", "oat milk", "no sugar"],
  },
  {
    id: "m10",
    name: "Chocolate Brownie",
    description: "Rich, fudgy chocolate brownie baked fresh daily.",
    category: "desserts",
    basePrice: 6.99,
    image: "🍫",
    vegetarian: true,
    availableModifiers: ["add ice cream", "warm it up"],
  },
];

export function findMenuItem(query: string): MenuItem | undefined {
  const q = query.toLowerCase().trim();
  return MENU.find((item) => item.name.toLowerCase().includes(q));
}
