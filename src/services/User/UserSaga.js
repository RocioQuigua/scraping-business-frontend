import { put, takeLatest, all } from "redux-saga/effects";

import { user } from "./UserActions";
import Api from "../../common/Api/Api";

function* getProfile() {
  yield put(user.setLoading("getProfile", true));
  yield put(user.setError("getProfile", undefined));

  const response = yield Api.get("/user/profile");

  if (response.ok) {
    yield put(user.getProfileResponse(response.payload.payload))
    yield put(user.setLoading("getProfile", false));
  } else {
    yield put(user.setError("getProfile", response.payload));
    yield put(user.setLoading("getProfile", false));
  }
}

function* ActionWatcher() {
  yield takeLatest(user.getProfile, getProfile);
}

export default function* rootSaga() {
  yield all([ActionWatcher()]);
}
