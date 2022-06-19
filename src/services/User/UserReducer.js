import { handleActions } from "redux-actions";

export const INITIAL_STATE = {
  profile: undefined,
  business: undefined,
  loading: {
    getProfile: false,
    getBusiness: false,
    updateProfile: false,
    updateBusiness: false,
  },
  error: {
    getProfile: undefined,
    getBusiness: undefined,
    updateProfile: undefined,
    updateBusiness: undefined,
  },
  success: {
    updateProfile: undefined,
    updateBusiness: undefined,
    getBusiness: undefined,
  },
};

const reducer = handleActions(
  {
    USER: {
      GET_PROFILE_RESPONSE: (state, { payload: { profile } }) => ({ ...state, profile }),

      GET_BUSINESS_RESPONSE: (state, { payload: { business } }) => ({ ...state, business }),

      SET_ERROR: (state, { payload: { keyState, error } }) => ({
        ...state,
        error: { ...state.error, [keyState]: error },
      }),
      SET_SUCCESS: (state, { payload: { keyState, newValue } }) => ({
        ...state,
        success: { ...state.success, [keyState]: newValue },
      }),
      SET_LOADING: (state, { payload: { keyLoading, newValue } }) => ({
        ...state,
        loading: { ...state.loading, [keyLoading]: newValue },
      }),
      SET_STATE: (state, { payload: { keyState, newValue } }) => ({
        ...state,
        [keyState]: newValue,
      }),
    },
  },
  INITIAL_STATE
);

export default reducer;
