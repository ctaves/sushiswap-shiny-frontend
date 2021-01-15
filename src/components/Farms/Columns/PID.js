import React from "react";
//import { formatNumber } from "./utils";

const ColumnPid = ({ farm }) => {
  return (
    <>
      <td className="sushi-px-4 sushi-py-4 sushi-text-sm sushi-whitespace-no-wrap sushi-border-b sushi-border-gray-200">
        <div className="sushi-flex sushi-items-center">
          <span>{farm.id}</span>
        </div>
      </td>
    </>
  );
};

export default ColumnPid;
