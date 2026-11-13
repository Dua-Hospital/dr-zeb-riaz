import { test } from 'node:test';
import assert from 'node:assert/strict';
import { buildPageSchema } from './schema.ts';
import { visibleCare } from './content.ts';

type Node = Record<string, any>;
const graph = (l: 'en' | 'ur') => (buildPageSchema(l) as any)['@graph'] as Node[];
const MON_SAT = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

function parts(l: 'en' | 'ur' = 'en') {
  const g = graph(l);
  return {
    physicians: g.filter((n) => n['@type'] === 'Physician'),
    clinics: g.filter((n) => n['@type'] === 'MedicalClinic'),
  };
}

test('one physician, one clinic', () => {
  const { physicians, clinics } = parts();
  assert.equal(physicians.length, 1);
  assert.equal(clinics.length, 1);
  const [doc] = physicians;
  assert.equal(doc.name, 'Dr. Zeb Riaz');
  assert.deepEqual(doc.medicalSpecialty, ['Obstetric', 'Gynecologic']);
  assert.deepEqual(doc.qualification, ['MBBS', 'FCPS (Obstetrics & Gynaecology)', 'MRCOG (UK)']);
  assert.deepEqual(doc.worksFor, [{ '@id': clinics[0]['@id'] }]);
  assert.ok(String(clinics[0]['@id']).endsWith('#dua'));
});

test('seasonal opening hours use real ISO dates: the season in force, then the next', () => {
  const winterNow = (buildPageSchema('en', new Date('2026-11-12T06:00:00Z')) as any)['@graph'].find((n: Node) => n['@type'] === 'MedicalClinic');
  assert.deepEqual(
    winterNow.openingHoursSpecification.map((h: Node) => [h.opens, h.closes, h.validFrom, h.validThrough]),
    [
      ['17:00', '21:00', '2026-11-01', '2027-03-31'],
      ['18:00', '22:00', '2027-04-01', '2027-10-31'],
    ],
  );
  const summerNow = (buildPageSchema('en', new Date('2026-06-01T06:00:00Z')) as any)['@graph'].find((n: Node) => n['@type'] === 'MedicalClinic');
  assert.deepEqual(
    summerNow.openingHoursSpecification.map((h: Node) => [h.opens, h.closes, h.validFrom, h.validThrough]),
    [
      ['18:00', '22:00', '2026-04-01', '2026-10-31'],
      ['17:00', '21:00', '2026-11-01', '2027-03-31'],
    ],
  );
  // January belongs to the winter that started the previous November.
  const january = (buildPageSchema('en', new Date('2027-01-15T06:00:00Z')) as any)['@graph'].find((n: Node) => n['@type'] === 'MedicalClinic');
  assert.deepEqual([january.openingHoursSpecification[0].validFrom, january.openingHoursSpecification[0].validThrough], ['2026-11-01', '2027-03-31']);
  for (const h of winterNow.openingHoursSpecification) assert.deepEqual(h.dayOfWeek, MON_SAT);
});

test('services are the visible care items', () => {
  const [doc] = parts().physicians;
  assert.equal(doc.availableService.length, visibleCare().length);
  assert.ok(!JSON.stringify(doc.availableService).includes('PCOS'));
});

test('no telephone and no template leftovers', () => {
  const s = JSON.stringify(buildPageSchema('en'));
  assert.ok(!s.includes('telephone'));
  assert.ok(!s.includes('Hasan') && !s.includes('Hayat') && !s.includes('InternalMedicine'));
});

test('address', () => {
  const [clinic] = parts().clinics;
  assert.ok(clinic.address.streetAddress.includes('Sher Shah Road'));
});

test('Urdu locale', () => {
  const { clinics } = parts('ur');
  assert.ok(/[؀-ۿ]/.test(clinics[0].name));
  assert.ok(graph('ur').some((n) => n.inLanguage === 'ur-PK'));
});

test('physician and hospital link their social accounts with sameAs', () => {
  for (const l of ['en', 'ur'] as const) {
    const { physicians, clinics } = parts(l);
    assert.deepEqual(physicians[0].sameAs, [
      'https://www.facebook.com/drzebriaz',
      'https://www.instagram.com/drzebriaz/',
      'https://www.youtube.com/@drzebriaz',
      'https://www.tiktok.com/@drzebriaz',
    ]);
    assert.equal(clinics[0].sameAs.length, 4);
    assert.ok(clinics[0].sameAs.every((u: string) => u.includes('duahospitalmultan')));
  }
});

test('page URLs use the production domain drzebriaz.com', () => {
  const { physicians } = parts('en');
  assert.equal(physicians[0].url, 'https://drzebriaz.com/');
  assert.equal(parts('ur').physicians[0].url, 'https://drzebriaz.com/ur/');
});
