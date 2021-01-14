import React, { useState, useRef } from "react";
import Search from "./Search";
import FilterDropdown from "./Dropdown";
import useOutsideClick from "../../../shared/hooks/useOutsideClick";

const TableFilter = ({ search, term, columns, setColumns }) => {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef();
  useOutsideClick(ref, () => {
    setOpen(false);
  });
  return (
    <>
      <div className="px-2 py-4">
        <div>
          <div className="flex-auto flex items-center justify-between">
            <div className="group w-3/5 leading-6 flex items-center">
              <Search search={search} term={term} />
              <div className="relative inline-block text-left">
                <div>
                  <span className="rounded-md shadow-sm">
                    <button
                      onClick={() => setOpen(true)}
                      className="-ml-px relative flex items-center px-3 py-2 rounded-r-md border border-gray-300 text-sm leading-5 bg-white text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
                    >
                      {/* Filter Icon */}
                      <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="hidden sm:block ml-2">Filter</span>
                    </button>
                  </span>
                </div>
                <div ref={ref}>
                  <FilterDropdown isOpen={isOpen} columns={columns} setColumns={setColumns} />
                </div>
              </div>
            </div>
            <div className="mt-5 flex justify-center sm:mt-0">
              <button className="mr-4 flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                View Cards
              </button>
              <button className="mr-4 flex justify-center items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                View List
              </button>
            </div>
          </div>

          {/* <div className="flex flex-1 rounded-md shadow-sm">
            <Search search={search} term={term} />
            <div className="relative inline-block text-left">
              <div>
                <span className="rounded-md shadow-sm">
                  <button
                    onClick={() => setOpen(true)}
                    className="-ml-px relative flex items-center px-3 py-2 rounded-r-md border border-gray-300 text-sm leading-5 bg-white text-gray-900 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 focus:z-10 transition ease-in-out duration-150"
                  >
                    <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path
                        fillRule="evenodd"
                        d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="hidden sm:block ml-2">Filter</span>
                  </button>
                </span>
              </div>
              <div ref={ref}>
                <FilterDropdown isOpen={isOpen} columns={columns} setColumns={setColumns} />
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default TableFilter;
