import axios from "axios";
import {
  GENERIC_ERROR_MESSAGE,
  SERVER_AUTH_ERROR_STATUS_CODE,
  SERVER_VALIDATION_STATUS_CODE,
} from "../config/constants";
import ROUTE_URLS from "../config/routes";
import LocalstorageService from "../helpers/localstorage-services";

//apply base url for axios
const API_URL = process.env.REACT_APP_BASE_URL || "";
const axiosApi = axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(
  (config) => {
    const token = LocalstorageService.getLoggedInUserToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    const { data, status } = error.response;
    if (status === SERVER_AUTH_ERROR_STATUS_CODE) {
      LocalstorageService.logoutUser();
      window.location.replace(ROUTE_URLS.LOGIN);
    }
    if (status === SERVER_VALIDATION_STATUS_CODE) {
      const { errors } = data;
      const errorsArray = [];
      for (const key in errors) {
        if (Object.hasOwnProperty.call(errors, key)) {
          const error = errors[key];
          errorsArray.push(error);
        }
      }
      return Promise.reject(errorsArray);
    }
    return Promise.reject(GENERIC_ERROR_MESSAGE);
  }
);

export async function get(url, config = {}) {
  return await axiosApi.get(url, { ...config });
}

export async function post(url, data, config = {}) {
  return axiosApi.post(url, { ...data }, { ...config });
}