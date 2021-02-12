import React from 'react';

import CardTokenActions from "../Plugin/Layout";
import { Spinner } from "../Loading";

export const CardTokenActionsModal = ({
  initialTab,
  symbol,
  currencyIdA,
  currencyIdB,
  isLoading,
  onDismiss
}) => {
  return (
    <>
      <span className="hidden md:inline-block md:align-middle md:h-screen" />
      <div
        className="p-4 w-full md:align-middle md:max-w-lg bg-white inline-block align-bottom bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <div className="block absolute top-0 right-0 pt-4 pr-4">
          <button
            onClick={() => {
              onDismiss();
            }}
            type="button"
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition ease-in-out duration-150"
            aria-label="Close"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="items-start">
          <div className="text-center sm:text-left">
            <h3 className="pb-2 text-lg leading-6 font-medium text-gray-900" id="modal-headline">
              Token Actions
            </h3>
            {isLoading ? (
              <CardTokenActions
                initialSection={initialTab ? initialTab : "swap"}
                title={"What would you like to do?"}
                symbol={symbol}
                currencyIdA={currencyIdA}
                currencyIdB={currencyIdB}
              />
            ) : (
              <div className="rounded-lg border-2 border-gray-900 h-80">
                <Spinner height={"full"} />
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
