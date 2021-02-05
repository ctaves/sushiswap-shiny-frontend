import React from "react";
import { ethers, BigNumber } from "ethers";
import useWalletBalances from "../hooks/useWalletAssets";

const WalletBalances = ({ account }) => {
  const { balances, ethRate } = useWalletBalances(account);
  let totalUsdValue = BigNumber.from(0);

  console.log("balances:", balances);
  return (
    <div>
      {balances.map((b, key) => {
        const tokenBalance = ethers.utils.formatUnits(b.balance, b.tokenInfo.decimals);
        // const ethValue = ethers.utils.formatUnits(b.rate, b.tokenInfo.decimals);
        const usdValue = b.rate.isZero()
          ? ethers.utils.formatUnits(b.balance, 6)
          : ethers.utils.formatUnits(b.balance.mul(ethRate).div(b.rate), 6);
        totalUsdValue = b.rate.isZero()
          ? totalUsdValue.add(b.balance)
          : totalUsdValue.add(b.balance.mul(ethRate).div(b.rate));

        return (
          <div key={key}>
            {tokenBalance} {b.tokenInfo.symbol} ({usdValue} USD)
          </div>
        );
      })}
      <div>Total value: {ethers.utils.formatUnits(totalUsdValue, 6)}</div>
    </div>
  );
};

export default WalletBalances;
