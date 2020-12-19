import React from "react";

export const ExternalArrow = () => {
  return (
    <>
      <svg width={20} height={20} fill="none">
        <path
          d="M5.932 14.068c.3.3.786.3 1.086 0l5.738-5.738.004 3.129a.766.766 0 001.533-.002v-5.75h-5.75A.766.766 0 008.54 7.24l3.129.004-5.738 5.738c-.3.3-.3.786 0 1.086z"
          fill="currentColor"
        />
      </svg>
    </>
  );
};

export const InternalArrow = () => {
  return (
    <>
      <span>
        <svg className="w-5 h-5 ml-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </span>
    </>
  );
};
