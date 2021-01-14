import React from "react";
import { Link } from "react-router-dom";

export const Linker = ({ to, title, children, external, color }) => {
  return (
    <>
      {external ? (
        <a
          href={to}
          target="_blank"
          className="text-right font-medium text-blue-brand hover:text-blue-brand-dark transition duration-150 ease-in-out"
        >
          {title ? title : children}
        </a>
      ) : (
        <Link
          to={to}
          className="text-right font-medium text-blue-brand hover:text-blue-brand-dark transition duration-150 ease-in-out"
        >
          {title ? title : children}
        </Link>
      )}
    </>
  );
};

export const Button = ({ title, disabled, onClick, color }) => {
  return (
    <>
      <button
        disabled={disabled}
        onClick={onClick}
        className="text-right font-medium text-blue-brand hover:text-blue-brand-dark transition duration-150 ease-in-out"
      >
        {title}
      </button>
    </>
  );
};
