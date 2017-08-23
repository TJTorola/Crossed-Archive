import React from "react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import Middleware from "~/middleware/index.js"
import Reducers from "~/reducers/index.js"

const store = createStore(Reducers, {}, Middleware)
global.s = store

export default () =>
  <Provider store={store}>
    <div />
  </Provider>
