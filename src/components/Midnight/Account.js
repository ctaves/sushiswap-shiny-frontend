import React from "react";
import styled from "styled-components";
import { useActiveWeb3React } from "../../services/exchange/hooks";
import { useETHBalances } from "../../services/exchange/state/wallet/hooks";
import { Web3StatusInner } from "../../services/exchange/components/Web3Status";

const AccountElement = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #1f222d;
  border-radius: 0px;
  white-space: nowrap;
  width: 100%;

  :focus {
    border: 1px solid blue;
  }
`;

const AccountDropdown = () => {
  const { account } = useActiveWeb3React();
  const userEthBalance = useETHBalances(account ? [account] : [])?.[account ?? ""];

  return (
    <div className="px-3 mt-2 relative inline-block sushi">
      {/* Dropdown menu toggle, controlling the show/hide state of dropdown menu. */}
      <div>
        <button
          type="button"
          className="border border-gray-700 group w-full shadow-md text-sm leading-5 font-medium text-gray-400 hover:text-gray-500 focus:outline-none active:text-gray-400 transition ease-in-out duration-150"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <div className="flex w-full justify-between items-center">
            <AccountElement active={!!account} style={{ pointerEvents: "auto" }}>
              {account && userEthBalance ? (
                <p style={{ flexShrink: 0, paddingLeft: "0.75rem", paddingRight: "0.5rem", fontWeight: "500" }}>
                  {userEthBalance?.toSignificant(4)} ETH
                </p>
              ) : null}
              <Web3StatusInner />
            </AccountElement>
          </div>
        </button>
      </div>
    </div>
  );
};

export default AccountDropdown;
