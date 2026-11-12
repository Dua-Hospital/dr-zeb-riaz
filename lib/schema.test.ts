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

test('seasonal opening hours', () => {
  const [clinic] = parts().clinics;
  const specs = clinic.openingHoursSpecification as Node[];
  assert.deepEqual(
    specs.map((h) => [h.opens, h.closes, h.validFrom, h.validThrough]),
    [
      ['17:00', '21:00', '--11-01', '--03-31'],
      ['18:00', '22:00', '--04-01', '--10-31'],
    ],
  );
  for (const h of specs) assert.deepEqual(h.dayOfWeek, MON_SAT);
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
