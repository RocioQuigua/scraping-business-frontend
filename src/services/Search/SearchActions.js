import { createActions } from "redux-actions";

export const { search } = createActions({
  SEARCH: {
    GET_HISTORY: () => ({}),
    GET_HISTORY_RESPONSE: (history) => ({ history }),
    CREATE_SEARCH: (q, quantity, page, totalPages, year) => ({
      q,
      quantity,
      page,
      totalPages,
      year,
    }),
    CREATE_SEARCH_RESPONSE: (publications, filters, page) => ({
      publications,
      filters,
      page,
    }),

    GET_CACHE_SEARCH: (page, ) => ({ page }),

    CLEAR_FILTERS: () => ({}),

    CLEAR_ALL : () => ({}),

    FILTER_RESULTS: (type, values, position) => ({ type, values, position }),
    FILTER_RESULTS_RESPONSE: (publications) => ({ publications }),

    SET_ERROR: (keyState, error) => ({ keyState, error }),
    SET_SUCCESS: (keyState, newValue) => ({ keyState, newValue }),
    SET_STATE: (keyState, newValue) => ({ keyState, newValue }),
    SET_LOADING: (keyLoading, newValue) => ({ keyLoading, newValue }),
  },
});
