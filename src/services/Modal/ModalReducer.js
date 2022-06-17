import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
  modals: {
    alertMessage: false,
  },
  params: {
    alertMessage: undefined,
  }
};

const reducer = handleActions({
  MODAL: {
    SET_MODAL: (state, { payload: { keyState, visible, params } }) => ({
      ...state,
      modals: { ...state.modals, [keyState]: visible },
      params: { ...state.params, [keyState]: params },

    }),
  }
}, INITIAL_STATE
);

export default reducer;