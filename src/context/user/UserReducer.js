import {SET_USER_DATA, UPDATE_CREDIT} from '../types';

export default (state, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...payload,
      };

    case UPDATE_CREDIT:
      return {
        ...state,
        credit: payload,
      };

    default:
      return state;
  }
};
