import RocketIcon from "../assets/icons/rocket.png";
import OnsenIllustration from "../assets/illustrations/onsen.jpg";

export const featured = [
  {
    id: "onsen",
    title: "Onsen",
    path: "/onsen",
    image: OnsenIllustration,
    pairs: [],
    tokens: [],
  },
  {
    id: "daily-movers",
    title: "Daily Movers",
    path: "/lists/daily-movers",
    image: RocketIcon,
  },
  {
    id: "stablecoins",
    title: "Stablecoins",
    description:
      "Stablecoins are back with a new twist - algorithmic stablecoins. Browse stablecoins in our new list. Add liquidity to MIS-USDT only on SushiSwap.",
    path: "/lists/stablecoins",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
    pairs: [],
    tokens: [
      "0x368b3a58b5f49392e5c9e4c998cb0bb966752e51", //MIC
      "0x4b4d2e899658fb59b1d518b68fe836b100ee8958", //MIS
      "0xdac17f958d2ee523a2206206994597c13d831ec7", //USDT
      "0x6b175474e89094c44da98b954eedeac495271d0f", //DAI
      "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48", //USDC
      "0xbd2f0cd039e0bfcf88901c98c0bfac5ab27566e3", //DSD
      "0x36f3fd68e7325a35eb768f1aedaae9ea0689d723", //ESD
      "0x57ab1ec28d129707052df4df418d58a2d46d5f51", //sUSD
    ],
  },
  {
    id: "yearn-fam",
    title: "Yearn Fam",
    path: "/lists/yearn-fam",
    image:
      "https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e/logo.png",
    pairs: [],
    tokens: [
      "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e", //YFI
      "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2", //SUSHI
      "0x429881672b9ae42b8eba0e26cd9c73711b891ca5", //PICKLE
      "0x2ba592f78db6436527729929aaf6c908497cb200", //CREAM
    ],
  },
];
