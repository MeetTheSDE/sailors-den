import { useEffect } from "react";

interface ImageLightboxProps {
    image: string;
    name: string;
    onClose: () => void;
}

export function Imagebox({ image, name, onClose }: ImageLightboxProps) {
    useEffect(() => {
        document.body.style.overflow = "hidden";
        const handleScroll = () => {
            onClose();
        };
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                onClose();
            }
        };

        window.addEventListener("scroll", handleScroll, true);
        window.addEventListener("keydown", handleEscape);

        return () => {
            document.body.style.overflow = "unset";
            window.removeEventListener("scroll", handleScroll, true);
            window.removeEventListener("keydown", handleEscape);
        };
    }, [onClose]);

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 animate-in fade-in duration-100"
            onClick={onClose}
        >
            <div className="absolute inset-0 bg-[#5c4a3a]/80 backdrop-blur-xs" />
            <div
                className="relative z-10 max-w-2xl w-full animate-in zoom-in-95 duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <img
                    src={image}
                    alt={name}
                    className="w-full h-auto rounded-2xl shadow-2xl border-4 border-[#f5f1e8]"
                />
                <p className="text-center text-[#f5f1e8] mt-4 text-lg font-medium">
                    {name}
                </p>
            </div>

            <div className="absolute top-4 right-4 text-[#f5f1e8] text-sm bg-[#5c4a3a]/50 px-3 py-1 rounded-full backdrop-blur-sm">
                Tap anywhere to close
            </div>
        </div>
    );
}
