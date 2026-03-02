import { useEffect, useRef } from "react";

interface Section {
    id: string;
    label: string;
}

interface SectionNavProps {
    sections: Section[];
    activeSection: string;
    onSectionClick: (id: string) => void;
}

export function SectionNav({
    sections,
    activeSection,
    onSectionClick,
}: SectionNavProps) {
    const navRef = useRef<HTMLDivElement>(null);
    const activeButtonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
        if (activeButtonRef.current && navRef.current) {
            const button = activeButtonRef.current;
            const nav = navRef.current;

            const buttonLeft = button.offsetLeft;
            const buttonWidth = button.offsetWidth;
            const navWidth = nav.offsetWidth;

            const scrollPosition = buttonLeft - navWidth / 2 + buttonWidth / 2;

            nav.scrollTo({
                left: scrollPosition,
                behavior: "smooth",
            });
        }
    }, [activeSection]);

    return (
        <nav
            ref={navRef}
            className="overflow-x-auto scrollbar-hide"
            style={{
                scrollbarWidth: "none",
                msOverflowStyle: "none",
            }}
        >
            <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
            <div className="flex gap-2 px-4 py-3 min-w-max flex justify-center">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        ref={
                            activeSection === section.id
                                ? activeButtonRef
                                : null
                        }
                        onClick={() => onSectionClick(section.id)}
                        className={`px-4 py-2 rounded-full whitespace-nowrap text-sm transition-all ${
                            activeSection === section.id
                                ? "bg-[#8b6f47] text-[#f5f1e8] shadow-lg shadow-[#8b6f47]/20"
                                : "bg-[#e8dcc9] text-[#6d5a47] hover:bg-[#d9c9b1]"
                        }`}
                    >
                        {section.label}
                    </button>
                ))}
            </div>
        </nav>
    );
}
