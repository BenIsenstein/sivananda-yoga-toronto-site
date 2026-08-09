import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Uniform course pages — power the /courses hub grid and individual pages. */
const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: z.object({
    title: z.string(),
    summary: z.string(),
    order: z.number().default(99),
    /** Optional Acuity registration/catalog link. */
    registerUrl: z.url().optional(),
    draft: z.boolean().default(false),
  }),
});

/** Policy pages — uniform legal/prose shape. */
const policies = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/policies' }),
  schema: z.object({
    title: z.string(),
    order: z.number().default(99),
    /** Optional external PDF (e.g. misconduct policy). */
    pdfUrl: z.url().optional(),
  }),
});

export const collections = { courses, policies };
