"use client";
import { useApi } from "./useApi";
import { normalizeCategories, normalizeProducts } from "./normalize";

export const useProducts = (category?: string) =>
  useApi(category ? `/products?category=${encodeURIComponent(category)}` : "/products", normalizeProducts);

export const useCategories = () => useApi("/categories", normalizeCategories);
