import React, { useState, useEffect } from "react";

import { DashboardContainer } from "../sections/Dashboard";
import CardTokenActions from "../components/Plugin/Standalone";

const Pool = ({ currencyIdA, currencyIdB }) => {
  return (
    <>
      <DashboardContainer>
        <div className="sushi-max-w-lg sushi-mx-auto md:sushi-p-10 lg:sushi-mx-0 lg:sushi-p-12">
          <CardTokenActions
            initialSection={"pool"}
            title={"What would you like to do?"}
            currencyIdA={currencyIdA}
            currencyIdB={currencyIdB}
          />
        </div>
      </DashboardContainer>
    </>
  );
};

export default Pool;
