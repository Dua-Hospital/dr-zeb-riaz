import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bookingHref, directionsHref } from './links.ts';

const text = (href: string) => new URL(href).searchParams.get('text');

test('en without clinic', () => {
  const href = bookingHref('en');
  assert.ok(href.startsWith('https://wa.me/923336489392?text='));
  assert.equal(
    text(href),
    'Assalam o Alaikum. I would like to book an appointment with Dr. Hasan Aziz.\nName:\nProblem:',
  );
});

test('en with clinic', () => {
  assert.equal(
    text(bookingHref('en', 'Hayat Medical Center')),
    'Assalam o Alaikum. I would like to book an appointment with Dr. Hasan Aziz at Hayat Medical Center.\nName:\nProblem:',
  );
});

test('special characters survive', () => {
  const href = bookingHref('en', 'A & B #1');
  assert.ok(text(href)?.includes(' at A & B #1.'));
  assert.ok(!href.includes(' '));
  assert.ok(!href.includes('&B'));
  assert.ok(!href.includes('#'));
});

test('ur round-trip', () => {
  assert.equal(
    text(bookingHref('ur', 'حیات میڈیکل سنٹر')),
    'السلام علیکم۔ مجھے ڈاکٹر حسن عزیز سے حیات میڈیکل سنٹر میں اپوائنٹمنٹ چاہیے۔\nنام:\nمسئلہ:',
  );
});

test('ur without clinic', () => {
  assert.equal(
    text(bookingHref('ur')),
    'السلام علیکم۔ مجھے ڈاکٹر حسن عزیز سے اپوائنٹمنٹ چاہیے۔\nنام:\nمسئلہ:',
  );
});

test('directions', () => {
  assert.equal(
    directionsHref('Dua Hospital Multan'),
    'https://www.google.com/maps/search/?api=1&query=Dua%20Hospital%20Multan',
  );
});
