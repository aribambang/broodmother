import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { UserContext } from '../../context';

const AuthRoute = ({ children }) => {
  const [state, setState] = useContext(UserContext);

  if (!state) {
    return <Navigate to='/login' />;
  }

  return children;
};

export default AuthRoute;
