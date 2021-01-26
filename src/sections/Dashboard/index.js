import React, { useState, useEffect, useRef, createContext, useContext, useReducer, Suspense } from "react";
import { Link, Route, Redirect, useParams } from "react-router-dom";
import WalletRoute from "../../shared/WalletRoute";
import PublicRoute from "../../shared/PublicRoute";
import TitleTabs from "../../components/TitleTabs";
import Connect from "../../pages/Connect";
// Dashboard
import FeaturedItem from "../../components/FeaturedItem";
import MobileNavigation from "../../components/MobileNavigation";
import Sidebar from "../../components/Sidebar/Layout";
//import MainSearch from "../../components/Search/Desktop";
import MainSearch from "../../services/vision/components/Search/secondary";
import useMenu from "../../shared/hooks/useMenu";
// Overview
import CardTokenActions from "../../components/Plugin/StandaloneWithoutRemove";
//import Flickity from "react-flickity-component";
import GlobalStats from "../../services/vision/components/GlobalStats/secondary";
// Portfolio
import PortfolioPage from "../../components/Portfolio";
import TransactionsPage from "../../components/Portfolio/Transactions";
// Onsen
import OnsenInfo from "../../components/Onsen/Hero";
// Tokens
import FeaturedList from "../../components/FeaturedList";
import TokenList from "../../services/vision/components/TokenList/secondary";
import { useAllTokenData } from "../../services/vision/contexts/TokenData";
// Pools / Farms
import TableFarms from "../../components/Farms";
import SushiBar from "../../components/SushiBar";
// Pairs
import { useAllPairData } from "../../services/vision/contexts/PairData";
import PairList from "../../services/vision/components/PairList/secondary";
// Pair
import { isAddress } from "../../services/vision/utils";
import Pair from "../../pages/Pair";
// Token
import Token from "../../pages/Token";
// About
import CardAbout from "../../components/About";
// Community
import Community from "../../components/Community";
// Faq
//import TableFAQ from "../../components/Table/FAQ";
// Governance
import CardTimelock from "../../components/Governance/Timelock/Layout";
import CardGovernanceMultisig from "../../components/Governance/Multisig/Layout";
//import CardGovernanceActions from "../../components/Cards/Governance/Actions/Layout";

import sushiData from "@sushiswap/sushi-data";
import { featured } from "../../constants/featured";

import { CardLiquidity, CardVolume, CardOnsen, CardBentoBox } from "../../components/Cards";

//import AlbumCardsLoading from "../../components/AlbumCards/Loading";
//const AlbumCards = React.lazy(() => import("../../components/AlbumCards"));

const LazyComponent = ({ component, fallback }) => {
  return (
    <>
      <Suspense fallback={fallback}>{component}</Suspense>
    </>
  );
};

const Dashboard = () => {
  return (
    <>
      <DashboardContainer>
        <DashboardRoutes />
      </DashboardContainer>
    </>
  );
};

export const DashboardContainer = ({ children }) => {
  const mobileMenu = useMenu();
  return (
    <>
      <div id="scroller">
        <div className="sushi-h-screen sushi-flex sushi-overflow-hidden sushi-bg-white">
          <Sidebar />
          <div className="sushi-flex sushi-flex-col sushi-w-0 sushi-flex-1 sushi-overflow-hidden">
            <main
              className="overflow-x-hidden lg:mr-4 lg:p-4 bg-white rounded-b-none lg:rounded-lg sushi-flex-1 sushi-relative sushi-z-0 sushi-overflow-y-auto focus:sushi-outline-none"
              tabIndex={0}
              style={{
                borderBottomRightRadius: 0,
                borderBottomLeftRadius: 0,
              }}
            >
              <div className="bg-white 2xl:mx-20 lg:rounded-lg mb-16 sm:mb-0 border border-grey-300 shadow-xl">
                {children}
              </div>
            </main>
          </div>
          <MobileNavigation changeMenu={mobileMenu.change} isOpen={mobileMenu.isOpen} />
        </div>
      </div>
    </>
  );
};

const DashboardRoutes = () => {
  return (
    <>
      {/* Additional */}
      <PublicRoute exact path="/connect" component={ConnectPage} />
      <Route exact path="/search" component={SearchPage} />
      {/* Overview */}
      <Route exact path="/" component={OverviewPage} />
      <Route exact path="/home" component={OverviewPage} />
      <Route exact path="/overview" component={OverviewPage} />
      {/* Portfolio */}
      <WalletRoute exact path="/omakase" component={PortfolioBalancesPage} />
      <WalletRoute exact path="/account" component={PortfolioBalancesPage} />
      <WalletRoute exact path="/portfolio" component={PortfolioBalancesPage} />
      <WalletRoute exact path="/portfolio/balances" component={PortfolioBalancesPage} />
      <WalletRoute exact path="/portfolio/transactions" component={PortfolioTransactionsPage} />
      {/* <Route exact path="/weekly" component={MenuOfTheWeek} /> */}
      <Route exact path="/lists/:listId" component={FeaturedListPage} />
      {/* Farms */}
      <Route exact path="/farms" component={FarmsAllPage} />
      <Route exact path="/farms/all" component={FarmsAllPage} />
      <Route exact path="/farms/permanent" component={FarmsPermanentPage} />
      <Route exact path="/farms/special" component={FarmsSpecialPage} />
      <Route exact path="/onsen" component={FarmsSpecialPage} />
      <WalletRoute exact path="/farms/xsushi" component={FarmsXSushiPage} />
      <WalletRoute exact path="/sushibar" component={FarmsXSushiPage} />
      <Route exact path="/farms/previous" component={FarmsPreviousPage} />
      {/* Tokens */}
      <Route exact path="/tokens" component={TokensPage} />
      <Route exact path="/pairs" component={PairsPage} />
      <Route
        exacts
        strict
        path="/token/:tokenAddress"
        render={({ match }) => {
          if (isAddress(match.params.tokenAddress.toLowerCase())) {
            return <Token address={match.params.tokenAddress.toLowerCase()} />;
          } else {
            return <Redirect to="/home" />;
          }
        }}
      />
      <Route
        exacts
        strict
        path="/pair/:pairAddress"
        render={({ match }) => {
          if (isAddress(match.params.pairAddress.toLowerCase())) {
            return <Pair pairAddress={match.params.pairAddress.toLowerCase()} />;
          } else {
            return <Redirect to="/home" />;
          }
        }}
      />
      {/* Community */}
      <Route exact path="/governance" component={GovernanceTimelockPage} />
      <Route exact path="/governance/timelock" component={GovernanceTimelockPage} />
      <Route exact path="/governance/treasury" component={GovernanceTreasuryPage} />
      <Route exact path="/community" component={CommunityPage} />
      <Route exact path="/about" component={AboutPage} />
      <Route exact path="/about/overview" component={AboutPage} />
      <Route exact path="/about/team" component={AboutTeamPage} />
      <Route exact path="/about/faq" component={AboutFaqPage} />
    </>
  );
};

const SearchPage = () => {
  return (
    <>
      <TitleTabs title={"Governance"} />
      <div className="py-4 px-4 lg:sushi-block">
        <MainSearch />
      </div>
    </>
  );
};
const ConnectPage = () => {
  return (
    <>
      <Connect />
    </>
  );
};

const OverviewPage = () => {
  useEffect(() => {
    document.getElementById("scroller").scroll(0, 0);
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, []);
  return (
    <>
      <div className="md:flex" id={"overview-page"}>
        <div className="relative w-full mx-auto sm:px-6 lg:px-6">
          <div className="sm:mt-2 lg:mt-6 py-2 pl-2 bg-gray-100 sm:rounded-md">
            <GlobalStats />
          </div>
          <div className="px-2 py-4 block sm:hidden">
            <MainSearch />
          </div>
          <div className="hidden sm:block grid grid-cols-1 h-80 ml-4 sm:m-0 pt-4">
            {/* <LazyComponent component={<AlbumCards />} fallback={<AlbumCardsLoading />} /> */}
            <div className="col-span-1 flex overflow-x-auto">
              <CardLiquidity />
              <CardVolume />
              <CardOnsen />
              {/* <CardBentoBox />
              <CardBentoBox />
              <CardBentoBox /> */}
            </div>
          </div>
          <div className="pt-4 grid gap-0 mx-auto lg:grid-cols-5 lg:max-w-none">
            <div className="pt-4 pb-8 lg:pb-20 lg:col-span-3 overflow-x-hidden lg:overflow-visible">
              <div className="lg:mr-4">
                <FeaturedItem />
              </div>
            </div>
            <div className="hidden pt-6 2xl:px-16 lg:block lg:col-span-2">
              <div className="lg:sticky top-0">
                <div className="hidden lg:block bg-gray-100">
                  <MainSearch />
                </div>
                <div className="pt-4">
                  <CardTokenActions initialSection={"swap"} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const PortfolioTabs = [
  {
    key: "balances",
    type: "internal",
    title: "Balances",
    to: "/portfolio/balances",
  },
  {
    key: "transactions",
    type: "internal",
    title: "Transactions",
    to: "/portfolio/transactions",
  },
];
const PortfolioBalancesPage = () => {
  return (
    <>
      <TitleTabs title={"Omakase: Your Portfolio"} tabs={PortfolioTabs} selected={"balances"} withSearch />
      <div className="bg-white">
        <PortfolioPage />
      </div>
    </>
  );
};
const PortfolioTransactionsPage = () => {
  return (
    <>
      <TitleTabs title={"Omakase: Your Portfolio"} tabs={PortfolioTabs} selected={"transactions"} withSearch />
      <div className="min-h-full bg-gray-100 shadow-inner py-6 space-y-6 sm:p-6">
        <TransactionsPage />
      </div>
    </>
  );
};

const FarmTabs = [
  {
    key: "all",
    type: "internal",
    title: "All",
    to: "/farms",
  },
  {
    key: "permanent",
    type: "internal",
    title: "Permanent",
    to: "/farms/permanent",
  },
  {
    key: "special",
    type: "internal",
    title: "Onsen",
    to: "/farms/special",
  },
  {
    key: "xsushi",
    type: "internal",
    title: "SushiBar",
    to: "/farms/xsushi",
  },
  {
    key: "previous",
    type: "internal",
    title: "Previous",
    to: "/farms/previous",
  },
];

const FarmsAllPage = () => {
  return (
    <>
      <TitleTabs title={"Farms"} tabs={FarmTabs} selected={"all"} withSearch />
      <TableFarms group={"active"} />
    </>
  );
};

const FarmsPermanentPage = () => {
  return (
    <>
      <TitleTabs title={"Farms"} tabs={FarmTabs} selected={"permanent"} withSearch />
      <TableFarms group={"permanent"} />
    </>
  );
};

const FarmsSpecialPage = () => {
  return (
    <>
      <TitleTabs title={"Farms"} tabs={FarmTabs} selected={"special"} withSearch />
      {/* <OnsenInfo /> */}
      <TableFarms group={"onsen"} />
    </>
  );
};

const FarmsXSushiPage = () => {
  return (
    <>
      <TitleTabs title={"Farms"} tabs={FarmTabs} selected={"xsushi"} withSearch />
      <SushiBar />
    </>
  );
};

const FarmsPreviousPage = () => {
  return (
    <>
      <TitleTabs title={"Farms"} tabs={FarmTabs} selected={"previous"} withSearch />
      {/* <OnsenInfo /> */}
      <TableFarms title={"Previous Farms"} group={"previous"} />
    </>
  );
};

const FeaturedListPage = () => {
  // find defined featured tokens
  const params = useParams();
  const list = featured.filter((item) => {
    return item.id === params.listId;
  });
  const featuredTokens = list?.[0]?.tokens;
  // find all tokens
  const allTokens = useAllTokenData();
  // filter tokens
  const filteredTokens = Object.keys(allTokens)
    .filter((key) => {
      return featuredTokens.includes(key);
    })
    .map((key) => allTokens[key]);

  return (
    <>
      {/* <MainSearch /> */}
      <div className="sushi-px-4 py-4 sushi-hidden lg:sushi-block">
        <MainSearch />
      </div>
      <h2 className="sushi-max-w-6xl sushi-mx-auto sushi-mt-4 sushi-px-4 text-xl sushi-leading-6 font-semibold sushi-text-cool-gray-900">
        {list?.[0]?.title}
      </h2>
      <p className="sushi-max-w-6xl sushi-mx-auto mt-1 sushi-px-4 text-sm sushi-leading-6 font-medium text-gray-600">
        {list?.[0]?.tokens.length} items
      </p>
      <p className="sushi-max-w-6xl sushi-mx-auto mt-4 sushi-px-4 text-base sushi-leading-6 font-medium text-gray-800">
        {list?.[0]?.description}
      </p>
      <div className="mt-12 sushi-inline-block sushi-min-w-full sushi-overflow-hidden sushi-align-middle">
        <div
          style={{
            position: "relative",
            overflow: "auto",
            whiteSpace: "nowrap",
          }}
        >
          <TokenList tokens={filteredTokens} itemMax={50} />
        </div>
      </div>
      {/* <p className="sushi-max-w-6xl sushi-mx-auto mt-1 pb-10 sushi-px-4 text-sm leading-5 font-medium text-gray-500">
        This list is generated using data sourced from one or more third party data providers and/or from SushiSwap.
        This list is provided for informational purposes only and is not investment advice or a recommendation to buy,
        hold, or sell any token. SushiSwap Lists are not personalized recommendations and the tokens listed may not be
        suitable for you. You should not buy or sell any token on a SushiSwap List without first determining it is
        appropriate for your portfolio or investment strategy. All investments involve risks, including the loss of
        principal.
      </p> */}
    </>
  );
};

const TokensPage = () => {
  const allTokens = useAllTokenData();
  return (
    <>
      <div className="sushi-px-4 py-4 sushi-hidden lg:sushi-block">
        <MainSearch />
      </div>
      <FeaturedList />
      <div className="sushi-mt-4 sushi-inline-block sushi-min-w-full sushi-overflow-hidden sushi-align-middle">
        <div
          style={{
            position: "relative",
            overflow: "auto",
            whiteSpace: "nowrap",
          }}
        >
          <TokenList tokens={allTokens} itemMax={50} />
        </div>
      </div>
    </>
  );
};

const PairsPage = () => {
  const allPairs = useAllPairData();
  return (
    <>
      <div className="sushi-px-4 py-4 sushi-hidden lg:sushi-block">
        <MainSearch />
      </div>
      <div className="my-4 sushi-inline-block sushi-min-w-full sushi-overflow-hidden sushi-align-middle">
        <div
          style={{
            position: "relative",
            overflow: "auto",
            whiteSpace: "nowrap",
          }}
        >
          <PairList pairs={allPairs} maxItems={50} />
        </div>
      </div>
    </>
  );
};

const AboutTabs = [
  {
    key: "overview",
    type: "internal",
    title: "Overview",
    to: "/about/overview",
  },
  {
    key: "team",
    type: "internal",
    title: "Team",
    to: "/about/team",
  },
  {
    key: "faq",
    type: "internal",
    title: "FAQ",
    to: "/about/faq",
  },
];

const AboutPage = () => {
  return (
    <>
      <TitleTabs title={"About"} tabs={AboutTabs} selected={"overview"} withSearch />
      <CardAbout />
    </>
  );
};

const AboutTeamPage = () => {
  return (
    <>
      <TitleTabs title={"About"} tabs={AboutTabs} selected={"team"} withSearch />
      <CardAbout />
    </>
  );
};

const AboutFaqPage = () => {
  return (
    <>
      <TitleTabs title={"About"} tabs={AboutTabs} selected={"faq"} withSearch />
      <CardAbout />
    </>
  );
};

const GovernanceTabs = [
  {
    key: "timelock",
    type: "internal",
    title: "Timelock",
    to: "/governance/timelock",
  },
  {
    key: "forum",
    type: "external",
    title: "Forum",
    to: "https://forum.sushiswapclassic.org",
  },
  {
    key: "treasury",
    type: "internal",
    title: "Treasury",
    to: "/governance/treasury",
  },
];

const GovernanceTimelockPage = () => {
  const [timelocks, setTimelocks] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const timelocks = await sushiData.timelock.allTxs().then((results) => {
        return results;
      });
      setTimelocks(timelocks);
    };
    fetchData();
  }, []);
  return (
    <>
      <TitleTabs title={"Governance"} tabs={GovernanceTabs} selected={"timelock"} withSearch />
      <CardTimelock timelocks={timelocks && timelocks} />
    </>
  );
};

const GovernanceTreasuryPage = () => {
  return (
    <>
      <TitleTabs title={"Governance"} tabs={GovernanceTabs} selected={"treasury"} withSearch />
      <CardGovernanceMultisig />
    </>
  );
};

const CommunityPage = () => {
  return (
    <>
      <TitleTabs title={"Community"} tabs={GovernanceTabs} selected={"treasury"} withSearch />
      <div className="py-4 px-4 lg:sushi-block">
        <Community />
      </div>
    </>
  );
};

export default Dashboard;
