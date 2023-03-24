import React from 'react';
import {
  Navigate,
  Outlet,
} from 'react-router-dom';

import routesList from './routes-list';

function NotLoggedRoute({ isLoggedIn }) {
  if (isLoggedIn) {
    return <Navigate to={routesList.protected.home} replace />;
  }

  return <Outlet />;
}
export default NotLoggedRoute;
