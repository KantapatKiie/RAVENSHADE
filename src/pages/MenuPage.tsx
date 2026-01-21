import { useState } from "react";
import { Wine, Utensils } from "lucide-react";
import { Footer } from "../components/Footer";
import { cocktailMenu, foodMenu, MenuItem } from "../data/menuData";

type MenuCategory = "cocktails" | "food";

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
      <Footer />
    </div>
  );
}
