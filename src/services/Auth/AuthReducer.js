import { handleActions } from "redux-actions";
import { Token } from "../../common/Storage/Token";

export const INITIAL_STATE = {
  authentication: Token.isTokenValid(),
  token: undefined,
  loading: {
    loginTwilio: false,
    signup: false,
  },
  error: {
    loginTwilio: undefined,
    signup: undefined,
  },
  success: {
    signup: undefined,
  },
};

const reducer = handleActions(
  {
    AUTH: {
      LOGIN: (state) => ({ ...state }),
      LOGIN_RESPONSE: {
        next(state, { payload: { token } }) {
          return { ...state, token, authentication: true };
        },
      },

      SIGNUP: (state) => ({ ...state }),
      SIGNUP_RESPONSE: {
        next(state, { payload: { token } }) {
          return {
            ...state,
            authentication: true,
            token,
          };
        },
      },

      LOGOUT: (state) => ({ ...state, authentication: false }),

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
