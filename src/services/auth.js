import { post } from ".";

const URI = "/auth";

const login = (payload) => {
  const URL = `${URI}/login`;
  return post(URL, payload);
};

const register = (payload) => {
  const URL = `${URI}/register`;
  return post(URL, payload);
};

const AuthService = { login, register };
export default AuthService;
