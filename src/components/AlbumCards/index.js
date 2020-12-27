import React, { useEffect } from "react";
import "./styles.css";

const AlbumCards = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/AlbumCards/script.js";
    script.type = "module";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <>
      <div className="album-cards">
        <div id="album-rotator">
          <div id="album-rotator-holder">
            <a className="album-item" href="#">
              <span className="album-details">
                <span className="icon">
                  <i className="far fa-at"></i> smpnjn
                </span>
                <span className="title">Some</span>
                <span className="subtitle">Title</span>
                <span className="subtext">Some text to describe this item</span>
              </span>
            </a>
            <a className="album-item" href="#">
              <span className="album-details">
                <span className="title">Another</span>
                <span className="subtitle">Title</span>
                <span className="subtext">Some text to describe this item</span>
              </span>
            </a>
            <a className="album-item" href="#">
              <span className="album-details">
                <span className="title">Finally</span>
                <span className="subtitle">We Go</span>
                <span className="subtext">Some text to describe this item</span>
              </span>
            </a>
            <a className="album-item" href="#">
              <span className="album-details">
                <span className="title">And</span>
                <span className="subtitle">One More</span>
                <span className="subtext">Some text to describe this item</span>
              </span>
            </a>
            <a className="album-item" href="#">
              <span className="album-details">
                <span className="title">And</span>
                <span className="subtitle">Finally..</span>
                <span className="subtext">Some text to describe this item</span>
              </span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default AlbumCards;
