import React from "react";
import { DashboardContainer } from "../components/Dashboard";

import Search from "../components/Search";
import Lists from "../components/Lists";

import TokenList from "../components/TokenList";
import { Spinner } from "../components/Loading";

import { useAllTokenData } from "../shared/contexts/TokenData";

const Tokens = () => {
  const allTokens = useAllTokenData();
  console.log("allTokens:", allTokens);
  return (
    <>
      <DashboardContainer>
        <div className="px-4 py-4 hidden lg:block">
          <Search />
        </div>
        <Lists />
        <div className="mt-4 inline-block min-w-full overflow-hidden align-middle">
          <div className="relative overflow-auto whitespace-nowrap">
            {allTokens && allTokens.length > 0 ? <TokenList tokens={allTokens} itemMax={50} /> : <Spinner />}
          </div>
        </div>
      </DashboardContainer>
    </>
  );
};

export default Tokens;
