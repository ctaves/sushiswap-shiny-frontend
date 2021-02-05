import React from "react";
import UnlockWallet from "./UnlockWallet";
import { useActiveWeb3React } from "../../../services/exchange/hooks";

const AccountWrapper = ({ children }) => {
  const { account } = useActiveWeb3React();
  return (
    <>
      {!account ? (
        <div className="md:sushi-flex">
          <div className="sushi-relative sushi-w-full sushi-mx-auto">
            <div className="sushi-grid gap-0 sushi-mx-auto sushi-grid-cols-1 md:sushi-grid-cols-3 lg:sushi-grid-cols-3 lg:sushi-max-w-none">
              <div className="sushi-col-span-1 md:sushi-col-span-2">{children}</div>
              <div className="">
                <UnlockWallet />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </>
  );
};

export default AccountWrapper;
