import React, { useState } from 'react';
import {
  useNavigate,
  createSearchParams,
} from 'react-router-dom';
import routesList from 'routes/routes-list';
import './style.scss';

const useNavigateSearch = () => {
  const navigate = useNavigate();
  return (pathname, params) => navigate({ pathname, search: `?${createSearchParams(params)}` });
};

function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const navigateSearch = useNavigateSearch();

  const handleTextSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    navigateSearch(routesList.protected.search, { query: searchText });
  };
  return (
    <div className="search-bar d-flex row g-0">
      <div className="col-9">
        <input className="search-input" placeholder="Movies, TV show..." value={searchText} onChange={handleTextSearchChange} />
      </div>
      <div className="col-3">
        <button type="button" className="btn btn-danger" onClick={handleSearchClick}>search</button>
      </div>
    </div>
  );
}

export default SearchBar;
