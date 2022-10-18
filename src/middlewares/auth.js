import LocalstorageService from "../helpers/localstorage-services";
import AuthService from "../services/auth";
import {
  loginError,
  loginRequest,
  loginSuccess,
  setReset,
  signUpError,
  signUpRequest,
  signUpSuccess,
} from "../slices/auth.slice";

export function loginUser(payload) {
  return (dispatch) => {
    dispatch(loginRequest());
    AuthService.login(payload)
      .then((response) => {
        const { status, data, message, error } = response.data;
        if (status === 1) {
          LocalstorageService.loginUser({ ...data });
          dispatch(loginSuccess({ ...data, message }));
        } else {
          dispatch(loginError(error));
        }
      })
      .catch((error) => {
        dispatch(loginError(error));
      });
  };
}

export function signUpUser(payload) {
  return (dispatch) => {
    dispatch(signUpRequest());
    AuthService.register(payload)
      .then((response) => {
        const { status, data, message, error } = response.data;
        if (status === 1) {
          dispatch(signUpSuccess({ data, message }));
        } else {
          dispatch(signUpError(error));
        }
      })
      .catch((error) => {
        dispatch(signUpError(error));
      });
  };
}

export function resetValue() {
  return (dispatch) => {
    dispatch(setReset());
  };
}
