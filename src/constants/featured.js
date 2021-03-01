import RocketIcon from "../assets/featured/rocket.svg";
import OnsenIllustration from "../assets/featured/onsen.jpg";

export const featured = [
  {
    id: "onsen",
    title: "Onsen",
    path: "/onsen",
    image: OnsenIllustration,
    pairs: [],
    tokens: [],
  },
  // {
  //   id: "daily-movers",
  //   title: "Daily Movers",
  //   path: "/lists/daily-movers",
  //   image: RocketIcon,
  // },
  {
    id: "stablecoins",
    title: "Stablecoins",
    description:
      "Stablecoins are back with a new twist - algorithmic stablecoins. Browse stablecoins in our new list. Add liquidity to MIS-USDT only on SushiSwap.",
    path: "/lists/stablecoins",
    image:
      "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48/logo.png",
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
      "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0x0bc529c00C6401aEF6D220BE8C6Ea1667F6Ad93e/logo.png",
    pairs: [],
    tokens: [
      "0x0bc529c00c6401aef6d220be8c6ea1667f6ad93e", //YFI
      "0x6b3595068778dd592e39a122f4f5a5cf09c90fe2", //SUSHI
      "0x429881672b9ae42b8eba0e26cd9c73711b891ca5", //PICKLE
      "0x2ba592f78db6436527729929aaf6c908497cb200", //CREAM
      "0x4688a8b1f292fdab17e9a90c8bc379dc1dbd8713", //COVER GOV
      "0x8ab7404063ec4dbcfd4598215992dc3f8ec853d7", //AKRO
    ],
  },
  {
    id: "nftx-funds",
    title: "NFTX Funds",
    path: "/lists/nftx-funds",
    image:
      "https://raw.githubusercontent.com/sushiswap/assets/master/blockchains/ethereum/assets/0x87d73E916D7057945c9BcD8cdd94e42A6F47f776/logo.png",
    pairs: [],
    tokens: [
      "0x9cea2ed9e47059260c97d697f82b8a14efa61ea5", // PUNK
      "0x69bbe2fa02b4d90a944ff328663667dc32786385", // PUNK-BASIC
      "0x27ffed7e5926fb2795fc85aaab558243f280a8a2", // PUNK-FEMALE
      "0x49706a576bb823cde3180c930f9947d59e2ded4d", // PUNK-ATTR-4
      "0xab9c92a9337a1494c6d545e48187fa37144403c8", // PUNNK-ATTR-5
      "0xf18ade29a225faa555e475ee01f9eb66eb4a3a74", // PUNK-ZOMBIE
      "0x0fe629d1e84e171f8ff0c1ded2cc2221caa48a3f", // MASK
    ],
  },
];
