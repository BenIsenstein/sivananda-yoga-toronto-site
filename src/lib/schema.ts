/**
 * JSON-LD builders for structured data (schema.org).
 * Kept framework-free so components can import and embed via <Seo jsonLd={...}/>.
 */
import { site } from '@/config/site';
import type { EventEntry } from '@/lib/events';

/** Absolute URL helper against the deployed origin. */
function abs(origin: URL | undefined, path: string): string | undefined {
  if (!origin) return undefined;
  return new URL(path, origin).href;
}

/** Stable @id for the organization node, so other nodes can reference it. */
export function orgId(origin: URL | undefined): string {
  return `${origin ? new URL(origin).href.replace(/\/$/, '') : ''}/#organization`;
}

/**
 * Site-wide LocalBusiness + WebSite graph. Emit once on the homepage (and
 * optionally /contact). Uses the central `site` config.
 */
export function localBusinessGraph(origin: URL | undefined): Record<string, unknown> {
  const base = origin ? new URL(origin).href.replace(/\/$/, '') : '';
  const c = site.contact;

  return {
    '@graph': [
      {
        '@type': ['LocalBusiness', 'HealthAndBeautyBusiness'],
        '@id': `${base}/#organization`,
        name: site.name,
        alternateName: site.shortName,
        description: site.description,
        url: `${base}/`,
        telephone: c.phoneHref.replace('tel:', ''),
        email: c.email,
        priceRange: site.priceRange,
        foundingDate: site.foundingYear,
        address: {
          '@type': 'PostalAddress',
          streetAddress: c.address,
          addressLocality: c.city,
          addressRegion: c.region,
          postalCode: c.postalCode,
          addressCountry: c.country,
        },
        geo: {
          '@type': 'GeoCoordinates',
          latitude: c.geo.latitude,
          longitude: c.geo.longitude,
        },
        hasMap: c.mapUrl,
        openingHoursSpecification: site.hoursSpec.map((h) => ({
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: `https://schema.org/${h.day}`,
          opens: h.opens,
          closes: h.closes,
        })),
        sameAs: [site.social.facebook, site.social.instagram, site.social.youtube],
      },
      {
        '@type': 'WebSite',
        '@id': `${base}/#website`,
        url: `${base}/`,
        name: site.name,
        publisher: { '@id': `${base}/#organization` },
        inLanguage: 'en-CA',
      },
    ],
  };
}

/** Parse a free-text price like "$120" / "By donation" into an Offer price. */
function parsePrice(price?: string): { price: string; free: boolean } | undefined {
  if (!price) return undefined;
  const match = price.replace(/,/g, '').match(/\$\s*(\d+(?:\.\d{1,2})?)/);
  if (match) return { price: match[1], free: false };
  if (/donation|free|pwyc|pay what/i.test(price)) return { price: '0', free: true };
  return undefined;
}

/**
 * Event JSON-LD from a collection entry. `imageUrl` should be the built,
 * absolute optimized image URL (or undefined).
 */
export function eventSchema(
  event: EventEntry,
  origin: URL | undefined,
  imageUrl?: string
): Record<string, unknown> {
  const { data } = event;
  const url = abs(origin, `/events/${event.id}`);

  const schema: Record<string, unknown> = {
    '@type': 'Event',
    name: data.title,
    url,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    // The centre is the location for in-person events.
    location: {
      '@type': 'Place',
      name: site.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.contact.address,
        addressLocality: site.contact.city,
        addressRegion: site.contact.region,
        postalCode: site.contact.postalCode,
        addressCountry: site.contact.country,
      },
    },
    organizer: {
      '@type': 'Organization',
      name: site.name,
      url: origin ? new URL(origin).href.replace(/\/$/, '') + '/' : undefined,
    },
  };

  if (data.start) schema.startDate = data.start.toISOString().slice(0, 10);
  if (data.end) schema.endDate = data.end.toISOString().slice(0, 10);
  if (imageUrl) schema.image = imageUrl;
  if (data.teacher) {
    schema.performer = { '@type': 'Person', name: data.teacher };
  }

  const parsed = parsePrice(data.price);
  if (parsed) {
    schema.offers = {
      '@type': 'Offer',
      price: parsed.price,
      priceCurrency: 'CAD',
      availability: 'https://schema.org/InStock',
      ...(data.registerUrl ? { url: data.registerUrl } : {}),
    };
  }

  return schema;
}
