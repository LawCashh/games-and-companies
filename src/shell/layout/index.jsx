import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import { useRecoilValue } from "recoil";

import Header from "shell/layout/components/header/index.jsx";
import LoginModal from "shell/layout/components/login-modal/index.jsx";
import About from "pages/About/index.jsx";

import routes from "shell/routes/index.jsx";
import { isLoggedInState, userRoleState } from "@atoms/user/index.js";

function Layout() {
  const isLoggedIn = useRecoilValue(isLoggedInState);
  const userRole = useRecoilValue(userRoleState);
  return (
    <>
      {!isLoggedIn && <LoginModal />}
      {isLoggedIn && (
        <BrowserRouter>
          <Header />
          <Routes>
            {routes?.map((route) => {
              return (
                <Route
                  key={route.path}
                  path={route.path}
                  element={route.component()}
                  exact
                />
              );
            })}
            {userRole === "ADMIN" || userRole === "OWNER" ? (
              <Route path={`/about`} element={<About />} exact />
            ) : (
              <Route path="/about" element={<Navigate to={"/"} />} />
            )}
            <Route path="*" element={<Navigate to={"/add-game"} />} />
          </Routes>
        </BrowserRouter>
      )}
    </>
  );
}

export default Layout;
