import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import routesList from 'routes/routes-list';
import appName from 'assets/img/app-name.svg';

import './style.scss';
import { useDispatch, useSelector } from 'react-redux';

function Navbar() {
  const dispatch = useDispatch();
  const { isLoggedIn, data: userData } = useSelector((state) => state.user);
  const logout = () => {
    dispatch({
      type: 'user/LOGOUT',
    });
  };
  const location = useLocation();
  const mode = location.pathname === routesList.protected.home ? 'dark' : 'light';
  if (!isLoggedIn) return null;

  const paths = [
    { path: routesList.protected.home, name: 'Home' },
    { path: routesList.protected.movies, name: 'Movies' },
    { path: routesList.protected.tvShows, name: 'TV Shows' },
    { path: routesList.protected.favorite, name: 'My Favorite' },
    { path: routesList.protected.search, name: 'Search' },
  ];

  const isCurrentPath = (path) => path === location.pathname;
  return (
    <div className={`navbar d-flex g-0 row justify-content-between align-items-center ${mode}`}>
      <div className="col">
        <div className="d-flex justify-content-start align-items-center row g-0">
          <Link to={routesList.protected.home} className="nav-item col"><img className="appname-img" src={appName} alt="app name" /></Link>
          {paths.map(({ path, name }) => (
            <Link className={`nav-item col ${isCurrentPath(path) ? 'active' : ''}`} key={name} to={path}>
              {name}
            </Link>
          ))}
        </div>
      </div>
      <div className="col">
        <div className="d-flex justify-content-end align-items-center row g-0">
          <div className="nav-item col">
            <h5 className="mb-0">
              {userData?.firstname}
              {' '}
              {userData?.lastname}
            </h5>
          </div>
          <div className="nav-item col">
            <button type="button" className={`btn btn-outline-${mode === 'dark' ? 'light' : 'danger'}`} onClick={logout}>Sign out</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
