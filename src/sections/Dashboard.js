import React, { useState, useEffect, useRef, createContext, useContext, useReducer } from "react";
import { Link, Route, Redirect } from "react-router-dom";
import WalletRoute from "../shared/WalletRoute";
import PublicRoute from "../shared/PublicRoute";
import SectionTabs from "../components/Tabs";
import TitleTabs from "../components/TitleTabs";
import ConnectPage from "../pages/Connect";
import AlbumCards from "../components/AlbumCards";
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
// Onsen
import OnsenInfo from "../components/Onsen/Hero";
// Tokens
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
            <div className="bg-white lg:rounded-lg mb-16 sm:mb-0">{children}</div>
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
          <div className="grid gap-2 mx-auto lg:grid-cols-5 lg:max-w-none">
            <div className="lg:col-span-3">
              <div className="pt-6">
                <GlobalStats />
              </div>
              <AlbumCards />
              {/* <Flickity
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
                <div className="relative w-full mx-auto">
                  <SushiGlobalChart display="liquidity" />
                </div>
              </Flickity> */}
            </div>
            <div className="pt-6 lg:col-span-2">
              <div className="lg:sticky top-0">
                <div className="hidden lg:block">
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
      <TitleTabs title={"Omakase: Your Portfolio"} tabs={tabs} />
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
      <TitleTabs title={"Omakase: Your Portfolio"} tabs={tabs} />
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
      <TitleTabs title={"Farms"} tabs={tabs} withSearch={true} />
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
      <TitleTabs title={"Farms"} tabs={tabs} withSearch={true} />
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
