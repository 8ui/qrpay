import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore } from 'redux-persist'

// SAGA
import createSagaMiddleware from 'redux-saga'

// LOGGER
import { createLogger } from 'redux-logger'

import { rootReducer } from './reducers';
import ISDEV from './utils/env';
import sagas from './sagas'

const middlewares = [];
const sagaMiddleware = createSagaMiddleware()
middlewares.push(applyMiddleware(sagaMiddleware))
if (ISDEV) {
  const logger = createLogger({
    collapsed: true
  });
  middlewares.push(applyMiddleware(logger))
}

export default function configureStore() {
  const store = compose(
    ...middlewares,
  )(createStore)(rootReducer)

  // then run the saga
  let sagaTask = sagaMiddleware.run(sagas)

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').rootReducer
      store.replaceReducer(nextRootReducer)
    });

    module.hot.accept('./sagas', () => {
      const nextSagas = require('./sagas').default
      sagaTask.cancel()
      sagaTask.done.then(() => {
        sagaTask = sagaMiddleware.run(nextSagas)
      })
    })
  }

  const persistor = persistStore(store)
  return { store, persistor }
}
