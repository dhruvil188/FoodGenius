import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Converts a string to a URL-friendly slug
 * @param text Text to convert to a slug
 * @returns A URL-friendly slug string
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')     // Replace spaces with -
    .replace(/&/g, '-and-')   // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters
    .replace(/\-\-+/g, '-')   // Replace multiple - with single -
}

/**
 * Finds a recipe by its slug
 * @param recipes Array of recipes to search
 * @param slug Slug to search for
 * @returns The matching recipe or undefined if not found
 */
export function findRecipeBySlug(recipes: any[], slug: string) {
  return recipes.find(recipe => slugify(recipe.foodName) === slug);
}
