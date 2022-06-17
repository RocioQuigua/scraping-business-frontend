import { createActions } from "redux-actions";

export const { favorite } = createActions({
  FAVORITE: {
    GET_ALL: () => ({}),
    GET_ALL_RESPONSE: (favorites) => ({ favorites }),

    CREATE: (
      userId,
      title,
      description,
      siteUrl,
      origin,
      journal,
      authors,
      year,
      quotes,
      typeKey
    ) => ({
      userId,
      title,
      description,
      siteUrl,
      origin,
      journal,
      authors,
      year,
      quotes,
      typeKey,
    }),
    REMOVE: (id) => ({ id }),

    SET_ERROR: (keyState, error) => ({ keyState, error }),
    SET_SUCCESS: (keyState, newValue) => ({ keyState, newValue }),
    SET_STATE: (keyState, newValue) => ({ keyState, newValue }),
    SET_LOADING: (keyLoading, newValue) => ({ keyLoading, newValue }),
  },
});
