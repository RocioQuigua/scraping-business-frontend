import { handleActions } from "redux-actions";

export const INITIAL_STATE = {
  publications: [],
  filters: undefined,
  loading: {
    createSearch: false,
  },
  error: {
    createSearch: undefined,
  },
  success: {
    createSearch: undefined,
  },
};

const reducer = handleActions(
  {
    SEARCH: {
      CREATE_SEARCH: (state) => ({ ...state }),
      CREATE_SEARCH_RESPONSE: (
        state,
        { payload: { publications, filters } }
      ) => ({
        ...state,
        publications,
        filters,
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
