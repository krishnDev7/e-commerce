// Shared DTO & validation schemas (extend as needed)
import { z } from 'zod';

export const ProductSchema = z.object({
  id: z.string(),
  slug: z.string(),
  title: z.string(),
  subtitle: z.string().nullable().optional(),
  description: z.string(),
  priceCents: z.number(),
  currency: z.string(),
  imageUrl: z.string().url().nullable().optional(),
  stock: z.number(),
});
export type ProductDTO = z.infer<typeof ProductSchema>;
