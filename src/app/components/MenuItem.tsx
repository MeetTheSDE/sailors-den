interface MenuItemProps {
    name: string;
    description?: string;
    isSubItem?: boolean;
    price?: string;
}

export function MenuItem({
    name,
    description,
    isSubItem,
    price,
}: MenuItemProps) {
    return (
        <div className={`${isSubItem ? "py-1.5" : "py-2"}`}>
            <div className="flex items-baseline justify-between gap-2">
                <span
                    className={`${isSubItem ? "text-[#6d5a47]" : "text-[#5c4a3a]"}`}
                >
                    {name}
                </span>
                <div className="flex-1 border-b border-dotted border-[#c9b8a3] min-w-4 mb-1"></div>
                {price && (
                    <span
                        className={`${isSubItem ? "text-[#6d5a47]" : "text-[#5c4a3a]"} ml-2`}
                    >
                        {price}
                    </span>
                )}
            </div>
            {description && (
                <p className="text-sm text-[#7d6b5a] mt-1">{description}</p>
            )}
        </div>
    );
}
