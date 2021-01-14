import React from "react";
import { AscendingIcon, DescendingIcon } from "./Icons";

const Header = ({ header, index, requestSort, getClassNamesFor }) => {
  return (
    <>
      <th
        onClick={() => requestSort(header.sortId)}
        className={
          "sushi-bg-white sushi-px-5 sushi-py-3 text-sm sushi-font-medium sushi-leading-4 sushi-tracking-wider sushi-text-left sushi-text-gray-900 sushi-uppercase sushi-border-b sushi-border-gray-200 " +
          (index === 0 ? "sushi-freeze-cell-header" : "")
        }
      >
        <button className="sushi-flex sushi-items-center outline-none focus:outline-none focus:ring-0">
          <span className="mr-2">{header.name}</span>
          {
            {
              ascending: <AscendingIcon />,
              descending: <DescendingIcon />,
            }[getClassNamesFor(header.sortId)]
          }
        </button>
      </th>
    </>
  );
};

export default Header;
