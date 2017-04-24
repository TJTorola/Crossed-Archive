import React from 'react';
import { render } from 'react-dom';

import css from './sass/entry.scss';

import App from './app';

document.addEventListener('DOMContentLoaded', () => {
  render(<App />, document.querySelector('#app'));
});
