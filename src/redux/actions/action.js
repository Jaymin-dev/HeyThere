import {USER_LOGIN_REQUEST, RESET_FLAGS, LOGOUT} from '../reducers/reducer';

export const login = payload => ({
  type: USER_LOGIN_REQUEST,
  payload,
});

export const resetFlags = () => ({
  type: RESET_FLAGS,
});

export const logOut = () => ({
  type: LOGOUT,
});
