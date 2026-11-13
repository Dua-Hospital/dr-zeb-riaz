import { test } from 'node:test';
import assert from 'node:assert/strict';
import { easeInOutCubic, ringOffset, scrollDuration } from './scroll.ts';

test('easeInOutCubic: fixed points and slow start', () => {
  assert.equal(easeInOutCubic(0), 0);
  assert.equal(easeInOutCubic(1), 1);
  assert.equal(easeInOutCubic(0.5), 0.5);
  assert.ok(easeInOutCubic(0.25) < 0.25);
});

test('scrollDuration: clamped to 450..1100ms, 0.35ms per px', () => {
  assert.equal(scrollDuration(100), 450);
  assert.equal(scrollDuration(2000), 700);
  assert.equal(scrollDuration(-5000), 1100);
});

test('ringOffset: full circumference at 0, empty at 1, clamped', () => {
  assert.ok(Math.abs(ringOffset(0) - 157.08) < 0.01);
  assert.equal(ringOffset(1), 0);
  assert.ok(Math.abs(ringOffset(0.5) - 78.54) < 0.01);
  assert.equal(ringOffset(2), 0);
});
