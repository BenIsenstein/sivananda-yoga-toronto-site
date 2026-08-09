/** Central site configuration: navigation, contact, socials, external links. */

export interface NavChild {
  label: string;
  href: string;
  /** External links open in a new tab. */
  external?: boolean;
}

export interface NavItem {
  label: string;
  href?: string;
  external?: boolean;
  children?: NavChild[];
}

export const site = {
  name: 'Toronto Sivananda Yoga Vedanta Centre',
  shortName: 'Sivananda Yoga Toronto',
  description:
    'Yoga and meditation classes, courses, workshops and retreats in Toronto, in the classical Sivananda tradition since 1992.',
  contact: {
    address: '77 Harbord Street',
    city: 'Toronto',
    region: 'ON',
    postalCode: 'M5S 1G4',
    phone: '(416) 966-9642',
    phoneHref: 'tel:+14169669642',
    email: 'toronto@sivananda.org',
    mapUrl: 'https://goo.gl/maps/nVnPhLyEiiN2',
  },
  /** Opening hours, verbatim from the contact page. */
  hours: [
    { day: 'Monday', times: '4:30–9 pm' },
    { day: 'Tuesday', times: '9–11:30 am, 4:30–9 pm' },
    { day: 'Wednesday', times: '4:30–9 pm' },
    { day: 'Thursday', times: '9–11:30 am, 4:30–9 pm' },
    { day: 'Friday', times: '9–11:30 am, 4:30–9 pm' },
    { day: 'Saturday', times: '9 am–1 pm, 3:30–6 pm' },
    { day: 'Sunday', times: '3:30–8 pm' },
  ],
  /** Third-party services (kept as-is per project decisions). */
  external: {
    book: 'https://sivanandacanada.org/toronto/book-a-yoga-class/',
    donate: 'https://checkout.square.site/merchant/MLVFQVFE88V53/checkout/6LZW7K4VLLAYOYUOVJ3STY2P',
    newsletter:
      'https://visitor.r20.constantcontact.com/manage/optin?v=001DFTCDgfTjaiiqq2g70t_GRawETeAK0eAAwF6LciMN4BsJ9pmPAXn1-XhBUEccp-s3TO7upklh3aquiW4OObjSF9h0urISSWzZBZcYOU8_COE5yf0Z_rsndvXe3RGIBgD8pkkojqL-ELMFuwt5EUf8M8Rk0tMZWwk8R7fI8GNDgg%3D',
    ashramCamp: 'https://sivanandacanada.org/camp',
    teacherTraining: 'https://sivanandacanada.org/camp/teachers-training/',
  },
  social: {
    facebook: 'https://www.facebook.com/sivanandayogatoronto/',
    instagram: 'https://www.instagram.com/sivanandayogatoronto/',
    youtube: 'https://www.youtube.com/user/SivanandaYogaToronto',
  },
} as const;

/** Primary navigation (mirrors current site IA, dead pages dropped). */
export const mainNav: NavItem[] = [
  {
    label: 'About Us',
    href: '/about',
    children: [
      { label: 'Where to Start?', href: '/new-to-yoga' },
      { label: 'Our Centre', href: '/about/our-centre' },
      { label: 'Our Teachers', href: '/about/teachers' },
      { label: 'What We Teach', href: '/about/what-we-teach' },
      { label: 'Dose of Yoga Inspiration', href: '/about/inspiration' },
      { label: 'Community Outreach', href: '/about/community-outreach' },
      { label: 'Yoga Halls Rental', href: '/about/rental' },
    ],
  },
  {
    label: 'Classes',
    href: '/schedule',
    children: [
      { label: 'Class Schedule', href: '/schedule' },
      { label: 'Online', href: '/online' },
      { label: 'Class Descriptions', href: '/class-descriptions' },
      { label: 'New to Yoga', href: '/new-to-yoga' },
    ],
  },
  {
    label: 'Courses',
    href: '/courses',
    children: [
      { label: 'Meditation', href: '/courses/meditation' },
      { label: 'Private Yoga & Meditation', href: '/courses/private' },
      { label: 'Pranayama', href: '/courses/pranayama' },
      { label: 'Ayurvedic Nutrition & Cooking', href: '/courses/ayurvedic-nutrition' },
      { label: 'Philosophy', href: '/courses/philosophy' },
      { label: 'Vedic Studies', href: '/courses/vedic-studies' },
      { label: 'Nada Yoga & Mantras', href: '/courses/nada-yoga' },
    ],
  },
  { label: 'Workshops / Events', href: '/events' },
  {
    label: 'Retreats & Training',
    children: [
      { label: 'Weekend Yoga Retreat', href: '/retreats/weekend-retreat' },
      { label: 'Chair Yoga Teacher Training', href: '/training/chair-yoga' },
      { label: 'Gentle Yoga Teacher Training', href: '/training/gentle-yoga' },
      { label: 'Prenatal Yoga Teacher Training', href: '/training/prenatal-yoga' },
      { label: 'Sivananda Ashram Yoga Camp', href: site.external.ashramCamp, external: true },
      { label: 'Teacher Training (TTC)', href: site.external.teacherTraining, external: true },
    ],
  },
  {
    label: 'Community',
    children: [
      { label: 'Kids Yoga', href: '/kids-teens/kids-yoga' },
      { label: 'Teen Yoga', href: '/kids-teens/teen-yoga' },
      { label: 'For Parents', href: '/kids-teens/for-parents' },
      { label: 'Satsang', href: '/satsang' },
      { label: 'Sunday Prayers', href: '/satsang/sunday-prayers' },
      { label: 'Puja', href: '/satsang/puja' },
      { label: 'Fundraiser', href: '/fundraiser' },
      { label: 'FAQ', href: '/faq' },
      { label: 'Contact', href: '/contact' },
    ],
  },
];

/** Footer policy links. */
export const policyNav: NavChild[] = [
  { label: 'Terms & Conditions', href: '/policies/terms' },
  { label: 'Refund Policy', href: '/policies/refund' },
  { label: 'Privacy Policy', href: '/policies/privacy' },
  { label: 'Data Privacy Policy', href: '/policies/data-privacy' },
  { label: 'Anti-Harassment Policy', href: '/policies/anti-harassment' },
  { label: 'Misconduct Policy', href: '/policies/misconduct' },
];
