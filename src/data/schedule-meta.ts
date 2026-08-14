import { z } from 'astro/zod';
import yaml from 'js-yaml';
import inPersonRaw from './schedule-in-person.yaml?raw';
import onlineRaw from './schedule-online.yaml?raw';

export const DAYS = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday',
] as const;
export type Day = (typeof DAYS)[number];

export const CLASS_TYPES = [
  'Intermediate',
  'Meditative',
  'Basic/Beginner',
  'Variations',
  'Free Trial',
  'Satsang',
  'Other',
] as const;

/** Class-type descriptions, verbatim from the live schedule page. */
export const classTypeDescriptions: Record<string, string> = {
  Intermediate:
    'Classical Sivananda yoga class for those who already have basic knowledge of yoga. Initial relaxation, breathing exercises (Pranayama), Sun Salutations, a series of Hatha Yoga postures (Asanas) and extended final relaxation.',
  Meditative:
    'Longer holding of postures and a short meditation practice at the end. The goal is deepening body awareness and the development of concentration.',
  'Basic/Beginner':
    'Learn and practice elements of the Sivananda yoga class. For students with little or no yoga experience who would like more guidance before joining an intermediate class, but are not able to attend our 5-week beginner course.',
  Variations:
    'Variations of the basic postures. The goal is development of mobility, endurance and stimulation of vital energy.',
  'Free Trial': 'Recommended if you are new to yoga or to the Sivananda tradition.',
  Satsang: 'Group meditation, chanting and a short talk. All are welcome.',
  Other: 'A special session — see the class name for details.',
};

const classSchema = z.object({
  day: z.enum(DAYS),
  start: z.string().regex(/^\d{2}:\d{2}$/, 'start must be HH:MM'),
  end: z.string().regex(/^\d{2}:\d{2}$/, 'end must be HH:MM'),
  label: z.string(),
  classType: z.enum(CLASS_TYPES),
  acuity: z.string(),
});

const fileSchema = z.object({ classes: z.array(classSchema) });

export type ScheduleClass = z.infer<typeof classSchema> & {
  /** e.g. "5:00 – 6:30 PM" */
  timeLabel: string;
};

function to12h(hhmm: string): string {
  const [h, m] = hhmm.split(':').map(Number);
  const period = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${period}`;
}

function parse(raw: string): ScheduleClass[] {
  const data = fileSchema.parse(yaml.load(raw));
  return data.classes
    .map((c) => ({ ...c, timeLabel: `${to12h(c.start)} – ${to12h(c.end)}` }))
    .sort((a, b) => DAYS.indexOf(a.day) - DAYS.indexOf(b.day) || a.start.localeCompare(b.start));
}

export const inPersonClasses: ScheduleClass[] = parse(inPersonRaw);
export const onlineClasses: ScheduleClass[] = parse(onlineRaw);

/** Class passes (Acuity catalog). Valid for online + in-studio drop-in classes. */
export const passes = [
  {
    name: 'New Student Unlimited — 1 Month',
    price: '$65',
    url: 'https://app.acuityscheduling.com/catalog.php?owner=21122031&action=addCart&clear=1&id=2196077',
  },
  {
    name: '1 Class Pass',
    price: '$22',
    url: 'https://app.acuityscheduling.com/catalog/a14845e0/?productId=920959&clearCart=true',
  },
  {
    name: '10 Class Pass',
    price: '$160',
    url: 'https://app.acuityscheduling.com/catalog/a14845e0/?productId=920958&clearCart=true',
  },
  {
    name: '20 Class Pass',
    price: '$275',
    url: 'https://app.acuityscheduling.com/catalog/a14845e0/?productId=926203&clearCart=true',
  },
  {
    name: '1 Month Pass',
    price: '$125',
    url: 'https://app.acuityscheduling.com/catalog/a14845e0/?productId=920957&clearCart=true',
  },
  {
    name: '1 Year Pass',
    price: '$950',
    url: 'https://app.acuityscheduling.com/catalog/a14845e0/?productId=926204&clearCart=true',
  },
] as const;

export const giftCards = {
  eGift: 'https://app.acuityscheduling.com/catalog.php?owner=21122031&category=GIFT+CERTIFICATES',
  printed:
    'https://sivanandatoronto.square.site/product/gift-certificate/22?cp=true&sa=true&sbp=false&q=false',
} as const;

export const booking = {
  inPerson: 'https://sivanandatoronto.as.me/?appointmentType=category:Classes',
  online: 'https://SivanandaToronto.as.me/?appointmentType=category:Classes%20Online',
  /** Acuity scheduler iframe used on /book. */
  iframe:
    'https://app.acuityscheduling.com/schedule.php?owner=21122031&appointmentType=category:Classes',
} as const;
