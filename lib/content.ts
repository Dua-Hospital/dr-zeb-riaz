import { WINTER_MONTHS } from './clinic-status.ts';
import type { SeasonalClinic, SeasonId } from './clinic-status.ts';
import type { Locale } from './site.ts';

// The single source of all copy and data for both languages. Components hold no literal copy.
// Facts come from docs/client-data.md. Urdu strings are awaiting native review: see docs/urdu-review.md.

export type IconName = 'egg'|'sperm'|'pill'|'flask'|'dish'|'pregnant'|'baby'|'drop'|'uterus'|'shield'|'ribbon'|'bladder'
  |'wa'|'arrow'|'chev'|'menu'|'close'|'check'|'award'|'cap'|'pin'|'chat'|'nav'|'cal'|'plus'|'alert'|'clock'|'file'|'steth'|'list'|'star'|'globe'
  |'facebook'|'instagram'|'youtube'|'tiktok';

type Both = { en: string; ur: string };

export const DOCTOR = { name: 'Dr. Zeb Riaz', nameUr: 'ڈاکٹر زیب ریاض' } as const;

/** Social accounts, in the order the footer shows them (supplied by the client, 2026-11-13). */
export const SOCIAL_NETWORKS = ['facebook', 'instagram', 'youtube', 'tiktok'] as const;
export type SocialNetwork = (typeof SOCIAL_NETWORKS)[number];
export const SOCIAL_NAMES: Record<SocialNetwork, string> = {
  facebook: 'Facebook', instagram: 'Instagram', youtube: 'YouTube', tiktok: 'TikTok',
};
export const SOCIALS: Record<'doctor' | 'hospital', Record<SocialNetwork, string>> = {
  doctor: {
    facebook: 'https://www.facebook.com/drzebriaz',
    instagram: 'https://www.instagram.com/drzebriaz/',
    youtube: 'https://www.youtube.com/@drzebriaz',
    tiktok: 'https://www.tiktok.com/@drzebriaz',
  },
  hospital: {
    facebook: 'https://www.facebook.com/duahospitalmultan',
    instagram: 'https://www.instagram.com/duahospitalmultan/',
    youtube: 'https://www.youtube.com/@duahospitalmultan',
    tiktok: 'https://www.tiktok.com/@duahospitalmultan',
  },
};

/* ------------------------------------------------------------------ */
/*  Clinic: Dua Hospital only, with winter and summer hours (spec Z7, Z8) */
/* ------------------------------------------------------------------ */

export interface Clinic extends SeasonalClinic {
  name: string;
  nameUr: string;
  label: Both; // Evening
  address: Both;
  landmark: Both;
  mapsQuery: string;
  hoursText: Record<SeasonId, string>; // same in both locales
  daysText: Both;
  winterMonths: readonly number[];
}

export const CLINICS: readonly Clinic[] = [
  {
    id: 'dua',
    name: 'Dua Hospital',
    nameUr: 'دعا ہسپتال',
    label: { en: 'Evening', ur: 'شام کے وقت' },
    days: [false, true, true, true, true, true, true], // Sun..Sat — closed Sunday
    seasons: {
      winter: { openMin: 1020, closeMin: 1260 }, // 5 PM – 9 PM
      summer: { openMin: 1080, closeMin: 1320 }, // 6 PM – 10 PM
    },
    winterMonths: WINTER_MONTHS,
    address: {
      en: 'First Floor, Bank Plaza, Sher Shah Road, Garden Town, Multan',
      ur: 'فرسٹ فلور، بینک پلازہ، شیر شاہ روڈ، گارڈن ٹاؤن، ملتان',
    },
    landmark: { en: 'Near Shell petrol pump, opposite Taunsa Street', ur: 'نزد شیل پٹرول پمپ، بالمقابل تونسہ سٹریٹ' },
    mapsQuery: 'Dua Hospital Bank Plaza Sher Shah Road Garden Town Multan',
    hoursText: { winter: '5:00 PM – 9:00 PM', summer: '6:00 PM – 10:00 PM' },
    daysText: { en: 'Monday to Saturday · Sunday off', ur: 'پیر تا ہفتہ · اتوار کو بند' },
  },
];

/* ------------------------------------------------------------------ */
/*  Care: 15 services in 5 groups (spec §6.2)                          */
/* ------------------------------------------------------------------ */

export type CareGroup = 'fertility' | 'pregnancy' | 'periods' | 'women' | 'breast';

export interface Treatment {
  icon: IconName;
  name: string;
  nameUr: string;
  blurb: string;
  blurbUr: string;
  group: CareGroup;
  pending?: true; // not yet confirmed by the client: not rendered
}

export const CARE_GROUPS: readonly CareGroup[] = ['fertility', 'pregnancy', 'periods', 'women', 'breast'];

const tx = (icon: IconName, name: string, nameUr: string, blurb: string, blurbUr: string, group: CareGroup, pending?: true): Treatment =>
  (pending ? { icon, name, nameUr, blurb, blurbUr, group, pending } : { icon, name, nameUr, blurb, blurbUr, group });

export const CARE: readonly Treatment[] = [
  tx('egg', 'Female infertility', 'زنانہ بانجھ پن', 'Tests and treatment when pregnancy is not happening.', 'حمل نہ ٹھہرنے کی صورت میں ٹیسٹ اور علاج۔', 'fertility'),
  tx('sperm', 'Male infertility & low sperm count', 'مردانہ بانجھ پن اور سپرم کی کمی', 'Semen tests and treatment for the husband too.', 'شوہر کے ٹیسٹ اور علاج بھی۔', 'fertility'),
  tx('pill', 'Fertility medicines', 'بانجھ پن کی دوائیں', 'Medicines that help ovulation, with scan follow-up.', 'بیضہ بننے میں مدد کی دوائیں، الٹراساؤنڈ کے ساتھ۔', 'fertility'),
  tx('flask', 'IUI', 'IUI', 'A simple procedure that can help couples conceive.', 'ایک آسان طریقہ جو حمل ٹھہرنے میں مدد کر سکتا ہے۔', 'fertility'),
  tx('dish', 'IVF', 'IVF', 'Guidance and care through IVF with a specialist team.', 'ماہر ٹیم کے ساتھ IVF میں رہنمائی اور دیکھ بھال۔', 'fertility'),
  tx('pregnant', 'Pregnancy check-ups', 'حمل کا چیک اپ', 'Regular visits, scans and tests through pregnancy.', 'حمل کے دوران باقاعدہ معائنہ، الٹراساؤنڈ اور ٹیسٹ۔', 'pregnancy'),
  tx('alert', 'Pregnancy complications', 'حمل کی پیچیدگیاں', 'Bleeding, high BP, sugar and other concerns in pregnancy.', 'حمل میں خون آنا، بلڈ پریشر، شوگر اور دیگر مسائل۔', 'pregnancy'),
  tx('baby', 'Normal delivery & C-section', 'نارمل ڈیلیوری اور سی سیکشن', 'Delivery at Dua Hospital, normal or by operation.', 'دعا ہسپتال میں نارمل یا آپریشن سے ڈیلیوری۔', 'pregnancy'),
  tx('cal', 'Irregular periods', 'ماہواری کی بے قاعدگی', 'Periods that come early, late or not at all.', 'ماہواری کا جلدی، دیر سے یا بالکل نہ آنا۔', 'periods'),
  tx('drop', 'Period pain', 'ماہواری میں درد', 'Painful or heavy periods, and finding the cause.', 'تکلیف دہ یا زیادہ ماہواری، اور اس کی وجہ کی تشخیص۔', 'periods'),
  tx('uterus', 'PCOS', 'PCOS', 'Irregular periods, weight and hormone problems.', 'بے قاعدہ ماہواری، وزن اور ہارمون کے مسائل۔', 'periods', true),
  tx('uterus', 'Uterine prolapse', 'بچہ دانی کا نیچے آنا', 'A weak or dropped womb, with treatment options.', 'کمزور یا نیچے سرکی ہوئی بچہ دانی کا علاج۔', 'women'),
  tx('shield', 'Leucorrhoea (discharge)', 'لیکوریا', 'Unusual discharge, infections and their treatment.', 'غیر معمولی رطوبت، انفیکشن اور ان کا علاج۔', 'women'),
  tx('bladder', 'Urine infection', 'پیشاب کا انفیکشن', 'Burning, frequent urine and repeat infections.', 'پیشاب میں جلن، بار بار پیشاب اور بار بار انفیکشن۔', 'women'),
  tx('ribbon', 'Breast checks', 'چھاتی کا معائنہ', 'Breast examination and advice on screening.', 'چھاتی کا معائنہ اور سکریننگ کے بارے میں مشورہ۔', 'breast', true),
];

/** Care items that are shown: everything the client has confirmed. */
export function visibleCare(): readonly Treatment[] {
  return CARE.filter((t) => !t.pending);
}

/** Care groups with at least one shown item, in tab order. */
export function visibleGroups(): readonly CareGroup[] {
  const shown = visibleCare();
  return CARE_GROUPS.filter((g) => shown.some((t) => t.group === g));
}

/* ------------------------------------------------------------------ */
/*  Reviews: empty until real reviews arrive (spec Z12)                */
/* ------------------------------------------------------------------ */

export interface Review { quote: string; name: string; condition: string }

export const REVIEWS: readonly Review[] = [];

/* ------------------------------------------------------------------ */
/*  Per-locale strings                                                 */
/* ------------------------------------------------------------------ */

type Text = (value: string) => string;
type Titled = { title: string; body: string };

export interface SiteContent {
  meta: { title: string; description: string; keywords: string[] };
  dir: 'ltr' | 'rtl';
  langSwitch: { label: string; href: string };
  skipLink: string;
  toTop: string;
  nav: { about: string; care: string; clinic: string; book: string; reviews: string; faq: string; cta: string; menu: string; subtitle: string; role: string };
  status: {
    neutral: string;
    lead: string; // before the pill's detail: "· "
    noClinicToday: string;
    seeing: string;
    until: Text; // (clock)
    opensAtIn: (clock: string, duration: string) => string;
    closedNow: string;
    bookTomorrow: string;
    bookOn: Text; // (day name)
    open: string;
    later: Text; // (duration), per-clinic label
    done: string;
    closedToday: string;
    noClinicNote: Text; // (day name)
  };
  hero: {
    overline: string;
    /** The name and title in the other language: Urdu on the English page, English on the Urdu page. */
    echo: string;
    lineStrong: [string, string];
    lineRest: string;
    chips: string[];
    seeAll: Text; // (count)
    ctaBook: string;
    ctaTimings: string;
    note: string;
  };
  portrait: {
    plateTitle: string; plateSub: string;
    sideOverline: string; sideTitle: string; sideSub: string;
    creds: { title: string; where: string }[];
  };
  today: { heading: string; now: string };
  info: { title: string; sub: string; target: '#clinic' | '#care' | '#about' | 'whatsapp' }[];
  about: {
    overline: string;
    heading: string;
    lead: string;
    lead2: string;
    photoBadge: string;
    facts: { value: string; label: string }[];
    qualHeading: string;
    quals: { title: string; chip: string; where: string }[];
    visitHeading: string;
    visit: { stage: string; title: string; body: string }[];
  };
  care: {
    overline: string;
    heading: string;
    lead: string;
    groups: Record<'all' | CareGroup, string>;
    ask: Titled & { cta: string };
  };
  pinkOctober: { overline: string; heading: string; body: string; cta: string };
  clinics: {
    overline: string; heading: string; lead: string;
    seasonLabel: Record<SeasonId, string>;
    otherSeason: Record<SeasonId, Text>; // (hours text)
    directions: string; bookHere: string; holiday: string;
  };
  book: {
    overline: string;
    heading: string;
    lead: string;
    steps: Titled[];
    cta: string;
    chat: {
      name: string;
      status: string;
      me1: string;
      me2: string;
      them: { pre: string; time: string; post: string }; // `time` is shown in bold
      times: [string, string, string];
    };
  };
  reviews: { overline: string; heading: string };
  faq: {
    overline: string; heading: string; lead: string;
    emergencyTitle: string; emergencyBody: string;
    items: { q: string; a: string }[];
  };
  final: { heading: string; sub: string; cta: string };
  footer: {
    tagline1: string; tagline2: string;
    onPage: string; clinicsHeading: string; help: string; questions: string;
    urduLink: string; // the link to the other language's page
    emergency: Titled;
    copyright: string;
    follow: { doctor: string; hospital: string }; // doctor: heading over her social row; hospital: owner name in the Dua links' labels
    socialLabel: (who: string, network: string) => string; // accessible name of each social link
    hospitalSite: string; // the Dua Hospital website as shown in the footer's bottom row
    hospitalSiteLabel: string; // its accessible name
  };
  dock: { timings: string; book: string };
  days: string[]; // Mon..Sun, short (week strip)
  dayNames: string[]; // Mon..Sun, full (booking prompts)
}

const en: SiteContent = {
  meta: {
    title: 'Dr. Zeb Riaz — Gynaecologist & Obstetrician in Multan | Dua Hospital',
    description:
      'Dr. Zeb Riaz (MBBS, FCPS Obs & Gynae, MRCOG UK), consultant gynaecologist and obstetrician at Dua Hospital, Multan. Infertility, IUI and IVF, pregnancy care, normal delivery and C-section, period problems. Monday to Saturday. Book on WhatsApp.',
    keywords: [
      'Dr Zeb Riaz',
      'gynaecologist in Multan',
      'lady doctor Multan',
      'obstetrician Multan',
      'infertility specialist Multan',
      'IVF Multan',
      'Dua Hospital Multan',
      'Garden Town gynaecologist',
    ],
  },
  dir: 'ltr',
  langSwitch: { label: 'اردو', href: '/ur/' },
  skipLink: 'Skip to main content',
  toTop: 'Back to top',
  nav: {
    about: 'About',
    care: 'Care',
    clinic: 'Clinic & timings',
    book: 'How to book',
    reviews: 'Reviews',
    faq: 'Questions',
    cta: 'Book on WhatsApp',
    menu: 'Menu',
    subtitle: 'Consultant Gynaecologist · MBBS, FCPS, MRCOG (UK)',
    role: 'Consultant Gynaecologist & Obstetrician',
  },
  status: {
    neutral: 'Mon – Sat · see timings',
    lead: '· ',
    noClinicToday: 'Closed today (Sunday)',
    seeing: 'Seeing patients now',
    until: (clock) => `until ${clock}`,
    opensAtIn: (clock, d) => `Opens at ${clock} · in ${d}`,
    closedNow: 'Closed for today',
    bookTomorrow: 'Book now for tomorrow',
    bookOn: (day) => `Book now for ${day}`,
    open: 'Open now',
    later: (d) => `Opens in ${d}`,
    done: 'Closed for today',
    closedToday: 'Closed today',
    noClinicNote: (day) => `The clinic is closed on Sunday. Send a WhatsApp message to book for ${day}.`,
  },
  hero: {
    overline: 'Consultant Gynaecologist & Obstetrician',
    echo: 'ڈاکٹر زیب ریاض · کنسلٹنٹ گائناکالوجسٹ اور ماہرِ زچگی',
    lineStrong: ['Pregnancy. Fertility.', "Women's health."],
    lineRest: "One specialist, from trying to conceive to your baby's first week.",
    chips: ['Infertility', 'IUI & IVF', 'Pregnancy care', 'Normal & C-section', 'Irregular periods', 'Period pain'],
    seeAll: (n) => `See all ${n}`,
    ctaBook: 'Book on WhatsApp',
    ctaTimings: 'Clinic timings',
    note: 'Monday to Saturday · Closed on Sunday',
  },
  portrait: {
    plateTitle: 'Dr. Zeb Riaz',
    plateSub: 'Consultant Gynaecologist, Multan',
    sideOverline: 'About',
    sideTitle: 'Consultant Gynaecologist & Obstetrician at Dua Hospital',
    sideSub: 'Fertility, pregnancy and women’s health.',
    creds: [
      { title: 'MBBS', where: 'Army Medical College' },
      { title: 'FCPS', where: 'Obs & Gynae, CPSP' },
      { title: 'MRCOG (UK)', where: 'Royal College, UK' },
      { title: 'Owner & CEO', where: 'Dua Hospital' },
    ],
  },
  today: { heading: 'Today at Dua Hospital', now: 'Now' },
  info: [
    { title: 'Mon – Sat', sub: 'Closed Sunday', target: '#clinic' },
    { title: 'Evenings', sub: 'Winter 5 – 9 PM · Summer 6 – 10 PM', target: '#clinic' },
    { title: 'Female doctor', sub: 'Private consultations', target: '#about' },
    { title: 'Book in 1 message', sub: 'WhatsApp. No forms.', target: 'whatsapp' },
  ],
  about: {
    overline: 'About',
    heading: 'Trained in Pakistan and the UK. Specialised in fertility and pregnancy.',
    lead:
      'Dr. Zeb Riaz is a consultant gynaecologist and obstetrician in Multan. She is a Fellow of the College of Physicians & Surgeons Pakistan in Obstetrics & Gynaecology (FCPS) and a Member of the Royal College of Obstetricians & Gynaecologists, UK (MRCOG), with further training in infertility and IVF.',
    lead2: 'She treats infertility in both partners, cares for women through pregnancy and delivery, and manages period and hormone problems.',
    photoBadge: 'Consultant Gynaecologist',
    facts: [
      { value: 'MRCOG (UK)', label: 'Royal College membership' },
      { value: 'FCPS', label: 'Obs & Gynae specialist' },
    ],
    qualHeading: 'Qualifications',
    quals: [
      { title: 'MBBS', chip: 'Degree', where: 'Army Medical College, Rawalpindi' },
      { title: 'FCPS (Obstetrics & Gynaecology)', chip: 'Specialist', where: 'College of Physicians & Surgeons Pakistan' },
      { title: 'MRCOG', chip: 'UK', where: 'Royal College of Obstetricians & Gynaecologists, UK' },
      { title: 'Infertility training', chip: 'Fertility', where: 'Australian Infertility IVF and Genetics' },
      { title: 'Consultant Gynaecologist & Obstetrician', chip: 'Current', where: 'Owner & CEO · Dua Hospital, Multan' },
    ],
    visitHeading: 'Your visit, step by step',
    visit: [
      { stage: 'Before', title: 'Book on WhatsApp', body: 'Send your name and problem. You get a time in reply.' },
      { stage: 'Bring', title: 'Old reports, scans and medicines', body: 'Previous prescriptions, ultrasound and test reports, and the medicines you take now.' },
      { stage: 'During', title: 'A private, one-to-one consultation', body: 'She listens, examines you with your consent, and explains what she finds.' },
      { stage: 'After', title: 'A clear written plan', body: 'Medicines, any tests or scans, and when to come back, explained simply.' },
    ],
  },
  care: {
    overline: 'Care',
    heading: 'What Dr. Zeb can help with',
    lead: 'Choose a group, or look through the full list.',
    groups: { all: 'All', fertility: 'Fertility', pregnancy: 'Pregnancy', periods: 'Periods & hormones', women: "Women's health", breast: 'Breast health' },
    ask: {
      title: "Don't see your problem?",
      body: "Send a message and ask. If it's not for her, we'll tell you who to see.",
      cta: 'Ask on WhatsApp',
    },
  },
  pinkOctober: {
    overline: 'Pink October',
    heading: 'Early checks save lives.',
    body: 'Book a breast check with Dr. Zeb at Dua Hospital this October.',
    cta: 'Book a breast check',
  },
  clinics: {
    overline: 'Clinic & timings',
    heading: 'Evening clinic at Dua Hospital, six days a week.',
    lead: 'Dr. Zeb sees patients at Dua Hospital, Monday to Saturday.',
    seasonLabel: { winter: 'Winter hours', summer: 'Summer hours' },
    otherSeason: {
      winter: (hours) => `Winter: ${hours}`,
      summer: (hours) => `Summer: ${hours}`,
    },
    directions: 'Directions',
    bookHere: 'Book here',
    holiday: 'On public holidays, timings can change. Send a message before you come.',
  },
  book: {
    overline: 'How to book',
    heading: "One message. That's all it takes.",
    lead: 'No forms, no app. Message on WhatsApp and the clinic replies with your time.',
    steps: [
      { title: 'Tap "Book on WhatsApp"', body: 'The message is already written for you.' },
      { title: 'Add your name and problem', body: 'A voice note in Urdu is fine too.' },
      { title: 'Get your time', body: 'Come at your time and show the message.' },
    ],
    cta: 'Book on WhatsApp',
    chat: {
      name: 'Dr. Zeb Riaz',
      status: 'usually replies within the hour',
      me1: "Assalam o Alaikum. I'd like to book an appointment with Dr. Zeb Riaz.",
      me2: 'Name: Ayesha · Problem: pregnancy check-up',
      them: { pre: 'Walaikum Assalam. Your time is ', time: '6:30 PM today', post: ' at Dua Hospital. Please bring your old reports.' },
      times: ['4:12 PM', '4:12 PM', '4:14 PM'],
    },
  },
  reviews: { overline: 'Patient reviews', heading: 'What patients say' },
  faq: {
    overline: 'Before your visit',
    heading: 'Questions patients ask',
    lead: 'Still unsure? Send a WhatsApp message and someone will answer.',
    emergencyTitle: "Emergency? Don't wait for a message.",
    emergencyBody: 'Heavy bleeding, severe pain, or your baby moving less: call 1122 or go to the nearest emergency.',
    items: [
      { q: 'How do I book?', a: 'Send a WhatsApp message with your name and problem. The clinic replies with your time.' },
      { q: 'What are the timings in winter and summer?', a: 'Monday to Saturday at Dua Hospital, closed Sunday. Winter: 5:00 – 9:00 PM. Summer: 6:00 – 10:00 PM.' },
      { q: 'Can my husband come too?', a: 'Yes. For infertility both partners are seen, and Dr. Zeb also treats male infertility.' },
      { q: 'Is the consultation private?', a: 'Yes. Every consultation is one-to-one with a female doctor. You can bring a family member if you wish.' },
      { q: 'Are IUI and IVF done at Dua Hospital?', a: 'To confirm with the clinic. Ask in your WhatsApp message.' },
      { q: 'What should I bring?', a: 'Old prescriptions, ultrasound and test reports, and the medicines you take now.' },
      { q: 'What is the fee?', a: 'To confirm with the clinic. Ask in your WhatsApp message.' },
    ],
  },
  final: {
    heading: 'Ready when you are. Book your visit.',
    sub: 'Dr. Zeb Riaz · Consultant Gynaecologist & Obstetrician · Owner & CEO, Dua Hospital · Monday to Saturday',
    cta: 'Book on WhatsApp',
  },
  footer: {
    tagline1: 'Owner & CEO, Dua Hospital, Multan',
    tagline2: 'MBBS, FCPS (Obs & Gynae), MRCOG (UK)',
    onPage: 'On this page',
    clinicsHeading: 'Clinic',
    help: 'Help',
    questions: 'Questions',
    urduLink: 'اردو میں دیکھیں',
    emergency: { title: 'Emergency?', body: 'Call 1122 or go to the nearest emergency.' },
    copyright: '© 2026 Dr. Zeb Riaz · Owner & CEO, Dua Hospital, Multan',
    follow: { doctor: 'Follow Dr. Zeb', hospital: 'Dua Hospital' },
    socialLabel: (who, network) => `${who} on ${network}`,
    hospitalSite: 'duahospital.pk',
    hospitalSiteLabel: 'Dua Hospital website, duahospital.pk',
  },
  dock: { timings: 'Timings', book: 'Book on WhatsApp' },
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  dayNames: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
};

const BOOK_UR = 'واٹس ایپ پر اپوائنٹمنٹ لیں';
const ABOUT_UR = 'تعارف';

const ur: SiteContent = {
  meta: {
    title: 'ڈاکٹر زیب ریاض — گائناکالوجسٹ اور ماہرِ زچگی، ملتان | دعا ہسپتال',
    description:
      'ڈاکٹر زیب ریاض (MBBS، FCPS گائنی، MRCOG برطانیہ)، کنسلٹنٹ گائناکالوجسٹ، دعا ہسپتال ملتان۔ بانجھ پن، IUI اور IVF، حمل کی دیکھ بھال، نارمل ڈیلیوری اور سی سیکشن، ماہواری کے مسائل۔ پیر تا ہفتہ۔ اپوائنٹمنٹ واٹس ایپ پر۔',
    keywords: [
      'ڈاکٹر زیب ریاض',
      'لیڈی ڈاکٹر ملتان',
      'گائناکالوجسٹ ملتان',
      'بانجھ پن کا علاج ملتان',
      'دعا ہسپتال ملتان',
      'گارڈن ٹاؤن لیڈی ڈاکٹر',
      'ماہرِ زچگی ملتان',
      'IVF ملتان',
    ],
  },
  dir: 'rtl',
  langSwitch: { label: 'English', href: '/' },
  skipLink: 'مرکزی مواد پر جائیں',
  toTop: 'اوپر جائیں',
  nav: {
    about: ABOUT_UR,
    care: 'علاج',
    clinic: 'کلینک اور اوقات',
    book: 'اپوائنٹمنٹ کیسے لیں',
    reviews: 'مریضوں کی رائے',
    faq: 'سوالات',
    cta: BOOK_UR,
    menu: 'مینو',
    subtitle: 'کنسلٹنٹ گائناکالوجسٹ · MBBS، FCPS، MRCOG (UK)',
    role: 'کنسلٹنٹ گائناکالوجسٹ اور ماہرِ زچگی',
  },
  status: {
    neutral: 'پیر تا ہفتہ · اوقات دیکھیں',
    lead: '· ',
    noClinicToday: 'آج بند ہے (اتوار)',
    seeing: 'ابھی مریض دیکھ رہی ہیں',
    // U+2066/U+2069 isolate the Latin clock ("5 PM") so right-to-left text doesn't flip it to "PM 5".
    until: (clock) => `⁦${clock}⁩ تک`,
    opensAtIn: (clock, d) => `⁦${clock}⁩ بجے کھلے گا · ${d} میں`,
    closedNow: 'آج کے لیے بند',
    bookTomorrow: 'کل کے لیے ابھی اپوائنٹمنٹ لیں',
    bookOn: (day) => `${day} کے لیے ابھی اپوائنٹمنٹ لیں`,
    open: 'ابھی کھلا ہے',
    later: (d) => `${d} میں کھلے گا`,
    done: 'آج کے لیے بند',
    closedToday: 'آج بند ہے',
    noClinicNote: (day) => `اتوار کو کلینک بند ہوتا ہے۔ ${day} کی اپوائنٹمنٹ کے لیے واٹس ایپ پر پیغام بھیجیں۔`,
  },
  hero: {
    overline: 'کنسلٹنٹ گائناکالوجسٹ اور ماہرِ زچگی',
    echo: 'Dr. Zeb Riaz · Consultant Gynaecologist & Obstetrician',
    lineStrong: ['حمل۔ اولاد کی خواہش۔', 'خواتین کی صحت۔'],
    lineRest: 'اولاد کی کوشش سے لے کر بچے کے پہلے ہفتے تک، ایک ہی ماہر۔',
    chips: ['بانجھ پن', 'IUI اور IVF', 'حمل کی دیکھ بھال', 'نارمل اور سی سیکشن', 'ماہواری کی بے قاعدگی', 'ماہواری میں درد'],
    seeAll: (n) => `تمام ${n} دیکھیں`,
    ctaBook: BOOK_UR,
    ctaTimings: 'کلینک کے اوقات',
    note: 'پیر تا ہفتہ · اتوار کو بند',
  },
  portrait: {
    plateTitle: 'ڈاکٹر زیب ریاض',
    plateSub: 'کنسلٹنٹ گائناکالوجسٹ، ملتان',
    sideOverline: ABOUT_UR,
    sideTitle: 'دعا ہسپتال میں کنسلٹنٹ گائناکالوجسٹ اور ماہرِ زچگی',
    sideSub: 'اولاد، حمل اور خواتین کی صحت۔',
    creds: [
      { title: 'MBBS', where: 'آرمی میڈیکل کالج' },
      { title: 'FCPS', where: 'گائنی و زچگی، CPSP' },
      { title: 'MRCOG (UK)', where: 'رائل کالج، برطانیہ' },
      { title: 'مالک و سی ای او', where: 'دعا ہسپتال' },
    ],
  },
  today: { heading: 'آج دعا ہسپتال میں', now: 'ابھی' },
  info: [
    { title: 'پیر تا ہفتہ', sub: 'اتوار کو بند', target: '#clinic' },
    { title: 'شام کے اوقات', sub: 'سردیوں میں 5 سے 9 · گرمیوں میں 6 سے 10', target: '#clinic' },
    { title: 'لیڈی ڈاکٹر', sub: 'علیحدہ اور پرائیویٹ معائنہ', target: '#about' },
    { title: 'ایک پیغام سے اپوائنٹمنٹ', sub: 'واٹس ایپ۔ کوئی فارم نہیں۔', target: 'whatsapp' },
  ],
  about: {
    overline: ABOUT_UR,
    heading: 'پاکستان اور برطانیہ سے تربیت یافتہ۔ اولاد اور حمل کی ماہر۔',
    lead:
      'ڈاکٹر زیب ریاض ملتان میں کنسلٹنٹ گائناکالوجسٹ اور ماہرِ زچگی ہیں۔ وہ کالج آف فزیشنز اینڈ سرجنز پاکستان سے گائنی میں FCPS اور رائل کالج آف آبسٹیٹریشنز اینڈ گائناکالوجسٹس، برطانیہ سے MRCOG ہیں، اور بانجھ پن اور IVF کی اضافی تربیت رکھتی ہیں۔',
    lead2: 'وہ میاں بیوی دونوں کے بانجھ پن کا علاج کرتی ہیں، حمل اور ڈیلیوری میں خواتین کی دیکھ بھال کرتی ہیں، اور ماہواری اور ہارمون کے مسائل کا علاج کرتی ہیں۔',
    photoBadge: 'کنسلٹنٹ گائناکالوجسٹ',
    facts: [
      { value: 'MRCOG (UK)', label: 'رائل کالج کی ممبرشپ' },
      { value: 'FCPS', label: 'گائنی سپیشلسٹ' },
    ],
    qualHeading: 'تعلیم',
    quals: [
      { title: 'MBBS', chip: 'ڈگری', where: 'آرمی میڈیکل کالج، راولپنڈی' },
      { title: 'FCPS (گائنی و زچگی)', chip: 'سپیشلسٹ', where: 'کالج آف فزیشنز اینڈ سرجنز پاکستان' },
      { title: 'MRCOG', chip: 'برطانیہ', where: 'رائل کالج آف آبسٹیٹریشنز اینڈ گائناکالوجسٹس، برطانیہ' },
      { title: 'بانجھ پن کی تربیت', chip: 'اولاد', where: 'آسٹریلین انفرٹیلیٹی IVF اینڈ جینیٹکس' },
      { title: 'کنسلٹنٹ گائناکالوجسٹ اور ماہرِ زچگی', chip: 'موجودہ', where: 'مالک و سی ای او · دعا ہسپتال، ملتان' },
    ],
    visitHeading: 'آپ کا معائنہ، قدم بہ قدم',
    visit: [
      { stage: 'پہلے', title: BOOK_UR, body: 'اپنا نام اور مسئلہ بھیجیں۔ جواب میں آپ کو وقت بتا دیا جائے گا۔' },
      { stage: 'ساتھ لائیں', title: 'پرانی رپورٹیں، الٹراساؤنڈ اور دوائیں', body: 'پرانے نسخے، الٹراساؤنڈ اور ٹیسٹ رپورٹیں، اور وہ دوائیں جو آپ ابھی لے رہی ہیں۔' },
      { stage: 'معائنے کے دوران', title: 'علیحدہ اور پرائیویٹ مشورہ', body: 'ڈاکٹر صاحبہ آپ کی بات سنتی ہیں، آپ کی اجازت سے معائنہ کرتی ہیں، اور سب کچھ سمجھاتی ہیں۔' },
      { stage: 'بعد میں', title: 'لکھا ہوا صاف پلان', body: 'دوائیں، ضرورت ہو تو ٹیسٹ یا الٹراساؤنڈ، اور دوبارہ کب آنا ہے، سب آسان الفاظ میں۔' },
    ],
  },
  care: {
    overline: 'علاج',
    heading: 'ڈاکٹر زیب کن مسائل میں مدد کرتی ہیں',
    lead: 'کوئی گروپ چنیں یا پوری فہرست دیکھیں۔',
    groups: { all: 'سب', fertility: 'اولاد', pregnancy: 'حمل', periods: 'ماہواری اور ہارمون', women: 'خواتین کی صحت', breast: 'چھاتی کی صحت' },
    ask: {
      title: 'آپ کا مسئلہ فہرست میں نہیں؟',
      body: 'پیغام بھیج کر پوچھ لیں۔ اگر یہ ان کا شعبہ نہیں تو ہم بتا دیں گے کہ کس ڈاکٹر کو دکھائیں۔',
      cta: 'واٹس ایپ پر پوچھیں',
    },
  },
  pinkOctober: {
    overline: 'پنک اکتوبر',
    heading: 'جلد معائنہ زندگی بچاتا ہے۔',
    body: 'اس اکتوبر دعا ہسپتال میں ڈاکٹر زیب سے چھاتی کا معائنہ کروائیں۔',
    cta: 'چھاتی کے معائنے کی اپوائنٹمنٹ',
  },
  clinics: {
    overline: 'کلینک اور اوقات',
    heading: 'دعا ہسپتال میں شام کا کلینک، ہفتے میں چھ دن۔',
    lead: 'ڈاکٹر زیب دعا ہسپتال میں پیر تا ہفتہ مریض دیکھتی ہیں۔',
    seasonLabel: { winter: 'سردیوں کے اوقات', summer: 'گرمیوں کے اوقات' },
    otherSeason: {
      winter: (hours) => `سردیوں میں: ⁦${hours}⁩`,
      summer: (hours) => `گرمیوں میں: ⁦${hours}⁩`,
    },
    directions: 'نقشہ دیکھیں',
    bookHere: 'یہاں اپوائنٹمنٹ لیں',
    holiday: 'سرکاری چھٹیوں پر اوقات بدل سکتے ہیں۔ آنے سے پہلے پیغام بھیج دیں۔',
  },
  book: {
    overline: 'اپوائنٹمنٹ کیسے لیں',
    heading: 'بس ایک پیغام۔ اتنا ہی کافی ہے۔',
    lead: 'نہ کوئی فارم، نہ کوئی ایپ۔ واٹس ایپ پر پیغام بھیجیں، کلینک آپ کو وقت بتا دے گا۔',
    steps: [
      { title: '"واٹس ایپ پر اپوائنٹمنٹ لیں" دبائیں', body: 'پیغام پہلے سے لکھا ہوا ہے۔' },
      { title: 'اپنا نام اور مسئلہ لکھیں', body: 'اردو میں وائس نوٹ بھی بھیج سکتی ہیں۔' },
      { title: 'اپنا وقت جانیں', body: 'اپنے وقت پر آئیں اور پیغام دکھا دیں۔' },
    ],
    cta: BOOK_UR,
    chat: {
      name: 'ڈاکٹر زیب ریاض',
      status: 'عام طور پر ایک گھنٹے میں جواب دیتی ہیں',
      me1: 'السلام علیکم۔ مجھے ڈاکٹر زیب ریاض سے اپوائنٹمنٹ چاہیے۔',
      me2: 'نام: عائشہ · مسئلہ: حمل کا معائنہ',
      them: { pre: 'وعلیکم السلام۔ آپ کا وقت ', time: 'آج شام 6:30 بجے', post: ' دعا ہسپتال میں ہے۔ براہ کرم پرانی رپورٹیں ساتھ لائیں۔' },
      times: ['4:12 PM', '4:12 PM', '4:14 PM'],
    },
  },
  reviews: { overline: 'مریضوں کی رائے', heading: 'مریض کیا کہتی ہیں' },
  faq: {
    overline: 'آنے سے پہلے',
    heading: 'مریضوں کے سوالات',
    lead: 'ابھی بھی کوئی سوال ہے؟ واٹس ایپ پر پیغام بھیجیں، آپ کو جواب دیا جائے گا۔',
    emergencyTitle: 'ایمرجنسی ہے؟ پیغام کا انتظار نہ کریں۔',
    emergencyBody: 'زیادہ خون آنا، شدید درد، یا بچے کی حرکت کم ہونا: 1122 پر کال کریں یا قریبی ایمرجنسی میں جائیں۔',
    items: [
      { q: 'اپوائنٹمنٹ کیسے لوں؟', a: 'واٹس ایپ پر اپنا نام اور مسئلہ بھیجیں۔ کلینک جواب میں آپ کا وقت بتا دے گا۔' },
      { q: 'سردیوں اور گرمیوں میں اوقات کیا ہیں؟', a: 'دعا ہسپتال میں پیر تا ہفتہ، اتوار کو بند۔ سردیوں میں: شام 5 سے رات 9 بجے۔ گرمیوں میں: شام 6 سے رات 10 بجے۔' },
      { q: 'کیا شوہر بھی ساتھ آ سکتے ہیں؟', a: 'جی ہاں۔ بانجھ پن میں میاں بیوی دونوں کا معائنہ ہوتا ہے، اور ڈاکٹر زیب مردانہ بانجھ پن کا علاج بھی کرتی ہیں۔' },
      { q: 'کیا معائنہ پرائیویٹ ہوتا ہے؟', a: 'جی ہاں۔ ہر معائنہ لیڈی ڈاکٹر کے ساتھ علیحدہ ہوتا ہے۔ آپ چاہیں تو گھر کے کسی فرد کو ساتھ لا سکتی ہیں۔' },
      { q: 'کیا IUI اور IVF دعا ہسپتال میں ہوتے ہیں؟', a: 'اس کی تصدیق ابھی باقی ہے۔ اپنے واٹس ایپ پیغام میں پوچھ لیں۔' },
      { q: 'ساتھ کیا لائیں؟', a: 'پرانے نسخے، الٹراساؤنڈ اور ٹیسٹ رپورٹیں، اور وہ دوائیں جو آپ ابھی لے رہی ہیں۔' },
      { q: 'فیس کتنی ہے؟', a: 'اس کی تصدیق ابھی باقی ہے۔ اپنے واٹس ایپ پیغام میں پوچھ لیں۔' },
    ],
  },
  final: {
    heading: 'جب آپ تیار ہوں۔ اپوائنٹمنٹ لیں۔',
    sub: 'ڈاکٹر زیب ریاض · کنسلٹنٹ گائناکالوجسٹ اور ماہرِ زچگی · مالک و سی ای او، دعا ہسپتال · پیر تا ہفتہ',
    cta: BOOK_UR,
  },
  footer: {
    tagline1: 'مالک و سی ای او، دعا ہسپتال، ملتان',
    tagline2: '⁦MBBS⁩، ⁦FCPS⁩ (گائنی و زچگی)، ⁦MRCOG (UK)⁩',
    onPage: 'اس صفحے پر',
    clinicsHeading: 'کلینک',
    help: 'مدد',
    questions: 'سوالات',
    urduLink: 'View in English',
    emergency: { title: 'ایمرجنسی؟', body: '1122 پر کال کریں یا قریبی ایمرجنسی میں جائیں۔' },
    copyright: '© 2026 ڈاکٹر زیب ریاض · مالک و سی ای او، دعا ہسپتال، ملتان',
    follow: { doctor: 'ڈاکٹر زیب کو فالو کریں', hospital: 'دعا ہسپتال' },
    socialLabel: (who, network) => `${who} — ⁦${network}⁩`,
    hospitalSite: 'duahospital.pk',
    hospitalSiteLabel: 'دعا ہسپتال کی ویب سائٹ، duahospital.pk',
  },
  dock: { timings: 'اوقات', book: BOOK_UR },
  days: ['پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ', 'اتوار'],
  dayNames: ['پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ', 'اتوار'],
};

const dictionaries: Record<Locale, SiteContent> = { en, ur };

export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale];
}
