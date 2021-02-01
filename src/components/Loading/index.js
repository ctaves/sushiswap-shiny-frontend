import React from "react";
//import Loader from "../../services/exchange/components/Loader";
import "./styles.css";

export const Loader = ({ height, width }) => {
  return (
    <>
      <span className="animate-pulse flex align-middle">
        <div className={`inline-block h-${height ? height : "3"} w-${width ? width : "12"} bg-gray-200 rounded`} />
      </span>
    </>
  );
};

export const Spinner = ({ height, position }) => {
  return (
    <>
      <div
        className={
          `flex justify-${position === "center" || !position ? "center" : "end"} 
           items-center align-middle w-${position === "center" || !position ? "full" : "auto"} ` +
          (height ? `h-${height}` : "")
        }
      >
        <div className="loader">
          <div className="prong"></div>
          <div className="prong"></div>
          <div className="prong"></div>
          <div className="prong"></div>
          <div className="prong"></div>
          <div className="prong"></div>
          <div className="prong"></div>
          <div className="prong"></div>
          <div className="prong"></div>
          <div className="prong"></div>
          <div className="prong"></div>
          <div className="prong"></div>
        </div>
      </div>
    </>
  );
};

export const Loading = () => {
  return (
    <>
      <div className="mt-4 mx-auto justify-center">
        <svg
          className="animate-spin -ml-1 mr-3 h-10 w-10 text-gray-600"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle className="opacity-25" cx={12} cy={12} r={10} stroke="currentColor" strokeWidth={4} />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    </>
  );
};

export const Chevron = ({ loading }) => {
  return (
    <>
      <span className="ml-2">
        {loading && loading === true ? (
          <Spinner />
        ) : (
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        )}
      </span>
    </>
  );
};
