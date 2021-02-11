import React from "react";

const Tabs = ({ selected, setSelected }) => {
  const tabs = [
    // {
    //   title: "Buy",
    //   id: "buy",
    // },
    {
      title: "Trade",
      id: "swap",
    },
    {
      title: "+ Liquidity",
      id: "pool",
    },
    {
      title: "Stake",
      id: "stake",
    },
    {
      title: "- Liquidity",
      id: "remove",
    },
  ];
  return (
    <div className="block">
      <nav className="justify-center sm:justify-start mb-px flex space-x-5">
        {tabs.map((tab) => {
          return (
            <button
              onClick={() => {
                setSelected(tab.id);
              }}
              className={
                selected === tab.id
                  ? "whitespace-no-wrap pb-4 px-1 border-b-2 border-gray-900 font-medium text-sm leading-5 text-gray-900 focus:outline-none focus:text-gray-900 focus:border-gray-700"
                  : "whitespace-no-wrap pb-4 px-1 border-b-2 border-transparent font-medium text-sm leading-5 text-gray-500 hover:text-gray-700 hover:border-gray-300 focus:outline-none focus:text-gray-700 focus:border-gray-300"
              }
            >
              {tab.title}
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Tabs;
