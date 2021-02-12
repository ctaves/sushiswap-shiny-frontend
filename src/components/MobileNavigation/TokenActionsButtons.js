import React from 'react';

export const TokenActionsButtons = ({ onTradeClick, onLiquidityClick }) => {
  return (
    <div
        className="block pt-2 lg:hidden bg-white fixed w-full flex justify-around"
        style={{
          bottom: "73px",
          height: "64px",
          zIndex: 21,
        }}
      >
        <button
          className="bg-black text-white font-bold rounded-md w-full"
          onClick={onTradeClick}
          style={{
            padding: "15px",
            margin: "0 15px",
          }}
        >
          Trade
        </button>
        <button
          className="bg-black text-white font-bold rounded-md w-full"
          onClick={onLiquidityClick}
          style={{
            padding: "15px",
            margin: "0 15px",
          }}
        >
          Liquidity
        </button>
      </div>
  );
};
