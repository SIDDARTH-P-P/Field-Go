import React from 'react';
import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { loginUser } from 'container/LoginContainer/slice';

const Auth = ({ children }) => {
  const dispatch = useDispatch();
  const isAuthenticated = JSON.parse(localStorage.getItem(process.env.REACT_APP_LOGINUSER));

  if (!isAuthenticated || !isAuthenticated.user) {
    return <Navigate to="/login" />;
  }

  dispatch(loginUser(isAuthenticated.user));
  return children;
};

export default Auth;