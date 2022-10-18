import {
  LOCALSTORAGE_USER_AUTH_TOKEN_KEY,
} from "../config/constants";

function getLoggedInUserToken() {
  const token = localStorage.getItem(LOCALSTORAGE_USER_AUTH_TOKEN_KEY);
  return token || null;
}

function logoutUser() {
  localStorage.removeItem(LOCALSTORAGE_USER_AUTH_TOKEN_KEY);
}

function loginUser({ token, user }) {
  localStorage.setItem(LOCALSTORAGE_USER_AUTH_TOKEN_KEY, token);
}

const LocalstorageService = {
  getLoggedInUserToken,
  logoutUser,
  loginUser
};

export default LocalstorageService;
