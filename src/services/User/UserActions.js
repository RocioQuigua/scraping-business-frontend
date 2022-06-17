import { createActions } from "redux-actions";

export const { user } = createActions({
  USER: {
    GET_PROFILE: () => ({}),
    GET_PROFILE_RESPONSE: (profile) => ({ profile }),

    SET_ERROR: (keyState, error) => ({ keyState, error }),
    SET_SUCCESS: (keyState, newValue) => ({ keyState, newValue }),
    SET_STATE: (keyState, newValue) => ({ keyState, newValue }),
    SET_LOADING: (keyLoading, newValue) => ({ keyLoading, newValue }),
  },
});
