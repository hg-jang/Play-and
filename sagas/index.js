import { all, fork } from 'redux-saga/effects'
import userSaga from './user'
import groupSaga from './group'

export default function* rootSaga() {
  yield all([
    fork(userSaga),
    fork(groupSaga),
  ])
}