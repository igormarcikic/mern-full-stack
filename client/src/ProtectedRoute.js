import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const ProtectedRoute = ({ children, ...rest }) => {

	const CurrentUser = useSelector(state=>state.CurrentUser);

	return (
    <Route
      {...rest}
      render={() =>
        CurrentUser.loggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  );
};	

export default ProtectedRoute;