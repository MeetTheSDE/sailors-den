import { useEffect, useRef, useState } from "react";
import { MenuItem } from "./components/MenuItem";
import { SectionNav } from "./components/SectionNav";

// --- Interfaces ---
interface MenuItemData {
    name: string;
    price: string;
    description?: string;
}

interface MenuSubCategory {
    title: string;
    note?: string;
    items: MenuItemData[];
}

interface MenuSection {
    id: string;
    label: string;
    note?: string;
    items?: MenuItemData[];
    subcategories?: MenuSubCategory[];
}

// --- Data ---
const menuData: MenuSection[] = [
    {
        id: "hot-beverages",
        label: "Hot Beverages",
        items: [{ name: "Hot Chocolate", price: "$3.00" }],
        subcategories: [
            {
                title: "Espresso",
                items: [
                    { name: "Doppio", price: "$3.00" },
                    { name: "Lungo", price: "$3.00" },
                    { name: "Ristretto", price: "$3.00" },
                    { name: "Cafe Americano", price: "$3.00" },
                ],
            },
            {
                title: "Latte",
                items: [
                    { name: "Cafe Latte", price: "$3.00" },
                    { name: "Pistachio Latte", price: "$3.00" },
                    { name: "Caramel Brulee Latte", price: "$3.00" },
                    { name: "Gingerbread Latte", price: "$3.00" },
                    { name: "Vanilla Latte", price: "$3.00" },
                    { name: "Cinnamon Dolce Latte", price: "$3.00" },
                    { name: "Pumpkin Spice Latte", price: "$3.00" },
                ],
            },
        ],
    },
    {
        id: "cold-beverages",
        label: "Cold Beverages",
        note: "Everything in hot can be made iced",
        items: [{ name: "Strawberry Matcha Latte", price: "$3.00" }],
    },
    {
        id: "appetizer",
        label: "Appetizer",
        items: [
            {
                name: "Homemade Salsa",
                price: "$3.00",
                description: "served with chips",
            },
            { name: "Spicy Queso (Cheese) Nachos", price: "$3.00" },
            { name: "Veg Loaded Nachos", price: "$3.00" },
        ],
    },
    {
        id: "sandwich",
        label: "Sandwich",
        items: [
            { name: "Cheese Grilled Sandwich", price: "$3.00" },
            { name: "Double Cheese Grilled Sandwich", price: "$3.00" },
            { name: "Veg Cheese Grilled Sandwich", price: "$3.00" },
            { name: "Paneer Masala Grilled Sandwich", price: "$3.00" },
        ],
    },
    {
        id: "panini",
        label: "Panini",
        items: [],
    },
    {
        id: "pizza",
        label: "Pizza",
        items: [
            { name: "Fondue Pizza - Cheese", price: "$3.00" },
            { name: "Fondue Pizza - Veg", price: "$3.00" },
        ],
    },
    {
        id: "garlic-bread",
        label: "Avocado Toast & Garlic Bread",
        subcategories: [
            {
                title: "Avocado Toast",
                note: "(Sourdough bread)",
                items: [
                    { name: "Avocado Toast", price: "$3.00" },
                    { name: "Veg. Avocado Toast", price: "$3.00" },
                    { name: "Avocado and Burrata Toast", price: "$3.00" },
                ],
            },
            {
                title: "Garlic Bread",
                items: [
                    { name: "Garlic Bread", price: "$3.00" },
                    { name: "Cheese Garlic Bread", price: "$3.00" },
                    {
                        name: "Masala Garlic Bread",
                        price: "$3.00",
                        description: "Green marchi, leela dhana, white onion",
                    },
                ],
            },
        ],
    },
    {
        id: "bakery",
        label: "Bakery (Coffee Sides)",
        items: [
            { name: "Nutella Bread", price: "$3.00" },
            { name: "Banana Bread", price: "$3.00" },
            { name: "Butter Croissant", price: "$3.00" },
            { name: "Chocolate Croissant", price: "$3.00" },
        ],
    },
    {
        id: "bagels",
        label: "Bagels",
        items: [
            { name: "Plain Bagel", price: "$3.00" },
            { name: "Everything Bagel", price: "$3.00" },
            { name: "Asiago Bagel", price: "$3.00" },
        ],
    },
    {
        id: "house-special",
        label: "House Special",
        items: [
            { name: "Hummus Toast", price: "$3.00" },
            { name: "Margherita Caprese Flatbread", price: "$3.00" },
        ],
    },
    {
        id: "dessert",
        label: "Dessert",
        items: [
            { name: "Affogato", price: "$3.00" },
            { name: "Shibuya Toast", price: "$3.00" },
        ],
    },
    {
        id: "breakfast",
        label: "Breakfast Items",
        items: [
            { name: "Plain Pancake", price: "$3.00" },
            { name: "Waffle", price: "$3.00" },
        ],
    },
];

const sections = [
    { id: "hot-beverages", label: "Hot Beverages" },
    { id: "cold-beverages", label: "Cold Beverages" },
    { id: "appetizer", label: "Appetizer" },
    { id: "sandwich", label: "Sandwich" },
    { id: "panini", label: "Panini" },
    { id: "pizza", label: "Pizza" },
    { id: "garlic-bread", label: "Garlic Bread" },
    { id: "bakery", label: "Bakery" },
    { id: "bagels", label: "Bagels" },
    { id: "house-special", label: "House Special" },
    { id: "dessert", label: "Dessert" },
    { id: "breakfast", label: "Breakfast" },
];

export default function App() {
    const [activeSection, setActiveSection] = useState("hot-beverages");
    const [showHeader, setShowHeader] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [showBackToTop, setShowBackToTop] = useState(false);
    const sectionsRef = useRef<{ [key: string]: HTMLElement }>({});

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            // Show Ship Wheel if scrolled down more than 400px
            setShowBackToTop(currentScrollY > 400);

            // Show header if scrolling up or at the very top
            if (currentScrollY < 50) {
                setShowHeader(true);
            } else if (Math.abs(currentScrollY - lastScrollY) > 5) {
                // Threshold for "accidental" tiny scrolls
                if (currentScrollY > lastScrollY) {
                    setShowHeader(false); // Scrolling Down
                } else {
                    setShowHeader(true); // Scrolling Up
                }
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px",
            threshold: 0,
        };

        const observerCallback = (entries: IntersectionObserverEntry[]) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(
            observerCallback,
            observerOptions,
        );
        Object.values(sectionsRef.current).forEach((section) => {
            if (section) observer.observe(section);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id: string) => {
        const section = sectionsRef.current[id];
        if (section) {
            const navHeight = 80;
            const elementPosition = section.getBoundingClientRect().top;
            const offsetPosition =
                elementPosition + window.pageYOffset - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="min-h-screen bg-[#f5f1e8]">
            {/* duration-300 = Faster response
               ease-out = Snappy start, tapers off quickly
            */}
            <header
                className="sticky top-0 z-50 bg-[#f5f1e8]/95 backdrop-blur-sm transition-transform duration-300 ease-out border-b border-[#8b6f47]/20"
                style={{
                    transform: showHeader
                        ? "translateY(0)"
                        : "translateY(-180px)",
                }}
            >
                <div className="max-w-4xl mx-auto px-4 py-3 text-center">
                    <div className="flex flex-col items-center gap-3">
                        <button
                            onClick={scrollToTop}
                            className="w-30 h-30 flex items-center justify-center text-5xl cursor-pointer hover:scale-105 transition-transform"
                            aria-label="Back to top"
                        >
                            <img src="/logo.svg" alt="Sailor's Den" />
                        </button>

                        <h3
                            onClick={scrollToTop}
                            className="text-2xl font-serif text-[#5c4a3a] cursor-pointer"
                        >
                            Sailor's Den
                        </h3>
                    </div>
                </div>

                <div className="bg-[#f5f1e8]">
                    <SectionNav
                        sections={sections}
                        activeSection={activeSection}
                        onSectionClick={scrollToSection}
                    />
                </div>
            </header>

            <main className="max-w-4xl mx-auto px-4 py-8 pb-20">
                {menuData.map((section) => (
                    <section
                        key={section.id}
                        id={section.id}
                        ref={(el) => {
                            if (el) sectionsRef.current[section.id] = el;
                        }}
                        className="mb-16 scroll-mt-20"
                    >
                        <h2 className="text-3xl font-serif text-[#5c4a3a] mb-8 text-center">
                            {section.label}
                        </h2>

                        {section.note && (
                            <p className="text-[#7d6b5a] text-center mb-6 italic">
                                {section.note}
                            </p>
                        )}

                        <div
                            className={
                                section.subcategories
                                    ? "space-y-6"
                                    : "space-y-3"
                            }
                        >
                            {section.items?.map((item, idx) => (
                                <MenuItem key={idx} {...item} />
                            ))}

                            {section.subcategories?.map((subcategory, idx) => (
                                <div key={idx} className="mt-6">
                                    <h3 className="text-xl text-[#6d5a47] mb-3 font-medium">
                                        {subcategory.title}
                                        {subcategory.note && (
                                            <span className="text-sm text-[#7d6b5a] font-normal italic ml-2">
                                                {subcategory.note}
                                            </span>
                                        )}
                                    </h3>
                                    <div className="space-y-2 pl-4">
                                        {subcategory.items.map(
                                            (item, itemIdx) => (
                                                <MenuItem
                                                    key={itemIdx}
                                                    {...item}
                                                    isSubItem
                                                />
                                            ),
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                ))}
            </main>

            {/* Footer */}

            <footer className="border-t-2 border-[#c9b8a3]/50 bg-gradient-to-b from-[#f5f1e8] to-[#ebe5d8] py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center space-y-6">
                        {/* Tagline with icons */}

                        <div className="flex items-center justify-center gap-3 text-2xl mb-6">
                            <span className="text-3xl">☕</span>

                            <p className="text-lg text-[#6d5a47] italic font-serif">
                                Where every sip tells a story, every bite feels
                                like home
                            </p>

                            <span className="text-3xl">🥖</span>
                        </div>

                        {/* Decorative divider */}

                        <div className="flex items-center justify-center gap-4 my-8">
                            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#8b6f47]/30"></div>

                            <h3 className="text-2xl font-serif text-[#5c4a3a]">
                                Sailor's Den
                            </h3>

                            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#8b6f47]/30"></div>
                        </div>

                        {/* Contact Info */}

                        <div className="space-y-2 text-[#7d6b5a]">
                            <p className="text-base">
                                123 Harbor Street, Coastal Bay, CB 12345
                            </p>

                            <p className="text-base">📞 (555) 123-4567</p>
                            {/* 
                            <p className="text-base">
                                ✉️ hello@sailorsden.cafe
                            </p> */}
                        </div>

                        {/* Opening Hours */}

                        <div className="mt-6 pt-6 border-t border-[#c9b8a3]/30">
                            <p className="text-sm text-[#8b6f47]">
                                Open Daily • 7:00 AM - 8:00 PM
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* Floating Ship Wheel Button */}
            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 z-[60] p-3 rounded-full bg-[#5c4a3a] text-[#f5f1e8] shadow-2xl transition-all duration-500 ease-in-out transform hover:bg-[#8b6f47] active:scale-90 ${
                    showBackToTop
                        ? "translate-y-0 opacity-100 scale-100"
                        : "translate-y-24 opacity-0 scale-50 pointer-events-none"
                }`}
                aria-label="Scroll to top"
            >
                {/* Ship Wheel SVG */}
                <svg
                    className="w-8 h-8 transition-transform duration-700 hover:rotate-180"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="3" />
                    <circle cx="12" cy="12" r="8" />
                    <path d="M12 2v4" />
                    <path d="M12 18v4" />
                    <path d="M2 12h4" />
                    <path d="M18 12h4" />
                    <path d="M4.93 4.93l2.83 2.83" />
                    <path d="M16.24 16.24l2.83 2.83" />
                    <path d="M4.93 19.07l2.83-2.83" />
                    <path d="M16.24 7.76l2.83-2.83" />
                </svg>
            </button>
        </div>
    );
}
