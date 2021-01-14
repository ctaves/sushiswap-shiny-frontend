import React from "react";

const ColumnROI = ({ farm }) => {
  return (
    <>
      <td className="space-y-0.5 sushi-px-4 sushi-py-4 sushi-text-sm sushi-whitespace-no-wrap sushi-border-b sushi-border-gray-200">
        <div className="mb-2 sushi-flex sushi-items-center sushi-text-sm font-medium sushi-text-gray-900">
          <span>{Number(farm.roiPerYear * 100).toFixed(2)}%</span>
          <span className="sushi-pl-1 sushi-text-sm sushi-leading-3">(1y)</span>
        </div>
        <div className="sushi-flex sushi-items-center sushi-text-xs sushi-text-gray-500">
          <span>{Number(farm.roiPerMonth * 100).toFixed(2)}%</span>
          <span className="sushi-pl-1 sushi-text-xs sushi-leading-3 sushi-text-gray-500">(1m)</span>
        </div>
        <div className="sushi-flex sushi-items-center sushi-text-xs sushi-text-gray-500">
          <span>{Number(farm.roiPerDay * 100).toFixed(2)}%</span>
          <span className="sushi-pl-1 sushi-text-xs sushi-leading-3">(1d)</span>
        </div>
      </td>
    </>
  );
};

export default ColumnROI;
