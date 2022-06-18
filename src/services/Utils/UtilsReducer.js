import { handleActions } from "redux-actions";

export const INITIAL_STATE = {
  categories: undefined,
  loading: {
    getCategories: false,
  },
  error: {
    getCategories: false,
  },
  success: {},
};

const reducer = handleActions(
  {
    UTILS: {
      GET_CATEGORIES: (state) => ({ ...state }),
      GET_CATEGORIES_RESPONSE: (state, { payload: { categories } }) => ({
        ...state,
        categories,
      }),

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
