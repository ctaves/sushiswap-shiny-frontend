import React from "react";
import { useAccountBalance } from "./hooks/useAccountBalance";

const Portfolio = () => {
  const balances = useAccountBalance();

  console.log("balances:", balances);
  return <></>;
};

export default Portfolio;
