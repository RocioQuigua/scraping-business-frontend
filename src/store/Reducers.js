import { combineReducers } from 'redux';

import { auth } from '../services/Auth/AuthActions';
import reducerAuth from '../services/Auth/AuthReducer';
import reducerUser from '../services/User/UserReducer';
import reducerSearch from '../services/Search/SearchReducer';
import reducerFavorite from '../services/Favorite/FavoriteReducer';
import reducerModal from '../services/Modal/ModalReducer';
import reducerUtils from '../services/Utils/UtilsReducer';

const appReducer =  () => combineReducers({
  auth: reducerAuth,
  user: reducerUser,
  search: reducerSearch, 
  favorite: reducerFavorite,
  modal: reducerModal,
  utils: reducerUtils,
});

const rootReducer = () => {
  return (state, action) => {
    if (action.type === 'AUTH/LOGOUT')
      state = undefined;
    return appReducer()(state, action);
  };
};
export default rootReducer;