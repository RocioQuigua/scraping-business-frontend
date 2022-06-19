import { all, put, takeLatest } from "redux-saga/effects";

import Api from "../../common/Api/Api";
import { search } from "./SearchActions";

function* createSearch({ payload }) {
  yield put(search.setLoading("createSearch", true));
  yield put(search.setError("createSearch", undefined));
  let params = {
    q: payload.q,
  };

  if (payload.page) params.page = payload.page;

  if (payload.totalPages) params.totalPages = payload.totalPages;

  if (payload.quantity) params.quantity = payload.quantity;

  if (payload.year) params.year = payload.year;

  const response = yield Api.post("/search/engine", params);

  if (response.ok) {
    yield put(
      search.createSearchResponse(
        response.payload.payload.publications,
        response.payload.payload.filters
      )
    );
    yield put(search.setLoading("createSearch", false));
  } else {
    yield put(search.setError("createSearch", response.payload));
    yield put(search.setLoading("createSearch", false));
  }
}

function* ActionWatcher() {
  yield takeLatest(search.createSearch, createSearch);
}

export default function* rootSaga() {
  yield all([ActionWatcher()]);
}
