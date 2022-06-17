import { createActions } from "redux-actions";

export const { search } = createActions({
  SEARCH: {
    CREATE_SEARCH: (q, quantity, totalPages, page, year) => ({
      q,
      quantity,
      totalPages,
      page,
      year,
    }),
    CREATE_SEARCH_RESPONSE: () => ({}),

    SET_ERROR: (keyState, error) => ({ keyState, error }),
    SET_SUCCESS: (keyState, newValue) => ({ keyState, newValue }),
    SET_STATE: (keyState, newValue) => ({ keyState, newValue }),
    SET_LOADING: (keyLoading, newValue) => ({ keyLoading, newValue }),
  },
});
