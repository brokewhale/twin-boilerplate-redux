import { HYDRATE } from "next-redux-wrapper";
import { authActionTypes } from "./type";
const authInitialState = {
  authData: {
    status: false,
  },
};

export default function reducer(state = authInitialState, action) {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        authData: {
          ...state.authData,
          ...action.payload.authData,
        },
      };
    case authActionTypes.LOGIN_SUCCESS:
      return {
        ...state,
        authData: {
          ...state.authData,
          ...action.payload,
          status: true,
        },
      };
    case authActionTypes.LOGIN_FAILURE:
      return {
        ...state,
        authData: {
          status: false,
        },
      };
    default:
      return state;
  }
}
