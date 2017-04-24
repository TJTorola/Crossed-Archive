import { applyMiddleware } from 'redux';

const stub = store => next => action => next(action);

export default applyMiddleware(
  stub,
);
