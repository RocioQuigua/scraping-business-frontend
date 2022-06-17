import { createActions } from 'redux-actions';

export const { modal } = createActions({
  MODAL: {
    SET_MODAL: (keyState, visible, params) => ({ keyState, visible, params })
  },
});
