import { put, takeLatest, all } from "redux-saga/effects";

import { utils } from "./UtilsActions";
import Api from "../../common/Api/Api";

function* getCategories() {
  yield put(utils.setLoading("getCategories", true));
  yield put(utils.setError("getCategories", undefined));

  const response = yield Api.get("/utils/category/all");

  if (response.ok) {
    yield put(utils.getCategoriesResponse(response.payload.payload));
    yield put(utils.setLoading("getCategories", false));
  } else {
    yield put(utils.setError("getCategories", response.payload));
    yield put(utils.setLoading("getCategories", false));
  }
} 
function* ActionWatcher() {
  yield takeLatest(utils.getCategories, getCategories);
}

export default function* rootSaga() {
  yield all([ActionWatcher()]);
}
