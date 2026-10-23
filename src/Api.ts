import axios from "axios";
import type { Category, Menu } from "./Types";

export const API_URL = import.meta.env.VITE_MOCK_API;

function isMenu(value: unknown): value is Menu {
  return (
    Array.isArray(value) &&
    value.every(
      (category: unknown): category is Category =>
        typeof category === "object" &&
        category !== null &&
        "id" in category &&
        typeof category.id === "number" &&
        "category" in category &&
        typeof category.category === "string" &&
        "products" in category &&
        Array.isArray(category.products)
    )
  );
}

export async function fetchMenu(): Promise<Menu> {
  if (!API_URL) {
    throw new Error(
      "Menu API URL is not configured. Set VITE_MOCK_API in your .env file to the menu JSON endpoint."
    );
  }

  const { data } = await axios.get<unknown>(API_URL);

  if (!isMenu(data)) {
    throw new Error(
      `The menu API at "${API_URL}" did not return a valid menu array. Check that VITE_MOCK_API points to an endpoint returning menu JSON.`
    );
  }

  return data;
}
