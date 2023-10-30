import { useRecoilValue } from "recoil";
import { userRoleState } from "../../../../state/atoms.js";
import { Navigate, Route } from "react-router-dom";

function ProtectedRoute({ component: Component, ...rest }) {
  const role = useRecoilValue(userRoleState);
  return (
    <Route
      {...rest}
      render={(props) =>
        role === "ADMIN" || role === "OWNER" ? (
          <Component {...props} />
        ) : (
          <Navigate to="/" />
        )
      }
    />
  );
}

export default ProtectedRoute;
