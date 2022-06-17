import { put, takeLatest, all, select } from "redux-saga/effects";

import { favorite } from "./FavoriteActions";
import Api from "../../common/Api/Api";

function* create({ payload }) {
  yield put(favorite.setLoading("create", true));
  yield put(favorite.setError("create", undefined));

  let params = {
    userId: payload.userId,
    title: payload.title,
    siteUrl: payload.siteUrl,
    origin: payload.origin,
  };

  if (payload.journal) params.journal = payload.journal;

  if (payload.authors) params.authors = payload.authors;

  if (payload.year) params.year = payload.year;

  if (payload.quotes) params.quotes = payload.quotes;

  if (payload.typeKey) params.typeKey = payload.typeKey;

  const response = yield Api.post("/favorite/create", params);

  if (response.ok) {
    yield put(favorite.setLoading("create", false));
    yield put(favorite.setSuccess("create", false));
  } else {
    yield put(favorite.setError("create", response.payload));
    yield put(favorite.setLoading("create", false));
  }
}

function* getAll() {
  yield put(favorite.setLoading("getAll", true));
  yield put(favorite.setError("getAll", undefined));

  const response = yield Api.get("/favorite/all");

  if (response.ok) {
    yield put(favorite.getAllResponse(response.payload.payload));
    yield put(favorite.setLoading("getAll", false));
  } else {
    yield put(favorite.setError("getAll", response.payload));
    yield put(favorite.setLoading("getAll", false));
  }
}

function* remove({ payload }) {
  yield put(favorite.setLoading("remove", true));
  yield put(favorite.setError("remove", undefined));

  const response = yield Api.post(`/favorite/delete?id=${payload.id}`,);
  
  if (response.ok) {
    let { favorites } = yield select(state => state.favorite);
    favorites = favorites.filter(item => item.id !== payload.id)
    yield put(favorite.removeResponse(favorites));
    yield put(favorite.setLoading("remove", false));
    yield put(favorite.setSuccess("remove", true));
  } else {
    yield put(favorite.setError("remove", response.payload));
    yield put(favorite.setLoading("remove", false));
  }
}

function* ActionWatcher() {
  yield takeLatest(favorite.getAll, getAll);
  yield takeLatest(favorite.create, create);
  yield takeLatest(favorite.remove, remove);

}

export default function* rootSaga() {
  yield all([ActionWatcher()]);
}
