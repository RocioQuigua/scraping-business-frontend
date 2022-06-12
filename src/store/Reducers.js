import { combineReducers } from 'redux';

import { auth } from '../services/Auth/AuthActions';
import reducerAuth from '../services/Auth/AuthReducer';

const appReducer =  () => combineReducers({
  auth: reducerAuth,
});

const rootReducer = () => {
  return (state, action) => {
    if (action.type === auth.logout)
      state = undefined;
    return appReducer()(state, action);
  };
};
export default rootReducer;