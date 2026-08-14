import { getCollection, type CollectionEntry } from 'astro:content';

export type EventEntry = CollectionEntry<'events'>;

/** Midnight today (local) — used for build-time auto-hide of past events. */
function startOfToday(): Date {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

/** An event is multi-day when it has an `end` that differs from its `start`. */
export function isMultiDay(data: EventEntry['data']): boolean {
  if (!data.start || !data.end) return false;
  return data.end.getTime() !== data.start.getTime();
}

/** The date used for sorting/auto-hide: `end` if present, else `start`. */
function effectiveEnd(data: EventEntry['data']): Date | undefined {
  return data.end ?? data.start;
}

/**
 * Format an event's date(s) for cards and detail pages.
 * - Single-day: "Aug 14"
 * - Multi-day, same year: "Aug 14 – Sep 11"
 * - Cross-year: "Dec 20, 2026 – Jan 3, 2027"
 * Returns an empty string for ongoing/undated events.
 */
export function formatEventDate(data: EventEntry['data']): string {
  const { start, end } = data;
  if (!start) return '';

  const monthDay = (d: Date) =>
    d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' });
  const monthDayYear = (d: Date) =>
    d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      timeZone: 'UTC',
    });

  if (!isMultiDay(data) || !end) return monthDay(start);

  const crossYear = start.getUTCFullYear() !== end.getUTCFullYear();
  return crossYear
    ? `${monthDayYear(start)} – ${monthDayYear(end)}`
    : `${monthDay(start)} – ${monthDay(end)}`;
}

/** Sort key: dated events ascending by start; ongoing events sort last. */
function compareEvents(a: EventEntry, b: EventEntry): number {
  const aOngoing = a.data.ongoing || !a.data.start;
  const bOngoing = b.data.ongoing || !b.data.start;
  if (aOngoing && bOngoing) return a.data.title.localeCompare(b.data.title);
  if (aOngoing) return 1;
  if (bOngoing) return -1;
  return a.data.start!.getTime() - b.data.start!.getTime();
}

/**
 * Load visible events: drops drafts and past events (by `end` or `start`),
 * keeps ongoing events, and sorts soonest-first with ongoing last.
 */
export async function getVisibleEvents(): Promise<EventEntry[]> {
  const today = startOfToday();
  const events = await getCollection('events', ({ data }) => !data.draft);
  return events
    .filter((event) => {
      if (event.data.ongoing) return true;
      const end = effectiveEnd(event.data);
      if (!end) return true;
      return end.getTime() >= today.getTime();
    })
    .sort(compareEvents);
}
