import { handleActions } from "redux-actions";

export const INITIAL_STATE = {
  profile: undefined,
  loading: {
    getProfile: false,
  },
  error: {
    getProfile: false,
  },
  success: {},
};

const reducer = handleActions(
  {
    USER: {
      GET_PROFILE: (state) => ({ ...state }),
      GET_PROFILE_RESPONSE: (state, { payload: { profile } }) => ({ ...state, profile }),


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
