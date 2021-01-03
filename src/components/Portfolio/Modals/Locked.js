import React from "react";

const LockedModal = ({ onDismiss }) => {
  return (
    <>
      <span className="hidden md:inline-block md:align-middle md:h-screen" />
      <div
        className="px-6 py-4 w-full md:align-middle md:max-w-lg bg-white inline-block align-bottom bg-white rounded-md text-left overflow-hidden shadow-xl transform transition-all"
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
          <div className="text-left">
            <h3 className="mb-8 text-lg leading-6 text-gray-900" id="modal-headline">
              Reward Lockup FAQ
            </h3>
            <div>
              <div className="mb-4">
                <dt className="text-sm leading-6 font-semibold text-gray-900">
                  What share of my SUSHI rewards is vested?
                </dt>
                <dd className="mt-1 text-sm text-gray-500">66.6%</dd>
              </div>
              <div className="mb-4">
                <dt className="text-sm leading-6 font-semibold text-gray-900">
                  For how long are my SUSHI rewards vested?
                </dt>
                <dd className="mt-1 text-sm text-gray-500">
                  6 months from the moment they are earned. So if you earn 10 SUSHI today you can harvest 1/3
                  immediately, and the remaining 2/3 after 6 months of waiting.
                </dd>
              </div>
              <div className="mb-4">
                <dt className="text-sm leading-6 font-semibold text-gray-900">
                  Must I stay staked in to receive my vested SUSHI rewards?
                </dt>
                <dd className="mt-1 text-sm text-gray-500">
                  You can unstake at any time. Your vested (locked up) yield will still be available to you when their
                  lock-up time is over.
                </dd>
              </div>
              <div className="mb-4">
                <dt className="text-sm leading-6 font-semibold text-gray-900">When can I collect my vested SUSHI?</dt>
                <dd className="mt-1 text-sm text-gray-500">
                  They can be harvested 6 months from the time you/your pool earned the rewards.
                </dd>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LockedModal;
