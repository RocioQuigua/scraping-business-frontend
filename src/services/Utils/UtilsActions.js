import { createActions } from "redux-actions";

export const { utils } = createActions({
  UTILS: {
    GET_CATEGORIES: () => ({}),
    GET_CATEGORIES_RESPONSE: (categories) => ({ categories }),

    SET_ERROR: (keyState, error) => ({ keyState, error }),
    SET_SUCCESS: (keyState, newValue) => ({ keyState, newValue }),
    SET_STATE: (keyState, newValue) => ({ keyState, newValue }),
    SET_LOADING: (keyLoading, newValue) => ({ keyLoading, newValue }),
  },
});
