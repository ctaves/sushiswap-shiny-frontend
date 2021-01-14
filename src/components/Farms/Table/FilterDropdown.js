import React from "react";
import { useActiveWeb3React } from "../../../services/exchange/hooks";
import Transition from "../../Transition";

const FilterDropdown = ({ isOpen, columns, setColumns }) => {
  const { account } = useActiveWeb3React();

  const handleCheckboxChange = (name) => (e) => {
    let newColumns = [...columns];
    newColumns = newColumns.map((column) =>
      column.name === name ? { ...column, selected: e.target.checked } : column
    );
    setColumns(newColumns);
  };
  return (
    <>
      <Transition
        show={isOpen}
        enter="ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <div className="z-10 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg">
          <div
            className="rounded-md bg-white shadow-xs"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
          >
            <div className="py-1">
              {columns.map((column) => {
                if (column.account === false && column.name) {
                  return (
                    <div className="block px-4 py-2">
                      <label className="inline-flex items-center">
                        <input
                          defaultChecked={column.selected}
                          onChange={handleCheckboxChange(column.name)}
                          type="checkbox"
                          className="form-checkbox h-4 w-4 border-gray-300 text-orange-600 focus:shadow-outline-orange focus:border-orange-300 transition duration-150 ease-in-out"
                        />
                        <span className="ml-2">{column.name}</span>
                      </label>
                    </div>
                  );
                }
                if (account && column.account && column.name) {
                  return (
                    <div className="block px-4 py-2">
                      <label className="inline-flex items-center">
                        <input
                          defaultChecked={column.selected}
                          onChange={handleCheckboxChange(column.name)}
                          type="checkbox"
                          className="form-checkbox h-4 w-4 border-gray-300 text-orange-600 focus:shadow-outline-orange focus:border-orange-300 transition duration-150 ease-in-out"
                        />
                        <span className="ml-2">{column.name}</span>
                      </label>
                    </div>
                  );
                }
              })}
            </div>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default FilterDropdown;
