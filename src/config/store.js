import authSlice from "../slices/auth.slice";

const { configureStore } = require("@reduxjs/toolkit");
const { ENV_PRODUCTION, ENV_DEVELOPMENT } = require("./constants");

function configStore() {
  const currentEnv = process.env.REACT_APP_ENV || ENV_DEVELOPMENT;
  const store = configureStore({
    reducer: {
      auth: authSlice,
    },
    devTools: currentEnv !== ENV_PRODUCTION,
  });
  return store;
}

export default configStore;
