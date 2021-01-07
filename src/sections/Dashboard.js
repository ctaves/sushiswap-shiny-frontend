import React, { useState, useEffect, useRef, createContext, useContext, useReducer, Suspense } from "react";
import { Link, Route, Redirect, useParams } from "react-router-dom";
import WalletRoute from "../shared/WalletRoute";
import PublicRoute from "../shared/PublicRoute";
import SectionTabs from "../components/Tabs";
import TitleTabs from "../components/TitleTabs";
import ConnectPage from "../pages/Connect";
// import AlbumCards from "../components/AlbumCards";
// Dashboard
import FeaturedItem from "../components/FeaturedItem";
import MobileNavigation from "../components/MobileNavigation";
import SearchHeader from "../components/MobileMenu";
import Sidebar from "../components/Sidebar/Layout";
import PageTitle from "../components/PageTitles/Default";
//import MainSearch from "../components/Search/Desktop";
import MainSearch from "../services/vision/components/Search/secondary";
import Features from "../components/Features";
import CardSection from "../components/Cards/Section";
import useMenu from "../shared/hooks/useMenu";
// Overview
import CardCurrentMenu from "../components/Overview/CurrentMenu";
import CardMigrateNotice from "../components/Overview/MigrateNotice";
import CardMigrate from "../components/Cards/Migrate/Layout";
import CardTokenActions from "../components/Cards/TokenActions/StandaloneWithoutRemove";
import { CurrentMenuWrapper } from "../components/WeeklyMenu/Menus";
import CardChart from "../components/Cards/Chart";
import SushiGlobalChart from "../services/vision/components/GlobalChart";
import UniGlobalChart from "../services/view/components/charts/globalChart";
import Flickity from "react-flickity-component";
import GlobalStats from "../services/vision/components/GlobalStats/secondary";
import IntroBanner from "../components/Banners/Full";
// Portfolio
import PortfolioPage from "../components/Portfolio";
import TransactionsPage from "../components/Portfolio/Transactions";
import CardSummary from "../components/Cards/Summary";
import CardBalance from "../components/Cards/Balance/Layout";
import CardResources from "../components/Cards/Resources/Layout";
import CardSocialMedia from "../components/Cards/SocialMedia/Layout";
import CardBalances from "../components/Cards/SushiBar/Balances";
import CardPositions from "../components/Cards/SushiBar/Positions";
import CardKitchen from "../components/Cards/SushiBar/Kitchen";
import CardServing from "../components/Cards/SushiBar/Serving";
// Menu of the Week
import WeeklyMenuInfo from "../components/WeeklyMenu/Hero";
import WeeklyMenus from "../components/WeeklyMenu/Menus";
import CurrentPools from "../components/Table/PoolsWeeklyApollo";
import PreviousPools from "../components/Table/PoolsWeeklyApollo";
// Onsen
import OnsenInfo from "../components/Onsen/Hero";
// Tokens
import FeaturedList from "../components/FeaturedList";
import TokenList from "../services/vision/components/TokenList/secondary";
import { useAllTokenData } from "../services/vision/contexts/TokenData";
// Pools / Farms
import TablePools from "../components/Table/PoolsWeeklyApollo";
// Pairs
import { useAllPairData } from "../services/vision/contexts/PairData";
import PairList from "../services/vision/components/PairList/secondary";
// Pair
import { isAddress } from "../services/vision/utils";
import Pair from "../pages/Pair";
// Token
import Token from "../pages/Token";
// About
import CardAbout from "../components/Cards/About";
// Community
import CommunityPage from "../components/Community";
// Faq
import TableFAQ from "../components/Table/FAQ";
// Governance
import CardTimelock from "../components/Cards/Governance/Timelock/Layout";
import CardGovernanceMultisig from "../components/Cards/Governance/Multisig/Layout";
//import CardGovernanceActions from "../components/Cards/Governance/Actions/Layout";
// BentoBox
import BentoBox from "../pages/BentoBox";
import BentoBoxLogo from "../assets/img/bentobox.png";

import sushiData from "@sushiswap/sushi-data";

import { featured } from "../constants/featured";

import AlbumCardsLoading from "../components/AlbumCards/Loading";
const AlbumCards = React.lazy(() => import("../components/AlbumCards"));

const LazyComponent = ({ component, fallback }) => {
  return (
    <>
      <Suspense fallback={fallback}>{component}</Suspense>
    </>
  );
};

const SectionContext = createContext();
const sectionReducer = (state, action) => {
  switch (action.type) {
    case "update": {
      return { ...state, section: action.section };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
};
const SectionProvider = ({ children }) => {
  const [state, dispatch] = useReducer(sectionReducer, { section: "" });
  const value = { state, dispatch };
  return <SectionContext.Provider value={value}>{children}</SectionContext.Provider>;
};
const useSectionState = () => {
  const context = useContext(SectionContext);
  if (context === undefined) {
    throw new Error("useSectionState must be used within a SectionProvider");
  }
  return context;
};

const Dashboard = () => {
  return (
    <>
      <SectionProvider>
        <DashboardContainer>
          <DashboardRoutes />
        </DashboardContainer>
      </SectionProvider>
    </>
  );
};

export const DashboardContainer = ({ children }) => {
  useEffect(() => {
    window.scrollTo({
      behavior: "smooth",
      top: 0,
    });
  }, []);
  const mobileMenu = useMenu();
  //const { state } = useSectionState();

  return (
    <>
      <div className="sushi-h-screen sushi-flex sushi-overflow-hidden sushi-bg-white">
        <Sidebar />
        <div className="sushi-flex sushi-flex-col sushi-w-0 sushi-flex-1 sushi-overflow-hidden">
          {/* <SearchHeader changeMenu={mobileMenu.change} isOpen={mobileMenu.isOpen} /> */}
          <main
            className="overflow-x-hidden lg:mt-4 lg:mr-4 lg:p-4 lg:bg-gray-200 lg:rounded-lg sushi-flex-1 sushi-relative sushi-z-0 sushi-overflow-y-auto focus:sushi-outline-none"
            tabIndex={0}
          >
            <div className="bg-white 2xl:px-20 lg:rounded-lg mb-16 sm:mb-0">{children}</div>
          </main>
        </div>
        <MobileNavigation changeMenu={mobileMenu.change} isOpen={mobileMenu.isOpen} />
      </div>
    </>
  );
};

const DashboardRoutes = () => {
  return (
    <>
      <Route exact path="/" component={Overview} />
      <Route exact path="/home" component={Overview} />
      <Route exact path="/overview" component={Overview} />
      <PublicRoute exact path="/connect" component={Connect} />
      <Route exact path="/search" component={SearchPage} />
      <WalletRoute exact path="/omakase" component={PortfolioBalances} />
      <WalletRoute exact path="/account" component={PortfolioBalances} />
      <WalletRoute exact path="/portfolio" component={PortfolioBalances} />
      <WalletRoute exact path="/portfolio/balances" component={PortfolioBalances} />
      <WalletRoute exact path="/portfolio/transactions" component={PortfolioTransactions} />
      <Route exact path="/weekly" component={MenuOfTheWeek} />
      <Route exact path="/lists/:listId" component={FeaturedListPage} />
      <Route exact path="/tokens" component={Tokens} />
      <Route exact path="/pools" component={Farms} />
      <Route exact path="/farms" component={Farms} />
      <Route exact path="/farms/special" component={FarmsSpecial} />
      <Route exact path="/farms/permanent" component={Farms} />
      <Route exact path="/farms/xsushi" component={Farms} />
      <Route exact path="/pairs" component={Pairs} />
      <Route exact path="/governance" component={Governance} />
      <Route exact path="/community" component={Community} />
      <Route exact path="/about" component={About} />
      <Route exact path="/faqs" component={Faqs} />
      <Route exact path="/bentobox" component={BentoBoxWrapper} />
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
    </>
  );
};

const BentoBoxWrapper = () => {
  return (
    <>
      {/* <PageTitle title={"Bentobox Lending"} logo={BentoBoxLogo} /> */}
      <BentoBox />
    </>
  );
};

const Connect = () => {
  return (
    <>
      <ConnectPage />
    </>
  );
};

const SearchPage = () => {
  return (
    <>
      <PageTitle title={"Browse"} />
      <div className="py-4 px-4 lg:sushi-block">
        <MainSearch />
      </div>
    </>
  );
};

const Community = () => {
  return (
    <>
      <PageTitle title={"A community full of chefs"} />
      <div className="py-4 px-4 lg:sushi-block">
        <MainSearch />
        <CommunityPage />
      </div>
    </>
  );
};

const Overview = () => {
  const { dispatch } = useContext(SectionContext);
  useEffect(() => {
    dispatch({ type: "update", section: "home" });
  }, []);
  return (
    <>
      <div className="md:flex">
        <div className="relative w-full mx-auto sm:px-6 lg:px-6">
          <div className="sm:mt-2 lg:mt-6 py-2 pl-2 bg-gray-100 sm:rounded-md">
            <GlobalStats />
          </div>
          <div className="ml-4 sm:m-0 h-80">
            <LazyComponent component={<AlbumCards />} fallback={<AlbumCardsLoading />} />
          </div>
          <div className="grid gap-0 mx-auto lg:grid-cols-5 lg:max-w-none">
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

// Previous Layout
// const Overview = () => {
//   const { dispatch } = useContext(SectionContext);
//   useEffect(() => {
//     dispatch({ type: "update", section: "home" });
//   }, []);
//   return (
//     <>
//       <div className="md:flex">
//         <div className="relative w-full mx-auto sm:px-6 lg:px-6">
//           <div className="grid gap-0 mx-auto lg:grid-cols-5 lg:max-w-none">
//             <div className="pb-8 lg:pb-20 lg:col-span-3 overflow-x-hidden lg:overflow-visible">
//               <div className="sm:mt-2 lg:mt-6 py-2 pl-2 bg-gray-100 sm:rounded-md lg:rounded-r-none">
//                 <GlobalStats />
//               </div>
//               <div className="ml-4 sm:m-0 h-80">
//                 <LazyComponent component={<AlbumCards />} />
//               </div>
//               <div className="mr-4">
//                 <FeaturedItem />
//               </div>
//             </div>
//             <div className="pt-6 lg:col-span-2">
//               <div className="lg:sticky top-0">
//                 <div className="hidden lg:block bg-gray-100">
//                   <MainSearch />
//                 </div>
//                 <div className="pt-4">
//                   <CardTokenActions initialSection={"swap"} />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

const PortfolioBalances = () => {
  const { dispatch } = useContext(SectionContext);
  useEffect(() => {
    dispatch({ type: "update", section: "portfolio" });
  }, []);
  const tabs = [
    {
      key: "balances",
      type: "internal",
      title: "Balances",
      to: "/portfolio/balances",
      selected: true,
    },
    {
      key: "transactions",
      type: "internal",
      title: "Transactions",
      to: "/portfolio/transactions",
    },
  ];
  return (
    <>
      <TitleTabs title={"Omakase: Your Portfolio"} tabs={tabs} withSearch />
      <div className="min-h-full bg-gray-100 shadow-inner py-6 space-y-6 sm:p-6">
        <div className="shadow sm:rounded-md sm:overflow-hidden">
          <div className="bg-white">
            <PortfolioPage />
          </div>
        </div>
      </div>
    </>
  );
};

const PortfolioTransactions = () => {
  const { dispatch } = useContext(SectionContext);
  useEffect(() => {
    dispatch({ type: "update", section: "portfolio" });
  }, []);
  const tabs = [
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
      selected: true,
    },
  ];
  return (
    <>
      <TitleTabs title={"Omakase: Your Portfolio"} tabs={tabs} withSearch />
      <div className="min-h-full bg-gray-100 shadow-inner py-6 space-y-6 sm:p-6">
        <TransactionsPage />
      </div>
    </>
  );
};

const MenuOfTheWeek = () => {
  const { dispatch } = useContext(SectionContext);
  useEffect(() => {
    dispatch({ type: "update", section: "weekly" });
  }, []);
  const menuRef = useRef(null);
  const currentRef = useRef(null);
  const previousRef = useRef(null);
  const scrollToMenu = () => scrollToRef(menuRef);
  const scrollToCurrent = () => scrollToRef(currentRef);
  const scrollToPrevious = () => scrollToRef(previousRef);
  const scrollToRef = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <>
      {/* <MainSearch /> */}
      {/* <div className="sushi-px-8 py-4 sushi-hidden lg:sushi-block"><MainSearch /></div> */}
      <WeeklyMenuInfo scrollToMenu={scrollToMenu} />
      <div ref={menuRef} id="menus">
        <WeeklyMenus scrollToCurrent={scrollToCurrent} scrollToPrevious={scrollToPrevious} />
      </div>
      <div ref={currentRef} id="current">
        <TablePools title={"Weekly Farms"} type={"current"} />
      </div>
      <div ref={previousRef} id="previous">
        <TablePools title={"Previous Farms"} type={"previous"} />
      </div>
    </>
  );
};

const Tokens = () => {
  const { dispatch } = useContext(SectionContext);
  useEffect(() => {
    dispatch({ type: "update", section: "tokens" });
  }, []);

  const allTokens = useAllTokenData();
  return (
    <>
      {/* <MainSearch /> */}
      <div className="sushi-px-4 py-4 sushi-hidden lg:sushi-block">
        <MainSearch />
      </div>
      {/* <h2 className="sushi-max-w-6xl sushi-mx-auto sushi-mt-4 sushi-px-4 sushi-text-lg sushi-leading-6 sushi-font-medium sushi-text-cool-gray-900 sm:sushi-px-6 lg:sushi-px-8">
        Tokens on SushiSwap
      </h2> */}
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

const Farms = () => {
  const { dispatch } = useContext(SectionContext);
  useEffect(() => {
    dispatch({ type: "update", section: "farms" });
  }, []);
  const tabs = [
    {
      key: "all",
      type: "internal",
      title: "All",
      to: "/farms",
      selected: true,
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
  ];
  return (
    <>
      <TitleTabs title={"Farms"} tabs={tabs} withSearch />
      <div className="sushi-px-8 py-4 sushi-hidden lg:sushi-block">
        <MainSearch />
      </div>
      <TablePools title={"Permanent Farms"} type={"main"} />
    </>
  );
};

const FarmsSpecial = () => {
  const { dispatch } = useContext(SectionContext);
  useEffect(() => {
    dispatch({ type: "update", section: "farms-special" });
  }, []);
  const tabs = [
    {
      key: "all",
      type: "internal",
      title: "All",
      to: "/farms",
    },
    {
      key: "special",
      type: "internal",
      title: "Onsen",
      to: "/farms/special",
      selected: true,
    },
    {
      key: "xsushi",
      type: "internal",
      title: "SushiBar",
      to: "/farms/xsushi",
    },
  ];
  return (
    <>
      <TitleTabs title={"Farms"} tabs={tabs} withSearch />
      <OnsenInfo />
      {/* <div className="sushi-px-8 py-4 sushi-hidden lg:sushi-block">
        <MainSearch />
      </div> */}
      <TablePools title={"Permanent Farms"} type={"main"} />
    </>
  );
};

const Pairs = () => {
  const { dispatch } = useContext(SectionContext);
  useEffect(() => {
    dispatch({ type: "update", section: "pairs" });
  }, []);

  const allPairs = useAllPairData();
  return (
    <>
      {/* <MainSearch /> */}
      <div className="sushi-px-4 py-4 sushi-hidden lg:sushi-block">
        <MainSearch />
      </div>
      {/* <h2 className="sushi-max-w-6xl sushi-mx-auto sushi-mt-8 sushi-px-4 sushi-text-lg sushi-leading-6 sushi-font-medium sushi-text-cool-gray-900 sm:sushi-px-6 lg:sushi-px-8">
        Trading pairs on Sushiswap
      </h2> */}
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

const Governance = () => {
  const { dispatch } = useContext(SectionContext);
  const [timelocks, setTimelocks] = useState();
  useEffect(() => {
    dispatch({ type: "update", section: "governance" });
    const fetchData = async () => {
      const timelocks = await sushiData.timelock.txs().then((results) => {
        return results;
      });
      setTimelocks(timelocks);
    };
    fetchData();
  }, []);
  return (
    <>
      <PageTitle title={"Governance"} />
      <CardSection>
        <CardTimelock timelocks={timelocks && timelocks} />
        {/* <CardGovernanceActions /> */}
        <CardGovernanceMultisig />
      </CardSection>
    </>
  );
};

const About = () => {
  const { dispatch } = useContext(SectionContext);
  useEffect(() => {
    dispatch({ type: "update", section: "about" });
  }, []);
  return (
    <>
      <CardAbout />
    </>
  );
};

const Faqs = () => {
  return (
    <>
      <TableFAQ title={"Top Liquidity Positions"} />
    </>
  );
};

export default Dashboard;
