import React from "react";
import CoinLoader from "../CoinLoader";
import "./styles.css";

const AlbumCards = () => {
  return (
    <>
      <div className="album-cards relative">
        <div id="album-rotator">
          <div id="album-rotator-holder" className="py-4">
            {[1, 2, 3, 4, 5].map((card) => {
              return <AlbumCard />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

const AlbumCard = () => {
  return (
    <>
      <div className="album-item">
        <span className="album-details">
          <CoinLoader size={"sm"} />
        </span>
      </div>
    </>
  );
};

export default AlbumCards;
