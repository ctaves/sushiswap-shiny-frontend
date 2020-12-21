import React from "react";
import useMigrateState, { MigrateMode, MigrateState } from "../../services/lite/hooks/useMigrateState";

const Migrate = () => {
  const state = useMigrateState();
  console.log("Migrate:", state);
  return (
    <>
      <WalletType />
    </>
  );
};

const WalletType = () => {
  return (
    <>
      <fieldset>
        <legend id="radiogroup-label" className="sr-only">
          Server size
        </legend>
        <ul className="space-y-6" role="radiogroup" aria-labelledby="radiogroup-label">
          <li
            id="radiogroup-option-0"
            tabIndex={0}
            role="radio"
            aria-checked="true"
            className="group relative rounded-lg shadow-sm cursor-pointer focus:outline-none focus:shadow-outline-blue"
          >
            <div className="rounded-lg border border-gray-300 bg-white px-6 py-4 hover:border-gray-400 group-focus:border-blue-300 sm:flex sm:justify-between sm:space-x-4">
              <div className="flex items-center space-x-0">
                <div className="flex-shrink-0 flex items-center hidden">
                  <span aria-hidden className="form-radio text-indigo-600 group-focus:bg-red-500" />
                </div>
                <div className="text-sm leading-5">
                  <p className="block font-medium text-gray-900">Hobby</p>
                  <div className="text-gray-500">
                    <span className="block sm:inline">8GB / 4 CPUs</span>
                    <span className="hidden sm:inline sm:mx-1">·</span>
                    <span className="block sm:inline">160 GB SSD disk</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex text-sm leading-5 space-x-1 sm:mt-0 sm:block sm:space-x-0 sm:text-right">
                <div className="font-medium text-gray-900">$40</div>
                <div className="text-gray-500">/mo</div>
              </div>
            </div>
            {/* On: "border-indigo-500", Off: "border-transparent" */}
            <div className="border-indigo-500 absolute inset-0 rounded-lg border-2 pointer-events-none" />
          </li>
          <li
            id="radiogroup-option-1"
            tabIndex={-1}
            role="radio"
            aria-checked="false"
            className="group relative rounded-lg shadow-sm cursor-pointer focus:outline-none focus:shadow-outline-blue"
          >
            <div className="rounded-lg border border-gray-300 bg-white px-6 py-4 hover:border-gray-400 group-focus:border-blue-300 sm:flex sm:justify-between sm:space-x-4">
              <div className="flex items-center space-x-0">
                <div className="flex-shrink-0 flex items-center hidden">
                  <span aria-hidden className="form-radio text-indigo-600 group-focus:bg-red-500" />
                </div>
                <div className="text-sm leading-5">
                  <p className="block font-medium text-gray-900">Startup</p>
                  <div className="text-gray-500">
                    <span className="block sm:inline">12GB / 6 CPUs</span>
                    <span className="hidden sm:inline sm:mx-1">·</span>
                    <span className="block sm:inline">256 GB SSD disk</span>
                  </div>
                </div>
              </div>
              <div className="mt-2 flex text-sm leading-5 space-x-1 sm:mt-0 sm:block sm:space-x-0 sm:text-right">
                <div className="font-medium text-gray-900">$80</div>
                <div className="text-gray-500">/mo</div>
              </div>
            </div>
            {/* On: "border-indigo-500", Off: "border-transparent" */}
            <div className="border-transparent absolute inset-0 rounded-lg border-2 pointer-events-none" />
          </li>
        </ul>
      </fieldset>
    </>
  );
};

export default Migrate;
