import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isPinkOctober, showPinkOctober } from './campaign.ts';

test('Pink October only in October', () => {
  assert.deepEqual([9, 10, 11].map(isPinkOctober), [false, true, false]);
});

test('band needs confirmed breast checks', () => {
  assert.equal(showPinkOctober(10, [{ name: 'Breast checks', pending: true }]), false);
  assert.equal(showPinkOctober(10, [{ name: 'Breast checks' }]), true);
  assert.equal(showPinkOctober(11, [{ name: 'Breast checks' }]), false);
  assert.equal(showPinkOctober(10, []), false);
});
