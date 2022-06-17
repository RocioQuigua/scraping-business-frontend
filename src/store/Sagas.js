import { all, fork } from "redux-saga/effects";

import AuthSaga from "../services/Auth/AuthSaga";
import SearchSaga from "../services/Search/SearchSaga";
import UserSaga from "../services/User/UserSaga";
import FavoriteSaga from "../services/Favorite/FavoriteSaga";

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(UserSaga),
    fork(SearchSaga),
    fork(FavoriteSaga),
  ]);
}
