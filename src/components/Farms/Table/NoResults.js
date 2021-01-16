import React from "react";
import { Link } from "react-router-dom";

const NoResults = () => {
  return (
    <>
      <section className="min-h-full py-12 bg-gray-50 overflow-hidden md:py-20 lg:py-24">
        <div className="relative max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <blockquote className="mt-8">
              <div className="max-w-3xl mx-auto text-center text-2xl leading-9 font-medium text-gray-900">
                <p>No results. すごく ごめんね!</p>
              </div>
              <footer className="mt-8">
                <div className="md:flex md:items-center md:justify-center">
                  {/* <div className="md:flex-shrink-0">
                    <img
                      className="mx-auto h-10 w-10 rounded-full"
                      src=""
                      alt=""
                    />
                  </div> */}
                  <div className="mt-3 text-center md:mt-0 md:ml-4 md:flex md:items-center">
                    <Link to="/pairs" className="text-base leading-6 font-medium text-gray-900">
                      View all pairs
                    </Link>
                    <svg
                      className="hidden md:block mx-1 h-5 w-5 text-orange-600"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M11 0h3L9 20H6l5-20z" />
                    </svg>
                    <a
                      href="https://forum.sushiswapclassic.org"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-base leading-6 font-medium text-gray-500"
                    >
                      Vote for a menu
                    </a>
                  </div>
                </div>
              </footer>
            </blockquote>
          </div>
        </div>
      </section>
    </>
  );
};

export default NoResults;
