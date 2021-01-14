import React from "react";
import { Button } from "../../Linker";

const Actions = ({ farms }) => {
  return (
    <>
      <td className="table-cell px-6 py-3 whitespace-no-wrap text-sm leading-5 text-gray-500 text-right">
        <div>
          <Button title={"Harvest"} />
        </div>
        <div>
          <Button title={"Stake"} />
        </div>
        <div>
          <Button title={"Unstake"} />
        </div>
      </td>
    </>
  );
};

export default Actions;
