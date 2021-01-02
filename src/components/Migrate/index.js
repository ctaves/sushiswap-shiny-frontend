import React, { useContext, useCallback } from "react";
import useMigrateState, { MigrateMode, MigrateState } from "../../services/lite/hooks/useMigrateState";
import { EthersContext } from "../../services/lite/context/EthersContext";
import { formatBalance } from "../../services/lite/utils";
import DoubleToken from "../DoubleToken";
import { Loading } from "../Loading";

const Migrate = () => {
  const { ethereum } = useContext(EthersContext);
  const state = useMigrateState();
  console.log("Migrate:", state);
  return (
    <>
      {!ethereum?.isWalletConnect && (
        <>
          <MigrateModeSelect state={state} />
        </>
      )}
      <UniswapLiquidityScreen state={state} />
      {/* <AmountInput state={state} />
      <AmountInfo state={state} /> */}
    </>
  );
};

const UniswapLiquidityScreen = ({ state }) => {
  // const t = useTranslation();
  // if (!state.mode) {
  //   return <Heading text={t("your-uniswap-liquidity")} disabled={true} />;
  // }
  return (
    <LPTokenSelect
      state={state}
      title={"Your Uniswap Liquidity"}
      emptyText={"You don't have any unstaked liquidity on Uniswap"}
    />
  );
};

const LPTokenSelect = (props) => {
  const onUnselectToken = () => props.state.setSelectedLPToken();
  return <LPTokenList state={props.state} emptyText={props.emptyText} />;
};

const LPTokenList = ({ state, emptyText, Item }) => {
  // const renderItem = useCallback(
  //   ({ item }) => {
  //     return <Item key={item?.symbol} token={item} selected={false} onSelectToken={state.setSelectedLPToken} />;
  //   },
  //   [state.setSelectedLPToken]
  // );
  const data = state.lpTokens.sort((p1, p2) => {
    const m1 = p1.multiplier || 0;
    const m2 = p2.multiplier || 0;
    return m1 === m2 ? (p2.apy || 0) - (p1.apy || 0) : m2 - m1;
  });
  return state.loading ? (
    <Loading />
  ) : data.length === 0 ? (
    <EmptyList text={emptyText} />
  ) : (
    <>
      <fieldset>
        <ul className="mt-4 space-y-4" role="radiogroup" aria-labelledby="radiogroup-label">
          {data.map((token) => {
            //console.log("token:", state?.selectedLPToken.address, token?.address);
            return (
              <LPTokenItem
                key={token?.symbol}
                token={token}
                selected={state?.selectedLPToken?.address == token?.address}
                onSelectToken={state.setSelectedLPToken}
              />
            );
          })}
        </ul>
      </fieldset>
    </>
  );
};

const LPTokenItem = ({ token, selected, onSelectToken }) => {
  console.log("TOKEN:", token, token.balance.toNumber(), selected);
  const balance = formatBalance(token.balance, token.decimals, 6);
  const onClick = useCallback(() => {
    onSelectToken(token);
  }, [onSelectToken, token]);
  return (
    <>
      <li
        selected={selected}
        onClick={onClick}
        role="radio"
        className="group relative rounded-lg shadow-sm cursor-pointer focus:outline-none focus:shadow-outline-blue"
      >
        <div className="rounded-lg border border-gray-300 bg-white px-4 py-4 hover:border-gray-400 group-focus:border-blue-300 sm:flex sm:justify-between sm:space-x-4">
          <div className="flex flex-shrink-0 -space-x-1">
            <DoubleToken tokenA={token.tokenA.address} tokenB={token.tokenB.address} />
          </div>
          <div className="flex-1 min-w-0">
            <a href="#" className="focus:outline-none">
              <span className="absolute inset-0" aria-hidden="true" />
              <div className="flex">
                <p className="text-base font-medium text-gray-900">
                  {token.tokenA.symbol}-{token.tokenB.symbol}
                </p>
                <p className="text-base text-gray-800 truncate ml-auto">{balance}</p>
              </div>
            </a>
          </div>
        </div>
        {/* selected: "border-indigo-500", not-selected: "border-transparent" */}
        <div
          className={
            (selected ? "border-indigo-500" : "border-transparent") +
            " absolute inset-0 rounded-lg border-2 pointer-events-none"
          }
        />
      </li>
    </>
  );
};

// const LPTokenItem = ({ token, selected, onSelectToken }) => {
//   console.log("TOKEN:", token, token.balance.toNumber());
//   const balance = formatBalance(token.balance, token.decimals, 6);
//   const onClick = useCallback(() => {
//     onSelectToken(token);
//   }, [onSelectToken, token]);
//   return (
//     <div
//       selected={selected}
//       onClick={onClick}
//       className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
//     >
//       <div className="flex flex-shrink-0 -space-x-1">
//         <DoubleToken tokenA={token.tokenA.address} tokenB={token.tokenB.address} />
//       </div>
//       <div className="flex-1 min-w-0">
//         <a href="#" className="focus:outline-none">
//           <span className="absolute inset-0" aria-hidden="true" />
//           <div className="flex">
//             <p className="text-base font-medium text-gray-900">
//               {token.tokenA.symbol}-{token.tokenB.symbol}
//             </p>
//             <p className="text-base text-gray-800 truncate ml-auto">{balance}</p>
//           </div>
//         </a>
//       </div>
//     </div>
//   );
// };

const EmptyList = ({ text }) => {
  return <div className="text-center mx-auto justify-center">{text}</div>;
};

const MigrateModeSelect = ({ state }) => {
  const options = [
    {
      key: "permit",
      title: "Non-hardware Wallet",
      description: "Migration is done in one-click using your signature (permit)",
    },
    {
      key: "approve",
      title: "Hardware Wallet (Trezor, Ledger, etc.)",
      description: "You need to first approve LP tokens and then migrate it.",
    },
  ];
  return (
    <Select
      options={options}
      option={options.find((option) => option.key === state.mode)}
      setOption={(option) => state.setMode(option === null || option === void 0 ? void 0 : option.key)}
    />
  );
};

const Select = (props) => {
  return (
    <fieldset>
      <ul className="mt-4 space-y-4" role="radiogroup" aria-labelledby="radiogroup-label">
        {props.options.map((option) => {
          return (
            <Item
              key={option.key}
              option={option}
              setOption={props.setOption}
              selected={option.key === props.option?.key}
            />
          );
        })}
      </ul>
    </fieldset>
  );
};

const Item = (props) => {
  console.log("PROPS:", props);
  return (
    <>
      <li
        selected={props.selected}
        disabled={props.selectable}
        onClick={() => props.setOption?.(props.selected ? undefined : props.option)}
        role="radio"
        className="group relative rounded-lg shadow-sm cursor-pointer focus:outline-none focus:shadow-outline-blue"
      >
        <div className="rounded-lg border border-gray-300 bg-white px-6 py-4 hover:border-gray-400 group-focus:border-blue-300 sm:flex sm:justify-between sm:space-x-4">
          <div className="flex items-center space-x-0">
            <div className="flex-shrink-0 flex items-center hidden">
              <span aria-hidden className="form-radio text-indigo-600 group-focus:bg-red-500" />
            </div>
            <div className="text-sm leading-5">
              <p className="block font-medium text-gray-900"> {props.option.title}</p>
              <div className="text-gray-500">
                <span className="block sm:inline"> {props.option.description}</span>
              </div>
            </div>
          </div>
        </div>
        {/* selected: "border-indigo-500", not-selected: "border-transparent" */}
        <div
          className={
            (props.selected ? "border-indigo-500" : "border-transparent") +
            " absolute inset-0 rounded-lg border-2 pointer-events-none"
          }
        />
      </li>
    </>
  );
};

export default Migrate;
