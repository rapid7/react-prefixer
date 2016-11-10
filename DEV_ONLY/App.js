import React from 'react';
import {
  render
} from 'react-dom';

import prefix from '../src';

const styles = prefix({
  button: {
    appearance: 'none',
    display: 'block'
  },
  container: {
    transition: 'column-count 200ms'
  }
});

console.log(styles.container);

const App = () => {
  return (
    <div>
      <h1>
        App
      </h1>

      <button
        style={styles.button}
        type="button"
      >
        I do nothing!
      </button>
    </div>
  );
};

const div = document.createElement('div');

div.id = 'app-container';

document.body.appendChild(div);

render(<App/>, div);