import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const PrivateRoute = ({ children }) => {
  const { auth, loading } = useContext(AuthContext);

  if (loading) {
      return <div>Loading...</div>; // Or any other loading indicator
  }

  if (!(auth && auth.loggedIn)) {
      return <Navigate to="/login" />;
  }

  return children;
};

export default PrivateRoute;