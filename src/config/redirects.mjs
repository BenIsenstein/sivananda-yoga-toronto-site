// @ts-check
/**
 * 301 redirect map: legacy WordPress paths (sivanandacanada.org/toronto/*) →
 * new site routes. Sourced from the old page-sitemap.xml (Epic 7).
 *
 * Keys are the new-site absolute paths (leading slash, no /toronto prefix) that
 * the OLD site used; values are the new destination. Astro emits static redirect
 * pages for these; `public/_redirects` mirrors them as host-level 301s.
 *
 * Dead/dropped events and legacy event hubs → /events.
 * Legacy class hubs → /schedule. yoga-camp → external ashram site.
 */

/** @type {Record<string, string>} */
export const redirectMap = {
  // --- About ---
  '/about1': '/about',
  '/our-centre': '/about/our-centre',
  '/our-teacher': '/about/teachers',
  '/what-we-teach': '/about/what-we-teach',
  '/yoga-inspiration': '/about/inspiration',
  '/community-outreach': '/about/community-outreach',
  '/rental': '/about/rental',
  '/sivananda-canada-advisory-council': '/about',

  // --- Get started ---
  '/new-to-yoga-2': '/new-to-yoga',

  // --- Classes / schedule (legacy hubs → schedule) ---
  '/classes': '/schedule',
  '/yoga-classes': '/schedule',
  '/online-schedule': '/online',
  '/yoga-class-descriptions': '/class-descriptions',
  '/in-person-yoga-class': '/schedule',
  '/in-person-class-guideliness': '/schedule',
  '/book-a-yoga-class': '/book',
  '/gift-cards': '/passes',

  // --- Courses ---
  '/yoga-courses': '/courses',
  '/meditation-courses': '/courses/meditation',
  '/private-yoga-classes': '/courses/private',
  '/ayurvedic-nutrition': '/courses/ayurvedic-nutrition',
  '/philosophy-courses': '/courses/philosophy',
  '/vedic-studies': '/courses/vedic-studies',
  '/nada-yoga-mantras': '/courses/nada-yoga',
  '/yantras-sacred-arrangements-of-energy-level-1': '/courses/vedic-studies',

  // --- Retreats & Training ---
  '/weekend-yoga-retreat-ontario': '/retreats/weekend-retreat',
  '/teacher-training-courses': '/courses',
  '/courses/chair-yoga-teacher-training': '/training/chair-yoga',
  '/gentle-yoga-teacher-training': '/training/gentle-yoga',
  '/prenatal-yoga-teacher-training': '/training/prenatal-yoga',

  // --- Kids / Teens / Family ---
  '/yoga-for-kids-and-teens': '/kids-teens/kids-yoga',
  '/yoga-and-meditation-for-teens': '/kids-teens/teen-yoga',
  '/for-parents': '/kids-teens/for-parents',
  // Quebec ashram kids/teen camp — content now lives on the ashram site.
  '/yoga-camp': 'https://sivanandacanada.org/camp',

  // --- Satsang / Spiritual ---
  '/satsang-free-group-meditation': '/satsang',
  '/sunday-prayers-2': '/satsang/sunday-prayers',
  '/puja': '/satsang/puja',
  '/christmas-satsang': '/satsang',
  '/holiday-celebrations': '/satsang',

  // --- Support ---
  '/sivananda-fundraising-campaign': '/fundraiser',
  '/fundraiser-for-sivananda-rural-medical-camp': '/fundraiser',

  // --- Contact & FAQ ---
  '/frequently-asked-questions': '/faq',
  '/how-to-register-for-an-online-course-workshop-event': '/faq',

  // --- Policies ---
  '/registration-terms-conditions': '/policies/terms',
  '/refund-policy': '/policies/refund',
  '/privacy-policy': '/policies/privacy',
  '/data-privacy-policy': '/policies/data-privacy',
  '/anti-harassment-policy': '/policies/anti-harassment',
  '/misconduct-policy': '/policies/misconduct',

  // --- Events (legacy hubs + individual/dead events → /events) ---
  '/programs': '/events',
  '/yoga-programs': '/events',
  '/yoga-workshop': '/events',
  '/pranayama-with-dr-sundar': '/courses/pranayama',
  '/pranayama-with-mayavan': '/courses/pranayama',
  '/ayurvedic-nutrition-and-cooking-course-with-dr-sonal-bhatt': '/courses/ayurvedic-nutrition',
  '/gentle-yoga': '/events',
  '/prenatal-yoga-courses': '/events',
  '/yoga-workshop/kids-yoga-classes': '/kids-teens/kids-yoga',
  '/yoga-vacations-at-the-ashrams': 'https://sivanandacanada.org/camp',
};
