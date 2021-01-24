import React from "react";
import CoinLoader from "../CoinLoader";
import "./styles.css";

const AlbumCards = () => {
  return (
    <>
      <div className="album-cards relative">
        <div className="album-rotator">
          <div className="album-rotator-holder py-4">
            {[1, 2, 3, 4, 5].map((card) => {
              return <AlbumCard key={"album_loading_" + card} />;
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
