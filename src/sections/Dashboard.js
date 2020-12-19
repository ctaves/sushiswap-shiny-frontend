import React, { useState, useEffect, useRef, createContext, useContext, useReducer } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import SectionTabs from "../components/Tabs";
// Dashboard
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
// Tokens
import TokenList from "../services/vision/components/TokenList/secondary";
import { useAllTokenData } from "../services/vision/contexts/TokenData";
// Pools
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
            className="lg:mt-4 lg:mr-4 lg:p-4 lg:bg-gray-200 lg:rounded-lg sushi-flex-1 sushi-relative sushi-z-0 sushi-overflow-y-auto focus:sushi-outline-none"
            tabIndex={0}
          >
            <div className="bg-white lg:rounded-lg mb-16">{children}</div>
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
      <Route exact path="/search" component={Search} />
      <Route exact path="/omakase" component={PortfolioBalances} />
      <Route exact path="/account" component={PortfolioBalances} />
      <Route exact path="/portfolio" component={PortfolioBalances} />
      <Route exact path="/portfolio/balances" component={PortfolioBalances} />
      <Route exact path="/portfolio/transactions" component={PortfolioTransactions} />
      <Route exact path="/weekly" component={MenuOfTheWeek} />
      <Route exact path="/tokens" component={Tokens} />
      <Route exact path="/pools" component={Pools} />
      <Route exact path="/farms" component={Pools} />
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

const Search = () => {
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
      {/* <IntroBanner /> */}
      {/* <PageTitle title={"👋 いらっしゃいませ「 Welcome Back 」!"} /> */}
      <div className="sushi-px-8 py-4 sushi-hidden lg:sushi-block">
        <MainSearch />
      </div>
      <div className="sushi-px-8 my-4">
        <span className="sushi-w-full">
          <div className="sushi-flex sushi-items-start sushi-justify-between sushi-space-x-3">
            <GlobalStats />
          </div>
        </span>
      </div>
      <Features />
      {/* <div className="shadow-inner bg-gray-100">
        <h3 className="pl-10 pt-4 text-lg leading-6 font-medium text-gray-400">
          While you're here, you can...(hint: swipe or use arrow keys)
        </h3>
        <Flickity
          className={"flickity-viewport-visible py-4 overflow-x-hidden outline-none"}
          elementType={"div"}
          options={{
            cellAlign: "left",
            imagesLoaded: true,
            pageDots: false,
            prevNextButtons: false,
            contain: true,
          }}
          disableImagesLoaded={false}
          reloadOnUpdate // default false
          static // default false
        >
          <div className="relative w-4/5 md:w-2/5 mx-auto pl-6">
            <CardTokenActions initialSection={"swap"} currencyIdB={"ETH"} />
          </div>
          <div className="relative w-4/5 md:w-1/3 mx-auto pl-6">
            <CardCurrentMenu pathToMenu={"/weekly"} />
          </div>
          <div className="relative w-4/5 md:w-1/3 mx-auto pl-6">
            <CardMigrateNotice />
          </div>
          <div className="relative w-4/5 md:w-1/2 mx-auto pl-6">
            <CardChart>
              <SushiGlobalChart display="liquidity" />
            </CardChart>
          </div>
          <div className="relative w-4/5 md:w-1/2 mx-auto pl-6">
            <CardChart>
              <SushiGlobalChart display="volume" />
            </CardChart>
          </div>
          <div className="relative w-4/5 md:w-1/2 mx-auto pl-6">
            <CardChart>
              <UniGlobalChart display="liquidity" />
            </CardChart>
          </div>
          <div className="relative w-4/5 md:w-1/2 mx-auto pl-6">
            <CardChart>
              <UniGlobalChart display="volume" />
            </CardChart>
          </div>
        </Flickity>
      </div> */}
      {/* <TablePools type={"active"} title={"All active farms"} /> */}
    </>
  );
};

const PortfolioBalances = () => {
  const { dispatch } = useContext(SectionContext);
  useEffect(() => {
    dispatch({ type: "update", section: "portfolio" });
  }, []);
  return (
    <>
      <div className="border-b border-gray-200 px-4 pt-4 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:flex sm:items-baseline sm:space-y-0 sm:space-x-10">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Omakase: Your Portflio</h3>
          <div>
            <nav className="-mb-px flex space-x-8">
              <Link
                href="/portfolio/balances"
                className="whitespace-no-wrap pb-4 px-1 border-b-2 border-gray-900 font-medium text-sm leading-5 text-gray-900 focus:outline-none focus:text-gray-900 focus:border-gray-900"
                aria-current="page"
              >
                Balances
              </Link>
              <Link
                to="/portfolio/transactions"
                className="whitespace-no-wrap pb-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300"
              >
                Transactions
              </Link>
            </nav>
          </div>
        </div>
      </div>
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
  return (
    <>
      <div className="border-b border-gray-200 px-4 pt-4 sm:px-6 lg:px-8">
        <div className="space-y-4 sm:flex sm:items-baseline sm:space-y-0 sm:space-x-10">
          <h3 className="text-lg leading-6 font-medium text-gray-900">Omakase: Your Portflio</h3>
          <div>
            <nav className="-mb-px flex space-x-8">
              <Link
                to="/portfolio/balances"
                className="whitespace-no-wrap pb-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300"
              >
                Balances
              </Link>
              <Link
                href="/portfolio/transactions"
                className="whitespace-no-wrap pb-4 px-1 border-b-2 border-gray-900 font-medium text-sm leading-5 text-gray-900 focus:outline-none focus:text-gray-900 focus:border-gray-900"
                aria-current="page"
              >
                Transactions
              </Link>
            </nav>
          </div>
        </div>
      </div>
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
      <div className="sushi-px-8 py-4 sushi-hidden lg:sushi-block">
        <MainSearch />
      </div>
      <h2 className="sushi-max-w-6xl sushi-mx-auto sushi-mt-8 sushi-px-4 sushi-text-lg sushi-leading-6 sushi-font-medium sushi-text-cool-gray-900 sm:sushi-px-6 lg:sushi-px-8">
        Tokens on Sushiswap
      </h2>
      <div className="sushi-mt-4 sushi-inline-block sushi-min-w-full sushi-overflow-hidden sushi-align-middle sushi-px-6">
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

const Pools = () => {
  const { dispatch } = useContext(SectionContext);
  useEffect(() => {
    dispatch({ type: "update", section: "pools" });
  }, []);
  return (
    <>
      {/* <MainSearch /> */}
      <div className="sushi-px-8 py-4 sushi-hidden lg:sushi-block">
        <MainSearch />
      </div>
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
      <div className="sushi-px-8 py-4 sushi-hidden lg:sushi-block">
        <MainSearch />
      </div>
      <h2 className="sushi-max-w-6xl sushi-mx-auto sushi-mt-8 sushi-px-4 sushi-text-lg sushi-leading-6 sushi-font-medium sushi-text-cool-gray-900 sm:sushi-px-6 lg:sushi-px-8">
        Trading pairs on Sushiswap
      </h2>
      <div className="sushi-mt-4 sushi-inline-block sushi-min-w-full sushi-overflow-hidden sushi-align-middle sushi-px-6">
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
