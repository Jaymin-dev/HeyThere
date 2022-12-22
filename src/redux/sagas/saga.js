import {all, call, put, takeLatest} from 'redux-saga/effects';
import {request, setupHttpConfig} from '../../utils/http';
import {
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_ERROR,
} from '../reducers/reducer';
import {IS_PROCESSING_REQUEST} from '../reducers/systemReducer';

function showProcessing(isProcessing = false) {
  return {
    type: IS_PROCESSING_REQUEST,
    isProcessing,
  };
}
function login(payload) {
  return request.post('/auth/login', payload);
}

function* handleLogin(action) {
  try {
    yield put(showProcessing(true));
    const {status, data} = yield call(login, action.payload);
    const {user} = data;
    if (status === 200) {
      yield setupHttpConfig();
      yield put({
        type: USER_LOGIN_SUCCESS,
        data: user,
      });
    } else {
      yield put({
        type: USER_LOGIN_ERROR,
        error: 'Something went wrong, Please try again later',
      });
    }
  } catch (error) {
    console.log('login error', error);
    yield put({
      type: USER_LOGIN_ERROR,
      error: error || 'Something went wrong, Please try again later',
    });
  } finally {
    yield put(showProcessing());
  }
}

export default all([takeLatest(USER_LOGIN_REQUEST, handleLogin)]);
