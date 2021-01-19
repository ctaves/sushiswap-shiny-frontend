import React from "react";

const Title = ({ title, metric }) => {
  return (
    <>
      <div className="bg-white px-4 py-4 border-b border-gray-200 sm:px-4">
        <div className="flex justify-between items-center flex-wrap sm:flex-no-wrap">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">{title}</h3>
            {/* <Linker to="/farms">View all farms</Linker> */}
          </div>
          <div className="flex-shrink-0">
            <h3 className="text-lg text-right leading-6 font-medium text-gray-900">{metric}</h3>
            {/* <p className="mt-1 text-sm leading-5 text-gray-500">{totalSushiBalance} SUSHI</p> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Title;
