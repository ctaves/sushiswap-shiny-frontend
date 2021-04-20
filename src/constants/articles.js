import React from "react";
import { Linker } from "../components/Linker";
import StablecoinList from "../assets/articles/stablecoin-list.jpg";
import OnsenIllustration from "../assets/articles/onsen.jpg";
//import CoverWarningLogo from "../assets/articles/cover-warning.jpg";
import MidnightTrading from "../assets/articles/midnight-trading.jpg";
import Doge from "../assets/articles/doge-sushi.jpg";
import Tornado from "../assets/articles/tornado-onsen.jpg";
import Landing from "../assets/articles/landing.jpg";
import OnsenAMA from "../assets/articles/ama-bg.gif";

export const articles = [
  // {
  //   title: "Ethereum hits $1000",
  //   description:
  //     "High volatility means higher volume which means more fees for our liquidity providers. Check out pairs to provide liquidity to today!",
  //   image: StablecoinList,
  //   token: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2", // WETH
  // },
  // {
  //   key: "wallet-issues",
  //   title: "NOTICE: Wallet Issues",
  //   description: (
  //     <p>
  //       We are currently investigating wallet issues with Trust Wallet and Coinbase Mobile Wallet. Metamask Desktop
  //       Wallet is operating normally. Please use{" "}
  //       <Linker to="https://exchange.sushiswap.fi" external>
  //         exchange.sushiswap.fi
  //       </Linker>{" "}
  //       in the meantime. We expect this issue to be resolved in a day.
  //     </p>
  //   ),
  //   image: OnsenIllustration,
  // },
  {
    key: "new-interface",
    title: "New Interface: App.sushi.com",
    description: (
      <p>
        As part of our efforts to consolidate and enhance our community interfaces, this interface is now considered
        classic and will not recieve regular updates. Please visting our fully featured Exchange Interface
        (app.sushi.com) for access to our multinetwork features, bentobox dapps, kashi lending, and masterchef v2.
      </p>
    ),
    image: OnsenIllustration,
  },
  ,
  {
    key: "stakehound-onsen-ama",
    title: "Onsen AMA: StakeHound",
    description: (
      <p>
        Tune into the next Onsen AMA series with StakeHound on FRIDAY 03/05, 11am EST (4pm UTC) at the SushiSwap{" "}
        <Linker to="https://t.co/w3svF4Jaoi" external>
          discord voice channel
        </Linker>
        .{" "}
      </p>
    ),
    image: "https://raw.githubusercontent.com/sushiswap/sushi-content/master/images/ama-bg.gif",
    //image: OnsenAMA,
    token: "0xdfe66b14d37c77f4e9b180ceb433d1b164f0281d", //stakedETH
  },
  {
    key: "88mph-onsen-ama",
    title: "Onsen AMA: 88mph",
    description: (
      <p>
        Tune into the next Onsen AMA series with 88mph on Thursday 02/11, 6pm CET (5pm UTC) at the SushiSwap{" "}
        <Linker to="https://discord.gg/g7W7FJHASS" external>
          discord voice channel
        </Linker>
        .{" "}
      </p>
    ),
    image: "https://raw.githubusercontent.com/sushiswap/sushi-content/master/images/ama-bg.gif",
    //image: OnsenAMA,
    token: "0x8888801af4d980682e47f1a9036e589479e835c5", //88MPH
  },
  {
    key: "TORN-ETH",
    title: "Tornado Cash whirls into Onsen",
    description: (
      <p>
        Whoosh. DeFi is dizzy and its about to get more dizzy. Check out the <Linker to="/onsen">Onsen</Linker> list to
        provide liquidity to TORN-ETH and stake.
      </p>
    ),
    image: "https://raw.githubusercontent.com/sushiswap/sushi-content/master/images/tornado-onsen.jpg",
    //image: Tornado,
    token: "0x77777feddddffc19ff86db637967013e6c6a116c", // tornado
  },
  {
    key: "moving-app",
    title: "NOTICE: This page will soon move to app.sushiswap.fi",
    description: (
      <p>
        Please note, this interface will soon move to{" "}
        <Linker to="https://app.sushiswap.fi" external>
          app.sushiswap.fi
        </Linker>
        . www.sushiswap.fi will host our new landing page. Update your bookmarks accordingly!
      </p>
    ),
    //image: Landing,
    image: "https://raw.githubusercontent.com/sushiswap/sushi-content/master/images/landing.jpg",
  },
  {
    key: "renDoge-ETH",
    title: "Onsen Special Guest: renDOGE",
    description: (
      <p>
        Much excite. Such rewards. Wow. Check out the <Linker to="/onsen">Onsen</Linker> list to provide liquidity to
        renDOGE-ETH and stake.
      </p>
    ),
    //image: Doge,
    image: "https://raw.githubusercontent.com/sushiswap/sushi-content/master/images/doge-sushi.jpg",
    token: "0x3832d2f059e55934220881f831be501d180671a7", // renDOGE
  },
  {
    key: "midnight-trading",
    title: "Experimental: Midnight Trading Interface",
    description: (
      <p>
        Check out the new experimental interface built using Sushi Plugin.{" "}
        <Linker to="/experimental/midnight">Midnight</Linker> is an interface tailored to traders full with live pricing
        and helpful stats.
      </p>
    ),
    //image: MidnightTrading,
    image: "https://raw.githubusercontent.com/sushiswap/sushi-content/master/images/midnight-trading.jpg",
    token: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2", // SUSHI
  },
  {
    key: "stablecoin",
    title: "Introducing the Stablecoin List",
    description:
      "Stablecoins are back with a new twist - algorithmic stablecoins. Browse stablecoins in our new list. Add liquidity to MIS-USDT only on SushiSwap.",
    image: StablecoinList,
    token: "0x368b3a58b5f49392e5c9e4c998cb0bb966752e51", // MIC
  },
  // {
  //   title: "Introducing the New BTC List",
  //   description:
  //     "Bitcoin's all the rage, but what about wrapped Bitcoin alternatives? Check out the new kids on the block on our new list. Thanks to deep WBTC liquidity, WBTC routing has been added for swaps giving you the lowest slippage on BTC based pairs anywhere!",
  //   image: StablecoinList,
  //   token: "0x2260fac5e5542a773aa44fbcfedf7c193bc2c599", // WBTC
  // },
  // {
  //   key: "cover-exploit",
  //   title: "Warning: COVER Verified Exploit",
  //   description:
  //     "COVER has experienced a verified exploit and a warning message has been placed on COVER and related pairs. Proceed with caution. Read more about the exploit here.",
  //   image: CoverWarningLogo,
  //   token: "0x5d8d9f5b96f4438195be9b99eee6118ed4304286", // COVER
  // },
  {
    key: "onsen",
    title: "Onsen Liquidity Incentives Program",
    image: OnsenIllustration,
    description: (
      <p>
        New farms, new SUSHI rewards. Check out the <Linker to="/onsen">Onsen</Linker> list to provide liquidity to
        selected projects. Earn accelerated SUSHI rewards on top of trading fees.
      </p>
    ),
    list: "",
  },
];
