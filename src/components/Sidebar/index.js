import React from "react";
import MenuItems from "./MenuItems";
import Account from "./Account";

import logo from "../../assets/img/logo.png";

const Sidebar = ({ selected }) => {
  return (
    <div className="hidden lg:flex lg:flex-shrink-0">
      <div className="flex flex-col w-64 pt-5 pb-4 bg-white">
        <div className="flex items-center flex-shrink-0 px-5 pt-2 pb-2">
          <img className="h-8 w-auto" src={logo} alt="Sushiswap" />
          <p className="text-lg font-bold leading-6 text-gray-900 sm:truncate ml-2">SUSHISWAP</p>
        </div>
        <Account />
        <div className="h-0 flex-1 flex flex-col overflow-y-auto">
          <nav className="px-3 mt-4">
            <MenuItems selected={selected} />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
