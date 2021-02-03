import React from "react";
import WalletStandalone from "../services/exchange/components/WalletModal/Standalone";
import BentoBoxSoon from "../assets/illustrations/bentobox_soon.jpg";
const Connect = () => {
  return (
    <>
      <div className="min-h-screen bg-white rounded-md flex">
        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div>
              {/* <div className="flex text-base">Go back</div> */}
              <h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">Connect your wallet</h2>
              {/* <p className="mt-2 text-base leading-5 text-gray-600 max-w">
                Connect with one of available wallet providers or create a new wallet.{" "}
                <a
                  href="#"
                  className="font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:underline transition ease-in-out duration-150"
                >
                  What is wallet?
                </a>
              </p> */}
            </div>
            <div className="mt-8">
              <WalletStandalone />
            </div>
          </div>
        </div>
        <div className="hidden lg:block relative w-0 flex-1">
          <img className="absolute inset-0 h-full w-full object-cover" src={BentoBoxSoon} alt="BentoBox Coming Soon" />
        </div>
      </div>
    </>
  );
};

export default Connect;
