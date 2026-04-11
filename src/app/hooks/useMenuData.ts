import { useState, useEffect } from "react";
import { MenuSection, MenuContent, MenuItemData } from "../components/Data";

// ─────────────────────────────────────────────
// Paste your values here:
// ─────────────────────────────────────────────
const SHEET_ID = "1qHLtUguPMZjHXtnIFIILK_pZYTMpCEAgNwCrpVKggks";
const API_KEY = "AIzaSyA8JBB15HU82MU9MTUgSrx-5nCr3ihVyVo";
const SHEET_NAME = "menu";
// ─────────────────────────────────────────────

const SHEETS_URL = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${SHEET_NAME}?key=${API_KEY}`;

function parseSheetToMenuData(rows: string[][]): MenuSection[] {
    if (rows.length < 2) return [];

    const headers = rows[0].map((h) => h.trim());
    const dataRows = rows.slice(1);

    const sectionsMap = new Map<string, MenuSection>();

    for (const row of dataRows) {
        const get = (col: string) => (row[headers.indexOf(col)] ?? "").trim();

        const sectionId = get("section_id");
        if (!sectionId) continue;

        if (!sectionsMap.has(sectionId)) {
            sectionsMap.set(sectionId, {
                id: sectionId,
                label: get("section_label"),
                note: get("section_note") || undefined,
                content: [],
            });
        }

        const section = sectionsMap.get(sectionId)!;
        const type = get("type");
        const subcategoryTitle = get("subcategory_title");
        const subcategoryNote = get("subcategory_note");

        const itemData: MenuItemData = {
            name: get("name"),
            price: get("price"),
            description: get("description") || undefined,
            hasImage: get("has_image").toUpperCase() === "TRUE" || undefined,
        };

        if (type === "item") {
            section.content.push({ type: "item", data: itemData });
        } else if (type === "subcategory_item") {
            let subcatEntry = section.content.find(
                (c): c is Extract<MenuContent, { type: "subcategory" }> =>
                    c.type === "subcategory" &&
                    c.data.title === subcategoryTitle,
            );

            if (!subcatEntry) {
                const newEntry: Extract<MenuContent, { type: "subcategory" }> =
                    {
                        type: "subcategory",
                        data: {
                            title: subcategoryTitle,
                            note: subcategoryNote || undefined,
                            items: [],
                        },
                    };
                section.content.push(newEntry);
                subcatEntry = newEntry;
            }

            subcatEntry.data.items.push(itemData);
        }
    }

    return Array.from(sectionsMap.values());
}

export interface UseMenuDataResult {
    menuData: MenuSection[];
    sections: { id: string; label: string }[];
    loading: boolean;
    error: string | null;
}

export function useMenuData(): UseMenuDataResult {
    const [menuData, setMenuData] = useState<MenuSection[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const controller = new AbortController();

        fetch(SHEETS_URL, { signal: controller.signal })
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((json) => {
                const rows: string[][] = json.values ?? [];
                const parsed = parseSheetToMenuData(rows);
                setMenuData(parsed);
                setLoading(false);
            })
            .catch((err) => {
                if (err.name === "AbortError") return;
                console.error("Menu fetch failed:", err);
                setError("Failed to load menu. Please refresh.");
                setLoading(false);
            });

        return () => controller.abort();
    }, []);

    const sections = menuData.map((s) => ({ id: s.id, label: s.label }));

    return { menuData, sections, loading, error };
}
