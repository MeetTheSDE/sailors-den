interface MenuItemProps {
    name: string;
    description?: string;
    isSubItem?: boolean;
    price?: string;
    image: string;
    setLightboxImage?: (data: { image: string; name: string }) => void;
}

export function MenuItem({
    name,
    description,
    isSubItem,
    price,
    image,
    setLightboxImage,
}: MenuItemProps) {
    const handleImageClick = () => {
        if (setLightboxImage) {
            setLightboxImage({ image, name });
        }
    };

    return (
        <div
            className={`${isSubItem ? "py-1.5" : "py-3"} flex gap-3 items-center`}
        >
            {/* Image */}
            <div
                className={`flex-shrink-0 ${isSubItem ? "w-14 h-14" : "w-14 h-14"} cursor-pointer`}
                onClick={handleImageClick}
            >
                <img
                    src={image}
                    alt={name}
                    className="w-full h-full object-cover rounded-lg border border-[#c9b8a3]/30 hover:opacity-80 transition-opacity active:scale-95 transition-transform"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                    <span
                        className={`${isSubItem ? "text-[#6d5a47]" : "text-[#5c4a3a]"}`}
                    >
                        {name}
                    </span>
                    <div className="flex-1 border-b border-dotted border-[#c9b8a3] min-w-4 mb-1"></div>
                    {price && (
                        <span
                            className={`${isSubItem ? "text-[#6d5a47]" : "text-[#5c4a3a]"} ml-2 flex-shrink-0`}
                        >
                            {price}
                        </span>
                    )}
                </div>
                {description && (
                    <p className="text-sm text-[#7d6b5a] mt-1">{description}</p>
                )}
            </div>
        </div>
    );
}
