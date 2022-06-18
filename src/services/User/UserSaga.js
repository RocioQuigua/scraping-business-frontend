import { put, takeLatest, all, select } from "redux-saga/effects";

import { user } from "./UserActions";
import Api from "../../common/Api/Api";

function* getProfile() {
  yield put(user.setLoading("getProfile", true));
  yield put(user.setError("getProfile", undefined));

  const response = yield Api.get("/user/profile");

  if (response.ok) {
    yield put(user.getProfileResponse(response.payload.payload));
    yield put(user.setLoading("getProfile", false));
  } else {
    yield put(user.setError("getProfile", response.payload));
    yield put(user.setLoading("getProfile", false));
  }
}

function* updateProfile({ payload }) {
  yield put(user.setLoading("updateProfile", true));
  yield put(user.setError("updateProfile", undefined));

  const response = yield Api.put("/user/update", payload);

  if (response.ok) {
    const { profile } = yield select((state) => state.user);

    yield put(
      user.setState("profile", {
        ...profile,
        email: payload.email,
        person: {...profile.person, ...payload},
      })
    );
    yield put(user.setLoading("updateProfile", false));
    yield put(user.setSuccess("updateProfile", true));
  } else {
    yield put(user.setError("updateProfile", response.payload));
    yield put(user.setLoading("updateProfile", false));
  }
}

function* ActionWatcher() {
  yield takeLatest(user.getProfile, getProfile);
  yield takeLatest(user.updateProfile, updateProfile);
}

export default function* rootSaga() {
  yield all([ActionWatcher()]);
}
