export const IS_PROCESSING_REQUEST = 'IS_PROCESSING_REQUEST';

const initialState = {
  isProcessing: false,
};

export const SystemReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_PROCESSING_REQUEST:
      return {...state, isProcessing: action.isProcessing};
    default:
      return state;
  }
};
