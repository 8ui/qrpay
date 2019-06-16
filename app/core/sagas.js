import { all } from 'redux-saga/effects'
import { mainSagas } from './main'
import { userSagas } from './user'


export default function * mainSaga() {
  yield all([
    ...mainSagas,
    ...userSagas,
  ])
}
