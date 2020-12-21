import React, { useEffect, useState } from "react";

// Wallet integration
import { useActiveWeb3React } from "../../../services/exchange/hooks";
import { useEthPrice } from "../../../services/vision/contexts/GlobalData";
import { client } from "../../../services/vision/apollo/client";
import { USER_POSITIONS, USER_HISTORY } from "../../../services/vision/apollo/queries";
import { getLPReturnsOnPair } from "../../../services/vision/utils/returns";
import { FEE_WARNING_TOKENS } from "../../../services/vision/constants";
import { isAddress } from "../../../services/vision/utils/index.js";
import { formattedNum } from "../../../services/vision/utils";
import logoNotFound from "../../../assets/img/logoNotFound.png";

const LiquidityBalances = () => {
  const { account } = useActiveWeb3React();

  // GET USER SNAPSHOTS
  const [snapshots, setSnapshots] = useState();
  useEffect(() => {
    async function fetchData() {
      try {
        let skip = 0;
        let allResults = [];
        let found = false;
        while (!found) {
          let result = await client.query({
            query: USER_HISTORY,
            variables: {
              skip: skip,
              user: account.toLowerCase(),
            },
            fetchPolicy: "cache-first",
          });

          console.log("LP SNAPSHOT:", result.data.liquidityPositionSnapshots);

          allResults = allResults.concat(result.data.liquidityPositionSnapshots);
          if (result.data.liquidityPositionSnapshots.length < 1000) {
            found = true;
          } else {
            skip += 1000;
          }
        }
        if (allResults) {
          setSnapshots(allResults);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, [account]);

  // Get Unstaked Liquidity Positions
  const [ethPrice] = useEthPrice();
  const [positions, setPositions] = useState();
  useEffect(() => {
    async function fetchData(account) {
      try {
        let result = await client.query({
          query: USER_POSITIONS,
          variables: {
            user: account.toLowerCase(),
          },
          fetchPolicy: "no-cache",
        });
        if (result?.data?.liquidityPositions) {
          let formattedPositions = await Promise.all(
            result?.data?.liquidityPositions.map(async (positionData) => {
              const returnData = await getLPReturnsOnPair(account, positionData.pair, ethPrice, snapshots);
              return {
                ...positionData,
                ...returnData,
              };
            })
          );
          setPositions(formattedPositions);
        }
      } catch (e) {
        console.log(e);
      }
    }
    fetchData(account);
  }, [account, snapshots]);

  console.log("POSITIONS:", positions);
  console.log("SNAPSHOTS:", snapshots);

  // if any position has token from fee warning list, show warning
  const [showWarning, setShowWarning] = useState(false);
  useEffect(() => {
    if (positions) {
      for (let i = 0; i < positions.length; i++) {
        if (
          FEE_WARNING_TOKENS.includes(positions[i].pair.token0.id) ||
          FEE_WARNING_TOKENS.includes(positions[i].pair.token1.id)
        ) {
          setShowWarning(true);
        }
      }
    }
  }, [positions]);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1">
        {positions &&
          positions.map((position) => {
            const poolOwnership = position.liquidityTokenBalance / position.pair.totalSupply;
            const valueUSD = poolOwnership * position.pair.reserveUSD;
            return (
              <>
                <div className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                  <div className="flex flex-shrink-0 -space-x-1">
                    <img
                      className="relative z-30 inline-block h-6 w-6 rounded-full text-white shadow-solid"
                      src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${isAddress(
                        position.pair.token0.id
                      )}/logo.png`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = logoNotFound;
                      }}
                    />
                    <img
                      className="relative z-20 -ml-1 inline-block h-6 w-6 rounded-full text-white shadow-solid"
                      src={`https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${isAddress(
                        position.pair.token1.id
                      )}/logo.png`}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = logoNotFound;
                      }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <a href="#" className="focus:outline-none">
                      <span className="absolute inset-0" aria-hidden="true" />
                      <p className="text-sm font-medium text-gray-900">
                        {position.pair.token0.symbol + "-" + position.pair.token1.symbol}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{formattedNum(valueUSD, true, true)}</p>
                    </a>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </>
  );
};

export default LiquidityBalances;
