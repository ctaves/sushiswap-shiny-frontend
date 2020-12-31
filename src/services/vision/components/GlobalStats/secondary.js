import React, { useState } from "react";
import styled from "styled-components";
import { RowFixed, RowBetween } from "../Row";
import { useMedia } from "react-use";
import { useGlobalData, useEthPrice } from "../../contexts/GlobalData";
import { formattedNum, formattedPercent, localNumber } from "../../utils";

import { useTokenData } from "../../../vision/contexts/TokenData";
import SushiLogo from "../../../../assets/img/logo.png";
//import UniPrice from "../UniPrice";
import { TYPE } from "../../Theme";

const Header = styled.div`
  width: 100%;
  position: sticky;
  top: 0;
`;

const Medium = styled.span`
  font-weight: 500;
`;

const Strong = styled.span`
  font-weight: 600;
`;

export default function GlobalStats() {
  const below1295 = useMedia("(max-width: 1295px)");
  const below1180 = useMedia("(max-width: 1180px)");
  const below1024 = useMedia("(max-width: 1024px)");
  const below400 = useMedia("(max-width: 400px)");
  const below816 = useMedia("(max-width: 816px)");

  //const [showPriceCard, setShowPriceCard] = useState(false);

  // SUSHI price
  const { priceUSD, priceChangeUSD } = useTokenData("0x6b3595068778dd592e39a122f4f5a5cf09c90fe2");
  const price = priceUSD ? formattedNum(priceUSD, true) : "-";
  const priceChange = priceChangeUSD ? formattedPercent(priceChangeUSD) : "";

  const { oneDayVolumeUSD, oneDayTxns, pairCount } = useGlobalData();
  const [ethPrice, ethPriceOld] = useEthPrice();
  const formattedEthPrice = ethPrice ? formattedNum(ethPrice, true) : "-";
  const ethPriceChange =
    ethPriceOld && ethPrice / ethPriceOld != 1 ? formattedPercent((ethPrice / ethPriceOld - 1) * 100) : "";
  const oneDayFees = oneDayVolumeUSD ? formattedNum(oneDayVolumeUSD * 0.003, true) : "-";

  return (
    <Header>
      <RowBetween style={{ padding: below816 ? "0.5rem" : ".5rem" }}>
        <RowFixed>
          {!below400 ? "" : <img className="h-6 w-6 mr-2" src={SushiLogo} />}
          <TYPE.main mr={"1rem"} style={{ position: "relative" }}>
            <Strong>SUSHI:</Strong>{" "}
            <Medium>
              {price} {!below816 ? priceChange : ""}
            </Medium>
          </TYPE.main>
          <TYPE.main mr={"1rem"} style={{ position: "relative" }}>
            <Strong>ETH:</Strong>{" "}
            <Medium>
              {formattedEthPrice} {!below816 ? ethPriceChange : ""}
            </Medium>
          </TYPE.main>
          {!below400 && (
            <TYPE.main mr={"1rem"}>
              <Strong>{!below1024 ? "Transactions (24hr):" : "TXs (24hr):"}</Strong>{" "}
              <Medium>{oneDayTxns > 0 ? localNumber(oneDayTxns) : "-"}</Medium>
            </TYPE.main>
          )}
          {/* {!below400 && (
            <TYPE.main
              mr={"1rem"}
                onMouseEnter={() => {
                  setShowPriceCard(true);
                }}
                onMouseLeave={() => {
                  setShowPriceCard(false);
                }}
              style={{ position: "relative" }}
            >
              ETH Price: <Medium>{formattedEthPrice}</Medium>
              {showPriceCard && <UniPrice />}
            </TYPE.main>
          )} */}

          {/* {!below1180 && (
            <TYPE.main mr={"1rem"}>
              Transactions (24H): <Medium>{localNumber(oneDayTxns)}</Medium>
            </TYPE.main>
          )} */}
          {!below1024 && (
            <TYPE.main mr={"1rem"}>
              <Strong>Pairs:</Strong> <Medium>{pairCount > 0 ? localNumber(pairCount) : "-"}</Medium>
            </TYPE.main>
          )}
          {!below1295 && (
            <TYPE.main mr={"1rem"}>
              <Strong>Fees (24hr):</Strong> <Medium>{oneDayFees}</Medium>&nbsp;
            </TYPE.main>
          )}
        </RowFixed>
      </RowBetween>
    </Header>
  );
}
