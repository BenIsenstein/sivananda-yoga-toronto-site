import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

/** Uniform course pages — power the /courses hub grid and individual pages. */
const courses = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/courses' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      summary: z.string(),
      order: z.number().default(99),
      /** Optional hero image (relative path from the markdown file). */
      image: image().optional(),
      imageAlt: z.string().optional(),
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
    /** Optional PDF served from /public (e.g. misconduct policy). Local path or URL. */
    pdfUrl: z.string().optional(),
  }),
});

export const collections = { courses, policies };
