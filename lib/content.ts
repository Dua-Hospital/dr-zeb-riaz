import type { ClinicHours } from './clinic-status.ts';
import type { Locale } from './site.ts';

// The single source of all copy and data for both languages. Components hold no literal copy.
// Urdu strings are awaiting native review: see docs/urdu-review.md.

export type IconName = 'fever'|'bug'|'allergy'|'head'|'bone'|'sugar'|'bp'|'blood'|'scale'|'kidney'|'bladder'
  |'heart'|'brain'|'zap'|'acid'|'ulcer'|'liver'|'virus'|'cough'|'asthma'|'lungs'
  |'wa'|'arrow'|'chev'|'menu'|'close'|'check'|'award'|'cap'|'pin'|'chat'|'nav'|'cal'|'plus'|'alert'|'clock'|'file'|'steth'|'list'|'star'|'globe';

type Both = { en: string; ur: string };

export const DOCTOR = { name: 'Dr. Hasan Aziz', nameUr: 'ڈاکٹر حسن عزیز' } as const;

/* ------------------------------------------------------------------ */
/*  Clinics                                                            */
/* ------------------------------------------------------------------ */

export interface Clinic extends ClinicHours {
  name: string;
  nameUr: string;
  label: Both; // Daytime / Evening
  address: Both | null; // null → "to confirm"
  landmark: Both | null;
  mapsQuery: string;
  hoursText: string; // same in both locales
  daysText: Both; // working days and day off
}

const MON_SAT = [false, true, true, true, true, true, true] as const; // Sun..Sat — Dua, off Sunday
const SAT_THU = [true, true, true, true, true, false, true] as const; // Sun..Sat — Hayat, off Friday

export const CLINICS: readonly Clinic[] = [
  {
    id: 'hayat',
    name: 'Hayat Medical Center',
    nameUr: 'حیات میڈیکل سنٹر',
    label: { en: 'Daytime', ur: 'دن کے وقت' },
    openMin: 720, // 12 PM
    closeMin: 1020, // 5 PM
    days: SAT_THU,
    address: {
      en: 'Ground Floor, Dost Plaza, Nishtar Road, Al Rahim Colony, Multan',
      ur: 'گراؤنڈ فلور، دوست پلازہ، نشتر روڈ، الرحیم کالونی، ملتان',
    },
    landmark: { en: 'Dost Plaza, Nishtar Road', ur: 'دوست پلازہ، نشتر روڈ' },
    mapsQuery: 'Dost Plaza Nishtar Road Al Rahim Colony Multan',
    hoursText: '12:00 PM – 5:00 PM',
    daysText: { en: 'Saturday to Thursday · Friday off', ur: 'ہفتہ تا جمعرات · جمعہ کو بند' },
  },
  {
    id: 'dua',
    name: 'Dua Hospital',
    nameUr: 'دعا ہسپتال',
    label: { en: 'Evening', ur: 'شام کے وقت' },
    openMin: 1200, // 8 PM
    closeMin: 1290, // 9:30 PM
    days: MON_SAT,
    address: {
      en: 'First Floor, Bank Plaza, Sher Shah Road, Garden Town, Multan',
      ur: 'فرسٹ فلور، بینک پلازہ، شیر شاہ روڈ، گارڈن ٹاؤن، ملتان',
    },
    landmark: { en: 'Near Shell Petrol Pump', ur: 'نزد شیل پٹرول پمپ' },
    mapsQuery: 'Dua Hospital Bank Plaza Sher Shah Road Garden Town Multan',
    hoursText: '8:00 PM – 9:30 PM',
    daysText: { en: 'Monday to Saturday · Sunday off', ur: 'پیر تا ہفتہ · اتوار کو بند' },
  },
];

/* ------------------------------------------------------------------ */
/*  Treatments (21, in the mockup's order)                             */
/* ------------------------------------------------------------------ */

export type TreatmentGroup = 'day' | 'long' | 'heart' | 'stomach' | 'chest';

export interface Treatment {
  icon: IconName;
  name: string;
  nameUr: string;
  blurb: string;
  blurbUr: string;
  group: TreatmentGroup;
}

export const TREATMENT_GROUPS: readonly TreatmentGroup[] = ['day', 'long', 'heart', 'stomach', 'chest'];

const tx = (icon: IconName, name: string, nameUr: string, blurb: string, blurbUr: string, group: TreatmentGroup): Treatment =>
  ({ icon, name, nameUr, blurb, blurbUr, group });

export const TREATMENTS: readonly Treatment[] = [
  tx('fever', 'Fever', 'بخار', 'Fever that keeps coming back, including flu.', 'بار بار آنے والا بخار، فلو سمیت۔', 'day'),
  tx('bug', 'Dengue', 'ڈینگی', 'Diagnosis, platelet checks and close follow-up.', 'تشخیص، پلیٹ لیٹس کی جانچ اور قریبی نگرانی۔', 'day'),
  tx('allergy', 'Allergy', 'الرجی', 'Skin, food and seasonal allergies.', 'جلد، کھانے اور موسم کی الرجی۔', 'day'),
  tx('head', 'Headache', 'سر درد', 'Frequent or severe headaches and migraine.', 'بار بار یا شدید سر درد اور آدھے سر کا درد۔', 'day'),
  tx('bone', 'Back & joint pain', 'کمر اور جوڑوں کا درد', 'Aches, stiffness and joint pain.', 'درد، اکڑن اور جوڑوں کا درد۔', 'day'),
  tx('sugar', 'Sugar (diabetes)', 'شوگر', 'Sugar control, tests and checks for complications.', 'شوگر کنٹرول، ٹیسٹ اور پیچیدگیوں کی جانچ۔', 'long'),
  tx('bp', 'Blood pressure', 'بلڈ پریشر', 'Finding high BP early and keeping it controlled.', 'ہائی بلڈ پریشر کی جلد پہچان اور اسے قابو میں رکھنا۔', 'long'),
  tx('blood', 'Low blood (anaemia)', 'خون کی کمی', 'Weakness and tiredness from low blood.', 'خون کی کمی سے کمزوری اور تھکاوٹ۔', 'long'),
  tx('scale', 'Obesity', 'موٹاپا', 'Weight, diet and the health problems it causes.', 'وزن، خوراک اور موٹاپے سے ہونے والے مسائل۔', 'long'),
  tx('kidney', 'Kidney stones', 'گردے کی پتھری', 'Diagnosis, pain relief and follow-up.', 'تشخیص، درد سے آرام اور فالو اپ۔', 'long'),
  tx('bladder', 'Kidney & bladder', 'گردے اور مثانہ', 'Urine infections and kidney problems.', 'پیشاب کا انفیکشن اور گردوں کے مسائل۔', 'long'),
  tx('heart', 'Heart disease', 'دل کے امراض', 'Chest pain, heart checks and ongoing care.', 'سینے میں درد، دل کا چیک اپ اور مسلسل علاج۔', 'heart'),
  tx('brain', 'Stroke & paralysis', 'فالج', 'Care and recovery after a stroke or facial palsy.', 'فالج یا لقوہ کے بعد علاج اور بحالی۔', 'heart'),
  tx('zap', 'Fits (epilepsy)', 'مرگی', 'Diagnosis and medicines to control fits.', 'تشخیص اور دوروں کو قابو میں رکھنے کی دوائیں۔', 'heart'),
  tx('acid', 'Acidity', 'تیزابیت', 'Acidity, gas and stomach discomfort.', 'تیزابیت، گیس اور معدے کی تکلیف۔', 'stomach'),
  tx('ulcer', 'Ulcer', 'السر', 'Stomach and intestine ulcers.', 'معدے اور آنتوں کے السر۔', 'stomach'),
  tx('liver', 'Jaundice', 'یرقان', 'Yellowness from liver problems.', 'جگر کی خرابی سے ہونے والا پیلا پن۔', 'stomach'),
  tx('virus', 'Hepatitis', 'ہیپاٹائٹس', 'Hepatitis B and C testing and treatment.', 'ہیپاٹائٹس بی اور سی کے ٹیسٹ اور علاج۔', 'stomach'),
  tx('cough', 'Cough', 'کھانسی', 'Long-lasting cough and chest infections.', 'مسلسل کھانسی اور سینے کا انفیکشن۔', 'chest'),
  tx('asthma', 'Asthma', 'دمہ', 'Breathing trouble, with help using inhalers.', 'سانس کی تکلیف کا علاج اور انہیلر کے استعمال میں مدد۔', 'chest'),
  tx('lungs', 'TB', 'ٹی بی', 'Diagnosis and full-course treatment of TB.', 'ٹی بی کی تشخیص اور مکمل کورس کا علاج۔', 'chest'),
];

/* ------------------------------------------------------------------ */
/*  Reviews: empty until real reviews arrive (spec D9)                 */
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
  nav: { about: string; treatments: string; clinics: string; book: string; reviews: string; faq: string; cta: string; menu: string; subtitle: string };
  status: {
    neutral: string;
    lead: string; // before the pill's detail: "· "
    comma: string; // between clinic name and its detail
    noClinicToday: string;
    seeing: string;
    until: Text; // (clock)
    next: string;
    opensIn: Text; // (duration), lower-case, for the hero pill
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
    urLine: string;
    lineStrong: [string, string];
    lineRest: string;
    chips: string[];
    seeAll: string;
    ctaBook: string;
    ctaTimings: string;
    note: string;
  };
  portrait: {
    plateTitle: string; plateSub: string;
    sideOverline: string; sideTitle: string; sideSub: string;
    degreeLabel: string; degree: string; degreeWhere: string;
    specLabel: string; spec: string; specWhere: string;
  };
  today: { heading: string; now: string };
  info: { title: string; sub: string; target: '#clinics' | '#treatments' | 'whatsapp' }[];
  about: {
    overline: string;
    heading: string;
    lead: string;
    lead2: string;
    photoBadge: string; // label on the About photo card
    facts: { value: string; label: string }[];
    qualHeading: string;
    quals: { title: string; chip: string; where: string }[];
    visitHeading: string;
    visit: { stage: string; title: string; body: string }[];
  };
  treatments: {
    overline: string;
    heading: string;
    lead: string;
    groups: Record<'all' | TreatmentGroup, string>;
    ask: Titled & { cta: string };
  };
  clinics: {
    overline: string; heading: string; lead: string;
    toConfirmAddress: string; toConfirmLandmark: string;
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
  };
  dock: { timings: string; book: string };
  days: string[]; // Mon..Sun
}

const en: SiteContent = {
  meta: {
    title: 'Dr. Hasan Aziz — Consultant Physician in Multan',
    description:
      'Dr. Hasan Aziz (MBBS, FCPS Medicine), consultant physician at Dua Hospital and Hayat Medical Center, Multan. Treatment for diabetes, blood pressure, fever, heart, liver, kidney, allergy and asthma. Monday to Saturday. Book on WhatsApp.',
    keywords: [
      'Dr Hasan Aziz',
      'doctor in Multan',
      'consultant physician Multan',
      'medical specialist Multan',
      'Dua Hospital Multan',
      'Hayat Medical Center Multan',
      'Garden Town doctor',
      'general physician Multan Pakistan',
    ],
  },
  dir: 'ltr',
  langSwitch: { label: 'اردو', href: '/ur/' },
  skipLink: 'Skip to main content',
  toTop: 'Back to top',
  nav: {
    about: 'About Me',
    treatments: 'Treatments',
    clinics: 'Clinics & timings',
    book: 'How to book',
    reviews: 'Reviews',
    faq: 'Questions',
    cta: 'Book on WhatsApp',
    menu: 'Menu',
    subtitle: 'Consultant Physician · Multan',
  },
  status: {
    neutral: 'Open 7 days · see timings',
    lead: '· ',
    comma: ', ',
    noClinicToday: 'No clinic today',
    seeing: 'Seeing patients now',
    until: (clock) => `until ${clock}`,
    next: 'Next clinic',
    opensIn: (d) => `opens in ${d}`,
    closedNow: 'Clinics closed now',
    bookTomorrow: 'Book now for tomorrow',
    bookOn: (day) => `Book now for ${day}`,
    open: 'Open now',
    later: (d) => `Opens in ${d}`,
    done: 'Closed for today',
    closedToday: 'Closed today',
    noClinicNote: (day) => `Both clinics are closed today. Send a WhatsApp message to book for ${day}.`,
  },
  hero: {
    overline: 'Consultant Physician · FCPS Medicine',
    urLine: 'ڈاکٹر حسن عزیز · کنسلٹنٹ فزیشن',
    lineStrong: ['Sugar. Blood pressure.', "Fever that won't go away."],
    lineRest: 'One specialist who finds the cause and treats it.',
    chips: ['Diabetes', 'Blood pressure', 'Fever & dengue', 'Cough & asthma', 'Acidity & ulcer', 'Jaundice & hepatitis', 'Heart disease'],
    seeAll: 'See all 21',
    ctaBook: 'Book on WhatsApp',
    ctaTimings: 'See clinic timings',
    note: 'Open every day · Hayat closed Friday · Dua closed Sunday',
  },
  portrait: {
    plateTitle: 'Dr. Hasan Aziz',
    plateSub: 'Consultant Physician, Multan',
    sideOverline: 'About Me',
    sideTitle: 'Consultant Physician at Dua Hospital & Hayat Medical Center',
    sideSub: 'Adult medicine: sudden illness and long-term care.',
    degreeLabel: 'Degree',
    degree: 'MBBS',
    degreeWhere: 'Army Medical College, Rawalpindi',
    specLabel: 'Specialisation',
    spec: 'FCPS Medicine',
    specWhere: 'College of Physicians & Surgeons Pakistan',
  },
  today: { heading: 'Where is he today?', now: 'Now' },
  info: [
    { title: '7 days a week', sub: 'Hayat Sat – Thu · Dua Mon – Sat', target: '#clinics' },
    { title: 'Day & evening', sub: 'Hayat 12 – 5 PM · Dua 8 – 9:30 PM', target: '#clinics' },
    { title: '21 conditions', sub: 'From fever to diabetes and BP', target: '#treatments' },
    { title: 'Book in 1 message', sub: 'WhatsApp. No forms, no app.', target: 'whatsapp' },
  ],
  about: {
    overline: 'About Me',
    heading: 'A specialist who listens first.',
    lead:
      'Dr. Hasan Aziz is a consultant physician at Dua Hospital and Hayat Medical Center, Multan. He treats adults for everyday illness, such as fever, cough and infections, and for long-term conditions, such as diabetes and high blood pressure.',
    lead2: 'If you need a surgeon or another specialist, he explains why and guides you to the right one.',
    photoBadge: 'Clinical Consultation',
    facts: [
      { value: 'Adults', label: 'Adult medicine' },
      { value: '7 days', label: 'Hayat off Friday · Dua off Sunday' },
    ],
    qualHeading: 'Qualifications',
    quals: [
      { title: 'MBBS', chip: 'Degree', where: 'Army Medical College, Rawalpindi' },
      { title: 'FCPS (Medicine)', chip: 'Specialist', where: 'College of Physicians & Surgeons Pakistan' },
      { title: 'Consultant Physician', chip: 'Current', where: 'Dua Hospital & Hayat Medical Center, Multan' },
    ],
    visitHeading: 'Your visit, step by step',
    visit: [
      { stage: 'Before', title: 'Book on WhatsApp', body: 'Send your name and problem. You get a time and clinic in reply.' },
      { stage: 'Bring', title: 'Old reports and medicines', body: 'Prescriptions, test reports, and the medicines you take now.' },
      { stage: 'During', title: 'Talk and check-up', body: 'He asks about your problem, checks BP, pulse and sugar if needed, and examines you.' },
      { stage: 'After', title: 'A clear written plan', body: 'Medicines, any tests, and when to come back, explained simply.' },
    ],
  },
  treatments: {
    overline: 'Treatments',
    heading: 'What he treats',
    lead: 'Choose a group, or look through the full list.',
    groups: { all: 'All', day: 'Everyday', long: 'Long-term', heart: 'Heart & brain', stomach: 'Stomach & liver', chest: 'Chest' },
    ask: {
      title: "Don't see your problem?",
      body: "Send a message and ask. If it's not for him, we'll tell you who to see.",
      cta: 'Ask on WhatsApp',
    },
  },
  clinics: {
    overline: 'Clinics & timings',
    heading: 'Two clinics. Same doctor.',
    lead: 'Daytime at Hayat Medical Center (closed Friday), evenings at Dua Hospital (closed Sunday).',
    toConfirmAddress: 'Address to confirm, Multan',
    toConfirmLandmark: 'Landmark to confirm',
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
      { title: 'Get your time and clinic', body: 'Come at your time and show the message.' },
    ],
    cta: 'Book on WhatsApp',
    chat: {
      name: 'Dr. Hasan Aziz',
      status: 'usually replies within the hour',
      me1: "Assalam o Alaikum. I'd like to book an appointment with Dr. Hasan Aziz.",
      me2: 'Name: Ahmed · Problem: fever for 3 days',
      them: { pre: 'Walaikum Assalam. Your time is ', time: '8:15 PM today', post: ' at Dua Hospital. Please bring your old reports.' },
      times: ['6:12 PM', '6:12 PM', '6:14 PM'],
    },
  },
  reviews: { overline: 'Patient reviews', heading: 'What patients say' },
  faq: {
    overline: 'Before your visit',
    heading: 'Questions patients ask',
    lead: 'Still unsure? Send a WhatsApp message and someone will answer.',
    emergencyTitle: "Emergency? Don't wait for a message.",
    emergencyBody: 'Chest pain, fainting or trouble breathing: call 1122 or go to the nearest emergency.',
    items: [
      { q: 'How do I book?', a: 'Send a WhatsApp message with your name and problem. The clinic replies with your time and which clinic to visit.' },
      { q: 'Which days is he available?', a: 'Every day, at one clinic or the other. Hayat Medical Center: 12 – 5 PM, Saturday to Thursday (closed Friday). Dua Hospital: 8 – 9:30 PM, Monday to Saturday (closed Sunday).' },
      { q: 'Can I come without booking?', a: 'To confirm with the clinic. Booking first means less waiting.' },
      { q: 'What should I bring?', a: 'Old prescriptions, test reports and the medicines you take now. Sugar patients: bring your readings.' },
      { q: 'What is the fee?', a: 'To confirm with the clinic. Ask in your WhatsApp message.' },
      { q: 'Which clinic should I choose?', a: 'Same doctor at both. Choose Hayat for daytime, Dua Hospital for evenings.' },
    ],
  },
  final: {
    heading: 'Feeling unwell? Book your visit.',
    sub: 'Dr. Hasan Aziz · Open every day · Multan',
    cta: 'Book on WhatsApp',
  },
  footer: {
    tagline1: 'Consultant Physician · FCPS Medicine',
    tagline2: 'MBBS, Army Medical College',
    onPage: 'On this page',
    clinicsHeading: 'Clinics',
    help: 'Help',
    questions: 'Questions',
    urduLink: 'اردو میں دیکھیں',
    emergency: { title: 'Emergency?', body: 'Call 1122 or go to the nearest emergency.' },
    copyright: '© 2026 Dr. Hasan Aziz · Part of Dua Hospital, Multan',
  },
  dock: { timings: 'Timings', book: 'Book on WhatsApp' },
  days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};

const BOOK_UR = 'واٹس ایپ پر اپوائنٹمنٹ لیں';
const ABOUT_UR = 'میرے بارے میں';

const ur: SiteContent = {
  meta: {
    title: 'ڈاکٹر حسن عزیز — کنسلٹنٹ فزیشن، ملتان',
    description:
      'ڈاکٹر حسن عزیز (MBBS، FCPS میڈیسن)، کنسلٹنٹ فزیشن، دعا ہسپتال اور حیات میڈیکل سنٹر ملتان۔ شوگر، بلڈ پریشر، بخار، دل، جگر، گردے، الرجی اور دمہ کا علاج۔ پیر تا ہفتہ۔ اپوائنٹمنٹ واٹس ایپ پر۔',
    keywords: [
      'ڈاکٹر حسن عزیز',
      'ڈاکٹر ملتان',
      'کنسلٹنٹ فزیشن ملتان',
      'میڈیکل سپیشلسٹ ملتان',
      'دعا ہسپتال ملتان',
      'حیات میڈیکل سنٹر ملتان',
      'گارڈن ٹاؤن ڈاکٹر',
      'جنرل فزیشن ملتان',
    ],
  },
  dir: 'rtl',
  langSwitch: { label: 'English', href: '/' },
  skipLink: 'مرکزی مواد پر جائیں',
  toTop: 'اوپر جائیں',
  nav: {
    about: ABOUT_UR,
    treatments: 'علاج',
    clinics: 'کلینک اور اوقات',
    book: 'اپوائنٹمنٹ کیسے لیں',
    reviews: 'مریضوں کی رائے',
    faq: 'سوالات',
    cta: BOOK_UR,
    menu: 'مینو',
    subtitle: 'کنسلٹنٹ فزیشن · ملتان',
  },
  status: {
    neutral: 'ہفتے کے ساتوں دن · اوقات دیکھیں',
    lead: '· ',
    comma: '، ',
    noClinicToday: 'آج کوئی کلینک نہیں',
    seeing: 'ابھی مریض دیکھ رہے ہیں',
    // U+2066/U+2069 isolate the Latin clock ("5 PM") so right-to-left text doesn't flip it to "PM 5".
    until: (clock) => `⁦${clock}⁩ تک`,
    next: 'اگلا کلینک',
    opensIn: (d) => `${d} میں کھلے گا`,
    closedNow: 'ابھی کلینک بند ہیں',
    bookTomorrow: 'کل کے لیے ابھی اپوائنٹمنٹ لیں',
    bookOn: (day) => `${day} کے لیے ابھی اپوائنٹمنٹ لیں`,
    open: 'ابھی کھلا ہے',
    later: (d) => `${d} میں کھلے گا`,
    done: 'آج کے لیے بند',
    closedToday: 'آج بند ہے',
    noClinicNote: (day) => `آج دونوں کلینک بند ہیں۔ ${day} کی اپوائنٹمنٹ کے لیے واٹس ایپ پر پیغام بھیجیں۔`,
  },
  hero: {
    overline: 'کنسلٹنٹ فزیشن · FCPS میڈیسن',
    urLine: 'کنسلٹنٹ فزیشن · ملتان',
    lineStrong: ['شوگر۔ بلڈ پریشر۔', 'ایسا بخار جو جاتا ہی نہیں۔'],
    lineRest: 'ایک سپیشلسٹ جو وجہ ڈھونڈ کر علاج کرتے ہیں۔',
    chips: ['شوگر', 'بلڈ پریشر', 'بخار اور ڈینگی', 'کھانسی اور دمہ', 'تیزابیت اور السر', 'یرقان اور ہیپاٹائٹس', 'دل کے امراض'],
    seeAll: 'تمام 21 دیکھیں',
    ctaBook: BOOK_UR,
    ctaTimings: 'کلینک کے اوقات دیکھیں',
    note: 'ہر روز · حیات جمعہ کو بند · دعا اتوار کو بند',
  },
  portrait: {
    plateTitle: 'ڈاکٹر حسن عزیز',
    plateSub: 'کنسلٹنٹ فزیشن، ملتان',
    sideOverline: ABOUT_UR,
    sideTitle: 'دعا ہسپتال اور حیات میڈیکل سنٹر میں کنسلٹنٹ فزیشن',
    sideSub: 'بڑوں کا علاج: اچانک بیماری اور لمبے عرصے کی دیکھ بھال۔',
    degreeLabel: 'ڈگری',
    degree: 'MBBS',
    degreeWhere: 'آرمی میڈیکل کالج، راولپنڈی',
    specLabel: 'سپیشلائزیشن',
    spec: 'FCPS میڈیسن',
    specWhere: 'کالج آف فزیشنز اینڈ سرجنز پاکستان',
  },
  today: { heading: 'آج ڈاکٹر صاحب کہاں ہیں؟', now: 'ابھی' },
  info: [
    { title: 'ہفتے کے 7 دن', sub: 'حیات ہفتہ تا جمعرات · دعا پیر تا ہفتہ', target: '#clinics' },
    { title: 'دن اور شام', sub: 'حیات دوپہر 12 سے شام 5 · دعا رات 8 سے 9:30', target: '#clinics' },
    { title: '21 بیماریاں', sub: 'بخار سے لے کر شوگر اور بلڈ پریشر تک', target: '#treatments' },
    { title: 'ایک پیغام سے اپوائنٹمنٹ', sub: 'واٹس ایپ۔ نہ کوئی فارم، نہ کوئی ایپ۔', target: 'whatsapp' },
  ],
  about: {
    overline: ABOUT_UR,
    heading: 'ایک سپیشلسٹ جو پہلے آپ کی پوری بات سنتے ہیں۔',
    lead:
      'ڈاکٹر حسن عزیز دعا ہسپتال اور حیات میڈیکل سنٹر، ملتان میں کنسلٹنٹ فزیشن ہیں۔ وہ بڑوں کا علاج کرتے ہیں: روزمرہ بیماریوں جیسے بخار، کھانسی اور انفیکشن، اور لمبے عرصے کی بیماریاں جیسے شوگر اور ہائی بلڈ پریشر۔',
    lead2: 'اگر آپ کو سرجن یا کسی اور سپیشلسٹ کی ضرورت ہو تو وہ وجہ سمجھاتے ہیں اور صحیح ڈاکٹر تک پہنچنے میں مدد کرتے ہیں۔',
    photoBadge: 'کلینیکل معائنہ و مشاورت',
    facts: [
      { value: 'بالغ افراد', label: 'بڑوں کی بیماریوں کا علاج' },
      { value: '7 دن', label: 'حیات جمعہ، دعا اتوار کو بند' },
    ],
    qualHeading: 'تعلیم',
    quals: [
      { title: 'MBBS', chip: 'ڈگری', where: 'آرمی میڈیکل کالج، راولپنڈی' },
      { title: 'FCPS (میڈیسن)', chip: 'سپیشلسٹ', where: 'کالج آف فزیشنز اینڈ سرجنز پاکستان' },
      { title: 'کنسلٹنٹ فزیشن', chip: 'موجودہ', where: 'دعا ہسپتال اور حیات میڈیکل سنٹر، ملتان' },
    ],
    visitHeading: 'آپ کا چیک اپ، قدم بہ قدم',
    visit: [
      { stage: 'پہلے', title: BOOK_UR, body: 'اپنا نام اور مسئلہ بھیجیں۔ جواب میں آپ کو وقت اور کلینک بتا دیا جائے گا۔' },
      { stage: 'ساتھ لائیں', title: 'پرانی رپورٹیں اور دوائیں', body: 'پرانے نسخے، ٹیسٹ رپورٹیں اور وہ دوائیں جو آپ ابھی لے رہے ہیں۔' },
      { stage: 'چیک اپ کے دوران', title: 'بات چیت اور معائنہ', body: 'ڈاکٹر صاحب آپ کا مسئلہ پوچھتے ہیں، بلڈ پریشر، نبض اور ضرورت ہو تو شوگر چیک کرتے ہیں، اور معائنہ کرتے ہیں۔' },
      { stage: 'بعد میں', title: 'لکھا ہوا صاف پلان', body: 'دوائیں، ضرورت ہو تو ٹیسٹ، اور دوبارہ کب آنا ہے، سب آسان الفاظ میں۔' },
    ],
  },
  treatments: {
    overline: 'علاج',
    heading: 'وہ کن بیماریوں کا علاج کرتے ہیں',
    lead: 'کوئی گروپ چنیں یا پوری فہرست دیکھیں۔',
    groups: { all: 'سب', day: 'روزمرہ', long: 'لمبی بیماریاں', heart: 'دل اور دماغ', stomach: 'معدہ اور جگر', chest: 'سینہ' },
    ask: {
      title: 'آپ کا مسئلہ فہرست میں نہیں؟',
      body: 'پیغام بھیج کر پوچھ لیں۔ اگر یہ ان کا شعبہ نہیں تو ہم بتا دیں گے کہ کس ڈاکٹر کو دکھائیں۔',
      cta: 'واٹس ایپ پر پوچھیں',
    },
  },
  clinics: {
    overline: 'کلینک اور اوقات',
    heading: 'دو کلینک، ایک ہی ڈاکٹر۔',
    lead: 'دن میں حیات میڈیکل سنٹر (جمعہ کو بند)، شام کو دعا ہسپتال (اتوار کو بند)۔',
    toConfirmAddress: 'پتے کی تصدیق باقی ہے، ملتان',
    toConfirmLandmark: 'قریبی نشانی کی تصدیق باقی ہے',
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
      { title: 'اپنا نام اور مسئلہ لکھیں', body: 'اردو میں وائس نوٹ بھی بھیج سکتے ہیں۔' },
      { title: 'اپنا وقت اور کلینک جانیں', body: 'اپنے وقت پر آئیں اور پیغام دکھا دیں۔' },
    ],
    cta: BOOK_UR,
    chat: {
      name: 'ڈاکٹر حسن عزیز',
      status: 'عام طور پر ایک گھنٹے میں جواب دیتے ہیں',
      me1: 'السلام علیکم۔ مجھے ڈاکٹر حسن عزیز سے اپوائنٹمنٹ چاہیے۔',
      me2: 'نام: احمد · مسئلہ: 3 دن سے بخار',
      them: { pre: 'وعلیکم السلام۔ آپ کا وقت ', time: 'آج رات 8:15 بجے', post: ' دعا ہسپتال میں ہے۔ براہ کرم پرانی رپورٹیں ساتھ لائیں۔' },
      times: ['6:12 PM', '6:12 PM', '6:14 PM'],
    },
  },
  reviews: { overline: 'مریضوں کی رائے', heading: 'مریض کیا کہتے ہیں' },
  faq: {
    overline: 'آنے سے پہلے',
    heading: 'مریضوں کے سوالات',
    lead: 'ابھی بھی کوئی سوال ہے؟ واٹس ایپ پر پیغام بھیجیں، آپ کو جواب دیا جائے گا۔',
    emergencyTitle: 'ایمرجنسی ہے؟ پیغام کا انتظار نہ کریں۔',
    emergencyBody: 'سینے میں درد، بے ہوشی یا سانس لینے میں مشکل ہو تو 1122 پر کال کریں یا قریبی ایمرجنسی میں جائیں۔',
    items: [
      { q: 'اپوائنٹمنٹ کیسے لوں؟', a: 'واٹس ایپ پر اپنا نام اور مسئلہ بھیجیں۔ کلینک جواب میں آپ کا وقت اور کلینک بتا دے گا۔' },
      { q: 'ڈاکٹر صاحب کن دنوں میں ملتے ہیں؟', a: 'ہر روز، کسی ایک کلینک میں۔ حیات میڈیکل سنٹر: دوپہر 12 سے شام 5 بجے، ہفتہ تا جمعرات (جمعہ کو بند)۔ دعا ہسپتال: رات 8 سے 9:30 بجے، پیر تا ہفتہ (اتوار کو بند)۔' },
      { q: 'کیا بغیر اپوائنٹمنٹ کے آ سکتے ہیں؟', a: 'اس کی تصدیق ابھی باقی ہے۔ پہلے اپوائنٹمنٹ لینے سے کم انتظار کرنا پڑتا ہے۔' },
      { q: 'ساتھ کیا لائیں؟', a: 'پرانے نسخے، ٹیسٹ رپورٹیں اور وہ دوائیں جو آپ ابھی لے رہے ہیں۔ شوگر کے مریض اپنی ریڈنگز بھی ساتھ لائیں۔' },
      { q: 'فیس کتنی ہے؟', a: 'اس کی تصدیق ابھی باقی ہے۔ اپنے واٹس ایپ پیغام میں پوچھ لیں۔' },
      { q: 'کون سا کلینک چنوں؟', a: 'دونوں جگہ ایک ہی ڈاکٹر ہیں۔ دن میں آنا ہو تو حیات، شام کو آنا ہو تو دعا ہسپتال۔' },
    ],
  },
  final: {
    heading: 'طبیعت ٹھیک نہیں؟ اپوائنٹمنٹ لیں۔',
    sub: 'ڈاکٹر حسن عزیز · ہر روز · ملتان',
    cta: BOOK_UR,
  },
  footer: {
    tagline1: 'کنسلٹنٹ فزیشن · FCPS میڈیسن',
    tagline2: 'MBBS، آرمی میڈیکل کالج',
    onPage: 'اس صفحے پر',
    clinicsHeading: 'کلینک',
    help: 'مدد',
    questions: 'سوالات',
    urduLink: 'View in English',
    emergency: { title: 'ایمرجنسی؟', body: '1122 پر کال کریں یا قریبی ایمرجنسی میں جائیں۔' },
    copyright: '© 2026 ڈاکٹر حسن عزیز · دعا ہسپتال، ملتان',
  },
  dock: { timings: 'اوقات', book: BOOK_UR },
  days: ['پیر', 'منگل', 'بدھ', 'جمعرات', 'جمعہ', 'ہفتہ', 'اتوار'],
};

const dictionaries: Record<Locale, SiteContent> = { en, ur };

export function getContent(locale: Locale): SiteContent {
  return dictionaries[locale];
}
