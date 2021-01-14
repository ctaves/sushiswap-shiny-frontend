import React from "react";
import SushiChef from "../../../assets/img/sushi-chef_bg-fill-light-gray.jpg";

const UnlockWallet = () => {
  return (
    <div
      className="relative sushi-h-full sushi-inline-block sushi-min-w-full sushi-align-middle sushi-border-b sushi-border-gray-200 sushi-shadow sm:sushi-rounded-lg"
      style={{ backgroundColor: "#f5f5f5", overflowX: "hidden" }}
    >
      <div
        className="sushi-bg-cover sushi-bg-center"
        style={{
          height: "32rem",
          backgroundImage: `url(${SushiChef})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="sushi-flex sushi-items-center sushi-justify-center sushi-h-full sushi-w-full">
          <div className="sushi-text-center">
            <div className="sushi-rounded-md sushi-shadow">
              <button className="sushi-w-full sushi-flex sushi-items-center sushi-justify-center sushi-px-5 sushi-py-3 sushi-border sushi-border-transparent sushi-text-base sushi-leading-6 sushi-font-medium sushi-rounded-md sushi-text-white bg-gray-900 hover:bg-gray-800 focus:sushi-outline-none focus:sushi-shadow-outline sushi-transition sushi-duration-150 sushi-ease-in-out">
                Connect wallet to begin
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="sushi-shine" />
    </div>
  );
};

export default UnlockWallet;
