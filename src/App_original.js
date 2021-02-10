import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import ModalsProvider from "./shared/contexts/ModalsContext";

//Services - Shared Dependencies
import { ThemeProvider } from "styled-components";

// Services - Classic Dependencies
import { UseWalletProvider } from "use-wallet";
import FarmsProvider from "./services/frontend/contexts/Farms";
import ServicesModalsProvider from "./services/frontend/contexts/Modals";
import TransactionProvider from "./services/frontend/contexts/Transactions";
import SushiProvider from "./services/frontend/contexts/SushiProvider";
import theme from "./services/frontend/theme";

//Services - Exchange Dependencies
import Web3Status from "./services/exchange/components/Web3Status";
import Popups from "./services/exchange/components/Popups";
import { createWeb3ReactRoot, Web3ReactProvider } from "@sushi-web3-react/core";
import { Provider } from "react-redux";
import { NetworkContextName } from "./services/exchange/constants";
import store from "./services/exchange/state";
import ApplicationUpdater from "./services/exchange/state/application/updater";
import ListsUpdater from "./services/exchange/state/lists/updater";
import MulticallUpdater from "./services/exchange/state/multicall/updater";
import TransactionUpdater from "./services/exchange/state/transactions/updater";
import UserUpdater from "./services/exchange/state/user/updater";
import { FixedGlobalStyle, ThemedGlobalStyle } from "./services/exchange/theme";
import ExchangeThemeProvider from "./services/exchange/theme";
import getLibrary from "./services/exchange/utils/getLibrary";
import Web3ReactManager from "./services/exchange/components/Web3ReactManager";

import AddLiquidity from "./services/exchange/pages/AddLiquidity";
import {
  RedirectDuplicateTokenIds,
  RedirectOldAddLiquidityPathStructure,
  RedirectToAddLiquidity,
} from "./services/exchange/pages/AddLiquidity/redirects-secondary";
//import MigrateV1 from "./services/exchange/pages/MigrateV1";
//import MigrateV1Exchange from "./services/exchange/pages/MigrateV1/MigrateV1Exchange";
//import RemoveV1Exchange from "./services/exchange/pages/MigrateV1/RemoveV1Exchange";
//import Pool from "./services/exchange/pages/Pool";
import PoolFinder from "./services/exchange/pages/PoolFinder";
import RemoveLiquidity from "./services/exchange/pages/RemoveLiquidity";
//import { RedirectOldRemoveLiquidityPathStructure } from "./services/exchange/pages/RemoveLiquidity/redirects";
import { RedirectPathToSwapOnly, RedirectToSwap } from "./services/exchange/pages/Swap/redirects";

// pages
import Midnight from "./experimental/Midnight";
import Trader from "./experimental/Trader";
import Beginner from "./experimental/Beginner";
import Explore from "./experimental/Explore";

import Connect from "./pages/Connect";
import Search from "./pages/Search";
import Lists from "./pages/Lists";
import PortfolioBalances from "./pages/Portfolio/Balances";
import PortfolioTransactions from "./pages/Portfolio/Transactions";
import YeildAll from "./pages/Yield/All";
import YeildMain from "./pages/Yield/Main";
import YeildOnsen from "./pages/Yield/Onsen";
import YeildPrevious from "./pages/Yield/Previous";
import YeildSushiBar from "./pages/Yield/SushiBar";

import Home from "./pages/Home";
import Pairs from "./pages/Pairs";
import Pair from "./pages/Pair";
import Tokens from "./pages/Tokens";
import Token from "./pages/Token";

import GovernanceTimelock from "./pages/Governance/Timelock";
import GovernanceMultisig from "./pages/Governance/Multisig";

import Swap from "./pages/Swap";

const App = () => {
  return (
    <>
      <Router>
        <Web3Status />
        <Popups />
        <Web3ReactManager>
          <Switch>
            {/* Home Routes */}
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            {/* Experimental Routes */}
            <Route exact path="/experimental/beginner" component={Beginner} />
            <Route exact path="/experimental/explore" component={Explore} />
            <Route exact path="/experimental/midnight" component={Midnight} />
            <Route exact path="/experimental/trader" component={Trader} />
            {/* Account Routes */}
            <Route exact path="/connect" component={Connect} />
            <Route exact path="/search" component={Search} />
            {/* Portfolio Routes */}
            <Route exact path="/omakase" component={PortfolioBalances} />
            <Route exact path="/portfolio" component={PortfolioBalances} />
            <Route exact path="/portfolio/balances" component={PortfolioBalances} />
            <Route exact path="/portfolio/transactions" component={PortfolioTransactions} />
            <Route exact path="/lists/:listId" component={Dashboard} />
            {/* Farm Routes */}
            <Route exact path="/pools" render={() => <Redirect to="/farms" />} />
            <Route exact path="/weekly" render={() => <Redirect to="/farms/special" />} />
            <Route exact path="/farms/permanent" render={() => <Redirect to="/farms/main" />} />
            <Route exact path="/farms" component={YeildAll} />
            <Route exact path="/farms/all" component={YeildAll} />
            <Route exact path="/farms/special" component={YeildOnsen} />
            <Route exact path="/onsen" component={YeildOnsen} />
            <Route exact path="/farms/main" component={YeildMain} />
            <Route exact path="/sushibar" component={YeildSushiBar} />
            <Route exact path="/farms/xsushi" component={YeildSushiBar} />
            <Route exact path="/farms/previous" component={YeildPrevious} />
            {/* Tokens and Pairs Routes */}
            <Route exacts strict path="/tokens" component={Tokens} />
            <Route exacts strict path="/token/:tokenAddress" component={Dashboard} />
            <Route exact path="/pairs" component={Pairs} />
            <Route exact path="/pair/:pairAddress" component={Pair} />
            {/* Informational Routes */}
            <Route exact path="/governance" component={GovernanceTimelock} />
            <Route exact path="/governance/timelock" component={GovernanceTimelock} />
            <Route exact path="/governance/treasury" component={GovernanceMultisig} />
            {/* Dashboard Swap */}
            <Route exact strict path="/swap" component={Swap} />
            {/* Exchange Routes */}
            <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
            <Route exact strict path="/find" component={PoolFinder} />
            <Route exact strict path="/pool" component={PoolWrapper} />
            <Route exact strict path="/create" component={RedirectToAddLiquidity} />
            <Route exact path="/add" component={AddLiquidity} />
            <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
            {/* 404 */}
            <Redirect to="/home" />
          </Switch>
        </Web3ReactManager>
      </Router>
    </>
  );
};

const ServicesProviders = ({ children }) => {
  return (
    <>
      <SushiFrontendProviders>
        {/* Exchange goes last so its theme takes precedence */}
        <SushiExchangeProviders>
          <ModalsProvider>
            <App />
          </ModalsProvider>
        </SushiExchangeProviders>
      </SushiFrontendProviders>
    </>
  );
};

const SushiFrontendProviders = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <UseWalletProvider
        chainId={1}
        connectors={{
          walletconnect: { rpcUrl: "https://mainnet.eth.aragon.network/" },
        }}
      >
        <SushiProvider>
          <TransactionProvider>
            <FarmsProvider>
              <ServicesModalsProvider>{children}</ServicesModalsProvider>
            </FarmsProvider>
          </TransactionProvider>
        </SushiProvider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

const SushiExchangeProviders = ({ children }) => {
  return (
    <>
      <SushiExchangeContextProviders>
        <SushiExchangeUpdaters />
        <ExchangeThemeProvider>
          <ThemedGlobalStyle />
          {children}
        </ExchangeThemeProvider>
      </SushiExchangeContextProviders>
    </>
  );
};
const SushiExchangeUpdaters = () => {
  return (
    <>
      <ListsUpdater />
      <UserUpdater />
      <ApplicationUpdater />
      <TransactionUpdater />
      <MulticallUpdater />
    </>
  );
};
const Web3ProviderNetwork = createWeb3ReactRoot(NetworkContextName);
const SushiExchangeContextProviders = ({ children }) => {
  return (
    <>
      <FixedGlobalStyle />
      <Web3ReactProvider getLibrary={getLibrary}>
        <Web3ProviderNetwork getLibrary={getLibrary}>
          <Provider store={store}>{children}</Provider>
        </Web3ProviderNetwork>
      </Web3ReactProvider>
    </>
  );
};

export default ServicesProviders;
