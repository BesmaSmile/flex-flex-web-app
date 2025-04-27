
import useSearchNavigation from '@/hooks/useSearchNavigation';
import React, { useState } from 'react';



function SearchBar() {
  const [searchText, setSearchText] = useState('');
  const searchNavigate = useSearchNavigation();


  const handleSearchTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleSearchClick = () => {
    searchNavigate("/search", { query: searchText });
  };
  return (
    <div className="flex w-full h-[50px] rounded border border-[#5a5858] overflow-hidden bg-white">
      <div className="w-9/12">
        <input
          className="w-full h-full border-none px-4 text-lg text-gray-700 focus:outline-none"
          placeholder="Movies, TV show..."
          value={searchText}
          onChange={handleSearchTextChange}
        />
      </div>
      <div className="w-3/12">
        <button
          type="button"
          className="w-full h-full bg-rose-500 text-white hover:bg-rose-700 active:bg-rose-800 focus:outline-none cursor-pointer"
          onClick={handleSearchClick}
        >
          Search
        </button>
      </div>
    </div>

  );
}

export default SearchBar;
