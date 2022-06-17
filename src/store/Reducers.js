import { combineReducers } from 'redux';

import { auth } from '../services/Auth/AuthActions';
import reducerAuth from '../services/Auth/AuthReducer';
import reducerUser from '../services/User/UserReducer';
import reducerSearch from '../services/Search/SearchReducer';

const appReducer =  () => combineReducers({
  auth: reducerAuth,
  user: reducerUser,
  search: reducerSearch, 
});

const rootReducer = () => {
  return (state, action) => {
    if (action.type === auth.logout)
      state = undefined;
    return appReducer()(state, action);
  };
};
export default rootReducer;