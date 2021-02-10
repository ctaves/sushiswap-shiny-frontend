import React from "react";

import FeaturedList from "../../components/Lists";
import Articles from "../../components/Articles";
import TopMovers from "../../components/TopMovers";
import TopEarners from "../../components/TopEarners";

import Search from "./Search";
import AreaChart from "./AreaChart";

import Logo from "../../assets/img/logo.png";
import "./styles.css";

import { useMedia } from "react-use";
//import { useAccountBalances, useAccountBalance, useTokenBalance } from "./Account";

// const NobleFishermanInterface = () => {
//   return (
//     <>
//       <Page>
//         <Navbar />
//         <Grid columns={12} gap={4} verticalPadding={10}>
//           <Column span={8} h={"auto"} paddingLeft={0} paddingRight={0}>
//             <FeaturedList />
//             <Articles />
//             <TopMovers />
//             <TopEarners />
//           </Column>
//           <Column span={4} h={"full"} paddingLeft={8} paddingRight={0}>
//             <Portfolio />
//           </Column>
//         </Grid>
//       </Page>
//     </>
//   );
// };

const NobleFishermanInterface = () => {
  //const balances = useAccountBalances();
  //const currentBalance = useAccountBalance();
  //const tokens = useTokenBalance();
  const below500 = useMedia("(max-width: 500px)");
  return (
    <>
      <div className="finance-font">
        {below500 ? (
          <Page>
            <Container>
              <AreaChart />
              <Portfolio />
            </Container>
          </Page>
        ) : (
          <Page>
            <Navbar />
            <Container>
              <Flex>
                <Box width={"2/3"}>
                  <AreaChart />
                  <FeaturedList />
                  <Articles />
                  <TopMovers />
                  <TopEarners />
                </Box>
                <Box width={"1/3"} paddingLeft={14} paddingRight={0}>
                  <Box adjustable padding={2} width={"full"}>
                    <Portfolio />
                  </Box>
                </Box>
              </Flex>
            </Container>
          </Page>
        )}
      </div>
    </>
  );
};

const Page = ({ children }) => {
  return (
    <>
      <div className="relative bg-white min-h-screen">{children}</div>
    </>
  );
};

const Container = ({ children }) => {
  return (
    <>
      <div className="max-w-5xl mx-auto">{children}</div>
    </>
  );
};

const Flex = ({ children }) => {
  return (
    <>
      <div className="flex w-full pt-10">{children}</div>
    </>
  );
};

const Box = ({ children, width, paddingLeft, paddingRight, paddingTop, paddingBottom, padding, adjustable }) => {
  return (
    <>
      <div
        className={`
          w-${width ? width : "null"} 
          pl-${paddingLeft ? paddingLeft : "null"} 
          pr-${paddingRight ? paddingRight : "null"} 
          pt-${paddingTop ? paddingTop : "null"} 
          pb-${paddingBottom ? paddingBottom : "null"}
          p-${padding ? padding : "null"}
        `}
        style={adjustable ? { height: "calc(100% - 150px)", position: "fixed", maxWidth: "300px" } : null}
      >
        {children}
      </div>
    </>
  );
};

const Column = ({ span, paddingLeft, paddingRight, height, children }) => {
  return (
    <>
      <div className={`col-span-${span} h-${height} pl-${paddingLeft} pl-${paddingRight}`}>{children}</div>
    </>
  );
};

const Grid = ({ columns, verticalPadding, gap, children }) => {
  return (
    <>
      <div className={`py-${verticalPadding} grid grid-cols-${columns} gap-${gap}`}>{children}</div>
    </>
  );
};

const Navbar = () => {
  return (
    <>
      <div className="py-2 flex max-w-5xl mx-auto">
        <div className="absolute left-16 flex items-center">
          <img src={Logo} className="block h-8 w-8" />
        </div>
        <div className="w-1/2">
          <Search />
        </div>
        <div className="h-10 absolute right-16 flex items-center space-x-6 font-semibold">
          <div>Yield</div>
          <div>Portfolio</div>
          <div>Ethereum</div>
          <div>Messages</div>
          <div>Account</div>
        </div>
      </div>
    </>
  );
};

const Portfolio = () => {
  return (
    <>
      <div className="overflow-y-scroll border border-t-0 border-gray-300 rounded rounded-md h-full">
        {/* Section Title */}
        <PortfolioTitle title={"Tokens"} />
        <PortfolioItems items={[1, 2, 3, 4, 5]} />
        <PortfolioTitle title={"Liquidity Positions"} />
        <PortfolioItems items={[1, 2, 3, 4, 5]} />
      </div>
    </>
  );
};

const PortfolioTitle = ({ title }) => {
  return (
    <>
      <div className="py-4 px-6 flex justify-between items-center border-b border-t border-gray-300">
        <div className="font-semibold">{title}</div>
        <div>
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z"
            />
          </svg>
        </div>
      </div>
    </>
  );
};

const PortfolioItems = ({ items }) => {
  return (
    <>
      {items.map(() => {
        return (
          <div className="py-2 px-6 flex justify-between items-center">
            <div>
              <div className="font-semibold">TSM</div>
              <div className="">12.32</div>
            </div>
            <div>
              <div className="text-right">$125.70</div>
              <div className="text-right">+3.25%</div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default NobleFishermanInterface;
