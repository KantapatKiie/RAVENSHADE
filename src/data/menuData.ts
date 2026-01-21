export interface MenuItem {
  name: string;
  description: string;
  price: string;
  category?: string;
}

export const cocktailMenu: MenuItem[] = [
  {
    name: "Aperol Spritz",
    description: "Prosecco, Aperol, soda water",
    price: "320.-",
  },
  {
    name: "Negroni",
    description: "Gin, Campari, sweet red vermouth",
    price: "380.-",
  },
  {
    name: "Old Fashioned",
    description: "Bourbon or rye whiskey, bitters, sugar",
    price: "420.-",
  },
  {
    name: "Espresso Martini",
    description: "Vodka, espresso, Kahlúa, sugar syrup",
    price: "390.-",
  },
  {
    name: "Mojito",
    description: "White rum, mint, lime juice, soda water",
    price: "350.-",
  },
  {
    name: "Margarita",
    description: "Tequila 100% agave, triple sec, fresh lime juice",
    price: "380.-",
  },
  {
    name: "Manhattan",
    description: "Rye whiskey, sweet vermouth, angostura bitters",
    price: "420.-",
  },
  {
    name: "Whiskey Sour",
    description: "Bourbon whiskey, lemon juice, sugar syrup, egg white",
    price: "390.-",
  },
  {
    name: "Gin & Tonic",
    description: "Premium gin, tonic water, lime",
    price: "340.-",
  },
  {
    name: "Martini",
    description: "Gin or vodka, dry vermouth",
    price: "400.-",
  },
  {
    name: "Cosmopolitan",
    description: "Vodka citron, Cointreau, cranberry juice, lime",
    price: "370.-",
  },
  {
    name: "Moscow Mule",
    description: "Vodka, ginger beer, fresh lime juice",
    price: "360.-",
  },
  {
    name: "Daiquiri",
    description: "White Cuban rum, fresh lime juice, sugar",
    price: "350.-",
  },
  {
    name: "Mai Tai",
    description: "Jamaican rum, orange curaçao, orgeat, lime",
    price: "410.-",
  },
  {
    name: "Piña Colada",
    description: "White rum, coconut cream, pineapple juice",
    price: "380.-",
  },
  {
    name: "French 75",
    description: "Gin, lemon juice, sugar syrup, champagne",
    price: "450.-",
  },
  {
    name: "Boulevardier",
    description: "Bourbon, Campari, sweet red vermouth",
    price: "420.-",
  },
  {
    name: "Sazerac",
    description: "Cognac, absinthe, Peychaud's bitters, sugar",
    price: "480.-",
  },
  {
    name: "Paloma",
    description: "Tequila 100% agave, lime, pink grapefruit soda",
    price: "360.-",
  },
  {
    name: "Bellini",
    description: "Fresh peach purée, Prosecco",
    price: "340.-",
  },
  {
    name: "Bloody Mary",
    description: "Vodka, tomato juice, spices, worcestershire sauce",
    price: "380.-",
  },
  {
    name: "Long Island Iced Tea",
    description: "Vodka, tequila, rum, gin, triple sec, cola",
    price: "390.-",
  },
  {
    name: "White Russian",
    description: "Vodka, Kahlúa, heavy cream",
    price: "370.-",
  },
  {
    name: "Caipirinha",
    description: "Cachaça, lime, white cane sugar",
    price: "360.-",
  },
];

export const foodMenu: MenuItem[] = [
  // Cold Cuts & Appetizers
  {
    category: "Cold Cuts & Starters",
    name: "Mix Cheese & Coldcut",
    description: "Selection of premium cheeses and cured meats",
    price: "990.-",
  },
  {
    category: "Cold Cuts & Starters",
    name: "Parma Ham Plate",
    description: "Italian Parma ham, aged to perfection",
    price: "550.-",
  },
  {
    category: "Cold Cuts & Starters",
    name: "Salmon Tartare",
    description: "Fresh salmon, delicately seasoned",
    price: "380.-",
  },
  {
    category: "Cold Cuts & Starters",
    name: "Hotate Yuzu Carpaccio",
    description: "Scallop carpaccio with yuzu dressing",
    price: "550.-",
  },
  {
    category: "Cold Cuts & Starters",
    name: "Beef Tartare",
    description: "Hand-cut premium beef, classic preparation",
    price: "450.-",
  },
  {
    category: "Cold Cuts & Starters",
    name: "Parma Ham with Melon",
    description: "Classic Italian pairing",
    price: "300.-",
  },
  {
    category: "Cold Cuts & Starters",
    name: "Beef Carpaccio",
    description: "Thinly sliced beef, olive oil, parmesan",
    price: "390.-",
  },
  {
    category: "Cold Cuts & Starters",
    name: "Steak Crudo",
    description: "Raw steak Italian style",
    price: "550.-",
  },
  {
    category: "Cold Cuts & Starters",
    name: "Housemade Beef Ham",
    description: "Crafted in-house",
    price: "420.-",
  },
  {
    category: "Cold Cuts & Starters",
    name: "Housemade Pork Ham",
    description: "Crafted in-house",
    price: "380.-",
  },

  // Salads
  {
    category: "Salads",
    name: "Insalata Di Argosta",
    description: "Lobster salad with fresh greens",
    price: "890.-",
  },
  {
    category: "Salads",
    name: "Soft Shell Crab Salad",
    description: "Crispy soft shell crab, mixed greens",
    price: "450.-",
  },
  {
    category: "Salads",
    name: "Beef Tongue Salad",
    description: "Tender beef tongue with seasonal vegetables",
    price: "400.-",
  },
  {
    category: "Salads",
    name: "Wild Rocket Arabiki Sausage Salad",
    description: "Arugula with Japanese sausage",
    price: "280.-",
  },
  {
    category: "Salads",
    name: "Chumporn Salted Fish Flake Salad",
    description: "Thai-style salted fish with fresh herbs",
    price: "350.-",
  },
  {
    category: "Salads",
    name: "Summer Green Salad (V)",
    description: "Fresh seasonal greens",
    price: "320.-",
  },
  {
    category: "Salads",
    name: "Caesar Salad (V)",
    description: "Classic Caesar with house dressing",
    price: "350.-",
  },

  // Soups
  {
    category: "Soups",
    name: "Lobster Bisque",
    description: "Rich and creamy lobster soup",
    price: "850.-",
  },
  {
    category: "Soups",
    name: "Cream of Truffle Soup",
    description: "Velvety truffle cream soup",
    price: "200.-",
  },
  {
    category: "Soups",
    name: "Roasted Tomato Soup",
    description: "Fire-roasted tomatoes, basil",
    price: "180.-",
  },

  // Hot Appetizers
  {
    category: "Hot Appetizers",
    name: "Grilled Beef Tongue",
    description: "Tender grilled beef tongue",
    price: "350.-",
  },
  {
    category: "Hot Appetizers",
    name: "Garlic Prawn in White Wine Sauce",
    description: "Prawns sautéed with garlic and white wine",
    price: "550.-",
  },
  {
    category: "Hot Appetizers",
    name: "The Hints of Truffle Fries",
    description: "Crispy fries with truffle essence",
    price: "200.-",
  },
  {
    category: "Hot Appetizers",
    name: "Grilled Beef Skewers Beetroot Tartare",
    description: "Beef skewers with beetroot tartare",
    price: "400.-",
  },
  {
    category: "Hot Appetizers",
    name: "Calamari Fritti",
    description: "Crispy fried calamari",
    price: "300.-",
  },

  // Main Course - Grilled
  {
    category: "Grilled & Mains",
    name: "Hanger & Bone Marrow",
    description: "Hanger steak with roasted bone marrow",
    price: "1,500.-",
  },
  {
    category: "Grilled & Mains",
    name: "Ranger Valley Ribeye",
    description: "Premium Australian ribeye",
    price: "7 Baht/gram",
  },
  {
    category: "Grilled & Mains",
    name: "New Zealand Lamb Racks",
    description: "Tender lamb racks, perfectly grilled",
    price: "950.-",
  },
  {
    category: "Grilled & Mains",
    name: "Miyazaki Sirloin A4",
    description: "Premium Japanese wagyu sirloin",
    price: "1,800.-",
  },

  // Pasta
  {
    category: "Pasta",
    name: "Linguine Maine Lobster",
    description: "Fresh Maine lobster with linguine",
    price: "2,500.-",
  },
  {
    category: "Pasta",
    name: "Spaghetti Gyukotsu",
    description: "Beef bone broth spaghetti",
    price: "600.-",
  },
  {
    category: "Pasta",
    name: "Tagliatelle Umami Brunch",
    description: "Rich umami flavors with tagliatelle",
    price: "450.-",
  },
  {
    category: "Pasta",
    name: "Pappardelle Nduja Mentaiko",
    description: "Spicy nduja with mentaiko",
    price: "450.-",
  },
  {
    category: "Pasta",
    name: "Creamy Pappardelle House Smoked Beef & Champignon",
    description: "House-smoked beef with mushrooms",
    price: "550.-",
  },
  {
    category: "Pasta",
    name: "Black Ink Linguine with Squid",
    description: "Squid ink pasta with fresh squid",
    price: "380.-",
  },
  {
    category: "Pasta",
    name: "Linguine Arrabbiata (V)",
    description: "Spicy tomato sauce with linguine",
    price: "320.-",
  },
  {
    category: "Pasta",
    name: "Tagliatelle Beef Ragu",
    description: "Slow-cooked beef ragu",
    price: "400.-",
  },
  {
    category: "Pasta",
    name: "Pasta Sua",
    description: "Chef's special pasta creation",
    price: "390.-",
  },
  {
    category: "Pasta",
    name: "Pappardelle Porcini Sage Butter",
    description: "Porcini mushrooms with sage butter",
    price: "420.-",
  },
  {
    category: "Pasta",
    name: "Yee Poon Pasta",
    description: "Thai-fusion pasta with fermented fish",
    price: "420.-",
  },

  // Risotto
  {
    category: "Risotto",
    name: "Risotto Pistachio Pesto Soft Shell Crab",
    description: "Pistachio pesto with crispy soft shell crab",
    price: "550.-",
  },
  {
    category: "Risotto",
    name: "Saffron Risotto & Beef Tongue",
    description: "Saffron-infused risotto with tender beef tongue",
    price: "650.-",
  },
  {
    category: "Risotto",
    name: "Risotto Gamberi Mediterraneo",
    description: "Mediterranean-style prawn risotto",
    price: "450.-",
  },
];
