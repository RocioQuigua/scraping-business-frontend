import { all, put, select, takeLatest } from "redux-saga/effects";

import Api from "../../common/Api/Api";
import { search } from "./SearchActions";

function* createSearch({ payload }) {
  yield put(search.setState('publicationsFilter', undefined))
  yield put(search.setState('filters', undefined))
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
    response.payload.payload.publications =
      response.payload.payload.publications.map((item) => ({
        ...item,
        idiom: item?.language?.name,
      }));

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

function* filterResults() {
  let { publications, filterValues } = yield select((state) => state.search);
  let newPublications = publications;

  yield filterValues.forEach((element) => {
    newPublications = newPublications.filter((item) =>
      element.values.find((value) => value == item[element.type])
    );
  });

  yield put(search.filterResultsResponse(newPublications));
}

function* getHistory() {
  yield put(search.setLoading("getHistory", true));
  yield put(search.setError("getHistory", undefined));

  const response = yield Api.get("/history/all");

  if (response.ok) {
    yield put(search.getHistoryResponse(response.payload.payload));
    yield put(search.setLoading("getHistory", false));
  } else {
    yield put(search.setError("getHistory", response.payload));
    yield put(search.setLoading("getHistory", false));
  }
}

function* ActionWatcher() {
  yield takeLatest(search.createSearch, createSearch);
  yield takeLatest(search.filterResults, filterResults);
  yield takeLatest(search.getHistory, getHistory);
}

export default function* rootSaga() {
  yield all([ActionWatcher()]);
}
