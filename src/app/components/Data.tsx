// --- Interfaces ---
export interface MenuItemData {
    name: string;
    price: string;
    description?: string;
    image?: string;
}

export interface MenuSubCategory {
    title: string;
    note?: string;
    items: MenuItemData[];
}

type MenuContent =
    | { type: "item"; data: MenuItemData }
    | { type: "subcategory"; data: MenuSubCategory };

export interface MenuSection {
    id: string;
    label: string;
    note?: string;
    content: MenuContent[];
}

const HOT_OR_ICED = "Served Hot or Cold";
const LEMONADE_COCONUTMILK_ENERGYDRINK = "Lemonade, Coconut Milk, Energy Drink";
const PANCAKE_WAFFLE_TOPPINGS =
    "Served with maple syrup • Optional toppings: Fruit & whipped cream";
const BUTTER_SLICE =
    "Served with honey drizzle • Optional: Strawberry or Banana";

export const menuData: MenuSection[] = [
    {
        id: "coffee",
        label: "Coffee",
        content: [
            {
                type: "item",
                data: {
                    name: "Hot Chocolate",
                    price: "₹ 190",
                },
            },
            {
                type: "item",
                data: {
                    name: "Cappuccino",
                    description: HOT_OR_ICED,
                    price: "₹ 210 • ₹ 240",
                },
            },
            {
                type: "subcategory",
                data: {
                    title: "Espresso Classics",
                    items: [
                        {
                            name: "Espresso",
                            description: HOT_OR_ICED,
                            price: "₹ 130",
                        },
                        {
                            name: "Doppio",
                            description: HOT_OR_ICED,
                            price: "₹ 150",
                        },
                        {
                            name: "Lungo",
                            price: "₹ 150",
                        },
                        {
                            name: "Ristretto",
                            description: HOT_OR_ICED,
                            price: "₹ 130 • ₹ 150",
                        },
                        {
                            name: "Cafe Americano",
                            description: HOT_OR_ICED,
                            price: "₹ 160",
                        },
                        {
                            name: "Caffè crema",
                            price: "₹ 170",
                        },
                    ],
                },
            },
            {
                type: "subcategory",
                data: {
                    title: "Latte",
                    note: "(" + HOT_OR_ICED + ")",
                    items: [
                        {
                            name: "Cafe Latte",
                            price: "₹ 190 • ₹ 230",
                        },
                        {
                            name: "Vanilla Latte",
                            price: "₹ 220 • ₹ 260",
                        },
                        {
                            name: "Caramel Brulee Latte",
                            price: "₹ 230 • ₹ 270",
                        },
                        {
                            name: "Pistachio Latte",
                            price: "₹ 240 • ₹ 280",
                        },
                        {
                            name: "Pumpkin Spice Latte",
                            price: "₹ 240 • ₹ 280",
                        },
                        {
                            name: "Cinnamon Dolce Latte",
                            price: "₹ 240 • ₹ 280",
                        },
                        {
                            name: "Gingerbread Latte",
                            price: "₹ 240 • ₹ 280",
                        },
                    ],
                },
            },
            {
                type: "subcategory",
                data: {
                    title: "Flat White",
                    items: [
                        {
                            name: "Flat White",
                            description: HOT_OR_ICED,
                            price: "₹ 230 • ₹ 270",
                        },
                        {
                            name: "Spiced Flat White",
                            price: "₹ 250 • ₹ 290",
                        },
                        {
                            name: "Honey Almond Flat White",
                            price: "₹ 250 • ₹ 290",
                        },
                    ],
                },
            },
            {
                type: "subcategory",
                data: {
                    title: "Cortado",
                    items: [
                        {
                            name: "Cortado",
                            description: HOT_OR_ICED,
                            price: "₹ 200",
                        },
                        {
                            name: "Brown Sugar Cortado",
                            price: "₹ 230",
                        },
                        {
                            name: "Pistachio Cortado",
                            price: "₹ 240",
                        },
                    ],
                },
            },
            {
                type: "subcategory",
                data: {
                    title: "Macchiato",
                    note: "(" + HOT_OR_ICED + ")",
                    items: [
                        {
                            name: "Espresso Macchiato",
                            price: "₹ 160",
                        },
                        {
                            name: "Latte Macchiato",
                            price: "₹ 200 • ₹ 240",
                        },
                        {
                            name: "Caramel Macchiato",
                            price: "₹ 240 • ₹ 280",
                        },
                    ],
                },
            },
            {
                type: "subcategory",
                data: {
                    title: "Mocha",
                    note: "(" + HOT_OR_ICED + ")",
                    items: [
                        {
                            name: "Caffè Mocha",
                            price: "₹ 230 • ₹ 270",
                        },
                        {
                            name: "White Chocolate Mocha",
                            price: "₹ 250 • ₹ 290",
                        },
                    ],
                },
            },
            {
                type: "subcategory",
                data: {
                    title: "Macha",
                    note: "(" + HOT_OR_ICED + ")",
                    items: [
                        {
                            name: "Macha latte",
                            price: "₹ 310 • ₹ 340",
                        },
                        {
                            name: "Pistachio Macha Latte",
                            price: "₹ 330 • ₹ 370",
                        },
                        {
                            name: "Caramel Macha",
                            price: "₹ 330 • ₹ 370",
                        },
                        {
                            name: "Strawberry Macha",
                            price: "₹ 330 • ₹ 370",
                        },
                    ],
                },
            },
            {
                type: "item",
                data: {
                    name: "Cold Brew",
                    price: "₹ 220",
                },
            },
        ],
    },
    {
        id: "appetizer",
        label: "Appetizer",
        content: [
            {
                type: "item",
                data: {
                    name: "Homemade Salsa",
                    price: "₹ 230",
                    description: "Served with chips",
                },
            },
            {
                type: "item",
                data: {
                    name: "Spicy Queso (Cheese) Nachos",
                    price: "₹ 290",
                },
            },
            {
                type: "item",
                data: {
                    name: "Veg Loaded Nachos",
                    price: "₹ 330",
                },
            },
        ],
    },
    {
        id: "avocado-toast",
        label: "Avocado Toast",
        content: [
            {
                type: "item",
                data: {
                    name: "Signature Avocado Toast",
                    price: "₹ 350",
                },
            },
            {
                type: "item",
                data: {
                    name: "Spicy tangy Avocado toast",
                    price: "₹ 360",
                },
            },
            {
                type: "item",
                data: {
                    name: "Veggie Loaded Avocado Toast",
                    price: "₹ 380",
                },
            },
            {
                type: "item",
                data: {
                    name: "Avocado Protein Bomb",
                    price: "₹ 400",
                },
            },
            {
                type: "item",
                data: {
                    name: "Paparika Paneer Avocado Toast",
                    price: "₹ 400",
                },
            },
            {
                type: "item",
                data: {
                    name: "Avocado and Burrata Toast",
                    price: "₹ 520",
                },
            },
        ],
    },
    {
        id: "garlic-bread",
        label: "Garlic Bread",
        content: [
            {
                type: "item",
                data: {
                    name: "Garlic Bread",
                    price: "₹ 190",
                },
            },
            {
                type: "item",
                data: {
                    name: "Cheese Garlic Bread",
                    price: "₹ 230",
                },
            },
            {
                type: "item",
                data: {
                    name: "Masala Garlic Bread",
                    price: "₹ 250",
                },
            },
            {
                type: "item",
                data: {
                    name: "Veggie Garlic Bread",
                    price: "₹ 270",
                },
            },
            {
                type: "item",
                data: {
                    name: "Paneer Cheesy Garlic Bread",
                    price: "₹ 290",
                },
            },
        ],
    },
    {
        id: "sandwiches",
        label: "Sandwiches",
        content: [
            {
                type: "item",
                data: {
                    name: "Cheese Grilled Sandwich",
                    price: "₹ 180",
                },
            },
            {
                type: "item",
                data: {
                    name: "Double Cheese Grilled Sandwich",
                    price: "₹ 220",
                },
            },
            {
                type: "item",
                data: {
                    name: "Veg Cheese Grilled Sandwich",
                    price: "₹ 270",
                },
            },
            {
                type: "item",
                data: {
                    name: "Paneer Masala Grilled Sandwich",
                    price: "₹ 310",
                },
            },
            {
                type: "subcategory",
                data: {
                    title: "Panini",
                    items: [
                        {
                            name: "Veggie Grilled Panini",
                            price: "₹ 280",
                        },
                        {
                            name: "Peri peri Paneer Grilled Panini",
                            price: "₹ 320",
                        },
                    ],
                },
            },
        ],
    },
    {
        id: "pizza",
        label: "Pizza",
        content: [
            {
                type: "item",
                data: {
                    name: "Sailor's Margherita",
                    price: "₹ 350",
                },
            },
            {
                type: "item",
                data: {
                    name: "Garden Farmhouse Pizza",
                    price: "₹ 380",
                },
            },
            {
                type: "item",
                data: {
                    name: "Pav Bhaji Pizza",
                    price: "₹ 380",
                },
            },
            {
                type: "item",
                data: {
                    name: "White Sauce Spinach & Corn Pizza",
                    price: "₹ 390",
                },
            },
            {
                type: "item",
                data: {
                    name: "Mumbai Masala Pizza",
                    price: "₹ 390",
                },
            },
            {
                type: "item",
                data: {
                    name: "Achari Paneer Pizza",
                    price: "₹ 400",
                },
            },
            {
                type: "item",
                data: {
                    name: "Paneer Tikka Royale",
                    price: "₹ 420",
                },
            },
            {
                type: "item",
                data: {
                    name: "BBQ Paneer Pizza",
                    price: "₹ 420",
                },
            },
            {
                type: "item",
                data: {
                    name: "Pesto Paneer Pizza",
                    price: "₹ 440",
                },
            },
        ],
    },
    {
        id: "bakery",
        label: "Bakery & Coffee Sides",
        content: [
            {
                type: "item",
                data: {
                    name: "Chocolate Brownie",
                    price: "₹ 170",
                },
            },
            {
                type: "item",
                data: {
                    name: "Double Chocolate Brownie",
                    price: "₹ 190",
                },
            },
            {
                type: "item",
                data: {
                    name: "Nutella Toast",
                    description: "Choose your topping: Strawberry or Banana",
                    price: "₹ 200",
                },
            },
            {
                type: "item",
                data: {
                    name: "Nutella Rolls",
                    description: "3 pcs",
                    price: "₹ 230",
                },
            },
            {
                type: "item",
                data: {
                    name: "Banana Bread",
                    price: "₹ 190",
                },
            },
            {
                type: "item",
                data: {
                    name: "Peanut Butter Slice",
                    description: BUTTER_SLICE,
                    price: "₹ 150 • ₹ 190",
                },
            },
            {
                type: "item",
                data: {
                    name: "Almond Butter Slice",
                    description: BUTTER_SLICE,
                    price: "₹ 150 • ₹ 190",
                },
            },
            {
                type: "item",
                data: {
                    name: "Cheese Danish Pastry",
                    price: "₹ 230",
                },
            },
            {
                type: "item",
                data: {
                    name: "Raspberry Danish Pastry",
                    price: "₹ 250",
                },
            },
            {
                type: "item",
                data: {
                    name: "Cookie",
                    description:
                        "Chocolate Chip, Macadamia, Double Chocolate Chip",
                    price: "₹ 140 • ₹ 160 • ₹ 180",
                },
            },
            {
                type: "item",
                data: {
                    name: "Butter Croissant",
                    price: "₹ 190",
                },
            },
            {
                type: "item",
                data: {
                    name: "Chocolate Croissant",
                    price: "₹ 210",
                },
            },
        ],
    },
    // {
    //     id: "bagels",
    //     label: "Bagels",
    //     content: [
    //         {
    //             type: "item",
    //             data: {
    //                 name: "Plain Bagel",
    //                 price: "₹ 3",
    //                 // image: "default.png",
    //             },
    //         },
    //         {
    //             type: "item",
    //             data: {
    //                 name: "Everything Bagel",
    //                 price: "₹ 3",
    //                 // image: "default.png",
    //             },
    //         },
    //         {
    //             type: "item",
    //             data: {
    //                 name: "Veggie Bagel",
    //                 description: "Plain or Everything Bagel",
    //                 price: "₹ 3",
    //                 // image: "default.png",
    //             },
    //         },
    //         {
    //             type: "item",
    //             data: {
    //                 name: "Avocado Bagel Toast",
    //                 price: "₹ 3",
    //                 // image: "default.png",
    //             },
    //         },
    //     ],
    // },
    {
        id: "house-special",
        label: "House Special",
        content: [
            {
                type: "item",
                data: {
                    name: "Bruschetta",
                    description: "Served on Baguette",
                    price: "₹ 300",
                },
            },
            {
                type: "item",
                data: {
                    name: "Margherita Flatbread",
                    price: "₹ 300",
                },
            },
            {
                type: "item",
                data: {
                    name: "Hummus Toast",
                    price: "₹ 320",
                },
            },
            {
                type: "item",
                data: {
                    name: "Margherita Caprese Flatbread",
                    price: "₹ 360",
                },
            },
            {
                type: "item",
                data: {
                    name: "Burrata Caprese Sandwich",
                    description: "Served on Baguette",
                    price: "₹ 560",
                },
            },
        ],
    },
    {
        id: "fruit-refreshers",
        label: "Fruit Refreshers",
        note: "Add-ons: Lemonade (+₹30) • Coconut Milk (+₹50) • Energy Drink (+₹80)",
        content: [
            {
                type: "item",
                data: {
                    name: "Guava Chilli Lime",
                    description: "Lemonade",
                    price: "₹ 240",
                },
            },
            {
                type: "item",
                data: {
                    name: "Mango Chilli Lime Refresher",
                    description: "Lemonade",
                    price: "₹ 240",
                },
            },
            {
                type: "item",
                data: {
                    name: "Strawberry Dragon Fruit Refresher",
                    description: LEMONADE_COCONUTMILK_ENERGYDRINK,
                    price: "₹ 240",
                },
            },
            {
                type: "item",
                data: {
                    name: "Mango Dragon Fruit Refresher",
                    description: LEMONADE_COCONUTMILK_ENERGYDRINK,
                    price: "₹ 240",
                },
            },
            {
                type: "item",
                data: {
                    name: "Strawberry Lychee Fruit Refresher",
                    description: LEMONADE_COCONUTMILK_ENERGYDRINK,
                    price: "₹ 250",
                },
            },
            {
                type: "item",
                data: {
                    name: "Rose Lychee Refresher",
                    description: LEMONADE_COCONUTMILK_ENERGYDRINK,
                    price: "₹ 250",
                },
            },
            {
                type: "item",
                data: {
                    name: "Lychee Passion Fruit Refresher",
                    description: LEMONADE_COCONUTMILK_ENERGYDRINK,
                    price: "₹ 270",
                },
            },
            {
                type: "item",
                data: {
                    name: "Coconut Rose Refresher",
                    price: "₹ 300",
                },
            },
            {
                type: "item",
                data: {
                    name: "Mango Guava Coconut Refresher",
                    price: "₹ 310",
                },
            },
            {
                type: "item",
                data: {
                    name: "Pineapple Coconut Fruit Refresher",
                    price: "₹ 310",
                },
            },
            {
                type: "item",
                data: {
                    name: "Blue Pea Lemonade Refresher",
                    price: "₹ 300",
                    description: "Add-on: Energy Drink",
                },
            },
        ],
    },
    {
        id: "dessert",
        label: "Dessert",
        content: [
            {
                type: "item",
                data: {
                    name: "Affogato",
                    price: "₹ 280",
                },
            },
            {
                type: "item",
                data: {
                    name: "Tiramisu Affogato",
                    price: "₹ 300",
                },
            },
            {
                type: "item",
                data: {
                    name: "Shibuya Honey Butter Toast",
                    price: "₹ 400",
                },
            },
            {
                type: "item",
                data: {
                    name: "Nut Butter & Fruit Toast",
                    price: "₹ 290",
                },
            },
            {
                type: "item",
                data: {
                    name: "Pancake",
                    description: PANCAKE_WAFFLE_TOPPINGS,
                    price: "₹ 220 • ₹ 260",
                },
            },
            {
                type: "item",
                data: {
                    name: "Waffle",
                    description: PANCAKE_WAFFLE_TOPPINGS,
                    price: "₹ 250 • ₹ 290",
                },
            },
        ],
    },
];

export const sections = [
    { id: "coffee", label: "Coffee" },
    { id: "appetizer", label: "Appetizer" },
    { id: "avocado-toast", label: "Avocado Toast" },
    { id: "garlic-bread", label: "Garlic Bread" },
    { id: "sandwiches", label: "Sandwiches" },
    { id: "pizza", label: "Pizza" },
    { id: "bakery", label: "Bakery" },
    // { id: "bagels", label: "Bagels" },
    { id: "house-special", label: "House Special" },
    { id: "fruit-refreshers", label: "Fruit Refreshers" },
    { id: "dessert", label: "Dessert" },
];
