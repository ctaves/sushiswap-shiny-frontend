import React from "react";

const Search = ({ search, term }) => {
  return (
    <>
      <div className="ml-2 relative flex-grow focus-within:z-10">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg className="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clipRule="evenodd"
            />
          </svg>
        </div>
        <input
          className="appearance-none rounded-none block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 sm:text-sm sm:leading-5 transition ease-in-out duration-150"
          placeholder="Filter pairs"
          value={term}
          onChange={(e) => {
            search(e.target.value);
          }}
        />
      </div>
    </>
  );
};

export default Search;
