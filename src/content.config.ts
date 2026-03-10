import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    category: z.enum(['ai-tools', 'saas', 'gadgets', 'guides', 'ranking']),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    affiliate: z.array(z.object({
      name: z.string(),
      url: z.string(),
      price: z.string().optional(),
      rating: z.number().optional(),
    })).optional(),
  }),
});

export const collections = { blog };
