import React from "react";
import styled from "styled-components";
import { useActiveWeb3React } from "../../services/exchange/hooks";
import { useETHBalances } from "../../services/exchange/state/wallet/hooks";
import { Web3StatusInner } from "../../services/exchange/components/Web3Status";

const AccountElement = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fffff;
  border-radius: 12px;
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
    <div className="sushi-px-3 sushi-mt-2 sushi-relative sushi-inline-block sushi">
      {/* Dropdown menu toggle, controlling the show/hide state of dropdown menu. */}
      <div>
        <button
          type="button"
          className="border border-gray-300 sushi-group sushi-w-full sushi-rounded-md sushi-shadow-md sushi-text-sm sushi-leading-5 sushi-font-medium sushi-text-gray-700 hover:sushi-text-gray-500 focus:sushi-outline-none active:sushi-text-gray-800 sushi-transition sushi-ease-in-out sushi-duration-150"
          id="options-menu"
          aria-haspopup="true"
          aria-expanded="true"
        >
          <div className="sushi-flex sushi-w-full sushi-justify-between sushi-items-center">
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
