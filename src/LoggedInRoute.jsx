import { Route, Navigate } from "react-router-dom";

const LoggedInRoute = ({ Component, isLoggedIn, ...rest }) => {

    return (
        <Route
          {...rest}
          element={isLoggedIn ? <Component /> : <Navigate to="/login" replace />}
        />
      );
}

export default LoggedInRoute;