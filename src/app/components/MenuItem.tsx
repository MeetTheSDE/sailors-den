interface MenuItemProps {
    name: string;
    description?: string;
    isSubItem?: boolean;
    price?: string;

    // Coffee-specific prices
    hotPrice?: string;
    coldPrice?: string;

    // Force Hot/Cold column layout (set for every item in the coffee section)
    priceColumns?: boolean;

    image: string;
    setLightboxImage?: (data: { image: string; name: string }) => void;
    onError?: () => void;
}

// Shared with the coffee header in App.tsx so the columns line up
export const PRICE_COL_CLASS = "w-16 sm:w-[90px]";

const formatPrice = (p?: string) =>
    p ? (p.includes("₹") ? p : `₹ ${p}`) : "—";

export function MenuItem({
    name,
    description,
    isSubItem,
    price,
    hotPrice,
    coldPrice,
    priceColumns,
    image,
    setLightboxImage,
}: MenuItemProps) {
    const handleImageClick = () => {
        if (setLightboxImage) {
            setLightboxImage({
                image,
                name,
            });
        }
    };

    const textColor = isSubItem ? "text-[#6d5a47]" : "text-[#5c4a3a]";

    return (
        <div
            className={`${isSubItem ? "py-2" : "py-3"} flex gap-3 items-center`}
        >
            {/* Image */}
            <div
                className="flex-shrink-0 w-14 h-14 cursor-pointer"
                onClick={handleImageClick}
            >
                <img
                    src={image}
                    alt={name}
                    onError={(e) => {
                        e.currentTarget.src = "/default.png";
                    }}
                    className="w-full h-full object-cover rounded-lg border border-[#c9b8a3]/30 hover:opacity-80 transition-opacity active:scale-95 transition-transform"
                />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                    {/* Name */}
                    <span className={textColor}>{name}</span>

                    {/* Dotted line */}
                    <div className="flex-1 border-b border-dotted border-[#c9b8a3] min-w-4 mb-1" />

                    {/* HOT / COLD PRICES (fixed columns) */}
                    {priceColumns || hotPrice || coldPrice ? (
                        <>
                            <span
                                className={`${PRICE_COL_CLASS} ${textColor} text-center tabular-nums flex-shrink-0 whitespace-nowrap`}
                            >
                                {formatPrice(hotPrice)}
                            </span>
                            <span
                                className={`${PRICE_COL_CLASS} ${textColor} text-center tabular-nums flex-shrink-0 whitespace-nowrap`}
                            >
                                {formatPrice(coldPrice)}
                            </span>
                        </>
                    ) : (
                        /* Normal item price */
                        price && (
                            <span
                                className={`${textColor} ml-2 flex-shrink-0 whitespace-nowrap`}
                            >
                                {price}
                            </span>
                        )
                    )}
                </div>

                {/* Description */}
                {description && (
                    <p className="text-xs text-[#7d6b5a] mt-1 italic">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
