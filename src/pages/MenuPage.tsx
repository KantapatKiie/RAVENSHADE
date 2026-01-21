import { useState } from "react";
import { Wine, Utensils } from "lucide-react";

type MenuCategory = "cocktails" | "food";

interface MenuItem {
  name: string;
  description: string;
  price: string;
  category?: string;
}

const cocktailMenu: MenuItem[] = [
  {
    name: "Ravenshade Signature",
    description:
      "Whiskey, amaretto, fresh lemon, egg white, activated charcoal",
    price: "₿420",
  },
  {
    name: "Golden Hour",
    description: "Gin, elderflower, champagne, gold flakes",
    price: "₿380",
  },
  {
    name: "Midnight Eclipse",
    description: "Vodka, black raspberry, lime, prosecco",
    price: "₿350",
  },
  {
    name: "Thai Sunset",
    description: "Rum, thai basil, passion fruit, coconut cream",
    price: "₿340",
  },
  {
    name: "Smoke & Mirrors",
    description: "Mezcal, aperol, grapefruit, rosemary smoke",
    price: "₿390",
  },
  {
    name: "Velvet Noir",
    description: "Cognac, coffee liqueur, vanilla, cream",
    price: "₿360",
  },
];

const foodMenu: MenuItem[] = [
  {
    category: "Appetizers",
    name: "Truffle Wagyu Sliders",
    description: "Premium wagyu, truffle aioli, caramelized onions",
    price: "₿580",
  },
  {
    category: "Appetizers",
    name: "Crispy Duck Tacos",
    description: "Confit duck, hoisin glaze, cucumber, sesame",
    price: "₿420",
  },
  {
    category: "Appetizers",
    name: "Tuna Tartare",
    description: "Sashimi-grade tuna, avocado, crispy wonton, yuzu",
    price: "₿480",
  },
  {
    category: "Main Course",
    name: "Grilled Ribeye Steak",
    description: "300g premium ribeye, roasted vegetables, red wine jus",
    price: "₿1,280",
  },
  {
    category: "Main Course",
    name: "Miso Glazed Salmon",
    description: "Norwegian salmon, bok choy, shiitake, miso butter",
    price: "₿890",
  },
  {
    category: "Main Course",
    name: "Truffle Mushroom Risotto",
    description: "Arborio rice, wild mushrooms, parmesan, truffle oil",
    price: "₿680",
  },
  {
    category: "Desserts",
    name: "Dark Chocolate Lava Cake",
    description: "Molten chocolate center, vanilla ice cream, berries",
    price: "₿320",
  },
  {
    category: "Desserts",
    name: "Mango Sticky Rice Deconstructed",
    description: "Thai sweet rice, fresh mango, coconut foam, sesame crisp",
    price: "₿280",
  },
];

export function MenuPage() {
  const [activeCategory, setActiveCategory] =
    useState<MenuCategory>("cocktails");

  const groupedFood = foodMenu.reduce(
    (acc, item) => {
      const cat = item.category || "Other";
      if (!acc[cat]) acc[cat] = [];
      acc[cat].push(item);
      return acc;
    },
    {} as Record<string, MenuItem[]>,
  );

  return (
    <div className="min-h-screen bg-neutral-950 pt-20 animate-fade-in">
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-16">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="font-serif text-5xl md:text-6xl text-white mb-4 tracking-wide">
            Our Menu
          </h1>
          <p className="text-neutral-400 text-lg tracking-wider">
            Curated selections for an unforgettable experience
          </p>
        </div>

        {/* Category Toggle */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => setActiveCategory("cocktails")}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg transition-all duration-300 ${
              activeCategory === "cocktails"
                ? "bg-amber-500 text-neutral-950"
                : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            <Wine className="h-5 w-5" />
            <span className="font-medium tracking-wider">COCKTAILS</span>
          </button>
          <button
            onClick={() => setActiveCategory("food")}
            className={`flex items-center gap-2 px-8 py-3 rounded-lg transition-all duration-300 ${
              activeCategory === "food"
                ? "bg-amber-500 text-neutral-950"
                : "bg-neutral-900 text-neutral-400 hover:bg-neutral-800 hover:text-white"
            }`}
          >
            <Utensils className="h-5 w-5" />
            <span className="font-medium tracking-wider">FOOD</span>
          </button>
        </div>

        {/* Cocktails Menu */}
        {activeCategory === "cocktails" && (
          <div className="grid md:grid-cols-2 gap-8">
            {cocktailMenu.map((item, index) => (
              <div
                key={index}
                className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-6 hover:border-amber-500/30 transition-all duration-300 group"
              >
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-serif text-xl text-white group-hover:text-amber-400 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-amber-500 font-medium">
                    {item.price}
                  </span>
                </div>
                <p className="text-neutral-400 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Food Menu */}
        {activeCategory === "food" && (
          <div className="space-y-12">
            {Object.entries(groupedFood).map(([category, items]) => (
              <div key={category}>
                <h2 className="font-serif text-3xl text-amber-400 mb-6 border-b border-neutral-800 pb-3">
                  {category}
                </h2>
                <div className="grid md:grid-cols-2 gap-8">
                  {items.map((item, index) => (
                    <div
                      key={index}
                      className="bg-neutral-900/50 backdrop-blur-sm border border-neutral-800 rounded-lg p-6 hover:border-amber-500/30 transition-all duration-300 group"
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="font-serif text-xl text-white group-hover:text-amber-400 transition-colors">
                          {item.name}
                        </h3>
                        <span className="text-amber-500 font-medium">
                          {item.price}
                        </span>
                      </div>
                      <p className="text-neutral-400 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="w-full bg-neutral-950 py-12 border-t border-neutral-900 text-center">
        <p className="text-neutral-500 text-xs tracking-[0.2em] uppercase">
          © {new Date().getFullYear()} Ravenshade Thonglor. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
