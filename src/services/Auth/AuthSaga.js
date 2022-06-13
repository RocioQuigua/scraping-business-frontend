import { put, takeLatest, all } from "redux-saga/effects";

import { auth } from "./AuthActions";
import Api from "../../common/Api/Api";
import { Token } from "../../common/Storage/Token";
import { history } from "../../index";

function* login({ payload }) {
  yield put(auth.setLoading("login", true));
  yield put(auth.setError("login", undefined));

  const params = {
    email: payload.email,
    password: payload.password,
  };

  const response = yield Api.post("/auth/login", params);

  if (response.ok) {
    yield put(auth.loginResponse(response.payload.payload));
    yield Token.setToken('local', response.payload.payload);
    yield put(auth.setLoading("login", false));
  } else {
    yield put(auth.setError("login", response.payload));
    yield put(auth.setLoading("login", false));
  }
}

function* signup({ payload }) {
  yield put(auth.setLoading("signup", true));
  yield put(auth.setError("signup", undefined));

  const response = yield Api.post("/auth/twilio/signup", {
    name: payload.name,
    lastname: payload.lastname,
    phone: payload.phone,
    countryId: payload.countryId,
    municipalityKeyName: payload.municipalityKeyName,
    checkCode: payload.checkCode,
  });

  if (response.ok) {
    history.push("/");
    yield put(auth.signupResponse(response.payload.token));
    yield put(auth.setLoading("signup", false));
    Token.setToken("local", response.payload.token);
  } else {
    yield put(auth.setError("signup", response.payload));
    yield put(auth.setLoading("signup", false));
  }
}

function* logout() {
  yield localStorage.removeItem("token");
  history.push("/");
}

function* ActionWatcher() {
  yield takeLatest(auth.login, login);
  yield takeLatest(auth.signup, signup);
  yield takeLatest(auth.logout, logout);
}

export default function* rootSaga() {
  yield all([ActionWatcher()]);
}
