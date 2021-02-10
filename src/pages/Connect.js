import React from "react";
import { DashboardContainer } from "../components/Dashboard";

import WalletStandalone from "../services/exchange/components/WalletModal/Standalone";
import BentoBox from "../assets/illustrations/bentobox_soon.jpg";

const Connect = () => {
  return (
    <>
      <DashboardContainer>
        <div className="min-h-screen bg-white rounded-md flex">
          <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
            <div className="mx-auto w-full max-w-sm lg:w-96">
              <div>
                {/* <div className="flex text-base">Go back</div> */}
                <h2 className="mt-6 text-3xl leading-9 font-extrabold text-gray-900">Connect your wallet</h2>
              </div>
              <div className="mt-8">
                <WalletStandalone />
              </div>
            </div>
          </div>
          <div className="hidden lg:block relative w-0 flex-1">
            <img className="absolute inset-0 h-full w-full object-cover" src={BentoBox} alt="BentoBox Coming Soon" />
          </div>
        </div>
      </DashboardContainer>
    </>
  );
};

export default Connect;
