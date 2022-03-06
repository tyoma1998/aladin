import axios from "axios";

import { ROUTES } from "router/routes";

import LocalStorageService from "services/localStorage/LocalStorageService";
import NavigationService from "services/navigation/NavigationService";

export function ejectErrorMessage(errors) {
  const status = errors?.response?.status ?? "Unknown";
  return errors?.response?.data?.message ?? `Error code #${status}`;
}

export function handleRequestError(error) {}

const Authorization = "Authorization";

export class API {
  constructor(domain, options = {}) {
    this.axios = axios.create({
      baseURL: domain,
      ...options,
    });

    const { errorResponseInterceptor } = this;

    this.axios.interceptors.response.use(
      null,
      errorResponseInterceptor.bind(this)
    );

    const createMethod = (method) => {
      this[method] = this._createRequest(method);
    };

    ["get", "post", "patch", "put", "delete"].forEach(createMethod);
  }

  // eslint-disable-next-line class-methods-use-this
  _createRequest(method) {
    // eslint-disable-next-line func-names
    return async function (url, body, config, isFullData = false) {
      const response = await this.axios[method](url, body, config);
      if (isFullData) {
        return response || null;
      }
      return (response && response.data) || null;
    };
  }

  errorResponseInterceptor(error) {
    const { response = {} } = error;
    const { status } = response;

    const signUpConfirmPathName = ROUTES.signUpConfirm.path.replace(
      ":token",
      ""
    );
    const isSignUpConfirmPage =
      window?.location?.pathname?.includes(signUpConfirmPathName) || false;

    const isToken = LocalStorageService.getItem("token");
    // Romove access token from localStorage if user is unauthorized or token is expired
    if (status === 401 && isToken) {
      this.deleteToken();
      LocalStorageService.clear("token");
      NavigationService.navigateToPath(ROUTES.signOut.path);
    }

    if (status === 403) {
      NavigationService.navigateToDefaultPath();
    }

    if (status === 404 && !isSignUpConfirmPage) {
      NavigationService.navigateToPath(ROUTES.emptyPage.path);
    }

    return Promise.reject(error);
  }

  saveToken(token) {
    this.axios.defaults.headers.common[Authorization] = `Bearer ${token}`;
  }

  deleteToken() {
    this.axios.defaults.headers.common[Authorization] = "";
  }
}
