import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import "./App.scss";
import { Route, Routes } from "react-router";
import React from "react";
import { BASE_URL } from "./config/routes";
import Signup from "./pages/signup/Signup";
import ROUTE_URLS from "./config/routes";
import { ToastContainer } from "react-toastify";
import RouteAuthGuard from "./components/route-auth-guard/RouteAuthGuard";
import RouteAuthGuardRestrictLoggedUser from "./components/route-auth-guard-restrict-logged-user/RouteAuthGuardRestrictLoggedUser";
import NotFound from "./pages/not-found/NotFound";

class App extends React.Component {
  render() {
    return (
      <>
        <Routes>
          <Route
            path={BASE_URL}
            element={
              <RouteAuthGuard>
                <Home />
              </RouteAuthGuard>
            }
          />
          <Route
            path={ROUTE_URLS.REGISTER}
            element={
              <RouteAuthGuardRestrictLoggedUser>
                <Signup />
              </RouteAuthGuardRestrictLoggedUser>
            }
          />
          <Route
            path={ROUTE_URLS.LOGIN}
            element={
              <RouteAuthGuardRestrictLoggedUser>
                <Login />
              </RouteAuthGuardRestrictLoggedUser>
            }
          />
          <Route path={"*"} element={<NotFound />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </>
    );
  }
}

export default App;
