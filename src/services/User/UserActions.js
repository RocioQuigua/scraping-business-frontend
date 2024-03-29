import { createActions } from "redux-actions";

export const { user } = createActions({
  USER: {
    GET_PROFILE: () => ({}),
    GET_PROFILE_RESPONSE: (profile) => ({ profile }),

    UPDATE_PROFILE: ({ name, lastname, phone, email, categoryId }) => ({
      name,
      lastname,
      phone,
      email,
      categoryId,
    }),

    GET_BUSINESS: () => ({}),
    GET_BUSINESS_RESPONSE: (business) => ({ business }),
    
    UPDATE_BUSINESS: ({ name, nit }) => ({ name, nit }),

    SET_ERROR: (keyState, error) => ({ keyState, error }),
    SET_SUCCESS: (keyState, newValue) => ({ keyState, newValue }),
    SET_STATE: (keyState, newValue) => ({ keyState, newValue }),
    SET_LOADING: (keyLoading, newValue) => ({ keyLoading, newValue }),
  },
});
