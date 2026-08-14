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

/** Fixed category list for events (CMS-ready select). Excludes weekly "Regular
 * Practices" — those live in the Epic 4 schedule grid, not the events collection. */
export const EVENT_CATEGORIES = [
  'Regular Courses',
  'Special Practices',
  'Education',
  'Retreats',
  'Teacher Trainings',
] as const;

/** Workshops, courses, retreats & trainings — the filterable /events collection. */
const events = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/events' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      /** One or more of the fixed category labels. */
      categories: z.array(z.enum(EVENT_CATEGORIES)).nonempty(),
      /** Start date (date-only). Omit for ongoing/undated items. */
      start: z.coerce.date().optional(),
      /** Optional end date for multi-day ranges. */
      end: z.coerce.date().optional(),
      /** Free-text time, e.g. "6:30–7:45 pm". Shown for single-day events. */
      time: z.string().optional(),
      /** Free-text price, e.g. "$120", "By donation". */
      price: z.string().optional(),
      /** Optional hero image (relative path from the markdown file). */
      image: image().optional(),
      imageAlt: z.string().optional(),
      /** Optional teacher/facilitator name. */
      teacher: z.string().optional(),
      /** Registration link (Acuity, Square, etc.). */
      registerUrl: z.url().optional(),
      /** Free-text fallback for donation/email registration cases. */
      registerNote: z.string().optional(),
      /** Undated items that always show and sort last (e.g. teacher trainings). */
      ongoing: z.boolean().default(false),
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

export const collections = { courses, events, policies };
