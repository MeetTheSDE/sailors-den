import { useEffect, useRef, useState } from "react";
import { MenuItem } from "./components/MenuItem";
import { SectionNav } from "./components/SectionNav";

export default function App() {
    const [activeSection, setActiveSection] = useState("hot-beverages");
    const sectionsRef = useRef<{ [key: string]: HTMLElement }>({});

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

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-50% 0px -50% 0px",
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
            const y =
                section.getBoundingClientRect().top + window.pageYOffset - 120;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
    };

    return (
        <div className="min-h-screen bg-[#f5f1e8]">
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#f5f1e8]/95 backdrop-blur-sm border-b border-[#8b6f47]/20">
                <div className="max-w-4xl mx-auto px-4 py-6">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-24 h-24 flex items-center justify-center">
                            <img
                                src="/logo.svg"
                                alt="Sailor's Den"
                                className="w-full h-full object-contain"
                                onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = "none";
                                    target.parentElement!.innerHTML =
                                        '<div class="text-5xl">⚓</div>';
                                }}
                            />
                        </div>
                        <h1 className="text-3xl font-serif text-[#5c4a3a]">
                            Sailor's Den
                        </h1>
                    </div>
                </div>

                <SectionNav
                    sections={sections}
                    activeSection={activeSection}
                    onSectionClick={scrollToSection}
                />
            </header>

            {/* Menu Content */}
            <main className="max-w-4xl mx-auto px-4 py-8 pb-20">
                {/* Hot Beverages */}
                <section
                    id="hot-beverages"
                    ref={(el) => {
                        if (el) {
                            sectionsRef.current["hot-beverages"] = el;
                        }
                    }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-serif text-[#5c4a3a] mb-8 text-center">
                        Hot Beverages
                    </h2>

                    <div className="space-y-8">
                        <MenuItem name="Hot Chocolate" price="$3.00" />

                        <div>
                            <h3 className="text-xl text-[#6d5a47] mb-3 font-medium">
                                Espresso
                            </h3>
                            <div className="space-y-2 pl-4">
                                <MenuItem
                                    name="Doppio"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Lungo"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Ristretto"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Cafe Americano"
                                    isSubItem
                                    price="$3.00"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl text-[#6d5a47] mb-3 font-medium">
                                Latte
                            </h3>
                            <div className="space-y-2 pl-4">
                                <MenuItem
                                    name="Cafe Latte"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Pistachio Latte"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Caramel Brulee Latte"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Gingerbread Latte"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Vanilla Latte"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Cinnamon Dolce Latte"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Pumpkin Spice Latte"
                                    isSubItem
                                    price="$3.00"
                                />
                            </div>
                        </div>

                        <MenuItem name="Cappuccino" price="$3.00" />
                        <MenuItem name="Flat White" price="$3.00" />

                        <div>
                            <h3 className="text-xl text-[#6d5a47] mb-3 font-medium">
                                Cortado
                            </h3>
                            <div className="space-y-2 pl-4">
                                <MenuItem
                                    name="Cortado"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Pistachio Cortado"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Brown Sugar Cortado"
                                    isSubItem
                                    price="$3.00"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl text-[#6d5a47] mb-3 font-medium">
                                Macchiato
                            </h3>
                            <div className="space-y-2 pl-4">
                                <MenuItem
                                    name="Espresso Macchiato"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Latte Macchiato"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Caramel Macchiato"
                                    isSubItem
                                    price="$3.00"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl text-[#6d5a47] mb-3 font-medium">
                                Mocha
                            </h3>
                            <div className="space-y-2 pl-4">
                                <MenuItem
                                    name="Caffe Mocha"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="White Chocolate Mocha"
                                    isSubItem
                                    price="$3.00"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl text-[#6d5a47] mb-3 font-medium">
                                Matcha
                            </h3>
                            <div className="space-y-2 pl-4">
                                <MenuItem
                                    name="Matcha Latte"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Pistachio Matcha Latte"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Caramel Matcha"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Dubai Chocolate Matcha"
                                    isSubItem
                                    price="$3.00"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Cold Beverages */}
                <section
                    id="cold-beverages"
                    ref={(el) => {
                        if (el) {
                            sectionsRef.current["cold-beverages"] = el;
                        }
                    }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-serif text-[#5c4a3a] mb-8 text-center">
                        Cold Beverages
                    </h2>
                    <p className="text-[#7d6b5a] text-center mb-6 italic">
                        Everything in hot can be made iced
                    </p>
                    <MenuItem name="Strawberry Matcha Latte" price="$3.00" />
                </section>

                {/* Appetizer */}
                <section
                    id="appetizer"
                    ref={(el) => {
                        if (el) {
                            sectionsRef.current["appetizer"] = el;
                        }
                    }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-serif text-[#5c4a3a] mb-8 text-center">
                        Appetizer
                    </h2>
                    <div className="space-y-3">
                        <MenuItem
                            name="Homemade Salsa"
                            description="served with chips"
                            price="$3.00"
                        />
                        <MenuItem
                            name="Spicy Queso (Cheese) Nachos"
                            price="$3.00"
                        />
                        <MenuItem name="Veg Loaded Nachos" price="$3.00" />
                    </div>
                </section>

                {/* Sandwich */}
                <section
                    id="sandwich"
                    ref={(el) => {
                        if (el) {
                            sectionsRef.current["sandwich"] = el;
                        }
                    }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-serif text-[#5c4a3a] mb-8 text-center">
                        Sandwich
                    </h2>
                    <div className="space-y-3">
                        <MenuItem
                            name="Cheese Grilled Sandwich"
                            price="$3.00"
                        />
                        <MenuItem
                            name="Double Cheese Grilled Sandwich"
                            price="$3.00"
                        />
                        <MenuItem
                            name="Veg Cheese Grilled Sandwich"
                            price="$3.00"
                        />
                        <MenuItem
                            name="Paneer Masala Grilled Sandwich"
                            price="$3.00"
                        />
                    </div>
                </section>

                {/* Panini */}
                <section
                    id="panini"
                    ref={(el) => {
                        if (el) {
                            sectionsRef.current["panini"] = el;
                        }
                    }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-serif text-[#5c4a3a] mb-8 text-center">
                        Panini
                    </h2>
                </section>

                {/* Pizza */}
                <section
                    id="pizza"
                    ref={(el) => {
                        if (el) {
                            sectionsRef.current["pizza"] = el;
                        }
                    }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-serif text-[#5c4a3a] mb-8 text-center">
                        Pizza
                    </h2>
                    <div className="space-y-3">
                        <MenuItem name="Fondue Pizza - Cheese" price="$3.00" />
                        <MenuItem name="Fondue Pizza - Veg" price="$3.00" />
                    </div>
                </section>

                {/* Avocado Toast & Garlic Bread */}
                <section
                    id="garlic-bread"
                    ref={(el) => {
                        if (el) {
                            sectionsRef.current["garlic-bread"] = el;
                        }
                    }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-serif text-[#5c4a3a] mb-8 text-center">
                        Avocado Toast & Garlic Bread
                    </h2>

                    <div className="space-y-6">
                        <div>
                            <h3 className="text-xl text-[#6d5a47] mb-3 font-medium">
                                Avocado Toast{" "}
                                <span className="text-sm text-[#7d6b5a]">
                                    (Sourdough bread)
                                </span>
                            </h3>
                            <div className="space-y-2 pl-4">
                                <MenuItem
                                    name="Avocado Toast"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Veg. Avocado Toast"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Avocado and Burrata Toast"
                                    isSubItem
                                    price="$3.00"
                                />
                            </div>
                        </div>

                        <div>
                            <h3 className="text-xl text-[#6d5a47] mb-3 font-medium">
                                Garlic Bread
                            </h3>
                            <div className="space-y-2 pl-4">
                                <MenuItem
                                    name="Garlic Bread"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Cheese Garlic Bread"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Masala Garlic Bread"
                                    description="Green marchi, leela dhana, white onion"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Veggie Garlic Bread"
                                    description="Red onion, capsicum, corn"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Paneer Cheesy Garlic Bread"
                                    isSubItem
                                    price="$3.00"
                                />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Bakery */}
                <section
                    id="bakery"
                    ref={(el) => {
                        if (el) {
                            sectionsRef.current["bakery"] = el;
                        }
                    }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-serif text-[#5c4a3a] mb-8 text-center">
                        Bakery (Coffee Sides)
                    </h2>
                    <div className="space-y-3">
                        <div>
                            <h3 className="text-xl text-[#6d5a47] mb-3 font-medium">
                                Brownie
                            </h3>
                            <div className="space-y-2 pl-4">
                                <MenuItem
                                    name="Chocolate Brownie"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Double Chocolate Brownie"
                                    isSubItem
                                    price="$3.00"
                                />
                            </div>
                        </div>

                        <MenuItem name="Nutella Bread" price="$3.00" />
                        <MenuItem name="Banana Bread" price="$3.00" />
                        <MenuItem
                            name="Peanut Butter Slice"
                            description="drizzle with Honey"
                            price="$3.00"
                        />
                        <MenuItem
                            name="Almond Butter Slice"
                            description="drizzle with Honey"
                            price="$3.00"
                        />

                        <div>
                            <h3 className="text-xl text-[#6d5a47] mb-3 font-medium">
                                Danish Pastry
                            </h3>
                            <div className="space-y-2 pl-4">
                                <MenuItem
                                    name="Cheese Danish Pastry"
                                    isSubItem
                                    price="$3.00"
                                />
                                <MenuItem
                                    name="Raspberry Danish Pastry"
                                    isSubItem
                                    price="$3.00"
                                />
                            </div>
                        </div>

                        <MenuItem
                            name="Cookie"
                            description="Chocolate Chip, Macadamia, Double Chocolate Chip"
                            price="$3.00"
                        />
                        <MenuItem name="Butter Croissant" price="$3.00" />
                        <MenuItem name="Chocolate Croissant" price="$3.00" />
                    </div>
                </section>

                {/* Bagels */}
                <section
                    id="bagels"
                    ref={(el) => {
                        if (el) {
                            sectionsRef.current["bagels"] = el;
                        }
                    }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-serif text-[#5c4a3a] mb-8 text-center">
                        Bagels
                    </h2>
                    <div className="space-y-3">
                        <MenuItem name="Plain Bagel" price="$3.00" />
                        <MenuItem name="Everything Bagel" price="$3.00" />
                        <MenuItem
                            name="Avocado Bagel Toast"
                            description="on everything bagel"
                            price="$3.00"
                        />
                        <MenuItem name="Blueberry Bagel" price="$3.00" />
                        <MenuItem name="Jalapeno Bagel" price="$3.00" />
                        <MenuItem name="Asiago Bagel" price="$3.00" />
                    </div>
                </section>

                {/* House Special */}
                <section
                    id="house-special"
                    ref={(el) => {
                        if (el) {
                            sectionsRef.current["house-special"] = el;
                        }
                    }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-serif text-[#5c4a3a] mb-8 text-center">
                        House Special
                    </h2>
                    <div className="space-y-3">
                        <MenuItem name="Hummus Toast" price="$3.00" />
                        <MenuItem
                            name="Margherita Caprese Flatbread"
                            price="$3.00"
                        />
                        <MenuItem
                            name="Burrata Caprese Sandwich"
                            description="Ciabatta bread"
                            price="$3.00"
                        />
                        <MenuItem
                            name="Bruschetta"
                            description="Baguette"
                            price="$3.00"
                        />
                        <MenuItem name="Margherita Flatbread" price="$3.00" />
                    </div>
                </section>

                {/* Dessert */}
                <section
                    id="dessert"
                    ref={(el) => {
                        if (el) {
                            sectionsRef.current["dessert"] = el;
                        }
                    }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-serif text-[#5c4a3a] mb-8 text-center">
                        Dessert
                    </h2>
                    <div className="space-y-3">
                        <MenuItem name="Affogato" price="$3.00" />
                        <MenuItem name="Shibuya Toast" price="$3.00" />
                        <MenuItem name="Honey Butter Toast" price="$3.00" />
                    </div>
                </section>

                {/* Breakfast */}
                <section
                    id="breakfast"
                    ref={(el) => {
                        if (el) {
                            sectionsRef.current["breakfast"] = el;
                        }
                    }}
                    className="mb-16"
                >
                    <h2 className="text-3xl font-serif text-[#5c4a3a] mb-8 text-center">
                        Breakfast Items
                    </h2>
                    <div className="space-y-3">
                        <MenuItem name="Plain Pancake" price="$3.00" />
                        <MenuItem name="Waffle" price="$3.00" />
                    </div>
                </section>
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
                            <span className="text-2xl text-[#8b6f47]">⚓</span>
                            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#8b6f47]/30"></div>
                        </div>

                        {/* Cafe Name */}
                        <h3 className="text-2xl font-serif text-[#5c4a3a]">
                            Sailor's Den
                        </h3>

                        {/* Contact Info */}
                        <div className="space-y-2 text-[#7d6b5a]">
                            <p className="text-base">
                                123 Harbor Street, Coastal Bay, CB 12345
                            </p>
                            <p className="text-base">📞 (555) 123-4567</p>
                            <p className="text-base">
                                ✉️ hello@sailorsden.cafe
                            </p>
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
        </div>
    );
}
