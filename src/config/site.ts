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
      { label: 'Community Outreach', href: '/about/community-outreach' },
      { label: 'Yoga Halls Rental', href: '/about/rental' },
    ],
  },
  { label: 'Class Schedule', href: '/schedule' },
  { label: 'Online', href: '/online' },
  {
    label: 'Courses',
    href: '/courses',
    children: [
      { label: 'New to Yoga', href: '/new-to-yoga' },
      { label: 'Meditation', href: '/courses/meditation' },
      { label: 'Private Yoga & Meditation', href: '/courses/private' },
    ],
  },
  { label: 'Workshops / Events', href: '/events' },
  {
    label: 'Retreats & Training',
    children: [
      { label: 'Weekend Yoga Retreat', href: '/retreats/weekend-retreat' },
      { label: 'Sivananda Ashram Yoga Camp', href: site.external.ashramCamp, external: true },
      { label: 'Teacher Training', href: site.external.teacherTraining, external: true },
    ],
  },
];

/** Footer policy links. */
export const policyNav: NavChild[] = [
  { label: 'Terms & Conditions', href: '/policies/terms' },
  { label: 'Refund Policy', href: '/policies/refund' },
  { label: 'Privacy Policy', href: '/policies/privacy' },
  { label: 'Misconduct Policy', href: '/policies/misconduct' },
];
