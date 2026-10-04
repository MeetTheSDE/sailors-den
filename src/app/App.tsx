import { useEffect, useRef, useState } from "react";

import { MenuItem, PRICE_COL_CLASS } from "./components/MenuItem";
import { Imagebox } from "./components/ImageBox";
import { SectionNav } from "./components/SectionNav";
import { useMenuData } from "./hooks/useMenuData";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";

export default function App() {
    const [activeSection, setActiveSection] = useState("hot-beverages");
    const [isScrolled, setIsScrolled] = useState(false);
    const [showBackToTop, setShowBackToTop] = useState(false);

    const [lightboxImage, setLightboxImage] = useState<{
        image: string;
        name: string;
    } | null>(null);

    const sectionsRef = useRef<{ [key: string]: HTMLElement }>({});

    const { menuData, sections, loading, error } = useMenuData();

    /*
     * ------------------------------------------------------------
     * Scroll handling
     * ------------------------------------------------------------
     */

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            setShowBackToTop(currentScrollY > 400);

            if (currentScrollY > 120) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll, {
            passive: true,
        });

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    /*
     * ------------------------------------------------------------
     * Detect active menu section
     * ------------------------------------------------------------
     */

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
            if (section) {
                observer.observe(section);
            }
        });

        return () => observer.disconnect();
    }, [menuData]);

    /*
     * ------------------------------------------------------------
     * Scroll to section
     * ------------------------------------------------------------
     */

    const scrollToSection = (id: string) => {
        const section = sectionsRef.current[id];

        if (section) {
            const navHeight = isScrolled ? 120 : 129;

            const elementPosition = section.getBoundingClientRect().top;

            const offsetPosition =
                elementPosition + window.pageYOffset - navHeight;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth",
            });
        }
    };

    /*
     * ------------------------------------------------------------
     * Scroll to top
     * ------------------------------------------------------------
     */

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    return (
        <div className="min-h-screen bg-[#f5f1e8]">
            {/* ====================================================
                1. LOGO
            ==================================================== */}

            <div className="max-w-4xl mx-auto px-4 pt-1 text-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="w-30 h-30 flex items-center justify-center">
                        <img src="/logo.svg" alt="Logo" className="w-30 h-30" />
                    </div>
                </div>
            </div>

            {/* ====================================================
                2. MAIN STICKY HEADER
            ==================================================== */}

            <header className="sticky top-0 z-50 bg-[#f5f1e8]/95 backdrop-blur-sm border-b border-[#8b6f47]/20">
                <div className="flex justify-center items-center py-3 transition-all duration-300">
                    <h1
                        onClick={scrollToTop}
                        className={`font-serif text-[#5c4a3a] cursor-pointer transition-all duration-300 ${
                            isScrolled ? "text-2xl" : "text-4xl"
                        }`}
                    >
                        Sailor's Den
                    </h1>
                </div>

                <div className="bg-[#f5f1e8]">
                    <SectionNav
                        sections={sections}
                        activeSection={activeSection}
                        onSectionClick={scrollToSection}
                    />
                </div>
            </header>

            {/* ====================================================
                3. MAIN MENU
            ==================================================== */}

            <main className="max-w-4xl mx-auto px-4 py-8 pb-10">
                {/* Loading */}

                {loading && (
                    <p className="text-center text-[#7d6b5a] italic py-20">
                        Loading menu...
                    </p>
                )}

                {/* Error */}

                {error && (
                    <p className="text-center text-red-400 italic py-4">
                        {error}
                    </p>
                )}

                {/* Menu */}

                {!loading &&
                    menuData.map((section) => (
                        <section
                            key={section.id}
                            id={section.id}
                            ref={(el) => {
                                if (el) {
                                    sectionsRef.current[section.id] = el;
                                }
                            }}
                            className="mb-16 scroll-mt-28"
                        >
                            {/* ======================================
                                SECTION TITLE
                            ====================================== */}

                            <h2 className="text-3xl font-serif text-[#5c4a3a] mb-6 text-center">
                                {section.label}
                            </h2>

                            {/* Section note */}

                            {section.note && (
                                <p className="text-[#7d6b5a] text-xs text-center mb-3 italic">
                                    {section.note}
                                </p>
                            )}

                            {/* ======================================
                                COFFEE COLUMN HEADER (coffee only)
                            ====================================== */}

                            {section.id === "coffee" && (
                                <div
                                    className="sticky z-40 bg-[#f5f1e8] border-b-2 border-[#c9b8a3]"
                                    style={{
                                        top: isScrolled ? "115px" : "125px",
                                    }}
                                >
                                    <div className="flex gap-3 items-center py-3">
                                        {/* spacer = thumbnail width */}
                                        <div className="w-14 flex-shrink-0" />

                                        <div className="flex-1 min-w-0 flex items-center gap-2">
                                            <span className="flex-1 text-md font-semibold text-[#5c4a3a]">
                                                Item
                                            </span>

                                            <span
                                                className={`${PRICE_COL_CLASS} text-md font-semibold text-[#5c4a3a] text-center`}
                                            >
                                                Hot
                                            </span>

                                            <span
                                                className={`${PRICE_COL_CLASS} text-md font-semibold text-[#5c4a3a] text-center`}
                                            >
                                                Cold
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* ======================================
                                ALL MENU SECTIONS (incl. coffee)
                            ====================================== */}

                            <div className="mt-2">
                                {section.content.map((entry, idx) => {
                                    /*
                                     * NORMAL ITEM
                                     */

                                    if (entry.type === "item") {
                                        const imageName = entry.data.hasImage
                                            ? entry.data.name.replace(
                                                  /\s+/g,
                                                  "",
                                              ) + ".png"
                                            : "default.png";

                                        return (
                                            <MenuItem
                                                key={idx}
                                                {...entry.data}
                                                hotPrice={entry.data.hot_price}
                                                coldPrice={
                                                    entry.data.cold_price
                                                }
                                                priceColumns={
                                                    section.id === "coffee"
                                                }
                                                image={imageName}
                                                setLightboxImage={
                                                    setLightboxImage
                                                }
                                            />
                                        );
                                    }

                                    /*
                                     * SUBCATEGORY
                                     */

                                    return (
                                        <div key={idx} className="mt-4 mb-4">
                                            {/* Subcategory title */}

                                            <h3 className="text-xl text-[#6d5a47] mb-2 font-medium">
                                                {entry.data.title}

                                                {entry.data.note && (
                                                    <span className="text-sm text-[#7d6b5a] font-normal italic ml-2">
                                                        {entry.data.note}
                                                    </span>
                                                )}
                                            </h3>

                                            {/* Subcategory Items */}

                                            <div className="pl-6">
                                                {entry.data.items.map(
                                                    (
                                                        item: any,
                                                        itemIdx: number,
                                                    ) => {
                                                        const imageName =
                                                            item.hasImage
                                                                ? item.name.replace(
                                                                      /\s+/g,
                                                                      "",
                                                                  ) + ".png"
                                                                : "default.png";

                                                        return (
                                                            <MenuItem
                                                                key={itemIdx}
                                                                {...item}
                                                                hotPrice={
                                                                    item.hot_price
                                                                }
                                                                coldPrice={
                                                                    item.cold_price
                                                                }
                                                                priceColumns={
                                                                    section.id ===
                                                                    "coffee"
                                                                }
                                                                image={
                                                                    imageName
                                                                }
                                                                isSubItem
                                                                setLightboxImage={
                                                                    setLightboxImage
                                                                }
                                                            />
                                                        );
                                                    },
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    ))}
            </main>

            {/* ====================================================
                TAX NOTE
            ==================================================== */}

            <div className="max-w-4xl mx-auto px-4 pb-6 text-left">
                <p className="text-sm text-[#7d6b5a] italic">
                    * Taxes are not included in the listed prices
                </p>
            </div>

            {/* ====================================================
                FOOTER
            ==================================================== */}

            <footer className="border-t-2 border-[#c9b8a3]/50 bg-gradient-to-b from-[#f5f1e8] to-[#ebe5d8] py-12">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="text-center space-y-6">
                        <div className="flex items-center justify-center gap-3 text-2xl mb-6">
                            <span className="text-3xl">☕</span>

                            <p className="text-lg text-[#6d5a47] italic font-serif">
                                Where every sip tells a story, every bite feels
                                like home
                            </p>

                            <span className="text-3xl">🥖</span>
                        </div>

                        <div className="flex items-center justify-center gap-4 my-8">
                            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#8b6f47]/30"></div>

                            <h3 className="text-2xl font-serif text-[#5c4a3a]">
                                Sailor's Den
                            </h3>

                            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#8b6f47]/30"></div>
                        </div>

                        <div className="space-y-2 text-[#7d6b5a]">
                            <a
                                href="https://www.google.com/maps/place/Sailor's+Den+Cafe/@21.2351524,72.8728581,20z/data=!4m14!1m7!3m6!1s0x3be04f004fe7ca07:0x61c965e267fd5dca!2sAR+Mall!8m2!3d21.2350445!4d72.8730323!16s%2Fg%2F11yyz4cdnj!3m5!1s0x3be04fcc3bafab0f:0x95df7bb455165625!8m2!3d21.2353018!4d72.8728817!16s%2Fg%2F11z4y436n2?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                306/307, AR Mall, Mota Varachha, Surat, Gujarat
                                394104
                            </a>

                            <div className="mt-3">
                                <a
                                    href="tel:+918980707798"
                                    className="text-base"
                                >
                                    📞 (+91) 89807-07798
                                </a>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-[#c9b8a3]/30">
                            <p className="text-m text-[#8b6f47]">
                                Open Daily • 11:00 AM - 11:00 PM
                            </p>
                        </div>
                    </div>
                </div>
            </footer>

            {/* ====================================================
                FLOATING SHIP WHEEL
            ==================================================== */}

            <button
                onClick={scrollToTop}
                className={`fixed bottom-8 right-8 z-[60] p-3 rounded-full bg-[#5c4a3a] text-[#f5f1e8] shadow-2xl transition-all duration-500 ease-in-out transform hover:bg-[#8b6f47] active:scale-90 ${
                    showBackToTop
                        ? "translate-y-0 opacity-100 scale-100"
                        : "translate-y-24 opacity-0 scale-50 pointer-events-none"
                }`}
                aria-label="Scroll to top"
            >
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

            {/* ====================================================
                IMAGE LIGHTBOX
            ==================================================== */}

            {lightboxImage && (
                <Imagebox
                    image={lightboxImage.image}
                    name={lightboxImage.name}
                    onClose={() => setLightboxImage(null)}
                />
            )}

            <Analytics />

            <SpeedInsights />
        </div>
    );
}
