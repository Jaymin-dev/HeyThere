import {all, takeEvery} from 'redux-saga/effects';
import authSaga from './saga';

function* helloSaga() {
  console.log('Hello from saga!');
}

export function* mainSaga() {
  yield all([
    takeEvery('TEST/ALO', helloSaga),
    authSaga,
  ]);
}
