import { React } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export default function AuthRoute() {
  const location = useLocation();
  const currentUser = true;
  return currentUser ? <Outlet /> : <Navigate to="/" replace state={{ from: location }} />;
}
