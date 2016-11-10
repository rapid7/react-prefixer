import test from 'ava';

import applyPrefixes from 'src/index';

test('if applyPrefixes works for basic styles', (t) => {
  const styles = {
    appearance: 'none',
    display: 'block'
  };

  const result = applyPrefixes(styles);

  t.deepEqual(result, {
    WebkitAppearance: 'none',
    display: 'block'
  });
});

test('if applyPrefixes works for transition styles', (t) => {
  const styles = {
    transition: 'column-count 200ms'
  };

  const result = applyPrefixes(styles);

  t.deepEqual(result, {
    WebkitTransition: '-webkit-column-count 200ms'
  });
});

test('if applyPrefixes works for nested styles', (t) => {
  const styles = {
    appearance: 'none',
    display: 'block',
    foo: {
      columns: 3,
      bar: {
        display: 'flex'
      }
    }
  };

  const result = applyPrefixes(styles);

  t.deepEqual(result, {
    WebkitAppearance: 'none',
    display: 'block',
    foo: {
      WebkitColumns: 3,
      bar: {
        display: 'flex'
      }
    }
  });
});