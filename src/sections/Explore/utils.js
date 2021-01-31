// import { ethers } from "ethers";
// import Fraction from "../constants/Fraction";
// import { ETH } from "../constants/tokens";
// import { ALCHEMY_PROVIDER } from "../context/EthersContext";
// import { convertToken, formatBalance, isETH, isWETH, pow10 } from "./index";
// const blocksPerDay = 6500;

// export const ALCHEMY_PROVIDER = new ethers.providers.AlchemyProvider(
//   1,
//   __DEV__ ? process.env.MAINNET_API_KEY : "DgnfFsj5PXR37FkOmUVJ9GtfDsKws446"
// );

// export const fetchTokens = async (account, customTokens) => {
//   const response = await fetch("https://lite.sushiswap.fi/tokens.json");
//   const json = await response.json();
//   const tokens = [...json.tokens, ...(customTokens || [])];
//   const balances = await fetchTokenBalances(
//     account,
//     tokens.map((token) => token.address)
//   );
//   return [
//     Object.assign(Object.assign({}, ETH), { balance: await ALCHEMY_PROVIDER.getBalance(account) }),
//     ...tokens.map((token, i) =>
//       Object.assign(Object.assign({}, token), { balance: ethers.BigNumber.from(balances[i] || 0) })
//     ),
//   ];
// };

// export const fetchTokenWithValue = async (token, weth, wethPriceUSD, getPair, provider) => {
//   let fetched;
//   if (isETH(token) || isWETH(token)) {
//     fetched = Object.assign(Object.assign({}, token), {
//       priceUSD: Number(wethPriceUSD.toString()),
//       valueUSD: Number(formatBalance(wethPriceUSD.apply(token.balance))),
//     });
//   } else {
//     try {
//       const pair = await getPair(token, weth, provider);
//       const priceETH = Fraction.convert(pair.priceOf(convertToken(token)));
//       const priceUSD = priceETH.apply(wethPriceUSD.numerator).div(pow10(18 - token.decimals));
//       fetched = Object.assign(Object.assign({}, token), {
//         priceUSD: Number(formatBalance(priceUSD)),
//         valueUSD: Number(formatBalance(priceUSD.mul(token.balance).div(pow10(token.decimals)))),
//       });
//     } catch (e) {
//       fetched = Object.assign(Object.assign({}, token), { priceUSD: null, valueUSD: null });
//     }
//   }
//   return fetched;
// };
