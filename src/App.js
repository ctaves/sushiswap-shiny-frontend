import React from "react";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";

import Dashboard from "./sections/Dashboard";
import Midnight from "./sections/Midnight";
import Trader from "./sections/Trader";
import Beginner from "./pages/Beginner";
import NobleFisherman from "./sections/NobleFisherman";

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

// Services -  Analytics Dependencies
import { ApolloProvider as SushiAnalyticsApolloProvider } from "@apollo/client";
import SushiAnalyticsCssBaseline from "@material-ui/core/CssBaseline";
import { useApollo } from "./services/analytics/core";

// Services - Sushi View Dependencies (Deprecated)
// import AnalyticsGlobalDataContextProvider from "./services/view/contexts/globalData";
// import AnalyticsApplicationContextProvider from "./services/view/contexts/application";

//Services - Vision Dependencies
import VisionThemeProvider from "./services/vision/Theme";
import { GlobalStyle } from "./services/vision/Theme";
import LocalStorageContextProvider, {
  Updater as LocalStorageContextUpdater,
} from "./services/vision/contexts/LocalStorage";
import TokenDataContextProvider, { Updater as TokenDataContextUpdater } from "./services/vision/contexts/TokenData";
import GlobalDataContextProvider from "./services/vision/contexts/GlobalData";
import PairDataContextProvider, { Updater as PairDataContextUpdater } from "./services/vision/contexts/PairData";
import ApplicationContextProvider from "./services/vision/contexts/Application";
import UserContextProvider from "./services/vision/contexts/User";
import { ApolloProvider } from "react-apollo";
//import { useGlobalData, useGlobalChartData } from "./services/vision/contexts/GlobalData";
//import { useLatestBlock } from "./services/vision/contexts/Application";

//Services - Exchange Dependencies
import Web3Status from "./services/exchange/components/Web3Status";
import Popups from "./services/exchange/components/Popups";
import { createWeb3ReactRoot, Web3ReactProvider } from "@web3-react/core";
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
import SwapWrapper from "./pages/Swap";
import PoolWrapper from "./pages/Pool";

// Services - Lite Dependancies
import { ContextProvider as LiteProvider } from "./services/lite/context";

const App = () => {
  return (
    <>
      <Router>
        <Web3Status />
        <Popups />
        <Web3ReactManager>
          <Switch>
            {/* Home Routes */}
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/home" component={Dashboard} />
            <Route exact path="/experimental/beginner" component={Beginner} />
            <Route exact path="/experimental/fisherman" component={NobleFisherman} />
            {/* Experimental Routes */}
            <Route exact path="/experimental/midnight" component={Midnight} />
            <Route exact path="/experimental/trader" component={Trader} />
            {/* Account Routes */}
            <Route exact path="/connect" component={Dashboard} />
            <Route exact path="/search" component={Dashboard} />
            <Route exact path="/omakase" component={Dashboard} />
            <Route exact path="/account" component={Dashboard} />
            <Route exact path="/portfolio/balances" component={Dashboard} />
            <Route exact path="/portfolio/transactions" component={Dashboard} />
            <Route exact path="/portfolio" component={Dashboard} />
            <Route exact path="/lists/:listId" component={Dashboard} />
            {/* Farm Routes */}
            <Route exact path="/pools">
              <Redirect to="/farms" />
            </Route>
            <Route exact path="/weekly">
              <Redirect to="/farms/special" />
            </Route>
            <Route exact path="/farms" component={Dashboard} />
            <Route exact path="/farms/all" component={Dashboard} />
            <Route exact path="/farms/special" component={Dashboard} />
            <Route exact path="/onsen" component={Dashboard} />
            <Route exact path="/farms/permanent" component={Dashboard} />
            <Route exact path="/sushibar" component={Dashboard} />
            <Route exact path="/farms/xsushi" component={Dashboard} />
            <Route exact path="/farms/previous" component={Dashboard} />
            {/* Dashboard Routes */}
            <Route exact path="/" component={Dashboard} />
            <Route exact path="/home" component={Dashboard} />
            <Route exact path="/tokens" component={Dashboard} />
            <Route exact path="/pairs" component={Dashboard} />
            <Route exact path="/pair/:pairId" component={Dashboard} />
            <Route exact path="/governance" component={Dashboard} />
            <Route exact path="/governance/timelock" component={Dashboard} />
            <Route exact path="/governance/treasury" component={Dashboard} />
            <Route exact path="/community" component={Dashboard} />
            <Route exact path="/about" component={Dashboard} />
            <Route exact path="/about/overview" component={Dashboard} />
            <Route exact path="/about/team" component={Dashboard} />
            <Route exact path="/about/faq" component={Dashboard} />
            <Route exact path="/faq" component={Dashboard} />
            <Route exact path="/faqs" component={Dashboard} />
            <Route exacts strict path="/token/:tokenAddress" component={Dashboard} />
            <Route exacts strict path="/pair/:pairAddress" component={Dashboard} />
            {/* Exchange Routes */}
            <Route exact strict path="/swap" component={SwapWrapper} />
            <Route exact strict path="/swap/:outputCurrency" component={RedirectToSwap} />
            <Route exact strict path="/send" component={RedirectPathToSwapOnly} />
            <Route exact strict path="/find" component={PoolFinder} />
            <Route exact strict path="/pool" component={PoolWrapper} />
            <Route exact strict path="/create" component={RedirectToAddLiquidity} />
            <Route exact path="/add" component={AddLiquidity} />
            <Route exact path="/add/:currencyIdA" component={RedirectOldAddLiquidityPathStructure} />
            <Route exact path="/add/:currencyIdA/:currencyIdB" component={RedirectDuplicateTokenIds} />
            <Route exact strict path="/remove/:currencyIdA/:currencyIdB" component={RemoveLiquidity} />
            <Redirect to="/home" />
            {/* 404 or Redirect */}
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
        <SushiVisionProviders>
          {/* Exchange goes last so its theme takes precedence */}
          <SushiExchangeProviders>
            <SushiLiteProviders>
              <SushiAnalyticsProviders>
                <ModalsProvider>
                  <App />
                </ModalsProvider>
              </SushiAnalyticsProviders>
            </SushiLiteProviders>
          </SushiExchangeProviders>
        </SushiVisionProviders>
      </SushiFrontendProviders>
    </>
  );
};

const SushiAnalyticsProviders = ({ children }) => {
  const client = useApollo(null);
  return (
    <SushiAnalyticsApolloProvider client={client}>
      {/* <SushiAnalyticsThemeProvider
        theme={{
          ...theme,
        }}
      > */}
      <SushiAnalyticsCssBaseline />
      {children}
      {/* </SushiAnalyticsThemeProvider> */}
    </SushiAnalyticsApolloProvider>
  );
};

const SushiLiteProviders = ({ children }) => {
  return <LiteProvider>{children}</LiteProvider>;
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
              {/* <AnalyticsApplicationContextProvider>
                <AnalyticsGlobalDataContextProvider> */}
              <ServicesModalsProvider>{children}</ServicesModalsProvider>
              {/* </AnalyticsGlobalDataContextProvider>
              </AnalyticsApplicationContextProvider> */}
            </FarmsProvider>
          </TransactionProvider>
        </SushiProvider>
      </UseWalletProvider>
    </ThemeProvider>
  );
};

const SushiVisionProviders = ({ children }) => {
  return (
    <>
      <SushiVisionContextProviders>
        <SushiVisionUpdaters />
        <VisionThemeProvider>
          <GlobalStyle />
          <ApolloProvider>{children}</ApolloProvider>
        </VisionThemeProvider>
      </SushiVisionContextProviders>
    </>
  );
};
const SushiVisionUpdaters = () => {
  return (
    <>
      <LocalStorageContextUpdater />
      <PairDataContextUpdater />
      <TokenDataContextUpdater />
    </>
  );
};
const SushiVisionContextProviders = ({ children }) => {
  return (
    <>
      <LocalStorageContextProvider>
        <ApplicationContextProvider>
          <TokenDataContextProvider>
            <GlobalDataContextProvider>
              <PairDataContextProvider>
                <UserContextProvider>{children}</UserContextProvider>
              </PairDataContextProvider>
            </GlobalDataContextProvider>
          </TokenDataContextProvider>
        </ApplicationContextProvider>
      </LocalStorageContextProvider>
    </>
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
