import React from "react"
import { Provider } from "react-redux"
import { createStore } from "redux"
import Middleware from "~/middleware/index"
import Reducers from "~/reducers/index"
import Root from "~/view/root"

const store = createStore(Reducers, {}, Middleware)
global.s = store

export default () =>
  <Provider store={store}>
    <div />
  </Provider>
