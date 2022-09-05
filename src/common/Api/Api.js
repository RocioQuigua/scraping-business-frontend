import { apiUrl } from "../Config/Environments";
import { Token } from "../Storage/Token";
import { store } from "../../index";
import { auth as authActions } from "../../services/Auth/AuthActions";

class Api {
  post(url, data, header) {
    if (!navigator.onLine) return { error: "DISCONNECT" };

    let isFormData = data instanceof FormData;

    return fetch(`${apiUrl}${url}`, {
      method: "POST",
      headers: header
        ? header
        : isFormData
        ? { Authorization: `Bearer ${Token.getToken()}` }
        : {
            Accept: isFormData ? "" : "application/json",
            "Content-type": isFormData ? "" : "application/json",
            Authorization: `Bearer ${Token.getToken()}`,
          },
      body: isFormData ? data : JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.status === 401) {
          store.dispatch(authActions.logout());
          return response;
        }
        response.payload = await response.json();
        return response;
      })
      .catch((err) => err);
  }

  put(url, data, header) {
    if (!navigator.onLine) return { error: "DISCONNECT" };

    let isFormData = data instanceof FormData;

    return fetch(`${apiUrl}${url}`, {
      method: "PUT",
      headers: header
        ? header
        : isFormData
        ? { Authorization: `Bearer ${Token.getToken()}` }
        : {
            Accept: isFormData ? "" : "application/json",
            "Content-type": isFormData ? "" : "application/json",
            Authorization: `Bearer ${Token.getToken()}`,
          },
      body: isFormData ? data : JSON.stringify(data),
    })
      .then(async (response) => {
        if (response.status === 401) {
          store.dispatch(authActions.logout());
          return response;
        }
        response.payload = await response.json();
        return response;
      })
      .catch((err) => err);
  }

  delete(url, id) {
    if (!navigator.onLine) return { error: "DISCONNECT" };

    url = new URL(`${apiUrl}${url}/${id}`);
    return fetch(url, {
      method: "DELETE",
      headers: new Headers({
        Authorization: `Bearer ${Token.getToken()}`,
      }),
    })
      .then(async (response) => {
        if (response.status === 401) {
          store.dispatch(authActions.logout());
          return response;
        }
        response.payload = await response.json();
        return response;
      })
      .catch((err) => err);
  }

  get(url, params) {
    if (!navigator.onLine) return { error: "DISCONNECT" };

    url = new URL(`${apiUrl}${url}`);

    if (params)
      Object.keys(params).forEach((key) =>
        url.searchParams.append(key, params[key])
      );
    return fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${Token.getToken()}`,
      },
    })
      .then(async (response) => {
        if (response.status === 401) {
          store.dispatch(authActions.logout());
          return response;
        }
        response.payload = await response.json();
        return response;
      })
      .catch((err) => err);
  }

  convertFormData(data) {
    let dataBody = new FormData();
    Object.keys(data).forEach((key) => {
      if (!Array.isArray(data[key])) {
        const isFile = data[key] && data[key].size;
        const isJson = typeof data[key] === "object";
        dataBody.append(
          key,
          isFile || !isJson ? data[key] : JSON.stringify(data[key])
        );
      } else {
        dataBody.append(key, JSON.stringify(data[key]));
      }
    });
    return dataBody;
  }
}

export default new Api();
