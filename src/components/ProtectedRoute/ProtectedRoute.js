import React from 'react';
import { Route, Redirect, useLocation } from "react-router-dom";

const ProtectedRoute = ({ component: Component, ...props  }) => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    if(!props.loggedIn && pathname === "/saved-news") 
    props.onChangePopup();
  }, [pathname]);

  return (
    <Route>
      {
        () => props.loggedIn ? <Component {...props} /> : <Redirect to="/" />
      }
    </Route>
)}

export default ProtectedRoute;