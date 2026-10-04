export interface MenuItemData {
    name: string;
    price: string;
    hot_price: string;
    cold_price: string;
    description?: string;
    image?: string;
    hasImage?: boolean;
}

export interface MenuSubCategory {
    title: string;
    note?: string;
    items: MenuItemData[];
}

export type MenuContent =
    | { type: "item"; data: MenuItemData }
    | { type: "subcategory"; data: MenuSubCategory };

export interface MenuSection {
    id: string;
    label: string;
    note?: string;
    content: MenuContent[];
}
