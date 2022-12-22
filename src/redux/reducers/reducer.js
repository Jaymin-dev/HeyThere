export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';

export const RESET_FLAGS = 'RESET_FLAGS';
export const LOGOUT = 'LOGOUT';

const initialState = {
  user: null,
  resetPassword: null,
  stateList: null,
  errors: {
    login: null,
  },
  flags: {
    loginSuccess: false,
  },
};

export const Reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        flags: {...state.flags, loginSuccess: true},
        user: action.data,
      };
    case USER_LOGIN_ERROR:
      return {...state, errors: {...state.errors, login: action.error}};

    case RESET_FLAGS:
      return {...state, errors: initialState.errors, flags: initialState.flags};
    default:
      return state;
  }
};
