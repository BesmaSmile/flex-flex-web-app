import React from 'react';
import {
  Navigate,
  Outlet,
} from 'react-router-dom';

import routesList from './routes-list';

function ProtectedRoute({ isLoggedIn }) {
  if (!isLoggedIn) {
    return <Navigate to={routesList.public.login} replace />;
  }

  return <Outlet />;
}
export default ProtectedRoute;
