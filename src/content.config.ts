import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articleSchema = z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.string(),
    updatedDate: z.string().optional(),
    category: z.enum(['ai-tools', 'saas', 'gadgets', 'guides', 'ranking', 'business']),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    affiliate: z.array(z.object({
      name: z.string(),
      url: z.string(),
      price: z.string().optional(),
      rating: z.number().optional(),
      description: z.string().optional(),
    })).optional(),
    comparisonTable: z.array(z.object({
      rank: z.number(),
      name: z.string(),
      price: z.string(),
      feature: z.string(),
      japaneseSupport: z.string(),
      planType: z.string(),
      rating: z.number(),
    })).optional(),
    ctaBox: z.object({
      name: z.string(),
      price: z.string(),
      priceNote: z.string().optional(),
      benefits: z.array(z.string()),
      ctaText: z.string(),
      ctaUrl: z.string(),
      isTopPick: z.boolean().optional(),
    }).optional(),
    faqItems: z.array(z.object({
      question: z.string(),
      answer: z.string(),
    })).optional(),
    reviewSchema: z.object({
      productName: z.string(),
      rating: z.number(),
      reviewCount: z.number(),
      details: z.array(z.object({
        label: z.string(),
        value: z.string(),
      })),
    }).optional(),
    topicCluster: z.object({
      pillarTitle: z.string(),
      pillarDescription: z.string(),
      clusters: z.array(z.object({
        title: z.string(),
        url: z.string(),
      })),
    }).optional(),
});

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: articleSchema,
});

const blogEn = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog-en' }),
  schema: articleSchema,
});

export const collections = { blog, blogEn };
