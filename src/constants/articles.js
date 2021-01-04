import StablecoinList from "../assets/icons/stablecoin-list.jpg";
import OnsenIllustration from "../assets/illustrations/onsen.jpg";
import CoverWarningLogo from "../assets/logos/cover-warning.jpg";
import MidnightTrading from "../assets/img/midnight-trading.jpg";

export const articles = [
  {
    title: "Introducing the Stablecoin List",
    description:
      "Stablecoins are back with a new twist - algorithmic stablecoins. Browse stablecoins in our new list. Add liquidity to MIS-USDT only on SushiSwap.",
    image: StablecoinList,
    token: "0x368b3a58b5f49392e5c9e4c998cb0bb966752e51", // MIC
  },
  {
    title: "Warning: COVER Verified Exploit",
    description:
      "COVER has experienced a verified exploit and a warning message has been placed on COVER and related pairs. Proceed with caution. Read more about the exploit here.",
    image: CoverWarningLogo,
    token: "0x5d8d9f5b96f4438195be9b99eee6118ed4304286", // COVER
  },
  {
    title: "Onsen Liquidity Incentives Program",
    image: OnsenIllustration,
    description:
      "New farms, new SUSHI rewards. Check out the Onsen list or head over to Special Farms to provide liquidity to selected projects. Earn accelerated SUSHI rewards on top of trading fees.",
    list: "",
  },
  {
    title: "Experimental: Midnight Trading Interface",
    description:
      "Check out the new experimental interface built using Sushi Plugin. Midnight is an interface tailored to traders full with live pricing and helpful stats.",
    image: MidnightTrading,
    token: "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2", // SUSHI
  },
];
