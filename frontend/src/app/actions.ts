"use server";

import { query } from "@/lib/db";

export interface FeaturedProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  subCategory: string;
}

export async function getFeaturedProducts(): Promise<FeaturedProduct[]> {
  try {
    const result = await query(
      `SELECT id, name, price, image, "subCategory" 
       FROM "Product" 
       WHERE "isSpecial" = true 
       ORDER BY "createdAt" DESC 
       LIMIT 3;`
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    return [];
  }
}
