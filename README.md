# Sailor's Den — Menu Google Sheet Guide

---

## 1. Skipping / Saving an Item for Later

Leave the `section_id` cell **blank** to skip that row. The parser ignores any row with an empty section_id.

Useful when:

- You want to draft a new item but are not ready to publish it
- An item is seasonal or out of stock and you want to bring it back later
- You are testing pricing or descriptions

To re-enable the item, just fill in the `section_id` again.

---

## 2. Adding a Photo for an Item

Set `has_image` to `TRUE` in the sheet and save the image in the `/public` folder of the project.

**Naming rule:** Remove all spaces from the item name.

| Item Name    | Image Filename  |
| ------------ | --------------- |
| Mojito Mint  | MojitoMint.png  |
| Cold Coffee  | ColdCoffee.png  |
| Veg Sandwich | VegSandwich.png |

If `has_image` is blank or `FALSE`, the app shows a default placeholder image.

---

## 3. Item Types — Direct vs. Under a Subcategory

The `type` column controls where an item appears in the menu layout.

| type value         | Where it appears                             | subcategory_title needed? |
| ------------------ | -------------------------------------------- | ------------------------- |
| `item`             | Directly under the section heading           | No                        |
| `subcategory_item` | Under a named subcategory within the section | Yes                       |

**Examples:**

- Hot Beverages section → `type: item` → Espresso appears directly under the section.
- Cold Drinks section → `type: subcategory_item` → `subcategory_title: Mojitos` → Mojito Mint appears under the Mojitos group.

---

## 4. Row Order in the Sheet

The parser uses `section_id` to place each item in the correct section, so you can put any row anywhere in the sheet and it will still show up in the right place on the menu.

That said, keep all rows for the same section grouped together. It makes the sheet easier to manage, audit prices, and spot mistakes.

The order items appear on the menu follows the order they appear in the sheet — top to bottom within their section.

---

## 5. Required Column Headers

Do not rename or delete these columns. The parser looks them up by exact header name.

| Column Header       | Purpose                                                               |
| ------------------- | --------------------------------------------------------------------- |
| `section_id`        | Which section the item belongs to. Leave blank to skip.               |
| `section_label`     | Display name of the section (e.g. Hot Beverages)                      |
| `section_note`      | Optional small note shown under the section heading                   |
| `type`              | `item` or `subcategory_item`                                          |
| `subcategory_title` | Required if type = `subcategory_item`                                 |
| `subcategory_note`  | Optional note shown next to the subcategory title                     |
| `name`              | Item display name                                                     |
| `price`             | Item price (shown as-is, taxes not included)                          |
| `description`       | Optional short description shown below the item name                  |
| `has_image`         | `TRUE` if a matching image exists in `/public`, otherwise leave blank |

You may freely add extra columns to the right (e.g. `cost`, `margin`, `profit`) for your own tracking. The parser ignores any column it does not recognise.

---

_Sailor's Den Café • Surat, Gujarat_
