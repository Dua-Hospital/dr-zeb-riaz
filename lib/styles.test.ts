import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Small tracked-caps labels clip and break Urdu joining in Gulzar, so every such label needs the
// Urdu reset (no letter-spacing, no uppercase, 16px / 1.8) on the /ur/ page.
const css = readFileSync(new URL('../app/globals.css', import.meta.url), 'utf8');
const urduResets = css
  .split('\n')
  .filter((line) => line.startsWith('[dir=rtl][lang=ur] :is('))
  .join('\n');

test('new small-caps labels get the Urdu reset', () => {
  for (const selector of ['.cl-time .cl-label', '.ft-lockup small']) {
    const lines = urduResets.split('\n').filter((l) => l.includes(selector));
    assert.ok(lines.some((l) => l.includes('letter-spacing:0')), `${selector}: no letter-spacing reset`);
    assert.ok(lines.some((l) => l.includes('line-height:1.8')), `${selector}: no Urdu size/line-height`);
  }
});
