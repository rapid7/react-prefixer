import test from 'ava';

import isSupported from 'src/supports';

test('if isSupported works for properties correctly', (t) => {
  t.true(isSupported('display', 'block'));
  t.false(isSupported('foo', 'bar'));
});

test('if isSupported works for values', (t) => {
  t.true(isSupported('display', 'flex'));
});
