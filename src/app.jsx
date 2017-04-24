import React from 'react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import Root from './view/root';

import Reducers from './reducers/index';
import Middleware from './middleware/index';

const store = createStore(
  Reducers,
  {},
  Middleware
);
global.s = store;

export default () => (
  <Provider store={ store }>
    <Root />
  </Provider>
);
