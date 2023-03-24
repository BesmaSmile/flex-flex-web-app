import { Navbar } from 'components';
import {
  Login, Register, Home, Movies, Movie, TvShows, TvShow, Favorite, Search,
} from 'pages';
import React from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';
import NotLoggedRoute from './not-logged-route';
import ProtectedRoute from './protected-route';
import routesList from './routes-list';

function AppRoutes() {
  const { isLoggedIn } = useSelector((state) => state.user);
  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<NotLoggedRoute isLoggedIn={isLoggedIn} />}>
          <Route path={routesList.public.login} element={<Login />} />
          <Route path={routesList.public.register} element={<Register />} />
        </Route>
        <Route element={<ProtectedRoute isLoggedIn={isLoggedIn} />}>
          <Route path={routesList.protected.home} element={<Home />} />
          <Route path={routesList.protected.movies} element={<Movies />} />
          <Route path={routesList.protected.movie} element={<Movie />} />
          <Route path={routesList.protected.tvShows} element={<TvShows />} />
          <Route path={routesList.protected.tvShow} element={<TvShow />} />
          <Route path={routesList.protected.favorite} element={<Favorite />} />
          <Route path={routesList.protected.search} element={<Search />} />
        </Route>
        <Route
          path="*"
          element={<Navigate to="/home" replace />}
        />
      </Routes>
    </div>

  );
}

export default AppRoutes;
