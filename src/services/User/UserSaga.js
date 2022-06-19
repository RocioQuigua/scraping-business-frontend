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

function* getBusiness() {
  yield put(user.setLoading("getBusiness", true));
  yield put(user.setError("getBusiness", undefined));

  const response = yield Api.get("/user/business");

  if (response.ok) {
    yield put(user.getBusinessResponse(response.payload.payload));
    yield put(user.setLoading("getBusiness", false));
  } else {
    yield put(user.setError("getBusiness", response.payload));
    yield put(user.setLoading("getBusiness", false));
  }
}

function* updateProfile({ payload }) {
  yield put(user.setLoading("updateProfile", true));
  yield put(user.setError("updateProfile", undefined));

  const response = yield Api.put("/user/update", payload);

  if (response.ok) {
    const { profile } = yield select((state) => state.user);
    const { categories } = yield select((_state) => _state.utils);

    yield put(
      user.setState("profile", {
        ...profile,
        email: payload.email,
        person: { ...profile.person, ...payload },
        category: categories.find((item) => parseInt(item.id , 10)=== payload.categoryId),
      })
    );
    yield put(user.setLoading("updateProfile", false));
    yield put(user.setSuccess("updateProfile", true));
  } else {
    yield put(user.setError("updateProfile", response.payload));
    yield put(user.setLoading("updateProfile", false));
  }
}

function* updateBusiness({ payload }) {
  yield put(user.setLoading("updateBusiness", true));
  yield put(user.setError("updateBusiness", undefined));

  const response = yield Api.put("/user/business", payload);

  if (response.ok) {
    const { business } = yield select((state) => state.user);

    yield put(
      user.setState("business",  {...business, ...payload})
    );
    yield put(user.setLoading("updateBusiness", false));
    yield put(user.setSuccess("updateBusiness", true));
  } else {
    yield put(user.setError("updateBusiness", response.payload));
    yield put(user.setLoading("updateBusiness", false));
  }
}

function* ActionWatcher() {
  yield takeLatest(user.getProfile, getProfile);
  yield takeLatest(user.getBusiness, getBusiness);
  yield takeLatest(user.updateProfile, updateProfile);
  yield takeLatest(user.updateBusiness, updateBusiness);
}

export default function* rootSaga() {
  yield all([ActionWatcher()]);
}
