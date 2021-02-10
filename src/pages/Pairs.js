import React from "react";
import { DashboardContainer } from "../components/Dashboard";

import Search from "../components/Search";
import PairList from "../components/PairList";
import { Spinner } from "../components/Loading";

import { useAllPairData } from "../shared/contexts/PairData";

const Pairs = () => {
  const allPairs = useAllPairData();
  return (
    <>
      <DashboardContainer>
        <div className="px-4 py-4 hidden lg:block">
          <Search />
        </div>
        <div className="mt-4 inline-block min-w-full overflow-hidden align-middle">
          <div className="relative overflow-auto whitespace-nowrap">
            {allPairs && allPairs.length > 0 ? <PairList pairs={allPairs} maxItems={50} /> : <Spinner />}
          </div>
        </div>
      </DashboardContainer>
    </>
  );
};

export default Pairs;
