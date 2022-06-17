import { all, put, takeLatest } from "redux-saga/effects";

import Api from "../../common/Api/Api";
import { search } from "./SearchActions";

function* createSearch() {
  yield put(search.setLoading("search", true));
  yield put(search.setError("search", undefined));

  const response = yield Api.post("/search/engine");

  if (response.ok) {
    yield put(search.getSearchResponse(response.payload.payload));
    yield put(search.setLoading("search", false));
  } else {
    yield put(search.setError("search", response.payload));
    yield put(search.setLoading("search", false));
  }
}

function* ActionWatcher() {
  yield takeLatest(search.createSearch, createSearch);
}

export default function* rootSaga() {
  yield all([ActionWatcher()]);
}
