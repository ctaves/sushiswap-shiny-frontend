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
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </>
  );
};
