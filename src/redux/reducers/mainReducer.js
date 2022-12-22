import {combineReducers} from 'redux';
import {Reducer} from './reducer';
import {SystemReducer} from './systemReducer';

const combinedReducers = combineReducers({
  blank: (state, action) => {
    if (state == null) {
      state = [];
    }
    return state;
  },
  auth: Reducer,
  system: SystemReducer,
});

export const createRootReducer = (state, action) => {
  return combinedReducers(state, action);
};
