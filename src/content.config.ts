import { defineCollection } from 'astro:content';
import { z } from 'astro/zod'
import { glob } from 'astro/loaders';

/** The CMS (Sveltia) writes empty optional fields as `""`. Treat blank/whitespace
 * strings as "not provided" so they don't fail date/url/enum validation. */
const emptyToUndefined = (value: unknown) =>
  typeof value === 'string' && value.trim() === '' ? undefined : value;

/** Optional date that tolerates empty-string input from the CMS. */
const optionalDate = () => z.preprocess(emptyToUndefined, z.coerce.date().optional());
/** Optional string that tolerates (and drops) empty-string input from the CMS. */
const optionalString = () => z.preprocess(emptyToUndefined, z.string().optional());
/** Optional URL that tolerates empty-string input from the CMS. */
const optionalUrl = () => z.preprocess(emptyToUndefined, z.url().optional());

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
      imageAlt: optionalString(),
      /** Optional Acuity registration/catalog link. */
      registerUrl: optionalUrl(),
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
      start: optionalDate(),
      /** Optional end date for multi-day ranges. */
      end: optionalDate(),
      /** Free-text time, e.g. "6:30–7:45 pm". Shown for single-day events. */
      time: optionalString(),
      /** Free-text price, e.g. "$120", "By donation". */
      price: optionalString(),
      /** Optional hero image (relative path from the markdown file). */
      image: image().optional(),
      imageAlt: optionalString(),
      /** Optional teacher/facilitator name. */
      teacher: optionalString(),
      /** Registration link (Acuity, Square, etc.). */
      registerUrl: optionalUrl(),
      /** Free-text fallback for donation/email registration cases. */
      registerNote: optionalString(),
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
    pdfUrl: optionalString(),
  }),
});

export const collections = { courses, events, policies };
