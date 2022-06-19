import { createActions } from "redux-actions";

export const { auth } = createActions({
  AUTH: {
    LOGIN: ({ email, password }) => ({ email, password }),
    LOGIN_RESPONSE: (token) => ({ token }),

    SIGNUP: ({
      name,
      lastname,
      phone,
      email,
      categoryId,
      password,
      nit,
      businessName,
    }) => ({
      name,
      lastname,
      phone,
      email,
      categoryId,
      password,
      nit,
      businessName,
    }),
    SIGNUP_RESPONSE: (token) => ({ token }),

    LOGOUT: () => ({}),

    SET_ERROR: (keyState, error) => ({ keyState, error }),
    SET_SUCCESS: (keyState, newValue) => ({ keyState, newValue }),
    SET_STATE: (keyState, newValue) => ({ keyState, newValue }),
    SET_LOADING: (keyLoading, newValue) => ({ keyLoading, newValue }),
  },
});
