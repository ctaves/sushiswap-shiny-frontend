import React from "react";
import { Link } from "react-router-dom";
import WechatModal from "../Modals/Wechat";
import useModal from "../../shared/hooks/useModal";

import SwapIcon from "../../assets/icons/swap.png";
import StakeIcon from "../../assets/icons/xsushi.svg";
// import MenuIcon from "../../assets/icons/menu.png";
// import AnalyticsIcon from "../../assets/icons/analytics.png";
// import BentoBoxIcon from "../../assets/icons/bentobox_gray.png";
// import CompareIcon from "../../assets/icons/comparison.png";

const MenuItems = ({ selected }) => {
  const [onPresentWechat] = useModal(<WechatModal />, null, null, null);
  return (
    <>
      <div className="space-y-1">
        <div className="py-1 relative">
          <div
            className={
              selected === "home"
                ? "shadow group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-900 bg-orange-50 focus:outline-none focus:bg-orange-50 transition ease-in-out duration-150"
                : "group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-700 focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
            }
          >
            <svg
              className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-900 group-focus:text-gray-600 transition ease-in-out duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            <div className="flex space-x-2">
              <Link to="/home" className="hover:text-gray-900 ">
                Home
              </Link>
              <div>/</div>
              <Link to="/experimental/beginner" className="hover:text-gray-900 ">
                Beginner
              </Link>
            </div>
          </div>
          <Link
            to="/portfolio"
            className={
              selected === "omakase"
                ? "shadow group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-900 bg-orange-50 focus:outline-none focus:bg-orange-50 transition ease-in-out duration-150"
                : "group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900  focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
            }
          >
            <svg
              className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-900 group-focus:text-gray-600 transition ease-in-out duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Portfolio
          </Link>
        </div>
        <div className="py-2 relative">
          {/* <div className="mx-1 py-2 px-1 relative rounded-md shadow-md bg-orange-50"> */}
          <Link
            to="/swap"
            className={
              selected === "swap"
                ? "shadow group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-900 bg-orange-50 focus:outline-none focus:bg-orange-50 transition ease-in-out duration-150"
                : "group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900  focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
            }
          >
            {/* <img
              src={SwapIcon}
              className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-900 group-focus:text-gray-600 transition ease-in-out duration-150"
            /> */}
            <svg
              className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-900 group-focus:text-gray-600 transition ease-in-out duration-150"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Swap
          </Link>
          <div className="group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-500">
            <svg
              className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-900 group-focus:text-gray-600 transition ease-in-out duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Lend
            {/* <span className="ml-auto inline-block py-0.5 px-3 text-xs leading-4 font-medium rounded-md gray-100 transition ease-in-out duration-150 group-hover:bg-orange-200 group-focus:bg-orange-200">
              Coming Soon
            </span> */}
          </div>
          <Link
            to="/farms/permanent"
            className={
              selected === "pools"
                ? "shadow group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-900 bg-orange-50 focus:outline-none focus:bg-orange-50 transition ease-in-out duration-150"
                : "group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900  focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
            }
          >
            <svg
              className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-900 group-focus:text-gray-600 transition ease-in-out duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              />
            </svg>
            Farm
          </Link>
          <Link
            to="/farms/special"
            className={
              selected === "special"
                ? "shadow group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-900 bg-orange-50 focus:outline-none focus:bg-orange-50 transition ease-in-out duration-150"
                : "group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900  focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
            }
          >
            <svg
              className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-900 group-focus:text-gray-600 transition ease-in-out duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 4v12l-4-2-4 2V4M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Onsen
          </Link>
          <Link
            to="/farms/xsushi"
            className={
              selected === "pools"
                ? "shadow group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-900 bg-orange-50 focus:outline-none focus:bg-orange-50 transition ease-in-out duration-150"
                : "group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900  focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
            }
          >
            <img
              src={StakeIcon}
              className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-900 group-focus:text-gray-600 transition ease-in-out duration-150"
            />
            SushiBar
          </Link>
        </div>
        <div className="mt-4"></div>
        <div className="py-1 relative">
          <Link
            to="/tokens"
            className={
              selected === "tokens"
                ? "shadow group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-900 bg-orange-50 focus:outline-none focus:bg-orange-50 transition ease-in-out duration-150"
                : "group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900  focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
            }
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-900 group-focus:text-gray-600 transition ease-in-out duration-150"
            >
              <circle cx={12} cy={12} r={7} />
            </svg>
            {/* <svg
              className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-900 group-focus:text-gray-600 transition ease-in-out duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z"
              />
            </svg> */}
            Tokens
          </Link>
          <Link
            to="/pairs"
            className={
              selected === "pairs"
                ? "shadow group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-900 bg-orange-50 focus:outline-none focus:bg-orange-50 transition ease-in-out duration-150"
                : "group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900  focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
            }
          >
            {/* <svg
              className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-900 group-focus:text-gray-600 transition ease-in-out duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
              ></path>
            </svg> */}
            <svg
              className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-900 group-focus:text-gray-600 transition ease-in-out duration-150"
              width={24}
              height={24}
              fill="none"
            >
              <circle cx="15.334" cy={12} r={5} stroke="#15151F" strokeDasharray="2 2" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.714 6.465a5.9 5.9 0 100 11.07 7.043 7.043 0 01-1.422-1.482 4.1 4.1 0 110-8.105c.4-.562.879-1.061 1.422-1.483z"
                fill="#A1A1A5"
              />
              <circle cx="15.333" cy={12} r={5} stroke="#A1A1A5" strokeWidth="1.8" />
            </svg>
            Pairs
          </Link>
        </div>
        <div className="py-1 relative">
          <Link
            to="/governance"
            className={
              selected === "governance"
                ? "shadow group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-900 bg-orange-50 focus:outline-none focus:bg-orange-50 transition ease-in-out duration-150"
                : "group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900  focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
            }
          >
            <svg
              className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-900 group-focus:text-gray-600 transition ease-in-out duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"
              ></path>
            </svg>
            Governance
          </Link>
          <a
            href="https://forum.sushiswapclassic.org"
            target="_blank"
            className={
              selected === "community"
                ? "shadow group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-900 bg-orange-50 focus:outline-none focus:bg-orange-50 transition ease-in-out duration-150"
                : "group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900  focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
            }
          >
            <svg
              className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-900 group-focus:text-gray-600 transition ease-in-out duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Forum
          </a>
          {/* <Link
            to="/community"
            className={
              selected === "community"
                ? "shadow group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-900 bg-orange-50 focus:outline-none focus:bg-orange-50 transition ease-in-out duration-150"
                : "group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900  focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
            }
          >
            <svg
              className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-900 group-focus:text-gray-600 transition ease-in-out duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            Community
          </Link> */}
          {/* <Link
            to="/about"
            className={
              selected === "about"
                ? "shadow group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-900 bg-orange-50 focus:outline-none focus:bg-orange-50 transition ease-in-out duration-150"
                : "group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900  focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
            }
          >
            <svg
              className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-900 group-focus:text-gray-600 transition ease-in-out duration-150"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            About
          </Link> */}
        </div>

        {/* <a
          href="https://help.sushidocs.com/faqs/faqs"
          className={
            selected === "faqs"
              ? "shadow group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-900 bg-orange-50 focus:outline-none focus:bg-orange-50 transition ease-in-out duration-150"
              : "group flex items-center px-2 py-1 text-sm leading-5 font-medium rounded-md text-gray-700 hover:text-gray-900  focus:outline-none focus:bg-gray-200 transition ease-in-out duration-150"
          }
        >
          <svg
            className="mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-900 group-focus:text-gray-600 transition ease-in-out duration-150"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          FAQ
        </a> */}
      </div>
      <div className="mt-4">
        {/* Secondary navigation */}
        <div className="mt-1 space-y-1" role="group" aria-labelledby="teams-headline">
          {/* <a
            href="https://sushiswapclassic.org/"
            target="_blank"
rel="noopener noreferrer" 
            className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"
          >
            <span className="w-2.5 h-2.5 mr-4 bg-orange-400 rounded-md" />
            <span className="truncate">Sushiswapclassic.org</span>
          </a> */}
          <a
            href="https://docs.sushiswap.fi/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center px-3 py-1 text-sm leading-5 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"
          >
            <span className="w-2.5 h-2.5 mr-4 bg-brand-1 rounded-md" />
            <span className="truncate">Docs</span>
          </a>
          <a
            href="https://lite.sushiswap.fi/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center px-3 py-1 text-sm leading-5 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"
          >
            <span className="w-2.5 h-2.5 mr-4 bg-brand-2 rounded-md" />
            <span className="truncate">SushiSwap Lite</span>
          </a>
          <a
            href="https://www.sushiswapclassic.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center px-3 py-1 text-sm leading-5 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"
          >
            <span className="w-2.5 h-2.5 mr-4 bg-brand-3 rounded-md" />
            <span className="truncate">SushiSwap Classic</span>
          </a>
          <a
            href="https://www.sushiswapanalytics.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center px-3 py-1 text-sm leading-5 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"
          >
            <span className="w-2.5 h-2.5 mr-4 bg-brand-4 rounded-md" />
            <span className="truncate">SushiSwap Analytics</span>
          </a>
          <a
            href="https://discord.gg/NVPXN4e"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center px-3 py-1 text-sm leading-5 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"
          >
            <span className="w-2.5 h-2.5 mr-4 bg-brand-5 rounded-md" />
            <span className="truncate">Discord</span>
          </a>
          <a
            href="https://twitter.com/sushiswap"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center px-3 py-1 text-sm leading-5 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"
          >
            <span className="w-2.5 h-2.5 mr-4 bg-brand-6 rounded-md" />
            <span className="truncate">Twitter</span>
          </a>
          <button
            onClick={onPresentWechat}
            className="w-full group flex items-center px-3 py-1 text-sm leading-5 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"
          >
            <span className="w-2.5 h-2.5 mr-4 bg-brand-7 rounded-md" />
            <span className="truncate">Wechat</span>
          </button>
          {/* <a
            href="https://www.notion.so/Sushiswap-Shiny-Frontend-38629fec29bd41a3bbe0fa52d404c921"
            target="_blank"
rel="noopener noreferrer" 
            className="group flex items-center px-3 py-2 text-sm leading-5 font-medium text-gray-700 rounded-md hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:bg-gray-100 transition ease-in-out duration-150"
          >
            <span className="w-2.5 h-2.5 mr-4 bg-white rounded-md" />
            <span className="truncate">Changelog</span>
          </a> */}
        </div>
      </div>
    </>
  );
};

export default MenuItems;
