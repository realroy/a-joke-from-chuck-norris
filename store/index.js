import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import reducer from './reducers'

const makeStore = state => createStore(
  reducer,
  state,
  composeWithDevTools(applyMiddleware()),
)

export default makeStore
