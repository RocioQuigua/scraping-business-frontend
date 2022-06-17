import { handleActions } from "redux-actions";

export const INITIAL_STATE = {
  favorites: undefined,
  loading: {
    getAll: false,
    create: false,
    remove: false,
  },
  error: {
    getAll: undefined,
    create: undefined,
    remove: undefined,
  },
  success: {
    create: undefined,
    remove: undefined,
  },
};

const reducer = handleActions(
  {
    FAVORITE: {
      GET_ALL: (state) => ({ ...state }),
      GET_ALL_RESPONSE: (state, { payload: { favorites } }) => ({
        ...state,
        favorites,
      }),

      REMOVE_RESPONSE: (state, { payload: { newFavorites } }) => ({
        ...state,
        favorites: newFavorites,
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
