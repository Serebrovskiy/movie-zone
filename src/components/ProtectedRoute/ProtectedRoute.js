import React from 'react';
import { Route, Redirect, useLocation } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props }) => {
  const { pathname } = useLocation();

  //если вводим в ручную путь который закрыт
  React.useEffect(() => {
    if (!props.loggedIn && pathname === "/rating")
      props.isOpenLogin();
  }, [pathname]);

  return (
    <Route>
      {
        () => props.loggedIn ? <Component {...props} /> : <Redirect to="/films" />
      }
    </Route>
  )
}

export default ProtectedRoute;