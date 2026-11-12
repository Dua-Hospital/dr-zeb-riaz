import { test } from 'node:test';
import assert from 'node:assert/strict';
import { bookingHref, directionsHref } from './links.ts';

const text = (href: string) => new URL(href).searchParams.get('text') ?? '';

test('english message', () => {
  const href = bookingHref('en');
  assert.ok(href.startsWith('https://wa.me/923358028888?text='));
  assert.equal(
    text(href),
    'Assalam o Alaikum. I would like to book an appointment with Dr. Zeb Riaz at Dua Hospital.\nName:\nProblem:',
  );
});

test('breast-check context', () => {
  assert.equal(
    text(bookingHref('en', 'breast-check')),
    'Assalam o Alaikum. I would like to book an appointment with Dr. Zeb Riaz at Dua Hospital for a breast check.\nName:\nProblem:',
  );
});

test('urdu message names her and keeps the context', () => {
  const plain = text(bookingHref('ur'));
  const breast = text(bookingHref('ur', 'breast-check'));
  assert.ok(plain.includes('ڈاکٹر زیب ریاض') && plain.includes('دعا ہسپتال'));
  assert.notEqual(plain, breast);
  assert.ok(!/[هيك]/.test(plain + breast));
  assert.ok(!bookingHref('ur').includes(' '));
});

test('directions', () => {
  assert.equal(
    directionsHref('Dua Hospital Multan'),
    'https://www.google.com/maps/search/?api=1&query=Dua%20Hospital%20Multan',
  );
});
