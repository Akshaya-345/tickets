import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute = ({ isAuthenticated }) => {
  const auth = localStorage.getItem('isAuthenticated') === 'true';
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;